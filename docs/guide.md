# freeicon-mcp 使用指南

安装、配置、登录、工作流、注意事项与故障排查。数据源详情见 [sources.md](sources.md)，工具参数见 [tools.md](tools.md)。

## 一、安装与配置

```bash
npm install -g freeicon-mcp
```

### 通用 MCP 配置（绝大多数客户端通用）

```json
{
  "mcpServers": {
    "freeicon": {
      "command": "npx",
      "args": ["-y", "freeicon-mcp"],
      "type": "stdio"
    }
  }
}
```

### 各客户端配置入口

| 客户端 | 配置方式 |
|--------|---------|
| **Claude Desktop** | `claude_desktop_config.json`（上面的通用格式） |
| **Cursor** | `~/.cursor/mcp.json`（通用格式） |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json`（通用格式） |
| **ZCode** | 项目根目录 `.mcp.json`（通用格式，本仓库自带）或全局配置 |
| **Codex CLI** | `~/.codex/config.toml`：`[mcp_servers.freeicon-mcp]` → `command = "npx"`、`args = ["-y", "freeicon-mcp"]` |
| **opencode** | `~/.config/opencode/opencode.json`：`"mcp": { "freeicon": { "command": ["freeicon-mcp"], "enabled": true, "type": "local" } }` |
| **ChatGPT 桌面端** | Settings → Connectors → 添加本地 MCP（开发者模式），命令 `npx -y freeicon-mcp` |
| **Qoder / Kimi Code / MiniMax / WorkBuddy / Trae** | 客户端设置界面的 MCP / 插件入口，命令 `npx -y freeicon-mcp` |

> 通用原则：MCP 服务器类型选 **stdio**，命令 `npx -y freeicon-mcp`（或全局安装后直接 `freeicon`）。验证：`opencode mcp list` 应显示 freeicon ✓ connected；直接命令行测试 `freeicon`（静默等待 JSON-RPC 即正常）。

## 二、登录（iconfont.cn 🔐 唯一需登录）

iconfont 登录走阿里账号风控，**必须在真实浏览器里完成**。推荐方式：

### ① 浏览器代理登录（推荐）
AI 调 `i_login` → 自动弹出浏览器（或手动打开 `http://localhost:7788`）→ 正常登录（扫码/账密/短信/GitHub/微博）→ cookie 自动捕获保存 → 页面显示 **"✅ 登录成功，可以关闭此窗口"** → 服务自动关闭。然后 `i_login_wait`（或 `i_check_auth`）确认。

> 登录成功后刷新该窗口显示"无法连接/拒绝访问"属正常现象——服务已完成使命自动关闭。

也可以命令行直接起：`npm run login`（默认端口 7788）。

### ② 粘贴 Cookie（最稳，适合无头/CI）
浏览器 DevTools → Network → 任一 iconfont 请求 → 复制 `cookie:` 整行 → `i_login_with_cookie`。会**先验证后保存**，无效 cookie 不影响现有登录态。

### ③ 账密 / ④ 短信
`i_login_with_password`、`i_login_send_sms` + `i_login_with_sms`。可能触发滑块，手动完成即可。

cookie 保存在 `~/.freeicon/cookies.json`（约 30 天有效，失效自动提示重登）。浏览器持久化配置在 `~/.freeicon/browser-profile`。

## 三、核心工作流

### A. 多源融合（免登录，默认推荐）
```
i_search_all(keyword="home")                          → 跨 19 源搜索
i_download(source="tabler", id="home", color="#3B82F6", size=32)
i_search_all(keyword="arrow", sources=["lucide","tabler"])   # 限定源
```

### B. iconfont 图标（需登录）
```
i_login → i_search(keyword="home") → i_download_svg(id, color?, size?)
```
> ⚠️ 必须先 `i_search` 再 `i_download_svg` / `i_detail`（下载走搜索缓存，直接传未搜过的 ID 报 `not in search cache`）。

### C. iconfont 插画（需登录）
```
i_search(keyword="雪人", type="illustration") → i_download_svg(id, size?)
```
多色原始 SVG，**不应用改色**（保护原稿），可设尺寸。

### D. 图标生成（免登录，搜不到时）
```
g_generate(description="向右下分支的流程箭头")   # 拿生成规范（Lucide 设计原则）
# …AI 按规范画 SVG…
g_validate(svg="<svg…>", color="#333", size=32) # 校验净化后交付
```
`i_search_all` 全部无结果时会自动提示走这条流程。

