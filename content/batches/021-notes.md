# Batch 021: design notes

Nine original A2 reading texts (`exam: duo-a2`, `part: reading`), 26 closed questions, written against `content/blueprint.md` sections 1, 3, 4.1, 5, 8, 9, 10 and 13, `docs/briefs/author.md` and the A2 Lezen paragraph of `docs/research/exam-blueprints-2026-09-10.md`. Format example: batch 004. Every text is invented; official practice items were used for shape only (situation line, 100–250 words, two or three questions, persona and purpose prompts, a mix of three and four options). None of the official practice-exam settings (study tips, village letter, delivery-options folder, staff outing, sports-day programme, wedding committee, first-aid course, recycling centre, sick-call rules) is reused.

Source file: `content/batches/021-original.json`. Checker: `npm run batch:check content/batches/021-original.json` (no failures; six warnings, all explained in section 6).

## 1. Batch matrix and scenarios

The coordinator fixed the nine settings, task types and domain counts (opleiding ×2, wonen-buurt ×2, winkels-diensten ×2, vrije-tijd-familie ×2, werk ×1). The sibling batch 020 takes a parking-permit letter, a payslip, dentist rules, a train-replacement notice, a language-school rooster, a bicycle advertisement, a football-club e-mail, a pharmacy folder and a shift-change message; none of those, and none of the A2 reading settings in `content/catalogue.json` or blueprint section 9, is touched here.

| # | Slug | taskType / domain | Scenario | Q | Why it is not a duplicate |
| --- | --- | --- | --- | --- | --- |
| 1 | `terugbrengen` | regels / winkels-diensten | Clothing-shop return rules: money back within 14 days (on the account within five working days), exchange or voucher after 14 days, nothing after 30; receipt, unworn, price tag; underwear, socks and swimwear never; online purchases back in the shop for free or posted at own cost | 3 | First return-policy text; `speelgoed ruilen` (catalogue) is a swap event, `schoenen terugbrengen` is an A2 writing task. The regels type in the bank so far is the heating card (`verwarming`). |
| 2 | `openingstijden` | bericht / opleiding | Library notice: new opening hours from 2 March with two late evenings for studying; no staff after 18.00, lending only at the machine; return box day and night; Taalcafé moved to Wednesday morning | 3 | `bibliobus` is a delayed mobile library, `bibliotheekpas` a writing task. Concept here is a changed timetable with an after-hours rule. Filed under opleiding because the reason for the change and the evening use are studying (studieplekken, Taalcafé). |
| 3 | `ketel` | brief / wonen-buurt | Housing-corporation letter: annual boiler check on 14 April 8.00–12.00, free, someone 18+ at home, keep the cupboard clear; call before 7 April to reschedule; a missed visit without a call costs 45 euro; existing problems via the website | 2 | `verwarming` (batch 004) is a self-help card for a heating failure; this is a planned maintenance appointment with a rescheduling deadline and a no-show fee. `lift onderhoud` is a one-day outage notice. |
| 4 | `dierentuin` | email / opleiding | Teacher's e-mail about the group-7 school trip: bus at 8.30, be there 8.15, back at 15.30 instead of the normal 14.00; packing list; 7,50 euro in the school app before 15 May; four parent helpers wanted, reply before 8 May; medicines to the teacher | 3 | The listening bank has a `schoolreis` voicemail (batch 001); this is a reading e-mail with a different operation set (three times to keep apart, two deadlines for two different things). Slug chosen so it does not repeat the listening slug. |
| 5 | `zwemrooster` | rooster / vrije-tijd-familie (table) | Pool timetable: six activity rows with days and times, three price rules, a school-holiday rule that cancels lap swimming, no diploma → with an adult | 3 | `zwemles` (p3) is a changed lesson time and `zwembad uitleg` is a listening explanation; this is a table to scan with a holiday exception and a price sum. |
| 6 | `schoonmaker` | advertentie / werk | Cleaning company advertises two jobs: mornings in a sports centre (7.00–10.00) and evenings in three offices (18.00–21.00); tasks; requirements; 14,40 euro per hour, 1 euro extra for the morning job, travel costs above 10 km; apply by e-mail or at an open morning, do not call | 3 | Third job advertisement in the bank but with a different structure from `magazijn` (batch 004: one job, two shifts, age rule) and `bloemenwinkel vacature` (p4): here the reader must choose between two jobs by time and combine two pay rules. |
| 7 | `weekmarkt` | krant / winkels-diensten | Newspaper item: the Saturday market moves to the Stationsplein for six months from 4 April because the Marktplein is being renovated; Kerkplein rejected as too small; 35 stalls instead of 40; same hours; paid parking, come by bike | 3 | First market text in reading (`markt` in the bank is a listening announcement about the market closing early because of wind). Concept: a temporary relocation with a reason and a return date. |
| 8 | `trappenhuis` | bericht / wonen-buurt | Neighbour's note to six flats: bikes and prams block the shared staircase (fire risk), use the bike shed, prams against the wall; broken lamp already reported; cleaning rota, number 28 in April; joint clean-up on 18 April, coffee afterwards | 3 | `buurvrouw` items in the bank are a speaking message and a B1 listening new neighbour; `lift onderhoud` is a corporation notice. This is an informal resident-to-resident note with a rota. Neighbourhood is over-represented in the bank, so this is the only neighbourhood text in the batch and it carries a housing rule rather than a social event. |
| 9 | `gezinskaart` | folder / vrije-tijd-familie (table) | Toy-museum folder: price table, family-ticket rule (two adults, up to three children 4–12, under-4s do not count), Wednesday workshop with sign-up at the desk, opening days, no parking at the museum | 3 | First museum or day-out folder; `bioscoop` and `speeltuin` in the bank are speaking tasks. Operation: apply a membership rule to a family with four children. |

