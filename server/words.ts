// The reviewed word lists in content/words, read once (on every request in development, so
// edited data shows up on reload). Each file holds { entries: WordEntry[] }; the files only
// split the data so no single one grows unwieldy.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  groupBySlug,
  groupEntries,
  MY_LIST,
  PRACTICE,
  summarise,
  type WordEntry,
  type WordsPage,
} from '../app/domain/words';

const DIRECTORY = 'content/words';
// The site's own A1 and A2 word lists (config/a1-vocabulary.json, config/a2-vocabulary.json),
// which the exercises at those levels keep to. They are an editorial choice, not an official
// CEFR list; practice offers them as "the words of the A1 exercises".
function listedWords(file: string) {
  const config = JSON.parse(readFileSync(file, 'utf8'));
  return new Set(
    Object.values(config.words as Record<string, string>)
      .flatMap((group) => group.split(/\s+/))
      .map((word) => word.toLowerCase())
      .filter(Boolean),
  );
}
let cached: WordEntry[] | null = null;
export function wordEntries(): WordEntry[] {
  if (cached && process.env.NODE_ENV === 'production') return cached;
  const a1 = listedWords('config/a1-vocabulary.json'),
    a2 = listedWords('config/a2-vocabulary.json');
  const entries: WordEntry[] = [];
  for (const name of readdirSync(DIRECTORY).sort())
    if (name.endsWith('.json'))
      for (const entry of JSON.parse(readFileSync(join(DIRECTORY, name), 'utf8'))
        .entries as WordEntry[]) {
        const word = entry.nl.replace(/^zich /, '').toLowerCase();
        entries.push(
          a1.has(word)
            ? { ...entry, level: 'A1' }
            : a2.has(word)
              ? { ...entry, level: 'A2' }
              : entry,
        );
      }
  cached = entries;
  return entries;
}
// The loader's share for a words route, or null when the list does not exist.
export function wordsPage(route: string): WordsPage | null {
  const entries = wordEntries();
  if (route === 'words') return { summaries: summarise(entries) };
  if (route === `words/${PRACTICE}`) return { group: PRACTICE };
  const group = groupBySlug(route.slice(6));
  if (!group) return null;
  return { group: group.slug, entries: group.slug === MY_LIST ? [] : groupEntries(group, entries) };
}
