/**
 * Website icon (favicon) extraction.
 *
 * Parses the target page's declared icon candidates (<link rel="icon">,
 * apple-touch-icon, shortcut icon, SVG icons, …), picks the best one,
 * downloads it. Falls back to Google's public S2 favicon service when the
 * page declares nothing usable.
 *
 * SVG icons are returned as text; raster icons as base64 data URIs.
 * Many sites gate non-browser clients — a browser UA is used throughout.
 */

const UA_BROWSER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const MAX_HTML_BYTES = 800_000;
const MAX_ICON_BYTES = 5_000_000;

export interface SiteIconCandidate {
  rel: string;
  url: string;
  type?: string;
  sizes?: string;
  /** parsed max dimension from sizes attr (0 = unknown) */
  dimension: number;
  score: number;
}

/** Normalize user input into an absolute http(s) URL */
export function normalizeSiteUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  const parsed = new URL(u);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error(`Unsupported protocol: ${parsed.protocol}`);
  return parsed.href;
}

/** Extract <link> icon candidates from HTML */
function parseLinkIcons(html: string, pageUrl: string): SiteIconCandidate[] {
  const out = new Map<string, SiteIconCandidate>();
  const linkRe = /<link\b[^>]*>/gi;
  const attrRe = /\b(rel|href|type|sizes)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/gi;
  for (const tag of html.match(linkRe) || []) {
    const attrs: Record<string, string> = {};
    for (const m of tag.matchAll(attrRe)) attrs[m[1].toLowerCase()] = (m[3] ?? m[4] ?? m[5] ?? '').trim();
    const rel = (attrs.rel || '').toLowerCase();
    if (!rel || !href_ok(attrs.href)) continue;
    const isIcon = /(^|\s)(icon|shortcut\s+icon|apple-touch-icon|apple-touch-icon-precomposed)(\s|$)/.test(rel);
    if (!isIcon) continue;
    let url: string;
    try {
      url = new URL(attrs.href, pageUrl).href;
    } catch {
      continue;
    }
    const dimension = parseMaxDimension(attrs.sizes);
    const kind = rel.includes('apple-touch') ? 'apple-touch-icon' : rel.includes('shortcut') ? 'shortcut icon' : rel.includes('mask-icon') ? 'mask-icon' : 'icon';
    const isSvg = attrs.type?.includes('svg') || url.endsWith('.svg');
    const score = kind === 'mask-icon' ? -1 : isSvg ? 95 : kind === 'apple-touch-icon' ? 80 + Math.min(dimension, 512) / 10 : kind === 'icon' ? 60 + Math.min(dimension, 512) / 10 : 40;
    if (score < 0) continue; // mask-icon is a monochrome silhouette — skip
    const key = url;
    const prev = out.get(key);
    if (!prev || prev.score < score) {
      out.set(key, { rel: kind, url, type: attrs.type, sizes: attrs.sizes, dimension, score });
    }
  }
  return Array.from(out.values()).sort((a, b) => b.score - a.score);
}

function href_ok(href?: string): boolean {
  return !!href && !href.startsWith('data:') && !href.startsWith('javascript:');
}

/** "180x180 32x32" → 180 */
function parseMaxDimension(sizes?: string): number {
  if (!sizes || sizes === 'any') return sizes === 'any' ? 512 : 0;
  let max = 0;
  for (const m of sizes.matchAll(/(\d+)\s*[x×]\s*(\d+)/gi)) {
    max = Math.max(max, Number(m[1]), Number(m[2]));
  }
  return max;
}

