import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { addElapsed, reviewOpen } from '../domain/study';
import { track, visitorId } from '../domain/telemetry';
import SpeakingRecorder from './SpeakingRecorder';
import { AnswerDiff } from './TextEvidence';
import starters from '../../content/hints/sentence-starters.json';
import { ClipButton, FeedbackInfo, KeyHint, GrowingTextarea } from './Controls';
import { localizeFeedback } from '../domain/feedback';
import { unavailableCodes } from '../types';
import { postJson, type ApiFailure } from '../domain/request';
import { ExerciseHeader, sessionTimer } from './ExerciseHeader';
import { useEnterAction } from './keys';
import { mediaUrl } from '../domain/base';

// Blueprint task types carry the exam's printed material: an e-mail header, the wijkkrant opening
// line, the fields of a form, or the pictures of a picture note. Shown with the task, above the answer.
function TaskStimulus({ item, t }) {
  const pictures = Array.isArray(item.images) ? item.images.filter((i) => i?.file) : [];
  const scaffold = item.scaffold || {};
  return (
    <>
      {pictures.length > 0 && (
        <div className="pictures" data-count={pictures.length}>
          {pictures.map((i, n) => (
            <figure key={i.file} className="picture">
              <img src={mediaUrl(i.file)} alt={i.alt || ''} loading="lazy" />
              {pictures.length > 1 && <figcaption>{n + 1}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {scaffold.to && (
        <dl className="mail-header" lang="nl">
          <dt>{t('Aan', 'To')}</dt>
          <dd>{scaffold.to}</dd>
          <dt>{t('Van', 'From')}</dt>
          <dd>{scaffold.from}</dd>
          <dt>{t('Onderwerp', 'Subject')}</dt>
          <dd>{scaffold.subject}</dd>
        </dl>
      )}
      {(item.promptAudio || item.cueAudio) && (
        <div className="task-audio" lang="nl">
          {item.promptAudio && (
            <ClipButton
              src={item.promptAudio}
              playLabel={t('Opdracht beluisteren', 'Listen to the instruction')}
              pauseLabel={t('Pauzeren', 'Pause')}
              caption={t('Opdracht', 'Instruction')}
            />
          )}
          {item.cueAudio && (
            <ClipButton
              src={item.cueAudio}
              playLabel={t('Vraag beluisteren', 'Listen to the question')}
              pauseLabel={t('Pauzeren', 'Pause')}
              caption={
                item.cue?.speaker
                  ? `${t('U hoort', 'You hear')}: ${item.cue.speaker}`
                  : t('Vraag', 'Question')
              }
            />
          )}
        </div>
      )}
      {item.speakingSeconds && (
        <p className="small task-timing" lang="nl">
          {item.prepSeconds ? `${item.prepSeconds} seconden voorbereiden · ` : ''}
          {item.speakingSeconds} seconden spreektijd
        </p>
      )}
      {scaffold.salutation && (
        <p className="scaffold-line" lang="nl">
          {scaffold.salutation}
        </p>
      )}
      {item.taskType === 'wijkkrant' && item.opening && (
        <p className="scaffold-line" lang="nl">
          {item.opening}
        </p>
      )}
      {item.table && Array.isArray(item.table.rows) && (
        // A B1 korte schrijftaak gives its facts in a small table that is not part of the e-mail.
        <div className="task-table-scroll">
          <table className="task-table" lang="nl">
            {item.table.caption && <caption>{item.table.caption}</caption>}
            {Array.isArray(item.table.columns) && (
              <thead>
                <tr>
                  {item.table.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {item.table.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {item.taskType === 'zinstaak' && scaffold.body && (
        // A zinstaak shows a short e-mail with one gap; the learner writes the missing sentence.
        <p className="gap-text" lang="nl">
          {String(scaffold.body)
            .split('___')
            .map((part, n, parts) => (
              <React.Fragment key={n}>
                {part}
                {n < parts.length - 1 && (
                  <span className="gap" aria-label={t('Open plek', 'Gap')}>
                    {' '}
                  </span>
                )}
              </React.Fragment>
            ))}
        </p>
      )}
      {Array.isArray(item.formFields) && (
        <dl className="form-fields" lang="nl">
          {item.formFields.map((f) => (
            <React.Fragment key={f.label}>
              <dt>{f.label}</dt>
              <dd className={f.kind === 'open' ? 'field-open' : 'field-line'}>
                {Array.isArray(f.options) ? f.options.join(' · ') : ''}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </>
  );
}

export function OpenExercise({ item }) {
  const { state, setState, t, name, go, api, refreshApi, practiceSet, ready } = useStudyContext(),
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
  // AI feedback is offered while the service is on and this browser's daily allowance
  // is not used up; the note under the buttons says which of the two is missing.
  const allowanceLeft = api?.remaining?.feedback ?? Infinity,
    feedbackOffered = !!api?.feedback && allowanceLeft > 0;
  useEffect(() => {
    if (ready && state.drafts[item.id]) setShowAnswer(true);
  }, [ready]);
  // A form task starts with its field labels in the answer, one per line, as the paper form does.
  useEffect(() => {
    if (ready && Array.isArray(item.formFields) && !state.drafts[item.id])
      setDraft(item.formFields.map((f) => `${f.label}: `).join('\n'));
  }, [ready, item.id]);
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
      const body = await postJson(
        '/api/feedback',
        {
          id: item.id,
          answer: draft,
          lang: state.settings.lang,
          speech_confirmed: true,
          visitor: visitorId(),
        },
        { signal: controller.signal },
      );
      if (!controller.signal.aborted) setResult(body);
    } catch (e) {
      if (controller.signal.aborted && controller.signal.reason !== 'timeout') return;
      const { code, retryAfter } = (e as ApiFailure) || {};
      // A service that is off, paused or capped, or an allowance used up for today:
      // self-review takes over at once and the draft stays. A rate limit, a busy moment or
      // a provider hiccup keeps the button for a retry.
      if (unavailableCodes('feedback').includes(code)) {
        refreshApi('feedback');
        setError(
          t(
            'AI-feedback is nu niet beschikbaar. Kijk je antwoord zelf na; het is bewaard.',
            'AI feedback is unavailable right now. Review your answer yourself; it is saved.',
          ),
        );
      } else if (code === 'allowance_exhausted') {
        refreshApi('feedback', 'allowance');
        setError(
          t(
            'De AI-feedback voor vandaag is op. Kijk je antwoord zelf na; het is bewaard.',
            'Today’s AI feedback is used up. Review your answer yourself; it is saved.',
          ),
        );
      } else
        setError(
          code === 'rate_limited'
            ? t(
                `Even wachten: probeer het over ${retryAfter && retryAfter < 120 ? `${retryAfter} seconden` : 'een minuut'} opnieuw. Je antwoord is bewaard.`,
                `Please wait ${retryAfter && retryAfter < 120 ? `${retryAfter} seconds` : 'a minute'} and try again. Your answer is saved.`,
              )
            : code === 'busy'
              ? t(
                  'Het is druk. Probeer het over een minuut opnieuw; je antwoord is bewaard.',
                  'It is busy right now. Try again in a minute; your answer is saved.',
                )
              : t(
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
          <TaskStimulus item={item} t={t} />
          {/* A picture task gives only the pictures and a cued task only the spoken question; their
              requirements would give the words away, so they appear at review time. */}
          {(!(
            item.taskType === 'picture-note' ||
            item.taskType === 'zinstaak' ||
            item.cue ||
            (item.taskType === 'deelschrijftaak' && item.images?.length)
          ) ||
            reviewing) && (
            <ul className="requirements">
              {item.criteria.map((c, i) => (
                <li key={i}>{t(c[0], c[1])}</li>
              ))}
            </ul>
          )}
          {starters[item.id] &&
            !(
              (item.taskType === 'picture-note' ||
                item.cue ||
                (item.taskType === 'deelschrijftaak' && item.images?.length)) &&
              !reviewing
            ) && (
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
                onUnavailable={() => setShowAnswer(true)}
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
                <GrowingTextarea
                  id="open-answer"
                  lang="nl"
                  spellCheck
                  maxLength={3000}
                  value={draft}
                  disabled={busy || captureBusy}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t('Schrijf hier in het Nederlands…', 'Write here in Dutch…')}
                />
                {item.scaffold?.closing && (
                  <p className="scaffold-line" lang="nl">
                    {item.scaffold.closing}
                  </p>
                )}
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
                  {feedbackOffered ? (
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
                  {feedbackOffered && <FeedbackInfo />}
                </div>
                {!api?.feedback && api?.feedbackPaused ? (
                  <p className="small service-note">
                    {t(
                      'AI-feedback is tijdelijk niet beschikbaar. Zelf nakijken werkt altijd.',
                      'AI feedback is temporarily unavailable. Self-review always works.',
                    )}
                  </p>
                ) : api?.feedback && allowanceLeft <= 0 ? (
                  <p className="small service-note">
                    {t(
                      'De AI-feedback voor vandaag is op. Zelf nakijken werkt altijd.',
                      'Today’s AI feedback is used up. Self-review always works.',
                    )}
                  </p>
                ) : feedbackOffered && allowanceLeft <= 5 ? (
                  <p className="small service-note">
                    {t(
                      `Nog ${allowanceLeft} keer AI-feedback vandaag.`,
                      `${allowanceLeft} AI reviews left today.`,
                    )}
                  </p>
                ) : null}
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
                    {item.taskType === 'zinstaak' && item.scaffold?.body ? (
                      // The example sentence belongs in its gap, so the learner sees it in context.
                      <p className="gap-text" lang="nl">
                        {String(item.scaffold.body)
                          .split('___')
                          .map((part, n, parts) => (
                            <React.Fragment key={n}>
                              {part}
                              {n < parts.length - 1 && <mark>{item.model}</mark>}
                            </React.Fragment>
                          ))}
                      </p>
                    ) : (
                      <p lang="nl">{item.model}</p>
                    )}
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
