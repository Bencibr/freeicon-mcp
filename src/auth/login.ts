import path from 'node:path';
import os from 'node:os';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import type { BrowserContext, Cookie, Locator, Page } from 'playwright';
import type { IconfontCookie } from '../types/iconfont.js';
import { AuthError } from '../types/iconfont.js';
import type { LoginInfoResponse } from '../types/iconfont.js';
import {
  saveCookieStore,
  isCookieStoreValid,
  parseCookieHeader,
} from './cookie-store.js';
import { apiRequest } from '../api/client.js';

chromium.use(StealthPlugin());

const LOGIN_URL = 'https://www.iconfont.cn/login';
const LOGIN_INFO_URL = '/api/user/login.info.json';
const LOGIN_TIMEOUT_MS = 300_000; // 5 minutes
const POLL_INTERVAL_MS = 800;
const ICONFONT_DOMAIN = 'iconfont.cn';
const SMS_SESSION_TTL_MS = 3 * 60 * 1000; // 3 minutes

/**
 * Persistent on-disk browser profile. Login state (cookies, localStorage)
 * is kept here, so after logging in once you stay logged in across runs —
 * no need to re-authenticate every time.
 */
const USER_DATA_DIR = path.join(os.homedir(), '.freeicon', 'browser-profile');

export interface LoginResult {
  success: boolean;
  message: string;
}

// ---------------------------------------------------------------------------
// Shared browser helpers
// ---------------------------------------------------------------------------

/**
 * Launch a PERSISTENT browser context (profile stored under USER_DATA_DIR).
 * Because the profile persists, a login performed once stays valid for
 * subsequent runs — this is what actually keeps the "internal login info".
 */
async function launchPersistent(): Promise<{
  context: BrowserContext;
  close: () => Promise<void>;
}> {
  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-size=1280,800',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
    extraHTTPHeaders: { 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' },
  });
  return { context, close: () => context.close().catch(() => {}) };
}

function toIconfontCookie(cookies: Cookie[]): IconfontCookie[] {
  return cookies
    .filter((c) => c.domain.includes(ICONFONT_DOMAIN))
    .map((c) => ({
      name: c.name,
      value: c.value,
      domain: c.domain,
      path: c.path,
      expires: c.expires,
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite as string,
    }));
}

/**
 * Poll the browser context for the `ctoken` cookie. This is the ground-truth
 * signal that the user is logged in to iconfont.cn, regardless of which login
 * method was used or what URL the SPA ended up on.
 */
async function waitForCtoken(
  context: BrowserContext,
  timeoutMs: number
): Promise<Cookie | undefined> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const cookies = await context.cookies();
      const ctoken = cookies.find((c) => c.name === 'ctoken' && c.value);
      if (ctoken) return ctoken;
    } catch {
      // transient; keep polling
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  return undefined;
}

/** Grab cookies + ctoken from a logged-in context and persist them. */
async function finalize(context: BrowserContext): Promise<LoginResult> {
  const cookies = await context.cookies();
  const ctoken = cookies.find((c) => c.name === 'ctoken' && c.value);

  if (!ctoken) {
    return {
      success: false,
      message:
        'Login succeeded but the ctoken cookie was not found. Please try again.',
    };
  }

  saveCookieStore(toIconfontCookie(cookies), ctoken.value);
  return { success: true, message: 'Login successful! Cookies have been saved.' };
}

