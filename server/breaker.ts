// Circuit breakers for the paid providers. A provider that is down, rate-limiting us or
// rejecting the key must not make every learner wait for a timeout: after repeated
// failures the service pauses itself, and the interface offers self-review instead.
// State lives in memory; a restart closes every breaker, which is what an operator wants
// after fixing the cause.
export type Service = 'feedback' | 'speech';
export type Outcome = 'ok' | 'failed' | 'rejected';
export const FAILURES_TO_PAUSE = 5,
  PAUSE_MS = 5 * 60 * 1000,
  REJECTED_PAUSE_MS = 30 * 60 * 1000;
type State = { failures: number; until: number; reason: 'errors' | 'rejected' | null };
const states = new Map<Service, State>();
const state = (service: Service) => {
  if (!states.has(service)) states.set(service, { failures: 0, until: 0, reason: null });
  return states.get(service)!;
};
// ok: the provider answered. failed: network error, 5xx or 429. rejected: 401, 402 or 403,
// meaning the key was revoked or the quota is exhausted, which no retry will fix soon.
export function record(service: Service, outcome: Outcome, now = Date.now()) {
  const s = state(service);
  if (outcome === 'ok') {
    s.failures = 0;
    s.until = 0;
    s.reason = null;
    return;
  }
  if (outcome === 'rejected') {
    s.failures = FAILURES_TO_PAUSE;
    s.until = now + REJECTED_PAUSE_MS;
    s.reason = 'rejected';
    return;
  }
  s.failures++;
  if (s.failures >= FAILURES_TO_PAUSE) {
    s.until = now + PAUSE_MS;
    s.reason = 'errors';
  }
}
// After the pause the next request goes through as a probe; one more failure re-opens the
// breaker at once because the failure count is kept until a success.
export function paused(service: Service, now = Date.now()) {
  const s = state(service);
  return s.until > now ? { until: s.until, reason: s.reason! } : null;
}
export function resume(service: Service) {
  states.delete(service);
}
export function reset() {
  states.clear();
}
