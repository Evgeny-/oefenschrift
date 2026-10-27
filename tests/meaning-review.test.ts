import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { meaningPacket, meaningPacketHash, meaningReviewErrors } from '../scripts/meaning-review';

const item = {
  id: 'A1:listening:synthetic:1',
  part: 'listening',
  level: 'A1',
  text: 'A: Kom je morgen?\nB: Ja, om twee uur.',
  script: [
    { speaker: 'A', text: 'Kom je morgen?' },
    { speaker: 'B', text: 'Ja, om twee uur.' },
  ],
  questions: [{ answer: 'A', options: { A: 'Twee.', B: 'Drie.', C: 'Vier.' } }],
  model: 'Hidden answer material',
  criteria: ['Hidden criterion'],
};
function review(meaning: any) {
  return {
    review_contract_version: 2,
    meaning_first: {
      verdict: 'pass',
      review_order: 'source-before-questions',
      packet_sha256: meaningPacketHash([item]),
      independence_note: 'Read the source without answer choices in a fresh context.',
    },
    tone_balance: {
      ordinary: meaning.tone === 'ordinary' ? 1 : 0,
      light_humor: meaning.tone === 'light-humor' ? 1 : 0,
      target_share: 0.15,
      scope_note: 'A synthetic one-item gate example; the full program is checked separately.',
    },
    items: [{ id: item.id, verdict: 'pass', meaning }],
  };
}
const evidence = {
  verdict: 'pass',
  tone: 'ordinary',
  coherence_rating: 5,
  situation_summary: 'Two people arrange a visit for the following day.',
  communicative_purpose: 'The visitor confirms coming and supplies an arrival time.',
  contrivance_check:
    'The time directly answers an ordinary planning need; no stock list is inserted.',
  unsupported_assumptions: [],
  turn_links: item.script.map((turn, index) => ({
    turn: index + 1,
    quote: turn.text,
    response_function: index
      ? 'Accepts the invitation and specifies when to arrive.'
      : 'Asks whether the other person can visit tomorrow.',
  })),
};

test('blind packet withholds the answer design from the first meaning pass', () => {
  const packet = meaningPacket([item])[0];
  for (const field of ['questions', 'criteria', 'model']) assert.ok(!(field in packet));
  assert.deepEqual(packet.script, item.script);
  assert.equal(meaningPacketHash([item]), meaningPacketHash([{ ...item, questions: [] }]));
  assert.notEqual(
    meaningPacketHash([item]),
    meaningPacketHash([{ ...item, text: 'Changed source' }]),
  );
});
test('withdrawn A1 pilot approvals cannot bypass the meaning-first contract', () => {
  for (const source_sha256 of [
    '4f6c9a05fa7eb65460c1e7194b80a1d5d18bf8ac245f8900468d5a3e09048215',
    '638850e3b48d020587ea6e6a51616152252a70f09779abc4da6b8475a0731743',
  ])
    assert.ok(meaningReviewErrors({ source_sha256 }, [item]).length);
});
test('a literal key and an overall pass cannot override missing or failed meaning review', () => {
  assert.ok(
    meaningReviewErrors({ items: [{ id: item.id, verdict: 'pass' }] }, [item], false).length,
  );
  assert.deepEqual(meaningReviewErrors(review(evidence), [item], false), []);
  for (const change of [
    { verdict: 'revise' },
    { coherence_rating: 3 },
    { unsupported_assumptions: ['Assume an unmentioned guitarist is present.'] },
    { turn_links: evidence.turn_links.slice(0, 1) },
    { communicative_purpose: '' },
    { tone: 'unclassified' },
  ])
    assert.ok(meaningReviewErrors(review({ ...evidence, ...change }), [item], false).length);
  const stale = review(evidence);
  stale.meaning_first.packet_sha256 = 'stale';
  assert.ok(meaningReviewErrors(stale, [item], false).length);
});

