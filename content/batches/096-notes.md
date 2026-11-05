# Batch 096 — A2 reading, sixteen revised items (5 November 2026)

Replacement batch. The A2 word gate of 5 November 2026 (`docs/research/a2-vocabulary-2026-11-05.md`) rejects sixteen published A2 reading items because they use words that are too hard for A2. This batch replaces only those words, and their inflections, with plain A2 wording. Every item keeps its ID; the reviewer records `replaces`. Base: the current source of each item (named per item below), copied in full with the same field order. The only changes are the replacements listed. Situations, senders, keys (same letters), option counts and question ids are unchanged. Every changed `evidence` is rebuilt verbatim from the changed `text`, and explanations follow it.

All items: `exam: duo-a2`, `status: draft`, `targetLevelValidated: false`. Tone: unchanged (ordinary everywhere). Reading has no audio, and none of these sixteen items has a picture, so **no media needs regenerating for this batch**.

Replacement words used, all on the A1/A2 lists unless marked: huismeester, webwinkel, grote, vertelt, komen, nummerbord (compound), oplaadingang (compound), met een lege maag, woningcorporatie, cadeaubon, mooier maken, belasting, voetbalsokken (compound), vóór uw afspraak, op zijn laatst, spullen, gestolen. No word was added to the list.

## Items

### 1. `A2:reading:p1:1`

Source: `content/batches/039-original.json`. bericht, winkels-diensten.

- q1 explanation: "Donderdag kan zij vanaf 9.00 uur terecht." → "Donderdag kan zij de fiets vanaf 9.00 uur ophalen."

The explanation now names the action (de fiets ophalen) instead of "terecht kunnen". Key A unchanged.

Media to regenerate: none. Pictures: none in this item.

### 2. `A2:reading:batch001-pakketpunt:1`

Source: `content/batches/053-original.json`. bericht, winkels-diensten.

- text: "Daarna gaat het terug naar de afzender." → "Daarna gaat het terug naar de webwinkel."
- q2 options.A: "Na maandag vragen of de afzender het bewaart." → "Na maandag vragen of de webwinkel het bewaart."

"Afzender" becomes "webwinkel" (on the list): most parcels at a pakketpunt come from an online shop, and a learner knows the word. Distractor A still names the other party at the wrong time (na maandag), now the webwinkel named in the text. Key C unchanged.

Media to regenerate: none. Pictures: none in this item.

### 3. `A2:reading:batch002-wasserette:1`

Source: `content/batches/039-original.json`. regels, winkels-diensten.

- q1 explanation: "Zij kiest eerst een geschikte machine." → "Zij kiest eerst een grote machine voor de deken."

"Geschikte machine" becomes "grote machine voor de deken", which is what the evidence says. Key C unchanged.

Media to regenerate: none. Pictures: none in this item.

### 4. `A2:reading:batch003-lift:1`

Source: `content/batches/039-original.json`. brief, wonen-buurt.

- situation: "de beheerder van haar flat" → "de huismeester van haar flat"
- text (3×): "beheerder" → "huismeester"
- q1 evidence: "Bel de beheerder" → "Bel de huismeester"
- q1 explanation: "zodat de beheerder hulp" → "zodat de huismeester hulp"
- q3 options.A: "De beheerder begint" → "De huismeester begint"
- q3 explanation: "De brief kondigt werk aan de lift aan en legt uit" → "De brief vertelt over werk aan de lift en legt uit"

"Beheerder" becomes "huismeester" (on the A1 list; batch 083 uses it for the same kind of sender) in situation, text (three times, including the signature), q1 evidence and explanation, and q3 distractor A. "Kondigt … aan" becomes "vertelt over". Keys B, A, D unchanged. "Beschikbaar" stays in the text (within the allowance, not on the work list).

Media to regenerate: none. Pictures: none in this item.

### 5. `A2:reading:batch003-bibliobus:1`

Source: `content/batches/039-original.json`. bericht, opleiding.

- q1 prompt: "Wanneer kan hij daar terecht?" → "Wanneer kan hij daar komen?"

Prompt only. Options are times, so "komen" fits them as "terecht kunnen" did. Key C unchanged.

Media to regenerate: none. Pictures: none in this item.

### 6. `A2:reading:batch004-parkeervergunning:1`

Source: `content/batches/004-original.json`. brief, instanties.

- text: "Geef dan het nieuwe kenteken aan ons door." → "Geef dan het nummerbord van de nieuwe auto aan ons door."
- q1 options.B: "Vóór 1 december zijn kenteken doorgeven." → "Vóór 1 december zijn nummerbord doorgeven."

