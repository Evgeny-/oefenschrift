// Anonymous learning events for the operator's statistics. A random browser id
// (never a name or account) accompanies exercise and question ids, the chosen
// option letter, the interface language and level. Answer texts, transcripts and
// recordings are never part of an event. The Privacy page describes this.
import { postJson } from './request';
import { VISITOR_KEY, SESSION_KEY, readStored, writeStored } from './persistence';
let queue: any[] = [],
  timer: ReturnType<typeof setTimeout> | null = null,
  listening = false;
export function visitorId() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = readStored(localStorage, VISITOR_KEY, (value) => /^[a-f0-9]{32}$/.test(value));
    const id = saved || crypto.randomUUID().replace(/-/g, '');
    return writeStored(localStorage, VISITOR_KEY, id) || saved ? id : null;
  } catch {
    return null;
  }
}
export function flush() {
  if (!queue.length) return;
  const visitor = visitorId();
  if (!visitor) {
    queue = [];
    return;
  }
  const events = queue.splice(0, 50);
  try {
    postJson('/api/events', { visitor, events }, { keepalive: true }).catch(() => {});
  } catch {}
}
export function track(event: Record<string, unknown>) {
  if (typeof window === 'undefined' || window.location.protocol === 'file:') return;
  if (!listening) {
    listening = true;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) flush();
    });
    window.addEventListener('pagehide', flush);
  }
  queue.push(event);
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    flush();
  }, 1500);
}
// One visit per browser session, so a reload does not count twice.
export function trackVisit(settings: { lang: string; level: string }) {
  visitorId();
  try {
    const visited = readStored(sessionStorage, SESSION_KEY);
    writeStored(sessionStorage, SESSION_KEY, '1');
    if (visited) return;
  } catch {}
  track({ kind: 'visit', lang: settings.lang, level: settings.level });
}
