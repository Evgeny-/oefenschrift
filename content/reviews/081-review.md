# Review of batch 081 (A1 writing, 9 rewrites + 3 new), 28 October 2026

Independent AI editorial review, fresh context. Blind meaning pass written before criteria, models, samples, starters or notes were opened; repeated on the final proposed bytes. This is not validated CEFR difficulty or exam equivalence.

Proposed file: `content/batches/081-proposed.json` (SHA-256 in `081-review.json`); starters: `081-proposed-starters.json` (one starter changed). `npm run batch:check` on the proposed file: no failures, no warnings.

| id | verdict | level | reason |
| --- | --- | --- | --- |
| batch074-ontbijttaart | pass (edited) | A1, easier than A2 | prompt now says the learner is a guest, so "wat drink je?" follows |
| batch074-schoenlunch | pass (edited) | A1 | criterion names the banana |
| batch074-appelui | pass (edited) | A1 | criteria name "geen appels", peren/bananen |
| batch074-lepelmuziek | pass (edited) | A1 | "Dit is uw kamer." makes the piano the learner's |
| batch074-tuinfilm | pass (edited) | A1 | criterion names the garden |
| batch074-fietsfeest | pass (edited) | A1 | criterion names the broken bicycle |
| batch074-komhoed | pass (edited) | A1 | criterion names the flower as one option |
| batch074-reuzenbox | pass (edited) | A1, funny | neighbour no longer stands beside the learner |
| batch074-stoelsokken | pass (edited) | A1 | address request replaced by "kom je morgen naar de les?" |
| batch081-bus-laat | pass (edited) | A1 | prompt and criteria clarified |
| batch081-schoenen-klein | pass (edited) | A1 | criterion names "te klein" |
| batch081-hond-hoed | pass (edited) | A1, funny | criteria name the hat |

## Edits

- Criteria (all items except the two language criteria, where the fact was hidden): rewritten to name the concrete fact in a plain main clause of at most twelve words, per the coordinator decision (for example `stoelsokken`: "U zegt: er ligt een sjaal op de stoel."). The prompts still ask for every goal without printing the answers.
- ontbijttaart prompt: added "U komt bij haar." and split "Ze stuurt een foto. Ze vraagt: wat drink je?" so the drink question has a reason.
- lepelmuziek prompt: added "Dit is uw kamer." so the unattended piano reads as the learner's instrument.
- reuzenbox prompt: "Een heel groot pakket komt bij u thuis. Uw buurvrouw ziet het. Ze vraagt: wat zit er in de doos?" The neighbour no longer brings the parcel and stands beside the learner.
- stoelsokken: "cursist" dropped; second goal is now "Vraag: kom je morgen naar de les?" (model, sample and starter "Kom je …?" follow). The sample now omits goal 2 and shows the error "een blauw sjaal".
- bus-laat prompt: "Hoe laat bent u op het werk?" replaces "hoe laat bent u er?".
- Attempted "voorband/band/bijvoorbeeld": not on the word list, so the criteria use colons and fietsfeest keeps the alt "De fiets is kapot."

## Rejected

None.

## Notes

- Tone: 10 ordinary, 2 light-humor (reuzenbox, hond-hoed); coordinator checks the program total.
- Diversity: 12 different scenes in 6 domains; names within limits (Hugo, Selma, Ravi twice).
- Media risks: piano with no guitar and nobody present; no apples in the supermarket (the empty crate only reads as sold out); flat front tyre clearly different from the rear; exactly one spoon; no bus in sight.
- Limitations: the flat tyre cannot be named in the alt with list words; the learner's gender differs between the drawn figures (man at the bus stop, women elsewhere), acceptable because each picture shows "u" once.
