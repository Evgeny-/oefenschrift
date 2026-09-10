# Batch 022 editorial review (A2 Luisteren, nine fragments)

**Verdict:** pass after edits. Nine items, 26 questions; six items edited, none rejected. Ready for adoption with `npm run batch:adopt 022`; audio and stills stay blocked until the media review.

**Author's file:** `content/batches/022-original.json`, SHA-256 `359745e04e0464827dd5b996f2bb1973c2585680d57a26510e9478750ab8765d`.
**Proposed file (the bytes to adopt):** `content/batches/022-proposed.json`, SHA-256 `a803db3fe6dc74e7a62c1c59dd4b39924cd0c73526a18cb1b8c9e1e3391ecf71`.
**Review date:** 10 September 2026. **Rubric:** `content/reviews/rubric.md` with `content/blueprint.md` §1, 3, 4.2, 5, 6, 7, 8, 9, 10, 12 and the Luisteren A2 paragraph of `docs/research/exam-blueprints-2026-09-10.md`. No starters (closed items only).

Method: every script was read as it will be heard; every key was proven from the verbatim evidence and every distractor tested as a competing answer; option form and length were checked for signals; level was judged against the official fragment description (30–90 s conversations, announcements, voicemails, news; fact, rule-application and purpose questions) and the batch 005 items, because `content/exemplars/` does not exist. The author's notes were read after the verdicts and used to check the distractor rationales and to answer the doubts in their §9.

## Items

| id | verdict | level | reason |
| --- | --- | --- | --- |
| `A2:listening:batch022-garage:1` | pass | comparable, fuller end (168 words, about 70 s) | ten-turn phone call; q1 links "na mijn werk" with "Wij zijn open tot zes uur" against three other times, q2 the extra fault, q3 the purpose; no edit |
| `A2:listening:batch022-kinderopvang:1` | pass (edited) | comparable | voicemail with three rules (fever means home, oma may collect, one fever-free day); closing wish and option q2-D reworded |
| `A2:listening:batch022-sluitingstijd:1` | pass | comparable, lighter end (105 words, about 42 s) | closing time against the till time and the normal time, the reason, the delivery rule; concept close to the legacy markt item (diversity notes) |
| `A2:listening:batch022-fietsbrug:1` | pass (edited) | comparable | opening time, who may cross, who pays most (two amounts compared); tense repaired, still redrawn without people |
| `A2:listening:batch022-koffiegeld:1` | pass (edited) | comparable | five-euro rule with the water exception, payment moment, last-cup rule; the counting line replaces the round of colleagues |
| `A2:listening:batch022-taalcafe:1` | pass | comparable | walk-in rule, pay only for other drinks, Saturday session against two other Wednesday times; no edit |
| `A2:listening:batch022-loket:1` | pass (edited) | comparable | change in Zwolle, not Amersfoort; twenty euro because tien over negen is after nine; grandson free; Amersfoort question spelled out |
| `A2:listening:batch022-paspoort-klaar:1` | pass (edited) | comparable, fuller end (153 words, 9.0 words per sentence) | purpose, what to bring, the three-month rule; neutral "iemand anders", purpose options no longer single out the key |
| `A2:listening:batch022-pakket:1` | pass (edited) | comparable | request in advance, delivery slot against three other moments, pakketpunt rule; Julio's reason made explicit |

Per question, each key is proven by its `evidence` quote and each distractor is anchored in the fragment and contradicted by it (details in `022-review.json`, `items[].evidence`). No key is the longest option by more than two characters, none is the odd form out after the paspoort edit, no prompt word recurs only in the key. Keys in reading order C B A A C B B C A B D A C A B A B D B C D A C C D B (A 7, B 8, C 7, D 4; never three alike in a row); four-option share 31%; at least one persona prompt per item; four purpose questions. Spoken length 105–168 words (about 42–70 s); sentence averages 5.4–9.0 words, longest 17; numbers, times and prices in words; no digits, no fillers, no abbreviations; u/je registers as expected. Invented names checked on the web: "De Bonte Ekster" has no real café or restaurant; "Rietburg" is not a Dutch gemeente (German castle ruin), consistent with batch 005; "Kanaalzicht" exists as a buurt in Hellevoetsluis and as a street name in Purmerend and Sluiskil, a generic descriptive name of the Lindenstraat/Vijverlaan kind, no business and no address, kept.

