// Interface labels for content metadata. Skill ids come from the reviewed
// catalogue; a question without a skill is grouped under its exercise title.
const skills: Record<string, [string, string]> = {
  find_available_day: ['Een beschikbare dag vinden', 'Finding an available day'],
  understand_alternative: ['Een alternatief begrijpen', 'Understanding an alternative'],
  distinguish_registration_and_payment: [
    'Aanmelden en betalen uit elkaar houden',
    'Telling registration and payment apart',
  ],
  find_required_action: ['De vereiste actie vinden', 'Finding the required action'],
  distinguish_changed_and_usual_time: [
    'Gewijzigde en gewone tijd uit elkaar houden',
    'Telling a changed time from the usual time',
  ],
  find_location: ['Een plaats vinden', 'Finding a location'],
  understand_requirement: ['Een eis begrijpen', 'Understanding a requirement'],
  find_application_method: ['Zien hoe u moet reageren', 'Finding how to respond'],
  identify_reason: ['Een reden herkennen', 'Identifying a reason'],
  distinguish_payments: ['Betalingen uit elkaar houden', 'Telling payments apart'],
  infer_speakers_priority: [
    'Begrijpen wat de spreker belangrijk vindt',
    'Inferring what matters to the speaker',
  ],
  identify_condition: ['Een voorwaarde herkennen', 'Identifying a condition'],
  distinguish_current_rule_from_future_decision: [
    'Huidige regel en toekomstig besluit uit elkaar houden',
    'Telling a current rule from a future decision',
  ],
  understand_evaluation_criterion: [
    'Een beoordelingscriterium begrijpen',
    'Understanding an assessment criterion',
  ],
  combine_schedule_and_exception: [
    'Een rooster en een uitzondering combineren',
    'Combining a schedule with an exception',
  ],
  find_required_prior_action: ['Zien wat u eerst moet doen', 'Finding the required prior step'],
  // Blueprint operation tags (content/blueprint.md section 3).
  detail: ['Een detail vinden', 'Finding a detail'],
  'time-place': ['Tijd of plaats vinden', 'Finding a time or place'],
  quantity: ['Een aantal of bedrag vinden', 'Finding a number or amount'],
  person: ['De juiste persoon vinden', 'Finding the right person'],
  'rule-application': ['Een regel toepassen', 'Applying a rule'],
  purpose: ['Het doel van de tekst', 'The purpose of the text'],
  advice: ['Het passende advies kiezen', 'Choosing the fitting advice'],
  sequence: ['De volgorde begrijpen', 'Understanding the order'],
  opinion: ['Een mening herkennen', 'Recognising an opinion'],
  inference: ['Een conclusie trekken', 'Drawing a conclusion'],
  summary: ['De kern samenvatten', 'Summarising the point'],
  picture: ['Het juiste plaatje kiezen', 'Choosing the right picture'],
};
export function skillLabel(skill: string | undefined, lang: 'nl' | 'en'): string | null {
  const label = skill ? skills[skill] : undefined;
  return label ? label[lang === 'nl' ? 0 : 1] : null;
}
const types: Record<string, [string, string]> = {
  message: ['Bericht', 'Message'],
  notice: ['Mededeling', 'Notice'],
  email: ['E-mail', 'Email'],
  advertisement: ['Advertentie', 'Advertisement'],
  text: ['Tekst', 'Text'],
  article: ['Artikel', 'Article'],
  news: ['Nieuwsbericht', 'News item'],
  information: ['Informatie', 'Information'],
  audio: ['Luisterfragment', 'Listening clip'],
  // Blueprint task types (content/blueprint.md section 4).
  brief: ['Brief', 'Letter'],
  folder: ['Folder', 'Leaflet'],
  bericht: ['Bericht', 'Message'],
  advertentie: ['Advertentie', 'Advertisement'],
  krant: ['Krantenbericht', 'Newspaper item'],
  regels: ['Regels', 'Rules'],
  rooster: ['Rooster', 'Schedule'],
  gesprek: ['Gesprek', 'Conversation'],
  voicemail: ['Voicemail', 'Voicemail'],
  omroep: ['Omroepbericht', 'Announcement'],
  nieuws: ['Nieuwsbericht', 'News item'],
  uitleg: ['Uitleg', 'Explanation'],
  reclame: ['Presentatie', 'Presentation'],
  artikel: ['Artikel', 'Article'],
  interview: ['Interview', 'Interview'],
  studieboek: ['Studieboek', 'Textbook'],
  website: ['Website', 'Website'],
  nieuwsbericht: ['Nieuwsbericht', 'News item'],
  voorwaarden: ['Voorwaarden', 'Terms'],
  opzoektekst: ['Opzoektekst', 'Look-up text'],
  leerkaart: ['Leerkaart', 'Study card'],
  feit: ['Feit', 'Fact'],
};
export function typeLabel(type: string | undefined, lang: 'nl' | 'en'): string | null {
  const label = type ? types[type] : undefined;
  return label ? label[lang === 'nl' ? 0 : 1] : null;
}
// The unit a practice set counts: texts, clips or tasks.
export function unitLabel(part: string, count: number, lang: 'nl' | 'en'): string {
  const units = {
    reading: ['tekst', 'teksten', 'text', 'texts'],
    knm: ['tekst', 'teksten', 'text', 'texts'],
    listening: ['fragment', 'fragmenten', 'clip', 'clips'],
    writing: ['opdracht', 'opdrachten', 'task', 'tasks'],
    speaking: ['opdracht', 'opdrachten', 'task', 'tasks'],
  };
  const unit = units[part] || units.reading;
  return unit[(lang === 'nl' ? 0 : 2) + (count === 1 ? 0 : 1)];
}