Question count: eight texts with three questions and one with two (`ketel`) = 26. Eleven questions have four options (42%), fifteen have three. Tables: `zwemrooster` and `gezinskaart` carry a plain-text table (` – ` separated rows, as in batch 004); `openingstijden` carries a four-row hours table.

## 2. Names, places, dates and register

- Personas from `config/illustration.json`: Roos (1, 5, 6, 8), Fatima (1, 2, 4, 5, 9), Sem (1, 2), Karim (3, 5, 6, 7, 9), meneer De Vries (6, 9), Amina (4, 9; Fatima's daughter, age 10 as in the cast), Julio (6, 8), mevrouw Bakker (8, given the first name Ria as the note's writer). Other invented people: Sanne Visser (teacher, item 4), Ans Verhoef (market manager, item 7). Karim's surname Aziz follows batch 004.
- Invented organisations and places, all checked on the web on 10 September 2026 before use: Kledingwinkel Vlierbes (no shop of that name; "vlierbes" only returns the plant, a street in Hengelo and supplements), Bibliotheek Westerhout (no such library), Woningcorporatie Sleedoorn (no corporation or housing provider of that name), Zwembad De Waterspiegel (no pool of that name), Schoonmaakbedrijf Blinkvast (no such firm; several unrelated "Blink…" cleaning companies exist, so the name is deliberately not "Blink"), Museum Het Blikken Paard (no such museum; the tin-can museums found are named "Blikmuseum" or "Blikkenmuseum"), Sportcentrum Oost (generic, like Apotheek Zuid in batch 004). Names tried and dropped because they belong to real organisations: Zuiderlicht (care centre in Gent and others), Basisschool De Torenvalk (Leimuiden), Basisschool De Watersnip (Zoetermeer), De Boomklever (a BSO in Winschoten), Zwembad De Duikelaar (Hardinxveld-Giessendam), Zwembad Westerhout (a care-home pool in Alkmaar), Zwembad De Waterlinie (Culemborg), Zwembad De Watermolen (Sint-Niklaas), Museum De Zolder (several museums in Zolder, Belgium). The school in item 4 is therefore left unnamed: the e-mail comes from "juf Sanne (groep 7)", which is how such e-mails arrive.
- The fictional town Westerhout, the Marktplein, Stationsplein, Kerkplein, Esdoornstraat and Havenweg are invented or generic; phone numbers use the 0299 / 06 patterns of batch 004 with new digits; the only web address is the e-mail `werk@blinkvast.nl`. Real institutions named: gemeente, woningcorporatie, school, bibliotheek.
- Weekday–date pairs were checked against the 2026 calendar: maandag 2 maart, maandag 30 maart, zaterdag 4 april, dinsdag 7 april, zaterdag 11 april, dinsdag 14 april, zaterdag 18 april, vrijdag 8 mei, vrijdag 15 mei, vrijdag 22 mei, zaterdag 6 juni. Prices are plausible for 2026 (pool 5,50 / 4,00, museum 12,50 / 6,00 / family 24,00, cleaning 14,40 per hour, boiler no-show fee 45 euro, parking 2–2,50 per hour, school trip 7,50).
- Register: shop rules, library notice, corporation letter, advertisement and museum folder address the reader with `u`; the teacher writes to parents with `u` (Beste ouders); the neighbour's note is polite `u` from an older resident; the newspaper item is neutral third person with one quoted speaker.

