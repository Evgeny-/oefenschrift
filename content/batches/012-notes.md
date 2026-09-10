# Batch 012: design notes (B1 Luisteren, two texts)

Batch 012 contains two original B1 listening texts in the Staatsexamen NT2 Programma I shape described in `content/blueprint.md` §4.7: a situation line, a narrator intro, and one fragment per question, each fragment a script with voice roles. Together the fragments of a text form one conversation with a beginning and an end. Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and `text` is the mechanical join of the fragments the audio pipeline will speak.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id (slug) | taskType | textType | domain | Setting | Q | Spoken words | Estimated length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | buschauffeur | interview | beschouwend | werk | Radio interview with Farah, who left a clothing shop after almost twenty years and became a bus driver at forty-three: why, the training and exams, the first months, her family, her advice, her verdict | 7 | 862 (+33 intro) | 6.0–6.5 min (+ ≈15 s intro) |
| 2 | mantelzorg | voorlichting | instructief | overig | Information evening in a library: meneer Yilmaz of the steunpunt mantelzorg explains how to arrange care for an ageing parent who lives at home (gemeente/Wmo, zorgverzekeraar, mantelzorg and respijtzorg, where to ask); mevrouw Bakker asks about her mother | 6 | 801 (+47 intro) | 5.6–6.1 min (+ ≈20 s intro) |

Totals: 2 texts, 13 fragments, 13 questions, all with three options. Seconds are estimated at 2.2–2.4 spoken words per second; the one measured B1 clip in the catalogue (werkoverleg, narrator voice) runs at 2.2 words per second, and the natural voices chosen for B1 are a little faster. The checker counts `text` including the "Speaker:" labels and caps it at 900 words, which is why the interview stays at 862 spoken words rather than the 900–1000 that seven minutes would need; with the intro and the 25-second reading pauses per question the exam-time experience is well over six minutes.

## 2. Settings and why they are not duplicates

Existing B1 listening items are werkoverleg, lekkage and vrijwilligers festival. The sibling batch 013 writes a `gesprek` about a course choice at a college and an `instructie` about a workplace procedure; neither subject is touched here.

1. **buschauffeur** — a profession and a mid-career change, which blueprint §9 lists as under-represented (work, professions). It is not a performance talk, a rota change or a job interview; the A2 "bus" item is an in-vehicle announcement about a detour, and the B1 speaking "werkdruk" task is about the learner's own workload. No neighbourhood or volunteering content.
2. **mantelzorg** — health and care (under-represented per §9): a voorlichting about arranging care for a parent. The KNM card `batch006-wmo` states one fact ("hulp thuis via de gemeente") in the A2 photo-and-fact format; this text is a six-minute spoken explanation with three parties (gemeente, zorgverzekeraar, familie) and applied questions. Not the huisartsenpost (B1 reading batch 011), not the apotheek (A2 listening tabletten), not the basisverzekering card. The library is only the venue; the A2 "computercursus" item is a library course advertisement.

A six-word phrase comparison of both `text` fields against `content/catalogue.json` found no overlap.

## 3. Voice roles and speakers

Roles come from `config/voices.json`; each text uses two different roles throughout and no third voice.

| # | Speaker → role | Why |
| --- | --- | --- |
| 1 | Presentator → presenter; Farah → f-adult | `presenter` is the programme voice; Farah is in her forties, so the adult female voice. The presenter says *je* to a studio guest, as Dutch radio does; Farah answers informally. |
| 2 | Meneer Yilmaz → m-adult; Mevrouw Bakker → f-older | A professional from a steunpunt speaking to an audience (*u*); mevrouw Bakker is the cast's woman of about 65 (`config/illustration.json`), here caring for her 88-year-old mother, hence `f-older`. |

Names: Farah is from the blueprint §8 list; mevrouw Bakker from the illustration cast; Yilmaz is the function-holder suggested in the brief. Persona names in prompts: none (no persona prompts in this batch). Invented institutions: "het steunpunt mantelzorg in de bibliotheek", "het busbedrijf". Real institutions named only generically (gemeente, zorgverzekeraar, huisarts, Wmo).

## 4. Fragments

### 1 buschauffeur (7 fragments, 862 spoken words)

