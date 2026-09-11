# Batch 044 review

All six replacements pass after edits to two tasks. No items rejected. All six legacy IDs and topics remain. The proposed starters also pass.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| A2:speaking:buurvrouw:1 | pass | comparable, unvalidated | Extra work shift is the reason for absence. Saturday is a proposed alternative. Two o’clock supplies the requested visit time. |
| A2:speaking:te-laat:1 | pass | comparable, unvalidated | Flat tyre explains delay. Half past nine states arrival. The bus supplies the new transport method. |
| A2:speaking:batch001-apotheek:1 | pass | comparable, unvalidated | The pharmacy counter identifies the place. Giving paper and taking a box supply two visible actions. Finding help pleasant because of medicine questions expresses an opinion without giving medical advice. |
| A2:speaking:batch001-koelkast:1 | pass | comparable, unvalidated | The small fridge is the model’s choice; either picture is permitted. Living alone and buying little food explain the choice. The large fridge has more space and does not fit the model speaker’s kitchen. |
| A2:speaking:batch002-kapper:1 | pass | comparable, unvalidated | Hanging a coat covers the first panel. Sitting and the haircut cover the second panel. Card payment covers the third panel. |
| A2:speaking:batch002-portemonnee:1 | pass | comparable, unvalidated | Looking under a table covers the first panel. Talking to the member of staff covers the second panel. Receiving the blue wallet covers the third panel. |

## Applied edits

- `buurvrouw.model`: “Daarom lukt ons bezoek niet.” becomes “Daarom kan ik niet komen.” This states the problem naturally.
- `kapper.sample`: “Roos hang haar jas op. Aan het einde betaalt ze met haar pas.” The deleted sitting sentence already described the second panel under its broad criterion. The null quote now marks a real omission. One typical agreement error remains for feedback; the first quote is updated verbatim.
- `buurvrouw` starter 3: “Ik kan om … bij u komen.” Filling in a time produces a complete sentence. Criteria stay unchanged.

## Checks and comparisons

The full originals, historical source, author notes and starters were read, followed by a full reading of the final proposals. All twelve non-null sample quotes are exact. Each sample omits one criterion; every model meets all three. The model range is 31–34 words, with no sentence over fourteen words. All eighteen starter completion tests appear in the JSON review.

Compared each task with two adopted batch 027 tasks of the same type: ziekmelden/taalcafe-oefenen, wachtkamer/keuken, bakkerij/contant-pinnen, and sollicitatiegesprek/verhuizen. The language and communication demands are comparable as project authoring targets. The exemplar directory is absent.

`npm run batch:check -- content/batches/044-proposed.json` passed with six items, zero questions, no failures and no warnings. The six existing catalogue IDs are intentional replacements.

## Diversity and production

The broken-fridge purchase remains within its historical topic; the hairdresser sequence retains the visit setting. These are acceptable format repairs. Service contexts predominate, and the type counts are 2/1/1/2, so this migration group is not a complete mock. Keep the hairdresser sequence apart from the existing clothes-alteration sequence when selecting a varied form.

Eleven image briefs preserve cast traits and sequence settings. Fridge height is the sole pair difference. The two cues use configured f-older and f-adult roles; third details are explicit in the prompts. Generate six narrator instructions, two cues and eleven pictures after adoption. Check the pharmacy’s two actions, fridge scale, visible cutting near Roos’s bun, card payment, empty search scene and returned blue wallet. No media was generated.

## Hash gate and limitations

Proposed batch SHA-256: `109b2684de73024b400aa2d499f19cdb19573322946eb26e6893d97a2a9b3123`

Proposed starters SHA-256: `8325698102406bb2d690d640860c56daec321e734c2a342f3c581f7b18b72a9e`

The review source points to `content/batches/044-original.json`, with the hash of the proposed bytes for adoption. Adopt both proposed files together. No KNM or other factual rule needs verification; there are no invented business names. This is an AI editorial review. A2 difficulty remains unvalidated, and the rendered media still needs review.
