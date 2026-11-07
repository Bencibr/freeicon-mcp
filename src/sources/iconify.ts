/**
 * Iconify aggregator source — one adapter, 150+ icon sets, 200k+ icons.
 *
 * Uses the free public API at https://api.iconify.design (no key required).
 * Icon ids are "prefix:name" (e.g. "mdi:home"), matching Iconify convention.
 * The API natively supports color/height overrides on the .svg endpoint.
 *
 * listAll/getDetail are intentionally not implemented: with 200k+ icons
 * across 150+ sets they are meaningless for this adapter.
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';

const API = 'https://api.iconify.design';

/** Split "prefix:name" → [prefix, name]; name may itself contain ':'? (it
 *  cannot — Iconify names never do — but be defensive anyway) */
function splitId(id: string): { prefix: string; name: string } {
  const idx = id.indexOf(':');
  if (idx <= 0 || idx === id.length - 1) {
    throw new Error(
      `Invalid iconify id "${id}" — expected "prefix:name", e.g. "mdi:home"`
    );
  }
  return { prefix: id.slice(0, idx), name: id.slice(idx + 1) };
}

export function createIconifySource(defaultIconCount = 200000): SourceAdapter {
  let availableCache: boolean | null = null;

  async function ping(): Promise<boolean> {
    if (availableCache !== null) return availableCache;
    try {
      const res = await fetch(`${API}/collections`, { signal: AbortSignal.timeout(5000) });
      availableCache = res.ok;
    } catch {
      availableCache = false;
    }
    return availableCache;
  }

  return {
    id: 'iconify',

    getInfo: async (): Promise<SourceInfo> => ({
      id: 'iconify',
      name: 'Iconify (aggregator)',
      description: '150+ open-source icon sets aggregated (Phosphor, Material Symbols, Fluent UI, ...)',
      license: 'Various (all open source)',
      iconCount: defaultIconCount,
      requiresAuth: false,
      available: await ping(),
      website: 'https://iconify.design',
      packageUrl: API,
    }),

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const limit = Math.min(pageSize, 64);
      const start = (page - 1) * limit;
      const url =
        `${API}/search?query=${encodeURIComponent(keyword)}&limit=${limit}&start=${start}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`Iconify search failed: HTTP ${res.status}`);
      const data = (await res.json()) as { icons?: string[]; total?: number };

      const icons: SourceIcon[] = (data.icons || []).map((full) => {
        const { prefix, name } = splitId(full);
        return {
          id: full,
          name,
          source: 'iconify',
          tags: [prefix],
          extra: { collection: prefix },
        };
      });

      return { icons, total: data.total ?? icons.length, page, pageSize, source: 'iconify' };
    },

    download: async (id: string, color?: string, size?: number): Promise<string> => {
      const { prefix, name } = splitId(id);
      const params = new URLSearchParams({ height: String(size ?? 24) });
      if (color) params.set('color', color); // URLSearchParams encodes '#' as %23
      const url = `${API}/${prefix}/${name}.svg?${params.toString()}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (res.status === 404) throw new Error(`"${id}" not found in iconify`);
      if (!res.ok) throw new Error(`Failed to download "${id}" from iconify: HTTP ${res.status}`);
      const svg = await res.text();
      if (!svg.startsWith('<svg')) {
        throw new Error(`iconify returned non-SVG for "${id}": ${svg.slice(0, 100)}`);
      }
      return svg;
    },
  };
}