| Fragment | Turns (words) | Spoken words | ≈ seconds | Content |
| --- | --- | --- | --- | --- |
| q1 | Presentator 29 + Farah 101 | 130 | 54–59 | Opening; why she wanted a change: back pain from standing, wanting to learn something new before fifty; the neighbour's tip; not the money, not the shop closing |
| q2 | Presentator 10 + Farah 109 | 119 | 50–54 | The training: interview, a week's wait, medical check, three weeks of theory, then driving lessons; about four months in total, on a (lower) salary |
| q3 | Presentator 7 + Farah 109 | 116 | 48–53 | The exams: failed theory once ("te oud"), the daughter's diagnosis (too little practice), passed the retake and the practical first time |
| q4 | Presentator 15 + Farah 108 | 123 | 51–56 | First months: driving went fine, early shifts took getting used to, angry passengers were the hardest |
| q5 | Presentator 8 + Farah 108 | 116 | 48–53 | Family: husband supportive but worried about money, daughter quizzed her, mother thought she threw away twenty years of experience and has since ridden along |
| q6 | Presentator 17 + Farah 111 | 128 | 53–58 | Advice: shadow someone for a day first; do not resign too early; do not wait for a perfect moment |
| q7 | Presentator 13 + Farah 98 + Presentator 19 | 130 | 54–59 | Verdict: no regret, misses colleagues sometimes, maybe instructor later but at the same company; sign-off |

### 2 mantelzorg (6 fragments, 801 spoken words)

| Fragment | Turns (words) | Spoken words | ≈ seconds | Content |
| --- | --- | --- | --- | --- |
| q1 | Yilmaz 117 | 117 | 49–53 | Welcome; the question of the evening; families seek help too late (a fall, mixed-up medicines); begin early; three parts |
| q2 | Yilmaz 131 | 131 | 55–60 | Gemeente/Wmo: melding, then the keukentafelgesprek at home, the order (self, family and neighbours, then gemeente), examples (huishouden, traplift), do not buy before the decision, eigen bijdrage |
| q3 | Bakker 47 + Yilmaz 84 + Bakker 12 + Yilmaz 14 | 157 | 65–71 | Mevrouw Bakker's mother needs help washing, dressing and with steunkousen; that is wijkverpleging via the zorgverzekeraar, call a thuiszorgorganisatie, no huisarts needed; rule "huis → gemeente, lichaam → verzekeraar" |
| q4 | Yilmaz 135 | 135 | 56–61 | What family does: you are a mantelzorger; carers who never rest fall ill; respijtzorg (volunteer, a few days in a logeerhuis); sometimes paid by gemeente or verzekeraar; do not do everything yourself |
| q5 | Bakker 86 + Yilmaz 50 | 136 | 57–62 | Mevrouw Bakker feels guilty, thinks she ought to do it herself, but is tired; Yilmaz: asking for help is no weakness, an afternoon off makes a better carer |
| q6 | Yilmaz 106 + Bakker 10 + Yilmaz 9 | 125 | 52–57 | Where to ask (folder, gemeente, thuiszorg/verzekeraar, steunpunt on Tuesday and Thursday mornings); the one thing to remember; mevrouw Bakker will come by about the logeerhuis |

## 5. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring of its own fragment; every distractor is anchored in something said in that fragment.

### 1 buschauffeur

- **q1** detail, key **B** "Ze wilde nog iets nieuws leren." — "En eerlijk gezegd wilde ik gewoon nog iets nieuws leren voordat ik vijftig werd."
  - A "Ze wilde meer geld verdienen.": reversal of "Om het geld ging het niet, hoor, want het salaris is ongeveer hetzelfde."
  - C "Ze kon niet in de winkel blijven.": reversal of "de winkel bestaat nog steeds, dus ik had er gewoon kunnen blijven."
- **q2** quantity, key **C** "Ongeveer vier maanden." — "In totaal duurde de opleiding ongeveer vier maanden."
  - A "Ongeveer een week.": the wait between the interview and the start.
  - B "Ongeveer drie weken.": the theory part only.
