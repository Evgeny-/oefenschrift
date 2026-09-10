import { Form, redirect, useActionData, useLoaderData, useNavigation } from 'react-router';
import {
  adminCredentials,
  assertOrigin,
  clientAddress,
  loginAllowed,
  loginFailed,
  loginSession,
  signedIn,
  siteOrigin,
  verifyLogin,
} from '../../server/security';
import { LogoMark } from '../components/Wordmark';
import { logo } from '../components/logo';
const safeNext = (value: string | null) =>
  value && /^\/ops(?:\/|\?|$)/.test(value) && !value.startsWith('/ops/login') ? value : '/ops';
export function loader({ request }) {
  if (signedIn(request)) throw redirect(safeNext(new URL(request.url).searchParams.get('next')));
  return {
    configured: !!adminCredentials(),
    next: safeNext(new URL(request.url).searchParams.get('next')),
  };
}
export function meta() {
  return [{ title: 'Sign in | Oefenschrift' }, { name: 'robots', content: 'noindex' }];
}
export async function action({ request }) {
  assertOrigin(request);
  if (request.headers.get('Origin') !== siteOrigin(request))
    throw new Response('Origin rejected', { status: 403 });
  const address = clientAddress(request);
  if (!loginAllowed(address))
    return { error: 'Too many attempts. Wait fifteen minutes and try again.' };
  const form = await request.formData(),
    user = String(form.get('user') || ''),
    password = String(form.get('password') || '');
  if (!verifyLogin(user, password)) {
    loginFailed(address);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { error: 'That user name and password do not match.' };
  }
  const session = loginSession();
  throw redirect(safeNext(String(form.get('next') || '')), { headers: session.headers });
}
export default function AdminLogin() {
  const { configured, next } = useLoaderData<typeof loader>(),
    result = useActionData<typeof action>(),
    navigation = useNavigation();
  return (
    <main className="admin-login">
      <div className="admin-login-sheet">
        <h1 className="wordmark" aria-label={logo.name}>
          <LogoMark />
        </h1>
        {configured ? (
          <Form method="post" className="admin-login-form">
            <input type="hidden" name="next" value={next} />
            <label htmlFor="admin-user">User name</label>
            <input id="admin-user" name="user" autoComplete="username" required autoFocus />
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            {result?.error && (
              <p className="feedback-error" role="alert">
                {result.error}
              </p>
            )}
            <button className="primary" disabled={navigation.state !== 'idle'}>
              {navigation.state !== 'idle' ? 'Signing in…' : 'Sign in'}
            </button>
          </Form>
        ) : (
          <div className="admin-login-form">
            <p>
              No administrator account exists yet. Create one on the server, then reload this page:
            </p>
            <pre>npm run admin:password -- &lt;user&gt;</pre>
            <p className="small">
              For local development, INBURGERING_ADMIN_USER and INBURGERING_ADMIN_PASSWORD in the
              environment also work.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
