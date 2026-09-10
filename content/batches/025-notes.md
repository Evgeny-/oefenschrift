# Batch 025: design notes (B1 Luisteren, two texts)

Batch 025 contains two original B1 listening texts in the Staatsexamen NT2 Programma I shape of `content/blueprint.md` §4.7: a printed `situation`, a narrator `intro` of 8–60 words, and one fragment per question, each fragment a continuous stretch of one two-voice conversation with its own `script`. Thirteen closed questions with three options each. Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and `questions[].text` and the item `text` are the exact mechanical joins of the script turns that the audio pipeline will speak.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id | taskType | textType | domain | Setting | Q | Spoken words | Turns | Est. length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `B1:listening:batch025-kinderboeken:1` | interview | persuasief | educatie | Radio interview with Jari, teacher of Dutch to adults, who argues that adults learning Dutch should read children's books and newspapers for young readers: how he got the idea, why the language of a children's book works, what a children's newspaper adds, the presenter's objection ("als een kind behandeld") and his reply, how to read, a student's progression, his message | 7 | 865 (+33 intro) | 15 | ≈5.9–6.7 min |
| 2 | `B1:listening:batch025-medicijnlijst:1` | instructie | instructief | overig | A pharmacist explains to meneer De Vries the new medicine list, taking medicines with or without food, a missed dose, ordering repeat prescriptions on the website, collecting at the counter or from the pick-up locker, and phoning with questions; he reacts at the end | 6 | 834 (+46 intro) | 24 | ≈5.7–6.5 min |

Length estimate: 2.2–2.5 spoken words per second plus the 0.45 s stitching gap per turn from `config/voices.json`. Item `text` (fragments with speaker labels) is 880 and 878 words, under the checker's 900-word cap; the three-word label "Meneer De Vries" costs text 2 thirty words of budget, which is why its spoken total is a little lower. Any revision that adds words needs a matching cut (20 and 22 words of headroom).

## 2. Settings and why they are not duplicates

Existing B1 listening items: werkoverleg, lekkage, vrijwilligers festival (batch 002), buschauffeur and mantelzorg (batch 012), logistiek (study choice at a college) and ziekenhuiskeuken (first day in a hospital kitchen, batch 013). Neither setting here is a college, a workplace, a neighbourhood or a volunteering scene.

1. **kinderboeken** — education in the sense of language learning itself: a persuasive interview about a learning method, not a course choice (013 logistiek), not a career change (012 buschauffeur), not a library course advertisement (A2 computercursus). The library is only the place to fetch a book. It is the batch's `persuasief` text: the guest makes a claim, gives reasons, meets an objection and ends with advice. Blueprint §9 lists education as under-represented.
2. **medicijnlijst** — health and services (under-represented per §9): a spoken instruction at a pharmacy. Related existing items and how this one differs:
   - A2 listening `batch005-tabletten` (assistant hands over blood-pressure tablets: one a day, take it later if forgotten, never two at once, the huisarts writes the repeat). Here the subject is the *system* (list, food rules with a definition to apply, a two-branch missed-dose rule plus the twice-daily variant and the asterisk exceptions, online repeats via the pharmacy, locker versus counter, cold-chain rule, phone hours) in six one-minute fragments with applied questions; no drug is named; the missed-dose rule is stated with the same-day/next-day distinction the question tests, not the A2 "later on the day" line.
   - A2 reading `batch004-herhaalrecept` (a letter from "Apotheek De Wilg": order by website or bestellijn, ready the next working day, home delivery). Here ordering is one fragment of six, the pharmacy requests the prescription from the huisarts (two working days), there is no bestellijn and no delivery, and the questions on it are a quantity item, not a persona reading item.
   - KNM cards `receptmedicijnen`, `eigenrisico`: one-sentence facts; not touched here (no eigen risico, no cost).
   - B1 speaking `batch016-medicijn-school`: a parent instructing a teacher; different task and setting.

A six-word phrase scan of both items (all strings) against every string in `content/catalogue.json` and in every other batch file found only formula phrases: the situation line "U hoort een interview uit een radioprogramma over …" (shared with 012), the standard prompt "Wat is de belangrijkste boodschap van …" and "krijgt u een berichtje op uw telefoon". The presenter's sign-off was rewritten so that it no longer repeats the 012 formula ("dank je wel. Na het nieuws praten we met …"). The two texts share no six-word phrase with each other.

