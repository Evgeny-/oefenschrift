import { spawn, type ChildProcess } from 'node:child_process';
import { createServer, connect } from 'node:net';
import { mkdir, mkdtemp, open } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

async function freePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((done) => server.listen(0, '127.0.0.1', done));
  const port = (server.address() as { port: number }).port;
  await new Promise<void>((done) => server.close(() => done()));
  return port;
}
async function waitUntil(check: () => Promise<boolean>, label: string) {
  const end = Date.now() + 45000;
  while (Date.now() < end) {
    if (await check()) return;
    await delay(150);
  }
  throw new Error(`${label} did not start. See the browser-run logs in tmp/.`);
}
async function stop(child: ChildProcess) {
  if (!child.pid || child.exitCode !== null) return;
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch {
    return;
  }
  await Promise.race([new Promise((done) => child.once('exit', done)), delay(2000)]);
  try {
    process.kill(-child.pid, 'SIGKILL');
  } catch {
    /* Already stopped. */
  }
}

await mkdir('tmp', { recursive: true });
const directory = await mkdtemp(resolve('tmp/browser-run-'));
const port = await freePort(),
  bidiPort = await freePort();
const origin = `http://127.0.0.1:${port}`;
const production = process.argv.includes('--production');
const environment = {
  ...process.env,
  PORT: String(port),
  TEST_ORIGIN: origin,
  NODE_ENV: production ? 'production' : 'development',
  FIREFOX_BIDI_PORT: String(bidiPort),
  INBURGERING_DB: resolve(directory, 'test.sqlite3'),
  INBURGERING_ADMIN_SECRET: randomBytes(32).toString('hex'),
  INBURGERING_ADMIN_USER: 'browser-test',
  INBURGERING_ADMIN_PASSWORD: 'browser-test-password',
  INBURGERING_OFFLINE: '1',
  OPENAI_API_KEY: 'browser-test-no-provider',
  ELEVENLABS_API_KEY: 'browser-test-no-provider',
};
const serverLog = await open(resolve(directory, 'server.log'), 'w');
const browserLog = await open(resolve(directory, 'firefox.log'), 'w');
const server = spawn(process.execPath, ['node_modules/tsx/dist/cli.mjs', 'server/index.ts'], {
  env: environment,
  detached: true,
  stdio: ['ignore', serverLog.fd, serverLog.fd],
});
const binary =
  process.env.FIREFOX_BINARY ||
  (process.platform === 'darwin' ? '/Applications/Firefox.app/Contents/MacOS/firefox' : 'firefox');
await mkdir(resolve(directory, 'profile'));
const firefox = spawn(
  binary,
  [
    '--headless',
    '--no-remote',
    '--profile',
    resolve(directory, 'profile'),
    '--remote-debugging-port',
    String(bidiPort),
    'about:blank',
  ],
  {
    detached: true,
    stdio: ['ignore', browserLog.fd, browserLog.fd],
  },
);
let launchError: Error | undefined;
for (const child of [server, firefox])
  child.on('error', (error) => {
    launchError = error;
  });
try {
  await waitUntil(async () => {
    if (launchError) throw launchError;
    try {
      return (await fetch(origin + '/api/status')).ok;
    } catch {
      return false;
    }
  }, 'Application');
  await waitUntil(
    () =>
      new Promise((done) => {
        const socket = connect(bidiPort, '127.0.0.1');
        socket.once('connect', () => {
          socket.destroy();
          done(true);
        });
        socket.once('error', () => done(false));
      }),
    'Firefox',
  );
  for (const test of production ? ['production'] : ['infrastructure', 'refinement']) {
    console.log(`\nFirefox: ${test}`);
    const child = spawn(process.execPath, [`tests/browser/${test}.mjs`], {
      env: environment,
      stdio: 'inherit',
    });
    const timeout = setTimeout(() => child.kill('SIGTERM'), 180000);
    const code = await new Promise<number | null>((done, reject) => {
      child.once('exit', done);
      child.once('error', reject);
    });
    clearTimeout(timeout);
    if (code !== 0) throw new Error(`${test} failed (${code}). Logs: ${directory}`);
  }
  console.log(`\nBrowser checks passed. Isolated database and logs: ${directory}`);
} finally {
  await Promise.all([stop(server), stop(firefox)]);
  await serverLog.close();
  await browserLog.close();
}
