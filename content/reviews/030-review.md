# Batch 030 editorial review (B1 Spreken, eight korte taken and their sentence starters)

**Verdict: pass** in the proposed file. Eight tasks pass; two carry an edit (one domain label, one prompt word); nothing is rejected; the starters file passes unchanged.

**Reviewed source:** `content/batches/030-original.json`, SHA-256 `2220555455c141dde1d5314ebb721daadf8ca797c8fe904ebd40a0503123ad0c` (the hash the coordinator expected and the author recorded).
**Proposed file (the bytes to adopt):** `content/batches/030-proposed.json`, SHA-256 `5202a8f4e55293f20dfec1b030977e2da11ce82a9b7a3fdb783e4a48d888e764`; it differs from the original only in the two fields listed under Edits (both files serialise with `JSON.stringify(…, null, 2)` plus a newline, and the diff is two lines).
**Starters:** `content/batches/030-starters.json`, SHA-256 `0d35ea81a3b1e8fdd2200ffed7fad23ff8c0e0dc101d24320b40138195e113b1`, unchanged (no criterion changed); no `030-proposed-starters.json` is written.
**Review date:** 2026-09-11. Fresh context; the tasks and starters were judged before the author's notes and sixteen doubts were read. `content/batches/031-original.json` (eight middellange taken, SHA-256 `093d4f9a…`) appeared while this review was in progress and was read for diversity.

`npm run batch:check content/batches/030-proposed.json`: "Checked 8 items, 0 questions. Keys: {}. Options: {}. No failures, no warnings." (the original gives the same output).

## Task verdicts

| id | Act, domain | Verdict | Level | One-line reason |
| --- | --- | --- | --- | --- |
| `B1:speaking:batch030-uitlaat:1` | ask two questions, overig | pass | comparable | Cue garage (`m-shop`, `u`) 27 words opens the floor without giving price or time; criteria 1–3 all asked by the prompt; null 1 reliable (no cost question); two errors; model 44 words meets all three with two indirect questions and an omdat-clause. |
| `B1:speaking:batch030-eindpresentatie:1` | ask two questions, educatie | pass | comparable | Cue docent (`f-adult`, `u`) 26 words answers nothing; all three asked; null 2 reliable (nothing about notes); two errors; model 45 words meets all three. |
| `B1:speaking:batch030-kantoortuin:1` | describe a picture, werk | pass | comparable | Cue Julio (`m-young`, `je`) 26 words; landscape still of the empty open-plan office; criteria 1–2 observable (open room, at least two objects), 3 (opinion) asked by the prompt; null 3 reliable ("Nu is het stil, omdat …" is a fact, not an evaluation); model 44 words. |
| `B1:speaking:batch030-teamwerk:1` | preference with a reason, werk | pass | comparable, fuller end | Cue manager (`f-adult`, `je`) 27 words; the concession ("één voordeel van de manier die u niet kiest") is in the prompt; null 3 reliable (two reasons for the team, nothing for alone); model 43 words; the mixed register (manager `je`, learner's `u` fits) clashes nowhere. |
| `B1:speaking:batch030-kat-voeren:1` | two instructions, overig | pass | comparable | Cue mevrouw Bakker (`f-older`, "jullie") 25 words; picture anchors the amount (scoop) and the place (kitchen, bag by the bowl); null 1 reliable ("elke keer" states no frequency); two errors; model 45 words with a polite imperative. |
| `B1:speaking:batch030-afsluiten:1` | two instructions, werk | pass (prompt word edited) | comparable | Cue Jari (`m-young`, `je`) 25 words; first step, next step and whom to call all asked; null 3 reliable; two errors; model 44 words with a conditional inversion; prompt now uses the task's verb "afsluiten". |
| `B1:speaking:batch030-rijexamen:1` | react to news, overig (relabelled) | pass (domain edited) | comparable, fuller end | Cue Farah (`f-young`, `je`) 20 words carries the news alone; reaction, a question and the celebration proposal all asked; null 2 reliable (no question); two errors; model 44 words in five short spoken sentences. |
| `B1:speaking:batch030-voetbalavond:1` | decline an invitation, werk | pass | comparable | Cue Ricardo (`m-adult`, `je`) 27 words carries the invitation alone; decline, reason and another-time proposal all asked; null 2 reliable (regret and a love of football are not a reason); two errors; model 44 words. |

Checked per task (all eight, on the proposed bytes): prompt shape (situation, "U hoort eerst …", the official instruction with its count, then the "ook" sentence); cue 20–27 words, spoken Dutch, role present in `config/voices.json` and matched to the speaker; three bilingual criteria whose English is accurate; every criterion asked for by the prompt (this batch already applies the 016 policy: no criterion is a proposition a learner who follows the prompt can omit, and criterion 3 is either asked for in a "Zeg/Noem/Stel … ook" sentence or anchored in the picture); exactly one `null` per task at a criterion the sample really misses and no criterion the sample meets by accident; quotes verbatim; two typical learner errors per sample and no unintended third (verb second ×5, missing article ×4, wrong perfect auxiliary ×3, dropped "het" ×2, article gender ×1, subordinate order ×1); models 43–45 words in three to five sentences, averages 8.8–15.0, longest sentence 22, every model meeting every criterion in B1 Dutch (omdat, want, als, waar, zoals, dus, indirect questions, one conditional inversion, one passive perfect) and fitting 20 seconds at 2.3–2.5 words per second; no prompt or cue sentence in a sample or model (longest shared run three words); registers consistent within each task; no invented organisation, shop or street name anywhere, so no web check was needed; no §9 avoid-list subject; both pictures object-only with a "No text" clause, a Dutch `alt`, `kind: drawing` and a size that exists in `config/illustration.json`.

Level: `content/exemplars/` still does not exist; each task was compared with the official Deel-1 description ("Spreken I" in `docs/research/exam-blueprints-2026-09-10.md`) and with the calibrated batch 016. All eight are comparable; teamwerk and rijexamen sit at the fuller end (a concession; three moves in twenty seconds), as 016's toets-computer and pensioen did. No task is off-level.

## Edits (applied in the proposed file)

1. `B1:speaking:batch030-rijexamen:1` → `domain`: `educatie` → `overig`. Required. The course frame is inert: strip "zit bij u in de taalcursus … voor de les" and the act, cue, criteria, sample and model stay identical, whereas 016's pensioen (werk) and open-dag (educatie) lose their premise without the workplace or the study context. The tested act is social (a friend's private news, a celebration); her driving lessons are not the candidate's education. The author's note says the frame was chosen to reach the count, which is what "forced" means. Spread becomes werk 4 / educatie 1 / overig 3 (accepted in advance by the coordinator).
2. `B1:speaking:batch030-afsluiten:1` → `prompt`: "… voor het eerst alleen de winkel." → "… voor het eerst alleen de winkel af." Recommended. The title, the cue ("jij sluit de winkel toch vaak af?"), the sample and the model all use "afsluiten" for the closing routine; the narrated prompt now uses the same verb instead of the looser "de winkel sluiten". Prompt 45 words. Criteria, sample, quotes, model and starters untouched.

