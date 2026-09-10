import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ContentStore, EVENT_RETENTION_DAYS } from '../server/store';
import {
  assertOrigin,
  crossSiteRejected,
  loginSession,
  publicOrigin,
  siteOrigin,
} from '../server/security';
import {
  FAILURES_TO_PAUSE,
  PAUSE_MS,
  REJECTED_PAUSE_MS,
  paused,
  record,
  reset,
  resume,
} from '../server/breaker';
import {
  availability,
  DEFAULT_CAPS,
  guard,
  serviceState,
  serviceStatus,
  setCap,
  setEnabled,
} from '../server/availability';
import { ServiceError } from '../server/services';
const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8')),
  sets = JSON.parse(readFileSync('content/practice-sets.json', 'utf8'));
const withEnvironment = (values: Record<string, string | undefined>, run: () => void) => {
  const before = Object.fromEntries(Object.keys(values).map((k) => [k, process.env[k]]));
  for (const [k, v] of Object.entries(values)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    run();
  } finally {
    for (const [k, v] of Object.entries(before)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
};
const request = (url: string, headers = {}, method = 'GET') =>
  new Request(url, { method, headers });
test('a configured public origin is accepted next to loopback, and inbound links keep working', () => {
  withEnvironment({ INBURGERING_ORIGIN: 'https://oefenschrift.example/' }, () => {
    assert.equal(publicOrigin(), 'https://oefenschrift.example');
    assert.doesNotThrow(() => assertOrigin(request('https://oefenschrift.example/a2/reading')));
    assert.doesNotThrow(() => assertOrigin(request('http://127.0.0.1:8766/a2/reading')));
    assert.throws(
      () => assertOrigin(request('https://evil.example/a2/reading')),
      (error: any) => error instanceof Response && error.status === 403,
    );
    // The browser origin must match the configured one even when the app sees plain http.
    assert.equal(
      siteOrigin(request('http://oefenschrift.example/')),
      'https://oefenschrift.example',
    );
    assert.doesNotThrow(() =>
      assertOrigin(
        request('https://oefenschrift.example/api/feedback', {
          Origin: 'https://oefenschrift.example',
        }),
      ),
    );
    assert.throws(() =>
      assertOrigin(
        request('https://oefenschrift.example/api/feedback', { Origin: 'https://evil.example' }),
      ),
    );
    assert.match(loginSession().headers['Set-Cookie'], /; Secure$/);
  });
  withEnvironment({ INBURGERING_ORIGIN: undefined }, () => {
    assert.equal(publicOrigin(), null);
    assert.throws(() => assertOrigin(request('https://oefenschrift.example/')));
    assert.doesNotThrow(() => assertOrigin(request('http://localhost:8766/')));
    assert.doesNotMatch(loginSession().headers['Set-Cookie'], /Secure/);
  });
  withEnvironment({ INBURGERING_ORIGIN: 'https://oefenschrift.example/practice' }, () => {
    assert.throws(() => publicOrigin(), /bare origin/);
  });
  // A click from a search result or a chat message is a cross-site navigation; a cross-site
  // fetch or form post is not.
  const header = (values: Record<string, string>) => (name: string) => values[name];
  assert.equal(
    crossSiteRejected(
      header({ 'sec-fetch-site': 'cross-site', 'sec-fetch-mode': 'navigate' }),
      'GET',
    ),
    false,
  );
  assert.equal(
    crossSiteRejected(
      header({ 'sec-fetch-site': 'cross-site', 'sec-fetch-mode': 'navigate' }),
      'POST',
    ),
    true,
  );
  assert.equal(
    crossSiteRejected(header({ 'sec-fetch-site': 'cross-site', 'sec-fetch-mode': 'cors' }), 'GET'),
    true,
  );
  assert.equal(crossSiteRejected(header({ 'sec-fetch-site': 'same-origin' }), 'POST'), false);
  assert.equal(crossSiteRejected(header({}), 'POST'), false);
  assert.doesNotThrow(() =>
    assertOrigin(
      request('http://127.0.0.1:8766/', {
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'navigate',
      }),
    ),
  );
  assert.throws(() =>
    assertOrigin(
      request(
        'http://127.0.0.1:8766/api/feedback',
        { 'Sec-Fetch-Site': 'cross-site', 'Sec-Fetch-Mode': 'cors' },
        'POST',
      ),
    ),
  );
});
test('a provider pauses itself after repeated failures, longer after a rejected key, and recovers', () => {
  reset();
  try {
    const now = 1_000_000;
    for (let i = 1; i < FAILURES_TO_PAUSE; i++) {
      record('feedback', 'failed', now);
      assert.equal(paused('feedback', now), null, `open after ${i} failures`);
    }
    record('feedback', 'failed', now);
    assert.deepEqual(paused('feedback', now), { until: now + PAUSE_MS, reason: 'errors' });
    assert.equal(paused('speech', now), null, 'services pause independently');
    // After the pause one probe goes through; a failure re-opens at once, a success clears.
    assert.equal(paused('feedback', now + PAUSE_MS), null);
    record('feedback', 'failed', now + PAUSE_MS);
    assert.ok(paused('feedback', now + PAUSE_MS));
    record('feedback', 'ok', now + 2 * PAUSE_MS);
    assert.equal(paused('feedback', now + 2 * PAUSE_MS), null);
    record('feedback', 'failed', now + 2 * PAUSE_MS);
    assert.equal(paused('feedback', now + 2 * PAUSE_MS), null, 'the count restarted');
    record('speech', 'rejected', now);
    assert.deepEqual(paused('speech', now), { until: now + REJECTED_PAUSE_MS, reason: 'rejected' });
    resume('speech');
    assert.equal(paused('speech', now), null);
  } finally {
    reset();
  }
});
test('a service is offered only with a key, the switch on, the breaker closed and calls under the cap', () => {
  reset();
  const store = new ContentStore(':memory:', catalogue, sets);
  try {
    withEnvironment(
      {
        OPENAI_API_KEY: 'test-placeholder',
        ELEVENLABS_API_KEY: undefined,
        INBURGERING_FEEDBACK_DAILY_CAP: undefined,
        INBURGERING_CREDENTIALS_FILE: '/nonexistent',
      },
      () => {
        const now = Date.UTC(2026, 8, 10, 12);
        let state = serviceState('feedback', now, store);
        assert.deepEqual(
          [state.configured, state.enabled, state.cap, state.today, state.available, state.reason],
          [true, true, DEFAULT_CAPS.feedback, 0, true, null],
        );
        assert.equal(serviceState('speech', now, store).reason, 'unconfigured');
        assert.deepEqual(serviceStatus(now, store), {
          feedback: true,
          speech: false,
          feedbackPaused: false,
          speechPaused: false,
        });
        assert.doesNotThrow(() => guard('feedback', now, store));
        // The operator switch, stored in the database.
        setEnabled('feedback', false, store);
        state = serviceState('feedback', now, store);
        assert.equal(state.reason, 'off');
        assert.throws(
          () => guard('feedback', now, store),
          (error: any) =>
            error instanceof ServiceError && error.status === 503 && error.code === 'feedback_off',
        );
        assert.equal(serviceStatus(now, store).feedbackPaused, true);
        assert.equal(store.setting('feedback_enabled'), 'off');
        setEnabled('feedback', true, store);
        assert.equal(store.setting('feedback_enabled'), null);
        assert.equal(serviceState('feedback', now, store).available, true);
        // The daily cap counts today's requests, including refusals and cache hits.
        setCap('feedback', '3', store);
        assert.throws(() => setCap('feedback', '0', store), /whole number/);
        assert.throws(() => setCap('feedback', 'many', store), /whole number/);
        for (let i = 0; i < 3; i++) store.statistic('feedback', false, 10);
        state = serviceState('feedback', now, store);
        assert.deepEqual([state.cap, state.today, state.capped, state.reason], [3, 3, true, 'cap']);
        assert.throws(
          () => guard('feedback', now, store),
          (error: any) => error.code === 'feedback_cap',
        );
        assert.equal(
          serviceState('feedback', now + 86400000, store).available,
          true,
          'the cap resets with the UTC day',
        );
        setCap('feedback', '1000', store);
        // The breaker, from provider failures recorded by the service module.
        for (let i = 0; i < FAILURES_TO_PAUSE; i++) record('feedback', 'failed', now);
        state = serviceState('feedback', now, store);
        assert.equal(state.reason, 'paused');
        assert.equal(state.pause?.reason, 'errors');
        assert.throws(
          () => guard('feedback', now, store),
          (error: any) => error.code === 'feedback_paused',
        );
        resume('feedback');
        assert.equal(availability(now, store).feedback.available, true);
      },
    );
    withEnvironment(
      { OPENAI_API_KEY: 'test-placeholder', INBURGERING_FEEDBACK_DAILY_CAP: '25' },
      () => {
        store.setSetting('feedback_daily_cap', null);
        assert.equal(serviceState('feedback', Date.now(), store).cap, 25);
      },
    );
  } finally {
    store.close();
    reset();
  }
});
test('learner events older than the retention period are deleted at startup and once a day', () => {
  const store = new ContentStore(':memory:', catalogue, sets),
    visitor = 'c'.repeat(32),
    now = Date.UTC(2026, 8, 10, 12),
    day = (n: number) => now - n * 86400000;
  try {
    store.prunedAt = 0;
    for (const n of [0, 30, 89, 91, 200])
      store.db
        .prepare('INSERT INTO events(created_at,day,visitor,kind) VALUES(?,?,?,?)')
        .run(day(n), new Date(day(n)).toISOString().slice(0, 10), visitor, 'visit');
    assert.equal(store.pruneEvents(now), 2, 'rows older than 90 days go');
    assert.equal(store.pruneEvents(now + 3600000), 0, 'not run again within a day');
    const count = () => Number((store.db.prepare('SELECT COUNT(*) n FROM events').get() as any).n);
    assert.equal(count(), 3);
    store.recordEvents(visitor, [{ kind: 'visit', lang: 'nl', level: 'A2' }], now + 2 * 86400000);
    assert.equal(count(), 3, 'two days later the recording path prunes the 89-day row too');
    assert.equal(EVENT_RETENTION_DAYS, 90);
  } finally {
    store.close();
  }
});
test('resolved reports are deleted a year after they were filed; open ones stay', () => {
  const store = new ContentStore(':memory:', catalogue, sets),
    now = Date.UTC(2026, 8, 10, 12),
    seconds = (daysAgo: number) => Math.floor(now / 1000) - daysAgo * 86400;
  try {
    store.prunedAt = 0;
    const insert = store.db.prepare(
      "INSERT INTO reports(item_id,kind,message,created_at,status) VALUES('x','other','m',?,?)",
    );
    insert.run(seconds(400), 'resolved');
    insert.run(seconds(400), 'open');
    insert.run(seconds(100), 'resolved');
    assert.equal(store.pruneEvents(now), 1);
    assert.deepEqual(
      store.reports().map((r) => r.status),
      ['resolved', 'open'],
    );
  } finally {
    store.close();
  }
});
