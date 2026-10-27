# Batch 070 author notes

Author: Codex, 27 October 2026. This is an original A1 listening foundation batch for local testing. The target is unvalidated. It carries no claim about the format or difficulty of an official exam. The author has not generated media or performed the independent editorial review.

## Contract and sources

The batch follows `content/blueprint.md` section 4.0, including the listening specification added for this request, plus sections 3 and 5–10. The script record follows section 4.2. Other working references were `docs/briefs/author.md`, `docs/research/content-workflow.md`, `content/reviews/rubric.md`, the listening structure in `content/batches/056-original.json`, and all listening titles in `content/catalogue.json`. The prior A1 source `content/batches/069-original.json` was read to avoid repeating its activities.

The CEFR sources and official format research are recorded in the blueprint and `docs/research/exam-blueprints-2026-09-10.md`. These documents guide the local authoring target. No official sample wording was used. This batch contains fictional everyday arrangements, with no KNM claims, real organisation names, invented company names, addresses, prices, legal rules or factual source quotations requiring external verification. Its people come from the project cast; the teacher and shop assistant are generic roles. Every scenario, script, question, option, explanation, image brief and alt was written for this batch.

## Counts and language control

| ID suffix | Domain | Purpose | Spoken words | Turns | Sentences | Mean words | Longest sentence | Question skills |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `foto-werk` | werk | Find the photographer and where to stand | 51 | 6 | 12 | 4.25 | 8 | person, time-place |
| `potlood-lenen` | opleiding | Borrow a classroom tool and agree when to return it | 48 | 6 | 11 | 4.36 | 6 | detail, time-place |
| `tas-kopen` | winkels-diensten | Choose a bag and state how to pay | 48 | 6 | 12 | 4.00 | 8 | detail, detail |

Counts exclude speaker labels and split sentences at full stops and question marks. There are three conversations, six questions, eighteen options and three context image briefs. Every option in each question has the same word count as the other two. Keys in source order are A, B, C, A, B, C, giving two of each letter. All scripts use present-tense main clauses and simple commands. No script contains a digit, idiom, subordinate clause or calculation. Candidate locations, objects and payment methods are explicitly audible. Each keyed fact is stated once; later acknowledgement does not repeat the photographer, exact position, borrowed object, return time, chosen bag size or payment method.

The words `tekenen`, `lenen`, `terug`, `gum`, `rugzak` and `pas` deserve the reviewer's attention as the batch's most specific vocabulary. The scripts surround them with concrete, short utterances. Sentence-length figures alone cannot establish A1 difficulty. `Het` in the borrowing dialogue points to the single object just handed over; no other object has been loaned.

## Answer and distractor audit

### `A1:listening:batch070-foto-werk:1`

- q1, A: `Karim maakt de foto.` states the photographer directly. B, Julio, is the person asking where he should stand for his picture. C, Sabrina, is the colleague being asked; she gives Karim's name and says she helps at the door. Both distractor people are in the conversation. Options are three single names.
- q2, B: `Je staat buiten bij de boom.` answers Julio's preceding question about where to stand. A, the corridor, is where people wait. C, the door, is where Sabrina helps. The photograph's position, waiting area and helper's position have separate functions. Every option is a three-word location phrase.

### `A1:listening:batch070-potlood-lenen:1`

- q1, C: `Ik geef je mijn potlood.` states what Roos receives from the teacher. A, the eraser, is the object the teacher uses himself. B, the paper, is something the group collects before the lesson; the teacher does not say he gives that to Roos. The first turn requests a loan, and the following turns establish the return, so `geef` does not promise a permanent gift. Each option has two words.
- q2, A: `Geef het na de les terug.` gives the return time directly. B, before the lesson, belongs to collecting paper. C, during the break, belongs to drinking water. Every option is a three-word time phrase. No calculation or before/after inference is required beyond recognising the expressly spoken phrase.

### `A1:listening:batch070-tas-kopen:1`

- q1, B: `Nee, een kleine tas, graag.` gives Fatima's choice. A, a large bag, is the bag she already has at home and refuses in the first question. C, a new backpack, is another item the shop sells; she never chooses one. Every option is a three-word noun phrase.
- q2, C: `Ik betaal met mijn pas.` gives Fatima's own payment method. A and B, money and a phone, are other accepted methods mentioned by the seller. That general permission does not change her expressly stated choice. Every option is a three-word payment phrase. `Geld` here denotes the alternative to the card and phone in the seller's utterance; the reviewer should check that this everyday wording is sufficiently concrete for a beginning learner.