No sample, quote, criterion, model or starter changed; the quote checks and the null positions (uitlaat 0, eindpresentatie 1, kantoortuin 2, teamwerk 2, kat-voeren 0, afsluiten 2, rijexamen 1, voetbalavond 1) are the same in both files.

## Rejected

None.

## Decisions on the author's sixteen doubts

1. rijexamen domain: `overig` (edit 1).
2. teamwerk and A2 `alleen-samen` (009): accepted as different items. Different part and exam (never one set), a spoken cue about one concrete project instead of two pictures, and a concession (an advantage of the way not chosen) instead of "iets over het andere plaatje"; the same reasoning the 016 review used for klas-thuis versus toets-computer. The author's alternative third element ("wat u nodig hebt om goed te kunnen werken") is vaguer and not taken.
3. Two "zullen we" proposals as criterion 3 (rijexamen, voetbalavond): kept. Different acts (react, decline); a proposal is the productive route of a polite refusal (016 open-dag's "Bedank Hasan of stel iets anders voor") and the prompt asks for it. The thank-you alternative is not taken.
4. Register mix: kept. `u` from the garage and the docent (016 decision), `je` from the friends, the new colleague and the colleague, `je` from the manager to an employee (as 017 cursusverzoek), "jullie" only from mevrouw Bakker answered with `u` (as 009); no sample or model clashes with its cue, and a learner's `u` to the manager is not an error. The `u` rewrite of the manager's cue is not taken.
5. The garage recognising the caller: kept. The prompt motivates it ("noemt uw naam"), 016 slaapkamerraam's landlord cue was accepted on the same basis, and the sample's and model's "Ja, dat is mijn auto / dat klopt" depend on it.
6. uitlaat and A2 listening `garage` (022): accepted (receptive A2 brakes-and-battery fragment versus a productive B1 call about an exhaust). The nearer neighbour is 016 slaapkamerraam; see Diversity.
7. kantoortuin without people: right; the `alt` describes the room as 016 roosterbord's did.
8. Error types: kept as written. The dropped "het" and the gender error are typical B1 learner errors that the official scale grades differently (larger and small), which is useful feedback material; 016 accepted a congruence error on the same reasoning.
9. Speaker labels "Garagemedewerker", "Docent", "Leidinggevende": kept; this is the convention of the integrated 016 and 017 items ("Studieadviseur", "Docent", "Leerkracht", "Leidinggevende").
10. Same topic in the eindpresentatie sample and model ("gezond eten"): kept; it shows the same learner doing the task better, and no rule asks for different content.
11. kat-voeren criterion 2 and the picture: fine; "een half bakje" without the scoop meets it, and "hoe vaak (of hoe laat)" rightly accepts times of day.
12. Models 43–45 words: keep (016 decision: 18–20 seconds at a natural pace; the samples show the learner's length).
13. afsluiten model with three steps and a female bedrijfsleider: fine; extra steps fail no criterion.
14. Audio: see Media notes.
15. Starters stay in the batch file: right; `npm run content:integrate` merges them on `starters_verdict: "pass"`.
16. The name Jari: kept. §8 names carry no fixed identity anywhere in the bank (Farah is a roster planner in 010, a bus driver in 012, a station passenger in 023 and a friend in 014; Jari is already an adult docent in the integrated 025 and a schoolchild in the draft 028), so renaming here would not produce one identity per name; only the illustration cast has fixed traits, and Jari is not in it. If the coordinator adopts a one-identity rule later, "Yusuf" replaces Jari in the prompt, the cue speaker and criterion 1 in a focused revision.

## Sentence starters

Keys match the eight ids in batch order; exactly one starter per criterion in criteria order, each with "…"; none equals or is contained in its model; none states a fact the prompt or cue does not give; register follows the cue (`u` in uitlaat and eindpresentatie, `je` where the cue is informal, no address form in kat-voeren and teamwerk). Completion test (starter → natural completion, criterion alignment): uitlaat "Kunt u mij zeggen wat de reparatie kost?" / "Weet u al wanneer de auto klaar is?" / "Ik heb de auto vrijdag nodig, omdat ik moet werken." — pass; eindpresentatie "… hoe lang de presentatie moet duren?" / "Mag ik tijdens de presentatie aantekeningen gebruiken?" / "Mijn onderwerp is gezond eten, omdat …" — pass; kantoortuin "Het is een grote open ruimte, waar iedereen samen zit." / "Er staan bureaus en planten." / "Ik vind het er fijn, omdat er veel licht is." — pass; teamwerk "Ik werk het liefst in een team." / "Ik kies daarvoor, omdat je elkaar kunt helpen." / "Alleen werken heeft ook een voordeel: je bepaalt je eigen tempo." — pass; kat-voeren "Ze krijgt twee keer per dag eten: 's ochtends en 's avonds." / "Elke keer krijgt ze één schepje." / "De zak met brokjes staat in de keuken." — pass; afsluiten "Sluit eerst de kassa af en leg het geld in de kluis." / "Daarna zet je het alarm aan." / "Als iets niet lukt, kun je de bedrijfsleider bellen." — pass ("Als er iets niet lukt" would be a touch more idiomatic; not changed, no criterion moved); rijexamen "Gefeliciteerd! Wat knap!" / "Hoe ging het? Moest je inparkeren?" / "Zullen we koffie drinken om het te vieren?" — pass; voetbalavond "Dat is aardig van je, maar ik kan niet." / "Vrijdag kan ik niet, omdat mijn schoonouders komen." / "Zullen we een andere keer samen lunchen?" — pass. Starters verdict: pass at `0d35ea81…`.

## Diversity and set assembly

Within the batch: eight settings (a garage by phone, a course after class, a new office by phone, a project talk with a manager, a neighbour at the door, a clothing shop, before a language lesson, a transport firm), six acts in the requested 2/1/1/2/1/1 counts, eight counterparts, six voice roles none more than twice, two pictures in different acts, `u` cues 2, `je` cues 5, one neutral. No slug or subject repeats the catalogue or the drafts 026–029 (026 feest-thuis is an A2 place choice; 028 aantekeningen is a written note request; teamtaak in the catalogue is a task division, not a preference).

Against batch 031 (middellang: portemonnee-tram, taalcafe-avond, verwarming-verhuurder, cursus-engels, afvalcontainers, werktelefoon, sollicitatietips, brandalarm): no shared subject, counterpart or name; the nearest pairs are brandalarm ↔ afsluiten (both instruct a new colleague, an evacuation plan versus closing a shop), verwarming-verhuurder ↔ uitlaat (both phone calls about a repair, convincing a landlord versus asking a garage) and taalcafe-avond ↔ rijexamen (both framed in a taalcursus with a fellow student, narration versus reaction); 031's author kept Jari, Ricardo, Farah, Julio and mevrouw Bakker out of that batch, so a form built from 030 and 031 puts no name in two roles.

Against batch 016 the eight acts repeat by design (this is the second Deel 1 of eight), each with a different subject, counterpart and third element. Two pairs are closer than the rest and should not share a mixed drill: uitlaat ↔ 016 slaapkamerraam (both repair calls asking when and about money, to a garage versus a landlord, with different third elements) and kat-voeren ↔ 016 medicijn-school (both frequency-plus-amount instructions to a caretaker, a neighbour about a cat versus a teacher about a child's tablet). Less close: afsluiten ↔ 016 koffiemachine (both "eerst/daarna" to a new colleague, a procedure without a picture versus one from a picture), teamwerk ↔ 016 toets-computer (both preference plus a word about the other way). Cross-level echoes, never in one set: teamwerk ↔ A2 009 alleen-samen, rijexamen ↔ A2 009 rijbewijs, voetbalavond ↔ A2 listening 005 voetbal.

Domains after the relabel: werk 4, educatie 1, overig 3; together with 016 the sixteen korte taken are werk 7 / educatie 4 / overig 5.

Sets: drills of four korte with one ask and one instruct task each and no act twice — A: uitlaat, kantoortuin, kat-voeren, voetbalavond; B: eindpresentatie, teamwerk, afsluiten, rijexamen. Form: 030 is the Deel 1 of the second Spreken I mock (016 the first); a suggested order alternating acts and domains: uitlaat, kantoortuin, eindpresentatie, teamwerk, kat-voeren, rijexamen, afsluiten, voetbalavond. Deel 2 of that form is batch 031 once it passes review (no item, subject or name shared with 030; in the form keep brandalarm away from the slot right after afsluiten and verwarming-verhuurder away from the slot right after uitlaat).

## Media notes

- Audio (eight cues plus eight narrated prompts): Garagemedewerker → `m-shop` (Jerry, repair service), Docent and Leidinggevende → `f-adult` (Esmee; different items), Julio and Jari → `m-young` (Nick), Mevrouw Bakker → `f-older` (Hanneke), Farah → `f-young` (Roos), Ricardo → `m-adult` (Robert); all roles exist in `config/voices.json` and fit the cast ages. Round-trip points: "Ah ja" (uitlaat), "Hé" (kantoortuin, afsluiten, voetbalavond), "collega's" and "pizza's" (voetbalavond), "in één keer!" (rijexamen); numbers only in words ("acht uur"); colons in the prompts ("Stel twee vragen: …") as pauses. No digits or "'s" in any prompt or cue.
- kantoortuin (still, 1024×640): confirm one open room (no cubicle walls), plants clearly visible along the windows, blank screens, nothing readable on the cabinet or walls; the row count is not scored.
- kat-voeren (single, 816×816): the scoop must be visible beside the bag (model: "met het schepje erbij"), the bag must carry no label or lettering, and the setting must read as a kitchen (criterion 3). A cat with no cast traits: nothing to match.

## For the coordinator

- `npm run batch:adopt 030` verifies `5202a8f4…` against the proposed bytes and, since no proposed starters file exists, `0d35ea81…` against the author's starters file; both are recorded in `030-review.json`.
- The domain relabel leaves educatie at one in this batch; if a later korte batch is commissioned, steer it towards educatie.
- The author's notes still say `educatie` for rijexamen and print the original afsluiten prompt; they are the author's record and were not edited.
- Batch 028 (draft, unreviewed) uses Jari for a schoolchild; no action here (decision 16).

## Limitations

AI editorial review without educator review, learner trials or level validation; B1 stays an unvalidated authoring target. Level verdicts compare the tasks with the official Deel-1 description and with batch 016, not with stored exemplars (`content/exemplars/` does not exist). The 20-second fit is a words-per-second estimate. The review covers text fields and image briefs; the generated cue audio, prompt audio and illustrations need their own review after production. The pass applies to the exact hashes recorded above.
