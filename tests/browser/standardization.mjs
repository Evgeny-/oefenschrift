import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
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
const previous = JSON.parse(
  await fs.readFile('content/migrations/2026-09-standardization.json', 'utf8'),
).previousRevisions;
const readingSet = sets.find(
  (set) => set.part === 'reading' && set.level === 'A2' && set.ids.every((id) => previous[id]),
);
const reading = catalogue.find((item) => item.id === readingSet.ids[0]);
const writing = catalogue.find((item) => item.part === 'writing' && previous[item.id]);
const unchanged = catalogue.find((item) => item.part === 'writing' && !previous[item.id]);
const active = {
  setId: readingSet.id,
  ids: readingSet.ids,
  mode: 'practice',
  level: 'A2',
  startedAt: 1000,
  index: 1,
  answers: { [reading.id + '/q1']: 'A' },
  checked: { [reading.id + '/q1']: true },
};
const state = {
  version: 2,
  settings: { lang: 'en', level: 'A2', theme: 'light' },
  drafts: { [writing.id]: 'Mijn bewaarde concept.' },
  records: {
    [writing.id]: { completed: true, kind: 'self', at: 1000 },
    [unchanged.id]: { completed: true, kind: 'self', at: 1000 },
  },
  reviews: { [writing.id]: [true, true, true] },
  sessions: { [readingSet.id]: active },
  active,
};
try {
  await navigate('/robots.txt');
  await evaluate(
    `localStorage.clear();sessionStorage.clear();localStorage.setItem('oefenschrift.study.v2',${JSON.stringify(JSON.stringify(state))});true;`,
  );
  await navigate('/en/sets/' + readingSet.id);
  await wait(
    `document.querySelector('.app-shell[data-hydrated]')&&document.querySelector('.question')`,
  );
  const restored = JSON.parse(await evaluate(`localStorage.getItem('oefenschrift.study.v2')`));
  assert.equal(restored.records[writing.id], undefined);
  assert.equal(restored.records[unchanged.id].completed, true);
  assert.equal(restored.drafts[writing.id], state.drafts[writing.id]);
  assert.equal(restored.reviews[writing.id], undefined);
  assert.equal(restored.active.index, 0);
  assert.deepEqual(restored.active.answers, {});
  assert.equal(restored.active.revisions[reading.id], reading.revision);
  console.log(
    'Rewritten exercises discard obsolete progress; drafts and unchanged completion survive.',
  );
  for (const [language, prefix] of [
    ['en', '/en'],
    ['nl', ''],
  ]) {
    for (const part of ['reading', 'writing', 'speaking']) {
      await navigate(prefix + '/' + part);
      await wait(
        `document.querySelector('.app-shell[data-hydrated]')&&document.querySelector('[data-set]')`,
      );
      const rows = JSON.parse(
        await evaluate(
          `JSON.stringify([...document.querySelectorAll('[data-set] small')].map(el=>el.textContent))`,
        ),
      );
      assert.ok(rows.length);
      for (const row of rows) {
        const pieces = row.split(' · ');
        assert.equal(pieces.length, part === 'reading' ? 3 : 2, language + '/' + part + ': ' + row);
        assert.ok(/[a-z]/i.test(pieces.at(-1)));
      }
    }
  }
  await send('browsingContext.setViewport', { context, viewport: { width: 390, height: 844 } });
  await navigate('/en/reading');
  await wait(
    `document.querySelector('.app-shell[data-hydrated]')&&document.querySelector('[data-set]')`,
  );
  assert.ok(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));
  const image = await send('browsingContext.captureScreenshot', { context });
  await fs.mkdir('tmp/standardization', { recursive: true });
  await fs.writeFile('tmp/standardization/catalogue-mobile.png', Buffer.from(image.data, 'base64'));
  console.log(
    'Every old and new reading, writing and speaking set displays task labels in both languages; narrow layout fits.',
  );
} finally {
  await send('session.end');
  ws.close();
}
