import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router';
import './styles.css';
import { readPreferences } from './domain/render-state';
import { withBase } from './domain/base';
import { routeLang } from './domain/routes';
import { stripBase } from '../server/security';
export function loader({ request }) {
  const settings = readPreferences(request.headers.get('Cookie') || '');
  // The document language follows the address (/en is English); the study loader sends a
  // browser that prefers English there, so a plain path renders Dutch.
  settings.lang = routeLang({ pathname: stripBase(new URL(request.url).pathname) }) || 'nl';
  return { nonce: request.headers.get('x-csp-nonce') || undefined, settings };
}
export function meta() {
  return [{ title: 'Oefenschrift' }];
}
export function links() {
  return [
    // The icon (docs/logos/icon.mjs): the .ico first, then the SVG, which browsers that
    // understand it prefer over a sized raster; the PNG square for phones.
    { rel: 'icon', href: withBase('/favicon.ico'), sizes: '16x16 32x32 48x48' },
    { rel: 'icon', href: withBase('/icon.svg'), type: 'image/svg+xml', sizes: 'any' },
    { rel: 'apple-touch-icon', href: withBase('/apple-touch-icon.png') },
    ...[400, 600]
      .map((weight) => ({ href: withBase(`/fonts/fira-sans-${weight}.woff`) }))
      .concat([700, 800].map((weight) => ({ href: withBase(`/fonts/nunito-${weight}.woff`) })))
      .map((font) => ({
        rel: 'preload',
        as: 'font',
        type: 'font/woff',
        crossOrigin: 'anonymous' as const,
        ...font,
      })),
  ];
}
export function Layout({ children }) {
  const data = useLoaderData<typeof loader>();
  return (
    <html
      lang={data?.settings.lang || 'nl'}
      data-theme={data?.settings.theme === 'dark' ? 'dark' : 'light'}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="no-referrer" />
        <Meta />
        <Links nonce={data?.nonce} />
        <script src={withBase('/theme.js')} />
      </head>
      <body>
        {children}
        <Scripts nonce={data?.nonce} />
      </body>
    </html>
  );
}
export default function Root() {
  return <Outlet />;
}
export function ErrorBoundary() {
  const error = useRouteError(),
    message = isRouteErrorResponse(error)
      ? error.status === 404
        ? 'This page was not found.'
        : typeof error.data === 'string'
          ? error.data
          : 'Please try again.'
      : 'Something went wrong. Please reload.';
  return (
    <main className="error-page">
      <h1>{message}</h1>
      <a href={withBase('/reading')}>Back to practice</a>
    </main>
  );
}
