# Batch 020 editorial review

**Verdict:** pass — all nine items pass in the proposed file; eight questions in five items were edited (one of them a reorder only), none rejected.
**Reviewed source:** `content/batches/020-original.json` (SHA-256 `e0086d86abfc4a675c527578a49349c137104184bc5e20ecfc025cbba1a3e2c6`).
**Proposed file:** `content/batches/020-proposed.json` (SHA-256 `b8503e2b188f0665a2d82ff66d23859a6de9fe1090849de05748f24837e379db`) — the bytes to adopt with `npm run batch:adopt 020`.
**Review type:** independent AI editorial review (rubric `content/reviews/rubric.md`; blueprint §1, §3, §4.1, §5, §8–§10, §12–§13; research "Lezen A2"). The reviewer did not write the batch; the author's notes were read after every item had been judged and were used to check the distractor rationales and to answer the doubts.

## 1. Batch checks

| Check | Result |
| --- | --- |
| JSON, ids, evidence, keys | parses; 9 unique ids; all 23 `evidence` quotes verbatim in `text`; every key among its options (verified by script, independently of the checker) |
| Text length 100–250 words | 134–176 (134, 151, 153, 156, 158, 160, 164, 166, 176) |
| Questions per text / options | 5 × 3 Q, 4 × 2 Q = 23; proposed file 13 three-option, 10 four-option (43%) |
| Persona-scenario prompt per text | 9 of 9 (19 of 23 prompts) |
| Purpose questions | 4 (texts 1, 2, 4, 8) — one per two or three texts |
| Task types / domains | brief ×2, email ×2, folder, regels, advertentie, bericht, rooster; instanties ×2, werk ×2, gezondheid ×2, vervoer, winkels-diensten, vrije-tijd-familie |
| A2 heuristics (prose, header and schedule rows excluded) | average 5.9–7.9 words per sentence, longest 16; subordination limited to `als`, `dat`, one relative `die`; question-then-`dan` conditions; one simple past (`kostte`) in the ad, harmless |
| Weekday/date pairs | 31 Aug (Mon), 2 Sep (Wed), 5 Sep (Sat), 16 Oct (Fri), 17 Oct (Sat), 19 Oct (Mon) all hold in 2026 |
| Invented names (web, 10 Sep 2026) | Kwekerij Groenwater, Wasserij De Zilverreiger, VV Reigerhoek, Tandartspraktijk Wilgenhoek: no such firms (nearest hits Kwekerij Groen, VV Reiger Boys, Tandartspraktijk de Weihoek/Woudhoek); "Modibo Doumbia" is a common name with no public figure; Zuidstad and Noorddorp are not stations |
| Facts mirrored | pasfoto ≤ 6 months and collection in person; vakantiegeld 8%; 0,23 euro/km; dental care under 18 in the basisverzekering; huisartsenpost care without eigen risico; online aangifte with DigiD; lost property via the gemeente — all general knowledge, no KNM claim; prices invented and plausible |
| Keys (proposed) | A 7, B 7, C 6, D 3 (30/30/26/13); four-option keys A 3, B 2, C 2, D 3; no letter three times in a row; no key the longest option |
| `status: draft`, `targetLevelValidated: false` | 9 of 9 |

Checker on the proposed file: `Checked 9 items, 23 questions. Keys: {"C":6,"A":7,"D":3,"B":7}. Options: {"3":13,"4":10}. No failures, no warnings.`

## 2. Items

| Id | Verdict | Level | Reason |
| --- | --- | --- | --- |
| `A2:reading:batch020-identiteitskaart:1` | pass (edited) | comparable | Photo-age rule, collection rule and purpose all proven; q1 and q2 both keyed the lone "Nee" among two "Ja" options — q1 given a second "Nee", q2 recast as "Wat moet hij nu doen?" |
| `A2:reading:batch020-loonstrook-uitleg:1` | pass (edited) | comparable (q2 at the harder end) | Nettoloon, the 10th-of-the-month rule with a month step, and purpose proven; purpose key was a verbatim lift of the first sentence, paraphrased |
| `A2:reading:batch020-dienstwissel:1` | pass | comparable | Thursday start in the new rooster and the swap procedure proven; distractors on the old rooster, the e-mail deadline, the phone rule and the overtime rule |
| `A2:reading:batch020-voetbalseizoen:1` | pass (edited) | comparable | Meeting time and purpose proven; q2 had nested options (A, B ⊂ C) and "Alleen" in the key — options rebuilt; q3 options reordered for key spread |
| `A2:reading:batch020-huisartsenpost-folder:1` | pass | comparable | Weekday-daytime rule and call-first rule proven; 112 distractor anchored |
| `A2:reading:batch020-tandartsregels:1` | pass (edited) | comparable (q1 at the harder end) | 24-hour deadline, ten-minute rule and weekend number proven; q1 distractor "Maandag vóór 10.00 uur" satisfied the rule (only "uiterlijk" excluded it) and "13.55" was contrived — replaced by a 2 × 2 day/time grid; q2 prompt word "afspraak" recurred only in the key |
| `A2:reading:batch020-tweedehandsfiets:1` | pass | comparable (easier end) | Viewing slot against working hours and the bundle price proven; 160-euro distractor catches adding the separate prices |
| `A2:reading:batch020-spoorwerk:1` | pass (edited) | comparable | Replacement bus, bicycle rule and purpose proven; q2 keyed the lone "Nee" — fourth option added (2 × Ja, 2 × Nee) |
| `A2:reading:batch020-politiebureau:1` | pass | comparable | Walk-in hours against opening hours and lost property proven; all three distractors in q1 are opening hours that are not walk-in hours |

