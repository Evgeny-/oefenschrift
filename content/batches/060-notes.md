# Batch 060 author notes

This batch is an authorised replacement (rewrite) of six published B1 writing exercises. It follows the editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, sections 3.3, 3.5 and 4) and the coordinator's fix list (`tmp/content-fix-2026-10-14/spec/060.md`). The two learner reports of 7 October 2026 started the wider fix round. One said "I did what was asked and they said I didn't write it". The audit found four kinds of problem in these items:

- hidden criteria that score things the prompt never asks for;
- a criterion that fails a valid beginner's answer;
- character names that exist only in image briefs;
- a prompt with the wrong preposition, plus three model answers that contradict themselves or that the AI judge misreads.

| # | ID | Task type | What is fixed |
| --- | --- | --- | --- |
| 1 | `B1:writing:batch015-gemiste-werkdag:1` | deelschrijftaak, three pictures (criteria and starters hidden until review) | the meeting topic is now asked for in the prompt; one warehouse criterion; no names that only the briefs contain |
| 2 | `B1:writing:batch029-kustweekend:1` | deelschrijftaak, three pictures (criteria and starters hidden until review) | the incidental sunshine detail is gone; the rain criterion is looser; the model is coherent |
| 3 | `B1:writing:batch015-avondcursus:1` | deelschrijftaak, form | the experience criterion accepts "no experience yet" |
| 4 | `B1:writing:batch002-rooster:1` | zinstaak, bijzin after "omdat" | the prompt preposition is corrected and the repeated sentence removed |
| 5 | `B1:writing:batch003-reparatie:1` | zinstaak, te-infinitief after "om" | the model no longer uses "lenen" to mean "lend" |
| 6 | `B1:writing:batch038-inhalen:1` | zinstaak, te-infinitief after "om" | the model's time reference is no longer ambiguous |

Each item keeps its ID, its place in the order and its set membership. The following fields are value-identical to `tmp/content-fix-2026-10-14/base/060-base.json`:

- task type, domain, rubric and title;
- scaffold and form fields;
- images: `brief`, `alt`, `kind` and `size`;
- every field not listed below.

That base holds the published records with generated fields removed. No `revision`, image `file` or other generated field appears in this batch. Every item keeps `status: "draft"` and `targetLevelValidated: false`. This is AI editorial authoring: it does not validate CEFR level or exam equivalence.

## Reading and method

**What I read:**

- AGENTS.md, `spec/common.md` and `spec/060.md`;
- `docs/briefs/author.md` (the shared record contract and the rewrite rule);
- `content/blueprint.md` §1, §3, §4.8, §8 and §10;
- `content/reviews/rubric.md`;
- `docs/research/content-workflow.md` §3–4, §10 and "Optional sentence starters";
- the 015, 029 and 038 author notes and reviews, and the 049 author notes, for these items;
- `app/components/OpenExercise.tsx`, lines 280–310.

The component shows criteria before answering except for `zinstaak`, `picture-note`, cued tasks and `deelschrijftaak` with images. It hides starters before answering for `deelschrijftaak` with images, but shows them for `zinstaak`.

I also checked what the judge receives (`server/services.ts`):

- In the working tree, which has uncommitted changes I did not touch, it sends each picture's Dutch `alt` as `description` and its English `brief` as `scene`.
- For a zinstaak it sends `text_with_gap`, `grammar_target` and `sentence_must`, the last taken from `adequacyNote`.

**How I built it:** `build060.py` in the session scratchpad applies exact string replacements to the base. Each replacement asserts that it matches exactly once, and the script writes the batch with 2-space JSON indentation and a trailing newline. A field-level diff against the base then confirms that only the leaves in the next table changed, that key order is unchanged and that every image object is identical.

Criterion numbers follow the fix list's array index: C0 is the first criterion.

## Changes per item

