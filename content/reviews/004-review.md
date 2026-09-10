# Batch 004 editorial review

**Verdict:** Pass, after the focused re-review at the end of this document. The full review below (sections 1–7) recorded *Revise*: ten of twelve items passed, two needed a small prompt edit (`praktijkles`, `bloedprikken`), no item was rejected, and one batch-level, non-content recommendation was made (key positions in the four-option questions). The coordinator applied exactly those changes; the re-review confirms them and sets `ready_for_integration` to true.

**Reviewed source:** `content/batches/004-original.json`  
**SHA-256:** `859664e53824ef4387c2cdc258c907353df7beea78f4c1933ae979ee24f6e573` (after the focused re-review at the end of this document; the full review below was written against `c921d32ae0b8863ea6ed762c41c522db8e1b5f6b19b01aa4c6323fda7271595a`, which the re-review shows differs only in the five fields named there)  
**Review type:** independent AI editorial review against `content/reviews/rubric.md`, `content/blueprint.md` sections 1, 3, 4.1, 5, 8, 9, 10 and 13, and `docs/research/content-workflow.md` section 5. The reviewer did not write or edit the batch. The author's notes (`content/batches/004-notes.md`) were read only after every item had been judged, and were then used to check the distractor rationales.

## 1. Batch summary

Twelve original A2 reading items (`exam: duo-a2`, `part: reading`), thirty closed questions. JSON parses; all twelve IDs are unique; every `evidence` value is a verbatim substring of its `text` and every key exists in its options (verified by script, independently of the checker).

| Check (blueprint 4.1 / 5 / 10) | Result |
| --- | --- |
| Text length 100–250 words | 136–178 words per text (all twelve inside the range) |
| Two or three questions per text | 6 × 3, 6 × 2 |
| Three- and four-option mix (≈60/40) | 18 three-option, 12 four-option (60/40) |
| Persona-scenario question per text | 12 of 12 |
| Purpose question per two or three texts | 6 (items 1, 2, 3, 10, 11, 12) |
| Texts with a table | 3 (`telefoon`, `stadsbus`, `bloedprikken`) |
| Situation line naming a person and a source | 12 of 12 |
| Task type recognisable from the text | 12 of 12 (letters have opening and closing, e-mails have headers, folders and the rooster have tables, the regels text has numbered steps, the advertentie recruits, the krant item has a headline and a quoted spokesperson, the bericht is a shop notice) |
| Domains | all eight; `werk`, `wonen-buurt`, `winkels-diensten`, `gezondheid` twice each |
| A2 sentence heuristics (prose, table rows and header lines excluded) | average 5.9–8.8 words per sentence, longest 15 words; subordinate clauses limited to `als`/`dat`; conditions expressed as "Vraag? Dan …" |
| Weekday/date pairs | all fifteen pairs hold on a real calendar (autumn dates in 2026, February/May/June dates in 2027) |
| Names, places, phone numbers | invented and plausible; cast names match `config/illustration.json` traits (Sem is a teenager and is "17 jaar"; mevrouw Bakker is about 65 and is "66 jaar"; Amina is a child) |
| `status: draft`, `targetLevelValidated: false` | 12 of 12 |

## 2. Checker output

`npm run batch:check content/batches/004-original.json` (run 10 September 2026):

```
Checked 12 items, 30 questions. Keys: {"C":9,"A":8,"B":8,"D":5}. Options: {"3":18,"4":12}.
  warn  A2:reading:batch004-telefoon:1: longest sentence 48 words (A2 target 18)
  warn  A2:reading:batch004-stadsbus:1: average sentence length 12.2 words (A2 target under 12)
  warn  A2:reading:batch004-stadsbus:1: longest sentence 60 words (A2 target 18)
  warn  A2:reading:batch004-bloedprikken:1: longest sentence 52 words (A2 target 18)
4 warning(s), no failures.
```

All four warnings come from the checker's splitter (`/[.!?]+\s/`) merging the unpunctuated table rows with the next sentence. Excluding table rows, the prose of those three texts averages 6.6, 8.1 and 6.7 words per sentence with longest sentences of 11, 15 and 12 words. The rows render as separate lines in the app (`white-space: pre-line` in `app/styles/exercise.css`), so no change is requested. The checker did not report any slug already used in the catalogue.

### Key balance

| Group | A | B | C | D |
| --- | ---: | ---: | ---: | ---: |
| All 30 questions | 8 (27%) | 8 (27%) | 9 (30%) | 5 (17%) |
| 18 three-option questions | 6 | 6 | 6 | — |
| 12 four-option questions | 2 (17%) | 2 (17%) | 3 (25%) | 5 (42%) |

Across the whole batch no letter exceeds 40%, and D cannot reach 20% of all questions in a 60/40 mix without being keyed in half of the four-option questions, so the batch-wide reading of the rule is satisfied as far as it can be. Within the four-option questions, however, D is keyed five times out of twelve (42%) and A and B twice each; a test-wise learner would gain from guessing D. See the batch-level recommendation in section 4.

## 3. Item findings and verdicts

