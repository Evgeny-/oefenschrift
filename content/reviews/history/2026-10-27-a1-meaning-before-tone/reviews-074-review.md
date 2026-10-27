Batch 074: all nine A1 writing items pass the fresh source-first and full-item editorial review. Prior source and review files remain in `content/reviews/history/2026-10-27-a1-initial`. These local foundation targets have no validated CEFR difficulty or official-exam equivalence.

| Item         | Verdict | Level verdict                | Reason                                                                                                            |
| ------------ | ------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| schoenlunch  | pass    | local A1 target; unvalidated | Obtain lunch food from a person who has yet to arrive; the shoe explains why the learner asks for bread.          |
| appelui      | pass    | local A1 target; unvalidated | Tell the seller about the wrong item and request the item bought.                                                 |
| ontbijttaart | pass    | local A1 target; unvalidated | Respond to the host cake photo and communicate a drink preference for the planned breakfast.                      |
| lepelmuziek  | pass    | local A1 target; unvalidated | Arrange a shared music activity and ask the arriving participant to bring a usable percussion object.             |
| tuinfilm     | pass    | local A1 target; unvalidated | Give Sabrina the location and starting time that she explicitly requested.                                        |
| fietsfeest   | pass    | local A1 target; unvalidated | Give the organiser an attendance confirmation and a food contribution for the stated party.                       |
| stoelsokken  | pass    | local A1 target; unvalidated | Request a specific available classroom seat for the next day.                                                     |
| reuzenbox    | pass    | local A1 target; unvalidated | Answer Roos stated question about the parcel and add a simple opinion about the box she asked about.              |
| komhoed      | pass    | local A1 target; unvalidated | Continue an explicitly remote photo exchange by reacting to the received portrait and requesting another picture. |

The blind findings were saved before opening the answer guidance. The complete final source was reread after the small edits and the source-only packet was regenerated. For 074, the first pass found three purpose gaps; the second blind pass checked the explicit Sabrina question, Roos parcel question and separate home/class photo exchange before the full review.

Edits from the archived source are recorded field by field, with exact before/after values, in the JSON review.

- The lunch request now reaches Julio before he arrives. The wrong-item message goes from home to the shop. Breakfast and chair tasks establish the photo exchange and tomorrow context.
- Sabrina explicitly asks where and when the film is; the pictured host is an anonymous woman. Roos explicitly asks about the parcel contents. The bowl portrait reaches the learner at home from Sabrina class.
- `Het pakket` removes the ready-made size opinion from the delivery title. `De film` matches the scene after decorative flowers were removed. All 27 final starter fragments remain incomplete and align with their goals.

Every image brief keeps the required scene, cast traits, task facts and exclusions while removing decorative scenery and separate aesthetic directions. The canonical `config/illustration.json` stylePrefix supplies the minimal flat style. Descriptive open-task alt text stays as the accessible equivalent of the picture and agrees with the final source.

The messages vary a lunch-food request, wrong-item remedy, host-photo reply with drink preference, invitation with equipment, event-information reply, attendance with food contribution, seat choice, parcel-query reply and photo reply. Familiar message forms recur while the practical needs differ.

The exact proposed source passes `npm run batch:check` with nine items, zero questions, no failures and no warnings. `meaningReviewErrors(review, items, false)` returns an empty array for the exact final proposed files. Each prompt has two concrete content goals and each model has 8–25 words. Every prepared sample misses exactly one content goal and every non-null quote is verbatim.

Proposed source SHA-256: `967022271a413071c519b40372e93bd1b5ddd40986a796a9e3320f8ec9f302ab`.

Reviewed starters SHA-256: `2768d118b3bb49c3b16fe0d96f60806a4b6411dc1bca3839b1eed4d594ac381f`.

Final source-only packet SHA-256: `af4501236d817226657c3b8a117d8431fb1066a7188ce569f6e8244371d24ead`.

The coordinator can adopt these exact proposed files through the hash gate. Keep existing IDs and set membership. Changed illustration briefs require regeneration and visual review before media approval. This review made no provider calls and did not inspect rendered media or browser journeys.

## Focused bicycle-brief review

Only the clause `holds a city bicycle upright in a courtyard.` changes to `stands beside a city bicycle in a courtyard.`. The existing alt already describes Julio standing with the bicycle. His plate of cake remains held toward it; the party hat and garland remain. The learner still confirms attendance and names a self-chosen food contribution. Holding the bicycle is neither requested nor assessed. Prompt, criteria, sample, model, quotes, starters, title, alt and all other source fields are unchanged. The new clause adds no style direction.

This focused independent source review passes. The preceding source, review and packet are archived in `content/reviews/history/2026-10-27-bicycle-brief/`. The image must be regenerated from this exact canonical brief and reviewed as new media. No earlier image is retrospectively approved.
