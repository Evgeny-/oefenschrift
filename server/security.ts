import { setting as environmentSetting } from '../environment';
import { randomBytes, createHmac, timingSafeEqual, scryptSync } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { redirect } from 'react-router';
import {
  OPS_COOKIE,
  PASS_COOKIE,
  cookieValue,
  readCookie,
  legacyNames,
} from '../app/domain/persistence';
// The public address of the site, for example https://oefenschrift.nl. Unset in
// development and tests, where the server answers on loopback only.
export function publicOrigin() {
  const value = (environmentSetting('ORIGIN') || '').trim().replace(/\/+$/, '');
  if (!value) return null;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash)
    throw new Error('OEFENSCHRIFT_ORIGIN must be a bare origin such as https://example.org');
  return url.origin;
}
// The path the site is served under on a shared host ('' at a root). The bundles carry the
// same value from build time; the entry refuses to start when the two differ.
export function basePath() {
  const value = (environmentSetting('BASE_PATH') || '').trim().replace(/\/+$/, '');
  if (value && !/^\/[\w-]+(\/[\w-]+)*$/.test(value))
    throw new Error('OEFENSCHRIFT_BASE_PATH must look like /projects/name');
  return value;
}
export function stripBase(pathname: string) {
  const base = basePath();
  return base && (pathname === base || pathname.startsWith(base + '/'))
    ? pathname.slice(base.length) || '/'
    : pathname;
}
export const loopback = (hostname: string) =>
  ['127.0.0.1', 'localhost', '[::1]', '::1'].includes(hostname);