## 3. Voice roles and speakers

Roles come from `config/voices.json`; each text uses exactly two roles, and the narrator reads the intro and the questions. No third voice.

| # | Speaker → role | Why |
| --- | --- | --- |
| 1 | Presentator → presenter; Jari → m-adult | `presenter` is the programme voice (as in 012). Jari has taught for twelve years, so a man in his late thirties or forties: the adult male voice ("colleague, interviewer"). The presenter says *je* to a studio guest, as Dutch radio does; Jari answers in the same register and addresses the listener as *je* when he gives advice. |
| 2 | Apotheker → f-adult; Meneer De Vries → m-older | The pharmacist is a function label (blueprint §4.2 allows a name or a function); the app shows it, which tells the learner who is speaking. `f-adult` is the receptionist/huisarts-assistant voice. Meneer De Vries is the cast's man of about sixty (`config/illustration.json`), hence `m-older`. Both say *u*. |

Names: Jari, Modibo and Sabrina are from blueprint §8 or the illustration cast (Modibo is a cursist Jari mentions; Sabrina is the persona in text 1 q5); meneer De Vries is the cast's older man and was set by the brief; his daughter is unnamed. No invented organisation, shop, firm or web address appears in either text: "een taalschool", "de bibliotheek", "de apotheek", "uw huisarts", "de drogist", "het ziekenhuis" are all generic, so there was nothing to search as a company name. The only word that could be read as a title, "kinderkrant", was checked on the web on 10 September 2026: it is a common noun used by many local papers ("dé kinderkrant voor Maastricht", "de Rotterdamse kinderkrant"), and no title is named or implied; the fragment also says "een krant voor kinderen" and "kranten voor jonge lezers". No real newspaper for children is named (the brand names that exist were deliberately avoided), no broadcaster, no brand of phone or tablet.

## 4. Fragments

Spoken words exclude the speaker labels; seconds by the estimate in §1.

### Text 1: kinderboeken (7 fragments, 865 spoken words)

| Fragment | Turns (words) | Spoken | ≈ s | Content | Skill | Key |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Presentator 28 + Jari 99 | 127 | 52–59 | Introduction and claim; how the idea arose: newspaper articles failed (dictionaries open after two paragraphs), a student who read picture books to her daughter progressed faster than the group with less study time; he started reading children's books himself and now uses them in class | detail | A |
| q2 | Presentator 16 + Jari 108 | 124 | 51–57 | Why a children's book works: short sentences, common words that recur, ninety percent understood and the rest guessed, no dictionary; the newspaper is the reverse (half understood, every third word looked up, stop after ten minutes); everyday topics versus rente and beurs | detail | C |
| q3 | Presentator 12 + Jari 106 | 118 | 48–55 | Newspapers for young readers: same news, explained (the traffic-rule example); "twee keer winst": the language and how the country works; students silent in the work break; read a quarter of an hour a day rather than two hours a week | inference | B |
| q4 | Presentator 33 + Jari 95 | 128 | 52–59 | The objection (a grown-up with a book about a rabbit, treated like a child) and the reply: not toddlers' picture books but books for ten- to twelve-year-olds, real stories with humour and suspense; nobody sees what you read on a phone; the gym comparison (start light); whoever grabs the heavy newspaper rarely lasts a month | opinion | B |
| q5 | Presentator 10 + Jari 114 | 124 | 51–57 | How to do it: the ten-to-twelve shelf; choose a book whose first page you almost fully understand, put it back if under half; read on past an unknown word; look it up and note it only at the third encounter; five words per chapter; "wie elk woord opzoekt, leest geen boek, maar een woordenboek" | rule-application | A |
| q6 | Presentator 13 + Jari 116 | 129 | 53–60 | Not stuck at a child's level: Modibo began two years ago with books for ten, after half a year books for twelve, then youth books, now the newspaper on the train; a year and a half in total; would have stopped after a month with the newspaper; the staircase image | quantity | C |
| q7 | Presentator 19 + Jari 82 + Presentator 14 | 115 | 47–54 | The message: read every day something you almost fully understand and enjoy; the level comes by itself; people stop because they choose texts that are too hard, not because Dutch is too hard; choose easy, read a lot, no shame; sign-off | summary | A |

