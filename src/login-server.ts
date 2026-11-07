#!/usr/bin/env node
/**
 * iconfont.cn 登录代理（反向代理 + 中间人抓 cookie）
 *
 * 用法：
 *   node dist/login-server.js            # 默认端口 7788
 *   node dist/login-server.js --port=8080
 *   PORT=8080 node dist/login-server.js
 *
 * 浏览器打开 http://localhost:<port> 正常登录，登录成功后 cookie 自动
 * 写入 ~/.freeicon/cookies.json，MCP 后续直接复用。
 */
import http from 'node:http';
import { spawn } from 'node:child_process';
import { URL } from 'node:url';
import { saveCookieStore } from './auth/cookie-store.js';
import type { IconfontCookie } from './types/iconfont.js';

const UPSTREAM = 'https://www.iconfont.cn';
const UPSTREAM_ORIGIN = 'https://www.iconfont.cn';
const ICONFONT_HOST = 'iconfont.cn';

// ── 启动时检查网络可达性 ───────────────────────────────────────────────────
(async () => {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    await fetch(UPSTREAM, { method: 'HEAD', signal: ctrl.signal });
    clearTimeout(timer);
  } catch {
    console.error();
    console.error('⚠️  警告：无法连接到 iconfont.cn（https://www.iconfont.cn）');
    console.error('   登录代理可能无法正常工作。常见原因：');
    console.error('   1. DNS 解析异常 → 尝试写 hosts：');
    console.error('      sudo sh -c \'echo "203.119.213.12 www.iconfont.cn" >> /etc/hosts\'');
    console.error('   2. 网络限制 → 使用 VPN 或切换网络');
    console.error('   3. 服务器暂时不可用 → 稍后再试');
    console.error();
  }
})();

// ── 端口 ────────────────────────────────────────────────────────────────────
function parsePort(): number {
  const arg = process.argv.find((a) => a.startsWith('--port='));
  if (arg) return Number(arg.split('=')[1]);
  if (process.env.PORT) return Number(process.env.PORT);
  return 7788;
}
const PORT = parsePort();

const DEBUG = !!process.env.DEBUG_ICF;
const dbg = (...a: unknown[]) => {
  if (DEBUG) console.error('[dbg]', ...a);
};

// ── Cookie jar：累积上游所有 Set-Cookie（iconfont.cn 域） ──────────────────
const jar = new Map<string, IconfontCookie>();
let announced = false;
let shuttingDown = false;
let successMode = false;
let server: http.Server | null = null;

/** 请求路径（去 query），供 successMode 分流用 */
function url_path(req: http.IncomingMessage): string {
  return (req.url || '/').split('?')[0] || '/';
}

function parseSetCookie(raw: string): IconfontCookie | null {
  const parts = raw.split(';').map((p) => p.trim());
  if (!parts[0]) return null;
  const eq = parts[0].indexOf('=');
  if (eq < 0) return null;
  const name = parts[0].slice(0, eq).trim();
  const value = parts[0].slice(eq + 1).trim();
  const cookie: IconfontCookie = {
    name,
    value,
    domain: '.iconfont.cn',
    path: '/',
    expires: 0,
    httpOnly: false,
    secure: false,
    sameSite: 'Lax',
  };
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    const peq = p.indexOf('=');
    const k = (peq < 0 ? p : p.slice(0, peq)).toLowerCase().trim();
    const v = peq < 0 ? '' : p.slice(peq + 1).trim();
    switch (k) {
      case 'path': cookie.path = v || '/'; break;
      case 'domain': cookie.domain = v; break;
      case 'secure': cookie.secure = true; break;
      case 'httponly': cookie.httpOnly = true; break;
      case 'samesite': cookie.sameSite = v || 'Lax'; break;
      case 'expires': {
        const t = Date.parse(v);
        if (!isNaN(t)) cookie.expires = Math.floor(t / 1000);
        break;
      }
      case 'max-age': {
        const n = Number(v);
        if (!isNaN(n) && n > 0) cookie.expires = Math.floor(Date.now() / 1000) + n;
        break;
      }
    }
  }
  return cookie;
}

