import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { defaults, restore, save, startSession, questionFingerprint } from '../app/domain/study';
import {
  STORAGE_KEY,
  VISITOR_KEY,
  SESSION_KEY,
  PREFERENCES_COOKIE,
  POSITION_COOKIE,
  PASS_COOKIE,
  OPS_COOKIE,
  readStored,
  readStudy,
  writeStored,
  readCookie,
} from '../app/domain/persistence';
import { readPreferences } from '../app/domain/render-state';
import {
  issuePass,
  ensurePass,
  passId,
  loginSession,
  adminSession,
  requireAdminMutation,
  logoutHeaders,
  migrationHeaders,
} from '../server/security';
import { setting } from '../environment';

function memory(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
}
const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));
function progress() {
  const state = defaults();
  const item = catalogue.find((item) => item.part === 'reading' && item.level === 'A2');
  const writing = catalogue.find((item) => item.part === 'writing');
  const speaking = catalogue.find((item) => item.part === 'speaking');
  const q = item.questions[0];
  state.settings = { lang: 'en', level: 'B1', theme: 'dark', clock: true };
  state.records[item.id] = {
    completed: true,
    kind: 'quiz',
    at: 1000,
    correct: 1,
    total: item.questions.length,
    revision: item.revision,
    responses: { [q.id]: { selected: q.answer, fingerprint: questionFingerprint(item, q) } },
  };
  state.records[writing.id] = {
    completed: true,
    kind: 'self',
    at: 2000,
    revision: writing.revision,
  };
  state.drafts = {
    [writing.id]: 'Mijn bewaarde concept.',
    [speaking.id]: 'Mijn gesproken antwoord.',
  };
  state.reviews[writing.id] = [true, false];
  state.timers[writing.id] = 123;
  state.active = {
    ...startSession([item.id], 'practice', catalogue, 1000),
    setId: 'saved-set',
    elapsedSeconds: 63,
    answers: { [`${item.id}/${q.id}`]: q.answer },
    checked: { [`${item.id}/${q.id}`]: true },
  };
  state.sessions['saved-set'] = state.active;
  state.checks = [
    {
      ...startSession([item.id], 'check', catalogue, 3000, [`${item.id}/${q.id}`]),
      endedAt: 4000,
      elapsedSeconds: 10,
    },
  ];
  return state;
}

test('renaming study storage preserves all progress and removes legacy data only after a verified save', () => {
  const old = progress();
  const storage = memory({ 'inburgering.study.v2': JSON.stringify(old) });
  const restored = restore(storage, catalogue);
  assert.deepEqual(restored, old);
  assert.equal(storage.getItem(STORAGE_KEY), null, 'reading does not discard or rewrite data');
  assert.equal(save(storage, restored), true);
  assert.deepEqual(JSON.parse(storage.getItem(STORAGE_KEY)), old);
  assert.equal(storage.getItem('inburgering.study.v2'), null);
  assert.deepEqual(restore(storage, catalogue), old);
});

test('blocked and silently failed writes retain the old save, and a later retry migrates it', () => {
  for (const setItem of [
    () => {
      throw Error('QuotaExceededError');
    },
    () => {},
  ]) {
    const raw = JSON.stringify(progress());
    const storage = memory({ 'inburgering.study.v2': raw });
    const restored = restore(storage, catalogue);
    assert.equal(save({ ...storage, setItem }, restored), false);
    assert.equal(storage.getItem('inburgering.study.v2'), raw);
    assert.deepEqual(restore(storage, catalogue), restored);
    assert.equal(save(storage, restored), true);
    assert.equal(storage.getItem('inburgering.study.v2'), null);
  }
});

test('a valid new save wins, cleared progress stays cleared, and damaged new data can recover from the old name', () => {
  const old = JSON.stringify(progress());
  const storage = memory({
    [STORAGE_KEY]: JSON.stringify(defaults()),
    'inburgering.study.v2': old,
  });
  assert.deepEqual(restore(storage, catalogue), defaults());
  save(storage, defaults());
  assert.deepEqual(restore(storage, catalogue), defaults());
  for (const broken of ['broken', '{"version":99}', 'null']) {
    assert.deepEqual(
      readStudy(memory({ [STORAGE_KEY]: broken, 'inburgering.study.v2': old })),
      progress(),
    );
  }
  assert.equal(
    readStudy({
      getItem: () => {
        throw Error('SecurityError');
      },
    }),
    null,
  );
});

