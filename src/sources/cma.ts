/**
 * Cleveland Museum of Art source — 30,000+ CC0 open-access artworks.
 *
 * Free API, no key: https://openaccess-api.clevelandart.org.
 * Search filters to CC0 + has-image; downloads use the museum CDN's
 * "web" rendition (~300KB JPEGs). Raster delivery (data URI).
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';

const API = 'https://openaccess-api.clevelandart.org/api';
const UA = 'freeicon-mcp/0.1.0 (https://github.com/Bencibr/freeicon-mcp)';

interface CmaArtwork {
  id?: number;
  title?: string;
  creation_date?: string;
  artists?: Array<{ description?: string }>;
  images?: { web?: { url?: string } };
}

interface CmaSearchResponse {
  data?: CmaArtwork[];
  info?: { total?: number };
}

const headers = { 'User-Agent': UA, Accept: 'application/json' };

/** artwork id → web image URL, captured at search time */
const imageUrlCache = new Map<number, string>();

async function fetchJson<T>(url: string, timeoutMs = 15000): Promise<T> {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`CMA API failed: HTTP ${res.status}`);
  return (await res.json()) as T;
}

async function getWebImageUrl(id: number): Promise<string | null> {
  const hit = imageUrlCache.get(id);
  if (hit) return hit;
  const data = await fetchJson<CmaSearchResponse>(`${API}/artworks/${id}?cc0=1`);
  const url = data.data?.[0]?.images?.web?.url;
  if (!url) return null;
  imageUrlCache.set(id, url);
  return url;
}

export function createCmaSource(defaultIconCount = 30000): SourceAdapter {
  return {
    id: 'cma',

    getInfo: async (): Promise<SourceInfo> => ({
      id: 'cma',
      name: 'Cleveland Museum of Art (CC0)',
      description: 'Museum open access — 30,000+ CC0 artworks, high-quality web JPEGs',
      license: 'CC0 (public domain)',
      iconCount: defaultIconCount,
      requiresAuth: false,
      available: true,
      website: 'https://www.clevelandart.org/open-access-api',
      packageUrl: API,
    }),

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const limit = Math.min(pageSize, 50);
      const params = new URLSearchParams({
        q: keyword,
        cc0: '1',
        has_image: '1',
        limit: String(limit),
        skip: String((page - 1) * limit),
      });
      const data = await fetchJson<CmaSearchResponse>(`${API}/artworks/?${params}`);
      const artworks = data.data || [];
      const icons: SourceIcon[] = [];
      for (const a of artworks) {
        if (!a.id || !a.images?.web?.url) continue;
        imageUrlCache.set(a.id, a.images.web.url);
        icons.push({
          id: String(a.id),
          name: (a.title || String(a.id)).slice(0, 80),
          source: 'cma',
          tags: ['cc0', 'museum', 'art', ...(a.creation_date ? [a.creation_date] : [])],
          extra: {
            artist: a.artists?.[0]?.description || 'unknown',
            date: a.creation_date,
          },
        });
      }
      return {
        icons,
        total: data.info?.total ?? icons.length,
        page,
        pageSize,
        source: 'cma',
      };
    },

    download: async (id: string, _color?: string, _size?: number): Promise<string> => {
      const numeric = Number(id);
      if (!Number.isFinite(numeric)) throw new Error(`Invalid cma id "${id}"`);
      // color is meaningless for raster; CMA web rendition has a fixed size
      const url = await getWebImageUrl(numeric);
      if (!url) throw new Error(`"${id}" has no CC0 web image on CMA`);
      const res = await fetch(url, {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) throw new Error(`Failed to download "${id}": HTTP ${res.status}`);
      const mime = res.headers.get('content-type') || 'image/jpeg';
      const buf = Buffer.from(await res.arrayBuffer());
      return `data:${mime.split(';')[0]};base64,${buf.toString('base64')}`;
    },
  };
}
