# Batch 056 author notes

Authorised replacement of twelve published A2 listening exercises, following `tmp/content-fix-2026-10-14/spec/056-057.md` and `spec/common.md`. The fixes come from the editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, section 4, "A2 listening"): two scripts with an implausible premise, three distractors or prompts that do not fit the script, four explanations that add or misstate facts, and a key imbalance (four-option A2 listening questions were keyed D in 15 of 32, A in 2).

Each record was built from `tmp/content-fix-2026-10-14/base/056-base.json`, which holds the published records without generated media, with status `draft`. Every item keeps its ID, title, situation, task type, domain, notes, images, set membership and item order. A field-by-field diff against the base shows that only the fields listed below changed. Level is still an authoring target (`targetLevelValidated: false`). This is AI editorial work. It does not validate CEFR difficulty or show exam equivalence.

Replaced IDs, in batch order:

1. `A2:listening:batch023-spoor:1`: the sprinter to Leiden "rijdt vandaag niet verder dan Leiden", and the q3 persona switches to Sem.
2. `A2:listening:batch023-bloedonderzoek:1`: in q2, distractor A ("Naar de praktijk komen.") is a route the assistant offers.
3. `A2:listening:batch005-voetbal:1`: q2 asks what goes in the bag, but the key is a shirt Amina must wear.
4. `A2:listening:batch022-paspoort-klaar:1`: the q3 explanation claims "Een afspraak is nooit nodig".
5. `A2:listening:batch001-markt:1`: visitors are told to wait under a stall roof in strong wind while stalls are cleared, for a bus long after closing.
6. `A2:listening:batch005-speelplaats:1`: the q2 explanation places the opening at the school.
7. `A2:listening:batch022-koffiegeld:1`: the q3 explanation adds a fact ("Ruud hoeft dat niet te weten").
8. `A2:listening:batch023-bezorgservice:1`: the q2 explanation adds a fact ("op de dag zelf is het te laat").
9. `A2:listening:buurthuis:1`: option order only (key rebalancing).
10. `A2:listening:batch001-schoolreis:1`: option order only (key rebalancing).
11. `A2:listening:batch002-trein:1`: option order only (key rebalancing).
12. `A2:listening:batch005-tabletten:1`: option order only (key rebalancing).

## Sources, names and facts

No new facts, people or organisations were introduced. The only new nouns are generic: "taxi's" and "parkeerterrein" in markt. Den Haag, Leiden and Amsterdam are real cities used as destinations in a fictional announcement; the item makes no claim about a real timetable. No invented organisation names were added, so no web search was needed. Digits: none of the twelve scripts contains a digit, and the two changed scripts write every time in words.

## Changes per item

Long script fields show only the changed sentences. `text` was rebuilt mechanically from the script ("Speaker: text" lines).

### 1. A2:listening:batch023-spoor:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `script[0].text`, sentence 2 | De sprinter naar Leiden van kwart over drie vertrekt niet van spoor twee, maar van spoor vijf. | De sprinter naar Den Haag van kwart over drie vertrekt niet van spoor twee, maar van spoor vijf. | A train to Leiden cannot "not go further than Leiden". The sprinter now runs to Den Haag and ends in Leiden today (spec). |
| `script[0].text`, sentence 4 | De sprinter naar Leiden vertrekt ook later dan normaal: om half vier. | De sprinter naar Den Haag vertrekt ook later dan normaal: om half vier. | Same train. |
| `text` | (old script) | rebuilt from the script | Mechanical. |
| `q1.prompt` | Farah wil naar Leiden. Van welk spoor vertrekt haar trein? | Farah wil naar Den Haag. Van welk spoor vertrekt haar trein? | Consequential. The spec moves q3 to Farah, and Farah cannot travel to Leiden in q1 and to Den Haag in q3. Her train is the Den Haag sprinter. |
| `q1.evidence` | De sprinter naar Leiden van kwart over drie vertrekt niet van spoor twee, maar van spoor vijf. | De sprinter naar Den Haag van kwart over drie vertrekt niet van spoor twee, maar van spoor vijf. | Verbatim from the new script. |
| `q1.explanation` | De sprinter naar Leiden vertrekt vandaag van spoor vijf. (rest unchanged) | De sprinter naar Den Haag vertrekt vandaag van spoor vijf. (rest unchanged) | Follows the script. |
| `q2.prompt` | Hoe laat vertrekt de trein naar Leiden vandaag? | Hoe laat vertrekt de sprinter naar Den Haag vandaag? | Follows the script. It uses "sprinter", the announcement's word, so that the connecting train from Leiden to Den Haag (no time given) cannot be meant. |
| `q2.evidence` | De sprinter naar Leiden vertrekt ook later dan normaal: om half vier. | De sprinter naar Den Haag vertrekt ook later dan normaal: om half vier. | Verbatim from the new script. |
| `q2.explanation` | De trein naar Leiden vertrekt vandaag om half vier. (rest unchanged) | De sprinter naar Den Haag vertrekt vandaag om half vier. (rest unchanged) | Follows the prompt. |
| `q3.prompt` | Sem wil naar Den Haag. Wat moet hij doen? | Farah wil naar Den Haag. Wat moet ze doen? | The situation is about Farah (spec). |

