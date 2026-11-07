import { XMLParser } from 'fast-xml-parser';
import type { SymbolIcon, SymbolParseResult } from '../types/iconfont.js';

const SVG_REGEX = /'<svg>(.+?)<\/svg>'/s;

export async function parseSymbolUrl(symbolUrl: string): Promise<SymbolParseResult> {
  const response = await fetch(symbolUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch symbol URL: ${response.status} ${response.statusText}`);
  }

  const jsContent = await response.text();
  const match = jsContent.match(SVG_REGEX);

  if (!match || !match[1]) {
    throw new Error(
      'Invalid symbol URL format. Expected a JS file containing SVG symbol data from iconfont.cn.'
    );
  }

  const svgContent = `<svg>${match[1]}</svg>`;
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    isArray: (name) => name === 'symbol' || name === 'path',
  });

  const parsed = parser.parse(svgContent);
  const symbols = parsed?.svg?.symbol ?? [];

  const icons: SymbolIcon[] = symbols.map((sym: Record<string, unknown>) => {
    const attrs = sym as Record<string, unknown>;
    const paths = (attrs.path ?? []) as Array<Record<string, string>>;

    return {
      id: String(attrs.id ?? ''),
      viewBox: String(attrs.viewBox ?? '0 0 1024 1024'),
      paths: paths.map((p) => ({
        d: p.d ?? '',
        fill: p.fill,
      })),
    };
  });

  return {
    icons,
    totalCount: icons.length,
  };
}
