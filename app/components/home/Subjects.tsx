import React from 'react';
import { useStudyContext } from '../../StudyContext';
import { unitLabel } from '../../domain/labels';
import { NavIcon } from '../Controls';
import AppLink from '../AppLink';

// What each exam part asks, in one line. The counts come from the catalogue at the
// chosen level (KNM is level-independent), so the page never promises more than exists.
const parts: [string, string, string][] = [
  [
    'reading',
    'Korte teksten uit het dagelijks leven: berichten, mededelingen, e-mails en advertenties.',
    'Short everyday texts: messages, notices, emails and advertisements.',
  ],
  [
    'listening',
    'Fragmenten met een Nederlandse stem: voicemails, omroepberichten en gesprekken.',
    'Clips with a Dutch voice: voicemails, announcements and conversations.',
  ],
  [
    'writing',
    'Korte berichten en brieven, met feedback per punt van de opdracht.',
    'Short messages and letters, with feedback on every point of the task.',
  ],
  [
    'speaking',
    'Spreek een bericht in, lees je transcript na en vraag feedback.',
    'Record a message, check your transcript and ask for feedback.',
  ],
  [
    'knm',
    'Kennis van de Nederlandse maatschappij: gemeente, zorg, school en werk.',
    'Knowledge of Dutch society: municipality, health care, school and work.',
  ],
];
export default function Subjects() {
  const { state, t, name, itemsFor, practiceSets } = useStudyContext(),
    lang = state.settings.lang,
    level = state.settings.level;
  return (
    <section className="home-section">
      <h2>{t('Onderdelen', 'Subjects')}</h2>
      <div className="home-subjects">
        {parts.map(([part, nl, en]) => {
          const items = itemsFor(part),
            sets = practiceSets.filter(
              (set) => set.part === part && (part === 'knm' || set.level === level),
            ),
            questions = items.reduce((total, item) => total + (item.questions?.length || 0), 0);
          return (
            <AppLink className="home-subject" key={part} to={part}>
              <h3>
                <NavIcon part={part} />
                <span>{name(part)}</span>
              </h3>
              <p>{t(nl, en)}</p>
              <small>
                {items.length
                  ? `${sets.length} ${sets.length === 1 ? t('oefenset', 'practice set') : t('oefensets', 'practice sets')} · ${items.length} ${unitLabel(part, items.length, lang)}${questions ? ` · ${questions} ${t('vragen', 'questions')}` : ''}`
                  : t('Nog geen opgaven op dit niveau', 'No tasks at this level yet')}
              </small>
            </AppLink>
          );
        })}
      </div>
    </section>
  );
}