Check that q1–q3 still work: options, keys (C, B, A), the q3 evidence ("Reizigers naar Den Haag stappen in Leiden over.") and the q3 explanation are unchanged and still true. The new script is now consistent: the Den Haag sprinter goes as far as Leiden today, and travellers to Den Haag change there.

### 2. A2:listening:batch023-bloedonderzoek:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q2.options` | A Naar de praktijk komen. / B Nog een keer bloed prikken. / C De assistente om de uitslag vragen. / D Wachten tot de dokter belt. | A Vanmiddag zelf de dokter bellen. / B Nog een keer bloed prikken. / C Wachten tot de dokter belt. / D De assistente om de uitslag vragen. | The old A was defensible, because the assistant offers a visit next Wednesday ("Wilt u liever naar de praktijk komen? Dan kan dat pas volgende week woensdag."). The new A follows the spec's example and is anchored in "Vanmiddag lukt niet, want dan heeft ze spreekuur" and "Ze belt u daarvoor op". C and D were swapped for key rebalancing. |
| `q2.answer` | D | C | Key rebalancing. |
| `q2.explanation` | De dokter bespreekt de uitslag zelf en belt daarvoor op. Meneer De Vries hoeft niet naar de praktijk te komen en hoeft niet opnieuw bloed te prikken. De assistente mag de uitslag niet zeggen. | De dokter bespreekt de uitslag zelf en belt daarvoor op. Meneer De Vries hoeft haar niet zelf te bellen: vanmiddag heeft ze spreekuur, en donderdag belt ze hem. Hij hoeft ook niet opnieuw bloed te prikken, en de assistente mag de uitslag niet zeggen. | The removed option's rationale is replaced by the new distractor's rationale. |

### 3. A2:listening:batch005-voetbal:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q2.prompt` | Fatima maakt de sporttas van Amina klaar. Wat moet er zeker in de tas? | Wat moet Amina zondag aan? | The key was a shirt Amina must wear ("Amina moet haar witte shirt aan"), not one Fatima must pack (spec). |
| `q2.options` | A Het blauwe shirt. / B Een regenjas. / C Een fles water. / D Het witte shirt. | A Het blauwe shirt. / B Het witte shirt. / C Een regenjas. | "Een fles water" cannot answer a question about what to wear, so it was dropped. The question now has three options, and all are wearable and anchored. The two shirt texts are unchanged. |
| `q2.answer` | D | B | Follows the new order and balances the batch. |
| `q2.explanation` | Amina moet haar witte shirt aan, omdat de andere ploeg in het blauw speelt. Een regenjas is niet nodig en water is er bij het veld. | Amina moet haar witte shirt aan, niet het blauwe, omdat de andere ploeg ook in het blauw speelt. Een regenjas is niet nodig, want het wordt droog weer. | Covers the two remaining distractors. |

`q2.evidence` ("Amina moet haar witte shirt aan, niet het blauwe.") and `skill: advice` are unchanged.

