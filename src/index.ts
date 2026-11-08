#!/usr/bin/env node

import { spawn, type ChildProcess } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  loginWithCookie,
  loginWithPassword,
  startSmsLogin,
  completeSmsLogin,
} from './auth/login.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGIN_SERVER_JS = path.join(__dirname, 'login-server.js');

// 登录代理子进程状态
interface LoginServer {
  child: ChildProcess;
  port: number;
  done: Promise<{ success: boolean; message: string }>;
}
let loginServer: LoginServer | null = null;

function startLoginServer(port: number): LoginServer {
  if (loginServer) return loginServer;
  const child = spawn(
    process.execPath,
    [LOGIN_SERVER_JS, `--port=${port}`],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let settled = false;
  let out = '';
  let resolveDone!: (r: { success: boolean; message: string }) => void;
  const done = new Promise<{ success: boolean; message: string }>((res) => {
    resolveDone = res;
  });
  const finish = (r: { success: boolean; message: string }) => {
    if (settled) return;
    settled = true;
    resolveDone(r);
  };
  child.stdout?.on('data', (d: Buffer) => {
    out += d.toString();
    if (out.includes('✅')) {
      // 捕获到登录成功
      finish({ success: true, message: '登录成功，cookie 已自动保存。' });
    }
  });
  child.on('exit', (code) => {
    finish({
      success: code === 0,
      message:
        code === 0
          ? '登录服务已结束。'
          : `登录服务退出（代码 ${code}）。`,
    });
  });
  child.on('error', (e) =>
    finish({ success: false, message: `启动登录服务失败：${e.message}` })
  );
  loginServer = { child, port, done };
  return loginServer;
}

function stopLoginServer(): void {
  if (!loginServer) return;
  try {
    loginServer.child.kill();
  } catch {
    // ignore
  }
  loginServer = null;
}
import { isCookieStoreValid } from './auth/cookie-store.js';
import { searchIcons, getCachedIcon } from './api/search.js';
import { getIconDetail } from './api/detail.js';
import { downloadSvg } from './api/download.js';
import { searchCollections } from './api/collections.js';
import { parseSymbolUrl } from './parser/symbol-parser.js';
import { searchIllustrations, downloadIllustration, getCachedIllustration } from './api/illustration.js';
import { parseLinkIconsFromHtml, fetchIcon, fetchGoogleFavicon, normalizeSiteUrl, extractInlineSvgs, fetchPageHtml } from './utils/site-icon.js';
import type { SiteIconCandidate, InlineSvgLogo } from './utils/site-icon.js';
import { generateLogoSpec, checkExternalRefs, checkTextFallback, checkStrokeLegibility, checkSemanticGroups } from './utils/logo.js';
import type { LogoFormat } from './utils/logo.js';
import { listIllustrationStyles, generateIllustrationSpec, checkIllustrationSvg } from './utils/illustration.js';
import { apiRequest } from './api/client.js';
import { AuthError } from './types/iconfont.js';
import { checkIconfontReachable, getPackageVersion, getLatestVersion } from './utils/network.js';
import { createAllSources } from './sources/configs.js';
import { createIconifySource } from './sources/iconify.js';
import { createIcons8Source } from './sources/icons8.js';
import { createCommonsSource } from './sources/commons.js';
import { createOpenverseSource } from './sources/openverse.js';
import { createArticSource } from './sources/artic.js';
import { createCmaSource } from './sources/cma.js';
import { exchangeCredentials, saveCredentials, clearCredentials, hasCredentials } from './auth/openverse-auth.js';
import { styleSvg } from './sources/generic.js';
import { XMLValidator } from 'fast-xml-parser';
import {
  registerSource,
  getSource,
  listSources,
  searchAll,
  downloadFromSource,
  getSourcesSummary,
  getSourcesTable,
} from './sources/registry.js';

const server = new McpServer({
  name: 'freeicon',
  version: getPackageVersion(),
});

function handleToolError(err: unknown): string {
  if (err instanceof AuthError) {
    return `Authentication required: ${err.message}`;
  }
  return `Error: ${err instanceof Error ? err.message : String(err)}`;
}

function requireAuth(): string | null {
  if (!isCookieStoreValid()) {
    return 'Not logged in. Please call i_login first.';
  }
  return null;
}

const GUIDE_TEXT = `# freeicon-mcp — AI 图标与素材工作站

**这个 MCP 能做什么**：让 AI 从 **19 个免费素材源**（合计百万级图标 + 1 亿+ CC 图片/艺术品）搜索并下载素材，覆盖 UI 图标、多色插画、品牌 logo、照片、艺术品；适配 Claude、Cursor、Codex、ChatGPT、Windsurf、Qoder、Kimi Code、MiniMax、ZCode、WorkBuddy、opencode 等主流客户端；搜不到时还能按规范**生成自定义 SVG 图标**并校验净化，支持**品牌 Logo 设计**（\`lg_generate\` 多方向创意简报 + \`lg_validate\` 品牌级校验）与**网站图标提取**（\`i_site_icon\`，favicon/apple-touch/内嵌 SVG Logo 三层提取，1:1 矢量还原）。产出为可直接写入文件的 SVG 文本或图片 data URI，支持改色和任意尺寸。

## 场景速查（我要找 X）
| 需求 | 做法 |
|------|------|
| UI 小图标（首页/箭头/设置…） | \`i_search_all(keyword)\` → \`i_download(source, id, color?, size?)\` |
| 品牌/logo（GitHub/微信/Netflix…） | \`i_download(source="simple-icons", id="github")\` |
| 多色插画/插图 | \`i_search(keyword, type="illustration")\`（iconfont）或 AIC/CMA 艺术插画 |
| 照片素材 | \`i_search_all\` → openverse 结果，或 \`i_download(source="openverse", id)\` |
| 手绘/涂鸦风 | iconify 源的 \`doodle-icons:* / streamline-freehand:* / flat-color-icons:*\` |
| 经典图标库（Font Awesome 等） | \`i_download(source="fontawesome", id="bell")\` |
| 公共领域高清艺术品 | AIC（IIIF 任意宽度）/ CMA |
| 网站 favicon / logo | \`i_site_icon(url="apple.com")\` — 解析页面图标声明，SVG/位图智能交付 |
| 项目 logo / 品牌标识 | \`lg_generate(project="freeicon", style="tech")\` — N 个截然不同的创意方向 + 品牌级校验 |
| 场景插画配图 | \`ia_generate(scene="设计师展示线框图", style="flat")\` — 14 种专业风格，480×360 场景卡 |
| 全都搜不到 → 生成 | \`g_generate(description)\` → AI 画 → \`g_validate(svg)\` |
| iconfont 项目图标清单 | \`i_list_project_icons(symbolUrl)\` |

## 数据源（19 个，除 iconfont 外全部免登录）
| 数据源 | 数量 | 协议 | 说明 |
|--------|:----:|:----:|:----|
| **Iconify** | 200000+ | 各集开源 | 聚合 150+ 图标集；id 格式 \`prefix:name\`（如 \`mdi:home\`）|
| **Lucide** | 2007 | ISC | 描边风格（默认源之一）|
| **Tabler** | 4936 | MIT | outline+filled |
| **MDI** | 7447 | Apache 2.0 | 最大开源图标库 |
| **Heroicons** | 972 | MIT | Tailwind 团队 |
| **Bootstrap** | 2050 | MIT | Bootstrap 官方 |
| **Simple Icons** | 3247 | CC0 | **品牌 logo 专用** |
| **Ionicons** | 1356 | MIT | Ionic 风格 |
| **Octicons** | 644 | MIT | GitHub 官方 |
| **Remix** | 3200 | Apache 2.0 | line/fill 双风格 |
| **Font Awesome** | 2883 | CC BY 4.0 | 经典（**需署名**）|
| **Iconoir** | 1379 | MIT | 1.5px 细描边 |
| **css.gg** | 704 | MIT | 极简几何 |
| **Boxicons** | 2000 | MIT 双协议 | regular/solid/logos |
| **Icons8** | 100000+ | 免费需署名 | **仅 PNG**（data URI）；id 格式 \`platform:name\` |
| **Commons** | 海量 | 逐图标注 | Wikimedia；真 SVG 文本；id 格式 \`File:x.svg\` |
| **Openverse** | 1 亿+ | 逐图标注 | CC 图片聚合（照片为主）；data URI；20/分（ov_login 后 100/分）|
| **AIC** | 62000+ | CC0 | 芝加哥美术馆；艺术插画；IIIF 任意宽度 |
| **CMA** | 30000+ | CC0 | 克利夫兰美术馆 |
| **iconfont.cn** | 海量 | — | 中文社区，图标 + **插画**（插画是原始 SVG）；**唯一需登录** |

## 关键规则
1. **图标类源**：\`i_search_all\` / \`i_download\` 统一入口；id 直接抄搜索结果
2. **iconfont 特殊**：功能工具需先 \`i_login\`；**必须先搜后下**（\`i_search\` → \`i_download_svg(id)\`，ID 未搜过会报错）；插画用 \`type="illustration"\`，多色原稿不改色
3. **光栅源**（icons8/openverse/artic/cma）交付 base64 data URI，解码存 .png/.jpg/.webp；改色不适用
4. **改色**：图标 SVG 用 \`color="#RRGGBB"\`；硬编码色值的插画/照片不可改色
5. 各源协议不同：商用注意 Font Awesome（署名）、Icons8（署名）、Openverse/Commons（看逐图协议，多要求署名）；CC0/MIT/Apache 免署名

## 工作流
\`\`\`
# ① 通用（免登录）
i_search_all(keyword="home")                                   # 跨 19 源
i_download(source="tabler", id="home", color="#3B82F6", size=32)
i_search_all(keyword="arrow", sources=["lucide","tabler"])     # 限定源

# ② iconfont 图标 + 插画（需登录）
i_login                                    # 浏览器登录，cookie 自动保存
i_search(keyword="home")                   → i_download_svg(id, color?, size?)
i_search(keyword="雪人", type="illustration") → i_download_svg(id, size?)  # 多色原稿

# ③ 图标生成（搜不到时）
g_generate(description="向右下分支的流程箭头")   # 拿生成规范（Lucide 官方设计原则）
# …AI 按规范画 SVG…
g_validate(svg="<svg…>", color="#333", size=32) # 校验净化后交付

# ④ Openverse 提额（可选，一键注册）
ov_register(email="you@example.com")       # 接口自动注册+保存凭据，20/分→100/分
ov_login(clientId, clientSecret)           # 已有凭据时用这个
\`\`\`

## 工具一览（32 个）
- **多源融合**：\`i_sources\`（源状态表）、\`i_search_all\`、\`i_download\`
- **网站图标**：\`i_site_icon\`（favicon / apple-touch-icon / SVG logo 提取）
- **iconfont**：\`i_login\`/\`i_login_wait\`/\`i_login_with_cookie\`/\`i_login_with_password\`/\`i_login_send_sms\`/\`i_login_with_sms\`/\`i_check_auth\`、\`i_search\`（icon/illustration）、\`i_download_svg\`、\`i_detail\`、\`i_list_collections\`、\`i_list_project_icons\`
- **Lucide 兼容**：\`l_search\`、\`l_download_svg\`、\`l_list_all\`、\`l_get_tags\`
- **生成**：\`g_generate\`、\`g_validate\`
- **Openverse 认证**：\`ov_register\`（一键注册）、\`ov_login\`、\`ov_check_auth\`
- **诊断**：\`i_guide\`、\`i_version\`、\`i_check_network\`

## 架构
插件化设计：unpkg 源是一份纯数据配置（\\\`src/sources/configs.ts\\\`），API 源各有小适配器（iconify/icons8/commons/openverse/artic/cma），通用引擎处理搜索/下载/改色/尺寸。加新源 = 一份配置或一个小适配器。
`;

server.tool(
  'i_guide',
  'Return the usage guide for this freeicon MCP (tool list, login flow, search→download workflow, key rules). Call this first if unsure how to use the tools. No login required.',
  {},
  async () => ({
    content: [{ type: 'text' as const, text: GUIDE_TEXT }],
  })
);

server.tool(
  'i_version',
  'Return the current version of this freeicon MCP server and check if a newer version is available on GitHub.',
  {},
  async () => {
    const current = getPackageVersion();
    let lines = [`freeicon MCP Server v${current}`];

    try {
      const latest = await getLatestVersion();
      if (latest) {
        if (latest === current) {
          lines.push('✅ 已是最新版本。');
        } else {
          lines.push(`⚠️  有新版本可用：v${latest}（当前：v${current}）`);
          lines.push(`   更新：npm install -g freeicon-mcp@latest`);
        }
      }
    } catch {
      // 忽略版本检查失败
    }

    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
    };
  }
);

