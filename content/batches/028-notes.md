# Batch 028: design notes (B1 Schrijven, eight zinstaken)

Batch 028 contains eight original B1 sentence tasks (`exam: nt2-i`, `part: writing`, `taskType: zinstaak`, `rubric: b1-schrijven`) in the shape of tasks 1–8 of Staatsexamen NT2 Programma I Schrijven, as pinned in `content/blueprint.md` §4.8 and the "Schrijven I" paragraph of `docs/research/exam-blueprints-2026-09-10.md`: a short e-mail with a printed header, salutation and closing, one gap, and a marking model that names the structure earning the grammar point (adequaatheid 0–1, grammatica 0–1). Every situation, e-mail, criterion, sample, quote, model and starter was written for this project; official material was used for the task shape only. Level labels are authoring targets (`targetLevelValidated: false`); nothing here claims official equivalence or a pass prediction. The eight settings were fixed by the coordinator (rental deposit, late pick-up, shift swap, wrong size, afvalpas, watered plants, missed notes, day off); none of them repeats a setting of batch 014 or a B1 writing item in the catalogue.

Conventions, taken over from batch 014 and the decisions in `content/reviews/014-review.md`:

- **The gap is one sentence.** Open gaps (`hoofdzin` afvalpas, `vrij` bedankje) carry the prompt "Maak de e-mail af. Schrijf één zin op de open plek." The six structures that only a lead-in can force carry the lead-in immediately before `___` and the prompt "Maak de e-mail af. Maak de zin op de open plek af.": `inversie` after "Volgens het huurcontract" and "Helaas", `bijzin` after "dat" and "als", `hoofdzin` after "maar", `te-infinitief` after "om".
- **`model` and `sample` are exactly what the learner types in the gap** (after the lead-in where there is one, lower-case first letter, no lead-in repeated). The notes print the full sentence so the reviewer can read it as prose.
- **Criteria** are the two scoring aspects in the exam's order: adequacy (what the sentence must do, named concretely) and grammar (the target structure with the observable rule). The hoofdzin criteria state a second-position rule ("persoonsvorm op de tweede plaats, na het onderwerp of na een ander zinsdeel vooraan"), as the 014 review required for "want", so that an inverted main clause after "maar" or in the open gap earns the point. `adequacyNote` repeats the adequacy requirement in one Dutch line for the feedback service.
- **Samples** miss exactly one criterion (`null` quote) and carry one or two typical B1 learner errors. Where grammar is missed, the error is the one that costs the point (no inversion, main-clause order inside a bijzin, a missing "te"); where adequacy is missed, the sentence is grammatically correct and its only error is one the zinstaak scale tolerates (an article-gender ending or a spelling slip), so the whole sample is the grammar quote. Four samples miss grammar (borg, ophalen, aantekeningen, vrije-dag), four miss adequacy (dienstruil, werkschoenen, afvalpas, bedankje).
- **Register** is set by the scaffold: formal "u" with "Geachte …," / "Beste meneer …," and "Met vriendelijke groet,"; informal "je/jij/jouw" with "Hoi …," and "Groetjes," (the manager gets "Groet,"). Four of each.
- **Names** follow blueprint §8 and `config/illustration.json`: Jari (the child), Modibo (colleague), Fatima (neighbour), Thérèse (course mate), Sabrina (manager); invented: mevrouw Kuipers (private landlord, a woman, so that the landlord is not meneer De Vries of 016-slaapkamerraam again) and meneer Van Leeuwen (a male primary-school teacher). No cast name appears twice in the batch. Organisations are invented and were searched on the web before use (section 5). Addresses are street + number without a town (Esdoornstraat 8, Populierenlaan 14); Meidoornstraat was avoided because batch 008 uses it.
- No prompt or body sentence is copied into a sample or model.

## 1. Batch matrix

