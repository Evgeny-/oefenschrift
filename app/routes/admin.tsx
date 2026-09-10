import React, { useMemo } from 'react';
import { Link, useLoaderData } from 'react-router';
import { getStore } from '../../server/store';
import { adminSession } from '../../server/security';
import { elevenLabsSubscription } from '../../server/services';
import Chart, { axes, bar, line, shortDay } from '../components/admin/Chart';
import { Card, Empty, Tile, number, percent } from '../components/admin/ui';
const subjects = {
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
  knm: 'KNM',
};
// Provider balances are read at most every five minutes.
let balance: { at: number; value: any } | null = null;
async function elevenLabs() {
  if (!balance || Date.now() - balance.at > 300000)
    balance = { at: Date.now(), value: await elevenLabsSubscription() };
  return balance.value;
}
export async function loader({ request }) {
  adminSession(request);
  const days = [7, 30, 90].includes(Number(new URL(request.url).searchParams.get('days')))
    ? Number(new URL(request.url).searchParams.get('days'))
    : 30;
  const store = getStore(),
    analytics = store.analytics(days),
    titles = Object.fromEntries(
      store.list().map((row) => [row.id, (row.published || row.draft)?.title || row.id]),
    );
  const meta = Object.fromEntries(store.list().map((row) => [row.id, row.published || row.draft]));
  const popular = analytics.byItem
    .map((row) => ({
      ...row,
      title: titles[row.item] || row.item,
      part: meta[row.item]?.part,
      level: meta[row.item]?.level,
    }))
    .sort((a, b) => b.visitors - a.visitors || b.answers - a.answers)
    .slice(0, 8);
  const reviewed = analytics.reviewsByItem
    .map((row) => ({
      ...row,
      title: titles[row.item] || row.item,
      part: meta[row.item]?.part,
      level: meta[row.item]?.level,
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5);
  const reports = store
    .reports()
    .filter((report) => report.status === 'open')
    .slice(0, 5)
    .map((report) => ({ ...report, title: titles[String(report.item_id)] || report.item_id }));
  return { days, analytics, popular, reviewed, reports, eleven: await elevenLabs() };
}
export default function Overview() {
  const { days, analytics: a, popular, reviewed, reports, eleven } = useLoaderData<typeof loader>();
  const labels = a.daily.map((d) => shortDay(d.day)),
    answersInWindow = a.daily.reduce((n, d) => n + d.answers, 0),
    correctInWindow = a.daily.reduce((n, d) => n + d.correct, 0);
  const feedback = a.services.filter((s) => s.service === 'feedback'),
    feedbackCalls = feedback.reduce((n, s) => n + Number(s.calls), 0),
    feedbackFailures = feedback.reduce((n, s) => n + Number(s.failures), 0);
  const byDay = (service) =>
    a.daily.map((d) => {
      const row = a.services.find((s) => s.day === d.day && s.service === service);
      return row ? Number(row.calls) : 0;
    });
  const failuresByDay = a.daily.map((d) =>
    a.services.filter((s) => s.day === d.day).reduce((n, s) => n + Number(s.failures), 0),
  );
  const levels = ['A2', 'B1', 'KNM'].filter((level) => a.parts.some((p) => p.level === level)),
    partsShown = Object.keys(subjects).filter((part) => a.parts.some((p) => p.part === part));
  const visitors = useMemo(
    () => (t) => ({
      ...axes(t),
      xAxis: { ...axes(t).xAxis, data: labels },
      series: [
        bar(
          'Visitors',
          a.daily.map((d) => d.visitors),
          t.series[0],
          t,
        ),
      ],
    }),
    [a],
  );
  const answers = useMemo(
    () => (t) => ({
      ...axes(t, { legend: true }),
      xAxis: { ...axes(t).xAxis, data: labels },
      series: [
        bar(
          'Correct',
          a.daily.map((d) => d.correct),
          t.series[0],
          t,
          { stack: 'answers', top: false },
        ),
        bar(
          'Incorrect',
          a.daily.map((d) => d.answers - d.correct),
          t.series[2],
          t,
          { stack: 'answers' },
        ),
      ],
    }),
    [a],
  );
  const accuracy = useMemo(
    () => (t) => ({
      ...axes(t, { legend: levels.length > 1, percent: true }),
      xAxis: { ...axes(t).xAxis, data: partsShown.map((part) => subjects[part]) },
      series: levels.map((level, i) =>
        bar(
          level,
          partsShown.map((part) => {
            const row = a.parts.find((p) => p.part === part && p.level === level);
            return row ? Math.round((row.correct / row.answers) * 100) : null;
          }),
          t.series[i],
          t,
        ),
      ),
    }),
    [a],
  );
  const services = useMemo(
    () => (t) => ({
      ...axes(t, { legend: true }),
      xAxis: { ...axes(t).xAxis, data: labels },
      series: [
        bar('Feedback', byDay('feedback'), t.series[0], t, { stack: 'calls', top: false }),
        bar('Transcriptions', byDay('transcribe'), t.series[1], t, { stack: 'calls' }),
        line('Failures', failuresByDay, t.bad, t),
      ],
    }),
    [a],
  );
  const donut = (rows, names) => (t) => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: t.sheet,
      borderColor: t.line,
      borderWidth: 1,
      textStyle: { color: t.ink, fontFamily: t.font, fontSize: 12 },
      extraCssText: 'box-shadow:none;border-radius:8px;',
    },
    legend: {
      right: 0,
      top: 'middle',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: t.muted, fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: ['58%', '82%'],
        center: ['35%', '50%'],
        label: { show: false },
        itemStyle: { borderColor: t.sheet, borderWidth: 2 },
        data: rows.map((row, i) => ({
          name: names[row.value] || row.value,
          value: row.visitors,
          itemStyle: { color: t.series[i % 3] },
        })),
      },
    ],
  });
  const languages = useMemo(() => donut(a.lang, { nl: 'Dutch', en: 'English' }), [a]),
    levelSplit = useMemo(() => donut(a.level, {}), [a]);
  const credits = eleven?.configured && !eleven.error ? eleven : null;
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Overview</h1>
          <p className="small">
            Anonymous usage since {a.since}. Learner answers, drafts and recordings are never
            stored.
          </p>
        </div>
        <nav className="range" aria-label="Period">
          {[7, 30, 90].map((n) => (
            <Link key={n} to={`/ops?days=${n}`} aria-current={days === n ? 'page' : undefined}>
              {n} days
            </Link>
          ))}
        </nav>
      </div>
      <div className="admin-grid">
        <Tile
          label="Unique visitors"
          value={number(a.visitors)}
          detail={`${number(a.returning)} returned on another day · ${number(a.visitors7)} in the last 7 days`}
        />
        <Tile
          label="Learners"
          value={number(a.learners)}
          detail="answered a question or finished a task"
        />
        <Tile
          label="Answers"
          value={number(answersInWindow)}
          detail={`${percent(correctInWindow, answersInWindow)} correct`}
        />
        <Tile
          label="Feedback requests"
          value={number(feedbackCalls)}
          detail={feedbackFailures ? `${number(feedbackFailures)} failed` : 'no failures'}
          tone={feedbackFailures > 0 ? 'warn' : undefined}
        />
        <Tile
          label="Open reports"
          value={number(a.reportsOpen)}
          detail={<Link to="/ops/reports">Review the queue</Link>}
          tone={a.reportsOpen > 0 ? 'warn' : undefined}
        />
        <Tile
          label="ElevenLabs credits"
          value={
            credits
              ? `${percent(credits.limit - credits.used, credits.limit)}`
              : eleven?.configured
                ? '–'
                : 'not set'
          }
          detail={
            credits
              ? `${number(credits.limit - credits.used)} of ${number(credits.limit)} characters left`
              : eleven?.error || 'no ElevenLabs key configured'
          }
          tone={
            credits && credits.limit && credits.used / credits.limit > 0.85 ? 'warn' : undefined
          }
        />
        <Card className="span-6" title="Unique visitors per day">
          <Chart build={visitors} label="Unique visitors per day" />
        </Card>
        <Card
          className="span-6"
          title="Answers per day"
          note="Checked answers in practice, retries and practice tests."
        >
          {answersInWindow ? (
            <Chart build={answers} label="Answers per day, correct and incorrect" />
          ) : (
            <Empty>No answers recorded in this period.</Empty>
          )}
        </Card>
        <Card
          className="span-6"
          title="Accuracy by subject"
          note="Share of correct answers per subject and level."
        >
          {a.parts.length ? (
            <Chart build={accuracy} label="Accuracy by subject and level" />
          ) : (
            <Empty>No answers recorded in this period.</Empty>
          )}
        </Card>
        <Card
          className="span-6"
          title="Service requests per day"
          note="Feedback and transcription calls with their failures."
        >
          <Chart build={services} label="Service requests per day" />
        </Card>
        <Card className="span-6" title="Interface language">
          {a.lang.length ? (
            <Chart build={languages} height={160} label="Visitors by interface language" />
          ) : (
            <Empty>No visits recorded yet.</Empty>
          )}
        </Card>
        <Card className="span-6" title="Level chosen">
          {a.level.length ? (
            <Chart build={levelSplit} height={160} label="Visitors by chosen level" />
          ) : (
            <Empty>No visits recorded yet.</Empty>
          )}
        </Card>
        <Card
          className="span-6"
          title="Hardest questions"
          note="Questions answered at least three times, lowest accuracy first."
        >
          {a.hardest.length ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th className="num">Answers</th>
                  <th className="num">Correct</th>
                  <th>Most chosen wrong option</th>
                </tr>
              </thead>
              <tbody>
                {a.hardest.map((row) => (
                  <tr key={row.item + row.question}>
                    <td>
                      <Link to={'/ops/exercises/' + encodeURIComponent(row.item)}>{row.title}</Link>
                      <small lang="nl">{row.prompt}</small>
                    </td>
                    <td className="num">{row.answers}</td>
                    <td className="num">{percent(row.correct, row.answers)}</td>
                    <td>{row.wrong ? `${row.wrong.option} (${row.wrong.count}×)` : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty>Nothing to show until questions have been answered a few times.</Empty>
          )}
        </Card>
        <Card
          className="span-6"
          title="Most practised"
          note="Exercises by unique learners in this period."
        >
          {popular.length ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th className="num">Learners</th>
                  <th className="num">Correct</th>
                </tr>
              </thead>
              <tbody>
                {popular.map((row) => (
                  <tr key={row.item}>
                    <td>
                      <Link to={'/ops/exercises/' + encodeURIComponent(row.item)}>{row.title}</Link>
                      <small>
                        {row.level} · {subjects[row.part] || row.part}
                      </small>
                    </td>
                    <td className="num">{row.visitors}</td>
                    <td className="num">{percent(row.correct, row.answers)}</td>
                  </tr>
                ))}
                {reviewed.map((row) => (
                  <tr key={row.item}>
                    <td>
                      <Link to={'/ops/exercises/' + encodeURIComponent(row.item)}>{row.title}</Link>
                      <small>
                        {row.level} · {subjects[row.part] || row.part} · {row.ai} with AI feedback
                      </small>
                    </td>
                    <td className="num">{row.visitors}</td>
                    <td className="num">–</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty>No exercises practised in this period.</Empty>
          )}
        </Card>
        <Card
          title="Open reports"
          actions={
            <Link className="text-button" to="/ops/reports">
              All reports
            </Link>
          }
        >
          {reports.length ? (
            <ul className="admin-list compact">
              {reports.map((report) => (
                <li key={report.id}>
                  <Link to={'/ops/exercises/' + encodeURIComponent(String(report.item_id))}>
                    {report.title}
                  </Link>
                  <span className="small">
                    {report.kind} ·{' '}
                    {new Date(Number(report.created_at) * 1000).toISOString().slice(0, 10)}
                  </span>
                  {report.message && <p className="report-message">{report.message}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <Empty>The queue is empty.</Empty>
          )}
        </Card>
      </div>
    </>
  );
}