- **q3** inference, key **B** "Ze had zich te weinig voorbereid." — the daughter says "je hebt gewoon te weinig geoefend" and Farah confirms "En ze had gelijk, want ik had die weken vooral gedacht dat het wel goed zou komen." The learner must recognise that Farah adopts her daughter's explanation.
  - A "Ze was te oud om de regels te onthouden.": Farah's own first thought ("zie je wel, ik ben te oud"), explicitly contradicted.
  - C "Ze was te zenuwachtig tijdens het examen.": nerves are mentioned as a feeling ("Spannend is zacht uitgedrukt"), never as the cause.
- **q4** opinion, key **C** "De boze passagiers." — "Maar het moeilijkst vond ik de passagiers die boos worden als de bus te laat is."
  - A "De vroege diensten.": something she had to get used to, ranked below the passengers by "Maar het moeilijkst".
  - B "Het rijden met de bus.": reversal of "Niet het rijden zelf, want dat ging na een paar weken vanzelf."
- **q5** person, key **A** "Haar man." — "Mijn man vond het een goed idee, maar hij maakte zich wel zorgen over het geld."
  - B "Haar dochter.": she helped with the theory.
  - C "Haar moeder.": she had doubts, but about wasted experience, not money.
- **q6** advice, key **A** "Eerst een dag meekijken bij het nieuwe werk." — "Ten eerste: ga een dag meekijken voordat je iets beslist."
  - B "Zo snel mogelijk hun oude baan opzeggen.": reversal of "zeg je baan niet te vroeg op."
  - C "Wachten tot de kinderen het huis uit zijn.": reversal of "wacht niet tot je vijftig bent, of tot de kinderen het huis uit zijn."
- **q7** opinion (whole text), key **B** "Ze is blij met haar keuze, al mist ze de winkel soms." — "Ik heb er geen seconde spijt van gehad, ook niet in die zware eerste maanden. Natuurlijk mis ik de winkel weleens…"
  - A "Ze wil over een paar jaar bij een ander bedrijf gaan werken.": plain reversal of "Maar dat is dan wel bij het busbedrijf, hoor. Ik ga nergens meer heen." (Replaced after the review; the former option "Ze wil over een paar jaar weer iets anders gaan doen." overgeneralised "Misschien word ik over een paar jaar nog instructeur" and let a learner who heard "instructeur" argue that becoming an instructor is "iets anders".)
  - C "Ze denkt achteraf dat ze beter in de winkel had kunnen blijven.": overgeneralisation of missing the colleagues; contradicted by "geen seconde spijt".

### 2 mantelzorg

- **q1** inference (function of an example), key **A** "Om te laten zien wat er gebeurt als families te lang wachten." — "Wat ik vaak zie, is dat families pas hulp zoeken als het echt niet meer gaat. Als moeder is gevallen, bijvoorbeeld… Dan moet alles ineens snel, en juist dan gaat het mis."
  - B "Om uit te leggen wat de gemeente doet na een val of een ongeluk.": the gemeente is announced as a topic for later, not explained here.
  - C "Om te waarschuwen dat ouderen beter niet alleen kunnen wonen.": reversal of the evening's premise ("thuis wil blijven wonen").
- **q2** sequence, key **C** "Er komt iemand van de gemeente op huisbezoek." — "Daarna komt een medewerker van de gemeente bij uw moeder thuis voor een gesprek; dat noemen we het keukentafelgesprek."
  - A "De gemeente regelt meteen hulp in het huishouden.": help comes only after the conversation ("Pas daarna kijkt ze welke hulp de gemeente zelf geeft").
  - B "Uw moeder krijgt een rekening voor de eigen bijdrage.": the eigen bijdrage belongs to help that is granted later, not to the melding.
- **q3** rule-application, key **B** "Hulp bij het schoonmaken van het huis." — the rule "gaat het om het huis, dan is het de gemeente. Gaat het om het lichaam, dan is het de zorgverzekeraar." applied to a case not literally in the fragment (schoonmaken).
  - A "Hulp bij het aantrekken van steunkousen.": in mevrouw Bakker's question; body care, so verzekeraar.
  - C "Hulp bij het wassen en het aankleden.": explicitly "geen taak van de gemeente".