server.tool(
  'i_check_network',
  'Check if iconfont.cn is reachable from this machine. Tests DNS resolution and TCP connectivity. If unreachable, provides troubleshooting steps (DNS change, hosts file, VPN).',
  {},
  async () => {
    const result = await checkIconfontReachable();
    const lines = [result.message];
    if (result.detail) {
      lines.push('', '💡 建议：', result.detail);
    }
    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
    };
  }
);

server.tool(
  'i_login',
  'Start a local reverse-proxy login server for iconfont.cn and return its URL. Open the URL in your normal browser and log in (any method: phone+password, WeChat scan, GitHub, Weibo, SMS, etc.). After success the page shows a "登录成功" notice and the user can close the tab (the proxy serves it for a few seconds, then shuts itself down; a later "connection refused" on that tab is normal). Cookies are captured automatically. Then call i_login_wait (or i_check_auth) to confirm. This is the recommended login method.',
  {
    port: z
      .number()
      .optional()
      .default(7788)
      .describe('Port for the local login server (default 7788)'),
  },
  async ({ port }) => {
    if (isCookieStoreValid()) {
      return {
        content: [
          { type: 'text' as const, text: 'Already logged in. Cookie is still valid.' },
        ],
      };
    }

    // 先检查网络可达性
    const netCheck = await checkIconfontReachable();
    if (!netCheck.reachable) {
      const lines = [
        '❌ 无法连接到 iconfont.cn，登录无法进行。',
        '',
        `原因：${netCheck.message}`,
      ];
      if (netCheck.detail) {
        lines.push('', '💡 建议：', netCheck.detail);
      }
      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    }

    const srv = startLoginServer(port);
    return {
      content: [
        {
          type: 'text' as const,
          text:
            `i_Login server started. Open http://localhost:${srv.port} in your browser and log in to iconfont.cn.\n` +
            'Cookies are captured automatically and the server closes itself once login succeeds.\n' +
            'Call i_login_wait to block until done (or i_check_auth to verify).',
        },
      ],
    };
  }
);

