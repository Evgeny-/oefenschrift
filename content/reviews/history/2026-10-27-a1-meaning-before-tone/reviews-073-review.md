Batch 073: all nine A1 speaking items pass the fresh source-first and full-item editorial review. Prior source and review files remain in `content/reviews/history/2026-10-27-a1-initial`. These local foundation targets have no validated CEFR difficulty or official-exam equivalence.

| Item | Verdict | Level verdict | Reason |
| --- | --- | --- | --- |
| reuzenbeker | pass | local A1 target; unvalidated | Provide a short spoken picture description of two concrete visible properties: object identity and size. |
| miniparaplu | pass | local A1 target; unvalidated | Describe two visible properties of the same familiar object aloud. |
| langesjaal | pass | local A1 target; unvalidated | Produce a short spoken description of place and colour from a visible scene. |
| koelkastbal | pass | local A1 target; unvalidated | Name the visible refrigerator content and colour in short spoken phrases. |
| tuinbed | pass | local A1 target; unvalidated | Describe a visible location category and action aloud. |
| boekenpan | pass | local A1 target; unvalidated | Describe visible containment and a small explicit quantity in speech. |
| hondenboek | pass | local A1 target; unvalidated | Give two simple spoken observations about a person and a nearby animal. |
| samenjas | pass | local A1 target; unvalidated | Describe one visible quantity and one colour aloud. |
| stofzuigerdans | pass | local A1 target; unvalidated | Describe a visible action and familiar room in short spoken sentences. |

The blind findings were saved before opening the answer guidance. The complete final source was reread after the small edits and the source-only packet was regenerated. For 074, the first pass found three purpose gaps; the second blind pass checked the explicit Sabrina question, Roos parcel question and separate home/class photo exchange before the full review.

Edits from the archived source are recorded field by field, with exact before/after values, in the JSON review.

- Visible titles now leave the target object, colour, count, location and action to the learner. `Julio en de hond` and `De jas` remove the remaining suggestive titles.
- The cup size starter is `Het is …`, so it does not supply the earlier object goal. All 27 final starter fragments remain incomplete and align with their goals.
- The scarf, sleeping-woman and shared-coat samples now contain one understandable beginner error. Their quotes match exactly and each sample still omits one content goal.
- The dance model is `Sabrina danst. Ze is thuis in de keuken.` It meets both goals in eight words without requiring the vacuum-cleaner noun.

Every image brief keeps the required scene, cast traits, task facts and exclusions while removing decorative scenery and separate aesthetic directions. The canonical `config/illustration.json` stylePrefix supplies the minimal flat style. Descriptive open-task alt text stays as the accessible equivalent of the picture and agrees with the final source.

The shared speaking act is picture description. The nine scenes vary the observed object, size, colour, action, location and quantity, using one visible surprise at a time. No learner must explain the joke.

The exact proposed source passes `npm run batch:check` with nine items, zero questions, no failures and no warnings. `meaningReviewErrors(review, items, false)` returns an empty array for the exact final proposed files. Each prompt has two concrete content goals and each model has 8–25 words. Every prepared sample misses exactly one content goal and every non-null quote is verbatim.

Proposed source SHA-256: `240cb0b0fee9ed0a94142fcbcc9193317fcdab9b2dcde62405a37d1ae62b8075`.

Reviewed starters SHA-256: `8837ecd25cf174d30fad3e61fa572397df7de0f08cbc36b25680f046f96df650`.

Final source-only packet SHA-256: `044afa6ce918dc21537591f07af82ff502a73406b693ac794cc3e0e23366d374`.

The coordinator can adopt these exact proposed files through the hash gate. Keep existing IDs and set membership. Changed illustration briefs require regeneration and visual review before media approval. This review made no provider calls and did not inspect rendered media or browser journeys.
