import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Menu } from '@base-ui/react/menu';
import { useStudyContext } from '../StudyContext';
import { Heading } from './ExerciseHeader';
import { Toggle } from './Controls';
import { restore } from '../domain/study';
import { MAX_PROFILES, NAME_LIMIT, profileSlot, type Profile } from '../domain/profiles';
import { OVERVIEW_PARTS, profileSummary } from '../domain/class-overview';

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
// The learner in use, shown in the sidebar (the phone header) while teacher mode is on,
// so answers never land in the wrong profile. Choosing another learner opens their start page.
export function ProfileSwitcher() {
  const { profiles, profile, switchStudent, go, t } = useStudyContext(),
    labelId = useId(),
    list = profiles.profiles?.list || [],
    current = list.find((p) => p.id === profile);
  return (
    <div className="profile-switcher">
      <span id={labelId} className="control-label">
        {t('Leerling', 'Learner')}
      </span>
      <Menu.Root>
        <Menu.Trigger className="profile-trigger" aria-describedby={labelId}>
          <span className="profile-name">{current?.name || '…'}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner side="bottom" align="start" sideOffset={6} collisionPadding={16}>
            <Menu.Popup className="profile-menu">
              <Menu.RadioGroup value={profile} onValueChange={(id) => switchStudent(id)}>
                {list.map((p) => (
                  <Menu.RadioItem key={p.id} value={p.id} className="profile-item" closeOnClick>
                    <span className="profile-check" aria-hidden="true">
                      <Menu.RadioItemIndicator>✓</Menu.RadioItemIndicator>
                    </span>
                    <span>{p.name}</span>
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
              <Menu.Separator className="profile-separator" />
              <Menu.Item className="profile-item" onClick={() => go('teachers')}>
                <span className="profile-check" aria-hidden="true" />
                <span>{t('Klas beheren', 'Manage class')}</span>
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}

function NameForm({ label, submit, onSubmit }) {
  const [name, setName] = useState(''),
    id = useId();
  return (
    <form
      className="profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim() && onSubmit(name)) setName('');
      }}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={name}
        maxLength={NAME_LIMIT}
        autoComplete="off"
        placeholder={label}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="secondary" disabled={!name.trim()}>
        {submit}
      </button>
    </form>
  );
}

// Small line icons in the house stroke style for the row actions.
const iconPaths = {
  rename:
    'M14.5 5.5l4 4M4 20l1-4.5L15.5 5a1.4 1.4 0 0 1 2 0l1.5 1.5a1.4 1.4 0 0 1 0 2L8.5 19 4 20Z',
  delete: 'M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5',
  save: 'M5 12.5l4.5 4.5L19 7.5',
  cancel: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
};
function RowIcon({ kind }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[kind]} />
    </svg>
  );
}
function IconButton({ kind, label, target = '', ...props }) {
  return (
    <button
      type="button"
      className={`row-icon ${kind === 'delete' ? 'danger' : ''}`}
      data-action={kind}
      aria-label={target ? `${label}: ${target}` : label}
      title={label}
      {...props}
    >
      <RowIcon kind={kind} />
    </button>
  );
}
// Renaming happens in place: the name becomes a field the height of a line, with save and
// cancel beside it, so the row keeps its shape.
function RenameField({ initial, onSave, onCancel }) {
  const { t } = useStudyContext(),
    [value, setValue] = useState(initial),
    field = useRef<HTMLInputElement>(null);
  // The current name is selected, so typing replaces it.
  useEffect(() => {
    field.current?.focus();
    field.current?.select();
  }, []);
  return (
    <form
      className="class-rename"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSave(value);
      }}
    >
      <input
        type="text"
        value={value}
        maxLength={NAME_LIMIT}
        autoComplete="off"
        aria-label={t('Naam', 'Name')}
        ref={field}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel();
        }}
      />
      <IconButton kind="save" label={t('Bewaren', 'Save')} type="submit" disabled={!value.trim()} />
      <IconButton kind="cancel" label={t('Annuleren', 'Cancel')} onClick={onCancel} />
    </form>
  );
}

