import {
  data as respond,
  useLoaderData,
  useRouteLoaderData,
  redirect,
  type MetaArgs,
} from 'react-router';
import type { loader as studyLayoutLoader } from './study-layout';
import App from '../App';
import { getStore } from '../../server/store';
import { readRoute, routePath, routeLevel, routeLang, levelPages } from '../domain/routes';
import { defaults } from '../domain/study';
import { readPreferences, stateForRoute, applyResumePosition } from '../domain/render-state';
import { serviceStatus } from '../../server/availability';
import {
  basePath,
  ensurePass,
  siteOrigin,
  stripBase,
  migrationHeaders,
} from '../../server/security';
import { remaining } from '../../server/limits';
import { pageSeo } from '../domain/seo';
import { POSITION_COOKIE, readCookie } from '../domain/persistence';
export function loader({ request, params }) {
  const url = new URL('/' + (params['*'] || ''), request.url),
    route = readRoute(url, null);
  if (route === 'missing') throw new Response('Page not found', { status: 404 });
  const store = getStore(),
    catalogue = store.catalogue(),
    practiceSets = store.sets();
  if (
    (route.startsWith('exercise/') && !catalogue.some((item) => item.id === route.slice(9))) ||
    (route.startsWith('set/') && !practiceSets.some((set) => set.id === route.slice(4)))
  )
    throw new Response('Exercise not found', { status: 404 });
  const renderedAt = Date.now(),
    cookie = request.headers.get('Cookie') || '';
  const settings = readPreferences(cookie),
    explicitLevel = routeLevel(url),
    explicitLang = routeLang(url);
  if (explicitLevel) settings.level = explicitLevel;
  // The address decides the language: /en is English, a plain path is Dutch. A browser
  // that chose English earlier is sent from a plain path to its /en twin; a crawler has no
  // preference and always finds Dutch there, so both versions stay reachable.
  settings.lang = explicitLang || (settings.lang === 'en' ? 'en' : 'nl');
  const canonicalPath = routePath(route, settings.level, settings.lang);
  // Splat params are decoded by the router. Compare the encoded request path so
  // existing exercise IDs containing colons do not redirect back to themselves.
  const requestUrl = new URL(request.url),
    requestPath = stripBase(requestUrl.pathname.replace(/(?:\/_)?\.data$/, '')) || '/';
  // A redirect that follows a stored preference is temporary; only spelling is permanent.
  if (requestPath !== canonicalPath)
    throw redirect(
      canonicalPath + requestUrl.search,
      (levelPages.has(route) && !explicitLevel) || (!explicitLang && settings.lang === 'en')
        ? 307
        : 308,
    );
  let initialState = stateForRoute(
    { ...defaults(), settings },
    route,
    catalogue,
    practiceSets,
    renderedAt,
  );
  const position = readCookie(cookie, POSITION_COOKIE);
  if (position) initialState = applyResumePosition(initialState, position, catalogue);
  // The first page sets the session pass the paid calls require; a browser that already
  // has a young one keeps it, so its allowance for today carries over.
  const pass = ensurePass(request, renderedAt);
  const headers = migrationHeaders(request, renderedAt);
  if (pass.header) headers.append('Set-Cookie', pass.header);
  // Tabs opened before the shared layout was deployed make unfiltered data requests
  // and expect content here. Keep those tabs working until their next document load;
  // the current router sends _routes when it reuses the shared layout's catalogue.
  const legacyNavigation =
    requestUrl.pathname.endsWith('.data') && !requestUrl.searchParams.has('_routes');
  return respond(
    {
      ...(legacyNavigation ? { catalogue, practiceSets } : {}),
      initialState,
      renderedAt,
      services: {
        ...serviceStatus(renderedAt, store),
        remaining: {
          feedback: remaining('pass', pass.id, 'feedback', renderedAt),
          speech: remaining('pass', pass.id, 'transcribe', renderedAt),
        },
        reports: true,
      },
      seo: pageSeo(
        route,
        settings.level,
        catalogue,
        practiceSets,
        siteOrigin(request) + basePath(),
        settings.lang,
      ),
    },
    { headers },
  );
}
export function meta({ loaderData: data }: MetaArgs<typeof loader>) {
  return data
    ? [
        { title: data.seo.title },
        { name: 'description', content: data.seo.description },
        { tagName: 'link', rel: 'canonical', href: data.seo.canonical },
        { tagName: 'link', rel: 'alternate', hrefLang: 'nl', href: data.seo.alternates.nl },
        { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: data.seo.alternates.en },
        { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: data.seo.alternates.nl },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:locale',
          content: data.initialState.settings.lang === 'en' ? 'en_GB' : 'nl_NL',
        },
        {
          property: 'og:locale:alternate',
          content: data.initialState.settings.lang === 'en' ? 'nl_NL' : 'en_GB',
        },
        { property: 'og:site_name', content: 'Oefenschrift' },
        { property: 'og:title', content: data.seo.title },
        { property: 'og:description', content: data.seo.description },
        { property: 'og:url', content: data.seo.canonical },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: data.seo.title },
        { name: 'twitter:description', content: data.seo.description },
        ...(data.seo.noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
      ]
    : [{ title: 'Pagina niet gevonden | Oefenschrift' }, { name: 'robots', content: 'noindex' }];
}
export function shouldRevalidate({ currentUrl, nextUrl, defaultShouldRevalidate }) {
  return currentUrl.pathname !== nextUrl.pathname || defaultShouldRevalidate;
}
export default function Study() {
  const data = useLoaderData<typeof loader>();
  const content = useRouteLoaderData<typeof studyLayoutLoader>('routes/study-layout');
  return <App {...data} {...content!} />;
}