server.tool(
  'i_login_wait',
  'Block until the login server (started by login) reports a successful login, then shut it down. Returns the captured login info.',
  {
    timeout: z
      .number()
      .optional()
      .default(300000)
      .describe('Max wait in milliseconds (default 300000 = 5 min)'),
  },
  async ({ timeout }) => {
    const srv = loginServer;
    if (!srv) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'No login server running. Call i_login first.',
          },
        ],
      };
    }
    let timer: NodeJS.Timeout | undefined;
    const timeoutP = new Promise<{ success: boolean; message: string }>((res) => {
      timer = setTimeout(
        () => res({ success: false, message: 'Timed out waiting for i_login.' }),
        timeout
      );
    });
    const result = await Promise.race([srv.done, timeoutP]);
    if (timer) clearTimeout(timer);
    if (result.success) {
      // 给浏览器留 10 秒落地"登录成功"页/横幅，再关服务
      await new Promise((r) => setTimeout(r, 10000));
    }
    stopLoginServer();
    return {
      content: [{ type: 'text' as const, text: result.message }],
    };
  }
);

server.tool(
  'i_login_with_cookie',
  'Log in to iconfont.cn by pasting a raw Cookie header copied from a logged-in browser session (e.g. browser DevTools > Network > Request Headers > cookie). This is the MOST reliable method and works in headless/CI environments. The cookie string must include the "ctoken" entry (or pass ctoken separately).',
  {
    cookie: z
      .string()
      .describe(
        'Raw Cookie header, e.g. "ctoken=abc123; ECS=xxx; cna=yyy; ...". Copy it from a logged-in browser.'
      ),
    ctoken: z
      .string()
      .optional()
      .describe(
        'Optional ctoken value. If omitted, it is read from the "ctoken" entry in the cookie string.'
      ),
  },
  async ({ cookie, ctoken }) => {
    const result = await loginWithCookie(cookie, ctoken);
    return {
      content: [{ type: 'text' as const, text: result.message }],
    };
  }
);

server.tool(
  'i_login_with_password',
  'Log in to iconfont.cn with a phone number + password. Opens a visible browser and auto-fills the form. If a slider/captcha appears, solve it in the window — cookies are captured automatically once login completes.',
  {
    account: z
      .string()
      .describe('Phone number or account used to log in to iconfont.cn'),
    password: z.string().describe('Account password'),
  },
  async ({ account, password }) => {
    const result = await loginWithPassword(account, password);
    return {
      content: [{ type: 'text' as const, text: result.message }],
    };
  }
);

server.tool(
  'i_login_send_sms',
  'Step 1 of SMS login. Opens a browser, fills the phone number and requests a verification code. Then call i_login_with_sms with the received code within 3 minutes.',
  {
    phone: z.string().describe('Phone number to receive the SMS code on'),
  },
  async ({ phone }) => {
    const result = await startSmsLogin(phone);
    return {
      content: [{ type: 'text' as const, text: result.message }],
    };
  }
);

server.tool(
  'i_login_with_sms',
  'Step 2 of SMS login. Submit the SMS verification code received after calling login_send_sms. Cookies are captured automatically once login completes.',
  {
    code: z.string().describe('SMS verification code received on the phone'),
  },
  async ({ code }) => {
    const result = await completeSmsLogin(code);
    return {
      content: [{ type: 'text' as const, text: result.message }],
    };
  }
);

server.tool(
  'i_check_auth',
  'Check if you are currently logged in to iconfont.cn.',
  {},
  async () => {
    if (isCookieStoreValid()) {
      try {
        // pubinfo.json 是可靠的会话指示器（登录代理同样用它确认登录）
        const info = await apiRequest<{ data?: { user?: { id: number; nickname: string } | null } }>(
          '/api/pubinfo.json'
        );
        const user = info.data?.user;
        if (user) {
          return {
            content: [
              {
                type: 'text' as const,
                text: `Logged in as: ${user.nickname} (ID: ${user.id})`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Cookie exists but iconfont reports no active user. Call i_login to log in again.',
            },
          ],
        };
      } catch (err) {
        return {
          content: [{ type: 'text' as const, text: handleToolError(err) }],
        };
      }
    }
    return {
      content: [
        {
          type: 'text' as const,
          text: 'Not logged in. Call i_login to open the login page.',
        },
      ],
    };
  }
);

server.tool(
  'i_search',
  'Search icons OR illustrations (插画) on iconfont.cn by keyword. Set type="illustration" for multi-color artwork (returns original SVG downloadable via i_download_svg, no color override). Icons must be downloaded via i_download_svg with a recent search.',
  {
    keyword: z.string().describe('Search keyword, e.g. "home", "arrow", "雪人"'),
    type: z.enum(['icon', 'illustration']).optional().default('icon').describe('Content type: "icon" (default, single-color icons) or "illustration" (multi-color 插画 artwork)'),
    page: z.number().optional().default(1).describe('Page number (default: 1)'),
    pageSize: z.number().optional().default(20).describe('Results per page (default: 20, max: 100)'),
  },
  async ({ keyword, type, page, pageSize }) => {
    const authError = requireAuth();
    if (authError) {
      return { content: [{ type: 'text' as const, text: authError }] };
    }

    try {
      if (type === 'illustration') {
        const result = await searchIllustrations(keyword, page, Math.min(pageSize, 100));
        const lines = [
          `Found ${result.total} illustrations for "${keyword}" (page ${page}):`,
          '',
          ...result.illustrations.map((i) =>
            `[ID: ${i.id}] ${i.name} (${i.width}×${i.height}${i.ext ? ` ${i.ext}` : ''})`
          ),
          '',
          'Download: i_download_svg(id=...) — returns the original multi-color SVG (color override not applied to illustrations).',
        ];
        if (result.total > page * pageSize) {
          lines.push('', `More results available. Use page=${page + 1} to see more.`);
        }
        return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
      }

      const result = await searchIcons(keyword, page, Math.min(pageSize, 100));
      const lines = [
        `Found ${result.total} icons for "${keyword}" (page ${page}):`,
        '',
        ...result.icons.map((icon) =>
          `[ID: ${icon.id}] ${icon.name}` +
          (icon.font_class ? ` (${icon.font_class})` : '') +
          (icon.fills ? ` | multi-color` : '')
        ),
      ];

      if (result.total > page * pageSize) {
        lines.push('', `More results available. Use page=${page + 1} to see more.`);
      }

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text' as const, text: handleToolError(err) }],
      };
    }
  }
);

