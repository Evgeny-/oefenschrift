import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme } from '../app/domain/theme.ts';
import { defaults, restore, save } from '../app/domain/study.ts';

test('system theme follows OS while an explicit choice wins', () => {
  for (const systemDark of [true, false]) {
    assert.equal(resolveTheme('light', systemDark), 'light');
    assert.equal(resolveTheme('dark', systemDark), 'dark');
    assert.equal(resolveTheme('system', systemDark), systemDark ? 'dark' : 'light');
    assert.equal(resolveTheme(undefined, systemDark), systemDark ? 'dark' : 'light');
  }
});

test('system preference survives reload without storing the resolved appearance', () => {
  let raw = null;
  const storage = {
      getItem: () => raw,
      setItem: (_, value) => {
        raw = value;
      },
    },
    state = defaults();
  assert.equal(state.settings.theme, 'light', 'light is the default appearance');
  state.settings.theme = 'system';
  save(storage, state);
  assert.equal(restore(storage, []).settings.theme, 'system');
});
