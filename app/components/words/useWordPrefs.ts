import { useCallback, useEffect, useState } from 'react';
import { wordsSlot } from '../../domain/profiles';
import { withBase } from '../../domain/base';
import type { WordEntry } from '../../domain/words';
import {
  rate,
  readCards,
  type Cards,
  type PracticeMode,
  type Rating,
} from '../../domain/word-practice';

// What a learner keeps for the word lists in this browser: the words they marked as not
// known yet, whether translations and examples are shown, and the practice cards of each mode
// (cards: Dutch → English, reverse: English → Dutch, articles: de or het). Each teacher-mode
// profile has its own copy beside its study key.
export interface WordPrefs {
  marked: string[];
  hideEnglish: boolean;
  examples: boolean;
  cards: Cards;
  reverse: Cards;
  articles: Cards;
}
const defaults: WordPrefs = {
  marked: [],
  hideEnglish: false,
  examples: true,
  cards: {},
  reverse: {},
  articles: {},
};
const CARD_FIELDS = { 'nl-en': 'cards', 'en-nl': 'reverse', 'de-het': 'articles' } as const;
export const modeCards = (prefs: WordPrefs, mode: PracticeMode): Cards => prefs[CARD_FIELDS[mode]];
function storage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function read(profile: string): WordPrefs {
  try {
    const saved = JSON.parse(storage()?.getItem(wordsSlot(profile)) || 'null');
    if (!saved || typeof saved !== 'object') return defaults;
    return {
      marked: Array.isArray(saved.marked)
        ? saved.marked.filter((id) => typeof id === 'string').slice(0, 5000)
        : [],
      hideEnglish: saved.hideEnglish === true,
      examples: saved.examples !== false,
      cards: readCards(saved.cards),
      reverse: readCards(saved.reverse),
      articles: readCards(saved.articles),
    };
  } catch {
    return defaults;
  }
}
// The server renders the defaults; the saved choices apply once the page has hydrated.
export default function useWordPrefs(profile: string) {
  const [prefs, setPrefs] = useState<WordPrefs>(defaults),
    [loaded, setLoaded] = useState(false),
    [saved, setSaved] = useState(true);
  useEffect(() => {
    setPrefs(read(profile));
    setLoaded(true);
  }, [profile]);
  const update = useCallback(
    (change: (prefs: WordPrefs) => Partial<WordPrefs>) =>
      setPrefs((current) => {
        const next = { ...current, ...change(current) };
        try {
          storage()!.setItem(wordsSlot(profile), JSON.stringify(next));
          setSaved(true);
        } catch {
          setSaved(false);
        }
        return next;
      }),
    [profile],
  );
  return {
    prefs,
    loaded,
    saved,
    toggleMark: (id: string) =>
      update((p) => ({
        marked: p.marked.includes(id) ? p.marked.filter((m) => m !== id) : [...p.marked, id],
      })),
    setHideEnglish: (hideEnglish: boolean) => update(() => ({ hideEnglish })),
    setExamples: (examples: boolean) => update(() => ({ examples })),
    rateWord: (id: string, rating: Rating, day: string, mode: PracticeMode = 'nl-en') =>
      update((p) => {
        const field = CARD_FIELDS[mode];
        return { [field]: { ...p[field], [id]: rate(p[field][id], rating, day) } };
      }),
  };
}
export type WordPrefsApi = ReturnType<typeof useWordPrefs>;

// The whole dictionary, for searching across the lists and for My list: fetched once per
// page load, and again after a failure when the learner retries.
let dictionary: Promise<WordEntry[]> | null = null;
function loadDictionary() {
  dictionary ??= fetch(withBase('/api/words'))
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .catch((error) => {
      dictionary = null;
      throw error;
    });
  return dictionary;
}
export function useDictionary(wanted: boolean) {
  const [entries, setEntries] = useState<WordEntry[] | null>(null),
    [failed, setFailed] = useState(false),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!wanted || entries) return;
    let live = true;
    setFailed(false);
    loadDictionary().then(
      (list) => live && setEntries(list),
      () => live && setFailed(true),
    );
    return () => {
      live = false;
    };
  }, [wanted, attempt]);
  return { entries, failed, retry: () => setAttempt((n) => n + 1) };
}
