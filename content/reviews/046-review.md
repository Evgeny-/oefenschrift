# Batch 046 review

Seven items pass after repairs to three prompts and two starters. Four items were edited; none rejected. All IDs and topics remain.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:speaking:batch002-fietsroute:1 | pass | comparable, unvalidated B1 target | Route advice integrates two safety features and a ten-minute calculation. |
| B1:speaking:batch002-cursusgemist:1 | pass | comparable, unvalidated B1 target | Absence explanation supports a two-part request to catch up. |
| B1:speaking:batch002-teamtaak:1 | pass | comparable, unvalidated B1 target | A brief status report supports a request for a task and a follow-up day. |
| B1:speaking:batch003-werkdruk:1 | pass | comparable, unvalidated B1 target | Two deadlines connect to a work risk and a priority question. |
| B1:speaking:batch003-buurtvergadering:1 | pass | comparable, unvalidated B1 target | Proposal persuades with a greenery benefit and retained parking. |
| B1:speaking:batch003-inwerken:1 | pass | comparable, unvalidated B1 target | Two advice points target inconsistent guidance; a later task checks their effect. |
| B1:speaking:batch003-cursuslocatie:1 | pass | comparable, unvalidated B1 target | Proposal combines a shorter wait and enough seats for sixteen learners. |

## Applied edits

- `B1:speaking:batch002-cursusgemist:1` `prompt` → U hebt gisteren door ziekte een cursusavond gemist; u hoort eerst uw medecursist. Leg uit waarom u afwezig was, vraag naar de lesstof en stel een dag en tijd voor om samen de aantekeningen te bekijken. Request a day and time explicitly, matching criterion 3.
- `B1:speaking:batch002-cursusgemist:1` `starters[2]` → Zullen we op … om … samen de aantekeningen bekijken? Complete the requested speech act while leaving the learner’s day/time or task reference open.
- `B1:speaking:batch003-werkdruk:1` `starters[2]` → Welke van … moet ik eerst doen? Complete the requested speech act while leaving the learner’s day/time or task reference open.
- `B1:speaking:batch003-inwerken:1` `prompt` → Een nieuwe collega maakt fouten doordat iedereen andere uitleg geeft; bekijk de tabel. Geef één advies over de begeleider en één over het vastleggen van de werkwijze, en beschrijf hoe u later controleert of dit helpt. Name both advice subjects so two otherwise valid advice points cannot fail hidden criteria.
- `B1:speaking:batch003-cursuslocatie:1` `prompt` → Uw avondcursus is verhuisd en u moet na de les lang op de bus wachten; bekijk de tabel. Overtuig uw docent om lokaal B te gebruiken: stel de verhuizing voor en geef twee redenen, één over de terugreis en één over de ruimte voor de groep. The table proves waiting time, so describe waiting rather than an unsupported longer bus journey.

All seven samples omit one goal, with fourteen exact quotes and one deliberate learner error each. Twenty-one starter completion tests and exact model evidence are in the JSON review. The table arithmetic passes: ten extra cycling minutes, four retained parking spaces, a fifteen-minute wait at B, and twenty seats for sixteen learners.

Short models have 32–34 words; middellange models have 47–52. The time limits allow pauses at around one hundred words per minute. The four table tasks require connected advice or persuasion. Project comparisons use batch016-examendatum and batch030-eindpresentatie for kort, batch017-fietskeuze and batch017-sportabonnement for middellang; the dedicated exemplar directory is absent.

This migration preserves seven historical topics. It contains three korte and four middellange tasks across work, education and one neighbourhood setting. It is not a full mock form. No invented business or institution names need a search.

Generate seven narrator prompts and three single-character cues after adoption. The approved roles are m-young and f-adult. Native text tables need no illustrations. Rendered audio and learner timing remain unreviewed; B1 difficulty and exam equivalence have not been validated.

`npm run batch:check -- content/batches/046-proposed.json` passed with no failures or warnings.

Proposed source SHA-256: `dcdd01f4056d51a4d41a228ce3cec41b8520628af738d1e993f1f451eedffaca`

Proposed starters SHA-256: `88b2605d1da799e25e45ce842963ba87fde4b1be2fa2de1c0fcc790645b9710c`

Coordinator: adopt both proposed files with `npm run batch:adopt 046`, then complete media and integration gates. No integration or media work was performed here.
