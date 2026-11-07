/**
 * Logo design tooling — distills the logo-designer skill's methodology
 * (MIT, local skill) into server-side spec generation and validation.
 *
 * lg_generate → complete design brief + N distinct creative directions
 * lg_validate → logo-specific SVG checks (self-contained, text fallback,
 *               legibility, semantic groups) on top of the icon security filter
 */

export type LogoFormat = 'icon' | 'wordmark' | 'combination';
export type LogoStyle = 'minimal' | 'playful' | 'bold' | 'elegant' | 'tech' | 'auto';

export interface LogoBriefInput {
  project: string;
  description?: string;
  format: LogoFormat;
  style: LogoStyle;
  colors?: string;
  concepts?: number;
}

const VIEWBOX: Record<LogoFormat, string> = {
  icon: '0 0 512 512',
  wordmark: '0 0 1024 512',
  combination: '0 0 1024 512',
};

const STYLE_NOTES: Record<LogoStyle, string> = {
  minimal: '极简/几何：干净的线与基本形，留白充分，现代感',
  playful: '活泼/手绘：友好随性，有机曲线，圆润端点',
  bold: '大胆/商务：强对比、粗笔触、专业稳重',
  elegant: '优雅/精品：细线条、衬线气质、克制配色',
  tech: '科技/未来：利落直角、双色渐层（仅在风格需要时）、负空间巧思',
  auto: '根据项目描述自行判断最贴合的风格方向，并在简报中说明理由',
};

const DIRECTIONS = [
  ['几何字标（geometric letterform）', '以品牌首字母为核心，用几何形重构字母，形意合一'],
  ['抽象符号（abstract symbol）', '不具象的品牌隐喻符号（连接/流动/生长…），配极简 wordmark'],
  ['吉祥物/具象（mascot / figurative）', '具象图形承载品牌个性，亲和力强，需在小尺寸下保持辨识'],
  ['负空间（negative space）', '在实心形体中用挖空隐藏第二层含义，回味感强'],
  ['文字标（wordmark）', '纯排版驱动：字重/字距/替换笔画细节建立独特性'],
  ['线条系统（line system）', '统一粗细的线条族构建图形（平行线/放射/网格切割），工程感强'],
];


// ── 图形模式配方（源自 op7418/logo-generator-skill 的 Common Patterns，可作概念起步骨架）──
const PATTERN_RECIPES = [
  ['同心圆点阵（Concentric Circle Dots）', '点阵绕圆心排布——适合数据/网络/社区类品牌'],
  ['几何形+线条点缀（Geometric + Line Accent）', '基本几何形配一处点/线高光——极简科技风通用骨架'],
  ['节点网络（Node Network）', '曲线连接节点圆——适合连接/流程/AI 类品牌'],
];

export function patternRecipes(): string {
  return PATTERN_RECIPES.map(([n, d]) => `   - ${n}：${d}`).join('\n');
}
/** 生成完整 logo 设计简报 + SVG 作者规范（对齐 logo-designer skill 方法论） */
export function generateLogoSpec(input: LogoBriefInput): string {
  const count = Math.min(Math.max(input.concepts ?? 3, 2), 6);
  const dirs = DIRECTIONS.slice(0, count);
  const vb = VIEWBOX[input.format];
  const colors = input.colors?.trim() || '未指定——选择贴合品牌气质的配色（给出主色 hex + 1-2 辅助色 + 中性色），并简述色彩心理依据';

  const dirsText = dirs
    .map(([name, desc], i) => `   概念 ${i + 1} — ${name}：${desc}`)
    .join('\n');

  return `# Logo 设计任务：${input.project}

你（AI）是品牌设计师。为以下项目设计 logo，产出 ${count} 个**截然不同**的创意方向——禁止同 idea 的微调变体，每个概念在图形隐喻、版式或气质上必须拉开差距。

## 设计简报
- **项目**：${input.project}
- **描述**：${input.description?.trim() || '（未提供——从项目名推断业务语境并在简报中写明你的理解）'}
- **格式**：${input.format}（viewBox="${vb}"，${input.format === 'icon' ? '方形图标，适配 favicon/应用图标/头像' : '横版，适配站点头部/文档头图'})
- **风格**：${STYLE_NOTES[input.style]}
- **色彩**：${colors}

## SVG 作者规范（逐条遵守）
1. **viewBox**：\`viewBox="${vb}"\`，**不写** width/height 属性
2. **自包含**：禁止外部字体、图片、\`<use>\` 引用；文字用系统字体栈并带 generic 回退（如 \`font-family="Helvetica, Arial, sans-serif"\`），能转 \`<path>\` 更佳（避免跨环境字体差异）
3. **语义分组**：逻辑区块包 \`<g>\` 并给描述性 id（\`id="icon"\`、\`id="wordmark"\`、\`id="tagline"\`），便于后续局部迭代
4. **默认平涂**：实心 fill；渐变仅在该风格确实需要时使用 \`<linearGradient>\`/\`<radialGradient>\`
5. **小尺寸可辨识**（favicon 16–32px 测试）：实心优先于细线；需要保留的描边 **stroke-width ≥ 6**（icon 格式）；细节在 32px 下会消失的，直接简化掉
6. **干净标记**：无多余 transform、无空组、无注释噪音
7. **安全**：最终 SVG 必须通过 lg_validate（无脚本/事件/外部引用）

## 创意方向分配
${dirsText}

## 图形模式配方（概念的可选起步骨架，可组合变形）
${patternRecipes()}

## 流程
1. 先写 2–3 句设计简报（品牌理解 + 每个概念一句话隐喻说明）；概念数 ≥4 时更佳
2. 逐个方向产出完整 SVG——从简开始，仅在需要时增加复杂度
3. 每个都调 \`lg_validate(svg=..., format="${input.format}")\` 校验，按告警迭代
4. ${input.format === 'combination' ? '另外生成 favicon 变体：从组合标的 #icon 组单独导出方形版（勿把横版整体缩进方形）' : '同时给出 16/32/64px 缩略自查说明'}
5. 全部通过后：输出概念名 + 设计说明 + SVG，并建议用户生成一个本地 preview.html（深浅色并排对比）浏览全部概念`;
}

