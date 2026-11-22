import React, { useEffect, useState } from 'react';
import { useStudyContext } from '../../StudyContext';
import { perfect, type WordEntry } from '../../domain/words';
import { presentTense } from '../../domain/present';
import type { WordPrefsApi } from './useWordPrefs';

// Dutch material keeps the browser's translator away (it would replace the very words to
// learn); English glosses and notes may be translated into the learner's own language.
const dutch = { lang: 'nl', translate: 'no' } as const;

export function MarkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 3.75h10a1.25 1.25 0 0 1 1.25 1.25v15.25L12 16.5l-6.25 3.75V5A1.25 1.25 0 0 1 7 3.75z" />
    </svg>
  );
}
// The grammar a learner needs at the word: the plural, the past and the perfect, or the
// irregular forms of an adjective.
function Grammar({ entry, verbs }: { entry: WordEntry; verbs: boolean }) {
  const { t } = useStudyContext();
  if (entry.pos === 'noun' && entry.plural)
    return (
      <span className="word-grammar" {...dutch}>
        <abbr title={t('meervoud', 'plural')}>{t('mv.', 'pl.')}</abbr> {entry.plural}
      </span>
    );
  if (entry.verb && !verbs)
    return (
      <span className="word-grammar" {...dutch}>
        {[entry.verb.past, perfect(entry.verb)].filter(Boolean).join(' · ')}
      </span>
    );
  if (entry.forms)
    return (
      <span className="word-grammar" {...dutch}>
        {entry.forms}
      </span>
    );
  return null;
}
function Row({
  entry,
  ranked,
  verbs,
  prefs,
  revealed,
  reveal,
}: {
  entry: WordEntry;
  ranked: boolean;
  verbs: boolean;
  prefs: WordPrefsApi;
  revealed: boolean;
  reveal: () => void;
}) {
  const { t } = useStudyContext(),
    { hideEnglish, examples, marked } = prefs.prefs,
    hidden = hideEnglish && !revealed,
    isMarked = marked.includes(entry.id);
  const english = hidden ? (
    <button type="button" className="text-button word-reveal" onClick={reveal}>
      {t('Toon Engels', 'Show English')}
    </button>
  ) : (
    <span lang="en">{entry.en}</span>
  );
  return (
    <li className="word-row" data-word={entry.id} data-marked={isMarked || undefined}>
      {ranked && <span className="word-rank">{entry.rank}</span>}
      <div className="word-head">
        <span className="word-nl" {...dutch}>
          {entry.article && <span className="word-article">{entry.article} </span>}
          {entry.nl}
        </span>
        <Grammar entry={entry} verbs={verbs} />
        {verbs && <span className="word-en">{english}</span>}
      </div>
      {verbs ? (
        <>
          <span className="word-present" {...dutch}>
            {presentTense(entry.nl, entry.verb!).map(([pronoun, form], i) => (
              <React.Fragment key={pronoun}>
                {i > 0 && ' · '}
                <span className="word-pronoun">{pronoun}</span> {form}
              </React.Fragment>
            ))}
          </span>
          <span className="word-past" {...dutch}>
            {entry.verb!.past}
            {entry.verb!.pastPlural !== entry.verb!.past && (
              <span className="word-plural-form"> · {entry.verb!.pastPlural}</span>
            )}
          </span>
          <span className="word-perfect" {...dutch}>
            {perfect(entry.verb!) || '—'}
          </span>
        </>
      ) : (
        <span className="word-en">{english}</span>
      )}
      {examples && (
        <div className="word-example">
          <p {...dutch}>{entry.ex}</p>
          {!hidden && (
            <p className="word-example-en" lang="en">
              {entry.exEn}
            </p>
          )}
          {entry.note && !hidden && (
            <p className="word-note" lang="en">
              {entry.note}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        className="word-mark"
        aria-pressed={isMarked}
        aria-label={`${t('Ken ik niet', 'Don’t know yet')}: ${entry.nl}`}
        title={
          isMarked
            ? t('Op Mijn lijst. Klik om te verwijderen.', 'On My list. Click to remove.')
            : t('Ken ik niet: zet op Mijn lijst', 'Don’t know yet: add to My list')
        }
        onClick={() => prefs.toggleMark(entry.id)}
      >
        <MarkIcon />
      </button>
    </li>
  );
}
// One list of words: a row each, with column labels on wide screens. Revealed
// translations are forgotten when the learner hides English again.
export default function WordRows({
  entries,
  ranked = false,
  verbs = false,
  prefs,
}: {
  entries: WordEntry[];
  ranked?: boolean;
  verbs?: boolean;
  prefs: WordPrefsApi;
}) {
  const { t } = useStudyContext(),
    [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  useEffect(() => setRevealed(new Set()), [prefs.prefs.hideEnglish]);
  const List = ranked ? 'ol' : 'ul',
    examples = prefs.prefs.examples;
  return (
    <div
      className="word-table"
      data-layout={verbs ? 'verbs' : 'list'}
      data-ranked={ranked || undefined}
      data-examples={examples || undefined}
    >
      <div className="word-columns" aria-hidden="true">
        {ranked && <span />}
        {verbs ? (
          <>
            <span>{t('Werkwoord', 'Verb')}</span>
            <span>{t('Tegenwoordige tijd', 'Present tense')}</span>
            <span>{t('Verleden tijd', 'Past tense')}</span>
            <span>{t('Voltooid deelwoord', 'Past participle')}</span>
          </>
        ) : (
          <>
            <span>{t('Nederlands', 'Dutch')}</span>
            <span>{t('Engels', 'English')}</span>
          </>
        )}
        {examples && !verbs && <span>{t('Voorbeeld', 'Example')}</span>}
      </div>
      <List className="word-list">
        {entries.map((entry) => (
          <Row
            key={entry.id}
            entry={entry}
            ranked={ranked}
            verbs={verbs && !!entry.verb}
            prefs={prefs}
            revealed={revealed.has(entry.id)}
            reveal={() => setRevealed((s) => new Set(s).add(entry.id))}
          />
        ))}
      </List>
    </div>
  );
}