### Text 2: medicijnlijst (6 fragments, 834 spoken words)

| Fragment | Turns (words) | Spoken | ≈ s | Content | Skill | Key |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Apotheker 39 + De Vries 12 + Apotheker 65 + De Vries 9 + Apotheker 14 | 139 | 58–65 | The list: every medicine with strength, dose and moment; why: other care providers see at a glance what he takes (hospital, another doctor); keep it in the wallet, bring it to every appointment; report new or stopped medicines, also drugstore products (interactions) | detail | B |
| q2 | De Vries 25 + Apotheker 69 + De Vries 10 + Apotheker 38 | 142 | 59–66 | "Bij het eten" (during or right after the meal; some medicines hurt an empty stomach) versus "op een lege maag" (at least an hour before eating or two hours after; food reduces uptake); he skips breakfast: take the with-food tablets at lunch or dinner, or eat a rusk | rule-application | C |
| q3 | De Vries 13 + Apotheker 73 + De Vries 11 + Apotheker 44 | 141 | 58–66 | A forgotten tablet, once a day: noticed the same day, take it; noticed the next day, skip it and continue; never a double dose; twice a day: skip if the next one is nearly due; a few medicines have another rule (asterisk on the list); phone when in doubt | rule-application | A |
| q4 | Apotheker 60 + De Vries 4 + Apotheker 54 + De Vries 15 + Apotheker 7 | 140 | 58–66 | Ordering repeats: phoning still works, the website is easier (code in the letter, tick the medicines, message when ready); count on two working days because the huisarts must approve the prescription; order with a week's supply left; a repeat covers three months, four times a year; his daughter may do it with the code | quantity | B |
| q5 | Apotheker 79 + De Vries 8 + Apotheker 44 | 131 | 54–61 | Collecting: counter (weekdays eight to six, Saturday nine to one) or the locker outside (six-digit code from the message, open day and night, collect within three days); fridge medicines never in the locker, always at the counter; a mixed order all goes to the counter | rule-application | C |
| q6 | Apotheker 57 + De Vries 67 + Apotheker 17 | 141 | 58–65 | Questions by phone: weekdays ten to twelve someone is there for questions; number at the top of the list; the answering machine names the pharmacy on duty when it is urgent; his verdict (more work, but he sees the advantages; his daughter will help) and the close | opinion | A |

## 5. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring of its own fragment; every distractor is anchored in something said in that fragment and is wrong for one nameable reason.

### Text 1: kinderboeken

- **q1** detail, key **A** "Door een cursist die sneller vooruitging dan de anderen." — "Haar Nederlands ging dat jaar sneller vooruit dan dat van de rest van de groep, terwijl ze minder tijd had om te studeren. Dat zette me aan het denken." Paraphrase: "de anderen" ↔ "de rest van de groep".
  - B "Doordat zijn cursisten de artikelen uit de gewone krant goed begrepen.": reversal of "na twee alinea's lagen de artikelen op tafel en gingen de woordenboeken open."
  - C "Doordat hij als kind zelf graag prentenboeken had gelezen.": mishearing of "Ik ben toen zelf kinderboeken gaan lezen", which happened after the idea, as a teacher.
- **q2** detail, key **C** "Omdat je bijna alles begrijpt en de rest kunt raden." — "Als je een bladzijde leest, begrijp je misschien negentig procent. Die laatste tien procent raad je uit de zinnen eromheen, en zo leer je nieuwe woorden zonder woordenboek." Paraphrase: "bijna alles" ↔ "negentig procent".
  - A "Omdat je in een kinderboek elk onbekend woord kunt opzoeken.": "elk derde woord op[zoeken]" is what happens with the newspaper, and the point of the book is "zonder woordenboek".
  - B "Omdat een kinderboek dezelfde woorden gebruikt als de gewone krant.": reversal of the contrast between everyday words and "de rente en de beurs".
