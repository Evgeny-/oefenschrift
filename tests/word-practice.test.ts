import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDays,
  buildMixRound,
  buildRound,
  isDue,
  mergeCards,
  modeEntries,
  practiceMode,
  practicePool,
  practiceSearch,
  practiceStats,
  rate,
  readCards,
  sameMeaning,
  today,
  type Cards,
} from '../app/domain/word-practice';
import { wordType, type WordEntry } from '../app/domain/words';

const word = (id: string, rank: number, extra: Partial<WordEntry> = {}): WordEntry =>
  ({ id, nl: id, pos: 'noun', en: id, rank, ex: '', exEn: '', ...extra }) as WordEntry;
const day = '2026-11-22';
// A random source that leaves a shuffle in its order, to pin which words a round takes.
const inOrder = () => 0.9999999;
// A small seeded generator (mulberry32) so a shuffled round is the same on every run.
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

test('days are local calendar days and cross months and years', () => {
  assert.equal(today(new Date(2026, 10, 22, 23, 59)), '2026-11-22');
  assert.equal(addDays('2026-11-30', 1), '2026-12-01');
  assert.equal(addDays('2026-12-31', 3), '2027-01-03');
});

test('again comes back tomorrow, got it spaces out, too easy stops', () => {
  const missed = rate(undefined, 'again', day);
  assert.deepEqual(missed, { step: 0, due: '2026-11-23', seen: 1, misses: 1, again: true });
  const first = rate(missed, 'good', '2026-11-23');
  assert.equal(first.step, 1);
  assert.equal(first.due, '2026-11-24');
  assert.equal(first.again, undefined, 'a right answer clears the mistake');
  let card = first;
  const dues = [];
  for (let i = 0; i < 6; i++) {
    card = rate(card, 'good', card.due);
    dues.push(card.due);
  }
  // 3, 7, 14, 30, 60 and then 60 days again.
  assert.deepEqual(dues, [
    '2026-11-27',
    '2026-12-04',
    '2026-12-18',
    '2027-01-17',
    '2027-03-18',
    '2027-05-17',
  ]);
  const easy = rate(first, 'easy', day);
  assert.equal(easy.done, true);
  assert.equal(isDue(easy, '2030-01-01'), false);
});

test('a round takes due words first, then new ones, and never comes back empty', () => {
  const pool = [word('a', 1), word('b', 2), word('c', 3), word('d', 4)];
  const cards: Cards = {
    c: { step: 1, due: '2026-11-20', seen: 1, misses: 0 },
    b: { step: 1, due: '2026-11-21', seen: 1, misses: 0 },
    a: { step: 2, due: '2026-11-30', seen: 2, misses: 0 },
  };
  assert.deepEqual(
    buildRound(pool, cards, day, 3, inOrder).words.map((e) => e.id),
    ['c', 'b', 'd'],
  );
  const practised: Cards = Object.fromEntries(
    pool.map((e, i) => [e.id, { step: 1, due: `2026-12-0${4 - i}`, seen: 1, misses: 0 }]),
  );
  practised.a.done = true;
  const early = buildRound(pool, practised, day, undefined, inOrder);
  assert.equal(early.early, true);
  assert.deepEqual(
    early.words.map((e) => e.id),
    ['d', 'c', 'b'],
  );
});

test('a round of new words is a shuffled draw from the next hundred', () => {
  const pool = Array.from({ length: 300 }, (_, i) => word(`w${i}`, i + 1));
  const cards: Cards = { w0: { step: 1, due: '2026-11-30', seen: 1, misses: 0 } };
  const ranks = (seed: number) =>
    buildRound(pool, cards, day, 20, seeded(seed)).words.map((e) => e.rank!);
  const first = ranks(1),
    second = ranks(2);
  assert.equal(new Set(first).size, 20);
  // Only words not practised yet, and only from the hundred that come next in the list.
  assert.ok(first.every((rank) => rank > 1 && rank <= 101));
  assert.notDeepEqual(
    first,
    [...first].sort((a, b) => a - b),
    'the round is not in list order',
  );
  assert.notDeepEqual(first, second, 'two rounds are not the same draw');
  // A word due today always gets in, wherever the shuffle puts it.
  const due: Cards = { w250: { step: 1, due: day, seen: 1, misses: 0 } };
  assert.ok(buildRound(pool, due, day, 20, seeded(3)).words.some((e) => e.id === 'w250'));
});

