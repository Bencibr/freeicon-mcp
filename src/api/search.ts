import { apiRequest } from './client.js';
import { getCtoken } from '../auth/cookie-store.js';
import type { IconSearchResponse, IconSearchResult } from '../types/iconfont.js';

// 搜索结果缓存（id -> icon）。因为 iconfont 已没有按 ID 取图标的 detail 端点，
// 图标的 SVG（show_svg）只能从搜索响应里拿。下载工具从这里取。
const iconCache = new Map<number, IconSearchResult>();

export function getCachedIcon(id: number): IconSearchResult | undefined {
  return iconCache.get(id);
}

export async function searchIcons(
  keyword: string,
  page: number = 1,
  pageSize: number = 20
): Promise<{ icons: IconSearchResult[]; total: number }> {
  // iconfont 已把搜索接口从 GET 改为 POST（表单编码），参数名也变了
  // （keyword→q, sort→sortType 等）。用旧 GET 会返回 SPA 首页 HTML。
  const result = await apiRequest<IconSearchResponse>('/api/icon/search.json', {
    method: 'POST',
    form: {
      q: keyword,
      sortType: 'updated_at',
      page,
      pageSize: Math.min(pageSize, 100),
      sType: '',
      fromCollection: -1,
      fills: '',
      t: Date.now(),
      ctoken: getCtoken() || 'null',
    },
  });

  if (result.code !== 200) {
    throw new Error(`Search failed: ${result.message ?? 'Unknown error'}`);
  }

  for (const ic of result.data.icons) {
    iconCache.set(ic.id, ic);
  }

  return {
    icons: result.data.icons,
    total: result.data.count,
  };
}