// The origin the site compares Origin headers against and uses in canonical URLs: the
// configured public origin when there is one, otherwise the origin of the request.
export function siteOrigin(request) {
  return publicOrigin() || new URL(request.url).origin;
}
// Browsers send Sec-Fetch-Site: cross-site on a top-level navigation from another site,
// such as a link in a search result or a chat message; that must work. Every other
// cross-site request (fetch, form post, embed) is rejected.
export function crossSiteRejected(
  header: (name: string) => string | null | undefined,
  method: string,
) {
  return (
    header('sec-fetch-site') === 'cross-site' &&
    !(header('sec-fetch-mode') === 'navigate' && ['GET', 'HEAD'].includes(method))
  );
}
export function assertOrigin(request) {
  const url = new URL(request.url),
    expected = publicOrigin();
  if (!(url.origin === expected || loopback(url.hostname)))
    throw new Response('Host rejected', { status: 403 });
  const origin = request.headers.get('Origin');
  if (origin && origin !== siteOrigin(request))
    throw new Response('Origin rejected', { status: 403 });
  if (crossSiteRejected((name) => request.headers.get(name), request.method))
    throw new Response('Cross-site access rejected', { status: 403 });
}
// The client address is written by the Express entry after the proxy hops it trusts, so
// the value can never come from the request itself.
export function clientAddress(request) {
  return request.headers.get('X-Client-Address') || 'local';
}
function secret() {
  if (environmentSetting('ADMIN_SECRET')) return environmentSetting('ADMIN_SECRET');
  const path = resolve('var/admin-secret');
  mkdirSync('var', { recursive: true });
  try {
    return readFileSync(path, 'utf8');
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
    const value = randomBytes(32).toString('hex');
    try {
      writeFileSync(path, value, { mode: 0o600, flag: 'wx' });
      return value;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EEXIST') return readFileSync(path, 'utf8');
      throw error;
    }
  }
}
function sign(value) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}
function equal(a, b) {
  return (
    typeof a === 'string' &&
    typeof b === 'string' &&
    a.length === b.length &&
    timingSafeEqual(Buffer.from(a), Buffer.from(b))
  );
}
// An operator stays signed in for six months (the user's choice: one operator, own
// devices, no shared machines); Sign out ends it earlier, and so does a changed secret.
export const SESSION_HOURS = 183 * 24;
// A session token is issued only by a successful login: login.<issued>.<random>.<signature>.
function valid(token) {
  const [kind, time, random, sig] = String(token || '').split('.');
  return (
    kind === 'login' &&
    /^\d+$/.test(time || '') &&
    /^[a-f0-9]{32}$/.test(random || '') &&
    Date.now() - Number(time) < SESSION_HOURS * 3600 * 1000 &&
    Number(time) <= Date.now() &&
    equal(sig, sign('login.' + time + '.' + random))
  );
}
function cookie(request) {
  return readCookie(request.headers.get('Cookie') || '', OPS_COOKIE);
}
function cookieHeader(value, maxAge, name = OPS_COOKIE) {
  return `${name}=${value}; Path=${basePath() || '/'}; HttpOnly; SameSite=${name.endsWith('_ops') ? 'Strict' : 'Lax'}; Max-Age=${maxAge}${publicOrigin()?.startsWith('https:') ? '; Secure' : ''}`;
}
export const CREDENTIALS_PATH = 'var/admin-credentials.json';
// The operator account: OEFENSCHRIFT_ADMIN_USER with OEFENSCHRIFT_ADMIN_PASSWORD (local
// development and tests) or a scrypt hash written by `npm run admin:password`.
export function adminCredentials(): {
  user: string;
  password?: string;
  salt?: string;
  hash?: string;
} | null {
  const user = environmentSetting('ADMIN_USER');
  if (user && environmentSetting('ADMIN_PASSWORD'))
    return { user, password: environmentSetting('ADMIN_PASSWORD') };
  try {
    const stored = JSON.parse(
      readFileSync(resolve(environmentSetting('ADMIN_CREDENTIALS') || CREDENTIALS_PATH), 'utf8'),
    );
    if (
      typeof stored.user === 'string' &&
      typeof stored.salt === 'string' &&
      typeof stored.hash === 'string'
    )
      return stored;
  } catch {}
  return null;
}
export function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return { salt, hash: scryptSync(password, salt, 64).toString('hex') };
}
export function writeCredentials(user, password) {
  if (!/^[\w.@-]{2,64}$/.test(user))
    throw new Error('Choose a user name of 2-64 letters, digits, dots, @, _ or -.');
  if (typeof password !== 'string' || password.length < 10)
    throw new Error('Use a password of at least 10 characters.');
  const path = resolve(environmentSetting('ADMIN_CREDENTIALS') || CREDENTIALS_PATH);
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(
    path,
    JSON.stringify(
      { user, ...hashPassword(password), created: new Date().toISOString() },
      null,
      1,
    ) + '\n',
    { mode: 0o600 },
  );
  return path;
}
export function verifyLogin(user, password) {
  const account = adminCredentials();
  if (!account || typeof user !== 'string' || typeof password !== 'string') return false;
  const nameMatches = equal(user, account.user);
  if (account.password !== undefined) return nameMatches && equal(password, account.password);
  return nameMatches && equal(hashPassword(password, account.salt).hash, account.hash);
}
// Five failed attempts per address pause logins for fifteen minutes.
const attempts = new Map<string, number[]>();
export function loginAllowed(address, now = Date.now()) {
  const recent = (attempts.get(address) || []).filter((time) => now - time < 15 * 60 * 1000);
  attempts.set(address, recent);
  return recent.length < 5;
}
export function loginFailed(address, now = Date.now()) {
  attempts.set(address, [...(attempts.get(address) || []), now]);
}
export function loginSession() {
  const value = 'login.' + Date.now() + '.' + randomBytes(16).toString('hex'),
    token = value + '.' + sign(value);
  return {
    token,
    headers: {
      'Set-Cookie': cookieHeader(token, SESSION_HOURS * 3600),
      'Cache-Control': 'no-store',
    },
  };
}
export function logoutHeaders() {
  const headers = new Headers({ 'Cache-Control': 'no-store' });
  for (const name of [OPS_COOKIE, ...legacyNames[OPS_COOKIE]])
    headers.append('Set-Cookie', cookieHeader('', 0, name));
  return headers;
}
export function signedIn(request) {
  assertOrigin(request);
  const token = cookie(request);
  return valid(token) ? token : null;
}
// Pages and JSON endpoints call this first; without a session it sends the operator to the login form.
export function adminSession(request) {
  const token = signedIn(request);
  if (token) return { token, headers: migrationHeaders(request) };
  const url = new URL(request.url),
    path = stripBase(url.pathname);
  if (request.headers.get('Accept')?.includes('text/html') || path.startsWith('/ops'))
    throw redirect('/ops/login?next=' + encodeURIComponent(path + url.search));
  throw new Response('Sign in to the administration first.', { status: 401 });
}
export function requireAdminMutation(request, token) {
  assertOrigin(request);
  const origin = request.headers.get('Origin');
  if (origin !== siteOrigin(request) || !valid(token) || !equal(token, cookie(request)))
    throw new Response('Reload the admin page and try again.', { status: 403 });
}
// The session pass: an HttpOnly cookie every browser receives with its first page, and
// the key for that browser's allowance of paid calls. It is signed like the operator
// session, carries no learner data, lasts a day and is renewed after twelve hours. It is
// Lax rather than Strict so that arriving through a link from another site keeps the
// existing pass instead of issuing a fresh allowance.
export const PASS_HOURS = 24,
  PASS_RENEW_HOURS = 12;
