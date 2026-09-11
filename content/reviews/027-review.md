# Batch 027 editorial review (A2 Spreken, twelve tasks, three per official type, with starters)

**Verdict: pass** for the proposed file. Twelve tasks pass; two carry required picture-brief repairs that are applied in `content/batches/027-proposed.json` (bakkerij: the pair now differs only in the time of day; sollicitatiegesprek: panel 1 without a handwritten letter). No task is rejected. No criterion or starter changed, so the author's starters file stands.

- **Reviewed source:** `content/batches/027-original.json`, SHA-256 `e011118bc144500b728ab50a221f3d4c7e249a16b6bbb3ece9520dd51c91ff27` (the hash the coordinator and the author's notes expected).
- **Proposed file:** `content/batches/027-proposed.json`, SHA-256 `d1be1382330e564d919a1b7d9d2776ba38ca0e57d169e39b0ef60b86e346b507` — the bytes to adopt; recorded as `source_sha256` in `027-review.json`. The diff against the original is exactly six lines (two briefs and two alts in bakkerij, one brief and one alt in sollicitatiegesprek).
- **Starters:** `content/batches/027-starters.json`, SHA-256 `51ac7cf3ae4a69622757cce5bbdded4fbdfb451df5b291576c0bae70e427bf41`, unchanged; verdict pass. No `027-proposed-starters.json`.
- **Review date:** 2026-09-11. Fresh context; the author's notes and thirteen doubts were read after every task had been judged, then each doubt was decided (below).
- **Checker on the proposed file:** `npm run batch:check content/batches/027-proposed.json` → "Checked 12 items, 0 questions. No failures, no warnings."

## Checks beyond the script (on the proposed bytes)

- Shape: 3 × 4 task types, `exam: duo-a2`, `rubric: a2-spreken`, `speakingSeconds: 40`, `prepSeconds: 10`, `status: draft`, `targetLevelValidated: false`; images 1/1/2/3 per type with `size` still/—/pair/sequence (3 stills, 3 singles, 6 pair pictures, 9 panels); every brief ends in a "No text" clause and has a Dutch `alt`; every cast name is followed by the exact trait string of `config/illustration.json` (the same `includes` test as `expandCast`), sequences repeat the traits in all three panels, non-cast recurring figures (interviewer, dentist, shopkeeper) carry the same three traits in every panel where they appear. Slugs are unique and absent from the A2 speaking catalogue.
- Cues: 20–21 words, one two-part question each, natural spoken Dutch, no digits, roles `f-young`, `m-older`, `m-adult` present in `config/voices.json`; no cue asks for identifying data. Prompts 18–29 words in four or five sentences, longest sentence 13, no subordinate clause, each in the official instruction pattern of its type (video: the 009 composite "… stelt u een vraag. U hoort de vraag. Geef antwoord.").
- Criteria: three bilingual pairs per task in the 009 scheme (video: part one, part two, one more detail; describe: scene, at least two, opinion; choose: choice, reason, the other picture; sequence: one per panel); English accurate; a learner who does what the prompt says meets every criterion.
- Samples and quotes: every quote is a verbatim substring of its sample; exactly one `null` per task (positions 0/1/2: 3/4/5 times), and the null always marks a criterion the sample really misses (kassa names one item where "minstens twee" is asked; contant-pinnen argues both ways without choosing); samples 19–29 words with two typical A2 errors each; no prompt sentence appears in a sample or model.
- Models: 39–44 words, five to seven sentences, averages 5.7–8.8 words, longest sentence 14; subordinate clauses only `dat`, `als` and one indirect question (`hoeveel geld ik nog heb`), at most one per sentence; present tense; days, times and objects explicit; every model meets all three criteria of its task, also after the two brief edits.
- Level (blueprint §10): every prompt, cue, sample and model is inside the A2 limits. `content/exemplars/` still does not exist, so each task was compared with the official task descriptions in `docs/research/exam-blueprints-2026-09-10.md` §3.1 and blueprint §4.3, and with the 009 tasks the level check calibrated.
- Names: no invented organisation, shop or firm anywhere ("het taalcafé van de bibliotheek", "de school", "een bedrijf", "een bakkerij"); "Ellen" is a first name. Nothing to check on the web.

## Task verdicts

| id (`A2:speaking:batch027-…`) | type, domain | verdict | level | reason |
| --- | --- | --- | --- | --- |
| ziekmelden | video-answer, werk | pass | comparable | Roos (`f-young`) asks how to call in sick and whom to tell, 20 words, `je` from a colleague; sample omits the channel (null 1), quotes exact; model 40 words: bellen voor acht uur, de teamleider Ellen, appje niet genoeg, beter melden. The learner invents the routine, as in 009 bushalte. |
| taalcafe-oefenen | video-answer, opleiding | pass | comparable (easy end) | Meneer De Vries (`m-older`, the same voice as 009 bushalte) lists praten/lezen/schrijven and asks a day, 21 words; null 2 (no day); model 39 words: praten, dinsdag, 's avonds na zeven uur. |
| cursuskeuze | video-answer, opleiding | pass | comparable | The adviser (`m-adult`) lists three courses and asks which and why, 20 words; null 2 (no reason); model 40 words: computercursus, reasons from work, maandag en donderdag, a question back. |
| wachtkamer | picture-describe, gezondheid | pass | comparable | Official pattern; three nameable actions (op zijn telefoon kijken, met blokken spelen, water drinken) plus a plant for the opinion; null 3; model 44 words. The busiest brief of the batch (four figures); see media notes. |
| keuken | picture-describe, vrije-tijd-familie | pass | comparable | Three actions (roeren, groente snijden, borden op tafel zetten), opinion about samen koken; null 3; model 42 words. Fatima's coat and Sem as her son accepted (doubt 4, below). |
| kassa | picture-describe, winkels-diensten | pass | comparable (easy end) | Three objects (brood, melk, bananen), opinion about wachten in de rij; sample names one item, null 2 right; model 40 words. |
| bakkerij | picture-choose, werk | pass after E1 | comparable | Preference with a reason like the official "gebouw" choice. The author's pair differed in time and in activity (baking vs sweeping an empty shop); the proposed pair shows Julio at the oven in both and changes only the window (sunrise vs moon), per the config's pair rule. Null 3; model 43 words, still true of the new pictures. Near pair with 009 ochtenddienst (same preference); keep apart in a form. |
| contant-pinnen | picture-choose, winkels-diensten | pass | comparable | Same counter, same shopkeeper, same bag; only the payment differs. Sample argues both ways without choosing, null 1 (accepted, doubt 7); model 43 words: overzicht, te veel uitgeven, automaat kapot. |
| bus-fiets | picture-choose, vervoer | pass | comparable | Same person and bag, bus vs bicycle; null 3; model 43 words: donker, woorden leren, gezond en goedkoop, regen. |
| sollicitatiegesprek | picture-sequence, werk | pass after E2 | comparable (upper end) | Panel 1 was a handwritten letter, a text object that "No text" cannot honour (the 009 calendar case); now Sabrina types at a laptop with a blank screen, as 009 and 026 stills do. Panels 2–3 with the interviewer's traits repeated. Null 1; model 44 words ("schrijft … een sollicitatiebrief" holds for typing); panels 1 and 3 need the small inference the prompt supports. |
| verhuizen | picture-sequence, wonen-buurt | pass | comparable (easy end) | Packing, loading a white van with a friend (fixed traits), the first evening between boxes; null 2; model 43 words with A1 verbs. |
| tandartsbezoek | picture-sequence, gezondheid | pass | comparable | Phone with a hand on the cheek, the chair with a mirror, a blank appointment card at the door; the dentist's traits repeated; nothing graphic; null 3; model 44 words. |

Level flags: none off-level or off-format. The 009 level check's display finding still applies to the three video tasks (the app prints the criteria under the prompt before the learner speaks, which paraphrases the spoken question); that is an app rule, not a content change.

## Edits applied in the proposed file

| # | kind | item, field | new text | why |
| --- | --- | --- | --- | --- |
| E1 | required | bakkerij `images[0].brief` | "In a bakery early in the morning, Julio (young man, curly hair, striped shirt) wears an apron and slides a tray of bread rolls into a large oven; through the window the sky is pale pink and orange with the sun rising. No text." | The pair must differ only in the thing asked (working early or in the evening); the dawn sky is the morning cue and now contrasts with a night sky. |
| E1 | required | bakkerij `images[0].alt` | "Een jonge man schuift 's ochtends vroeg een bakplaat met broodjes in de oven van een bakkerij; door het raam komt de zon op." | Describes the picture including the time cue; "bakplaat met broodjes" replaces the odd "plaat brood". |
| E1 | required | bakkerij `images[1].brief` | "In the same bakery in the evening, Julio (young man, curly hair, striped shirt) wears the same apron and slides a tray of bread rolls into the same large oven; through the window the sky is dark blue with a crescent moon and a few stars. No text." | Same action, same props; only the window changes (`config/illustration.json` pairRule: "differ in the one thing the task asks about and match in everything else"). The sweeping and the empty counter made the pictures differ in the job as well. |
| E1 | required | bakkerij `images[1].alt` | "Een jonge man schuift 's avonds een bakplaat met broodjes in de oven van een bakkerij; door het raam is de maan te zien." | Matches the new picture; neutral between the options. |
| E2 | required | sollicitatiegesprek `images[0].brief` | "At a kitchen table at home, Sabrina (woman in her thirties, long dark hair, green jumper) sits at a laptop and types, looking at the screen. No text, blank laptop screen." | Writing a letter by hand means lines of text on the sheet; the model draws pseudo-writing, which the "No text" checklist item then fails (the 009 ochtenddienst calendar decision). A blank laptop screen is the bank's established convention (009 ochtenddienst, 026 lunchpauze and online-winkel) and matches how applications are sent. |
| E2 | required | sollicitatiegesprek `images[0].alt` | "Een vrouw zit thuis aan tafel en typt op een laptop." | Describes the new panel without a key. |

Criteria, samples, quotes, models and starters are byte-identical to the author's file. The bakkerij sample ("Ik kies plaatje één … brood bakken") and model ("Ik kies het tweede plaatje, de avond … Op het eerste plaatje werkt Julio heel vroeg") and the sollicitatiegesprek model ("schrijft Sabrina een sollicitatiebrief") and starter ("Op het eerste plaatje schrijft Sabrina …") remain true of the new pictures.

Rejected items: none.

## Decisions on the author's doubts (027-notes.md §7)

1. **No instanties task.** Accepted; no relabelling (a gemeente desk is a less natural place to pay than a shop). One correction to the premise: the 026 review, adopted in the meantime, relabelled bibliotheekboek from `instanties` to `winkels-diensten`, so 026 does not cover the domain either; the A2 speaking bank's instanties tasks are 009's three (gemeente-bellen, paspoort, brief-gemeente). A mock form is defined by type counts, not domains, so nothing blocks; the next A2 speaking batch should carry one or two instanties tasks (a DigiD or toeslag question, a gemeente letter) to lift the count.
2. **Two learner errors per sample.** Accepted: the author brief asks for one or two and 026 does the same, so the two sibling batches are consistent. One note for the feedback evaluation: "de cursus computer" (cursuskeuze) copies the cue's own list form ("avondcursussen Engels, computer en koken"), so it is a weak error; the sample's second error (the direct-question word order) is the real one.
3. **ziekmelden asks the learner to describe a workplace rule.** Accepted (009 bushalte); the criterion names three channels so any routine passes.
4. **Fatima's coat; Sem as her son.** Coat: kept. `scripts/illustrate.ts` appends "Fatima is woman in her forties, headscarf, blue coat." to every brief that names her, so a brief cannot drop the coat, and the precedent (009: Sem's sweater in the gym, Karim's jacket at the campsite; 026 koken-buurvrouw: Fatima in the same coat at her own stove) is to accept the cast trait and let the flat style read it as a blue garment. Media check: if the generated picture shows an obvious outdoor coat, redo; a lasting fix is a config edit ("blue coat or cardigan"), which is the coordinator's call, not a batch matter. Sem as her son: kept. The catalogue already implies one household: Amina is Fatima's daughter (005 voetbal, 017 eerste-schooldag, 021 dierentuin, 023 studiedag); 004 picknick puts Amina in Sem's household (Roos writes to Sem and papa about mama's fiftieth and "Amina maakt een tekening voor mama"); 023 turnles makes Hasan Sem's father; 023 bakker gives Roos a father turning sixty. Hasan ("man in his fifties") and Fatima ("in her forties") as the parents of Roos, Sem and Amina contradicts nothing, and "her son Sem" only says what those items imply. No cast swap to Sabrina: Fatima at a stove in 026 (a sequence, cooking alone for a neighbour) and 027 (one picture, a family, an opinion) is a different type and act; the two stay out of one set (see set assembly).
5. **Bakery pair differs in more than one thing.** Fixed (E1), the author's own fallback.
6. **Handwritten letter.** Fixed (E2), the author's own fallback; alt, criteria, sample, model and starters need no other change.
7. **contant-pinnen sample gives no choice.** Accepted (009 flat-dorp, 026 online-winkel); inside this batch the three choose samples omit criteria 3, 1 and 3, so the pattern is not repeated within the batch.
8. **"kiespijn".** Accepted; the word is everyday, the picture explains it, nothing graphic is shown.
9. **Cue voices.** Accepted. Meneer De Vries keeps `m-older` (Arjen), the voice he has in 009 bushalte, which keeps the character's voice stable across batches; Robert (`m-adult`) and Roos (`f-young`) are new to A2 cues and fit the adviser and the young colleague.
10. **"taalcafé".** Keep; the 022 item is a listening advertisement in another part. Do not place the two in one mixed-part set.
11. **Alt texts naming the actions.** Accepted, as the 009 review read it for open tasks.
12. **Domain labels.** Accepted as labelled.
13. **Set assembly.** See below; the form separates every near pair the notes list.

## Sentence starters

Keys match the twelve ids in batch order; three fragments per task in criteria order, each with "…"; none is a full answer or states a fact the task does not give; choice starters are neutral; every fronted adverbial carries its verb ("Op het andere plaatje zie ik …", "Daarna draagt hij …"), the safer form the 009 review suggested. Completion test: "Je moet 's ochtends … bellen." / "… de teamleider." / "… acht uur."; "… praten …" / "… dinsdag …" / "… want dan ben ik vrij."; "… Engels …" / "… omdat ik het nodig heb voor mijn werk." / "… maandag …"; "… de wachtkamer." / "Een kind speelt en een vrouw drinkt." / "… rustig, want …"; "… de keuken." / "Fatima kookt, Sem snijdt en Amina dekt de tafel." / "… gezellig, want …"; "… de kassa." / "… brood en bananen." / "… vervelend, want …"; "… twee." / "… 's avonds, want …" / "… Julio 's ochtends." (still fits the new pair); "… contant." / "… ik het geld zie." / "… een pinpas."; "… fiets." / "… het is gezond." / "… een bus."; "… een brief." (a letter typed on the laptop; "een e-mail" also fits) / "… een mevrouw." / "… haar een hand."; "… een lamp …" / "… een doos … het busje." / "… op de bank."; "… kiespijn … de tandarts." / "… in de stoel." / "… een kaartje.". Verdict: pass at the author's hash.

## Diversity and set assembly

Within the batch: twelve settings and acts, no two alike; cast Fatima ×2 (keuken, bus-fiets) and Karim ×2 (kassa, tandartsbezoek), the rest once; the two health tasks and the two shop tasks are of different types. Domains: werk 3, opleiding 2, gezondheid 2, winkels-diensten 2, vervoer 1, wonen-buurt 1, vrije-tijd-familie 1, instanties 0. New cells against 009: choose × winkels-diensten, sequence × werk, sequence × wonen-buurt, sequence × gezondheid. Needed-list coverage: sick leave, a course choice, huisarts, tandarts, OV, shops and services (paying, the checkout), a job application.

Near pairs, with the decision:

1. bakkerij vs 009 ochtenddienst (the same preference; coordinator-requested picture counterpart): not in one form.
2. keuken vs 026 koken-buurvrouw (Fatima at a stove in both): different type and act; not in one set.
3. ziekmelden vs 026 lunchpauze (Roos as a colleague opening with "Hé" in both video stills): different acts (explaining a routine vs lunch habits); not in one video drill. If the coordinator wants six distinct speakers in the 026+027 video bank, Sabrina (`f-adult`) is a drop-in for ziekmelden with the same cue text; not applied, since the repetition is across batches and set assembly avoids it.
4. bus-fiets vs 009 trein-auto and 026 fiets-lopen: three mode pairs with different purposes; bus-fiets and fiets-lopen not in one form.
5. taalcafe-oefenen vs 022 taalcafé (listening) and 026 woorden-leren (a classmate's question at a taalschool): different parts and acts.
6. wachtkamer and tandartsbezoek vs the receptive huisarts and tandarts items (reading, listening, KNM): productive tasks, new settings.
7. sollicitatiegesprek vs B1 017 trein-gemist (the interview is the last panel there): different level and story.
8. verhuizen vs KNM verhuizing and 009 nieuwe-buurvrouw (a box as a prop): the move is narrated nowhere else.
9. The 026 review (adopted while this review was written) lists five more cross-batch neighbours of different types (huisarts-afspraak / wachtkamer, marktkraam / kassa, regen / bus-fiets, online-winkel / contant-pinnen, bibliotheekboek / taalcafe-oefenen) with the rule: out of one drill of four, and out of one mock form when both are the same type. The form below follows that rule.

Set assembly: 026 (adopted, with fiets-lopen relabelled `vervoer` and bibliotheekboek `winkels-diensten`) and 027 together give six tasks per type, enough for one mock form (4 + 4 + 4 + 4) with no item shared with the 009 form, plus a half form. A form that uses four different cue voices, repeats no cast name in consecutive tasks and keeps every same-type neighbour pair (lunchpauze / ziekmelden, woorden-leren / taalcafe-oefenen, marktkraam / kassa, online-winkel / contant-pinnen, fiets-lopen / bus-fiets) apart:

- Video: ziekmelden (werk, Roos `f-young`), woorden-leren (opleiding, Modibo `m-young`), huisarts-afspraak (gezondheid, assistente `f-adult`), cursuskeuze (opleiding, adviseur `m-adult`).
- Describe: wachtkamer (gezondheid, Hasan), regen (vervoer, Sabrina), keuken (vrije-tijd-familie, Fatima), kassa (winkels-diensten, Karim).
- Choose: bakkerij (werk, Julio), online-winkel (winkels-diensten, meneer De Vries), bus-fiets (vervoer, Fatima), feest-thuis (vrije-tijd-familie, Karim).
- Sequence: sollicitatiegesprek (werk, Sabrina), bibliotheekboek (winkels-diensten, Modibo), tandartsbezoek (gezondheid, Karim), treinkaartje (vervoer, Sem).

Half form from the remaining eight: lunchpauze, taalcafe-oefenen / marktkraam, schoolplein / fiets-lopen, contant-pinnen / koken-buurvrouw, verhuizen. Karim appears three times in the mock (kassa, feest-thuis, tandartsbezoek), never consecutively; swap feest-thuis for contant-pinnen if one appearance per cast member is wanted (then winkels-diensten twice in the choose block). The form has no instanties task (neither batch has one); the 026 review's drill plan puts 009 brief-gemeente into a sequence drill for that reason, and the two plans are compatible (drills and forms are different set types). Drill order within this batch, easiest first: video taalcafe-oefenen → cursuskeuze → ziekmelden; describe kassa → keuken → wachtkamer; choose bus-fiets → bakkerij → contant-pinnen; sequence verhuizen → tandartsbezoek → sollicitatiegesprek.

## Media notes

Audio (`npm run audio:generate` after adoption): twelve prompt clips read by `narrator` (Serge de Beer) and three cue clips, about 1,850 characters in total.

| Task | Speaker label | Role | Voice | Note |
| --- | --- | --- | --- | --- |
| ziekmelden | Roos | f-young | Roos | opens with "Hé" (the round trip may write "Hee", under the 4% gate); quiet voice, loudness normalisation applies; informal `je` |
| taalcafe-oefenen | Meneer De Vries | m-older | Arjen | same voice as 009 bushalte and slaap; the colon before "praten, lezen of schrijven" reads as a pause |
| cursuskeuze | de adviseur | m-adult | Robert | first A2 cue with this voice; speed 0.92 from the config |

No digits anywhere in prompts or cues. The app plays the still plus the cue clip in place of the official video.

Illustrations (`npm run illustrate:generate`): 21 images (3 stills 1024×640, 3 singles 816×816, 6 pair pictures 1024×640, 9 panels 1024×640, generated one job per entry). Risks for the contact-sheet review, per the config checklist:

- Text-bearing objects: the banknote, coins and terminal (contant-pinnen), the milk carton (kassa; it must also read as milk and not as a plain box, otherwise the model's "melk" is the only word the picture does not give), book spines (verhuizen panel 1; the library room in taalcafe-oefenen), the laptop screen (sollicitatiegesprek panel 1, declared blank), the appointment card (tandartsbezoek panel 3, blank), the van (verhuizen panel 2, no logos), the bus (no destination sign), phone screens (wachtkamer, tandartsbezoek panel 1).
- The answer-relevant detail: after E1 the bakkerij pair differs only in the window; the rising sun and the crescent moon must read at 500–600 px, or redo with a stronger sky contrast. The three basket items (kassa), the three actions (wachtkamer, keuken), the card (tandartsbezoek).
- Small details that artefact in the flat style: coins, the mirror and gloves (tandartsbezoek panel 2), wooden blocks and a paper cup (wachtkamer), stars (bakkerij evening).
- Consistency: the interviewer in sollicitatiegesprek panels 2–3 and the dentist in tandartsbezoek panels 2–3 (three traits each, repeated verbatim); the shopkeeper in both contant-pinnen pictures; the same bag in bus-fiets; Julio's apron in both bakkerij pictures; the friend appears only in verhuizen panel 2, which the model matches ("Een vriendin helpt hem").
- Cast traits indoors: Fatima's blue coat in the kitchen (keuken) and Hasan's cap in the waiting room are cast-rule traits; check that they read as garments, not as an outdoor scene.
- Crowding: wachtkamer has four figures (Hasan, a mother, a boy, an older woman); if the generation artefacts, redo without the mother ("a small boy plays with wooden blocks on the floor"), which keeps the three actions.
- Alt texts are ready; for the describe tasks they name the pictured actions and objects, as the 009 review accepted for open tasks.

## Notes for the coordinator

- Adopt with `npm run batch:adopt 027`; it verifies `source_sha256` against the proposed bytes and, because there is no proposed starters file, the starters hash against the author's file. Then media, then `npm run content:integrate` (the review JSON carries `starters_source`, `starters_sha256` and `starters_verdict: "pass"`, so the starters merge with it).
- The author's notes (§4 table, §7 doubts 5 and 6) describe the old bakkerij and letter pictures; the proposed briefs supersede them.
- Cast: `config/illustration.json` could record the family links the bank now implies (Hasan and Fatima; Roos, Sem, Amina) so the next author does not re-open the question, and "blue coat" could become a garment that works indoors if the keuken and 026 koken-buurvrouw pictures look odd; both are config decisions outside this review.
- The 009 level-check recommendation to hide the criteria before speaking for `video-answer` still stands for the three video tasks here.

## Limitations

AI editorial review, not a review by Dutch-language educators, a learner trial, a blueprint validation or a psychometric calibration; it establishes no equivalence with the official exam. Level verdicts compare each task with the official task descriptions and the calibrated 009 tasks, not with stored exemplars (`content/exemplars/` does not exist) or learner data; `targetLevelValidated` stays false. The review covers text fields, cues and image briefs; the generated pictures, the audio clips and any feedback prompts that use these criteria need their own review after media production. The two edited briefs are the reviewer's wording and have had no second reading beyond the coordinator's diff.
