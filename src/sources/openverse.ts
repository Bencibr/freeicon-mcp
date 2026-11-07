/**
 * Openverse source — CC-licensed photos/images aggregator (raster, data URI).
 *
 * Free public API, anonymous access is welcome (rate-limited; register an API
 * key at api.openverse.org for higher limits via OPENVERSE_API_KEY... the API
 * uses a Bearer token from /v1/token — not wired here, anonymous is enough).
 *
 * NOTE on User-Agent: Openverse's edge rejects non-browser UAs outright
 * (HTTP 500 for "node"/"curl"), even though the service itself invites
 * programmatic access. A standard browser UA string is required to reach it.
 *
 * Photos are raster — download returns a data URI (thumbnail for small sizes,
 * original for larger). Per-image license (CC/PD variants) is in extra.
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';
import { getAuthHeader, invalidateToken } from '../auth/openverse-auth.js';

const API = 'https://api.openverse.org/v1';
// See file comment — the edge only lets browser-shaped UAs through.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/** Anonymous: 20/min + 200/day. Authenticated: 100/min + 10,000/day. */
const MIN_INTERVAL_MS = 400;

/** Anonymous tier is aggressively rate-limited (HTTP 500 bursts that clear
 *  after a short cooldown) — space requests out and retry once on 500.
 *  With credentials (ov_login) the Bearer token unlocks 100/min + 10k/day. */
let lastRequestAt = 0;

function minIntervalMs(authed: boolean): number {
  return authed ? 400 : 1200;
}

async function buildHeaders(authed: boolean): Promise<Record<string, string>> {
  const h: Record<string, string> = { 'User-Agent': UA, Accept: 'application/json' };
  if (authed) Object.assign(h, await getAuthHeader());
  return h;
}

async function throttledFetch(url: string, timeoutMs: number): Promise<Response> {
  const authed = await getAuthHeader() !== null;
  const wait = lastRequestAt + minIntervalMs(authed) - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
  const res = await fetch(url, {
    headers: await buildHeaders(authed),
    signal: AbortSignal.timeout(timeoutMs),
  });

  // Expired/invalid token: drop cache and retry once with a fresh one
  if (res.status === 401 && authed) {
    invalidateToken();
    lastRequestAt = Date.now();
    return fetch(url, {
      headers: await buildHeaders(true),
      signal: AbortSignal.timeout(timeoutMs),
    });
  }

  if (res.status === 500 && !authed) {
    // Anonymous 500 bursts clear after a short cooldown
    await new Promise((r) => setTimeout(r, 2500));
    lastRequestAt = Date.now();
    return fetch(url, {
      headers: await buildHeaders(authed),
      signal: AbortSignal.timeout(timeoutMs),
    });
  }
  return res;
}

interface OvImage {
  id: string;
  title?: string;
  url?: string;
  thumbnail?: string;
  filetype?: string;
  license?: string;
  license_version?: string;
  creator?: string;
  source?: string;
  foreign_landing_url?: string;
}

/** id → search-time metadata. The /v1/images/{id}/ detail endpoint currently
 *  returns HTTP 500 for anonymous callers (server-side bug), so downloads
 *  rely on fields captured at search time. */
const metaCache = new Map<string, OvImage>();

/** Fetch a single image's metadata: cache first, detail endpoint as fallback */
async function imageMeta(id: string): Promise<OvImage | null> {
  const hit = metaCache.get(id);
  if (hit) return hit;
  const res = await throttledFetch(`${API}/images/${id}/`, 15000);
  if (res.status === 404) return null;
  if (!res.ok) return null; // detail endpoint is flaky (500s) — don't hard fail
  const meta = (await res.json()) as OvImage;
  metaCache.set(id, meta);
  return meta;
}

export function createOpenverseSource(defaultIconCount = 100000000): SourceAdapter {
  return {
    id: 'openverse',

    getInfo: async (): Promise<SourceInfo> => ({
      id: 'openverse',
      name: 'Openverse (CC images)',
      description: 'Aggregated CC-licensed photos/images from Flickr, Wikimedia & more (raster, data URI)',
      license: 'Various CC licenses (per image)',
      iconCount: defaultIconCount,
      requiresAuth: false,
      available: true,
      website: 'https://openverse.org',
      packageUrl: API,
    }),

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const limit = Math.min(pageSize, 20); // anonymous tier caps page_size at 20
      const params = new URLSearchParams({
        q: keyword,
        page_size: String(limit),
        page: String(page),
      });
      const res = await throttledFetch(`${API}/images/?${params}`, 15000);
      if (!res.ok) {
        throw new Error(
          `Openverse search failed: HTTP ${res.status} (anonymous tier is rate-limited — retry in a minute)`
        );
      }
      const data = (await res.json()) as { result_count?: number; results?: OvImage[] };

      const icons: SourceIcon[] = (data.results || []).map((r) => {
        metaCache.set(r.id, r); // capture url/thumbnail for download
        return {
          id: r.id,
          name: (r.title || r.id).slice(0, 80),
          source: 'openverse',
          tags: [`${r.license || 'cc'} ${r.license_version || ''}`.trim(), r.source || 'cc'],
          extra: {
            license: `${(r.license || 'cc').toUpperCase()} ${r.license_version || ''}`.trim(),
            creator: r.creator || 'unknown',
            source: r.source,
            filePage: r.foreign_landing_url,
          },
        };
      });

      return {
        icons,
        total: data.result_count ?? icons.length,
        page,
        pageSize,
        source: 'openverse',
      };
    },

    download: async (id: string, _color?: string, size?: number): Promise<string> => {
      const meta = await imageMeta(id);
      if (!meta) {
        throw new Error(`"${id}" not found on Openverse (or cache expired — search again)`);
      }
      // color is meaningless for raster — silently ignored
      const px = size ?? 256;
      // Aggregated indexes contain dead links: prefer thumbnail for small
      // sizes, fall back to the other URL (original/thumb) if one is gone.
      const candidates: string[] = [];
      if (px <= 512) {
        if (meta.thumbnail) candidates.push(meta.thumbnail);
        if (meta.url) candidates.push(meta.url);
      } else {
        if (meta.url) candidates.push(meta.url);
        if (meta.thumbnail) candidates.push(meta.thumbnail);
      }
      if (candidates.length === 0) throw new Error(`"${id}" has no downloadable URL`);

      let lastErr: Error | null = null;
      for (const target of candidates) {
        try {
          const res = await throttledFetch(target, 30000);
          if (!res.ok) {
            lastErr = new Error(`HTTP ${res.status}`);
            continue;
          }
          const mime = res.headers.get('content-type') || (meta.filetype === 'png' ? 'image/png' : 'image/jpeg');
          if (!mime.startsWith('image/')) {
            lastErr = new Error(`not an image (${mime})`);
            continue;
          }
          const buf = Buffer.from(await res.arrayBuffer());
          return `data:${mime.split(';')[0]};base64,${buf.toString('base64')}`;
        } catch (e) {
          lastErr = e instanceof Error ? e : new Error(String(e));
        }
      }
      throw new Error(`All download URLs failed for "${id}" (last: ${lastErr?.message})`);
    },
  };
}