server.tool(
  'i_detail',
  'Get detailed information about an icon on iconfont.cn. The icon MUST have been returned by a recent search call (iconfont no longer has a per-icon detail endpoint; data comes from the search cache).',
  {
    id: z.number().describe('Icon ID returned by search'),
  },
  async ({ id }) => {
    const authError = requireAuth();
    if (authError) {
      return { content: [{ type: 'text' as const, text: authError }] };
    }

    try {
      const icon = await getIconDetail(id);
      const lines = [
        `Icon: ${icon.name}`,
        `ID: ${icon.id}`,
        `Unicode: ${icon.unicode}`,
        `Designer: ${icon.designer}`,
        `Categories: ${icon.categories.join(', ') || 'N/A'}`,
        `Tags: ${icon.tags.join(', ') || 'N/A'}`,
        `Downloads: ${icon.download_count}`,
        `Collected: ${icon.collection_count} times`,
        '',
        'SVG Path:',
        icon.svg_path,
      ];

      if (icon.show_svg) {
        lines.push('', 'Full SVG:', icon.show_svg);
      }

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text' as const, text: handleToolError(err) }],
      };
    }
  }
);

server.tool(
  'i_download_svg',
  'Download an icon as SVG text from iconfont.cn. The icon MUST have been returned by a recent search call (iconfont no longer has a per-icon detail endpoint, so the SVG is taken from the search cache). Pass an ID returned by search. Optional color overrides fills. Optional size overrides width/height.',
  {
    id: z.number().describe('Icon ID returned by search'),
    color: z.string().optional().describe('Fill color, e.g. "#333333" or "red". Default: original colors'),
    size: z.number().optional().describe('Output size in px, e.g. 32. Overrides both width and height. Default: original size'),
  },
  async ({ id, color, size }) => {
    const authError = requireAuth();
    if (authError) {
      return { content: [{ type: 'text' as const, text: authError }] };
    }

    try {
      // Illustrations (from i_search type="illustration") live in their own cache
      if (!getCachedIcon(id) && getCachedIllustration(id)) {
        const svg = await downloadIllustration(id, size);
        return {
          content: [{
            type: 'text' as const,
            text: svg + '\n\nℹ️ Multi-color illustration: color override not applied (original artwork preserved).',
          }],
        };
      }
      const svg = await downloadSvg(id, color, size);
      return {
        content: [{ type: 'text' as const, text: svg }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text' as const, text: handleToolError(err) }],
      };
    }
  }
);

server.tool(
  'i_list_project_icons',
  'List all icons in an iconfont.cn project by its Symbol URL. No login required.',
  {
    symbolUrl: z
      .string()
      .describe(
        'The CDN Symbol JS URL from iconfont.cn project, e.g. "https://at.alicdn.com/t/c/font_1234567_abc123.js"'
      ),
  },
  async ({ symbolUrl }) => {
    try {
      const result = await parseSymbolUrl(symbolUrl);
      const lines = [
        `Project contains ${result.totalCount} icons:`,
        '',
        ...result.icons.map(
          (icon) =>
            `${icon.id} (viewBox: ${icon.viewBox}, paths: ${icon.paths.length})`
        ),
      ];

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text' as const, text: handleToolError(err) }],
      };
    }
  }
);

server.tool(
  'i_list_collections',
  'Search icon collections on iconfont.cn.',
  {
    keyword: z.string().describe('Search keyword for collections'),
  },
  async ({ keyword }) => {
    const authError = requireAuth();
    if (authError) {
      return { content: [{ type: 'text' as const, text: authError }] };
    }

    try {
      const result = await searchCollections(keyword);
      const lines = [
        `Found ${result.total} collections for "${keyword}":`,
        '',
        ...result.collections.map(
          (col) =>
            `[ID: ${col.id}] ${col.name}` +
            (col.User?.nickname ? ` by ${col.User.nickname}` : '') +
            ` | ${col.icons_count ?? col.all_count ?? 0} icons`
        ),
      ];

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text' as const, text: handleToolError(err) }],
      };
    }
  }
);

// ============================================================
// Lucide tools (legacy wrappers, delegate to registry)
// ============================================================

