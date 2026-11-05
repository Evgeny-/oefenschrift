# Batch 088: design notes

Twelve original A2 reading texts (`exam: duo-a2`, `part: reading`) with 30 closed questions. They follow `docs/briefs/a2-expansion-2026-11-05.md` (section "088" and the shared rules), `docs/briefs/author.md`, `content/blueprint.md` §1, §3, §4.1, §5, §8, §9, §10 and §13, `content/reviews/rubric.md` and the A2 Lezen paragraph of `docs/research/exam-blueprints-2026-09-10.md`. Format examples: the current catalogue records `batch021-zwemrooster`, `batch021-weekmarkt`, `batch021-gezinskaart`, `batch020-tandartsregels`, `batch020-identiteitskaart` and `batch021-schoonmaker`. Their record shape was copied; their vocabulary was not. Every text is invented. Official practice items were used for shape only: a situation line, 100–250 words, two or three questions, persona and purpose prompts, and a mix of three and four options.

Source file: `content/batches/088-original.json` (SHA-256 at the time of writing `5c6ba040161934f8b278b52785f36b9ea45c61e51bee64e1b5eb58cf1a0535ea`). Checker: `npx tsx scripts/batch-check.ts content/batches/088-original.json` gives no failures and 20 warnings, each handled in section 4 and section 9. No media, `revision` or other derived fields are present. All items have `status: "draft"` and `targetLevelValidated: false`.

## 1. Batch matrix and scenarios

The coordinator fixed the twelve slugs, task types and domains. The slugs are new in A2 reading; the checker reports no slug collision.

| # | Slug | taskType / domain | Scenario | Q | Tone | Why it is not a duplicate |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `hardloopwedstrijd` | krant / vervoer | Local paper: the Stadsloop on Sunday 21 March. Four named streets are closed to cars 9.00–15.00, and residents can drive out until 9.00. Lines 4 and 7 take the Ringweg 9.00–15.00. The Markt stop is closed all day, even after 15.00, so passengers use the Station stop. | 3 | ordinary | `spoorwerk` (batch 020) is a train notice and `stadsbus` (batch 004) a ticket folder. This is the first road-closure-plus-bus-diversion text, with a residents' rule. |
| 2 | `school-verbouwing` | krant / opleiding | Neighbourhood paper: basisschool De Schommel gets a new building. In 2027-2028 the pupils have lessons in a temporary building in the Sportlaan, 2 km away. A free school bus runs for pupils who live more than 1 km from the Sportlaan (departs 8.05 from the old school). Parents' evening on 9 March. | 3 | ordinary | `ramen` (batch 004) is housing renovation and `dierentuin` (batch 021) a school trip. This is the first temporary school relocation, with a distance rule for a bus. |
| 3 | `feestdagen-huisarts` | rooster / gezondheid (table) | GP practice: a holiday-hours table from 24 December to 4 January. When the practice is closed, call the huisartsenpost (invented 0900 number) or 112. Repeat prescriptions must be ordered before 18 December. | 3 | ordinary | `huisartsenpost-folder` (batch 020) explains the out-of-hours service in general. `herhaalrecept` (batch 004) is a pharmacy letter. This text is a dated holiday rooster in which the reader must pick between the practice and the post by day and hour. |
| 4 | `oudergesprekken` | rooster / opleiding (table) | Primary school: a table of ten-minute parent talks per group, day and time. Parents choose a time on the website before 29 January, and the school chooses for latecomers. Parents who cannot come e-mail the teacher. Group 8 pupils come along. An interpreter can be arranged. | 2 | ordinary | `ouderavond` exists only as a B1 reading text and an A2 writing task (091, `ouderavond-afmelden`). This is the first A2 reading table that combines two children in different groups. |
| 5 | `wijkagent` | folder / instanties (table) | Police folder in the officer's own voice: who she is, what residents can come to her about, a walk-in table (Tuesday wijkcentrum, Thursday library, Saturday police station), aangifte not at the walk-in, and 112 for emergencies. | 2 | ordinary | `politiebureau` (batch 020) gives station opening hours and the three ways to report a crime. This folder is about the neighbourhood officer and her walk-in hours. It reuses the bank's fictional station address (Stationsplein 6) for consistency. |
| 6 | `kinderboerderij` | folder / vrije-tijd-familie (table) | City farm De Gele Haan in the Stadspark: free entry, a summer/winter opening table (closed on winter Mondays), goat food only from the farm shop (1 euro), no dogs, children's parties for 6–12 children at 6 euro per child, the birthday child included. | 2 | warm, ordinary | `gezinskaart` (batch 021) is a museum family ticket and `zwemrooster` a pool timetable. This text adds a seasonal exception and a per-child party price. |
| 7 | `camping-regels` | regels / vrije-tijd-familie | Small campsite: quiet 23.00–8.00, cars on the car park at the entrance (only briefly at the pitch on arrival and departure), dogs on a lead, rubbish in the containers at the entrance, leave the pitch before 12.00, ask the day before to leave later (10 euro). | 2 | ordinary | This is the first campsite text. Other `regels` texts in the bank are shop returns, dentist, launderette, canteen and heating. |
| 8 | `taaltoets-dag` | regels / opleiding | Language school rules for a placement test (explicitly "geen inburgeringsexamen"). Arrive at 9.15. No entry after 9.30, and a late candidate takes the test another time. Bring an ID card or passport; a photo is not enough. Phones go in the bag at the front. No dictionary, also not on paper. Results by e-mail within two weeks, otherwise call. | 3 | ordinary | `praktijkles` (batch 004) is an e-mail about extra lessons. This is the first test-day rule set. |
| 9 | `oppas-gezocht` | advertentie / vrije-tijd-familie | A mother wants a babysitter for Tuesday and Thursday evenings, 17.30–21.30: pick up from childcare, give dinner, read, bed at 19.30. The sitter must be 18 or older with experience. Pay is 10 euro an hour plus a free meal. Reply by text message, then visit on a Saturday. | 2 | ordinary | The bank's `advertentie` texts are jobs at companies, a toy swap and a second-hand bike. This is the first private family advertisement. |
| 10 | `chauffeur-gezocht` | advertentie / werk | Flower wholesaler Verse Bloem wants a delivery driver: a company van, loading at 5.00, leaving at 6.00, finished around 13.00, Monday, Tuesday, Thursday and Friday, licence B, lifting, 15,50 euro an hour, work clothes. A paid trial day with a colleague is possible. Apply by e-mail with a CV; phone after 14.00 only for questions. | 2 | ordinary | `p4` is a florist's shop job, and `magazijn` and `schoonmaker` are shift jobs. This is a driving job. The operation is whether the job's weekdays fit around an existing part-time job. |
| 11 | `water-onderbreking` | brief / wonen-buurt | Water company letter: no water on Tuesday 19 January, 8.00–about 16.00, because of pipe work under the street. Fill bottles and a bucket on Monday, and do not use the washing machine or dishwasher. Afterwards the water can be brown for a few minutes, so run the cold tap first. Call if it is still brown after an hour. | 3 | ordinary | `lift` (batch 003) is a one-day lift outage and `ketel` (batch 021) a boiler visit. This letter is about a utility outage, with preparation the day before and a brown-water rule afterwards. |
| 12 | `cadeau-collega` | email / werk | A colleague collects money for Patrick's 50th birthday. Money goes in an envelope with your name at reception until Tuesday 9 March. A card can be signed at reception until the same day. Cake in the canteen at 10.00 on Friday 12 March, disguised as a meeting. The gift is a voucher for the bike shop, because his 25-year-old bike can be heard from the car park. | 3 | lightly humorous | `picknick` (batch 004) is a family e-mail and `dienstwissel` (batch 020) a rota change. This is the first workplace collection. |

