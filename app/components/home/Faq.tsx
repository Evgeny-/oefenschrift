import React from 'react';
import { useStudyContext } from '../../StudyContext';
import AppLink from '../AppLink';

// The questions a visitor asks before trusting a free exam site. Short, plain answers;
// anything about processing points to the privacy page rather than repeating it.
export default function Faq() {
  const { t } = useStudyContext();
  const entries: [string, React.ReactNode][] = [
    [
      t('Is dit het officiële inburgeringsexamen?', 'Is this the official integration exam?'),
      t(
        'Nee. Dit zijn onafhankelijke oefenopgaven in de vorm van het examen. Het echte examen doe je bij DUO; deze site geeft geen officiële score en voorspelt niet of je slaagt.',
        'No. These are independent practice tasks in the shape of the exam. The real exam is taken at DUO; this site gives no official score and does not predict whether you will pass.',
      ),
    ],
    [
      t('Wat kost het?', 'What does it cost?'),
      t(
        'Niets. Er is geen account en geen betaalmuur.',
        'Nothing. There is no account and no paywall.',
      ),
    ],
    [
      t('Waar blijft mijn voortgang?', 'Where is my progress kept?'),
      <>
        {t(
          'In je browser, op dit apparaat. Op de pagina ',
          'In your browser, on this device. On the ',
        )}
        <AppLink to="progress">{t('Voortgang', 'Progress')}</AppLink>
        {t(
          ' kun je een kopie exporteren en die in een andere browser importeren.',
          ' page you can export a copy and import it in another browser.',
        )}
      </>,
    ],
    [
      t(
        'Wat gebeurt er met mijn antwoorden en opnames?',
        'What happens with my answers and recordings?',
      ),
      <>
        {t(
          'Alleen als je op ‘Laat nakijken’ drukt, gaat je tekst naar een AI-dienst voor oefenfeedback. Een opname gaat pas na het stoppen naar een spraakherkenningsdienst. Zie ',
          'Only when you press ‘Get feedback’ does your text go to an AI service for practice feedback. A recording is sent to a speech-recognition service only after you stop it. See ',
        )}
        <AppLink to="privacy">{t('Privacy', 'Privacy')}</AppLink>.
      </>,
    ],
    [
      t('Welk niveau kies ik?', 'Which level should I choose?'),
      <>
        {t(
          'Het niveau dat jouw examen vraagt. Twijfel je? ',
          'The level your exam requires. Not sure? ',
        )}
        <AppLink to="check">{t('Doe de niveaucheck', 'Take the level check')}</AppLink>.
      </>,
    ],
    [
      t('Komen er nieuwe opgaven bij?', 'Are new tasks added?'),
      t(
        'Ja, regelmatig. Nieuwe oefensets staan bovenaan in elk onderdeel.',
        'Yes, regularly. New practice sets appear at the top of each subject.',
      ),
    ],
  ];
  return (
    <section className="home-section">
      <h2>{t('Veelgestelde vragen', 'Frequently asked questions')}</h2>
      <div className="home-faq">
        {entries.map(([question, answer], i) => (
          <details key={i}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
