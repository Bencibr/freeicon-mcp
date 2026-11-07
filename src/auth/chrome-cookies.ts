import { execFileSync } from 'node:child_process';
import { pbkdf2Sync, createDecipheriv } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { IconfontCookie } from '../types/iconfont.js';

const CHROME_DIR = path.join(
  os.homedir(),
  'Library/Application Support/Google/Chrome'
);

function findProfiles(): string[] {
  if (!fs.existsSync(CHROME_DIR)) return [];
  return fs
    .readdirSync(CHROME_DIR)
    .filter((name) =>
      name === 'Default' || name.startsWith('Profile ') ||
      // some locales
      name === '默认'
    )
    .map((name) => path.join(CHROME_DIR, name))
    .filter((p) => fs.existsSync(p));
}

function cookieDbFor(profileDir: string): string | null {
  for (const rel of ['Cookies', 'Network/Cookies']) {
    const f = path.join(profileDir, rel);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function getChromeKey(): Buffer | null {
  try {
    const pw = execFileSync(
      'security',
      ['find-generic-password', '-s', 'Chrome Safe Storage', '-a', 'Chrome', '-w'],
      { encoding: 'utf-8' }
    ).trim();
    return pbkdf2Sync(pw, 'saltysalt', 1003, 16, 'sha1');
  } catch {
    return null;
  }
}

function decrypt(enc: Buffer, key: Buffer): string {
  if (enc.length === 0) return '';
  const prefix = enc.subarray(0, 3).toString('latin1');
  if (prefix === 'v10' || prefix === 'v11') {
    const data = enc.subarray(3);
    const iv = Buffer.alloc(16, 0x20);
    try {
      const d = createDecipheriv('aes-128-cbc', key, iv);
      const out = Buffer.concat([d.update(data), d.final()]);
      // strip PKCS7 padding
      const pad = out[out.length - 1];
      const cut = pad > 0 && pad <= 16 ? out.length - pad : out.length;
      return out.subarray(0, cut).toString('utf-8');
    } catch {
      return '';
    }
  }
  return enc.toString('utf-8');
}

interface RawRow {
  host_key: string;
  name: string;
  value: string;
  encrypted_hex: string;
  path: string;
  expires_utc: number;
  is_secure: number;
  is_httponly: number;
  samesite: number;
}

function queryCookies(dbPath: string): RawRow[] {
  // Chrome locks the DB while running → copy first.
  const tmp = path.join(
    os.tmpdir(),
    `iconfont-chrome-cookies-${Date.now()}-${Math.random().toString(36).slice(2)}.db`
  );
  fs.copyFileSync(dbPath, tmp);
  try {
    const sql =
      'SELECT host_key,name,value,hex(encrypted_value),path,expires_utc,is_secure,is_httponly,samesite ' +
      "FROM cookies WHERE host_key LIKE '%iconfont.cn%';";
    const out = execFileSync('sqlite3', [tmp, sql], {
      encoding: 'utf-8',
      maxBuffer: 16 * 1024 * 1024,
    });
    return out
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [host_key, name, value, encrypted_hex, p, expires_utc, is_secure, is_httponly, samesite] =
          line.split('|');
        return {
          host_key, name, value, encrypted_hex,
          path: p, expires_utc: Number(expires_utc),
          is_secure: Number(is_secure), is_httponly: Number(is_httponly),
          samesite: Number(samesite),
        };
      });
  } finally {
    try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  }
}

const SAMESITE = ['None', 'Strict', 'Lax'];

// Chrome stores expires_utc in microseconds since 1601-01-01.
function chromeTimeToUnix(expires_utc: number): number {
  if (expires_utc === 0) return 0;
  return Math.floor((expires_utc / 1_000_000) - 11_644_473_600);
}

export interface ChromeCookieResult {
  cookies: IconfontCookie[];
  ctoken: string;
  profile: string;
}

/** Read all iconfont.cn cookies from every Chrome profile, return the best one. */
export function readIconfontCookiesFromChrome(): ChromeCookieResult | null {
  const key = getChromeKey();
  if (!key) return null;

  let best: ChromeCookieResult | null = null;

  for (const profileDir of findProfiles()) {
    const db = cookieDbFor(profileDir);
    if (!db) continue;

    let rows: RawRow[];
    try {
      rows = queryCookies(db);
    } catch {
      continue;
    }
    if (rows.length === 0) continue;

    const cookies: IconfontCookie[] = [];
    let ctoken = '';
    for (const row of rows) {
      const val = row.value || decrypt(Buffer.from(row.encrypted_hex, 'hex'), key);
      if (!val) continue;
      if (row.name === 'ctoken' && val) ctoken = val;
      cookies.push({
        name: row.name,
        value: val,
        domain: row.host_key,
        path: row.path || '/',
        expires: chromeTimeToUnix(row.expires_utc),
        httpOnly: row.is_httponly === 1,
        secure: row.is_secure === 1,
        sameSite: SAMESITE[row.samesite] ?? 'Lax',
      });
    }
    if (cookies.length === 0) continue;

    // Prefer the profile that actually has ctoken (logged in).
    if (ctoken) {
      return { cookies, ctoken, profile: path.basename(profileDir) };
    }
    if (!best) best = { cookies, ctoken: '', profile: path.basename(profileDir) };
  }

  return best;
}