Question count: 6 texts × 3 + 6 texts × 2 = 30. Tables are in `feestdagen-huisarts`, `oudergesprekken`, `wijkagent` and `kinderboerderij`, as plain-text rows with ` – ` separators, the precedent of batches 004 and 021. The texts serve their practical purpose first. Every distractor sits on a detail the text needs anyway, and no names, numbers or objects were added only to feed distractors.

Tone: one item is lightly humorous (`cadeau-collega`: the loud old bike and the fake meeting), which is one in twelve and within the plan's "about one in eight". `kinderboerderij` is warm but ordinary. Everything else is ordinary.

## 2. Names, places, dates and register

- **Names.** The pool is Hamid, Tessa, Koen, Elif, Patrick, Malika, Jesse and Olga. Each appears in at most two items: Hamid (1, 8), Tessa (5 as the officer Tessa van Dam, 9 as the mother), Koen (2, 7), Elif (6 as the reader, 12 as the writer), Patrick (4 as the father, 12 as the colleague turning 50), Malika (5, 10), Jesse (9 as a 17-year-old, 11 as a tenant) and Olga (3, 12). Other people are unnamed roles: Olga's daughter, Elif's son, "een kind", Tessa's husband, the teacher and the receptionist. No voice names and no older recurring cast are used. The surname "van Dam" is invented for a fictional town.
- **Places.** The places are the bank's fictional town Westerhout, with the Marktplein, Kerkstraat, Molenweg, Havenweg, Schoolstraat, Ringweg, Lindelaan, Sportlaan, Ploegstraat, Parklaan, Kastanjelaan and Stadspark, and Stationsplein 6 as in `politiebureau`. All are invented or generic.
- **Phone numbers.** The huisartsenpost number is invented and written as the exam does: `0900 234 56 70`. A web search for the number in three spellings (spaced, hyphenated, unbroken) found no page with it. Other numbers follow the bank's 0299 / 06 pattern with new digits. The real non-emergency police number was deliberately left out; the folder only gives 112.
- **Web addresses.** The only address is `werk@versebloem.nl`. No URL is printed. The school website, police internet reporting and the gemeente are named without addresses.
- **Real public bodies.** The politie (item 5, about them), the huisartsenpost, 112 and the apotheek (item 3) are named because the items are about them. No brand names are used.