test('the earliest save format, visitor identity and visit marker also migrate', () => {
  const old = { ...progress(), version: 1 };
  const storage = memory({
    'samen.study.v1': JSON.stringify(old),
    'inburgering.visitor': 'a'.repeat(32),
    'inburgering.visited': '1',
  });
  assert.equal(save(storage, restore(storage, catalogue)), true);
  assert.equal(storage.getItem('samen.study.v1'), null);
  for (const key of [VISITOR_KEY, SESSION_KEY]) {
    const value = readStored(storage, key);
    assert.equal(writeStored(storage, key, value), true);
    assert.equal(storage.getItem(key), value);
    assert.equal(storage.getItem(key.replace('oefenschrift', 'inburgering')), null);
  }
});

test('old preference and position cookies remain readable while new values take precedence', () => {
  const value = encodeURIComponent(JSON.stringify(progress().settings));
  assert.deepEqual(readPreferences('inburgering_preferences=' + value), progress().settings);
  const fresh = encodeURIComponent(JSON.stringify(defaults().settings));
  assert.deepEqual(
    readPreferences(`inburgering_preferences=${value}; ${PREFERENCES_COOKIE}=${fresh}`),
    defaults().settings,
  );
  assert.equal(readCookie('inburgering_position=old', POSITION_COOKIE), 'old');
  assert.equal(
    readCookie(`inburgering_position=old; ${POSITION_COOKIE}=new`, POSITION_COOKIE),
    'new',
  );
});

test('signed cookies migrate with the same identity and expiry, and logout clears both operator names', () => {
  process.env.OEFENSCHRIFT_ADMIN_SECRET = 'synthetic-migration-test';
  try {
    const now = Date.now();
    const pass = issuePass(now - 60000);
    const token = pass.header.split(';')[0].split('=')[1];
    const login = loginSession();
    const request = new Request('http://127.0.0.1/ops', {
      headers: { Cookie: `inburgering_pass=${token}; inburgering_ops=${login.token}` },
    });
    assert.equal(passId(request, now), pass.id);
    assert.deepEqual(ensurePass(request, now), { id: pass.id, header: null });
    assert.equal(adminSession(request).token, login.token);
    const migrated = migrationHeaders(request, now).getSetCookie();
    assert.equal(migrated.length, 4);
    assert.ok(
      migrated.some(
        (value) => value.startsWith(`${PASS_COOKIE}=${token};`) && value.includes('Max-Age=86340'),
      ),
    );
    assert.ok(
      migrated.some(
        (value) =>
          value.startsWith(`${OPS_COOKIE}=${login.token};`) &&
          value.includes('HttpOnly; SameSite=Strict'),
      ),
    );
    assert.equal(migrated.filter((value) => value.includes('Max-Age=0')).length, 2);
    const cookie = migrated
      .filter((value) => !value.includes('Max-Age=0'))
      .map((value) => value.split(';')[0])
      .join('; ');
    assert.equal(passId(new Request(request.url, { headers: { Cookie: cookie } }), now), pass.id);
    assert.doesNotThrow(() =>
      requireAdminMutation(
        new Request(request.url, {
          method: 'POST',
          headers: { Cookie: cookie, Origin: 'http://127.0.0.1' },
        }),
        login.token,
      ),
    );
    assert.deepEqual(
      migrationHeaders(
        new Request(request.url, { headers: { Cookie: cookie } }),
        now,
      ).getSetCookie(),
      [],
    );
    assert.equal(logoutHeaders().getSetCookie().length, 2);
    for (const name of [OPS_COOKIE, 'inburgering_ops'])
      assert.ok(
        logoutHeaders()
          .getSetCookie()
          .some((value) => value.startsWith(name + '=;') && value.includes('Max-Age=0')),
      );
    const invalid = new Request(request.url, {
      headers: { Cookie: 'inburgering_pass=bad; inburgering_ops=bad' },
    });
    assert.equal(migrationHeaders(invalid, now).getSetCookie().length, 2);
    assert.ok(
      migrationHeaders(invalid, now)
        .getSetCookie()
        .every((value) => value.includes('Max-Age=0')),
    );
  } finally {
    delete process.env.OEFENSCHRIFT_ADMIN_SECRET;
  }
});

test('new environment names win, while legacy secrets and paths remain available', () => {
  try {
    process.env.INBURGERING_BASE_PATH = '/old';
    assert.equal(setting('BASE_PATH'), '/old');
    process.env.OEFENSCHRIFT_BASE_PATH = '';
    assert.equal(setting('BASE_PATH'), '');
    process.env.OEFENSCHRIFT_BASE_PATH = '/new';
    assert.equal(setting('BASE_PATH'), '/new');
  } finally {
    delete process.env.INBURGERING_BASE_PATH;
    delete process.env.OEFENSCHRIFT_BASE_PATH;
  }
});
