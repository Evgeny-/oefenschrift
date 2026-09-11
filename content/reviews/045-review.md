# Batch 045 independent editorial review

All five items pass after one model edit. All 15 sentence starters pass unchanged. No items rejected; no level flags. A2 remains an unvalidated authoring target.

| ID | Verdict | Level comparison | Evidence |
| --- | --- | --- | --- |
| A2:speaking:batch002-burenpakket:1 | Pass | Comparable | Acceptance, storage and handover map to the three panels; sample omits handover. |
| A2:speaking:batch003-tramkaart:1 | Pass | Comparable | Choice, help as reason and comment about the machine meet the prompt; sample omits the machine. |
| A2:speaking:batch003-jas:1 | Pass | Comparable | Home location, coat and phone, then an opinion; sample has no opinion. |
| A2:speaking:batch003-monteur:1 | Pass after edit | Comparable | Cue requests appointment window and arrival status; instruction requests current time, absent from sample. |
| A2:speaking:batch003-speeltuin:1 | Pass | Comparable | Playground location, fence and slide, then an opinion; calling the fence broken is an observation. |

## Applied edit

In the monteur model, “Het is nu half twaalf.” becomes “Nu is het half twaalf.” This removes a complete sentence copied from the prompt while retaining the required time. No criteria or starters changed. Every non-null quote occurs verbatim in its sample. The models cover all goals and contain 29–31 words; the longest sentence contains eleven words. The JSON records prompt evidence and grammatical starter completions for every criterion.

## Task shape and diversity

All five supplied IDs and broad subjects remain. Counts are one sequence, one choice, two descriptions and one direct spoken answer. The catalogue comparison distinguishes parcel storage from cooking for a neighbour and buying a tram ticket from choosing a vehicle. Neighbourhood topics are inherited replacements. This migration batch does not form a complete mock exam.

Compared each type against two batch 027 tasks: sollicitatiegesprek/verhuizen, bakkerij/contant-pinnen, wachtkamer/keuken and ziekmelden/taalcafe-oefenen. Task operations are comparable, with shorter models and explicit requested details. The project has no content/exemplars directory; these comparisons do not establish calibrated difficulty or exam equivalence.

## Author questions and media

Asking for help explains the preference for an employee and says nothing about the other picture. The coat ownership mistake is established in the prompt because an image cannot establish ownership. Any reasonable opinion about the playground may satisfy the opinion criterion.

Eight briefs repeat the configured cast traits. Karim, the parcel and the doorway stay consistent across the sequence. Roos appears in the same tram-station setting for both purchase methods. Sabrina uses the configured f-adult role; the task discloses its audio/still substitute for video. No named companies or KNM facts require web verification.

After adoption, generate five narrator instructions, one cue and eight illustrations. Media review must inspect the direction of parcel handovers, matched ticket-pair viewpoint, distinct coat and phone, and the fence gap beside the slide. No actual media was generated or reviewed here.

## Verification and adoption

`npm run batch:check -- content/batches/045-proposed.json` checked five items with no failures or warnings. All five replacement IDs occur in the review. The source hash refers to proposed bytes for adoption; the unchanged starters retain their own hash.

- Proposal SHA-256: `e0b865c5adca723acc9f1e0485c73955794fd85d2d728ad316c920fa178caaba`
- Starters SHA-256: `3547b46ac8f12adab5490d11726ad4467268d71d3882f0be16f3152d31970605`

The coordinator can adopt batch 045. This review is an AI editorial assessment; human difficulty and learner outcomes remain unvalidated.
