# Batch 074: A1 tone-balance editorial review

All nine final proposed tasks pass. The reviewer edited 3 tasks; none were rejected. Tone: 8 ordinary and 1 lightly humorous. These are editorial source judgments for foundation practice.

| Item | Verdict | Level | Reason |
| --- | --- | --- | --- |
| schoenlunch | pass | A1 target | Tell the arriving person what is already in the bag and ask him to bring bread. |
| appelui | pass | A1 target | Report the received food to the shop and ask for the apple that was bought. |
| ontbijttaart | pass | A1 target | Respond to the photo with an opinion and tell the breakfast host a drink preference. |
| lepelmuziek | pass | A1 target | Invite Modibo to the music session and ask him to bring a guitar. |
| tuinfilm | pass | A1 target | Reply to Sabrina’s two practical questions about the film. |
| fietsfeest | pass | A1 target | Confirm participation and coordinate the food the learner will bring. |
| stoelsokken | pass | A1 target | Identify the preferred chair and ask the teacher whether it remains available. |
| reuzenbox | pass | A1 target | Answer Roos’s contents question and add a reaction to the conspicuous box. |
| komhoed | pass | A1 target | Respond to Sabrina’s shared photo and request another photo. |

The reviewer persisted the blind findings before reading full answer material. The final source packet was rebuilt and reread after repairs; the initial packet and findings remain intact. Item-specific purpose, contrivance, recipient and residual-risk evidence is in the JSON report.

Reviewer changes from the authored copy:

- Restored the currently adopted concise image briefs and alts verbatim for `appelui`, `tuinfilm` and `reuzenbox`. The onion, garden screen with projector and spoon in the oversized box remain fully compatible with the message goals.

The proposal contains six ordinary scene replacements in this batch. The exact changed fields against the current source and every reviewer edit with its final wording appear in the JSON. All supplied IDs and domain tags remain. Existing set membership stays fixed.

`npm run batch:check content/batches/074-proposed.json`: nine items checked, no failures or warnings. Prompts contain 27–38 words; models contain 10–13. All samples, exact quotes and 27 starter fragments pass the open-task audit. `meaningReviewErrors(review, proposedItems, false)` returned no errors for the exact final bytes.

The nine settings and message purposes remain distinct. The open-task pair contributes three of the intended five lightly humorous tasks among 36 A1 items; the coordinator checks the combined count with the closed tasks.

After adoption, regenerate and inspect media only for changed source identities through the existing hash gates. Six changed image scenes need new illustrations. Writing tasks need no speaking-prompt narration. Restored brief bytes preserve the six unchanged media identities across these two batches. This review does not approve new rendered media.

Previous approvals are preserved under `var/a1-tone-balance-2026-10-27/review-history/`. No author original, catalogue, media manifest or provider was changed. Adoption and integration remain with the coordinator.

Proposed source SHA-256: `50ebeb07b9885faa13d6c43905789aac818f74bbc6e80de1ea4bae4100397b4e`
Starters SHA-256: `2cbe18cd55665a7bab261f95147c6368c437b87f374581268c1b81143fc5dafc`
Final source packet SHA-256: `c28167392d73f4fc968e9bf99e90283f580b796f71d5f8e291ec693b262949a1`

No teacher validation, learner calibration or official exam comparison is claimed.

## Focused re-review, 28 October 2026

Scope: the coordinator's post-integration edits to `schoenlunch`, `tuinfilm`, `komhoed` and `stoelsokken`, plus the komhoed starter. The blind packet was read and meaning findings were persisted before any criterion, model, starter or note was opened. All four items pass after the repairs listed below. All four are ordinary in tone.

Reviewer edits:

- `schoenlunch.prompt` → `U luncht op het werk. Julio is nu bij de bakker. Hij stuurt u een bericht: wat heb jij al voor de lunch? Kijk naar het plaatje. Schrijf Julio een bericht terug. Zeg wat er in uw tas zit. Vraag hem om brood mee te nemen.` The coordinator wording did not say Julio asked in writing.
- `schoenlunch.model` → `In mijn tas zit een banaan. Neem je brood voor mij mee?` The old model could be read as Julio bringing his own bread.
- `tuinfilm.prompt` adds `thuis` and `Zeg hoe laat hij begint.`. `Kies zelf een tijd` alone did not ask the learner to write the time.
- `tuinfilm.criteria[0]` → `U zegt dat de film in de tuin is. Buiten is ook goed.` This makes `In de tuin` pass.
- `stoelsokken.prompt`: `U wilt de blauwe stoel.` became `U wilt de stoel bij de tafel. Kijk naar de foto.` The prompt had printed the first goal.
- `stoelsokken.criteria[0]` adds `De stoel bij de tafel is ook goed.`.
- `stoelsokken.criteria[1]` → `U vraagt of die stoel nog vrij is.` The prompt never asked for `morgen`.
- `komhoed.prompt` → `U bent thuis. Sabrina stuurt u een foto uit de tekenles. Op de foto maakt ze een tekening. …`. The unchanged picture shows Sabrina drawing, not a photo of the finished sheet.

The reviewer did not change the starters file. The coordinator's komhoed starter `Ik vind je tekening …` passes. The tuinfilm and stoelsokken starters were re-reviewed against their changed criteria and pass. Prompt lengths are 46, 40, 44 and 34 words; model lengths are 12, 11, 11 and 10. Samples and quotes are unchanged, and each sample still omits exactly one goal. `npm run batch:check` reports no failures or warnings. Images and briefs are unchanged. Hashes are listed in the JSON `revisions` entry.
