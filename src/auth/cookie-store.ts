import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import type { CookieStoreData, IconfontCookie } from '../types/iconfont.js';

const STORE_DIR = path.join(os.homedir(), '.freeicon');
const STORE_FILE = path.join(STORE_DIR, 'cookies.json');
/** Pre-rename location — migrated once so existing users keep their login */
const LEGACY_DIR = path.join(os.homedir(), '.iconfont-mcp');

let migrated = false;

function ensureStoreDir(): void {
  if (!migrated) {
    migrated = true;
    // One-time migration: move the whole legacy dir (cookies + browser profile)
    if (!fs.existsSync(STORE_DIR) && fs.existsSync(LEGACY_DIR)) {
      try {
        fs.renameSync(LEGACY_DIR, STORE_DIR);
      } catch {
        // Best effort — fall back to fresh store
      }
    }
  }
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

export function loadCookieStore(): CookieStoreData | null {
  ensureStoreDir();
  try {
    if (!fs.existsSync(STORE_FILE)) {
      return null;
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(raw) as CookieStoreData;
  } catch {
    return null;
  }
}

export function saveCookieStore(cookies: IconfontCookie[], ctoken: string): void {
  ensureStoreDir();
  const data: CookieStoreData = {
    cookies,
    ctoken,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Parse a raw HTTP "Cookie" header (e.g. "ctoken=xxx; ECS=yyy; ...") into
 * IconfontCookie entries with sensible defaults for the fields that a header
 * does not carry (domain/path/expires/...).
 *
 * `expires` is set to now + 30 days so that isCookieStoreValid() passes; the
 * real expiry is enforced server-side and the store is cleared automatically
 * if the API later reports the session as expired.
 */
export function parseCookieHeader(cookieHeader: string): IconfontCookie[] {
  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // +30 days
  const cookies: IconfontCookie[] = [];

  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!name) continue;
    cookies.push({
      name,
      value,
      domain: '.iconfont.cn',
      path: '/',
      expires,
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    });
  }

  return cookies;
}

export function getCookies(): IconfontCookie[] {
  const store = loadCookieStore();
  return store?.cookies ?? [];
}

export function getCtoken(): string {
  const store = loadCookieStore();
  return store?.ctoken ?? '';
}

export function getCookieHeader(): string {
  const cookies = getCookies();
  return cookies.map((c) => `${c.name}=${c.value}`).join('; ');
}

export function isCookieStoreValid(): boolean {
  const store = loadCookieStore();
  if (!store || !store.cookies.length) {
    return false;
  }
  // 不按单个 cookie 的过期时间判断会话有效性：iconfont 的会话由
  // EGG_SESS_ICONFONT（30 天）等携带，而某些短寿 cookie（如 IFS，1 小时）
  // 过期不影响主会话。真实过期由服务端强制，apiRequest 遇到 HTML/LOGIN
  // REQUIRED 会自动清掉本地 cookie 并提示重新登录。
  return true;
}

export function clearCookieStore(): void {
  try {
    if (fs.existsSync(STORE_FILE)) {
      fs.unlinkSync(STORE_FILE);
    }
  } catch {
    // ignore
  }
}

export function markCookieExpired(): void {
  clearCookieStore();
}