test('pools: review, mistakes, my list, levels and lists', () => {
  const entries = [
    word('huis', 5, { level: 'A1' }),
    word('gemeente', 300, { level: 'A2' }),
    word('omdat', 200, { pos: 'conj' }),
    word('zeldzaam', 4000),
  ];
  const cards: Cards = {
    huis: { step: 0, due: '2026-11-22', seen: 2, misses: 2, again: true },
    omdat: { step: 2, due: '2026-12-01', seen: 2, misses: 1 },
  };
  const ids = (key: string, marked: string[] = []) =>
    practicePool(key, entries, cards, marked, day)?.map((e) => e.id);
  assert.deepEqual(ids('review'), ['huis']);
  assert.deepEqual(ids('mistakes'), ['huis']);
  assert.deepEqual(ids('my-list', ['zeldzaam', 'huis']), ['zeldzaam', 'huis']);
  assert.deepEqual(ids('a1'), ['huis']);
  assert.deepEqual(ids('a2'), ['gemeente']);
  assert.deepEqual(ids('b1'), ['omdat'], 'B1 is the most common words outside both lists');
  assert.deepEqual(ids('conjunctions'), ['omdat']);
  assert.equal(practicePool('nonsense', entries, cards, [], day), null);
  const stats = practiceStats(cards, day);
  assert.equal(stats.due, 1);
  assert.equal(stats.mistakes, 1);
  assert.deepEqual(stats.hardest, ['huis', 'omdat']);
});

test('saved cards are read defensively', () => {
  const cards = readCards({
    good: { step: 2, due: '2026-11-25', seen: 3, misses: 1, again: 'yes', done: true },
    noDate: { step: 1, due: 'tomorrow', seen: 1, misses: 0 },
    fraction: { step: 1.5, due: '2026-11-25', seen: 1, misses: 0 },
    huge: { step: 99, due: '2026-11-25', seen: 1, misses: 0 },
    nothing: null,
  });
  assert.deepEqual(Object.keys(cards), ['good', 'huge']);
  assert.equal(cards.good.again, undefined);
  assert.equal(cards.good.done, true);
  assert.equal(cards.huge.step, 6);
  assert.deepEqual(readCards('nonsense'), {});
});

test('a word spelled twice is named by its kind, possessives as possessive', () => {
  assert.deepEqual(wordType(word('zijn', 1, { pos: 'verb' })), ['werkwoord', 'verb']);
  assert.deepEqual(wordType(word('zijn-pron', 2, { pos: 'det', en: 'his; its' })), [
    'bezittelijk voornaamwoord',
    'possessive',
  ]);
  assert.deepEqual(
    wordType(word('die', 9, { pos: 'det', en: 'that; those' }))[1],
    'article or demonstrative',
  );
});

test('the mode comes from the address, and the address leaves out the default', () => {
  assert.equal(practiceMode(null), 'mix');
  assert.equal(practiceMode('en-nl'), 'en-nl');
  assert.equal(practiceMode('de-het'), 'de-het');
  assert.equal(practiceMode('klingon'), 'mix');
  assert.equal(practiceSearch('mix'), '');
  assert.equal(practiceSearch('mix', 'a1'), '?list=a1');
  assert.equal(practiceSearch('nl-en', 'a1'), '?list=a1&mode=nl-en');
  assert.equal(practiceSearch('en-nl', 'my-list'), '?list=my-list&mode=en-nl');
  assert.equal(practiceSearch('de-het'), '?mode=de-het');
});

test('de or het asks only nouns with one article', () => {
  const entries = [
    word('tafel', 1, { article: 'de' }),
    word('huis', 2, { article: 'het' }),
    word('aantal', 3, { article: 'de/het' }),
    word('lopen', 4, { pos: 'verb' }),
  ];
  assert.deepEqual(
    modeEntries('de-het', entries).map((e) => e.id),
    ['tafel', 'huis'],
  );
  assert.equal(modeEntries('en-nl', entries).length, 4);
});

test('english to dutch accepts words with exactly the same english', () => {
  const entries = [
    word('dokter', 1, { en: 'doctor' }),
    word('arts', 2, { en: 'Doctor' }),
    word('kunnen', 3, { pos: 'verb', en: 'can; to be able to' }),
    word('blik', 4, { en: 'tin; can; look' }),
    word('geheim', 5, { en: 'secret' }),
    word('geheim-adj', 6, { nl: 'geheim', pos: 'adj', en: 'secret' }),
  ];
  const also = sameMeaning(entries);
  assert.deepEqual(
    also(entries[0]).map((e) => e.id),
    ['arts'],
  );
  assert.deepEqual(also(entries[2]), []);
  assert.deepEqual(also(entries[4]), []);
});

