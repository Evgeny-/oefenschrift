# Batch 021 editorial review (A2 Lezen, nine texts, 26 questions)

**Verdict:** Pass after edits. Three texts pass unchanged (openingstijden, ketel, zwemrooster); six pass with small repairs applied in the proposed file (terugbrengen, dierentuin, schoonmaker, weekmarkt, trappenhuis, gezinskaart). Nothing rejected. No level flag.

**Reviewed source:** `content/batches/021-original.json`, SHA-256 `49f6973121212d81c9ff5f37ec5c365b584d2eeb57e784e9622db8caca7d592c` (matches the review task).
**Proposed file:** `content/batches/021-proposed.json`, SHA-256 `9a46da9252846d5de84a43629b1f970b431906d974d540c36ed6f533f305ed50` — the `source_sha256` in `021-review.json`, for `npm run batch:adopt 021`. No starters file (closed items only). Note: the proposed file was adopted over `021-original.json` by another process at about 19:00, right after the review JSON appeared; the adopted bytes hash to the same value and pass the checker.
**Review date:** 2026-09-10, fresh context. Order of reading: blueprint (§1, §3, §4.1, §5, §10, §12), research §3.1 and §6.5, rubric, author brief, the batch, the author's notes; every verdict was then checked against the batch text itself; the A2 reading items of `content/catalogue.json` and `020-original.json` for diversity.

Checker on both files: `Checked 9 items, 26 questions. Keys: {"B":8,"C":8,"A":7,"D":3}. Options: {"3":15,"4":11}. 6 warning(s), no failures.` The six warnings are the known splitter artefacts (table rows in openingstijden, zwemrooster, gezinskaart; letter and e-mail headers in ketel and dierentuin). Reviewer checks beyond the script: every evidence quote verbatim; every key proved from its quote and every distractor tested against the text; key signals scanned by script (longest or shortest option, prompt word recurring only in the key, polarity of yes/no options, twin options); 2026 weekday–date pairs verified (all eleven correct); invented names searched on the web (none is a real business; see the JSON); prose-only sentence statistics computed (averages 6.3–9.1 words, longest 17, subordinators omdat/als/dat only, no passive or relative clause).

## 1. Items

| id (`A2:reading:batch021-…`) | verdict | level | reason |
| --- | --- | --- | --- |
| terugbrengen (regels, winkels-diensten) | pass after edit | comparable | Three threshold rules proved from the text; q2's key was the odd polarity out, distractor B recast as a "Nee" with the wrong reason. |
| openingstijden (bericht, opleiding) | pass | comparable | Table row plus after-hours rule (q1), closing time plus return box (q2), reason lookup (q3); domain opleiding accepted. |
| ketel (brief, wonen-buurt) | pass | comparable (easy end) | Archetypal corporation letter: call-before-7-April with the no-show fee and the website as distractors; purpose against two conditionals. Two questions only. |
| dierentuin (email, opleiding) | pass after edit | comparable | Purpose key was verbatim in the subject line; replaced by the author's payment question. Three dated lookups now. |
| zwemrooster (rooster, vrije-tijd-familie) | pass | comparable (upper end) | Six-row table; schedule against working hours, holiday exception overriding the table, three-person price sum with an age exemption. |
| schoonmaker (advertentie, werk) | pass after edit | comparable (upper end) | 14,40 per hour is below the 2026 legal minimum (14,71 / 14,99); raised to 15,20. q3's twin options isolated the key; A reframed. |
| weekmarkt (krant, winkels-diensten) | pass after edit | comparable | Location, purpose and cause on one relocation; "staat" recurred from the prompt only in the key, key reworded. |
| trappenhuis (bericht, wonen-buurt) | pass after edit | comparable (upper end) | Longest sentences and most subordinate clauses of the batch, within §10; key of q2 was the longest option, key of q3 stood against much longer distractors; two distractors resized. |
| gezinskaart (folder, vrije-tijd-familie) | pass after edit | comparable (upper end) | 224 words; membership rule with an exemption; q1's key was the odd polarity out (fourth option added), q2's key alone carried "Amina" (distractor B now does too). |

