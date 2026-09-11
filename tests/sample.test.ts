import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { sampleQuestions } from '../app/domain/sample';
import type { Exercise } from '../app/types';

const catalogue: Exercise[] = JSON.parse(fs.readFileSync('content/catalogue.json', 'utf8'));
for (const level of ['A2', 'B1']) {
  test(`${level} home sample covers three subjects using published questions and media`, () => {
    const entries = sampleQuestions(catalogue, level);
    assert.deepEqual(
      entries.map((entry) => entry.item.part),
      ['reading', 'listening', 'knm'],
    );
    assert.ok(entries.every((entry) => entry.item.part === 'knm' || entry.item.level === level));
    assert.ok(
      entries.every(
        (entry) => catalogue.includes(entry.item) && entry.item.questions.includes(entry.q),
      ),
    );
    const clip = entries[1].q as (typeof entries)[1]['q'] & { audio?: string; text?: string };
    assert.ok(clip.audio ? clip.text : entries[1].item.audio);
    assert.deepEqual(sampleQuestions([...catalogue].reverse(), level), entries);
  });
}

function exercise(id: string, part: Exercise['part'], extra = {}): Exercise {
  return {
    id,
    part,
    level: 'A2',
    revision: '1',
    taskType: part === 'knm' ? 'feit' : part === 'listening' ? 'gesprek' : 'bericht',
    exam: part === 'knm' ? 'knm' : 'duo-a2',
    domain: 'wonen-buurt',
    status: 'ai-editorially-reviewed',
    targetLevelValidated: false,
    title: id,
    text: 'Some source text.',
    questions: [
      {
        id: '1',
        prompt: 'Question?',
        options: { A: 'Yes', B: 'No' },
        answer: 'A',
        explanation: 'Yes.',
      },
    ],
    ...extra,
  };
}
test('sample skips unplayable listening and fact questions without a picture', () => {
  const invalid = [
    exercise('silent', 'listening'),
    exercise('fragment-without-text', 'listening', {
      audio: 'full.mp3',
      questions: [{ ...exercise('template', 'listening').questions[0], audio: 'fragment.mp3' }],
    }),
    exercise('fact-without-picture', 'knm', { taskType: 'feit' }),
    exercise('no-correct-option', 'reading', {
      questions: [{ ...exercise('template', 'reading').questions[0], answer: 'C' }],
    }),
  ];
  assert.deepEqual(sampleQuestions(invalid, 'A2'), []);
  const available = exercise('reading', 'reading');
  const source = [available, ...invalid];
  const before = JSON.stringify(source);
  assert.deepEqual(
    sampleQuestions(source, 'A2').map((entry) => entry.item.id),
    ['reading'],
  );
  assert.equal(JSON.stringify(source), before);
});
test('a question-level listening fragment can supply the audio', () => {
  const item = exercise('fragment', 'listening', {
    questions: [
      {
        ...exercise('template', 'listening').questions[0],
        audio: 'fragment.mp3',
        text: 'Fragment text.',
      },
    ],
  });
  assert.equal(sampleQuestions([item], 'A2')[0].item, item);
});