// ── 校验 ──

export interface LogoIssue {
  level: 'error' | 'warning' | 'info';
  message: string;
}

/** 自包含 + 外部引用检查（logo 必须可离线交付） */
export function checkExternalRefs(svg: string): LogoIssue[] {
  const issues: LogoIssue[] = [];
  const lower = svg.toLowerCase();
  if (/<image[\s>]/.test(lower)) issues.push({ level: 'error', message: '<image> 元素禁止使用（logo 必须纯矢量、自包含）' });
  if (/xlink:href\s*=\s*["']?(?!#)[^"'\s>]+/i.test(svg) || /<use[^>]+href\s*=\s*["']?(?!#)[^"'\s>]+/i.test(svg)) {
    issues.push({ level: 'error', message: '检测到外部引用（<use>/<xlink> 指向文件外部资源）——logo 必须自包含' });
  }
  if (/url\(\s*['"]?https?:/i.test(svg)) issues.push({ level: 'error', message: '检测到外部 url() 引用（字体/图片）——必须内联或转 path' });
  if (/@font-face/i.test(svg)) issues.push({ level: 'warning', message: '@font-face 无法内嵌字体文件——建议将文字转为 <path>' });
  return issues;
}

/** 文字回退字体栈检查 */
export function checkTextFallback(svg: string): LogoIssue[] {
  const issues: LogoIssue[] = [];
  const texts = svg.match(/<text\b[^>]*>/gi) || [];
  for (const t of texts) {
    const ff = t.match(/font-family\s*=\s*["']?([^"'>]+)/i);
    const stack = ff?.[1] || '';
    if (!/sans-serif|serif|monospace/i.test(stack)) {
      issues.push({ level: 'warning', message: '<text> 缺少 generic 回退字体（追加 ", sans-serif" 等）——否则无字体环境下渲染异常' });
      break;
    }
  }
  if (texts.length > 0) {
    issues.push({ level: 'info', message: `包含 ${texts.length} 个 <text> 元素——正式交付建议转 <path>（消除环境字体差异）` });
  }
  return issues;
}

/** 描边宽度可辨识性（icon 格式） */
export function checkStrokeLegibility(svg: string): LogoIssue[] {
  const issues: LogoIssue[] = [];
  for (const m of svg.matchAll(/stroke-width\s*[:=]\s*["']?(\d+(?:\.\d+)?)/gi)) {
    const w = Number(m[1]);
    if (w > 0 && w < 6) {
      issues.push({ level: 'warning', message: `stroke-width="${w}" 在 16–32px 下会消失——icon 格式建议 ≥ 6，或改用实心形` });
      break;
    }
  }
  return issues;
}

/** 语义分组建议 */
export function checkSemanticGroups(svg: string, format: LogoFormat): LogoIssue[] {
  const issues: LogoIssue[] = [];
  if (format !== 'icon' && !/<g[^>]+id=/.test(svg)) {
    issues.push({ level: 'warning', message: '未使用 <g id="wordmark"/"icon"> 语义分组——分组便于后续局部迭代（改色/缩放局部）' });
  }
  return issues;
}
