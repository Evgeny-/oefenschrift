// Word practice: cards like Anki or gracht.app. The learner sees the Dutch word, thinks of
// the meaning, turns the card and says how it went. Again brings the word back later in the
// round and tomorrow; Got it spaces it out (1, 3, 7, 14, 30 and then 60 days); Too easy
// stops it coming back. Everything stays in this browser with the rest of the word lists.
import { groupBySlug, groupEntries, MY_LIST, TOP_SIZE, type WordEntry } from './words';

export interface CardState {
  // Successful answers in a row; 0 after Again.
  step: number;
  // The local day (YYYY-MM-DD) the card is next due.
  due: string;
  seen: number;
  misses: number;
  // The last answer was Again: the word is one of the learner's mistakes.
  again?: boolean;
  // Too easy: the card no longer comes back.
  done?: boolean;
}
export type Cards = Record<string, CardState>;
export type Rating = 'again' | 'good' | 'easy';

export const INTERVALS = [1, 3, 7, 14, 30, 60];
export const ROUND_SIZE = 20;
// A word counts as learned after three good answers in a row, or Too easy.
export const LEARNED_STEP = 3;

export function today(now = new Date()) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
export function addDays(day: string, days: number) {
  const [y, m, d] = day.split('-').map(Number);
  return today(new Date(y, m - 1, d + days));
}

export function rate(card: CardState | undefined, rating: Rating, day: string): CardState {
  const seen = (card?.seen || 0) + 1,
    misses = card?.misses || 0;
  if (rating === 'again')
    return { step: 0, due: addDays(day, 1), seen, misses: misses + 1, again: true };
  if (rating === 'easy')
    return {
      step: INTERVALS.length,
      due: addDays(day, INTERVALS.at(-1)!),
      seen,
      misses,
      done: true,
    };
  const step = (card?.again ? 0 : card?.step || 0) + 1;
  return { step, due: addDays(day, INTERVALS[Math.min(step, INTERVALS.length) - 1]), seen, misses };
}
export const isDue = (card: CardState | undefined, day: string) =>
  !!card && !card.done && card.due <= day;
export const isLearned = (card: CardState | undefined) =>
  !!card && (!!card.done || card.step >= LEARNED_STEP);

// A round from a pool of words: the ones due first (longest waiting first), then words not
// practised yet in the pool's own order. A pool with nothing due and nothing new gives its
// words that are furthest from due, so a learner can always practise a list again.
export function buildRound(pool: WordEntry[], cards: Cards, day: string, size = ROUND_SIZE) {
  const due = pool
      .filter((entry) => isDue(cards[entry.id], day))
      .sort((a, b) => cards[a.id].due.localeCompare(cards[b.id].due)),
    fresh = pool.filter((entry) => !cards[entry.id]);
  const round = [...due, ...fresh].slice(0, size);
  if (round.length) return { words: round, early: false };
  const waiting = pool
    .filter((entry) => !cards[entry.id]?.done)
    .sort((a, b) => cards[a.id].due.localeCompare(cards[b.id].due));
  return { words: waiting.slice(0, size), early: true };
}

export interface PracticeStats {
  practised: number;
  learned: number;
  due: number;
  mistakes: number;
  // Words missed most often, most missed first.
  hardest: string[];
}
export function practiceStats(cards: Cards, day: string, known?: Set<string>): PracticeStats {
  const ids = Object.keys(cards).filter((id) => !known || known.has(id));
  return {
    practised: ids.length,
    learned: ids.filter((id) => isLearned(cards[id])).length,
    due: ids.filter((id) => isDue(cards[id], day)).length,
    mistakes: ids.filter((id) => cards[id].again).length,
    hardest: ids
      .filter((id) => cards[id].misses > 0)
      .sort((a, b) => cards[b].misses - cards[a].misses || cards[b].seen - cards[a].seen)
      .slice(0, 8),
  };
}

// Saved cards are read defensively: a malformed entry is dropped, never trusted.
export function readCards(value: unknown): Cards {
  const cards: Cards = {};
  if (!value || typeof value !== 'object') return cards;
  for (const [id, raw] of Object.entries(value as Record<string, any>).slice(0, 5000)) {
    if (
      !raw ||
      typeof raw !== 'object' ||
      !Number.isInteger(raw.step) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(raw.due) ||
      !Number.isInteger(raw.seen) ||
      !Number.isInteger(raw.misses)
    )
      continue;
    cards[id] = {
      step: Math.max(0, Math.min(raw.step, INTERVALS.length)),
      due: raw.due,
      seen: Math.max(0, raw.seen),
      misses: Math.max(0, raw.misses),
      ...(raw.again === true && { again: true }),
      ...(raw.done === true && { done: true }),
    };
  }
  return cards;
}

// What a round draws from: words due today, the learner's mistakes, My list, the words of a
// level, or one of the lists.
export const LEVEL_POOLS = ['a1', 'a2', 'b1'] as const;
export function practicePool(
  key: string,
  entries: WordEntry[],
  cards: Cards,
  marked: string[],
  day: string,
): WordEntry[] | null {
  const byRank = (list: WordEntry[]) =>
    [...list].sort((a, b) => (a.rank ?? 1e6) - (b.rank ?? 1e6) || a.nl.localeCompare(b.nl, 'nl'));
  if (key === 'review') return entries.filter((entry) => isDue(cards[entry.id], day));
  if (key === 'mistakes')
    return entries
      .filter((entry) => cards[entry.id]?.again)
      .sort((a, b) => cards[b.id].misses - cards[a.id].misses);
  if (key === MY_LIST) {
    const byId = new Map(entries.map((entry) => [entry.id, entry]));
    return marked.map((id) => byId.get(id)).filter(Boolean) as WordEntry[];
  }
  if (key === 'a1') return byRank(entries.filter((entry) => entry.level === 'A1'));
  if (key === 'a2') return byRank(entries.filter((entry) => entry.level === 'A2'));
  if (key === 'b1')
    return byRank(entries.filter((entry) => !entry.level && entry.rank && entry.rank <= TOP_SIZE));
  const group = groupBySlug(key);
  return group && group.slug !== MY_LIST ? groupEntries(group, entries) : null;
}
