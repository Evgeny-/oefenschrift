import { getStore, StoreError } from '../../server/store';
import { adminSession, requireAdminMutation } from '../../server/security';
import { providerBalances } from '../../server/services';
export async function loader({ request, params }) {
  const session = adminSession(request),
    store = getStore();
  const data =
    params.resource === 'exercises'
      ? params.id
        ? store.get(params.id)
        : store.list()
      : params.resource === 'reports'
        ? store.reports()
        : params.resource === 'stats'
          ? store.stats()
          : params.resource === 'providers'
            ? await providerBalances()
            : null;
  if (!data) throw new Response('Not found', { status: 404 });
  return Response.json({ data, csrf: session.token }, { headers: session.headers });
}
export async function action({ request, params }) {
  requireAdminMutation(request, request.headers.get('X-CSRF-Token'));
  let data: any;
  try {
    const text = await request.text();
    if (text.length > 45000) throw new Error();
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Response('Invalid JSON', { status: 400 });
  }
  const store = getStore();
  try {
    // Content is authored in the reviewed catalogue; the API only takes an exercise
    // out of practice and back.
    if (params.resource === 'exercises') {
      if (request.method === 'DELETE' && params.id)
        return Response.json(store.archive(params.id, true, data.version));
      if (request.method === 'PATCH' && params.id && data.archived === false)
        return Response.json(store.archive(params.id, false, data.version));
    }
    if (params.resource === 'reports' && params.id && request.method === 'PATCH') {
      store.resolveReport(Number(params.id), data.status);
      return Response.json({ ok: true });
    }
    throw new StoreError('Unsupported operation.', 405);
  } catch (e) {
    if (e instanceof StoreError) return Response.json({ error: e.message }, { status: e.status });
    throw e;
  }
}
