# Batch 010: design notes

Three original B1 reading texts (`exam: nt2-i`, `part: reading`) written against `content/blueprint.md` sections 1, 3, 4.6, 5, 8, 9, 10, 12 and 13, the "Lezen I" paragraph of `docs/research/exam-blueprints-2026-09-10.md` and the batch brief. Nineteen closed questions, three options each. The sibling batch 011 covers the other three text types of a six-text form; this batch supplies the interview (werk, beschouwend), the opinion article (educatie, persuasief) and the look-up text (overig, instructief).

Every text is invented. Official practice exams were used for shape only: 400–700 words, five to seven three-option questions, a `situation` line in the "U leest …" style, "Wat is het doel van deze tekst?" as the last question of every text, at least one opinion or inference item per text, persona questions answered by scanning for the look-up text. No text, question or option is copied or paraphrased from an official item, and none of the catalogue settings (gereedschap delen, dienst ruilen, bakfiets lenen, gedeelde tuin, buurtbus, cursusfonds, deelauto, stageplaats, energiegesprek, ouderavond) is reused. The existing B1 item `dienst ruilen` is a short A2-sized note about swapping one shift; the interview here is about a company's shift-work policy as a whole, of which swapping is one of five topics.

Source file: `content/batches/010-original.json`. Checker: `npm run batch:check content/batches/010-original.json` reports no failures and no warnings (output in section 6).

## 1. Batch matrix

