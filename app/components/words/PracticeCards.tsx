import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../../StudyContext';
import { KeyHint } from '../Controls';
import { MarkIcon } from './WordRows';
import { dutch } from './PracticeChoice';
import { perfect, wordType, type WordEntry } from '../../domain/words';
import { presentTense } from '../../domain/present';
import type { CardMode, Rating } from '../../domain/word-practice';

// Keys act unless a control has focus and will handle the key itself.
const onControl = (event: KeyboardEvent) =>
  !!(event.target as HTMLElement)?.closest?.('button, a, input');
const plainKey = (event: KeyboardEvent) => !(event.metaKey || event.ctrlKey || event.altKey);

function DutchWord({ entry }: { entry: WordEntry }) {
  return (
    <>
      {entry.article && <span className="word-article">{entry.article} </span>}
      {entry.nl}
    </>
  );
}

// The back of a card: the answer (the meaning, or the Dutch word), the forms a learner needs
// and the example.
function Answer({ entry, mode, also }: { entry: WordEntry; mode: CardMode; also: WordEntry[] }) {
  const { t } = useStudyContext();
  const forms: [string, React.ReactNode][] = [];
  if (entry.verb) {
    forms.push([
      t('Nu', 'Present'),
      presentTense(entry.nl, entry.verb).map(([pronoun, form], i) => (
        <React.Fragment key={pronoun}>
          {i > 0 && ' · '}
          <span className="word-pronoun">{pronoun}</span> {form}
        </React.Fragment>
      )),
    ]);
    forms.push([
      t('Verleden tijd', 'Past'),
      entry.verb.pastPlural && entry.verb.pastPlural !== entry.verb.past
        ? `${entry.verb.past} · ${entry.verb.pastPlural}`
        : entry.verb.past,
    ]);
    if (entry.verb.participle) forms.push([t('Voltooid', 'Perfect'), perfect(entry.verb)]);
  } else if (entry.pos === 'noun' && entry.plural)
    forms.push([t('Meervoud', 'Plural'), entry.plural]);
  else if (entry.forms) forms.push([t('Vormen', 'Forms'), entry.forms]);
  // English → Dutch: another word with the same English was right too.
  if (mode === 'en-nl' && also.length)
    forms.push([
      t('Ook goed', 'Also right'),
      also.map((other, i) => (
        <React.Fragment key={other.id}>
          {i > 0 && ', '}
          <DutchWord entry={other} />
        </React.Fragment>
      )),
    ]);
  return (
    <div className="practice-answer">
      {mode === 'en-nl' ? (
        <p className="practice-word practice-answer-nl" {...dutch}>
          <DutchWord entry={entry} />
        </p>
      ) : (
        <p className="practice-en" lang="en">
          {entry.en}
        </p>
      )}
      <div className="practice-details">
        {forms.length > 0 && (
          <dl className="practice-forms">
            {forms.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd {...dutch}>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <blockquote className="practice-example">
          <p {...dutch}>{entry.ex}</p>
          <p className="word-example-en" lang="en">
            {entry.exEn}
          </p>
        </blockquote>
        {entry.note && (
          <p className="practice-note" lang="en">
            {entry.note}
          </p>
        )}
      </div>
    </div>
  );
}

// A card that turns: the Dutch word (or the English), Show, then the back and three answers.
export function FlashCard({
  entry,
  mode,
  marked,
  onMark,
  homograph,
  also,
  onAnswer,
}: {
  entry: WordEntry;
  mode: CardMode;
  marked: boolean;
  onMark: () => void;
  homograph: boolean;
  also: WordEntry[];
  onAnswer: (rating: Rating) => void;
}) {
  const { t } = useStudyContext(),
    [shown, setShown] = useState(false),
    showButton = useRef<HTMLButtonElement>(null),
    goodButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    (shown ? goodButton : showButton).current?.focus({ preventScroll: true });
  }, [shown]);
  useEffect(() => {
    const ratings: Record<string, Rating> = { '1': 'again', '2': 'good', '3': 'easy' };
    const onKey = (event: KeyboardEvent) => {
      if (!plainKey(event)) return;
      if (!shown && (event.key === ' ' || event.key === 'Enter') && !onControl(event)) {
        event.preventDefault();
        setShown(true);
      } else if (shown && ratings[event.key]) {
        event.preventDefault();
        onAnswer(ratings[event.key]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const reverse = mode === 'en-nl';
  return (
    <>
      <section
        className="practice-card"
        aria-label={t('Kaartje', 'Card')}
        data-shown={shown || undefined}
      >
        <button
          type="button"
          className="word-mark practice-mark"
          aria-pressed={marked}
          aria-label={`${t('Ken ik niet', 'Don’t know yet')}: ${entry.nl}`}
          title={
            marked ? t('Op Mijn lijst', 'On My list') : t('Zet op Mijn lijst', 'Add to My list')
          }
          onClick={onMark}
        >
          <MarkIcon />
        </button>
        {reverse ? (
          <p className="practice-word practice-word-en" lang="en">
            {entry.en}
          </p>
        ) : (
          <p className="practice-word" {...dutch}>
            <DutchWord entry={entry} />
          </p>
        )}
        {/* English → Dutch always names the kind of word (back: terug or de rug). */}
        {(reverse || homograph) && <p className="practice-type">{t(...wordType(entry))}</p>}
        {shown ? (
          <Answer entry={entry} mode={mode} also={also} />
        ) : (
          <button
            type="button"
            className="primary practice-show"
            ref={showButton}
            onClick={() => setShown(true)}
          >
            {t('Laat zien', 'Show')}
            <KeyHint />
          </button>
        )}
      </section>
      {shown && (
        <div
          className="practice-rating"
          role="group"
          aria-label={t('Hoe ging het?', 'How did it go?')}
        >
          <button type="button" className="secondary" onClick={() => onAnswer('again')}>
            <strong>
              {t('Opnieuw', 'Again')}
              <KeyHint label="1" />
            </strong>
            <small>{t('morgen weer', 'tomorrow')}</small>
          </button>
          <button
            type="button"
            className="primary"
            ref={goodButton}
            onClick={() => onAnswer('good')}
          >
            <strong>
              {t('Ken ik', 'Got it')}
              <KeyHint label="2" />
            </strong>
            <small>{t('later weer', 'space it out')}</small>
          </button>
          <button type="button" className="secondary" onClick={() => onAnswer('easy')}>
            <strong>
              {t('Te makkelijk', 'Too easy')}
              <KeyHint label="3" />
            </strong>
            <small>{t('niet meer', 'don’t repeat')}</small>
          </button>
        </div>
      )}
    </>
  );
}

// De or het: the noun without its article and two buttons. A right answer goes straight on
// (the round confirms it above the next card); a wrong one shows the right article and waits.
export function ArticleCard({
  entry,
  onAnswer,
  onNext,
}: {
  entry: WordEntry;
  onAnswer: (rating: Rating) => void;
  onNext: () => void;
}) {
  const { t } = useStudyContext(),
    [picked, setPicked] = useState<string | null>(null),
    nextButton = useRef<HTMLButtonElement>(null);
  const pick = (article: 'de' | 'het') => {
    if (picked) return;
    const right = article === entry.article;
    onAnswer(right ? 'good' : 'again');
    if (right) onNext();
    else setPicked(article);
  };
  useEffect(() => {
    if (picked) nextButton.current?.focus({ preventScroll: true });
  }, [picked]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!plainKey(event)) return;
      const key = event.key.toLowerCase();
      if (!picked && (key === 'd' || key === 'h')) {
        event.preventDefault();
        pick(key === 'd' ? 'de' : 'het');
      } else if (picked && (event.key === ' ' || event.key === 'Enter') && !onControl(event)) {
        event.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const choice = (article: 'de' | 'het', key: string) => (
    <button
      type="button"
      className="secondary"
      data-result={
        picked
          ? article === entry.article
            ? 'right'
            : article === picked
              ? 'wrong'
              : undefined
          : undefined
      }
      disabled={!!picked}
      onClick={() => pick(article)}
    >
      <strong {...dutch}>{article}</strong>
      <KeyHint label={key} />
    </button>
  );
  return (
    <>
      <section
        className="practice-card practice-article"
        aria-label={t('Kaartje', 'Card')}
        data-result={picked ? 'wrong' : undefined}
      >
        <p className="practice-word" {...dutch}>
          {picked ? (
            <>
              <span className="practice-right-article">{entry.article}</span> {entry.nl}
            </>
          ) : (
            entry.nl
          )}
        </p>
        <p className="practice-type" lang="en">
          {entry.en}
        </p>
        {picked && (
          <p className="practice-article-verdict" role="status">
            {t(`Niet ${picked}, maar ${entry.article}.`, `Not ${picked} but ${entry.article}.`)}
          </p>
        )}
        <div
          className="practice-article-choices"
          role="group"
          aria-label={t('Lidwoord', 'Article')}
        >
          {choice('de', 'D')}
          {choice('het', 'H')}
        </div>
      </section>
      {picked && (
        <div className="practice-actions">
          <button type="button" className="primary" ref={nextButton} onClick={onNext}>
            {t('Volgende', 'Next')}
            <KeyHint />
          </button>
        </div>
      )}
    </>
  );
}
