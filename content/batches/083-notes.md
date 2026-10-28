# Batch 083 — A1 reading, eleven revised items (28 October 2026)

Replacement batch. An audit of published A1 reading items found premises that are unrealistic for the Netherlands, unclear senders, or a tone that does not fit the sender. Every item keeps its ID; the reviewer records `replaces`. Base: the current source of each item in `content/batches/075-original.json` and `076-original.json`, copied in full and changed only where needed. Item 1 is the coordinator's draft, kept with polished explanations.

All items: `exam: a1-practice`, `taskType: bericht`, two questions, three options, `status: draft`, `targetLevelValidated: false`. Institutions sign "Met vriendelijke groet," plus their name; a friend or neighbour signs with a first name. Every question that was touched has rebuilt `evidence` (verbatim from `text`) and an explanation of the form "<sender> schrijft: <evidence>".

Tone: ordinary for all items except kip-tuin (light humour, kept).

## Items

### 1. `A1:reading:batch076-vuilnis-dinsdag:1` (wonen-buurt, 28 words)

Coordinator's draft: the gemeente announces a new collection day. Polished only the explanations ("De gemeente schrijft: …" with the verbatim sentence instead of "De brief zegt: …").

- q1 key B "Op dinsdag." Evidence: "Vanaf november halen wij het afval op dinsdag." A "Op maandag." is the old day named in the text (tests "niet meer op maandag"); C "Op woensdag." is a familiar unmentioned day.
- q2 key C "Voor acht uur." Evidence: "Zet de zak dinsdag voor acht uur buiten." A "Om twaalf uur." (a clock time) and B "In de avond." (a common Dutch habit of putting the bag out the night before) are plausible alternatives.
- Picture: draft brief (whole man putting one bag outside); needs drawing.

### 2. `A1:reading:batch076-pas-klaar:1` (instanties, 33 words)

Before: signed "Tim", unclear which pas. Now a letter from de bibliotheek: the new library pas is ready, collect it at the library, bring your paspoort, opening times. Situation names the library. q1 was "Waar haalt u de pas op?", which gave away the sender; it now asks what to bring. The old "Kom op woensdag" was dropped in favour of opening times.

- q1 `detail` key A "Uw paspoort." Evidence: "Neem uw paspoort mee." B "Uw pinpas." and C "Een pasfoto." are familiar cards and papers people bring to a counter.
- q2 `time-place` key B "Vanaf tien uur." Evidence: "Wij zijn open van tien tot vijf uur." A "Vanaf negen uur." is an ordinary opening time; C "Vanaf vijf uur." is the closing time from the same sentence (tests van/tot).
- Picture: kept (blank card, envelope, folded paper on a table).

### 3. `A1:reading:batch076-medicijn:1` (gezondheid, 26 words)

Before: "Uw medicijn is klaar … U kunt het op donderdag ophalen" contradicted itself. Now the medicine is there from Thursday and the apotheek states its closing time. Title "Uw medicijn" (was "Uw medicijn is klaar"). Sign-off "Met vriendelijke groet, de apotheek". Closing time five, not six, so the key differs from kip-tuin's "Tot zes uur." and the shop's "tot zes uur".

- q1 key C "Vanaf donderdag." Evidence: "Uw medicijn is er vanaf donderdag." A "Vanaf dinsdag." and B "Vanaf zaterdag." are familiar days.
- q2 key A "Tot vijf uur." Evidence: "Wij zijn open tot vijf uur." B "Tot zes uur." and C "Tot acht uur." are ordinary shop closing times.
- Picture: kept (paper bag and pill box).

### 4. `A1:reading:batch071-beer-dokter:1` (gezondheid, 31 words)

Before: "U wacht in kamer drie" was an odd thing to message. Now a huisarts reminder: appointment tomorrow at ten; cannot come, call before nine. Sender "de huisarts" (was "De assistent"), situation "U krijgt een bericht van de huisarts."

- q1 key B "Om tien uur." Evidence: "De afspraak is om tien uur." A "Om negen uur." is the call-by time from the text (tests which time is the appointment); C "Om elf uur." is a neighbouring hour.
- q2 key C "Voor negen uur." Evidence: "Bel dan voor negen uur." A "Voor tien uur." is the appointment time; B "Voor twaalf uur." is a plausible morning deadline. The explanation quotes the condition too: "Kunt u niet komen? Bel dan voor negen uur."
- Picture: kept (empty chair beside a closed door in a practice); it still fits a huisarts visit and shows neither time.

