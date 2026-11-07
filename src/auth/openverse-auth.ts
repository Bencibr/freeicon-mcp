/**
 * Openverse OAuth2 client-credentials auth.
 *
 * Register an application at https://api.openverse.org/v1/ (developer portal)
 * to get a client_id/client_secret pair. Exchanging them for a Bearer token
 * raises rate limits from 20/min + 200/day (anonymous) to 100/min + 10,000/day.
 *
 * Credentials resolution order: env vars (OPENVERSE_CLIENT_ID /
 * OPENVERSE_CLIENT_SECRET) → saved store (~/.freeicon/openverse.json,
 * written by the ov_login tool). No credentials = anonymous access.
 *
 * Token endpoint (verified): POST /v1/auth_tokens/token/, form-encoded,
 * grant_type=client_credentials → { access_token, expires_in, ... }.
 * Tokens are cached on disk and refreshed 5 min before expiry.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const STORE_DIR = path.join(os.homedir(), '.freeicon');
const CRED_FILE = path.join(STORE_DIR, 'openverse.json');
const TOKEN_FILE = path.join(STORE_DIR, 'openverse-token.json');
const TOKEN_URL = 'https://api.openverse.org/v1/auth_tokens/token/';

export interface OvCredentials {
  clientId: string;
  clientSecret: string;
}

interface CachedToken {
  accessToken: string;
  /** epoch seconds when the token should be refreshed */
  expiresAt: number;
}

function loadCredentials(): OvCredentials | null {
  const envId = process.env.OPENVERSE_CLIENT_ID;
  const envSecret = process.env.OPENVERSE_CLIENT_SECRET;
  if (envId && envSecret) return { clientId: envId, clientSecret: envSecret };
  try {
    const raw = JSON.parse(fs.readFileSync(CRED_FILE, 'utf-8')) as OvCredentials;
    if (raw.clientId && raw.clientSecret) return raw;
  } catch {
    // no store
  }
  return null;
}

export function saveCredentials(clientId: string, clientSecret: string): void {
  fs.mkdirSync(STORE_DIR, { recursive: true });
  fs.writeFileSync(CRED_FILE, JSON.stringify({ clientId, clientSecret, savedAt: new Date().toISOString() }, null, 2));
  invalidateToken();
}

export function clearCredentials(): void {
  try { fs.rmSync(CRED_FILE, { force: true }); } catch { /* ignore */ }
  invalidateToken();
}

export function hasCredentials(): boolean {
  return loadCredentials() !== null;
}

export function invalidateToken(): void {
  try { fs.rmSync(TOKEN_FILE, { force: true }); } catch { /* ignore */ }
  cached = null;
}

let cached: CachedToken | null = null;

function loadTokenFromDisk(): CachedToken | null {
  if (cached) return cached;
  try {
    cached = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8')) as CachedToken;
  } catch {
    cached = null;
  }
  return cached;
}

function saveTokenToDisk(t: CachedToken): void {
  fs.mkdirSync(STORE_DIR, { recursive: true });
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(t));
  cached = t;
}

/** Exchange credentials for an access token. Throws on bad credentials. */
export async function exchangeCredentials(creds: OvCredentials): Promise<CachedToken> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // See openverse.ts for why a browser-shaped UA is required
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const detail = res.status === 401
      ? 'invalid client_id/client_secret'
      : `HTTP ${res.status}`;
    throw new Error(`Openverse token exchange failed (${detail})`);
  }
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error('Openverse token exchange returned no access_token');
  const t: CachedToken = {
    accessToken: data.access_token,
    expiresAt: Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
  };
  saveTokenToDisk(t);
  return t;
}

/** Bearer token, refreshing if near expiry. null when running anonymous. */
export async function getAuthHeader(): Promise<{ Authorization: string } | null> {
  const creds = loadCredentials();
  if (!creds) return null;
  let t = loadTokenFromDisk();
  if (!t || t.expiresAt - 300 < Date.now() / 1000) {
    t = await exchangeCredentials(creds);
  }
  return { Authorization: `Bearer ${t.accessToken}` };
}
