import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  checkAvailability,
  checkPlan,
  checkSummary,
  drawCheck,
  latestCheck,
  startCheck,
} from '../app/domain/check.ts';
import {
  complete,
  defaults,
  flatten,
  hasProgress,
  restore,
  save,
  STORAGE_KEY,
} from '../app/domain/study.ts';
import { readRoute, routePath } from '../app/domain/routes.ts';
import { pageSeo, sitemapPaths } from '../app/domain/seo.ts';
const catalogue = JSON.parse(
  fs.readFileSync(new URL('../content/catalogue.json', import.meta.url)),
);
const sets = JSON.parse(fs.readFileSync(new URL('../content/practice-sets.json', import.meta.url)));
// A small deterministic generator, so a draw can be replayed.
function seeded(seed) {
  let x = seed >>> 0 || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 100000) / 100000;
  };
}
function memory(initial = {}) {
  const values = { ...initial };
  return { getItem: (k) => values[k] ?? null, setItem: (k, v) => (values[k] = v) };
}
test('the A2 draw follows the plan, mixes reading and listening and never repeats a question', () => {
  const draw = drawCheck(catalogue, 'A2', {}, seeded(7));
  assert.ok(draw);
  const session = startCheck(catalogue, 'A2', {}, 1000, seeded(7));
  assert.equal(session.mode, 'check');
  assert.equal(session.level, 'A2');
  const questions = flatten(session, catalogue);
  assert.equal(questions.length, 10);
  assert.equal(new Set(questions.map((x) => x.key)).size, 10);
  for (const entry of checkPlan) {
    const own = questions.filter((x) => x.item.part === entry.part);
    assert.equal(own.length, entry.questions, entry.part);
    assert.equal(new Set(own.map((x) => x.item.id)).size, entry.items, entry.part + ' items');
  }
  assert.ok(questions.every((x) => x.item.level === 'A2'));
  assert.ok(
    questions.every((x) => ['reading', 'listening'].includes(x.item.part)),
    'KNM stays out',
  );
  // Questions of one text keep the order of the text.
  for (const id of session.ids) {
    const order = questions.filter((x) => x.item.id === id).map((x) => x.q.id),
      original = catalogue.find((i) => i.id === id).questions.map((q) => q.id);
    assert.deepEqual(
      order,
      original.filter((q) => order.includes(q)),
    );
  }
  assert.deepEqual(
    startCheck(catalogue, 'A2', {}, 1000, seeded(7)).questions,
    session.questions,
    'the same seed draws the same check',
  );
  assert.equal(checkAvailability(catalogue, 'A2').total, 10);
  assert.equal(checkAvailability(catalogue, 'B2').enough, false);
});
test('completed exercises are drawn last, so a repeat sees fresh material', () => {
  const records = {};
  for (const item of catalogue)
    if (item.part === 'reading' && item.level === 'A2' && item.questions)
      records[item.id] = { completed: true, kind: 'quiz', at: 1, correct: 1, total: 1 };
  const fresh = catalogue.find((i) => i.part === 'reading' && i.level === 'A2' && i.questions);
  delete records[fresh.id];
  for (let seed = 1; seed < 6; seed++) {
    const draw = drawCheck(catalogue, 'A2', records, seeded(seed));
    assert.ok(draw.ids.includes(fresh.id), 'the one unseen text is always drawn');
  }
});
test('a finished check is kept apart from exercise results and summarised per subject', () => {
  let s = defaults();
  s.active = startCheck(catalogue, 'A2', {}, 1000, seeded(3));
  assert.equal(hasProgress(s.active), false);
  const questions = flatten(s.active, catalogue);
  questions.forEach((x, i) => {
    // Miss every listening question but one, and one reading question.
    const wrong = x.item.part === 'listening' ? i % 5 !== 0 : i === 0;
    s.active.answers[x.key] = wrong
      ? Object.keys(x.q.options).find((k) => k !== x.q.answer)
      : x.q.answer;
  });
  s.active.index = questions.length - 1;
  assert.equal(hasProgress(s.active), true);
  s = complete(s, catalogue, 5000);
  assert.deepEqual(s.records, {}, 'no exercise is marked completed by a check');
  assert.equal(s.checks.length, 1);
  assert.equal(s.checks[0].endedAt, 5000);
  const summary = checkSummary(s.checks[0], catalogue);
  assert.equal(summary.total, 10);
  assert.deepEqual(
    summary.parts.map((p) => p.part),
    ['reading', 'listening'],
  );
  assert.equal(summary.parts.find((p) => p.part === 'reading').correct, 4);
  assert.equal(summary.parts.find((p) => p.part === 'listening').correct, 1);
  assert.equal(summary.correct, 5);
  assert.equal(summary.missed.length, 5);
  assert.equal(summary.weakest.part, 'listening');
  assert.equal(summary.second.part, 'reading');
  assert.equal(latestCheck(s, 'A2'), s.checks[0]);
  assert.equal(latestCheck(s, 'B1'), null);
  const storage = memory();
  save(storage, s);
  const restored = restore(storage, catalogue);
  assert.equal(restored.checks.length, 1);
  assert.deepEqual(restored.checks[0].answers, s.checks[0].answers);
  assert.equal(restored.active.mode, 'check');
  const broken = {
    ...s,
    checks: [
      { ...s.checks[0], endedAt: null },
      { ...s.checks[0], level: 'B1' },
    ],
  };
  assert.equal(
    restore(memory({ [STORAGE_KEY]: JSON.stringify(broken) }), catalogue).checks.length,
    0,
    'an unfinished or mismatched check is dropped',
  );
});
test('a perfect check recommends nothing in particular', () => {
  const session = startCheck(catalogue, 'A2', {}, 1000, seeded(11));
  for (const x of flatten(session, catalogue)) session.answers[x.key] = x.q.answer;
  const summary = checkSummary(session, catalogue);
  assert.equal(summary.correct, 10);
  assert.equal(summary.weakest, null);
  assert.equal(summary.second, null);
});
test('the level check has level routes, page metadata and a sitemap entry', () => {
  assert.equal(routePath('check', 'A2'), '/a2/level-check');
  assert.equal(routePath('check-result', 'B1'), '/b1/level-check/result');
  assert.equal(readRoute({ pathname: '/a2/level-check', hash: '' }, null), 'check');
  assert.equal(readRoute({ pathname: '/b1/level-check/result', hash: '' }, null), 'check-result');
  assert.equal(readRoute({ pathname: '/level-check', hash: '' }, null), 'check');
  const seo = pageSeo('check', 'A2', catalogue, sets, 'https://example.test');
  assert.match(seo.title, /Niveaucheck A2/);
  assert.equal(seo.noindex, false);
  assert.equal(seo.canonical, 'https://example.test/a2/level-check');
  assert.equal(
    pageSeo('check-result', 'A2', catalogue, sets, 'https://example.test').noindex,
    true,
  );
  assert.ok(sitemapPaths(catalogue, sets).includes('/a2/level-check'));
});