- **q3** inference (meaning of an expression), key **B** "Je leert de taal en je leert hoe Nederland werkt." — "Voor iemand die nieuw is in Nederland is dat twee keer winst: je leert de taal, en je leert hoe het land werkt." Paraphrase: "Nederland" ↔ "het land".
  - A "Je leert de verkeersregels en je weet wat de minister besluit.": takes the one example for the general point; and what the minister decided is what the *ordinary* newspaper reports.
  - C "Je leert de taal en je maakt vrienden op je werk.": overgeneralisation of "kan meepraten" in the work break; friends are never mentioned.
- **q4** opinion (his answer to the objection), key **B** "Boeken voor kinderen van tien tot twaalf zijn ook voor volwassenen leuk." — "Ik bedoel boeken voor kinderen van tien tot twaalf jaar. Dat zijn echte verhalen, met humor en spanning, en veel volwassenen lezen ze met plezier."
  - A "Volwassenen kunnen het beste beginnen met prentenboeken voor jonge kinderen.": reversal of "ik zeg niet dat je prentenboeken voor peuters moet lezen."
  - C "Wie zich als een kind behandeld voelt, kan beter de gewone krant pakken.": takes the presenter's words and reverses Jari's "Wie meteen de zware krant pakt, houdt het meestal geen maand vol."
- **q5** rule-application (persona Sabrina, second encounter of an unknown word), key **A** "Gewoon doorlezen zonder het woord op te zoeken." — "Kom je een woord tegen dat je niet kent, dan lees je gewoon door, want vaak wordt het een paar zinnen later duidelijk. Kom je hetzelfde woord voor de derde keer tegen en snap je het nog steeds niet? Dan pas zoek je het op, en schrijf je het in een schriftje." The learner must hear that looking up starts at the *third* encounter.
  - B "Het woord opzoeken en in een schriftje schrijven.": the rule for the third encounter.
  - C "Het boek terugzetten, omdat het te moeilijk is.": the rule for a first page understood for less than half.
- **q6** quantity, key **C** "Anderhalf jaar." — "In totaal heeft hij daar anderhalf jaar over gedaan."
  - A "Een half jaar.": the time until he read books for twelve-year-olds.
  - B "Twee jaar.": when he started ("twee jaar geleden"); consistent with the key (he has read the newspaper for half a year).
- **q7** summary (whole text), key **A** "Kies teksten die je bijna helemaal begrijpt en lees elke dag." — "Lees elke dag iets wat je bijna helemaal begrijpt en waar je plezier in hebt."
  - B "Begin zo snel mogelijk met de gewone krant, ook als dat moeilijk is.": reversal of "Kies dus makkelijk" and of q4's warning; the newspaper is the end of the staircase, not the start.
  - C "Nederlands is voor de meeste mensen te moeilijk om alleen te leren.": reversal of "De meeste mensen stoppen niet omdat Nederlands te moeilijk is, maar omdat ze teksten kiezen die te moeilijk zijn."

### Text 2: medicijnlijst

- **q1** detail, key **B** "Zodat andere zorgverleners direct zien wat hij gebruikt." — "Wij wel, maar andere zorgverleners niet. Komt u in het ziekenhuis, of bij een andere arts, dan ziet die in één oogopslag wat u gebruikt." Paraphrase: "direct" ↔ "in één oogopslag".
  - A "Omdat de apotheek anders niet weet welke medicijnen hij gebruikt.": reversal of "Wij wel" (the pharmacy already knows).
  - C "Omdat hij zonder de lijst geen middelen bij de drogist mag kopen.": anchored in the drogist exchange; never said — he must *report* drugstore products, because some combine badly with his medicines.
- **q2** rule-application (he eats at six; when can he take the empty-stomach medicine), key **C** "Om vijf uur." — "Dat betekent: minstens een uur voordat u eet, of twee uur nadat u hebt gegeten." Five is one hour before six.
  - A "Om half zes.": half an hour before; less than the minimum hour.
  - B "Om zeven uur.": one hour after; the rule asks two hours after eating.
