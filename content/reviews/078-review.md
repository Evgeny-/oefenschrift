# Review of batch 078 (A1 listening, 15 new conversations)

Independent AI editorial review, 28 October 2026. Reviewed source: `content/batches/078-proposed.json` (SHA-256 `2dd7e4e592080371fb363ed2f352018da7c9b39adebbdea006d86d709250a191`). Meaning pass done on the source-only packet before questions, keys, options or notes; repeated on the final bytes (packet hash `425428fa…7297`). Difficulty is an authoring target, not validated.

Result: 6 pass, 9 pass (edited), 0 rejected. Keys A 10, B 10, C 10. `npm run batch:check` on the proposed file: no failures, no warnings.

| Item | Verdict | Level | Reason |
| --- | --- | --- | --- |
| gemeente-foto | pass (edited) | within A1 target | "morgen" made the return visit unclear; now "Kom morgen weer. Neem een foto mee." |
| dokter-bellen | pass (edited) | within A1 target | time now a statement; q1 options made parallel (key was odd one out) |
| bus-station | pass (edited) | within A1 target | q1 uses "naartoe" |
| taxi | pass | within A1 target | address, then time; one fact per turn |
| melk-zoeken | pass (edited) | within A1 target | "daar" needed a gesture; implausible distractor "Boven" |
| markt-appels | pass | within A1 target | order, price, payment; clear |
| jas-passen | pass | within A1 target | size and colour in separate turns; picture all beige |
| eerste-dag | pass | within A1 target | start time and coffee place |
| kind-ziek | pass (edited) | within A1 target | q2 gave away q1 ("de dochter"); situation made a distractor implausible |
| huiswerk | pass (edited) | within A1 target | "oefening tien" to "pagina tien"; situation clarified |
| feest-zaterdag | pass (edited) | within A1 target | q1 asked the party day, script says the birthday day; cake now stated, not asked |
| zwembad-open | pass | within A1 target | opening time and price |
| buren-sleutel | pass (edited) | within A1 target | "op zondag" unnatural; suitcase |
| eieren-taart (funny) | pass | within A1 target | reason for ten eggs is in the source; picture supports joke |
| twee-schoenen (funny) | pass (edited) | within A1 target | "Ik moet lachen" idiomatic; now "Ik lach om mijn schoenen" |

## Edits (field to new text, reason)

- gemeente-foto script[1]: "Goed. Kom morgen weer. Neem een foto mee." The old "Neem morgen een foto mee" left it open whether Kees returns. q1 evidence and explanation follow.
- dokter-bellen script[2]: "U kunt vandaag om elf uur komen." Decides the author's doubt: the fact is stated once by the assistant, not in a question that Nadia then accepts. q2 evidence follows.
- dokter-bellen q1 options: "Hoest." / "Pijn." / "Koorts." The key was the only option not shaped "Pijn in zijn ...". Explanation follows.
- bus-station q1: prompt "Waar wil Zara naartoe?", options "Naar de markt." / "Naar het station." / "Naar het ziekenhuis." (`naartoe` now allowed; she is already on the bus).
- melk-zoeken script[1]: "De melk staat naast de kaas." ("daar" relied on a pointing gesture that neither audio nor picture has); q2 option C "Achter." (upstairs checkout was implausible); q1 evidence follows.
- kind-ziek situation: "Yusuf belt de school." (singular "zijn kind" ruled out distractor "Zijn twee kinderen"); q1 option B "Zijn vrouw."; q2 prompt "Wanneer komt het kind weer?" (the old "de dochter" gave away q1).
- huiswerk situation: "Rik belt Zara. Zij zit ook in de les."; script[1] "Ja. Het is pagina tien."; q1 prompt, options, evidence and explanation use "pagina". Decides the "oefening tien" doubt.
- feest-zaterdag q1 prompt: "Wanneer is Maria jarig?" (the script states the birthday day, the old question asked for the party day); script[2] "Een taart, graag." (answer to Kees's question); q2 evidence follows. Decides the doubt about facts inside questions.
- buren-sleutel script[2]: "Ik kom zondag terug."; picture brief and alt use a suitcase ("koffer", now allowed); q2 evidence and explanation follow.
- twee-schoenen script[3]: "Echt? Wat grappig! Ik lach om mijn schoenen." ("moeten lachen" is a mild idiom); q2 evidence and explanation follow.

Doubts decided without change: two colours in one answer in `twee-schoenen` q1 is fair (plain colour words, one sentence, the contrast is the joke, each distractor keeps one right colour); `dokter-bellen` and `feest-zaterdag` are fixed as above; repetition of times (four items) and prices (three items) is accepted: one time or price per item, never competing values.

## Rejected

None.

## Diversity, sets, tone

Fifteen distinct settings and people; names only from the pool, each in at most two exercises, repeated drawn people share traits. The author's five sets keep different settings and people and two of each key letter. Tone: 13 ordinary, 2 light-humor (`eieren-taart`, `twee-schoenen`). Coordinator: add the combined listening count with batch 077.

## Media notes

Voice roles fit and differ; no `m-adult` with `f-adult` (Robert only with Roos and Ruth). `dokter-bellen` pairs Lieke with Roos: both female but clearly different voices; Roos is the younger role for a mother in her thirties, acceptable. Picture risks: `twee-schoenen` must be drawn from the waist up with no feet; `jas-passen` all coats pale beige; `melk-zoeken` without cartons or cheese; `markt-appels` crates show apples and pears only; `gemeente-foto`, phone scenes and `buren-sleutel` must not show the tested object, child, key or time. Generate audio and pictures only from the adopted bytes.

## Limitations

AI editorial judgment only. No teacher review, learner pilot, validated CEFR level, official approval or exam equivalence. Rendered pictures and audio are not reviewed here.