| Item | Type / domain | Verdict | Keys | Summary |
| --- | --- | --- | --- | --- |
| `A2:reading:batch004-parkeervergunning:1` | brief / instanties | Pass | C, A, B | Renewal deadline, balie appointment and purpose all proven; distractors sit on the expiry date, the kenteken rule and the no-car rule. |
| `A2:reading:batch004-werkkleding:1` | brief / werk | Pass | A, D | Pick-up day and purpose proven; one weak (but anchored) distractor noted. |
| `A2:reading:batch004-praktijkles:1` | email / opleiding | Revise (minor) | C, B, A | Persona prompt in q1 leaves the start of the working day implicit; one-phrase fix. |
| `A2:reading:batch004-picknick:1` | email / vrije-tijd-familie | Pass | C, D | Rain rule and person proven; optional naturalness note. |
| `A2:reading:batch004-telefoon:1` | folder / winkels-diensten | Pass | B, A, C | Time cut-off, Saturday rule and payment moment proven; q3 repeats a concept from the catalogue (optional swap). |
| `A2:reading:batch004-stadsbus:1` | folder / vervoer | Pass | A, B, C | Child fare, no-pinpas channel and late-evening service proven; q3 combines two rules cleanly. |
| `A2:reading:batch004-bloedprikken:1` | rooster / gezondheid | Revise | D, B | q1 prompt admits a competing answer (morning locations before work); prompt must fix the working hours. |
| `A2:reading:batch004-verwarming:1` | regels / wonen-buurt | Pass | C, A | First step and reporting channel proven; vocabulary dense but genre-typical. |
| `A2:reading:batch004-magazijn:1` | advertentie / werk | Pass | D, B | Age rule and calling window proven; wage realism note (optional). |
| `A2:reading:batch004-ramen:1` | krant / wonen-buurt | Pass | B, A | Street start date and purpose proven; easier than average. |
| `A2:reading:batch004-flessenautomaat:1` | bericht / winkels-diensten | Pass | C, D, A | Desk hours, small-bottle rule and purpose proven. |
| `A2:reading:batch004-herhaalrecept:1` | brief / gezondheid | Pass | C, B, C | Next-working-day rule, delivery fee and purpose proven. |

### `A2:reading:batch004-parkeervergunning:1` — Pass

Letter from "Gemeente Westerhout, Afdeling Parkeren" with "Betreft", "Geachte heer Aziz," and "Met vriendelijke groet"; 162 words; formal `u` throughout. Situation: "Karim krijgt een brief van de gemeente."

- q1 (rule-application, key C). Proven by "Wilt u ook volgend jaar in uw buurt parkeren? Verleng dan uw vergunning vóór 1 december." A ("Na 31 december een nieuwe vergunning vragen") confuses the expiry date "geldig tot en met 31 december" with the moment to act; nothing in the letter offers a new application after expiry. B ("Vóór 1 december zijn kenteken doorgeven") has the right date and the wrong action: the kenteken is only for "Hebt u een andere auto gekocht?". D reverses "Hebt u geen auto meer? Dan hoeft u niets te doen. De vergunning stopt dan vanzelf". Options are parallel (six or seven words); the key is not the longest. Explanation names the 31 December confusion.
- q2 (sequence, key A). Proven by "Of u komt naar de balie in het gemeentehuis. Maak daarvoor eerst een afspraak." B belongs to the online route ("U regelt het online met uw DigiD"); C is a cost, not a first step. "eerst" in the prompt closes the reading.
- q3 (purpose, key B). "Zijn vergunning loopt bijna af" follows from "Deze vergunning is geldig tot en met 31 december … Verleng dan uw vergunning vóór 1 december." A and C are conditional examples in the letter, not its reason.
- Language: natural gemeente register ("Hebt u vragen? Bel ons op werkdagen tussen 9.00 en 17.00 uur."). "kenteken" is inferable from "andere auto gekocht" and appears only in a distractor. Facts: 8 euro × 12 = 96 euro is consistent; renewal by DigiD or at the balie by appointment is how gemeenten work.
- Level: comparable — a 160-word institutional letter where q1 asks the learner to combine the purpose sentence with a deadline, as in the official gemeente letters.

### `A2:reading:batch004-werkkleding:1` — Pass

Letter to all staff from a cleaning company, "Beste collega," … "Ilse Vermeer, Directeur"; 142 words; `u` from an employer is normal. Dates (vrijdag 9 oktober, woensdag 28 oktober, donderdag 29 oktober, maandag 2 november) are correct for 2026.

- q1 (rule-application, key A). Proven by "Dat kan op woensdag 28 oktober of donderdag 29 oktober tussen 8.00 en 16.00 uur."; with Wednesday excluded by the prompt, Thursday 29 October is the only pick-up day. B is the form deadline "Lever het vóór vrijdag 9 oktober in bij Tom op kantoor."; C is "Vanaf maandag 2 november dragen wij nieuwe werkkleding." Neither is a pick-up day.
- q2 (purpose, key D). Proven by "Vanaf maandag 2 november dragen wij nieuwe werkkleding. Iedereen krijgt twee broeken, drie shirts en een jas. De kleding is gratis." B is reversed by "De kleding is gratis."; C is reversed because on 28 and 29 October the magazijn is exactly where staff collect the clothing. A ("Het bedrijf gaat verhuizen") is the weakest distractor in the batch: its only anchor is the address "Industrieweg 8" appearing in the letterhead and again for the magazijn. It is not defensible, so it does not fail the item, but it does little work.
- Language: natural ("Loop even binnen bij Tom op kantoor.", "Die nemen wij weer in."). "Wij moeten uw maat weten." is blunt but acceptable in a staff letter.
- Level: comparable — a staff letter with four dates; q1 is a date exclusion, q2 a purpose question.

