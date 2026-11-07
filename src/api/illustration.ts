/**
 * iconfont.cn illustration (插画) search + download.
 *
 * Illustrations are a separate content type from icons, with its own
 * search endpoint (POST /api/illustration/search.json — verified live).
 * Results carry the original SVG URL on iconfont's CDN, guarded by a
 * Referer ACL: downloads must send Referer: https://www.iconfont.cn/.
 * Illustrations are multi-color artwork — color override is not applied.
 */

import { apiRequest } from './client.js';
import { getCtoken } from '../auth/cookie-store.js';

export interface IllustrationItem {
  id: number;
  name: string;
  type: string;
  /** original SVG on the CDN, e.g. "//iconfont.alicdn.com/p/illus/file/.../x_origin.svg" */
  origin_file: string | null;
  preview_image: string | null;
  ext: string | null;
  width: number;
  height: number;
}

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

interface IllustrationSearchResponse {
  code: number;
  message?: string;
  data?: { icons?: IllustrationItem[]; count?: number };
}

// id -> item（origin_file 只在搜索响应里出现，下载从这里取）
const illustrationCache = new Map<number, IllustrationItem>();

export function getCachedIllustration(id: number): IllustrationItem | undefined {
  return illustrationCache.get(id);
}

export async function searchIllustrations(
  keyword: string,
  page: number = 1,
  pageSize: number = 20
): Promise<{ illustrations: IllustrationItem[]; total: number }> {
  const result = await apiRequest<IllustrationSearchResponse>('/api/illustration/search.json', {
    method: 'POST',
    form: {
      q: keyword,
      page,
      pageSize: Math.min(pageSize, 100),
      t: Date.now(),
      ctoken: getCtoken() || 'null',
    },
  });

  if (result.code !== 200) {
    throw new Error(`Illustration search failed: ${result.message ?? 'Unknown error'}`);
  }

  const illustrations = (result.data?.icons || []).filter((i) => i.id);
  for (const item of illustrations) {
    illustrationCache.set(item.id, item);
  }

  return { illustrations, total: result.data?.count ?? illustrations.length };
}

/** Fetch the original SVG for an illustration (Referer ACL on the CDN). */
export async function downloadIllustration(id: number, size?: number): Promise<string> {
  const item = illustrationCache.get(id);
  if (!item) throw new Error(`Illustration ${id} not in search cache — search first`);
  if (!item.origin_file) throw new Error(`Illustration ${id} has no original SVG available`);

  // origin_file is protocol-relative: "//iconfont.alicdn.com/..."
  const raw = item.origin_file;
  const url = raw.startsWith('//') ? 'https:' + raw : raw;
  const res = await fetch(url, {
    headers: {
      // CDN denies requests without an iconfont Referer ("denied by Referer ACL")
      Referer: 'https://www.iconfont.cn/',
      'User-Agent': UA,
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Failed to download illustration ${id}: HTTP ${res.status}`);
  const svg = await res.text();
  if (!svg.includes('<svg')) throw new Error(`Non-SVG returned for illustration ${id}`);

  // Multi-color artwork: no color override. Size only (roots carry e.g. width="1024px").
  if (size !== undefined) {
    let out = svg;
    if (/width="[^"]*"/.test(out)) out = out.replace(/width="[^"]*"/, `width="${size}"`);
    else out = out.replace('<svg', `<svg width="${size}"`);
    if (/height="[^"]*"/.test(out)) out = out.replace(/height="[^"]*"/, `height="${size}"`);
    else out = out.replace('<svg', `<svg height="${size}"`);
    return out;
  }
  return svg;
}
