import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('deploy keeps bundles requested by existing pages while replacing the server build', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oefenschrift-deploy-'));
  const source = join(directory, 'next build');
  const destination = join(directory, 'live build');
  const put = async (root, path, text) => {
    const file = join(root, path);
    await mkdir(join(file, '..'), { recursive: true });
    await writeFile(file, text);
  };
  try {
    await put(destination, 'client/assets/manifest-old.js', 'previous manifest');
    await put(destination, 'client/assets/root-old.css', 'previous styles');
    await put(destination, 'client/assets/chunks/study-old.js', 'previous lazy chunk');
    await put(destination, 'server/index.js', 'previous server');
    await put(destination, 'server/removed.js', 'obsolete server chunk');
    await put(source, 'client/assets/manifest-new.js', 'next manifest');
    await put(source, 'client/assets/root-new.css', 'next styles');
    await put(source, 'server/index.js', 'next server');

    const result = spawnSync(
      'bash',
      [resolve('scripts/sync-build.sh'), `${source}/`, `${destination}/`],
      {
        encoding: 'utf8',
      },
    );
    assert.equal(result.status, 0, result.stderr || result.error?.message);
    for (const [path, expected] of [
      ['client/assets/manifest-old.js', 'previous manifest'],
      ['client/assets/root-old.css', 'previous styles'],
      ['client/assets/chunks/study-old.js', 'previous lazy chunk'],
      ['client/assets/manifest-new.js', 'next manifest'],
      ['client/assets/root-new.css', 'next styles'],
      ['server/index.js', 'next server'],
    ]) {
      assert.equal(await readFile(join(destination, path), 'utf8'), expected);
    }
    await assert.rejects(access(join(destination, 'server/removed.js')), { code: 'ENOENT' });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
