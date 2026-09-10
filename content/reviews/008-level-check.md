# Level check: batch 008 (A2 Schrijven)

Independent level check (blueprint section 12, step 5) of the 16 A2 writing tasks in `content/batches/008-original.json` (SHA-256 `f5101326a4bdda3df321d6505985a20e6e7d5bfea9710b6eed4f7d03602eb9a2`), 10 September 2026. The catalogue copies of these items differ from the batch file only in `status`, `revision` and the image `file` fields, so the text judged here is the text learners see.

## Method

1. Read before judging: `content/blueprint.md` sections 2, 4.4 and 10; `docs/research/exam-blueprints-2026-09-10.md` section 3.1 "Schrijven A2" (with section 4 on scoring and the writing rules in 6.5); `content/reviews/rubric.md`. Not read: `content/reviews/008-review.*` and `content/batches/008-notes.md`.
2. Yardstick: the official task as described in 3.1 — e-mails with a printed header and three or four bullets (formal to a teacher or manager, informal to a colleague or fellow student); wijkkrant pieces of at least three sentences with three guiding questions; forms with personal details and open fields; one note to a colleague listing three things to do from pictures. Scoring order: adequaatheid (0–3, 0 stops scoring), grammatica (0–2), spelling (0–2), coherentie (0–1), woordenschat (0–2).
3. Calibration items: `A2:writing:batch001-ladder:1`, `A2:writing:batch002-plant:1`, `A2:writing:batch003-loonstrook:1`. These are the pre-blueprint "message" format: three bullets, no header, models under 20 words. They sit below the official demand (3–4 bullets, printed header, 4–8 sentences), so I used them as a lower bound only; the official description is the reference. `content/exemplars/` (section 10) does not exist yet.
4. For each task the five questions of the brief: prompt level, demand of the criteria (A2 speech acts, nothing impossible from the prompt), model (grammar, vocabulary, length, every criterion met), scaffold and register, verdict. Heuristics from section 10 were computed for every prompt and model: word and sentence counts, longest sentence, subordinators (only omdat, als, dat, wanneer, toen allowed), tenses, less common words. Word counts below exclude digit tokens (two models contain a phone number).
5. All six drawings of the picture notes were looked at (`content/images-source/`), since a picture note is only on-level when each picture shows one readable action.
6. Two display facts shape the verdicts. `app/components/OpenExercise.tsx` prints the criteria as a bullet list under the prompt before the learner writes, for every task type. The feedback judge (`server/services.ts`) receives the Dutch criteria text, so the criteria carry the scoring content. Sentence starters (`content/batches/008-starters.json`) are a collapsed, opt-in aid and were left out of the verdicts.
7. Verdict scale: easier / comparable / harder than the official task of the same type. Flags: too easy, too hard, off-level, none.

## Table

| id (`A2:writing:batch008-…`) | taskType | register (scaffold, pronoun) | model words / sentences (longest) | verdict | flag |
| --- | --- | --- | --- | --- | --- |
| contract | email | formal, chef — Beste mevrouw Vermeer / Met vriendelijke groet — u | 55 / 7 (11) | comparable | none |
| groep | email | formal, docent — Beste meneer Van Dijk / Met vriendelijke groet — u | 59 / 7 (11) | comparable | none |
| huur | email | formal, woonstichting — Beste medewerker van … / Met vriendelijke groet — u | 50 / 7 (12) | comparable | none |
| bezorging | email | formal, winkel — Beste medewerker van … / Met vriendelijke groet — u | 62 / 9 (13) | harder | too hard (mild) |
| meerijden | email | informal, collega — Hoi Fatima / Groetjes — jij, je | 59 / 7 (14) | comparable | none |
| cadeau | email | informal, medestudent — Hoi Julio / Groetjes — je | 59 / 8 (10) | comparable | none |
| kast | email | informal, buurman — Hoi Karim / Groetjes — je | 54 / 8 (12) | comparable (light end) | none |
| oppassen | email | informal, vriendin — Hoi Mila / Groetjes — jij, je | 59 / 8 (14) | comparable | none |
| reizen | wijkkrant | first person, opening line "Dit is mijn tekst over …" | 47 / 6 (12) | comparable | none |
| gezond | wijkkrant | first person, opening line | 55 / 5 (14) | comparable (upper end) | none |
| boodschappen | wijkkrant | first person, opening line | 56 / 6 (11) | comparable | none |
| lantaarnpaal | form | neutral form, first person to the gemeente | 47 / 6 (10) | comparable | none |
| sportclub | form | neutral form, third person about the child | 56 / 5 (16) | comparable | none |
| nieuwe-patient | form | neutral form, u to the practice | 54 / 5 (15) | comparable | none |
| restaurant | picture-note | informal colleague — Hallo Roos / Groeten — je | 49 / 7 (10) | easier as displayed | too easy |
| supermarkt | picture-note | informal colleague — Hoi Sem / Groeten — je | 46 / 6 (15) | easier as displayed | too easy |