"Kenteken" becomes "nummerbord" (nummer + bord, a transparent compound the checker reports). The text says "het nummerbord van de nieuwe auto" so the reference is clear. Distractor B tests the same thing as before: an action that belongs to a new car, not to extending. Key C unchanged. "Betreft" stays in the letter heading (see doubts).

Media to regenerate: none. Pictures: none in this item.

### 7. `A2:reading:batch004-telefoon:1`

Source: `content/batches/053-original.json`. folder, winkels-diensten.

- text (2×): "oplaadaansluiting" → "oplaadingang"
- q2 options.C: "Een nieuwe oplaadaansluiting." → "Een nieuwe oplaadingang."
- q2 evidence: "Bij een oplaadaansluiting of waterschade" → "Bij een oplaadingang of waterschade"
- q2 explanation (2×): "oplaadaansluiting" → "oplaadingang"

"Oplaadaansluiting" becomes "oplaadingang" (opladen + ingang, a transparent compound the checker reports) in the price table, the Saturday paragraph, q2 distractor C, its evidence and explanation. The row and the logic are unchanged: 35 euro, two days, not same-day on Saturday. Key A unchanged. See doubts.

Media to regenerate: none. Pictures: none in this item.

### 8. `A2:reading:batch004-bloedprikken:1`

Source: `content/batches/004-original.json`. rooster, gezondheid.

- text: "Moet u nuchter zijn? Dat staat op uw formulier. Nuchter betekent: vanaf 12 uur 's nachts niets meer eten." → "Moet u met een lege maag komen? Dat staat op uw formulier. Eet dan vanaf 12 uur 's nachts niets meer."
- q2 prompt: "Fatima moet nuchter zijn." → "Fatima moet met een lege maag komen."
- q2 explanation: "Water drinken mag wel als u nuchter moet zijn." → "Water drinken mag wel als u met een lege maag moet komen."

"Nuchter" becomes "met een lege maag komen" (lege, maag on the list). The definition sentence ("Nuchter betekent: …") is now an instruction with the same content: "Eet dan vanaf 12 uur 's nachts niets meer." Water yes, coffee and tea no: unchanged. q2 key B unchanged; distractor A (thee) still tests the rule that tea is not allowed; C (boterham) tests the eating rule.

Media to regenerate: none. Pictures: none in this item.

### 9. `A2:reading:batch004-verwarming:1`

Source: `content/batches/053-original.json`. regels, wonen-buurt.

- situation: "zijn woningstichting." → "zijn woningcorporatie."
- text: "Woningstichting De Berk" → "Woningcorporatie De Berk"

"Woningstichting" becomes "woningcorporatie" (on the list), the word the ketel item already uses. The name "De Berk" stays; a web search on 5 November 2026 for "Woningcorporatie De Berk" found no housing corporation with that name.

Media to regenerate: none. Pictures: none in this item.

### 10. `A2:reading:batch021-terugbrengen:1`

Source: `content/batches/053-original.json`. regels, winkels-diensten.

- text: "Of u krijgt een tegoedbon." → "Of u krijgt een cadeaubon."
- q1 options.B: "Een tegoedbon of een ander kledingstuk." → "Een cadeaubon of een ander kledingstuk."
- q1 evidence: "Of u krijgt een tegoedbon." → "Of u krijgt een cadeaubon."
- q1 explanation: "of een tegoedbon krijgen" → "of een cadeaubon krijgen"
- q3 explanation: "14 dagen en 30 dagen zijn de termijnen voor terugbrengen, niet voor het geld." → "14 dagen en 30 dagen gaan over het terugbrengen, niet over het geld."

"Tegoedbon" becomes "cadeaubon" (on the list); the next sentence still explains it: "Met deze bon koopt u later iets anders in onze winkel." q3 explanation: "de termijnen voor terugbrengen" becomes "gaan over het terugbrengen". Keys B, C, B unchanged. See doubts.

Media to regenerate: none. Pictures: none in this item.

### 11. `A2:reading:batch021-ketel:1`

Source: `content/batches/021-original.json`. brief, wonen-buurt.

- q2 explanation: "De brief kondigt de jaarlijkse controle van de cv-ketel aan en zegt" → "De brief vertelt over de jaarlijkse controle van de cv-ketel en zegt"

Explanation only. Key C unchanged. "Betreft" stays in the letter heading (see doubts).

Media to regenerate: none. Pictures: none in this item.

### 12. `A2:reading:batch021-weekmarkt:1`

Source: `content/batches/021-original.json`. krant, winkels-diensten.

