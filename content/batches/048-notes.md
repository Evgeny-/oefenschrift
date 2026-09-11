# Batch 048 author notes

Five replacement A2 writing tasks preserve the exact IDs, topics and count in `tmp/standardization/048-source.json`. Set files were not edited. All records are drafts with unvalidated A2 targets. These are original practice tasks; editorial review cannot establish CEFR difficulty or exam equivalence.

## Contract and format

Read `AGENTS.md`, `content/blueprint.md`, `docs/briefs/author.md`, `content/reviews/rubric.md`, `docs/research/content-workflow.md` and the A2 writing section of `docs/research/exam-blueprints-2026-09-10.md`. Batch 008 supplied current email examples. The writing titles in `content/catalogue.json` were checked for related situations.

All five use `taskType: email`, `exam: duo-a2` and `rubric: a2-schrijven`. Each has a complete printed scaffold, a situation, four bilingual criteria, a grammar target and an adequacy note. `grammarTarget: vrij` allows natural A2 wording without requiring a particular subordinate clause. Each starter allows a complete sentence after the learner supplies missing information.

The requested personal bericht is represented by the informal email to Noor. A2 writing's accepted vocabulary has no `bericht` type; the coordinator confirmed use of the supported email type. The remaining source topics call for formal correspondence. This creates a 1:4 informal/formal split; keeping the municipal, club, accommodation and employer recipients makes a balanced register split unsuitable here.

All email addresses use the reserved `example.invalid` domain. Recipients are generic services or fictional private people, with no invented named company or institution. No external factual claims, legal cancellation rules, real addresses or real contact details appear. External research was unnecessary. Dates and quantities are fictional task facts. No media is needed.

## Coverage and language control

Counts use whitespace-separated words; sentence counts split at periods, question marks and exclamation marks. Models exclude printed salutations and closings.

| ID suffix | Domain | Purpose | Prompt words | Sample words | Model words | Model sentences | Longest sentence |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| batch002-plant:1 | vrije-tijd-familie | Request plant care and arrange access | 62 | 40 | 51 | 7 | 9 |
| batch003-container:1 | instanties | Report incorrect delivery and ask what to do | 63 | 37 | 55 | 8 | 9 |
| batch003-sportles:1 | vrije-tijd-familie | Stop attending a class and obtain confirmation | 64 | 42 | 53 | 6 | 10 |
| batch003-logeerkamer:1 | winkels-diensten | Ask about accommodation availability and price | 62 | 43 | 57 | 6 | 14 |
| batch003-loonstrook:1 | werk | Request correction of recorded working hours | 60 | 42 | 53 | 7 | 10 |

Models use common verbs, short main clauses and no sentence longer than 16 words. The payslip prompt explains `loonstrook` through its everyday function. Every email includes an explicit choice for the learner. Sources provide enough information to answer the other requirements. No complete prompt sentence is copied into a model or sample.

## Prompt, sample and model mapping

- Plant: criteria require absence length, a watering request, key collection and a watering day. The model supplies seven days, a request, collection at the sister's home and Wednesday. The sample omits key collection only; `een klein pot` is the deliberate article/adjective error. Quote 3 is null.
- Container: criteria require the mistaken delivery, the container's number, a question about handling it and availability. The model distinguishes house 26 from container 48, asks what to do and offers Monday from ten. The sample omits container number 48 only; `antwoordt` is the deliberate spelling error. Quote 2 is null.
- Sportles: criteria require a named lesson, stopping from 1 November, a self-invented reason and an email confirmation request. The model names Monday yoga, provides the date, explains changed work hours and asks for written confirmation. The sample omits the reason only; `De docent zijn` is the deliberate agreement error. Quote 3 is null.
- Logeerkamer: criteria require arrival and departure dates, an availability question, a nightly-price question and guest count. The model gives 12–14 June, asks both questions and specifies two parents. The sample omits the price question only; `Mijn ouders slaapt` is the deliberate agreement error. Quote 3 is null. The prompt establishes that this fictional community centre offers a room for up to two guests.
- Loonstrook: criteria require 80 hours worked in August, 72 hours recorded, a check request and a discussion time. The model covers all four, offering Wednesday at three. The sample omits the discussion time only; `Er mist dus acht uur` is the deliberate agreement error. Quote 4 is null.

Every non-null quote appears verbatim in its sample. The sample errors preserve understandable task information and create no additional missing communicative goal.

## Diversity against the catalogue

| Topic retained | Related catalogue topic | Distinction in this replacement |
| --- | --- | --- |
| Plant care | batch008-oppassen; batch008-kast | Care for a plant, with key access and a watering day |
| Waste container | batch008-lantaarnpaal | Misdelivered numbered object and an explicit handling question |
| Sports lesson | batch008-sportclub | Cancellation of an existing lesson rather than registration |
| Guest room | batch008-huur | Brief family stay with availability and nightly price rather than ending a tenancy |
| Payslip | batch008-contract | A numerical mismatch in worked hours rather than contract renewal |

These are authorised topic-preserving rewrites. Their existing catalogue entries are intentional matches. No closed questions occur, so key balance and distractor rationale do not apply.

## Points for independent review

Check the informal email representation of the personal message against the current accepted vocabulary. Review the intentionally formal-heavy register distribution in the context of preserved recipients. The grammar metadata supplements the A2 tasks; it does not turn these into B1 sentence-completion tasks. No review verdict is recorded here.

## Author check

`npm run batch:check -- content/batches/048-original.json`

```text
Checked 5 items, 0 questions. Keys: {}. Options: {}.
  info  5 of 5 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