### `A2:reading:batch004-praktijkles:1` — Revise (minor)

E-mail with "Van/Aan/Onderwerp" header, "Beste cursist," and a signed closing; 150 words; formal `u`. Dates (dinsdag 2, donderdag 4, zaterdag 6 februari) are correct for 2027.

- q1 (rule-application, key C). The key is proven by "3. Praten in de winkel: zaterdag 6 februari, 10.00 tot 12.00 uur." — the only lesson outside the working week. The prompt, however, reads "Fatima werkt van maandag tot en met vrijdag tot 17.00 uur." It gives an end time and no start time. The item's logic needs both lesson 1 (dinsdag 9.30–11.30) and lesson 2 (donderdag 13.30–15.30) to fall inside her working hours, which the prompt only implies. The natural reading ("a day job ending at 17.00") is the intended one, so this is a precision gap rather than a competing answer, but official persona prompts state the constraint fully, and the double "tot" ("van maandag tot en met vrijdag tot 17.00 uur") is clumsy Dutch. Revision request below.
- q2 (quantity, key B). Proven by "Volgt u alleen de avondles? Dan betaalt u 15 euro." A applies the day-course rule to an evening student; C and D take the numbers 10 (group size "plaats voor tien cursisten") and 20 ("vóór 20 januari") from the text. Functional.
- q3 (purpose, key A). Proven by "In februari geven wij drie extra lessen. … U kiest één les." B misreads the address "Schoolstraat 4" as a move; C misreads "Is de groep vol? Dan krijgt u bericht van ons." as a present state. One defensible answer. Optional: the e-mail invites rather than obliges ("Wilt u meedoen?"), so "De cursisten kunnen een extra les kiezen." would match the text more exactly than "moeten"; not required for the key to hold.
- Level: comparable — three-line schedule plus a price condition and a sign-up rule; q1 and q2 each combine a personal constraint with one line of the text.

### `A2:reading:batch004-picknick:1` — Pass

Informal family e-mail ("Hoi allemaal," … "Groetjes, Roos"), `je` register, 144 words; "zondag 13 juni" is a Sunday in 2027. Situation: "Sem krijgt een e-mail van zijn zus Roos."

- q1 (rule-application, key C). Proven by "Regent het zondag? Dan gaan we niet naar het park. We eten dan bij mij thuis, Lindelaan 14." A ("bij de vijver") and B ("de ingang aan de Parklaan") are the fair-weather picnic spot and meeting point; the rain sentence cancels both. Roos's Saturday-evening weather message does not create a second answer because none of the options is "wait for the message".
- q2 (person, key D). Proven by "Papa brengt mama om 12.30 uur naar het park." Roos brings the cake and the blanket, Sem "drinken en bekers", tante Nadia "fruit en koekjes".
- Language notes (optional, not affecting the answers): "Mama wordt zondag 13 juni 50 jaar. Ze weet het nog niet, dus zeg niets tegen haar!" comes before the picnic is introduced in the body; "het" resolves through the subject line "picknick voor mama", but a native writer would more likely place the secrecy sentence after "Ik wil een picknick voor haar maken …". "een picknick maken" is colloquial; "organiseren" or "houden" is the usual collocation. "Amina" is not introduced, which fits the cast (a child) but a learner cannot place her; harmless.
- Level: easier — the shortest sentences in the batch, direct lookups, one simple condition. Comparable with the easier official family e-mails.

### `A2:reading:batch004-telefoon:1` — Pass

Repair-shop folder with a four-row table (Reparatie – Prijs – Klaar); 153 words; formal `u`. Situation: "Julio leest een folder van een telefoonwinkel."

- q1 (rule-application, key B). Tuesday 14.00 is after the cut-off, so "Brengt u hem later? Dan is het scherm de volgende dag klaar." gives Wednesday. A is the table row "Nieuw scherm – 79 euro – dezelfde dag" read without its condition; C imports "in 2 dagen" from the oplaadaansluiting row; D imports the Saturday paragraph. Two details must be combined; that is the intended difficulty.
- q2 (rule-application, key A). Proven by "Op zaterdag doen wij alleen batterijen. Andere reparaties nemen wij op zaterdag wel aan. U kunt de telefoon dan op maandag ophalen." A screen or charging port brought on Saturday is ready on Monday.
- q3 (detail, key C). Proven by "U betaalt bij het ophalen." A reverses the moment; B is the ready call "Wij bellen u als de telefoon klaar is."
- Observation: q3 tests the same concept as `A2:reading:batch003-kantine:1` q1 ("Wanneer betaalt u voor de lunch?" → "Bij het ophalen"), and the bon-at-pick-up motif is in `A2:reading:p1:1` (fietsenmaker). Within this text the question is sound; if the coordinator wants no repeated concept across the bank, a guarantee question ("Hoe lang heeft Julio garantie op de reparatie?" — "6 maanden" against the other durations in the text) would test a detail the bank does not yet have. Optional.
- Cross-part overlap: `A2:listening:batch005-scherm:1` is also a broken phone screen in a phone shop (price and notification are tested there). Allowed across parts; avoid pairing the two in one mixed drill.
- Language: natural shop register ("Kom gewoon langs in de winkel.", "Wij maken hem snel."). "oplaadaansluiting" is above A2 but sits in a labelled table row and no key depends on it.
- Level: comparable — the table plus a time rule is exactly the official folder pattern; q1 is the most demanding combination in the batch but stays within one paragraph.

