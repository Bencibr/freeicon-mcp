/**
 * Generic unpkg-based icon source adapter.
 *
 * Can handle any SVG icon library on unpkg with zero per-source code.
 * Supports multiple metadata strategies:
 *   - JSON metadata file (Lucide, Tabler, MDI)
 *   - Directory listing scrape (Heroicons, Simple Icons, Ionicons)
 *   - Name-based tag generation (fallback for everything)
 */

import type { SourceAdapter, SourceInfo, SourceIcon, SourceSearchResult } from './adapter.js';

// ─── Config ─────────────────────────────────────────────────────────────────

export interface IconSourceConfig {
  /** Unique identifier, e.g. "lucide", "heroicons" */
  id: string;
  /** Display name, e.g. "Lucide Icons" */
  name: string;
  /** Short description */
  description: string;
  /** License short name, e.g. "MIT", "ISC", "Apache 2.0", "CC0" */
  license: string;
  /** Website URL */
  website: string;
  /** npm package name with version, e.g. "lucide-static@1.27.0" */
  package: string;
  /** Approximate icon count (shown before metadata loads) */
  defaultIconCount: number;
  /** SVG URL template. Placeholders: {name}, and optionally {dir} (resolved
   *  from the icon's directory when metadata declares multiple dirs) */
  svgPath: string;
  /** How to modify SVG color/size */
  svgStyle: SvgStyle;
  /** Metadata strategy */
  metadata: MetadataConfig;
  /** Build SVGs locally from metadata (entry.extra.svgInner) instead of
   *  fetching from unpkg — for packages that ship path data (e.g. remixicon). */
  inline?: { viewBox: string; /** Add fill="currentColor" on the <svg> root */ fillRoot?: boolean };
}

/** SVG color/size modification strategy */
export interface SvgStyle {
  /** The color attribute to replace, e.g. 'stroke="currentColor"' or empty */
  colorAttr: string;
  /** Whether SVGs have width/height attributes */
  hasSize: boolean;
  /** Default width (for sources without width/height in SVG) */
  defaultSize?: number;
}

/** Metadata strategy */
export type MetadataConfig =
  | { type: 'json'; path: string; parse: JsonMetaParser }
  | { type: 'dir'; path: string; /** File extension to scan, e.g. ".svg" */ ext: string }
  /** Multiple directory listings merged into one source (e.g. Font Awesome styles).
   *  Entries carry extra.dir; svgPath may use a {dir} placeholder. On name
   *  collisions across dirs, the later dir is appended to the id (bell-regular). */
  | { type: 'dir'; paths: string[]; ext: string }
  | { type: 'none'; /** Use name-based tag generation only */ };

/** Parser for JSON metadata files */
export interface JsonMetaParser {
  (json: unknown): Array<{ id: string; name: string; tags: string[]; extra?: Record<string, unknown> }>;
}

// ─── Built-in SvgStyle presets ──────────────────────────────────────────────

/** Outline style: stroke="currentColor", has width/height */
export const STYLE_OUTLINE: SvgStyle = { colorAttr: 'stroke="currentColor"', hasSize: true };

/** Filled style: fill="currentColor", has width/height */
export const STYLE_FILL: SvgStyle = { colorAttr: 'fill="currentColor"', hasSize: true };

/** ViewBox-only: no color attr, no width/height (MDI, Ionicons) */
export const STYLE_VIEWBOX: SvgStyle = { colorAttr: '', hasSize: false, defaultSize: 24 };

/** Outline color but no intrinsic size (Heroicons — stroke but only viewBox) */
export const STYLE_OUTLINE_NOSIZE: SvgStyle = { colorAttr: 'stroke="currentColor"', hasSize: false, defaultSize: 24 };

/** Brand style: fill="currentColor" via <svg> tag, no width/height (Simple Icons) */
export const STYLE_BRAND: SvgStyle = { colorAttr: '', hasSize: false, defaultSize: 24 };