Prompts: 25–50 words, four to eight sentences, no sentence over 14 words. Models: no sentence over 16 words, averages 6.8–11.2; subordinate clauses only with omdat, als and dat; coordination with want, maar, en and the adverbs daarom, daarna, dan; present and perfect tense, "gaan" future, the preterite "was" once. Every model meets every criterion of its task, and every scaffold matches its addressee with the pronoun held throughout the model.

### Item notes

- **contract.** Prompt 36 words in six sentences of at most 10 words, all everyday ("kledingwinkel", "contract stopt"). Four bullets: the end date and the wish to stay are in the prompt, the reason is invented, the fourth is a request for a meeting — the official mix of restating and adding. Model 55 words, 7 sentences; omdat-clause with verb-final order, perfect tense; "binnenkort" the only lower-frequency word. Formal register held ("Ik hoor graag van u"). Comparable.
- **groep.** Prompt 41 words; "taalcursus" and "overdag" are learner-context core words. Bullets: current group, reason (in the prompt), wanted group with an invented day and time, ask. The one thing the learner must produce unaided is a day-and-time phrase ("op donderdagochtend om negen uur"), squarely A2. Model 59 words, 7 sentences, inversion after "Sinds vorige week" and "Daarom"; "u" kept. Comparable.
- **huur.** Prompt 36 words, longest sentence 8. "opzeggen" and "inleveren" are the two lower-frequency words; both are the heart of the situation and the subject line repeats "Huur opzeggen". Bullets: invented address, reason (in the prompt), invented end date, question about the keys. Model 50 words, 7 sentences; "Vanaf 1 december huur ik …" inversion, omdat-clause; "u" kept. Comparable.
- **bezorging.** See flagged tasks.
- **meerijden.** Prompt 50 words — the longest — but six sentences of at most 14 words; "werk aan de weg" is transparent. Bullets: reason (in the prompt), request, where and when (invented), something in return (invented). "terugdoen" in bullet 4 is the least common word in the batch's bullets; the English gloss covers it and the model shows the natural realisation ("Ik betaal graag mee aan de benzine"). Model 59 words, 7 sentences; "Jij komt toch met de auto?" is good informal Dutch; jij/je kept. Comparable.
- **cadeau.** Prompt 35 words. Bullets: reason, present (invented), amount (invented), ask Julio along. Bullet 1 is not marked "Bedenk zelf" although the prompt only implies the reason (the course ends); any A2 answer ("De cursus stopt", "De docent is aardig") satisfies it, so nothing is impossible. Model 59 words, 8 sentences of at most 10 words; "je" kept. Comparable.
- **kast.** Prompt 43 words. Three bullets — reason (in the prompt), request, day and time (invented) — the official three-bullet form; two of the three are restatements, so adequacy is cheap and the learner's own contribution is one time phrase. Model 54 words, 8 sentences; "Alleen krijg ik de kast niet naar boven" is the one idiomatic sentence an A2 learner would not write (they would write "Ik kan de kast niet alleen dragen"); "je" kept. Comparable, light end — the natural opener.
- **oppassen.** Prompt 37 words. Bullets: request, reason (in the prompt), two clock times (invented), bedtime (invented). Dutch clock times ("half zeven", "half elf") are exactly what the official exam tests. Model 59 words, 8 sentences; "te jong om alleen thuis te blijven" is the top of A2 but common; jij/je kept. Comparable.
- **reizen.** Standard wijkkrant frame (36 words) with the three guiding questions how, how long, opinion. Model 47 words, 6 sentences; als-clause with inversion, "want"; answers all three and adds two sentences. Comparable.
- **gezond.** Frame 30 words. Question 3 ("Wat vindt u moeilijk aan gezond leven?") asks for a concrete difficulty, not an argument. Model 55 words in only five sentences (average 11, the highest in the batch): a 14-word sentence with "ook als het regent", a double "en", and the fronted superlative "Het moeilijkste vind ik snoep". Correct and comprehensible, but the densest model of the batch; an A2 learner's version would be six or seven shorter sentences. Comparable, upper end.
- **boodschappen.** Frame 30 words; the most concrete questions (where, when, opinion). Model 56 words, 6 sentences; fronted object "Brood koop ik …", want, maar, daarom. Comparable — the easiest wijkkrant.
- **lantaarnpaal.** Prompt 39 words, sentences of at most 8; "lantaarnpaal" is the one lower-frequency word and the next two sentences explain it (the light does not work, the street is dark). Six personal-data fields, three open fields, one choice — the official municipal-complaint shape. Criteria: what, where exactly, since when (the prompt gives "al een week"; a date or "sinds een week" both work), reply choice. Model 47 words, 6 sentences; "Daardoor" the only connector above the basic set. Comparable.
- **sportclub.** Prompt 25 words. The largest form (eleven fields: seven personal-data, one choice, three open). Open questions: training days (invented), previous experience and where, reason. Model 56 words, 5 sentences, one 16-word list sentence (days and times), "heeft gevoetbald", omdat-clause; third person kept. Comparable. Bullet 3 ("… en waar") presupposes a "ja"; a learner who writes "nee" has met it.
- **nieuwe-patient.** Prompt 29 words; "zorgverzekering" is a KNM-core word the learner only has to fill with a name. Six personal fields, three open, one choice (the choice is not a criterion — harmless). Criteria: why this practice (the prompt's "U bent verhuisd" supplies it), last visit (invented), days and times (invented). Model 54 words, 5 sentences, one 15-word compound sentence, preterite "was"; "u" to the practice. Comparable.
- **restaurant, supermarkt.** See flagged tasks.

## Flagged tasks

### bezorging — harder, too hard (mild)

The situation and instruction are A2 (44 words, sentences of at most 14 words, "bezorgt" is daily vocabulary) and the model is correct, formal and consistent ("u" throughout, "Kunt u de wasmachine op donderdag 15 oktober bezorgen, na twee uur 's middags?"). The load is in the bullets: four bullets carry six content elements — reason, day, time, address, phone number, a call-first request — and five of them must be invented ("Bedenk zelf" three times). The other four-bullet e-mails in the batch carry four or five elements; the official e-mails carry three or four, occasionally one bullet with two parts ("wanneer en waar"). The model needed 62 words and 9 sentences, outside the 4–8 sentences of blueprint 4.4 and 15 words above the next-longest model in the batch. What would make it on-level: drop "uw adres en" from bullet 3 (the shop has the address from the purchase; keep the phone number, which the call-first request needs) or move the address into the printed header as an order line, and trim the model to eight sentences by dropping "Dan doe ik meteen open." That leaves five elements and a model of 50–55 words, in line with groep and oppassen.

### restaurant and supermarkt — easier as displayed, too easy

The official picture note gives a situation, three pictures and "Schrijf drie dingen op"; the candidate has to find the words for what the pictures show. That lexical step — tafel dekken, ramen schoonmaken, glazen afwassen; melk in de koeling, winkelwagens halen, de vloer vegen — is the whole difficulty of the type and where the woordenschat points are earned. In these two tasks the same three phrases stand in the criteria, which `OpenExercise.tsx` prints under the prompt before the learner writes, so the task collapses to turning "zij moet de tafels dekken" into "Wil je de tafels dekken?". Everything else is on-level: the prompts (38 words, eight sentences of at most 6 words, the official wording "Kijk naar de plaatjes … Schrijf drie dingen op"), the drawings (all six unambiguous, one action each, the same character throughout, no text), the scaffold (Hallo Roos / Hoi Sem, Groeten) and the models (49 and 46 words, 6–7 sentences, eerst/daarna/ook sequencing, "je" kept).

What would make them on-level: because the feedback judge receives the criteria text, the criteria should keep their specific wording; the fix is a display rule — for `taskType: picture-note` do not show the requirements list before writing (the prompt already says "Schrijf drie dingen op") and show it only in the self-check and feedback stage. If a content-only route is preferred, a per-criterion display text shown before writing ("Schrijf wat Roos op plaatje 1 moet doen.") with the specific phrase kept for the judge does the same. One model sentence to simplify in supermarkt: "want er staan er veel buiten" uses a double "er" that an A2 learner should not be shown as a model; "want er staan veel wagens buiten" says the same. After the display fix both tasks are comparable and should move later in the drill order (see conclusion).

## Notes that do not change a verdict

- **kast** is the lightest e-mail (three bullets, two restatements). If the author wants parity with the other e-mails, a fourth bullet "Schrijf wat u daarna samen doet. Bedenk zelf iets." is already realised by the model's coffee line; as it stands it is a legitimate three-bullet task.
- **cadeau** bullet 1 could carry "Bedenk zelf een reden" so the learner knows invention is expected; not required.
- **sportclub** bullet 3 could read "Schrijf of uw kind deze sport eerder heeft gedaan. Zo ja: waar?"; the 16-word model sentence could be split into two.
- **gezond** model: "Ik vind snoep het moeilijkst" is the plainer A2 form of "Het moeilijkste vind ik snoep".
- **huur, bezorging** salutations: "Beste medewerker van …" is understandable but the official practice booklets open letters to an organisation with "Geachte heer/mevrouw,"; the learner does not write the salutation, so this is exam likeness, not level.
- **Samples.** Each sample is a plausible A2 learner text that misses one bullet (the `null` in `quotes`) and contains two to four typical A2 errors — omdat with main-clause order, missing inversion ("Op vrijdag ik ben"), congruence ("Hij vind"), spelling of common words ("opzegen", "geholpt", "pannekoeken", "fruits"). These are exactly the error types the official grammar and spelling scales target; the samples support the level claim and calibrate feedback.
- **Sentence starters** are a collapsed aid and were not counted. Opened, they give the skeleton of every sentence ("Ik zit nu in de groep op …"); they should stay hidden in mock mode.
- **Blueprint section 10** says A2 open-task models are 20–45 words; fifteen of the sixteen models here are 46–62 words and all read as A2. The 20–45 figure fits the old three-bullet message format (calibration items under 20 words) and speaking answers, not a four-bullet e-mail with a printed header (section 4.4: 4–8 sentences). Suggest the coordinator restate section 10 per writing task type (e-mail 40–65 words, wijkkrant 35–60, form open fields 30–60, picture note 35–55) rather than have authors shorten models below the official demand. Not edited here.

## Conclusion

### A fair A2 writing drill

Thirteen tasks are comparable to the official task of their type, one is mildly harder (bezorging), two are easier only because of how the app displays them (restaurant, supermarkt); none is off-level. Every prompt is short, explicit and in the official "U … Schrijf de e-mail. Schrijf in hele zinnen." pattern, so an A2 learner can see what to write without help; every criterion asks for an A2 speech act (state a date, a reason, a time, a place, an amount; make a request; describe; list) and every criterion can be met from the prompt or by invention marked "Bedenk zelf". The models are correct A2 Dutch of the length the official task implies, hold their register, and meet all criteria.

Coverage matches the official spread: four formal and four informal e-mails, three wijkkrant pieces, three forms (municipal report, club registration, new-patient form), two picture notes, across eight domains. That is enough for three mock forms without a shared task (two e-mails + wijkkrant + form, or e-mail + wijkkrant + form + picture note). Against the calibration items from batches 001–003, batch 008 is a clear step up and sits at the official demand; if the older items stay in drills they are the warm-up layer and 008 the exam-like layer.

### Order in drills (one task per drill, section 11)

- E-mails: kast → cadeau → oppassen → meerijden (informal, rising amount of invention) → contract → groep → huur → bezorging (formal; bezorging last, after trimming).
- Wijkkrant: boodschappen → reizen → gezond.
- Forms: lantaarnpaal → nieuwe-patient → sportclub.
- Picture notes: as displayed today, restaurant and supermarkt are the easiest tasks in the batch and can open a sequence. Once the requirements list is hidden before writing they belong after the informal e-mails, restaurant before supermarkt (setting a table, cleaning a window and washing up are household actions every learner can name; the supermarket note needs shop words — koeling, winkelwagens, magazijn).

### Recommended actions

1. **bezorging** (author): trim bullet 3 to the phone number or move the address into the header; cut the model to eight sentences.
2. **restaurant, supermarkt** (coordinator/app): hide the requirements list before writing for picture-note tasks, or add a neutral display text per criterion; (author) replace "want er staan er veel buiten" in the supermarkt model.
3. Optional wording tweaks: cadeau bullet 1, sportclub bullet 3; the section 10 word-count figure for writing models.
