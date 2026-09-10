import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { useStudyContext } from '../StudyContext';
export default function IssueReport({ item, questionId = null }) {
  const { t, api } = useStudyContext(),
    id = useId();
  const [kind, setKind] = useState('unclear'),
    [message, setMessage] = useState(''),
    [status, setStatus] = useState('idle'),
    [receipt, setReceipt] = useState(null),
    [height, setHeight] = useState(null);
  const done = useRef(null),
    pending = useRef(false);
  // Measure the content, so confirmation can settle into its smaller size.
  const measure = useCallback((node) => {
    if (!node) return;
    const update = () => setHeight(node.offsetHeight + 2);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (status === 'sent') done.current?.focus({ preventScroll: true });
  }, [status]);
  function resetAfterClose(open) {
    if (!open) {
      setHeight(null);
      if (!pending.current && status === 'sent') {
        setStatus('idle');
        setReceipt(null);
        setMessage('');
        setKind('unclear');
      }
    }
  }
  async function submit(e) {
    e.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus('saving');
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: item.id,
          item_version: item.revision,
          question_id: questionId,
          kind,
          message,
        }),
      });
      if (!response.ok) throw Error();
      setReceipt(await response.json());
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      pending.current = false;
    }
  }
  return (
    <Dialog.Root onOpenChangeComplete={resetAfterClose}>
      <Dialog.Trigger className="report-trigger">
        {t('Meld een probleem', 'Report a problem')}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="dialog-backdrop" />
        <Dialog.Popup className="report-dialog" style={height ? { height } : undefined}>
          <div className="report-content" ref={measure}>
            <div className="dialog-heading">
              <Dialog.Title>
                {status === 'sent'
                  ? t('Bedankt voor je melding', 'Thanks for letting us know')
                  : t('Wat kan beter?', 'What could be improved?')}
              </Dialog.Title>
              <Dialog.Close className="dialog-close" aria-label={t('Sluiten', 'Close')}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </Dialog.Close>
            </div>
            <Dialog.Description className={status === 'sent' ? 'report-confirmation' : 'small'}>
              {status === 'sent' ? (
                t(
                  'Je opmerking staat klaar voor beoordeling. Je kunt verder met de oefening.',
                  'Your feedback is queued for review. You can continue with the exercise.',
                )
              ) : (
                <span lang="nl">{item.title}</span>
              )}
            </Dialog.Description>
            {status === 'sent' ? (
              <div className="report-receipt">
                <p className="small">
                  {t('Melding', 'Reference')} #{receipt.id}
                </p>
                <Dialog.Close ref={done} className="secondary">
                  {t('Verder oefenen', 'Continue practising')}
                </Dialog.Close>
              </div>
            ) : (
              <form className="issue-report" onSubmit={submit}>
                <fieldset>
                  <legend className="sr-only">{t('Reden', 'Reason')}</legend>
                  {[
                    ['unclear', t('Onduidelijke vraag', 'Unclear wording')],
                    ['answer', t('Antwoord klopt niet', 'Answer seems wrong')],
                    ['level', t('Moeilijkheid', 'Difficulty')],
                    ['audio', t('Geluid of transcript', 'Audio or transcript')],
                    ['other', t('Iets anders', 'Something else')],
                  ].map(([value, label]) => (
                    <label className="issue-option" key={value}>
                      <input
                        type="radio"
                        name={id}
                        value={value}
                        checked={kind === value}
                        onChange={() => setKind(value)}
                      />
                      {label}
                    </label>
                  ))}
                </fieldset>
                <label htmlFor={id}>{t('Toelichting (optioneel)', 'Details (optional)')}</label>
                <textarea
                  id={id}
                  value={message}
                  maxLength={1200}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('Wat viel je op?', 'What did you notice?')}
                />
                <p className="small report-privacy">
                  {t(
                    'Je antwoord en opname worden niet meegestuurd.',
                    'Your answer and recording are not included.',
                  )}
                </p>
                <div className="actions">
                  <button className="primary" disabled={!api?.reports || status === 'saving'}>
                    {status === 'saving'
                      ? t('Versturen…', 'Sending…')
                      : t('Verstuur opmerking', 'Send feedback')}
                  </button>
                </div>
                {!api?.reports && (
                  <p className="small">
                    {t(
                      'Start de lokale server om opmerkingen op te slaan.',
                      'Start the local server to save exercise feedback.',
                    )}
                  </p>
                )}
                {status === 'error' && (
                  <p className="feedback-error" role="alert">
                    {t(
                      'Versturen lukt niet. Je toelichting staat er nog. Probeer opnieuw.',
                      'Could not send. Your details are still here. Please try again.',
                    )}
                  </p>
                )}
              </form>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
