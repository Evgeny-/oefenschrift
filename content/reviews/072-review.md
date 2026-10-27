# Batch 072: independent source and question review

Pass: 9 items and 18 questions. Reviewer repairs: 3 items. Rejected: 0. A1 is a foundation authoring target; difficulty is unvalidated.

Proposed SHA-256: `f5d3c44e7d98966ba740f108b3325166ba3071335d310c708720b6579645036b`. Final source-packet SHA-256: `d52c80dec547c982668f88cce342d642411d50cf6502cc4dc30d5e24bd08d4dd`.

| ID | Verdict | Level target | Reason |
| --- | --- | --- | --- |
| `A1:listening:batch072-banaan-telefoon:1` | pass (edited) | A1 foundation | q1 repaired to remove a cross-question cue; Een afspraakgesprek oefenen door rollen, hulpmiddel en eerste stap af te spreken. |
| `A1:listening:batch072-eend-reis:1` | pass | A1 foundation | Verduidelijken waarom de eend meegaat en afspreken hoe en wanneer zij naar hun reis vertrekken. |
| `A1:listening:batch072-stoel-ogen:1` | pass (edited) | A1 foundation | q1 repaired to remove a cross-question cue; De ontbrekende pen lokaliseren zodat Roos het formulier kan invullen en daarna aan Ruben geven. |
| `A1:listening:batch072-grote-hoed:1` | pass (edited) | A1 foundation | q1 repaired to remove a cross-question cue; Twee broden bestellen en een zak voor het meenemen vragen. |
| `A1:listening:batch072-bezem-feest:1` | pass | A1 foundation | Controleren dat de vloer schoon is, muziek aanzetten en samen dansen terwijl de voorbereiding klaar is. |
| `A1:listening:batch072-doos-oren:1` | pass | A1 foundation | Karim informeren voor wie het cadeau is en wat erin zit terwijl Lieke het afsluit. |
| `A1:listening:batch072-paraplu-werk:1` | pass | A1 foundation | Verklaren waarom de paraplu openstaat en de terugreis in de regen bespreken. |
| `A1:listening:batch072-bloem-beker:1` | pass | A1 foundation | Een korte beleefde opening laten volgen door een bestelling soep en water die Jerry gaat brengen. |
| `A1:listening:batch072-kat-boeken:1` | pass | A1 foundation | De tas vrijmaken zodat Ruth op tijd naar haar werk kan vertrekken. |

The blind meaning findings were persisted before opening the full items, answer material and notes. They explain every source’s purpose; listening records every exact turn and its function. The final source-only packets match those blind packets byte for byte after repairs.

Reviewer edits:

- `A1:listening:batch072-banaan-telefoon:1`: Replaced q1 about Ruth’s doctor role, which q2 cued, with one explicit instruction: Wat moet Roos eerst zeggen? A Haar naam.; B Haar adres.; C Haar leeftijd. Key A. Evidence Zeg eerst je naam. Skill detail. Explanation Ruth zegt dat Roos eerst haar naam moet zeggen.
- `A1:listening:batch072-stoel-ogen:1`: Replaced q1 about the missing pen, which q2 named, with Wat moet Roos doen? A Een brief schrijven.; B Een formulier invullen.; C Een computer gebruiken. Key B. Evidence Ik moet een formulier invullen. Explanation Roos moet een formulier invullen. Daarom zoekt ze haar pen.
- `A1:listening:batch072-grote-hoed:1`: Replaced q1 about buying bread, which q2 named, with Wanneer wil Fatima het brood eten? A Vanmorgen.; B Vanavond.; C Vanmiddag. Key B. Evidence Ik wil graag brood voor het eten vanavond. Skill time-place. Explanation Fatima wil het brood vanavond eten.

The complete replacement diff is recorded field by field in the JSON report. Its `questions` entries prove each key and explain every distractor. Every item also has a separate audit of title, situation, image brief, alt and cross-question cues.

Tone: 8 ordinary and 1 light-humor. Batch 071’s paper eyes and batch 072’s broom dance supply the two humorous closed items. A toy gift, pet, drying umbrella and paper café decoration remain ordinary. The coordinator must verify five humorous tasks across the 36-item program.

Reading covers coffee invitation, birthday-card preparation, coat collection, station pickup, doctor arrival, birthday visit, computer help, park lesson and dog outing. Listening covers roleplay setup, departure planning, form help, bakery order, party preparation, gift packing, wet-weather commute, café order and leaving for work. Existing A1 batches 069/070 and same-part catalogue titles were inspected for comparison. Recurring names do not turn distinct practical purposes into duplicate tasks. Bring-an-object requests and time/place details recur within the deliberately narrow A1 target; no source was padded to manufacture alternatives.

Both 9-item proposals pass the shared batch checker without failures or warnings. Each batch has A=6, B=6, C=6; each preserved three-item group has two of each letter. All evidence is verbatim, all listening `text` fields match their scripts and all listening scripts have four turns and 30–34 spoken words.

Regenerate five changed fragments: banaan-telefoon, eend-reis, stoel-ogen, grote-hoed, doos-oren. Regenerate q1 narration for banaan-telefoon, stoel-ogen and grote-hoed. Five image briefs change: banaan-telefoon, eend-reis, stoel-ogen, grote-hoed, doos-oren. Retain other media only when exact source hashes and current rendered reviews remain valid.

Existing per-item Karim override to Ruben remains required; no config change authorized or made.

Previous JSON and Markdown reviews were verified against the archived snapshots in `content/reviews/history/2026-10-27-a1-meaning-before-tone/` before replacement. No adoption, integration, catalogue edit, provider call or media generation was performed. Rendered media and listening quality remain outside this source review.