Where a cell names one sentence or phrase of a long field, the rest of that field is unchanged.

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| gemiste-werkdag | `prompt` (sentences inserted after "Gebruik alle plaatjes.") | — | "Vertel bij het tweede plaatje ook waar het overleg over ging. Bedenk zelf een onderwerp." | C1 scores the meeting topic, but the hidden criteria never told the learner about it. The prompt now asks for it and says the topic is invented. C1 itself is unchanged. I chose announcing over dropping the topic because inventing a topic is the item's only "Bedenk zelf" demand. |
| gemiste-werkdag | `criteria[2]` | "Schrijf dat er een nieuwe collega is begonnen en dat iemand hem het magazijn heeft laten zien." / "Say that a new colleague has started and that someone showed him the warehouse." | "Schrijf wat er in het magazijn gebeurde." / "Say what happened in the warehouse." | The old criterion bundled two requirements. Also, the alt ("Een vrouw geeft een jonge man een hand in een magazijn en wijst naar de stellingen.") does not show that he is new. The new criterion is one requirement that matches the picture. It accepts a tour, a welcome or a new employee being shown around. |
| gemiste-werkdag | `sample` and `quotes[1]` | "Sabrina heeft verteld dat …" | "Een collega heeft verteld dat …" | The learner never sees the brief's name Sabrina. |
| gemiste-werkdag | `sample` and `quotes[2]` | "Er is ook een nieuwe collega, Modibo. Hij gaat in het magazijn werken, dus Sabrina heeft hem vanmiddag het magazijn laten zien." | "Er is ook een nieuwe medewerker. Hij gaat in het magazijn werken, dus een collega heeft hem vanmiddag het magazijn laten zien." | Neutral wording. The quote still shows what happened in the warehouse. The learner errors "gerepareert" and "dat hij is een aardige jongen" are kept. |
| gemiste-werkdag | `model` | "Sabrina legde uit dat …" | "Een collega legde uit dat …" | Brief-only name removed. |
| gemiste-werkdag | `model` | "Verder is er een nieuwe collega begonnen: Modibo." | "Verder is er een nieuwe medewerker begonnen." | Brief-only name removed. "medewerker" avoids repeating "collega". |
| gemiste-werkdag | `model` | "… heeft Sabrina hem vanmiddag alles laten zien, van de stellingen tot de heftruck." | "… heeft dezelfde collega hem daar vanmiddag alles laten zien, van de stellingen tot de heftruck." | Brief-only name removed. "dezelfde" matches the pictures, which show the same woman at the whiteboard and in the warehouse. "daar" makes the warehouse explicit for the new C2. |
| kustweekend | `criteria[1]` | "Schrijf dat het regende en dat u met uw fiets in een bushokje hebt gewacht." / "Say that it rained and that you waited in a bus shelter with your bicycle." | "Schrijf wat u deed toen het begon te regenen." / "Say what you did when it started to rain." | The old criterion was compound and demanded incidental details ("met uw fiets", "bushokje"). Picture 2 shows heavy rain and a shelter, so the learner who uses the picture says both anyway. The new criterion accepts "in een bushokje gewacht", "geschuild" or "onder een dak gaan staan". |
| kustweekend | `criteria[2]` | "Schrijf dat de zon weer scheen toen u in de haven patat at." / "Say that the sun was shining again when you ate fries at the harbour." | "Schrijf hoe de dag in de haven eindigde." / "Say how the day ended at the harbour." | The old criterion demanded an incidental detail. The new one matches picture 3: the woman in the sun on a harbour bench, eating fries and smiling. |
| kustweekend | `model` | "…, terwijl er in de buurt geen fietsenmaker was." | "…, terwijl ik geen reparatiesetje bij me had." | The old model contradicted itself: no repairer nearby, then a village repairer patched the tyre. The new clause gives a non-contradictory reason to push the bike, and the closing line "Dan neem ik wel een reparatiesetje mee!" now picks it up. |
| kustweekend | `model` | "Ik heb de fiets dus een half uur naar het dorp geduwd." | "Ik heb de fiets dus de rest van de weg naar de haven geduwd." | The destination is now the harbour that the story reaches, where picture 3 shows the bike against the bench. "het dorp" had no antecedent. |
| kustweekend | `model` | "Gelukkig kon een fietsenmaker in het dorp mijn band nog plakken." | (sentence removed) | That repair happened after the harbour scene. The day now ends in the harbour, as the new C2 and picture 3 have it. |
| avondcursus | `criteria[1]` | "Schrijf welke ervaring u al hebt met boekhouden. Bedenk dit zelf." / "Say what experience you already have with bookkeeping. Think of this yourself." | "Schrijf of u al ervaring hebt met boekhouden en, zo ja, welke." / "Say whether you already have experience with bookkeeping and, if so, what experience." | The course is "Boekhouden voor beginners", so "Ik heb nog geen ervaring" must pass. "Bedenk dit zelf" no longer fits a yes/no question; the prompt still says "Sommige gegevens moet u zelf bedenken." |
| rooster | `prompt` | "U kunt woensdagavond niet werken door uw opleiding. Geef in de open plek deze reden. Maak de zin op de open plek af." | "U kunt woensdagavond niet werken door uw opleiding. Maak de zin op de open plek af met deze reden." | "in de open plek" was the wrong preposition, and the instruction repeated itself. This is the fix list's wording. |
| reparatie | `model` | "mij uiterlijk op 17 april een tijdelijke laptop te lenen" | "mij uiterlijk op 17 april een leenlaptop te geven" | "lenen" means "borrow". The judge read the old model as "no solution" in 5 of 18 runs. "leenlaptop" is the `adequacyNote`'s own example of a solution. The model is still om + te-infinitive (9 words), with a deadline after 15 April. |
| inhalen | `model` | "de les van maandag deze week bij een andere groep in te halen" | "de les van maandag nog deze week bij een andere groep in te halen" | "maandag deze week" could be read as "this week's Monday". "nog deze week" ties the make-up to the coming Wednesday or Friday that the e-mail offers. |

