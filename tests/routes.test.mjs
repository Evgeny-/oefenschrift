import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readRoute,
  routePath,
  routeLevel,
  routeLang,
  localizePath,
  sessionRoute,
  plainClick,
} from '../app/domain/routes.ts';
import { localizeFeedback } from '../app/domain/feedback.ts';
const url = (path) => new URL(path, 'http://127.0.0.1:8766');
test('every exercise ID has a reversible normal URL and old links still resolve', () => {
  for (const id of ['A2:reading:p1:1', 'B1:speaking:batch002-fietsroute:1', 'naam met é']) {
    const route = `exercise/${id}`;
    assert.equal(readRoute(url(routePath(route))), route);
    assert.equal(readRoute(url('/#' + encodeURIComponent('open/' + id))), route);
  }
  const active = { mode: 'practice', ids: ['A2:reading:p1:1'] };
  assert.equal(readRoute(url('/#session'), active), sessionRoute(active));
  assert.equal(routePath('mock'), '/a2/practice-test');
  assert.equal(readRoute(url('/practice-test/session')), 'session');
  assert.equal(readRoute(url('/exercise/%E0%A4%A')), 'missing');
  assert.equal(readRoute(url('/exercise/a%2Fb')), 'missing');
  assert.equal(readRoute(url('/unknown')), 'missing');
  assert.equal(readRoute(url('/')), 'home');
  assert.equal(routePath('home', 'B1'), '/');
  assert.equal(readRoute(url('/home')), 'missing', 'the start page has no /home alias');
  assert.equal(readRoute(url('/a2/')), 'reading', 'a bare level still opens its reading catalogue');
});
test('new-tab gestures keep real link behavior', () => {
  assert.equal(plainClick({ button: 0 }), true);
  for (const event of [
    { button: 1 },
    { button: 0, metaKey: true },
    { button: 0, ctrlKey: true },
    { button: 0, shiftKey: true },
    { button: 0, defaultPrevented: true },
  ])
    assert.equal(plainClick(event), false);
});
test('feedback localization preserves decisions, uncertainty, evidence and exact revision', () => {
  const raw = {
    criteria: [
      { met: true, uncertain: false, evidence: 'Ik werk.', feedback: 'fallback' },
      { met: false, uncertain: true, evidence: '', feedback: 'fallback' },
    ],
    corrected_text: 'Ik werk.',
    translations: {
      nl: {
        comment: 'Nederlands',
        next_step: 'Controleer',
        criteria_feedback: ['Goed', 'Onzeker'],
      },
      en: { comment: 'English', next_step: 'Check', criteria_feedback: ['Present', 'Uncertain'] },
    },
  };
  const nl = localizeFeedback(raw, 'nl'),
    en = localizeFeedback(raw, 'en');
  assert.equal(nl.comment, 'Nederlands');
  assert.equal(en.comment, 'English');
  assert.equal(nl.corrected_text, en.corrected_text);
  assert.deepEqual(
    nl.criteria.map(({ feedback, ...c }) => c),
    en.criteria.map(({ feedback, ...c }) => c),
  );
  assert.equal(raw.criteria[0].feedback, 'fallback');
});

test('level paths preserve the subject and reject misleading prefixes', () => {
  for (const level of ['A2', 'B1', 'B2'])
    for (const route of [
      'reading',
      'listening',
      'writing',
      'speaking',
      'progress',
      'mock',
      'session',
    ]) {
      const address = url(routePath(route, level));
      assert.equal(routeLevel(address), level);
      assert.equal(readRoute(address), route);
    }
  assert.equal(readRoute(url('/B1/reading/')), 'reading');
  assert.equal(routeLevel(url('/a2/reading')), 'A2');
  for (const path of [
    '/c1/reading',
    '/b1/knm',
    '/b1/about',
    '/a2/exercise/anything',
    '/b1/unknown',
  ])
    assert.equal(readRoute(url(path)), 'missing');
  assert.equal(routePath('knm', 'B2'), '/knm');
});

test('English pages live under /en and every page has one address per language', () => {
  for (const route of [
    'home',
    'reading',
    'knm',
    'about',
    'mock',
    'session',
    'check',
    'check-result',
    'set/a2-listening-01',
    'exercise/A2:reading:p1:1',
  ]) {
    const dutch = routePath(route, 'B1'),
      english = routePath(route, 'B1', 'en');
    assert.equal(english, dutch === '/' ? '/en' : '/en' + dutch);
    assert.equal(readRoute(url(english)), route);
    assert.equal(routeLang(url(english)), 'en');
    assert.equal(routeLang(url(dutch)), undefined);
    assert.equal(localizePath(dutch, 'en'), english);
    assert.equal(localizePath(english, 'nl'), dutch);
    assert.equal(localizePath(english, 'en'), english);
  }
  assert.equal(routePath('home', 'A2', 'en'), '/en');
  assert.equal(readRoute(url('/en')), 'home');
  assert.equal(readRoute(url('/en/')), 'home');
  assert.equal(readRoute(url('/EN/b1/reading')), 'reading');
  assert.equal(routeLevel(url('/en/b1/reading')), 'B1');
  assert.equal(readRoute(url('/en/a2')), 'reading');
  for (const path of ['/english', '/en/home', '/en/en', '/a2/en/reading', '/en/b1/knm'])
    assert.equal(readRoute(url(path)), 'missing', path);
  assert.equal(routeLang(url('/english')), undefined);
});
