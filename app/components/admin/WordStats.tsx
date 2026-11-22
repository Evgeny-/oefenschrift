import React, { useMemo } from 'react';
import Chart, { axes, bar, shortDay } from './Chart';
import { Card, Empty, number, percent } from './ui';
import { groupBySlug } from '../../domain/words';

// Word practice on the overview: cards answered per day, the ways and lists learners use,
// and the words they least often know. Learners rate flashcards themselves, so "known" is
// their own Got it or Too easy (or a right de or het), not a checked answer.
const ways = {
  'nl-en': 'Dutch → English',
  'en-nl': 'English → Dutch',
  'de-het': 'De or het',
};
const lists = {
  'my-practice': 'Practise words',
  mistakes: 'My mistakes',
  review: 'Review',
  'my-list': 'My list',
  a1: 'A1 words',
  a2: 'A2 words',
  b1: 'Words for B1',
};
const listName = (key: string) => lists[key] || groupBySlug(key)?.en || key;
type Words = {
  cards: number;
  known: number;
  learners: number;
  words: number;
  daily: { day: string; cards: number; known: number }[];
  modes: { mode: string; cards: number; known: number; learners: number }[];
  lists: { list: string; cards: number; learners: number }[];
  hardest: { id: string; nl: string; en: string; mode: string; cards: number; known: number }[];
};
export default function WordStats({ words, days }: { words: Words; days: string[] }) {
  const perDay = useMemo(() => {
    const row = (day: string) => words.daily.find((d) => d.day === day);
    return (t) => ({
      ...axes(t, { legend: true }),
      xAxis: { ...axes(t).xAxis, data: days.map(shortDay) },
      series: [
        bar(
          'Known',
          days.map((day) => row(day)?.known || 0),
          t.series[0],
          t,
          { stack: 'cards', top: false },
        ),
        bar(
          'Again',
          days.map((day) => {
            const r = row(day);
            return r ? r.cards - r.known : 0;
          }),
          t.bad,
          t,
          { stack: 'cards' },
        ),
      ],
    });
  }, [words, days]);
  return (
    <>
      <Card
        className="span-6"
        title="Word practice per day"
        note={
          words.cards
            ? `${number(words.learners)} learners · ${number(words.cards)} cards · ${number(words.words)} words · ${percent(words.known, words.cards)} known`
            : 'Flashcards answered on the word practice page.'
        }
      >
        {words.cards ? (
          <Chart build={perDay} label="Word cards per day, known and again" />
        ) : (
          <Empty>No word practice recorded in this period.</Empty>
        )}
      </Card>
      <Card
        className="span-6"
        title="Words by way and list"
        note="How cards were asked, and where rounds started."
      >
        {words.cards ? (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Way</th>
                  <th className="num">Learners</th>
                  <th className="num">Cards</th>
                  <th className="num">Known</th>
                </tr>
              </thead>
              <tbody>
                {words.modes.map((row) => (
                  <tr key={row.mode}>
                    <td>{ways[row.mode] || row.mode}</td>
                    <td className="num">{number(row.learners)}</td>
                    <td className="num">{number(row.cards)}</td>
                    <td className="num">{percent(row.known, row.cards)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Started from</th>
                  <th className="num">Learners</th>
                  <th className="num">Cards</th>
                </tr>
              </thead>
              <tbody>
                {words.lists.map((row) => (
                  <tr key={row.list}>
                    <td>{listName(row.list)}</td>
                    <td className="num">{number(row.learners)}</td>
                    <td className="num">{number(row.cards)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Empty>No word practice recorded in this period.</Empty>
        )}
      </Card>
      <Card
        title="Hardest words"
        note="Words asked at least three times one way, least often known first."
      >
        {words.hardest.length ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Way</th>
                <th className="num">Cards</th>
                <th className="num">Known</th>
              </tr>
            </thead>
            <tbody>
              {words.hardest.map((row) => (
                <tr key={row.id + row.mode}>
                  <td>
                    <span lang="nl" translate="no">
                      {row.nl}
                    </span>
                    <small>{row.en}</small>
                  </td>
                  <td>{ways[row.mode] || row.mode}</td>
                  <td className="num">{number(row.cards)}</td>
                  <td className="num">{percent(row.known, row.cards)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty>Nothing to show until words have been practised a few times.</Empty>
        )}
      </Card>
    </>
  );
}
