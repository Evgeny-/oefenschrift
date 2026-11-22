// The word lists at /words: one dictionary of reviewed entries (content/words) shown as
// lists by frequency, by kind of word and by theme. The material is Dutch with English in
// both interface languages; only the page around it is translated.
export type WordPos =
  | 'noun'
  | 'verb'
  | 'adj'
  | 'adv'
  | 'pron'
  | 'det'
  | 'prep'
  | 'conj'
  | 'num'
  | 'interj';
export interface VerbForms {
  past: string;
  pastPlural: string;
  participle: string | null;
  aux: 'hebben' | 'zijn' | 'hebben/zijn';
  irregular: boolean;
  separable: boolean;
}
export interface WordEntry {
  id: string;
  nl: string;
  pos: WordPos;
  en: string;
  // Position in the frequency blend, 1 = most frequent; absent for supplementary words.
  rank?: number;
  article?: 'de' | 'het' | 'de/het';
  plural?: string | null;
  verb?: VerbForms;
  // Irregular or spelling-changing adjective and adverb forms: "beter · best".
  forms?: string;
  ex: string;
  exEn: string;
  note?: string;
  themes?: string[];
  tags?: string[];
}
type Pair = [nl: string, en: string];
export interface WordGroup {
  slug: string;
  section: 'frequency' | 'kinds' | 'themes' | 'mine';
  // The list's name in Dutch and English, shown together in both interfaces.
  nl: string;
  en: string;
  // One line under the title, in the interface language.
  about: Pair;
  layout?: 'verbs';
  ranked?: boolean;
  includes: (entry: WordEntry) => boolean;
  // A natural order (numbers, days, pronouns) before frequency.
  order?: string[];
}
export const TOP_SIZE = 1000;
// Long lists are read a hundred words at a time.
export const PAGE_SIZE = 100;
const has = (entry: WordEntry, tag: string) => !!entry.tags?.includes(tag);
const theme = (slug: string, id: string, nl: string, en: string, about: Pair): WordGroup => ({
  slug,
  section: 'themes',
  nl,
  en,
  about,
  includes: (entry) => !!entry.themes?.includes(id),
});
export const WORD_GROUPS: WordGroup[] = [
  {
    slug: 'top',
    section: 'frequency',
    nl: 'Meest gebruikt',
    en: 'Most common words',
    about: ['Het vaakst gebruikte woord eerst.', 'The most frequent first.'],
    ranked: true,
    includes: (entry) => !!entry.rank && entry.rank <= TOP_SIZE,
  },
  {
    slug: 'my-list',
    section: 'mine',
    nl: 'Mijn lijst',
    en: 'My list',
    about: [
      'De woorden die je hebt gemarkeerd omdat je ze nog niet kent. Ze blijven in deze browser.',
      'The words you marked because you do not know them yet. They stay in this browser.',
    ],
    includes: () => false,
  },
  {
    slug: 'regular-verbs',
    section: 'kinds',
    nl: 'Regelmatige werkwoorden',
    en: 'Regular verbs',
    about: [
      'Eindigt de stam op t, k, f, s, ch of p (’t kofschip), dan krijgt de verleden tijd -te(n) en het deelwoord -t. Anders -de(n) en -d.',
      'If the stem ends in t, k, f, s, ch or p (’t kofschip), the past takes -te(n) and the participle -t. Otherwise -de(n) and -d.',
    ],
    layout: 'verbs',
    includes: (entry) => entry.pos === 'verb' && !entry.verb?.irregular,
  },
  {
    slug: 'irregular-verbs',
    section: 'kinds',
    nl: 'Onregelmatige werkwoorden',
    en: 'Irregular verbs',
    about: [
      'De verleden tijd en het voltooid deelwoord volgen geen vaste regel. Leer de vormen samen.',
      'The past tense and the past participle follow no fixed rule. Learn the forms together.',
    ],
    layout: 'verbs',
    includes: (entry) => entry.pos === 'verb' && !!entry.verb?.irregular,
  },
  {
    slug: 'nouns',
    section: 'kinds',
    nl: 'Zelfstandige naamwoorden',
    en: 'Nouns',
    about: [
      'Met de of het en het meervoud. Leer het lidwoord samen met het woord.',
      'With de or het and the plural. Learn the article together with the word.',
    ],
    includes: (entry) => entry.pos === 'noun',
  },
  {
    slug: 'adjectives',
    section: 'kinds',
    nl: 'Bijvoeglijke naamwoorden',
    en: 'Adjectives',
    about: [
      'Voor een zelfstandig naamwoord meestal met -e: een grote tafel, het grote huis, maar een groot huis.',
      'Before a noun usually with -e: een grote tafel, het grote huis, but een groot huis.',
    ],
    includes: (entry) => entry.pos === 'adj',
  },
  {
    slug: 'adverbs',
    section: 'kinds',
    nl: 'Bijwoorden',
    en: 'Adverbs',
    about: [
      'Woorden die zeggen hoe, waar, wanneer of hoe vaak.',
      'Words that say how, where, when or how often.',
    ],
    includes: (entry) => entry.pos === 'adv' && !has(entry, 'particle') && !has(entry, 'question'),
  },
  {
    slug: 'small-words',
    section: 'kinds',
    nl: 'Kleine woorden',
    en: 'Particles and small words',
    about: [
      'Er, al, nog, toch, even en meer. Ze zijn lastig te vertalen; de uitleg zegt wat ze toevoegen.',
      'Er, al, nog, toch, even and more. They are hard to translate; the note says what they add.',
    ],
    includes: (entry) => has(entry, 'particle'),
    order: [
      'er',
      'al',
      'nog',
      'toch',
      'wel',
      'maar',
      'even',
      'eens',
      'ook',
      'dus',
      'zo',
      'dan',
      'pas',
      'nou',
      'hoor',
      'hè',
      'zeg',
    ],
  },
  {
    slug: 'prepositions',
    section: 'kinds',
    nl: 'Voorzetsels',
    en: 'Prepositions',
    about: [
      'Voor plaats, tijd en richting. Veel werkwoorden hebben een vast voorzetsel: wachten op, denken aan.',
      'For place, time and direction. Many verbs take a fixed one: wachten op, denken aan.',
    ],
    includes: (entry) => entry.pos === 'prep' || has(entry, 'preposition'),
  },
  {
    slug: 'conjunctions',
    section: 'kinds',
    nl: 'Voegwoorden',
    en: 'Conjunctions',
    about: [
      'Na en, maar, of en want blijft de volgorde gewoon. Na omdat, als, dat en de meeste andere staat het werkwoord achteraan.',
      'After en, maar, of and want the word order stays the same. After omdat, als, dat and most others the verb goes to the end.',
    ],
    includes: (entry) => entry.pos === 'conj' || has(entry, 'conjunction'),
    order: ['en', 'maar', 'of', 'want', 'dus', 'omdat', 'als', 'dat', 'wanneer', 'toen'],
  },
  {
    slug: 'pronouns',
    section: 'kinds',
    nl: 'Voornaamwoorden en lidwoorden',
    en: 'Pronouns and articles',
    about: [
      'Ik, mij, mijn en de andere, met de, het en een.',
      'I, me, my and the rest, with de, het and een.',
    ],
    includes: (entry) => entry.pos === 'pron' || entry.pos === 'det',
    order: [
      'de',
      'het',
      'een',
      'ik',
      'je',
      'jij',
      'u',
      'hij',
      'zij',
      'ze',
      'we',
      'wij',
      'jullie',
      'mij',
      'jou',
      'hem',
      'haar',
      'ons',
      'hen',
      'hun',
      'mijn',
      'jouw',
      'uw',
      'zijn-pron',
      'onze',
      'dit',
      'dat',
      'deze',
      'die',
    ],
  },
  {
    slug: 'question-words',
    section: 'kinds',
    nl: 'Vraagwoorden',
    en: 'Question words',
    about: [
      'Na het vraagwoord komt meteen het werkwoord: Waar woon je?',
      'The verb comes straight after the question word: Waar woon je?',
    ],
    includes: (entry) => has(entry, 'question'),
    order: [
      'wie',
      'wat',
      'waar',
      'wanneer',
      'waarom',
      'hoe',
      'hoeveel',
      'welk',
      'welke',
      'hoelang',
      'hoezo',
    ],
  },
  {
    slug: 'numbers',
    section: 'kinds',
    nl: 'Getallen',
    en: 'Numbers',
    about: [
      'Van nul tot een miljoen, en eerste, tweede, derde.',
      'From zero to a million, and first, second, third.',
    ],
    includes: (entry) => entry.pos === 'num' || has(entry, 'number'),
    order: [
      'nul',
      'een',
      'één',
      'twee',
      'drie',
      'vier',
      'vijf',
      'zes',
      'zeven',
      'acht',
      'negen',
      'tien',
      'elf',
      'twaalf',
      'dertien',
      'veertien',
      'vijftien',
      'zestien',
      'zeventien',
      'achttien',
      'negentien',
      'twintig',
      'dertig',
      'veertig',
      'vijftig',
      'zestig',
      'zeventig',
      'tachtig',
      'negentig',
      'honderd',
      'duizend',
      'miljoen',
      'eerste',
      'tweede',
      'derde',
      'vierde',
      'vijfde',
      'zesde',
      'tiende',
      'laatste',
      'half',
      'helft',
      'kwart',
    ],
  },
  {
    slug: 'time',
    section: 'kinds',
    nl: 'Tijd',
    en: 'Time',
    about: [
      'Dagen, maanden, de klok en woorden als vandaag en straks. Dagen en maanden schrijf je met een kleine letter.',
      'Days, months, the clock and words such as vandaag and straks. Days and months are written in lower case.',
    ],
    includes: (entry) => has(entry, 'time'),
    order: [
      'tijd',
      'uur',
      'kwartier',
      'minuut',
      'seconde',
      'dag',
      'week',
      'maand',
      'jaar',
      'ochtend',
      'morgen',
      'middag',
      'avond',
      'nacht',
      'vandaag',
      'gisteren',
      'maandag',
      'dinsdag',
      'woensdag',
      'donderdag',
      'vrijdag',
      'zaterdag',
      'zondag',
      'weekend',
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'juni',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december',
      'lente',
      'zomer',
      'herfst',
      'winter',
    ],
  },
  {
    slug: 'greetings',
    section: 'kinds',
    nl: 'Groeten en reageren',
    en: 'Greetings and replies',
    about: [
      'Wat je zegt om te groeten, te bedanken en te antwoorden.',
      'What you say to greet, to thank and to reply.',
    ],
    includes: (entry) => entry.pos === 'interj',
  },
  theme('housing', 'wonen', 'Wonen', 'Housing', [
    'Het huis, de kamers, de huur en de buren.',
    'The house, the rooms, the rent and the neighbours.',
  ]),
  theme('work', 'werk', 'Werk', 'Work', [
    'Een baan zoeken, je werkdag, je collega’s en je salaris.',
    'Looking for a job, your working day, colleagues and pay.',
  ]),
  theme('health', 'gezondheid', 'Gezondheid', 'Health', [
    'Het lichaam, ziek zijn, de huisarts en de apotheek.',
    'The body, being ill, the GP and the pharmacy.',
  ]),
  theme('municipality', 'gemeente', 'Gemeente en instanties', 'Council and official matters', [
    'De gemeente, formulieren, afspraken en officiële post.',
    'The council, forms, appointments and official letters.',
  ]),
  theme('shopping', 'winkel', 'Winkels en geld', 'Shops and money', [
    'Boodschappen doen, betalen, kleding en prijzen.',
    'Shopping, paying, clothes and prices.',
  ]),
  theme('transport', 'vervoer', 'Vervoer', 'Transport', [
    'De fiets, de bus, de trein, de auto en de weg vragen.',
    'Bike, bus, train and car, and asking the way.',
  ]),
  theme('school', 'school', 'School en cursus', 'School and courses', [
    'De school van je kinderen, de taalcursus, de les en examens.',
    'Your children’s school, the language course, lessons and exams.',
  ]),
  theme('family', 'familie', 'Familie en mensen', 'Family and people', [
    'Familie, vrienden, buren en de mensen om je heen.',
    'Family, friends, neighbours and the people around you.',
  ]),
  theme('food', 'eten', 'Eten en drinken', 'Food and drink', [
    'Eten, drinken, koken en aan tafel.',
    'Food, drink, cooking and meals.',
  ]),
  theme('free-time', 'vrije-tijd', 'Vrije tijd', 'Free time', [
    'Sport, hobby’s, uitgaan, het weer en de natuur.',
    'Sport, hobbies, going out, the weather and nature.',
  ]),
];
export const MY_LIST = 'my-list';
export const groupBySlug = (slug: string) => WORD_GROUPS.find((group) => group.slug === slug);

