# 工具参考（30 个）

## 多源融合（免登录）

| 工具 | 参数 | 说明 |
|------|------|------|
| `i_sources` | — | 列出所有数据源实时状态（数量/协议/可用性） |
| `i_search_all` | `keyword`, `sources?`, `page?`, `pageSize?` | 跨源搜索，默认搜全部免登录源；`sources=["lucide","tabler"]` 限定 |
| `i_download` | `source`, `id`, `color?`, `size?` | 从任意源下载；SVG 源返回文本，光栅源返回 data URI |

## 网站图标提取（免登录）

| 工具 | 参数 | 说明 |
|------|------|------|
| `i_site_icon` | `url`, `size?`, `fallback?` | 提取网站图标（favicon / apple-touch-icon / SVG logo）：解析页面声明 → 择优下载 → `/favicon.ico` → Google 服务三级兜底；SVG 返文本，位图返高清 data URI，三级兜底（页面声明 → /favicon.ico → Google 服务），并列出全部候选 |

## Logo 设计（免登录）

| 工具 | 参数 | 说明 |
|------|------|------|
| `lg_generate` | `project`, `description?`, `format?` (icon/wordmark/combination), `style?`, `colors?`, `concepts?` | 品牌级设计简报：2-6 个截然不同的创意方向（几何字标/抽象符号/吉祥物/负空间/文字标/线条系统）+ 图形模式配方（同心圆点阵/几何+线条点缀/节点网络）+ 严格 SVG 作者规范（源自 logo-designer 方法论：小尺寸可辨识、语义分组、自包含）|
| `lg_validate` | `svg`, `format?` | 品牌级校验：安全过滤、自包含检查（拒 `<image>`/外部引用）、文字回退字体、描边可辨识性（icon 格式 ≥6）、语义分组建议、viewBox 比例核对 |

## iconfont.cn（🔐 需登录）

| 工具 | 参数 | 说明 |
|------|------|------|
| `i_login` | `port?` (默认 7788) | 启动浏览器代理登录，成功后页面提示可关闭窗口 |
| `i_login_wait` | `timeout?` | 阻塞等待登录完成 |
| `i_login_with_cookie` | `cookie`, `ctoken?` | 粘贴 Cookie 登录（最稳，适合无头/CI）|
| `i_login_with_password` | `account`, `password` | 账密登录（自动填表，验证码手动滑）|
| `i_login_send_sms` → `i_login_with_sms` | `phone` → `code` | 短信登录两步 |
| `i_check_auth` | — | 查看登录状态 |
| `i_search` | `keyword`, `type?` (`icon`\|`illustration`), `page?`, `pageSize?` | 搜图标或插画 |
| `i_download_svg` | `id`, `color?`, `size?` | 下载 SVG（**必须先搜过该 ID**）；插画自动走原稿下载（不改色）|
| `i_detail` | `id` | 图标详情（来自搜索缓存）|
| `i_list_collections` | `keyword` | 搜图标库 |
| `i_list_project_icons` | `symbolUrl` | 按 Symbol JS URL 列出项目图标（免登录）|

## Lucide 兼容（免登录）

| 工具 | 参数 | 说明 |
|------|------|------|
| `l_search` | `keyword`, `page?`, `pageSize?` | 搜 Lucide 图标 |
| `l_download_svg` | `name`, `color?`, `size?` | 下载 SVG |
| `l_list_all` | `page?`, `pageSize?` | 列出全部图标 |
| `l_get_tags` | `name` | 查看图标标签 |

## 图标生成（免登录）

| 工具 | 参数 | 说明 |
|------|------|------|
| `g_generate` | `description`, `style?` (`outline`\|`fill`), `size?` | 返回生成规范（基于 Lucide 官方设计原则），AI 按规范画 SVG |
| `g_validate` | `svg`, `color?`, `size?` | 校验+净化：XML 检查、安全过滤（拒绝 `<script>`/事件属性/`<foreignObject>`/`javascript:`）、补 xmlns/viewBox、注入色/尺寸 |

## Openverse 认证（可选）

| 工具 | 参数 | 说明 |
|------|------|------|
| `ov_register` | `email`, `name?` | **一键注册**：接口创建应用 → 自动拿凭据换 token → 保存，全程免网页（验证邮件发至 email）|
| `ov_login` | `clientId`, `clientSecret` | 保存凭据，限额 20/分→100/分、200/天→10,000/天（[api.openverse.org/v1](https://api.openverse.org/v1/) 注册）|
| `ov_check_auth` | — | 查看认证状态 |

## 诊断（免登录）

| 工具 | 说明 |
|------|------|
| `i_guide` | 返回使用指南（AI 先调这个）|
| `i_version` | 版本号 + 检查更新 |
| `i_check_network` | iconfont.cn 连通性检查与排障建议 |

## id 格式速查

| 源 | id 格式 | 示例 |
|----|---------|------|
| 多数图标库 | 名称 | `home`、`arrow-right` |
| Iconify | `prefix:name` | `mdi:home`、`doodle-icons:cat` |
| Icons8 | `platform:name` | `ios7:home`、`color:rocket` |
| Commons | `File:名称.svg` | `File:Mountain Home Logo.svg` |
| Openverse / AIC / CMA | 结果中的 id | uuid 或数字 id（先搜后下）|
| iconfont | 数字 ID | `652921`（先搜后下）|