async function safeClose(close: (() => Promise<void>) | null): Promise<void> {
  if (!close) return;
  try {
    await close();
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Best-effort form helpers (selectors on iconfont.cn change over time, so
// every interaction is wrapped defensively. If auto-fill fails the user can
// always finish the login manually in the opened window — captureStill works
// because we poll for ctoken regardless.)
// ---------------------------------------------------------------------------

async function firstVisible(
  page: Page,
  selectors: string[]
): Promise<Locator | null> {
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    try {
      if ((await loc.count()) > 0) {
        await loc.waitFor({ state: 'visible', timeout: 1500 });
        return loc;
      }
    } catch {
      // try next
    }
  }
  return null;
}

async function clickFirst(page: Page, selectors: string[]): Promise<boolean> {
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    try {
      if ((await loc.count()) > 0) {
        await loc.click({ timeout: 2000 });
        return true;
      }
    } catch {
      // try next
    }
  }
  return false;
}

async function tryAutofillPassword(
  page: Page,
  account: string,
  password: string
): Promise<void> {
  try {
    // Switch to the account/password tab if the SMS tab is shown by default.
    await clickFirst(page, [
      'text=密码登录',
      'text=账号密码登录',
      'text=账号登录',
      'text=密码登陆',
    ]);

    const accountInput = await firstVisible(page, [
      'input[placeholder*="手机"]',
      'input[placeholder*="账号"]',
      'input[placeholder*="账户"]',
      'input[type="tel"]',
      'input[name="account"]',
      'input[name="phone"]',
      'input[name="username"]',
    ]);
    if (accountInput) {
      try {
        await accountInput.fill(account, { timeout: 2000 });
      } catch {
        /* ignore */
      }
    }

    const pwdInput = await firstVisible(page, [
      'input[type="password"]',
      'input[name="password"]',
    ]);
    if (pwdInput) {
      try {
        await pwdInput.fill(password, { timeout: 2000 });
      } catch {
        /* ignore */
      }
    }

    // Submit. If a slider/captcha appears, the user solves it in the window;
    // we keep polling for ctoken afterwards.
    await clickFirst(page, [
      'button:has-text("登录")',
      'button:has-text("登 录")',
      'button:has-text("登陆")',
      '[role="button"]:has-text("登录")',
      'text=登录',
    ]);
  } catch {
    // best-effort; fall back to manual completion
  }
}

async function tryStartSms(page: Page, phone: string): Promise<void> {
  try {
    // Switch to the SMS / verification-code tab if needed.
    await clickFirst(page, [
      'text=短信验证码登录',
      'text=验证码登录',
      'text=短信登录',
      'text=手机验证码',
    ]);

    const phoneInput = await firstVisible(page, [
      'input[placeholder*="手机"]',
      'input[type="tel"]',
      'input[name="phone"]',
      'input[name="mobile"]',
      'input[name="account"]',
    ]);
    if (phoneInput) {
      try {
        await phoneInput.fill(phone, { timeout: 2000 });
      } catch {
        /* ignore */
      }
    }

    // Click "获取验证码" / "获取短信验证码".
    await clickFirst(page, [
      'button:has-text("获取验证码")',
      'button:has-text("获取短信验证码")',
      'text=获取验证码',
      'text=获取短信验证码',
      'text=获取动态码',
    ]);
  } catch {
    // best-effort; the user can trigger the SMS manually in the window
  }
}

async function trySubmitSms(page: Page, code: string): Promise<void> {
  try {
    const codeInput = await firstVisible(page, [
      'input[placeholder*="验证码"]',
      'input[placeholder*="短信"]',
      'input[name="code"]',
      'input[name="smsCode"]',
      'input[name="verifyCode"]',
      'input[name="captcha"]',
    ]);
    if (codeInput) {
      try {
        await codeInput.fill(code, { timeout: 2000 });
      } catch {
        /* ignore */
      }
    }
    await clickFirst(page, [
      'button:has-text("登录")',
      'button:has-text("登 录")',
      '[role="button"]:has-text("登录")',
    ]);
  } catch {
    // best-effort
  }
}

// ---------------------------------------------------------------------------
// Public login strategies
// ---------------------------------------------------------------------------

/** Strategy 1: open the login page and let the user log in by any method. */
export async function openLoginPage(): Promise<LoginResult> {
  if (isCookieStoreValid()) {
    return { success: true, message: 'Already logged in. Cookie is still valid.' };
  }

  let close: (() => Promise<void>) | null = null;
  try {
    const launched = await launchPersistent();
    close = launched.close;
    const context = launched.context;
    const page = await context.newPage();
    await page.goto(LOGIN_URL);

    const ctoken = await waitForCtoken(context, LOGIN_TIMEOUT_MS);
    if (!ctoken) {
      await safeClose(close);
      return {
        success: false,
        message: 'Login timed out (5 minutes). Please try again.',
      };
    }

    const result = await finalize(context);
    await safeClose(close);
    return result;
  } catch (err) {
    await safeClose(close);
    return {
      success: false,
      message: `Login failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

/**
 * Strategy 2: log in with a raw Cookie header copied from the browser DevTools.
 * This is the most reliable method and works in headless / CI environments.
 */
export async function loginWithCookie(
  cookieHeader: string,
  ctoken?: string
): Promise<LoginResult> {
  const cookies = parseCookieHeader(cookieHeader);
  if (cookies.length === 0) {
    return {
      success: false,
      message: 'No cookies could be parsed from the provided cookie string.',
    };
  }

  const resolvedCtoken =
    ctoken?.trim() ||
    cookies.find((c) => c.name === 'ctoken')?.value ||
    '';

  if (!resolvedCtoken) {
    return {
      success: false,
      message:
        'ctoken was not found. Please include the "ctoken" cookie in the cookie string or pass the ctoken parameter.',
    };
  }

  // Verify FIRST with the new cookie (direct fetch, bypassing the store) —
  // only save on success. Saving before verifying would clobber an existing
  // valid login with a broken one.
  try {
    const verify = await fetch('https://www.iconfont.cn/api/pubinfo.json', {
      headers: {
        Cookie: cookieHeader,
        Referer: 'https://www.iconfont.cn/',
        Accept: 'application/json, text/plain, */*',
      },
      signal: AbortSignal.timeout(15000),
    });
    const data = (await verify.json()) as { data?: { user?: { id: number; nickname: string } | null } };
    const user = data?.data?.user;
    if (!user) {
      return {
        success: false,
        message:
          'Cookie is invalid or expired (server rejected it). Please copy a fresh Cookie header from a logged-in browser session.',
      };
    }
    saveCookieStore(cookies, resolvedCtoken);
    return {
      success: true,
      message: `Login successful via cookie. Logged in as: ${user.nickname} (ID: ${user.id}).`,
    };
  } catch (err) {
    return {
      success: false,
      message: `Cookie verification failed (existing login left untouched): ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}

/** Strategy 3: drive the account/password form. Best-effort; captcha solved manually. */
export async function loginWithPassword(
  account: string,
  password: string
): Promise<LoginResult> {
  if (isCookieStoreValid()) {
    return { success: true, message: 'Already logged in. Cookie is still valid.' };
  }

  let close: (() => Promise<void>) | null = null;
  try {
    const launched = await launchPersistent();
    close = launched.close;
    const context = launched.context;
    const page = await context.newPage();
    await page.goto(LOGIN_URL);

    await tryAutofillPassword(page, account, password);

    const ctoken = await waitForCtoken(context, LOGIN_TIMEOUT_MS);
    if (!ctoken) {
      await safeClose(close);
      return {
        success: false,
        message:
          'Login timed out (5 minutes). If a captcha appeared, solve it in the browser window and try again.',
      };
    }

    const result = await finalize(context);
    await safeClose(close);
    return result;
  } catch (err) {
    await safeClose(close);
    return {
      success: false,
      message: `Login failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

// ---------------------------------------------------------------------------
// Strategy 4: SMS verification code, split across two tool calls because the
// code is delivered out-of-band. A headed browser session is kept alive
// between the calls.
// ---------------------------------------------------------------------------

interface SmsSession {
  context: BrowserContext;
  close: () => Promise<void>;
  page: Page;
  phone: string;
  startedAt: number;
  timer: NodeJS.Timeout;
}

let smsSession: SmsSession | null = null;

function disposeSmsSession(): void {
  if (!smsSession) return;
  clearTimeout(smsSession.timer);
  const { close } = smsSession;
  smsSession = null;
  void close().catch(() => {});
}

/** Step 1 of SMS login: open the browser and request a verification code. */
export async function startSmsLogin(phone: string): Promise<LoginResult> {
  if (isCookieStoreValid()) {
    return { success: true, message: 'Already logged in. Cookie is still valid.' };
  }

  // Replace any previous pending session.
  disposeSmsSession();

  let close: (() => Promise<void>) | null = null;
  try {
    const launched = await launchPersistent();
    close = launched.close;
    const context = launched.context;
    const page = await context.newPage();
    await page.goto(LOGIN_URL);

    await tryStartSms(page, phone);

    const timer = setTimeout(disposeSmsSession, SMS_SESSION_TTL_MS);
    smsSession = {
      context,
      close,
      page,
      phone,
      startedAt: Date.now(),
      timer,
    };

    return {
      success: true,
      message:
        `Browser opened and an SMS code was requested for ${phone}. ` +
        'If a captcha appeared, solve it in the window (you may also trigger the SMS manually). ' +
        'Call iconfont_login_with_sms with the received code within 3 minutes.',
    };
  } catch (err) {
    await safeClose(close);
    return {
      success: false,
      message: `Failed to start SMS login: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}

/** Step 2 of SMS login: submit the verification code and capture cookies. */
export async function completeSmsLogin(code: string): Promise<LoginResult> {
  const session = smsSession;
  if (!session) {
    return {
      success: false,
      message:
        'No active SMS login session. Call iconfont_login_send_sms first (it must be used within 3 minutes).',
    };
  }

  try {
    await trySubmitSms(session.page, code.trim());

    const ctoken = await waitForCtoken(session.context, LOGIN_TIMEOUT_MS);
    if (!ctoken) {
      disposeSmsSession();
      return {
        success: false,
        message: 'Login timed out (5 minutes). The code may have been wrong or expired.',
      };
    }

    const result = await finalize(session.context);
    disposeSmsSession();
    return result;
  } catch (err) {
    disposeSmsSession();
    return {
      success: false,
      message: `SMS login failed: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}
