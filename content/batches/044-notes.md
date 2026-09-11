# Batch 044 author notes

Six replacement A2 speaking tasks preserve all six IDs from `tmp/standardization/044-source.json`. The original practical topics remain recognisable. The broken refrigerator topic now asks the learner to choose a replacement size; the appointment at the hairdresser becomes a visit shown in sequence. All wording is original. This batch contains two video answers, one single-picture description, one picture choice and two sequences, with eleven image briefs total. It is a migration batch rather than a complete mock form.

## Sources and production

Read `AGENTS.md`, `content/blueprint.md`, `docs/briefs/author.md`, `content/reviews/rubric.md`, `docs/research/content-workflow.md`, the A2 speaking section of `docs/research/exam-blueprints-2026-09-10.md`, `config/illustration.json`, and `config/voices.json`. Batch 027 and its starters supplied a record-format example. Catalogue A2 speaking titles were inspected for overlap. Existing topics are retained under the authorised rewrite exception. No new named business, address or institution appears, so no invented organisation requires web verification. The pharmacy task offers no medical advice or factual claims requiring research.

The picture briefs rely on the central house-style prefix. Recurring cast traits are copied exactly. Each sequence uses separate briefs in one setting; the pair changes only fridge height. Native Netherlands Dutch cue roles are f-older and f-adult. Narrator instructions and cue audio are pending review and later generation; generated fields and revision are absent.

## Language figures

Figures are whitespace words / mean sentence length / longest sentence. A2 remains an authoring target, with targetLevelValidated false. Models range from 31 to 34 words and contain at most 14 words per sentence.

| ID | Type | Domain | Prompt figures | Model figures |
| --- | --- | --- | --- | --- |
| A2:speaking:buurvrouw:1 | video-answer | wonen-buurt | 40 / 5.7 / 9 | 33 / 6.6 / 9 |
| A2:speaking:te-laat:1 | video-answer | werk | 36 / 6.0 / 9 | 31 / 6.2 / 7 |
| A2:speaking:batch001-apotheek:1 | picture-describe | gezondheid | 29 / 5.8 / 10 | 34 / 8.5 / 14 |
| A2:speaking:batch001-koelkast:1 | picture-choose | winkels-diensten | 31 / 5.2 / 8 | 32 / 8.0 / 11 |
| A2:speaking:batch002-kapper:1 | picture-sequence | winkels-diensten | 20 / 5.0 / 7 | 33 / 8.2 / 14 |
| A2:speaking:batch002-portemonnee:1 | picture-sequence | winkels-diensten | 22 / 5.5 / 7 | 33 / 6.6 / 11 |

## Diversity and answer mapping

| Topic | Task operation and comparison with catalogue | Prepared sample omission | Model coverage |
| --- | --- | --- | --- |
| Neighbour visit | Reschedule a visit in direct response to a cue; differs from the modern introduction-to-neighbour task | Visit time | Work shift explains absence; Saturday and two o'clock provide alternative |
| Late at work | Explain disruption and report arrival in direct response to colleague | New transport method | Flat tyre, half past nine, bus |
| Pharmacy | Describe two visible actions and evaluate receiving help; differs from waiting-room description | Opinion | Pharmacy counter, paper handover, box pickup, personal opinion |
| Refrigerator | Choose between two appliance sizes; differs from online-versus-shop purchasing | Other refrigerator | Small choice, living alone and little food, larger fridge space |
| Hairdresser | Narrate arrival, haircut, payment; differs from trousers-alteration sequence | Haircut | Hanging coat, haircut, card payment |
| Wallet at cafe | Narrate search, staff conversation, return; replaces the old phone-message structure | Staff conversation | Search under table, talk at bar, returned blue wallet |

Each sample contains one clear missing criterion with one null quote and one minor learner error. Other quotes are exact substrings. The wallet sample only says the wallet is returned; it does not imply a conversation. The hairdresser sample says she sits down but does not describe a haircut. Each starter corresponds to one criterion and leaves an ellipsis for the learner to complete. There are no closed questions, keys or distractors.

## Points for independent review

Confirm the small-to-large fridge comparison preserves enough of the authorised broad topic. During later image review, check that Roos's bun stays visible while a loose strand is trimmed, the pharmacy handover and pickup both read clearly, and no wallet appears in the search panel. Images and audio remain ungenerated. An editorial pass does not validate CEFR difficulty or exam equivalence.

## Checker

`npm run batch:check -- content/batches/044-original.json`

```text
Checked 6 items, 0 questions. Keys: {}. Options: {}.
  info  6 of 6 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