All six stored quotes occur verbatim in their respective joined transcripts. A scripted check confirmed that `text` equals the exact mechanical join of `speaker + ': ' + text` for every turn.

## Diversity against existing content

| New item | Nearby existing concepts checked | Why the activity differs |
| --- | --- | --- |
| Staff photograph | A1 batch069 kitchen cups; A2 training, first workday and coffee fund; B1 work meeting | Coordinate a staff photograph by identifying a person and a photo position. It does not distribute kitchen objects, explain employment rules or organise training. |
| Classroom loan | A1 batch069 book and exercise numbers; A2 test questions and computer course | Ask to borrow a tool and agree when it must come back. It does not locate a lesson, bring a book from home, choose a course or explain test rules. |
| Bag purchase | A2 bakery orders, phone-screen repair, garage, supermarket closing and furniture delivery | State a bag preference and the buyer's payment method in person. No ordering deadline, repair, price calculation or delivery rule appears. |

The titles and distinctive source phrases were searched across the catalogue and batch originals. No existing listening item has these titles or slugs. The search returned only this new source for the exact phrases `Karim maakt de foto`, `Geef het na de les terug` and `Ik betaal met mijn pas`. The three scenes have different purposes even though all are short, two-party exchanges. Role allocation includes a woman giving work directions, a male teacher lending a tool, and a woman making her own shop choices.

## Voices and images

| Item | Speaker roles | Context image and answer-leak check |
| --- | --- | --- |
| `foto-werk` | Sabrina: `f-adult`; Julio: `m-young` | Only Sabrina and Julio talk beside an empty work desk. No Karim, camera, photograph, doorway, corridor or tree. The image supplies neither the photographer nor any candidate photo position. |
| `potlood-lenen` | Roos: `f-young`; Docent: `m-adult` | Roos talks with a teacher beside an empty classroom table. No pencil, eraser, paper, drink, clock or timetable. Neither the received object nor the return time is visible. |
| `tas-kopen` | Verkoper: `m-shop`; Fatima: `f-adult` | Two people talk across an empty shop counter. No bags, backpacks, money, cards, terminal, phones or merchandise. The scene supplies neither the bag type nor Fatima's payment method. |

The two roles in every conversation are distinct and present in `config/voices.json`, whose approved voices are native Netherlands Dutch. The coordinator will generate slowly paced audio after the final script passes independent review. The source contains no generated files or voice IDs.

Every image brief repeats the relevant named cast traits exactly from `config/illustration.json`: Sabrina, Julio, Roos and Fatima. The generic teacher and shop assistant receive simple stable descriptions. Briefs contain scene content only; the media pipeline adds the configured house-style prefix. Each asks for no text, numerals, labels, signage or logos. Dutch alts describe the social setting without an answer. The rendered pictures still need visual inspection against both questions before approval.

## Doubts for the independent reviewer

- Check that the borrowing exchange remains natural at this target: `Ik geef je mijn potlood` answers the request to borrow, while the next turns explicitly require its return. The source does not rely on a gift-versus-loan distinction for either key.
- Evaluate whether Roos's brief `En in de pauze?` and Julio's `Hier in de gang?` remain clear in the deliberately short conversational setting. Their preceding turns state the subjects.
- Confirm that the general alternatives `met geld of een telefoon` stay unambiguously separate from Fatima's actual card choice and that `pas` is suitable as a familiar everyday word.
- Read every final source field, including the media briefs. Audio has not yet been generated; text approval cannot certify the final pronunciation, pacing, pauses or emphasis.

## Checker output

```text
$ npm run batch:check content/batches/070-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/070-original.json

Checked 3 items, 6 questions. Keys: {"A":2,"B":2,"C":2}. Options: {"3":6}.
No failures, no warnings.
```

The author also checked JSON parsing, exact joins, quote containment, option word counts, sentence figures and ID collisions. An independent reviewer must record the exact final source hash before adoption or integration. Media generation and rendered-media approval remain subsequent gates.
