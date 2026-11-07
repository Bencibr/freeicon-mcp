/**
 * iconfont.cn 网络可达性检查
 *
 * 用于启动时检测域名能否正常解析和连接，给出明确的错误提示。
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://www.iconfont.cn';
const DEFAULT_HOSTS_IP = '203.119.213.12';

export interface NetworkCheckResult {
  reachable: boolean;
  message: string;
  detail?: string;
}

/**
 * 检查 iconfont.cn 是否可达（DNS 解析 + TCP 连接 + HTTP 响应）
 * timeout 默认 5 秒
 */
export async function checkIconfontReachable(
  timeoutMs = 5000
): Promise<NetworkCheckResult> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(BASE_URL, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual',
    });

    clearTimeout(timer);

    return {
      reachable: true,
      message: `iconfont.cn 可达 (HTTP ${response.status})`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);

    // 提取底层错误码（Node.js fetch 的 AggregateError）
    let errorCode = '';
    let errorAddress = '';
    if (err instanceof Error && 'cause' in err) {
      const cause = (err as Error & { cause: { code?: string; errors?: { address?: string }[] } }).cause;
      if (cause && cause.errors) {
        errorCode = cause.code || '';
        // 取第一个非 0.0.0.0 的地址
        for (const e of cause.errors) {
          if (e.address && e.address !== '0.0.0.0') {
            errorAddress = e.address!;
            break;
          }
        }
      }
    }

    const isTimeout = errorCode === 'ETIMEDOUT' || msg.includes('timeout') || msg.includes('abort');
    const isDns = errorCode === 'ENOTFOUND' || msg.includes('ENOTFOUND') || msg.includes('EAI_AGAIN');
    const isRefused = errorCode === 'ECONNREFUSED' || msg.includes('ECONNREFUSED');

    let hint = '';
    if (isDns) {
      hint =
        'DNS 解析失败。请尝试：\n' +
        `  1. 换 DNS：sudo networksetup -setdnsservers Wi-Fi 8.8.8.8 114.114.114.114\n` +
        `  2. 或写 hosts：sudo sh -c 'echo "${DEFAULT_HOSTS_IP} www.iconfont.cn" >> /etc/hosts'`;
    } else if (isTimeout) {
      hint =
        '连接超时。可能是 DNS 解析到错误 IP，请尝试：\n' +
        `  1. 写 hosts：sudo sh -c 'echo "${DEFAULT_HOSTS_IP} www.iconfont.cn" >> /etc/hosts'\n` +
        `  2. 或使用 VPN / 切换网络`;
      if (errorAddress) {
        hint += `\n   (尝试连接 ${errorAddress}:443 超时)`;
      }
    } else if (isRefused) {
      hint =
        '连接被拒绝。请检查网络环境，可能需要 VPN 或代理。';
    } else {
      hint =
        '未知网络错误。请检查网络连接，或尝试 VPN / 代理。';
    }

    return {
      reachable: false,
      message: `iconfont.cn 不可达：${msg}`,
      detail: hint,
    };
  }
}

/**
 * 读取 package.json 中的版本号
 */
export function getPackageVersion(): string {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pkgPath = resolve(__dirname, '../../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * 从 GitHub 获取最新发布版本（不抛出异常）
 */
export async function getLatestVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/Bencibr/freeicon-mcp/releases/latest',
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!response.ok) {
      // 可能没有 release，查 tags
      const tagsResp = await fetch(
        'https://api.github.com/repos/Bencibr/freeicon-mcp/tags',
        {
          headers: { Accept: 'application/vnd.github.v3+json' },
          signal: AbortSignal.timeout(5000),
        }
      );
      if (tagsResp.ok) {
        const tags = (await tagsResp.json()) as { name: string }[];
        if (tags.length > 0) return tags[0].name.replace(/^v/, '');
      }
      return null;
    }
    const data = (await response.json()) as { tag_name?: string };
    return data.tag_name ? data.tag_name.replace(/^v/, '') : null;
  } catch {
    return null;
  }
}