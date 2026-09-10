import test from 'node:test';
import assert from 'node:assert/strict';
import { compact } from '../app/components/admin/ui';
import { providerBalances } from '../server/services';

test('compact counts keep three significant digits and a fixed suffix in every engine', () => {
  assert.deepEqual([1453433, 1506362, 12345, 999, 999600, 0, 47619].map(compact), [
    '1.45M',
    '1.51M',
    '12.3K',
    '999',
    '1M',
    '0',
    '47.6K',
  ]);
});

test('provider balances are read once per five minutes and retried after a failed read', async () => {
  process.env.INBURGERING_OFFLINE = '1';
  process.env.ELEVENLABS_API_KEY = 'test';
  process.env.OPENAI_ADMIN_KEY = 'test';
  const first = providerBalances(1000);
  assert.equal(providerBalances(1000 + 240000), first, 'the same read serves five minutes');
  const value = await first;
  assert.equal(value.eleven.error, 'Not checked in offline mode.');
  // An offline read counts as a failure, so the next read after a minute is fresh.
  assert.notEqual(providerBalances(1000 + 61000), first);
  delete process.env.INBURGERING_OFFLINE;
  delete process.env.ELEVENLABS_API_KEY;
  delete process.env.OPENAI_ADMIN_KEY;
});