**Invented organisations, checked with WebSearch on 5 November 2026:**

- *Basisschool De Schommel*: no school of that name. The closest result is the Flemish "Vrije Basisschool 't Schommelbootje", which is a different name.
- *Basisschool Het Tekenbord*: no result.
- *Huisartsenpraktijk Esdoornplein*: no practice of that name. The nearest are "Huisartsen De Esdoorn" (Dordrecht) and "Huisartsenpraktijk Duindoornplein" (Amsterdam), both different names.
- *Kinderboerderij De Gele Haan*: no result. The nearest is "Kinderboerderij De Gele Berg" (Rucphen), a different name.
- *Camping De Zandhoek*: no campsite of that name. The nearest are De Zandhegge, De Zanding, De Zandput and De Zandberg, all different.
- *Taalschool De Zinnen*: no language school of that name.
- *Verse Bloem* and the domain `versebloem.nl`: no wholesaler or domain found. "BLOEM!" (Utrecht) and "Bloem (SRL)" (Waregem) are different names.
- *Waterbedrijf Westerhout*: no such company. Westerhout only appears as a street and monument in Beverwijk.
- *Wijkcentrum Oost* and *Bibliotheek Oost* are generic, like Sportcentrum Oost in batch 021.

One name was tried and dropped: *Basisschool Het Klimrek*, because "Vrije Basisschool Klimrek" in Ghent has two sites.

**Dates.** Every weekday–date pair was checked with the system calendar:

- 2026: Monday 9 November, Saturday 12 December, Friday 18 December, Monday 21 December, Thursday 24, Friday 25, Saturday 26, Monday 28, Wednesday 30 and Thursday 31 December.
- 2027: Friday 1 January, Monday 4 January, Monday 18 and Tuesday 19 January, Friday 29 January, Monday 8 to Thursday 11 February, Friday 5 March, Monday 8 March, Tuesday 9 March, Friday 12 March, Sunday 21 March and Monday 30 August.

**Prices.** These are plausible for 2026–2027: babysitter 10 euro an hour, driver 15,50 euro an hour (above the 2026 minimum wage), a farm-food bag 1 euro, a children's party 6 euro per child and a late campsite departure 10 euro.

**Register.** The newspaper items, letter, rules, folders and rooster use **u**. The family advertisement, the job advertisement and the colleague e-mail use **je**, as Dutch job ads and colleagues do. Every situation and question addresses the learner with **u** or in the third person.

## 3. Premise adjustments, with reasons

- **1.** "Ook na 15.00 uur" was added to the Markt-stop closure, so that the bus question combines two details (the diversion ends at 15.00, the stop stays closed). A Stationsplein alternative was added so the closure has a practical instruction.
- **2.** The school bus needed an eligibility rule to be useful. More than 1 km from the temporary building is a common Dutch school-transport criterion. The departure point is the old school, which is where the pupils' homes are.
- **4.** The plan says talks "per group and evening". Groups 1–2 and 6–7 have after-school afternoons, as Dutch schools commonly plan them, while groups 3–5 also have an evening slot and group 8 only an evening. This creates the conflict the second question needs.
- **5.** The plan's "who it is" is realised as the officer introducing herself, which is how real wijkagent flyers are written. The Saturday walk-in is weekly so the question has one unambiguous answer.
- **7.** The rule for asking to leave late (the day before, at reception, 10 euro) was added so that "departure before twelve" can carry a two-detail question. The reception hours (9–12, 14–18) were set so that a 15.00 departure is consistent.
- **8.** "Not an official exam" is written as "Deze toets is geen inburgeringsexamen", a transparent compound every learner knows.
- **12.** "Before a date" is written as "tot en met dinsdag 9 maart", the plain form the plan recommends. The envelope and the card share the same date.

## 4. Language control

The table gives figures per text. Words are counted by whitespace, as the checker does. Prose sentences exclude headings and table rows; the checker's crude splitter joins those to the next sentence, which produces its "longest sentence" warnings (section 9).

