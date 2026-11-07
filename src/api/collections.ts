import { apiRequest } from './client.js';
import type { CollectionSearchResponse, CollectionItem } from '../types/iconfont.js';

/**
 * 搜索图标库（collections）。
 *
 * iconfont 已把端点从 /api/collection/search.json 改为
 * /api/collections.json（GET），参数：type=3, sort=time, limit, page, keyword。
 */
export async function searchCollections(
  keyword: string,
  page: number = 1,
  pageSize: number = 20
): Promise<{ collections: CollectionItem[]; total: number }> {
  const result = await apiRequest<CollectionSearchResponse>('/api/collections.json', {
    params: {
      type: 3,
      sort: 'time',
      limit: Math.min(pageSize, 100),
      page,
      keyword,
      t: Date.now(),
    },
  });

  if (result.code !== 200) {
    throw new Error(`Search collections failed: ${result.message ?? 'Unknown error'}`);
  }

  const lists = result.data.lists ?? result.data.collections ?? [];
  return {
    collections: lists,
    total: result.data.count ?? result.data.total ?? lists.length,
  };
}
