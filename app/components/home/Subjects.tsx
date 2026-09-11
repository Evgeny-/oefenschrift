import React from 'react';
import { useStudyContext } from '../../StudyContext';
import { mediaUrl } from '../../domain/base';
import { NavIcon } from '../Controls';
import AppLink from '../AppLink';

// What each exam part asks, in one line. The counts come from the catalogue at the
// chosen level (KNM is level-independent), so the page never promises more than exists.
const parts: [string, string, string][] = [
  ['reading', 'Berichten en teksten', 'Messages and texts'],
  ['listening', 'Gesprekken en berichten', 'Conversations and messages'],
  ['writing', 'Schrijf een bericht', 'Write a message'],
  ['speaking', 'Vertel het in het Nederlands', 'Say it in Dutch'],
  ['knm', 'Leven in Nederland', 'Life in the Netherlands'],
];
export default function Subjects() {
  const { state, t, name, itemsFor, practiceSets } = useStudyContext(),
    level = state.settings.level;
  return (
    <section className="home-section">
      <h2>{t('Onderdelen', 'Subjects')}</h2>
      <div className="home-subjects">
        {parts.map(([part, nl, en]) => {
          const items = itemsFor(part),
            sets = practiceSets.filter(
              (set) => set.part === part && (part === 'knm' || set.level === level),
            );
          return (
            <AppLink className={`home-subject home-subject--${part}`} key={part} to={part}>
              <h3>
                <NavIcon part={part} />
                <span>{name(part)}</span>
              </h3>
              <p>{t(nl, en)}</p>
              <img
                className="home-subject-art"
                src={mediaUrl(`images/home/${part}.webp`)}
                alt=""
                aria-hidden="true"
                width={512}
                height={512}
                decoding="async"
              />
              <span className="home-subject-footer">
                <span className="home-subject-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
                <small>
                  {items.length
                    ? `${sets.length} ${sets.length === 1 ? t('oefenset', 'practice set') : t('oefensets', 'practice sets')}`
                    : t('Binnenkort', 'Coming soon')}
                </small>
              </span>
            </AppLink>
          );
        })}
      </div>
    </section>
  );
}
