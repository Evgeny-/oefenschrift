import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useStudyContext } from '../StudyContext';
import { summary, mistakes, savedSetSession, flatten, restore } from '../domain/study';
import { typeLabel, unitLabel } from '../domain/labels';
import { Segments, Toggle, ProgressRing, Chevron } from './Controls';
import { Heading } from './ExerciseViews';
import { checkDate, checkLine } from './LevelCheck';
import AppLink from './AppLink';
import useSelectionIndicator from './useSelectionIndicator';
function ListFilters({ filter, onChange, includeAll = true, includeDrafts = false }) {
  const { t } = useStudyContext(),
    indicator = useSelectionIndicator(filter);
  const options = [
    ...(includeDrafts ? [['drafts', t('Concepten', 'Drafts')]] : []),
    ...(includeAll ? [['all', t('Alle oefensets', 'All practice sets')]] : []),
    ['done', t('Afgerond', 'Completed')],
    ['mistakes', t('Fouten herhalen', 'Review mistakes')],
  ];
  return (
    <div
      ref={indicator.ref}
      className="list-filters"
      data-positioned={indicator.positioned || undefined}
      data-animated={indicator.animated || undefined}
      aria-label={t('Oefeningen filteren', 'Filter exercises')}
    >
      {options.map(([value, label]) => (
        <button
          key={value}
          data-label={label}
          data-choice={value}
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
      <span className="filter-indicator" aria-hidden="true" style={indicator.style} />
    </div>
  );
}
export function Catalogue({ part }) {
  const { state, t, name, itemsFor, setting, practiceSets } = useStudyContext(),
    [filter, setFilter] = useState('all'),
    items = itemsFor(part),
    knm = part === 'knm';
  // Sets are numbered in the order they were added; the newest additions lead the catalogue.
  const sets = practiceSets
    .filter((set) => set.part === part && (knm || set.level === state.settings.level))
    .sort((a, b) => b.number - a.number);
  const visible = sets.filter((set) =>
    filter === 'done'
      ? set.ids.every((id) => state.records[id]?.completed)
      : filter === 'mistakes'
        ? set.ids.some(
            (id) =>
              mistakes(
                items.find((i) => i.id === id),
                state.records[id],
              ).length,
          )
        : true,
  );
  const questions = items.reduce((total, item) => total + (item.questions?.length || 0), 0);
  const subtitle = `${knm ? 'KNM' : state.settings.level} · ${sets.length} ${t('oefensets', 'practice sets')} · ${items.length} ${unitLabel(part, items.length, state.settings.lang)}${questions ? ` · ${questions} ${t('vragen', 'questions')}` : ''}`;
  return (
    <>
      <Heading title={name(part)} subtitle={subtitle} />
      {sets.length ? (
        <>
          <ListFilters filter={filter} onChange={setFilter} />
          {filter === 'mistakes' && visible.length > 0 && (
            <p className="note review-hint">
              {t(
                'Herhaal een set met vragen die je eerder fout had.',
                'Retry a set containing questions you previously missed.',
              )}
            </p>
          )}
          <PracticeSetList sets={visible} restart={filter === 'mistakes'} />
          {!visible.length && (
            <p className="note">
              {filter === 'mistakes'
                ? t('Geen opgeslagen fouten om te herhalen.', 'No saved mistakes to review.')
                : t('Nog geen afgeronde sets.', 'No completed sets yet.')}
            </p>
          )}
        </>
      ) : (
        <div className="empty">
          <h2>{t('Nog geen oefeningen op dit niveau', 'No exercises at this level yet')}</h2>
          <p>
            {t(
              'A2 en B1 hebben oefeningen voor alle taalonderdelen.',
              'A2 and B1 have exercises for each language skill.',
            )}
          </p>
          {state.settings.level !== 'A2' && (
            <button className="secondary" onClick={() => setting('level', 'A2')}>
              {t('Bekijk A2', 'View A2')}
            </button>
          )}
        </div>
      )}
    </>
  );
}
function PracticeSetList({ sets, restart = false }) {
  const { state, t, catalogue, startSet } = useStudyContext(),
    lang = state.settings.lang;
  return (
    <ul className="exercise-list">
      {sets.map((set) => {
        const items = set.ids.map((id) => catalogue.find((item) => item.id === id)),
          closed = !!items[0]?.questions;
        const count = set.ids.filter((id) => state.records[id]?.completed).length,
          saved = savedSetSession(state, set),
          resume = saved && !saved.endedAt && !restart;
        const questions = items.reduce((total, item) => total + (item.questions?.length || 0), 0);
        const types = [
          ...new Set(items.map((item) => typeLabel(item.taskType, lang)).filter(Boolean)),
        ];
        const scored = items.filter((item) => state.records[item.id]?.kind === 'quiz'),
          correct = scored.reduce((n, item) => n + state.records[item.id].correct, 0),
          total = scored.reduce((n, item) => n + state.records[item.id].total, 0);
        // The ring counts answered questions for closed sets and reviewed tasks for open ones.
        const pool = resume && closed ? flatten(saved, catalogue) : [],
          done = count === set.ids.length;
        const answered = closed
            ? resume
              ? pool.filter((x) => Object.hasOwn(saved.answers, x.key)).length
              : done
                ? questions
                : Math.round((questions * count) / set.ids.length)
            : count,
          max = closed ? (resume ? pool.length : questions) : set.ids.length;
        // The ring already shows how far a set is; words are reserved for the first score of a finished set.
        const status =
          done && total ? `${correct} ${t('van', 'of')} ${total} ${t('goed', 'correct')}` : null;
        const state_ = resume
          ? t('Verdergaan', 'Continue')
          : done
            ? t('Afgerond', 'Completed')
            : count
              ? t('Deels gedaan', 'Partly done')
              : t('Nog niet gestart', 'Not started');
        return (
          <li key={set.id}>
            <AppLink
              className="exercise-entry"
              data-set={set.id}
              to={`set/${set.id}`}
              onNavigate={() => startSet(set, restart)}
            >
              <span className="exercise-entry-copy">
                <h3>
                  {t('Oefenset', 'Practice set')} {set.number}
                </h3>
                <span className="entry-texts" lang="nl">
                  {items.map((item) => item.title).join(' · ')}
                </span>
                <small>
                  {set.ids.length} {unitLabel(set.part, set.ids.length, lang)}
                  {questions ? ` · ${questions} ${t('vragen', 'questions')}` : ''}
                  {types.length ? ` · ${types.join(', ').toLowerCase()}` : ''}
                </small>
              </span>
              <span className="exercise-status">{status}</span>
              <span className="sr-only">
                {state_} · {answered} {t('van', 'of')} {max}
              </span>
              <ProgressRing value={answered} max={max} label={`${answered}/${max}`} done={done} />
            </AppLink>
          </li>
        );
      })}
    </ul>
  );
}
function ExerciseList({ items, retry = false }) {
  const { state, t, open } = useStudyContext();
  return (
    <ul className="exercise-list">
      {items.map((item) => {
        const record = state.records[item.id],
          done = record?.completed,
          draft = !done && !item.questions && state.drafts[item.id]?.trim();
        const detail = retry
          ? `${t('Hele oefening herhalen', 'Retry full exercise')} · ${mistakes(item, record).length} ${t('te herhalen', 'to revisit')}`
          : done && item.questions
            ? `${record.correct}/${record.total} ${t('goed', 'correct')}`
            : item.questions
              ? `${item.questions.length} ${item.questions.length === 1 ? t('vraag', 'question') : t('vragen', 'questions')}`
              : t('Open opdracht', 'Open response');
        return (
          <li key={item.id}>
            <AppLink
              className="exercise-entry"
              data-item={item.id}
              to={`exercise/${item.id}`}
              onNavigate={() => open(item)}
            >
              <span className="exercise-entry-copy">
                <h3 lang="nl">{item.title}</h3>
                <small>{detail}</small>
              </span>
              <span className="exercise-status">
                {done ? (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    {t('Afgerond', 'Completed')}
                  </>
                ) : draft ? (
                  t('Concept', 'Draft')
                ) : null}
              </span>
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
            </AppLink>
          </li>
        );
      })}
    </ul>
  );
}
export function MockSetup() {
  const { state, setting, t, itemsFor, name, start, go, catalogue } = useStudyContext(),
    [part, setPart] = useState('reading'),
    items = itemsFor(part),
    count = items.reduce((n, i) => n + i.questions.length, 0),
    a = state.active;
  const activePart = a && catalogue.find((i) => i.id === a.ids[0])?.part;
  const subjects = ['reading', 'listening', ...(itemsFor('knm').length ? ['knm'] : [])];
  return (
    <>
      <Heading
        title={t('Proefexamen', 'Practice test')}
        subtitle={t(
          'Beantwoord alle vragen. Je krijgt de uitleg na afloop.',
          'Answer every question. Explanations follow at the end.',
        )}
      />
      {a?.mode === 'mock' &&
        !a.endedAt &&
        (activePart === 'knm' || a.level === state.settings.level) && (
          <div className="resume">
            <span>
              {name(activePart)}
              {activePart === 'knm' ? '' : ` · ${a.level}`}
            </span>
            <button className="text-button" onClick={() => go('session')}>
              {t('Verdergaan', 'Continue')}
            </button>
          </div>
        )}
      <div className="mock-form">
        <Segments
          label={t('Onderdeel', 'Subject')}
          value={part}
          options={subjects.map((value) => ({ value, label: name(value) }))}
          onChange={setPart}
        />
        <p className="mock-count">
          {part === 'knm' ? 'KNM' : state.settings.level} · {count} {t('vragen', 'questions')}
        </p>
        <Toggle
          label={t('Verstreken tijd tonen', 'Show elapsed time')}
          checked={state.settings.clock}
          onChange={(v) => setting('clock', v)}
        />
        <p className="note">
          {t(
            'Een korte set met eigen oefenvragen. Geen volledig officieel examen. De klok telt alleen de tijd dat je oefent.',
            'A short set of original practice questions, not a full official exam. The clock counts only the time you spend practising.',
          )}
        </p>
        <div className="actions">
          <button
            className="primary"
            disabled={!count}
            onClick={() =>
              start(
                items.map((i) => i.id),
                'mock',
              )
            }
          >
            {t('Start proefexamen', 'Start practice test')}
          </button>
        </div>
        {!count && (
          <p className="note">
            {t(
              'Voor deze combinatie zijn nog geen vragen beschikbaar.',
              'No questions are available for this combination yet.',
            )}
          </p>
        )}
      </div>
    </>
  );
}
// Progress moves between browsers as a JSON file; imported records win only when they are newer.
function ProgressTransfer() {
  const { state, setState, t, catalogue } = useStudyContext(),
    [message, setMessage] = useState(''),
    file = useRef<HTMLInputElement>(null);
  const exportProgress = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            version: 2,
            exported: new Date().toISOString(),
            records: state.records,
            drafts: state.drafts,
            reviews: state.reviews,
          },
          null,
          1,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob),
      link = document.createElement('a');
    link.href = url;
    link.download = `oefenschrift-voortgang-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const importProgress = async (event) => {
    const chosen = event.target.files?.[0];
    event.target.value = '';
    if (!chosen) return;
    try {
      const raw = await chosen.text(),
        parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 2) throw Error();
      const imported = restore({ getItem: () => raw }, catalogue);
      let records = 0,
        drafts = 0;
      setState((s) => {
        const next = {
          ...s,
          records: { ...s.records },
          drafts: { ...s.drafts },
          reviews: { ...s.reviews },
        };
        for (const [id, record] of Object.entries(imported.records))
          if (!next.records[id] || next.records[id].at < record.at) {
            next.records[id] = record;
            records++;
          }
        for (const [id, draft] of Object.entries(imported.drafts))
          if (draft.trim() && !next.drafts[id]?.trim()) {
            next.drafts[id] = draft;
            if (imported.reviews[id]) next.reviews[id] = imported.reviews[id];
            drafts++;
          }
        // Level checks merge by start time, newest first.
        const known = new Set((s.checks || []).map((c) => c.startedAt));
        next.checks = [
          ...(s.checks || []),
          ...imported.checks.filter((c) => !known.has(c.startedAt)),
        ]
          .sort((a, b) => b.startedAt - a.startedAt)
          .slice(0, 20);
        return next;
      });
      setMessage(
        t(
          `Geïmporteerd: ${records} ${records === 1 ? 'resultaat' : 'resultaten'} en ${drafts} ${drafts === 1 ? 'concept' : 'concepten'}.`,
          `Imported ${records} ${records === 1 ? 'result' : 'results'} and ${drafts} ${drafts === 1 ? 'draft' : 'drafts'}.`,
        ),
      );
    } catch {
      setMessage(
        t(
          'Dit bestand is geen voortgangsbestand van deze site.',
          'This file is not a progress file from this site.',
        ),
      );
    }
  };
  return (
    <div className="progress-transfer">
      <button className="text-button" onClick={exportProgress}>
        {t('Voortgang exporteren', 'Export progress')}
      </button>
      <button className="text-button" onClick={() => file.current?.click()}>
        {t('Importeren', 'Import')}
      </button>
      <input
        ref={file}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={importProgress}
      />
      {message && (
        <span className="small" role="status">
          {message}
        </span>
      )}
    </div>
  );
}
export function Progress() {
  // ?filter=mistakes (from the start page) opens the matching view directly.
  const requested = new URLSearchParams(useLocation().search).get('filter');
  const { state, t, catalogue, itemsFor, name } = useStudyContext(),
    [filter, setFilter] = useState(
      ['drafts', 'done', 'mistakes'].includes(requested) ? requested : 'done',
    ),
    items = catalogue.filter((i) => i.level === state.settings.level || i.part === 'knm'),
    n = summary(items, state.records),
    done = items
      .filter((i) => state.records[i.id]?.completed)
      .sort((a, b) => state.records[b.id].at - state.records[a.id].at),
    missed = items.filter((i) => mistakes(i, state.records[i.id]).length),
    drafts = items.filter(
      (i) => !i.questions && !state.records[i.id]?.completed && state.drafts[i.id]?.trim(),
    ),
    // The last three level checks at this level, newest first.
    checks = (state.checks || []).filter((c) => c.level === state.settings.level).slice(0, 3);
  const visible = filter === 'drafts' ? drafts : filter === 'mistakes' ? missed : done,
    hasKnm = itemsFor('knm').length > 0;
  return (
    <>
      <Heading
        title={t('Jouw voortgang', 'Your progress')}
        subtitle={t('Bewaard in deze browser.', 'Saved in this browser.')}
      />
      {checks.length > 0 && (
        <ul className="exercise-list check-history">
          {checks.map((check) => (
            <li key={check.startedAt}>
              <AppLink
                className="exercise-entry"
                data-check={check.startedAt}
                to="check-result"
                search={`?at=${check.startedAt}`}
              >
                <span className="exercise-entry-copy">
                  <h3>
                    {t('Niveaucheck', 'Level check')} {state.settings.level} ·{' '}
                    {checkDate(check, state.settings.lang)}
                  </h3>
                  <small>{checkLine(check, catalogue, t, name)}</small>
                </span>
                <span className="exercise-status">{t('Resultaat', 'Result')}</span>
                <Chevron />
              </AppLink>
            </li>
          ))}
        </ul>
      )}
      <div className="result-total">
        <strong>
          {n.completed}
          <span> / {n.total}</span>
        </strong>
        <span>
          {state.settings.level}
          {hasKnm ? ' + KNM' : ''} · {t('oefeningen afgerond', 'exercises completed')}
        </span>
      </div>
      <div className="progress-subjects">
        {['reading', 'listening', 'writing', 'speaking', ...(hasKnm ? ['knm'] : [])].map((part) => {
          const s = summary(itemsFor(part), state.records);
          return (
            <div key={part}>
              <span>{name(part)}</span>
              <progress max={s.total || 1} value={s.completed} aria-label={name(part)} />
              <span>
                {s.completed}/{s.total}
              </span>
            </div>
          );
        })}
      </div>
      <ListFilters filter={filter} onChange={setFilter} includeAll={false} includeDrafts />
      {filter === 'mistakes' && visible.length > 0 && (
        <p className="note review-hint">
          {t(
            'Elke keuze start de hele oefening opnieuw.',
            'Each choice restarts the full exercise.',
          )}
        </p>
      )}
      {visible.length ? (
        <ExerciseList items={visible} retry={filter === 'mistakes'} />
      ) : (
        <p className="note">
          {filter === 'drafts'
            ? t('Nog geen concepten.', 'No unfinished drafts.')
            : filter === 'mistakes'
              ? t('Geen opgeslagen fouten om te herhalen.', 'No saved mistakes to review.')
              : t(
                  'Na je eerste oefening verschijnt hier je resultaat.',
                  'Your results will appear here after your first exercise.',
                )}
        </p>
      )}
      <p className="note">
        {t(
          'Als je de sitegegevens wist, verdwijnen ook je voortgang en concepten. Bewaar een kopie of zet je voortgang over naar een andere browser.',
          'Clearing site data removes your progress and drafts. Keep a copy, or move your progress to another browser.',
        )}
      </p>
      <ProgressTransfer />
    </>
  );
}
export function About() {
  const { t } = useStudyContext();
  return (
    <>
      <Heading title={t('Over de oefeningen', 'About the exercises')} />
      <div className="about">
        <p>
          {t(
            'Oefenschrift biedt gratis oefeningen voor lezen, luisteren, schrijven en spreken op A2 en B1, en voor Kennis van de Nederlandse Maatschappij (KNM). Je oefent in korte sets en kunt later verdergaan waar je was gebleven.',
            'Oefenschrift offers free practice for reading, listening, writing and speaking at A2 and B1, plus knowledge of Dutch society (KNM). You work in short sets that you can pause and return to.',
          )}
        </p>
        <h2>{t('Waarom zo oefenen?', 'Why practise this way?')}</h2>
        <p>
          {t(
            'De opdrachten gaan over situaties waarin je Nederlands nodig hebt, zoals een bericht van je verhuurder begrijpen of een probleem op het werk uitleggen. Het niveau bepaalt de lengte van het materiaal en wat je ermee moet doen. Bij B1 moet je bijvoorbeeld informatie uit verschillende alinea’s combineren of je keuze met redenen uitleggen.',
            'The tasks use situations where you need Dutch, such as understanding a message from your landlord or explaining a problem at work. The level guides the length of the material and what you need to do with it. B1 tasks may ask you to combine information across paragraphs or explain the reasons for a choice.',
          )}
        </p>
        <p>
          {t(
            'Bij lezen en luisteren verwijst de uitleg naar de passage waaruit het antwoord volgt. Zo kun je terugvinden welk detail je hebt gemist. Schrijf- en spreekopdrachten maken duidelijk wat je antwoord moet overbrengen. Zelf nakijken en AI-feedback volgen die punten, zodat je bij een volgende poging weet waaraan je kunt werken.',
            'In reading and listening, the explanation points to the passage that supports the answer. You can see which detail you missed. Writing and speaking tasks set out what your answer needs to communicate. Self-review and AI feedback follow those requirements, giving you something specific to work on in your next attempt.',
          )}
        </p>
        <h2>{t('Hoe we de inhoud nakijken', 'How we check the content')}</h2>
        <p>
          {t(
            'De oefeningen worden met AI geschreven volgens een opzet die is gebaseerd op officiële oefenmaterialen voor A2 en B1. De teksten en situaties zijn nieuw geschreven. Een aparte AI-beoordelaar leest elke opgave volledig en controleert de taal en antwoordlogica. Bij meerkeuzevragen onderzoekt die ook of een ander antwoord toch juist kan zijn. Aanpassingen worden opnieuw nagekeken voordat ze op de site komen.',
            'The exercises are written with AI from a blueprint informed by official A2 and B1 practice materials. Texts and situations are newly written. A separate AI reviewer reads every exercise in full and checks its language and answer logic. For multiple-choice questions, it also checks whether another option could be correct. Revisions are reviewed before publication.',
          )}
        </p>
        <p>
          {t(
            'Bij KNM bewaren we de bron van de verantwoordelijke overheidsinstantie en de datum waarop die is gecontroleerd. Luisterfragmenten gebruiken gegenereerde stemmen uit Nederland. Spraakherkenning vergelijkt de opname met het nagekeken script om afwijkende woorden op te sporen.',
            'KNM questions record a source from the responsible public body and the date it was checked. Listening clips use generated Netherlands Dutch voices. Speech recognition compares the recording with the reviewed script to catch wording errors.',
          )}
        </p>
        <p>
          {t('Je kunt onze ', 'You can read our ')}
          <a href="https://github.com/Evgeny-/oefenschrift/blob/main/content/reviews/rubric.md">
            {t('beoordelingscriteria', 'review checklist')}
          </a>
          {t(' en ', ' and ')}
          <a href="https://github.com/Evgeny-/oefenschrift/tree/main/content/reviews">
            {t('beoordelingsverslagen', 'review reports')}
          </a>
          {t(' openbaar inzien.', '.')}
        </p>
        <h2>{t('Wat nog onderzocht moet worden', 'What still needs testing')}</h2>
        <p>
          {t(
            'A2 en B1 zijn de beoogde niveaus. De moeilijkheid is nog niet vastgesteld door een NT2-docent of getest met cursisten. We hebben ook niet onderzocht of oefenen op deze site de examenresultaten verbetert. Een volledige luisterbeoordeling door een specialist moet nog gebeuren. De site is onafhankelijk van DUO; je score voorspelt niet of je slaagt.',
            'A2 and B1 are target levels. Difficulty has not yet been validated by an NT2 teacher or tested with learners. We have not measured whether using this site improves exam results. A complete specialist listening review is still pending. The site is independent of DUO; your score does not predict whether you will pass.',
          )}
        </p>
        <h2>{t('Aan de slag', 'Using the exercises')}</h2>
        <p>
          {t('Oefen daarnaast met de ', 'Also use the ')}
          <a
            href={t(
              'https://www.inburgeren.nl/examen-doen/oefenen.jsp',
              'https://www.inburgeren.nl/en/taking-the-integration-exam/practicing.jsp',
            )}
          >
            {t('officiële oefenexamens van DUO', 'official DUO practice exams')}
          </a>
          {t(' en de ', ' and the ')}
          <a href="https://www.staatsexamensnt2.nl/voorbereiden/examens-oefenen">
            {t('oefenmaterialen voor het Staatsexamen NT2', 'Staatsexamen NT2 practice materials')}
          </a>
          {t(
            ' om het examen zelf te leren kennen. Klopt iets niet in een opgave? Kies daar ‘Meld een probleem’, dan komt je melding in de lijst om na te kijken.',
            ' to get familiar with the exam itself. If something seems wrong in an exercise, choose ‘Report a problem’ there so it can be reviewed.',
          )}
        </p>
        <p>
          {t(
            'Je kunt de interface in het Nederlands of Engels gebruiken; oefenteksten blijven Nederlands. Controleer bij spreken je transcript voordat je feedback vraagt. In een oefenset kun je meerkeuzevragen ook met het toetsenbord beantwoorden: toets het cijfer of de letter van een antwoord in; Enter controleert en gaat verder.',
            'The interface supports Dutch and English; exercise texts stay Dutch. When speaking, check your transcript before requesting feedback. In a practice set, press an answer’s number or letter to choose it with the keyboard; Enter checks and continues.',
          )}
        </p>
      </div>
    </>
  );
}
