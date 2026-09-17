import test from 'node:test';
import assert from 'node:assert/strict';
import { wordDiff, highlightParts, evidenceFor, dialogueTurns } from '../app/domain/text.ts';
test('diff preserves exact before and after text including punctuation and accents', () => {
  for (const [before, after] of [
    ['Ik kan morgen.', 'Ik kan morgen niet komen.'],
    ['Eén fiets\nIk bel!', 'Twee fietsen\nIk bel morgen!'],
    ['', 'Hallo.'],
    ['Hallo.', ''],
    ['ongewijzigd', 'ongewijzigd'],
  ]) {
    const diff = wordDiff(before, after);
    assert.equal(
      diff
        .filter((x) => x.type !== 'add')
        .map((x) => x.text)
        .join(''),
      before,
    );
    assert.equal(
      diff
        .filter((x) => x.type !== 'remove')
        .map((x) => x.text)
        .join(''),
      after,
    );
  }
});
test('evidence matches exact source spans, merges overlap, never guesses a missing quote', () => {
  const text = 'Kom donderdag. Morgen is de winkel dicht.';
  assert.deepEqual(
    highlightParts(text, ['donderdag.', 'Kom donderdag.', 'missing'])
      .filter((x) => x.marked)
      .map((x) => x.text),
    ['Kom donderdag.'],
  );
  assert.equal(
    highlightParts(text, ['missing'])
      .map((x) => x.text)
      .join(''),
    text,
  );
  assert.deepEqual(evidenceFor({ text }, { evidence: 'Friday' }), []);
});
test('a dialogue is one turn per line; a quote across turns marks the words of both, not the names', () => {
  const text = 'Roos: Ik kom morgen. Is de les beneden?\nDocent: Nee, boven.\nRoos: Dank u.';
  const turns = dialogueTurns(text, ['Is de les beneden?\nDocent: Nee, boven.']);
  assert.deepEqual(
    turns.map((turn) => [turn.speaker, turn.parts.map((p) => p.text).join('')]),
    [
      ['Roos', 'Ik kom morgen. Is de les beneden?'],
      ['Docent', 'Nee, boven.'],
      ['Roos', 'Dank u.'],
    ],
  );
  assert.deepEqual(
    turns.map((turn) => turn.parts.filter((p) => p.marked).map((p) => p.text)),
    [['Is de les beneden?'], ['Nee, boven.'], []],
  );
  // A blank line between turns is skipped; a line without a speaker is not a dialogue.
  assert.equal(dialogueTurns('Roos: Hallo.\n\nDocent: Dag.').length, 2);
  assert.equal(dialogueTurns('Beste mevrouw Bakker,\n\nUw fiets is klaar.'), null);
  assert.equal(
    dialogueTurns('Omroeper: Let op: de markt sluit om drie uur.')[0].speaker,
    'Omroeper',
  );
});
