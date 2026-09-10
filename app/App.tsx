import type { Exercise, PracticeSet as PracticeSetDefinition, ServiceStatus } from './types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useStudy, { rememberPreferences } from './useStudy';
import { StudyContext } from './StudyContext';
import { startSession, matchesSet, savedSetSession, flatten } from './domain/study';
import { unitLabel } from './domain/labels';
import { trackVisit } from './domain/telemetry';
import { NavIcon, ContactLink } from './components/Controls';
import { stateForRoute } from './domain/render-state';
import { resolveTheme } from './domain/theme';
import LevelNavigation from './components/LevelNavigation';
import Preferences from './components/Preferences';
import AppLink from './components/AppLink';
import {
  readRoute,
  routePath,
  localizePath,
  sessionRoute,
  routeLevel,
  routeLang,
} from './domain/routes';
import { Catalogue, MockSetup, Progress, About } from './components/CatalogueViews';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import { Session, OpenExercise, Heading, PracticeSet } from './components/ExerciseViews';
import Home from './components/Home';
import { LevelCheck, CheckResult } from './components/LevelCheck';
import { checkInProgress } from './domain/check';
import Wordmark from './components/Wordmark';
import site from '../content/site.json';
import useDisclosureMotion from './components/useDisclosureMotion';
import { withBase } from './domain/base';
const labels = {
  reading: ['Lezen', 'Reading'],
  listening: ['Luisteren', 'Listening'],
  writing: ['Schrijven', 'Writing'],
  speaking: ['Spreken', 'Speaking'],
  knm: ['KNM', 'KNM'],
  mock: ['Proefexamen', 'Practice test'],
  progress: ['Voortgang', 'Progress'],
};
export default function App({
  catalogue,
  practiceSets,
  initialState,
  services,
  renderedAt,
}: {
  catalogue: Exercise[];
  practiceSets: PracticeSetDefinition[];
  initialState: any;
  services: ServiceStatus;
  renderedAt: number;
}) {
  const location = useLocation(),
    navigate = useNavigate();
  const route = readRoute({ ...location, hash: '' }, null);
  // The address carries the level and the language (/en): both override whatever this
  // browser stored, so a copied link opens the way it was copied.
  const explicitLevel = routeLevel(location),
    lang = routeLang(location) || 'nl';
  const study = useStudy(catalogue, initialState, location.pathname, (state) =>
      stateForRoute(
        {
          ...state,
          settings: { ...state.settings, level: explicitLevel || state.settings.level, lang },
        },
        route,
        catalogue,
        practiceSets,
        renderedAt,
      ),
    ),
    { state, setState, saved } = study;
  const [api, setApi] = useState<ServiceStatus | null>(services);
  const statusRequest = useRef<AbortController | null>(null);
  // A refused paid call switches the interface to self-review or typing immediately and
  // re-reads the status, which also brings a service back once it is available again.
  const refreshApi = useCallback(
    (unavailable?: 'feedback' | 'speech', reason: 'paused' | 'allowance' = 'paused') => {
      if (typeof window === 'undefined' || window.location.protocol === 'file:') return;
      if (unavailable && reason === 'allowance') {
        setApi((s) => ({
          ...(s || { feedback: false }),
          remaining: { feedback: 1e9, speech: 1e9, ...s?.remaining, [unavailable]: 0 },
        }));
        return;
      }
      if (unavailable)
        setApi((s) => ({
          ...(s || { feedback: false }),
          [unavailable]: false,
          [unavailable + 'Paused']: true,
        }));
      statusRequest.current?.abort();
      const controller = new AbortController();
      statusRequest.current = controller;
      fetch(withBase('/api/status'), { signal: controller.signal })
        .then((r) => (r.ok ? r.json() : { feedback: false }))
        .then((status) => {
          if (!controller.signal.aborted) setApi(status);
        })
        .catch(() => {
          if (!controller.signal.aborted) setApi({ feedback: false });
        });
    },
    [],
  );
  useEffect(() => {
    if (window.location.protocol === 'file:') {
      setApi({ feedback: false });
      return;
    }
    refreshApi();
    const onVisible = () => {
      if (!document.hidden) refreshApi();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      statusRequest.current?.abort();
    };
  }, []);
  const t = (nl, en) => (state.settings.lang === 'nl' ? nl : en),
    name = (part) => {
      const label = labels[part] || labels.reading;
      return t(label[0], label[1]);
    };
  const itemsFor = (part) =>
    catalogue.filter(
      (i) => i.part === part && (part === 'knm' || i.level === state.settings.level),
    );
  const go = (next, active = state.active, search = '') => {
    const target = next === 'session' ? sessionRoute(active) : next;
    navigate(routePath(target, state.settings.level, state.settings.lang) + search);
  };
  const start = (ids, mode = 'practice') => {
    const active = startSession(ids, mode, catalogue);
    setState((s) => ({ ...s, active }));
    go(sessionRoute(active), active);
  };
  const startSet = (set, restart = false) => {
    setState((s) => {
      const saved = savedSetSession(s, set);
      return {
        ...s,
        active:
          saved && !saved.endedAt && !restart
            ? saved
            : { ...startSession(set.ids, 'practice', catalogue), setId: set.id },
      };
    });
    go(`set/${set.id}`);
  };
  const open = (item) => {
    if (
      item.questions &&
      !(
        state.active?.mode === 'practice' &&
        !state.active.endedAt &&
        state.active.ids.length === 1 &&
        state.active.ids[0] === item.id
      )
    )
      start([item.id]);
    else go(`exercise/${item.id}`);
  };
  useEffect(() => {
    if (location.hash && location.hash !== '#main-content')
      navigate(
        routePath(readRoute(location, state.active), state.settings.level, state.settings.lang),
        { replace: true },
      );
  }, [route, location.hash, location.pathname]);
  useEffect(() => {
    if (!study.ready) return;
    const system = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(state.settings.theme, system.matches);
    };
    apply();
    system.addEventListener('change', apply);
    return () => system.removeEventListener('change', apply);
  }, [state.settings.theme, study.ready]);
  useEffect(() => {
    document.documentElement.lang = state.settings.lang;
  }, [state.settings.lang]);
  useEffect(() => {
    if (study.ready) trackVisit(state.settings);
  }, [study.ready]);
  const opened = route.startsWith('exercise/')
    ? catalogue.find((i) => i.id === route.slice(9))
    : null;
  const practiceSet = route.startsWith('set/')
    ? practiceSets.find((set) => set.id === route.slice(4))
    : null;
  const setReady = practiceSet && matchesSet(state.active, practiceSet);
  const page = practiceSet?.part || opened?.part || (route === 'session' ? 'mock' : route);
  // The page in a given language: the same route, only the /en prefix differs.
  const pathIn = (language) =>
    (route === 'missing'
      ? localizePath(location.pathname, language)
      : routePath(route, state.settings.level, language)) + location.search;
  const setting = (key, value) => {
    study.setting(key, value);
    if (key === 'level' && page !== 'home')
      navigate(
        routePath(
          page === 'check' ? 'check' : labels[page] && page !== 'knm' ? page : 'reading',
          value,
          state.settings.lang,
        ),
      );
    // Language lives in the address, so the switch is a navigation. The cookie is written
    // first: the new page is requested at once and must not be sent back to /en.
    if (key === 'lang' && value !== state.settings.lang) {
      rememberPreferences({ ...state.settings, lang: value });
      navigate(pathIn(value));
    }
  };
  const backPart = practiceSet?.part || opened?.part || (route === 'session' ? 'mock' : null),
    runningCheck = route === 'check' ? checkInProgress(state) : null;
  // Icon motion follows a real section change, never the initial page load.
  useDisclosureMotion();
  const [motion, setMotion] = useState<{ part: string; count: number } | null>(null),
    lastPage = useRef(page);
  useEffect(() => {
    if (lastPage.current === page) return;
    lastPage.current = page;
    setMotion((m) => ({ part: page, count: (m?.count || 0) + 1 }));
  }, [page]);
  // The phone strip scrolls; keep the current section's link in view.
  useEffect(() => {
    const link = document.querySelector<HTMLElement>('.nav-strip [aria-current="page"]');
    const strip = link?.closest<HTMLElement>('.nav-strip');
    if (!link || !strip || strip.scrollWidth <= strip.clientWidth) return;
    const left = link.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + link.offsetWidth > strip.scrollLeft + strip.clientWidth)
      strip.scrollTo({ left: Math.max(0, left - 16), behavior: 'auto' });
  }, [page]);
  const closedReady =
    opened?.questions &&
    state.active?.ids.length === 1 &&
    state.active.ids[0] === opened.id &&
    state.active.mode === 'practice';
  useEffect(() => {
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [route, closedReady, setReady, state.active?.index]);
  const missing =
    route === 'missing' ||
    (route.startsWith('exercise/') && !opened) ||
    (route.startsWith('set/') && !practiceSet);
  // The toolbar names the set and the current text, clip or task; the question count stays with the question.
  const position = (() => {
    if (!practiceSet) return null;
    const a = state.active,
      base = `${t('Oefenset', 'Practice set')} ${practiceSet.number}`;
    if (!setReady || a.endedAt) return base;
    const first = catalogue.find((i) => i.id === a.ids[0]),
      current = first?.questions ? flatten(a, catalogue)[a.index]?.item.id : a.ids[a.index];
    return `${base} · ${unitLabel(practiceSet.part, 1, state.settings.lang)} ${a.ids.indexOf(current) + 1} ${t('van', 'of')} ${a.ids.length}`;
  })();
  const available = ['A2', 'B1', 'B2'].filter((level) =>
    catalogue.some((item) => item.level === level),
  );
  const screen = missing ? (
    <>
      <Heading
        title={t('Oefening niet gevonden', 'Exercise not found')}
        subtitle={t(
          'Controleer de link of kies een oefening in het menu.',
          'Check the link or choose an exercise from the menu.',
        )}
      />
    </>
  ) : practiceSet ? (
    setReady ? (
      <PracticeSet />
    ) : null
  ) : route === 'session' ? (
    state.active?.mode === 'mock' ? (
      <Session />
    ) : (
      <Heading
        title={t('Geen actief proefexamen', 'No active practice test')}
        subtitle={t(
          'Kies Proefexamen in het menu om te beginnen.',
          'Choose Practice test in the menu to begin.',
        )}
      />
    )
  ) : opened ? (
    opened.questions ? (
      closedReady ? (
        <Session />
      ) : null
    ) : (
      <OpenExercise key={opened.id} item={opened} />
    )
  ) : route === 'mock' ? (
    <MockSetup />
  ) : route === 'progress' ? (
    <Progress />
  ) : route === 'about' ? (
    <About />
  ) : route === 'privacy' ? (
    <Privacy />
  ) : route === 'terms' ? (
    <Terms />
  ) : route === 'home' ? (
    <Home />
  ) : route === 'check' ? (
    <LevelCheck />
  ) : route === 'check-result' ? (
    <CheckResult />
  ) : (
    <Catalogue key={`${page}-${state.settings.level}`} part={labels[page] ? page : 'reading'} />
  );
  return (
    <StudyContext.Provider
      value={{
        ...study,
        setting,
        pathIn,
        renderedAt,
        api,
        refreshApi,
        catalogue,
        t,
        name,
        itemsFor,
        go,
        start,
        open,
        practiceSets,
        practiceSet,
        startSet,
      }}
    >
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector<HTMLElement>('main')?.focus();
        }}
      >
        {t('Naar inhoud', 'Skip to content')}
      </a>
      <div className="app-shell" data-hydrated={study.ready || undefined}>
        <aside className="sidebar">
          <Wordmark />
          <LevelNavigation
            label={t('Niveau', 'Level')}
            value={state.settings.level}
            available={available}
            soon={t('Binnenkort', 'Coming soon')}
            hrefFor={(value) =>
              withBase(
                page === 'home'
                  ? routePath('home', value, state.settings.lang)
                  : routePath(
                      labels[page] && page !== 'knm' ? page : 'reading',
                      value,
                      state.settings.lang,
                    ),
              )
            }
            onChange={(value) => setting('level', value)}
          />

          <div className="nav-strip">
            <nav className="subject-nav" aria-label={t('Onderdelen', 'Subjects')}>
              {['reading', 'listening', 'writing', 'speaking', 'knm'].map((part) => (
                <AppLink
                  className="nav-link"
                  key={part}
                  data-page={part}
                  to={part}
                  aria-current={page === part ? 'page' : undefined}
                >
                  <NavIcon part={part} motion={motion} />
                  <span className="nav-label" data-label={name(part)}>
                    {name(part)}
                  </span>
                </AppLink>
              ))}
            </nav>
            <nav
              className="utility-nav"
              aria-label={t('Oefenen en voortgang', 'Practice and progress')}
            >
              {['mock', 'progress'].map((part) => (
                <AppLink
                  className="nav-link"
                  key={part}
                  data-page={part}
                  to={part}
                  aria-current={page === part ? 'page' : undefined}
                >
                  <NavIcon part={part} motion={motion} />
                  <span className="nav-label" data-label={name(part)}>
                    {name(part)}
                  </span>
                </AppLink>
              ))}
            </nav>
          </div>
          <Preferences />
        </aside>
        <div className="workspace">
          {backPart ? (
            <div className="toolbar">
              <AppLink className="back" to={backPart}>
                ← {t('Terug naar', 'Back to')} {name(backPart)}
              </AppLink>
              {position && <span className="set-position">{position}</span>}
            </div>
          ) : (
            runningCheck && (
              <div className="toolbar">
                <AppLink className="back" to="home">
                  ← {t('Stop de check', 'Stop the check')}
                </AppLink>
                <span className="set-position">
                  {t('Niveaucheck', 'Level check')} {runningCheck.level} ·{' '}
                  {name(flatten(runningCheck, catalogue)[runningCheck.index]?.item.part)}
                </span>
              </div>
            )
          )}
          {!saved && (
            <p className="storage-notice" role="status">
              {t(
                'Opslaan in deze browser lukt niet. Je kunt wel blijven oefenen.',
                'This browser cannot save your work. You can still practise.',
              )}
            </p>
          )}
          <main id="main-content" tabIndex={-1}>
            {screen}
          </main>
          <footer className="footer">
            <span className="unofficial">
              {t(
                'Onafhankelijke oefenopgaven · geen officiële examens',
                'Independent practice · not official exams',
              )}
            </span>
            <div className="footer-links">
              <AppLink className="text-button" to="about">
                {t('Over de oefeningen', 'About the exercises')}
              </AppLink>
              <AppLink className="text-button" to="privacy">
                {t('Privacy', 'Privacy')}
              </AppLink>
              <AppLink className="text-button" to="terms">
                {t('Voorwaarden', 'Terms')}
              </AppLink>
              {site.creator?.github && (
                <a className="text-button" href={site.creator.github} rel="noreferrer">
                  GitHub
                </a>
              )}
              {site.creator?.email?.domain && (
                <ContactLink
                  email={site.creator.email}
                  label={t('Contact met de maker', 'Contact the author')}
                />
              )}
            </div>
          </footer>
        </div>
      </div>
    </StudyContext.Provider>
  );
}