- text: "De gemeente gaat het Marktplein in het centrum opknappen." → "De gemeente gaat het Marktplein in het centrum mooier maken."
- q1 explanation: "Het Marktplein wordt opgeknapt," → "Het Marktplein wordt mooier gemaakt,"
- q3 options.A: "Omdat de gemeente het Marktplein gaat opknappen." → "Omdat de gemeente het Marktplein mooier gaat maken."
- q3 evidence: "De gemeente gaat het Marktplein in het centrum opknappen." → "De gemeente gaat het Marktplein in het centrum mooier maken."
- q3 explanation: "omdat het Marktplein wordt opgeknapt en" → "omdat het Marktplein mooier wordt gemaakt en"

"Opknappen" becomes "mooier maken"; the following sentence (nieuwe stenen, meer bomen, meer bankjes) shows what that means. q3 key A still states the reason in the text's own words; it is not the longest option. Keys A, D, A unchanged. I chose "mooier maken" over "vernieuwen", which also passes but only as a compound split "ver" + "nieuwen".

Media to regenerate: none. Pictures: none in this item.

### 13. `A2:reading:batch020-loonstrook-uitleg:1`

Source: `content/batches/020-original.json`. brief, werk.

- text: "- Loonheffing: de belasting. Wij betalen die voor u aan de Belastingdienst." → "- Belasting: het bedrag dat wij voor u aan de Belastingdienst betalen."
- q1 options.C: "De loonheffing." → "De belasting."
- q1 explanation: "en de loonheffing is de belasting zelf." → "en de belasting gaat naar de Belastingdienst."

The pay-slip line "Loonheffing" becomes "Belasting" with the same definition pattern as "Nettoloon: het bedrag dat …". q1 distractor C becomes "De belasting."; the explanation still says why it is not the amount on the bank account. Keys B, B, A unchanged. "Kwekerij" and "betreft" stay in the text (within the allowance).

Media to regenerate: none. Pictures: none in this item.

### 14. `A2:reading:batch020-voetbalseizoen:1`

Source: `content/batches/020-original.json`. email, vrije-tijd-familie.

- text: "Voetbalschoenen en scheenbeschermers koopt u zelf. Zonder scheenbeschermers mag een kind niet spelen." → "Voetbalschoenen en voetbalsokken koopt u zelf."
- q2 options.D: "Scheenbeschermers." → "Voetbalsokken."
- q2 evidence: "Voetbalschoenen en scheenbeschermers koopt u zelf." → "Voetbalschoenen en voetbalsokken koopt u zelf."
- q2 explanation: "Ouders kopen zelf voetbalschoenen en scheenbeschermers. De voetbalschoenen heeft Karim al, dus hij moet nog scheenbeschermers kopen; zonder scheenbeschermers mag Adam niet spelen." → "Ouders kopen zelf voetbalschoenen en voetbalsokken. De voetbalschoenen heeft Karim al, dus hij moet nog voetbalsokken kopen."

"Scheenbeschermers" becomes "voetbalsokken" (voetbal + sokken, a transparent compound the checker reports). The sentence "Zonder scheenbeschermers mag een kind niet spelen." is removed: no plain A2 wording names shin guards, and the same rule about socks would sound odd. q2 still asks what Karim must still buy after the boots; key D "Voetbalsokken." (14 characters, not the longest). Text 153 → 146 words. See doubts.

Media to regenerate: none. Pictures: none in this item.

### 15. `A2:reading:batch020-tandartsregels:1`

Source: `content/batches/020-original.json`. regels, gezondheid.

- text: "Zeg uw afspraak dan minstens 24 uur van tevoren af." → "Zeg dan minstens 24 uur vóór uw afspraak af."
- q1 prompt: "Wanneer moet zij uiterlijk afzeggen?" → "Wanneer moet zij op zijn laatst afzeggen?"
- q1 evidence: "Zeg uw afspraak dan minstens 24 uur van tevoren af." → "Zeg dan minstens 24 uur vóór uw afspraak af."
- q1 explanation: "Afzeggen moet minstens 24 uur van tevoren." → "Afzeggen moet minstens 24 uur vóór de afspraak."
- q1 explanation: "dus zij zegt uiterlijk maandag" → "dus zij zegt op zijn laatst maandag"
- q1 explanation: "minder dan 24 uur van tevoren en dus te laat" → "minder dan 24 uur vóór de afspraak en dus te laat"

"Van tevoren" becomes "vóór uw afspraak" / "vóór de afspraak"; "uiterlijk" becomes "op zijn laatst" (all listed words; a common expression). The options are unchanged deadlines; key A unchanged and the explanation keeps the same reasoning.

Media to regenerate: none. Pictures: none in this item.

### 16. `A2:reading:batch020-politiebureau:1`

Source: `content/batches/053-original.json`. rooster, instanties.

