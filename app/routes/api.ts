import { getStore, StoreError } from '../../server/store';
import { configuration, sharedFeedback, transcribe, ServiceError } from '../../server/services';
import { guard, serviceStatus } from '../../server/availability';
import { acquire, addressKey, limited, remaining, type Endpoint } from '../../server/limits';
import {
  assertOrigin,
  clientAddress,
  ensurePass,
  passId,
  siteOrigin,
  visitorHash,
} from '../../server/security';
// Whole-server ceilings behind the per-client limits: cheap database writes only.
const eventCalls: number[] = [],
  reportCalls: number[] = [];
function ceiling(list: number[], max: number, now: number) {
  while (list.length && list[0] < now - 60000) list.shift();
  if (list.length >= max) return true;
  list.push(now);
  return false;
}
// Every refusal names its reason in a code the interface can act on; the message is a
// fallback for clients without one.
function refused(error: unknown) {
  const known = error instanceof StoreError || error instanceof ServiceError;
  return Response.json(
    {
      error: known ? error.message : 'Service unavailable. Please retry.',
      code: error instanceof ServiceError && error.code ? error.code : undefined,
    },
    { status: known ? error.status : 502 },
  );
}
const wait = (message: string, retryAfter: number, code = 'rate_limited') =>
  Response.json(
    { error: message, code, retryAfter },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } },
  );
// What a browser may still ask for today; the interface says so when it runs low.
const allowance = (pass: string | null, now: number) => ({
  feedback: pass ? remaining('pass', pass, 'feedback', now) : 0,
  speech: pass ? remaining('pass', pass, 'transcribe', now) : 0,
});
export function loader({ request, params }) {
  assertOrigin(request);
  if (params.service === 'status') {
    const now = Date.now(),
      pass = ensurePass(request, now);
    return Response.json(
      {
        ...serviceStatus(now),
        remaining: allowance(pass.id, now),
        reports: true,
        model: configuration().feedback_model,
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          ...(pass.header ? { 'Set-Cookie': pass.header } : {}),
        },
      },
    );
  }
  throw new Response('Not found', { status: 404 });
}
export async function action({ request, params }) {
  assertOrigin(request);
  if (request.headers.get('Origin') !== siteOrigin(request))
    throw new Response('Origin required', { status: 403 });
  const service: Endpoint = params.service;
  if (!['reports', 'feedback', 'transcribe', 'events'].includes(service))
    throw new Response('Not found', { status: 404 });
  if (request.method !== 'POST') throw new Response('Method not allowed', { status: 405 });
  const limit = service === 'transcribe' ? 9 * 1024 * 1024 : 16000;
  if (
    !request.headers.get('Content-Type')?.startsWith('application/json') ||
    Number(request.headers.get('Content-Length') || 0) > limit
  )
    throw new Response('Invalid request', { status: 400 });
  let body: any;
  try {
    const text = await request.text();
    if (text.length > limit) throw new Error();
    body = JSON.parse(text);
  } catch {
    throw new Response('Invalid JSON', { status: 400 });
  }
  const now = Date.now(),
    store = getStore();
  // A browser needs the pass its first page set; without one the client fetches
  // /api/status, which issues a pass, and retries once.
  const pass = passId(request, now);
  if (!pass)
    return refused(
      new ServiceError('Open the page again before using this.', 403, 'pass_required'),
    );
  // Per-address and per-pass windows for this endpoint. A used-up daily allowance (of
  // this browser or of the shared address) is a different message from a burst:
  // self-review for the rest of the day rather than a short wait.
  const address = addressKey(clientAddress(request));
  const throttled = () => {
    const exceeded =
      limited('address', address, service, now) || limited('pass', pass, service, now);
    if (!exceeded) return null;
    const daily = exceeded.window >= 86_400_000;
    return wait(
      daily ? 'Today’s allowance for this is used up.' : 'Please wait before trying again.',
      exceeded.retryAfter,
      daily ? 'allowance_exhausted' : 'rate_limited',
    );
  };
  // Anonymous learning events have their own allowance; they never block feedback.
  if (service === 'events') {
    const refusal = throttled();
    if (refusal) return refusal;
    if (ceiling(eventCalls, 600, now)) return wait('Too many events.', 60);
    const visitor = visitorHash(body?.visitor);
    if (!visitor) throw new Response('Invalid visitor', { status: 400 });
    try {
      return Response.json({ recorded: store.recordEvents(visitor, body.events, now) });
    } catch (error) {
      return Response.json(
        { error: error instanceof StoreError ? error.message : 'Invalid events.' },
        { status: 400 },
      );
    }
  }
  if (service === 'reports') {
    const refusal = throttled();
    if (refusal) return refusal;
    if (ceiling(reportCalls, 60, now)) return wait('Please wait a minute before trying again.', 60);
    try {
      return Response.json(store.report(body));
    } catch (error) {
      return refused(error);
    }
  }
  const item = store
    .catalogue()
    .find((i) => i.id === body.id && ['writing', 'speaking'].includes(i.part));
  if (!item) return refused(new StoreError('Invalid exercise.'));
  if (service === 'transcribe' && item.part !== 'speaking')
    return refused(new StoreError('Choose a speaking exercise.'));
  // Availability comes first: a refused request reaches no provider and counts as no call,
  // so a switched-off service does not fill the daily log with failures.
  const provider = service === 'feedback' ? 'feedback' : 'speech';
  try {
    guard(provider, now, store);
  } catch (error) {
    return refused(error);
  }
  // Then the windows, so a refusal while the service is off costs no allowance, and last
  // the semaphore: a burst waits a few seconds for a slot, then hears "busy".
  const refusal = throttled();
  if (refusal) return refusal;
  const release = await acquire(provider);
  if (!release)
    return refused(
      new ServiceError('It is busy right now. Please retry in a minute.', 503, 'busy'),
    );
  store.serviceEvent(service, visitorHash(body.visitor), item.id, now);
  let failed = false;
  try {
    if (service === 'feedback') {
      if (
        typeof body.answer !== 'string' ||
        !body.answer.trim() ||
        body.answer.length > 3000 ||
        !['nl', 'en'].includes(body.lang)
      )
        throw new StoreError('Invalid answer.');
      return Response.json(
        await sharedFeedback(item, body.answer, body.lang, (usage) =>
          store.tokens('feedback', usage),
        ),
      );
    }
    return Response.json(await transcribe(item, body));
  } catch (error) {
    failed = true;
    return refused(error);
  } finally {
    release();
    store.statistic(service, failed, Date.now() - now);
  }
}