server.tool(
  'l_search',
  '[Lucide] Search lucide icons by keyword (open source, no login). Lucide is a community fork of Feather Icons with 2007+ clean outline icons. For multi-source search, use i_search_all instead.',
  {
    keyword: z.string().describe('Search keyword, e.g. "home", "arrow", "user"'),
    page: z.number().optional().default(1).describe('Page number (default: 1)'),
    pageSize: z.number().optional().default(20).describe('Results per page (default: 20, max: 100)'),
  },
  async ({ keyword, page, pageSize }) => {
    try {
      const source = getSource('lucide');
      if (!source) throw new Error('Lucide source not registered');
      const result = await source.search(keyword, page, Math.min(pageSize, 100));
      const lines = [
        `Found ${result.total} lucide icons for "${keyword}" (page ${page}):`,
        '',
        ...result.icons.map((icon) => `[${icon.name}] ${icon.tags.join(', ')}`),
      ];
      if (result.total > page * pageSize) {
        lines.push('', `More results. Use page=${page + 1}.`);
      }
      lines.push('', 'To download: l_download_svg("{name}", color?, size?) or i_download(source="lucide", id="{name}")');
      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

server.tool(
  'l_download_svg',
  '[Lucide] Download a lucide icon as SVG text (open source, no login). For unified download from any source, use i_download instead.',
  {
    name: z.string().describe('Icon name, e.g. "home", "arrow-right".'),
    color: z.string().optional().describe('Stroke color, e.g. "#333333" or "red".'),
    size: z.number().optional().describe('Output size in px, e.g. 32.'),
  },
  async ({ name, color, size }) => {
    try {
      const svg = await downloadFromSource('lucide', name, color, size);
      return { content: [{ type: 'text' as const, text: svg }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

server.tool(
  'l_list_all',
  '[Lucide] List all available lucide icons (open source, no login). 2007+ icons total.',
  {
    page: z.number().optional().default(1).describe('Page number (default: 1)'),
    pageSize: z.number().optional().default(50).describe('Results per page (default: 50, max: 200)'),
  },
  async ({ page, pageSize }) => {
    try {
      const source = getSource('lucide');
      if (!source || !source.listAll) throw new Error('Lucide source not available');
      const result = await source.listAll(page, Math.min(pageSize, 200));
      const totalPages = Math.ceil(result.total / Math.min(pageSize, 200));
      const lines = [
        `Lucide icons (${result.total} total, page ${page}/${totalPages}):`,
        '',
        ...result.icons.map((icon) => `[${icon.name}] ${icon.tags.slice(0, 3).join(', ')}${icon.tags.length > 3 ? '...' : ''}`),
      ];
      if (result.total > page * pageSize) {
        lines.push('', `More results. Use page=${page + 1}.`);
      }
      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

server.tool(
  'l_get_tags',
  '[Lucide] Get tags for a specific lucide icon (open source, no login).',
  {
    name: z.string().describe('Icon name, e.g. "home", "arrow-right"'),
  },
  async ({ name }) => {
    try {
      const source = getSource('lucide');
      if (!source || !source.getDetail) throw new Error('Lucide source not available');
      const detail = await source.getDetail(name);
      if (!detail) {
        return { content: [{ type: 'text' as const, text: `Lucide icon "${name}" not found.` }] };
      }
      return { content: [{ type: 'text' as const, text: `Icon: ${name}\nTags: ${detail.tags.join(', ') || 'none'}` }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

// ============================================================
// Multi-source fusion tools
// ============================================================

server.tool(
  'i_sources',
  'List all available icon data sources with details (icon count, license, auth requirement, status). Use this to discover which sources are available for search and download.',
  {},
  async () => {
    try {
      const table = await getSourcesTable();
      const summary = getSourcesSummary();
      return {
        content: [{
          type: 'text' as const,
          text: `${summary}\n\n${table}\n\n🔐 iconfont.cn (https://www.iconfont.cn) — Chinese community, requires login (see i_login); managed separately from the registry above.`,
        }],
      };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

server.tool(
  'i_search_all',
  'Search icons across ALL or specific data sources. Returns combined results with source labels. By default searches all sources. Use sources parameter to limit to specific sources (e.g. sources=["lucide","tabler"]) or use source keywords: "free" (all open sources), "all" (everything). Iconfont requires login.',
  {
    keyword: z.string().describe('Search keyword, e.g. "home", "arrow", "user"'),
    sources: z.array(z.string()).optional().describe('Optional list of source ids to search (e.g. ["lucide","tabler","mdi"]). Default: all sources. Use i_sources to see available ids.'),
    page: z.number().optional().default(1).describe('Page number for each source (default: 1)'),
    pageSize: z.number().optional().default(10).describe('Results per source per page (default: 10, max: 50)'),
  },
  async ({ keyword, sources, page, pageSize }) => {
    const ps = Math.min(pageSize, 50);
    const lines: string[] = [];
    let totalFound = 0;

    // Determine which sources to search
    let sourceIds = sources;
    if (!sourceIds || sourceIds.length === 0) {
      // Default: every registered source (all are login-free)
      sourceIds = listSources().map((s) => s.id);
    }

    const multiResult = await searchAll(keyword, sourceIds, page, ps);

    for (const result of multiResult.results) {
      const err = (result as any)._error;
      if (err) {
        lines.push(`=== ${result.source} — error: ${err} ===`);
        lines.push('');
        continue;
      }

      totalFound += result.total;
      const sourceName = result.source.charAt(0).toUpperCase() + result.source.slice(1);
      lines.push(`=== ${sourceName} — ${result.total} found ===`);

      if (result.icons.length > 0) {
        for (const icon of result.icons) {
          const tagStr = icon.tags.slice(0, 4).join(', ');
          // Show the full id when it differs from the display name (e.g. iconify "mdi:home")
          const label = icon.id !== icon.name ? `${icon.name} (${icon.id})` : icon.name;
          lines.push(`  [${icon.source}] ${label} — ${tagStr}${icon.tags.length > 4 ? '...' : ''}`);
        }
        lines.push(`  → Use i_download(source="${result.source}", id="${result.icons[0].id}") to download`);
      } else {
        lines.push('  (no results)');
      }
      lines.push('');
    }

    if (lines.length === 0) {
      lines.push('No sources available to search.');
    }

    if (totalFound === 0) {
      lines.push('', `No icons found for "${keyword}". Try a different keyword, or call g_generate(description="${keyword}") to have the AI generate a custom icon.`);
    }

    lines.unshift(`Search "${keyword}": ${totalFound} total across ${multiResult.results.length} sources\n`);

    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
    };
  }
);

server.tool(
  'i_download',
  'Unified download: download an icon as SVG text from ANY registered source. Pass the source id (e.g. "lucide", "tabler", "mdi") and the icon id (name from search results). Optional color overrides the stroke/fill color. Optional size overrides width/height. Use i_sources to see available sources, or i_search_all to find icons.',
  {
    source: z.string().describe('Source id, e.g. "lucide", "tabler", "mdi". Use i_sources to see all available.'),
    id: z.string().describe('Icon id (name) from search results, e.g. "home", "arrow-right"'),
    color: z.string().optional().describe('Override color, e.g. "#333333" or "red". Default: source default (currentColor)'),
    size: z.number().optional().describe('Output size in px, e.g. 32. Default: source default (24 or 16)'),
  },
  async ({ source, id, color, size }) => {
    try {
      const svg = await downloadFromSource(source, id, color, size);
      // Raster sources (icons8/openverse) return an image data URI, not SVG markup
      const text = svg.startsWith('<svg')
        ? svg
        : `${svg}\n\nℹ️ Image (base64 data URI) from "${source}" — decode and save with the matching extension (.png/.jpg). Color override does not apply to this source.`;
      return { content: [{ type: 'text' as const, text }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

// ============================================================
// Icon generation tools (AI drafts the SVG, server validates)
// ============================================================

function generateSpec(description: string, style: string, size: number): string {
  const outline = style !== 'fill';
  return `# 图标生成任务：${description}

你（AI）来绘制这个 SVG 图标，完成后调用 g_validate 校验净化。规范基于 Lucide 官方设计原则（lucide.dev/contribute/icons/design-principles）。

## 画布与网格
1. **画布**：viewBox="0 0 24 24"，纯路径图形；不要 <text>、<image>、注释
2. **安全区**：描边/形状距画布边缘 ≥1px（贴边会在小尺寸被裁切）
3. **像素对齐**：坐标、圆弧圆心对齐像素网格（整数/0.5）；网格对齐不得牺牲辨识度与曲线美感
4. **颜色**：只用 currentColor，不硬编码色值

## ${outline ? '描边风格（outline，对齐 Lucide）' : '填充风格（fill）'}
${outline ? `5. **描边**：stroke-width="2"（全程一致，不混用）
6. **端点/拐角**：stroke-linecap="round"、stroke-linejoin="round"（禁 butt/square/miter）
7. **圆角**：≥8px 的形状直角用 2px 圆角，<8px 用 1px；对角直角圆角半径约 2.41px（1+√2）保持网格对齐；两条以上线交汇处保持直角` : `5. **填充**：fill="currentColor"，实体形状；需要挖孔用 fill-rule="evenodd"
6. **圆角**：外形拐角适度圆润（参照 Material keyline），小形状圆角相应缩小
7. **正负形**：挖孔形状同样保持 ≥2px 间隙`}

## 间距与密度
8. **间隙**：不同元素之间视觉间隙 ≥2px（自测：往缝隙里塞一个 2px 圆，重叠即过窄）
9. **简洁**：优先简单弧线和二次曲线；贝塞尔控制点对齐网格、不堆多余控制点；一眼可辨认，细节宁少勿多
10. **重量与平衡**：视觉重量对齐参照圆/方（模糊测试不显突兀）；对称图形几何居中
11. **规模**：≤4 个 <path>

## 示例（outline 风格 "home"）
\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
\`\`\`

## 流程
1. 构思 "${description}" 的视觉隐喻，先用一句话描述轮廓
2. 画 SVG（最终尺寸 ${size}px 由 g_validate 注入 width/height，你只写 viewBox）
3. 调用 g_validate(svg="...", color?, size=${size})，按警告迭代后交付`;
}

server.tool(
  'g_generate',
  'Get a precise spec for generating a custom SVG icon, then the AI (you) draws the SVG following it. Use when i_search_all finds nothing suitable. After drawing, ALWAYS pass the SVG through g_validate to sanitize and normalize it (color/size injection, XML check, security filter).',
  {
    description: z.string().describe('What the icon should depict, e.g. "a branch arrow flowing down-right", preferably with visual metaphor details'),
    style: z.enum(['outline', 'fill']).optional().default('outline').describe('Icon style: "outline" (stroke-based, Lucide-like, default) or "fill" (solid shapes)'),
    size: z.number().optional().default(24).describe('Target size in px (default 24). g_validate injects width/height'),
  },
  async ({ description, style, size }) => {
    return {
      content: [{ type: 'text' as const, text: generateSpec(description, style ?? 'outline', size ?? 24) }],
    };
  }
);

/** Reject dangerous SVG constructs; returns nothing on success */
function assertSvgSafe(svg: string): void {
  const lower = svg.toLowerCase();
  if (lower.includes('<script')) throw new Error('Rejected: <script> elements are not allowed');
  if (/<foreignobject[\s>/]/.test(lower)) throw new Error('Rejected: <foreignObject> is not allowed');
  if (/javascript\s*:/.test(lower)) throw new Error('Rejected: javascript: URLs are not allowed');
  const onAttr = lower.match(/\son\w+\s*=/);
  if (onAttr) throw new Error(`Rejected: event handler attribute (${onAttr[0].trim()}) is not allowed`);
}

server.tool(
  'g_validate',
  'Validate, sanitize and normalize an AI-generated (or any hand-written) SVG icon: XML well-formedness, security filter (rejects <script>/event handlers/<foreignObject>/javascript:), adds missing xmlns/viewBox, injects color/size. Returns the cleaned SVG ready for use, plus warnings.',
  {
    svg: z.string().describe('The SVG markup to validate, root element must be <svg>'),
    color: z.string().optional().describe('Color to apply, e.g. "#333333". Replaces currentColor; injects fill if none present'),
    size: z.number().optional().describe('Output size in px, e.g. 32. Injected as width/height'),
  },
  async ({ svg: raw, color, size }) => {
    try {
      const svg = raw.trim();
      const warnings: string[] = [];

      assertSvgSafe(svg);

      const xml = XMLValidator.validate(svg);
      if (xml !== true) {
        throw new Error(`Invalid XML: ${xml.err.msg} (line ${xml.err.line}, col ${xml.err.col})`);
      }
      if (!/^<svg[\s>]/i.test(svg)) {
        throw new Error('Root element must be <svg>');
      }

      let out = svg;
      if (!/xmlns=/.test(out)) {
        out = out.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        warnings.push('Added missing xmlns declaration');
      }
      if (!/viewBox=/.test(out)) {
        out = out.replace('<svg', '<svg viewBox="0 0 24 24"');
        warnings.push('Added default viewBox="0 0 24 24" (assumed a 24×24 grid)');
      }
      if (color && !out.includes('currentColor')) {
        warnings.push('No currentColor found — color injected as fill on the <svg> root');
      }
      out = styleSvg(out, color, size);

      const lines = [out];
      if (warnings.length > 0) {
        lines.push('', '⚠️ Warnings:', ...warnings.map((w) => `- ${w}`));
      }
      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

// ============================================================
// Openverse auth tools (optional — raises rate limits)
// ============================================================

server.tool(
  'ov_login',
  'Save Openverse API credentials (OAuth2 client_id/client_secret) to raise rate limits from 20/min + 200/day (anonymous) to 100/min + 10,000/day. Register an application at https://api.openverse.org/v1/ to get them. The exchange is verified immediately; anonymous access keeps working without this.',
  {
    clientId: z.string().describe('Openverse application client_id'),
    clientSecret: z.string().describe('Openverse application client_secret'),
  },
  async ({ clientId, clientSecret }) => {
    try {
      // 先存凭据（会清旧 token 缓存），再换新 token——顺序不能反，
      // 否则 saveCredentials 的 invalidateToken 会删掉刚写盘的 token
      saveCredentials(clientId, clientSecret);
      const t = await exchangeCredentials({ clientId, clientSecret });
      const hours = ((t.expiresAt * 1000 - Date.now()) / 3600000).toFixed(1);
      return {
        content: [{
          type: 'text' as const,
          text: `✅ Openverse credentials verified and saved.\nToken acquired (expires in ~${hours}h, auto-refreshed).\nRate limits: 100/min + 10,000/day (was 20/min + 200/day anonymous).`,
        }],
      };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

// Openverse 的应用注册是纯接口（实测：匿名 POST /v1/auth_tokens/register/ 即可
// 创建应用并返回 client_id/secret，无需登录）——封装成一键工具。
server.tool(
  'ov_register',
  'One-click Openverse app registration: registers an application via the public API, receives client_id/client_secret, exchanges them for a token and saves credentials — rate limits go from 20/min + 200/day to 100/min + 10,000/day. A verification link is emailed to the address you provide (clicking it is recommended but credentials work immediately). If credentials already exist, use ov_login instead.',
  {
    email: z.string().email().describe('Your email address — the Openverse verification link is sent here'),
    name: z.string().optional().default('freeicon-mcp').describe('Application name (default: freeicon-mcp)'),
  },
  async ({ email, name }) => {
    try {
      const UA_BROWSER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
      const res = await fetch('https://api.openverse.org/v1/auth_tokens/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': UA_BROWSER },
        body: JSON.stringify({
          name,
          email,
          description: `freeicon MCP server (${name}) — multi-source icon & asset search for AI tools`,
          callback_url: 'http://localhost:3000',
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) {
        const detail = (await res.text()).slice(0, 200);
        throw new Error(`Openverse registration failed: HTTP ${res.status} — ${detail}`);
      }
      const data = (await res.json()) as { client_id?: string; client_secret?: string };
      if (!data.client_id || !data.client_secret) {
        throw new Error('Registration returned no credentials');
      }
      saveCredentials(data.client_id, data.client_secret);
      const t = await exchangeCredentials({ clientId: data.client_id, clientSecret: data.client_secret });
      const hours = ((t.expiresAt * 1000 - Date.now()) / 3600000).toFixed(1);
      return {
        content: [{
          type: 'text' as const,
          text: [
            '✅ Openverse 应用注册成功，凭据已自动保存并认证。',
            `Client ID: ${data.client_id}`,
            `Client Secret: ${data.client_secret.slice(0, 12)}…（已完整存入 ~/.freeicon/openverse.json）`,
            `Token 已获取（约 ${hours}h 有效，自动续期）→ 限额 100/分钟 + 10,000/天`,
            `📧 验证邮件已发至 ${email}，建议点击链接完成验证。`,
          ].join('\n'),
        }],
      };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

server.tool(
  'ov_check_auth',
  'Check whether Openverse API credentials are configured (higher rate limits) or the server is running anonymous (20/min + 200/day).',
  {},
  async () => {
    if (hasCredentials()) {
      return {
        content: [{
          type: 'text' as const,
          text: 'Openverse credentials configured — authenticated access (100/min + 10,000/day). Token is auto-refreshed.',
        }],
      };
    }
    return {
      content: [{
        type: 'text' as const,
        text: 'Running anonymous: 20/min + 200/day rate limits. Call ov_register(email=...) for one-click registration, or ov_login(clientId, clientSecret) with existing credentials — either raises limits to 100/min + 10,000/day.',
      }],
    };
  }
);

// ============================================================
// Website icon extraction (favicon / apple-touch-icon / SVG logo)
// ============================================================

server.tool(
  'i_site_icon',
  'Extract a website\u2019s icon or logo from its URL. Three tiers: 1) declared icons (<link rel=icon> / apple-touch-icon) \u2014 SVG returns as text, raster as data URI; 2) inline <svg> logos in the page markup \u2014 1:1 vector restoration (style context carried); 3) Google favicon service fallback. Also lists every candidate found.',
  {
    url: z.string().describe('Website URL, e.g. "https://www.apple.com/" or "apple.com" (https:// auto-prepended)'),
    size: z.number().optional().default(256).describe('Preferred icon size in px (default 256)'),
    source: z.enum(['auto', 'link', 'inline', 'google']).optional().default('auto').describe('"auto" = declared icons, then inline SVG logos, then Google service; "link" / "inline" / "google" = restrict to one tier'),
  },
  async ({ url, size, source }) => {
    try {
      const siteUrl = normalizeSiteUrl(url);
      const lines: string[] = [`🌐 ${siteUrl}`];

      // 一次抓取页面 HTML（三层共用；google 模式不需要）
      let html: string | null = null;
      if (source !== 'google') {
        try {
          html = await fetchPageHtml(siteUrl);
        } catch (e) {
          lines.push(`页面抓取: ${e instanceof Error ? e.message : String(e)}`);
        }
      }

      // ① <link> 声明图标
      let candidates: SiteIconCandidate[] = [];
      if ((source === 'auto' || source === 'link') && html) {
        const found = parseLinkIconsFromHtml(html, siteUrl);
        if (found.title) lines.push(`页面标题: ${found.title}`);
        candidates = found.candidates;
        const ranked = [...candidates].sort((a, b) => {
          const aFit = a.dimension >= size ? a.score + 20 : a.score;
          const bFit = b.dimension >= size ? b.score + 20 : b.score;
          return bFit - aFit;
        });
        for (const cand of ranked.slice(0, 3)) {
          try {
            const icon = await fetchIcon(cand);
            if (icon.svgText) {
              lines.push('', `✓ 已下载声明图标（${cand.rel}，${(icon.bytes / 1024).toFixed(1)}KB）`, icon.svgText);
            } else {
              lines.push('', `✓ 已下载图标（${cand.rel}${cand.sizes ? ` ${cand.sizes}` : ''}，${icon.mime}，${(icon.bytes / 1024).toFixed(1)}KB）`, icon.dataUri!);
            }
            lines.push('', 'ℹ️ 光栅图为 data URI（解码存 .png/.ico）；SVG 直接存 .svg。');
            if (ranked.length > 1) {
              lines.push('', '其他候选:');
              ranked.filter((c) => c.url !== icon.url).forEach((c, i) =>
                lines.push(`${i + 1}. [${c.rel}] ${c.url}${c.sizes ? ` (${c.sizes})` : ''}${c.type ? ` ${c.type}` : ''}`));
            }
            return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
          } catch { /* 下一个候选 */ }
        }
        lines.push('声明图标均不可用，尝试内嵌 SVG Logo…');
      }

      // ② 内嵌 SVG Logo（1:1 矢量还原，携带样式上下文）
      if (html && (source === 'auto' || source === 'inline')) {
        const logos = extractInlineSvgs(html, { color: '#1a1a1a' });
        if (logos.length) {
          lines.push('', `✓ 内嵌 SVG Logo ×${logos.length}（1:1 矢量还原，携带样式上下文）`, logos[0].svg);
          if (logos.length > 1) {
            lines.push('', '其余内嵌 SVG:');
            logos.slice(1).forEach((lg, i) =>
              lines.push(`${i + 2}. [${lg.viewBox || '无 viewBox'}] ${(lg.bytes / 1024).toFixed(1)}KB`));
          }
          return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
        }
        lines.push('页面无内嵌 SVG Logo。');
      }

      // ③ Google 兜底（auto / google）
      if (source === 'auto' || source === 'google') {
        const icon = await fetchGoogleFavicon(siteUrl, size);
        lines.push('', `✓ Google favicon 服务（${icon.mime}，${(icon.bytes / 1024).toFixed(1)}KB）`, icon.dataUri!);
        return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
      }

      lines.push('', '❌ 未找到可用图标（当前 source 已禁用 Google 兜底）。');
      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

// ============================================================
// Logo design tools (brand-grade SVG logo brief + validation)
// ============================================================

server.tool(
  'lg_generate',
  'Create a complete logo design brief + SVG authoring spec for a project: design summary, N distinct creative directions (geometric letterform / abstract symbol / mascot / negative space / wordmark), and strict SVG rules (viewBox, self-contained, text fallback, small-size legibility). The AI (you) draws one SVG per direction following the spec, validates each with lg_validate, then presents the concepts. Distilled from the logo-designer skill methodology.',
  {
    project: z.string().describe('Project / brand name, e.g. "freeicon-mcp"'),
    description: z.string().optional().describe('What the project does (one sentence) — helps pick metaphors and palette'),
    format: z.enum(['icon', 'wordmark', 'combination']).optional().default('icon').describe('"icon" 512x512 square; "wordmark"/"combination" 1024x512 horizontal'),
    style: z.enum(['minimal', 'playful', 'bold', 'elegant', 'tech', 'auto']).optional().default('auto').describe('Style direction; "auto" infers from the project description'),
    colors: z.string().optional().describe('Color preference, e.g. "#7C3AED + neutral grays" — omit to let the AI choose'),
    concepts: z.number().optional().default(3).describe('Number of distinct concepts (2-6, default 3)'),
  },
  async ({ project, description, format, style, colors, concepts }) => ({
    content: [{
      type: 'text' as const,
      text: generateLogoSpec({ project, description, format: format ?? 'icon', style: style ?? 'auto', colors, concepts: concepts ?? 3 }),
    }],
  })
);

server.tool(
  'lg_validate',
  'Validate a logo SVG (brand-grade, stricter than g_validate): security filter, self-contained check (rejects <image>/external refs — logos must work offline), text fallback-font check, stroke legibility for small sizes, semantic group suggestions, viewBox/aspect sanity. Returns the normalized SVG with warnings to iterate on.',
  {
    svg: z.string().describe('The logo SVG markup to validate (root element must be <svg>)'),
    format: z.enum(['icon', 'wordmark', 'combination']).optional().default('icon').describe('Declared format — icon expects a square viewBox, wordmark/combination a 2:1 horizontal'),
  },
  async ({ svg: raw, format }) => {
    try {
      const fmt = (format ?? 'icon') as LogoFormat;
      const svg = raw.trim();
      assertSvgSafe(svg);

      const xml = XMLValidator.validate(svg);
      if (xml !== true) throw new Error(`Invalid XML: ${xml.err.msg} (line ${xml.err.line}, col ${xml.err.col})`);
      if (!/^<svg[\s>]/i.test(svg)) throw new Error('Root element must be <svg>');

      const warnings: string[] = [];
      const infos: string[] = [];

      const viewBoxM = svg.match(/viewBox\s*=\s*["']([\d.\s-]+)["']/i);
      if (!viewBoxM) {
        warnings.push(`缺少 viewBox——${fmt === 'icon' ? 'icon 格式应为 "0 0 512 512"' : 'wordmark/combination 应为 "0 0 1024 512"'}`);
      } else {
        const parts = viewBoxM[1].trim().split(/[\s,]+/).map(Number);
        const [x, y, w, h] = parts;
        if (parts.length !== 4 || w <= 0 || h <= 0) warnings.push(`viewBox 数值异常："${viewBoxM[1]}"`);
        else if (fmt === 'icon' && Math.abs(w / h - 1) > 0.05) warnings.push(`icon 格式期望方形 viewBox（当前 ${w}x${h}）`);
        else if (fmt !== 'icon' && Math.abs(w / h - 2) > 0.1) warnings.push(`wordmark/combination 期望约 2:1 横版 viewBox（当前 ${w}x${h}）`);
        if (x !== 0 || y !== 0) infos.push(`viewBox 起点非 0,0（x=${x}, y=${y}）——确认是有意的画布偏移`);
      }

      warnings.push(...checkExternalRefs(svg).map((i) => i.message));
      warnings.push(...checkTextFallback(svg).filter((i) => i.level === 'warning').map((i) => i.message));
      infos.push(...checkTextFallback(svg).filter((i) => i.level === 'info').map((i) => i.message));
      if (fmt === 'icon') warnings.push(...checkStrokeLegibility(svg).map((i) => i.message));
      warnings.push(...checkSemanticGroups(svg, fmt).map((i) => i.message));
      if (fmt === 'combination' && /<g[^>]+id=["']?icon/i.test(svg)) {
        infos.push('favicon 变体建议：从 <g id="icon"> 组单独导出方形 SVG（勿将横版整体缩进方形）');
      }

      const lines = [svg];
      if (warnings.length) lines.push('', '⚠️ 告警（建议迭代）:', ...warnings.map((w) => `- ${w}`));
      if (infos.length) lines.push('', 'ℹ️ 提示:', ...infos.map((w) => `- ${w}`));
      if (!warnings.length) lines.push('', '✓ 通过全部 logo 规范检查。');
      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

// ============================================================
// Illustration scene-card tools (14 flat-illustration styles)
// ============================================================

server.tool(
  'ia_generate',
  'Get a complete drawing spec for a flat-illustration scene card (480x360 SVG) in one of 14 professional styles (flat cut-paper, bold pop, halftone, ink sketch, isometric, one-line, vintage emblem, ...). The spec carries exact palettes, character proportions, composition rules and failure modes from the original methodology. The AI (you) draws the SVG per spec, validates with ia_validate, then delivers.',
  {
    scene: z.string().describe('Who is doing what, with which hero prop — e.g. "a designer presenting a wireframe on a big screen to a teammate"'),
    style: z.string().describe('One of 15 styles: flat / bold-pop / flat-with-black / framed-panel / grainy-gouache / halftone-line / ink-sketch / isometric-mono / line-interior / one-line / outlined-cartoon / teal-spot / two-colour-brush / vintage-emblem / line-minimal (calibrated from real iconfont illustrations)'),
    size: z.number().optional().default(480).describe('Card width in px (240-960, default 480; height = 4:3)'),
  },
  async ({ scene, style, size }) => {
    try {
      return {
        content: [{
          type: 'text' as const,
          text: generateIllustrationSpec(style, scene, size ?? 480),
        }],
      };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

server.tool(
  'ia_validate',
  'Validate an illustration scene-card SVG drawn per ia_generate: security filter, self-contained check (no <image>/external refs — illustrations must be pure vector), canvas 4:3 check, composition density hints. Returns normalized SVG with warnings.',
  {
    svg: z.string().describe('The illustration SVG markup (root element must be <svg>)'),
    size: z.number().optional().default(480).describe('Expected card width in px (default 480)'),
  },
  async ({ svg: raw, size }) => {
    try {
      const svg = raw.trim();
      const { issues } = checkIllustrationSvg(svg, size ?? 480);
      const errors = issues.filter((i) => i.level === 'error');
      const warnings = issues.filter((i) => i.level === 'warning');
      const infos = issues.filter((i) => i.level === 'info');
      const lines = [svg];
      if (errors.length) lines.push('', '❌ 错误（必须修复）:', ...errors.map((i) => `- ${i.message}`));
      if (warnings.length) lines.push('', '⚠️ 告警（建议迭代）:', ...warnings.map((i) => `- ${i.message}`));
      if (infos.length) lines.push('', 'ℹ️ 提示:', ...infos.map((i) => `- ${i.message}`));
      if (!errors.length && !warnings.length) lines.push('', '✓ 通过全部插画规范检查。');
      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    } catch (err) {
      return { content: [{ type: 'text' as const, text: handleToolError(err) }] };
    }
  }
);

async function main() {
  // Register all data sources from configs
  for (const source of createAllSources()) {
    registerSource(source);
  }
  // Iconify aggregator (API-based, not an unpkg package)
  registerSource(createIconifySource());
  // Icons8 (anonymous search + free-tier PNG; SVG is paywalled)
  registerSource(createIcons8Source());
  // Wikimedia Commons (real SVG files, per-file free license)
  registerSource(createCommonsSource());
  // Openverse (CC photos/images, raster as data URI)
  registerSource(createOpenverseSource());
  // Museum open access (AIC + Cleveland, CC0 raster)
  registerSource(createArticSource());
  registerSource(createCmaSource());

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
