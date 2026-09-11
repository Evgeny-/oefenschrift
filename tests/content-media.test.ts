import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mediaErrors } from '../scripts/media-check';

const text = 'Vertel wat u op de foto ziet.';
const item = {
  id: 'A2:speaking:test:1',
  part: 'speaking',
  prompt: text,
  promptAudio: 'audio/test.mp3',
  images: [{ file: 'images/test.webp', brief: 'A bicycle.' }],
};
const clip = {
  key: item.id + '#prompt',
  file: item.promptAudio,
  script_sha256: createHash('sha256').update(text).digest('hex'),
  wer: 0,
  inserted: 0,
};
const picture = { file: 'images/test.webp', brief: 'A bicycle.', reviewed: true };

test('release media checks reject missing assets, changed scripts and unreviewed pictures', () => {
  const check = (exercise = item, audio = clip, image = picture, exists = () => true) =>
    mediaErrors([exercise], [audio], [image], exists);
  assert.deepEqual(check(), []);
  assert.ok(
    check({ ...item, prompt: 'Een andere vraag.' }).some((error) => error.includes('script')),
  );
  assert.ok(check(item, { ...clip, wer: 0.3 }).some((error) => error.includes('round trip')));
  assert.ok(
    check(item, clip, { ...picture, reviewed: false }).some((error) => error.includes('review')),
  );
  assert.ok(check(item, clip, picture, () => false).some((error) => error.includes('missing')));
  assert.ok(
    check({ ...item, images: [{ ...item.images[0], brief: 'A different picture.' }] }).length,
  );
});