const passCookie = (request) => readCookie(request.headers.get('Cookie') || '', PASS_COOKIE);
function passParts(token, now) {
  const [kind, time, random, sig] = String(token || '').split('.');
  if (
    kind !== 'pass' ||
    !/^\d+$/.test(time || '') ||
    !/^[a-f0-9]{32}$/.test(random || '') ||
    now - Number(time) >= PASS_HOURS * 3600 * 1000 ||
    Number(time) > now + 60000 ||
    !equal(sig, sign('pass.' + time + '.' + random))
  )
    return null;
  return { issued: Number(time), id: random };
}
// The pass id of the request, or null without a valid pass.
export function passId(request, now = Date.now()) {
  return passParts(passCookie(request), now)?.id ?? null;
}
export function issuePass(now = Date.now()) {
  const value = 'pass.' + now + '.' + randomBytes(16).toString('hex');
  const token = value + '.' + sign(value);
  return {
    id: value.split('.')[2],
    header: cookieHeader(token, PASS_HOURS * 3600, PASS_COOKIE),
  };
}
// For page loads: the current pass id plus a Set-Cookie header when a pass is missing,
// expired or older than the renewal age.
export function ensurePass(request, now = Date.now()) {
  const current = passParts(passCookie(request), now);
  if (current && now - current.issued < PASS_RENEW_HOURS * 3600 * 1000)
    return { id: current.id, header: null };
  const fresh = issuePass(now);
  return { id: fresh.id, header: fresh.header };
}
// Copy signed tokens without changing their identity or extending their original expiry.
// Headers must stay separate so browsers receive each Set-Cookie, including deletions.
export function migrationHeaders(request, now = Date.now()) {
  const headers = new Headers({ 'Cache-Control': 'no-store' });
  const cookies = request.headers.get('Cookie') || '';
  for (const name of [PASS_COOKIE, OPS_COOKIE]) {
    for (const oldName of legacyNames[name]) {
      const token = cookieValue(cookies, oldName);
      if (token === undefined) continue;
      const accepted = name === PASS_COOKIE ? !!passParts(token, now) : valid(token);
      if (cookieValue(cookies, name) === undefined && accepted) {
        const hours = name === PASS_COOKIE ? PASS_HOURS : SESSION_HOURS;
        const remaining = Math.max(
          0,
          Math.floor((Number(token.split('.')[1]) + hours * 3600000 - now) / 1000),
        );
        headers.append('Set-Cookie', cookieHeader(token, remaining, name));
      }
      headers.append('Set-Cookie', cookieHeader('', 0, oldName));
    }
  }
  return headers;
}
// Learner events carry a random browser id; only its keyed hash reaches the database.
export function visitorHash(id) {
  return typeof id === 'string' && /^[a-f0-9-]{8,64}$/.test(id)
    ? createHmac('sha256', secret())
        .update('visitor.' + id)
        .digest('hex')
        .slice(0, 32)
    : null;
}
