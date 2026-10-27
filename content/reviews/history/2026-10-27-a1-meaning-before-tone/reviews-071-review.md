# Batch 071 independent meaning-first review

All nine repaired A1 reading items pass after one reviewer edit. The final batch has 18 questions, with six keys each for A, B and C. Every consecutive three-item group has two keys per letter.

A fresh reviewer completed the four-dialogue semantic regression, saved the nine blind source findings, and reported phase 1 before receiving questions, options, keys or author notes. All final source meanings pass at coherence 4 or 5. The available model was used; no Opus review is claimed. Difficulty remains unvalidated.

| Item | Verdict | A1 target | Reason |
| --- | --- | --- | --- |
| plant-ogen | Pass | Compatible; unvalidated | Thirty-one words form a coffee invitation. The two keys are a concrete requested object and the writer’s explicit location. Simple present clauses and direct commands fit the local A1 reading target; paper eyes are untested, picture-supported vocabulary. |
| hoed-les | Pass | Compatible; unvalidated | Thirty-one words describe one birthday plan. Noor is named as the card recipient, and a direct command requests pencils. Tomorrow is consistent; no quantity calculation or inference is required. |
| winkel-sok | Pass | Compatible; unvalidated | Thirty words cover a completed coat repair, collection and payment. Friday and twelve euros are separate explicit facts. Knopen and ophalen have a concrete coat-repair context; no shop-hours inference or calculation remains. |
| eend-tas | Pass | Compatible; unvalidated | Thirty-eight words concern one traveller’s arrival and pickup. Train and two o’clock each have one direct sentence. The longest split unit is ten words; gift, plastic duck and bag remain untested concrete context. |
| beer-dokter | Pass | Compatible; unvalidated | Thirty-five words give one appointment time and a short arrival sequence. The first instruction itself identifies the desk, so q2 does not require a medical rule or a combined condition. Balie and wachtkamer are concrete appointment vocabulary. |
| taart-staart | Pass | Compatible; unvalidated | Twenty-six words give an invitation with one day and one arrival time. Each question uses one short exact sentence. The cake’s tail is concrete visual play; understanding its shape is unnecessary for the keys. |
| kat-werkt | Pass | Compatible; unvalidated | Thirty-one words state home working and request a call at four for computer help. No other people’s workplaces or competing times remain. The cat’s playful working claim does not control an answer. |
| koffer-les | Pass | Compatible; unvalidated | Thirty-five words announce a park lesson and request a coat. Both keys are explicit; the tree/flower vocabulary gives the lesson a reason to be in the park. The suitcase’s use as a chair is explained directly and remains untested. |
| hond-feest | Pass | Compatible; unvalidated | Thirty-four words state the beach destination and two bottles of water. The count needs no calculation and belongs to the outing. All dog pronouns have one clear referent; birthday and hat are untested visual context. |

## Edit applied

- `beer-dokter`, `questions[q2].options.A`: “Naar de dokter.” → “Naar de lift.” Going to the doctor can mean visiting the whole practice, including its desk. The lift is a separate destination; the source explicitly instructs the reader to go to the desk first.

The reviewer copied the authored repairs into `071-proposed.json`. All nine messages, their practical purposes and visual premises remain intact. No source-only field changed, so the final meaning packet retains the hash reviewed blind.

## Source and answer audit

Each message now serves a concrete purpose: a coffee invitation, birthday preparation, coat collection, station pickup, appointment arrival, cake visit, computer-help call, outdoor lesson or dog outing. The final source has no former grids of unrelated object locations, rooms, drinks, workplaces or prices. The single visual oddities remain grounded in their stated situations.

All 18 short evidence quotes occur verbatim and entail their keys. The JSON report records a proof and both distractor rationales for every question. Familiar alternatives may be absent from these short sources under the updated brief; the review does not add facts merely to seed wrong choices. Options do not overlap in location scope after the doctor-option repair. No key-only prompt echo, polarity cue or longest-in-words key was found.

Titles and Dutch alts describe untested visual subjects. Every brief was checked against both final questions and all their options. The isolated desk/cat must retain no domestic, office or shop clues; the teacher/suitcase must retain no indoor or outdoor scene clues. Current shared `stylePrefix` supplies the flat house style. No rendered image receives approval here.

## Fresh editorial ratings

Scores are 1–5 and concern the final text or written brief. They do not validate CEFR difficulty or rendered image quality.

| Item | Simplicity | Clarity | Variety | Visual interest | Task/image fit | Semantic coherence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| plant-ogen | 5 | 5 | 3 | 4 | 5 | 4 |
| hoed-les | 4 | 5 | 4 | 4 | 5 | 5 |
| winkel-sok | 4 | 5 | 5 | 4 | 5 | 4 |
| eend-tas | 4 | 5 | 5 | 4 | 5 | 5 |
| beer-dokter | 4 | 5 | 5 | 4 | 5 | 4 |
| taart-staart | 4 | 5 | 4 | 5 | 5 | 5 |
| kat-werkt | 4 | 5 | 4 | 4 | 5 | 4 |
| koffer-les | 4 | 5 | 3 | 4 | 5 | 5 |
| hond-feest | 4 | 5 | 4 | 4 | 5 | 5 |

The JSON records a new rationale for every rating. Repeated work-and-cup context lowers plant-ogen variety; another teacher request to bring an item lowers koffer-les variety. All six source domains remain represented. The 68 other reading titles and all three earlier A1 messages were inspected for comparison; no new slug collision appears.

## Language checks

| Item | Complete words | Mean words per split unit | Longest unit |
| --- | ---: | ---: | ---: |
| plant-ogen | 31 | 5.17 | 8 |
| hoed-les | 31 | 4.43 | 7 |
| winkel-sok | 30 | 5 | 7 |
| eend-tas | 38 | 6.33 | 10 |
| beer-dokter | 35 | 7 | 11 |
| taart-staart | 26 | 4.33 | 8 |
| kat-werkt | 31 | 5.17 | 7 |
| koffer-les | 35 | 5 | 9 |
| hond-feest | 34 | 4.86 | 7 |

Counts include greetings and sign-offs. Body clauses, prompts, options and explanations were also read in full. Each question asks a direct fact; no calculation, inferred rule or cultural joke controls a key. Two local A1 examples are named per item in the JSON comparison. No official exam comparison is claimed.

## Verification and adoption

`npm run batch:check -- content/batches/071-proposed.json` passes with nine items, 18 questions, three options each, no failures and no warnings. All nine IDs are intentional revisions. `meaningReviewErrors(review, final, false)` returns `[]` after formatting against the exact final source. The recorded source hash also matches those bytes.

Proposed-source SHA-256: `0fd654be4094b1c7d1b1f75c98a2ac77a24d67e49fad20de845ee7ae6ef887c5`.

Final `meaningPacketHash` SHA-256: `8ab0fe5dff7f30abd8085cba1f535cd7c88a22e6af87f4b3eab163bb40f9ebaa`.

The earlier source and review remain under `content/reviews/history/2026-10-27-a1-initial/`. Their metadata and file hashes are preserved in the revision entry; their judgments were not inherited. The JSON points `source` at `content/batches/071-original.json` and `proposed` at the reviewed copy for the normal `batch:adopt 071` gate.

The coordinator can adopt the passing proposed source and handle integration. Image generation and final visual review remain separate work. This reviewer changed no original batch, catalogue, config or media.