| # | slug | grammarTarget | lead-in | speech act | domain | register | addressee | why it is not a duplicate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | borg | inversie | "Volgens het huurcontract ___." | stating a rule (what the contract says) | overig | formal | landlord mevrouw Kuipers | No deposit or move-out item exists; A2 *huur* (batch008) gives notice, KNM *huurcontract*/*huuropzegging* are facts, 016-slaapkamerraam (speaking) reports a broken window to a landlord. |
| 2 | ophalen | bijzin | "Zou het mogelijk zijn dat ___?" | request | educatie | formal | teacher meneer Van Leeuwen | A late pick-up exists nowhere; 016-medicijn-school (speaking) and 017-eerste-schooldag are about Amina's medicine and first day, other parts and acts. |
| 3 | dienstruil | bijzin | "Dat wil ik wel doen, als ___." | agreeing with a condition | werk | informal | colleague Modibo | The only shift items are receptive: A2 reading 020-dienstwissel (the teamleider changes the rota) and the B1 reading text "dienst ruilen"; A2 speaking 009-ochtenddienst states a preference. Here the writer answers a colleague's swap request. |
| 4 | werkschoenen | hoofdzin | "…, maar ___." | stating the problem | werk | formal | web shop Werkkleding Zuidwal | 015-kledingkast complains about a damaged wardrobe and late delivery (korte schrijftaak, five elements); A2 *schoenen* (batch002) returns shoes that are too small to a shop. Here a web shop sent the wrong size of safety shoes and one sentence must say so. |
| 5 | afvalpas | hoofdzin | open | stating a problem | overig | formal | gemeente | A2 *container* (batch003) reports a wrong container; A2 speaking 009-afval and KNM *gft* are about separating waste. A missing afvalpas after a move is new. |
| 6 | bedankje | vrij | open | invitation as a thank-you | overig | informal | neighbour Fatima | The mirror image of A2 *plant* (batch002, asking Noor to water the plant); here the plants were watered and the writer thanks and invites. Different level, act and addressee. |
| 7 | aantekeningen | inversie | "Helaas ___." | consequence | educatie | informal | course mate Thérèse | B1 speaking *cursusgemist* (batch002) asks for help by phone after a missed evening; 017-examentips gives tips. A written request for notes with an inverted consequence sentence is new. |
| 8 | vrije-dag | te-infinitief | "… een dag vrij nemen om ___." | purpose of a request | werk | informal | manager Sabrina | B1 writing *rooster* (batch002) and *opleiding* (batch003) ask for schedule changes and study time; B1 reading 011-verlofregeling is a rules text. A single day off with a purpose is new. |

Counts: grammarTarget hoofdzin 2 (one after "maar", one open), bijzin 2 ("dat", "als"), inversie 2 ("Volgens het huurcontract", "Helaas"), te-infinitief 1 ("om"), vrij 1 (open). Domains werk 3 (dienstruil, werkschoenen, vrije-dag), educatie 2 (ophalen, aantekeningen), overig 3 (borg, afvalpas, bedankje). Register formal 4 (borg, ophalen, werkschoenen, afvalpas), informal 4 (dienstruil, bedankje, aantekeningen, vrije-dag). Speech acts: a rule statement, a request, a conditional agreement, two problem statements (one after "maar", one open), an invitation, a consequence, a purpose. Lead-ins: none of the six repeats a 014 lead-in ("Daarom", "omdat", "of", "om" after "lukt het mij niet", "want", "Misschien"); "om" recurs as the only possible te-infinitief marker but after a different verb phrase ("een dag vrij nemen om"). No setting is shared between two tasks; none of the §9 B1 writing settings or the A2 writing settings is reused; neighbourhood appears once (the thank-you to a neighbour, a setting the coordinator fixed) and volunteering not at all.

## 2. Per task

### 1 borg (`B1:writing:batch028-borg:1`, inversie)