## Edits made in the proposed file

All `text` fields were rebuilt mechanically from the scripts after the edits; every evidence quote is still verbatim; `npm run batch:check content/batches/022-proposed.json` ends "Checked 9 items, 26 questions. Keys: {"C":7,"B":8,"A":7,"D":4}. Options: {"3":18,"4":8}. No failures, no warnings."

1. **kinderopvang** `script[0].text`: "Dank u wel en sterkte voor Lina." → "Dank u wel, en beterschap voor Lina." — *beterschap* is the wish for the one who is ill; *sterkte* is for the one coping.
2. **kinderopvang** `q2.options.D`: "Morgen weer bellen naar Jolien." → "Jolien morgen terugbellen." — "weer bellen" implied an earlier call by Karim; the message asks for a call back, and "morgen" keeps the option wrong.
3. **fietsbrug** `script[0].text`: "Bewoners van de wijk vroegen al jaren om een brug." → "Bewoners van de wijk vragen al jaren om een brug." — Dutch uses the present with *al jaren* for a request that continues.
4. **fietsbrug** `script[0].text`: "Vroeger fietste je in vijfentwintig minuten naar de zwemplas, via de oude brug bij de fabriek. Straks is dat tien minuten." → "Nu fiets je nog vijfentwintig minuten naar de zwemplas, via de oude brug bij de fabriek. Straks is dat tien minuten." — the bridge is not open yet ("bijna klaar", opening Saturday), so the long route is the present; present tense also fits the A2 heuristics.
5. **fietsbrug** `imageBrief` → "A new bicycle bridge with a gentle arch over a canal, nobody on it yet, trees and a small lake on the far bank; no people, no vehicles, no sign, no banner, no text." and `imageAlt` → "Een nieuwe fietsbrug over een kanaal, met bomen en water aan de overkant." — the old still showed cyclists and a walker, which is q2's key "Fietsers en voetgangers" (blueprint §4.2: a still supports the situation without answering a question).
6. **koffiegeld** `script[0].text`: "Op de eerste maandag van de maand ga ik langs alle collega's." → "Op de eerste maandag van de maand tel ik het geld." — the money goes into the pot, so a round of the colleagues clashed with that; counting the pot gives "Betaal dus liever niet aan het eind van de maand" its reason. `q2.explanation` → "Het geld gaat aan het begin van de maand in de pot; op de eerste maandag telt Ruud het geld. Aan het eind van de maand betalen raadt hij af. Op vrijdag koopt hij alleen koek."
7. **loket** `script[2].text`: "Dus ik moet één keer overstappen. En in Amersfoort?" → "Dus ik moet één keer overstappen. Moet ik in Amersfoort ook overstappen?" — the elliptical question is thin when heard once; the full question makes the Amersfoort distractor audible.
8. **paspoort-klaar** `script[0].text`: "Uw vrouw of een vriend mag dat niet voor u doen." → "Iemand anders mag dat niet voor u doen." — neutral phrasing (coordinator's instruction); the rule and its distractor anchor stay.
9. **paspoort-klaar** `q3.options.B`: "Zijn vrouw haalt het paspoort voor hem." → "Iemand anders haalt het paspoort voor hem."; `q3.explanation` → "Na drie maanden moet Modibo een nieuw paspoort aanvragen en opnieuw betalen. Een afspraak is nooit nodig, en iemand anders mag het paspoort niet voor hem halen."
10. **paspoort-klaar** `q1.options.C`: "Modibo moet een nieuwe pasfoto brengen." → "De gemeente heeft nog een pasfoto nodig." — three distractors all read "Modibo moet …" while the key was the only plain statement, an odd-one-out signal (blueprint §5); `q1.explanation` → "De gemeente belt omdat het nieuwe paspoort klaar is. Een afspraak is niet nodig, betalen heeft Modibo bij de aanvraag al gedaan, en een nieuwe pasfoto heeft de gemeente niet nodig."
11. **pakket** `script[6].text`: "Buiten zetten mag niet, want het is te duur." → "Buiten zetten mag niet, want de printer is duur." — "het" had no clear referent when heard; `q3.explanation` → "Als niemand thuis is, brengt de bezorger het pakket naar het pakketpunt in de supermarkt. Hij komt niet terug, en buiten zetten mag niet omdat de printer duur is."

Sixteen field changes in all (the eleven above with their four follow-on explanations and the alt text); edits 5, 8 and 9 were required, the rest are recommended wording repairs. No key, evidence quote, prompt or skill tag changed.

## Rejected items

None.

## Decisions on the author's doubts (notes §9)

- **Domain tags:** keep garage → `vervoer` and fietsbrug → `vrije-tijd-familie` as assigned; both are defensible and only the tag would change. A later re-tag is a byte change and needs a focused re-review under the hash gate.
- **"achtendertig en een half":** keep. It is a natural spoken fever, unambiguous for TTS, transparent at A2 ("koorts" precedes it), and no question depends on it. "achtendertig vijf" is commoner in speech but reads as two numbers to a synthesiser; "komma vijf" is equally safe but less transparent.
- **Walker in the bridge still:** cut, together with the cyclists; the still is now the empty new bridge (it is "bijna klaar").
- **Real route with invented fares:** keep Groningen, Zwolle and Amersfoort. The official exam uses real cities and the bank already does (batch002-trein: Zwolle, Amersfoort; batch023-spoor: Leiden, Den Haag). The change in Zwolle, the thirty/twenty-euro rule and "kinderen tot vier jaar reizen gratis" are the counter's own statements inside the fragment; no question needs outside knowledge, and no carrier is named.
- **"Uw vrouw of een vriend":** replaced by "Iemand anders mag dat niet voor u doen."; distractor q3-B re-anchored on it.
- **"Buiten zetten mag niet, want het is te duur":** kept as Julio's own reason, with the printer named.
- **"met het werk erbij"** and **accu** glossed by context: fine at A2.
- **Gender and roles:** balanced (two female and two male employees, a female caller, an older man and an older woman); no change.

## Diversity and set assembly

Within the batch the nine settings, purposes and information structures are distinct (repair call with a second fault, sick child, early closing, new bridge, kitty rule, conversation café, ticket counter, document ready, parcel favour); skills: rule-application 8, time-place 6, purpose 4, detail 3, quantity 2, advice 2, person 1. Domains: vervoer 2, vrije-tijd-familie 2, one each of winkels-diensten, wonen-buurt, werk, instanties, opleiding; no gezondheid (batch 023 carries three).

Against the bank, three items repeat a concept closely enough that they should not share a drill or a mock form with their counterpart:

- **sluitingstijd** and `A2:listening:batch001-markt:1`: both "closes an hour early" with the questions "Hoe laat sluit … vandaag?" and "Waarom sluit … eerder?". The markt clip is a 45-word legacy item; sluitingstijd adds the till time, the delivery rule and a different reason. Keep apart.
- **fietsbrug** and `A2:listening:batch005-speelplaats:1`: the same regional-news template (residents asked, gemeente pays, Saturday opening by an official, children) and the "Wie betaalt" question with "De bewoners van de wijk" as distractor; here the question needs a comparison (twee against één miljoen) and the other two questions are new. Keep apart; the next `nieuws` items should leave the "new facility" template (batch 023's heat-wave item does).
- **paspoort-klaar** and `A2:listening:batch005-parkeervergunning:1`: both a gemeente Rietburg voicemail with balie hours plus one evening, a payment rule and a four-option purpose question keyed D. Keep apart. The uncatalogued reading item `A2:reading:batch020-identiteitskaart:1` also pairs Modibo with Burgerzaken and the "zelf ophalen, geen afspraak" rule; reading and listening never share a drill, but the coordinator should know that pairing now exists in two parts (and that the 020 letter still asks about "zijn vrouw").

The other six are new settings for listening (a garage call, childcare, a workplace kitty, a conversation café, a station counter, a parcel favour asked in advance). Cross-part echoes are intended contrasts: pakket reverses A2 speaking "burenpakket" and reading "pakketpunt"; loket differs from the two platform announcements (batch002-trein, batch023-spoor).

Sets: the three `gesprek` items (garage, loket, pakket) with one from 005 or 023 make a drill of four; the two voicemails, the announcement, the news item, the uitleg and the reclame each complete a type drill with 005/023 items under the constraints above. With batches 005, 022 and 023 adopted, the A2 listening bank holds 30 blueprint-shaped fragments and 80 questions, enough for two mock forms of about eleven fragments with no shared items, as blueprint §11 asks.

## Media notes

- **Voices.** garage: m-shop (Jerry) with f-adult (Esmee); loket: m-older (Arjen) with f-adult (Esmee); pakket: m-young (Nick) with f-older (Hanneke) — each conversation has two clearly different voices. Monologues: kinderopvang f-young (the voice named Roos; the cast persona Roos is only addressed in koffiegeld, no conflict), sluitingstijd narrator (also the question voice, as `config/voices.json` prescribes for omroep and as batch 005 did), fietsbrug and taalcafe presenter, koffiegeld and paspoort-klaar both m-adult (Robert) — fine as separate items; do not put those two next to each other in one drill.
- **TTS.** All numbers in words; "'s ochtends", "'s avonds", "kassa's", "auto's", "Taalcafé", "één" as in batch 005; "achtendertig en een half" will be spoken as written. Speaker labels with spaces ("Medewerker kinderdagverblijf", "Meneer De Vries") are not spoken. Item 1 opens with "Goedemiddag, met Bart van de garage." — a stitched conversation starts on the shop voice, which is right for an answered call.
- **Stills.** garage (kitchen table, phone, car key: the model may add a clock or calendar; the brief excludes them), fietsbrug (empty bridge: the model may add people, a sign or vehicles; excluded), taalcafe (six adults and children at two tables: the highest figure count in the batch for the flat style, so hands and faces need a close look at display size; the count is not answer-relevant), loket (counter: a departure board or clock would be text, excluded), pakket (front door: no house number). Cast keys "Sabrina", "meneer De Vries" (lower-case m, as `expandCast` needs), "Julio" and "mevrouw Bakker" all expand to their traits. Voicemails, the announcement and the uitleg carry no still, as in batch 005.

## Limitations

- An AI editorial review of scripts before audio exists; it does not replace review by a Dutch-language educator, learner trials or psychometric calibration, and it does not establish equivalence with the DUO exam. The A2 label stays an unvalidated authoring target on every item.
- Level was compared with the blueprint's description of the official fragments and with the batch 005 items; `content/exemplars/` does not exist yet, so the two-exemplar comparison of blueprint §10 could not be made.
- Originality was judged by plausibility and by a six-word phrase scan against the catalogue and all batch files (only stock formulas: "wij wensen u een fijne avond", "hier is het nieuws uit de regio", "van maandag tot en met vrijdag"); the scripts were not compared with the official practice audio.
- Naturalness was judged by reading; the round-trip check and the media review must confirm the rendered clips, and the stills must pass the checklist in `config/illustration.json`.