- **q3** rule-application (once a day, noticed the same evening), key **A** "De tablet alsnog innemen." — "Neemt u een medicijn één keer per dag, en merkt u dezelfde dag nog dat u hem vergeten bent, dan neemt u de tablet alsnog in."
  - B "De tablet overslaan en zondag gewoon verdergaan.": the rule for noticing the next day.
  - C "Zondagochtend twee tabletten tegelijk innemen.": the double dose that is forbidden ("Wat u nooit doet").
- **q4** quantity, key **B** "Twee werkdagen." — "Reken op twee werkdagen, want wij vragen het recept eerst aan bij uw huisarts, en die moet het goedkeuren."
  - A "Ongeveer een week.": the supply he should still have when he orders.
  - C "Drie maanden.": the period a repeat prescription usually covers.
- **q5** rule-application (a fridge medicine ordered together with tablets), key **C** "Alle medicijnen aan de balie." — "En bestelt u een koelkastmedicijn samen met andere medicijnen, dan leggen wij alles bij de balie, zodat u niet twee keer hoeft te komen." Two rules combine: fridge medicines never go in the locker, and a mixed order is kept together.
  - A "De tabletten uit de kluis, het koelkastmedicijn aan de balie.": applies only the first rule and ignores "alles bij de balie".
  - B "Alle medicijnen uit de afhaalkluis.": reversal of "Dat gaat nooit in de kluis".
- **q6** opinion (whole text), key **A** "Hij vindt het meer werk, maar hij ziet ook de voordelen." — "Dit is meer werk voor mij, dat wel. Maar ik snap het: in het ziekenhuis weten ze meteen wat ik gebruik, en met die kluis hoef ik niet meer in de rij te staan."
  - B "Hij vindt het makkelijker dan vroeger en regelt het graag zelf.": reversal of "meer werk", and his daughter helps with the website.
  - C "Hij vindt het te ingewikkeld en wil liever blijven bellen.": anchored in "Vroeger belde ik"; contradicted by "Maar ik snap het" and the plan to use the website.

## 6. Key balance and skills

| Key | Count | Share |
| --- | --- | --- |
| A | 5 | 38% |
| B | 4 | 31% |
| C | 4 | 31% |

Per text: kinderboeken A C B B A C A; medicijnlijst B C A B C A. No letter above 40% or below 20%; no key three times in a row; all questions have three options, as the exam does.

