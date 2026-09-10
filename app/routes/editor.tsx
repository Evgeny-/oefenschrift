import { data, Form, Link, useLoaderData, useActionData, useNavigation } from 'react-router';
import { getStore, StoreError } from '../../server/store';
import { adminSession, requireAdminMutation } from '../../server/security';
import { Card, Empty, percent } from '../components/admin/ui';
import { withBase } from '../domain/base';
const subjects = {
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
  knm: 'KNM',
};
// One exercise: its usage, its reports and the switch that takes it out of practice.
// Content itself is edited in the reviewed catalogue, never here.
export function loader({ request, params }) {
  const session = adminSession(request),
    store = getStore(),
    row = store.get(params.id);
  if (!row?.published) throw new Response('Exercise not found', { status: 404 });
  const reports = store.reports().filter((report) => report.item_id === row.id);
  return data(
    { csrf: session.token, row, questions: store.questionStats(row.id), reports },
    { headers: session.headers },
  );
}
export async function action({ request, params }) {
  const form = await request.formData();
  requireAdminMutation(request, form.get('csrf'));
  try {
    const operation = form.get('operation');
    if (operation !== 'archive' && operation !== 'restore')
      throw new StoreError('Unsupported operation.', 405);
    getStore().archive(params.id, operation === 'archive', Number(form.get('version')));
    return { saved: true };
  } catch (e) {
    if (e instanceof StoreError) return data({ error: e.message }, { status: e.status });
    throw e;
  }
}
export default function ExerciseDetail() {
  const { csrf, row, questions, reports } = useLoaderData<typeof loader>(),
    result = useActionData<typeof action>(),
    navigation = useNavigation(),
    item = row.published,
    answered = questions.reduce((n, q) => n + q.answers, 0);
  return (
    <>
      <div className="admin-head">
        <div>
          <Link className="back" to="/ops/exercises">
            ← Exercises
          </Link>
          <h1 lang="nl">{item.title}</h1>
          <p className="small">
            {item.level} · {subjects[item.part] || item.part} · {row.id} ·{' '}
            {row.archived ? 'archived, not in practice' : 'available in practice'}
          </p>
        </div>
        <div className="admin-actions">
          {!row.archived && (
            <a className="bar-link" href={withBase('/exercise/' + encodeURIComponent(row.id))}>
              Open in practice
            </a>
          )}
          <Form method="post">
            <input type="hidden" name="csrf" value={csrf} />
            <input type="hidden" name="version" value={row.version} />
            <button
              className="secondary"
              name="operation"
              value={row.archived ? 'restore' : 'archive'}
              disabled={navigation.state !== 'idle'}
            >
              {row.archived ? 'Restore to practice' : 'Remove from practice'}
            </button>
          </Form>
        </div>
      </div>
      {result && 'error' in result && (
        <p className="feedback-error" role="alert">
          {result.error}
        </p>
      )}
      <div className="admin-grid">
        <Card
          className="span-6"
          title="Question statistics"
          note="Last 90 days. The correct option is marked."
        >
          {questions.length ? (
            answered ? (
              <div className="question-stats">
                {questions.map((q) => (
                  <div className="question-stat" key={q.id}>
                    <p lang="nl">
                      <strong>{q.id}</strong> · {q.prompt}
                    </p>
                    <p className="small">
                      {q.answers} answers · {percent(q.correct, q.answers)} correct
                    </p>
                    <div className="option-bars">
                      {q.options.map((o) => (
                        <div
                          className={`option-bar ${o.option === q.answer ? 'option-correct' : ''}`}
                          key={o.option}
                        >
                          <span>
                            {o.option}
                            {o.option === q.answer ? ' ✓' : ''}
                          </span>
                          <i style={{ width: `${q.answers ? (o.count / q.answers) * 100 : 0}%` }} />
                          <span className="num">{o.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty>No answers recorded for this exercise yet.</Empty>
            )
          ) : (
            <Empty>
              Open tasks have no answer key; feedback requests are counted on the Exercises page.
            </Empty>
          )}
        </Card>
        <Card
          className="span-6"
          title="Reports"
          note={`${reports.filter((r) => r.status === 'open').length} open`}
        >
          {reports.length ? (
            <ul className="admin-list compact">
              {reports.map((report) => (
                <li key={String(report.id)}>
                  <span className="small">
                    #{report.id} · {report.kind} · {report.status} ·{' '}
                    {new Date(Number(report.created_at) * 1000).toISOString().slice(0, 10)}
                  </span>
                  {report.message && <p className="report-message">{report.message}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No reports for this exercise.</Empty>
          )}
        </Card>
        <Card
          title="Reviewed content"
          note="Read-only. Changes go through the reviewed catalogue and a content import."
        >
          <details className="admin-json">
            <summary>Show the exercise JSON</summary>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </details>
        </Card>
      </div>
    </>
  );
}
