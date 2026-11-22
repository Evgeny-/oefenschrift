// The reviewed word lists in content/words, read once (on every request in development, so
// edited data shows up on reload). Each file holds { entries: WordEntry[] }; the files only
// split the data so no single one grows unwieldy.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  groupBySlug,
  groupEntries,
  MY_LIST,
  summarise,
  type WordEntry,
  type WordsPage,
} from '../app/domain/words';

const DIRECTORY = 'content/words';
let cached: WordEntry[] | null = null;
export function wordEntries(): WordEntry[] {
  if (cached && process.env.NODE_ENV === 'production') return cached;
  const entries: WordEntry[] = [];
  for (const name of readdirSync(DIRECTORY).sort())
    if (name.endsWith('.json'))
      entries.push(...JSON.parse(readFileSync(join(DIRECTORY, name), 'utf8')).entries);
  cached = entries;
  return entries;
}
// The loader's share for a words route, or null when the list does not exist.
export function wordsPage(route: string): WordsPage | null {
  const entries = wordEntries();
  if (route === 'words') return { summaries: summarise(entries) };
  const group = groupBySlug(route.slice(6));
  if (!group) return null;
  return { group: group.slug, entries: group.slug === MY_LIST ? [] : groupEntries(group, entries) };
}