## 3. Level control (A2)

Prose only (table rows, header lines, addresses and signatures excluded; times and prices protected from the splitter):

| Item | Words | Prose sentences | Average | Longest | Less common words (g = explained in the text, n = not needed for a key) |
| --- | ---: | ---: | ---: | ---: | --- |
| terugbrengen | 182 | 26 | 6.5 | 11 | tegoedbon (g), kassabon (transparent), prijskaartje (n), verzendkosten (g, n) |
| openingstijden | 156 | 14 | 8.4 | 12 | studieplekken (transparent, n), automaat (!), brievenbus (!), Taalcafé (n) |
| ketel | 180 | 19 | 8.4 | 12 | cv-ketel (g), monteur, veiligheid (n), afspraak (core) |
| dierentuin | 196 | 24 | 7.0 | 12 | lunchpakket (n), hulpouder (g, !), schoolplein (n), school-app (n) |
| zwemrooster | 176 | 9 | 9.1 | 14 | banen zwemmen / vrij zwemmen (labels, !), zwemdiploma (n), activiteit (n) |
| schoonmaker | 203 | 25 | 7.7 | 15 | stofzuigt, dweilt (n), reiskosten (!), training (n), ervaring (n) |
| weekmarkt | 158 | 18 | 8.5 | 12 | opknappen (g, !), kramen (!), tijdelijk (n), marktmeester (transparent, n), fietsenrekken (n) |
| trappenhuis | 189 | 20 | 8.7 | 17 | trappenhuis (g by "trap"), fietsenberging / berging (!), kinderwagens (n), om de beurt / aan de beurt (g by "rooster", !) |
| gezinskaart | 224 | 21 | 8.8 | 17 | gezinskaart (g), maximaal (!), speurtocht (g, n), workshop (g), parkeergarage (!) |

No prose sentence exceeds 17 words; averages 6.5–8.8. Subordinate clauses use only `omdat`, `als`, `dat` and the question-plus-`dan` condition ("Kunt u op 14 april niet thuis zijn? Bel dan …"); two relative clauses in early drafts ("ouders die meegaan", "de baan die u wilt") were rewritten as main clauses. Tenses: present, perfect, `gaan` + infinitive. Difficulty comes from combining two details: a delay and two thresholds (1 q1), a day and an after-hours rule (2 q1), a person's working hours and a schedule (5 q1, 6 q1), a holiday exception (5 q2), an age boundary and a sum (5 q3), two pay rules (6 q2), an age-exemption inside a membership rule (9 q1), a rota and a house number (8 q3).

## 4. Questions: skills, keys and distractor rationales

Skill spread over 26 questions: rule-application 13, purpose 4, time-place 4, detail 2, quantity 2, advice 1. Every text has at least one persona-scenario prompt (20 of 26 prompts are persona prompts); four texts carry a purpose question (ketel, dierentuin, weekmarkt, trappenhuis), i.e. one per two to three texts.

Each distractor below is wrong for one nameable reason and sits on a detail the text mentions.

### Item 1 — terugbrengen