### `A2:reading:batch004-stadsbus:1` — Pass

Bus-company folder with a four-row ticket table; 158 words; formal `u`. Situation: "Fatima leest een folder van het busbedrijf."

- q1 (quantity, key A). Proven by "Kinderen tot en met 3 jaar – gratis – samen met een volwassene"; a three-year-old with his mother travels free. B is the "Kinderkaartje (4 tot en met 11 jaar) – 1,50 euro" row; C the adult driver ticket.
- q2 (rule-application, key B). Proven by "Hebt u geen pinpas? Koop dan een kaartje in de app Stadsbus of bij de balie op het station." A fails on "Bij de chauffeur betaalt u alleen met uw pinpas."; C fails because the website is named only for information ("Meer informatie vindt u op www.stadsbuswesterhout.nl.") and because "alleen" excludes the balie. The app is a second valid channel that is not offered; that is normal exam practice and leaves one correct option.
- q3 (time-place, key C). Combines "In het weekend rijden ze elk half uur." with "Na 22.00 uur rijdt alleen lijn 3." A keeps the wrong line, B uses the weekday frequency and both lines, D ignores the 22.00 rule. The text does not restate the frequency after 22.00, but no option other than C is consistent with both sentences.
- Facts: pin-only payment with the driver, free travel up to age 3 and a child fare for 4–11 match Dutch practice. Cross-part overlap: `A2:listening:batch005-bus:1` repeats the pin-only rule. Allowed; note for drill assembly.
- Level: comparable — table lookups plus one two-rule combination.

### `A2:reading:batch004-bloedprikken:1` — Revise

Rooster with a three-row table (Locatie – Dagen – Tijden) and short rules; 150 words; formal `u`. "nuchter" is glossed in the text. Situation: "Meneer De Vries leest het rooster van de prikpost."

- q1 (rule-application, key D). The intended key is proven by "Ziekenhuis Westerhout, ingang B – maandag tot en met vrijdag – 7.30 tot 16.00 uur": the hospital is the only location open in the afternoon. But the prompt "Meneer De Vries werkt elke ochtend tot 12.00 uur." states no start time, and both morning locations open early: "Apotheek Zuid, Zuidplein 20 – dinsdag en vrijdag – 7.30 tot 9.30 uur" and "Gezondheidscentrum Noord, Molenweg 3 – maandag en donderdag – 8.00 tot 10.30 uur". A reader who assumes a morning shift starting at 8.30 or 9.00 can defend B (go to Apotheek Zuid at 7.30 before work) or A. The explanation itself relies on "Alleen het ziekenhuis is ook 's middags open", so the prompt must make the afternoon the only free time. Rubric checks 4 and 5 fail until the prompt is fixed. Revision request below.
- q2 (detail, key B). Proven by "Water drinken mag wel. Koffie en thee mogen niet."; C fails on "vanaf 12 uur 's nachts niets meer eten". Functional.
- C ("Bij zijn huisarts") in q1 is anchored in "De uitslag gaat binnen drie werkdagen naar uw huisarts." and is clearly wrong; it may stay.
- Facts: walk-in prikposten, the lab form from the doctor, an identity document, children only at the hospital and results via the huisarts are all plausible. Language natural ("Zonder formulier kunnen wij geen bloed prikken.").
- Level: comparable once fixed — a three-row rooster with hours, a persona constraint and a glossed rule.

### `A2:reading:batch004-verwarming:1` — Pass

Housing-association instruction card with three numbered steps and two rules; 161 words; formal `u`. Situation: "Karim leest een kaart van zijn woningstichting."

- q1 (sequence, key C). Proven by "1. Kijk op de thermostaat." A is step 3 ("Druk één keer op de resetknop"), B comes only after the three checks ("Doet de verwarming het dan nog niet? Meld de storing …"). The option repeats the step's own words, so the learner needs order, not vocabulary.
- q2 (rule-application, key A). Proven by "Meld de storing op www.deberk.nl/storing. Dat kan de hele dag en de hele nacht." B is the no-hot-water number ("Hebt u ook geen warm water? Bel dan meteen 0299 66 77 88.") and Fatima has hot water; C is forbidden ("Bel ook niet zelf een monteur. Die kosten betalen wij niet terug."); D has no support — the card gives no Monday rule and no general phone number for a storing. Observation: the phone line says "ook in het weekend" explicitly while the website sentence only implies it ("de hele dag en de hele nacht"); D fails anyway because it says "bellen". Optional: add "ook in het weekend" to the website sentence to close the gap D plays on.
- Vocabulary: "thermostaat", "waterdruk", "cv-ketel", "resetknop", "storing", "monteur" in 161 words is denser than the one-in-fifty guideline, but the words are unavoidable in this genre, "waterdruk" is anchored by "moet tussen 1 en 2 staan", and no key depends on understanding them beyond matching. Situation line: "een kaart" is understandable; "informatiekaart" would remove the map/ticket reading for weak learners (optional).
- Level: comparable — the official regels texts carry similar practical vocabulary; the questions test order and a condition.

### `A2:reading:batch004-magazijn:1` — Pass

Job advertisement with headed sections (Wat doet u? / Werktijden / Wat vragen wij? / Wat bieden wij? / Reageren?); 164 words; formal `u`. Situation: "Roos leest een advertentie voor een baan."

