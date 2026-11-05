import test from 'node:test';
import assert from 'node:assert/strict';
import { a2VocabularyIssues, a2Word, batchNumberOf } from '../scripts/a2-vocabulary';

test('A2 word gate accepts listed words in their usual forms', () => {
  for (const word of [
    'afspraak',
    'gehaald',
    'opgehaald',
    'meegenomen',
    'betaald',
    'groter',
    'zaterdagochtend',
    'drieëntwintig',
    'tweede',
    'kinderen',
    'appje',
  ])
    assert.equal(a2Word(word), 'listed', word);
  assert.equal(a2Word('fietsenwinkel'), 'listed');
  assert.equal(a2Word('koffiebeker'), 'compound');
});

test('A2 word gate rejects words judged too hard, even through a compound rule', () => {
  for (const word of [
    'oplaadaansluiting',
    'scheenbeschermers',
    'loonheffing',
    'uiterlijk',
    'nuchter',
  ])
    assert.equal(a2Word(word), undefined, word);
});

const reading = (text: string, prompt = 'Wanneer is de winkel open?') => ({
  id: 'A2:reading:batch999-gate:1',
  level: 'A2',
  part: 'reading',
  title: 'Een bericht van de winkel',
  situation: 'Karim leest een bericht van de winkel.',
  text,
  questions: [
    { id: 'q1', prompt, options: { A: 'Op maandag.', B: 'Op dinsdag.', C: 'Op vrijdag.' } },
  ],
});

test('A2 texts may hold one unlisted word per 50 words; questions may hold none', () => {
  const filler = Array.from({ length: 10 }, () => 'De winkel is op maandag open.').join(' ');
  const oneHard = reading(`${filler} Er hangt een nieuwe kapstok.`);
  assert.deepEqual(a2VocabularyIssues(oneHard).failures, []);
  assert.match(a2VocabularyIssues(oneHard).warnings.join('\n'), /kapstok/);
  const tooMany = reading(`${filler} Er staan een kapstok, een sokkel en een hengel.`);
  assert.match(a2VocabularyIssues(tooMany).failures.join('\n'), /3 words outside the A2 list/);
  const hardQuestion = reading(filler, 'Wat is de openingstijd van de kapstok?');
  assert.match(a2VocabularyIssues(hardQuestion).failures.join('\n'), /kapstok/);
});

test('A2 cognates and plain words pass; addresses are not words; really hard words fail', () => {
  const easy = reading(
    'De woningcorporatie accepteert het certificaat. De thermostaat is kapot. Kijk op www.deberk.nl/storing of mail info@deberk.nl.',
  );
  assert.deepEqual(a2VocabularyIssues(easy).failures, []);
  assert.doesNotMatch(
    a2VocabularyIssues(easy).warnings.join('\n'),
    /deberk|thermostaat|certificaat/,
  );
  const hard = reading(
    'De winkel is open.',
    'Wanneer moet Karim uiterlijk terecht bij de toonbank?',
  );
  assert.match(a2VocabularyIssues(hard).failures.join('\n'), /terecht, toonbank, uiterlijk/);
});

test('A2 word gate checks older ids in a revision batch, not in their historical file', () => {
  const legacy = {
    ...reading('De winkel is open.', 'Waar hangt de kapstok?'),
    id: 'A2:reading:batch020-gate:1',
  };
  assert.deepEqual(a2VocabularyIssues(legacy, 20).failures, []);
  assert.match(a2VocabularyIssues(legacy, 96).failures.join('\n'), /kapstok/);
  assert.equal(batchNumberOf('content/batches/096-original.json'), 96);
  assert.equal(batchNumberOf('096-review.json'), 96);
  const knm = { ...reading('Een kapstok.'), id: 'A2:knm:batch999-gate:1', part: 'knm' };
  assert.deepEqual(a2VocabularyIssues(knm, 999), { failures: [], warnings: [] });
});