- Body: "Op maandag 31 augustus heb ik de sleutels van de woning aan de Esdoornstraat 8 bij u ingeleverd. De woning heb ik schoon en zonder schade achtergelaten. De borg van 950 euro heb ik nog niet teruggekregen. Volgens het huurcontract ___. Kunt u mij laten weten wanneer u het bedrag overmaakt?"
- Why the structure is forced: the gap sentence opens with the printed prepositional phrase "Volgens het huurcontract", so the finite verb must come next. Why the function is forced: between "nog niet teruggekregen" and the question when the money will be transferred, the only sentence that fits says what the contract stipulates about returning the deposit (the term, or the condition that the flat is left clean).
- Model: "Volgens het huurcontract moet u de borg binnen twee weken na het einde van de huur terugbetalen." (14 typed words) — the contract rule (criterion 1), "moet u" directly after the phrase (criterion 2). The two-week term mirrors the statutory rule (section 5).
- Sample: "Volgens het huurcontract u moet de borg binnen twee weken terug betalen." — adequacy met (whole sample quoted); grammar missed (`null`): subject before the verb after the fronted phrase. Second error: "terug betalen" written as two words (spelling, tolerated).
- Alternative that also earns both points: "Volgens het huurcontract krijg ik de borg terug als de woning schoon is opgeleverd."

### 2 ophalen (`B1:writing:batch028-ophalen:1`, bijzin)

- Body: "Op donderdag 17 september kan ik Jari niet om kwart over twee ophalen. Op mijn werk is die middag een verplichte bijeenkomst tot half drie, dus ik ben pas om kwart voor drie op school. Zou het mogelijk zijn dat ___? Ik heb helaas niemand anders gevonden die hem kan ophalen."
- Forced: "Zou het mogelijk zijn dat" takes a subordinate clause with the finite verb at the end; after the announced half hour and before "niemand anders gevonden", the request can only be that Jari waits at school (in the classroom, with the teacher, at the opvang) until the writer arrives. Times are consistent: school out at 14:15, meeting until 14:30, arrival about 14:45.
- Model: "Zou het mogelijk zijn dat Jari tot kwart voor drie bij u in de klas mag wachten?" (12) — the waiting request (1), "mag wachten" at the end (2).
- Sample: "Zou het mogelijk zijn dat Jari mag in het klas wachten tot ik er ben?" — adequacy met (whole sample quoted); grammar missed (`null`): main-clause order inside the dat-clause ("mag" directly after the subject). Second error: "het klas" (de klas; gender, tolerated).
- Alternative: "… dat Jari een half uur bij de naschoolse opvang blijft?" (verb-final "blijft").

### 3 dienstruil (`B1:writing:batch028-dienstruil:1`, bijzin)

- Body: "Je vroeg of ik op zaterdag 19 september jouw avonddienst wil overnemen. Dat wil ik wel doen, als ___. Laat je het vandaag nog even weten? Dan geef ik de ruil meteen door aan de teamleider voor het rooster."
- Forced: "als" after the comma introduces a subordinate clause with the finite verb at the end; "Dat wil ik wel doen, als" can only be followed by the condition under which the writer agrees, and "de ruil" in the last sentence confirms that a swap (not a plain favour) is meant.
- Model: "Dat wil ik wel doen, als jij dan mijn ochtenddienst van zondag 27 september overneemt." (9) — a concrete condition, a shift in return (1), "overneemt" at the end (2).
- Sample: "Dat wil ik wel doen, als jij wilt dat ik jou avonddienst overneem." — grammar met (correct als-clause with "wilt" at the end of its clause and the dat-clause after it, whole sample quoted); adequacy missed (`null`): it only repeats Modibo's own request and names no condition, the "copied prompt" failure. Error: "jou avonddienst" (jouw; spelling, tolerated).
- Alternative: "…, als ik die dag pas om zes uur kan beginnen." (a condition about the time, "kan beginnen" at the end).

### 4 werkschoenen (`B1:writing:batch028-werkschoenen:1`, hoofdzin after "maar")

