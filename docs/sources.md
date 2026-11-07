# 数据源列表

freeicon-mcp 集成 **19 个数据源 + iconfont.cn**，全部免 API key。**只有 iconfont.cn 需要登录**（🔐），其余 19 源即装即用。

| # | 数据源 | 数量 | 协议 | 登录 | 交付 |
|---|--------|:----:|:----:|:----:|------|
| 1 | [**Iconify**（聚合）](https://iconify.design) | 200,000+ | 各集开源协议 | — | SVG 文本 |
| 2 | [**Lucide**](https://lucide.dev) | 2,007 | ISC | — | SVG 文本 |
| 3 | [**Tabler Icons**](https://tabler-icons.io) | 4,936 | MIT | — | SVG 文本 |
| 4 | [**Material Design Icons**](https://pictogrammers.com/library/mdi/) | 7,447 | Apache 2.0 | — | SVG 文本 |
| 5 | [**Heroicons**](https://heroicons.com) | 972 | MIT | — | SVG 文本 |
| 6 | [**Bootstrap Icons**](https://icons.getbootstrap.com) | 2,050 | MIT | — | SVG 文本 |
| 7 | [**Simple Icons**](https://simpleicons.org) | 3,247 | CC0 | — | SVG 文本 |
| 8 | [**Ionicons**](https://ionicons.com) | 1,356 | MIT | — | SVG 文本 |
| 9 | [**Octicons**](https://primer.style/foundations/icons) | 644 | MIT | — | SVG 文本 |
| 10 | [**Remix Icon**](https://remixicon.com) | 3,058 | Apache 2.0 | — | SVG 文本 |
| 11 | [**Font Awesome Free**](https://fontawesome.com) | 2,883 | **CC BY 4.0** | — | SVG 文本 |
| 12 | [**Iconoir**](https://iconoir.com) | 1,379 | MIT | — | SVG 文本 |
| 13 | [**css.gg**](https://css.gg) | 704 | MIT | — | SVG 文本 |
| 14 | [**Boxicons**](https://boxicons.com) | ~2,000 | MIT（双协议） | — | SVG 文本 |
| 15 | [**Icons8**](https://icons8.com) | 100,000+ | 免费需署名 | — | **PNG** data URI |
| 16 | [**Wikimedia Commons**](https://commons.wikimedia.org) | 海量 | 逐图标注 | — | SVG 文本 |
| 17 | [**Openverse**](https://openverse.org) | 1 亿+ | 逐图标注（CC） | — | 图片 data URI |
| 18 | [**Art Institute of Chicago**](https://www.artic.edu) | 62,000+ | CC0 | — | 图片 data URI |
| 19 | [**Cleveland Museum of Art**](https://www.clevelandart.org/open-access-api) | 30,000+ | CC0 | — | 图片 data URI |
| 20 | [**iconfont.cn**](https://www.iconfont.cn) | 海量（图标+插画） | — | **🔐 需登录** | SVG 文本 |

## 各源说明

### 图标库（unpkg CDN，2–16 号）
- 统一入口：`i_search_all` / `i_download`，id 就是搜索结果里的名称（如 `home`、`arrow-right`）
- 元数据进程内缓存，首次搜索后秒级响应
- **Font Awesome Free** 为 CC BY 4.0：商用/分发需署名（"Font Awesome" + 协议链接）
- **Boxicons** 三风格合一源，重名自动加后缀（`bx-home` / `bxs-home` / `bxl-github`）

### [Iconify](https://iconify.design) — Iconify（聚合，1 号）
- 一个 id 覆盖 150+ 图标集，格式 `prefix:name`，如 `mdi:home`、`ph:house`
- 常用集合：`ph`（Phosphor）、`material-symbols`、`fluent`、`flat-color-icons`（彩色）
- 手绘/涂鸦风：`doodle-icons:*`（MIT）、`streamline-freehand:*`（CC BY 4.0，需署名）

### [Icons8](https://icons8.com) — Icons8（15 号）
- **官方 API 不提供 SVG（付费），免费档只有 PNG**，交付为 base64 data URI
- id 格式 `platform:name`，platform 决定风格：`ios7`（线性）/ `color`（彩色）/ `fluency`
- 改色仅支持 6 位 hex；免费使用需署名（图标旁加 "icon by Icons8" + 链接）
- 可设 `ICONS8_API_KEY` 环境变量提升配额（无 key 匿名搜索也可用）

### [Wikimedia Commons](https://commons.wikimedia.org) — Wikimedia Commons（16 号）
- 返回**真 SVG 文本**，可改色改尺寸
- 逐图协议/作者在结果的 `extra` 里（CC BY / CC BY-SA / PD 等），按图署名
- id 格式 `File:名称.svg`

### [Openverse](https://openverse.org) — Openverse（17 号）
- CC 图片聚合（Flickr / Wikimedia 等上百源），照片为主，位图交付 data URI
- **匿名限额 20 次/分钟 + 200 次/天**；`ov_register(email)` 一键注册或 `ov_login` 导入凭据后提升到 100/分 + 10,000/天
- 聚合索引含死链，自动缩略图↔原图回退
- 逐图协议在 `extra`（多数 CC 系列需署名）

### 博物馆开放获取（18–19 号）
- **AIC**（芝加哥美术馆）：IIIF 图片服务，`size` 参数直接控制输出宽度（100–2000px）
- **CMA**（克利夫兰美术馆）：固定 web 尺寸 JPEG
- 均为 CC0 公共领域，**署名可选**（建议注明"Art Institute of Chicago"）

### [iconfont.cn](https://www.iconfont.cn) — iconfont.cn（20 号，🔐 唯一需登录）
- 中文社区，含**图标**与**插画**两个库（`i_search` 的 `type` 参数切换）
- 插画交付**原始多色 SVG**（不改色，可设尺寸）
- 登录方式见 [guide.md](guide.md#三登录iconfont-需登录)
- ⚠️ **必须先 `i_search` 再 `i_download_svg`**（下载走搜索缓存，直接传未搜过的 ID 会报错）

## 署名速查

| 源 | 商用 | 署名要求 |
|----|------|---------|
| MIT / ISC / Apache 2.0 源（2–14 号） | ✅ | 仅需保留 LICENSE（项目级），图标本身免署名 |
| CC0（Simple Icons / AIC / CMA） | ✅ | 无 |
| Font Awesome Free | ✅ | 需署名 |
| Icons8 免费档 | ✅ | 需署名 |
| Openverse / Commons 逐图 | 视图而定 | 多数 CC 系列需署名，看每图 `extra.license` |
| iconfont.cn | 视作者设定 | 遵守图标页面的作者授权说明 |
