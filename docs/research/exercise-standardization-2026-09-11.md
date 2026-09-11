# Exercise standardization, 11 September 2026

The missing catalogue labels exposed two generations of content. Older records used `type`, while newer batches used `taskType`. The catalogue displayed the former field. The older exercises also predated the current exam blueprint, with shorter texts, fewer questions and missing task structures. The user chose a full rewrite and authorized GPT-6 Astra for separate author and reviewer roles. No Smithers workflow was used.

## Scope

All 386 exercise IDs and all 103 practice-set memberships remain intact. Batches 039–049 replace 77 older exercises. Batches 050–051 correct 17 newer KNM cards that exceeded the fact-card word limit; independent source checks also repaired overclaims about qualification duty, donor registration, voting, tax refunds and exceptions to rules. Batch 052 clarifies three illustration briefs after visual inspection.

| Rewritten legacy exercises | A2 | B1 |
| --- | ---: | ---: |
| Reading | 13 | 10 |
| Listening | 7 | 3 |
| Writing | 11 | 7 |
| Speaking | 11 | 7 |
| KNM fact cards | 8 | — |

The final bank has 539 closed questions and 164 open tasks. Every exercise has canonical metadata and a hash-verified, independently reviewed source. Older batch and review files remain as history. The differing task forms are intentional: an email, a picture sequence and a sentence-completion task retain their own requirements. Question totals follow those task requirements and existing set membership.

## Prevention

- The app and authoring tools share task types, domains and bilingual labels. `taskType` is the task form; B1 `textType` records the communicative category. The retired `type` field fails validation.
- Adoption checks a proposal before replacing files. Integration verifies exact source hashes and individual passing verdicts, then applies the shared authoring checks to each effective batch. Historical review shapes are read through an explicit compatibility function.
- Replacements name the IDs they supersede. Import resolution selects the latest source before mutating the catalogue, preventing old versions from discarding current media or overwriting new sentence starters.
- Sessions, level checks and completed records carry exercise revisions. Rewritten content drops obsolete answers and completion marks. Drafts and unaffected progress survive. Revisions depend on reviewed source content rather than generated media.
- Media generation requires reviewed sources. Build preparation checks file presence, audio script hashes and transcription results, and current illustration reviews. This catches a missing or stale asset before the app is built.

Author/reviewer briefs, the rubric and content-workflow instructions now describe this contract. Existing admin edits still remain drafts until independently reviewed.

## Media and validation

100 changed audio clips were generated from the reviewed scripts and passed transcription round trips. The three rewritten B1 conversations contain about 4.4–4.8 minutes of spoken fragments each, plus introductions and question audio. The 28 required illustrations passed independent visual inspection after four regenerations corrected door continuity, handoff direction and facial details. Hash-bound visual reports are stored in `content/media-reviews/`.

Automated tests cover malformed imports despite matching review hashes, historical review formats, preservation of current media and starters across repeated imports, progress migration, bilingual task labels and missing/stale/unreviewed media. Firefox coverage includes old and new catalogue rows, narrow layouts, saved progress and failure recovery. Final verification: `npm run check` passed with 86 tests, TypeScript, formatting, source-size checks and a production build. `npm run test:browser` passed its migration, standardization, infrastructure, refinement and home-sample journeys in an isolated Firefox profile, including 320/390 px views and failure recovery. `git diff --check` passed. The final catalogue has 539 questions, up from 510, with the same IDs and set membership. All required media checks pass; no current illustration remains unreviewed.

These are AI editorial and visual reviews. They do not validate CEFR difficulty, learner outcomes or equivalence to an official exam. Audio transcription checks verify wording but cannot certify pronunciation, emphasis or pacing. Full specialist listening review remains pending; this runtime could not receive audio input for direct listening inspection.

## Release preparation

The user subsequently authorized pushing all completed workspace changes to `main` and deploying them to oefenschrift.nl. Production Firefox checks passed at both the domain root and `/projects/oefenschrift`. A consistent backup of the live SQLite database passed `PRAGMA integrity_check` before release. The main-branch GitHub workflow gates deployment on the full check and browser jobs; its run for the release commit records the deployment outcome.