- Body: "Op 4 september heb ik in uw webwinkel veiligheidsschoenen besteld in maat 43 (bestelnummer 20517). Gisteren is het pakket bezorgd, maar ___. Ik heb de schoenen maandag al nodig, omdat ik dan begin met een nieuwe baan in een magazijn. Kunt u mij laten weten hoe ik ze kan ruilen voor de juiste maat?"
- Forced: "maar" is a coordinating conjunction, so the clause keeps main-clause order (finite verb second, after the subject or after a fronted element); this is the batch's counterpart of 014's "want". The subject line ("Verkeerde maat"), "besteld in maat 43" and "ruilen voor de juiste maat" leave one content: the delivered shoes are not size 43.
- Model: "Gisteren is het pakket bezorgd, maar de schoenen in de doos hebben maat 41 in plaats van maat 43." (13 typed words) — the wrong size (1), "hebben" in second position (2).
- Sample: "Gisteren is het pakket bezorgd, maar ik was op die moment helaas niet thuis." — grammar met (correct main clause, whole sample quoted); adequacy missed (`null`): a plausible continuation that says nothing about the size, so the request to exchange is left without its reason. Error: "die moment" (het moment; gender, tolerated).
- Alternative: "…, maar in de doos zat maat 41." (inversion after the fronted phrase, covered by the second-position wording).

### 5 afvalpas (`B1:writing:batch028-afvalpas:1`, hoofdzin, open gap)

- Body: "Op dinsdag 1 september ben ik verhuisd naar de Populierenlaan 14. ___ Zonder de pas kan ik de ondergrondse container in de straat niet openen. Kunt u mij laten weten hoe ik een pas kan aanvragen en of dat geld kost?"
- Forced: the subject line names the afvalpas, "Zonder de pas" needs the pass introduced in the gap, and "hoe ik een pas kan aanvragen" tells the reader the writer has none; the sentence must state that there is no (working) pass for the new address. A statement is expected, so the marking structure is a main clause with the verb in second position; a fronted "Helaas" or "Bij de sleutels" with inversion is also a correct hoofdzin and the criterion says so.
- Model: "Ik heb nog geen afvalpas voor dit adres gekregen." (9) — the missing pass (1), "heb" second (2).
- Sample: "Ik heb mij vorige week bij het gemeente ingeschreven." — grammar met (correct main clause, whole sample quoted); adequacy missed (`null`): registering at the gemeente says nothing about a pass, and "Zonder de pas" then refers to nothing. Error: "het gemeente" (de gemeente; gender, tolerated).
- Alternative: "Bij de sleutels zat helaas geen afvalpas." or "De pas van de vorige bewoner werkt niet meer."

### 6 bedankje (`B1:writing:batch028-bedankje:1`, vrij, open gap)

- Body: "Gisteravond zijn we teruggekomen van vakantie. Alle planten staan er nog prachtig bij, zelfs de tomaten op het balkon. Heel erg bedankt dat je ze twee weken lang water hebt gegeven! ___ Zeg maar welke avond je uitkomt."
- Forced: after the thanks and before "Zeg maar welke avond je uitkomt", the sentence must invite Fatima for an evening (dinner, a drink). A question ("Heb je zin om …?", "Kom je …?") or a statement ("Ik wil je graag uitnodigen …") both do it, which is why the target is `vrij`: any correct structure earns the grammar point.
- Model: "Heb je zin om binnenkort een avond bij ons te komen eten?" (12) — the invitation (1); correct question order with an om-te clause (2).
- Sample: "We hebben een heel fijn vakantie gehad in Spanje." — grammar met (correct main clause, whole sample quoted); adequacy missed (`null`): it tells about the holiday and invites nobody, so the next sentence hangs. Error: "een heel fijn vakantie" (fijne; adjective ending, tolerated like the gender endings).
- Alternative: "Als bedankje nodigen we je graag een keer uit voor het eten."

