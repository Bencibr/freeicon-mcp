/**
 * Art Institute of Chicago source — 60,000+ public-domain artworks (CC0).
 *
 * Free API, no key: https://api.artic.edu. Search returns IIIF image ids;
 * images are served at any requested width, so size maps cleanly:
 *   https://www.artic.edu/iiif/2/{image_id}/full/{w},/0/default.jpg
 * Raster delivery (data URI) — metadata includes artist/title per image.
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';

const API = 'https://api.artic.edu/api/v1';
const IIIF = 'https://www.artic.edu/iiif/2';
const UA = 'freeicon-mcp/0.1.0 (https://github.com/Bencibr/freeicon-mcp)';

interface ArticSearchResponse {
  data?: Array<{ id: number; title?: string; image_id?: string | null; artist_title?: string | null; date_display?: string | null }>;
  pagination?: { total?: number };
}

interface ArticArtwork {
  data?: { id?: number; title?: string; image_id?: string | null; artist_title?: string | null; date_display?: string | null };
}

const headers = { 'User-Agent': UA, Accept: 'application/json' };

/** Polite pacing — bursts against the shared AIC edge put the client IP into
 *  cooldown states where IIIF 403s regardless of UA. */
let lastRequestAt = 0;
const MIN_INTERVAL_MS = 2500;

async function pacedFetch(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
  return fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
}

/** artwork id → IIIF image id, captured at search time */
const imageIdCache = new Map<number, string>();

async function fetchJson<T>(url: string, timeoutMs = 15000): Promise<T> {
  const res = await pacedFetch(url, { headers }, timeoutMs);
  if (!res.ok) throw new Error(`AIC API failed: HTTP ${res.status}`);
  return (await res.json()) as T;
}

async function getImageId(id: number): Promise<string | null> {
  const hit = imageIdCache.get(id);
  if (hit) return hit;
  const artwork = await fetchJson<ArticArtwork>(`${API}/artworks/${id}?fields=id,title,image_id`);
  const imageId = artwork.data?.image_id;
  if (!imageId) return null;
  imageIdCache.set(id, imageId);
  return imageId;
}

export function createArticSource(defaultIconCount = 62000): SourceAdapter {
  return {
    id: 'artic',

    getInfo: async (): Promise<SourceInfo> => ({
      id: 'artic',
      name: 'Art Institute of Chicago (CC0)',
      description: 'Museum open access — 60,000+ public-domain artworks & illustrations, IIIF images at any width',
      license: 'CC0 (public domain)',
      iconCount: defaultIconCount,
      requiresAuth: false,
      available: true,
      website: 'https://www.artic.edu',
      packageUrl: API,
    }),

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const limit = Math.min(pageSize, 50);
      const params = new URLSearchParams({
        q: keyword,
        'query[term][is_public_domain]': 'true',
        limit: String(limit),
        page: String(page),
        fields: 'id,title,image_id,artist_title,date_display',
      });
      const data = await fetchJson<ArticSearchResponse>(`${API}/artworks/search?${params}`);
      const results = data.data || [];
      for (const r of results) {
        if (r.id && r.image_id) imageIdCache.set(r.id, r.image_id);
      }
      const icons: SourceIcon[] = results
        .filter((r) => r.id && r.image_id)
        .map((r) => ({
          id: String(r.id),
          name: (r.title || String(r.id)).slice(0, 80),
          source: 'artic',
          tags: ['cc0', 'museum', 'art', ...(r.date_display ? [r.date_display] : [])],
          extra: { artist: r.artist_title || 'unknown', date: r.date_display },
        }));
      return {
        icons,
        total: data.pagination?.total ?? icons.length,
        page,
        pageSize,
        source: 'artic',
      };
    },

    download: async (id: string, _color?: string, size?: number): Promise<string> => {
      const numeric = Number(id);
      if (!Number.isFinite(numeric)) throw new Error(`Invalid artic id "${id}"`);
      const imageId = await getImageId(numeric);
      if (!imageId) throw new Error(`"${id}" has no public-domain image on AIC`);
      // color is meaningless for raster — ignored
      // AIC's IIIF rejects width variants below 400 outright (HTTP 403,
      // observed for any image/UA) — clamp the floor to 400.
      const w = Math.min(Math.max(Math.round(size ?? 843), 400), 2000);
      const url = `${IIIF}/${imageId}/full/${w},/0/default.jpg`;
      // AIC's edge rotates blocking rules (observed: browser UA 200→fetch-failed
      // within 30s while a project UA passes). Rotate UAs with backoff —
      // whichever rule is active, one of the pool usually gets through.
      const UA_POOL = [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        UA,
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      ];
      const ATTEMPTS: Array<{ delay: number; ua: string }> = [
        { delay: 0, ua: UA_POOL[0] },
        { delay: 8000, ua: UA_POOL[1] },
        { delay: 20000, ua: UA_POOL[2] },
        { delay: 40000, ua: UA_POOL[0] },
      ];
      let lastErr: Error | null = null;
      for (const { delay, ua } of ATTEMPTS) {
        if (delay) await new Promise((r) => setTimeout(r, delay));
        try {
          const res = await pacedFetch(url, { headers: { 'User-Agent': ua } }, 30000);
          if (res.ok) {
            const mime = res.headers.get('content-type') || 'image/jpeg';
            const buf = Buffer.from(await res.arrayBuffer());
            return `data:${mime.split(';')[0]};base64,${buf.toString('base64')}`;
          }
          lastErr = new Error(`HTTP ${res.status}`);
        } catch (e) {
          lastErr = e instanceof Error ? e : new Error(String(e));
        }
      }
      throw new Error(`Failed to download "${id}" from AIC (all UA attempts): ${lastErr?.message}`);
    },
  };
}