- q1 (rule-application, key D). Proven by "U bent 18 jaar of ouder." with Sem at 17. A and B state true facts from the ad ("U spreekt Nederlands of Engels.", "Ervaring is niet nodig.") that do not override the age rule; C gives the right conclusion for a reason the ad denies. The "Ja/Nee, want …" format is parallel and appears in official A2 items.
- q2 (advice, key B). Proven by "Bel Petra Jansen op werkdagen tussen 9.00 en 12.00 uur: 0299 34 56 78." A is outside the window; C fails on "Kom niet zonder afspraak naar het magazijn." E-mail is a second valid channel not offered; one correct option remains.
- Fact note (optional): "U verdient 14,50 euro per uur" for anyone "18 jaar of ouder" is below the 2026 adult statutory minimum for workers of 21 and over (about 14,70 euro from 1 January 2026). A learner will not notice; a teacher might. Raising it to, say, 15,50 euro would remove the point without touching any question.
- Diversity: the bank already has one job ad (`A2:reading:p4:1`, bloemenwinkel Saturday help, e-mail only). This ad differs in sector, shift structure, the rule tested (age) and the channel (phone window), and the blueprint asks for job advertisements under work. Acceptable.
- Level: comparable — the official vacancy items ask exactly this kind of eligibility and how-to-apply question.

### `A2:reading:batch004-ramen:1` — Pass

Wijkkrant item with a headline and a quoted spokesperson; 137 words; neutral third person. "maandag 5 oktober" and "donderdag 24 september" are correct for 2026. Situation: "Fatima leest een bericht in de wijkkrant."

- q1 (time-place, key B). Proven by "Daarna volgen de Rozenstraat (vanaf 12 oktober)"; A is the Tulpstraat start, C the Irisstraat start.
- q2 (purpose, key A). Proven by "In oktober krijgen 120 huurwoningen in de Bloemenbuurt nieuwe ramen." B is reversed by "'De ramen zijn gratis voor de bewoners'", C by "'De huur gaat niet omhoog.'", D by "Zij krijgen een week van tevoren een brief met de precieze dag." All four options share the form "Bewoners + infinitive"; the key is not the longest.
- Diversity: second `wonen-buurt` item in the batch; the concept (planned maintenance, be at home on a set day) is near `A2:reading:batch003-lift:1`, but the text type, the street-by-street schedule and the purpose question make it a different task. The blueprint asks to use neighbourhood topics sparingly; two of twelve is acceptable.
- Level: easier — q1 is a single lookup and the purpose is stated in the first sentence. Comparable with the simpler official krant items.

### `A2:reading:batch004-flessenautomaat:1` — Pass

Supermarket notice ("Beste klant," … "Het team van Supermarkt Groenhof"); 136 words; formal `u`. "vrijdag 7 mei" is a Friday in 2027. Situation: "Karim ziet een bericht bij de ingang van de supermarkt."

- q1 (time-place, key C). Proven by "Dat kan van maandag tot en met vrijdag tussen 9.00 en 17.00 uur."; 8.30 is before the start and 19.00 after the end. Thursday is a weekday.
- q2 (rule-application, key D). Proven by "Kleine flesjes van 0,5 liter kunnen wij bij de balie niet aannemen. Bewaar die flesjes thuis. Werkt de automaat weer? Dan kunt u ze inleveren." A is refuted directly; B confuses the bottles with the voucher ("Deze bon kunt u bij de kassa inwisselen."); C fails on "Op zaterdag en zondag nemen wij geen flessen aan."
- q3 (purpose, key A). Proven by the opening "De flessenautomaat is kapot. De monteur komt vrijdag 7 mei. Tot die dag kunt u uw lege flessen en kratten inleveren bij de servicebalie." B and C are reversals of the desk rule and the weekend rule.
- Facts: the statiegeld system (bottles, crates, a voucher redeemed at the till, small 0,5-litre bottles) is rendered plausibly. Language natural, including the stock closing "Onze excuses voor het ongemak."
- Level: comparable — a temporary-procedure notice with hours, a limit and an exception, three questions of increasing integration.

### `A2:reading:batch004-herhaalrecept:1` — Pass

Pharmacy letter ("Geachte mevrouw Bakker," … "Met vriendelijke groet, Apotheek De Wilg"); 178 words; formal `u`. "herhaalmedicijnen" is glossed ("medicijnen voor langere tijd. U bestelt ze steeds opnieuw."). Situation: "Mevrouw Bakker krijgt een brief van haar apotheek."

- q1 (rule-application, key C). Monday 10.00 is before the cut-off, so "Bestelt u vóór 12.00 uur? Dan liggen uw medicijnen de volgende werkdag vanaf 14.00 uur klaar." gives Tuesday from 14.00. A ignores "de volgende werkdag"; B turns the ordering cut-off into a pick-up time; D applies "Bestelt u na 12.00 uur? Dan duurt het één werkdag langer."
- q2 (quantity, key B). Proven by "Bent u jonger dan 70 jaar? Dan betaalt u 2,50 euro per bezorging." with mevrouw Bakker at 66; A is the 70-plus rule. C keeps the amount and changes the unit; "per maand" is not in the text, but the amount anchors it and it is not defensible.
- q3 (purpose, key C). Proven by "Vanaf 1 maart bestelt u herhaalmedicijnen anders." A takes the exception ("Krijgt u een nieuw medicijn van uw huisarts? Dan komt u zoals altijd naar de balie.") as the reason; B over-generalises "Bestellen aan de balie kan dan niet meer." and is refuted by the same exception sentence.
- Cross-part overlap: `A2:listening:batch005-tabletten:1` is also an apotheek scene with mevrouw Bakker (dosage, not ordering). Allowed; note for drill assembly.
- Facts: ordering by website or a 24-hour line, next-working-day pick-up and paid home delivery are all plausible for a Dutch pharmacy.
- Level: comparable — a procedural letter with a time rule, an age rule and an exception; q1 needs two steps but the official apotheek/huisarts letters ask the same.

