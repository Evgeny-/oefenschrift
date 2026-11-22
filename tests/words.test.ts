import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import {
  groupEntries,
  MY_LIST,
  perfect,
  searchEntries,
  TOP_SIZE,
  WORD_GROUPS,
  type WordEntry,
} from '../app/domain/words';

const entries: WordEntry[] = readdirSync('content/words')
  .filter((name) => /^words-\d+\.json$/.test(name))
  .sort()
  .flatMap((name) => JSON.parse(readFileSync(`content/words/${name}`, 'utf8')).entries);
// A theme on an entry must be one a theme list shows.
const themeLists = WORD_GROUPS.filter((group) => group.section === 'themes'),
  listed = (entry: WordEntry, theme: string) =>
    themeLists.some((group) => group.includes({ ...entry, themes: [theme] }));

test('every word entry is complete and its id is unique', () => {
  const ids = new Set<string>();
  for (const entry of entries) {
    const at = `word ${entry.id}`;
    assert.ok(/^[a-zà-ÿ'-]+$/.test(entry.id), `${at}: id`);
    assert.ok(!ids.has(entry.id), `${at}: duplicate id`);
    ids.add(entry.id);
    for (const field of ['nl', 'en', 'ex', 'exEn'] as const)
      assert.ok(entry[field]?.trim(), `${at}: ${field}`);
    assert.ok(entry.ex.split(/\s+/).length <= 14, `${at}: example too long`);
    assert.ok(!entry.note || entry.note.length <= 140, `${at}: note too long`);
    if (entry.pos === 'noun') {
      assert.ok(['de', 'het', 'de/het'].includes(entry.article!), `${at}: article`);
      assert.ok('plural' in entry, `${at}: plural (null when there is none)`);
    } else assert.ok(!entry.article, `${at}: article on a ${entry.pos}`);
    if (entry.pos === 'verb') {
      const verb = entry.verb!;
      assert.ok(verb?.past && verb.pastPlural, `${at}: past forms`);
      assert.ok(['hebben', 'zijn', 'hebben/zijn'].includes(verb.aux), `${at}: auxiliary`);
      assert.equal(typeof verb.irregular, 'boolean', `${at}: irregular`);
    } else assert.ok(!entry.verb, `${at}: verb forms on a ${entry.pos}`);
    for (const theme of entry.themes || [])
      assert.ok(listed(entry, theme), `${at}: theme ${theme}`);
  }
});

test('the ranked list counts from 1 without gaps and every list has words', () => {
  const ranks = entries
    .filter((entry) => entry.rank)
    .map((entry) => entry.rank!)
    .sort((a, b) => a - b);
  assert.deepEqual(
    ranks,
    ranks.map((_, i) => i + 1),
  );
  assert.ok(ranks.length >= TOP_SIZE);
  for (const group of WORD_GROUPS) {
    if (group.slug === MY_LIST) continue;
    assert.ok(groupEntries(group, entries).length > 0, `${group.slug} is empty`);
  }
  const top = groupEntries(WORD_GROUPS.find((group) => group.slug === 'top')!, entries);
  assert.equal(top.length, TOP_SIZE);
  assert.deepEqual(
    top.slice(0, 3).map((entry) => entry.rank),
    [1, 2, 3],
  );
});

test('search finds a word by its Dutch, a past form, an accentless spelling and its English', () => {
  const first = (query: string) => searchEntries(query, entries)[0]?.id;
  assert.equal(first('huis'), 'huis');
  assert.equal(first('begon'), 'beginnen');
  assert.equal(first('cafe'), 'café');
  assert.ok(searchEntries('to call', entries).some((entry) => entry.id === 'bellen'));
  assert.deepEqual(searchEntries('   ', entries), []);
  assert.equal(perfect({ ...entries.find((e) => e.id === 'gaan')!.verb! }), 'is gegaan');
});