| Item | Words | Prose sentences | Average | Longest | Unlisted text words (allowance) | Compounds reported |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| hardloopwedstrijd | 182 | 21 | 8.3 | 15 | none (3) | hardloopwedstrijd (title) |
| school-verbouwing | 209 | 21 | 9.1 | 15 | none (4) | schoolbus, schooljaar, wijkkrant (situation) |
| feestdagen-huisarts | 155 | 12 | 6.7 | 10 | none (3) | herhaalrecept(en), kerstdag, nieuwjaarsdag |
| oudergesprekken | 209 | 19 | 7.5 | 13 | tolk (3) | — |
| wijkagent | 168 | 15 | 8.1 | 15 | none (3) | — |
| kinderboerderij | 201 | 17 | 8.5 | 13 | kinderboerderij, geiten (3) | kinderfeestje |
| camping-regels | 196 | 30 | 6.4 | 17 | none (3) | toiletgebouw |
| taaltoets-dag | 168 | 30 | 5.2 | 11 | none (3) | inburgeringsexamen, toetsdag (title, q2) |
| oppas-gezocht | 199 | 26 | 7.4 | 14 | none (3) | — |
| chauffeur-gezocht | 194 | 27 | 7.0 | 15 | groothandel (3) | versebloem (e-mail domain) |
| water-onderbreking | 180 | 19 | 7.7 | 17 | leidingen, helder* (3) | waterbedrijf (situation, title) |
| cadeau-collega | 173 | 18 | 8.8 | 13 | none (3) | — |

\* `helder` passes the matcher, but only as an artefact: "hel" is the normalised form of "heel", plus the suffix "-der". It is not a listed word, so it is counted here against the allowance.

**Sentences.** No prose sentence is over 17 words, and the averages are 5.2–9.1. Subordinate clauses use only `als` ("als hij nog op de parkeerplaats is", "als u een tolk wilt") and `dat` ("dat er dan een vergadering is", "dat dit vervelend is"). Conditions are written as a question followed by "dan" ("Woont u …? Dan …"), as in the batch 021 precedent. Three early drafts used `tot` as a conjunction or an indirect question with `hoe`, `wat` or `of` ("tot wij weer open zijn", "tot het water weer helder is", "Schrijf hoe oud je bent", "Kijk of u genoeg hebt"). All were rewritten as main clauses. The tenses are present and perfect. Difficulty comes from combining two details: a street list and a time window (1 q1), a diversion end and an all-day closure (1 q2), a distance measured from the new site rather than the old one (2 q1), a date and a half-day (3 q3), two children in two groups (4 q1), working hours and a timetable (4 q2, 5 q1, 10 q1), a season and a weekday (6 q1), a count that includes the birthday child (6 q2), a departure day and "the day before" (7 q1), and a two-week window (8 q3).

**Unlisted text words.** Each is within the allowance, and no question depends on it:

- `tolk` (oudergesprekken): explained by the next sentence, "Een tolk spreekt uw taal en ook Nederlands". No question touches the interpreter.
- `kinderboerderij` (kinderboerderij): only in the folder heading. Title, situation, questions and explanations avoid it: "Dieren kijken in het park", "dieren in het Stadspark", and "De Gele Haan" as a proper name. The animals, the farm shop and the park explain it.
- `geiten` (kinderboerderij): "onze geiten, kippen en eenden" makes clear it is a farm animal. Neither question needs the animal's name.
- `groothandel` (chauffeur-gezocht): explained by "Wij verkopen niet aan gewone klanten, maar aan bloemenwinkels". The two questions are about days and how to reply.
- `leidingen` (water-onderbreking): explained by "Onder de Kastanjelaan liggen oude leidingen voor het water". The purpose key ("In zijn straat is een dag geen water") does not need the word. Distractor B ("mensen in zijn huis") is rejected by "Onder de Kastanjelaan".
- `helder` (water-onderbreking): explained by the contrast with "bruin". The q1 key is "De koude kraan laten lopen", and its evidence quote was cut before the "helder" sentence.

**Compounds.** Every reported compound was judged:

- hardloopwedstrijd = hardlopen + wedstrijd; transparent.
- schoolbus = school + bus; transparent.
- schooljaar = school + jaar; transparent.
- wijkkrant = wijk + krant; transparent.
- herhaalrecept(en) = herhalen + recept. Transparent from its parts and from "Gebruikt u elke dag medicijnen?", and it is the word learners meet at every pharmacy. It is used in 3 q2's prompt.
- kerstdag = kerst + dag; transparent.
- nieuwjaarsdag = nieuwjaar + s + dag; transparent.
- kinderfeestje = kinder + feestje; transparent.
- toiletgebouw = toilet + gebouw; transparent.
- inburgeringsexamen = inburgering + s + examen; transparent and familiar to every learner.
- toetsdag = toets + dag; transparent.
- waterbedrijf = water + bedrijf; transparent.
- `versebloem` is the e-mail domain of the company Verse Bloem, not a word the learner must understand.

Earlier drafts also reported `meedoet`, a form of the listed verb meedoen that the matcher only accepted as mee + doet; that sentence was later rewritten.

**Other forms the matcher accepts through derivation.** `lopers` (lopen + -er) and the noun `oppas` (from oppassen) are transparent. `past … op` is the separable verb oppassen.