### 4. A2:listening:batch022-paspoort-klaar:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q1.options` | A Modibo moet een afspraak maken. / B Modibo moet nog betalen. / C De gemeente heeft nog een pasfoto nodig. / D Het paspoort van Modibo is klaar. | A Het paspoort van Modibo is klaar. / B Modibo moet nog betalen. / C De gemeente heeft nog een pasfoto nodig. / D Modibo moet een afspraak maken. | Key rebalancing: A and D swapped. Texts unchanged. |
| `q1.answer` | D | A | Key rebalancing. |
| `q3.options.A` | Hij maakt eerst een afspraak bij de balie. | Hij kan het paspoort nog gewoon ophalen. | Ruling out the old A needed the false claim "Een afspraak is nooit nodig". The script only says that no appointment is needed to collect. The new A tests the three-month limit (spec's example). |
| `q3.explanation` | Na drie maanden moet Modibo een nieuw paspoort aanvragen en opnieuw betalen. Een afspraak is nooit nodig, en iemand anders mag het paspoort niet voor hem halen. | Na drie maanden moet Modibo een nieuw paspoort aanvragen en opnieuw betalen. Gewoon ophalen zonder afspraak kan alleen binnen drie maanden, en iemand anders mag het paspoort niet voor hem halen. | Checked against the script: "Daarvoor hebt u geen afspraak nodig." and "Haalt u het paspoort binnen drie maanden op? Anders moet u een nieuw paspoort aanvragen". See doubt 4 for why the spec's suggested sentence was reworded. |

### 5. A2:listening:batch001-markt:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `script[0].text`, sentence 6 | De bus naar het centrum vertrekt om kwart over vier. | De bus naar het centrum vertrekt om kwart over drie. | The spec names "a bus an hour after closing" as part of the implausible scenario, and this sentence lies inside the quoted span. Because of the wind the market closes at three, and the bus now leaves a quarter of an hour later. |
| `script[0].text`, sentences 9–11 | De bloemenkraam staat midden op de markt. Daar kunt u onder een dak zitten. Loop daarna naar de halte om in te stappen. | De taxi's staan vandaag bij het parkeerterrein. | No more waiting under a stall roof in strong wind while the stalls are cleared. The new sentence is the spec's suggestion and gives the q2 distractor a new anchor. |
| `text` | (old script) | rebuilt from the script | Mechanical. |
| `q1.options.C` | Om kwart over vier. | Om kwart over drie. | Consequential: the distractor is still the bus departure time. |
| `q1.explanation` | … kwart over vier is de vertrektijd van de bus. | … kwart over drie is de vertrektijd van de bus. | Follows the script. |
| `q2.options.C` | Bij de bloemenkraam. | Bij het parkeerterrein. | Adapting the q2 options (spec). |
| `q2.explanation` | De bus stopt bij de zijingang. Bij de hoofdingang staan vrachtwagens. De bloemenkraam staat midden op de markt; na het zitten loopt u naar de halte. | De bus stopt bij de zijingang. Bij de hoofdingang staan vrachtwagens, en bij het parkeerterrein staan de taxi's. | Follows the script. |

Both evidence quotes ("Daarom sluit de markt vandaag al om drie uur." and "De halte is vandaag bij de zijingang.") and both keys (B, A) are unchanged.

### 6. A2:listening:batch005-speelplaats:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q2.explanation` | Wie wil helpen, meldt zich bij het wijkcentrum aan de Vijverlaan. De gemeente betaalt, maar u meldt zich niet daar; de school en de speelplaats zijn alleen de plaats van de opening. | Wie wil helpen, meldt zich bij het wijkcentrum aan de Vijverlaan. De gemeente betaalt, maar u meldt zich niet daar. Kinderen van basisschool De Vlinder doen alleen mee aan de opening, en de speelplaats is de plek die schoon moet blijven. | The opening is not at the school; the school's children take part in it ("De wethouder opent de speelplaats samen met kinderen van basisschool De Vlinder."). The script was not changed (spec). |
| `q2.options` | A Bij de gemeente. / B Bij basisschool De Vlinder. / C Bij de speelplaats. / D Bij het wijkcentrum. | A Bij de gemeente. / B Bij basisschool De Vlinder. / C Bij het wijkcentrum. / D Bij de speelplaats. | Key rebalancing: C and D swapped. |
| `q2.answer` | D | C | Key rebalancing. |

### 7. A2:listening:batch022-koffiegeld:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q3.explanation`, sentence 2 | Ruud hoeft dat niet te weten; naar hem ga je met vragen. | Dat je het aan Ruud moet vertellen, zegt hij niet; naar hem ga je met vragen. | The old sentence added a fact. Ruud only says "Heb je vragen? Ik zit daar, bij het raam." |

### 8. A2:listening:batch023-bezorgservice:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q2.explanation`, end | … en op de dag zelf is het te laat. | … en het berichtje komt al de dag ervoor, niet op de dag zelf. | The old clause added a fact. The script says "De dag voor de bezorging krijgt u een berichtje op uw telefoon. Daarin staat hoe laat wij komen." |

### 9–12. Option order only

| Item / question | Before (key) | After (key) | Change |
| --- | --- | --- | --- |
| buurthuis q2 | A Haar eigen lesboek. / B Een pen van thuis. / C Een kopje koffie. / D Haar eigen schrift. (D) | A Haar eigen schrift. / B Een pen van thuis. / C Een kopje koffie. / D Haar eigen lesboek. (A) | A and D swapped |
| batch001-schoolreis q1 | A Om kwart over acht. / B Om half negen. / C Om drie uur. / D Om acht uur. (D) | A Om kwart over acht. / B Om half negen. / C Om acht uur. / D Om drie uur. (C) | C and D swapped |
| batch002-trein q2 | A Tegenover de bakker. / B Bij de koffiebar. / C Bij spoor vier. / D Naast de boekwinkel. (D) | A Tegenover de bakker. / B Bij de koffiebar. / C Naast de boekwinkel. / D Bij spoor vier. (C) | C and D swapped |
| batch005-tabletten q1 | A De volgende dag twee tabletten innemen. / B De huisarts bellen. / C Wachten tot donderdag. / D De tablet later op de dag innemen. (D) | A De tablet later op de dag innemen. / B De huisarts bellen. / C Wachten tot donderdag. / D De volgende dag twee tabletten innemen. (A) | A and D swapped |

No explanation in this batch mentions an option letter, so none needed a letter update.

## Key and distractor rationale for changed questions

- **spoor q1, C (spoor vijf).** A is the usual platform, where the broken train stands. B is the intercity to Amsterdam's platform.
- **spoor q2, B (half vier).** A is the normal departure time. C is the intercity's departure time.
- **spoor q3, A (in Leiden overstappen).** B is the other train mentioned. C is where to go with questions. D is the broken train's platform.
- **bloedonderzoek q2, C (wachten tot de dokter belt).** A is wrong because the doctor calls him and has spreekuur this afternoon. B: "Nee, dat is nu niet nodig". D: the assistant says "Dat mag ik niet zeggen".
- **voetbal q2, B (het witte shirt).** A: "niet het blauwe", because the other team also plays in blue. C: "een regenjas is niet nodig".
- **paspoort-klaar q1, A (het paspoort is klaar).** B: payment was made at the application. C: "die hebben wij al". D: no appointment is needed to collect.
- **paspoort-klaar q3, C (nieuw paspoort aanvragen).** A: collecting is possible only within three months. B: "Iemand anders mag dat niet voor u doen".
- **markt q1, B (drie uur).** A is the usual closing time. C is the bus departure time.
- **markt q2, A (zijingang).** B: the main entrance is taken by trucks. C: the taxis wait at the parking area.
- **speelplaats q2, C (wijkcentrum).** A: the gemeente pays and asks for help, but you sign up at the wijkcentrum. B: the school's children only take part in the opening. D: the playground is what must be kept clean.
- **Reordered questions.** The rationale is unchanged; only the positions moved.
  - buurthuis q2, A: B, the teacher gives the pen. C, coffee is before the lesson. D, the book is not used until next week.
  - schoolreis q1, C: A, the bus leaves at quarter past eight. B, the other group arrives at half past eight. D, the group is back at three.
  - trein q2, C: A, the stairs. B, the employee. D, the broken train.
  - tabletten q1, A: B, the GP is only for a new prescription. C, Thursday is when the rest of the tablets are ready. D, she must never take two at once.

## Key distribution

| Scope | A | B | C | D | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Batch 056, all questions | 11 (39.3%) | 7 (25.0%) | 10 (35.7%) | 0 | 28 |
| Batch 056, four-option questions | 4 | 1 | 5 | 0 | 10 |
| Batch 056, three-option questions | 7 | 6 | 5 | — | 18 |
| Catalogue A2 listening four-option, before | 2 | 10 | 5 | 15 | 32 |
| Catalogue A2 listening four-option, after this batch | 5 | 10 | 9 | 7 | 31 |
| Catalogue A2 listening, all questions, after | 29 | 29 | 29 | 7 | 94 |

Key sequence in batch order: C B A · B C A · A B · A A C · B A · A C · C A B · B C · C A · C C · A C · A B. The longest run of one letter is two.

Some assignments were forced:

- bloedonderzoek q2 must be C. An A would make three A keys in a row with bloedonderzoek q3 and voetbal q1.
- speelplaats q2 must be C. An A would make three A keys in a row with markt q2 and speelplaats q1.
- buurthuis q2 must be A. A C would make three C keys in a row with bezorgservice q2 and buurthuis q1.

With voetbal q2 at B, the batch limits allow exactly three of the seven four-option questions to move to A and four to C. Among the free choices, I chose paspoort-klaar q1 and tabletten q1 for A, and schoolreis q1 and trein q2 for C. This also balances the drill sets:

| Set | Before | After |
| --- | --- | --- |
| a2-listening-01 | A2 B2 C2 D2 | A3 B2 C3 |
| a2-listening-02 | A2 B2 C1 D1 | A2 B2 C2 |
| a2-listening-03 | A4 B4 C3 D1 | A5 B4 C3 |
| a2-listening-04 | A1 B3 C3 D2 | A1 B4 C3 D1 |
| a2-listening-05 | A2 B1 C2 D2 | A2 B1 C3 D1 |
| a2-listening-07 | A3 B4 C4 D3 | A4 B4 C4 D2 |
| a2-listening-08 | A3 B3 C3 D2 | A3 B3 C4 D1 |

## Media consequences

New audio is needed for six clips (1,279 script characters). All of them changed spoken text or a changed prompt:

| Clip key | Why |
| --- | --- |
| `A2:listening:batch023-spoor:1#fragment` | Script sentences 2 and 4 changed (Leiden → Den Haag). |
| `A2:listening:batch023-spoor:1#q1` | Prompt changed. |
| `A2:listening:batch023-spoor:1#q2` | Prompt changed. |
| `A2:listening:batch023-spoor:1#q3` | Prompt changed (Sem → Farah). |
| `A2:listening:batch005-voetbal:1#q2` | Prompt changed. |
| `A2:listening:batch001-markt:1#fragment` | Script changed (bus time, taxi sentence instead of the stall roof). |

No new audio is needed for these. Only option text or option order changed, and listening question audio reads only the prompt:

- bloedonderzoek q2: option replaced and reordered.
- paspoort-klaar q1 (reordered) and q3 (option A replaced).
- markt q1 and q2 (option C text). These keep their question audio, but the markt fragment itself is new, as listed above.
- speelplaats q2, buurthuis q2, schoolreis q1, trein q2, tabletten q1: reordered.

Every other fragment and question clip in the batch is untouched. Edits to explanations and evidence (koffiegeld, bezorgservice, speelplaats) have no media effect. No image brief changed, so all five drawings stay (bloedonderzoek, speelplaats, bezorgservice, buurthuis, tabletten). Integration has one quirk for the coordinator: `scripts/content.ts` keeps `questionAudio` only when both prompt and options JSON are unchanged (lines 159–161). The ten option-changed questions therefore lose that field at integration. `npm run audio:generate -- --apply` re-attaches the same files from `content/audio-manifest.json` without new synthesis, because the key, prompt hash and voice token are unchanged. I checked that every current clip of these twelve items is in the manifest with a matching hash.

## Language control (spoken text)

| Item | Type | Words | Mean sentence | Longest | Est. seconds (2.5 w/s) | Turns | Roles |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| batch023-spoor | omroep | 116 (was 114) | 8.9 | 18 (was 17) | 46 | 1 | narrator |
| batch023-bloedonderzoek | gesprek | 147 | 5.7 | 10 | 59 | 10 | f-adult/m-older |
| batch005-voetbal | voicemail | 127 | 7.9 | 12 | 51 | 1 | f-young |
| batch022-paspoort-klaar | voicemail | 153 | 9.0 | 16 | 61 | 1 | m-adult |
| batch001-markt | omroep | 79 (was 95) | 8.8 | 11 | 32 | 1 | narrator |
| batch005-speelplaats | nieuws | 125 | 8.3 | 15 | 50 | 1 | presenter |
| batch022-koffiegeld | uitleg | 156 | 7.8 | 13 | 62 | 1 | m-adult |
| batch023-bezorgservice | reclame | 158 | 8.8 | 17 | 63 | 1 | presenter |
| buurthuis | gesprek | 107 | 6.3 | 11 | 43 | 8 | f-young/m-adult |
| batch001-schoolreis | voicemail | 90 | 7.5 | 9 | 36 | 1 | f-adult |
| batch002-trein | omroep | 89 | 7.4 | 10 | 36 | 1 | narrator |
| batch005-tabletten | gesprek | 125 | 5.7 | 12 | 50 | 10 | f-adult/f-older |

All fragments are within 60–210 spoken words. Settings, purposes and task types are unchanged, so the diversity position against the catalogue is the same as when these items were first reviewed.

## Doubts for the reviewer

1. **markt, bus time.** Besides the spec's sentences, I moved the bus from "kwart over vier" to "kwart over drie". The spec counts "a bus an hour after closing" as part of the implausibility, and that sentence lies inside its quoted span. As a result, q1 option C ("Om kwart over drie.") and its explanation changed. The distractor is now closer to the key ("drie uur" against "kwart over drie"), which I think is fair at A2. If you prefer the minimal edit, revert the bus sentence, q1 option C and the q1 explanation. The announcement would then still send people to a bus 75 minutes after a wind closure.
2. **voetbal q2, prompt and options.** The spec's example prompt, "Welk shirt moet Amina zondag aan?", allows only two anchored options: the script names only a white and a blue shirt. I used "Wat moet Amina zondag aan?" with the raincoat as the third option and dropped "Een fles water" (water is not worn). The question now has three options instead of four. The persona frame about the sports bag was dropped because the question is no longer about packing. I kept `skill: advice`. "Het witte shirt" in q2 presupposes that Amina owns a white shirt, which weakens q1 distractor B ("Amina heeft geen wit shirt."). The base already had this weakness ("Het witte shirt." was an option before).
3. **spoor, q1 and q2 prompts.** Changing q1 from Leiden to Den Haag goes beyond the spec's literal list. Without it, q1 ("Farah wil naar Leiden") contradicts the corrected q3 ("Farah wil naar Den Haag"). For q2, "sprinter" replaces "trein" for precision. The longest sentence is now 18 words, which is at the A2 heuristic limit but not over it; the checker gives no warning.
4. **paspoort-klaar q3 explanation.** The spec suggests "Voor het ophalen is geen afspraak nodig, maar na drie maanden kan dat niet meer." In that sentence, "dat" can be read as "ophalen zonder afspraak". That reading suggests an appointment after three months, but in fact a new application is needed. I wrote "Gewoon ophalen zonder afspraak kan alleen binnen drie maanden" instead. It carries the same facts without that reading.
5. **bezorgservice q2.** I kept the unflagged clause "Bij het bestellen hoort hij de tijd nog niet". It is an inference (the time comes in the message the day before), not a literal statement. Soften it if you read it as an added fact.
6. **Key balance.** The batch now has no D key, by design of the spec. A is 39.3%, one question below the 40% limit. Across the catalogue, A is still the rarest four-option key (5 of 31). The seven remaining D-keyed four-option questions are outside this batch: parkeervergunning q3, werkdag q2, fietsbrug q2, taalcafe q3, pakket q2, cv-workshop q1 and herhaalmedicijn q2. The spec excludes herhaalmedicijn. A later batch could move some of the others to A. Drill set a2-listening-03 becomes A5 B4 C3; its other items are out of scope.
7. **bloedonderzoek q2.** The new distractor "Vanmiddag zelf de dokter bellen." shares "vanmiddag" with the q1 distractor "Vanmiddag.". Both rest on the same sentence, and neither gives away the other's key.

## batch:check output

```
$ npx tsx scripts/batch-check.ts content/batches/056-original.json
Checked 12 items, 28 questions. Keys: {"C":10,"B":7,"A":11}. Options: {"3":18,"4":10}.
  info  12 of 12 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
