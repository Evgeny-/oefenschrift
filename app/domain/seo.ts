import { routePath } from './routes';
import type { Exercise, PracticeSet, Level, Language } from '../types';
// Titles and descriptions per interface language. The exercises themselves stay Dutch in
// both; what changes is the page around them, which is what a search result shows.
export const subjectNames: Record<Language, Record<string, string>> = {
  nl: {
    reading: 'Lezen',
    listening: 'Luisteren',
    writing: 'Schrijven',
    speaking: 'Spreken',
    knm: 'KNM',
    progress: 'Voortgang',
    mock: 'Proefexamen',
    check: 'Niveaucheck',
    'check-result': 'Je niveaucheck',
    about: 'Over de oefeningen',
    privacy: 'Privacy',
    terms: 'Gebruiksvoorwaarden',
  },
  en: {
    reading: 'Reading',
    listening: 'Listening',
    writing: 'Writing',
    speaking: 'Speaking',
    knm: 'KNM',
    progress: 'Progress',
    mock: 'Practice test',
    check: 'Level check',
    'check-result': 'Your level check',
    about: 'About the exercises',
    privacy: 'Privacy',
    terms: 'Terms of use',
  },
};
const home = {
  nl: {
    title:
      'Inburgering oefenen — gratis oefenopgaven voor lezen, luisteren, schrijven, spreken en KNM',
    description:
      'Gratis oefenen voor het inburgeringsexamen: eigen opgaven voor lezen, luisteren, schrijven, spreken en KNM op A2 en B1, met uitleg en oefenfeedback. Zonder account.',
  },
  en: {
    title:
      'Inburgering exam practice — free exercises for reading, listening, writing, speaking and KNM',
    description:
      'Free practice for the Dutch inburgering exam: reading, listening, writing, speaking and KNM at A2 and B1, with explanations and practice feedback. No account needed.',
  },
};
export function pageSeo(
  route: string,
  level: Level,
  catalogue: Exercise[],
  sets: PracticeSet[],
  // The site root: the origin plus the base path when the site lives under one.
  root: string,
  lang: Language = 'nl',
) {
  const names = subjectNames[lang],
    nl = lang === 'nl';
  const alternates = {
    nl: root + routePath(route, level, 'nl'),
    en: root + routePath(route, level, 'en'),
  };
  // Everything the head needs once the page has a name: the address in both languages, the
  // card, and the structured data — the site itself on the home page, elsewhere the trail
  // that leads here, which a result shows in place of the bare URL.
  const decorate = (
    name: string,
    text: string,
    noindex: boolean,
    item?: Exercise,
    set?: PracticeSet,
  ) => {
    // Long enough for a result snippet and cut on a word, so a generated description never
    // ends mid-word; the written ones are short enough to pass through whole.
    const line = text.replace(/\s+/g, ' ').trim();
    const summary = line.length <= 165 ? line : line.slice(0, line.lastIndexOf(' ', 160)).trim();
    const trail = [{ name: 'Oefenschrift', url: root + routePath('home', level, lang) }];
    const part = item?.part ?? set?.part;
    if (part) {
      const partLevel = (item?.level ?? set?.level) as Level | 'KNM';
      trail.push({
        name: part === 'knm' ? names.knm : `${partLevel} ${names[part]}`,
        url: root + routePath(part, partLevel === 'KNM' ? 'A2' : partLevel, lang),
      });
    }
    // The last step is the page itself, under its own short name: the trail already says
    // which part and level it belongs to.
    if (route !== 'home')
      trail.push({
        name: item
          ? item.title
          : set
            ? nl
              ? `Oefenset ${set.number}`
              : `Practice set ${set.number}`
            : name,
        url: alternates[lang],
      });
    return {
      title: route === 'home' ? name : name + ' | Oefenschrift',
      description: summary,
      canonical: alternates[lang],
      noindex,
      alternates,
      // One card for the whole site: its home page, with the five parts on it.
      image: root + '/og.png',
      imageAlt: nl
        ? 'Oefenschrift: oefenopgaven voor lezen, luisteren, schrijven, spreken en KNM'
        : 'Oefenschrift: practice tasks for reading, listening, writing, speaking and KNM',
      jsonLd: noindex
        ? []
        : route === 'home'
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Oefenschrift',
                url: alternates[lang],
                inLanguage: lang,
                description: summary,
                isAccessibleForFree: true,
                publisher: { '@type': 'Organization', name: 'Oefenschrift', url: alternates.nl },
              },
            ]
          : [
              {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: trail.map((step, position) => ({
                  '@type': 'ListItem',
                  position: position + 1,
                  name: step.name,
                  item: step.url,
                })),
              },
            ],
    };
  };
  if (route === 'home') return decorate(home[lang].title, home[lang].description, false);
  const item = route.startsWith('exercise/')
    ? catalogue.find((item) => item.id === route.slice(9))
    : undefined;
  const set = route.startsWith('set/') ? sets.find((set) => set.id === route.slice(4)) : undefined;
  const subject = ['reading', 'listening', 'writing', 'speaking'].includes(route);
  const available = catalogue.filter(
    (item) => item.part === route && (route === 'knm' || item.level === level),
  );
  const title = item
    ? `${item.title} · ${item.level} ${names[item.part]}`
    : set
      ? nl
        ? `${set.level} ${names[set.part]} · Oefenset ${set.number}`
        : `${set.level} ${names[set.part]} · Practice set ${set.number}`
      : subject
        ? nl
          ? `${level} ${names[route]} oefenen`
          : `${level} ${names[route]} practice`
        : route === 'check'
          ? nl
            ? `Niveaucheck ${level}: tien vragen over lezen en luisteren`
            : `Level check ${level}: ten questions on reading and listening`
          : names[route] || (nl ? 'Oefenen' : 'Practice');
  let description = nl
    ? 'Oefen Nederlands met zelfstandige opdrachten voor lezen, luisteren, schrijven en spreken. Onafhankelijke oefenopgaven voor je inburgering.'
    : 'Practise Dutch with self-study tasks for reading, listening, writing and speaking. Independent practice material for your inburgering exam.';
  if (item)
    description = `${item.level} ${names[item.part]}: ${item.prompt || item.text || item.transcript || item.title}`;
  else if (set)
    description = nl
      ? `Oefenset ${set.number} voor ${set.level} ${names[set.part].toLowerCase()}: ${set.ids.length} opdrachten om zelfstandig te oefenen, met uitleg of oefenfeedback.`
      : `Practice set ${set.number} for ${set.level} ${names[set.part].toLowerCase()}: ${set.ids.length} tasks to practise on your own, with explanations or practice feedback.`;
  else if (subject)
    description = available.length
      ? nl
        ? `Oefen ${names[route].toLowerCase()} op niveau ${level} met ${available.length} eigen opdrachten. Werk in korte oefensets en bekijk de uitleg of oefenfeedback.`
        : `Practise ${names[route].toLowerCase()} at level ${level} with ${available.length} original tasks. Work in short practice sets and see the explanation or practice feedback.`
      : nl
        ? `Oefeningen voor ${level} ${names[route].toLowerCase()} zijn nog niet beschikbaar.`
        : `Exercises for ${level} ${names[route].toLowerCase()} are not available yet.`;
  else if (route === 'knm')
    description = nl
      ? 'Oefen Kennis van de Nederlandse Maatschappij met eigen vragen en uitleg. KNM staat los van je taalniveau.'
      : 'Practise Kennis van de Nederlandse Maatschappij (KNM) with original questions and explanations. KNM is independent of your language level.';
  else if (route === 'check')
    description = nl
      ? `Doe de gratis niveaucheck op ${level}: tien vragen over lezen en luisteren. Je ziet per onderdeel hoe je scoort en waar je het best begint. Geen examenuitslag.`
      : `Take the free level check at ${level}: ten questions on reading and listening. See how you score per subject and where best to begin. Not an exam result.`;
  else if (route === 'about')
    description = nl
      ? 'Lees hoe onze onafhankelijke inburgeringsoefeningen worden gemaakt en nagekeken, wat de beperkingen zijn en hoe je een probleem kunt melden.'
      : 'Read how our independent inburgering exercises are made and reviewed, what their limitations are and how to report a problem.';
  const noindex =
    ['progress', 'session', 'privacy', 'terms', 'mock', 'check-result'].includes(route) ||
    (subject && !available.length);
  return decorate(title, description, noindex, item, set);
}
// Every public page in both languages; the head of each carries the hreflang pair.
export function sitemapPaths(catalogue: Exercise[], sets: PracticeSet[]) {
  const paths = new Set<string>();
  const add = (route: string, level: Level = 'A2') => {
    paths.add(routePath(route, level, 'nl'));
    paths.add(routePath(route, level, 'en'));
  };
  add('home');
  add('about');
  for (const item of catalogue) {
    add(item.part, item.level === 'KNM' ? 'A2' : item.level);
    add('exercise/' + item.id);
  }
  for (const set of sets) if (set.ids.length) add('set/' + set.id);
  for (const level of ['A2', 'B1'] as Level[])
    if (catalogue.some((item) => item.level === level && item.questions?.length))
      add('check', level);
  return [...paths];
}