**Avoided words.** These were avoided by rewording: betreft (→ Onderwerp), tevoren, uiterlijk, identiteitsbewijs (→ identiteitskaart of paspoort), bouwen and verbouwen (→ "krijgt een nieuw gebouw", "gaat weg"), verrassen and geheim (→ "Hij weet nog van niets, dus zeg niets tegen hem"), net (→ "zoals nu", "even oud als"), last, neer, vlak, toegang and kennismaken.

## 5. Questions: skills, keys and distractor rationales

Skill spread over 30 questions: rule-application 14, time-place 5, purpose 5, advice 3, quantity 2 and detail 1. All twelve texts have at least one persona-scenario prompt; 22 of 30 prompts are persona prompts by the checker's pattern. The other eight are the five purpose questions, 8 q2, 9 q2 and 11 q2. Five texts carry a purpose question: `hardloopwedstrijd`, `school-verbouwing`, `wijkagent`, `water-onderbreking` and `cadeau-collega`. Titles of texts with a purpose question were made neutral ("Nieuws van een basisschool", "Politie in de wijk", "Een brief van het waterbedrijf", "Patrick wordt 50"), so that no title states a purpose key.

### 1. hardloopwedstrijd

- **q1** (rule-application, key A "Tot 9.00 uur."). The Havenweg is on the closed list, and residents can leave until 9.00.
  - B "Tot 10.00 uur." is the children's run.
  - C "Tot 11.00 uur." is the main start.
  - D "Tot 15.00 uur." is the end of the closure, read as a deadline.
- **q2** (rule-application, key B "Bij de halte Station."). The prompt specifies 21 March at 16.00.
  - A "Bij de halte Markt." is wrong: the diversion ends at 15.00, but the Markt stop is closed "de hele dag, ook na 15.00 uur".
  - C "Nergens, lijn 4 rijdt die dag niet." is a reversal: the lines run, only diverted.
- **q3** (purpose, key C "Op zondag is het verkeer in het centrum anders.").
  - A "Er zijn nog lopers nodig voor de Stadsloop." is about the runners, but the text recruits nobody.
  - B "Lijn 4 en 7 rijden vanaf nu altijd over de Ringweg." treats the one-day diversion as permanent.

### 2. school-verbouwing

- **q1** (rule-application, key B "Ja, want zij woont ver van de Sportlaan."). The rule measures from the Sportlaan.
  - A "Nee, want zij woont dichtbij de oude school." measures from the wrong building.
  - C "Ja, maar Koen moet voor de bus betalen." is a reversal: the bus is free.
- **q2** (time-place, key A "Om 8.05 uur.").
  - B "Om 8.15 uur." is the arrival at the Sportlaan.
  - C "Om 8.30 uur." is the start of lessons.
  - The prompt uses an unnamed child so that it does not answer q1.
- **q3** (purpose, key D "De school krijgt een nieuw gebouw.").
  - A "De school gaat een jaar dicht." is a reversal: lessons continue elsewhere.
  - B "Naast de school komt een sporthal." is wrong: sporthal Noord already stands next to the temporary building.
  - C "De lessen beginnen na de zomer later." is a reversal of "om 8.30 uur, zoals nu".

### 3. feestdagen-huisarts

- **q1** (time-place, key B "Tot 17.00 uur.").
  - A "Tot 12.00 uur." is the 24 and 31 December row.
  - C "De praktijk is die dag dicht." takes a closed holiday row.
- **q2** (time-place, key A "Vóór 18 december."). Her medicines run out during the holidays, so the 18 December deadline applies.
  - B "Vóór 24 december." takes the last open morning before Christmas.
  - C "Op 28 december." is the first full day after Christmas, after she has run out.
  - D "Vóór 4 januari." comes from "hebt u genoeg tot 4 januari".
- **q3** (advice, key C "De huisartsenpost."). On 31 December the practice is open until 12.00 only.
  - A "De huisartsenpraktijk." ignores the half day.
  - B "De apotheek." is mentioned for repeat medicines, not for a sick child.
  - D "Het nummer 112." is for danger to life, which a high fever is not.

### 4. oudergesprekken

- **q1** (rule-application, key D "Op maandag en woensdag."). Group 2 is on Monday and group 7 on Wednesday.
  - A "Op maandag en dinsdag." takes groups 3–5 for the second child.
  - B "Op dinsdag en woensdag." is wrong for the son in group 2.
  - C "Op maandag en donderdag." takes group 8.
- **q2** (rule-application, key B "Een e-mail sturen aan de leerkracht."). Group 7's only slot (Wednesday 13–16) is during his working day.
  - A "Een tijd kiezen op dinsdag om 19.00 uur." is the evening of groups 3–5.
  - C "Een tijd kiezen op donderdag om 19.00 uur." is the group 8 evening.
  - D "Niets doen, dan kiest de school een tijd." is wrong: the school's choice is still on Wednesday afternoon.
  - Neither option names Wednesday, so q2 does not supply q1's answer.