/** 抓取页面 HTML（UA/超时/大小限制统一处理），供解析函数复用 */
export async function fetchPageHtml(pageUrl: string): Promise<string> {
  const res = await fetch(pageUrl, {
    headers: { 'User-Agent': UA_BROWSER, Accept: 'text/html,application/xhtml+xml' },
    signal: AbortSignal.timeout(20000),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`Failed to fetch page: HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('html')) throw new Error(`URL is not an HTML page (${ct || 'unknown content-type'})`);
  return (await res.text()).slice(0, MAX_HTML_BYTES);
}

/** 从页面 HTML 解析 <link> 图标声明（导出：handler 复用同一份 HTML）*/
export function parseLinkIconsFromHtml(html: string, pageUrl: string): { title?: string; candidates: SiteIconCandidate[] } {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const candidates = parseLinkIcons(html, pageUrl);
  // /favicon.ico convention fallback (deduped below if already declared)
  try {
    const convention = new URL('/favicon.ico', pageUrl).href;
    if (!candidates.some((c) => c.url === convention)) {
      candidates.push({ rel: 'icon', url: convention, type: 'image/x-icon', dimension: 0, score: 30 });
    }
  } catch { /* ignore */ }
  return { title, candidates };
}

/** Fetch page HTML and collect icon candidates (+ /favicon.ico fallback) */
export async function findSiteIcons(pageUrl: string): Promise<{ title?: string; candidates: SiteIconCandidate[] }> {
  const html = await fetchPageHtml(pageUrl);
  return parseLinkIconsFromHtml(html, pageUrl);
}

export interface FetchedIcon {
  mime: string;
  /** set for image/svg+xml */
  svgText?: string;
  /** set for raster images */
  dataUri?: string;
  bytes: number;
  url: string;
}

/** Download one candidate; SVG → text, raster → data URI */
export async function fetchIcon(candidate: SiteIconCandidate | string): Promise<FetchedIcon> {
  const url = typeof candidate === 'string' ? candidate : candidate.url;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA_BROWSER, Accept: 'image/*, image/svg+xml' },
    signal: AbortSignal.timeout(30000),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const declaredMime = (res.headers.get('content-type') || '').split(';')[0].trim();
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 100) throw new Error(`too small (${buf.length} bytes)`);
  if (buf.length > MAX_ICON_BYTES) throw new Error(`too large (${(buf.length / 1048576).toFixed(1)}MB)`);
  const isSvg = declaredMime.includes('svg') || (buf[0] === 0x3c && buf.subarray(0, 512).toString('utf8').includes('<svg'));
  if (isSvg) {
    return { mime: 'image/svg+xml', svgText: buf.toString('utf8'), bytes: buf.length, url };
  }
  const sniff = sniffMime(buf);
  const mime = sniff || (declaredMime.startsWith('image/') ? declaredMime : '');
  if (!mime) throw new Error(`not an image (${declaredMime || 'unknown'}, magic mismatch)`);
  return { mime, dataUri: `data:${mime};base64,${buf.toString('base64')}`, bytes: buf.length, url };
}

function sniffMime(buf: Buffer): string | null {
  if (buf.subarray(0, 4).toString('hex') === '89504e47') return 'image/png';
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return 'image/gif';
  if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x01 && buf[3] === 0x00) return 'image/x-icon';
  return null;
}

/** Google S2 public favicon service — last-resort fallback, always works */
export async function fetchGoogleFavicon(siteUrl: string, size: number): Promise<FetchedIcon> {
  const host = new URL(siteUrl).hostname;
  const url = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=${Math.min(Math.max(size, 32), 512)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA_BROWSER },
    signal: AbortSignal.timeout(20000),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`Google favicon service: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const mime = sniffMime(buf) || 'image/png';
  return { mime, dataUri: `data:${mime};base64,${buf.toString('base64')}`, bytes: buf.length, url };
}

// ── 内嵌 SVG Logo 提取（1:1 还原，方法论源自 illustration-calibrate skill）──

export interface InlineSvgLogo {
  index: number;
  svg: string;          // 独立可用的完整 SVG（含携带的 style/defs）
  viewBox?: string;
  bytes: number;
  classDeps: string[];  // 依赖的 CSS 类（style 已内嵌携带）
}

/** 安全清理：拒绝脚本/事件/外部图片（保留矢量内容）*/
function sanitizeSvgMarkup(markup: string): string | null {
  const lower = markup.toLowerCase();
  if (lower.includes('<script') || lower.includes('<foreignobject')) return null;
  if (/javascript:/i.test(lower)) return null;
  if (/<image[\s>]/.test(lower)) return null;
  const cleaned = markup.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  return cleaned;
}

/**
 * 从页面 HTML 提取全部内嵌 <svg> 元素，逐一还原为独立 SVG。
 * 1:1 还原要点（实测教训）：
 * - 携带页面 <style> 中该 SVG 依赖的 class 定义（否则 class="cls-x" 全部失效）
 * - 补缺失的 xmlns / xmlns:xlink
 * - 剥离 <script>/事件属性/<foreignObject>/<image>
 */
export function extractInlineSvgs(html: string): InlineSvgLogo[] {
  const out: InlineSvgLogo[] = [];
  // 页面全部 <style> 块（用于携带 class 定义）
  const pageStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const re = /<svg\b([^>]*)>((?:(?!<\/svg>)[\s\S])*)<\/svg>/gi;
  let m; let index = 0;
  while ((m = re.exec(html)) !== null) {
    index += 1;
    const attrs = m[1];
    let inner = m[2];
    const viewBox = attrs.match(/viewBox\s*=\s*["']([^"']+)["']/i)?.[1];
    const w = attrs.match(/\bwidth\s*=\s*["']([^"']+)["']/i)?.[1];
    const h = attrs.match(/\bheight\s*=\s*["']([^"']+)["']/i)?.[1];

    // 该 SVG 内部用到的 class → 从页面样式里抽取对应规则（1:1 还原样式上下文）
    const usedClasses = Array.from(inner.matchAll(/class="([^"]+)"/g))
      .flatMap((c) => c[1].split(/\s+/)).filter(Boolean);
    let styleDefs = '';
    const carried: string[] = [];
    for (const cls of usedClasses) {
      const esc = cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      for (const sm of pageStyles.matchAll(new RegExp(`[^{}\\n]*\\.${esc}\\b[^{}]*\\{[^}]*\\}`, 'g'))) {
        styleDefs += sm[0].trim() + '\n';
        carried.push(cls);
      }
    }

    // 安全清理
    inner = inner.replace(/<script[\s\S]*?<\/script>/gi, '');
    inner = inner.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '');
    inner = inner.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
    if (/<image[\s>]/i.test(inner)) continue; // 位图内嵌的跳过（要纯矢量）

    let svgAttrs = attrs;
    if (!/xmlns=/.test(svgAttrs)) svgAttrs += ' xmlns="http://www.w3.org/2000/svg"';
    if (/xlink:href/.test(inner) && !/xmlns:xlink/.test(svgAttrs)) svgAttrs += ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    const styleBlock = styleDefs ? `<defs><style>${styleDefs}</style></defs>` : '';
    const svg = `<svg ${svgAttrs}>${styleBlock}${inner}</svg>`;

    out.push({ index, svg, viewBox, bytes: svg.length, classDeps: carried });
  }
  return out;
}