function updateJar(setCookies: string[]): void {
  for (const raw of setCookies) {
    const c = parseSetCookie(raw);
    if (!c) continue;
    // 只关心 iconfont.cn 域的 cookie
    if (!c.domain.includes(ICONFONT_HOST)) continue;
    jar.set(c.name, c);
  }
  if (DEBUG) dbg('jar names:', Array.from(jar.keys()).join(','));
}

function jarHeader(): string {
  return Array.from(jar.values())
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

// 改写 Set-Cookie，让浏览器存到 localhost（否则 domain 不匹配会被丢弃）
function rewriteForBrowser(raw: string): string {
  return raw
    .replace(/;\s*Domain=[^;]*/gi, '') // 去掉 Domain → host-only localhost
    .replace(/;\s*Secure/gi, '') // localhost 是 http，Secure 会导致 cookie 被拒
    .replace(/;\s*SameSite=[^;]*/gi, '; SameSite=Lax');
}

// 改写绝对地址，让 SPA 的请求继续走代理
function rewriteText(s: string): string {
  return s
    .replace(/https:\/\/www\.iconfont\.cn/g, '')
    .replace(/\/\/www\.iconfont\.cn/g, '')
    .replace(/https:\/\/iconfont\.cn/g, '')
    .replace(/\/\/iconfont\.cn/g, '');
}

// 登录成功后的分层滞留：50 秒 successMode（见 handle 内注释）→ 8 秒
// 全量成功页 → 退出。给浏览器留足时间落地成功页/横幅。
const SUCCESS_MODE_MS = 50000;
const SHUTDOWN_GRACE_MS = 8000;

const SUCCESS_PAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>登录成功 — freeicon</title>
<style>
  body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f6f8fa;color:#1f2328;}
  .card{text-align:center;padding:48px 40px;background:#fff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.08);max-width:420px;}
  .icon{font-size:56px;}
  h1{font-size:22px;margin:16px 0 8px;}
  p{color:#57606a;font-size:14px;line-height:1.6;margin:6px 0;}
  .hint{margin-top:20px;padding:12px;background:#f6f8fa;border-radius:8px;font-size:13px;color:#57606a;}
</style>
</head>
<body>
<div class="card">
  <div class="icon">✅</div>
  <h1>登录成功！</h1>
  <p>Cookie 已自动捕获并保存。</p>
  <p><strong>你现在可以关闭此窗口了。</strong></p>
  <div class="hint">稍后如果刷新本页显示"无法连接 / 拒绝访问"，属正常现象——登录服务已完成使命并自动关闭，不影响使用。</div>
</div>
</body>
</html>`;

/** 注入到代理 HTML 的成功横幅（successMode 期间，覆盖任何已加载页面） */
const SUCCESS_OVERLAY = `<div id="__freeicon_success" style="position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#10b981;color:#fff;font:15px/1.6 -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;padding:14px 20px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.25)">✅ 登录成功！Cookie 已自动保存 —— 你现在可以<strong>关闭此窗口</strong>了</div><script>try{document.title='✅ 登录成功 — freeicon'}catch(e){}</script>`;

/** 判断是否为文档导航请求（整页跳转/刷新），区别于 SPA 的 XHR */
function isDocumentRequest(req: http.IncomingMessage): boolean {
  const mode = req.headers['sec-fetch-mode'];
  if (mode) return mode === 'navigate';
  return String(req.headers.accept || '').includes('text/html');
}

/** SPA 的 API/XHR 请求：成功模式下回无害 JSON，避免 SPA 收到 HTML 崩溃白屏 */
function isApiRequest(req: http.IncomingMessage, pathname: string): boolean {
  const mode = req.headers['sec-fetch-mode'];
  if (mode === 'cors') return true;
  if (String(req.headers.accept || '').includes('application/json')) return true;
  return pathname.startsWith('/api/');
}

// 拿当前 jar 里的 cookie 去问 iconfont 是否真的登录了；是就落盘 + 提示
async function checkLoginAndAnnounce(): Promise<void> {
  if (announced) return;
  if (jar.size === 0) return;
  try {
    // pubinfo.json 是可靠的登录指示器：登录后 data.user 非空
    const r = await fetch(`${UPSTREAM}/api/pubinfo.json`, {
      headers: {
        Cookie: jarHeader(),
        Referer: UPSTREAM + '/',
        Accept: 'application/json, text/plain, */*',
      },
    });
    const ct = r.headers.get('content-type') || '';
    if (!ct.includes('json')) return;
    const data = (await r.json()) as { data?: { user?: { id: number; nickname: string } | null } };
    const user = data?.data?.user;
    if (DEBUG)
      dbg(
        'pubinfo user=',
        user ? `${user.nickname}(${user.id})` : 'null',
        'ctoken=',
        jar.get('ctoken')?.value ?? '(none)',
        'jarSize=',
        jar.size
      );
    if (user) {
      const ctoken = jar.get('ctoken')?.value ?? '';
      saveCookieStore(Array.from(jar.values()), ctoken);
      announced = true;
      // 进入 successMode（而非立即收尾）：文档导航/刷新 → 成功页；
      // SPA 的 API/XHR → 无害 JSON；代理 HTML 注入成功横幅。
      successMode = true;
      console.log('\n═══════════════════════════════════════════════════');
      console.log('✅ 登录成功！cookie 已捕获并保存。');
      console.log(`   用户：${user.nickname} (ID: ${user.id})`);
      console.log(`   ctoken：${ctoken || '(none)'}`);
      console.log(`   保存位置：~/.freeicon/cookies.json`);
      console.log('   浏览器将显示成功横幅/页面（刷新即见），稍后自动关闭。');
      console.log('═══════════════════════════════════════════════════\n');
      setTimeout(() => { shuttingDown = true; }, SUCCESS_MODE_MS);
      setTimeout(() => shutdownGracefully(), SUCCESS_MODE_MS + SHUTDOWN_GRACE_MS);
    }
  } catch {
    // ignore transient
  }
}

// 每隔几秒检查一次登录状态（不依赖 ctoken 是否作为 cookie 出现）
setInterval(() => {
  if (shuttingDown) return;
  void checkLoginAndAnnounce();
}, 3000);

// 安全寿命上限：最多跑 15 分钟自动退，避免忘了关
setTimeout(() => {
  if (shuttingDown) return;
  console.log('\n⏱  超过 15 分钟未完成登录，自动关闭。');
  process.exit(0);
}, 15 * 60 * 1000);

// ── 反向代理 ────────────────────────────────────────────────────────────────
const HOP = new Set([
  'content-encoding',
  'content-length',
  'transfer-encoding',
  'connection',
  'keep-alive',
  'host',
  'set-cookie',
  'location',
]);

function readBody(req: http.IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handle(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  // 收尾期：所有请求都落成功页
  if (shuttingDown) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(SUCCESS_PAGE);
    return;
  }
  // successMode：分层响应，既让用户看到成功提示，又不让 SPA 崩溃白屏
  if (successMode) {
    if (url_path(req) === '/__login_success' || isDocumentRequest(req)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(SUCCESS_PAGE);
      return;
    }
    if (isApiRequest(req, url_path(req))) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end('{"code":200,"message":"login success","data":{}}');
      return;
    }
    // 静态资源等其余请求：继续走代理
  }
  try {
    const url = new URL(req.url || '/', UPSTREAM);

    const upHeaders: Record<string, string> = {};
    for (const [k, v] of Object.entries(req.headers)) {
      const lk = k.toLowerCase();
      if (HOP.has(lk) || v == null) continue;
      let val = Array.isArray(v) ? v.join(', ') : v;
      // 本地 origin 改回 iconfont（Referer/Origin 等）
      val = val.replace(/http:\/\/localhost:\d+/g, UPSTREAM_ORIGIN);
      upHeaders[k] = val;
    }
    // 浏览器实时的 cookie 直接转发
    if (req.headers.cookie) upHeaders['cookie'] = req.headers.cookie;

    // 浏览器已有的 cookie 也捕获进 jar（已登录用户不会收到 Set-Cookie）
    if (req.headers.cookie) {
      req.headers.cookie.split(';').forEach((pair) => {
        const eq = pair.indexOf('=');
        if (eq < 0) return;
        const name = pair.slice(0, eq).trim();
        const value = pair.slice(eq + 1).trim();
        if (name && !jar.has(name)) {
          jar.set(name, {
            name,
            value,
            domain: '.iconfont.cn',
            path: '/',
            expires: 0,
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
          });
        }
      });
      // 浏览器已有 cookie 也可能已验证登录，立即检查
      void checkLoginAndAnnounce();
    }

    const hasBody =
      req.method && req.method !== 'GET' && req.method !== 'HEAD';
    const body: Uint8Array | undefined = hasBody
      ? new Uint8Array(await readBody(req))
      : undefined;

    let up: Response;
    try {
      up = await fetch(url.toString(), {
        method: req.method || 'GET',
        headers: upHeaders,
        body: body as unknown as BodyInit,
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
      });
    } catch (fetchErr) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      console.error(`[proxy] fetch failed: ${req.method} ${url.toString()} → ${msg}`);
      if (!res.headersSent) res.writeHead(502);
      res.end(`Proxy error: ${msg}`);
      return;
    }

    const setCookies =
      typeof up.headers.getSetCookie === 'function'
        ? up.headers.getSetCookie()
        : [];
    if (setCookies.length) {
      updateJar(setCookies as string[]);
      if (DEBUG) dbg('set-cookie @', url.pathname, '=', (setCookies as string[]).join(' || '));
      void checkLoginAndAnnounce();
    }

    const outHeaders: Record<string, string | string[]> = {};
    for (const [k, v] of up.headers.entries()) {
      if (HOP.has(k.toLowerCase())) continue;
      outHeaders[k] = v;
    }
    if (setCookies.length) {
      outHeaders['set-cookie'] = (setCookies as string[]).map(rewriteForBrowser);
    }
    const loc = up.headers.get('location');
    if (loc) outHeaders['location'] = rewriteText(loc);

    res.writeHead(up.status, outHeaders);

    const contentType = up.headers.get('content-type') || '';
    const isText =
      /text\/|application\/(json|javascript|x-javascript|xml|ecmascript)/i.test(
        contentType
      );
    const buf = Buffer.from(await up.arrayBuffer());
    if (isText) {
      let html = rewriteText(buf.toString('utf-8'));
      // successMode：往代理 HTML 注入成功横幅（覆盖已加载的 SPA 页面）
      if (successMode && /text\/html/i.test(contentType) && !html.includes('__freeicon_success')) {
        html = html.includes('</body>')
          ? html.replace(/<\/body>/i, `${SUCCESS_OVERLAY}</body>`)
          : html + SUCCESS_OVERLAY;
      }
      res.end(html);
    } else {
      res.end(buf);
    }
  } catch (e) {
    const errMsg = `Proxy error: ${e instanceof Error ? e.message : String(e)}`;
    console.error(`[proxy] ${req.method} ${req.url} → ${errMsg}`);
    if (!res.headersSent) res.writeHead(502);
    res.end(errMsg);
  }
}

// 用系统默认浏览器打开 URL（无依赖）
function openUrl(url: string): void {
  let cmd: string | null = null;
  let args: string[] = [];
  switch (process.platform) {
    case 'darwin':
      cmd = 'open';
      args = [url];
      break;
    case 'win32':
      cmd = 'cmd';
      args = ['/c', 'start', '', url];
      break;
    default: // linux / unix
      cmd = 'xdg-open';
      args = [url];
  }
  try {
    spawn(cmd, args, { detached: true, stdio: 'ignore' }).unref();
  } catch {
    // ignore — 用户可手动打开
  }
}

server = http.createServer((req, res) => {
  void handle(req, res);
});

server!.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('═══════════════════════════════════════════════════');
  console.log('  iconfont 登录代理已启动');
  console.log(`  👉 浏览器打开： ${url}`);
  console.log('  正常登录后，cookie 会自动捕获并保存。');
  console.log('  按 Ctrl+C 关闭。');
  console.log('═══════════════════════════════════════════════════');
  // 自动打开默认浏览器
  openUrl(url);
});

/** 优雅关闭：停收新连接 + 掐掉空闲 keep-alive + 兜底强退（防挂住不退出） */
function shutdownGracefully(exitCode = 0): void {
  const srv = server;
  if (!srv) process.exit(exitCode);
  srv.close(() => process.exit(exitCode));
  srv.closeIdleConnections?.();
  // 不 unref：确保兜底强退一定触发
  setTimeout(() => process.exit(exitCode), 2500);
}

process.on('SIGINT', () => {
  console.log('\n关闭登录代理。');
  shutdownGracefully();
});
