import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useStudyContext } from '../../StudyContext';
import { Segments, Toggle } from '../Controls';
import AppLink from '../AppLink';
import WordRows from './WordRows';
import useWordPrefs, { useDictionary, type WordPrefsApi } from './useWordPrefs';
import {
  groupBySlug,
  MY_LIST,
  PAGE_SIZE,
  searchEntries,
  WORD_GROUPS,
  wordPath,
  type GroupSummary,
  type WordEntry,
  type WordGroup,
  type WordsPage,
} from '../../domain/words';

const dutch = { lang: 'nl', translate: 'no' } as const;

// /words lists every word list; /words/<list> shows one, a hundred words at a time.
export default function WordLists({ route, data }: { route: string; data?: WordsPage }) {
  const { profile, t } = useStudyContext(),
    prefs = useWordPrefs(profile),
    group = route.startsWith('words/') ? groupBySlug(route.slice(6)) : undefined;
  return (
    <div className="words">
      {group ? (
        <GroupPage key={group.slug} group={group} entries={data?.entries || []} prefs={prefs} />
      ) : (
        <WordIndex summaries={data?.summaries || []} prefs={prefs} />
      )}
      {!prefs.saved && (
        <p className="storage-notice" role="status">
          {t(
            'Opslaan in deze browser lukt niet; je lijst blijft alleen tot je de pagina sluit.',
            'This browser cannot save; your list lasts only until you close the page.',
          )}
        </p>
      )}
      <Sources />
    </div>
  );
}