test('tone counts and the mostly ordinary batch limit block a fully whimsical batch', () => {
  const items = Array.from({ length: 9 }, (_, index) => ({ ...item, id: `${item.id}-${index}` }));
  const report = review(evidence);
  report.meaning_first.packet_sha256 = meaningPacketHash(items);
  report.items = items.map((source) => ({
    id: source.id,
    verdict: 'pass',
    meaning: {
      ...evidence,
      tone: 'light-humor',
      situation_summary: `${evidence.situation_summary} Source ${source.id}.`,
      communicative_purpose: `${evidence.communicative_purpose} Source ${source.id}.`,
      contrivance_check: `${evidence.contrivance_check} Source ${source.id}.`,
    },
  }));
  report.tone_balance = { ...report.tone_balance, ordinary: 0, light_humor: 9 };
  assert.ok(
    meaningReviewErrors(report, items, false).some((error) => /too many humorous/.test(error)),
  );
  report.items.forEach((entry, index) => {
    entry.meaning.tone = index < 2 ? 'light-humor' : 'ordinary';
  });
  report.tone_balance = { ...report.tone_balance, ordinary: 7, light_humor: 2 };
  assert.deepEqual(meaningReviewErrors(report, items, false), []);
  report.tone_balance.ordinary = 8;
  assert.ok(meaningReviewErrors(report, items, false).some((error) => /tone balance/.test(error)));
  report.items[1].meaning.contrivance_check = report.items[0].meaning.contrivance_check;
  assert.ok(
    meaningReviewErrors(report, items, false).some((error) => /item-specific evidence/.test(error)),
  );
});

test('source-only packets retain B1 fragments and open-task cues without answer material', () => {
  const b1 = {
    ...item,
    script: undefined,
    questions: [
      {
        id: 'q1',
        text: item.text,
        script: item.script,
        prompt: 'Hidden question',
        answer: 'A',
        options: { A: 'Hidden key' },
      },
    ],
  };
  const packet = meaningPacket([b1])[0];
  assert.deepEqual(packet.fragments[0].script, item.script);
  assert.ok(!JSON.stringify(packet).includes('Hidden'));
  const cue = { role: 'colleague', text: 'Kun je me helpen?' };
  assert.deepEqual(meaningPacket([{ ...item, cue }])[0].cue, cue);
  const checked = review({
    ...evidence,
    turn_links: evidence.turn_links.map((link) => ({ ...link, fragment: 'q1' })),
  });
  checked.meaning_first.packet_sha256 = meaningPacketHash([b1]);
  assert.deepEqual(meaningReviewErrors(checked, [b1], false), []);
  delete checked.items[0].meaning.turn_links[0].fragment;
  assert.ok(meaningReviewErrors(checked, [b1], false).length);
});

test('adoption preserves the current source when an item still needs editorial revision', () => {
  const directory = mkdtempSync(join(tmpdir(), 'meaning-adopt-'));
  try {
    mkdirSync(join(directory, 'content/batches'), { recursive: true });
    mkdirSync(join(directory, 'content/reviews'), { recursive: true });
    writeFileSync(
      join(directory, 'content/reviews/legacy-source-approvals.json'),
      '{"sources":[]}',
    );
    const original = join(directory, 'content/batches/999-original.json');
    const proposed = join(directory, 'content/batches/999-proposed.json');
    writeFileSync(original, '["current source must survive"]\n');
    const bytes = JSON.stringify([item], null, 2) + '\n';
    writeFileSync(proposed, bytes);
    const artifact: any = {
      ...review(evidence),
      batch_verdict: 'pass',
      ready_for_integration: true,
      source_sha256: createHash('sha256').update(bytes).digest('hex'),
    };
    artifact.items[0].verdict = 'revise';
    writeFileSync(join(directory, 'content/reviews/999-review.json'), JSON.stringify(artifact));
    const result = spawnSync(
      process.execPath,
      [resolve('node_modules/tsx/dist/cli.mjs'), resolve('scripts/batch-adopt.ts'), '999'],
      { cwd: directory, encoding: 'utf8' },
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /individual passing editorial verdict/);
    assert.equal(readFileSync(original, 'utf8'), '["current source must survive"]\n');
    assert.ok(existsSync(proposed));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
