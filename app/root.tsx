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
export function loader({ request }) {
  return {
    nonce: request.headers.get('x-csp-nonce') || undefined,
    settings: readPreferences(request.headers.get('Cookie') || ''),
  };
}
export function meta() {
  return [{ title: 'Inburgering' }];
}
export function links() {
  return [400, 600].map((weight) => ({
    rel: 'preload',
    href: `/fonts/public-sans-${weight}.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous' as const,
  }));
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
        <script src="/theme.js" />
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
      <a href="/reading">Back to practice</a>
    </main>
  );
}
