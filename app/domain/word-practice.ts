// Word practice: cards like Anki or gracht.app. The learner sees the Dutch word (or the
// English, or a noun without its article), thinks of the answer, turns the card and says how
// it went. Again brings the word back later in the round and tomorrow; Got it spaces it out
// (1, 3, 7, 14, 30 and then 60 days); Too easy stops it coming back. Everything stays in this
// browser with the rest of the word lists.
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

// A round from a pool of words: the ones due first (longest waiting first), then new words
// drawn at random from the next hundred not practised yet in the pool's order, so the most
// common words still come before rare ones but no two rounds are the same twenty. The round
// is then shuffled, so a list is never met in its printed order. A pool with nothing due and
// nothing new gives its words that are furthest from due, so a learner can always practise
// a list again.
export const NEW_WINDOW = 100;
export function shuffled<T>(list: T[], random: () => number = Math.random) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
export function buildRound(
  pool: WordEntry[],
  cards: Cards,
  day: string,
  size = ROUND_SIZE,
  random: () => number = Math.random,
  // Places kept for new words however much is due (My practice keeps a few).
  minNew = 0,
) {
  const unseen = pool.filter((entry) => !cards[entry.id]).slice(0, NEW_WINDOW);
  const due = pool
    .filter((entry) => isDue(cards[entry.id], day))
    .sort((a, b) => cards[a.id].due.localeCompare(cards[b.id].due))
    .slice(0, size - Math.min(minNew, unseen.length));
  const fresh = shuffled(unseen, random).slice(0, size - due.length);
  const round = [...due, ...fresh];
  if (round.length) return { words: shuffled(round, random), early: false };
  const waiting = pool
    .filter((entry) => !cards[entry.id]?.done)
    .sort((a, b) => cards[a.id].due.localeCompare(cards[b.id].due))
    .slice(0, size);
  return { words: shuffled(waiting, random), early: true };
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

// Four ways to practise. Three keep their own cards, so a word known one way is still asked
// the other way: the Dutch word to its meaning, the English to the Dutch word, and de or het
// for a noun. Mix, the default, draws from all three in one round. The mode travels in the
// address (?mode=en-nl) beside the list; Mix needs none.
export const PRACTICE_MODES = ['mix', 'nl-en', 'en-nl', 'de-het'] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];
export type CardMode = Exclude<PracticeMode, 'mix'>;
export const CARD_MODES: CardMode[] = ['nl-en', 'en-nl', 'de-het'];
export type ModeCards = Record<CardMode, Cards>;
// One card of a round: the word and the way it is asked.
export interface PracticeCard {
  entry: WordEntry;
  mode: CardMode;
}
export function practiceMode(value: string | null | undefined): PracticeMode {
  return (PRACTICE_MODES as readonly string[]).includes(value as string)
    ? (value as PracticeMode)
    : 'mix';
}
export function practiceSearch(mode: PracticeMode, list?: string) {
  const params = new URLSearchParams();
  if (list) params.set('list', list);
  if (mode !== 'mix') params.set('mode', mode);
  const query = params.toString();
  return query ? `?${query}` : '';
}
// De or het asks only nouns with one article (not the few that take both).
export const hasArticle = (entry: WordEntry) =>
  entry.pos === 'noun' && (entry.article === 'de' || entry.article === 'het');
export const modeEntries = (mode: PracticeMode, entries: WordEntry[]) =>
  mode === 'de-het' ? entries.filter(hasArticle) : entries;
// English → Dutch: the other words with exactly the same English are right answers too
// (doctor: dokter and arts). Partial matches are left out; "can" is not blik.
export function sameMeaning(entries: WordEntry[]) {
  const byEnglish = new Map<string, WordEntry[]>();
  for (const entry of entries) {
    const key = entry.en.toLowerCase();
    byEnglish.set(key, [...(byEnglish.get(key) || []), entry]);
  }
  return (entry: WordEntry) =>
    (byEnglish.get(entry.en.toLowerCase()) || []).filter((other) => other.nl !== entry.nl);
}

