import { redirect } from 'react-router';
import { assertOrigin, logoutHeaders, siteOrigin } from '../../server/security';
export function loader() {
  throw redirect('/ops/login');
}
export function action({ request }) {
  assertOrigin(request);
  if (request.headers.get('Origin') !== siteOrigin(request))
    throw new Response('Origin rejected', { status: 403 });
  throw redirect('/ops/login', { headers: logoutHeaders() });
}
