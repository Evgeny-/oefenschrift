# Batch 011: design notes

Three original B1 reading texts (`exam: nt2-i`, `part: reading`) written against `content/blueprint.md` sections 1, 3, 4.6, 5, 8, 9, 10 and the batch brief. Nineteen closed questions in total (6 + 7 + 6), three options each, one purpose question last per text. Every text is invented; the official Lezen I items were used for shape only (situation line, 400–700 words, five to seven questions, the closing "Wat is het doel van deze tekst?", opinion and inference prompts, persona rule questions). No text, question or option is copied or paraphrased from an official item. The sibling batch 010 (shift-work interview, deelexamens opinion piece, public-transport subscription look-up) covers other subjects.

Source file: `content/batches/011-original.json`. Checker: `npm run batch:check content/batches/011-original.json` — no failures, no warnings (section 7).

## 1. Batch matrix and scenarios

| # | Slot (taskType / textType / domain) | Slug | Scenario | Words | Q | Why it is not a duplicate |
| --- | --- | --- | --- | ---: | ---: | --- |
| 1 | website / descriptief / educatie | `deeltijdopleiding` | Information page of the fictional ROC Westerhout: how an adult chooses and starts a part-time mbo course — intake talk, level test, EVC, study load per week, costs, employer paying, start dates | 503 | 6 | The catalogue's education items are about a course subsidy (`cursusfonds`), choosing a stage placement (`stage`) and extra lessons (`praktijkles`, A2); none describes the admission route to a deeltijdopleiding. Blueprint §9 lists "a course choice" as needed. |
| 2 | voorwaarden / instructief / werk | `verlofregeling` | Sick-leave and leave regulation of the fictional Transportbedrijf Noordhaven: reporting sick (by when, to whom, what to say), reachability in the first two days, the bedrijfsarts, pay and holiday accrual during illness, applying for leave (six/two weeks ahead, team leader decides, silence after two weeks is approval, no leave in weeks 47–52, three weeks maximum), special leave (funeral, moving, wedding) | 550 | 7 | First employer regulation in the bank; the A2 items on work are a clothing letter, a job ad, a canteen order and a contract e-mail. Blueprint §9 lists "sick leave" as needed. Batch 004 avoided the official sick-call setting; this text is a full regulation with computed persona cases, not a notice. |
| 3 | nieuwsbericht / beschouwend / overig | `huisartsenpost-drukte` | Regional news feature: why the huisartsenpost in the fictional region Westerhout is overloaded (closed practices, ageing, four in ten non-urgent calls), what is tried (triage line, physician assistant, "Kan het tot morgen wachten?" campaign), a huisarts and a patient with different views | 551 | 6 | The catalogue has a KNM fact card about what the huisartsenpost is (`A2:knm:batch006-huisartsenpost`) and an A2 letter about a rescheduled huisarts appointment; neither is a considered piece about overload with quoted opinions. Slug chosen with a suffix so it does not repeat the KNM slug. |

Domains: educatie, werk, overig — one each. Text types: descriptief, instructief, beschouwend (the sibling batch carries persuasief and a look-up text). Task types: website, voorwaarden, nieuwsbericht.

## 2. Sources of the facts

None of the texts cites a source; all organisations, figures and people are fictional and plausible for the Netherlands in 2026. Real rules deliberately mirrored so that the practice text does not teach something false:

- **Text 1 (ROC page):** intake talks and a Nederlands/rekenen level test are common ROC practice for adult entrants; EVC ("erkenning van verworven competenties") is a real instrument that gives vrijstellingen on the basis of a portfolio and an assessor's talk; deeltijd/bbl courses pay cursusgeld (a few hundred euros a year, invented here as 760 euro) rather than the full-time lesgeld, employers often pay under a leerovereenkomst, and instalment payment exists. Starts in September and February are common. The EVC price (550 euro) and duration (four months) are invented.
- **Text 2 (regulation):** the employer may not ask what the illness is, and medical details stay with the bedrijfsarts, who only advises (privacy rules for sick employees); full accrual of vakantiedagen during illness (since 2012); taking holiday during illness requires agreement and is deducted from the saldo; 70 percent is the legal minimum sick pay and 100 percent in the first year is common by CAO; a leave request counts as granted when the employer does not object within two weeks (art. 7:638 BW). The reporting times, reachability window, six-/two-week request terms, weeks 47–52 block, three-week maximum and the special-leave amounts are typical CAO-style rules, invented for this company. Week numbers were checked: weeks 47–52 run from mid/late November to the end of December in both 2026 and 2027, which is the Sinterklaas–Christmas peak the intro describes.
- **Text 3 (news feature):** the pattern (more calls, fewer huisartsen, a large share of non-urgent calls, triage by a verpleegkundige, physician assistants on the post, information campaigns about what counts as spoed) follows public reporting about huisartsenposten; all numbers (30 percent, four in ten, 25 → 14 minutes, twelve years, fifty minutes) are invented. "Huisartsenpost" is a real institution type, allowed by blueprint §8; Westerhout is the fictional town already used in batch 004.