### 7 aantekeningen (`B1:writing:batch028-aantekeningen:1`, inversie)

- Body: "Dinsdag kon ik niet naar de les komen, omdat ik onverwacht moest werken. Ik heb gehoord dat de docent toen hoofdstuk 5 heeft uitgelegd. Helaas ___. Zou jij mij een foto van jouw aantekeningen willen sturen? Dan kan ik alles voor de toets van volgende week nog doorlezen."
- Forced: the sentence-initial adverb "Helaas" requires the finite verb next; between the missed explanation and the request for a photo of the notes, only the consequence for the writer fits (no notes, the explanation missed, the chapter not yet understood).
- Model: "Helaas heb ik van die les nu helemaal geen aantekeningen." (9) — the consequence (1), "heb ik" after "Helaas" (2).
- Sample: "Helaas ik heb nu helemaal geen aantekeningen van dat les." — adequacy met (whole sample quoted); grammar missed (`null`): no inversion after "Helaas". Second error: "dat les" (die les; gender, tolerated).
- Alternative: "Helaas begrijp ik dat hoofdstuk daardoor nog niet goed."

### 8 vrije-dag (`B1:writing:batch028-vrije-dag:1`, te-infinitief)

- Body: "Ik wil je iets vragen over het rooster van oktober. Op vrijdag 23 oktober wil ik graag een dag vrij nemen om ___. Ik heb dit jaar nog acht vakantiedagen over. Als het nodig is, kan ik die zaterdag wel extra werken. Zou dat kunnen?"
- Forced: "een dag vrij nemen om" must be completed by "… te + infinitief"; the content is the purpose of the day off, which the manager needs before answering "Zou dat kunnen?".
- Model: "… om mijn ouders 's ochtends van het vliegveld op te halen." (10 typed words) — the purpose (1), "te" inside the separable verb at the end (2), the case the criterion names.
- Sample: "… om naar de diploma uitreiking van mijn dochter gaan." — adequacy met (whole sample quoted); grammar missed (`null`): "te" is missing before "gaan". Second error: "diploma uitreiking" written as two words (spelling, tolerated).
- Alternative: "… om mijn ouders te helpen met hun verhuizing." ("te helpen" before the extraposed phrase, which the judge must not read as a word-order error).

## 3. Sentence starters (`content/batches/028-starters.json`)

Two fragments per task in criteria order (adequacy, grammar), each with an ellipsis, each fitting the gap as it is printed (after the lead-in where there is one) and in the register of the e-mail. None is a complete answer and none states a fact the body does not give.

| Task | Starters (fit the gap) | Completion test |
| --- | --- | --- |
| borg (after "Volgens het huurcontract") | moet u de borg binnen … terugbetalen / krijg ik de borg … terug | "… moet u de borg binnen twee weken terugbetalen." / "… krijg ik de borg binnen een maand terug." |
| ophalen (after "dat") | Jari tot … in de klas mag wachten / Jari zolang bij … kan blijven | "… dat Jari tot kwart voor drie in de klas mag wachten?" / "… dat Jari zolang bij de opvang kan blijven?" |
| dienstruil (after "als") | jij dan mijn dienst van … overneemt / ik die dag pas om … kan beginnen | "…, als jij dan mijn dienst van zondag overneemt." / "…, als ik die dag pas om zes uur kan beginnen." |
| werkschoenen (after "maar") | de schoenen hebben maat … in plaats van … / in de doos zat … | "…, maar de schoenen hebben maat 41 in plaats van 43." / "…, maar in de doos zat maat 41." |
| afvalpas (open) | Ik heb nog geen … / Bij de sleutels zat … | "Ik heb nog geen afvalpas gekregen." / "Bij de sleutels zat geen afvalpas." |
| bedankje (open) | Heb je zin om … bij ons …? / Ik wil je graag uitnodigen voor … | "Heb je zin om een keer bij ons te eten?" / "Ik wil je graag uitnodigen voor een etentje." |
| aantekeningen (after "Helaas") | heb ik van die les … / mis ik nu de uitleg over … | "Helaas heb ik van die les geen aantekeningen." / "Helaas mis ik nu de uitleg over hoofdstuk 5." |
| vrije-dag (after "om") | naar … te gaan / mijn … te helpen met … | "… om naar de bruiloft van mijn broer te gaan." / "… om mijn ouders te helpen met de verhuizing." |