function ClassRow({ p, summary, active, editing, setEditing }) {
  const { t, name, profiles, switchStudent, state } = useStudyContext(),
    [confirming, setConfirming] = useState(false),
    renameButton = useRef<HTMLButtonElement>(null),
    wasEditing = useRef(editing),
    date = summary.last
      ? new Intl.DateTimeFormat(state.settings.lang === 'nl' ? 'nl-NL' : 'en-GB', {
          day: 'numeric',
          month: 'short',
        }).format(summary.last)
      : '—';
  // Closing the field returns focus to the pencil it came from.
  useEffect(() => {
    if (wasEditing.current && !editing) renameButton.current?.focus();
    wasEditing.current = editing;
  }, [editing]);
  return (
    <tr data-profile={p.id} aria-current={active || undefined} data-editing={editing || undefined}>
      <th scope="row">
        {editing ? (
          <RenameField
            initial={p.name}
            onSave={(value) => {
              if (profiles.rename(p.id, value)) setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <span className="class-name">{p.name}</span>
        )}
        {active && <span className="class-active">{t('Oefent nu', 'Practising now')}</span>}
      </th>
      <td data-label={t('Niveau', 'Level')}>{summary.level}</td>
      {OVERVIEW_PARTS.map((part) => {
        const s = summary.parts[part];
        return (
          <td key={part} data-label={name(part)}>
            <span className="class-count">
              {s.done}
              <span>/{s.total}</span>
            </span>
            {s.score !== null && <span className="class-score">{s.score}%</span>}
          </td>
        );
      })}
      <td data-label={t('Fouten', 'Mistakes')}>{summary.toReview || '—'}</td>
      <td data-label={t('Laatst', 'Last')}>{date}</td>
      <td className="class-actions" data-confirming={confirming || undefined}>
        {confirming ? (
          <span className="class-confirm" role="group" aria-label={p.name}>
            <span>{t('Profiel en voortgang wissen?', 'Delete profile and progress?')}</span>
            <button
              type="button"
              className="text-button danger"
              data-action="confirm-delete"
              onClick={() => {
                profiles.remove(p.id);
                setConfirming(false);
              }}
            >
              {t('Wissen', 'Delete')}
            </button>
            <button
              type="button"
              className="text-button"
              data-action="keep"
              autoFocus
              onClick={() => setConfirming(false)}
            >
              {t('Annuleren', 'Cancel')}
            </button>
          </span>
        ) : (
          // The same order in the table and on a card, right-aligned: the text action, then the
          // pencil and the bin. The learner in use keeps an empty place for the bin, so the
          // pencils line up from row to row.
          <span className="class-buttons">
            {!active && (
              <button
                type="button"
                className="text-button"
                data-action="switch"
                onClick={() => switchStudent(p.id)}
              >
                {t('Laten oefenen', 'Switch to')}
              </button>
            )}
            <span className="class-icons">
              <IconButton
                kind="rename"
                label={t('Naam wijzigen', 'Rename')}
                target={p.name}
                ref={renameButton}
                disabled={editing}
                onClick={() => setEditing(p.id)}
              />
              {active ? (
                <span className="row-icon-space" aria-hidden="true" />
              ) : (
                <IconButton
                  kind="delete"
                  label={t('Verwijderen', 'Delete')}
                  target={p.name}
                  onClick={() => setConfirming(true)}
                />
              )}
            </span>
          </span>
        )}
      </td>
    </tr>
  );
}

// "Voor docenten": the switch for teacher mode and, while it is on, the class overview where
// learners are added, renamed, selected and deleted.
export function Teachers() {
  const { t, name, profiles, profile, state, catalogue } = useStudyContext(),
    [problem, setProblem] = useState(false),
    [editing, setEditing] = useState<string | null>(null),
    list: Profile[] = profiles.profiles?.list || [];
  // The learner in use is read from memory, the others from their saved progress.
  const summaries = useMemo(() => {
    if (!profiles.teacher) return {};
    const storage = browserStorage();
    return Object.fromEntries(
      list.map((p) => [
        p.id,
        profileSummary(
          p.id === profile ? state : restore(storage, catalogue, profileSlot(p.id)),
          catalogue,
        ),
      ]),
    );
  }, [profiles.profiles, profile, state, catalogue]);
  const report = (ok: boolean) => {
    setProblem(!ok);
    return ok;
  };
  return (
    <>
      <Heading
        title={t('Voor docenten', 'For teachers')}
        subtitle={t(
          'Laat meerdere leerlingen om de beurt op één apparaat oefenen.',
          'Let several learners take turns practising on one device.',
        )}
      />
      <div className="teacher-page">
        <p>
          {t(
            'Elke leerling krijgt een eigen profiel met eigen voortgang en niveau. Je wisselt van leerling bovenaan het menu. Alles blijft in deze browser; namen gaan niet naar de server.',
            'Each learner gets a profile with their own progress and level. Switch learners at the top of the menu. Everything stays in this browser; names never reach the server.',
          )}
        </p>
        {/* Rendered once the registry is read: a switch drawn off and then turned on would
            play its animation on every visit. Until then its place is kept. */}
        <div className="teacher-switch">
          {profiles.loaded && (
            <Toggle
              label={t('Docentmodus', 'Teacher mode')}
              checked={profiles.teacher}
              onChange={(on) =>
                report(on ? profiles.enable(t('Leerling 1', 'Learner 1')) : profiles.disable())
              }
            />
          )}
        </div>
        {problem && (
          <p className="storage-notice" role="alert">
            {t(
              'Opslaan in deze browser lukt niet. Controleer of de browser sitegegevens bewaart.',
              'This browser cannot save. Check that it keeps site data.',
            )}
          </p>
        )}
        {!profiles.teacher && list.length > 1 && (
          <p className="note">
            {t(
              `Er staan ${list.length} profielen op dit apparaat. Zet docentmodus aan om ze te zien.`,
              `There are ${list.length} profiles on this device. Turn on teacher mode to see them.`,
            )}
          </p>
        )}
        {profiles.teacher && (
          <>
            <h2>{t('Klas', 'Class')}</h2>
            <div className="class-table-wrap">
              <table className="class-table">
                <thead>
                  <tr>
                    <th scope="col">{t('Leerling', 'Learner')}</th>
                    <th scope="col">{t('Niveau', 'Level')}</th>
                    {OVERVIEW_PARTS.map((part) => (
                      <th scope="col" key={part}>
                        {name(part)}
                      </th>
                    ))}
                    <th scope="col">{t('Fouten', 'Mistakes')}</th>
                    <th scope="col">{t('Laatst', 'Last')}</th>
                    <th scope="col">
                      <span className="sr-only">{t('Acties', 'Actions')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) =>
                    summaries[p.id] ? (
                      <ClassRow
                        key={p.id}
                        p={p}
                        summary={summaries[p.id]}
                        active={p.id === profile}
                        editing={editing === p.id}
                        setEditing={setEditing}
                      />
                    ) : null,
                  )}
                </tbody>
              </table>
            </div>
            <p className="note class-note">
              {t(
                'Afgerond op het niveau van de leerling, met % goed bij meerkeuzevragen.',
                "Completed at the learner's level, with % correct on multiple-choice questions.",
              )}
            </p>
            {list.length < MAX_PROFILES ? (
              <NameForm
                label={t('Voornaam of initialen', 'First name or initials')}
                submit={t('Leerling toevoegen', 'Add learner')}
                onSubmit={(value) => report(profiles.add(value))}
              />
            ) : (
              <p className="note">
                {t(
                  `Dit apparaat heeft het maximum van ${MAX_PROFILES} profielen.`,
                  `This device has the maximum of ${MAX_PROFILES} profiles.`,
                )}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