// The list in reading order: the group's natural order first, then by frequency, then A–Z.
export function groupEntries(group: WordGroup, entries: WordEntry[]) {
  const order = new Map((group.order || []).map((id, index) => [id, index]));
  return entries
    .filter(group.includes)
    .sort(
      (a, b) =>
        (order.get(a.id) ?? 1e6) - (order.get(b.id) ?? 1e6) ||
        (a.rank ?? 1e6) - (b.rank ?? 1e6) ||
        a.nl.localeCompare(b.nl, 'nl'),
    );
}

// Searching ignores case and accents, so "een" finds één and "cafe" finds café.
export const fold = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const senses = (en: string) =>
  en
    .split(/[;,]/)
    .map((sense) => fold(sense.replace(/\(.*?\)/g, '')).replace(/^to /, ''))
    .filter(Boolean);
// Every Dutch form a learner might type: the plural, the past tenses, the participle.
export function dutchForms(entry: WordEntry) {
  const forms = [entry.plural, entry.forms, entry.verb?.past, entry.verb?.pastPlural];
  if (entry.verb?.participle) forms.push(entry.verb.participle);
  return forms
    .filter(Boolean)
    .flatMap((form) => form!.split(/\s*[·,/]\s*/))
    .map((form) => fold(form.split(' ')[0]))
    .filter(Boolean);
}
// Best matches first: the Dutch word itself, a form of it, the English meaning, then
// words that merely contain the query.
export function searchEntries(query: string, entries: WordEntry[], limit = 60) {
  const q = fold(query),
    // "to call" and "call" both find bellen: senses are compared without their "to".
    en = q.replace(/^to /, '');
  if (!q) return [];
  const score = (entry: WordEntry) => {
    const nl = fold(entry.nl),
      english = senses(entry.en);
    if (nl === q) return 0;
    if (english.includes(en)) return 1;
    if (dutchForms(entry).includes(q)) return 2;
    if (nl.startsWith(q)) return 3;
    if (english.some((sense) => sense.startsWith(en))) return 4;
    if (english.some((sense) => sense.split(' ').includes(en))) return 5;
    if (q.length > 2 && nl.includes(q)) return 6;
    return -1;
  };
  return entries
    .map((entry) => ({ entry, score: score(entry) }))
    .filter((match) => match.score >= 0)
    .sort(
      (a, b) =>
        a.score - b.score ||
        (a.entry.rank ?? 1e6) - (b.entry.rank ?? 1e6) ||
        a.entry.nl.localeCompare(b.entry.nl, 'nl'),
    )
    .slice(0, limit)
    .map((match) => match.entry);
}
// The verb's forms as learners recite them: "werkte · heeft gewerkt".
export function perfect(verb: VerbForms) {
  if (!verb.participle) return '';
  const aux = { hebben: 'heeft', zijn: 'is', 'hebben/zijn': 'heeft/is' }[verb.aux];
  return `${aux} ${verb.participle}`;
}
export const wordPath = (slug?: string) => (slug ? `words/${slug}` : 'words');
// What a words page receives from its loader: on the index a summary of every list, on a
// list page that list's entries in reading order (the full dictionary, for search across
// lists and for My list, comes from /api/words when it is needed).
export interface GroupSummary {
  slug: string;
  count: number;
  sample: string[];
}
export interface WordsPage {
  summaries?: GroupSummary[];
  group?: string;
  entries?: WordEntry[];
}
export function summarise(entries: WordEntry[]): GroupSummary[] {
  return WORD_GROUPS.filter((group) => group.slug !== MY_LIST).map((group) => {
    const list = groupEntries(group, entries);
    return { slug: group.slug, count: list.length, sample: list.slice(0, 4).map((e) => e.nl) };
  });
}
