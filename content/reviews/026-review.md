# Batch 026 editorial review (A2 Spreken, twelve tasks in the four official types, with starters)

**Verdict:** Pass. All twelve tasks pass in `content/batches/026-proposed.json`; no task rejected; three recommended edits applied (two domain labels, one image brief); no criterion or starter changed, so the author's starters file stands. Ready for integration with `npm run batch:adopt 026`.

**Reviewed source:** `content/batches/026-original.json`, SHA-256 `afbeda58e61ee4c3b468b99de7c39ed4fdf80d8a22bc2a9086a2ae551cfafba6` (matches the task and the author's notes).
**Proposed file:** `content/batches/026-proposed.json`, SHA-256 `2817bb36edf17aec4a7d514ef6fff04cee1b89459b8aa453aa93bd2495c3145b` (recorded as `source_sha256`). It differs from the original in exactly three fields (`[7].domain`, `[10].domain`, `[10].images[0].brief`); the original re-serialises byte-identically with the same formatter, so nothing else moved.
**Starters:** `content/batches/026-starters.json`, SHA-256 `4967159fd10a8450402f74572c5267c3a91bc1fb55e82d7e0bf893733df779c6`, verdict pass, unchanged (no `026-proposed-starters.json`).
**Review date:** 2026-09-11. Rubric `content/reviews/rubric.md` with blueprint §1, §3, §4.3, §5, §7, §8, §9, §10, §12 and the "Spreken A2" paragraph of `docs/research/exam-blueprints-2026-09-10.md`; the 009 review and level check were applied as the calibration for this shape. Checker on the original and on the proposed file: "Checked 12 items, 0 questions. No failures, no warnings."

Every figure in the author's notes (§1, §5) was re-derived on the bytes and reproduced: 3 × 4 types; cues 18/19/20 words with roles `f-young`, `m-young`, `f-adult` present in `config/voices.json`; prompts 20–29 words, no sentence over 11, each in its official instruction pattern; samples 20–28 words, every quote a verbatim substring, exactly one `null` per task (positions 1 ×3, 2 ×5, 3 ×4), each null marking a criterion the sample really misses; models 39–44 words in 5–7 main clauses, average 6.3–8.6, longest sentence 13, the only subordinate clause "dat de maat goed is"; no prompt sentence in a sample or model; every cast name followed by the exact trait string of `config/illustration.json`; images 3 still / 3 single / 6 pair / 9 sequence, every brief with a "No text" clause and a Dutch `alt`; twelve slugs unused in the catalogue's speaking part and in 027; no invented organisation, shop or address anywhere, so the web check has nothing to check.

## 1. Tasks

| id (`A2:speaking:batch026-…`) | type, domain | verdict | level | reason |
| --- | --- | --- | --- | --- |
| lunchpauze | video-answer, werk | pass | comparable | Cue Roos (`f-young`), 18 words, one two-part question (what, where); null 2 right ("mee van thuis" is not where); model 39 words: broodje met kaas en een appel, kantine, twee collega's, half uur. Still: Roos, desk, blank laptop, closed lunch box. |
| woorden-leren | video-answer, opleiding | pass | comparable | Cue Modibo (`m-young`), 19 words, two questions in two sentences as 009 abonnement; null 2 right (no word named); model 43 words: kaartjes, briefjes, "het woord gordijn", a tip. Still: closed notebook, pen. |
| huisarts-afspraak | video-answer, gezondheid | pass | comparable, the most demanding of the three | Cue assistant (`f-adult`, the config's "huisarts assistant"), 20 words, `u`; a real desk question; null 1 right; model 39 words: middag with a reason, keel/hoesten, "morgen om drie uur", woensdag. Nothing graphic. |
| marktkraam | picture-describe, winkels-diensten | pass | comparable, easy end | Official pattern; three produce kinds give slack for "minstens twee"; null 3 right; model 40 words with a two-sided opinion (gezellig, vers, goedkoper). No price tags. |
| regen | picture-describe, vervoer | pass | comparable | Sabrina under an umbrella, the older woman on the bench, the bus coming: three nameable actions; null 3 right; model 44 words, opinion "prima … goedkoop, maar soms te laat". No sign, no bus number. |
| schoolplein | picture-describe, vrije-tijd-familie | pass | comparable | Two child actions (touwtjespringen, bal) plus the mother at the gate; null 2 right (one action); model 44 words in seven short sentences, opinion with two reasons. Nine simple shapes, the fullest brief of the batch but at the level of the revised gymles. |
| online-winkel | picture-choose, winkels-diensten | pass | comparable | Same man and shirt, the channel differs (home/parcel vs shop/rack); null 1 right (reasons for both, no choice, as 009 flat-dorp); model 41 words chooses the shop, reason (passen, maat), mentions online (terugsturen). |
| fiets-lopen | picture-choose, vervoer (relabelled) | pass | comparable | The cleanest pair: identical street, bag and person, only bicycle versus walking; null 3 right; model 40 words chooses walking, "tien minuten", "frisse lucht", mentions the bicycle ("vaak kapot"). |
| feest-thuis | picture-choose, vrije-tijd-familie | pass | comparable | Karim and the same two friends (two fixed traits each) at home / in a restaurant with a waiter; null 2 right ("meer leuk" is a judgement, as 009 klas-thuis); model 39 words: rustig, lang blijven, zelf koken; restaurant "duur en vaak druk". |
| treinkaartje | picture-sequence, vervoer | pass | comparable, easy end | Ticket machine → platform → by the window: three distinct actions, traits and backpack in every panel; null 1 right; model 41 words (kaartje, pinpas, perron, "de trein komt eraan", raam). Yellow machine and train are right for NS; screens and card blank. |
| bibliotheekboek | picture-sequence, winkels-diensten (relabelled) | pass | comparable | Finds → returns → takes a new book; librarian with three fixed traits in panels 2 and 3; the lateness carried by the prompt and the worried face; null 2 right; model 43 words ("Het boek is te laat", "geeft … terug", "zegt sorry", "nieuw boek"). |
| koken-buurvrouw | picture-sequence, wonen-buurt | pass | comparable, easy end | Cooks → brings the pot → eats together; both cast members with traits verbatim in every panel where they appear, the same lidded pot; null 3 right; model 43 words in A1/A2 verbs (koken, roeren, brengen, opendoen, eten, praten). |

Level, batch-wide: blueprint §10 holds for every prompt, cue, sample and model (present tense with one perfect, at most one subordinate clause, numbers and times in words). Against the official task descriptions (no `content/exemplars/` exists) every task is comparable to its type; none is off-level or off-format. The video answers are comparable in content; the 009 level check's "too easy (display)" flag no longer applies because `app/components/OpenExercise.tsx` now hides the requirements list for cued tasks until review (the collapsed "Beginzinnen" are still shown; see §7).

## 2. Edits applied in the proposed file

| # | field | new text | kind | why |
| --- | --- | --- | --- | --- |
| E1 | bibliotheekboek `domain` | `winkels-diensten` (was `instanties`) | recommended | A public library is a service counter, not an instantie in the inburgering sense (gemeente, UWV, DUO, belastingdienst, politie: blueprint §9's needed list for instanties names gemeente letters, toeslagen, DigiD, a police report). The catalogue's `opleiding` label for library items covered a course and opening hours, not a loan. Instanties is already the largest A2 domain in the catalogue (31 items), winkels-diensten the second smallest (15); a spread over eight domains is not a reason to mislabel. Decision on doubt 6. |
| E2 | fiets-lopen `domain` | `vervoer` (was `werk`) | recommended | Same "Gaat u liever met … of …?" template as 009 trein-auto (to a birthday) and 027 bus-fiets (to a course), both labelled `vervoer`; the content is the mode of transport, the workplace only the destination; vervoer is the least represented A2 domain (11). Decision on doubt 10. |
| E3 | bibliotheekboek `images[0].brief` | "At home, Modibo (young man, short black hair, light shirt) finds a thick book under a pile of blank sheets of paper on his desk and looks at it with a worried face, one hand on his head. No text, blank book cover." | recommended | The only paper object in the batch not declared blank; the 009 review's ochtenddienst finding (a text-bearing object contradicts "No text" and loops the generation). Alt ("onder een stapel papieren"), sample and model stay true. |

**Rejected:** none. **Starters:** unchanged; every fragment was completed in task context (e.g. "Ik eet in … de kantine", "Deze week heb ik het woord … geleerd", "Ik kan … donderdag … komen", "Hij kan … appels en … tomaten kopen", "Ik koop liever … in de winkel", "Daarna staat hij op … het perron"); fronted adverbials carry the inversion ("Op het andere plaatje zie ik …", "Daarna brengt hij …"), the choice starters are neutral, no starter states a fact the task does not give.

## 3. Decisions on the author's doubts (notes §7)

1. **"U hoort de vraag"** → keep. It matches the six integrated 009 tasks and 027; blueprint §4.3 should record the composite pattern (coordinator, as the 009 review asked).
2. **woorden-leren vs 009 thuis-oefenen** → keep as written; different act (a memory method plus one concrete word, versus habits and frequency), speaker and register. The alternative cue is not needed. Not in one video drill with thuis-oefenen or 027 taalcafe-oefenen.
3. **regen vs 009 bushalte** → keep the bus. Different type and act; the platform variant would collide with treinkaartje panel 2 in this batch. Not both bus stops in one form.
4. **schoolplein vs 009 gymles** → keep the ball. A schoolyard at pick-up time with an opinion about playing outside is another scene and act; a ball is a shared motif, and "spelen met een bal" is the most nameable action a describe task can offer. Scooter variant not applied. Not in one describe drill with gymles.
5. **treinkaartje vs 003 tramkaart** → keep; the pre-blueprint items are another format; different sets.
6. **Domain of bibliotheekboek** → `winkels-diensten` (E1).
7. **Panel 3 without a fine** → keep the new book. Late fines vary by library (many abolished them), a payment panel would be wrong for part of the country and adds a small text-prone object; the lateness sits in the prompt and panel 1, as brief-gemeente's letter content sits in its prompt.
8. **Learner errors in samples** → keep. The author brief asks for them; `sample` and `quotes` are feedback fixtures, not shown in the app (`app/` reads neither field); all quotes are verbatim with the errors; the errors are typical (article, gender, inversion, agreement, adjective ending, infinitive placement, analytic comparative, "kinders"). "op de bank" in regen is acceptable Dutch for a bench and does not count as an error; harmless.
9. **"U bent geslaagd voor uw examen"** → keep; role-play, no claim about the learner.
10. **fiets-lopen labelled werk** → `vervoer` (E2).
11. **Fatima's coat at the stove** → keep (cast rule; 027 keuken does the same).
12. **Reason for the visit in huisarts-afspraak** → keep; mild complaints, and the desk question is what the assistant asks; the "voor uzelf of uw kind" variant is weaker.
13. **Pairs with different rooms** → accepted as 009 gemeente-bellen: the place is the thing chosen; person, clothes, shirt and companions are constant.
14. **Modibo twice** → accepted (different onderdelen); the set builder keeps his four tasks (woorden-leren, bibliotheekboek, 009 rijbewijs, 027 verhuizen) apart.
15. **Neighbours in 027** → recorded in §4; two more found (lunchpauze/ziekmelden, marktkraam/kassa).

## 4. Diversity and set assembly

Twelve distinct settings and acts, no slug or setting from blueprint §9 or the catalogue reused, only the fixed instruction sentences mirror the official format, no official scenario (school lunch, building choice, hairdresser) reused. Needed-list coverage: lunch at work, learning words, huisarts, a market, the train, online delivery and returns, the school of the children, a celebration. Wonen-buurt kept to one task.

Near neighbours (all accepted as tasks; keep each pair out of one drill of four and, where both are the same type, out of one mock form):

- lunchpauze / 027 ziekmelden: both Roos (`f-young`) as a colleague opening with "Hé", both werk video answers.
- woorden-leren / 009 thuis-oefenen / 027 taalcafe-oefenen: three video answers about learning Dutch.
- huisarts-afspraak / 009 slaap (video) / 027 wachtkamer (describe): the same practice.
- marktkraam / 027 kassa: "what X can/will buy" with groceries.
- regen / 009 bushalte (video) / 027 bus-fiets (choose): a bus stop or a bus.
- schoolplein / 009 gymles: a rope and a ball.
- online-winkel / 027 contant-pinnen: two shopping choices.
- fiets-lopen / 027 bus-fiets / 009 trein-auto: transport-mode choices, two with a bicycle.
- treinkaartje / 009 trein-auto (a seat by the train window) / 003 tramkaart.
- bibliotheekboek / 027 taalcafe-oefenen: the library.
- koken-buurvrouw panel 1 / 027 keuken: Fatima at her stove.

Bank: 009 (24) + 026 (12) + 027 (12) = 48 tasks, 12 per type, the launch-bank figure of the research note: two mock forms without shared tasks plus one spare drill per type. One drill of four per type from this batch plus a 009 spare, respecting the list above: video lunchpauze, woorden-leren, huisarts-afspraak + 009 abonnement (four different cue voices); describe marktkraam, regen, schoolplein + 009 schoonmaak; choose online-winkel, fiets-lopen, feest-thuis + 009 flat-dorp; sequence treinkaartje, bibliotheekboek, koken-buurvrouw + 009 brief-gemeente (which puts an instanties task back into the drill). Order easiest first within a type: koken-buurvrouw → treinkaartje → bibliotheekboek; marktkraam → regen → schoolplein; fiets-lopen → feest-thuis → online-winkel; lunchpauze → woorden-leren → huisarts-afspraak.

## 5. Media notes

- **Audio** (after adoption): 12 instruction clips (`narrator`) and 3 cue clips, about 1,840 characters. Cue voices: Roos → `f-young` (quiet voice; loudness normalisation), Modibo → `m-young`, de assistente → `f-adult` (the config lists "huisarts assistant" under this role). All numbers in words ("twaalf uur"); "Hé" may round-trip as "Hee" (one character, under the gate). Captions read "U hoort: Roos / Modibo / de assistente".
- **Images**: 21 (3 stills 1024×640, 3 singles 816×816, 6 pair pictures and 9 sequence panels 1024×640). Look for, per the config checklist: the ticket machine reading as one without text (treinkaartje 1: a yellow box with a blank screen and the card in hand); no number on the bus and no sign on the stop (regen), no price tags (marktkraam, online-winkel 2), blank laptop screens (lunchpauze, online-winkel 1), blank book spines (bibliotheekboek 2–3), no house number (koken 2); thin-line artefacts on the jump rope and the rain lines; the blue shirt against meneer De Vries's dark blue jacket (online-winkel: a green shirt would separate them if the pictures are ever redrawn); the two friends' consistency across the feest-thuis pair (two fixed traits each; a third would guard a redraw); the librarian identical in bibliotheekboek 2 and 3; Fatima's coat and mevrouw Bakker's cardigan; Modibo's worried face in the flat style (the prompt carries "te laat" anyway); left-hand traffic not implied; the market stall readable without a sign.
- Alt texts are neutral Dutch; for the describe tasks they name the pictured things, as the 009 review accepted for open tasks.

## 6. Checker and hashes

`npm run batch:check content/batches/026-proposed.json`: "Checked 12 items, 0 questions. Keys: {}. Options: {}. No failures, no warnings." Proposed `2817bb36…145b`; original `afbeda58…fba6`; starters `4967159f…79c6`.

## 7. For the coordinator

- `npm run batch:adopt 026`, then `npm run content:integrate` (merges the starters: the review JSON carries `starters_source`, `starters_sha256`, `starters_verdict: "pass"`), audio and illustrations after the hash gate.
- Blueprint §4.3 still prints "U hoort een vraag"; three batches now use the composite "… stelt u een vraag. U hoort de vraag. Geef antwoord." Record it.
- `OpenExercise.tsx` hides the requirements for cued tasks before speaking, but the collapsed "Beginzinnen" are still offered for them and paraphrase the cue ("Ik wil graag een afspraak in …"); extending the hide rule to `item.cue` in drill mode would close the last listening leak the 009 level check named. App matter, not content.
- The domain relabels change the batch's spread to werk 1, opleiding 1, gezondheid 1, winkels-diensten 3, vervoer 3, vrije-tijd-familie 2, wonen-buurt 1, instanties 0; if a spread over eight domains is wanted for its own sake, the honest route is a gemeente or UWV speaking task in a later batch.
- No level check is needed: this is the second batch in the 009 shape (blueprint §12, step 5).

## 8. Limitations

AI editorial review; no educator review, learner trial or psychometric calibration; `targetLevelValidated` stays false. Level was judged against the official task descriptions and the integrated 009 tasks, not against stored exemplars (`content/exemplars/` does not exist). Text fields, cues, criteria, samples, models, starters and image briefs only; the generated pictures and clips need the media review after production. The reviewer's three edits are labels and one brief, so no new Dutch wording has entered the batch unread.
