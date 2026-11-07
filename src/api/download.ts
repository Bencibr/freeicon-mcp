import { getCachedIcon } from './search.js';

/**
 * 获取图标的 SVG 文本。
 *
 * iconfont 已下线按 ID 取图标的 detail 端点，图标的 SVG（show_svg）只能从
 * 搜索结果里拿到。因此本函数从搜索缓存中取：调用前必须先 iconfont_search，
 * 然后用返回的 ID 来下载。
 */
export async function downloadSvg(id: number, color?: string, size?: number): Promise<string> {
  const icon = getCachedIcon(id);
  if (!icon) {
    throw new Error(
      `Icon ${id} is not in the search cache. Call iconfont_search first, then pass one of the returned icon IDs.`
    );
  }

  let svg = icon.show_svg;
  if (!svg) {
    throw new Error(`Icon ${id} has no SVG data in its search record.`);
  }

  if (color) {
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    if (!/<svg[^>]*fill=/.test(svg)) {
      svg = svg.replace(/<svg/, `<svg fill="${color}"`);
    }
  }

  if (size) {
    // iconfont 的 SVG 尺寸通常在 CSS style 里（width: 1em）而非属性
    if (/style="[^"]*width\s*:/.test(svg)) {
      svg = svg.replace(/width\s*:\s*[^;"']*/gi, `width:${size}px`);
      svg = svg.replace(/height\s*:\s*[^;"']*/gi, `height:${size}px`);
    } else {
      svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
      svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
    }
  }

  return svg;
}
