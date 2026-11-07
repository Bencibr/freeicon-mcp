import { getCookieHeader, getCtoken, markCookieExpired } from '../auth/cookie-store.js';
import { AuthError } from '../types/iconfont.js';

const BASE_URL = 'https://www.iconfont.cn';

interface ApiRequestOptions {
  method?: string;
  params?: Record<string, string | number | undefined>;
  body?: Record<string, unknown>;
  /** form-encoded POST body (iconfont 的数据 API 现在都用 POST + 表单编码) */
  form?: Record<string, string | number | undefined>;
}

export async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { method = 'GET', params, body, form } = options;

  const url = new URL(endpoint, BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const cookieHeader = getCookieHeader();
  const ctoken = getCtoken();

  const headers: Record<string, string> = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': BASE_URL,
    'Origin': BASE_URL,
    'Cookie': cookieHeader,
    // iconfont 的 API 必须带这几个头才返回 JSON（否则返回 SPA 首页 HTML）
    'x-requested-with': 'XMLHttpRequest',
    'bx-v': '2.5.37',
    'x-csrf-token': ctoken || 'null',
  };

  let reqBody: string | undefined;
  if (form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(form)) {
      if (v !== undefined) sp.set(k, String(v));
    }
    reqBody = sp.toString();
  } else if (body) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    reqBody = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: reqBody,
  });

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('text/html')) {
    // HTML = 风控挑战或会话失效。pubinfo 二次确认：session 还活着就不清 cookie，
    // 避免一次挑战误杀整个登录态。
    const snippet = (await response.text()).replace(/\s+/g, ' ').slice(0, 150);
    if (await confirmSessionDead()) {
      markCookieExpired();
      throw new AuthError(
        `Session expired (got HTML). Please call i_login again. Response: ${snippet}`
      );
    }
    throw new AuthError(
      `Risk-control challenge (got HTML) but session is still valid — retry later. Response: ${snippet}`
    );
  }

  const data = (await response.json()) as Record<string, unknown>;

  if (
    data.error_code === 'LOGIN REQUIRED' ||
    (data.code === 500 && data.message === 'LOGIN REQUIRED')
  ) {
    if (await confirmSessionDead()) {
      markCookieExpired();
      throw new AuthError('Session expired. Please call i_login to log in again.');
    }
    throw new AuthError(
      'LOGIN REQUIRED but pubinfo still sees a live session — cookies may be incomplete.'
    );
  }

  return data as T;
}

/**
 * pubinfo.json 是可靠的会话指示器（登录代理也用它确认登录）。
 * 仅当它明确说"无用户"时才判定 session 已死。
 */
async function confirmSessionDead(): Promise<boolean> {
  try {
    const r = await fetch(`${BASE_URL}/api/pubinfo.json`, {
      headers: {
        Cookie: getCookieHeader(),
        Referer: BASE_URL,
        Accept: 'application/json, text/plain, */*',
      },
      signal: AbortSignal.timeout(10000),
    });
    const ct = r.headers.get('content-type') || '';
    if (!ct.includes('json')) return false; // 不明确时保守处理：不清
    const d = (await r.json()) as { data?: { user?: unknown } };
    return !d?.data?.user;
  } catch {
    return false; // 网络异常时保守处理：不清
  }
}

export async function fetchRaw(url: string): Promise<Response> {
  const cookieHeader = getCookieHeader();
  const ctoken = getCtoken();

  const headers: Record<string, string> = {
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': BASE_URL,
    'Cookie': cookieHeader,
    'x-csrf-token': ctoken,
    'x-requested-with': 'XMLHttpRequest',
    'bx-v': '2.5.36',
  };

  return fetch(url, { headers });
}