// ─── Built-in JSON meta parsers ─────────────────────────────────────────────

/** Dict-style metadata parser. Handles two common shapes:
 *   - { "name": ["tag1", "tag2"] }        (Lucide tags.json — value IS the tags array)
 *   - { "name": { tags: [...], ... } }    (Tabler icons.json — value is an object)
 * Auto-detects per entry, so one parser fits both. */
export function jsonDict(tagsKey: string, ...extraKeys: string[]): JsonMetaParser {
  return (json) =>
    Object.entries(json as Record<string, unknown>).map(([name, value]) => {
      // Auto-detect: array value = tags directly; object value = look up tagsKey
      const isDirectArray = Array.isArray(value);
      const meta = isDirectArray ? {} : (value as Record<string, unknown>);
      const tags = isDirectArray ? (value as string[]) : ((meta[tagsKey] as string[]) || []);
      const extra = extraKeys.length && !isDirectArray
        ? Object.fromEntries(extraKeys.filter((k) => k in meta).map((k) => [k, meta[k]]))
        : undefined;
      // Coerce: keep only string tags (some sources mix in numbers/nulls)
      const cleanTags = (tags || []).filter((t): t is string => typeof t === 'string');
      return { id: name, name, tags: cleanTags, extra };
    });
}

/** Array-style: [ { name: "...", tags: [...], ... } ] — MDI */
export function jsonArray(nameKey: string, tagsKey: string, aliasKey?: string, deprecated?: boolean): JsonMetaParser {
  return (json) =>
    (json as Record<string, unknown>[])
      .filter((item) => !deprecated || !item.deprecated)
      .map((item) => {
        const tags = [...((item[tagsKey] as unknown[]) || []), ...(aliasKey ? ((item[aliasKey] as unknown[]) || []) : [])];
        const cleanTags = tags.filter((t): t is string => typeof t === 'string');
        return { id: item[nameKey] as string, name: item[nameKey] as string, tags: cleanTags };
      });
}

/** Bootstrap-style: { "icon-name": codepoint, ... } — no tags, just names */
export function jsonBootstrap(): JsonMetaParser {
  return (json) =>
    Object.entries(json as Record<string, unknown>).map(([name]) => ({
      id: name,
      name,
      tags: [name.replace(/-/g, ' ').replace(/-/g, ' ')],
    }));
}

/** Octicons-style: { "name": { keywords: [...], heights: { "16": {...}, "24": {...} } } }
 *  Keeps only icons that ship a 24px variant (matches svgPath {name}-24). */
export function jsonOcticons(): JsonMetaParser {
  return (json) =>
    Object.entries(json as Record<string, Record<string, unknown>>)
      .filter(([, meta]) => meta && typeof meta === 'object' && meta.heights && '24' in (meta.heights as object))
      .map(([name, meta]) => {
        const keywords = (meta.keywords as unknown[]) || [];
        const tags = keywords.filter((t): t is string => typeof t === 'string');
        return {
          id: name,
          name,
          tags: tags.length > 0 ? tags : nameTags(name),
        };
      });
}

/** Remix-style glyph.json: { "home-line": { path: ["M...", ...], ... } } —
 *  path data (one or more d-strings) on a 24×24 grid, so the SVG is built
 *  locally (entry.extra.svgInner). */
export function jsonRemix(): JsonMetaParser {
  return (json) =>
    Object.entries(json as Record<string, Record<string, unknown>>)
      .filter(([, meta]) => meta && (typeof meta.path === 'string' || Array.isArray(meta.path)))
      .map(([name, meta]) => {
        const raw = meta.path as string | unknown[] | undefined;
        const dList: string[] = (typeof raw === 'string' ? [raw] : Array.isArray(raw) ? raw : []).filter(
          (d): d is string => typeof d === 'string' && d.length > 0
        );
        const style = name.endsWith('-fill') ? 'fill' : name.endsWith('-line') ? 'line' : undefined;
        return {
          id: name,
          name,
          tags: [...nameTags(name.replace(/-(fill|line)$/, '')), ...(style ? [style] : [])],
          extra: { svgInner: dList.map((d) => `<path d="${d}"/>`).join('') },
        };
      });
}