Persona-scenario prompts: every text has at least one (21 of 26 by the checker's pattern). Purpose questions: three for nine texts (ketel, weekmarkt, trappenhuis) after the dierentuin replacement, within "one per two or three texts". Option mix 15 × three, 11 × four (42%). Keys A7 B8 C8 D3 (27/31/31%; D 3 of 11 four-option keys); sequence B C B A C D B C D B A C C B B A C A D A B C A A C B, no letter three times in a row. After the edits no key is the longest option by words or characters, no prompt word recurs only in the key, and in the three yes/no questions the key is never the odd polarity out (terugbrengen q2 Ja/Nee/Nee*, zwemrooster q2 Ja/Nee/Nee*, gezinskaart q1 Ja*/Nee/Nee/Ja).

## 2. Edits made (all in `021-proposed.json`)

1. **terugbrengen q2 `options.B`** "Ja, maar alleen binnen 14 dagen na de koop." → "Nee, want ruilen kan alleen binnen 14 dagen." — the key was the only "Nee" against two "Ja" options and the shortest option by words (§5: no key signalled by polarity); the distractor keeps its anchor (the 14-day rule) and is contradicted by "U kunt het kledingstuk wel ruilen" after 14 days. `explanation` rewritten to say why B fails: "Zwemkleding neemt de winkel nooit terug, ook niet met prijskaartje. De regel over het prijskaartje geldt alleen voor andere kleding. Andere kleding kunt u ook na 14 dagen nog ruilen; alleen geld terug krijgt u binnen 14 dagen."
2. **dierentuin q3** (whole question) purpose "Waarom stuurt de juf deze e-mail?" (key "De klas gaat op schoolreis.", readable from "Onderwerp: schoolreis vrijdag 22 mei") → `skill` detail, `prompt` "Amina gaat mee op schoolreis. Wat moet Fatima vóór vrijdag 15 mei doen?", options A "7,50 euro voor Amina betalen in de school-app." (key), B "Amina 7,50 euro meegeven naar school.", C "Amina om 8.15 uur naar het schoolplein brengen."; `evidence` "De schoolreis kost 7,50 euro per kind. Betaal dit vóór vrijdag 15 mei in de school-app."; `explanation` "De schoolreis kost 7,50 euro per kind. Dat bedrag betaalt Fatima vóór vrijdag 15 mei in de school-app. Geld meegeven kan niet: de kinderen nemen geen geld mee. Om 8.15 uur op het schoolplein zijn is pas op vrijdag 22 mei, de dag van de schoolreis." — the coordinator's condition for taking the author's replacement was met. B is reversed by "Geen geld en geen telefoon" and the app instruction; C is the trip day. The helper-reply deadline is deliberately not a distractor here, because q2's premise (Fatima wants to help) would make it arguable.
3. **schoonmaker `text`** "U verdient 14,40 euro per uur." → "U verdient 15,20 euro per uur."; **q2 options** 14,40/15,40 → 15,20/16,20 (A "15,20 euro per uur en zijn reiskosten." key, B "15,20 euro per uur, geen reiskosten.", C "16,20 euro per uur en zijn reiskosten.", D "16,20 euro per uur, geen reiskosten."); q2 `evidence` and `explanation` updated to 15,20 — 14,40 is the statutory minimum hourly wage of 1 July 2025; from 1 January 2026 the adult minimum is 14,71 and from 1 July 2026 14,99 (rijksoverheid.nl, checked 2026-09-10), so the advertised wage would be illegal for anyone of 21 or older in the year of the text (§8: prices realistic for the year of writing). The 2×2 arithmetic of q2 is unchanged in shape.
4. **schoonmaker q3 `options.A`** "Blinkvast bellen en naar de baan vragen." → "Op zaterdag 6 juni om 11.00 uur Blinkvast bellen." — B and C were twins differing only in the time while A stood apart in form, which isolates the key pair; A now shares the frame and still tests "U hoeft niet te bellen: wij bellen u".
5. **weekmarkt q2 `options.D`** "De markt staat een half jaar ergens anders." → "De markt is een half jaar ergens anders." — "staat" from the prompt recurred only in the key.
6. **trappenhuis q2 `options.A`** "Zij wil dat de buren de lamp repareren." → "Zij wil dat de buren de kapotte lamp zelf repareren." — the key was the longest option by words (10 against 8/7/8); "zelf" also sharpens the misreading (she has reported the lamp to the corporation).
7. **trappenhuis q3 `options.B`** "De lamp op de tweede verdieping melden." → "De kapotte lamp melden." — the three-word key stood against seven and five words; now 3/4/5.
8. **gezinskaart q1 `options.D` added** "Ja, maar het kind van 3 jaar kost 6,00 euro extra." — the key was the only "Ja" against two "Nee" options; polarity now 2:2, the new distractor is anchored on the 6,00 child price and contradicted by "zij zijn altijd gratis". `explanation` gains "Voor het kind van 3 jaar betaalt het gezin niets extra." Four-option share stays 11 of 26.
9. **gezinskaart q2 `options.B`** "Op maandag om 14.00 uur naar het museum komen." → "Amina op maandag om 14.00 uur naar het museum brengen." — "Amina" from the prompt recurred only in the key.

No text was rewritten beyond the wage sentence; no situation line, title, id, domain or task type changed. Key letters are unchanged (the dierentuin replacement keeps key A); the option totals stay 15 three-option and 11 four-option questions, because dierentuin q3 goes from four options to three and gezinskaart q1 from three to four.

## 3. Rejected

None. Every premise, answer logic and task design was repairable locally.

## 4. Decisions on the author's doubts (021-notes.md §7)

- **Item 2 domain:** keep `opleiding` (the change is made for evening study; studieplekken and Taalcafé are named; the brief asked for two opleiding texts).
- **Item 4 q3:** replaced (edit 2); the key was verbatim in the header.
- **Item 5 q1 lunch break:** accepted as written; "'s avonds" excludes the 12.00 slot on its own and only one row is an evening lap-swimming row.
- **Item 6 q2 skill:** keep `quantity`.
- **Item 7 two "waarom" questions:** keep both. They rest on different evidence (the relocation; the renovation). In the app the reason prompt (q3) comes after the purpose question (q2), so its presupposition "verhuist" reaches q2 only by deliberate back-navigation, which the official player also allows. The headline gives the gist of q2, as the headline of the adopted batch004-ramen krant item does; the key still needs "een half jaar" and the paraphrase "ergens anders".
- **Item 8 q3:** accepted; the 18 April clean-up is an invitation for the hallway and the shed, the rota sentence names number 28 for the stairs, and the prompt says "moet".
- **Item 9 "maximaal":** keep; a high-frequency signage word, and the next sentence carries the rule the key needs.
- **Level without exemplars:** `content/exemplars/` still does not exist; each text was compared with the official description (research §3.1, blueprint §4.1 and §10) and with the adopted, level-checked batch 004.

## 5. Diversity and set assembly

Nine distinct settings, all eight task types (bericht twice), five domains (the sibling batch 020 carries gezondheid, instanties and vervoer). No slug reuse against the catalogue or batches 001–020, no re-skin. Operations vary: threshold rules, table plus after-hours rule, deadline with alternative, dated instructions, schedule against working hours with a holiday exception and a price sum, two-job choice with a 2×2 pay rule, temporary relocation with cause, rota plus house number, membership rule with an exemption. Near neighbours to keep out of one drill: gezinskaart and zwemrooster (same age-band price structure and the sentence "Kinderen tot en met 3 jaar: gratis"; both close to batch004-stadsbus); ketel and batch004-verwarming (cv-ketel of a housing corporation); openingstijden and batch020-politiebureau (opening hours); dierentuin and the listening item batch001-schoolreis (school trip, across parts). Personas: Fatima and Karim in five texts each; Fatima's children (a son; Amina, 10; a daughter of 3 and a son of 8) and Karim's four children are not contradictory, but forms should not put those texts back to back.

Balanced drills (each letter 20–40%, neighbours apart): A = terugbrengen + openingstijden + schoonmaker (9 Q, A2 B3 C3 D1); B = ketel + weekmarkt + gezinskaart (8 Q, A3 B2 C2 D1; Karim in all three); C = dierentuin + zwemrooster + trappenhuis (9 Q, A2 B3 C3 D1). For mock forms (about ten texts, 25 questions): 021 alone is nine texts / 26 questions; with 020 (nine / 23) and 004 (twelve / 30) two forms without shared items are possible, each to be re-checked for key balance and for the yes/no pattern — 020's three yes/no questions all have the key as the odd polarity out (identiteitskaart q1 and q2, spoorwerk q2), so do not stack them with the balanced three here. No picture-answer item exists yet in 004, 020 or 021; the launch bank still needs one (§4.1).

## 6. Media notes

Reading items: no audio, no pictures. Three texts carry a " – " separated plain-text table (openingstijden, zwemrooster, gezinskaart), rendered with `white-space: pre-line` as in batch 004.

## 7. Observations, not blocking

- zwemrooster writes "Banen zwemmen" and "Vrij zwemmen" as two words; the one-word compounds are also common on pool boards. Left as written: both forms are in wide use and the two-word form is more transparent at A2.
- Three keys are the shortest option by one word (ketel q2, zwemrooster q2, weekmarkt q3), never by characters.
- The author's notes still describe the old dierentuin q3, the 14,40 wage and the three-option gezinskaart q1; they are the author's file and were not edited.

## 8. Limitations

AI editorial review of original practice material. Difficulty labels remain unvalidated authoring targets (`targetLevelValidated: false`); no official approval, scoring or exam equivalence is claimed. The level column compares each text with the official description and with the calibrated batch 004, not with a teacher rating or learner data.
