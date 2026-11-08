/**
 * Illustration scene-card drawing — 14 professional flat-illustration styles.
 *
 * Style specs are verbatim from mengto/skills (agent-skills/illustration,
 * MIT License) bundled in src/data/illustration-specs.ts. ia_generate
 * returns the selected style's full spec wrapped in a task brief;
 * ia_validate runs the security/self-contained checks on the result.
 */

import { ILLUSTRATION_SPECS } from '../data/illustration-specs.js';
import { checkExternalRefs } from './logo.js';

/** 每种风格的一句话定位（从原版 "The look in one sentence" 提炼） */
const STYLE_META: Record<string, string> = {
  'bold-pop': '粗藏青描边 + 右下阶梯式实体挤出，整组呈现厚实的波普积木块',
  'flat-with-black': '四种饱和中间色的无描边平涂 + 大块黑色（占画面 20–40%），黑色细线做细节',
  'flat': '大色块完全无描边，只用细白褶皱线交代形体——剪纸质感人物',
  'framed-panel': '淡彩卡片上的固定紫色面板 + 藏青细框，白色气泡/UI 卡/叶片破框而出',
  'grainy-gouache': '无描边渐变色块 + 向边缘变密的细颗粒噪点，热粉色粉彩底',
  'halftone-line': '暖纸底上只有黑线与黑点：灰色全靠抖动半调点阵，线条刻意留开口',
  'ink-sketch': '每个边缘都是 0.8–4.4px 变宽收尖的黑色笔触多边形，色块比笔触宽 2–3.6px',
  'isometric-mono': '等轴测（isometric）视角的单色场景，几何体块构成空间',
  'line-interior': '以室内/场景线稿呈现生活瞬间，线条叙事',
  'one-line': '单线条一笔画：一条连续线完成全部形体，极简克制',
  'outlined-cartoon': '描边卡通：明确轮廓线 + 平涂填色的经典卡通造型',
  'teal-spot': '青绿色调 + 一处点睛色块的场景插画',
  'two-colour-brush': '双色彩刷：仅两种颜色完成全部形体与阴影',
  'vintage-emblem': '复古徽章/纹章式构图，衬线气质',
};

export function listIllustrationStyles(): string {
  return Object.keys(STYLE_META)
    .map((k) => `- ${k}：${STYLE_META[k]}`)
    .join('\n');
}

export function generateIllustrationSpec(style: string, scene: string, size: number): string {
  const spec = ILLUSTRATION_SPECS[style];
  if (!spec) {
    const known = Object.keys(STYLE_META).join(', ');
    throw new Error(`未知风格 "${style}"。可用风格：${known}`);
  }
  const w = Math.min(Math.max(size ?? 480, 240), 960);
  const h = Math.round((w * 3) / 4);
  const meta = STYLE_META[style] || '';

  return `# 插画绘制任务：${scene}

**风格：${style}** —— ${meta}

## 任务卡规格
- 画布：SVG \`viewBox="0 0 ${w} ${h}"\`（${w}×${h} 卡片，宽高比 4:3），**不写** width/height 属性
- **自包含**：无外部字体/图片/引用；除该风格明确要求的元素外不加任何外链
- 主角演绎"谁在做什么"的一个瞬间，配一个核心道具（hero prop）
- 产出后必须通过 \`ia_validate\` 校验

## 该风格的完整绘制规范（逐条遵守，含色板 hex / 人物比例 / 构图 / 失败模式）

${spec}

## 流程
1. 用一句话写清：谁、在做什么、哪个道具讲故事（480px 宽下必须一眼读出的笑点/姿态）
2. 先搭比例块（frame/torso/leg/arm），渲染确认比例后再画细节
3. 画手、头部、道具细节与装饰粒子，自检规范末尾的 Failure modes 清单
4. 调 \`ia_validate(svg=...)\` 校验，按告警迭代后交付`;
}

export interface IllustrationIssue {
  level: 'error' | 'warning' | 'info';
  message: string;
}

/** 插画 SVG 校验：安全 + 自包含 + 画布 + 构图密度 */
export function checkIllustrationSvg(svg: string, size: number): { issues: IllustrationIssue[] } {
  const issues: IllustrationIssue[] = [];
  const lower = svg.toLowerCase();

  // 安全（与 icon/logo 同标准）
  if (lower.includes('<script')) issues.push({ level: 'error', message: '拒绝：<script> 不允许' });
  if (lower.includes('javascript:')) issues.push({ level: 'error', message: '拒绝：javascript: URL' });
  if (/\son\w+\s*=/i.test(svg)) issues.push({ level: 'error', message: '拒绝：事件处理器属性' });

  // 自包含（插画必须离线可用）
  issues.push(...checkExternalRefs(svg));

  // 位图嵌入拒绝（插画是矢量创作，贴 PNG 等于作弊）
  if (/<image[\s>]/.test(lower)) issues.push({ level: 'error', message: '<image> 位图嵌入不允许——插画必须纯矢量绘制' });

  // 画布核对
  const vb = svg.match(/viewBox\s*=\s*["']([\d.\s-]+)["']/i);
  if (!vb) {
    issues.push({ level: 'error', message: `缺少 viewBox——应为 "0 0 ${size} ${Math.round((size * 3) / 4)}"` });
  } else {
    const p = vb[1].trim().split(/[\s,]+/).map(Number);
    const ew = size, eh = Math.round((size * 3) / 4);
    if (p.length !== 4) issues.push({ level: 'error', message: 'viewBox 格式错误（应为 4 个数值）' });
    else if (Math.abs(p[2] - ew) > 1 || Math.abs(p[3] - eh) > 1) {
      issues.push({ level: 'warning', message: `viewBox (${p[2]}x${p[3]}) 与规格 ${ew}x${eh} 不符` });
    }
  }

  // 构图密度软提示
  const elCount = (svg.match(/<(path|circle|rect|ellipse|line|polygon|polyline)\b/gi) || []).length;
  if (elCount < 8) {
    issues.push({ level: 'info', message: `矢量元素仅 ${elCount} 个——场景插画通常 ≥12 个元素（人物/道具/装饰/地面）` });
  } else if (elCount > 400) {
    issues.push({ level: 'info', message: `矢量元素 ${elCount} 个偏多——确认每处细节在卡片尺寸下仍有意义` });
  }

  return { issues };
}