// ─── Name-based tag generation ──────────────────────────────────────────────

/** Generate tags from an icon name by splitting on hyphens, dots, underscores */
export function nameTags(name: string): string[] {
  const tags = new Set<string>();
  // Split by common separators
  for (const part of name.split(/[-._]/)) {
    if (part.length > 1) tags.add(part);
  }
  // Also split camelCase
  for (const part of name.split(/(?=[A-Z])/)) {
    const clean = part.toLowerCase();
    if (clean.length > 1) tags.add(clean);
  }
  // Add the full name
  tags.add(name.replace(/[-._]/g, ' '));
  return Array.from(tags);
}

// ─── Directory listing scraper ──────────────────────────────────────────────

/** List file names in an unpkg directory.
 *  Prefers the ?meta JSON API (reliable for large dirs); falls back to
 *  scraping the HTML listing page. */
async function scrapeDir(packageName: string, dirPath: string, ext: string): Promise<string[]> {
  const base = `https://unpkg.com/${packageName}${dirPath}`;

  // 1) ?meta JSON: { files: [{ path: "/icons/regular/home.svg", ... }, ...] }
  try {
    const res = await fetch(`${base}?meta`, { signal: AbortSignal.timeout(20000) });
    if (res.ok) {
      const data = (await res.json()) as { files?: Array<{ path?: string; type?: string }> };
      if (Array.isArray(data.files)) {
        const names: string[] = [];
        for (const f of data.files) {
          if (!f.path || !f.path.endsWith(ext)) continue;
          const name = f.path.split('/').pop()!.replace(ext, '');
          if (!names.includes(name)) names.push(name);
        }
        if (names.length > 0) return names;
      }
    }
  } catch {
    // fall through to HTML scraping
  }

  // 2) HTML listing page (small dirs only — unpkg renders an SPA shell for big ones)
  const res = await fetch(base);
  if (!res.ok) throw new Error(`Failed to list ${base}: HTTP ${res.status}`);
  const html = await res.text();
  const names: string[] = [];
  // Match href=".../icon-name.svg" - unpkg uses absolute URLs
  const re = new RegExp(`href="[^"]*/([^/"]+\\${ext})"`, 'g');
  let match;
  while ((match = re.exec(html)) !== null) {
    const name = match[1].replace(ext, '');
    if (!names.includes(name)) names.push(name);
  }
  return names;
}

/** Last non-empty path segment, e.g. "/svgs/solid/" → "solid" */
function lastDirSegment(dirPath: string): string {
  const parts = dirPath.split('/').filter(Boolean);
  return parts[parts.length - 1] || 'root';
}

/** Scrape several directory listings and merge them into one metadata list.
 *  First occurrence of a name keeps the plain id; later duplicates get
 *  "{name}-{dir}" so every icon stays addressable (e.g. bell / bell-regular). */
async function scrapeDirs(
  packageName: string,
  dirPaths: string[],
  ext: string
): Promise<Array<{ id: string; name: string; tags: string[]; extra?: Record<string, unknown> }>> {
  const byId = new Map<string, { id: string; name: string; tags: string[]; extra?: Record<string, unknown> }>();
  for (const dirPath of dirPaths) {
    const dir = lastDirSegment(dirPath);
    const names = await scrapeDir(packageName, dirPath, ext);
    for (const name of names) {
      const id = byId.has(name) ? `${name}-${dir}` : name;
      byId.set(id, { id, name, tags: nameTags(name), extra: { dir } });
    }
  }
  return Array.from(byId.values());
}

// ─── SVG color/size styling (shared with g_validate) ───────────────────────

