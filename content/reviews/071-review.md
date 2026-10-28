# Batch 071: independent source and question review

Pass: 9 items and 18 questions. Reviewer repairs: 0 items. Rejected: 0. A1 is a foundation authoring target; difficulty is unvalidated.

Proposed SHA-256: `52885cb9bf887f392ec1927d8fc9897e3276fca8968191855bb39842b847e382`. Final source-packet SHA-256: `7b1006a0a81749ec2f6b27a00fd7c418f0eeffc2d616715f3cea1abe5ff43b91`.

| ID | Verdict | Level target | Reason |
| --- | --- | --- | --- |
| `A1:reading:batch071-plant-ogen:1` | pass | A1 foundation | Lina vragen naar de keuken te komen met haar eigen beker; Omar kondigt daarnaast een foto van de versierde kantoorplant aan. |
| `A1:reading:batch071-hoed-les:1` | pass | A1 foundation | Sami voorbereiden op het samen maken van een verjaardagskaart en hem potloden laten meenemen. |
| `A1:reading:batch071-winkel-sok:1` | pass | A1 foundation | De klant laten weten wanneer de jas kan worden opgehaald, wat het kost en dat passen mogelijk is. |
| `A1:reading:batch071-eend-tas:1` | pass | A1 foundation | Karim vragen haar om twee uur bij het station op te halen; het cadeau is een persoonlijke toevoeging aan hetzelfde aankomstbericht. |
| `A1:reading:batch071-beer-dokter:1` | pass | A1 foundation | De afspraak om tien uur bevestigen en duidelijk maken dat de patiënt eerst naar de balie en daarna naar de wachtkamer gaat. |
| `A1:reading:batch071-taart-staart:1` | pass | A1 foundation | Mila uitnodigen om om drie uur bij Ivo thuis taart te eten en thee te drinken. |
| `A1:reading:batch071-kat-werkt:1` | pass | A1 foundation | Een telefoongesprek om vier uur vragen zodat Amir Nora met haar computer kan helpen. |
| `A1:reading:batch071-koffer-les:1` | pass | A1 foundation | Noor naar de buitenles laten komen met een jas en vertellen wat de groep daar doet. |
| `A1:reading:batch071-hond-feest:1` | pass | A1 foundation | Dina uitnodigen voor de hondenwandeling en de spullen verdelen: Ben neemt water, Dina de bal. |

The blind meaning findings were persisted before opening the full items, answer material and notes. They explain every source’s purpose; listening records every exact turn and its function. The final source-only packets match those blind packets byte for byte after repairs.

Reviewer edits:

No further changes to the authored source were required.

The complete replacement diff is recorded field by field in the JSON report. Its `questions` entries prove each key and explain every distractor. Every item also has a separate audit of title, situation, image brief, alt and cross-question cues.

Tone: 8 ordinary and 1 light-humor. Batch 071’s paper eyes and batch 072’s broom dance supply the two humorous closed items. A toy gift, pet, drying umbrella and paper café decoration remain ordinary. The coordinator must verify five humorous tasks across the 36-item program.

Reading covers coffee invitation, birthday-card preparation, coat collection, station pickup, doctor arrival, birthday visit, computer help, park lesson and dog outing. Listening covers roleplay setup, departure planning, form help, bakery order, party preparation, gift packing, wet-weather commute, café order and leaving for work. Existing A1 batches 069/070 and same-part catalogue titles were inspected for comparison. Recurring names do not turn distinct practical purposes into duplicate tasks. Bring-an-object requests and time/place details recur within the deliberately narrow A1 target; no source was padded to manufacture alternatives.

Both 9-item proposals pass the shared batch checker without failures or warnings. Each batch has A=6, B=6, C=6; each preserved three-item group has two of each letter. All evidence is verbatim, all listening `text` fields match their scripts and all listening scripts have four turns and 30–34 spoken words.

Batch 071 changes six image briefs: hoed-les, winkel-sok, beer-dokter, taart-staart, koffer-les, hond-feest. Existing images are retainable only for exact unchanged briefs with a current rendered review.

No listening audio in this batch.

Previous JSON and Markdown reviews were verified against the archived snapshots in `content/reviews/history/2026-10-27-a1-meaning-before-tone/` before replacement. No adoption, integration, catalogue edit, provider call or media generation was performed. Rendered media and listening quality remain outside this source review.

## Focused re-review, 28 October 2026

Scope: the coordinator's post-integration edits to `plant-ogen` and `hoed-les`. The blind packet was read and meaning findings were persisted before any question or note was opened.

| id | verdict | reason |
| --- | --- | --- |
| `A1:reading:batch071-plant-ogen:1` | pass | Farah/Hasan rename is consistent; `Kom maar kijken!` fits the kitchen invitation; keys A and C proved verbatim; title, alt and picture leak neither key. |
| `A1:reading:batch071-hoed-les:1` | pass (edited) | New q2 key `Morgen.` is proved by `Noor is morgen jarig.`; two cue leaks repaired. |

Reviewer edits (hoed-les):

- `title` → `Een verjaardag in de les`. The coordinator title `Een kaart voor Noor` answered q1 `Voor wie is de kaart?`.
- `questions[1].prompt` → `Wanneer is de verjaardag?`. `Wanneer is Noor jarig?` named Noor as the birthday person and so cued q1.
- `questions[1].explanation` → `De verjaardag is morgen. Sara schrijft: Noor is morgen jarig.` This matches the new wording.

Keys remain A=6, B=6, C=6. `npm run batch:check` on the proposed file reports no failures or warnings. Images and briefs are unchanged; no picture needs redrawing. Note: Noor is also the learner in `koffer-les` (also opleiding), which was left unchanged. Hashes are listed in the JSON `revisions` entry.
