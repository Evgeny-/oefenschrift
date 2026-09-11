import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useStudyContext } from '../../StudyContext';
import { sampleQuestions, type SampleEntry } from '../../domain/sample';
import { QuestionColumns } from '../Session';
import { NavIcon } from '../Controls';
import AppLink from '../AppLink';

interface SampleProgress {
  signature: string;
  index: number;
  answers: Record<string, { selected: string; checked: boolean }>;
}
const SampleContext = createContext<{
  progress: SampleProgress | null;
  setProgress: Dispatch<SetStateAction<SampleProgress | null>>;
}>(null);

// The Dutch home and /en use different route entries. Keep this small round in
// their shared layout so a language change survives that route remount.
// This is memory only: it never writes to saved study data or the server.
export function HomeSampleProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<SampleProgress | null>(null);
  return (
    <SampleContext.Provider value={{ progress, setProgress }}>{children}</SampleContext.Provider>
  );
}

export default function SampleQuestion() {
  const { state, catalogue } = useStudyContext();
  const samples = useMemo(
    () => sampleQuestions(catalogue, state.settings.level),
    [catalogue, state.settings.level],
  );
  if (!samples.length) return null;
  return <SampleRound key={samples.map((sample) => sample.key).join('|')} samples={samples} />;
}

function SampleRound({ samples }: { samples: SampleEntry[] }) {
  const { t, name, practiceSets, startSet } = useStudyContext();
  const { progress, setProgress } = useContext(SampleContext);
  const signature = samples.map((sample) => sample.key).join('|');
  const { index, answers } =
    progress?.signature === signature ? progress : { index: 0, answers: {} };
  useEffect(() => {
    setProgress((current) =>
      current?.signature === signature ? current : { signature, index: 0, answers: {} },
    );
  }, [signature]);
  function save(change: Partial<SampleProgress>) {
    setProgress({ signature, index, answers, ...change });
  }
  const heading = useRef<HTMLHeadingElement>(null);
  const section = useRef<HTMLElement>(null);
  const shouldFocus = useRef(false);
  const finished = index === samples.length;
  const sample = samples[index];
  const answer = sample && answers[sample.key];
  const correct = samples.filter((entry) => answers[entry.key]?.selected === entry.q.answer).length;
  const recommendation =
    samples.find((entry) => answers[entry.key]?.selected !== entry.q.answer) || samples[0];
  const set = practiceSets.find((candidate) => candidate.ids.includes(recommendation.item.id));

  function move(position: number) {
    shouldFocus.current = true;
    save({ index: position });
  }
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    heading.current?.focus({ preventScroll: true });
    section.current?.scrollIntoView({ block: 'start' });
  }, [index]);

  return (
    <section className="home-section home-sample" ref={section} aria-labelledby="sample-heading">
      <h2 id="sample-heading">{t('Probeer de oefeningen', 'Try the exercises')}</h2>
      <div className="sample-heading">
        <h3 ref={heading} tabIndex={-1}>
          {finished ? t('Je resultaat', 'Your result') : name(sample.item.part)}
        </h3>
        <span className="small">
          {finished
            ? `${samples.length} ${t('vragen', 'questions')}`
            : t(
                `Vraag ${index + 1} van ${samples.length}`,
                `Question ${index + 1} of ${samples.length}`,
              )}
        </span>
      </div>
      {finished ? (
        <div className="sample-results">
          <p className="sample-score">
            {t(`${correct} van ${samples.length} goed`, `${correct} of ${samples.length} correct`)}
          </p>
          <ul className="sample-scores">
            {samples.map((entry) => (
              <li key={entry.key}>
                <span>
                  <NavIcon part={entry.item.part} />
                  {name(entry.item.part)}
                </span>
                <span>{answers[entry.key]?.selected === entry.q.answer ? '1' : '0'} / 1</span>
              </li>
            ))}
          </ul>
          <div className="actions">
            <AppLink
              className="primary"
              to={set ? `set/${set.id}` : recommendation.item.part}
              onNavigate={set ? () => startSet(set) : undefined}
            >
              {t('Verder met', 'Continue with')} {name(recommendation.item.part)}
            </AppLink>
            <button className="secondary" onClick={() => move(0)}>
              {t('Bekijk je antwoorden', 'Review your answers')}
            </button>
          </div>
        </div>
      ) : (
        <QuestionColumns
          key={sample.key}
          questionKey={sample.key}
          item={sample.item}
          q={sample.q}
          chosen={answer?.selected || ''}
          checked={!!answer?.checked}
          clipDone={!!answer?.checked}
          mock={false}
          first={index === 0}
          last={index === samples.length - 1}
          shortcuts={false}
          finishLabel={t('Bekijk resultaat', 'Show result')}
          select={(selected: string) =>
            save({ answers: { ...answers, [sample.key]: { selected, checked: false } } })
          }
          check={() => {
            if (answer?.selected)
              save({ answers: { ...answers, [sample.key]: { ...answer, checked: true } } });
          }}
          next={() => {
            if (answer?.checked) move(index + 1);
          }}
          previous={() => move(index - 1)}
        />
      )}
    </section>
  );
}