## 4. Revision requests

### `A2:reading:batch004-bloedprikken:1` (required)

- **Field:** `questions[0].prompt`.
- **Failure:** "Meneer De Vries werkt elke ochtend tot 12.00 uur." does not exclude the early morning windows of Apotheek Zuid (7.30–9.30) and Gezondheidscentrum Noord (8.00–10.30); with an unstated start time a reader can defend A or B (rubric checks 4 and 5).
- **Repair:** state the full working hours so that every morning window falls inside them, for example "Meneer De Vries werkt elke ochtend van 7.00 tot 12.00 uur. Waar kan hij bloed laten prikken?", or state the constraint directly: "Meneer De Vries kan alleen 's middags. Waar kan hij bloed laten prikken?".
- **Acceptance condition:** no location's opening window lies outside his stated working time except the hospital's afternoon hours; evidence and explanation stay as they are.

### `A2:reading:batch004-praktijkles:1` (required, minor)

- **Field:** `questions[0].prompt`.
- **Failure:** "Fatima werkt van maandag tot en met vrijdag tot 17.00 uur." gives no start of the working day, so the exclusion of the Tuesday-morning and Thursday-afternoon lessons rests on an implied day job; the double "tot" is also unidiomatic.
- **Repair:** "Fatima werkt van maandag tot en met vrijdag van 9.00 tot 17.00 uur. Welke les kan zij volgen?" (any start time at or before 9.30 works).
- **Acceptance condition:** both weekday lessons (9.30–11.30 and 13.30–15.30) lie inside the stated hours; evidence and explanation unchanged.
- **Optional, same item:** `questions[2].options.A` "De cursisten moeten een les kiezen." → "De cursisten kunnen een extra les kiezen." to match the invitation "Wilt u meedoen?". Not required for the key to hold.

### Batch level (recommended, non-content)

- **Field:** option order in two four-option questions.
- **Issue:** within the twelve four-option questions D is keyed five times (42%) and A and B twice each (17%), against the blueprint's 20–40% band (section 4.1 and 5).
- **Repair:** reorder the options of `bloedprikken` q1 so that the hospital sits at A (the question is being edited anyway) and of `picknick` q2 so that "Papa" sits at B. Result: four-option keys A3 B3 C3 D3, batch keys A9 B9 C9 D3, and no item keyed on the same letter twice in a row except `herhaalrecept` (C, B, C), which is fine. No text, evidence or explanation changes.

### Optional notes (no action required for acceptance)

- `werkkleding` q2 option A "Het bedrijf gaat verhuizen." is only anchored by the repeated address; it is not defensible, but a distractor grounded in a stated detail (for example the old-clothes rule reversed: "De medewerkers mogen de oude kleding houden.") would work harder.
- `picknick`: move "Ze weet het nog niet, dus zeg niets tegen haar!" after the picnic sentence; consider "organiseren" for "maken".
- `telefoon` q3 repeats the pay-at-pick-up concept of `batch003-kantine`; a guarantee question would be new to the bank.
- `verwarming`: add "ook in het weekend" to the website sentence; consider "informatiekaart" in the situation line.
- `magazijn`: 14,50 euro per uur is below the 2026 adult minimum wage; 15,50 would be safer.
- Table rows without periods trigger the checker's sentence warnings; adding periods is cosmetic and not requested.

## 5. Diversity review

- **Within the batch.** Twelve distinct settings, all eight task types (brief ×3, email ×2, folder ×2, rooster, regels, advertentie, krant, bericht) and all eight domains. The tested operations vary: a renewal deadline, a date exclusion, a schedule against working hours, a weather condition, a time cut-off plus day arithmetic, an age band and a payment channel, a location by opening hours, a step order plus an emergency condition, an eligibility rule and a calling window, a per-street schedule, a temporary procedure with a limit and an exception, an ordering cut-off with an age-based fee. Six purpose questions use six different stems. The "Vraag? Dan …" conditional pattern appears in almost every text; that is the register of Dutch institutional writing and of the official texts, not a repetition of a task concept. The cast recurs (Fatima and Roos in five items each, Karim in four); fine for drills, but a mock form should not place the same persona in consecutive texts.
- **Against the catalogue.** No slug is reused (checker) and no item is an existing item with new names. Nearest neighbours: `p4` (bloemenwinkel job ad) ↔ `magazijn`, `p1` (fietsenmaker pick-up) and `batch003-kantine` (pay at pick-up) ↔ `telefoon` q3, `batch003-lift` (maintenance notice) ↔ `ramen`. In each case the text type, information structure and rule tested differ, and the blueprint's needed-topics list explicitly asks for a gemeente letter, a job advertisement, a repair, transport, health and shop procedures, all of which this batch supplies. The batch is also the first set of A2 reading texts at the official 100–250-word length; the existing catalogue items are 30–90 words.
- **Against batch 005 (A2 listening).** Four settings recur across parts: telefoonwinkel (`telefoon` ↔ `005-scherm`), apotheek with the same persona mevrouw Bakker (`herhaalrecept` ↔ `005-tabletten`), gemeente parking permit with the same slug in another part (`parkeervergunning` ↔ `005-parkeervergunning`, renewal letter versus application voicemail, different gemeente and person) and the city bus with the same pin-only rule (`stadsbus` ↔ `005-bus`). All are allowed across parts; the facts differ, so a learner who does both will not be contradicted, but mixed drills should not pair them.
- **Blueprint cautions.** Neighbourhood topics appear twice (`verwarming`, `ramen`) and volunteering not at all; no politics, religion, illness detail, crime, brands or real addresses; roles are mixed (a female director, recruiter and spokesperson; a male office contact).

