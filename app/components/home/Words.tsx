import React from 'react';
import { useStudyContext } from '../../StudyContext';
import { mediaUrl } from '../../domain/base';
import { PRACTICE, TOP_SIZE, WORD_GROUPS, wordPath } from '../../domain/words';
import AppLink from '../AppLink';
import { WordIcon } from '../words/WordIcons';
import { SubjectArrow } from './Subjects';

// The word lists on the start page, under the subjects: the flashcards, the most common words
// and the theme lists as three cards in the subject cards' anatomy, with colours of their own
// so they do not read as three more exam parts.
export default function Words() {
  const { t } = useStudyContext(),
    themes = WORD_GROUPS.filter((group) => group.section === 'themes').length;
  const cards = [
    {
      key: 'practice',
      to: wordPath(PRACTICE),
      title: t('Woorden oefenen', 'Practise words'),
      text: t('Kaartjes, elke dag een paar', 'Flashcards, a few a day'),
      count: t('20 kaartjes per ronde', '20 cards a round'),
    },
    {
      key: 'top',
      to: wordPath('top'),
      title: t('Meest gebruikte woorden', 'Most common words'),
      text: t('Met Engels en een voorbeeldzin', 'With English and an example'),
      count: t(`${TOP_SIZE} woorden`, `${TOP_SIZE.toLocaleString('en')} words`),
    },
    {
      key: 'themes',
      to: wordPath(),
      title: t('Woorden per thema', 'Words by theme'),
      text: t('Wonen, werk, gezondheid en meer', 'Home, work, health and more'),
      count: t(`${themes} lijsten`, `${themes} lists`),
    },
  ];
  return (
    <section className="home-section">
      <h2>{t('Woorden', 'Words')}</h2>
      <div className="home-words">
        {cards.map(({ key, to, title, text, count }) => (
          <AppLink className={`home-subject home-word home-word--${key}`} key={key} to={to}>
            <h3>
              <WordIcon name={key} />
              <span>{title}</span>
            </h3>
            <p>{text}</p>
            <img
              className="home-subject-art"
              src={mediaUrl(`images/home/words-${key}.webp`)}
              alt=""
              aria-hidden="true"
              width={512}
              height={512}
              decoding="async"
            />
            <span className="home-subject-footer">
              <SubjectArrow />
              <small>{count}</small>
            </span>
          </AppLink>
        ))}
      </div>
    </section>
  );
}
