/**
 * Smoke test: exercise every source adapter end-to-end.
 * Run: npx tsx src/sources/test.ts
 */
import { createAllSources } from './configs.js';
import { createIconifySource } from './iconify.js';
import { createIcons8Source } from './icons8.js';
import { createCommonsSource } from './commons.js';
import { createOpenverseSource } from './openverse.js';
import { createArticSource } from './artic.js';
import { createCmaSource } from './cma.js';

const PASS = '\x1b[32m✓\x1b[0m';
const FAIL = '\x1b[31m✗\x1b[0m';
const INFO = '\x1b[36mℹ\x1b[0m';

async function testSource(source: any, keyword: string) {
  const id = source.id;
  console.log(`\n${INFO} ${id} — getInfo()...`);
  const info = await source.getInfo();
  console.log(`  ${info.name}: ${info.iconCount} icons (${info.license})`);

  console.log(`  search("${keyword}")...`);
  const result = await source.search(keyword, 1, 3);
  console.log(`  found ${result.total}, showing ${result.icons.length}`);
  // If primary keyword finds nothing, try alternatives (sources name icons differently)
  let icons = result.icons;
  if (icons.length === 0) {
    for (const alt of ['house', 'home', 'user', 'search', 'star', 'arrow']) {
      const r2 = await source.search(alt, 1, 3);
      if (r2.icons.length > 0) {
        console.log(`  ("${keyword}" → 0, fallback "${alt}" → ${r2.total})`);
        icons = r2.icons;
        break;
      }
    }
  }
  if (icons.length === 0) {
    console.log(`  ${FAIL} ${id}: no results for any keyword`);
    return false;
  }
  const first = icons[0];
  console.log(`  first: [${first.id}] tags=${first.tags.slice(0, 3).join(',')}...`);

  console.log(`  download("${first.id}")...`);
  const out = await source.download(first.id, '#FF0000', 32);
  // Raster sources (icons8/openverse) return image data URIs instead of SVG
  const isDataUri = out.startsWith('data:image/');
  const svg = out;
  if (!svg.includes('<svg') && !isDataUri) {
    console.log(`  ${FAIL} ${id}: download returned neither SVG nor image data URI`);
    console.log(`  got: ${svg.slice(0, 200)}`);
    return false;
  }
  if (isDataUri) {
    const m = out.match(/^data:image\/([^;]+);base64,(.+)$/);
    const buf = m ? Buffer.from(m[2], 'base64') : Buffer.alloc(0);
    const magic = buf.subarray(0, 4).toString('hex');
    // PNG 89504e47 | JPEG ffd8ff | WebP RIFF container with 'WEBP' at offset 8
    const isWebp = buf.length > 12 && buf.subarray(8, 12).toString('ascii') === 'WEBP';
    const validImg = buf.length > 200 && (magic.startsWith('89504e47') || magic.startsWith('ffd8ff') || isWebp);
    console.log(`  ${validImg ? PASS : FAIL} ${id} image OK (${buf.length} bytes, ${m?.[1] ?? '?'})`);
    return validImg;
  }
  // Verify color/size applied
  const hasColor = svg.toLowerCase().includes('ff0000') || svg.toLowerCase().includes('red');
  const hasSize = svg.includes('32');
  console.log(`  svg len=${svg.length} color=${hasColor ? 'applied' : 'MISSING'} size=${hasSize ? 'applied' : 'MISSING'}`);
  if (!hasColor || !hasSize) {
    console.log(`  ${FAIL} ${id}: color or size not applied`);
    console.log(`  svg: ${svg.slice(0, 300)}`);
    return false;
  }

  console.log(`  ${PASS} ${id} OK`);
  return true;
}

async function main() {
  const sources = [...createAllSources(), createIconifySource(), createIcons8Source(), createCommonsSource(), createOpenverseSource(), createArticSource(), createCmaSource()];
  console.log(`Testing ${sources.length} sources...\n`);

  const results: Record<string, boolean> = {};
  for (const source of sources) {
    try {
      results[source.id] = await testSource(source, 'home');
    } catch (e) {
      console.log(`  ${FAIL} ${source.id} threw: ${e instanceof Error ? e.message : e}`);
      results[source.id] = false;
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('RESULTS');
  console.log('═══════════════════════════════════════════');
  let pass = 0;
  for (const [id, ok] of Object.entries(results)) {
    console.log(`  ${ok ? PASS : FAIL} ${id}`);
    if (ok) pass++;
  }
  console.log(`\n${pass}/${sources.length} sources working`);

  process.exit(pass === sources.length ? 0 : 1);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
