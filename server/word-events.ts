// Anonymous word practice events: which word, which way it was asked (Dutch → English,
// English → Dutch, de or het), the learner's own answer (again, good, easy) and the list the
// round came from. Words are checked against content/words; nothing else is taken from the
// client. The cards themselves stay in the learner's browser.
import { groupBySlug, MY_LIST, type WordEntry } from '../app/domain/words';
import { CARD_MODES, LEVEL_POOLS, MY_PRACTICE } from '../app/domain/word-practice';
import { wordEntries } from './words';

const RATINGS = ['again', 'good', 'easy'];
const LISTS = new Set<string>([MY_PRACTICE, 'mistakes', 'review', MY_LIST, ...LEVEL_POOLS]);
let known: { source: WordEntry[]; ids: Set<string> } | null = null;
function knownWords() {
  const entries = wordEntries();
  if (known?.source !== entries)
    known = { source: entries, ids: new Set(entries.map((e) => e.id)) };
  return known.ids;
}
// The events row for a word answer, or null when anything about it is unknown. A de or het
// answer is right or wrong; "too easy" belongs to the flashcards only.
export function wordEventRow(event: any, lang: string | null, level: string | null) {
  if (
    typeof event.item !== 'string' ||
    !knownWords().has(event.item) ||
    !(CARD_MODES as string[]).includes(event.mode) ||
    !RATINGS.includes(event.selected) ||
    (event.mode === 'de-het' && event.selected === 'easy')
  )
    return null;
  const list =
    typeof event.list === 'string' && (LISTS.has(event.list) || groupBySlug(event.list))
      ? event.list
      : null;
  return [
    'word',
    event.item,
    list,
    event.selected,
    event.selected === 'again' ? 0 : 1,
    lang,
    level,
    event.mode,
  ];
}

// The words part of the administration overview. Counts only, never a visitor value.
export function wordAnalytics(q: (sql: string, ...args: any[]) => any[], since: string) {
  const one = (sql: string) => q(sql, since)[0] || {};
  const totals = one(
    "SELECT COUNT(*) cards,COALESCE(SUM(correct),0) known,COUNT(DISTINCT visitor) learners,COUNT(DISTINCT item_id) words FROM events WHERE kind='word' AND day>=?",
  );
  const byId = new Map(wordEntries().map((entry) => [entry.id, entry]));
  return {
    cards: Number(totals.cards || 0),
    known: Number(totals.known || 0),
    learners: Number(totals.learners || 0),
    words: Number(totals.words || 0),
    daily: q(
      "SELECT day,COUNT(*) cards,COALESCE(SUM(correct),0) known FROM events WHERE kind='word' AND day>=? GROUP BY day",
      since,
    ).map((row) => ({ day: String(row.day), cards: Number(row.cards), known: Number(row.known) })),
    modes: q(
      "SELECT mode,COUNT(*) cards,COALESCE(SUM(correct),0) known,COUNT(DISTINCT visitor) learners FROM events WHERE kind='word' AND day>=? GROUP BY mode ORDER BY cards DESC",
      since,
    ).map((row) => ({
      mode: String(row.mode),
      cards: Number(row.cards),
      known: Number(row.known),
      learners: Number(row.learners),
    })),
    lists: q(
      "SELECT question_id list,COUNT(*) cards,COUNT(DISTINCT visitor) learners FROM events WHERE kind='word' AND day>=? AND question_id IS NOT NULL GROUP BY question_id ORDER BY learners DESC,cards DESC LIMIT 6",
      since,
    ).map((row) => ({
      list: String(row.list),
      cards: Number(row.cards),
      learners: Number(row.learners),
    })),
    // Words asked at least three times one way, the least known first.
    hardest: q(
      "SELECT item_id,mode,COUNT(*) cards,COALESCE(SUM(correct),0) known FROM events WHERE kind='word' AND day>=? GROUP BY item_id,mode HAVING COUNT(*)>=3 ORDER BY SUM(correct)*1.0/COUNT(*) ASC,COUNT(*) DESC LIMIT 10",
      since,
    ).map((row) => {
      const entry = byId.get(String(row.item_id));
      return {
        id: String(row.item_id),
        nl: entry ? `${entry.article ? entry.article + ' ' : ''}${entry.nl}` : String(row.item_id),
        en: entry?.en || '',
        mode: String(row.mode),
        cards: Number(row.cards),
        known: Number(row.known),
      };
    }),
  };
}