## 6. Level check

No exemplar files exist (`content/exemplars/` is absent), so each item was compared with the blueprint's description of the official A2 texts (100–250 words, a situation line, persona and purpose questions, tables in folders and roosters, difficulty from combining two details) and with the shorter catalogue items.

| Item | Level vs official A2 | Why |
| --- | --- | --- |
| parkeervergunning | comparable | 162-word gemeente letter; q1 combines the purpose sentence with a deadline; q2 and q3 are one-line lookups. |
| werkkleding | comparable | Staff letter with four dates; one exclusion question and one purpose question. |
| praktijkles | comparable | Schedule with three slots, a price condition and a sign-up rule; two persona constraints. |
| picknick | easier | Shortest sentences, informal, direct lookups, one simple condition. |
| telefoon | comparable | Table plus time cut-off; q1 is the batch's hardest combination but stays within one paragraph. |
| stadsbus | comparable | Table lookups plus one two-rule combination. |
| bloedprikken | comparable (after fix) | Three-row rooster with hours, a persona constraint and a glossed rule. |
| verwarming | comparable | Practical vocabulary slightly heavier than average; questions test order and a condition. |
| magazijn | comparable | Eligibility and how-to-apply, as in official vacancy items. |
| ramen | easier | Single lookup and a purpose stated in the first sentence. |
| flessenautomaat | comparable | Hours, a limit and an exception; three questions of increasing integration. |
| herhaalrecept | comparable | Time rule, age rule and exception; q1 needs two steps. |

## 7. Limitations

- This is an AI editorial review. It does not replace review by Dutch-language educators, learner trials, blueprint validation or psychometric calibration, and it does not establish equivalence with the official DUO exam. The A2 label remains an unvalidated authoring target.
- Originality against official practice items rests on the author's declaration and on the reviewer's reading (nothing resembles a known official item); the reviewer did not compare the texts with official practice exams line by line.
- The level comparison used the blueprint's description of the official texts because no exemplar files exist yet; the second, independent level check of blueprint section 12 step 5 has not taken place.
- The picture-answer requirement (four pictures as options) is per launch bank, not per batch; this batch contains none, which is acceptable.
- The SHA-256 above covers the reviewed file. The requested prompt edits and any option reordering change the bytes; after revision the coordinator must record a new hash and the reviewer must re-read the changed items before the batch can be marked ready for integration.

## Focused re-review (10 September 2026)

**Scope:** the coordinator's revision recorded at the end of `content/batches/004-notes.md`: (1) `bloedprikken` q1 prompt now gives a start time ("Meneer De Vries werkt elke ochtend van 7.00 tot 12.00 uur.") and its options were rotated so the hospital sits at A (answer D → A); (2) `praktijkles` q1 prompt now gives a start time and drops the double "tot" ("Fatima werkt van maandag tot en met vrijdag van 9.00 tot 17.00 uur."), and its q3 key reads "De cursisten kunnen een extra les kiezen."; (3) `picknick` q2 options were reordered so "Papa" sits at B (answer D → B).
**Verdict:** pass. `batch_verdict` becomes "pass", `ready_for_integration` becomes true, and the verdicts of `praktijkles` and `bloedprikken` become pass in `004-review.json`.
**Reviewed SHA-256:** `859664e53824ef4387c2cdc258c907353df7beea78f4c1933ae979ee24f6e573` (supersedes `c921d32ae0b8863ea6ed762c41c522db8e1b5f6b19b01aa4c6323fda7271595a`).

What was checked:

