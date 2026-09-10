import React, { useState } from 'react';
import { data, Form, Link, useLoaderData, useNavigation } from 'react-router';
import { getStore } from '../../server/store';
import { adminSession, requireAdminMutation } from '../../server/security';
import { Card, Empty } from '../components/admin/ui';
const kinds = {
  unclear: 'Unclear wording',
  answer: 'Answer seems wrong',
  level: 'Difficulty',
  audio: 'Audio or transcript',
  other: 'Something else',
};
export function loader({ request }) {
  const session = adminSession(request),
    store = getStore(),
    titles = Object.fromEntries(
      store.list().map((row) => [row.id, row.published?.title || row.id]),
    );
  return data(
    {
      csrf: session.token,
      reports: store
        .reports()
        .map((report) => ({ ...report, title: titles[String(report.item_id)] || report.item_id })),
    },
    { headers: session.headers },
  );
}
export async function action({ request }) {
  const form = await request.formData();
  requireAdminMutation(request, form.get('csrf'));
  getStore().resolveReport(Number(form.get('id')), String(form.get('status')));
  return { ok: true };
}
export default function Reports() {
  const { csrf, reports } = useLoaderData<typeof loader>(),
    navigation = useNavigation(),
    [showResolved, setShowResolved] = useState(false);
  const open = reports.filter((report) => report.status === 'open'),
    shown = reports.filter((report) => showResolved || report.status === 'open');
  const byKind = Object.keys(kinds)
    .map((kind) => ({ kind, count: open.filter((report) => report.kind === kind).length }))
    .filter((x) => x.count);
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Reports</h1>
          <p className="small">
            {open.length} open {open.length === 1 ? 'report' : 'reports'} from learners
            {byKind.length
              ? ' · ' + byKind.map((x) => `${x.count} ${kinds[x.kind].toLowerCase()}`).join(' · ')
              : ''}
            . Answers and recordings are never included.
          </p>
        </div>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
          />{' '}
          Include resolved
        </label>
      </div>
      <Card>
        {shown.length ? (
          <ul className="admin-list">
            {shown.map((report) => (
              <li key={report.id}>
                <div className="admin-section-head">
                  <Link to={'/ops/exercises/' + encodeURIComponent(String(report.item_id))}>
                    {report.title}
                  </Link>
                  <span className="small">
                    #{report.id} · {kinds[String(report.kind)] || report.kind} · {report.status}
                  </span>
                </div>
                <p className="report-message">{report.message || 'No details supplied.'}</p>
                <div className="admin-section-head">
                  <span className="small">
                    {new Date(Number(report.created_at) * 1000).toISOString().slice(0, 10)} ·
                    revision {report.item_version || 'legacy'}
                    {report.question_id ? ' · question ' + report.question_id : ''}
                  </span>
                  <Form method="post">
                    <input type="hidden" name="csrf" value={csrf} />
                    <input type="hidden" name="id" value={String(report.id)} />
                    <input
                      type="hidden"
                      name="status"
                      value={report.status === 'open' ? 'resolved' : 'open'}
                    />
                    <button className="secondary" disabled={navigation.state !== 'idle'}>
                      {report.status === 'open' ? 'Resolve' : 'Reopen'}
                    </button>
                  </Form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No reports in this view.</Empty>
        )}
      </Card>
    </>
  );
}
