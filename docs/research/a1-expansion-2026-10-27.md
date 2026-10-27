# A1 expansion, 27 October 2026

The adopted replacement sources for batches 071–074 contain 36 exercises, nine per language skill. Their final independent reviews classify 31 as ordinary and five as lightly humorous, or 13.9%. The [combined tone record](../../content/reviews/2026-10-27-a1-tone-balance.json) identifies each item. The six earlier pilot exercises in 069 and 070 were also rewritten and passed fresh review contract version 2. All six are ordinary.

After final integration, the catalogue has 42 A1 exercises within 428 total exercises, 117 stable practice sets and sentence starters for 182 open exercises. The expansion contributes twelve three-item sets and 54 optional starter fragments. Its closed tasks contain 36 questions. The 18 open tasks have two content goals each, with an additional understandable-language criterion.

A1 remains foundation practice under [blueprint section 4.0](../../content/blueprint.md). Every item uses `exam: a1-practice` and `targetLevelValidated: false`. The final reading messages contain 26–38 words; the nine new listening conversations have four turns and 30–34 spoken words. Speaking uses a 20-second recording guide with no timed preparation. Each open task can be answered briefly. These authoring and AI editorial checks do not establish validated CEFR difficulty or exam equivalence.

## Final source review

The following actors produced and reviewed the current tone-repair sources. Earlier author identities and ratings in historical records describe superseded versions.

| Batches | Current repair author | Fresh independent reviewer | Final tone |
| --- | --- | --- | --- |
| 069–070 pilots | `/root/repair_a1_listening_meaning` | `/root/review_pilot_meaning` | 6 ordinary |
| 071 reading | `/root/repair_a1_listening_meaning` | `/root/review_balanced_closed` | 8 ordinary, 1 light humor |
| 072 listening | `/root/repair_a1_listening_meaning` | `/root/review_balanced_closed` | 8 ordinary, 1 light humor |
| 073 speaking | `/root/repair_a1_open_meaning` | `/root/review_balanced_open` | 7 ordinary, 2 light humor |
| 074 writing | `/root/repair_a1_open_meaning` | `/root/review_balanced_open` | 8 ordinary, 1 light humor |

Each reviewer started in a fresh context with source-only packets and saved item-specific meaning findings before receiving questions or other answer material. It then read the full final items, repaired problems where needed and rechecked the final source packet. The coordinator read the final sources and review evidence before adoption through `npm run batch:adopt`. All six current reviews use contract version 2 without the historical legacy exemption. The [meaning-review record](meaning-review-2026-10-27.md) describes the gate and its limits.

| Adopted source | Exact SHA-256 | Passing editorial evidence |
| --- | --- | --- |
| [069 source](../../content/batches/069-original.json) | `2ea92e35342b8106d97bca4f1d0652af3a07520f67ff62ba776756b115ff49ca` | [069 final review](../../content/reviews/069-review.json) |
| [070 source](../../content/batches/070-original.json) | `cbab425f18852bffc1b2f1b668f28a80a4f0c37c50da686d224091f9af7f0e67` | [070 final review](../../content/reviews/070-review.json) |
| [071 source](../../content/batches/071-original.json) | `52885cb9bf887f392ec1927d8fc9897e3276fca8968191855bb39842b847e382` | [071 final review](../../content/reviews/071-review.json) |
| [072 source](../../content/batches/072-original.json) | `f5d3c44e7d98966ba740f108b3325166ba3071335d310c708720b6579645036b` | [072 final review](../../content/reviews/072-review.json) |
| [073 source](../../content/batches/073-original.json) | `badf61f8b2d67f93d074c1b1dc78385fed9c8498403d7bec3e5fa9c356645110` | [073 final review](../../content/reviews/073-review.json) |
| [074 source](../../content/batches/074-original.json) | `50ebeb07b9885faa13d6c43905789aac818f74bbc6e80de1ea4bae4100397b4e` | [074 final review](../../content/reviews/074-review.json) |

