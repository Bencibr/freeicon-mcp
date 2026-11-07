/**
 * Wikimedia Commons source — search free SVG files, download as SVG text.
 *
 * Uses the free MediaWiki API (no key, no login). Wikimedia asks clients to
 * send a descriptive User-Agent; a project UA works fine here.
 * Each icon carries its license/author in extra — Commons files are under
 * various free licenses (CC BY / CC BY-SA / PD), attribution per file required.
 *
 * Icon id = the file title, e.g. "File:Mountain Home Logo.svg".
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';
import { styleSvg } from './generic.js';

const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'freeicon-mcp/0.1.0 (https://github.com/Bencibr/freeicon-mcp)';

interface CommonsPage {
  title?: string;
  imageinfo?: Array<{
    url?: string;
    descriptionurl?: string;
    extmetadata?: Record<string, { value?: string }>;
  }>;
}

/** Strip HTML tags from extmetadata values (Artist is HTML) */
function stripHtml(html?: string): string {
  return (html || '').replace(/<[^>]*>/g, '').trim();
}

/** Wikimedia rate-limits burst downloads (HTTP 429) — pace requests and
 *  back off once on 429 before giving up. */
let lastRequestAt = 0;
const MIN_INTERVAL_MS = 800;

async function throttledFetch(url: string, timeoutMs: number): Promise<Response> {
  const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json, image/*, text/*;q=0.8, */*;q=0.1' },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 2500));
    lastRequestAt = Date.now();
    return fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'application/json, image/*, text/*;q=0.8, */*;q=0.1' },
      signal: AbortSignal.timeout(timeoutMs),
    });
  }
  return res;
}

/** Query imageinfo (url + license + artist) for a file title */
async function imageInfo(title: string): Promise<{ url: string; license: string; artist: string } | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
  });
  const res = await throttledFetch(`${API}?${params}`, 15000);
  if (!res.ok) throw new Error(`Commons API failed: HTTP ${res.status}`);
  const data = (await res.json()) as { query?: { pages?: Record<string, CommonsPage> } };
  const page = data.query?.pages ? Object.values(data.query.pages)[0] : undefined;
  const info = page?.imageinfo?.[0];
  if (!info?.url) return null;
  const md = info.extmetadata || {};
  return {
    url: info.url,
    license: stripHtml(md.LicenseShortName?.value) || 'see file page',
    artist: stripHtml(md.Artist?.value) || 'unknown',
  };
}

export function createCommonsSource(defaultIconCount = 2000000): SourceAdapter {
  return {
    id: 'commons',

    getInfo: async (): Promise<SourceInfo> => ({
      id: 'commons',
      name: 'Wikimedia Commons (SVG)',
      description: 'Wikimedia\u2019s free media library — real SVG files, per-file free license (CC/PD)',
      license: 'Various free licenses (per file)',
      iconCount: defaultIconCount,
      requiresAuth: false,
      available: true,
      website: 'https://commons.wikimedia.org',
      packageUrl: API,
    }),

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const limit = Math.min(pageSize, 50);
      const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        generator: 'search',
        gsrsearch: `${keyword} filemime:image/svg+xml`,
        gsrnamespace: '6', // File: namespace
        gsrlimit: String(limit),
        gsroffset: String((page - 1) * limit),
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
      });
      const res = await throttledFetch(`${API}?${params}`, 15000);
      if (!res.ok) throw new Error(`Commons search failed: HTTP ${res.status}`);
      const data = (await res.json()) as { query?: { pages?: Record<string, CommonsPage> } };
      const pages = Object.values(data.query?.pages || {});

      const icons: SourceIcon[] = pages
        .filter((p) => p.title?.toLowerCase().endsWith('.svg'))
        .map((p) => {
          const md = p.imageinfo?.[0]?.extmetadata || {};
          const license = stripHtml(md.LicenseShortName?.value) || 'see file page';
          return {
            id: p.title!, // "File:Name.svg"
            name: p.title!.replace(/^File:/, '').replace(/\.svg$/i, ''),
            source: 'commons',
            tags: [license.toLowerCase(), 'svg', 'commons'],
            extra: {
              license,
              artist: stripHtml(md.Artist?.value),
              filePage: p.imageinfo?.[0]?.descriptionurl,
            },
          };
        });

      const offset = (page - 1) * limit;
      return {
        icons,
        total: icons.length === limit ? offset + limit + 1 : offset + icons.length,
        page,
        pageSize,
        source: 'commons',
      };
    },

    download: async (id: string, color?: string, size?: number): Promise<string> => {
      if (!id.startsWith('File:')) {
        throw new Error(`Invalid commons id "${id}" — expected a file title like "File:Name.svg"`);
      }
      const info = await imageInfo(id);
      if (!info) throw new Error(`"${id}" not found on Commons`);
      const res = await throttledFetch(info.url, 20000);
      if (!res.ok) throw new Error(`Failed to download "${id}": HTTP ${res.status}`);
      const svg = await res.text();
      if (!svg.includes('<svg')) {
        throw new Error(`Commons returned non-SVG for "${id}"`);
      }
      return styleSvg(svg, color, size);
    },
  };
}
