Batch 074: A1 writing editorial review

All nine proposed messages pass. Three items received local repairs; six pass unchanged. None was rejected. The reviewer is the independent Codex AI agent `/root/review_a1_writing_fun`, who did not author this batch. Opus 5 was unavailable and was not used.

| Item suffix | Verdict | Level-target judgment | Concrete basis |
| --- | --- | --- | --- |
| schoenlunch | pass | compatible with local A1 target | Name the pictured shoe and ask for bread; 12-word model. |
| appelui | pass | compatible with local A1 target | Identify an onion and request an apple; two four-word sentences. |
| ontbijttaart | pass | compatible with local A1 target | Give any cake opinion and choose a drink; 10-word model. |
| lepelmuziek | pass after edits | compatible with local A1 target | Invite music-making and request a pan; 11-word model. |
| tuinfilm | pass | compatible with local A1 target | Pass on a stated place and time; 11-word model. |
| fietsfeest | pass | compatible with local A1 target | Confirm coming and choose food to bring; 10-word model. |
| stoelsokken | pass | compatible with local A1 target | Identify the desired chair and ask availability; 11-word model. |
| reuzenbox | pass after edit | compatible with local A1 target | Identify a spoon and give any box opinion; 13-word model. |
| komhoed | pass after edit | compatible with local A1 target | React to the picture and ask for another; 10-word model. |

These judgments concern blueprint 4.0's authoring target. They do not validate CEFR difficulty or establish official exam equivalence. No official A1 task comparison applies. There are no existing A1 writing exemplars, and the separate first-batch level-target check remains for the coordinator.

The six edited fields across three items are recorded with exact old and new text in `074-review.json`:

- `lepelmuziek.sample` becomes “Kom je bij mij muziek maken? Dat zijn leuk.” It now explicitly meets the invitation goal and omits the pan request. This removes the doubt about whether bringing a pan implies an invitation.
- `lepelmuziek.quotes` becomes `["Kom je bij mij muziek maken?", null, "Kom je bij mij muziek maken?"]`.
- `lepelmuziek.images[0].brief` shows an unnamed adult woman doing the learner's kitchen activity. Modibo, the invited recipient, need not already be present. The composition, pan and spoons remain.
- `lepelmuziek.images[0].alt` becomes “Een vrouw maakt met twee houten lepels muziek op een pan in de keuken.”
- `reuzenbox.sample` becomes “In de doos zit een lepel. De lepel zijn klein.” The explicit spoon reference prevents its size comment from counting as a box opinion.
- `komhoed.prompt` gains “U zit met Sabrina in de klas.” The classroom relationship now supports `opleiding` explicitly. The final prompt has 36 words.

All other source fields remain as authored. Criteria are unchanged, and all 27 original starters pass, so no proposed-starters file is needed. Every starter contains an ellipsis, permits a natural completion and leaves the required facts to the learner. The author's source, notes and starter overlay were not edited.

The full JSON review maps each prompt requirement to its bilingual criterion, exact prepared sample quote or deliberate null, and a model quote. Each sample has one missing content goal and two verbatim quotes. Every sample remains understandable despite one beginner verb-form error. The language criterion accepts such errors. A different simple formulation can meet a goal; food choices and opinions remain open. For the chair task, “Mag ik op de stoel met sokken zitten?” can communicate both intentions when clear.

The final nine models contain 8-13 words in two sentences of four to seven words each. Prompts contain 24-36 words. No task requires a reason, extended greeting, subordinate response or connected story. The concrete nouns `ui`, `lepel`, `sokken` and `kom` have clear visual support. I opened the primary [Council of Europe CEFR Companion volume](https://rm.coe.int/common-european-framework-of-reference-forlanguages-learning-teaching/16809ea0d4) on 27 October 2026. Printed pages 66-67 and 83-84 inform the target through isolated simple writing, everyday objects and very short messages that give information or ask a question. Those descriptors do not validate these items.

The editorial ratings below use 1-5, where 5 is strongest. Visual interest is a judgment of the brief, because no rendered art exists yet. Each score has an item-specific explanation in the JSON review.

| Item | Simplicity | Clarity | Variety | Visual interest | Task/image fit |
| --- | ---: | ---: | ---: | ---: | ---: |
| schoenlunch | 5 | 5 | 4 | 5 | 5 |
| appelui | 5 | 5 | 4 | 4 | 5 |
| ontbijttaart | 5 | 5 | 4 | 4 | 5 |
| lepelmuziek | 4 | 5 | 5 | 5 | 5 |
| tuinfilm | 5 | 5 | 5 | 4 | 5 |
| fietsfeest | 5 | 5 | 5 | 5 | 5 |
| stoelsokken | 5 | 5 | 5 | 5 | 5 |
| reuzenbox | 5 | 5 | 4 | 5 | 5 |
| komhoed | 5 | 5 | 4 | 5 | 5 |

I compared all 66 writing catalogue titles and prompts and read the 16 nearest full records. No same-part slug collision or duplicate complete premise was found. The shoe and onion tasks share an identification/request pattern, with workplace help and correcting a shop purchase giving distinct communicative purposes. Opinion, invitation, place/time information and availability provide variety elsewhere. Preserve the proposed three sets of three: “Rare dingen aan tafel”, “Kom je ook?” and “Kijk eens!”. The coordinator must also compare these premises with the other three new skill batches.

Every remaining named character repeats the configured cast traits verbatim. Use `a1StylePrefix` for the new art. Open-task pictures and Dutch alts may supply the visible facts; opinions and chosen food stay free. Render checks must confirm a shoe inside the bag, a clear onion, coherent hands, realistic spoon grips, a blank garden screen, a mechanically coherent bicycle, four socked chair legs, one recognisable spoon inside the huge box and a bowl separate from Sabrina's hair. Exclude readable text, labels, numerals, signage, logos and watermarks. Required media review remains separate from this source pass.

After the last source edit, I formatted the proposal, read the complete final proposal and all starters, then ran:

```text
npm run batch:check content/batches/074-proposed.json
Checked 9 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

Proposed source SHA-256: `fdf70fa86bba0509f790cf487cb7e96ce24f949b263fec2549a930202977df09`.

Passing unchanged starter overlay: `content/batches/074-starters.json`.

Starter SHA-256: `70092369ed3ce21940326520ba96b59badf04c94aa13acf64a625f8206bc1edd`.

The source passes the editorial adoption gate. Complete the separate first A1 writing target check, then adopt with `npm run batch:adopt 074`. The coordinator owns set assembly, generation and review of the nine drawings, integration through `npm run content:integrate`, and the normal starter hash process. Work stays local. This reviewer changed no media, provider settings, config, runtime or catalogue files.
