# Batch 020: design notes

Nine original A2 reading texts (`exam: duo-a2`, `part: reading`), 23 closed questions, written against `content/blueprint.md` sections 1, 3, 4.1, 5, 8, 9, 10 and 13 and the A2 Lezen paragraph of `docs/research/exam-blueprints-2026-09-10.md`. Format example: batch 004. Every text is invented; official practice items were used for shape only (situation line, 100–250 words, two or three questions, persona and purpose prompts, three- and four-option items). None of the official practice-exam settings (study tips, village letter, delivery folder, staff outing, sports day, wedding committee, first-aid course, recycling centre, sick-call rules) is reused.

Source file: `content/batches/020-original.json`. Checker: `npm run batch:check content/batches/020-original.json` — no failures, no warnings (section 7).

## 1. Slots, settings and why they are new

The coordinator asked for brief ×2, email ×2, folder, bericht, advertentie, regels, rooster over the domains werk ×2, gezondheid ×2, vervoer, instanties ×2, winkels-diensten, vrije-tijd-familie. Three of the suggested settings were replaced because the bank already holds them or the domain list has no room for them:

- "a letter from the gemeente about a parking permit" → **a gemeente letter about an expiring identiteitskaart**. `A2:reading:batch004-parkeervergunning` is exactly the suggested letter (renewal before 1 December, online or at the balie), and `A2:listening:batch005-parkeervergunning` is the same subject as a voicemail.
- "a pharmacy folder about opening hours and repeat prescriptions" → **a huisartsenpost folder**. `A2:reading:batch004-herhaalrecept` already covers ordering repeat medicines from the apotheek (website or phone line, ready the next working day, delivery by age). The huisartsenpost is on the blueprint's needed list and the bank has it only as a KNM fact card (`batch006-huisartsenpost`) and a B1 news item (`batch011-huisartsenpost-drukte`).
- "a course rooster of a language school" → **the opening hours and aangifte rules of a police station**. The requested domain list has no `opleiding` slot; the `rooster` slot needed an `instanties` home, and "a police report" is on the blueprint's needed list.

| # | taskType / domain | Slug | Setting | Q | Nearest neighbour in the bank and why it differs |
| --- | --- | --- | --- | --- | --- |
| 1 | brief / instanties | `identiteitskaart` | Gemeente letter: the identiteitskaart is valid until 14 February; three steps (appointment, pasfoto no older than six months, balie with old card and photo); prices for adults and children; ready after five working days; collect in person, no appointment needed for collecting | 3 | `batch004-parkeervergunning` is also an expiry letter, but the rules tested are different: photo age, collecting in person, and the purpose. `A2:speaking:batch009-paspoort` is a picture sequence about a passport in another part. |
| 2 | brief / werk | `loonstrook-uitleg` | Employer letter: the payslip goes digital from January; what brutoloon, loonheffing, reiskosten and nettoloon mean; vakantiegeld in May; errors reported before the 10th are corrected on that month's payslip, later ones a month later; printing at the office for staff without a computer | 3 | `A2:writing:batch003-loonstrook` is a complaint e-mail to write; `A2:knm:batch006-loonheffing` is a one-fact card. This is the first reading text about a payslip. |
| 3 | email / werk | `dienstwissel` | Team leader's e-mail: next week's rooster changes because a colleague is away; old and new rooster; one extra day, overtime as a day off later, 20% evening bonus; can't work Friday → swap with a colleague and e-mail before Wednesday 12.00; can't work Thursday evening → phone | 2 | `batch004-magazijn` is a job ad with shift times; `A2:listening:batch005-training` is a work conversation about a training. No item has a changed personal rooster. |
| 4 | email / vrije-tijd-familie | `voetbalseizoen` | Youth football club e-mail to parents: season start, training day and time, home and away match times, what the club provides and what parents buy, contributie, the parents' driving rota, a parents' evening | 3 | `A2:listening:batch005-voetbal` is a trainer's voicemail about one moved match (Fatima and Amina). This is a season-start e-mail to all parents (Karim and Adam) with different facts; allowed across parts, but mixed drills should not pair them. |
| 5 | folder / gezondheid | `huisartsenpost-folder` | Huisartsenpost folder: hours (weekday evenings and nights, weekends, holidays), always phone first, what the assistant does, where (hospital entrance C, parking), what to bring, daytime → own huisarts, no cost, 112 for danger | 2 | KNM card `batch006-huisartsenpost` states the concept in one sentence; B1 `batch011-huisartsenpost-drukte` is a news piece about waiting times. This is the practical folder. `batch004-bloedprikken` is a different service in the same fictional hospital. |
| 6 | regels / gezondheid | `tandartsregels` | Dentist's house rules: cancel 24 hours ahead or pay 35 euro, come five minutes early, more than ten minutes late means a new appointment, first visit documents, children free until 18, invoices by e-mail within 30 days, pain before 10.00 or the weekend duty dentist | 3 | `A2:listening:tandarts` is a short voicemail about one appointment; `A2:writing:batch008-nieuwe-patient` is a registration form. First `regels` text in the health domain. |
| 7 | advertentie / winkels-diensten | `tweedehandsfiets` | Private noticeboard ad for a second-hand bicycle: condition, price against the new price, viewing times, phone, collection only, payment, a child seat sold separately or together at a combined price | 2 | The bank's ads (`p4`, `batch004-magazijn`) are job ads; `B1:speaking:batch017-fietskeuze` is a speaking task about choosing a bicycle. First goods-for-sale ad. |
| 8 | bericht / vervoer | `spoorwerk` | Station notice: no trains to Zuidstad from Friday 22.00 to Monday 5.00 because of track work; buses from halte D every quarter hour, 40 instead of 15 minutes, train ticket valid, no bicycles but folding bikes yes, wheelchair help, trains to Noorddorp run normally | 3 | `A2:listening:batch002-trein` is a platform-change announcement; `batch004-stadsbus` is a ticket folder. First rail-replacement text. |
| 9 | rooster / instanties | `politiebureau` | Police station: opening hours per day, three ways to report a theft (online with DigiD, at the bureau by appointment, walk-in only Tuesday and Thursday mornings), what to bring, lost property is the gemeente's website, 112 for emergencies | 2 | KNM cards `noodnummer` and `identificatieplicht` state facts; no reading item about the police exists. Same table-like shape as `batch004-bloedprikken` (hours per location) but a different operation: an opening hour that is not a walk-in hour. |

