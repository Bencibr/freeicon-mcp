import { getCachedIcon } from './search.js';
import type { IconDetail } from '../types/iconfont.js';

/**
 * 获取图标详情。
 *
 * iconfont 已下线按 ID 取详情的端点，详情数据只能来自搜索结果缓存。
 * 调用前必须先 iconfont_search，再用返回的 ID 查询。
 */
export async function getIconDetail(id: number): Promise<IconDetail> {
  const icon = getCachedIcon(id);
  if (!icon) {
    throw new Error(
      `Icon ${id} is not in the search cache. Call iconfont_search first, then pass one of the returned icon IDs.`
    );
  }

  return {
    id: icon.id,
    name: icon.name,
    unicode: icon.unicode,
    show_svg: icon.show_svg,
    svg_path: icon.svg_path ?? '',
    colors: icon.colors ?? [],
    designer: icon.designer ?? '',
    designer_id: icon.designer_id ?? 0,
    description: icon.description ?? '',
    categories: icon.categories ?? [],
    tags: icon.tags ?? [],
    is_collected: false,
    collection_count: 0,
    download_count: 0,
  };
}