No other field changed in the batch. In particular, these are byte-identical to the base:

- gemiste-werkdag C0, C1, C3 and `quotes[0]`;
- kustweekend C0, C3, the sample and all quotes;
- avondcursus C0, C2, the form labels, sample, quotes and model;
- all zinstaak samples, criteria, scaffolds, `grammarTarget` and `adequacyNote` values.

## Starters (`content/batches/060-starters.json`)

The file has all six IDs in batch order, one fragment per criterion in criteria order, and every fragment contains "…". Three fragments changed because their criterion changed:

| Item | Index | Before | After | Completion test |
| --- | --- | --- | --- | --- |
| gemiste-werkdag | 2 | "Er is een nieuwe collega begonnen, die …" | "Daarna heeft … in het magazijn …" | "Daarna heeft een collega de nieuwe medewerker in het magazijn alles laten zien." / "Daarna heeft onze chef in het magazijn een nieuwe collega welkom geheten." |
| kustweekend | 2 | "In de haven scheen …, dus …" | "Uiteindelijk kwam ik aan in de haven, waar …" | "Uiteindelijk kwam ik aan in de haven, waar ik in de zon patat heb gegeten." |
| avondcursus | 1 | "Ik heb al ervaring met boekhouden, want …" | "Met boekhouden heb ik … ervaring, want …" | "Met boekhouden heb ik nog geen ervaring, want ik heb altijd in de bouw gewerkt." / "Met boekhouden heb ik al wat ervaring, want ik heb drie jaar de administratie van een winkel gedaan." |

Why each changed:

- **gemiste-werkdag:** the old fragment assumed the "new colleague" reading, which the picture does not establish. It also did not point at the warehouse. The new one leaves both the people and the event open, and "Daarna" adds a sequence word without a fact.
- **kustweekend:** the old fragment steered towards the sunshine detail. The new one points at the ending in the harbour and leaves it open.
- **avondcursus:** the old fragment assumed experience. The new one works for both answers.

The kustweekend fragment for C1, "Toen het begon te regenen, …", fits the new C1 exactly, so it is kept. All other fragments are unchanged:

- gemiste-werkdag 0, 1 and 3;
- kustweekend 0, 1 and 3;
- avondcursus 0 and 2;
- every zinstaak fragment.

No new fragment states a task fact, and none is a complete answer.

## Prepared feedback audit

Each sample misses exactly one criterion: it has one `null` quote, and every other quote is a verbatim substring of the sample. Each model meets every criterion.

| Item | Null | Sample misses | Model meets each criterion with | Model words (before → after) | Sentences, mean, longest |
| --- | --- | --- | --- | --- | --- |
| gemiste-werkdag | 3 | It closes with "Tot snel!" and asks Julio nothing. | C0 machine broken, repaired at ten. C1 meeting at the whiteboard; topic: new telephone system. C2 the colleague showed the new employee everything in the warehouse. C3 "Hoe gaat het nu met je?" | 132 → 134 (50–150) | 10, 13.4, 22 |
| kustweekend | 1 | Rain and shelter are never mentioned; it skips picture 2. | C0 flat tyre mid-dyke. C1 waited in a bus shelter until it was dry. C2 the sun broke through; fries on a bench; happy again. C3 two questions. | 134 → 124 (50–150) | 10, 12.4, 22 |
| avondcursus | 0 | It gives one reason; "Ik wil dat goed leren" elaborates on it, as noted in 015. | C0 two reasons. C1 no course yet, but three years of shop administration and the till. C2 Tuesday plus a reason. | 116 (unchanged) | 6, 19.3, 25 |
| rooster | 0 | It gives a birthday as the reason. | — | 9 (unchanged) | one clause |
| reparatie | 0 | It asks for opening hours: no solution, no deadline. | — | 10 → 9 (5–25) | one clause |
| inhalen | 0 | It asks to move the test. | — | 13 → 14 (5–25) | one clause |

For the two picture tasks, sample errors are kept as typical learner errors. The gemiste-werkdag sample grew from 76 to 77 words; the kustweekend sample is unchanged at 82.

No prompt sentence of four or more words appears in any sample or model (case-insensitive check). No brief-only name (Sabrina, Modibo, Karim, Roos) appears in any prompt, sample, quote or model.

## Zinstaak insertion check

Each completion was read inside the printed sentence:

