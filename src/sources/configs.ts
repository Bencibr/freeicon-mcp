/**
 * All icon source configurations — pure data, zero logic.
 *
 * To add a new icon source: append an entry below.
 * That's it — no files, no classes, no boilerplate code.
 *
 * Each entry describes:
 *   - What the source is (name, license, website)
 *   - Where to find icons (unpkg package + SVG path)
 *   - How to get metadata (JSON file, directory listing, or none)
 *   - How to style the SVG (outline, fill, viewBox-only)
 */

import { createSource, STYLE_OUTLINE, STYLE_OUTLINE_NOSIZE, STYLE_FILL, STYLE_VIEWBOX, STYLE_BRAND, jsonDict, jsonArray, jsonBootstrap, jsonOcticons, jsonRemix } from './generic.js';
import type { SourceAdapter } from './adapter.js';

// ─── Sources ────────────────────────────────────────────────────────────────

export const SOURCES = [
  // ── Lucide (ISC, 2007 icons) ──────────────────────────────────────────
  {
    id: 'lucide',
    name: 'Lucide Icons',
    description: 'Community fork of Feather Icons',
    license: 'ISC',
    website: 'https://lucide.dev',
    package: 'lucide-static@1.27.0',
    defaultIconCount: 2007,
    svgPath: '/icons/{name}.svg',
    svgStyle: STYLE_OUTLINE,
    metadata: { type: 'json' as const, path: '/tags.json', parse: jsonDict('tags') },
  },

  // ── Tabler Icons (MIT, 5880 icons) ────────────────────────────────────
  {
    id: 'tabler',
    name: 'Tabler Icons',
    description: 'Free MIT-licensed high-quality SVG icons',
    license: 'MIT',
    website: 'https://tabler-icons.io',
    package: '@tabler/icons@3.31.0',
    defaultIconCount: 5880,
    svgPath: '/icons/outline/{name}.svg',
    svgStyle: STYLE_OUTLINE,
    metadata: { type: 'json' as const, path: '/icons.json', parse: jsonDict('tags', 'category') },
  },

  // ── Material Design Icons (Apache 2.0, 7447 icons) ────────────────────
  {
    id: 'mdi',
    name: 'Material Design Icons',
    description: 'Largest open-source icon library',
    license: 'Apache 2.0',
    website: 'https://pictogrammers.com/library/mdi/',
    package: '@mdi/svg@7.4.47',
    defaultIconCount: 7447,
    svgPath: '/svg/{name}.svg',
    svgStyle: STYLE_VIEWBOX,
    metadata: { type: 'json' as const, path: '/meta.json', parse: jsonArray('name', 'tags', 'aliases', true) },
  },

  // ── Heroicons (MIT, 972 icons, 3 styles) ──────────────────────────────
  // Uses outline style by default. Has 24/outline, 24/solid, 20/solid.
  // No metadata JSON — directory listing provides icon names.
  {
    id: 'heroicons',
    name: 'Heroicons',
    description: 'Hand-crafted SVG icons by Tailwind CSS team',
    license: 'MIT',
    website: 'https://heroicons.com',
    package: 'heroicons@2.2.0',
    defaultIconCount: 972,
    svgPath: '/24/outline/{name}.svg',
    svgStyle: STYLE_OUTLINE_NOSIZE,
    metadata: { type: 'dir' as const, path: '/24/outline/', ext: '.svg' },
  },

  // ── Bootstrap Icons (MIT, 2050 icons) ─────────────────────────────────
  {
    id: 'bootstrap',
    name: 'Bootstrap Icons',
    description: 'Official icon library for Bootstrap',
    license: 'MIT',
    website: 'https://icons.getbootstrap.com',
    package: 'bootstrap-icons@1.11.3',
    defaultIconCount: 2050,
    svgPath: '/icons/{name}.svg',
    svgStyle: STYLE_FILL,
    metadata: { type: 'json' as const, path: '/font/bootstrap-icons.json', parse: jsonBootstrap() },
  },

  // ── Simple Icons (CC0, 3247 brand icons) ──────────────────────────────
  {
    id: 'simple-icons',
    name: 'Simple Icons',
    description: 'Free SVG icons for popular brands (public domain)',
    license: 'CC0',
    website: 'https://simpleicons.org',
    package: 'simple-icons@14.0.0',
    defaultIconCount: 3247,
    svgPath: '/icons/{name}.svg',
    svgStyle: STYLE_BRAND,
    metadata: { type: 'dir' as const, path: '/icons/', ext: '.svg' },
  },

  // ── Ionicons (MIT, 1356 icons) ────────────────────────────────────────
  {
    id: 'ionicons',
    name: 'Ionicons',
    description: 'Premium open-source icons for Ionic Framework',
    license: 'MIT',
    website: 'https://ionicons.com',
    package: 'ionicons@7.4.0',
    defaultIconCount: 1356,
    svgPath: '/dist/svg/{name}.svg',
    svgStyle: STYLE_VIEWBOX,
    metadata: { type: 'dir' as const, path: '/dist/svg/', ext: '.svg' },
  },

  // ── Octicons (MIT, GitHub's icons, 24px variants) ─────────────────────
  {
    id: 'octicons',
    name: 'Octicons',
    description: 'GitHub\u2019s official icon set',
    license: 'MIT',
    website: 'https://primer.style/foundations/icons',
    package: '@primer/octicons@19.15.0',
    defaultIconCount: 644,
    svgPath: '/build/svg/{name}-24.svg',
    svgStyle: STYLE_FILL,
    metadata: { type: 'json' as const, path: '/build/data.json', parse: jsonOcticons() },
  },

  // ── Remix Icon (Apache 2.0, ~3200 icons, line+fill) ───────────────────
  // glyph.json ships the 24×24 path data for every icon, so SVGs are
  // built locally — no per-download HTTP request.
  {
    id: 'remix',
    name: 'Remix Icon',
    description: 'Neutral system icons in line & fill styles',
    license: 'Apache 2.0',
    website: 'https://remixicon.com',
    package: 'remixicon@4.6.0',
    defaultIconCount: 3200,
    svgPath: '', // unused: SVGs are built from glyph.json path data
    svgStyle: STYLE_FILL,
    metadata: { type: 'json' as const, path: '/fonts/remixicon.glyph.json', parse: jsonRemix() },
    inline: { viewBox: '0 0 24 24', fillRoot: true },
  },

  // ── Font Awesome Free (CC BY 4.0, ~2000 icons) ────────────────────────
  // Three styles live in different subdirectories; name collisions across
  // styles get a "-{style}" suffix (e.g. bell, bell-regular).
  // NOTE: CC BY 4.0 requires attribution when using the icons.
  {
    id: 'fontawesome',
    name: 'Font Awesome Free',
    description: 'The web\u2019s classic icon set (solid/regular/brands). CC BY 4.0 — attribution required',
    license: 'CC BY 4.0',
    website: 'https://fontawesome.com',
    package: '@fortawesome/fontawesome-free@7.3.1',
    defaultIconCount: 2000,
    svgPath: '/svgs/{dir}/{name}.svg',
    svgStyle: STYLE_VIEWBOX,
    metadata: {
      type: 'dir' as const,
      paths: ['/svgs/solid/', '/svgs/regular/', '/svgs/brands/'],
      ext: '.svg',
    },
  },
  // ── Iconoir (MIT, 1379 icons) ─────────────────────────────────────────
  {
    id: 'iconoir',
    name: 'Iconoir',
    description: 'Open-source icon library with clean 1.5px stroke style',
    license: 'MIT',
    website: 'https://iconoir.com',
    package: 'iconoir@7.9.0',
    defaultIconCount: 1379,
    svgPath: '/icons/regular/{name}.svg',
    svgStyle: STYLE_OUTLINE,
    metadata: { type: 'dir' as const, path: '/icons/regular/', ext: '.svg' },
  },

  // ── css.gg (MIT, 704 icons) ───────────────────────────────────────────
  {
    id: 'cssgg',
    name: 'css.gg',
    description: 'Pure CSS & SVG UI icons (astronaut/webstudio)',
    license: 'MIT',
    website: 'https://css.gg',
    package: 'css.gg@2.1.1',
    defaultIconCount: 704,
    svgPath: '/icons/svg/{name}.svg',
    svgStyle: STYLE_FILL,
    metadata: { type: 'dir' as const, path: '/icons/svg/', ext: '.svg' },
  },

  // ── Boxicons (dual-license incl. MIT, ~2000 icons) ────────────────────
  {
    id: 'boxicons',
    name: 'Boxicons',
    description: '2000+ simple icons in regular/solid/logos styles',
    license: 'MIT (dual-license)',
    website: 'https://boxicons.com',
    package: 'boxicons@2.1.4',
    defaultIconCount: 2000,
    svgPath: '/svg/{dir}/{name}.svg',
    svgStyle: STYLE_VIEWBOX,
    metadata: {
      type: 'dir' as const,
      paths: ['/svg/regular/', '/svg/solid/', '/svg/logos/'],
      ext: '.svg',
    },
  },
] as const;

// ── Instantiate ─────────────────────────────────────────────────────────────

export function createAllSources(): SourceAdapter[] {
  return SOURCES.map((cfg) => createSource(cfg as any));
}