Both starters of a task show the target structure (verb first after the fronted phrase or adverb, verb last after "dat"/"als", verb second after "maar", "te" before the infinitive after "om", a main clause or a question in the open gaps), so a learner who uses one still has to supply the content that the adequacy criterion checks. The starters are delivered here and not merged into `content/hints/sentence-starters.json`.

## 4. Language control

Body figures (words, sentences including the gap sentence, longest sentence, average): borg 51 / 5 / 18 / 10.2; ophalen 51 / 4 / 22 / 12.8; dienstruil 39 / 4 / 13 / 9.8; werkschoenen 54 / 4 / 18 / 13.5; afvalpas 41 / 4 / 16 / 10.3; bedankje 38 / 5 / 13 / 7.6; aantekeningen 48 / 5 / 13 / 9.6; vrije-dag 45 / 5 / 13 / 9.0. Short e-mail prose at B1: subordinate clauses (omdat, dat, of, die, als), signal words (dus, dan, helaas, zonder), separable and modal verbs, times and dates in words and figures. Models are 9–14 typed words (full sentences 9–22 with the lead-in), inside the 5–25 range and above the checker's minimum of 8; samples 7–10 words. Bodies are somewhat longer than in batch 014 (33–46) because the coordinator's settings need one more fact each (an order number, a time chain, a rota); see doubt 7.

## 5. Sources, facts and name checks