// Mix sees a word through all its cards: practised in any way, a mistake when any last answer
// was Again, due when any open card is, learned by its meaning (Dutch → English).
export function mergeCards(all: ModeCards): Cards {
  const byWord = new Map<string, [CardMode, CardState][]>();
  for (const mode of CARD_MODES)
    for (const [id, card] of Object.entries(all[mode]))
      byWord.set(id, [...(byWord.get(id) || []), [mode, card]]);
  const merged: Cards = {};
  for (const [id, list] of byWord) {
    const cards = list.map(([, card]) => card),
      meaning = list.find(([mode]) => mode === 'nl-en')?.[1],
      open = cards.filter((card) => !card.done);
    merged[id] = {
      step: meaning?.step || 0,
      due: (open.length ? open : cards).map((card) => card.due).sort()[0],
      seen: cards.reduce((sum, card) => sum + card.seen, 0),
      misses: cards.reduce((sum, card) => sum + card.misses, 0),
      ...(cards.some((card) => card.again) && { again: true }),
      ...(!open.length && { done: true }),
    };
  }
  return merged;
}
// A Mix round: one card per word, due cards first, then new ones from the next hundred. A
// new word starts by its meaning; English → Dutch and de or het open once it has been seen
// (or was practised that way before), and new words and these new ways take turns. Review takes only what is due, Mistakes only the
// answers that went wrong.
export function buildMixRound(
  pool: WordEntry[],
  all: ModeCards,
  key: string,
  day: string,
  size = ROUND_SIZE,
  random: () => number = Math.random,
  minNew = 0,
) {
  const cardOf = (item: PracticeCard) => all[item.mode][item.entry.id];
  let items: PracticeCard[] = [];
  for (const entry of pool) {
    const seen = !!all['nl-en'][entry.id];
    items.push({ entry, mode: 'nl-en' });
    if (seen || all['en-nl'][entry.id]) items.push({ entry, mode: 'en-nl' });
    if (hasArticle(entry) && (seen || all['de-het'][entry.id]))
      items.push({ entry, mode: 'de-het' });
  }
  if (key === 'review') items = items.filter((item) => isDue(cardOf(item), day));
  if (key === 'mistakes') items = items.filter((item) => cardOf(item)?.again);
  const round: PracticeCard[] = [],
    words = new Set<string>();
  const add = (list: PracticeCard[], limit = size) => {
    for (const item of list) {
      if (round.length >= limit) return;
      if (words.has(item.entry.id)) continue;
      words.add(item.entry.id);
      round.push(item);
    }
  };
  const byDue = (a: PracticeCard, b: PracticeCard) => cardOf(a).due.localeCompare(cardOf(b).due);
  // New words and new ways of asking seen words take turns, so neither crowds out the other.
  const unseen = (wanted: (item: PracticeCard) => boolean) =>
    shuffled(items.filter((item) => !cardOf(item) && wanted(item)).slice(0, NEW_WINDOW), random);
  const newWords = unseen((item) => item.mode === 'nl-en'),
    newWays = unseen((item) => item.mode !== 'nl-en');
  const fresh = Array.from({ length: Math.max(newWords.length, newWays.length) }, (_, i) => [
    newWords[i],
    newWays[i],
  ])
    .flat()
    .filter(Boolean);
  const unseenWords = new Set(fresh.map((item) => item.entry.id)).size;
  add(
    items.filter((item) => isDue(cardOf(item), day)).sort(byDue),
    size - Math.min(minNew, unseenWords),
  );
  add(fresh);
  if (round.length) return { words: shuffled(round, random), early: false };
  add(items.filter((item) => cardOf(item) && !cardOf(item).done).sort(byDue));
  return { words: shuffled(round, random), early: true };
}

// What a round draws from: My practice, the learner's mistakes, My list, the words of a
// level, or one of the lists (and words due today, for older links).
export const LEVEL_POOLS = ['a1', 'a2', 'b1'] as const;
// My practice is the one button for every day: what is due from any list, then new words of
// the learner's level, most common first (B1 takes the A2 and B1 words together). However
// much is due, a round keeps a few places for new words.
export const MY_PRACTICE = 'my-practice';
export const MIN_NEW = 5;
export const LEVEL_WORDS: Record<string, string[]> = { A1: ['a1'], A2: ['a2'], B1: ['a2', 'b1'] };
export function practicePool(
  key: string,
  entries: WordEntry[],
  cards: Cards,
  marked: string[],
  day: string,
  level = 'A2',
): WordEntry[] | null {
  const byRank = (list: WordEntry[]) =>
    [...list].sort((a, b) => (a.rank ?? 1e6) - (b.rank ?? 1e6) || a.nl.localeCompare(b.nl, 'nl'));
  if (key === MY_PRACTICE) {
    const due = entries.filter((entry) => isDue(cards[entry.id], day)),
      fresh = (LEVEL_WORDS[level] || LEVEL_WORDS.A2).flatMap(
        (pool) => practicePool(pool, entries, cards, marked, day) || [],
      );
    return [...new Set([...due, ...byRank(fresh)])];
  }
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