### E. Openverse 提额（可选，一键注册）
```
ov_register(email="you@example.com")   # 接口自动注册应用+保存凭据，一条命令完成
ov_login(clientId, clientSecret)       # 已有凭据时用这个
```
注册走公开接口（匿名可创建应用），验证邮件发至所填邮箱。
匿名 20/分+200/天 → 认证 100/分+10,000/天。凭据存 `~/.freeicon/openverse.json`，token 自动续期；也支持环境变量 `OPENVERSE_CLIENT_ID` / `OPENVERSE_CLIENT_SECRET`。

### F. 品牌 Logo 设计（免登录）
```
lg_generate(project="freeicon", description="AI 图标素材 MCP", style="tech", concepts=6)
# AI 按 6 个方向各画一版（几何字标/抽象符号/吉祥物/负空间/文字标/线条系统）
lg_validate(svg=..., format="combination")   # 品牌级校验，按告警迭代
```
规范源自 logo-designer 方法论：favicon 16–32px 可辨识测试、语义分组、自包含；combination 格式会提示从 `#icon` 组导出方形 favicon 变体。

### G. 网站图标提取（免登录）
```
i_site_icon(url="apple.com")        # 解析页面 favicon/apple-touch-icon/SVG logo
i_site_icon(url="x.com", fallback="google")   # 直接走 Google 服务
```
三级兜底；SVG 返文本（可再进 `g_validate` 改色），位图返高清 data URI；结果附全部候选清单。

### 下载结果怎么用
SVG 文本 / data URI 直接让 AI 写入文件即可：
```
把 SVG 存到 ./icons/home.svg
把 data URI 解码存成 ./assets/photo.jpg
```

## 四、使用须知

1. **登录范围**：只有 iconfont.cn 的功能工具需要登录；其余 19 源与生成工具全部免登录免 key
2. **iconfont 先搜后下**：`i_download_svg` / `i_detail` 必须先用 `i_search` 搜到该 ID
3. **登录有效期**：主会话 cookie 约 30 天；失效后功能工具返回"会话过期"，重新 `i_login` 即可
4. **iconfont 不再下发 ctoken 的兼容已处理**；搜索接口是 POST（本服务已适配）
5. **PNG 下载已移除**（iconfont 下线了该端点），只保留 SVG
6. **署名义务**：Font Awesome Free、Icons8 免费档需署名；Openverse/Commons 逐图查看协议（详见 [sources.md](sources.md#署名速查)）
7. **光栅源**（Icons8/Openverse/AIC/CMA）交付 base64 data URI，改色不适用
8. **插画**（iconfont）为多色原稿，下载时不应用改色，可设尺寸
9. **Logo 交付**：`lg_validate` 通过后建议将文字转 `<path>`（消除环境字体差异），并自测 16/32px 缩略可辨识性
10. **网站图标**：解析依赖页面 `<link>` 声明质量，声明缺失时自动走 Google 兜底服务

## 五、故障排查

| 现象 | 原因 / 解决 |
|------|------|
| `Not logged in` | 调 `i_login` 重新登录 |
| `Session expired` / 返回 HTML | cookie 失效，重新登录（客户端会自动清理失效 cookie）|
| `not in search cache` | 先 `i_search`，再用返回的 ID |
| 登录成功后窗口"拒绝访问" | 正常现象，服务已自动关闭；重新登录前先 `i_check_auth` 确认 |
| `i_check_auth` 说已登录但工具报过期 | cookie 部分失效，重新 `i_login` |
| opencode 改了配置不生效 | 重启 opencode（会全新 spawn MCP 进程）|
| Openverse 报限流 | 匿名档 20/分+200/天；`ov_login` 或稍等几分钟 |
| AIC 偶发 403 | 上游限流，已内置退避重试；持续失败稍后再试 |

## 六、开发

```bash
npm run dev      # tsx 直接跑 src/index.ts（调试用）
npm run build    # 编译到 dist/
npm run login    # 单独跑登录代理
npx tsx src/sources/test.ts   # 全源冒烟测试
```

源码结构：
```
src/
  index.ts              # MCP 入口，注册 30 个工具
  login-server.ts       # 反向代理登录服务（抓 cookie）
  api/                  # iconfont 接口（搜索/详情/下载/插画/图标库）
  sources/
    configs.ts          # unpkg 源配置（纯数据，加新源只需加一条）
    generic.ts          # 通用适配器引擎
    iconify.ts / icons8.ts / commons.ts / openverse.ts / artic.ts / cma.ts
    registry.ts         # 源注册表
    test.ts             # 全源冒烟测试
  auth/                 # iconfont 登录 + Openverse 认证
  utils/network.ts      # 网络/版本检查
```