Skills: rule-application 4 (text 1 q5; text 2 q2, q3, q5 — the brief asked for at least two in text 2), detail 3, inference 1, opinion 2, quantity 2, summary 1. Each text ends with a whole-text item (summary, opinion). Option lengths per question (words/characters, key starred): text 1 — *9/56 11/70 9/58, 10/60 10/67 *10/52, 11/62 *10/49 11/49, 10/76 *12/72 13/72, *8/47 8/49 8/47, 3/14 2/10 *2/15, *11/61 13/68 12/67; text 2 — 10/65 *8/56 12/65, 3/12 3/13 *3/12, *4/25 7/48 5/46, 3/18 *2/15 2/13, 10/61 5/35 *5/29, *11/56 11/63 10/58. The key is never the sole longest option by word count (text 2 q6 ties with B), and by characters only in text 1 q6 (one character over "Een half jaar."). Prompt words that recur only in the key: none (text 1 q3's "twee keer winst" is quoted in the prompt and defined in the evidence, not repeated in an option).

## 7. Language control

Figures from the build script (spoken turns only, sentences split on . ! ?):

| Text | Sentences | Average words | Longest | Over 20 words |
| --- | --- | --- | --- | --- |
| kinderboeken | 70 | 12.4 | 26 | 6 |
| medicijnlijst | 70 | 11.9 | 26 | 7 |

Per speaker: Jari 53 sentences, average 13.6, 64% at twelve words or more; the presenter 8.5. Apotheker 51 sentences, average 12.9, 55% at twelve or more; meneer De Vries 9.2. Both texts sit at the low end of the blueprint's 12–18 average, which is written for reading; the brief's spoken target of 8–20 words per sentence is met, no sentence exceeds 26, none approaches the 30-word ceiling. Two list-like sentences of 27 and 28 words were split before the final build.

- Connectors in use: kinderboeken — want 3, omdat 3, terwijl, zodra, dus, daarom, bovendien, toen 2, juist, dan pas, conditionals with inversion ("Begrijp je minder dan de helft, dan …", "Kom je een woord tegen …, dan …", "Was hij op dag één … begonnen, dan …"), relative clauses ("een boek waarvan je de eerste bladzijde bijna helemaal begrijpt", "de cursisten die zo zijn begonnen"), a counterfactual ("dan was hij volgens mij na een maand gestopt"); medicijnlijst — want 4, dus 2, terwijl, zodra, zodat, voordat, nadat, daarom, namelijk, anders, alsnog, juist, inverted conditionals throughout ("Komt u in het ziekenhuis, dan …", "Neemt u een medicijn één keer per dag, en merkt u …, dan …", "Liggen uw medicijnen in de kluis, dan …", "Twijfelt u, bel ons dan"), relative clauses ("elk medicijn dat u gebruikt", "de medicijnen die bijna op zijn", "het medicijn dat in de koelkast moet").
- Paraphrase between prompt or key and fragment: "de anderen" ↔ "de rest van de groep"; "bijna alles" ↔ "negentig procent"; "Nederland" ↔ "het land"; "leuk" ↔ "met plezier"; "voor de tweede keer" (prompt) against "voor de derde keer" (rule); "direct" ↔ "in één oogopslag"; "om vijf uur" computed from "minstens een uur voordat u eet"; "alle medicijnen aan de balie" ↔ "alles bij de balie"; "de voordelen" ↔ the two advantages he names.
- Numbers in words: twaalf jaar, twee alinea's, negentig procent, tien procent, tien minuten, tien tot twaalf jaar, een kwartier, twee uur, de derde keer, vijf woorden, twee jaar, een half jaar, vijftien jaar, anderhalf jaar, een maand; zes medicijnen, een uur, twee uur, één keer per dag, twee keer per dag, twee werkdagen, een week, drie maanden, vier keer per jaar, acht tot zes, negen tot één, zes cijfers, drie dagen, tien en twaalf. No digits, years, prices or phone numbers in any turn.
- Less common words carried by context: prentenboek (read to a daughter every evening), opstap ("geen eindpunt"), trede (in the staircase image), schriftje (write the word in it), zorgverleners (hospital, another doctor), oogopslag ("ziet die … wat u gebruikt"), dosis ("twee tabletten"), herhaalrecept (the ordering context), afhaalkluis (a code, a door that opens), koelkastmedicijn, bijwerking (a question for the pharmacy), antwoordapparaat.
- Register: *je* between radio presenter and guest; *u* between pharmacist and customer. No transcribed hesitations ("uh", "nou", "hè") and no "eerlijk gezegd"; a few natural openers ("Juist daarom.", "Via een omweg.", "Dat is een hele uitleg."). No quotation marks inside spoken turns (the terms "bij het eten" and "op een lege maag" are embedded in sentences so the voice does not have to mark them).
- Words that could trip a voice: "'s ochtends" appears twice mid-sentence, never sentence-initial; "één" and "alinea's" are ordinary; "tablet" means a device in text 1 (once, next to "telefoon") and a pill in text 2, never both in one text.

## 8. Facts kept generic

Text 2 states only rules that hold in general or are presented as this pharmacy's own arrangements, with no drug name, disease, amount or year:

- A medicine list (actueel medicatieoverzicht) records each medicine with strength, dose and time; patients are advised to carry it and show it to other care providers, and to report changes and self-bought products so the pharmacy can check interactions.
- "Bij het eten" means with or right after a meal; "op een lege maag" means at least an hour before or two hours after eating, because food can reduce the uptake of some medicines. This is the standard patient-information wording; it is stated as the meaning of the two phrases on the list.
- A forgotten dose: for once-daily medicines, take it the same day, skip it if only noticed the next day, never double; for twice-daily, skip if the next dose is nearly due; some medicines have other rules, marked on the list, and the pharmacy should be phoned when in doubt. Stated as "de algemene regel" of this pharmacy with an explicit exception clause; no medicine is named, so no rule is attributed to a specific drug.
- Repeat prescriptions: many pharmacies request the repeat from the huisarts on the patient's behalf (herhaalservice), which takes a couple of working days; a repeat commonly covers three months; a first prescription needs the doctor. The two-day figure, the "order with a week left" advice, the login code and the text message are this pharmacy's arrangements.
- Pick-up lockers with an SMS code exist at Dutch pharmacies; that cold-chain medicines are not placed in this locker and that mixed orders are kept at the counter are this pharmacy's rules.
- Phone hours, the answering machine naming the pharmacy on duty: this pharmacy's arrangements; the dienstapotheek system is real and is not named.

Text 1 states no institutional facts: the reading advice (understand about ninety percent, read on past unknown words, look up on the third encounter, read fifteen minutes a day) is Jari's method, presented as his experience, and the figures (twelve years, two years, half a year, a year and a half) are the story's own.

## 9. Checker result

```
> batch:check
> tsx scripts/batch-check.ts content/batches/025-original.json

Checked 2 items, 13 questions. Keys: {"A":5,"C":4,"B":4}. Options: {"3":13}.
No failures, no warnings.
```

SHA-256 of `content/batches/025-original.json` at the time of writing: `f1c3256c5a210517294be7dd7a382109e3bbe335d9696eb959c7b0862b4ac63f`. There is no starters file (no open tasks).

## 10. Doubts for the reviewer

- **Text 1 q3 labelled `inference`.** "Wat bedoelt Jari met 'twee keer winst'?" asks for the meaning of an expression; the evidence defines it in the same sentence, so a strict reader may call it `detail`. The listening work lies in separating the general point from the traffic-rule example (A) and from the consequence he draws next (meepraten, C). Relabel to `detail` if preferred; the text then keeps `opinion` (q4) as its judgement item and `summary` (q7) as its whole-text item.
- **Three `rule-application` items in text 2** (q2, q3, q5) against the brief's "at least two". q5 could be relabelled `time-place` (where to collect) if the reviewer wants more spread; it was labelled as it is because the key needs two rules combined, and no `time-place` item exists in the text otherwise.
- **Text 2 q2 arithmetic.** The key "Om vijf uur" is exactly the minimum ("minstens een uur voordat u eet"). A learner who hears "minstens" as "more than" could hesitate; no option offers an earlier time, so the answer stays unique. If the reviewer prefers a margin, "Om half vijf" as the key and "Om half zes" / "Om zeven uur" as distractors works with the same evidence.
- **Medical content.** The missed-dose rule is a simplification that pharmacies give as general guidance; the script hedges it twice ("Voor de meeste medicijnen geldt een simpele regel", "Voor een paar medicijnen geldt een andere regel; die staan op de lijst met een sterretje. Twijfelt u, bel ons dan."). Say if a stronger hedge is wanted; the q3 key does not depend on it.
- **"Apotheker" as a function label.** In a Dutch pharmacy the counter is usually staffed by apothekersassistenten; a sit-down explanation of a new list for a patient on six medicines is a plausible task for the pharmacist herself (medicatiegesprek), which is why the intro says the pharmacist invited him. If a name is preferred, "Sabrina" (cast, thirties) fits `f-adult`; the change touches fourteen turns, the intro and every prompt that says "de apotheker".
- **Register of text 1.** The presenter and Jari use *je*; Jari's advice also addresses the listener as *je* ("Kies een boek waarvan je …"). This is how a guest talks on Dutch radio; a reviewer who wants a *u* register for the advice fragments (q5, q7) should say so, but that would sit oddly with the *je* of the interview itself.
- **Length.** Texts run about six minutes with the intro and turn gaps (5.9–6.7 and 5.7–6.5), inside the 4–7 minute window; fragments 47–66 s. The 900-word cap leaves 20 and 22 words of headroom, so any added sentence needs an offsetting cut in the same text.
- **Sign-off of text 1.** "Straks horen we een luisteraar die op deze manier Nederlands heeft geleerd." replaces the 012-style "Na het nieuws praten we met …" so the two radio interviews do not end with the same formula.
- **No persona prompts in text 2 beyond meneer De Vries himself.** The three rule items put the customer in the case ("Meneer De Vries eet 's avonds om zes uur …"), as the official Luisteren I items do with the speaker of the fragment; text 1 q5 uses a third person (Sabrina).
