/**
 * Source registry — manages all icon data sources.
 *
 * Sources register themselves here, and the registry provides
 * unified search / download / info across all or selected sources.
 */

import type { SourceAdapter, SourceInfo, SourceSearchResult, MultiSourceSearchResult } from './adapter.js';

/** Registered source adapters, keyed by source id */
const sources = new Map<string, SourceAdapter>();

/** Initialization promises (prevent double-init) */
const initPromises = new Map<string, Promise<void>>();

/**
 * Register a source adapter.
 * Later registrations with the same id overwrite earlier ones.
 */
export function registerSource(adapter: SourceAdapter): void {
  sources.set(adapter.id, adapter);
}

/**
 * Get a registered source adapter by id.
 */
export function getSource(id: string): SourceAdapter | undefined {
  return sources.get(id);
}

/**
 * List all registered sources.
 */
export function listSources(): SourceAdapter[] {
  return Array.from(sources.values());
}

/**
 * Get info for all registered sources.
 */
export async function getAllSourceInfos(): Promise<SourceInfo[]> {
  const infos: SourceInfo[] = [];
  for (const source of sources.values()) {
    try {
      infos.push(await source.getInfo());
    } catch {
      // Source unavailable — still report it
      infos.push({
        id: source.id,
        name: source.id,
        description: 'Unavailable',
        license: 'Unknown',
        iconCount: 0,
        requiresAuth: false,
        available: false,
      });
    }
  }
  return infos;
}

/**
 * Search across all sources (or a subset).
 *
 * @param keyword - Search keyword
 * @param sourceIds - Optional list of source ids to search. If empty, search all.
 * @param page - Page number (default: 1)
 * @param pageSize - Results per source per page (default: 10)
 */
export async function searchAll(
  keyword: string,
  sourceIds?: string[],
  page = 1,
  pageSize = 10
): Promise<MultiSourceSearchResult> {
  const targets = sourceIds
    ? sourceIds.map((id) => sources.get(id)).filter(Boolean) as SourceAdapter[]
    : listSources();

  const results = await Promise.allSettled(
    targets.map((source) =>
      source.search(keyword, page, pageSize).catch((err) => {
        return {
          icons: [],
          total: 0,
          page,
          pageSize,
          source: source.id,
          _error: err instanceof Error ? err.message : String(err),
        } as SourceSearchResult & { _error?: string };
      })
    )
  );

  const searchResults: SourceSearchResult[] = results.map((r) => {
    if (r.status === 'fulfilled') return r.value;
    // For rejected promises, try to get the source id
    return {
      icons: [],
      total: 0,
      page,
      pageSize,
      source: 'unknown',
      _error: r.reason instanceof Error ? r.reason.message : String(r.reason),
    } as SourceSearchResult & { _error?: string };
  });

  const total = searchResults.reduce((sum, r) => sum + r.total, 0);

  return { results: searchResults, total, query: keyword };
}

/**
 * Download an icon from a specific source.
 */
export async function downloadFromSource(
  sourceId: string,
  iconId: string,
  color?: string,
  size?: number
): Promise<string> {
  const source = sources.get(sourceId);
  if (!source) {
    throw new Error(`Unknown source: "${sourceId}". Available: ${Array.from(sources.keys()).join(', ')}`);
  }
  return source.download(iconId, color, size);
}

/**
 * Get a human-readable summary of available sources.
 */
export function getSourcesSummary(): string {
  const names = Array.from(sources.keys());
  return `Available sources (${sources.size}): ${names.join(', ')}`;
}

/**
 * Get a formatted table of source info.
 */
export async function getSourcesTable(): Promise<string> {
  const infos = await getAllSourceInfos();
  const lines = [
    '┌──────────────────────────────────────────────────────────────────┐',
    '│  Source          │  Icons  │  License       │  Auth  │  Status  │',
    '├──────────────────────────────────────────────────────────────────┤',
  ];

  for (const info of infos) {
    const id = info.id.padEnd(16).slice(0, 16);
    const count = String(info.iconCount).padStart(6);
    const lic = info.license.padEnd(14).slice(0, 14);
    const auth = info.requiresAuth ? '  ✅  ' : '  ❌  ';
    const status = info.available ? '✅ up' : '❌ down';
    lines.push(`│  ${id}│ ${count} │ ${lic}│ ${auth}│ ${status}  │`);
  }

  lines.push('└──────────────────────────────────────────────────────────────────┘');
  lines.push('');
  lines.push('Official sites:');
  for (const info of infos) {
    if (info.website) lines.push(`  ${info.id.padEnd(14)} ${info.website}`);
  }
  return lines.join('\n');
}