function SearchField({ value, onChange, label, onFocus = undefined }) {
  const id = useId();
  return (
    <div className="words-search">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="10.5" cy="10.5" r="6.25" />
        <path d="M15.25 15.25 20 20" />
      </svg>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={label}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        onFocus={onFocus}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
function ViewToggles({ prefs }: { prefs: WordPrefsApi }) {
  const { t } = useStudyContext();
  return (
    <div className="words-toggles">
      <Toggle
        label={t('Engels verbergen', 'Hide English')}
        checked={prefs.prefs.hideEnglish}
        onChange={prefs.setHideEnglish}
      />
      <Toggle
        label={t('Voorbeelden', 'Examples')}
        checked={prefs.prefs.examples}
        onChange={prefs.setExamples}
      />
    </div>
  );
}
const countLabel = (count: number, t) =>
  `${count} ${count === 1 ? t('woord', 'word') : t('woorden', 'words')}`;

// Search results across every list, or the reasons there are none yet.
function Results({ query, dictionary, prefs }) {
  const { t } = useStudyContext(),
    results = useMemo(
      () => (dictionary.entries ? searchEntries(query, dictionary.entries) : []),
      [dictionary.entries, query],
    );
  if (dictionary.failed)
    return (
      <p className="words-status" role="status">
        {t('Zoeken lukt nu niet.', 'Search is not available right now.')}{' '}
        <button type="button" className="text-button" onClick={dictionary.retry}>
          {t('Probeer het opnieuw', 'Try again')}
        </button>
      </p>
    );
  if (!dictionary.entries)
    return (
      <p className="words-status" role="status">
        {t('Woorden laden…', 'Loading words…')}
      </p>
    );
  return (
    <>
      <p className="words-status" role="status">
        {results.length
          ? countLabel(results.length, t)
          : t(
              `Geen woord gevonden voor “${query.trim()}”.`,
              `No word found for “${query.trim()}”.`,
            )}
      </p>
      {results.length > 0 && <WordRows entries={results} prefs={prefs} />}
    </>
  );
}

function WordIndex({ summaries, prefs }: { summaries: GroupSummary[]; prefs: WordPrefsApi }) {
  const { t } = useStudyContext(),
    [query, setQuery] = useState(''),
    [wanted, setWanted] = useState(false),
    searching = !!query.trim(),
    dictionary = useDictionary(wanted || searching),
    summary = new Map(summaries.map((s) => [s.slug, s])),
    top = summary.get('top'),
    marked = prefs.prefs.marked.length;
  const section = (kind: WordGroup['section']) =>
    WORD_GROUPS.filter((group) => group.section === kind && summary.get(group.slug)?.count);
  return (
    <>
      <div className="heading">
        <h1 tabIndex={-1}>{t('Woorden', 'Words')}</h1>
        <p>
          {t(
            'De meest gebruikte Nederlandse woorden met de Engelse vertaling, een korte voorbeeldzin en waar het helpt een uitleg.',
            'The most common Dutch words with their English translation, a short example sentence and, where it helps, a note.',
          )}
        </p>
      </div>
      <div className="words-controls">
        <SearchField
          value={query}
          onChange={setQuery}
          onFocus={() => setWanted(true)}
          label={t('Zoek een woord in het Nederlands of Engels', 'Find a word in Dutch or English')}
        />
        {searching && <ViewToggles prefs={prefs} />}
      </div>
      {searching ? (
        <Results query={query} dictionary={dictionary} prefs={prefs} />
      ) : (
        <>
          <div className="words-start">
            {top && (
              <section className="words-top">
                <AppLink className="words-group" to={wordPath('top')}>
                  <span className="words-group-title">
                    <h2 {...dutch}>Meest gebruikt</h2>
                    <span className="words-group-count">{top.count}</span>
                  </span>
                  <span className="words-group-detail" lang="en">
                    Most common words
                  </span>
                </AppLink>
                <nav aria-label={t('Meest gebruikt, per honderd', 'Most common, by the hundred')}>
                  <ol className="words-ranges">
                    {Array.from({ length: Math.ceil(top.count / PAGE_SIZE) }, (_, i) => (
                      <li key={i}>
                        <AppLink to={wordPath('top')} search={i ? `?page=${i + 1}` : ''}>
                          {i * PAGE_SIZE + 1}–{Math.min(top.count, (i + 1) * PAGE_SIZE)}
                        </AppLink>
                      </li>
                    ))}
                  </ol>
                </nav>
              </section>
            )}
            <AppLink className="words-group words-mine" to={wordPath(MY_LIST)}>
              <span className="words-group-title">
                <h2 {...dutch}>Mijn lijst</h2>
                <span className="words-group-count">{prefs.loaded && marked ? marked : ''}</span>
              </span>
              <span className="words-group-detail">
                {prefs.loaded && marked
                  ? t('De woorden die je nog niet kent', 'The words you do not know yet')
                  : t(
                      'Leeg. Markeer in een lijst de woorden die je nog niet kent.',
                      'Empty. In any list, mark the words you do not know yet.',
                    )}
              </span>
            </AppLink>
          </div>
          {(['kinds', 'themes'] as const).map((kind) => (
            <section className="words-section" key={kind}>
              <h2>
                {kind === 'kinds' ? t('Soorten woorden', 'Kinds of words') : t('Thema’s', 'Themes')}
              </h2>
              <ul className="words-groups">
                {section(kind).map((group) => {
                  const s = summary.get(group.slug)!;
                  return (
                    <li key={group.slug}>
                      <AppLink className="words-group" to={wordPath(group.slug)}>
                        <span className="words-group-title">
                          <h3 {...dutch}>{group.nl}</h3>
                          <span className="words-group-count">{s.count}</span>
                        </span>
                        <span className="words-group-detail">
                          <span lang="en">{group.en}</span> ·{' '}
                          <span {...dutch}>{s.sample.join(', ')}</span>
                        </span>
                      </AppLink>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </>
      )}
    </>
  );
}

// The parts of a long list, as links so each hundred has its own address.
function Pages({ slug, page, pages, total }) {
  const { t } = useStudyContext();
  return (
    <nav className="words-pages" aria-label={t('Delen van de lijst', 'Parts of the list')}>
      {Array.from({ length: pages }, (_, i) => {
        const label = `${i * PAGE_SIZE + 1}–${Math.min(total, (i + 1) * PAGE_SIZE)}`;
        return (
          <AppLink
            key={i}
            to={wordPath(slug)}
            search={i ? `?page=${i + 1}` : ''}
            data-label={label}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {label}
          </AppLink>
        );
      })}
    </nav>
  );
}

function GroupPage({
  group,
  entries,
  prefs,
}: {
  group: WordGroup;
  entries: WordEntry[];
  prefs: WordPrefsApi;
}) {
  const { t } = useStudyContext(),
    location = useLocation(),
    mine = group.slug === MY_LIST,
    dictionary = useDictionary(mine),
    [query, setQuery] = useState(''),
    [article, setArticle] = useState('all'),
    top = useRef<HTMLDivElement>(null);
  // My list keeps the words marked when it opened, newest first, so unmarking one does
  // not pull it away from under the pointer.
  const [kept, setKept] = useState<string[] | null>(null);
  useEffect(() => {
    if (mine && prefs.loaded && !kept) setKept([...prefs.prefs.marked].reverse());
  }, [mine, prefs.loaded]);
  const list = useMemo(() => {
    if (!mine) return entries;
    if (!dictionary.entries || !kept) return null;
    const byId = new Map(dictionary.entries.map((e) => [e.id, e]));
    return kept.map((id) => byId.get(id)).filter(Boolean) as WordEntry[];
  }, [mine, entries, dictionary.entries, kept]);
  const searching = !!query.trim();
  const shown = useMemo(() => {
    let words = list || [];
    if (article !== 'all') words = words.filter((e) => e.article === article);
    return searching ? searchEntries(query, words, words.length) : words;
  }, [list, article, query]);
  const pages = Math.ceil(shown.length / PAGE_SIZE),
    paged = !searching && shown.length > PAGE_SIZE * 1.5,
    requested = Number(new URLSearchParams(location.search).get('page')) || 1,
    page = paged ? Math.min(Math.max(1, requested), pages) : 1,
    visible = paged ? shown.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : shown;
  // A new hundred starts at its first word, not wherever the last one was scrolled to.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) first.current = false;
    else top.current?.scrollIntoView({ block: 'start' });
  }, [page]);
  const count = mine ? (list ? list.length : prefs.prefs.marked.length) : entries.length;
  return (
    <>
      <div className="heading words-heading">
        <h1 tabIndex={-1} {...dutch}>
          {group.nl}
        </h1>
        <p className="words-heading-en">
          <span lang="en">{group.en}</span>
          {(!mine || prefs.loaded) && <> · {countLabel(count, t)}</>}
        </p>
        <p>{t(...group.about)}</p>
      </div>
      <div className="words-controls" ref={top}>
        <SearchField
          value={query}
          onChange={setQuery}
          label={t('Zoek in deze lijst', 'Search this list')}
        />
        {group.slug === 'nouns' && (
          <Segments
            label={t('Lidwoord', 'Article')}
            hideLabel
            compact
            value={article}
            onChange={setArticle}
            options={[
              { value: 'all', label: t('Alle', 'All') },
              { value: 'de', label: 'de' },
              { value: 'het', label: 'het' },
            ]}
          />
        )}
        <ViewToggles prefs={prefs} />
      </div>
      {paged && <Pages slug={group.slug} page={page} pages={pages} total={shown.length} />}
      {mine && dictionary.failed ? (
        <p className="words-status" role="status">
          {t('Je lijst laden lukt nu niet.', 'Your list cannot be loaded right now.')}{' '}
          <button type="button" className="text-button" onClick={dictionary.retry}>
            {t('Probeer het opnieuw', 'Try again')}
          </button>
        </p>
      ) : mine && !list ? (
        <p className="words-status" role="status">
          {prefs.loaded ? t('Woorden laden…', 'Loading words…') : ''}
        </p>
      ) : mine && !list!.length ? (
        <p className="words-status">
          {t(
            'Je lijst is nog leeg. Klik in een lijst op het bladwijzertje naast een woord dat je nog niet kent; het komt dan hier.',
            'Your list is empty. In any list, click the bookmark beside a word you do not know yet and it appears here.',
          )}{' '}
          <AppLink to={wordPath('top')}>
            {t('Naar Meest gebruikt', 'Go to Most common words')}
          </AppLink>
        </p>
      ) : searching && !shown.length ? (
        <p className="words-status" role="status">
          {t(`Geen woord gevonden voor “${query.trim()}”.`, `No word found for “${query.trim()}”.`)}
        </p>
      ) : (
        <WordRows
          entries={visible}
          ranked={!!group.ranked && !searching}
          verbs={group.layout === 'verbs'}
          prefs={prefs}
        />
      )}
      {paged && <Pages slug={group.slug} page={page} pages={pages} total={shown.length} />}
    </>
  );
}

// Where the order and the words come from, as the licence of the frequency list asks.
function Sources() {
  const { t } = useStudyContext();
  return (
    <p className="note words-sources">
      {t(
        'De volgorde volgt hoe vaak een woord voorkomt in ondertitels van films en series en in de teksten op deze site. Frequentie: ',
        'The order follows how often a word occurs in film and TV subtitles and in the texts on this site. Frequencies: ',
      )}
      <a href="https://github.com/hermitdave/FrequencyWords" rel="noreferrer">
        FrequencyWords
      </a>{' '}
      (OpenSubtitles 2018,{' '}
      <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="noreferrer">
        CC BY-SA 4.0
      </a>
      ).{' '}
      {t(
        'Vertalingen en voorbeelden zijn met AI geschreven en apart nagekeken. Zie je een fout? Laat het weten via Contact met de maker.',
        'Translations and examples were written with AI and checked separately. Spotted a mistake? Use Contact the author below.',
      )}
    </p>
  );
}
