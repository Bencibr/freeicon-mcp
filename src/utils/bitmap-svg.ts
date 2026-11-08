/**
 * Bitmap → SVG vectorization (i_bitmap_to_svg backend).
 *
 * 双引擎：imagetracerjs 多色分层描摹 / 二值模式。
 * 输入对象感知：照片类图片（色彩熵高）自动拒绝——照片转 SVG 会又大又失真，
 * 应保留 PNG/WebP。仅对扁平图形/图标类输入做矢量化。
 */

import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';
import fs from 'node:fs';
// @ts-expect-error imagetracerjs 无类型声明
import ImageTracer from 'imagetracerjs';

export interface BitmapAnalysis {
  width: number;
  height: number;
  uniqueQuantized: number;
  sampled: number;
  photoLike: boolean;
}

export interface BitmapToSvgResult {
  svg: string;
  width: number;
  height: number;
  tracedColors: number;
  uniqueColors: number;
  photoLike: boolean;
  bytes: number;
}

const MAX_DIMENSION = 1024;

/** 读取图片文件（PNG/JPEG），返回 RGBA imagedata */
export function readImageFile(path: string): { width: number; height: number; data: Uint8Array } {
  const buf = fs.readFileSync(path);
  const isPng = buf.subarray(0, 8).toString('hex') === '89504e470d0a1a0a';
  const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
  if (isPng) {
    const png = PNG.sync.read(buf);
    return { width: png.width, height: png.height, data: png.data };
  }
  if (isJpg) {
    const jpg = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true });
    return { width: jpg.width, height: jpg.height, data: jpg.data };
  }
  throw new Error('不支持的图片格式——仅支持 PNG/JPEG（其他格式请先转换）');
}

/** 采样统计量化色数 → 照片判定（扁平图形通常 <64 色；照片 >256） */
export function analyzeBitmap(data: Uint8Array, width: number, height: number): BitmapAnalysis {
  const buckets = new Set<number>();
  const step = Math.max(1, Math.floor(Math.sqrt((width * height) / 4096)));
  let sampled = 0;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const o = (y * width + x) * 4;
      const q = ((data[o] >> 4) << 8) | ((data[o + 1] >> 4) << 4) | (data[o + 2] >> 4);
      buckets.add(q);
      sampled += 1;
    }
  }
  const uniqueQuantized = buckets.size;
  return {
    width, height,
    uniqueQuantized,
    sampled: Math.ceil(width / step) * Math.ceil(height / step),
    photoLike: uniqueQuantized > 200,
  };
}

/** 最近邻降采样（防大图 OOM/超时） */
export function downscale(data: Uint8Array, width: number, height: number, maxDim: number) {
  if (width <= maxDim && height <= maxDim) return { data, width, height };
  const scale = Math.min(width, height) > maxDim ? Math.max(width, height) / maxDim : 1;
  const nw = Math.max(1, Math.floor(width / scale));
  const nh = Math.max(1, Math.floor(height / scale));
  const out = new Uint8ClampedArray(nw * nh * 4);
  for (let y = 0; y < nh; y++) {
    const sy = Math.min(height - 1, Math.floor(y * height / nh));
    for (let x = 0; x < nw; x++) {
      const sx = Math.min(width - 1, Math.floor(x * width / nw));
      const so = (sy * width + sx) * 4;
      const to = (y * nw + x) * 4;
      out[to] = data[so]; out[to + 1] = data[so + 1]; out[to + 2] = data[so + 2]; out[to + 3] = data[so + 3];
    }
  }
  return { data: out, width: nw, height: nh };
}

/** 二值化（亮度阈值 → 黑白两色 imagedata） */
function binarize(data: Uint8Array): Uint8ClampedArray {
  const out = new Uint8ClampedArray(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const v = lum > 128 ? 255 : 0;
    out[i] = v; out[i + 1] = v; out[i + 2] = v; out[i + 3] = data[i + 3];
  }
  return out;
}

/** 描摹 → SVG */
export function bitmapToSvg(
  imagedata: { width: number; height: number; data: Uint8Array | Uint8ClampedArray },
  colorMode: 'color' | 'binary',
  maxColors: number,
): BitmapToSvgResult {
  let data = imagedata.data as Uint8Array;
  if (colorMode === 'binary') data = binarize(data) as unknown as Uint8Array;
  const options = {
    ltres: 1, qtres: 1, pathomit: 8,
    colorsampling: colorMode === 'color' ? 2 : 0,
    numberofcolors: colorMode === 'color' ? Math.min(Math.max(maxColors, 2), 64) : 2,
    mincolorratio: 0,
    colorquantcycles: 3,
    blurradius: 0,
  };
  const svg = ImageTracer.imagedataToSVG({ width: imagedata.width, height: imagedata.height, data }, options);
  const tracedColors = colorMode === 'binary' ? 2 : (svg.match(/rgb\([^)]*\)|#[0-9a-fA-F]{3,8}/g) || []).length;
  return {
    svg,
    width: imagedata.width,
    height: imagedata.height,
    tracedColors,
    uniqueColors: tracedColors,
    photoLike: false,
    bytes: svg.length,
  };
}