### 5. wijkagent

- **q1** (rule-application, key C "Op zaterdag op het politiebureau.").
  - A "Op dinsdag in Wijkcentrum Oost." is the 10.00 slot, during her working day.
  - B "Op donderdag in Bibliotheek Oost." is 16.00–17.00, still before 17.30.
- **q2** (purpose, key B "Om de wijkagent aan de bewoners voor te stellen.").
  - A "Om uit te leggen hoe u aangifte doet." is wrong: aangifte is mentioned only to say it does not belong at the walk-in.
  - C "Om te waarschuwen voor auto's bij scholen." turns one example concern into the purpose.
  - D "Om de nieuwe tijden van het politiebureau te geven." is wrong: the station is only one walk-in location, and no new hours are given.

### 6. kinderboerderij

- **q1** (rule-application, key C "Nee, want op maandag is het dan dicht."). 9 November falls in the winter season, which runs Tuesday to Sunday.
  - A "Ja, want het is elke dag open." applies the summer row.
  - B "Ja, maar alleen van 10.00 tot 16.00 uur." gives the right winter hours but ignores the weekday.
- **q2** (quantity, key D "48 euro."). The son plus 7 friends makes 8 children, and 8 × 6 = 48.
  - A "6 euro." is the price per child.
  - B "36 euro." is the minimum of 6 children.
  - C "42 euro." leaves out the birthday child, who explicitly counts.

### 7. camping-regels

- **q1** (rule-application, key A "Op vrijdag bij de receptie vragen of het kan."). Late departure must be asked "de dag ervoor".
  - B "Om 12.00 uur weggaan, want later kan het niet." is a reversal: later is possible for 10 euro.
  - C "Niets, want hij mag tot 15.00 uur blijven." gets the deadline wrong.
- **q2** (rule-application, key B "Eerst bij zijn tent, daarna bij de ingang.").
  - A "De hele vakantie naast zijn tent." is a reversal.
  - C "Meteen bij de ingang, ook met alle spullen." ignores the arrival exception.
  - The key requires mapping "de parkeerplaats bij de ingang" to "bij de ingang".

### 8. taaltoets-dag

- **q1** (rule-application, key A "Hij maakt de toets een andere keer.").
  - B "Hij begint meteen met de toets." ignores the 9.30 rule.
  - C "Hij begint na de pauze met de toets." uses the 10.30 break, which is no re-entry point.
- **q2** (detail, key D "Zijn identiteitskaart of paspoort.").
  - A "Een foto van zijn identiteitskaart." is explicitly not enough.
  - B "Een woordenboek op papier." is explicitly not allowed.
  - C "Koffie en thee voor de pauze." is wrong: they are free at the school.
- **q3** (rule-application, key B "Hij wacht nog een paar dagen."). Two weeks from 12 December is 26 December, so on 21 December he waits.
  - A "Hij belt meteen de school." applies the call rule too early.
  - C "Hij maakt de toets nog een keer." is not in the rules.

### 9. oppas-gezocht

- **q1** (rule-application, key C "Nee, want hij is nog geen 18 jaar.").
  - A "Ja, want hij heeft ervaring met kleine kinderen." meets the experience rule but misses the age rule.
  - B "Ja, maar alleen op dinsdag en donderdag." answers with the days instead of the requirement.
- **q2** (quantity, key C "80 euro."). Two evenings of 4 hours at 10 euro.
  - A "20 euro." counts 10 euro per evening.
  - B "40 euro." counts one evening.

### 10. chauffeur-gezocht

- **q1** (rule-application, key A "Ja, want de baan is op vier andere dagen.").
  - B "Nee, want de baan is ook op woensdag." is wrong: Wednesday is not a working day of the job.
  - C "Nee, want zij heeft geen ervaring als chauffeur." is a reversal: experience is "fijn, maar niet nodig". The prompt states her lack of experience so that C is grounded.
- **q2** (advice, key B "Een korte e-mail met haar cv sturen.").
  - A "Op een werkdag na 14.00 uur bellen." is for questions only.
  - C "Om 5.00 uur naar het bedrijf komen." is the loading time.
  - D "Haar cv naar een bloemenwinkel brengen." is wrong: the shops are the company's customers.

### 11. water-onderbreking

- **q1** (rule-application, key C "De koude kraan laten lopen.").
  - A "Meteen het waterbedrijf bellen." is wrong: calling is only after an hour of brown water.
  - B "Meteen zijn kleren gaan wassen." is wrong: the washing machine waits, or white clothes turn brown.
- **q2** (time-place, key A "Op maandag 18 januari.").
  - B "Op dinsdag 19 januari om 8.00 uur." is the moment the water goes off.
  - C "Op dinsdag 19 januari na 16.00 uur." is when the water is back.