The exact reviewed starter hashes are `f07f1f36bbe6e1a569c844f3f906b37c3caa5ba4cee66502e666ff1a6e7e632b` for [073](../../content/batches/073-starters.json) and `2cbe18cd55665a7bab261f95147c6368c437b87f374581268c1b81143fc5dafc` for [074](../../content/batches/074-starters.json). Each fragment remains incomplete. Every open sample omits one content goal; its other evidence quotes occur verbatim.

All original exercise IDs remain stable, including slugs that still name removed comic props. Actual source changes receive new reviewed revisions. Replacing only derived media preserves the source revision. Browser history migration retains exact old audio aliases for earlier `q1` response fingerprints, while new `q2` fingerprints exclude media URLs. Existing database history and older media remain available.

The [final evidence archive](../../content/reviews/history/2026-10-27-a1-final-evidence/README.md) preserves 34 text files from the ignored tone-repair workspace. Its [index](../../content/reviews/history/2026-10-27-a1-final-evidence/index.json) maps original paths to immutable snapshots and hashes. It includes pilot drafts and their blind findings, plus author notes, packets, starters and final change records for 071–074. Earlier reviews remain in the neighbouring history directories and are not current approvals.

## Final illustrations and audio

The [recovered prompt audit](original-illustration-prompt-2026-10-27.md) establishes the exact original house prefix from repository history. Its UTF-8 SHA-256 without a trailing newline is `af5cc1b64534f76550e045ee989d3e81bf3c3915746c432325087737e2075fc1`. The accepted prefix reads:

> Minimal flat illustration made of a few simple shapes: no outlines, no texture, no background objects. Palette: warm off-white paper, charcoal grey, mustard yellow, plus one or two muted colours used sparingly (dusty blue, sage green, soft terracotta). Large empty space, deliberately low detail, friendly and calm, everyday Netherlands. No text, no captions, no logos.

The final 36-image selection contains 23 newly generated flat illustrations and 13 retained canonical-style illustrations. `/root/images_a1_speaking_fun` produced twelve replacements and `/root/images_a1_writing_fun` produced eleven. The generation prompt uses the recovered prefix verbatim, then the final reviewed scene and expanded cast facts, followed by the original 070 composition suffix verbatim. Reference images served visual QA only. The [house-style review](../../content/reviews/2026-10-27-a1-house-style.json) records all selected file hashes. The coordinator, separate from those producers, inspected all 36 at exercise scale and enlarged details that affect answers. Its visual verdict passes; user taste approval remains pending.

The final A1 audio inventory has 45 clips: twelve conversations, 24 question narrations and nine speaking prompts. `/root` generated the audio. Independent reviewer `/root/voice_generation_targeting` checked the exact final bytes against adopted sources, effective casting and supplementary transcripts. The [final A1 audio review](../../content/reviews/2026-10-27-a1-tone-audio.json) passes all 45 for technical application. It records nineteen fresh supplementary transcript checks and 26 exact byte/text reuses. No auditory assessment or human listening approval is claimed. A separate [14-clip legacy replacement review](../../content/reviews/2026-10-27-robert-lieke-replacement.json) covers the Ruben/Lieke changes described in [the voice record](voice-quality-2026-10-27.md).

## Final local validation

The [release validation record](../../content/reviews/2026-10-27-a1-release-validation.json) binds these results to the final catalogue hash and approved media. Integration produced 428 exercises, including 42 A1 exercises across fourteen sets: twelve reading, twelve listening, nine speaking and nine writing. All 386 earlier exercise IDs and source revisions remain intact.

`npm run check` passed all 165 tests, type checking, formatting, the source size limit and the production build. All ten isolated Firefox journeys passed, including the four A1 skills at 320px and 390px, audio retry, saved drafts and the single editable speaking transcript. Read-only HTTP checks passed for all 95 selected media files, five home images and fourteen A1 set pages. Every one of the 59 audio files returned correct partial content.

The local database matches the final published catalogue and preserves prior editorial history. An online backup of the remote production database passed its integrity check before publication. This record covers local release readiness; production deployment requires separate evidence.
