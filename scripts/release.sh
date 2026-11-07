#!/usr/bin/env bash
#
# freeicon-mcp 发布脚本 —— 版本号自动对齐（package.json / tag / Release / banner）
#
# 用法: ./scripts/release.sh <version> ["release notes"]
# 示例: ./scripts/release.sh 0.1.2 "新增 xx 源"
#
set -euo pipefail
VER="${1:?用法: ./scripts/release.sh <version> [notes]}"
TAG="v${VER#v}"   # 兼容传入 0.1.2 或 v0.1.2
NOTES="${2:-Release $TAG}"
REPO="Bencibr/freeicon-mcp"
cd "$(dirname "$0")/.."

# ── 前置校验 ──
[ -z "$(git status --porcelain)" ] && DIRTY=0 || DIRTY=1
[ "$DIRTY" -eq 0 ] || { echo "❌ 工作区不干净，先提交/暂存改动"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "❌ gh 未登录"; exit 1; }

echo "══ 发版 $TAG ══"

# ── 1. 版本号写回 package.json ──
node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json'));p.version='${VER#v}';fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n')"

# ── 2. 构建 ──
npm run build >/dev/null

# ── 3. banner 版本号同步 ──
python3 scripts/generate_banner.py \
  --name "freeicon" --suffix "MCP" \
  --tagline "Search, download & generate icons from 19 free sources — built for AI" \
  --pills "19 Free Sources,1M+ Icons,SVG Generation,MCP Native" \
  --version-tag "$TAG · MIT" \
  --theme violet \
  --out-dir assets >/dev/null
echo "✓ banner 同步为 $TAG"

# ── 4. 提交 + tag + push ──
git add -A
git -c user.name="Ben" -c user.email="benci@oksu.club" commit -m "release: $TAG" >/dev/null
git tag "$TAG"
git push origin main "$TAG" >/dev/null
echo "✓ 已推送 main + $TAG"

# ── 5. GitHub Release（触发 workflow：npm + GitHub Packages 自动发布）──
gh release create "$TAG" --repo "$REPO" --title "$TAG" --notes "$NOTES" >/dev/null
echo "✓ Release 已创建，workflow 自动发布中（npm + GitHub Packages）"

# ── 6. npm 同步验证（官方源，容忍传播延迟）──
echo "等待 npm 生效..."
sleep 45
for i in 1 2 3 4; do
  LIVE=$(npm view freeicon-mcp version --registry=https://registry.npmjs.org 2>/dev/null || echo "")
  [ "$LIVE" = "${VER#v}" ] && { echo "✓ npm latest = $LIVE"; break; }
  echo "  retry $i/4: npm=$LIVE"; sleep 30
done
[ "$LIVE" = "${VER#v}" ] || { echo "⚠️ npm 尚未生效（传播延迟），稍后自查：npm view freeicon-mcp version"; exit 0; }
echo "════════ $TAG 发布完成 ════════"
