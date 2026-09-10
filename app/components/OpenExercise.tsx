import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { addElapsed, reviewOpen } from '../domain/study';
import { track, visitorId } from '../domain/telemetry';
import SpeakingRecorder from './SpeakingRecorder';
import { AnswerDiff } from './TextEvidence';
import starters from '../../content/hints/sentence-starters.json';
import { FeedbackInfo, KeyHint } from './Controls';
import { localizeFeedback } from '../domain/feedback';
import { ExerciseHeader, sessionTimer } from './ExerciseHeader';
import { useEnterAction } from './keys';

export function OpenExercise({ item }) {
  const { state, setState, t, name, go, api, practiceSet, ready } = useStudyContext(),
    [rawResult, setResult] = useState(null),
    [busy, setBusy] = useState(false),
    [captureBusy, setCaptureBusy] = useState(false),
    [error, setError] = useState(''),
    [submitted, setSubmitted] = useState(''),
    [showAnswer, setShowAnswer] = useState(!!state.drafts[item.id]),
    [selfReview, setSelfReview] = useState(false),
    [waitSeconds, setWaitSeconds] = useState(0),
    request = useRef(null),
    feedbackHeading = useRef(null);
  const result = localizeFeedback(rawResult, state.settings.lang);
  const timer = practiceSet
    ? sessionTimer(state.active, setState)
    : {
        saved: state.timers[item.id] || 0,
        persist: (delta) => setState((s) => addElapsed(s, { itemId: item.id }, delta)),
        ended: false,
      };
  const draft = state.drafts[item.id] || '',
    speaking = item.part === 'speaking',
    checks = state.reviews[item.id] || [],
    reviewing = !!result || selfReview;
  useEffect(() => {
    if (ready && state.drafts[item.id]) setShowAnswer(true);
  }, [ready]);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!busy) return;
    setWaitSeconds(0);
    const timer = setInterval(() => setWaitSeconds((n) => n + 1), 1000);
    return () => clearInterval(timer);
  }, [busy]);
  useEffect(() => {
    if (reviewing) feedbackHeading.current?.focus({ preventScroll: false });
  }, [reviewing]);
  function setDraft(value) {
    request.current?.abort();
    setBusy(false);
    setState((s) => ({
      ...s,
      drafts: { ...s.drafts, [item.id]: value },
      reviews: { ...s.reviews, [item.id]: [] },
    }));
    setResult(null);
    setSelfReview(false);
    setError('');
  }
  async function assess() {
    const controller = new AbortController();
    request.current?.abort();
    request.current = controller;
    setBusy(true);
    setError('');
    setSelfReview(false);
    setSubmitted(draft);
    const timeout = setTimeout(() => controller.abort('timeout'), 50000);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          answer: draft,
          lang: state.settings.lang,
          speech_confirmed: true,
          visitor: visitorId(),
        }),
        signal: controller.signal,
      });
      const body = await response.json();
      if (!response.ok) throw Error(body.error || 'Feedback unavailable');
      if (!controller.signal.aborted) setResult(body);
    } catch (e) {
      if (!controller.signal.aborted || controller.signal.reason === 'timeout')
        setError(
          t(
            'Feedback ophalen lukt niet. Je antwoord is bewaard. Probeer opnieuw.',
            'Feedback could not be loaded. Your answer is saved. Please retry.',
          ),
        );
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setBusy(false);
    }
  }
  const reviewed = () => {
    track({
      kind: 'review',
      item: item.id,
      mode: result ? 'ai' : 'self',
      lang: state.settings.lang,
      level: state.settings.level,
    });
    setState((s) => reviewOpen(s, item.id, result ? 'ai' : 'self', !!practiceSet));
    if (!practiceSet) go(item.part);
  };
  useEnterAction(reviewing, reviewed);
  return (
    <>
      <ExerciseHeader item={item} timer={timer} />
      <div className="exercise-columns open-columns">
        <section className="task-brief sheet">
          <span className="sheet-label">{t('Opdracht', 'Task')}</span>
          <p className="passage" lang="nl">
            {item.prompt}
          </p>
          <ul className="requirements">
            {item.criteria.map((c, i) => (
              <li key={i}>{t(c[0], c[1])}</li>
            ))}
          </ul>
          {starters[item.id] && (
            <details className="sentence-starters">
              <summary>
                <span>{t('Beginzinnen', 'Sentence starters')}</span>
                <svg
                  className="hint-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m8 10 4 4 4-4" />
                </svg>
              </summary>
              <ul lang="nl">
                {starters[item.id].map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </details>
          )}
        </section>
        <section className="answer-workspace">
          <div hidden={reviewing}>
            {speaking && (
              <SpeakingRecorder
                item={item}
                onTranscript={(text) => {
                  setDraft(text);
                  setShowAnswer(true);
                }}
                onBusy={setCaptureBusy}
                inputToggle={
                  <button
                    className="text-button type-toggle"
                    aria-expanded={showAnswer}
                    aria-controls="typed-answer"
                    disabled={captureBusy || busy}
                    onClick={() => setShowAnswer((value) => !value)}
                  >
                    {showAnswer
                      ? t('Tekstveld verbergen', 'Hide text field')
                      : t('Liever typen', 'Type instead')}
                  </button>
                }
              />
            )}
            {(!speaking || showAnswer) && (
              <div id="typed-answer">
                <label htmlFor="open-answer">
                  {speaking
                    ? t('Je transcript', 'Your transcript')
                    : t('Jouw bericht', 'Your message')}
                </label>
                <textarea
                  id="open-answer"
                  lang="nl"
                  spellCheck
                  maxLength={3000}
                  value={draft}
                  disabled={busy || captureBusy}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t('Schrijf hier in het Nederlands…', 'Write here in Dutch…')}
                />
                <p className="small transcript-check" hidden={!speaking}>
                  {t(
                    'Klopt de tekst? Pas aan waar nodig.',
                    'Does the text match? Correct it if needed.',
                  )}
                </p>
              </div>
            )}
            {(!speaking || showAnswer) && (
              <>
                <div className="actions">
                  {api?.feedback ? (
                    <button
                      className="primary"
                      data-action="assess"
                      disabled={!draft.trim() || busy || captureBusy}
                      onClick={assess}
                    >
                      {busy ? t('Nakijken…', 'Reviewing…') : t('Laat nakijken', 'Get feedback')}
                    </button>
                  ) : (
                    <button
                      className="secondary"
                      disabled={!draft.trim() || captureBusy}
                      onClick={() => setSelfReview(true)}
                    >
                      {t('Zelf nakijken', 'Self-review')}
                    </button>
                  )}
                  {api?.feedback && <FeedbackInfo />}
                </div>
                <div className="feedback-status" aria-live="polite">
                  {busy ? (
                    <span>
                      {waitSeconds >= 8
                        ? t(`Nog bezig · ${waitSeconds} s`, `Still reviewing · ${waitSeconds}s`)
                        : t('Je antwoord wordt nagekeken.', 'Reviewing your answer.')}
                    </span>
                  ) : error ? (
                    <span className="feedback-error" role="alert">
                      {error}
                    </span>
                  ) : null}
                </div>
              </>
            )}
          </div>
          {reviewing && (
            <div className="evaluation">
              <div className="evaluation-heading">
                <h2 ref={feedbackHeading} tabIndex={-1}>
                  {t('Je feedback', 'Your feedback')}
                </h2>
                <button
                  className="text-button"
                  data-action="edit-answer"
                  onClick={() => {
                    setResult(null);
                    setSelfReview(false);
                  }}
                >
                  {t('Antwoord aanpassen', 'Edit answer')}
                </button>
              </div>
              {result ? (
                <>
                  <p className="feedback-summary">{result.comment}</p>
                  <div className="criteria-list">
                    {item.criteria.map((c, i) => (
                      <details
                        className="criterion-detail"
                        key={i}
                        open={!result.criteria[i].met || result.criteria[i].uncertain}
                      >
                        <summary>
                          <span className={result.criteria[i].met ? 'good' : ''}>
                            {result.criteria[i].uncertain
                              ? '?'
                              : result.criteria[i].met
                                ? '✓'
                                : '○'}
                          </span>
                          <span>{t(c[0], c[1])}</span>
                        </summary>
                        <div>
                          {result.criteria[i].evidence && (
                            <p lang="nl">
                              <mark>{result.criteria[i].evidence}</mark>
                            </p>
                          )}
                          <p>{result.criteria[i].feedback}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                  <p className="next-step">{result.next_step}</p>
                  {result.corrected_text && (
                    <section className="model-answer suggested-answer">
                      <h3>
                        {result.corrected_text === submitted
                          ? t('Je antwoord kan zo blijven', 'Your wording can stay as it is')
                          : t('Een mogelijk antwoord', 'One possible answer')}
                      </h3>
                      <p className="revision-note">
                        {t(
                          'Andere formuleringen kunnen ook. Controleer of de betekenis nog klopt.',
                          'Other wording can work too. Check that the meaning still matches.',
                        )}
                        {/\[[^\]]+\]/.test(result.corrected_text) &&
                          ' ' +
                            t(
                              'Vul de tekst tussen [ ] zelf in.',
                              'Fill in the text inside [ ] yourself.',
                            )}
                      </p>
                      {result.corrected_text !== submitted && (
                        <p className="diff-key">
                          <ins>{t('Toegevoegd', 'Added')}</ins>{' '}
                          <del>{t('Verwijderd', 'Removed')}</del>
                        </p>
                      )}
                      <AnswerDiff before={submitted} after={result.corrected_text} />
                    </section>
                  )}
                </>
              ) : (
                <>
                  <p className="small">
                    {t('Vink aan wat je hebt genoemd.', 'Check what you included.')}
                  </p>
                  <div className="criteria-list">
                    {item.criteria.map((c, i) => (
                      <label className="criterion" key={i}>
                        <input
                          type="checkbox"
                          checked={!!checks[i]}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setState((s) => ({
                              ...s,
                              reviews: {
                                ...s.reviews,
                                [item.id]: item.criteria.map((_, j) =>
                                  j === i ? checked : !!s.reviews[item.id]?.[j],
                                ),
                              },
                            }));
                          }}
                        />
                        <span>{t(c[0], c[1])}</span>
                      </label>
                    ))}
                  </div>
                  <details className="model-answer">
                    <summary>{t('Bekijk een voorbeeld', 'See an example')}</summary>
                    <p lang="nl">{item.model}</p>
                  </details>
                </>
              )}
              <div className="actions">
                <button className="primary" data-action="finish-review" onClick={reviewed}>
                  {practiceSet && state.active.index < state.active.ids.length - 1
                    ? t('Volgende oefening', 'Next exercise')
                    : t('Afronden', 'Finish review')}
                  <KeyHint />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