test('mix sees a word through all its cards, learned by its meaning', () => {
  const learned = { step: 3, due: '2026-12-01', seen: 3, misses: 0 },
    missed = { step: 0, due: '2026-11-20', seen: 1, misses: 1, again: true };
  const merged = mergeCards({
    'nl-en': { huis: learned },
    'en-nl': { huis: missed, rug: missed },
    'de-het': {},
  });
  assert.deepEqual(merged.huis, {
    step: 3,
    due: '2026-11-20',
    seen: 4,
    misses: 1,
    again: true,
  });
  assert.equal(merged.rug.step, 0);
  assert.equal(isDue(merged.huis, day), true);
});

test('a mix round asks each word once, new words by their meaning first', () => {
  const tafel = word('tafel', 1, { article: 'de', en: 'table' }),
    huis = word('huis', 2, { article: 'het', en: 'house' }),
    lopen = word('lopen', 3, { pos: 'verb', en: 'to walk' }),
    later = { step: 1, due: '2999-01-01', seen: 1, misses: 0 };
  const none = { 'nl-en': {}, 'en-nl': {}, 'de-het': {} };
  const fresh = buildMixRound([tafel, huis, lopen], none, 'a1', day, 20, inOrder);
  assert.deepEqual(
    fresh.words.map((card) => `${card.mode}:${card.entry.id}`),
    ['nl-en:tafel', 'nl-en:huis', 'nl-en:lopen'],
  );
  // Seen words open English → Dutch and de or het; one card per word.
  const seen = buildMixRound(
    [tafel, huis, lopen],
    {
      'nl-en': { tafel: later, huis: later, lopen: later },
      'en-nl': { tafel: later },
      'de-het': {},
    },
    'a1',
    day,
    20,
    inOrder,
  );
  assert.deepEqual(
    seen.words.map((card) => `${card.mode}:${card.entry.id}`),
    ['de-het:tafel', 'en-nl:huis', 'en-nl:lopen'],
  );
  // Mistakes take the answers that went wrong, in whichever way they were asked.
  const wrong = { step: 0, due: '2999-01-01', seen: 1, misses: 1, again: true };
  const mistakes = buildMixRound(
    [tafel, huis],
    { 'nl-en': { tafel: later }, 'en-nl': {}, 'de-het': { huis: wrong } },
    'mistakes',
    day,
    20,
    inOrder,
  );
  assert.deepEqual(
    mistakes.words.map((card) => `${card.mode}:${card.entry.id}`),
    ['de-het:huis'],
  );
});

test('my practice takes what is due from any list, then new words of the level', () => {
  const entries = [
    word('huis', 5, { level: 'A1' }),
    word('gemeente', 300, { level: 'A2' }),
    word('omdat', 200, { pos: 'conj' }),
    word('afspraak', 150, { level: 'A2' }),
    word('zeldzaam', 4000),
  ];
  const cards: Cards = { zeldzaam: { step: 1, due: '2026-11-21', seen: 1, misses: 0 } };
  const ids = (level: string) =>
    practicePool('my-practice', entries, cards, [], day, level)?.map((e) => e.id);
  assert.deepEqual(ids('A1'), ['zeldzaam', 'huis']);
  assert.deepEqual(ids('A2'), ['zeldzaam', 'afspraak', 'gemeente']);
  assert.deepEqual(ids('B1'), ['zeldzaam', 'afspraak', 'omdat', 'gemeente'], 'B1 adds to A2');
});

test('my practice keeps places for new words however much is due', () => {
  const pool = Array.from({ length: 40 }, (_, i) => word(`w${i}`, i + 1));
  const cards: Cards = Object.fromEntries(
    pool.slice(0, 30).map((e) => [e.id, { step: 1, due: '2026-11-01', seen: 1, misses: 0 }]),
  );
  const plain = buildRound(pool, cards, day, 20, inOrder);
  assert.equal(plain.words.filter((e) => cards[e.id]).length, 20, 'due words fill a list round');
  const mine = buildRound(pool, cards, day, 20, inOrder, 5);
  assert.equal(mine.words.filter((e) => cards[e.id]).length, 15);
  assert.equal(mine.words.filter((e) => !cards[e.id]).length, 5);
  const none = { 'nl-en': cards, 'en-nl': {}, 'de-het': {} };
  const mixed = buildMixRound(pool, none, 'my-practice', day, 20, inOrder, 5);
  assert.equal(mixed.words.length, 20);
  assert.equal(new Set(mixed.words.map((card) => card.entry.id)).size, 20, 'one card per word');
  assert.equal(
    mixed.words.filter((card) => card.mode === 'nl-en' && isDue(cards[card.entry.id], day)).length,
    15,
  );
  // Thirty seen words could fill every new place with English → Dutch cards; new words still
  // get their turn.
  assert.equal(mixed.words.filter((card) => !cards[card.entry.id]).length, 5);
});