- Task shape: `docs/research/exam-blueprints-2026-09-10.md` §3.2 (Schrijven I, zinstaak: complete one sentence inside a short e-mail; marking model names the structure; adequacy 0–1, grammar 0–1) and `content/blueprint.md` §4.8; the lead-in and prompt conventions from `content/reviews/014-review.md` (decisions 1 and 2).
- Deposit: under the Wet goed verhuurderschap a landlord returns the deposit within 14 days after the end of the tenancy (30 days when costs are deducted); the model therefore says "binnen twee weken" (Rijksoverheid, "Ik wil een woning huren. Mag mijn verhuurder een waarborgsom vragen?", checked 11 September 2026). The criterion does not require the term, only that the sentence states what the contract says. 950 euro is a realistic one-month deposit.
- Afvalpas: the generic name for the pass that opens underground containers in many municipalities; no municipal procedure or fee is claimed (the e-mail asks).
- Dates checked against the 2026 calendar: maandag 31 augustus, dinsdag 1 september, donderdag 17 september, zaterdag 19 september, zondag 27 september, vrijdag 23 oktober; 4 september is printed without a weekday (a Friday).
- Invented organisations, each searched on the web on 11 September 2026: **Basisschool De Sterrenbrug** (no school of that name; De Sterrenboog in Beltrum and Doorn, De Sterrenborgh in Enschede and De Steenen Brug in Roermond exist and are different names), **Werkkleding Zuidwal** (no business; Zuidwal is a street name in several cities), **gemeente Wilgendam** (no municipality; Wilgendam is a street in Noordwijk and a farm in Belgium, used only in the `to` address), **Tuincentrum De Groene Mispel** (no business; only in the manager's `to` address). Rejected after the search because they belong to real organisations: gemeente Vlietdam (a place in Belgium), Werkschoenen Bergmans (a shoe brand), Basisschool De Vlinderboom (five schools), Lunchroom De Blauwe Kater (cafés in Heerenveen and Leuven), Tuincentrum Zonnewilg (De Zonnewilg B.V., a solar park). Private addressees (m.kuipers@mail.nl, modibo@, fatima@, therese@) follow the catalogue's `…@mail.nl` convention. The e-mail domains themselves (desterrenbrug.nl and so on) were not checked for registration; the 014 review accepted invented plausible names on this point.

## 6. Diversity matrix against the catalogue

| Task | Nearest existing items | Difference |
| --- | --- | --- |
| borg | 016-slaapkamerraam (B1 speaking, landlord meneer De Vries), A2 writing batch008-huur (giving notice), KNM batch006 huurcontract/huuropzegging | other part or level; no item asks for a deposit back; the landlord is a different, female character |
| ophalen | 016-medicijn-school, 017-eerste-schooldag (B1 speaking, Amina), A2 listening batch001-schoolreis | another child, another act (a late pick-up), written and formal |
| dienstruil | A2 reading batch020-dienstwissel, B1 reading "dienst ruilen", A2 speaking batch009-ochtenddienst, B1 writing batch002-rooster | receptive or a preference elsewhere; here a written reply with a condition |
| werkschoenen | B1 writing 015-kledingkast (damaged wardrobe, korte schrijftaak), A2 writing batch002-schoenen (shoes too small), A2 reading batch021-terugbrengen, batch004-werkkleding | one sentence naming a wrong size in a work-clothing order; different task type and level |
| afvalpas | A2 writing batch003-container, A2 speaking batch009-afval, KNM batch006-gft | a missing pass after a move, not a wrong container or waste separation |
| bedankje | A2 writing batch002-plant (asking Noor to water the plant), A2 speaking buurvrouw | the thank-you and invitation after the favour; B1, open gap |
| aantekeningen | B1 speaking batch002-cursusgemist, 017-examentips, 016-open-dag | a written request for notes with a consequence sentence |
| vrije-dag | B1 writing batch002-rooster, batch003-opleiding, B1 reading 011-verlofregeling, 014-ziekmelding | a day off with a purpose clause, informal, to a manager |

Against batch 014: no lead-in, setting, addressee or organisation is reused; the two batches together give sixteen zinstaken with twelve different lead-in/structure combinations, which is enough for the four-task drills of blueprint §11 without a repeated frame. Against the B1 writing items of batches 002, 003 and 015 (rooster conflict, library noise, buurtfeest, oversteekplaats, studietijd, laptopreparatie, vrijwilligersrooster, avondcursus, gemiste werkdag, kledingkast, pauzerooster): no setting recurs; the wardrobe complaint and the shoe complaint are both complaints to a web shop but differ in task type, length, problem and level of detail (doubt 3).

## 7. Doubts for the reviewer

1. **Domain tags.** The coordinator asked for werk 3 / educatie 2 / overig 3, which only works if the wrong-size complaint is `werk` (safety shoes for a new warehouse job; the body says so) and the message to the child's teacher is `educatie` (a school setting). Precedent tags the child's school as `overig` (016-medicijn-school, 017-eerste-schooldag are speaking items). If the reviewer prefers precedent, ophalen becomes `overig` and werkschoenen stays `werk`, giving werk 3 / educatie 1 / overig 4.
2. **dienstruil sample.** The adequacy failure is a circular als-clause ("als jij wilt dat ik jouw avonddienst overneem"), the prompt-copy failure the exam rules describe. A judge might call it merely odd rather than inadequate; the fallback is a grammatically correct sentence that gives a reason instead of a condition.
3. **werkschoenen versus 015-kledingkast.** Both are complaints to a web shop. The 015 review accepted a wardrobe next to A2 *kast*; here the task type, the problem (wrong size, not damage and delay) and the length differ, and the coordinator fixed the setting. Keep them apart in a mixed form.
4. **"maar" as the hoofdzin marker** (werkschoenen) instead of 014's "want". "maar" coordinates like "want"; the error it catches is verb-third after a fronted element ("maar in de doos de schoenen zijn …") or bijzin order. The criterion uses the second-position wording the 014 review required.
5. **"Volgens het huurcontract ___" as the inversion trigger** (borg): a fronted prepositional phrase rather than an adverb. It forces inversion just as "Daarom" does and is the phrase learners actually write in such e-mails; the sample shows the typical failure ("Volgens het huurcontract u moet …").
6. **"als" (dienstruil) can be read as "when".** Either reading yields a verb-final clause; the adequacy criterion asks for a condition, which "Dat wil ik wel doen, als" makes the natural reading.
7. **Body length.** 38–54 words against 33–46 in batch 014; the longest sentence is 22 words (ophalen, the time chain with "dus"). Still short e-mails, but the reviewer may want ophalen or werkschoenen trimmed by a fact.
8. **afvalpas sample** ("Ik heb mij vorige week bij het gemeente ingeschreven.") is grammatical and plausible in a letter to the gemeente but names no pass; it is the off-topic failure rather than a copied sentence.
9. **Two moves in one batch.** The coordinator's settings borg (moving out) and afvalpas (moving in) both involve a move; the vrije-dag model was therefore changed from picking up the keys of a new home to collecting the writer's parents from the airport, so that no third task carries the motif.
10. **Manager's register.** vrije-dag is informal ("Hoi Sabrina", "je", closing "Groet,") so that the batch has four informal tasks; 014-ziekmelding already has the formal teamleider. If the reviewer prefers "Groetjes," for consistency with the other informal closings, it is a one-word edit.
11. **No second-person form in the ophalen body.** The register is set by "Beste meneer Van Leeuwen," and "Met vriendelijke groet,"; the model uses "bij u". The 014 review accepted the same in sportschool.
12. **Deposit term.** The model states the statutory two weeks; a learner who writes "binnen een maand" still meets the criterion (it names a term the contract could state). The e-mail is undated, so the fourteen days after 31 August have passed by the time it is sent.
13. **Slugs and concurrent batches.** `ophalen`, `borg`, `dienstruil`, `werkschoenen`, `afvalpas`, `bedankje`, `aantekeningen`, `vrije-dag` are new in every part of the catalogue and in batches 016–025. Batches 026, 027, 029 and 030 appeared on disk from other sessions while this batch was being written and were checked afterwards: no slug or organisation name collides (029, the other B1 writing batch, has uitzendwerk, kustweekend, groepsresultaten, magnetron). Surface overlaps in other parts, allowed but worth knowing for form assembly: 030-kat-voeren (B1 speaking) has a neighbour feeding the cat during a holiday, the favour before departure where bedankje is the thanks after it; 027-verhuizen (A2 speaking) is a move; 026-koken-buurvrouw casts Fatima as the one doing a neighbour a favour.
14. **Wilgendam.** No municipality of that name exists, but it is a street in Noordwijk; it appears only in the `to` address. If a cleaner name is wanted, any other invented municipality works without touching body, criteria, sample or model.

## 8. Checker

`npm run batch:check content/batches/028-original.json`:

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

Author self-checks beyond the script: exactly one `null` quote per task and the other quote a verbatim substring of its sample; both criteria bilingual; every scaffold has `to`, `from`, `subject`, `salutation`, `body`, `closing` and exactly one `___`; the eight starters keys equal the eight ids in batch order, two starters each, each with an ellipsis; models 9–14 typed words, above the checker's minimum of 8; every full gap sentence read as prose (section 2); dates checked against the 2026 calendar; no sample or model repeats a body sentence; no organisation name found on the web; no cast name twice; the batch settings match the coordinator's list one to one.

SHA-256 at the time of writing:

- `content/batches/028-original.json`: `db72de8ea79048abc0e5d15795cadc19b9f44d47bc1283b6e8acb6130f2cc78e`
- `content/batches/028-starters.json`: `3d3dd85e8ba58d3fc073ea9a47d2b320c3bb7abad3c501973212b2205eacec94`
