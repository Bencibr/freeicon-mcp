/**
 * SourceAdapter interface for multi-source icon fusion.
 *
 * Each data source (iconfont, lucide, tabler, etc.) implements this
 * interface to provide a uniform search/download experience.
 */

/** Unified search result item */
export interface SourceIcon {
  /** Unique identifier within this source (e.g. icon ID, icon name) */
  id: string;
  /** Display name */
  name: string;
  /** Source identifier */
  source: string;
  /** Tags / keywords */
  tags: string[];
  /** SVG content (present only if fetched) */
  svg?: string;
  /** Optional extra metadata */
  extra?: Record<string, unknown>;
}

/** Unified search result */
export interface SourceSearchResult {
  icons: SourceIcon[];
  total: number;
  page: number;
  pageSize: number;
  source: string;
}

/** Source information */
export interface SourceInfo {
  /** Short identifier, e.g. "lucide", "tabler" */
  id: string;
  /** Display name, e.g. "Lucide Icons" */
  name: string;
  /** Description */
  description: string;
  /** License */
  license: string;
  /** Approximate icon count */
  iconCount: number;
  /** Whether authentication is required */
  requiresAuth: boolean;
  /** Whether the source is available (network reachable, etc.) */
  available: boolean;
  /** URL to the source website */
  website?: string;
  /** CDN/package URL */
  packageUrl?: string;
}

/**
 * Interface that every icon source must implement.
 */
export interface SourceAdapter {
  /** Source identifier */
  readonly id: string;

  /** Get source info */
  getInfo(): Promise<SourceInfo>;

  /** Search icons by keyword */
  search(keyword: string, page?: number, pageSize?: number): Promise<SourceSearchResult>;

  /** Download an icon as SVG text */
  download(id: string, color?: string, size?: number): Promise<string>;

  /** Optional: list all icons */
  listAll?(page?: number, pageSize?: number): Promise<SourceSearchResult>;

  /** Optional: get detailed info about a specific icon */
  getDetail?(id: string): Promise<SourceIcon | null>;
}

/** Combined search result from multiple sources */
export interface MultiSourceSearchResult {
  results: SourceSearchResult[];
  total: number;
  query: string;
}