- text: "Daar staan alle gevonden voorwerpen." → "Daar staan alle gevonden spullen."
- q2 evidence: "Daar staan alle gevonden voorwerpen." → "Daar staan alle gevonden spullen."
- q2 explanation: "Gevonden voorwerpen staan op de website van de gemeente, niet bij de politie. De website van de politie is voor aangifte van diefstal." → "Gevonden spullen staan op de website van de gemeente, niet bij de politie. De website van de politie is voor aangifte, bijvoorbeeld van een gestolen fiets."

"Voorwerpen" becomes "spullen" in text, evidence and explanation; "aangifte van diefstal" becomes "aangifte, bijvoorbeeld van een gestolen fiets" (the text's own example). Keys B, B unchanged. "Spoed" stays in the text (within the allowance).

Media to regenerate: none. Pictures: none in this item.

## Media

None. Reading has no audio, and none of the sixteen items has a picture.

## Doubts for the reviewer

1. **telefoon.** "Oplaadingang" is a transparent compound (opladen + ingang) but less standard than "oplaadpoort", which Samsung's Dutch support pages use. "Oplaadpoort" fails the gate ("poort" is not on the list). If the coordinator adds "poort", "oplaadpoort" is the more natural word.
2. **terugbrengen.** "Cadeaubon" is strictly a gift voucher; a shop's store credit is a "tegoedbon". Dutch shops do give a cadeaubon on a late return, and the next sentence explains how the bon is used, so the meaning holds.
3. **voetbalseizoen.** This is a small change of content: shin guards became football socks, and the rule "Zonder scheenbeschermers mag een kind niet spelen." was removed. The logic of q2 is unchanged (what parents buy themselves minus the boots Karim already has). If the coordinator prefers to keep the shin-guard rule, it needs a word on the list.
4. **bloedprikken.** "Met een lege maag komen" replaces the term "nuchter". The prompt "Fatima moet met een lege maag komen." makes distractor C (een boterham eten) easier to reject than before. The question still turns on water (allowed) against tea (not allowed).
5. **pakketpunt.** "Webwinkel" assumes the parcel comes from an online shop. That is likely at a pakketpunt, but it is narrower than "afzender".
6. **Betreft.** "Betreft:" (on the `notA2` list) stays in the letter headings of parkeervergunning, ketel and loonstrook-uitleg. It is within the text allowance and was not on the work list. It could be dropped from those headings without effect on any question.
7. Other unlisted text words that stay within the allowance and that no question depends on: fietsatelier (p1), beschikbaar (lift), bepaald (bibliobus), waterschade (telefoon), verzendkosten (terugbrengen), stenen (weekmarkt), kwekerij (loonstrook-uitleg), spoed (politiebureau).
8. The key distribution (A 12, B 15, C 9, D 5 of 41) is the sum of sixteen items reviewed in earlier batches. No key changed.
9. Three "longest sentence" warnings (telefoon, bloedprikken, ketel) come from unpunctuated table rows and headings. They are the same as for the unchanged sources.

## Checks

The field check confirmed that, for each item, only the fields listed above differ from the source item. Field order and every other field are byte-identical.

```
> npx tsx scripts/batch-check.ts content/batches/096-original.json

Checked 16 items, 41 questions. Keys: {"A":12,"B":15,"D":5,"C":9}. Options: {"3":24,"4":17}.
  info  16 of 16 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
  warn  A2:reading:batch004-telefoon:1: longest sentence 48 words (A2 target 18)
  warn  A2:reading:batch004-bloedprikken:1: longest sentence 52 words (A2 target 18)
  warn  A2:reading:batch021-ketel:1: longest sentence 22 words (A2 target 18)
3 warning(s), no failures.

> npx tsx <scratchpad>/a2gate.ts content/batches/096-original.json   (A2 word gate applied to every item, old ids included)

  warn  A2:reading:p1:1: unlisted words in the text (allowed 2; the context must explain them and no question may depend on them): fietsatelier
  warn  A2:reading:batch003-lift:1: unlisted words in the text (allowed 2; the context must explain them and no question may depend on them): beschikbaar
  warn  A2:reading:batch003-bibliobus:1: unlisted words in the text (allowed 2; the context must explain them and no question may depend on them): bepaald
  warn  A2:reading:batch004-parkeervergunning:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): betreft
  warn  A2:reading:batch004-telefoon:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): waterschade
  warn  A2:reading:batch021-terugbrengen:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): verzendkosten
  warn  A2:reading:batch021-ketel:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): betreft
  warn  A2:reading:batch021-weekmarkt:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): stenen
  warn  A2:reading:batch020-loonstrook-uitleg:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): betreft, kwekerij
  warn  A2:reading:batch020-politiebureau:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): spoed
A2 word gate: no failures.
```
