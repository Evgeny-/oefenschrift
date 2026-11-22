import test from 'node:test';
import assert from 'node:assert/strict';
import { VOLUME_KEY } from '../app/domain/persistence';
import {
  DEFAULT_VOLUME,
  clampLevel,
  isSilent,
  parseVolume,
  readVolume,
  toggledMute,
  withLevel,
  writeVolume,
} from '../app/domain/volume';

function memory(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
    removeItem: (key: string) => void values.delete(key),
  };
}
const refusing = {
  getItem: () => {
    throw new DOMException('denied', 'SecurityError');
  },
  setItem: () => {
    throw new DOMException('full', 'QuotaExceededError');
  },
  removeItem: () => {},
};

test('a stored volume is clamped and anything malformed falls back to full volume', () => {
  assert.deepEqual(parseVolume('{"level":0.35,"muted":true}'), { level: 0.35, muted: true });
  assert.deepEqual(parseVolume('{"level":4}'), { level: 1, muted: false });
  assert.deepEqual(parseVolume('{"level":-1,"muted":"yes"}'), { level: 0, muted: false });
  assert.deepEqual(parseVolume('{"level":0.123456}'), { level: 0.12, muted: false });
  for (const raw of [null, '', '{', '[]', 'null', '{"level":"0.5"}', '{"muted":true}'])
    assert.equal(parseVolume(raw), DEFAULT_VOLUME, String(raw));
  assert.equal(clampLevel(Number.NaN), 1);
  assert.equal(clampLevel(0.15000000000000002), 0.15);
});

test('the volume survives a round trip and unavailable storage only stops it being remembered', () => {
  const storage = memory();
  assert.equal(readVolume(storage), DEFAULT_VOLUME);
  assert.equal(writeVolume(storage, { level: 0.4, muted: true }), true);
  assert.equal(storage.values.get(VOLUME_KEY), '{"level":0.4,"muted":true}');
  assert.deepEqual(readVolume(storage), { level: 0.4, muted: true });
  assert.equal(readVolume(memory({ [VOLUME_KEY]: 'not json' })), DEFAULT_VOLUME);
  assert.equal(readVolume(refusing), DEFAULT_VOLUME);
  assert.equal(readVolume(null), DEFAULT_VOLUME);
  assert.equal(writeVolume(refusing, { level: 0.4, muted: false }), false);
  assert.equal(writeVolume(null, { level: 0.4, muted: false }), false);
});

test('the slider unmutes above zero and unmuting at zero restores half volume', () => {
  const muted = { level: 0.4, muted: true };
  assert.deepEqual(withLevel(muted, 0.6), { level: 0.6, muted: false });
  assert.deepEqual(withLevel(muted, 0), { level: 0, muted: true });
  assert.deepEqual(withLevel({ level: 0.4, muted: false }, 2), { level: 1, muted: false });
  assert.deepEqual(toggledMute({ level: 0.4, muted: false }), { level: 0.4, muted: true });
  assert.deepEqual(toggledMute(muted), { level: 0.4, muted: false });
  assert.deepEqual(toggledMute({ level: 0, muted: false }), { level: 0.5, muted: false });
  assert.deepEqual(toggledMute({ level: 0, muted: true }), { level: 0.5, muted: false });
  assert.equal(isSilent({ level: 0, muted: false }), true);
  assert.equal(isSilent(muted), true);
  assert.equal(isSilent({ level: 0.1, muted: false }), false);
});