- **Nothing else changed.** The batch file is untracked in git, so there is no committed version to diff against. Instead the reviewer reverted exactly the five recorded edits in a copy (the old `bloedprikken` q1 prompt, its options back to Noord / Zuid / huisarts / ziekenhuis with answer D; the old `praktijkles` q1 prompt and q3 option A "De cursisten moeten een les kiezen."; `picknick` q2 options back to Roos / Sem / Tante Nadia / Papa with answer D) and re-serialised with the file's own format (two-space indent, UTF-8, trailing newline). The result hashes to `c921d32ae0b8863ea6ed762c41c522db8e1b5f6b19b01aa4c6323fda7271595a`, the version of the full review, byte for byte; so no text, situation, title, other question, option wording, key, evidence, explanation or metadata field changed. Independently of that: every quotation the full review took from an untouched item is still verbatim in the file (the only quotations that no longer match are the two old prompts and the old "moeten" option, plus the reviewer's own paraphrases and proposed alternatives); the twelve word counts (162, 142, 150, 144, 153, 158, 150, 161, 164, 137, 136, 178) and the key sequences of the ten untouched items are as recorded in section 3; and `parkeervergunning`, `telefoon`, `verwarming`, `herhaalrecept`, `stadsbus` and `magazijn` were re-read in full (prompts, options, keys, evidence, explanations) against their item findings; all match. The optional notes of section 4 were not applied, as expected.
- **Checker and hash:** `npm run batch:check content/batches/004-original.json`: "Checked 12 items, 30 questions. Keys: {C:9, A:9, B:9, D:3}. Options: {3:18, 4:12}." with the same four table-row sentence warnings as before and no failures. `shasum -a 256` gives the hash above.
- **`bloedprikken` q1** (rubric checks 4, 5, 6, 7, 9, 12). Prompt: "Meneer De Vries werkt elke ochtend van 7.00 tot 12.00 uur. Waar kan hij bloed laten prikken?" Key A "In het ziekenhuis." is proven by "Ziekenhuis Westerhout, ingang B – maandag tot en met vrijdag – 7.30 tot 16.00 uur": the hospital is open until 16.00, so the afternoon is free. Distractors tested again as competing answers: B "Bij Gezondheidscentrum Noord." — "maandag en donderdag – 8.00 tot 10.30 uur" lies entirely inside 7.00–12.00; C "Bij Apotheek Zuid." — "dinsdag en vrijdag – 7.30 tot 9.30 uur" lies entirely inside 7.00–12.00; no location opens before 7.00 and none is open at the weekend, so "elke ochtend" leaves no free morning slot anywhere; D "Bij zijn huisarts." — the huisarts only receives the result ("De uitslag gaat binnen drie werkdagen naar uw huisarts."). The acceptance condition of section 4 holds: only the hospital's afternoon hours fall outside his stated working time; evidence and explanation are unchanged. The answer letter A matches the moved option; the explanation names "het ziekenhuis", "Noord en Zuid" and "de huisarts", not letters; all four option wordings are unchanged and parallel (three words each), so the rotation introduces no cue. A man of about 60 (`config/illustration.json`) plausibly works mornings.
- **`praktijkles` q1** (rubric checks 3, 4, 5, 6, 9). Prompt: "Fatima werkt van maandag tot en met vrijdag van 9.00 tot 17.00 uur. Welke les kan zij volgen?" Key C is proven by "3. Praten in de winkel: zaterdag 6 februari, 10.00 tot 12.00 uur." Distractors: A "Nederlands op het werk." — "dinsdag 2 februari, 9.30 tot 11.30 uur" lies inside 9.00–17.00 on a weekday; B "Computer en DigiD." — "donderdag 4 februari, 13.30 tot 15.30 uur" likewise; 2, 4 and 6 February 2027 are a Tuesday, a Thursday and a Saturday. The double "tot" is gone and the sentence is idiomatic. The explanation ("De les op dinsdagochtend en de les op donderdagmiddag zijn op werkdagen vóór 17.00 uur.") remains true and, with both lessons starting at or after 9.30, sufficient.
- **`praktijkles` q3** (rubric checks 5, 7, 9). Key A "De cursisten kunnen een extra les kiezen." matches the e-mail: "In februari geven wij drie extra lessen. … U kiest één les." and the invitation "Wilt u meedoen? Stuur vóór 20 januari een e-mail". The explanation ("De school biedt drie extra lessen aan en vraagt de cursisten om er één te kiezen en zich aan te melden.") agrees with "kunnen". B (address "Schoolstraat 4" misread as a move) and C (the conditional "Is de groep vol? Dan krijgt u bericht van ons." misread as a fact) remain clearly false. Key letters of the item unchanged (C, B, A).
- **`picknick` q2**: options now Roos / Papa / Tante Nadia / Sem, answer B; the evidence "Papa brengt mama om 12.30 uur naar het park." proves B; the explanation names Papa and Roos, not letters; option wordings unchanged (Papa and Sem swapped).
- **Key balance.** Four-option questions: A3 B3 C3 D3 (25% each, inside the 20–40% band). Three-option questions: A6 B6 C6. All 30 questions: A9 B9 C9 D3 (30/30/30/10%); D cannot exceed 10% of all questions when it keys three four-option questions, which is the batch-wide reading section 2 already accepted. Key positions per item are now 1 C-A-B, 2 A-D, 3 C-B-A, 4 C-B, 5 B-A-C, 6 A-B-C, 7 A-B, 8 C-A, 9 D-B, 10 B-A, 11 C-D-A, 12 C-B-C; no item keys the same letter twice in a row.

Observations, not blocking:

- `praktijkles` q3: key A is now 7 words / 41 characters against B's 6 words / 40 characters (before the edit A had 6 words). A one-character difference is not a usable length cue, and the checker's length-spread warning did not fire.
- The optional notes of section 4 (`werkkleding` q2 option A, `picknick` sentence order and "maken", `telefoon` q3 concept repeat, `verwarming` wording, `magazijn` wage) were not applied; they remain optional.
- `content/batches/004-notes.md` sections 4 (items 3, 4 and 7) and 5 still describe the pre-revision option letters and key positions (3 C-B-A with "moeten", 4 C-D, 7 D-B); the coordinator's addendum at the end records the change, so the notes read as a history. Not learner-facing.
- Sections 2, 3, 4 and 7 above are left as written; they describe the version with the previous hash. `004-review.json` carries the current per-item verdicts, key counts and hash.