Batch 021 (sibling) takes a shop return policy, a library notice, a housing-corporation letter, a school-trip e-mail, a swimming-pool timetable, a job advertisement, a news item about a market, a neighbour's note and a museum folder; none of those settings is touched here. No `krant` text in this batch by design (021 has it).

Question count: five texts with three questions and four with two = 23. Nine questions have four options (39%), fourteen have three.

## 2. Names, places, facts and register

- **Personas** from the illustration cast (`config/illustration.json`), spread so that nobody carries more than two texts: Modibo (1), Sabrina (2), Hasan (3), Karim with his son Adam (4), Fatima (5), mevrouw Bakker (6, 9), meneer De Vries (6, 9), Julio (7), Roos (8). Adam is a new child's name (the cast child Amina already plays football in `batch005-voetbal`).
- **Other invented names:** Ellen de Groot (team leader, woman), Joke Willems (personnel officer, woman), Bram Visser (trainer, man), Ineke (private seller, woman), heer Doumbia (Modibo's surname in the gemeente letter). Roles are mixed on purpose.
- **Web checks of invented names** (WebSearch, 10 September 2026): `Kwekerij Groenwater` — no such firm (Kwekerij Groen and Kwekerij In 't Groen exist, different names); `Wasserij De Zilverreiger` — no such laundry (a first choice, "Wasserij Wittebrug", turned out to be a historical laundry in The Hague and was dropped); `VV Reigerhoek` — no such club (a first choice, "VV Vliethaven", was one letter away from the former Haagse club VV Vliethage and was dropped); `Tandartspraktijk Wilgenhoek` — no such practice (a first choice, "Kastanjehof", sits too close to Tandheelkundig Centrum Kastanjehoeve and was dropped). `Modibo Koné`, the first surname tried for the gemeente letter, is a serving Malian security official; `Modibo Doumbia` returned no public figure. `Bram Visser`, `Ellen de Groot` and `Joke Willems` returned no public figures. `Zuidstad` and `Noorddorp` are not station or place names; `Westerhout` (the bank's fictional town since batch 004) is a street or neighbourhood name in Beverwijk, Druten and Noordwijkerhout but no gemeente, and `www.westerhout.nl` does not resolve (checked with a fetch on 10 September 2026).
- **Fictional world reused from batch 004:** the town Westerhout, the hospital (batch 004 uses ingang B for bloodwork, this batch ingang C for the huisartsenpost), the Molenweg (Gezondheidscentrum Noord at number 3 in batch 004; the bicycle seller at number 15 here) and the gemeente website `www.westerhout.nl`. Phone numbers follow the exam's spacing (0299 45 00 00, 06 12 34 56 78).
- **Real-world facts mirrored** (all general knowledge a gemeente, employer or practice would print; no KNM claim is made): a pasfoto for a travel document may not be older than six months and the document is collected in person (Rijksoverheid); an identiteitskaart costs roughly 80–85 euro for adults and about 45 euro for children in 2026 (the exact tariff is set yearly; 82,50 and 45 are plausible round figures); vakantiegeld is 8% and the tax-free travel allowance is 0,23 euro per kilometre; dental care for children under 18 is in the basisverzekering; a huisartsenpost visit falls under huisartsenzorg and costs no eigen risico; theft can be reported online with DigiD; lost property is handled by the gemeente, not the police; 112 is the emergency number. Every other figure (prices, times, phone numbers, addresses) is invented.
- **Dates checked against the 2026 calendar:** Monday 31 August, Wednesday 2 September and Saturday 5 September (text 4); Friday 16, Saturday 17 and Monday 19 October (text 8). 14 February (text 1) and 12 March (text 2) carry no weekday.
- **Register:** gemeente, employer, huisartsenpost, dentist, station and police write formally with `u` (1, 2, 5, 6, 8, 9); the team leader's e-mail (3) is informal with `je`, as between colleagues; the club e-mail (4) is formal to parents; the private ad (7) uses `u` and `ik`.

## 3. Level control (A2)

Figures per text. "Checker" is the splitter of `scripts/batch-check.ts` (which merges unpunctuated header lines with the first sentence). "Prose" excludes headers, address and salutation lines, list labels and schedule rows.

| Text | Words | Checker avg / longest | Prose sentences avg / longest | Less common words (g = glossed in context, n = not needed for a key, ! = needed) |
| --- | ---: | --- | --- | --- |
| identiteitskaart | 158 | 8.2 / 17 | 7.9 / 11 | pasfoto (!), Burgerzaken (n), contant (n) |
| loonstrook-uitleg | 176 | 8.0 / 17 | 7.5 / 14 | brutoloon / nettoloon / loonheffing (each glossed by its own line, !), personeelsnummer (n), vakantiegeld (n) |
| dienstwissel | 151 | 7.5 / 17 | 6.4 / 9 | overuren (g, n), ochtenddienst / avonddienst (transparent, !), ruilen (!) |
| voetbalseizoen | 153 | 7.7 / 16 | 7.1 / 14 | scheenbeschermers (transparent compound, !), contributie (glossed by "het lidmaatschap kost", n), uitwedstrijd / thuiswedstrijd (transparent, !) |
| huisartsenpost-folder | 164 | 7.1 / 13 | 6.6 / 12 | verzekeringspas (n), herhaalrecept (n), feestdagen (n) |
| tandartsregels | 166 | 6.0 / 15 | 5.9 / 15 | afzeggen (!), behandeling (n), van tevoren (!) |
| tweedehandsfiets | 134 | 7.1 / 16 | 6.8 / 16 | versnellingen (n), handremmen (n), zadel (n), kinderzitje (transparent, !) |
| spoorwerk | 160 | 6.7 / 14 | 6.7 / 14 | vouwfiets (transparent, !), rolstoel (n), kwartier (n) |
| politiebureau | 156 | 6.5 / 14 | 6.1 / 12 | aangifte (glossed by "Is uw fiets gestolen? … Dan doet u aangifte bij de politie", !), gevonden voorwerpen (glossed by "Bent u iets kwijt, bijvoorbeeld …", !) |

All texts are inside 100–250 words; no checker chunk exceeds 18 words and no prose sentence exceeds 16. Subordinate clauses are limited to `als`, `dat` and `die` (relative, in "de tandarts die dienst heeft"); conditions use the question-then-`dan` pattern of official A2 texts ("Kunt u niet komen? Zeg uw afspraak dan … af."). Tenses: present, one perfect ("heb ik het rooster veranderd"), one simple past in the ad ("Nieuw kostte de fiets 450 euro"). Difficulty comes from combining two details: an age of a photo against a limit (1), a date against the 10th plus a month step (2), a day against two roosters (3), a bought item against a provided-and-bought list (4), a time of day against two services (5), an appointment time minus 24 hours and a lateness against a ten-minute rule (6), working hours against viewing times (7), a bicycle type against a bus rule (8), an opening hour against a walk-in hour (9). Prompts use `uiterlijk` (text 6) as the only less common word.

## 4. Questions: skills, keys, distractor rationales

Skill spread over 23 questions: rule-application 11, purpose 4, time-place 4, detail 1, quantity 1, sequence 1, advice 1. Every text has at least one persona-scenario prompt (19 of 23 prompts start with a person and a situation sentence); four texts have a purpose question (1, 2, 4, 8), i.e. one per two or three texts.

Each distractor is wrong for one nameable reason and sits on a detail the text mentions.

### 1 — identiteitskaart

- q1 (rule-application, key C "Nee, want de foto is te oud"): A "Ja, want de foto is nog geen jaar oud" — true premise, wrong conclusion: the limit is six months, not a year. B "Ja, als hij de foto meeneemt naar de balie" — bringing the photo is step 3, but the age rule still fails.
- q2 (rule-application, key A "Nee, Modibo moet zelf komen"): B "Ja, als zij eerst een afspraak maakt" — imports the appointment step of applying; collecting needs no appointment and no other person may do it. C "Ja, als zij zijn oude kaart meeneemt" — the old card belongs to the application at the balie, not to collecting.
- q3 (purpose, key D "Zijn kaart is niet lang meer geldig"): A "Zijn nieuwe kaart ligt klaar bij de balie" — reads the collection paragraph as the present situation; no card has been applied for. B "Hij heeft een afspraak op het gemeentehuis" — the appointment is something he must still make. C "Zijn pasfoto is te oud" — the six-month rule is a condition, not the reason for the letter.

### 2 — loonstrook-uitleg

- q1 (detail, key B "Het nettoloon"): A "Het brutoloon" — the pre-tax amount ("uw loon vóór de belasting"). C "De loonheffing" — the tax the employer pays to the Belastingdienst.
- q2 (rule-application, key B "Op de loonstrook van april"): A "Op de loonstrook van maart" — applies the before-the-10th rule to a mail sent on the 12th. C "Op de loonstrook van mei" — the month of the vakantiegeld.
- q3 (purpose, key A "Haar loonstrook komt niet meer op papier"): B "Er staat een fout op haar loonstrook" — the error paragraph is a conditional instruction. C "Zij krijgt dit jaar geen vakantiegeld" — reversed: she gets it in May. D "Zij moet haar personeelsnummer doorgeven" — she logs in with it; nothing is asked of her.

### 3 — dienstwissel

- q1 (time-place, key C "Om 14.00 uur"): A "Om 6.00 uur" — the start in the old rooster (and on Monday and Tuesday in the new one). B "Om 12.00 uur" — the e-mail deadline on Wednesday. D "Om 22.00 uur" — the end of the evening shift.
- q2 (rule-application, key C "Ruilen met een collega en Ellen mailen"): A "Ellen bellen op haar mobiele nummer" — the rule for Thursday evening. B "De uren van vrijdag later opnemen als vrije dag" — the overtime rule, which is about the hours worked, not about not working.

### 4 — voetbalseizoen

- q1 (time-place, key A "Om 8.15 uur"): B "Om 9.00 uur" — the start of a home match. C "Om 17.30 uur" — the start of Wednesday training.
- q2 (rule-application, key D "Alleen scheenbeschermers"): A "Een shirt", B "Een broekje", C "Een shirt en een broekje" — all provided by the club; a reader who misses "koopt u zelf" or "krijgt van de club" picks one of these.
- q3 (purpose, key C "De ouders krijgen informatie over het seizoen"): A "De eerste training van het seizoen gaat niet door" — reversed: the first training is announced for 2 September. B "De club heeft geen shirts meer voor de kinderen" — reversed: the club gives each child a shirt. D "De ouderavond is op een andere dag" — the parents' evening is simply announced, not moved.

### 5 — huisartsenpost-folder

- q1 (rule-application, key A "Haar eigen huisarts"): B "De huisartsenpost" — tempting because the folder is about the post, but weekday daytime belongs to the own huisarts. C "Het nummer 112" — only for direct danger.
- q2 (sequence, key C "De huisartsenpost bellen"): A "Naar ingang C van het ziekenhuis gaan" — the location, but "Kom niet zonder afspraak" and "Bel altijd eerst" put the call first. B "Haar eigen huisarts bellen" — the weekday-daytime rule applied to a Sunday.

### 6 — tandartsregels

- q1 (rule-application, key B "Maandag vóór 14.00 uur"): A "Maandag vóór 10.00 uur" — mixes the 24-hour rule with the 10.00 cut-off for pain calls. C "Dinsdag vóór 10.00 uur" — the pain cut-off applied to cancelling. D "Dinsdag vóór 13.55 uur" — the five-minutes-early rule applied to cancelling.
- q2 (rule-application, key B "Hij krijgt een nieuwe afspraak"): A "De tandarts helpt hem meteen" — reversed: more than ten minutes late means no treatment. C "Hij betaalt 35 euro" — the fee for cancelling too late, not for arriving late.
- q3 (advice, key C "De tandarts bellen die dienst heeft"): A "Vóór 10.00 uur naar 0299 33 44 55 bellen" — the weekday pain rule; the practice is closed on Saturday. B "Een e-mail sturen naar de praktijk" — e-mail is a way to cancel, not to get help with pain.

### 7 — tweedehandsfiets

- q1 (time-place, key A "Op dinsdag om 19.00 uur"): B "Op donderdag om 12.00 uur" — a viewing day, but Ineke is home after 18.00 and Julio works until 17.30. C "Op donderdag om 17.00 uur" — same day, still before 18.00 and inside Julio's working hours. D "Op zaterdag om 10.00 uur" — Ineke is home, but the prompt asks for a working day.
- q2 (quantity, key B "150 euro"): A "140 euro" — the bicycle alone. C "160 euro" — the bicycle plus the seat at their separate prices; the ad gives a lower combined price.

### 8 — spoorwerk

- q1 (rule-application, key A "De bus nemen bij bushalte D"): B "De trein nemen van spoor 2" — spoor 2 serves Noorddorp, the direction that still runs. C "Een nieuw kaartje kopen voor de bus" — reversed: the train ticket is valid on the bus.
- q2 (rule-application, key C "Nee, alleen een vouwfiets mag mee"): A "Ja, als zij een treinkaartje heeft" — the ticket rule has nothing to do with bicycles. B "Ja, als zij het tegen de chauffeur zegt" — telling the driver is the wheelchair rule.
- q3 (purpose, key D "Er rijden dit weekend geen treinen naar Zuidstad"): A "Het station is het hele weekend gesloten" — reversed: buses leave from the station and staff are there. B "De bussen naar Zuidstad rijden dit weekend niet" — reversed: the buses replace the trains. C "Reizigers moeten een nieuw kaartje kopen voor de trein" — reversed: no new ticket is needed.

### 9 — politiebureau

- q1 (rule-application, key B "Op dinsdag om 10.00 uur"): A "Op maandag om 10.00 uur" — the bureau is open, but Monday is not a walk-in day. C "Op donderdag om 19.00 uur" — a walk-in day, but the walk-in hours end at 12.00; the evening opening is for appointments. D "Op zaterdag om 11.00 uur" — open, not a walk-in day.
- q2 (time-place, key B "Op de website van de gemeente"): A "Op het politiebureau, zonder afspraak" — the walk-in hours are for aangifte of theft, and the text says lost items are not a police matter. C "Op de website van de politie" — the police website is for reporting theft online.

## 5. Key balance and option counts

| Key | All 23 | 14 three-option | 9 four-option |
| --- | ---: | ---: | ---: |
| A | 6 (26%) | 4 | 2 |
| B | 7 (30%) | 5 | 2 |
| C | 7 (30%) | 5 | 2 |
| D | 3 (13%) | — | 3 |

No letter above 40%; A, B and C above 20%; D cannot reach 20% of all questions with nine four-option items unless it is over-keyed inside them, so the four-option keys were spread 2/2/2/3 as the batch 004 review asked. Key positions in question order: 1 C-A-D, 2 B-B-A, 3 C-C, 4 A-D-C, 5 A-C, 6 B-B-C, 7 A-B, 8 A-C-D, 9 B-B; no letter three times in a row. No key is the longest option of its question by more than two characters (checked by the script rule the checker uses per text); where the key would have been longest, a distractor was lengthened (4 q3, 8 q3) or the key shortened (1 q3). Options with times, months, days and amounts are in chronological or ascending order.

## 6. Diversity against the catalogue and batch 004

- All nine settings are absent from section 9's existing-topics list and from the catalogue titles (section 1 table). The checker reports no reused slug; slugs that exist in other parts (`tandarts`, `voetbal`, `loonstrook`, `huisartsenpost`, `trein`, `paspoort`) were avoided by using `tandartsregels`, `voetbalseizoen`, `loonstrook-uitleg`, `huisartsenpost-folder`, `spoorwerk`, `identiteitskaart`.
- Domains needed by the blueprint that this batch serves: work (payslip, shift change), health (huisartsenpost, dentist rules), transport (rail replacement), instanties (gemeente letter, police), family and free time (sports club). No neighbourhood or volunteering text.
- Operations do not repeat within the batch: photo-age rule and in-person collection; payslip vocabulary and a cut-off date with a month step; a rooster read for one day and a swap procedure; a meeting time, a bought-versus-provided list and a season purpose; a time-of-day service rule and "call first"; a 24-hour cancellation, a lateness rule and a weekend number; viewing hours against working hours and a bundle price; a replacement bus, a bicycle rule and a warning purpose; walk-in hours against opening hours and lost property.
- Cross-part neighbours a mixed drill should not pair: `voetbalseizoen` ↔ `A2:listening:batch005-voetbal`; `huisartsenpost-folder` ↔ `A2:knm:batch006-huisartsenpost`; `loonstrook-uitleg` ↔ `A2:writing:batch003-loonstrook` and `A2:knm:batch006-loonheffing`; `identiteitskaart` ↔ `A2:speaking:batch009-paspoort`; `tandartsregels` ↔ `A2:listening:tandarts`.

## 7. Checker output

```
> batch:check
> tsx scripts/batch-check.ts content/batches/020-original.json

Checked 9 items, 23 questions. Keys: {"C":7,"A":6,"D":3,"B":7}. Options: {"3":14,"4":9}.
No failures, no warnings.
```

Schedule rows and list rows end with a period on purpose (unlike batch 004), so the checker's sentence splitter treats them as sentences; that is why there are no length warnings. The rows still render as separate lines in the app.

## 8. Doubts for the reviewer

- **Text 7 domain.** A private noticeboard ad for a bicycle is filed under `winkels-diensten` (buying goods) because that was the open slot; `vervoer` would also be defensible. The seller is a private person, not a shop, which matches the "advertentie" type in the official exam better than a shop ad would, but it is not a "winkel".
- **Text 9 as `rooster`.** The text is opening hours plus a procedure, the shape the blueprint lists under `rooster` (schedule, opening hours, programme). The subject is a stolen bicycle; nothing graphic, but it is the first crime-adjacent A2 reading text.
- **Text 2 q2.** The rule "Doe dit vóór de 10e van de maand. Dan verbeteren wij de fout op de loonstrook van die maand. Mailt u later? Dan … een maand later." is meant to have one reading: mail on 12 March → April payslip. Please check that "die maand" cannot be read as the month of the faulty payslip.
- **Text 1 q1** uses the "Ja, want … / Nee, want …" option format with a true-premise distractor ("nog geen jaar oud"), the format the batch 004 review accepted for `magazijn` q1.
- **Text 4 q2 key** "Alleen scheenbeschermers." — the word "alleen" is in the key (not on the checker's absolute-term list); it is there to make the key parallel in length with the combination option C. "Scheenbeschermers" is the one word a learner must match in the text.
- **112** appears in two texts (5 and 9) as the standard closing line of such folders; the wording differs.
- **Prices.** 82,50 / 45 euro for the identiteitskaart and 125 euro club contributie are plausible 2026 figures, not the tariffs of a real gemeente or club.
- **Persona ages.** Mevrouw Bakker (about 65) and meneer De Vries (about 60) appear together in text 6 and text 9; both fit the cast descriptions.
- Level: unvalidated authoring target (`targetLevelValidated: false`); no exemplar comparison was possible because `content/exemplars/` still does not exist.

## 9. Limitations

Original practice material with unvalidated difficulty labels. No claim of official approval, scoring or exam equivalence. The items have not been reviewed yet; `status` stays `draft` until the batch passes editorial review and the hash gate.