Level: every text is a 130–180-word practical text whose keys need one fact or two combined details, as in the official A2 texts described in the research paragraph (gemeente and employer letters, a colleague's e-mail, a folder with a list, rules, an ad, a notice, opening hours). None is flagged off-level. Texts 2 and 6 sit at the harder end (a date against a cut-off plus a month step; 24 hours back from an appointment), text 7 at the easier end (short ad, one direct price question). No `content/exemplars/` directory exists yet; the comparison is against the official item types as described, not against stored exemplars.

### Evidence per key (proposed file)

- **identiteitskaart** q1 C: "De foto mag niet ouder zijn dan zes maanden." — ten months > six. A wrong limit (a year); B reverses step 2 ("Laat een pasfoto maken bij een fotograaf"). q2 A: "U haalt de kaart zelf op aan de balie. Een ander mag dat niet voor u doen. Voor het ophalen hoeft u geen afspraak te maken." — B and C are the two negations misread. q3 D: "Uw identiteitskaart is geldig tot 14 februari. … Vraag daarom op tijd een nieuwe kaart aan." — A reads the collection paragraph as the present, B and C are steps and conditions, not the reason.
- **loonstrook-uitleg** q1 B: "Nettoloon: het bedrag dat u op uw rekening krijgt." q2 B: "Doe dit vóór de 10e van de maand. Dan verbeteren wij de fout op de loonstrook van die maand. Mailt u later? Dan ziet u de verbetering pas een maand later." — 12 March is after the 10th, so a month after March. q3 A: "Uw loonstrook komt vanaf januari niet meer op papier." (paraphrased key "Haar loonstrook komt op de website."; the letter's second sentence, "U vindt de loonstrook elke maand op de website voor medewerkers", carries the same fact).
- **dienstwissel** q1 C: "donderdag en vrijdag: avonddienst, 14.00 tot 22.00 uur." q2 C: "Kun je vrijdag niet werken? Ruil dan met een collega. Geef de ruil aan mij door. Stuur mij daarvoor vóór woensdag 12.00 uur een e-mail."
- **voetbalseizoen** q1 A: "Speelt het team uit? Dan verzamelen we om 8.15 uur bij de kantine." q2 D: "Voetbalschoenen en scheenbeschermers koopt u zelf." with the shoes already bought; "Niets meer" fails on "Zonder scheenbeschermers mag een kind niet spelen", the shirt and broekje come from the club. q3 B: "Op zaterdag 5 september begint het seizoen. Hieronder leest u wat u moet weten."
- **huisartsenpost-folder** q1 A: "Overdag belt u uw eigen huisarts. Dat geldt op werkdagen van 8.00 tot 17.00 uur." q2 C: "Bel altijd eerst: 0299 50 50 50. Kom niet zonder afspraak naar de post."
- **tandartsregels** q1 A: "Zeg uw afspraak dan minstens 24 uur van tevoren af." — Tuesday 14.00 minus 24 h = Monday 14.00; Monday 17.00 is 21 h before, Tuesday options are the same day. q2 B: "Bent u meer dan tien minuten te laat? Dan kan de behandeling niet doorgaan. U krijgt dan een nieuwe afspraak." q3 C: "In het weekend belt u de tandarts die dienst heeft: 0299 33 44 00."
- **tweedehandsfiets** q1 A: "Ik ben thuis op dinsdag en donderdag na 18.00 uur, en op zaterdag de hele dag." — Tuesday 19.00 is after 18.00 and after 17.30; Thursday 12.00 and 17.00 are before 18.00; Saturday is not a working day. q2 B: "Koopt u de fiets en het zitje samen? Dan betaalt u 150 euro."
- **spoorwerk** q1 A: "In plaats van de trein rijden er bussen. De bussen vertrekken aan de achterkant van het station, bij bushalte D." q2 C: "Fietsen mogen niet mee in de bus. Een vouwfiets mag wel." — A misapplies the ticket rule, B and D the wheelchair sentence. q3 D: "Er is werk aan het spoor. Daarom rijden er dit weekend geen treinen tussen Westerhout en Zuidstad."
- **politiebureau** q1 B: "Dat kan alleen op dinsdag en donderdag tussen 9.00 en 12.00 uur." — Monday, Thursday evening and Saturday are opening hours but not walk-in hours. q2 B: "Kijk op www.westerhout.nl/gevonden, de website van de gemeente. Daar staan alle gevonden voorwerpen."

## 3. Edits made in the proposed file

Texts, situations, titles and metadata are unchanged; only the fields below differ from the original.

1. `identiteitskaart` q1 `options` → A "Ja, want de foto is nog geen jaar oud." B "Nee, want de gemeente maakt de foto zelf." C "Nee, want de foto is te oud." (key C unchanged); `explanation` → "De pasfoto mag niet ouder zijn dan zes maanden. Een foto van tien maanden geleden is dus te oud, ook al is hij nog geen jaar oud. Modibo laat een nieuwe foto maken bij een fotograaf; de gemeente maakt de foto niet." — Why: the key was the lone "Nee" among two "Ja" options (the odd polarity out), and the dropped "Ja, als hij de foto meeneemt naar de balie" was a non sequitur rather than a misreading; the new B reverses step 2 of the letter.
2. `identiteitskaart` q2 `prompt` → "De nieuwe kaart van Modibo is klaar. Wat moet hij nu doen?"; `options` → A "Zelf de kaart ophalen aan de balie." B "Eerst een afspraak maken." C "Zijn vrouw de kaart laten ophalen."; `answer` A (unchanged letter); `evidence` → "U haalt de kaart zelf op aan de balie. Een ander mag dat niet voor u doen. Voor het ophalen hoeft u geen afspraak te maken."; `explanation` → "Ophalen doet Modibo zelf aan de balie; een ander, dus ook zijn vrouw, mag dat niet voor hem doen. Een afspraak hoort bij het aanvragen van de kaart; voor het ophalen hoeft hij geen afspraak te maken." — Why: second lone-"Nee" key in the same text; the recast question keeps the premise (his wife may not collect) and makes each distractor a misread negation ("hoeft … geen afspraak", "Een ander mag dat niet").
3. `loonstrook-uitleg` q3 `options.A` → "Haar loonstrook komt op de website."; `explanation` → "De brief legt uit dat de loonstrook vanaf januari niet meer op papier komt maar op de website staat, en wat erop staat. Over een fout staat niets in de brief, het vakantiegeld komt gewoon in mei, en het personeelsnummer heeft zij al: zij logt ermee in." — Why: the key repeated the first sentence of the letter almost word for word; a purpose key should paraphrase.
4. `voetbalseizoen` q2 `options` → A "Een shirt en broekje." B "Voetbalschoenen." C "Niets meer." D "Scheenbeschermers." (key D unchanged); `explanation` → "Ouders kopen zelf voetbalschoenen en scheenbeschermers. De voetbalschoenen heeft Karim al, dus hij moet nog scheenbeschermers kopen; zonder scheenbeschermers mag Adam niet spelen. Het shirt en het broekje krijgt elk kind van de club." — Why: "Een shirt" and "Een broekje" were subsets of "Een shirt en een broekje" (blueprint §5: no option a superset of another) and carried one misunderstanding three times; "Alleen" made the key the odd form out. New distractors: the club-provided pair (reversal), the item already bought (ignores the prompt), and "Niets meer" (misses scheenbeschermers in the list).
5. `voetbalseizoen` q3 `options` reordered → A "De eerste training van het seizoen gaat niet door." B "De ouders krijgen informatie over het seizoen." C "De club heeft geen shirts meer voor de kinderen." D "De ouderavond is op een andere dag."; `answer` → B. — Why: spreads the keys of the ten four-option questions (A 3, B 2, C 2, D 3 instead of A 3, B 1, C 3, D 3), as the batch 004 review asked; wording unchanged.
6. `tandartsregels` q1 `options` → A "Maandag vóór 14.00 uur." B "Maandag vóór 17.00 uur." C "Dinsdag vóór 10.00 uur." D "Dinsdag vóór 14.00 uur."; `answer` → A; `explanation` → "Afzeggen moet minstens 24 uur van tevoren. De afspraak is dinsdag om 14.00 uur, dus zij zegt uiterlijk maandag om 14.00 uur af. Maandag om 17.00 uur is minder dan 24 uur van tevoren en dus te laat; dinsdag is de dag van de afspraak zelf, en 10.00 uur is de tijd om te bellen bij pijn." — Why: "Maandag vóór 10.00 uur" satisfies the 24-hour rule and was wrong only through "uiterlijk", making a less common word the sole obstacle; "13.55" is not a moment a reader would derive from the text; the prompt's "14.00" recurred only in the key. Now the key is the only moment that meets the rule, each distractor is too late for a nameable reason (closing time the day before, the pain cut-off, the same day before the appointment), and day and time each appear twice.
7. `tandartsregels` q2 `prompt` → "Meneer De Vries komt twaalf minuten te laat bij de tandarts. Wat gebeurt er?" — Why: "afspraak" was a prompt word that recurred only in the key.
8. `spoorwerk` q2 `options` → adds D "Nee, alleen een rolstoel mag mee." (A–C unchanged, key C unchanged); `explanation` → "Een gewone fiets mag niet mee in de bus; alleen een vouwfiets mag. Het treinkaartje gaat over betalen, niet over fietsen. De zin over de rolstoel gaat over hulp bij het instappen: een rolstoel is geen fiets, en de chauffeur helpt alleen mensen met een rolstoel." — Why: third lone-"Nee" key in the batch; the fourth option is the wheelchair sentence misread, parallel in form to the key, so the learner must find "Een vouwfiets mag wel".

Together these remove a batch-wide pattern: in the original, every Ja/Nee question (1 q1, 1 q2, 8 q2) was answered by the single "Nee". Rejected items: none.

## 4. Decisions on the author's doubts

- **Text 7 domain:** keep `winkels-diensten`. The item is a purchase (viewing hours, a bundle price); `vervoer` is already served by text 8.
- **Text 9 as `rooster`, theft:** accepted. Opening hours plus a procedure is the `rooster` shape the blueprint lists and batch 004's `bloedprikken` uses; a stolen bicycle is everyday and non-graphic, and "a police report" is on the needed list.
- **Text 2 q2 "die maand":** unambiguous. The only coherent reading of "vóór de 10e van de maand … van die maand" is the month in which you mail; on the other reading (the month of the faulty payslip) a mail on the 12th still lands "een maand later", so both readings give April.
- **"Ja, want …" form (text 1 q1):** the form is fine; the lone-"Nee" key was the problem and is fixed (edits 1, 2, 8).
- **"alleen" in the text 4 q2 key:** removed with the option rebuild (edit 4).
- **112 in texts 5 and 9:** keep both; the wording differs, both are realistic closing lines, and only text 5 uses 112 in a question.
- **Prices and persona ages:** plausible; nothing to change.

## 5. Diversity and set assembly

- No setting repeats the catalogue or batch 021; the nine operations differ within the batch (photo age and in-person collection; payslip terms and a cut-off with a month step; old/new rooster and a swap; a meeting time, a bought-versus-provided list; time-of-day service rule and call first; 24-hour cancellation, lateness, weekend number; viewing hours against working hours and a bundle price; replacement bus, bicycle rule, warning purpose; walk-in hours against opening hours, lost property).
- The "which slot fits the persona's hours" operation now exists in `020-tweedehandsfiets` q1, `020-politiebureau` q1, `021-zwemrooster` q1, `021-openingstijden` q1, `004-praktijkles` q1 and `004-bloedprikken` q1; spread these over different drills. Expiry-letter purpose questions: `020-identiteitskaart` q3 and `004-parkeervergunning` q3 — not in the same drill.
- Cross-part neighbours a mixed set should not pair: `voetbalseizoen` with `A2:listening:batch005-voetbal`; `huisartsenpost-folder` with `A2:knm:batch006-huisartsenpost`; `loonstrook-uitleg` with `A2:writing:batch003-loonstrook` and `A2:knm:batch006-loonheffing`; `identiteitskaart` with `A2:speaking:batch009-paspoort`; `tandartsregels` with `A2:listening:tandarts`.
- Drill suggestions: gezondheid (`huisartsenpost-folder`, `tandartsregels`, `004-herhaalrecept`, `004-bloedprikken`); werk (`loonstrook-uitleg`, `dienstwissel`, `004-werkkleding`, `004-magazijn`); instanties/vervoer (`identiteitskaart`, `politiebureau`, `spoorwerk`, `004-stadsbus`).
- Mock forms: 004 (12), 020 (9) and 021 (9) give 30 texts / 74 questions, enough for two ten-text forms without shared items; 020 has no `krant` (021 has), and the batch's schedule texts are list-shaped (hours lists) rather than column tables — the bank's three column tables remain 004's `telefoon`, `stadsbus` and `bloedprikken`. Still open at bank level: no picture-answer item (`skill: picture`) exists in 004, 020 or 021.

## 6. Media notes

Reading items: no audio, no pictures. Nothing to generate.

## 7. Limitations

AI editorial review without learner data; level verdicts are judgments against the official task types as described in the research document (no exemplar files exist yet), not a validation. Prices, phone numbers and opening hours are invented; the general facts mirrored (photo age, vakantiegeld, dental care under 18, huisartsenpost cost, online aangifte, lost property) were checked against general knowledge on 10 September 2026 and carry no KNM claim.
