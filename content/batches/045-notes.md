# Batch 045 author notes

Five A2 speaking replacements preserve the IDs and broad subjects assigned in `tmp/standardization/045-source.json`. All records target `duo-a2`, use the `a2-spreken` rubric and allow ten seconds of preparation with forty seconds of speaking. Difficulty remains unvalidated. The separate reviewer must assess the complete final source and starters before integration.

The author read the blueprint, author brief, editorial rubric, content workflow, the A2 speaking passage in `docs/research/exam-blueprints-2026-09-10.md`, illustration configuration, voice configuration and integrated batch 009. The current blueprint's review/adoption procedure supersedes the older workflow paragraph about reviewers never editing proposals. No Smithers workflow was used.

## Sources and provenance

The five premises, learner samples, model answers and image briefs were rewritten for the supported speaking formats. The supplied source determined IDs and broad subjects. Official-format research already recorded in the project guided the task forms; no official question wording was imported. There are no KNM claims, named businesses, addresses, websites or factual research claims requiring an external source check. Cast names and visual traits come from `config/illustration.json`.

Image briefs describe essential scenes in English and leave the style prefix to the configured illustration pipeline. Every brief prohibits text, captions and logos. The parcel sequence repeats Karim's exact traits and the same home doorway setting. The ticket pair keeps Roos and the station setting constant while changing the purchase method. Dutch alt text identifies scenes without narrating the expected answers. No media was generated. The technician task declares its still-and-audio substitute for video; Sabrina uses the existing `f-adult` role. Instructions will use the narrator when generated after review.

## Coverage and language control

| Preserved ID suffix | Type | Domain | Required response | Model words | Mean / maximum model sentence words |
| --- | --- | --- | --- | ---: | --- |
| batch002-burenpakket:1 | picture-sequence | wonen-buurt | Narrate acceptance, storage and handover across three pictures | 29 | 9.7 / 11 |
| batch003-tramkaart:1 | picture-choose | vervoer | Choose a purchase method, give a reason, discuss the other picture | 30 | 7.5 / 10 |
| batch003-jas:1 | picture-describe | vrije-tijd-familie | Place Roos in the scene, name two visible objects, give an opinion | 30 | 6.0 / 8 |
| batch003-monteur:1 | video-answer | winkels-diensten | State the appointment window, arrival status and current time | 30 | 7.5 / 9 |
| batch003-speeltuin:1 | picture-describe | wonen-buurt | Place Fatima in the scene, name two visible objects, give an opinion | 31 | 7.8 / 10 |

The longest instruction sentence has eleven words. Models use short main clauses and everyday vocabulary. Every model meets the editorial target of 25–45 words. Each task has three bilingual content criteria, with natural paraphrases allowed. Every sample deliberately omits criterion three, leaving one null quote, and includes one minor agreement or adjective error. The remaining quotes occur exactly in their samples. Starters provide incomplete structures in criterion order without supplying new facts.

## Diversity against the catalogue

The old items in this migration all used the retired message format. Their subjects intentionally recur because this batch replaces those records. The parcel task now tells a visible sequence and differs from the existing cooking-for-a-neighbour sequence. The ticket task compares ways to buy, while the existing transport choices compare vehicles. Roos's coat mistake and Fatima's damaged playground fence require observations with opinions; neither duplicates an existing current-format premise. The late technician is a direct service conversation with explicit timing rather than another preference question. Two neighbourhood settings remain because the assigned topics must be preserved. No new neighbourhood topic was added.

There are no closed questions, answer keys or distractors in this batch. All five models are illustrative responses rather than exclusive answers.

## Reviewer attention

Confirm that the choice sample's request for help satisfies its reason criterion without describing the other picture. The third criterion is absent from that sample. On the coat task, the prompt supplies the ownership mistake because a still cannot establish who owns a garment. Image generation must show the coat and telephone distinctly. For the playground, verify that the broken fence is clear and the slide establishes the setting without clutter. The model's danger opinion is one acceptable response; the criterion does not require that particular judgment.

## Final checker output

```text
> batch:check
> tsx scripts/batch-check.ts content/batches/045-original.json

Checked 5 items, 0 questions. Keys: {}. Options: {}.
  info  5 of 5 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
