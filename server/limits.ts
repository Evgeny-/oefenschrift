// Request limits for the public API, in memory for the single server process.
//
// Two scopes: the client address (an IPv4 address or an IPv6 /64, so one household or
// school counts once) and the session pass (one browser). Each endpoint has fixed windows
// per scope; the address ceilings are wide enough for a classroom behind one address, the
// pass allowances small enough that a browser cannot spend much. Provider calls also pass
// through a semaphore so a burst waits briefly and then answers "busy" instead of piling
// up sockets, temporary files and provider rate limits.
export type Scope = 'address' | 'pass';
export type Endpoint = 'feedback' | 'transcribe' | 'reports' | 'events';
const MINUTE = 60_000,
  HOUR = 3_600_000,
  DAY = 86_400_000;
export type Rule = [window: number, max: number];
export const RULES: Record<Scope, Record<Endpoint, Rule[]>> = {
  address: {
    feedback: [
      [MINUTE, 6],
      [HOUR, 40],
      [DAY, 150],
    ],
    transcribe: [
      [MINUTE, 4],
      [HOUR, 30],
      [DAY, 100],
    ],
    reports: [
      [MINUTE, 2],
      [HOUR, 5],
      [DAY, 10],
    ],
    events: [
      [MINUTE, 120],
      [DAY, 3000],
    ],
  },
  pass: {
    feedback: [
      [MINUTE, 3],
      [DAY, 30],
    ],
    transcribe: [
      [MINUTE, 2],
      [DAY, 20],
    ],
    reports: [
      [MINUTE, 2],
      [DAY, 10],
    ],
    events: [
      [MINUTE, 60],
      [DAY, 600],
    ],
  },
};
type Window = { start: number; n: number };
const counters = new Map<string, Window[]>();
let sweepAt = 0;
// Keys whose longest window has passed are dropped once an hour, so memory stays bounded
// by the number of clients seen in the last day.
function sweep(now: number) {
  if (now < sweepAt) return;
  sweepAt = now + HOUR;
  for (const [key, windows] of counters)
    if (windows.every((w, i) => !w || now - w.start >= (ruleFor(key)[i]?.[0] ?? DAY)))
      counters.delete(key);
}
const ruleFor = (key: string) => {
  const [scope, endpoint] = key.split(':') as [Scope, Endpoint];
  return RULES[scope]?.[endpoint] ?? [];
};
export function addressKey(address: string) {
  if (!address.includes(':')) return address;
  // The first four groups of an expanded IPv6 address: the /64 a provider hands out.
  const [head, tail = ''] = address.split('::'),
    left = head ? head.split(':') : [],
    right = tail ? tail.split(':') : [],
    groups = [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right];
  return groups
    .slice(0, 4)
    .map((g) => g.toLowerCase().replace(/^0+(?=\w)/, ''))
    .join(':');
}
export type Limited = { window: number; retryAfter: number };
// Counts one request against every window of the scope and endpoint. Returns the first
// exhausted window (with the seconds until it reopens) without counting the request.
export function limited(
  scope: Scope,
  key: string,
  endpoint: Endpoint,
  now = Date.now(),
): Limited | null {
  sweep(now);
  const rules = RULES[scope][endpoint],
    id = `${scope}:${endpoint}:${key}`,
    windows = counters.get(id) ?? rules.map(() => ({ start: now, n: 0 }));
  for (const [i, [size]] of rules.entries())
    if (now - windows[i].start >= size) windows[i] = { start: now, n: 0 };
  for (const [i, [size, max]] of rules.entries())
    if (windows[i].n >= max)
      return {
        window: size,
        retryAfter: Math.max(1, Math.ceil((windows[i].start + size - now) / 1000)),
      };
  for (const w of windows) w.n++;
  counters.set(id, windows);
  return null;
}
// How many requests a key may still make in the longest window (the day), for the
// interface to say when a browser's allowance is used up.
export function remaining(scope: Scope, key: string, endpoint: Endpoint, now = Date.now()) {
  const rules = RULES[scope][endpoint],
    windows = counters.get(`${scope}:${endpoint}:${key}`);
  const i = rules.length - 1,
    [size, max] = rules[i];
  if (!windows || now - windows[i].start >= size) return max;
  return Math.max(0, max - windows[i].n);
}
export function resetLimits() {
  counters.clear();
  sweepAt = 0;
}
// Provider concurrency. acquire resolves with a release function, or null when the wait
// ran out; the caller then answers "busy" and the learner retries a moment later.
export const CONCURRENCY = { feedback: 6, speech: 3 },
  ACQUIRE_WAIT_MS = 4000;
type Waiter = { resolve: (release: (() => void) | null) => void; timer: NodeJS.Timeout };
const inFlight = { feedback: 0, speech: 0 },
  waiting: Record<'feedback' | 'speech', Waiter[]> = { feedback: [], speech: [] };
export function acquire(
  service: 'feedback' | 'speech',
  waitMs = ACQUIRE_WAIT_MS,
): Promise<(() => void) | null> {
  const release = () => {
    const next = waiting[service].shift();
    if (next) {
      clearTimeout(next.timer);
      next.resolve(release);
    } else inFlight[service]--;
  };
  if (inFlight[service] < CONCURRENCY[service]) {
    inFlight[service]++;
    return Promise.resolve(release);
  }
  return new Promise((resolve) => {
    const waiter: Waiter = {
      resolve,
      timer: setTimeout(() => {
        waiting[service] = waiting[service].filter((w) => w !== waiter);
        resolve(null);
      }, waitMs),
    };
    waiting[service].push(waiter);
  });
}
export const inFlightCount = (service: 'feedback' | 'speech') => inFlight[service];
