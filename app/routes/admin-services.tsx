import React, { useMemo } from 'react';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router';
import { getStore, StoreError } from '../../server/store';
import { adminSession, requireAdminMutation } from '../../server/security';
import { configuration, keys } from '../../server/services';
import {
  availability,
  LABELS,
  resume,
  SERVICES,
  setCap,
  setEnabled,
  type ServiceState,
} from '../../server/availability';
// Only the loader and action touch the server modules; the component receives plain data.
type Control = ServiceState & { label: string };
import Chart, { axes, bar, donut, shortDay } from '../components/admin/Chart';
import { Card, Empty, Tile, number, percent, useProviders } from '../components/admin/ui';
// The loader answers from the store alone; the live balances are fetched by the page
// afterwards (useProviders), so a slow provider never holds the page back.
export async function loader({ request }) {
  const session = adminSession(request);
  const store = getStore(),
    analytics = store.analytics(30),
    stats = store.stats(120);
  const tokens = stats
    .filter((row) => row.service === 'feedback')
    .reduce(
      (sum, row) => ({
        input: sum.input + Number(row.input_tokens || 0),
        output: sum.output + Number(row.output_tokens || 0),
      }),
      { input: 0, output: 0 },
    );
  return {
    daily: analytics.daily,
    services: analytics.services,
    stats,
    tokens,
    model: configuration().feedback_model,
    openaiKey: !!keys().OPENAI_API_KEY,
    adminKey: !!process.env.OPENAI_ADMIN_KEY,
    status: Object.fromEntries(
      Object.entries(availability(Date.now(), store)).map(([service, state]) => [
        service,
        { ...state, label: LABELS[state.service] },
      ]),
    ) as Record<'feedback' | 'speech', Control>,
    csrf: session.token,
  };
}
// The switches: on, off, resume a paused service, or set its daily cap.
export async function action({ request }) {
  const form = await request.formData();
  requireAdminMutation(request, form.get('csrf'));
  const service = String(form.get('service')),
    operation = String(form.get('operation'));
  if (!SERVICES.includes(service as any)) return { error: 'Unknown service.' };
  try {
    if (operation === 'on' || operation === 'off') setEnabled(service as any, operation === 'on');
    else if (operation === 'resume') resume(service as any);
    else if (operation === 'cap') setCap(service as any, form.get('cap'));
    else return { error: 'Unknown operation.' };
  } catch (error) {
    if (error instanceof StoreError) return { error: error.message };
    throw error;
  }
  return { ok: true, service, operation };
}
const utc = (time: number) => new Date(time).toISOString().slice(11, 16) + ' UTC';
function stateLine(s: Control) {
  if (!s.configured) return 'No key configured';
  if (!s.enabled) return 'Switched off';
  if (s.pause)
    return `Paused ${s.pause.reason === 'rejected' ? 'because the provider rejected the key or quota' : 'after repeated provider errors'} · resumes ${utc(s.pause.until)}`;
  if (s.capped) return 'Daily cap reached · resumes at midnight UTC';
  return 'On';
}
function ServiceControl({ state: s, csrf }: { state: Control; csrf: string }) {
  const navigation = useNavigation(),
    busy = navigation.state !== 'idle';
  return (
    <div className="service-control" data-service={s.service} data-available={s.available}>
      <p className="service-state">
        <strong>{s.label}</strong>
        <span className={s.available ? 'service-on' : 'service-off'}>{stateLine(s)}</span>
        <span className="small">
          {number(s.today)} of {number(s.cap)} requests today
        </span>
      </p>
      <div className="service-actions">
        <Form method="post">
          <input type="hidden" name="csrf" value={csrf} />
          <input type="hidden" name="service" value={s.service} />
          <button
            className="secondary"
            name="operation"
            value={s.enabled ? 'off' : 'on'}
            disabled={busy || !s.configured}
          >
            {s.enabled ? 'Switch off' : 'Switch on'}
          </button>
        </Form>
        {s.pause && (
          <Form method="post">
            <input type="hidden" name="csrf" value={csrf} />
            <input type="hidden" name="service" value={s.service} />
            <button className="secondary" name="operation" value="resume" disabled={busy}>
              Resume now
            </button>
          </Form>
        )}
        <Form method="post" className="service-cap">
          <input type="hidden" name="csrf" value={csrf} />
          <input type="hidden" name="service" value={s.service} />
          <input type="hidden" name="operation" value="cap" />
          <label>
            Daily cap
            <input
              name="cap"
              type="number"
              inputMode="numeric"
              min={1}
              max={1000000}
              defaultValue={s.cap}
              key={s.cap}
              required
            />
          </label>
          <button className="secondary" disabled={busy}>
            Save
          </button>
        </Form>
      </div>
    </div>
  );
}
export default function Services() {
  const { daily, services, stats, tokens, model, openaiKey, adminKey, status, csrf } =
    useLoaderData<typeof loader>();
  const { eleven, openai } = useProviders();
  const result = useActionData<typeof action>();
  const labels = daily.map((d) => shortDay(d.day));
  const tokenChart = useMemo(
    () => (t) => ({
      ...axes(t, { legend: true }),
      xAxis: { ...axes(t).xAxis, data: labels },
      series: [
        bar(
          'Input tokens',
          daily.map((d) => {
            const row = services.find((s) => s.day === d.day && s.service === 'feedback');
            return row ? Number(row.input_tokens || 0) : 0;
          }),
          t.series[0],
          t,
          { stack: 'tokens', top: false },
        ),
        bar(
          'Output tokens',
          daily.map((d) => {
            const row = services.find((s) => s.day === d.day && s.service === 'feedback');
            return row ? Number(row.output_tokens || 0) : 0;
          }),
          t.series[1],
          t,
          { stack: 'tokens' },
        ),
      ],
    }),
    [daily, services],
  );
  // The balance read covers 90 days for the overview; this page shows the last 30.
  const costDays = useMemo(() => (openai?.days || []).slice(-30), [openai]),
    costTotal = costDays.reduce((sum, day) => sum + day.cost, 0);
  const costChart = useMemo(
    () => (t) => ({
      ...axes(t),
      xAxis: { ...axes(t).xAxis, data: costDays.map((d) => shortDay(d.day)) },
      yAxis: {
        ...axes(t).yAxis,
        minInterval: undefined,
        axisLabel: { color: t.muted, fontSize: 11, formatter: '${value}' },
      },
      series: [
        bar(
          'Cost',
          costDays.map((d) => Number(d.cost.toFixed(2))),
          t.series[0],
          t,
        ),
      ],
    }),
    [costDays],
  );
  const credits = eleven?.configured && !eleven.error ? eleven : null,
    used = credits ? credits.used / Math.max(1, credits.limit) : 0;
  // The plan as a ring: what is left in gold, what is used in the hairline colour, or in
  // the warning red once more than 85% is gone.
  const planChart = useMemo(
    () => (t) =>
      donut(
        [
          { name: 'Left', value: credits ? credits.limit - credits.used : 0, color: t.series[0] },
          { name: 'Used', value: credits ? credits.used : 0, color: used > 0.85 ? t.bad : t.line },
        ],
        t,
        { centre: { value: percent(1 - used, 1), label: 'left' } },
      ),
    [credits, used],
  );
  const transcriptions = number(
    stats
      .filter(
        (row) => row.service === 'transcribe' && row.day >= new Date().toISOString().slice(0, 8),
      )
      .reduce((n, row) => n + Number(row.calls), 0),
  );
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Services</h1>
          <p className="small">
            Provider balances are read live and never stored. Usage below comes from this server's
            own counters. A switched-off, paused or capped service leaves practice working: learners
            get self-review instead of AI feedback and type instead of dictating.
          </p>
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
          title="ElevenLabs"
          note="Speech-to-text for speaking tasks and the voice used for listening clips."
        >
          <ServiceControl state={status.speech} csrf={csrf} />
          {credits ? (
            <>
              <div className="tiles-inline">
                <Tile
                  className=""
                  label="Characters left"
                  value={number(credits.limit - credits.used)}
                  detail={`of ${number(credits.limit)} on the ${credits.tier || 'current'} plan`}
                  tone={used > 0.85 ? 'warn' : undefined}
                />
                <Tile
                  className=""
                  label="Resets"
                  value={
                    credits.resetsAt ? new Date(credits.resetsAt).toISOString().slice(0, 10) : '–'
                  }
                  detail={credits.status ? `subscription ${credits.status}` : undefined}
                />
              </div>
              <p className="small">
                Transcriptions this month: <strong>{transcriptions}</strong> calls.
              </p>
              <div className="chart-ring">
                <Chart build={planChart} height={160} label="Characters left and used" />
              </div>
            </>
          ) : !eleven ? (
            <Empty>Reading the balance…</Empty>
          ) : (
            <Empty>
              {eleven.configured
                ? eleven.error
                : 'No ElevenLabs key is configured, so there is no balance to show.'}
            </Empty>
          )}
        </Card>
        <Card className="span-6" title="OpenAI" note={`Feedback runs on ${model}.`}>
          <ServiceControl state={status.feedback} csrf={csrf} />
          {openaiKey ? (
            <>
              <div className="tiles-inline">
                <Tile className="" label="Input tokens · 30 days" value={number(tokens.input)} />
                <Tile className="" label="Output tokens · 30 days" value={number(tokens.output)} />
              </div>
              {openai?.configured && !openai.error ? (
                <>
                  <p className="small">
                    Organisation cost over the last 30 days:{' '}
                    <strong>${costTotal.toFixed(2)}</strong>
                  </p>
                  <Chart build={costChart} height={160} label="OpenAI cost per day" />
                </>
              ) : !openai && adminKey ? (
                <Empty>Reading the spend…</Empty>
              ) : (
                <p className="small">
                  {adminKey
                    ? openai?.error
                    : 'OpenAI exposes no balance or spend to a project API key. Set OPENAI_ADMIN_KEY (an organisation admin key) to read daily costs here; until then the token counts above are the measure.'}
                </p>
              )}
            </>
          ) : (
            <Empty>
              No OpenAI key is configured, so feedback is off and there is nothing to show.
            </Empty>
          )}
        </Card>
        <Card
          title="Feedback tokens per day"
          note="Counted from each provider response; cached results cost nothing."
        >
          {tokens.input + tokens.output ? (
            <Chart build={tokenChart} label="Feedback tokens per day" />
          ) : (
            <Empty>No feedback requests in the last 30 days.</Empty>
          )}
        </Card>
        <Card
          title="Daily service log"
          note="Requests, failures and average response time. Answers, recordings and learner identifiers are not stored here."
        >
          {stats.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Service</th>
                    <th className="num">Requests</th>
                    <th className="num">Failures</th>
                    <th className="num">Average</th>
                    <th className="num">Tokens in</th>
                    <th className="num">Tokens out</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((row) => (
                    <tr key={String(row.day) + row.service}>
                      <td>{row.day}</td>
                      <td>{row.service}</td>
                      <td className="num">{row.calls}</td>
                      <td className="num">{row.failures}</td>
                      <td className="num">
                        {Number(row.calls)
                          ? (Number(row.total_ms) / Number(row.calls) / 1000).toFixed(2) + ' s'
                          : '–'}
                      </td>
                      <td className="num">{number(Number(row.input_tokens || 0))}</td>
                      <td className="num">{number(Number(row.output_tokens || 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty>No service requests recorded yet.</Empty>
          )}
        </Card>
      </div>
    </>
  );
}