- q1 (rule-application, key B "Een tegoedbon of een ander kledingstuk."): three weeks is after 14 days and before 30. A "Haar geld terug op haar rekening." — the within-14-days rule. C "Niets, de winkel neemt de jas niet meer terug." — the after-30-days rule applied too early. The prompt states that the coat is unworn and the receipt is there, so no other rule interferes.
- q2 (rule-application, key C "Nee, want zwemkleding neemt de winkel niet terug."): A "Ja, want het prijskaartje zit er nog aan de zwembroek." — the price-tag rule does not override the swimwear exclusion ("Ook niet met prijskaartje"). B "Ja, maar alleen binnen 14 dagen na de koop." — the 14-day rule is for other clothing.
- q3 (time-place, key B "Binnen vijf werkdagen."): A "Meteen, aan de kassa van de winkel." — reads "Dan krijgt u uw geld terug" as immediate. C "Binnen 14 dagen." and D "Binnen 30 dagen." — the two return deadlines, not the refund time.

### Item 2 — openingstijden

- q1 (rule-application, key A "Bij de automaat."): B "Bij de balie." — the desk closes at 18.00. C "Nergens, de bibliotheek is dan dicht." — Thursday is a late evening (until 20.00).
- q2 (rule-application, key C "De boeken in de brievenbus naast de ingang doen."): A "De boeken bij de balie inleveren, die is tot 18.00 uur open." — 18.00 is the weekday closing time; Saturday closes at 16.00. B "De boeken zondag inleveren, dan is de bibliotheek open." — Sunday is closed.
- q3 (detail, key D "Omdat veel mensen 's avonds willen leren."): A "Omdat er 's avonds meer medewerkers werken." — reversed: there is no staff after 18.00. B "Omdat de bibliotheek op zondag gesloten is." — a true row of the table with no causal link. C "Omdat het Taalcafé nu 's avonds is." — the Taalcafé is on Wednesday morning.

### Item 3 — ketel

- q1 (rule-application, key B "Vóór 7 april bellen voor een nieuwe afspraak."): A "Op 14 april vóór 8.00 uur bellen." — the visit day is a week after the calling deadline. C "Het probleem melden op de website." — the website is for an existing heating problem. D "Niets doen, de monteur komt gratis nog een keer." — reversed: a second visit after a no-show without a call costs 45 euro.
- q2 (purpose, key C "De corporatie controleert elk jaar de ketel."): A "Zijn verwarming en warme water doen het niet." — the letter mentions a problem only as a conditional ("Hebt u nu al een probleem …?"). B "Hij was niet thuis toen de monteur kwam." — the no-show paragraph is a warning about the future, not a past event.

### Item 4 — dierentuin

- q1 (time-place, key D "Om 15.30 uur."): A "Om 8.15 uur." — the time the children must be on the playground. B "Om 8.30 uur." — the bus departure. C "Om 14.00 uur." — the normal Friday end time, explicitly contrasted with 15.30.
- q2 (rule-application, key B "Vóór 8 mei antwoorden op deze e-mail."): A "Vóór 15 mei betalen in de school-app." — the deadline for the child's 7,50 euro, not for helping. C "Na schooltijd naar de klas gaan." — for questions.
- q3 (purpose, key A "De klas gaat op schoolreis."): B "De schoolreis gaat niet door." — reversed by "Bij regen gaat de schoolreis gewoon door." C "Alle ouders moeten mee naar de dierentuin." — four volunteers are sought. D "De kinderen moeten geld meenemen." — reversed by "Geen geld en geen telefoon."

### Item 5 — zwemrooster

- q1 (rule-application, key C "Op dinsdag om 19.00 uur."): A "Op woensdag om 19.00 uur." — Wednesday has only afternoon free swimming. B "Op donderdag om 12.00 uur." — a real lap-swimming slot, but during Roos's working day and not in the evening. D "Op zaterdag om 19.00 uur." — the weekend has free swimming until 17.00 only.
- q2 (rule-application, key C "Nee, in de vakantie is er alleen vrij zwemmen."): A "Ja, banen zwemmen is er elke werkdag om 7.00 uur." — true outside the holidays; the holiday paragraph cancels it. B "Nee, op dinsdag is er alleen 's avonds banen zwemmen." — Tuesday also has the morning and midday slots; wrong reason and wrong fact.
- q3 (quantity, key B "9,50 euro."): 5,50 + 4,00. A "5,50 euro." — forgets the eight-year-old. C "13,50 euro." — charges the three-year-old, who is free.

### Item 6 — schoonmaker