- **q4** advice, key **C** "Regel op tijd iemand die de zorg soms overneemt." — "Daarom is mijn advies: regel op tijd iemand die de zorg af en toe van u overneemt. Dat heet respijtzorg."
  - A "Doe zo veel mogelijk zelf, dan blijft de zorg dichtbij.": reversal of "Doe niet alles zelf".
  - B "Vraag een vaste plek in een logeerhuis voor uw ouder.": overgeneralisation of "een paar dagen in een logeerhuis".
- **q5** opinion, key **A** "Ze wil de zorg liever zelf blijven doen, hoewel ze moe is." — "Ik vind eigenlijk dat ik het zelf hoor te doen, zolang ik het kan. Maar ik merk ook dat ik moe ben."
  - B "Ze wil dat haar broer een deel van de zorg overneemt.": the brother is only mentioned as living far away.
  - C "Ze wil dat haar moeder een paar dagen naar een logeerhuis gaat.": reversal; the thought of a logeerhuis makes her feel guilty.
- **q6** summary (whole text), key **C** "Vraag op tijd hulp en zorg ook goed voor uzelf." — "Vraag op tijd hulp, en zorg net zo goed voor uzelf als voor uw vader of moeder. Een mantelzorger die omvalt, helpt niemand."
  - A "Begin pas met hulp zoeken als het thuis echt niet meer gaat.": anchored in q1 ("families pas hulp zoeken als het echt niet meer gaat") and contradicted in this fragment by "wacht niet tot u het niet meer volhoudt" and "Vraag op tijd hulp". (Replaced after the review; the former option "Regel de zorg voor uw ouder zo veel mogelijk zelf." repeated the reversal already used as q4 A.)
  - B "Laat de zorg over aan de gemeente en de verzekeraar.": overgeneralisation of the list of numbers to call; the family stays involved.

## 6. Key balance and skills

| Key | Count | Share |
| --- | --- | --- |
| A | 4 | 31% |
| B | 4 | 31% |
| C | 5 | 38% |

Per text: buschauffeur B C B C A A B; mantelzorg A C B C A C. No letter above 40% or below 20%; all questions have three options, as the exam does.

