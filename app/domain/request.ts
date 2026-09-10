import { withBase } from './base';
// JSON posts to the site's own API. Paid calls need the session pass the first page set;
// when it is missing or expired the server answers 403 pass_required, /api/status issues a
// new one, and the request is repeated once. Every refusal carries a code the caller acts on.
export type ApiFailure = Error & { code?: string; retryAfter?: number; status?: number };
export async function postJson(
  url: string,
  body: unknown,
  init: { signal?: AbortSignal; keepalive?: boolean } = {},
  retried = false,
): Promise<any> {
  const response = await fetch(withBase(url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...init,
  });
  const result = await response.json().catch(() => ({}));
  if (response.ok) return result;
  if (result.code === 'pass_required' && !retried) {
    await fetch(withBase('/api/status'), { signal: init.signal }).catch(() => {});
    return postJson(url, body, init, true);
  }
  throw Object.assign(new Error(result.error || 'Request failed'), {
    code: result.code,
    retryAfter: Number(result.retryAfter) || undefined,
    status: response.status,
  }) as ApiFailure;
}
