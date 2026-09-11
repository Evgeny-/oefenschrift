import { setting as environmentSetting } from '../environment';
import express from 'express';
import type { ServerBuild } from 'react-router';
import { createRequestHandler } from '@react-router/express';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import { basePath, crossSiteRejected, publicOrigin } from './security';
// A local .env (see .env.example) supplies keys and admin settings; real environment variables win.
try {
  process.loadEnvFile('.env');
} catch {}
const development = process.env.NODE_ENV !== 'production',
  port = Number(process.env.PORT || 8766),
  origin = publicOrigin(),
  base = basePath(),
  // Behind a reverse proxy, the number of hops whose X-Forwarded-* headers are trusted.
  trustProxy = Number(environmentSetting('TRUST_PROXY') || 0);
const hosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`, `[::1]:${port}`]);
if (origin) hosts.add(new URL(origin).host);
const app = express();
app.disable('x-powered-by');
if (trustProxy > 0) app.set('trust proxy', trustProxy);
app.use((req, res, next) => {
  if (!hosts.has(req.headers.host || '')) {
    res.status(403).end('Host rejected');
    return;
  }
  if (crossSiteRejected((name) => req.headers[name] as string | undefined, req.method)) {
    res.status(403).end('Cross-site access rejected');
    return;
  }
  const nonce = randomBytes(18).toString('base64');
  req.headers['x-csp-nonce'] = nonce;
  // The client address after the trusted proxy hops; route code reads this header only.
  req.headers['x-client-address'] = (req.ip || 'local').replace(/^::ffff:/, '');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'microphone=(self), camera=(), geolocation=()');
  if (origin?.startsWith('https:')) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  const path = base && req.path.startsWith(base) ? req.path.slice(base.length) : req.path;
  if (path === '/ops' || path.startsWith('/ops/') || path.startsWith('/api/ops'))
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' ${development ? "'unsafe-inline'" : `'nonce-${nonce}'`}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self' ${development ? 'ws://127.0.0.1:* ws://localhost:*' : ''}; worker-src 'self' ${development ? 'blob:' : ''}; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`,
  );
  next();
});
const http = createServer(app);
if (development) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true, ws: { server: http } },
    appType: 'custom',
  });
  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    try {
      const build = await vite.ssrLoadModule('virtual:react-router/server-build');
      await createRequestHandler({ build: build as ServerBuild, mode: 'development' })(
        req,
        res,
        next,
      );
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  // Fingerprinted bundles never change under their name; media and fonts change rarely.
  app.use(
    base || '/',
    express.static('build/client', {
      index: false,
      setHeaders: (res, path) => {
        if (path.includes('/assets/'))
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        else if (/\/(audio|images|fonts)\//.test(path))
          res.setHeader('Cache-Control', 'public, max-age=604800');
        else res.setHeader('Cache-Control', 'public, max-age=3600');
      },
    }),
  );
  const buildPath = '../build/server/index.js';
  const build = await import(buildPath);
  // The bundles were built for one base path; serving them under another breaks every link.
  const built = String(build.basename || '/').replace(/\/+$/, '');
  if (built !== base)
    throw new Error(
      `The build expects the base path "${built || '/'}" but OEFENSCHRIFT_BASE_PATH is "${base || '/'}". Rebuild with the same value.`,
    );
  app.use(createRequestHandler({ build, mode: 'production' }));
}
app.use((error, req, res, next) => {
  console.error('Request failed:', error?.name || 'Error');
  if (!res.headersSent) res.status(500).json({ error: 'Request failed. Please retry.' });
});
http.listen(port, '127.0.0.1', () =>
  console.log(
    `Oefenschrift ${development ? 'development (hot reload)' : 'production'}: http://127.0.0.1:${port}${base}${origin ? ` serving ${origin}${base}` : ''}`,
  ),
);
function close() {
  http.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 2000).unref();
}
process.on('SIGTERM', close);
process.on('SIGINT', close);