- rooster: "Ik kan die dienst niet doen, omdat ik op woensdagavond altijd les voor mijn opleiding volg." — finite verb last, lower case after the comma, and the printed full stop follows.
- reparatie: "Ik verzoek u om mij uiterlijk op 17 april een leenlaptop te geven." — om + te + infinitive at the end; no capital; the printed full stop follows.
- inhalen: "Is het mogelijk om de les van maandag nog deze week bij een andere groep in te halen?" — "te" inside the separable verb; the printed question mark follows.

The unchanged samples are also grammatical completions: "omdat ik die avond een verjaardag van mijn neef vier", "om mij een overzicht van uw openingstijden te sturen" and "om de toets op een latere moment te maken". The last one keeps its tolerated gender error "een latere moment". Their single miss is adequacy.

The unchanged zinstaak starters still frame correct completions. The rooster and reparatie starters complete to the models. The inhalen starter "de les van maandag bij … in te halen" completes to "de les van maandag bij een andere groep in te halen", which is adequate and grammatical. It does not contain the ambiguous "maandag deze week", so it needs no change.

## Media consequences

- **Audio:** none. B1 writing has no audio, and no listening script, speaking prompt, cue or KNM option is touched.
- **Pictures:** none. All six image briefs and alts are unchanged, so no picture is redrawn.
- **Generated fields:** none was added.

## Key distribution

Not applicable: these are open tasks with no closed questions. The checker reports `Keys: {}`.

## Doubts for the reviewer

1. **gemiste-werkdag prompt.** I announced the topic instead of dropping it. The prompt grows from 67 to 82 words, and "het overleg" now names picture 2 for the learner. That is one word the hidden criteria used to keep back. If you prefer dropping the topic instead, C1 would become "Schrijf dat er een teamoverleg was.", the prompt sentences would go, and the starter "Om … uur hadden we een teamoverleg over …" would need a new ending.
2. **gemiste-werkdag C0 is still compound** ("kapot … en … gerepareerd"). It was not on the fix list. Picture 1 shows the repair, and "kapot" follows from it, so I left it.
3. **gemiste-werkdag reading of picture 3.** The sample and model still treat the young man as a new employee. The brief says so; the alt does not, but the handshake and clipboard support it. The criterion no longer requires it. Please check that "dezelfde collega" reads naturally; the alternative is "een collega" twice.
4. **kustweekend C1 is now open** ("wat u deed toen het begon te regenen"). An answer that contradicts picture 2, such as "ik ben doorgelopen", would meet the wording. "Gebruik alle plaatjes" and the judge's picture descriptions should catch it. A tighter single requirement would be "Schrijf waar u wachtte toen het begon te regenen."
5. **kustweekend model.** I removed the repair sentence rather than moving it, so the tyre is still flat when the story ends; the closing joke covers this. "terwijl ik geen reparatiesetje bij me had" keeps the reviewed "terwijl" pattern; "en natuurlijk had ik geen reparatiesetje bij me" is the more colloquial alternative.
6. **kustweekend model, sentence 2.** "Zaterdag wilde ik over de dijk naar de haven fietsen." restates the prompt clause "Op zaterdag wilde u over de dijk naar de haven fietsen" in the first person. This predates the batch, passed the 029 review and is not on the fix list, so it is unchanged. It is not a verbatim copy.
7. **avondcursus form label.** "Welke ervaring heeft u al met dit onderwerp?" still presupposes some experience. I left it because the fix list names only the criterion, and "Ik heb nog geen ervaring" is a natural answer to that label that the new criterion accepts. The criteria are visible for this form. If you want the label as wide as the criterion, as the 015 review did for field 6, use "Heeft u al ervaring met dit onderwerp? Zo ja, welke?". The same pattern exists outside this batch in `B1:writing:batch029-uitzendwerk:1` C1 ("Schrijf welke werkervaring u hebt. Bedenk dit zelf."). It is less of a problem in a job registration, and it is not in scope.
8. **reparatie model.** I chose "een leenlaptop te geven" over "een vervangende laptop uit te lenen". It reuses the `adequacyNote` word, and the inhalen item already models the separable "te". Both are on the fix list.
9. **Judge input** (not content). In the working-tree `server/services.ts`, the judge receives each picture's brief as `scene`. The gemiste-werkdag briefs still name Sabrina, Modibo and Karim, so the judge's suggested wording could reintroduce names the learner never saw. This is worth checking in the feedback evaluation. Briefs must not change.
10. **inhalen scenario dates.** "maandag 14 september" is a Monday in 2026 and is now in the past. This is unchanged and not in scope.

## Checker output

`npx tsx scripts/batch-check.ts content/batches/060-original.json`

```text
Checked 6 items, 0 questions. Keys: {}. Options: {}.
  info  6 of 6 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