## 3. Names, register and cast

- Personas in prompts are from the cast: Sabrina (1 q3), Modibo (2 q1), Hasan (2 q4), Fatima (2 q6), Ricardo (3, quoted patient). Invented others: huisarts Anke de Groot (3), an unnamed mother (3). Roles are mixed: the huisarts is a woman, the patient a man, the warehouse worker a man, the persona with EVC experience a woman.
- Organisations: ROC Westerhout, Transportbedrijf Noordhaven, Huisartsenpost Westerhout — all invented. No addresses, URLs, phone numbers or brand names appear.
- Register: text 1 addresses the reader with `u` as an institution; text 2 is a formal regulation in `u`; text 3 is neutral third person with two direct quotes.

## 4. Level control (B1)

Prose sentences only (subheadings and numbered section titles excluded):

| Text | Words | Sentences | Average length | Longest |
| --- | ---: | ---: | ---: | ---: |
| deeltijdopleiding | 503 | 34 | 14.2 | 24 |
| verlofregeling | 550 | 34 | 15.4 | 26 |
| huisartsenpost-drukte | 551 | 35 | 15.2 | 29 |

All within the blueprint band (average 12–18, none over 30). Features in use: passives ("wordt thuis op de computer gemaakt", "wordt geen vakantie verleend"), conditionals with inversion ("Bent u ziek, dan …", "Betaalt u zelf, dan …"), relative clauses ("een zorgverlener die … behandelt"), signal words (daarom, daarnaast, wel, zolang, terwijl, toch, ten slotte, zodat, omdat). Less common terms are explained in context: EVC ("een erkenning van wat u in de praktijk al hebt geleerd"), vrijstelling (through "onderdelen die u al beheerst"), physician assistant (apposition), triagelijn (described in the next sentence). Difficulty comes from combining information: a rule and its exception (2 q1), two figures (1 q4, 2 q6), a date and a term (2 q4), an example and the claim it supports (3 q2), two speakers' positions (3 q3, q5).

## 5. Questions: skills, keys and distractor rationales

Skill spread over 19 questions: detail 6, rule-application 3, inference 3, purpose 3, quantity 2, opinion 2. Every text has at least one opinion or inference item and two detail items whose evidence is a two-sentence span within a paragraph; every text ends with the purpose question and its key matches the text type.

### Item 1 — deeltijdopleiding (keys B A C C A B)