### 5. `A1:reading:batch075-nieuw-paspoort:1` (instanties, 35 words)

Sign-off "Groeten, De gemeente" → "Met vriendelijke groet, de gemeente". The time is now an afspraak: "U heeft dinsdag om drie uur een afspraak." (the suggested "U heeft een afspraak op dinsdag om drie uur" has nine words; the A1 limit is eight). q1 prompt now "Op welke dag is de afspraak?".

- q1 key A "Op dinsdag." Evidence: "U heeft dinsdag om drie uur een afspraak." B "Op maandag." and C "Op donderdag." are familiar weekdays.
- q2 key B "Uw oude paspoort." Evidence: "Neem uw oude paspoort mee." A "Een nieuwe pasfoto." (people often bring a photo for a passport) and C "Uw oude pinpas." (a card with "pas" in it) are plausible. A's "nieuwe foto" became "nieuwe pasfoto" so the key is no longer the longest option.
- Picture: kept (town-hall waiting area).

### 6. `A1:reading:batch076-geen-water:1` (wonen-buurt, 36 words)

Before: buurman Leo announced a planned water cut. Now Leo de huismeester sends it, with a short reason: "Er is dan werk aan het water." Greeting "Beste meneer, mevrouw," ("bewoners" is not on the list; "Beste buren" fits a neighbour, not a huismeester). Sign-off "Met vriendelijke groet, Leo, de huismeester". Situation "U vindt een brief van huismeester Leo." "Zet een fles water klaar!" lost its exclamation mark.

- q1 key C "Op maandag." Evidence: "Maandag is er geen water in de flat." A "Op zondag." and B "Op dinsdag." are the days on either side.
- q2 key A "Van acht tot twaalf." Evidence: "Dat is van acht tot twaalf uur." B "Van twaalf tot vier." reuses twelve as a start; C "Van vier tot acht." reuses eight as an end.
- Picture: kept (bottle of water by a kitchen sink).

### 7. `A1:reading:batch076-voetbal-zoon:1` (vrije-tijd-familie, 24 words)

Youth football is on Saturday at the club, not on Sunday "bij de school". Title "Voetbal op zaterdag". The time moved into the first sentence ("Mijn zoon speelt zaterdag om tien uur voetbal.") and the place has its own sentence ("Hij speelt bij de club."), so each question has its own evidence.

**Deviation from the brief:** q1 was "Wie speelt zondag voetbal?" (Haar man / Haar zoon / Haar dochter). The new picture shows a boy playing football, which would give that key away, so q1 now asks the time.

- q1 key B "Om tien uur." Evidence: "Mijn zoon speelt zaterdag om tien uur voetbal." A "Om negen uur." and C "Om twaalf uur." are familiar Saturday-morning match times.
- q2 key C "Bij de club." Evidence: "Hij speelt bij de club." A "In het park." and B "Bij de school." (the old location) are places where children also play football.
- Picture: **redraw.** Boy of about ten in a plain red shirt kicking one ball on a grass field, whole figure and whole ball, plain sky; no goals, nets, buildings, clubhouse, school, trees, park, beach, other people, pizza, clocks; no text, numerals or shirt numbers. A grass field alone does not decide club, park or school. Alt "Een jongen speelt voetbal."

### 8. `A1:reading:batch071-koffer-les:1` (opleiding, 24 words)

Before: an outdoor lesson on flower words in the cold. Now the class visits the bibliotheek (common in Dutch language courses); teacher Tom waits at the door at two; bring a pen. Sign-off "Tot straks! Tom". Questions differ from item 2: place and time, not what to bring.

- q1 key A "Naar de bibliotheek." Evidence: "Vandaag gaan we samen naar de bibliotheek." B "Naar de supermarkt." and C "Naar het park." are other common class outings. B was chosen partly so the key is not the longest option by more than two characters.
- q2 key B "Om twee uur." Evidence: "Ik wacht om twee uur bij de deur." A "Om één uur." and C "Om drie uur." are the hours on either side.
- Picture: **redraw.** Four adults of different ages walking together along a quiet street of brick houses, side view, whole figures, empty hands; no books, bags, pens, library, shops, supermarket, school, park, trees, clocks; no text or house numbers. Alt "Een groep mensen loopt op straat." It shows neither the place nor the time.

### 9. `A1:reading:batch076-ander-lokaal:1` (opleiding, 23 words)