Skills: opinion 3, inference 2, advice 2, detail 1, quantity 1, person 1, sequence 1, rule-application 1, summary 1. Each text has at least one `opinion` and one `inference`; the last question of each text is on the whole text (opinion, summary). Text 2 carries the `advice` and `rule-application` the brief asked for. Option lengths within a question differ by at most four words and the key is never the sole longest option (word counts per question, key starred: text 1 — 5/*6/7, 3/3/*3, 9/*6/7, 3/5/*3, *2/2/2, *8/7/8, 12/*12/12; text 2 — *12/14/10, 8/9/*8, 6/*7/7, 10/10/*9, *12/11/12, 12/10/*10). The checker's spread warning did not fire.

## 7. Language control

Figures from the build script (spoken turns only, sentences split on . ! ?):

| Text | Sentences | Average words | Longest | Over 20 words |
| --- | --- | --- | --- | --- |
| buschauffeur | 79 | 10.9 | 21 | 1 |
| mantelzorg | 72 | 11.1 | 21 | 3 |

- The blueprint's 12–18 average is written for reading texts; the brief's spoken target is 8–20 words per sentence, which both texts meet, with no sentence over 21 and none near the 30-word ceiling.
- Connectors in use: buschauffeur — want 4, dus 2, voordat 4, toen 6, namelijk, pas daarna, ten eerste/ten tweede, eigenlijk 2; mantelzorg — als 12, dus 4, want 4, daarom 2, omdat, zodat, voordat, juist 2, pas daarna. Relative clauses ("een buurvrouw, die zelf op de bus rijdt", "mensen die na een paar jaar zelf ziek worden"), passive ("die wordt betaald door de zorgverzekeraar"), conditionals ("Als je om vijf uur begint…", "Kan uw moeder … niet meer alleen doen? Dan…") and reported thought ("Ik dacht: zie je wel…") appear as B1 asks.
- Paraphrase between prompt and fragment: "te weinig voorbereid" ↔ "te weinig geoefend"; "op huisbezoek" ↔ "bij uw moeder thuis"; "schoonmaken van het huis" ↔ "het huis / het huishouden"; "de zorg soms overneemt" ↔ "af en toe van u overneemt"; "een dag meekijken" ↔ "meelopen"; "boze passagiers" ↔ "passagiers die boos worden".
- Numbers in words: drieënveertigste, twintig jaar, drie weken, vier maanden, vijf uur, half vier, drie jaar, achtentachtig, vijfenzestig, een half uur. No years, prices or amounts; no phone numbers.
- Less common words are carried by context: keukentafelgesprek (explained as "bij uw moeder thuis voor een gesprek"), wijkverpleging ("hulp bij het wassen en aankleden"), respijtzorg (defined in the same sentence), steunkousen (in a list with washing and dressing), medische keuring ("naar een arts … of je gezond genoeg bent"), herkansing (after "de eerste keer niet").
- Register: *je* between radio presenter and guest, *u* from the steunpunt worker to the audience and from mevrouw Bakker back; no transcribed hesitations ("uh", "nou"), a few spoken markers (hoor, eerlijk gezegd, ja).

## 8. Facts kept generic

Text 2 states only rules that hold in general and do not depend on the year: Wmo help is requested at the gemeente with a melding followed by a home conversation that looks at what the person, the family and the gemeente can do; household help and a traplift are Wmo examples; there is an eigen bijdrage (no amount); wijkverpleging (washing, dressing, steunkousen) is paid from the basisverzekering and does not need a referral, the wijkverpleegkundige assesses the need; respijtzorg exists (volunteer, logeerhuis) and is sometimes paid by the gemeente, sometimes by the insurer. No eigen risico statement was kept, no amounts, no waiting times, no Wlz. Text 1's training facts (medical check, theory, driving lessons, about four months, trained in the company's employment) are plausible for Dutch bus companies and are presented as one person's experience.

## 9. Checker result

```
> batch:check
> tsx scripts/batch-check.ts content/batches/012-original.json

Checked 2 items, 13 questions. Keys: {"B":4,"C":5,"A":4}. Options: {"3":13}.
No failures, no warnings.
```

## 10. Doubts for the reviewer

- **Wmo for the voice.** Fragment q2 of mantelzorg says "de Wmo" once ("Dat valt onder de Wmo, de wet voor ondersteuning thuis"). A text-to-speech voice may read the mixed-case abbreviation as a syllable rather than as letters, and the round-trip transcription may spell it differently. Options: keep and check at generation, write "de W-M-O" in the script, or replace with "de wet voor ondersteuning thuis" alone. The questions do not depend on the word.
- **"dinsdag- en donderdagochtend"** (mantelzorg q6): the hanging hyphen is correct Dutch but may confuse the voice; "op dinsdagochtend en donderdagochtend" is the safe alternative if the audio check flags it.
- **Interview length.** Seven fragments at 116–130 words give 862 spoken words, about six to six and a half minutes; the checker's 900-word cap on `text` (labels included) does not allow the seven minutes the brief mentions as the upper end.
- **Two `opinion` questions in text 1** (q4 "het moeilijkst", q7 the verdict). q4 could be relabelled `detail` if the reviewer prefers one opinion per text; the prompt "Wat vond Farah … het moeilijkst?" is an opinion operation in the official sense.
- **q3 mantelzorg** asks the learner to apply the huis/lichaam rule stated at the end of the fragment; the key (schoonmaken) is also supported by mevrouw Bakker's own summary line ("voor het huishouden de gemeente"). Confirm this reads as rule application rather than as a detail question.
- **q1 mantelzorg** (function of an example) is the most inferential item of the batch; if it is judged too hard for a first question, it can be swapped with a detail question on the same fragment ("Wat is het advies van meneer Yilmaz?" → "begin op tijd, als het nog rustig is").
- **Family portrayal** (text 1 q5): the sceptical relative is Farah's mother, who objects to wasted experience, not to a woman driving a bus; the husband worries about money, the daughter helps. Say if a different distribution is preferred.
- **Mevrouw Bakker's age.** She says she is sixty-five with an 88-year-old mother; this matches the cast description (about 65) and keeps `f-older` credible.
- **No persona prompts.** B1 listening prompts in the official exam are mostly direct ("Wat vindt…", "Waarom…"); none of the thirteen prompts uses a named third person.

## Revision after the editorial review (10 September 2026)

The editorial review (`content/reviews/012-review.md`, verdict revise, minor) passed `buschauffeur` as written and asked for two script edits in `mantelzorg`; the task also bundled five of the review's optional wording edits (§4 of the review) into the same round. All replacements are the reviewer's exact text; no key, evidence quote or explanation was changed. After each script edit the question `text` and the item `text` were rebuilt mechanically from the scripts, and every `evidence` was re-checked as a verbatim substring of its own fragment.

- **`B1:listening:batch012-mantelzorg:1`** — `questions[1].script[0].text` (q2, Meneer Yilmaz): "Dat valt onder de Wmo, de wet voor ondersteuning thuis." → "Dat valt onder de Wet maatschappelijke ondersteuning, de W-M-O. Die wet regelt hulp en ondersteuning thuis." (required: a text-to-speech voice may blend "Wmo" into a syllable and the round-trip transcription would not catch it; the hyphenated capitals are read as letters and the learner hears the full name once) and, in the same turn, "Pas daarna kijkt ze welke hulp de gemeente zelf geeft." → "Pas daarna kijkt de gemeente welke hulp ze zelf geeft." (optional: the subject "ze" was resolved only later in the sentence). `questions[5].script[0].text` (q6, Meneer Yilmaz): "elke dinsdag- en donderdagochtend" → "elke dinsdagochtend en donderdagochtend" (recommended: the hanging hyphen is correct in writing but a voice may pause or misread it). `questions[4].prompt` (q5): "hulp van buiten" → "hulp van buitenaf" (optional: the idiomatic phrase). `questions[5].options.A` (q6): "Regel de zorg voor uw ouder zo veel mogelijk zelf." → "Begin pas met hulp zoeken als het thuis echt niet meer gaat." (optional: the old option repeated q4's reversal; the new one is anchored in q1 and contradicted by "wacht niet tot u het niet meer volhoudt"; 12 words and 60 characters against B 10/52 and the key C 10/47, so a distractor, not the key, is the longest option). `questions[1].text`, `questions[5].text` and the item `text` were rebuilt. Fragment q2 is now 131 spoken words (q6 stays 125); the text has 801 spoken words and 825 words including the speaker labels (checker cap 900); the figures in §1, §4, §6 and §7 above were updated accordingly (one sentence became two, so 72 sentences at 11.1 words on average). Not applied, because the task did not bundle them: the optional q4 opening ("Over de zorgverzekeraar hebben we het net gehad. Dan nu het derde deel: …"). For the focused re-review: the q6 explanation still says "Alles zelf regelen raadt hij af", which addressed the retired option A; it remains true of the text, and the review asked for no explanation change.
- **`B1:listening:batch012-buschauffeur:1`** (passed; optional wording only) — `questions[6].script[1].text` (q7, Farah): "en ik breng ze daar." → "en ik breng ze daarnaartoe." (idiom; the q7 evidence is the first two sentences of the turn and is untouched). `questions[6].options.A` (q7): "Ze wil over een paar jaar weer iets anders gaan doen." → "Ze wil over een paar jaar bij een ander bedrijf gaan werken." (a plain reversal of "dat is dan wel bij het busbedrijf, hoor. Ik ga nergens meer heen."; 12 words like B and C, 60 characters against the key B's 53). `questions[6].text` and the item `text` were rebuilt; word counts are unchanged (862 spoken, 877 with labels). Not applied: the optional q1 option B paraphrase ("Ze wilde nog een nieuw vak leren."), which the task did not bundle.

Checker after the revision (`npm run batch:check content/batches/012-original.json`, 10 September 2026):

```
> batch:check
> tsx scripts/batch-check.ts content/batches/012-original.json

Checked 2 items, 13 questions. Keys: {"B":4,"C":5,"A":4}. Options: {"3":13}.
No failures, no warnings.
```

SHA-256 of `content/batches/012-original.json` after the revision: `3ac30bb5beed8dc1a39a50c93aabcb09e59e0fb07e85fce3f91608fb81ede224` (reviewed version: `3b1d54a6c5e6a1092f0fdc74d1b822d6f9793686c89e1f712b29ebc102de10f2`). There is no starters file for this batch. The §10 doubts above are answered in §5 of the review; they are kept as written.
