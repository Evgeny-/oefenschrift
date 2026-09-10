import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { getStore } from '../../server/store';
import { adminSession } from '../../server/security';
import { Card, percent } from '../components/admin/ui';
const subjects = {
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
  knm: 'KNM',
};
export function loader({ request }) {
  adminSession(request);
  const store = getStore(),
    analytics = store.analytics(90),
    reports = store.reports();
  const rows = store.list().map((row) => {
    const item = row.published || row.draft,
      answers = analytics.byItem.find((x) => x.item === row.id),
      reviews = analytics.reviewsByItem.find((x) => x.item === row.id);
    return {
      id: row.id,
      title: item?.title || row.id,
      level: item?.level,
      part: item?.part,
      status: row.archived ? 'archived' : row.draft ? 'draft' : 'available',
      learners: (answers?.visitors || 0) + (reviews?.visitors || 0),
      answers: answers?.answers || 0,
      correct: answers?.correct || 0,
      reviews: reviews?.reviews || 0,
      ai: reviews?.ai || 0,
      open: reports.filter((report) => report.item_id === row.id && report.status === 'open')
        .length,
    };
  });
  return {
    rows,
    counts: {
      available: rows.filter((r) => r.status === 'available').length,
      draft: rows.filter((r) => r.status === 'draft').length,
      archived: rows.filter((r) => r.status === 'archived').length,
    },
  };
}
export default function Exercises() {
  const { rows, counts } = useLoaderData<typeof loader>(),
    [query, setQuery] = useState(''),
    [sort, setSort] = useState<'learners' | 'accuracy' | 'title'>('learners');
  const shown = rows
    .filter((row) => (row.id + ' ' + row.title).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      sort === 'title'
        ? a.title.localeCompare(b.title)
        : sort === 'accuracy'
          ? (a.answers ? a.correct / a.answers : 2) - (b.answers ? b.correct / b.answers : 2)
          : b.learners - a.learners || a.title.localeCompare(b.title),
    );
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Exercises</h1>
          <p className="small">
            {counts.available} available · {counts.draft} drafts awaiting review · {counts.archived}{' '}
            archived. Usage covers the last 90 days.
          </p>
        </div>
        <Link className="primary" to="/ops/exercises/new">
          New draft
        </Link>
      </div>
      <Card
        actions={
          <div className="admin-filters">
            <label className="sr-only" htmlFor="exercise-search">
              Find an exercise
            </label>
            <input
              id="exercise-search"
              className="admin-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title or ID"
            />
            <div className="segmented" role="group" aria-label="Sort">
              {[
                ['learners', 'Most used'],
                ['accuracy', 'Lowest accuracy'],
                ['title', 'Title'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={sort === value}
                  onClick={() => setSort(value as any)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <table className="admin-table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Status</th>
              <th className="num">Learners</th>
              <th className="num">Answers</th>
              <th className="num">Correct</th>
              <th className="num">Feedback</th>
              <th className="num">Reports</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link to={'/ops/exercises/' + encodeURIComponent(row.id)}>{row.title}</Link>
                  <small>
                    {row.level} · {subjects[row.part] || row.part} · {row.id}
                  </small>
                </td>
                <td>
                  <span className={`status status-${row.status}`}>
                    {row.status === 'draft'
                      ? 'Draft'
                      : row.status === 'archived'
                        ? 'Archived'
                        : 'Available'}
                  </span>
                </td>
                <td className="num">{row.learners || '–'}</td>
                <td className="num">
                  {row.answers || (row.reviews ? `${row.reviews} reviewed` : '–')}
                </td>
                <td className="num">{percent(row.correct, row.answers)}</td>
                <td className="num">{row.ai || '–'}</td>
                <td className="num">{row.open || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