- q1 (rule-application, key B "Baan 2, in de kantoren."): A "Baan 1, in het sportcentrum." — 7.00–10.00 overlaps Karim's 9.00 start. C "Geen van de twee banen." — the evening job fits.
- q2 (quantity, key A "14,40 euro per uur en zijn reiskosten."): B "14,40 euro per uur, geen reiskosten." — ignores the 10-kilometre rule (he lives 15 km away). C "15,40 euro per uur en zijn reiskosten." — the extra euro is for the morning job only. D "15,40 euro per uur, geen reiskosten." — both errors.
- q3 (advice, key C "Op zaterdag 6 juni om 11.00 uur naar Sportcentrum Oost gaan."): A "Blinkvast bellen en naar de baan vragen." — reversed: "U hoeft niet te bellen: wij bellen u." B "Op zaterdag 6 juni om 14.00 uur naar Sportcentrum Oost gaan." — the open morning ends at 12.00. E-mail is a second valid channel but is not among the options, so the key is unique (same pattern as `stadsbus` q2 in batch 004).

### Item 7 — weekmarkt

- q1 (time-place, key A "Op het Stationsplein."): B "Op het Marktplein in het centrum." — the old location, under renovation from 30 March. C "Op het Kerkplein." — considered and rejected as too small.
- q2 (purpose, key D "De markt staat een half jaar ergens anders."): A "De markt gaat een half jaar lang niet door." — reversed: the market continues at the new place with the same hours. B "De markt krijgt in april vijf extra kramen." — reversed: 35 instead of 40. C "De markt gaat van zaterdag naar woensdag." — only five stalls move temporarily to the Wednesday market.
- q3 (detail, key A "Omdat de gemeente het Marktplein gaat opknappen."): B "Omdat het Stationsplein groter is dan het Marktplein." — reversed: less room, hence fewer stalls. C "Omdat er op de markt te weinig kramen staan." — the reduced stall count is a consequence, not the cause. D "Omdat er bij het station meer fietsenrekken komen." — the racks follow the move.

### Item 8 — trappenhuis

- q1 (rule-application, key B "De fiets in de berging achter het gebouw zetten."): A "De fiets in de gang tegen de muur zetten." — against the wall is the rule for prams. C "De sleutel van de berging bij de buurvrouw halen." — the key comes from the woningcorporatie.
- q2 (purpose, key C "Zij wil dat de trap en de gang vrij blijven."): A "Zij wil dat de buren de lamp repareren." — she has already reported the lamp and says nobody needs to act. B "Zij wil de trap niet meer schoonmaken." — reversed: she organises a joint clean-up. D "Zij wil dat de buren het rooster veranderen." — the rota is mentioned as it is; nothing is asked about it.
- q3 (rule-application, key A "De trap schoonmaken."): B "De lamp op de tweede verdieping melden." — already done by the writer. C "Koffie zetten voor de buren." — the coffee on 18 April is at the writer's home.

### Item 9 — gezinskaart

- q1 (rule-application, key A "Ja, want het kind van 3 jaar telt niet mee."): B "Nee, want vier kinderen is te veel voor een gezinskaart." — counts the three-year-old, who does not count. C "Nee, want een kind van 11 jaar is te oud voor een gezinskaart." — the limit is 12 inclusive.
- q2 (rule-application, key C "Amina op woensdag bij de kassa aanmelden."): A "Een extra kaartje voor de workshop kopen." — reversed: free with a ticket. B "Op maandag om 14.00 uur naar het museum komen." — right time, wrong day; Monday is closed. D "Een gezinskaart voor het hele gezin kopen." — the family ticket brings a treasure hunt, not the workshop.
- q3 (time-place, key B "In de parkeergarage aan de Havenweg."): A "Op de parkeerplaats van het museum." — reversed: no parking at the museum. C "Naast het station, vijf minuten lopen." — the station is mentioned for train travellers only.

## 5. Key balance and option counts

| Key | Count | Share |
| --- | ---: | ---: |
| A | 7 | 27% |
| B | 8 | 31% |
| C | 8 | 31% |
| D | 3 | 12% (3 of the 11 four-option questions) |