"kamer" → "lokaal" in title ("Een ander lokaal"), text, q1 prompt ("In welk lokaal is de les?"), options and explanation. "andere kamer" → "ander lokaal" (het-word).

- q1 key C "In lokaal vier." Evidence: "Kom naar lokaal vier." A "In lokaal twee." and B "In lokaal zes." are neighbouring numbers.
- q2 key A "Om negen uur." Evidence: "De les begint om negen uur." B "Om acht uur." and C "Om tien uur." are neighbouring hours.
- Options reordered for key balance. Picture kept (empty classroom; no door numbers).

### 10. `A1:reading:batch075-kip-tuin:1` (wonen-buurt, 32 words, light humour)

Sign-off "Uw buurvrouw" → "Femke van nummer twaalf" (first name plus house number, the way Dutch neighbours sign a note; "nr." would be an abbreviation). Femke is on the name list and unused in A1 batches 069–082. Joke unchanged. Options reordered for key balance.

- q1 key B "Uw tomaten." Evidence: "De kip eet uw tomaten!" A "Uw bloemen." and C "Uw appels." are things in a garden.
- q2 key C "Tot zes uur." Evidence: "Ik ben thuis tot zes uur." A "Tot vier uur." and B "Tot acht uur." are ordinary times. "Twaalf" in the signature is a house number and is not offered as an option.
- Picture kept (hen on a lawn).

### 11. `A1:reading:batch071-winkel-sok:1` (winkels-diensten, 33 words)

Added a sender: "Met vriendelijke groet, Winkel De Jas" replaces the unsigned "Tot vrijdag!". Web searches for "Winkel De Jas" and "De Jas" winkel jassen Nederland (28 October 2026) found no shop with that name; the reviewer should check again. Options of q2 reordered for key balance.

- q1 key A "Op vrijdag." Evidence: "U kunt de jas vrijdag ophalen." B "Op maandag." and C "Op zaterdag." are shopping days.
- q2 key B "Veertig euro." Evidence: "U betaalt veertig euro." A "Dertig euro." and C "Vijftig euro." are neighbouring amounts.
- Picture kept (coat on a rail).

## Key distribution

Sequence over the file: B C A B C A B C A B C A B C A B C A B C A B. A 7, B 8, C 7 of 22 (32/36/32%). No key three times in a row.

## Words

Every learner-visible word passes `config/a1-vocabulary.json` (checker: no failures). New words in revised texts, all already listed: bibliotheek, paspoort, pasfoto, pinpas, vanaf, huisarts, afspraak, huismeester, werk, club, lokaal, supermarkt, vriendelijke/groet. No word was added to the list. Longest sentences are eight words ("U kunt de pas ophalen in de bibliotheek.", "U heeft morgen een afspraak bij de huisarts.", "Mijn zoon speelt zaterdag om tien uur voetbal.", among others). Texts 23–36 words.

Names: Tom (koffer-les), Tim (ander-lokaal, now only once since pas-klaar lost "Tim"), Leo (geen-water), Esra (voetbal-zoon), Femke (kip-tuin, new). Each appears once.

## Media

- Redraw: voetbal-zoon, koffer-les (new briefs and alts).
- New drawing: vuilnis-dinsdag (draft brief).
- All other pictures and alts unchanged. Reading has no audio.

## Doubts for the reviewer

1. voetbal-zoon: q1 changed from person to time because the requested picture of a boy would give away "Haar zoon". If the coordinator prefers the person question, the picture must not show a child.
2. pas-klaar q1 ("Wat neemt u mee?" → paspoort) and nieuw-paspoort q2 ("Wat moet u meenemen?" → oude paspoort) are now close in shape and key. Both were decided fixes; consider whether they share a set.
3. Two items now involve the bibliotheek (pas-klaar, koffer-les), with different questions.
4. koffer-les: "Ik wacht om twee uur bij de deur." does not say which door; read after "naar de bibliotheek" it means the library door. Neither question depends on it.
5. geen-water: "Er is dan werk aan het water." is a simplified rendering of "werkzaamheden aan de waterleiding"; check it reads naturally.
6. pas-klaar picture (kept): a blank card might be read as a pinpas, which is a q1 distractor. It does not show a paspoort, so it does not favour the key.

## Checker

```
> tsx scripts/batch-check.ts content/batches/083-original.json

Checked 11 items, 22 questions. Keys: {"B":8,"C":7,"A":7}. Options: {"3":22}.
  info  11 of 11 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
