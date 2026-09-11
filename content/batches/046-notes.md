# Batch 046 author notes

Seven authorised replacements retain their exact catalogue IDs and broad topics. The previous message format has been replaced by three korte and four middellange B1 speaking tasks. Status remains draft; targetLevelValidated is false. Separate editorial review is required.

## Sources and media

Read content/blueprint.md, docs/briefs/author.md, content/reviews/rubric.md, docs/research/content-workflow.md, the Spreken I section of docs/research/exam-blueprints-2026-09-10.md, and config/voices.json and config/illustration.json. Integrated batch 017 supplied a record-shape example. Scenarios and all wording were authored locally. Times and capacities are invented task facts. No organisations, institutions, addresses, legal claims or KNM facts require an external lookup.

The three korte tasks use approved native Netherlands Dutch voice roles. Their cues introduce an interlocutor who can receive the requested response. Four middellange tasks use native text tables with information needed for advice or persuasion. Pictures would not add necessary information here, so no illustration briefs or generated assets are included. Audio generation follows passing review.

## Coverage and language checks

| ID suffix | Type / domain | Model words | Mean / longest model sentence | Communicative demand | Deliberate missing sample goal |
|---|---|---:|---|---|---|
| batch002-fietsroute | middellang / werk | 47 | 11.8 / 15 | Advise a route using two distinct reasons and calculate ten extra minutes. | Criterion 3 |
| batch002-cursusgemist | kort / educatie | 34 | 8.5 / 10 | Explain absence and make two connected requests about catching up. | Criterion 3 |
| batch002-teamtaak | kort / werk | 32 | 8.0 / 10 | Report two completed tasks and request redistribution with a review day. | Criterion 3 |
| batch003-werkdruk | kort / werk | 34 | 11.3 / 13 | Connect competing deadlines to a possible work risk and ask for a priority. | Criterion 3 |
| batch003-buurtvergadering | middellang / overig | 47 | 9.4 / 15 | Propose a compromise and support it with greenery and access reasons. | Criterion 2 |
| batch003-inwerken | middellang / werk | 51 | 12.8 / 15 | Give two concrete advice points and explain an observable follow-up check. | Criterion 3 |
| batch003-cursuslocatie | middellang / educatie | 52 | 13.0 / 19 | Persuade using departure times and a capacity-to-group-size comparison. | Criterion 2 |

Each sample has one deliberate learner error and omits exactly one content goal. All non-null quotes are exact sample substrings. Starters provide one incomplete construction per criterion and do not supply the missing task facts. Models fulfil every criterion; the short-task models have 32–34 words and the middellange models have 47–52 words.

## Diversity and reviewer focus

The seven settings deliberately repeat the seven legacy IDs because this is a migration. Catalogue B1 speaking titles were checked. The bicycle-purchase preference in batch 017 differs from this route comparison. Exam-advice tasks elsewhere do not ask for a work-training process and a later performance check. Cursusgemist concerns recovering missed lesson content; cursuslocatie concerns a table-based travel and capacity argument. The three workplace tasks distinguish redistributing preparation, requesting priorities, and designing guidance. The neighbourhood topic is retained once as required.

Please check that the three short responses fit twenty seconds naturally, that the route table supports both reasons, and that the street-plan sample misses only the greenery reason. Tables intentionally avoid incidental pictures. No claim of calibrated B1 difficulty or official exam equivalence is made.

## Checker output

```text
Checked 7 items, 0 questions. Keys: {}. Options: {}.
  info  7 of 7 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

Command: `npm run batch:check -- content/batches/046-original.json`. Closed-answer key distribution and distractor rationales do not apply.