No letter above 40%, A/B/C each above 20%. Key sequence in file order: B C B A C D B C D B A C C B B A C A D A B C A A C B — no letter three times in a row. Keys within the eleven four-option questions: A3 / B2 / C3 / D3. Per item (in question order): 1 B-C-B, 2 A-C-D, 3 B-C, 4 D-B-A, 5 C-C-B, 6 B-A-C, 7 A-D-A, 8 B-C-A, 9 A-C-B. Option counts: 15 questions with three options, 11 with four (42%). Checked by script: in no question is the key the longest option by character count, and in no question does the longest option exceed 2.5 times the shortest in words.

## 6. Checker result and remaining warnings

`npm run batch:check content/batches/021-original.json`:

```
Checked 9 items, 26 questions. Keys: {"B":8,"C":8,"A":7,"D":3}. Options: {"3":15,"4":11}.
  warn  A2:reading:batch021-openingstijden:1: longest sentence 39 words (A2 target 18)
  warn  A2:reading:batch021-ketel:1: longest sentence 22 words (A2 target 18)
  warn  A2:reading:batch021-dierentuin:1: longest sentence 30 words (A2 target 18)
  warn  A2:reading:batch021-zwemrooster:1: average sentence length 19.6 words (A2 target under 12)
  warn  A2:reading:batch021-zwemrooster:1: longest sentence 97 words (A2 target 18)
  warn  A2:reading:batch021-gezinskaart:1: longest sentence 45 words (A2 target 18)
6 warning(s), no failures.
```

All six warnings are splitter artefacts, as in batch 004: the checker splits on `. `, `! ` or `? `, so table rows and header lines without terminal punctuation merge with the next sentence. `openingstijden` (four hours rows + the next sentence), `zwemrooster` (six activity rows + heading, 97 words) and `gezinskaart` (four price rows) are the tables; `ketel` (letterhead, Betreft line, salutation + first sentence) and `dierentuin` (Van/Aan/Onderwerp header, salutation + first sentence) are headers. The prose figures in section 3 are all inside the A2 heuristics. Table rows are left without periods because the app renders `text` with `white-space: pre-line`, following the batch 004 precedent.

## 7. Things the reviewer should look at

- Item 2 domain: the library notice is filed under `opleiding` (the change is made for evening study, and the text names studieplekken and the Taalcafé); `vrije-tijd-familie` would also be defensible. The coordinator's domain counts need two opleiding texts, and the school-trip e-mail is the other.
- Item 4 q3 (purpose): the key "De klas gaat op schoolreis." is visible from the subject line; the question still requires rejecting three contradicted statements (rain, all parents, money). If a purpose question that is not answerable from the header is preferred, "Wat moet Fatima vóór 15 mei doen?" (pay in the app) is a ready replacement, but the batch would then have three purpose questions instead of four.
- Item 5 q1: Roos's working hours are stated as 9.00–18.00 so that the midday slot (12.00–13.30) falls inside her working day, as in `praktijkles` q1 (batch 004); a reviewer who reads a lunch break into it should note that the prompt also says "'s avonds", which excludes 12.00 on its own.
- Item 6 q2 is labelled `quantity` although it applies two rules; `rule-application` would be equally correct. The batch has 13 rule-application questions of 26, which follows from the persona-question requirement.
- Item 7 has two "waarom" questions (purpose q2, reason q3). They test different information (the fact of the relocation versus its cause); if this feels repetitive, q3 can be dropped, leaving 25 questions and keys A6/B8/C8/D3.
- Item 8 q3: the joint clean-up on 18 April is also in April, but it concerns the hallway and the shed, is an invitation ("Komt u ook?") and is not a duty; the rota sentence names number 28 for the stairs. The prompt uses "moet" to point at the rota.
- Item 9: "maximaal" is not glossed; it is needed to reject q1 option B. It is a high-frequency word in Dutch signage and price lists; replace with "niet meer dan" if the reviewer judges it above A2.
- Level: unvalidated authoring target (`targetLevelValidated: false`); no exemplar comparison was possible because `content/exemplars/` does not exist.

## 8. Limitations

Original practice material with unvalidated difficulty labels. No claim of official approval, scoring or exam equivalence. The items have not been reviewed yet; `status` stays `draft` until the batch passes editorial review and the hash gate.