- q1 (detail, key B "Niemand valt af, maar de adviseur kan een ander niveau voorstellen"; operation: combine two sentences of the intake paragraph, paraphrase "afgewezen" → "valt af", "aanraden" → "voorstellen"). A "De adviseur beslist na het gesprek welke module de kandidaat eerst volgt" — the module follows from the level test, not from the talk. C "Alleen kandidaten met genoeg werkervaring worden tot de opleiding toegelaten" — reverses "niemand wordt … afgewezen".
- q2 (detail, key A "Om te zien of iemand eerst nog een extra module moet volgen"; operation: negative-then-positive pair of sentences, "uitslag" for "resultaat"). B "Om te beslissen of iemand op niveau 3 of 4 mag beginnen" — the test is taken by level 3/4 applicants but "bepaalt niet of u wordt toegelaten"; the level is discussed in the intake. C "Om vast te stellen hoeveel lesavonden iemand per week krijgt" — every student has one lesson evening; taken from the study-load paragraph.
- q3 (rule-application, key C "Een vrijstelling vragen voor wat zij al kan"; operation: match the persona's situation — years of work, no diploma — to the EVC paragraph). A "De extra module Nederlands en rekenen overslaan" — the module depends on the test, not on experience. B "Het intakegesprek vervangen door een gesprek met een beoordelaar" — the assessor talk is part of EVC and comes on top of the intake, not instead of it.
- q4 (quantity, key C "Ongeveer elf tot dertien uur"; operation: add the three-hour evening to the eight to ten hours of homework). A "Ongeveer drie uur" — the lesson only. B "Ongeveer acht tot tien uur" — the homework only.
- q5 (inference, key A "Voor volwassenen die naast hun baan een opleiding willen volgen"; operation: infer the audience from the address form, the evening lessons, the workplace practice and the employer paragraph). B "Voor jongeren die na de middelbare school een opleiding kiezen" — contradicts "kunnen niet vijf dagen per week naar school" and the evening format. C "Voor werkgevers die een medewerker willen laten studeren" — employers are discussed as payers but never addressed.
- q6 (purpose, key B "De lezer informeren over de stappen naar een deeltijdopleiding" — descriptief). A "overtuigen dat een deeltijdopleiding beter is dan een voltijdopleiding" — no comparison is made. C "waarschuwen voor de kosten" — the costs are given as information with ways to pay.

### Item 2 — verlofregeling (keys C A B A B C A)

- q1 (rule-application, key C "Vóór 6.00 uur zijn teamleider bellen"; operation: choose the exception rule for early shifts and compute 7.00 minus one hour). A "Vóór 8.30 uur zijn teamleider bellen" — the general rule, which the early-shift rule overrides. B "Vóór 7.00 uur een bericht sturen via de app" — right idea of "before the shift", wrong channel: the app does not count as a ziekmelding.
- q2 (detail, key A "Hoe lang hij denkt thuis te blijven en waar hij bereikbaar is"; operation: read the list of what to report and the sentence that excludes the illness itself). B "Welke klachten hij heeft en welke medicijnen hij daarvoor gebruikt" — reversed: "U hoeft niet te vertellen wat u mankeert". C "Welke collega zijn werk overneemt en op welke dag hij terugkomt" — the employee reports which work needs taking over, not who; the return is reported later, when he is better.
- q3 (detail, key B "Alleen een advies over welk werk mogelijk is"; operation: two sentences of the bedrijfsarts section, "werkgever" for "het bedrijf", "ontvangt" for "krijgt"). A "De medische gegevens van de medewerker" — reversed: those stay with the bedrijfsarts. C "Hoe lang de medewerker nog thuis moet blijven" — the expected duration is what the employee gives at the sick call, not what the doctor reports.
- q4 (rule-application, key A "Zijn vakantie is goedgekeurd"; operation: apply the two-week silence rule to 3 March → 17 March; also check that three weeks in July satisfies the six-week term and the three-week maximum). B "Hij moet de aanvraag opnieuw indienen" — nothing in the text asks for a second request. C "Zijn aanvraag is afgewezen vanwege de bezetting" — the bezetting is what the team leader weighs when deciding; without an answer there is no refusal.
- q5 (inference, key B "Omdat het bedrijf dan veel meer werk heeft dan anders"; operation: link the rule in section 5 to the reason given in the intro, weeks 47–52 = the weeks before Sinterklaas and Kerst). A "Omdat aanvragen voor die weken te laat worden ingediend" — anchored in the six-week term, not a reason for the block. C "Omdat een aaneengesloten vakantie maximaal drie weken duurt" — another rule from the same section, unrelated to the block.
- q6 (quantity, key C "Twee dagen"; operation: add the one moving day to the one funeral day for a grandparent). A "Eén dag" — counts only one of the two events. B "Vijf dagen" — applies the four-day rule for a partner, child or parent to a grandparent and adds the moving day.
- q7 (purpose, key A "De lezer uitleggen wat hij moet doen bij ziekte en verlof" — instructief). B "overtuigen dat hij zich minder vaak ziek moet melden" — nowhere asked. C "waarschuwen voor de drukte in de weken voor Kerst" — the peak is the reason for one rule, not the purpose of the regulation.

### Item 3 — huisartsenpost-drukte (keys B C A C B C)

- q1 (detail, key B "Er zijn minder artsen en meer bellers met klachten die kunnen wachten"; operation: combine two causes from the causes paragraph). A "De post is sinds kort ook overdag open voor spoed" — reverses the closing advice (own huisarts by day, post only when it cannot wait) and borrows "sinds maart". C "De inwoners van de regio zijn vaker ernstig ziek dan vroeger" — overgeneralises "de inwoners worden gemiddeld ouder".
- q2 (inference, key C "Dat mensen niet uit gemak bellen, maar omdat ze overdag geen huisarts kunnen bereiken"; operation: function of the writer's example after "weinig mensen … die de regels bewust negeren"). A "Dat ouders veel te snel bellen als hun kind een paar dagen hoest" — the blame reading the example argues against ("geen keuze"). B "Dat de post op zaterdagavond veel drukker is dan op andere avonden" — a detail from the lead, not the point of the example.
- q3 (opinion, key A "De lijn helpt, maar lost het echte probleem niet op"; operation: the huisarts's stance: "blij met de triagelijn, maar ziet die niet als de oplossing", the real solution "ligt overdag"). B "De lijn maakt het voor patiënten moeilijker om een arts te spreken" — contradicts "sneller de juiste mensen spreken". C "De lijn zorgt ervoor dat er 's avonds minder mensen bellen" — she says the opposite: people keep calling in the evening as long as daytime access fails.
- q4 (detail, key C "Kleine klachten zelf behandelen, zodat de artsen tijd hebben voor zware gevallen"; operation: two sentences on the physician assistant, paraphrase "eenvoudige klachten" → "kleine klachten", "patiënten die echt een arts nodig hebben" → "zware gevallen"). A "De telefoon opnemen en beoordelen hoe dringend een klacht is" — the triage verpleegkundige's job. B "Folders maken over klachten die wel en geen spoed zijn" — the campaign.
- q5 (opinion, key B "Hij vindt het begrijpelijk, omdat je zelf niet weet wat ernstig is"; operation: Ricardo's stance from "Toch heeft hij begrip …" and his quote). A "Hij vindt dat zij beter eerst de folder kunnen lezen" — he calls the folder "prima" but asks for someone to pick up, not for people to read first. C "Hij vindt dat zij de wachttijd voor anderen te lang maken" — anchored in his own fifty-minute wait, but he does not blame the small-complaint callers.
- q6 (purpose, key C "De lezer informeren over de drukte op de post en de aanpak daarvan" — beschouwend). A "overtuigen dat de huisartsenpost alleen bedoeld is voor spoedgevallen" — that is the campaign's message and the huisarts's view, reported, not argued by the writer. B "waarschuwen voor de lange wachttijden op de post in het weekend" — the waiting times are the problem described, and they have already fallen.

## 6. Key balance

| Key | Count | Share |
| --- | ---: | ---: |
| A | 6 | 32% |
| B | 6 | 32% |
| C | 7 | 37% |

Key sequence across the batch: B A C C A B | C A B A B C A | B C A C B C — no letter above 40%, none below 20%, never the same key three times in a row. The purpose keys sit on B, A and C. All 19 questions have three options, as Lezen I does. Option lengths within a question differ by at most a few words (checker length-spread warning did not fire). The key is the longest option by one or two words in three questions (2 q2, 3 q2, 3 q4) and the shortest in two (1 q3, 2 q4), so length does not point to the key across the batch.

## 7. Checker result

```
> batch:check
> tsx scripts/batch-check.ts content/batches/011-original.json

Checked 3 items, 19 questions. Keys: {"B":6,"A":6,"C":7}. Options: {"3":19}.
No failures, no warnings.
```

The A2-calibrated purpose-question warning mentioned in the brief did not appear: the checker only emits it for batches consisting entirely of A2 items. A first run warned that the slug `huisartsenpost` already existed in the catalogue (the KNM card `A2:knm:batch006-huisartsenpost:1`, a different part, so the blueprint's within-part rule was not broken); the slug was changed to `huisartsenpost-drukte` to keep slugs unique across the bank.

## 8. Things the reviewer should look at

- **Text 2 has seven questions**, not six as the coordinator's brief said per text. With six it is impossible to satisfy all the brief's per-text minimums at once (two paragraph-level detail, at least one opinion/inference, two rule-application, one quantity, purpose). Seven is within the official 5–7 band. If six is required, drop q3 (detail, bedrijfsarts) — keys then become C A A B C A, still balanced — or q5 (inference), and re-run the checker.
- **Text 2 q5 (inference):** section 5 names the weeks 47–52 "de weken vóór Sinterklaas en Kerst", so the link to the intro is explicit and the item may read as detail rather than inference. Removing the apposition would force the reader to know that weeks 47–52 fall in late November and December, which felt unfair; the reviewer may prefer either version.
- **Text 2 q1:** the persona case needs the early-shift exception ("Begint uw dienst vóór 8.30 uur, dan … uiterlijk een uur vóór het begin van uw dienst") and a subtraction; confirm that the two sentences read unambiguously together.
- **Text 1 q5 (inference):** the opening sentence ("Veel volwassenen willen een diploma halen, maar kunnen niet vijf dagen per week naar school") makes the audience fairly explicit; the item still asks the reader to integrate the whole page, but a stricter reviewer may want the opening reworded.
- **Text 3 q1, distractor A** ("De post is sinds kort ook overdag open voor spoed") is anchored only by reversal of the closing advice; check that it is a plausible misreading and not too obviously wrong.
- **Text 3** uses the English term "physician assistant" as Dutch care does; it is explained in apposition, and the exam allows a dictionary. "Een snee in zijn hand die gehecht moest worden" was chosen as a mild, typical huisartsenpost complaint; say so if it should be milder still.
- **Fictional rules that mirror real law** (text 2: no obligation to name the illness, medical data stay with the bedrijfsarts, accrual during illness, silence-is-approval after two weeks, 100/70 percent pay) were kept legally correct on purpose; if the reviewer wants the text further from real law to avoid any KNM-like reading, the numbers can change without touching the questions except q4 and q6.
- Level: authoring target only (`targetLevelValidated: false`); `content/exemplars/` does not exist yet, so no exemplar comparison was possible.

## 9. Limitations

Original practice material with unvalidated difficulty labels. No claim of official approval, scoring or exam equivalence. The items have not been reviewed yet; `status` stays `draft` until the batch passes editorial review and the hash gate.

## Coordinator revision after the editorial review (10 September 2026)

Applied from `content/reviews/011-review.md`: huisartsenpost-drukte q2 key shortened to "Dat mensen bellen omdat ze overdag hun huisarts niet kunnen bereiken." and q4 distractors given the key's consequence-clause shape (required); q1 option A re-anchored in the "regels bewust negeren" sentence with the explanation updated, q5 option A lengthened, and the q5 evidence quote extended to the closing quotation mark (recommended); verlofregeling q4 B/C re-anchored ("Hij moet zijn teamleider om een beslissing vragen." / "Zijn vakantie is afgewezen vanwege de bezetting."). Keys unchanged: A 6 / B 6 / C 7.

### Distractor rationales after the revision (supersede the lines above where they quote the old wordings)

- huisartsenpost-drukte q1 A "Steeds meer bellers negeren bewust de regels van de huisartsenpost.": a reversal of "Volgens de post zitten daar maar weinig mensen tussen die de regels bewust negeren."; the text denies deliberate misuse and never says it grows.
- huisartsenpost-drukte q2 key C "Dat mensen bellen omdat ze overdag hun huisarts niet kunnen bereiken.": the point of the example, "geen keuze, maar de enige deur die nog openstond"; A keeps the blame reading the example refutes, B the lead's Saturday detail.
- huisartsenpost-drukte q4 A "De telefoon opnemen en inschatten hoe dringend een klacht is, zodat spoedgevallen voorgaan.": the triage nurse's job ("inschat hoe dringend de klacht is"), not the physician assistant's; B "Folders maken over wat wel en geen spoed is, zodat mensen minder vaak bellen.": the campaign's folder.
- huisartsenpost-drukte q5 A "Hij vindt dat zij beter eerst de folder over spoed kunnen lezen.": he calls the folder "prima" but asks that someone answers, not that people read first.
- verlofregeling q4 B "Hij moet zijn teamleider om een beslissing vragen.": "Uw teamleider beslist", but silence within two weeks is approval, so on 20 March nothing is left to ask; C "Zijn vakantie is afgewezen vanwege de bezetting.": the bezetting is weighed in a decision, and without an answer there is no refusal.