- **q3** (purpose, key D "In zijn straat is een dag geen water.").
  - A "Het water in zijn straat is gevaarlijk." is a reversal of "Dat is niet gevaarlijk".
  - B "Er komen mensen in zijn huis werken." is wrong: the work is under the street.
  - C "Zijn wasmachine gebruikt te veel water." misreads the washing-machine instruction as a complaint.

### 12. cadeau-collega

- **q1** (advice, key C "Geld in een envelop bij de receptie afgeven."). The prompt says "het plan van Elif" so that it does not state q3's purpose.
  - A "Geld aan Elif geven in de kantine." names the wrong person and place.
  - B "Patrick vragen wat hij graag wil." is a reversal: "zeg niets tegen hem".
  - D "Op vrijdag 12 maart geld meenemen naar de kantine." is the cake day, after the deadline.
- **q2** (time-place, key A "Op vrijdag 5 maart."). She is away from 8 to 12 March, and the card can be signed until 9 March, so she signs before her holiday.
  - B "Op dinsdag 9 maart." is the deadline, but she is away.
  - C "Op vrijdag 12 maart." is the birthday, after the deadline.
- **q3** (purpose, key D "Zij wil met de collega's iets geven aan Patrick.").
  - A "Zij nodigt alle collega's uit voor een vergadering." is wrong: the meeting is the cover story told to Patrick.
  - B "Zij vertelt dat het feest voor Patrick niet doorgaat." mistakes Patrick's "Geen feest" for the plan.
  - C "Zij vraagt wie er taart wil bakken." is wrong: cake is mentioned, but nobody is asked to bake.

## 6. Key balance and option counts

| Key | Count | Share |
| --- | ---: | ---: |
| A | 8 | 27% |
| B | 8 | 27% |
| C | 8 | 27% |
| D | 6 | 20% |

No letter is above 40% and none is below 20%, D included, as the coordinator asked. Key sequence in file order:

A B C B A D B A C D B C B C D A B A D B C C A B C A D C A D

No letter appears three times in a row.

Per item, in question order:

| Item | Keys |
| --- | --- |
| 1 | A-B-C |
| 2 | B-A-D |
| 3 | B-A-C |
| 4 | D-B |
| 5 | C-B |
| 6 | C-D |
| 7 | A-B |
| 8 | A-D-B |
| 9 | C-C |
| 10 | A-B |
| 11 | C-A-D |
| 12 | C-A-D |

Option counts: 17 questions with three options and 13 with four (43%). Keys within the four-option questions: A2, B3, C2, D6. Keeping D at 20% of the batch means D keys about half of the four-option questions (see section 10).

A script checked the option lengths. The key is never strictly the longest option by character count except where it ties: the numeric options (times and prices) and 5 q1, where key and B are both 33 characters. No question triggers the checker's option-length spread warning.

## 7. Requested words

These everyday words would make the scenes more natural; the texts work around them for now. The coordinator decides.

- **`kinderboerderij`** and **`geit`**: the plan's own topic. Without them the title and situation must say "dieren in het (Stads)park" and the questions use the farm's name.
- **`tolk`**: the plan asks for an interpreter. It is used once in the text, explained in context.
- **`bouwen`** (and `verbouwen`): the school item avoids "bouwen" ("krijgt een nieuw gebouw", "het oude gebouw gaat weg"), which is slightly less natural Dutch.
- **`leiding`** (`waterleiding`): water and gas letters need it.
- Lower priority: **`groothandel`** and **`helder`**. Each is used once in a text and explained by context.

## 8. Sources and facts mirrored

There are no time-sensitive official facts. The general practices mirrored are: the huisartsenpost for when the GP practice is closed, 112 for danger to life, repeat prescriptions ordered before the holidays, the wijkagent's walk-in hour, aangifte at the station or online, and brown tap water after pipe work (run the cold tap). They are stated as the fictional organisations' own rules, not as KNM claims.

## 9. Checker result

`npx tsx scripts/batch-check.ts content/batches/088-original.json`:

```
Checked 12 items, 30 questions. Keys: {"A":8,"B":8,"C":8,"D":6}. Options: {"3":17,"4":13}.
  warn  A2:reading:batch088-hardloopwedstrijd:1: compounds of listed words (reviewer: transparent at A2?): hardloopwedstrijd
  warn  A2:reading:batch088-school-verbouwing:1: compounds of listed words (reviewer: transparent at A2?): schoolbus, schooljaar, wijkkrant
  warn  A2:reading:batch088-school-verbouwing:1: longest sentence 20 words (A2 target 18)
  warn  A2:reading:batch088-feestdagen-huisarts:1: compounds of listed words (reviewer: transparent at A2?): herhaalrecept, herhaalrecepten, kerstdag, nieuwjaarsdag
  warn  A2:reading:batch088-feestdagen-huisarts:1: average sentence length 12.9 words (A2 target under 12)
  warn  A2:reading:batch088-feestdagen-huisarts:1: longest sentence 83 words (A2 target 18)
  warn  A2:reading:batch088-oudergesprekken:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): tolk
  warn  A2:reading:batch088-oudergesprekken:1: longest sentence 74 words (A2 target 18)
  warn  A2:reading:batch088-wijkagent:1: longest sentence 44 words (A2 target 18)
  warn  A2:reading:batch088-kinderboerderij:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): geiten, kinderboerderij
  warn  A2:reading:batch088-kinderboerderij:1: compounds of listed words (reviewer: transparent at A2?): kinderfeestje
  warn  A2:reading:batch088-kinderboerderij:1: longest sentence 57 words (A2 target 18)
  warn  A2:reading:batch088-camping-regels:1: compounds of listed words (reviewer: transparent at A2?): toiletgebouw
  warn  A2:reading:batch088-taaltoets-dag:1: compounds of listed words (reviewer: transparent at A2?): inburgeringsexamen, toetsdag
  warn  A2:reading:batch088-taaltoets-dag:1: longest sentence 22 words (A2 target 18)
  warn  A2:reading:batch088-chauffeur-gezocht:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): groothandel
  warn  A2:reading:batch088-chauffeur-gezocht:1: compounds of listed words (reviewer: transparent at A2?): versebloem
  warn  A2:reading:batch088-water-onderbreking:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): leidingen
  warn  A2:reading:batch088-water-onderbreking:1: compounds of listed words (reviewer: transparent at A2?): waterbedrijf
  warn  A2:reading:batch088-water-onderbreking:1: longest sentence 32 words (A2 target 18)
20 warning(s), no failures.
```

- **Vocabulary warnings (10).** The unlisted words and compounds are each explained in section 4.
- **Sentence-length warnings (10).** These are splitter artefacts. The checker splits only on `. `, `! ` or `? `, so headings, letterheads, salutations and table rows without terminal punctuation merge with the next sentence. The affected texts and what merges:
  - `feestdagen-huisarts`: the eight-row table plus a heading.
  - `oudergesprekken`: the five-row table plus headings.
  - `wijkagent`: the four-row table plus the walk-in heading.
  - `kinderboerderij`: the three-row table plus headings.
  - `water-onderbreking`: the letterhead, address line, Onderwerp line and salutation.
  - `taaltoets-dag`: the school name and rules heading.
  - `school-verbouwing`: the section headings.

  The prose figures in section 4 are all within the A2 heuristics: longest 17, averages under 10. Table rows stay without periods because the app renders `text` with `white-space: pre-line`, the batch 004 and 021 precedent.

## 10. Things the reviewer should look at

- **D-key concentration.** D is the key in 6 of the 13 four-option questions. That keeps D at 20% of the batch, as the brief requires, but a test-wise learner could notice it. If the coordinator accepts D below 20%, two D keys can be moved to A or B by permuting options:
  - 2 q3: put "De school krijgt een nieuw gebouw." first.
  - 12 q3: swap D and A.
  Both changes keep the other rules.
- **2 q3 (purpose).** The key paraphrases the headline and is easy. The distractors still test reversals (closure, start time, sporthal). If the reviewer prefers a harder purpose question, "Waarom gaan de kinderen een jaar naar de Sportlaan?" (key: the old building goes away) is a ready alternative.
- **3 q3.** The "Het nummer 112." option relies on the learner judging that a high fever is not danger to life. The text gives 112 only for "gevaar voor het leven", and the prompt does not suggest danger.
- **5 q1.** The key and B are the same length (33 characters). The Saturday walk-in is weekly, a deliberate change from a first-Saturday draft that made the key option longer and imprecise.
- **6.** Without `kinderboerderij` in the list, the title "Dieren kijken in het park" and the situation "dieren in het Stadspark" are a little vague; see Requested words. The farm's proper name "De Gele Haan" carries the questions.
- **7 q2.** The key says "daarna bij de ingang", where the text says "op de parkeerplaats bij de ingang". This mapping is intended. The containers are also at the entrance, but they do not interfere with the question.
- **9 q2.** The evidence quote gives only the hourly rate; the hours (17.30–21.30, two evenings) come from the first paragraph. The explanation shows the calculation.
- **12 q2.** The answer assumes the e-mail reaches Olga before 5 March. The text gives no sending date, as is usual for such e-mails.
- **Level.** This is an unvalidated authoring target (`targetLevelValidated: false`). No exemplar comparison was possible because `content/exemplars/` holds no A2 reading exemplars of these types.

## 11. Limitations

This is original practice material with unvalidated difficulty labels. It makes no claim of official approval, scoring or exam equivalence. The items have not been reviewed yet: `status` stays `draft` until the batch passes independent editorial review and the hash gate.
