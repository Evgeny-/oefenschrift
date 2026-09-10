import React from 'react';
import { useStudyContext } from '../StudyContext';
import { flatten, hasProgress, savedSetSession } from '../domain/study';
import { checkAvailability, checkInProgress, checkSummary, latestCheck } from '../domain/check';
import { unitLabel } from '../domain/labels';
import AppLink from './AppLink';
import { Chevron, NavIcon, ReasonIcon } from './Controls';
import { checkDate, checkLine } from './LevelCheck';
import site from '../../content/site.json';
import Subjects from './home/Subjects';
import SampleQuestion from './home/SampleQuestion';
import Faq from './home/Faq';
const parts = ['reading', 'listening', 'writing', 'speaking', 'knm'];
// The home page does two things: it says what this is, and it gets you into an
// exercise. The subjects themselves live in the sidebar, one click away.
export default function Home() {
  const { state, t, name, catalogue, practiceSets, startSet, open } = useStudyContext(),
    lang = state.settings.lang,
    level = state.settings.level;
  const closed = (set) => !!catalogue.find((i) => i.id === set.ids[0])?.questions;
  const unfinished = practiceSets
    .map((set) => ({ set, session: savedSetSession(state, set) }))
    .filter(({ session }) => session && !session.endedAt && hasProgress(session))
    .sort((a, b) => b.session.startedAt - a.session.startedAt);
  const drafts = catalogue.filter(
    (i) => !i.questions && !state.records[i.id]?.completed && state.drafts[i.id]?.trim(),
  );
  const resume = unfinished[0];
  const openSet = (part) =>
    practiceSets.find(
      (set) =>
        set.part === part &&
        (part === 'knm' || set.level === level) &&
        !set.ids.every((id) => state.records[id]?.completed),
    );
  // A check under way comes first; then the set you were in; then the check's advice;
  // then the first subject at this level with something to start.
  const check = checkInProgress(state),
    checking = check && hasProgress(check),
    latest = latestCheck(state, level),
    advice = latest && checkSummary(latest, catalogue).weakest,
    adviceSet = advice && openSet(advice.part),
    firstSet = adviceSet || parts.map(openSet).find(Boolean),
    offerCheck = !checking && !latest && checkAvailability(catalogue, level).enough,
    // Sets beyond the one the primary action continues; all of them while a check has it.
    rest = checking ? unfinished.slice(0, 3) : unfinished.slice(1, 3);
  const creator = site.creator?.name ? site.creator : null;
  return (
    <div className="home">
      <div className="home-hero">
        <h1 tabIndex={-1}>
          {t('Oefen voor je inburgeringsexamen', 'Practise for the Dutch integration exam')}
        </h1>
        <p>
          {t(
            'Gratis oefenopgaven voor lezen, luisteren, schrijven, spreken en KNM. Geen account nodig.',
            'Free practice for reading, listening, writing, speaking and KNM. No account needed.',
          )}
        </p>
        <div className="actions">
          {checking ? (
            <AppLink className="primary" data-action="continue-check" to="check">
              {t('Verdergaan met de niveaucheck', 'Continue the level check')}
            </AppLink>
          ) : resume ? (
            <AppLink
              className="primary"
              data-set={resume.set.id}
              to={`set/${resume.set.id}`}
              onNavigate={() => startSet(resume.set)}
            >
              {t('Verdergaan met', 'Continue')} {name(resume.set.part)} · {t('set', 'set')}{' '}
              {resume.set.number}
            </AppLink>
          ) : firstSet ? (
            <AppLink
              className="primary"
              data-set={firstSet.id}
              to={`set/${firstSet.id}`}
              onNavigate={() => startSet(firstSet)}
            >
              {t('Begin met', 'Start with')} {name(firstSet.part)}{' '}
              {advice
                ? `· ${t('set', 'set')} ${firstSet.number}`
                : firstSet.level === 'KNM'
                  ? ''
                  : firstSet.level}
            </AppLink>
          ) : null}
          {offerCheck && (
            <AppLink className="secondary" data-action="level-check" to="check">
              {t('Doe de niveaucheck', 'Take the level check')}
            </AppLink>
          )}
        </div>
      </div>
      {latest && !checking && (
        <section className="home-section">
          <h2>{t('Je niveaucheck', 'Your level check')}</h2>
          <ul className="exercise-list home-list">
            <li>
              <AppLink className="exercise-entry" data-check={latest.startedAt} to="check-result">
                <span className="entry-icon">
                  <NavIcon part="check" size={20} />
                </span>
                <span className="exercise-entry-copy">
                  <h3>
                    {t('Niveaucheck', 'Level check')} {level} · {checkDate(latest, lang)}
                  </h3>
                  <small>{checkLine(latest, catalogue, t, name)}</small>
                </span>
                <span className="exercise-status">
                  {t('Bekijk het resultaat', 'See the result')}
                </span>
                <Chevron />
              </AppLink>
            </li>
          </ul>
        </section>
      )}
      {(rest.length > 0 || drafts.length > 0) && (
        <section className="home-section">
          <h2>{t('Verder waar je was', 'Continue where you left off')}</h2>
          <ul className="exercise-list home-list">
            {rest.map(({ set, session }) => (
              <li key={set.id}>
                <AppLink
                  className="exercise-entry"
                  data-set={set.id}
                  to={`set/${set.id}`}
                  onNavigate={() => startSet(set)}
                >
                  <span className="entry-icon">
                    <NavIcon part={set.part} size={20} />
                  </span>
                  <span className="exercise-entry-copy">
                    <h3>
                      {name(set.part)} · {t('Oefenset', 'Practice set')} {set.number}
                    </h3>
                    <small>
                      {set.level === 'KNM' ? 'KNM' : set.level} ·{' '}
                      {closed(set)
                        ? `${t('vraag', 'question')} ${session.index + 1} ${t('van', 'of')} ${flatten(session, catalogue).length}`
                        : `${unitLabel(set.part, 1, lang)} ${session.index + 1} ${t('van', 'of')} ${set.ids.length}`}
                    </small>
                  </span>
                  <span className="exercise-status">{t('Verdergaan', 'Continue')}</span>
                  <Chevron />
                </AppLink>
              </li>
            ))}
            {drafts.slice(0, 3 - rest.length).map((item) => (
              <li key={item.id}>
                <AppLink
                  className="exercise-entry"
                  data-item={item.id}
                  to={`exercise/${item.id}`}
                  onNavigate={() => open(item)}
                >
                  <span className="entry-icon">
                    <NavIcon part={item.part} size={20} />
                  </span>
                  <span className="exercise-entry-copy">
                    <h3 lang="nl">{item.title}</h3>
                    <small>
                      {item.level} · {name(item.part)} · {t('concept bewaard', 'draft saved')}
                    </small>
                  </span>
                  <span className="exercise-status">{t('Verdergaan', 'Continue')}</span>
                  <Chevron />
                </AppLink>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Subjects />
      {!Object.values(state.records).some((record) => record.completed) && <SampleQuestion />}
      <section className="home-section">
        <h2>{t('Wat je hier vindt', "What you'll find here")}</h2>
        <div className="home-why">
          <div>
            <h3>
              <ReasonIcon kind="free" />
              <span>{t('Altijd gratis', 'Always free')}</span>
            </h3>
            <p>
              {t(
                'Zonder account en zonder betaalmuur: onderwijs hoort voor iedereen gratis te zijn. Je voortgang blijft in je browser.',
                'No account and no paywall: education should be free for everyone. Your progress stays in your browser.',
              )}
            </p>
          </div>
          <div>
            <h3>
              <ReasonIcon kind="feedback" />
              <span>{t('Slimme feedback', 'Intelligent feedback')}</span>
            </h3>
            <p>
              {t(
                'Schrijven en spreken: feedback per punt van de opdracht. Je opname blijft op je toestel tot je erom vraagt.',
                'Writing and speaking: feedback per point of the task. Your recording stays on your device until you ask.',
              )}
            </p>
          </div>
          <div>
            <h3>
              <ReasonIcon kind="exam" />
              <span>{t('Opgaven op jouw niveau', 'Tasks at your level')}</span>
            </h3>
            <p>
              {t(
                'Voor elk onderdeel, in de vorm van het examen en afgestemd op A2 en B1. Er komen regelmatig nieuwe opgaven bij.',
                'For every part, in the shape of the exam and made for A2 and B1. New tasks are added regularly.',
              )}
            </p>
          </div>
        </div>
      </section>
      <Faq />
      {creator && (
        <p className="home-more small">
          {t('Gemaakt door', 'Made by')} {creator.name}
          {creator.note?.[lang] ? `, ${creator.note[lang]}` : ''}
          {creator.github && (
            <>
              {' · '}
              <a className="text-button" href={creator.github} rel="noreferrer">
                GitHub
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}
