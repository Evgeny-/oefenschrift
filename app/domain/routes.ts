import type { Language, Level } from '../types';
const pages = new Set([
  'home',
  'reading',
  'listening',
  'writing',
  'speaking',
  'knm',
  'progress',
  'about',
  'privacy',
  'terms',
]);
export const levelPages = new Set([
  'reading',
  'listening',
  'writing',
  'speaking',
  'progress',
  'mock',
  'session',
  'check',
  'check-result',
]);
// English pages live under /en; Dutch, the default, keeps the plain path, so every page
// has one address per language for links, canonicals and hreflang pairs.
export function routeLang(location): Language | undefined {
  return /^\/en(?:\/|$)/i.test(location.pathname) ? 'en' : undefined;
}
const withoutLang = (pathname: string) => pathname.replace(/^\/en(?=\/|$)/i, '');
export function routeLevel(location): Level | undefined {
  const match = withoutLang(location.pathname).match(/^\/(a2|b1|b2)(?:\/|$)/i);
  return match?.[1].toUpperCase() as Level | undefined;
}
export function sessionRoute(active) {
  if (active?.setId) return `set/${active.setId}`;
  return active?.mode === 'practice' && active.ids.length === 1
    ? `exercise/${active.ids[0]}`
    : 'session';
}
export function routePath(route, level: Level = 'A2', lang: Language = 'nl') {
  return localizePath(plainPath(route, level), lang);
}
// The same page in a language: the prefix comes off or goes on without re-reading the route.
export function localizePath(path: string, lang: Language) {
  const plain = withoutLang(path) || '/';
  return lang === 'en' ? '/en' + (plain === '/' ? '' : plain) : plain;
}
function plainPath(route, level: Level) {
  if (route.startsWith('set/')) return `/sets/${encodeURIComponent(route.slice(4))}`;
  if (route.startsWith('exercise/')) return `/exercise/${encodeURIComponent(route.slice(9))}`;
  const prefix = `/${level.toLowerCase()}`;
  if (route === 'mock') return prefix + '/practice-test';
  if (route === 'session') return prefix + '/practice-test/session';
  if (route === 'check') return prefix + '/level-check';
  if (route === 'check-result') return prefix + '/level-check/result';
  if (route === 'home') return '/';
  return pages.has(route) ? `${levelPages.has(route) ? prefix : ''}/${route}` : prefix + '/reading';
}
export function readRoute(location, active) {
  try {
    if (location.hash && location.hash !== '#main-content') {
      const old = decodeURIComponent(location.hash.slice(1));
      if (old.startsWith('open/')) return `exercise/${old.slice(5)}`;
      if (old.startsWith('exercise/') || old.startsWith('set/')) return old;
      if (old === 'session') return sessionRoute(active);
      if (pages.has(old) || old === 'mock') return old;
    }
    let path = withoutLang(location.pathname.replace(/\/+$/, '')) || '/';
    const level = routeLevel(location);
    if (level) path = path.slice(3) || '/reading';
    let route = 'missing';
    if (path === '/practice-test') route = 'mock';
    else if (path === '/practice-test/session') route = 'session';
    else if (path === '/level-check') route = 'check';
    else if (path === '/level-check/result') route = 'check-result';
    else if (path.startsWith('/sets/')) {
      const id = decodeURIComponent(path.slice(6));
      if (id && !id.includes('/')) route = `set/${id}`;
    } else if (path.startsWith('/exercise/')) {
      const id = decodeURIComponent(path.slice(10));
      if (id && !id.includes('/')) route = `exercise/${id}`;
    } else if (path === '/' && !level) route = 'home';
    else if (pages.has(path.slice(1)) && path !== '/home') route = path.slice(1);
    else if (path === '/' || location.protocol === 'file:') route = 'reading';
    return level && !levelPages.has(route) ? 'missing' : route;
  } catch {}
  return 'missing';
}
export function plainClick(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !event.defaultPrevented
  );
}
