import React, { useEffect, useId, useRef, useState, useLayoutEffect } from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Radio } from '@base-ui/react/radio';
import { Popover } from '@base-ui/react/popover';
import { Switch } from '@base-ui/react/switch';
import useSelectionIndicator from './useSelectionIndicator';
import { useStudyContext } from '../StudyContext';
import { mediaUrl, withBase } from '../domain/base';
import { routePath } from '../domain/routes';

export function Segments({
  label,
  value,
  options,
  onChange,
  compact = false,
  id = undefined,
  hideLabel = false,
}) {
  const labelId = useId(),
    indicator = useSelectionIndicator(value);
  return (
    <div className={`segment-field ${compact ? 'compact' : ''}`} id={id}>
      <span id={labelId} className={hideLabel ? 'sr-only' : 'control-label'}>
        {label}
      </span>
      <RadioGroup
        ref={indicator.ref}
        aria-labelledby={labelId}
        className="segments"
        data-positioned={indicator.positioned || undefined}
        data-animated={indicator.animated || undefined}
        value={value}
        onValueChange={onChange}
      >
        <span className="selection-indicator" aria-hidden="true" style={indicator.style} />
        {options.map((option) => (
          <Radio.Root
            className="segment"
            data-choice={option.value}
            key={option.value}
            value={option.value}
            aria-label={option.ariaLabel || option.label}
            title={option.ariaLabel}
          >
            {option.label}
          </Radio.Root>
        ))}
      </RadioGroup>
    </div>
  );
}
export function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle-label">
      <Switch.Root className="toggle" checked={checked} onCheckedChange={onChange}>
        <Switch.Thumb className="toggle-thumb" />
      </Switch.Root>
      <span>{label}</span>
    </label>
  );
}
export function ThemeIcon({ theme }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {theme === 'light' ? (
        <>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </>
      ) : theme === 'dark' ? (
        <path d="M20.7 14.5A9 9 0 0 1 9.5 3.3 9 9 0 1 0 20.7 14.5Z" />
      ) : (
        <>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8m-4-4v4" />
        </>
      )}
    </svg>
  );
}
function InfoPopover({ label, title, children }) {
  const { t, state } = useStudyContext();
  return (
    <Popover.Root>
      <Popover.Trigger
        className="info-trigger"
        openOnHover
        delay={150}
        closeDelay={200}
        aria-label={label}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6" />
          <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" sideOffset={8}>
          <Popover.Popup className="info-popup">
            <Popover.Title className="sr-only">{title}</Popover.Title>
            <Popover.Description>{children}</Popover.Description>
            <a
              href={withBase(routePath('privacy', state.settings.level, state.settings.lang))}
              target="_blank"
              rel="noreferrer"
            >
              {t('Privacy bekijken', 'Read privacy notice')}
            </a>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
export function FeedbackInfo() {
  const { t } = useStudyContext();
  return (
    <InfoPopover
      label={t('Over AI-feedback en privacy', 'About AI feedback and privacy')}
      title={t('Over AI-feedback', 'About AI feedback')}
    >
      {t(
        'Je antwoord wordt naar een AI-dienst gestuurd voor oefenfeedback. Dit is geen examencijfer.',
        'Your answer is sent to an AI service for practice feedback. This is not an exam score.',
      )}
    </InfoPopover>
  );
}
export function RecordingInfo() {
  const { t } = useStudyContext();
  return (
    <InfoPopover
      label={t('Over opnemen en privacy', 'About recording and privacy')}
      title={t('Je opname', 'Your recording')}
    >
      {t(
        'Na het stoppen wordt je audio naar een externe dienst gestuurd voor spraakherkenning. Maximaal 2 minuten en 6 MB. Je kunt het transcript daarna aanpassen.',
        'Stopping the recording sends your audio to an external transcription service. Up to 2 minutes and 6 MB. You can edit the transcript afterwards.',
      )}
    </InfoPopover>
  );
}
export function LanguageFlag({ language }) {
  const clip = useId();
  return (
    <svg className="language-flag" width="24" height="24" viewBox="0 0 30 30" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="15" cy="15" r="14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {language === 'nl' ? (
          <>
            <path fill="#ae1c28" d="M0 0h30v10H0z" />
            <path fill="#fff" d="M0 10h30v10H0z" />
            <path fill="#21468b" d="M0 20h30v10H0z" />
          </>
        ) : (
          <>
            <path fill="#012169" d="M0 0h30v30H0z" />
            <path stroke="#fff" strokeWidth="6" d="m-15 0 60 30m0-30-60 30" />
            <path stroke="#c8102e" strokeWidth="2" d="m-15 0 60 30m0-30-60 30" />
            <path stroke="#fff" strokeWidth="10" d="M15 0v30M0 15h30" />
            <path stroke="#c8102e" strokeWidth="6" d="M15 0v30M0 15h30" />
          </>
        )}
      </g>
      <circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" strokeOpacity=".15" />
    </svg>
  );
}
// Single-weight glyphs beside the navigation labels. Each carries one small motion
// that plays when its section becomes current (see the nav-icon rules in styles.css).
// Drawn in the site's rounded shape language: rounded corners, pill cups, a pen with a
// round back, a mill with a rounded foot. The animated parts keep their class names.
const navGlyphs = {
  reading: (
    <>
      <path
        className="book-left"
        d="M12 7.4C10.6 6.2 8.6 5.7 6.2 5.7A1.2 1.2 0 0 0 5 6.9v9.8a1.2 1.2 0 0 0 1.2 1.2c2.4 0 4.4.5 5.8 1.7"
      />
      <path
        className="book-right"
        d="M12 7.4c1.4-1.2 3.4-1.7 5.8-1.7A1.2 1.2 0 0 1 19 6.9v9.8a1.2 1.2 0 0 1-1.2 1.2c-2.4 0-4.4.5-5.8 1.7"
      />
      <path d="M12 7.4v12.2" />
    </>
  ),
  listening: (
    <g className="phones">
      <path d="M5.8 14V11.6a6.2 6.2 0 0 1 12.4 0V14" />
      <rect x="4" y="13.2" width="3.6" height="5.6" rx="1.8" />
      <rect x="16.4" y="13.2" width="3.6" height="5.6" rx="1.8" />
    </g>
  ),
  writing: (
    <>
      <g className="pen">
        <path d="M4.5 19.5l4.2-1.4 9.6-9.6a2 2 0 0 0-2.8-2.8l-9.6 9.6z" />
        <path d="M5.9 15.3l2.8 2.8" />
      </g>
      <path className="pen-line" d="M13.5 20h6" />
    </>
  ),
  speaking: (
    <>
      <rect x="9.25" y="3" width="5.5" height="10.5" rx="2.75" />
      <path d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20M9.5 20h5" />
      <path className="wave wave-left" d="M4.2 8.2a5.2 5.2 0 0 0 0 5.6" />
      <path className="wave wave-right" d="M19.8 8.2a5.2 5.2 0 0 1 0 5.6" />
    </>
  ),
  knm: (
    <>
      <path d="M9.7 13h4.6l1.1 7.1a.8.8 0 0 1-.8.9H9.4a.8.8 0 0 1-.8-.9zM9.7 13a2.3 2.3 0 0 1 4.6 0" />
      <g className="sails">
        <path d="M7.4 4.4l9.2 9.2M16.6 4.4l-9.2 9.2" />
        <circle cx="12" cy="9" r="1.3" fill="var(--paper)" />
      </g>
    </>
  ),
  mock: (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M10.3 2.8h3.4M12 2.8v2.7" />
      <path className="hand" d="M12 13V9.2" />
    </>
  ),
  progress: (
    <>
      <path className="bar" d="M5.5 19v-4" />
      <path className="bar" d="M9.8 19V9.5" />
      <path className="bar" d="M14.2 19v-7" />
      <path className="bar" d="M18.5 19V5.5" />
    </>
  ),
  // The level check: a gauge with its needle up, for rows that lead to a check.
  check: (
    <>
      <path d="M5.6 16.4a7.5 7.5 0 1 1 12.8 0" />
      <path d="M12 12.5l4.3-3.5" />
      <circle cx="12" cy="12.5" r="1.2" fill="var(--paper)" />
    </>
  ),
};
// `motion` names the section the learner just navigated to; a new count remounts
// that icon so its CSS animation plays again on the next navigation.
export function NavIcon({ part, motion = undefined, size = 16 }) {
  const glyph = navGlyphs[part],
    animate = motion?.part === part;
  return glyph ? (
    <svg
      key={animate ? motion.count : 0}
      className={`nav-icon icon-${part}`}
      data-animate={animate || undefined}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  ) : null;
}
// A text field that grows with its content: no manual resize handle, never an inner scrollbar.
export function GrowingTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const field = ref.current;
    if (!field) return;
    field.style.height = 'auto';
    field.style.height = `${field.scrollHeight + 2}px`;
  }, [props.value]);
  return <textarea ref={ref} {...props} />;
}
// The address is stored in two halves and only assembled in the browser after mount, so
// the served HTML and the bundle never contain it whole. The link reads as an action;
// the address itself appears only in the mailto, with its subject.
export function ContactLink({
  email,
  label,
}: {
  email: { user: string; domain: string; subject?: string };
  label: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <span className="text-button">{label}</span>;
  const address = `${email.user}@${email.domain}`;
  return (
    <a
      className="text-button"
      href={`mailto:${address}${email.subject ? `?subject=${encodeURIComponent(email.subject)}` : ''}`}
    >
      {label}
    </a>
  );
}
export function KeyHint({ label = undefined }) {
  return (
    <span className="key-hint" aria-hidden="true">
      {label ?? (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6v5a3 3 0 0 1-3 3H6" />
          <path d="m9.5 10-4 4 4 4" />
        </svg>
      )}
    </span>
  );
}
// The label is SVG text anchored on the circle's centre; the baseline offset is
// half the cap height of Public Sans at 10px, so digits sit optically centred.
export function ProgressRing({ value, max, label, done = false }) {
  const fraction = max ? Math.min(1, Math.max(0, value / max)) : 0,
    length = 2 * Math.PI * 19;
  return (
    <span className={`ring ${done ? 'ring-done' : ''}`} aria-hidden="true">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="19" fill="none" stroke="var(--line)" strokeWidth="2.5" />
        {fraction > 0 && (
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke={done ? 'var(--ink)' : 'var(--action)'}
            strokeWidth="2.5"
            strokeDasharray={length}
            strokeDashoffset={length * (1 - fraction)}
            transform="rotate(-90 22 22)"
          />
        )}
        <text className="ring-label" x="22" y="25.6" textAnchor="middle">
          {label}
        </text>
      </svg>
    </span>
  );
}
export function PlayIcon({ playing }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {playing ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx=".5" />
          <rect x="14" y="5" width="4" height="14" rx=".5" />
        </>
      ) : (
        <path d="M8 5.3c0-.8.9-1.2 1.5-.8l10 6.6c.7.4.7 1.4 0 1.8l-10 6.6c-.6.4-1.5 0-1.5-.8z" />
      )}
    </svg>
  );
}
// The row arrow used by catalogue-style entries that lead somewhere.
export function Chevron() {
  return (
    <svg
      className="entry-chevron"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
// The three reasons on the start page, in the rounded shape language of the site
// (rounded rectangles, round caps) and each with one element in the evidence marker:
// a heart, an exam sheet with the chosen option marked, and a speech bubble with a
// marker line for feedback.
const reasonGlyphs = {
  exam: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
      <rect x="8" y="7.25" width="8" height="3.5" rx="1.75" fill="var(--icon-mark)" stroke="none" />
      <path d="M8.5 14h7M8.5 17h4.5" />
    </>
  ),
  free: (
    <path
      d="M12 18.75c-.4 0-7.5-4.3-7.5-9.4 0-2.4 1.9-4.1 4.1-4.1 1.5 0 2.7.8 3.4 2 .7-1.2 1.9-2 3.4-2 2.2 0 4.1 1.7 4.1 4.1 0 5.1-7.1 9.4-7.5 9.4z"
      fill="var(--icon-mark)"
    />
  ),
  feedback: (
    <>
      <path d="M6 4.5h12a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-6.2L8 19.7v-3.2H6A2.5 2.5 0 0 1 3.5 14V7A2.5 2.5 0 0 1 6 4.5z" />
      <rect x="7" y="9.25" width="8" height="2.5" rx="1.25" fill="var(--icon-mark)" stroke="none" />
    </>
  ),
};
export function ReasonIcon({ kind }) {
  return (
    <svg
      className={`reason-icon reason-${kind}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {reasonGlyphs[kind]}
    </svg>
  );
}

// A small play/pause button for one short clip: a question read aloud, a spoken cue, an instruction.
export function ClipButton({ src, playLabel, pauseLabel, caption = '' }) {
  const audio = useRef<HTMLAudioElement>(null),
    [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = audio.current;
    return () => el?.pause();
  }, []);
  const toggle = async () => {
    try {
      const el = audio.current;
      if (el.paused) await el.play();
      else el.pause();
    } catch {
      setPlaying(false);
    }
  };
  return (
    <span className="question-audio">
      <audio
        ref={audio}
        src={mediaUrl(src)}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        className="play-button play-button-small"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
      >
        <PlayIcon playing={playing} />
      </button>
      {caption && <span className="clip-caption">{caption}</span>}
    </span>
  );
}
