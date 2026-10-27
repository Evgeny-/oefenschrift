import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { postJson } from '../domain/request';
import { visitorId } from '../domain/telemetry';
import type { Exercise } from '../types';
import IssueReport from './IssueReport';

type Reaction = 'like' | 'dislike' | null;
type Props = { item: Exercise; questionId?: string | null };

export default function ExerciseReaction({ item, questionId = null }: Props) {
  return (
    <ReactionControl
      key={`${item.id}/${item.revision}/${questionId || ''}`}
      item={item}
      questionId={questionId}
    />
  );
}

function ReactionControl({ item, questionId }: Props) {
  const { t, api } = useStudyContext();
  const [value, setValue] = useState<Reaction>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<'load' | 'save' | null>(null);
  const request = useRef(0);
  const pending = useRef(false);

  async function send(operation: 'get' | 'set', next?: Reaction) {
    const visitor = visitorId();
    if (!visitor || api?.reports === false) throw Error('Exercise rating unavailable.');
    return postJson('/api/reactions', {
      visitor,
      operation,
      item_id: item.id,
      item_version: item.revision,
      question_id: questionId,
      ...(operation === 'set' ? { value: next } : {}),
    });
  }
  async function load() {
    const number = ++request.current;
    setError(null);
    try {
      const result = await send('get');
      if (number === request.current) setValue(result.value);
    } catch {
      if (number === request.current) setError('load');
    }
  }
  useEffect(() => {
    load();
    return () => {
      request.current++;
    };
  }, []);

  async function save(next: Reaction) {
    if (pending.current) return;
    const number = ++request.current;
    pending.current = true;
    setValue(next);
    setSaving(true);
    setError(null);
    try {
      const result = await send('set', next);
      if (number === request.current) setValue(result.value);
    } catch {
      if (number === request.current) setError('save');
    } finally {
      pending.current = false;
      if (number === request.current) setSaving(false);
    }
  }
  return (
    <div className="exercise-reactions">
      <div className="reaction-controls">
        <div
          className="reaction-buttons"
          role="group"
          aria-label={t('Beoordeel deze oefening', 'Rate this exercise')}
        >
          {(['like', 'dislike'] as const).map((reaction) => {
            const label =
              reaction === 'like'
                ? t('Goede oefening', 'Like this exercise')
                : t('Deze oefening kan beter', 'Dislike this exercise');
            return (
              <button
                key={reaction}
                type="button"
                className="reaction-button"
                data-reaction={reaction}
                aria-label={label}
                title={label}
                aria-pressed={value === reaction}
                disabled={saving}
                onClick={() => save(value === reaction ? null : reaction)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <g transform={reaction === 'dislike' ? 'rotate(180 12 12)' : undefined}>
                    <path d="M8 10.5 11.5 4c.8-1.4 2.5-.7 2.5.6V9h4.6a2 2 0 0 1 2 2.4l-1.4 7a2 2 0 0 1-2 1.6H8z" />
                    <rect x="3" y="10" width="5" height="10" rx="1.5" />
                  </g>
                </svg>
              </button>
            );
          })}
        </div>
        {value === 'dislike' && <IssueReport item={item} questionId={questionId} />}
      </div>
      {error && (
        <p className="reaction-error" role="status">
          {error === 'save'
            ? t('Je beoordeling is nog niet opgeslagen.', 'Your rating has not been saved yet.')
            : t(
                'Je eerdere beoordeling laden lukt niet.',
                'Could not load your previous rating.',
              )}{' '}
          <button
            type="button"
            className="text-button"
            onClick={() => (error === 'save' ? save(value) : load())}
          >
            {t('Probeer opnieuw', 'Try again')}
          </button>
        </p>
      )}
    </div>
  );
}
