// The present tense of a Dutch verb from its infinitive, for the verb lists: "ik werk · hij
// werkt", with jij only where it differs from hij ("ik heb · jij hebt · hij heeft"). The plural
// is the infinitive and is not repeated. Spelling follows the rules a learner is taught: the
// stem is the infinitive without -en, a double consonant becomes single (zitten: zit), a long
// vowel is written double in the closed syllable (lopen: loop), v and z become f and s
// (geven: geef, reizen: reis), and -t is added for hij unless the stem already ends in t.
// The forms of all 440 verbs in content/words were read through on 22 November 2026;
// tests/present.test.ts pins each rule and exception and checks every verb gives a form.
import type { VerbForms } from './words';

export type PresentForm = [pronoun: string, form: string];

// Separable prefixes, longest first so "open" wins over "op" and "binnen" over "in".
const SEPARABLE = [
  'achter',
  'kennis',
  'binnen',
  'schoon',
  'samen',
  'terug',
  'thuis',
  'klaar',
  'kwijt',
  'dicht',
  'langs',
  'door',
  'open',
  'over',
  'voor',
  'neer',
  'aan',
  'mee',
  'uit',
  'weg',
  'bij',
  'toe',
  'af',
  'in',
  'na',
  'om',
  'op',
];
// Unstressed prefixes: the syllable after them carries the stress (vergeten: vergeet).
const UNSTRESSED = ['her', 'ont', 'ver', 'be', 'ge', 'er'];
// ik, jij, hij for the verbs whose present does not follow the rules; compounds such as
// bestaan, opstaan and terugkomen take the same forms after their prefix.
const IRREGULAR: Record<string, [string, string, string]> = {
  zijn: ['ben', 'bent', 'is'],
  hebben: ['heb', 'hebt', 'heeft'],
  kunnen: ['kan', 'kunt', 'kan'],
  zullen: ['zal', 'zult', 'zal'],
  willen: ['wil', 'wilt', 'wil'],
  mogen: ['mag', 'mag', 'mag'],
  komen: ['kom', 'komt', 'komt'],
  gaan: ['ga', 'gaat', 'gaat'],
  staan: ['sta', 'staat', 'staat'],
  slaan: ['sla', 'slaat', 'slaat'],
  doen: ['doe', 'doet', 'doet'],
  zien: ['zie', 'ziet', 'ziet'],
  // A French loan that keeps its final e: ik douche, hij douchet.
  douchen: ['douche', 'douchet', 'douchet'],
};
// Verbs in -eren, -elen and -enen whose last syllable is stressed and so has a long vowel
// (studeren: studeer), against luisteren: luister. Mostly loans; a new verb of this shape
// needs adding here.
const STRESSED = new Set([
  'accepteren',
  'annuleren',
  'beoordelen',
  'blokkeren',
  'controleren',
  'excuseren',
  'feliciteren',
  'informeren',
  'interesseren',
  'logeren',
  'negeren',
  'organiseren',
  'parkeren',
  'proberen',
  'reageren',
  'registreren',
  'repareren',
  'reserveren',
  'solliciteren',
  'studeren',
  'trakteren',
  'waarderen',
]);
// Verbs used with me/zich although the list gives them without it.
const REFLEXIVE = new Set(['omkleden']);
// Verbs said only of a thing or the weather: "het regent", not "ik regen".
const IMPERSONAL = new Set([
  'overkomen',
  'regenen',
  'waaien',
  'vriezen',
  'gebeuren',
  'lukken',
  'spijten',
  'schelen',
  'blijken',
  'gelden',
  'kosten',
  'duren',
]);

const vowelGroups = (word: string) => word.match(/[aeiouy]+|ij/g)?.length || 0;

function stem(infinitive: string) {
  if (infinitive.endsWith('n') && !infinitive.endsWith('en')) return infinitive.slice(0, -1);
  let s = infinitive.slice(0, -2);
  if (/([bcdfgklmnprstvz])\1$/.test(s)) return s.slice(0, -1);
  // A single a, o or u before one consonant was long in the open syllable of the infinitive
  // and is written double in the closed syllable of the stem (maken: maak). An e is long only
  // when stressed: the first syllable after any unstressed prefix, or a listed loan; an
  // unstressed e is a schwa and stays single (luisteren: luister).
  const single = s.match(/(^|[^aeiouy])([aeou])([bcdfgklmnprstvz])$/);
  if (single && single[2] !== 'e') s = s.slice(0, -2) + single[2] + single[2] + single[3];
  else if (single) {
    let core = s;
    for (const prefix of UNSTRESSED)
      if (core.startsWith(prefix) && vowelGroups(core.slice(prefix.length)) >= 1) {
        core = core.slice(prefix.length);
        break;
      }
    if (vowelGroups(core) === 1 || STRESSED.has(infinitive))
      s = s.slice(0, -2) + single[2] + single[2] + single[3];
  }
  return s.replace(/v$/, 'f').replace(/z$/, 's');
}
const withT = (s: string) => (s.endsWith('t') ? s : s + 't');

// The present tense to show beside the infinitive, or null for a form the rules cannot give.
export function presentTense(nl: string, verb: Pick<VerbForms, 'separable'>): PresentForm[] {
  const reflexive = nl.startsWith('zich ') || REFLEXIVE.has(nl);
  let word = nl.replace(/^zich /, ''),
    particle = '';
  if (verb.separable) {
    const prefix = SEPARABLE.find((p) => word.startsWith(p) && vowelGroups(word.slice(p.length)));
    if (prefix) {
      particle = prefix;
      word = word.slice(prefix.length);
    }
  }
  const irregular = Object.keys(IRREGULAR).find((key) => word.endsWith(key));
  let ik: string, jij: string, hij: string;
  if (irregular) {
    const head = word.slice(0, -irregular.length);
    [ik, jij, hij] = IRREGULAR[irregular].map((form) => head + form);
  } else {
    ik = stem(word);
    jij = hij = withT(ik);
  }
  const tail = (form: string, self: string) =>
    [form, reflexive ? self : '', particle].filter(Boolean).join(' ');
  if (IMPERSONAL.has(nl)) return [['het', tail(hij, 'zich')]];
  const forms: PresentForm[] = [['ik', tail(ik, 'me')]];
  if (jij !== hij) forms.push(['jij', tail(jij, 'je')]);
  forms.push(['hij', tail(hij, 'zich')]);
  return forms;
}
