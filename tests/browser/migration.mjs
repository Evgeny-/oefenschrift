import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { createServer } from 'node:http';
const origin = process.env.TEST_ORIGIN;
const ws = new WebSocket(`ws://127.0.0.1:${process.env.FIREFOX_BIDI_PORT}/session`);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let id = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data),
    entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id);
  message.type === 'error'
    ? entry.reject(Error(JSON.stringify(message)))
    : entry.resolve(message.result);
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
}
await send('session.new', { capabilities: { alwaysMatch: {} } });
const { context } = await send('browsingContext.create', { type: 'tab' });
async function evaluate(expression) {
  const result = await send('script.evaluate', {
    expression,
    target: { context },
    awaitPromise: true,
  });
  if (result.type === 'exception') throw Error(JSON.stringify(result));
  return result.result?.type === 'null' ? null : result.result?.value;
}
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
}
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+10000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(Error('Migration UI did not settle')):setTimeout(poll,40);poll();})`,
  );
}
const catalogue = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const sets = JSON.parse(await fs.readFile('content/practice-sets.json', 'utf8'));
const rewritten = JSON.parse(
  await fs.readFile('content/migrations/2026-09-standardization.json', 'utf8'),
).previousRevisions;
// This journey tests the storage-key rename with unchanged exercises. The content
// rewrite migration has separate coverage in standardization.mjs.
const set = sets.find(
  (set) => set.part === 'reading' && set.level === 'A2' && set.ids.every((id) => !rewritten[id]),
);
const writing = catalogue.find((item) => item.part === 'writing' && !rewritten[item.id]);
const speaking = catalogue.find((item) => item.part === 'speaking' && !rewritten[item.id]);
const item = catalogue.find((item) => item.id === set.ids[0]);
const question = item.questions[0];
const active = {
  setId: set.id,
  ids: set.ids,
  mode: 'practice',
  level: 'A2',
  startedAt: 1000,
  endedAt: null,
  index: 1,
  elapsedSeconds: 45,
  answers: { [`${item.id}/${question.id}`]: question.answer },
  checked: { [`${item.id}/${question.id}`]: true },
};
const state = {
  version: 2,
  settings: { lang: 'en', level: 'A2', theme: 'dark', clock: true },
  records: {
    [writing.id]: { completed: true, kind: 'self', at: 1000, revision: writing.revision },
  },
  drafts: { [writing.id]: 'Mijn bewaarde concept.', [speaking.id]: 'Mijn bewaarde transcriptie.' },
  reviews: { [writing.id]: [true, false] },
  timers: { [writing.id]: 123 },
  sessions: { [set.id]: active },
  active,
  checks: [],
};
const visitor = 'b'.repeat(32);
function signed(kind, random) {
  const value = `${kind}.${Date.now() - 60000}.${random.repeat(32)}`;
  return (
    value +
    '.' +
    createHmac('sha256', process.env.OEFENSCHRIFT_ADMIN_SECRET).update(value).digest('hex')
  );
}
const pass = signed('pass', 'c'),
  ops = signed('login', 'd');
// Cookies are host-scoped, so a tiny fixture server can issue authentic old HttpOnly
// cookies without adding a test-only authentication endpoint to the application.
const seedServer = createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-Cookie': [
      `inburgering_pass=${pass}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
      `inburgering_ops=${ops}; Path=/; HttpOnly; SameSite=Strict; Max-Age=15811200`,
    ],
  });
  response.end('<!doctype html><title>Migration fixture</title>');
});
await new Promise((resolve) => seedServer.listen(0, '127.0.0.1', resolve));
try {
  // This profile and server belong exclusively to the browser test runner.
  await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
  await navigate('/robots.txt');
  await evaluate(
    `localStorage.clear();sessionStorage.clear();localStorage.setItem('inburgering.study.v2',${JSON.stringify(JSON.stringify(state))});localStorage.setItem('inburgering.visitor',${JSON.stringify(visitor)});sessionStorage.setItem('inburgering.visited','1');document.cookie='inburgering_preferences='+encodeURIComponent(${JSON.stringify(JSON.stringify(state.settings))})+'; Path=/';document.cookie='inburgering_position='+encodeURIComponent(${JSON.stringify(JSON.stringify({ set: set.id, index: 1 }))})+'; Path=/';true;`,
  );
  await send('browsingContext.navigate', {
    context,
    url: `http://127.0.0.1:${seedServer.address().port}`,
    wait: 'complete',
  });
  await navigate('/en/sets/' + set.id);
  await wait(
    `document.querySelector('.app-shell[data-hydrated]')&&localStorage.getItem('oefenschrift.study.v2')`,
  );
  let restored = JSON.parse(await evaluate(`localStorage.getItem('oefenschrift.study.v2')`));
  for (const field of ['records', 'drafts', 'reviews', 'timers'])
    assert.deepEqual(restored[field], state[field], field);
  assert.equal(restored.active.index, 1);
  assert.deepEqual(restored.active.answers, active.answers);
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), 'dark');
  assert.equal(await evaluate(`localStorage.getItem('inburgering.study.v2')`), null);
  assert.equal(await evaluate(`localStorage.getItem('oefenschrift.visitor')`), visitor);
  assert.equal(await evaluate(`sessionStorage.getItem('oefenschrift.visited')`), '1');
  const cookieResult = await send('storage.getCookies', {
    partition: { type: 'context', context },
  });
  assert.equal(
    cookieResult.cookies.find((cookie) => cookie.name === 'oefenschrift_pass')?.value.value,
    pass,
  );
  assert.equal(
    cookieResult.cookies.find((cookie) => cookie.name === 'oefenschrift_ops')?.value.value,
    ops,
  );
  assert.deepEqual(
    cookieResult.cookies
      .filter((cookie) => cookie.name.startsWith('inburgering_'))
      .map(({ name, domain, path }) => ({ name, domain, path })),
    [],
  );
  console.log(
    'Legacy progress, preferences, visitor identity and signed cookies survive the first visit.',
  );

  await navigate('/en/sets/' + set.id);
  await wait(`document.querySelector('.app-shell[data-hydrated]')`);
  restored = JSON.parse(await evaluate(`localStorage.getItem('oefenschrift.study.v2')`));
  assert.equal(restored.active.index, 1);
  assert.equal(restored.drafts[speaking.id], state.drafts[speaking.id]);
  await navigate('/ops');
  await wait(`document.querySelector('.admin-main')`);
  await evaluate('document.fonts.ready.then(()=>new Promise(resolve=>setTimeout(resolve,500)))');
  assert.equal(await evaluate(`!!document.querySelector('.admin-login')`), false);
  console.log('Reload resumes the saved question and the migrated operator remains signed in.');

  await navigate('/en/privacy');
  await wait(`document.querySelector('.app-shell[data-hydrated]')`);
  const names = JSON.parse(
    await evaluate(
      `JSON.stringify([...document.querySelectorAll('.storage-table code')].map(el=>el.textContent))`,
    ),
  );
  assert.equal(names.length, 7);
  assert.ok(names.every((name) => name.startsWith('oefenschrift')));
  await send('browsingContext.setViewport', { context, viewport: { width: 390, height: 844 } });
  assert.ok(
    await evaluate(`document.documentElement.scrollWidth<=innerWidth`),
    'privacy tables fit narrow viewport',
  );
  await evaluate("document.querySelector('.storage-table').scrollIntoView({block:'start'});true;");
  const screenshot = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile('tmp/migration-privacy-mobile.png', Buffer.from(screenshot.data, 'base64'));

  // Simulate a browser that can read existing progress but cannot persist the renamed key.
  await navigate('/robots.txt');
  await evaluate(
    `localStorage.removeItem('oefenschrift.study.v2');localStorage.setItem('inburgering.study.v2',${JSON.stringify(JSON.stringify(state))});true;`,
  );
  const preload = await send('script.addPreloadScript', {
    functionDeclaration: `()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==='oefenschrift.study.v2')throw new DOMException('Storage full','QuotaExceededError');return original.call(this,key,value);};}`,
  });
  await navigate('/en/progress');
  await wait(
    `document.querySelector('.app-shell[data-hydrated]')&&document.querySelector('.storage-notice')`,
  );
  assert.equal(
    await evaluate(`localStorage.getItem('inburgering.study.v2')`),
    JSON.stringify(state),
  );
  assert.equal(await evaluate(`localStorage.getItem('oefenschrift.study.v2')`), null);
  await send('script.removePreloadScript', { script: preload.script });
  await navigate('/en/progress');
  await wait(`localStorage.getItem('oefenschrift.study.v2')`);
  restored = JSON.parse(await evaluate(`localStorage.getItem('oefenschrift.study.v2')`));
  assert.deepEqual(restored.records, state.records);
  assert.deepEqual(restored.drafts, state.drafts);
  assert.equal(await evaluate(`localStorage.getItem('inburgering.study.v2')`), null);
  assert.equal(
    await evaluate("fetch('/ops/logout',{method:'POST'}).then(response=>response.ok)"),
    true,
  );
  const signedOut = await send('storage.getCookies', { partition: { type: 'context', context } });
  assert.ok(
    !signedOut.cookies.some((cookie) =>
      ['inburgering_ops', 'oefenschrift_ops'].includes(cookie.name),
    ),
  );
  console.log(
    'Narrow privacy page fits; blocked storage retains progress and migrates after recovery; logout clears the session.',
  );
} finally {
  await send('session.end');
  ws.close();
  await new Promise((resolve) => seedServer.close(resolve));
}