| # | Slug | taskType / textType / domain | Scenario | Words | Q | Why it is not a duplicate |
| --- | --- | --- | --- | ---: | ---: | --- |
| 1 | `ploegendienst` | interview / beschouwend / werk | Personeelsblad interview with Farah Benali, planner at a bread factory that runs three shifts: forward rotation, night-shift measures (max three nights, nap room, light meals, fewer nights for 55+), roster six weeks ahead, opinion that the middagdienst is worse for families than the nachtdienst, swapping via an app under three rules, a three-month trial for newcomers | 578 | 6 | First long work text; first interview; first text about shift work as a policy. `dienst ruilen` (catalogue) is a one-off request to swap a single shift. |
| 2 | `deelexamens` | artikel / persuasief / educatie | Opinion piece by an ROC teacher: adults in mbo courses beside a job should be allowed to sit their theory exam in parts after each block; arguments (learning in fragments, forgetting, Modibo's story), two counter-arguments acknowledged and rebutted, a call on schools to make deelexamens the default | 550 | 6 | First persuasive text and first educatie text at B1 length; `cursusfonds` and `stageplaats` (catalogue) are short informative messages about money and placement. |
| 3 | `busabonnement` | opzoektekst / instructief / overig | Terms of the subscriptions of Vervoerbedrijf Regio Noord (fictional regional bus and tram company): three subscriptions with monthly prices, travel outside the zone, lost card (block, replace, fee), cancelling and refunds, student and 65+ discounts, customer service hours | 499 | 7 | First look-up text in the bank. `buurtbus` (catalogue) is a news item about a trial bus line; `stadsbus` (A2) is a ticket folder. Neither has subscriptions, zones or a lost-card rule. |

Domain and text-type spread of this batch: werk/beschouwend, educatie/persuasief, overig/instructief. Together with batch 011 (descriptief and the remaining task types) a form can be assembled with each domain twice and each text type at least once.

## 2. Sources of the facts

None of the texts cites a source; all organisations, people, numbers and rules are invented. Real Dutch practice was mirrored deliberately where a learner might meet it outside the exam:

- **Text 1 (ploegendienst).** Forward rotation (ochtend → middag → nacht) is the direction that Dutch occupational-health advice on shift work recommends, and the reason given in the text (the body adapts more easily to a later than to an earlier start) is the usual explanation. "Minstens elf uur rust tussen twee diensten" mirrors the daily rest of the Arbeidstijdenwet (11 hours per 24, which may be shortened to 8 once a week; the text states the plain rule as company policy and does not mention the exception). At most three nights in a row, a short nap during the night break, light meals at night, fewer nights for older workers and a roster published weeks ahead are common recommendations and cao provisions, here presented as one company's choices. The shift times (6.00–14.00, 14.00–22.00, 22.00–6.00), the four days off, the 48-hour rule, the roster app and the three-month trial are invented. Register: the interviewer uses neutral third person; Farah speaks in the informal `je` of a personeelsblad.
- **Text 2 (deelexamens).** The opinion is fictional and is not the position of any real body. The setting mirrors adult mbo courses that run one evening a week; the examencommissie exists at every mbo school; "de praktijktoets aan het einde van de opleiding" stands for the proeve van bekwaamheid without using the term. In reality mbo examination is organised per kerntaak and the split between theory and practice varies per school, so the text speaks of "veel opleidingen voor volwassenen" and "sommige opleidingen" rather than claiming a national rule. The drop-out claim is stated vaguely on purpose ("een flink deel van hen") so that no invented statistic is presented as fact. Modibo's course, the two points and the six-month wait are invented.
- **Text 3 (busabonnement).** The structure mirrors real regional public-transport subscriptions: zones, a daluren product valid from 9.00 on weekdays and all day at weekends, check-in with saldo for travel outside the subscription area, blocking a lost card through an online account, a replacement fee, cancellation before a cut-off day in the month, refunds only on prepaid periods, student and senior discounts, a phone line with weekday and Saturday hours. Every figure is invented: 64,00 / 96,00 / 52,00 euro per month, eleven months for a prepaid year, 12,50 euro for a new card, five working days, the 20th as cut-off, 15,00 euro administration costs, 25% and 40%, 088 234 56 78, the hours. "Mijn Regio Noord" is an invented account name, not a URL. "Vervoerbedrijf Regio Noord" is generic; no real operator carries that name.

Names: Farah, Julio, Modibo, Jari, Karim, Roos, Fatima, Sem, mevrouw Bakker are all from the blueprint cast (section 8 and `config/illustration.json`). Surnames (Benali, Postma) are invented. Roles are mixed: the planner is a woman, the teacher-writer a man, the 66-year-old commuter a woman who still works.

## 3. Level control (B1)

Figures computed on prose sentences only (title, subheadings and the interviewer's unpunctuated headings excluded; the interviewer's questions with punctuation are counted). Sentences split on `.`, `!`, `?` followed by whitespace; words on whitespace, as the checker does.

| Text | Words | Prose sentences | Average | Longest | Longest sentence |
| --- | ---: | ---: | ---: | ---: | --- |
| ploegendienst | 578 | 43 | 13.3 | 27 | the list of three shift times; the three-rule sentence is also 27 |
| deelexamens | 550 | 38 | 13.8 | 24 | "De meeste opleidingen geven nu al na elk blok een toets in de les; die toetsen hoeven alleen nog een officiële status te krijgen." |
| busabonnement | 499 | 33 | 14.1 | 24 | the Dalurenabonnement line; the zone-fare sentence in section 2 is also 24 |

All three texts sit in the 12–18 band with no sentence over 30. Word counts are inside the brief's per-text ranges (500–600, 450–550, 400–500) and the blueprint's 400–700.

B1 features in use: passives ("wordt bekendgemaakt", "wordt getoetst", "kan in delen worden getoetst", "wordt afgeschreven", "worden niet vergoed", "wordt automatisch overgezet"); conditionals ("als het echt niet anders kan", "Wie merkt dat het niet gaat", "Zegt u later op, dan …", "Reist u … vóór 9.00 uur? Dan …", "Hebt u een jaar vooruitbetaald?"); relative clauses ("een rustruimte waar je …", "een collega die dezelfde machines mag bedienen", "de uren die overblijven", "cursisten die afhaken", "de volle maanden die nog niet begonnen zijn"); signal words in normal use: daarom (2), omdat (3), want (2), terwijl (2), sinds, hoewel ("Hoewel het eerste argument sterk klinkt, klopt het niet"), bovendien, verder (2), toch, anders as a connector once ("Anders verliezen we …"), uiteindelijk (2), dus; "ondanks" and "ten slotte" do not occur because no sentence called for them. Paraphrase between prompt and text is listed per question below. No rare word is the only obstacle: "voorwaarts draaien" is explained by the previous sentence, "toeslag" by "is dan lager", "herkansing" and "examencommissie" by context, "daluren" by the times in the same sentence.

## 4. Questions: keys, operations and distractor rationales

Skill spread over 19 questions: detail 5, rule-application 4, purpose 3, inference 3, opinion 1, summary 1, quantity 1, time-place 1. Every text ends with the purpose question; every text has at least one opinion or inference item; texts 1 and 2 each have at least two detail items whose evidence is a passage of three or four sentences rather than one sentence.

### Item 1 — ploegendienst (keys A C B C A B)

- **q1 detail, key A** "Het lichaam past zich makkelijker aan als een dienst later begint." Operation: find the reason for the change of rotation; the prompt ("volgorde van de diensten veranderd") paraphrases "draaiden we precies de andere kant op / voorwaarts draaien". Evidence spans three sentences. B "Medewerkers wilden hun vrije dagen liever achter elkaar" — the four free days are in the same paragraph but are part of the pattern, not the reason. C "In de nachtploeg meldden te veel mensen zich ziek" — reverses cause and effect: fewer sick reports are the result of the change.
- **q2 detail, key C** "Een medewerker draait hoogstens drie nachten op rij" (paraphrase of "niemand meer dan drie nachten achter elkaar"). Operation: pick the measure that the paragraph actually states among three that it touches. A "Nachtwerkers krijgen een langere pauze dan collega's overdag" — the text says the break is equally long; only the nap room is new. B "Medewerkers boven de 55 werken niet meer in de nacht" — overgeneralisation: they may ask for fewer nights.
- **q3 opinion, key B** "Die is voor ouders lastiger dan de nachtdienst." Operation: Farah's stated view against the common view ("Veel mensen denken … Volgens mij …"). A "het makkelijkst te combineren met school" — reversal of her point about school hours. C "de meeste problemen met slapen" — belongs to the night shift.
- **q4 rule-application, key C** "Nee, want Julio zou te weinig rust tussen de diensten hebben." Operation: apply the eleven-hour rule to the shift times given earlier in the text (middagdienst ends 22.00, ochtenddienst starts 6.00: eight hours). The case states it is Friday, so the 48-hour rule is satisfied and A "Ja, want de ruil wordt ruim op tijd doorgegeven" applies the wrong rule. B "Nee, want de collega werkt in een andere ploeg" — misreads "in welke ploeg die collega zit, maakt niet uit".
- **q5 inference, key A** "Om te laten zien dat collega's het onderling beter oplossen dan zij." Operation: function of a contrast (vroeger/nu) in an argument. B "Om uit te leggen waarom er nu strenge regels voor ruilen zijn" — the rules follow in the same answer but are not linked to the story. C "Om duidelijk te maken dat zij vroeger te veel werk had" — "via mijn bureau" invites it, but she speaks of dissatisfaction and complaints, not of workload.
- **q6 purpose, key B** "De lezer informeren over hoe een planner ploegendienst ervaart en regelt." Beschouwend: the text presents one person's experience and opinions without arguing for a change. A "waarschuwen voor de gevolgen van nachtwerk" — sleep is discussed, but as something the company manages, not as a warning. C "overtuigen dat diensten ruilen via een app het beste werkt" — the app is one of five topics and Farah's preference is reported, not argued to the reader.

### Item 2 — deelexamens (keys C A B A C B)

- **q1 detail, key C** "De stof wordt getoetst voordat cursisten die weer vergeten zijn." Operation: reason in the "Leren in stukjes" paragraph, evidence four sentences; prompt "passen beter bij" paraphrases "toetst de stof terwijl die nog vers is". A "minder lesuren en dus minder stof per examen" — built on "één avond per week", which the text mentions but never uses as a reason. B "zelf het moment kiezen" — nothing in the text; the only choice offered (in the last paragraph) is between one exam and parts.
- **q2 inference, key A** "Door één slecht examen kan een goede cursist toch afhaken." Operation: function of an example ("zijn verhaal laat precies zien wat ik bedoel"). B "Herkansingen moeten sneller … worden aangeboden" — the six-month wait is a detail of the story, not its point; the writer never proposes faster resits. C "bereiden zich vaak te weinig voor" — reversal: Modibo studied every evening.
- **q3 detail, key B** "Bij de stage en de praktijktoets blijkt al of iemand alles kan combineren." Operation: locate the rebuttal of the first objection; prompt "bezwaar … onjuist" paraphrases "Hoewel het eerste argument sterk klinkt, klopt het niet". A "hoeft zelden alle kennis tegelijk te gebruiken" — the writer accepts that a monteur must combine everything; he disputes where that is tested. C "De examencommissie controleert …" — the examencommissie appears in the second objection and in the last paragraph, never as a check on coherence.
- **q4 summary, key A** "De toetsing moet aansluiten bij hoe volwassenen naast hun werk leren" (paraphrase of the closing thesis). B "minder vaak aan een mbo-opleiding beginnen" — anchored in the opening and in "een flink deel stopt", but the writer wants fewer drop-outs, not fewer starters. C "Docenten moeten meer tijd krijgen voor het nakijken" — the workload objection, which the writer rejects.
- **q5 detail, key C** "Deelexamens voor iedereen aanbieden en het eindexamen als keuze houden." Operation: the proposal in the last paragraph, evidence three sentences. A "Het eindexamen afschaffen" — overgeneralisation; the single exam stays as a choice. B "alleen toestaan na een verzoek aan de examencommissie" — the current situation that the writer wants reversed ("Dat moet andersom").
- **q6 purpose, key B** "De lezer overtuigen dat volwassenen examen in delen moeten kunnen doen." Persuasief: thesis, arguments, counter-arguments rebutted, call to action. A "informeren over de manier waarop volwassenen leren" — an argument, not the purpose. C "waarschuwen voor het grote aantal cursisten dat stopt" — also an argument; the text is not a warning.

### Item 3 — busabonnement (keys B C A C B A C)

All six content questions are persona questions answered by scanning the relevant subheading.

- **q1 quantity, key B** "76,50 euro": the replacement fee (section 3: 12,50 euro, collected with the next monthly amount) plus the Stadsabonnement price (section 1: 64,00 euro). Two figures from two sections. A "64,00 euro" forgets the card. C "108,50 euro" adds the fee to the Regioabonnement price. The `evidence` field holds the fee sentences; the 64,00 euro comes from the subscription list and is named in the explanation (an evidence quote cannot span two sections).
- **q2 rule-application, key C** "De hele rit tegen het gewone tarief." Operation: apply the daluren rule (weekday, boarding before 9.00) to a ride that crosses 9.00; the text closes the loophole explicitly ("ook het deel na 9.00 uur"). A "Niets, want het abonnement geldt in alle zones" — true about zones, irrelevant to the time rule. B "Alleen het deel van de rit vóór 9.00 uur" — borrows the "deel van de reis" logic of the zone rule.
- **q3 inference, key A** "Anders kan iemand anders met haar abonnement reizen." Operation: draw the consequence of "blijft de kaart geldig, ook in handen van een ander". B "niet binnen vijf werkdagen" — the five days concern delivery of the new card. C "de ritten in de tussentijd zelf betalen" — true whatever she does; not a reason to block quickly.
- **q4 rule-application, key C** "30 juni": cancelling on 24 May is after the 20th, so the subscription runs one more month. A "24 mei" — the day of cancelling. B "31 mei" — the outcome for cancelling on or before the 20th.
- **q5 rule-application, key B** "Nee, de korting geldt alleen voor het Dalurenabonnement." Operation: two rules combined: a subscription valid at 8.00 on weekdays must be the Stads- or Regioabonnement (the daluren product starts at 9.00), and those carry no 65+ discount. A "40% korting op het Stadsabonnement" — right percentage, wrong product. C "als zij elk jaar een bewijs … opstuurt" — the annual proof belongs to the student discount.
- **q6 time-place, key A** "Op zaterdag tussen 9.00 en 13.00 uur." Operation: match Julio's working hours (8.00–18.00 on weekdays) against the phone hours. B "Op werkdagen tussen 18.00 en 19.00 uur" — the servicebalie's closing time, not the phone line's. C "Op zondag …" — closed on Sundays.
- **q7 purpose, key C** "De lezer uitleggen welke regels gelden voor een abonnement." Instructief. A "overtuigen dat een Regioabonnement de beste keuze is" — no product is recommended. B "waarschuwen voor de kosten van een verloren kaart" — one section of six.

## 5. Key balance

| Key | Count | Share |
| --- | ---: | ---: |
| A | 6 | 32% |
| B | 6 | 32% |
| C | 7 | 37% |

No letter above 40% or below 20%. Sequence over the batch: A C B C A B / C A B A C B / B C A C B A C; no key three times in a row. Purpose keys sit at B, B and C. Option lengths within a question differ by at most a few words; the two persona questions with amounts and dates have identical two-word options.

## 6. Checker result

`npm run batch:check content/batches/010-original.json`:

```
Checked 3 items, 19 questions. Keys: {"A":6,"C":7,"B":6}. Options: {"3":19}.
No failures, no warnings.
```

The brief mentions a possible warning about purpose-question counts calibrated for A2; it did not fire, because that warning applies only to batches that consist entirely of A2 items. One purpose question per text is present as B1 requires.

## 7. Things the reviewer should look at

- **Look-up text and the per-text requirements.** The brief asks every text for an opinion/inference item and for two detail items with paragraph-level evidence, and asks the look-up text for persona questions answered by scanning. Text 3 follows the look-up paragraph: no `detail` items, one mild `inference` item (q3, the consequence of "blijft de kaart geldig, ook in handen van een ander"). If the reviewer prefers a pure scanning set, q3 can be relabelled `detail` without changing the item.
- **Item 1 q6.** The key uses "informeren over hoe een planner ploegendienst ervaart en regelt" to express the beschouwend text type; confirm that this is the wording the coordinator wants for beschouwend keys across the form (the alternative "De lezer laten zien hoe … denkt over …" was considered).
- **Item 1 q4.** The case is written as a swap ("wil ruilen") so that Farah's three rules apply, and it states "Het is vrijdag" so that the 48-hour rule is satisfied and only the rest rule bites. Check that the learner is expected to take the shift times from the first answer (two paragraphs earlier); that cross-paragraph step is the intended B1 difficulty.
- **Item 2, realism of the premise.** Mbo examination is organised per kerntaak and differs per school; the text limits its claim to "veel opleidingen voor volwassenen" and a theory exam. A reviewer with mbo knowledge may want a softer phrasing.
- **Item 3 q1 evidence** covers only the fee sentences; the monthly price is in section 1. This is inherent to a two-figure quantity item and is stated in the explanation.
- **Item 3 q5.** The prompt fixes the travel time ("op werkdagen om 8.00 uur") so that the daluren product is excluded and the answer "Nee" is unique; without that clause "Ja, op het Dalurenabonnement" would be defensible.
- **Dates.** Text 3 says the terms apply from 1 January 2027; the cancelling example uses 24 May without a year (24 May 2027 is a Monday; nothing in the rule depends on the weekday).
- Level is an unvalidated authoring target (`targetLevelValidated: false`); `content/exemplars/` does not exist yet, so no exemplar comparison was possible.

## 8. Limitations

Original practice material with unvalidated difficulty labels. No claim of official approval, scoring or exam equivalence. The items have not been reviewed; `status` stays `draft` until the batch passes editorial review and the hash gate.

## Coordinator revision after the editorial review (10 September 2026)

Applied from `content/reviews/010-review.md` (the reviewer's verified scratch copy, plus the q6 option A lengthening it suggested with the article change): ploegendienst — the rotation sentence now reads "…en dan een korte nachtweek van drie nachten." so it agrees with the three-nights maximum that keys q2; the q1 evidence sentence now reads "…omdat het lichaam makkelijker went aan later naar bed gaan dan aan eerder naar bed gaan." with q1 evidence and explanation updated; q1 B/C, q4 A/B and q5 C reworded so the key is no longer the longest option; q6 key with the article and option A lengthened to match. deelexamens — q4 B/C, q5 A and q6 A/C lengthened so the key is not the longest option in the last three questions; Modibo is 29 (cast: young man); "kwam hij twee punten tekort". busabonnement — q5 C now "Nee, korting is er alleen voor wie een jaar vooruitbetaalt." (anchored, removes the lone "Nee"). Keys unchanged: A 6 / B 6 / C 7.

### Distractor rationales after the revision (supersede the lines above where they quote the old wordings)

- busabonnement q5 C "Nee, korting is er alleen voor wie een jaar vooruitbetaalt.": anchored in "U kunt ook een jaar vooruitbetalen" (eleven months for the price of twelve), clearly false because the discounts are for students and 65-plussers with a Dalurenabonnement; the explanation now says so. The earlier C ("een bewijs van haar leeftijd") is retired.
- ploegendienst q1 B "Medewerkers wilden hun vrije dagen liever achter elkaar hebben." and C "In de nachtploeg meldden te veel medewerkers zich elke week ziek.": anchored in the four free days and the ziekmeldingen sentence, reversed or overgeneralised; q4 A quotes the 48-hour rule (the rest rule still fails), B the other-team rule (no longer a bar after the reform); q5 C "…dat het ruilen haar vroeger te veel werk kostte" is the planner's own past, not the point of the example.
- deelexamens q4 B/C, q5 A, q6 A/C were lengthened so the key is not the longest option; anchors unchanged ("naast hun baan", "de kosten van herkansingen … docenten en examencommissies", "het grote eindexamen", "een flink deel van hen").

## Coordinator revision after the level check (10 September 2026)

ploegendienst q4: the prompt admitted a second reading of "ruilen" (giving Monday's middagdienst away), under which option A became true. The prompt now states the exchange explicitly ("Julio draait volgende week middagdiensten … Julio neemt dinsdag de ochtenddienst van die collega over, en de collega neemt Julio's middagdienst van dinsdag."), so only the rest rule bites; key, evidence and explanation unchanged.