/** Apply color/size overrides to any SVG.
 *  Color: replaces currentColor everywhere; injects fill on <svg> if none.
 *  Size: replaces existing width/height, or injects them if missing. */
export function styleSvg(svg: string, color?: string, size?: number): string {
  // Clean up stray id attributes for cleaner output
  svg = svg.replace(/ id="[^"]*"/g, '');

  if (color) {
    const before = svg;
    svg = svg.replaceAll('currentColor', color);
    // If no currentColor existed (MDI/Ionicons/FA), inject a fill attribute
    if (svg === before && !svg.includes(`fill="${color}"`)) {
      svg = svg.replace('<svg', `<svg fill="${color}"`);
    }
  }

  if (size !== undefined) {
    if (/width="[^"]*"/.test(svg)) {
      svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
    } else {
      svg = svg.replace('<svg', `<svg width="${size}"`);
    }
    if (/height="[^"]*"/.test(svg)) {
      svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
    } else {
      svg = svg.replace('<svg', `<svg height="${size}"`);
    }
  }

  return svg;
}

// ─── Factory ────────────────────────────────────────────────────────────────

/**
 * Create a SourceAdapter from a declarative config.
 * One config = one source, no adapter code needed.
 */
export function createSource(cfg: IconSourceConfig): SourceAdapter {
  const baseUrl = `https://unpkg.com/${cfg.package}`;

  // ── Metadata loading ──────────────────────────────────────────────────
  type MetaEntry = { id: string; name: string; tags: string[]; extra?: Record<string, unknown> };
  let metaCache: MetaEntry[] | null = null;
  let loadPromise: Promise<MetaEntry[] | null> | null = null;

  async function loadMeta(): Promise<MetaEntry[] | null> {
    if (metaCache) return metaCache;
    if (loadPromise) return loadPromise;

    loadPromise = (async (): Promise<MetaEntry[] | null> => {
      const md = cfg.metadata;

      if (md.type === 'json') {
        const url = `${baseUrl}${md.path}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load ${cfg.id} metadata: HTTP ${res.status}`);
        const json = await res.json();
        metaCache = md.parse(json);
        return metaCache;
      }

      if (md.type === 'dir') {
        if ('paths' in md) {
          metaCache = await scrapeDirs(cfg.package, md.paths, md.ext);
        } else {
          const names = await scrapeDir(cfg.package, md.path, md.ext);
          metaCache = names.map((name) => ({ id: name, name, tags: nameTags(name) }));
        }
        return metaCache;
      }

      // type === 'none' — no metadata, try directory listing as best-effort
      try {
        const names = await scrapeDir(cfg.package, '/', '.svg');
        metaCache = names.map((name) => ({ id: name, name, tags: nameTags(name) }));
        return metaCache;
      } catch {
        metaCache = null;
        return metaCache;
      }
    })();

    try {
      return await loadPromise;
    } catch (err) {
      loadPromise = null;
      throw err;
    }
  }

  // ── SVG URL builder ───────────────────────────────────────────────────
  function svgUrl(name: string, dir?: string): string {
    let p = cfg.svgPath.replace('{name}', encodeURIComponent(name));
    if (dir) p = p.replace('{dir}', encodeURIComponent(dir));
    return `${baseUrl}${p}`;
  }

  // ── SVG modifier ──────────────────────────────────────────────────────
  const modifySvg = (svg: string, color?: string, size?: number): string =>
    styleSvg(svg, color, size);

  // ── Adapter ───────────────────────────────────────────────────────────
  return {
    id: cfg.id,

    getInfo: async (): Promise<SourceInfo> => {
      let count = cfg.defaultIconCount;
      try {
        const meta = await loadMeta();
        if (meta) count = meta.length;
      } catch { /* use default */ }
      return {
        id: cfg.id,
        name: cfg.name,
        description: cfg.description,
        license: cfg.license,
        iconCount: count,
        requiresAuth: false,
        available: true,
        website: cfg.website,
        packageUrl: `${baseUrl}/`,
      };
    },

    search: async (keyword: string, page = 1, pageSize = 20): Promise<SourceSearchResult> => {
      const meta = await loadMeta();
      if (!meta) {
        // No metadata — try to search by fetching the SVG directly
        // This is a fallback for sources without any listing
        const url = svgUrl(keyword);
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          const icons: SourceIcon[] = [{
            id: keyword, name: keyword, source: cfg.id,
            tags: nameTags(keyword),
          }];
          return { icons, total: 1, page, pageSize, source: cfg.id };
        }
        return { icons: [], total: 0, page, pageSize, source: cfg.id };
      }

      const kw = keyword.toLowerCase();
      const matched = meta.filter((e) => {
        if (!e) return false;
        if (e.id && e.id.includes(kw)) return true;
        if (e.name && e.name.includes(kw)) return true;
        return (e.tags || []).some((t) => t && t.includes(kw));
      });

      const total = matched.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const icons: SourceIcon[] = matched.slice(start, end).map((e) => ({
        id: e.id, name: e.name, source: cfg.id, tags: e.tags, extra: e.extra,
      }));

      return { icons, total, page, pageSize, source: cfg.id };
    },

    download: async (id: string, color?: string, size?: number): Promise<string> => {
      const needsMeta = !!cfg.inline || cfg.svgPath.includes('{dir}');
      let entry: MetaEntry | undefined;
      if (needsMeta) {
        const meta = await loadMeta();
        entry = meta?.find((e) => e.id === id);
        if (!entry) throw new Error(`"${id}" not found in ${cfg.id}`);
      }

      // Inline sources: build the SVG locally from path data — no HTTP round-trip
      if (cfg.inline && entry?.extra?.svgInner) {
        const fillAttr = cfg.inline.fillRoot ? ' fill="currentColor"' : '';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${cfg.inline.viewBox}"${fillAttr}>${entry.extra.svgInner}</svg>`;
        return modifySvg(svg, color, size);
      }

      const dir = cfg.svgPath.includes('{dir}')
        ? (entry?.extra?.dir as string | undefined)
        : undefined;
      if (cfg.svgPath.includes('{dir}') && !dir) {
        throw new Error(`"${id}" has no directory info in ${cfg.id}`);
      }

      const url = svgUrl(id, dir);
      const res = await fetch(url);
      if (res.status === 404) throw new Error(`"${id}" not found in ${cfg.id}`);
      if (!res.ok) throw new Error(`Failed to download "${id}" from ${cfg.id}: HTTP ${res.status}`);
      const svg = await res.text();
      return modifySvg(svg, color, size);
    },

    listAll: async (page = 1, pageSize = 50): Promise<SourceSearchResult> => {
      const meta = await loadMeta();
      if (!meta) return { icons: [], total: 0, page, pageSize, source: cfg.id };
      const total = meta.length;
      const icons: SourceIcon[] = meta.slice((page - 1) * pageSize, page * pageSize).map((e) => ({
        id: e.id, name: e.name, source: cfg.id, tags: e.tags, extra: e.extra,
      }));
      return { icons, total, page, pageSize, source: cfg.id };
    },

    getDetail: async (id: string): Promise<SourceIcon | null> => {
      const meta = await loadMeta().catch(() => null);
      const entry = meta?.find((e) => e.id === id);
      if (entry) {
        return { id: entry.id, name: entry.name, source: cfg.id, tags: entry.tags, extra: entry.extra };
      }
      // Metadata miss but the SVG file may still exist (renamed/aliased icons,
      // e.g. lucide "home" → "house"): fall back to an existence probe
      try {
        const res = await fetch(svgUrl(id), { method: 'HEAD' });
        if (res.ok) {
          return { id, name: id, source: cfg.id, tags: nameTags(id) };
        }
      } catch { /* offline */ }
      return null;
    },
  };
}