import test from 'node:test';
import assert from 'node:assert/strict';
import {
  acquire,
  addressKey,
  CONCURRENCY,
  inFlightCount,
  limited,
  remaining,
  resetLimits,
  RULES,
} from '../server/limits';
import { ensurePass, issuePass, passId, PASS_HOURS, PASS_RENEW_HOURS } from '../server/security';
const MINUTE = 60_000,
  DAY = 86_400_000;
test('an address is one IPv4 address or one IPv6 /64', () => {
  assert.equal(addressKey('203.0.113.9'), '203.0.113.9');
  assert.equal(addressKey('2001:db8:abcd:12::1'), '2001:db8:abcd:12');
  assert.equal(addressKey('2001:0db8:abcd:0012:aaaa:bbbb:cccc:dddd'), '2001:db8:abcd:12');
  assert.equal(addressKey('2001:DB8:ABCD:12:1::'), '2001:db8:abcd:12');
  assert.equal(addressKey('::1'), '0:0:0:0');
  assert.equal(addressKey('local'), 'local');
});
test('windows per address and per pass refuse without counting, reopen, and report the day allowance', () => {
  resetLimits();
  try {
    const now = 1_700_000_000_000;
    const [, minuteMax] = RULES.pass.feedback[0],
      [, dayMax] = RULES.pass.feedback[1];
    for (let i = 0; i < minuteMax; i++)
      assert.equal(limited('pass', 'abc', 'feedback', now + i), null, `call ${i + 1}`);
    const refusal = limited('pass', 'abc', 'feedback', now + minuteMax);
    assert.ok(refusal && refusal.window === MINUTE && refusal.retryAfter <= 60);
    assert.equal(remaining('pass', 'abc', 'feedback', now), dayMax - minuteMax);
    // The refused call was not counted: the minute window reopens with the same count.
    assert.equal(limited('pass', 'abc', 'feedback', now + MINUTE), null);
    assert.equal(remaining('pass', 'abc', 'feedback', now + MINUTE), dayMax - minuteMax - 1);
    assert.equal(limited('pass', 'other', 'feedback', now), null, 'keys are independent');
    assert.equal(limited('address', 'abc', 'feedback', now), null, 'scopes are independent');
    assert.equal(limited('pass', 'abc', 'transcribe', now), null, 'endpoints are independent');
    // The day window: spread over minutes to stay under the minute rule.
    let t = now + 2 * MINUTE,
      made = minuteMax + 1;
    while (made < dayMax) {
      assert.equal(limited('pass', 'abc', 'feedback', t), null);
      made++;
      t += MINUTE;
    }
    const day = limited('pass', 'abc', 'feedback', t);
    assert.ok(day && day.window === DAY && day.retryAfter > 3600);
    assert.equal(remaining('pass', 'abc', 'feedback', t), 0);
    assert.equal(remaining('pass', 'abc', 'feedback', now + DAY), dayMax, 'a new day resets');
    assert.equal(limited('pass', 'abc', 'feedback', now + DAY), null);
    // Address windows are wider than pass windows for every endpoint.
    for (const endpoint of ['feedback', 'transcribe', 'reports', 'events'] as const)
      assert.ok(RULES.address[endpoint].at(-1)![1] >= RULES.pass[endpoint].at(-1)![1], endpoint);
  } finally {
    resetLimits();
  }
});
test('provider calls share a small number of slots; a burst waits briefly, then hears busy', async () => {
  const releases: (() => void)[] = [];
  for (let i = 0; i < CONCURRENCY.speech; i++) {
    const release = await acquire('speech', 50);
    assert.ok(release);
    releases.push(release);
  }
  assert.equal(inFlightCount('speech'), CONCURRENCY.speech);
  assert.equal(await acquire('speech', 30), null, 'no slot within the wait');
  const waiting = acquire('speech', 500);
  releases.shift()!();
  const handed = await waiting;
  assert.ok(handed, 'a released slot goes to the waiter');
  assert.equal(inFlightCount('speech'), CONCURRENCY.speech);
  for (const release of [handed, ...releases]) release();
  assert.equal(inFlightCount('speech'), 0);
  assert.ok(await acquire('feedback', 10), 'services have separate slots');
});
test('the session pass is signed, expires after a day, renews after twelve hours and is never a login', () => {
  process.env.INBURGERING_ADMIN_SECRET = 'synthetic-test-secret';
  try {
    const now = 1_700_000_000_000,
      pass = issuePass(now);
    assert.match(
      pass.header,
      /^inburgering_pass=pass\.\d+\.[a-f0-9]{32}\.[a-f0-9]{64}; Path=\/; HttpOnly; SameSite=Lax; Max-Age=86400$/,
    );
    const token = pass.header.split(';')[0].split('=')[1],
      request = (cookie: string) =>
        new Request('http://127.0.0.1:8766/api/feedback', { headers: { Cookie: cookie } });
    assert.equal(passId(request('inburgering_pass=' + token), now), pass.id);
    assert.equal(
      passId(request('inburgering_pass=' + token), now + PASS_HOURS * 3600 * 1000 - 1),
      pass.id,
    );
    assert.equal(
      passId(request('inburgering_pass=' + token), now + PASS_HOURS * 3600 * 1000),
      null,
      'expired',
    );
    assert.equal(
      passId(
        request('inburgering_pass=' + token.slice(0, -1) + (token.endsWith('0') ? '1' : '0')),
        now,
      ),
      null,
      'bad signature',
    );
    assert.equal(passId(request('inburgering_pass=' + token.replace(/^pass/, 'login')), now), null);
    assert.equal(passId(request('inburgering_ops=' + token), now), null, 'wrong cookie');
    assert.equal(passId(request(''), now), null);
    // Page loads keep a young pass and replace an old or missing one.
    assert.deepEqual(ensurePass(request('inburgering_pass=' + token), now + 1000), {
      id: pass.id,
      header: null,
    });
    const renewed = ensurePass(
      request('inburgering_pass=' + token),
      now + PASS_RENEW_HOURS * 3600 * 1000,
    );
    assert.ok(renewed.header && renewed.id !== pass.id);
    assert.ok(ensurePass(request(''), now).header);
  } finally {
    delete process.env.INBURGERING_ADMIN_SECRET;
  }
});
