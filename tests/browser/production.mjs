import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = process.env.TEST_ORIGIN;
assert.ok(origin, 'Use npm run test:production to start an isolated server.');
// With INBURGERING_BASE_PATH the build and the server put the site under that path, as on
// the shared host; every app URL below is relative to it.
const base = (process.env.INBURGERING_BASE_PATH || '').replace(/\/+$/, ''),
  site = origin + base;
const checks = [],
  errors = [];
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const exercisePath =
  '/exercise/' + encodeURIComponent(bank.find((item) => item.part === 'speaking').id);
for (const [path, expected] of [
  ['/', 200],
  ['/en', 200],
  ['/reading', 200],
  ['/sets/a2-listening-01', 200],
  [exercisePath, 200],
  ['/missing-page', 404],
  ['/missing.js', 404],
  ['/config/services.json', 404],
  ['/ops/login', 200],
  ['/admin', 404],
]) {
  const response = await fetch(site + path);
  assert.equal(response.status, expected, path);
  assert.ok(response.headers.get('cache-control')?.includes('no-store'));
  if (['/', '/en', '/reading'].includes(path)) {
    const html = await response.text(),
      csp = response.headers.get('content-security-policy');
    // Under a base path nothing may point at the host root: every href, src and url()
    // the page emits starts with the base (a shared host answers the root with nothing).
    if (base)
      for (const [, url] of html.matchAll(/(?:href|src|action)="(\/[^"]*)"/g))
        assert.ok(url.startsWith(base + '/') || url === base, `root-relative URL ${url}`);
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
    assert.ok(nonce && !csp.includes("script-src 'self' 'unsafe-inline'"));
    for (const [, attributes] of html.matchAll(/<script\b([^>]*)>/g)) {
      if (!attributes.includes('src='))
        assert.ok(
          attributes.includes(`nonce="${nonce}"`),
          'Every streamed inline script must carry the response nonce',
        );
    }
    assert.ok(!html.includes('/@vite/client'));
    checks.push(`${path}: production streaming scripts all carry their CSP nonce`);
  }
  checks.push(`${path}: ${expected} with cache prevention`);
}
const plainHTML = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
for (const part of ['reading', 'listening', 'writing', 'speaking', 'knm']) {
  const item = bank.find((item) => item.part === part),
    path = '/exercise/' + encodeURIComponent(item.id);
  const html = plainHTML(await fetch(site + path).then((r) => r.text()));
  assert.ok(
    html.includes('<h1') && html.includes(item.title),
    part + ' has a server-rendered title',
  );
  assert.ok(
    html.includes(item.questions ? 'class="question"' : 'class="task-brief sheet"'),
    part + ' has its actual task before JavaScript',
  );
  assert.ok(html.includes('rel="canonical"') && html.includes('<meta name="description"'));
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.ok(!html.includes('class="loading-app"'));
  checks.push(part + ': task content and unique metadata are present in server HTML');
}
const preferences = encodeURIComponent(
  JSON.stringify({ level: 'B1', lang: 'en', theme: 'dark', clock: false }),
);
const personalized = plainHTML(
  await fetch(site + '/reading', {
    headers: { Cookie: 'inburgering_preferences=' + preferences },
  }).then((r) => r.text()),
);
assert.ok(
  personalized.includes('<html lang="en" data-theme="dark"') && personalized.includes('B1 · '),
);
checks.push('Server HTML respects saved language, level and explicit theme');
// A shared level address keeps its level; the language follows the browser to /en.
const shared = plainHTML(
  await fetch(site + '/a2/reading', {
    headers: { Cookie: 'inburgering_preferences=' + preferences },
  }).then((r) => r.text()),
);
assert.ok(shared.includes('A2 · ') && !shared.includes('B1 · '));
assert.ok(
  shared.includes(`<link rel="canonical" href="${site}/en/a2/reading"`) &&
    shared.includes('A2 Reading practice'),
);
assert.ok(shared.includes('property="og:title"') && shared.includes('name="twitter:card"'));
checks.push(
  'Shared level URL overrides conflicting preferences in the server content and metadata',
);
// Without a preference (a crawler, a first visit) the plain path is Dutch and both
// versions name each other; /en is English whatever the cookie says. React writes the
// camel-cased prop name; HTML attribute names are case-insensitive, so compare lowered.
const lowered = (html) => plainHTML(html).replace(/hrefLang=/g, 'hreflang=');
const dutch = lowered(await fetch(site + '/a2/reading').then((r) => r.text()));
assert.ok(
  dutch.includes('<html lang="nl"') &&
    dutch.includes(`<link rel="canonical" href="${site}/a2/reading"`) &&
    dutch.includes('A2 Lezen oefenen') &&
    dutch.includes(`hreflang="nl" href="${site}/a2/reading"`) &&
    dutch.includes(`hreflang="en" href="${site}/en/a2/reading"`) &&
    dutch.includes(`hreflang="x-default" href="${site}/a2/reading"`) &&
    dutch.includes('content="nl_NL"'),
);
const english = lowered(
  await fetch(site + '/en/a2/reading', {
    headers: {
      Cookie:
        'inburgering_preferences=' +
        encodeURIComponent(JSON.stringify({ level: 'A2', lang: 'nl', theme: 'light' })),
    },
  }).then((r) => r.text()),
);
assert.ok(
  english.includes('<html lang="en"') &&
    english.includes(`<link rel="canonical" href="${site}/en/a2/reading"`) &&
    english.includes('A2 Reading practice') &&
    english.includes(`hreflang="nl" href="${site}/a2/reading"`) &&
    english.includes('content="en_GB"') &&
    !english.includes('A2 Lezen oefenen'),
);
checks.push('Each page has a Dutch and an English address that name each other as alternates');
for (const [path, status, target] of [
  ['/reading', 307, '/a2/reading'],
  ['/B1/reading/', 308, '/b1/reading'],
  ['/c1/reading', 404, null],
  ['/b1/knm', 404, null],
  ['/en/reading', 307, '/en/a2/reading'],
  ['/EN/a2/reading/', 308, '/en/a2/reading'],
  ['/en/home', 404, null],
  ['/en/b1/knm', 404, null],
  ['/english', 404, null],
]) {
  const response = await fetch(site + path, { redirect: 'manual' });
  assert.equal(response.status, status, path);
  if (target) assert.equal(response.headers.get('location'), base + target);
}
for (const [path, status, target] of [
  ['/a2/reading', 307, '/en/a2/reading'],
  ['/', 307, '/en'],
  ['/knm?x=1', 307, '/en/knm?x=1'],
  ['/en/a2/reading', 200, null],
]) {
  const response = await fetch(site + path, {
    redirect: 'manual',
    headers: { Cookie: 'inburgering_preferences=' + preferences },
  });
  assert.equal(response.status, status, path);
  if (target) assert.equal(response.headers.get('location'), base + target);
}
checks.push(
  'Legacy and noncanonical paths redirect, a saved English preference moves to /en, unsupported levels return 404',
);
const empty = plainHTML(await fetch(site + '/b2/reading').then((r) => r.text()));
assert.ok(empty.includes('content="noindex, follow"'));
const privatePage = plainHTML(await fetch(site + '/b1/progress').then((r) => r.text()));
assert.ok(privatePage.includes('content="noindex, follow"'));
checks.push('Empty B2 and private progress pages request noindex');
const sitemap = await fetch(site + '/sitemap.xml').then((r) => r.text());
assert.equal((sitemap.match(/<loc>[^<]*\/exercise\//g) || []).length, 2 * bank.length);
assert.equal((sitemap.match(/<loc>[^<]*\/en\/exercise\//g) || []).length, bank.length);
assert.ok(
  sitemap.includes('/a2/reading') && sitemap.includes('/b1/reading') && !sitemap.includes('/b2/'),
);
assert.ok(
  sitemap.includes(`<loc>${site}/en</loc>`) &&
    sitemap.includes(`hreflang="en" href="${site}/en/a2/reading"`) &&
    sitemap.includes(`hreflang="x-default" href="${site}/a2/reading"`),
);
checks.push('Sitemap exposes every stable exercise URL in both languages with their alternates');

const ws = new WebSocket(`ws://127.0.0.1:${process.env.FIREFOX_BIDI_PORT}/session`);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let id = 0,
  context;
const pending = new Map(),
  blocked = [];
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.type === 'error' ? reject(new Error(message.message)) : resolve(message.result);
  } else if (
    message.method === 'log.entryAdded' &&
    message.params.level === 'error' &&
    message.params.source?.context === context
  )
    errors.push(message.params.text);
  else if (message.method === 'network.beforeRequestSent' && message.params.isBlocked)
    blocked.push(message.params.request.request);
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const current = ++id;
    pending.set(current, { resolve, reject });
    ws.send(JSON.stringify({ id: current, method, params }));
  });
await send('session.new', { capabilities: {} });
try {
  ({ context } = await send('browsingContext.create', { type: 'tab' }));
  await send('session.subscribe', { events: ['log.entryAdded', 'network.beforeRequestSent'] });
  // Firefox may log CSP violations as warnings. Capture the browser event on every
  // document so a blocked inline script fails the journey even if the app hydrates.
  await send('script.addPreloadScript', {
    functionDeclaration: `()=>{document.addEventListener('securitypolicyviolation',event=>console.error('CSP violation: '+event.effectiveDirective+' '+event.blockedURI));}`,
  });
  const evaluate = async (expression) => {
    const result = await send('script.evaluate', {
      expression,
      target: { context },
      awaitPromise: true,
    });
    assert.notEqual(
      result.type,
      'exception',
      'Browser evaluation failed: ' + result.exceptionDetails?.text,
    );
    return result.result?.value;
  };
  const ready = (selector) =>
    evaluate(
      `new Promise((resolve,reject)=>{const end=Date.now()+7000;const check=()=>document.querySelector(${JSON.stringify(selector)})?resolve(true):Date.now()>end?reject(Error('Expected control missing')):setTimeout(check,50);check();})`,
    );
  const clientEntry = (await fs.readdir('build/client/assets')).find(
    (file) => file.startsWith('entry.client-') && file.endsWith('.js'),
  );
  assert.ok(clientEntry, 'Production client entry exists');
  const { intercept } = await send('network.addIntercept', {
    phases: ['beforeRequestSent'],
    contexts: [context],
    urlPatterns: [{ type: 'string', pattern: site + '/assets/' + clientEntry }],
  });
  await send('browsingContext.navigate', {
    context,
    url: site + '/sets/a2-listening-01',
    wait: 'none',
  });
  await ready('.audio-player');
  await evaluate('document.fonts.ready.then(()=>true)');
  assert.notEqual(await evaluate(`document.querySelector('.app-shell').dataset.hydrated`), 'true');
  const geometry = () =>
    evaluate(
      `JSON.stringify(['.wordmark','h1','.audio-player','.question','.exercise-meta'].map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {selector,x:r.x,y:r.y,width:r.width,height:r.height}}))`,
    );
  const before = JSON.parse(await geometry());
  checks.push('Listening content is visible while the client entry is blocked');
  await send('network.removeIntercept', { intercept });
  for (const request of blocked) await send('network.continueRequest', { request });
  await ready('.app-shell[data-hydrated]');
  const after = JSON.parse(await geometry());
  for (let i = 0; i < before.length; i++)
    for (const key of ['x', 'y', 'width', 'height'])
      assert.ok(
        Math.abs(before[i][key] - after[i][key]) < 1,
        `${before[i].selector} ${key} shifted during hydration`,
      );
  checks.push('Exercise and sidebar geometry stay unchanged through hydration');
  await send('browsingContext.navigate', { context, url: site + '/en', wait: 'complete' });
  await ready('.app-shell[data-hydrated]');
  checks.push('English home page hydrates without a CSP violation');
  await send('browsingContext.navigate', { context, url: site + '/reading', wait: 'complete' });
  await ready('.app-shell[data-hydrated]');
  checks.push('Compiled app hydrates under the production CSP');
  await evaluate(`document.querySelector('[data-page="listening"]').click();true;`);
  await ready('[data-set="a2-listening-01"]');
  const navigationData = JSON.parse(
    await evaluate(
      `JSON.stringify(performance.getEntriesByType('resource').filter(entry=>new URL(entry.name).pathname.endsWith('.data')).map(entry=>({url:entry.name,bytes:entry.decodedBodySize})))`,
    ),
  );
  assert.ok(navigationData.length, 'Subject navigation requests fresh route data');
  for (const entry of navigationData) {
    assert.ok(entry.bytes > 0 && entry.bytes < 16000, `Navigation payload is ${entry.bytes} bytes`);
    assert.ok(!new URL(entry.url).searchParams.get('_routes')?.includes('study-layout'));
  }
  checks.push('Subject navigation reuses the catalogue and downloads under 16 kB of route data');
  checks.push('Client navigation loads the next subject');
  await evaluate(`document.querySelector('[data-set="a2-listening-01"]').click();true;`);
  await ready('.audio-player');
  checks.push('Set link opens the listening workspace');
  await send('browsingContext.reload', { context, wait: 'complete' });
  await ready('.question');
  checks.push('Direct set reload restores practice');
  await send('browsingContext.navigate', {
    context,
    url: site + '/ops/exercises',
    wait: 'complete',
  });
  await ready('#admin-user');
  checks.push('Compiled administration asks for a login');
  await evaluate(
    `(()=>{document.querySelector('#admin-user').value='browser-test';document.querySelector('#admin-password').value='browser-test-password';document.querySelector('.admin-login-form .primary').click();})();true;`,
  );
  await ready('.admin-search');
  checks.push('Compiled administration hydrates after signing in');
  assert.deepEqual(errors, []);
  console.log(checks.join('\n'));
  await fs.writeFile('tmp/production-checks.json', JSON.stringify({ checks, errors }, null, 2));
} finally {
  await send('session.end');
  ws.close();
}
