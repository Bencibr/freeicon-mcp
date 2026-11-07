/**
 * Icons8 source — search 100k+ icons, download free-tier PNG.
 *
 * Uses the public search endpoint (anonymous requests work; set
 * ICONS8_API_KEY env var to attach an Api-Key header for higher limits).
 * Only search is offered by the official API — SVG is paywalled on the
 * CDN ("PAID_FORMAT"), so downloads deliver PNG as a base64 data URI.
 * Free usage requires attribution ("Icon" + link to icons8.com).
 *
 * Icon id format: "{platform}:{commonName}", e.g. "ios7:home--v2".
 * The platform segment selects the style (ios7, color, fluency, ...).
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';

const SEARCH_API = 'https://search.icons8.com/api/iconsets/v5/search';
const CDN = 'https://img.icons8.com';

interface Icons8Icon {
  id: string;
  name: string;
  commonName: string;
  platform: string;
  isFree?: boolean;
  isColor?: boolean;
  isAnimated?: boolean;
  category?: string;
  subcategory?: string;
  previewUrl?: string;
}

/** Named CSS colors aren't accepted by the CDN — only 6-digit hex */
function hexColor(color?: string): string | null {
  if (!color) return null;
  const m = color.trim().match(/^#?([0-9a-fA-F]{6})$/);
  return m ? m[1] : null;
}

function splitId(id: string): { platform: string; name: string } {
  const idx = id.indexOf(':');
  if (idx <= 0 || idx === id.length - 1) {
    throw new Error(`Invalid icons8 id "${id}" — expected "platform:name", e.g. "ios7:home--v2"`);
  }
  return { platform: id.slice(0, idx), name: id.slice(idx + 1) };
}

export function createIcons8Source(defaultIconCount = 100000): SourceAdapter {
  const apiKey = process.env.ICONS8_API_KEY || '';

  return {
    id: 'icons8',

    getInfo: async (): Promise<SourceInfo> => ({
      id: 'icons8',
      name: 'Icons8 (PNG)',
      description: 'Icons8 search + free-tier PNG download (SVG is paid; attribution required)',
      license: 'Free with attribution (link to icons8.com)',
      iconCount: defaultIconCount,
      requiresAuth: false,
      available: true,
      website: 'https://icons8.com',
      packageUrl: 'https://developers.icons8.com',
    }),

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const amount = Math.min(pageSize, 50);
      const offset = (page - 1) * amount;
      const url = `${SEARCH_API}?term=${encodeURIComponent(keyword)}&amount=${amount}&offset=${offset}&isFree=true`;
      const res = await fetch(url, {
        headers: apiKey ? { 'Api-Key': apiKey } : {},
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`icons8 search failed: HTTP ${res.status}`);
      const data = (await res.json()) as { success?: boolean; icons?: Icons8Icon[]; total?: number };
      if (data.success === false) throw new Error('icons8 search rejected the request');

      const icons: SourceIcon[] = (data.icons || []).map((ic) => ({
        id: `${ic.platform}:${ic.commonName}`,
        name: ic.name || ic.commonName,
        source: 'icons8',
        tags: (ic.category || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
        extra: {
          platform: ic.platform,
          free: ic.isFree !== false,
          color: !!ic.isColor,
          animated: !!ic.isAnimated,
        },
      }));

      // The API doesn't return a total count field here; use offset to hint at more
      return { icons, total: icons.length === amount ? offset + amount + 1 : offset + icons.length, page, pageSize, source: 'icons8' };
    },

    download: async (id: string, color?: string, size?: number): Promise<string> => {
      const { platform, name } = splitId(id);
      const px = Math.min(Math.max(size ?? 96, 16), 512);
      const hex = hexColor(color);
      const colorSeg = hex ? `/${hex}` : '';
      const url = `${CDN}/${platform}/${px}${colorSeg}/${encodeURIComponent(name)}.png`;
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) throw new Error(`Failed to download "${id}" from icons8: HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      return `data:image/png;base64,${buf.toString('base64')}`;
    },
  };
}
