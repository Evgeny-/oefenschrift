# Closed A1 tone-balance drafts

27 October 2026. Author drafts for independent review. No adoption, integration, review verdict, audio generation or image generation was performed.

## Intended tone

The only intended light-humor items are `A1:reading:batch071-plant-ogen:1` and `A1:listening:batch072-bezem-feest:1`. Each batch contributes eight ordinary scenes and one light-humor scene, for sixteen ordinary plus two lightly humorous closed exercises. The coordinator combines these with the other eighteen exercises to reach five lightly humorous tasks in the 36-item program, about 15%. No tone field was added to a source record. A fresh reviewer must classify the sources independently.

A normal toy gift, sleeping pet, waiting chair or paper café decoration has no personification, exaggerated size or absurd action in these drafts. Stable IDs intentionally retain old hook names even where the scene and title have changed.

## Sources and limits

The author used the current reviewed `content/batches/071-original.json` and `072-original.json`, blueprint §4.0, the updated author/review briefs, rubric, content workflow and the existing voice/illustration configuration. Wording remains original practice aimed at A1, with `targetLevelValidated: false`. No KNM claims, real named organisation, brand, address or external exercise content was added. There was no need for a factual web lookup.

All message and conversation sources were settled before changing question evidence or the single changed prompt. Questions never required unused source inventories. All IDs, counts, three-item grouping and answer letters remain; each batch and each existing three-item set has two answers per letter per set.

## Exact source and blind packet hashes

| Artifact                                                 | SHA-256                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| `var/a1-tone-balance-2026-10-27/071-authored.json`       | `52885cb9bf887f392ec1927d8fc9897e3276fca8968191855bb39842b847e382` |
| `var/a1-tone-balance-2026-10-27/071-meaning-packet.json` | `7b1006a0a81749ec2f6b27a00fd7c418f0eeffc2d616715f3cea1abe5ff43b91` |
| `var/a1-tone-balance-2026-10-27/072-authored.json`       | `11f409fe4a9e694f180bff2d9ab02c38cc684ea53f6e30b7ca95fc02e7aa05a6` |
| `var/a1-tone-balance-2026-10-27/072-meaning-packet.json` | `d52c80dec547c982668f88cce342d642411d50cf6502cc4dc30d5e24bd08d4dd` |

Blind packets were built from the exact final draft bytes with the shared `meaningPacket` and `meaningPacketHash` functions in `scripts/meaning-review.ts`. The CLI wrapper accepts only filenames ending in `-original.json` or `-proposed.json`, so its canonical functions were called directly for these explicitly named author drafts. No answer choices, keys, explanations or author notes are included in the packets.

## Changes and media consequences

| Item                                      | Changed fields                                                                                                                                                      | Audio source change    | Image brief change |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------ |
| `A1:reading:batch071-plant-ogen:1`        | Unchanged                                                                                                                                                           | None: reading          | Unchanged          |
| `A1:reading:batch071-hoed-les:1`          | `images[0].alt`, `images[0].brief`, `text`, `title`                                                                                                                 | None: reading          | Changed            |
| `A1:reading:batch071-winkel-sok:1`        | `images[0].alt`, `images[0].brief`, `text`, `title`                                                                                                                 | None: reading          | Changed            |
| `A1:reading:batch071-eend-tas:1`          | `title`                                                                                                                                                             | None: reading          | Unchanged          |
| `A1:reading:batch071-beer-dokter:1`       | `images[0].alt`, `images[0].brief`, `text`, `title`                                                                                                                 | None: reading          | Changed            |
| `A1:reading:batch071-taart-staart:1`      | `images[0].alt`, `images[0].brief`, `text`, `title`                                                                                                                 | None: reading          | Changed            |
| `A1:reading:batch071-kat-werkt:1`         | `text`, `title`                                                                                                                                                     | None: reading          | Unchanged          |
| `A1:reading:batch071-koffer-les:1`        | `images[0].alt`, `images[0].brief`, `text`, `title`                                                                                                                 | None: reading          | Changed            |
| `A1:reading:batch071-hond-feest:1`        | `images[0].alt`, `images[0].brief`, `questions[0].evidence`, `text`, `title`                                                                                        | None: reading          | Changed            |
| `A1:listening:batch072-banaan-telefoon:1` | `images[0].alt`, `images[0].brief`, `questions[0].evidence`, `questions[0].explanation`, `questions[0].prompt`, `script[0].text`, `script[1].text`, `text`, `title` | Fragment; q1 narration | Changed            |
| `A1:listening:batch072-eend-reis:1`       | `images[0].alt`, `images[0].brief`, `script[0].text`, `text`, `title`                                                                                               | Fragment               | Changed            |
| `A1:listening:batch072-stoel-ogen:1`      | `images[0].alt`, `images[0].brief`, `questions[0].explanation`, `script[0].text`, `script[2].text`, `script[3].text`, `situation`, `text`, `title`                  | Fragment               | Changed            |
| `A1:listening:batch072-grote-hoed:1`      | `images[0].alt`, `images[0].brief`, `questions[0].evidence`, `script[0].text`, `script[1].text`, `text`, `title`                                                    | Fragment               | Changed            |
| `A1:listening:batch072-bezem-feest:1`     | Unchanged                                                                                                                                                           | None                   | Unchanged          |
| `A1:listening:batch072-doos-oren:1`       | `images[0].alt`, `images[0].brief`, `script[0].text`, `script[1].text`, `text`, `title`                                                                             | Fragment               | Changed            |
| `A1:listening:batch072-paraplu-werk:1`    | Unchanged                                                                                                                                                           | None                   | Unchanged          |
| `A1:listening:batch072-bloem-beker:1`     | Unchanged                                                                                                                                                           | None                   | Unchanged          |
| `A1:listening:batch072-kat-boeken:1`      | Unchanged                                                                                                                                                           | None                   | Unchanged          |

If these drafts pass independent review, the five changed listening fragments require new audio: phone practice, toy-duck trip, office form, bakery order and gift packing. The phone-practice q1 narration also changes to “Wie speelt Ruth?”. Changes to evidence or explanations alone do not require question narration. The broom dance, drying umbrella, paper-flower café order and cat-on-bag scripts remain byte-for-byte unchanged from the current source.

Eleven image briefs change and need new images after review. Seven remain exact: reading plant, small duck in a bag and cat on a desk; listening broom dance, drying umbrella, paper flower and cat on bag. Existing images may be retained only for these unchanged briefs and only if the existing rendered review remains valid. This author did not mark any image reviewed or attach a generated asset.

Voice roles remain unchanged. Karim retains `m-adult` in the source; the existing per-item override casts him to Ruben (`m-young`). Shared `config/illustration.json` supplies all visual style. The changed briefs contain scene facts, fixed cast traits and answer exclusions.

## Per-item author intent and question rationale

### A1:reading:batch071-plant-ogen:1

Intended tone: `light-humor`. Domain: `werk`. Length: 31 words; sentence mean 5.2, maximum 8. One message with two questions.

Omar invites Lina to a coffee break and tells her where he is and what to bring. He also shares a light office joke about paper eyes on their plant.

- q1: Wat moet Lina meenemen? Key A = Haar beker. Evidence: “Neem je beker mee.”
  - B (Haar jas.): A coat is a familiar thing to bring, but Omar asks for her cup.
  - C (Haar tas.): A bag is a familiar thing to bring, but the requested object is her cup.
- q2: Waar is Omar? Key C = In de keuken. Evidence: “Ik ben in de keuken.”
  - A (In de tuin.): Garden is a familiar place to meet, but Omar states he is in the kitchen.
  - B (In de winkel.): Shop is a familiar location, but he states he is in the kitchen.

### A1:reading:batch071-hoed-les:1

Intended tone: `ordinary`. Domain: `opleiding`. Length: 29 words; sentence mean 4.1, maximum 6. One message with two questions.

Sara tells Sami how the class will celebrate Noor and what material he needs for making her card. Drawing a flower and singing are ordinary birthday activities.

- q1: Voor wie is de kaart? Key B = Voor Noor. Evidence: “We maken een kaart voor Noor.”
  - A (Voor Sara.): Sara is the teacher who writes the message; the card is for Noor.
  - C (Voor Sami.): Sami receives the instruction; the card is for Noor.
- q2: Wat moet Sami meenemen? Key B = Zijn potloden. Evidence: “Neem je potloden mee.”
  - A (Zijn boeken.): Books are familiar lesson materials. The message specifically asks for pencils.
  - C (Zijn broodjes.): Bread rolls could be brought to a celebration, but Sara asks for pencils.

### A1:reading:batch071-winkel-sok:1

Intended tone: `ordinary`. Domain: `winkels-diensten`. Length: 31 words; sentence mean 5.2, maximum 8. One message with two questions.

A shop tells the customer that a repaired coat is ready, gives the collection day and charge, and offers trying it on when collecting it.

- q1: Wanneer kunt u de jas ophalen? Key A = Op vrijdag. Evidence: “U kunt de jas vrijdag ophalen.”
  - B (Op zaterdag.): Saturday is a plausible collection day; the message states Friday.
  - C (Op maandag.): Monday is a plausible collection day; the message states Friday.
- q2: Hoeveel betaalt u? Key C = Twaalf euro. Evidence: “U betaalt twaalf euro.”
  - A (Vijftien euro.): Fifteen euros is a plausible repair charge but differs from the stated twelve.
  - B (Tien euro.): Ten euros is a plausible repair charge but differs from the stated twelve.

### A1:reading:batch071-eend-tas:1

Intended tone: `ordinary`. Domain: `vervoer`. Length: 38 words; sentence mean 6.3, maximum 10. One message with two questions.

Roos asks Karim to collect her from the station and gives the transport and arrival time. The plastic duck is an ordinary small gift carried in a bag.

- q1: Hoe komt Roos? Key B = Met de trein. Evidence: “Ik kom vandaag met de trein.”
  - A (Met de fiets.): Bicycle is a familiar travel mode; Roos explicitly says train.
  - C (Met de bus.): Bus is a familiar travel mode; Roos explicitly says train.
- q2: Hoe laat is Roos op het station? Key A = Om twee uur. Evidence: “Ik ben om twee uur op het station.”
  - B (Om drie uur.): Three is a nearby arrival hour; Roos states two.
  - C (Om vier uur.): Four is a nearby arrival hour; Roos states two.

### A1:reading:batch071-beer-dokter:1

Intended tone: `ordinary`. Domain: `gezondheid`. Length: 31 words; sentence mean 6.2, maximum 11. One message with two questions.

An appointment message gives the time and explains the arrival sequence: report to the counter, wait, and the doctor collects the patient.

- q1: Hoe laat is uw afspraak? Key C = Om tien uur. Evidence: “U heeft morgen een afspraak om tien uur.”
  - A (Om negen uur.): Nine is a plausible appointment hour; the message states ten.
  - B (Om elf uur.): Eleven is a plausible appointment hour; the message states ten.
- q2: Waar moet u eerst naartoe? Key C = Naar de balie. Evidence: “Kom eerst naar de balie.”
  - A (Naar de lift.): A lift is familiar in a health building, but the arrival instruction first names the counter.
  - B (Naar de apotheek.): A pharmacy is a familiar health-service destination, but the first instruction names the counter.

### A1:reading:batch071-taart-staart:1

Intended tone: `ordinary`. Domain: `vrije-tijd-familie`. Length: 29 words; sentence mean 4.1, maximum 6. One message with two questions.

Ivo invites Mila for his birthday. He gives the day and arrival time, then says he will serve cake and tea.

- q1: Wanneer eten ze taart? Key B = Op zaterdag. Evidence: “We eten zaterdag taart bij mij.”
  - A (Op vrijdag.): Friday is a nearby visit day; Ivo states Saturday.
  - C (Op zondag.): Sunday is a nearby visit day; Ivo states Saturday.
- q2: Hoe laat moet Mila komen? Key A = Om drie uur. Evidence: “Kom om drie uur.”
  - B (Om twee uur.): Two is an adjacent hour; Ivo requests three.
  - C (Om vier uur.): Four is an adjacent hour; Ivo requests three.

### A1:reading:batch071-kat-werkt:1

Intended tone: `ordinary`. Domain: `werk`. Length: 26 words; sentence mean 5.2, maximum 7. One message with two questions.

Nora asks Amir to phone her for computer help while she works at home. The cat lies on a desk and does not act like a person.

- q1: Waar werkt Nora? Key C = Thuis. Evidence: “Ik werk vandaag thuis.”
  - A (In de winkel.): A shop is a familiar workplace; Nora explicitly says she works at home.
  - B (Op kantoor.): An office is a familiar workplace; Nora explicitly says she works at home.
- q2: Hoe laat moet Amir bellen? Key B = Om vier uur. Evidence: “Bel me om vier uur.”
  - A (Om twaalf uur.): Twelve is a familiar daytime call hour; Nora requests four.
  - C (Om vijf uur.): Five is a nearby call hour; Nora requests four.

### A1:reading:batch071-koffer-les:1

Intended tone: `ordinary`. Domain: `opleiding`. Length: 30 words; sentence mean 5.0, maximum 9. One message with two questions.

The teacher tells Noor that the class will walk through the park to learn tree and flower words. Noor needs a coat for this outdoor lesson.

- q1: Wat moet Noor meenemen? Key A = Haar jas. Evidence: “Neem je jas mee.”
  - B (Haar pen.): A pen is a familiar lesson object; this message asks Noor to bring her coat.
  - C (Haar boek.): A book is a familiar lesson object; this message asks for her coat.
- q2: Waar is de les vandaag? Key B = In het park. Evidence: “Vandaag hebben we les in het park.”
  - A (In de klas.): A classroom is a familiar lesson place; today the teacher names the park.
  - C (In de tuin.): A garden is a familiar outdoor place, but the teacher names the park.

### A1:reading:batch071-hond-feest:1

Intended tone: `ordinary`. Domain: `vrije-tijd-familie`. Length: 27 words; sentence mean 5.4, maximum 8. One message with two questions.

Ben invites Dina to join an ordinary dog walk at the beach. He brings water and asks her to bring the dog's ball.

- q1: Waar gaat Ben met de hond naartoe? Key A = Naar het strand. Evidence: “We gaan met de hond naar het strand.”
  - B (Naar het park.): A park is a familiar place to walk a dog; Ben states the beach.
  - C (Naar de tuin.): A garden is a familiar place for a dog, but the stated destination is the beach.
- q2: Hoeveel flessen water neemt Ben mee? Key C = Twee. Evidence: “Ik neem twee flessen water mee.”
  - A (Drie.): Three is an alternative bottle count; Ben explicitly states two.
  - B (Vier.): Four is an alternative bottle count; Ben explicitly states two.

### A1:listening:batch072-banaan-telefoon:1

Intended tone: `ordinary`. Domain: `opleiding`. Length: 30 words; sentence mean 3.3, maximum 6. Four turns and two distinct configured voice roles.

Roos asks to use a real phone in a lesson. Ruth agrees, takes the doctor role and prompts an appointment call. Roos gives the requested day; Ruth starts the practice with a name.

- q1: Wie speelt Ruth? Key A = De dokter. Evidence: “Ik speel de dokter.”
  - B (De bakker.): A baker is a familiar role for phone practice; Ruth explicitly takes the doctor role.
  - C (De kapper.): A hairdresser is a familiar role for phone practice; Ruth explicitly takes the doctor role.
- q2: Wanneer wil Roos naar de dokter? Key B = Op maandag. Evidence: “Ik wil maandag naar de dokter.”
  - A (Op vrijdag.): Friday is a familiar appointment day; Roos says Monday.
  - C (Op dinsdag.): Tuesday is a familiar appointment day; Roos says Monday.

### A1:listening:batch072-eend-reis:1

Intended tone: `ordinary`. Domain: `vervoer`. Length: 33 words; sentence mean 4.7, maximum 7. Four turns and two distinct configured voice roles.

Sabrina asks whether a small toy duck goes on the trip. Julio identifies it as a gift for his sister and states their transport. Sabrina asks their departure time; he answers and starts their trip to the station.

- q1: Hoe reizen Sabrina en Julio? Key C = Met de trein. Evidence: “We nemen de trein.”
  - A (Met de bus.): Bus is a familiar travel mode; Julio states train.
  - B (Met de fiets.): Bicycle is a familiar travel mode; Julio states train.
- q2: Hoe laat gaan Sabrina en Julio weg? Key A = Om tien uur. Evidence: “Om tien uur.”
  - B (Om negen uur.): Nine is a nearby departure hour; Julio answers ten.
  - C (Om elf uur.): Eleven is a nearby departure hour; Julio answers ten.

### A1:listening:batch072-stoel-ogen:1

Intended tone: `ordinary`. Domain: `werk`. Length: 33 words; sentence mean 4.1, maximum 6. Four turns and two distinct configured voice roles.

Roos needs a pen to fill in a form. Ruben gives its location. She thanks him and can continue; he tells her to give him the completed form.

- q1: Wat zoekt Roos? Key B = Haar pen. Evidence: “Ik zoek mijn pen.”
  - A (Haar boek.): A book is a familiar office belonging; Roos explicitly says she is looking for her pen.
  - C (Haar tas.): A bag is a familiar office belonging; Roos explicitly names her pen.
- q2: Waar ligt de pen? Key C = Onder de tafel. Evidence: “Je pen ligt onder de tafel.”
  - A (Op de tafel.): On the table is a familiar place for a pen; Ruben says under the table.
  - B (Naast de tafel.): Beside the table is a familiar place to search; Ruben says under the table.

### A1:listening:batch072-grote-hoed:1

Intended tone: `ordinary`. Domain: `winkels-diensten`. Length: 30 words; sentence mean 4.3, maximum 8. Four turns and two distinct configured voice roles.

Fatima requests bread for dinner. Jerry greets her and asks the quantity. She orders two loaves and requests a bag; he agrees to pack the bread.

- q1: Wat koopt Fatima? Key B = Brood. Evidence: “Ik wil graag brood voor het eten vanavond.”
  - A (Taart.): Cake is a familiar bakery purchase; Fatima asks for bread.
  - C (Koek.): Biscuit is a familiar bakery purchase; Fatima asks for bread.
- q2: Hoeveel broden koopt Fatima? Key C = Twee broden. Evidence: “Twee broden, graag.”
  - A (Eén brood.): One loaf is a plausible order quantity; Fatima orders two.
  - B (Drie broden.): Three loaves is a plausible order quantity; Fatima orders two.

### A1:listening:batch072-bezem-feest:1

Intended tone: `light-humor`. Domain: `vrije-tijd-familie`. Length: 34 words; sentence mean 4.2, maximum 6. Four turns and two distinct configured voice roles.

Daan sees Roos dancing with the cleaning tool and checks whether the floor is clean. She confirms and asks for music. He agrees and gives the party time. She puts the broom away and invites him to dance.

- q1: Wat moet Daan aanzetten? Key A = De radio. Evidence: “Zet jij de radio aan?”
  - B (De televisie.): A television is a device someone can turn on, but Roos asks for the radio.
  - C (De telefoon.): A telephone is a device someone can turn on, but the requested device is the radio.
- q2: Hoe laat begint het feest? Key B = Om acht uur. Evidence: “Het feest begint om acht uur.”
  - A (Om zes uur.): Six is a plausible evening party time; Daan states eight.
  - C (Om tien uur.): Ten is a plausible evening party time; Daan states eight.

### A1:listening:batch072-doos-oren:1

Intended tone: `ordinary`. Domain: `vrije-tijd-familie`. Length: 32 words; sentence mean 4.6, maximum 6. Four turns and two distinct configured voice roles.

Karim compliments an ordinary ribbon bow and asks who receives the gift. Lieke names her brother and says it is his birthday. Karim asks the contents; she answers socks and closes the box.

- q1: Wat zit er in de doos? Key C = Sokken. Evidence: “Er zitten sokken in.”
  - A (Appels.): Apples can go in a box; Lieke explicitly names socks as these contents.
  - B (Boeken.): Books can go in a box; Lieke explicitly names socks as these contents.
- q2: Voor wie is het cadeau? Key A = Voor haar broer. Evidence: “Voor mijn broer.”
  - B (Voor haar zus.): A sister is a familiar gift recipient; Lieke states her brother.
  - C (Voor haar moeder.): A mother is a familiar gift recipient; Lieke states her brother.

### A1:listening:batch072-paraplu-werk:1

Intended tone: `ordinary`. Domain: `werk`. Length: 32 words; sentence mean 4.0, maximum 6. Four turns and two distinct configured voice roles.

Sabrina asks whether an open office umbrella is wet. Julio explains that it must dry while rain continues. She asks how he goes home later; he gives the mode and departure time.

- q1: Hoe gaat Julio naar huis? Key C = Met de bus. Evidence: “Met de bus.”
  - A (Met de trein.): Train is a familiar commute mode; Julio says bus.
  - B (Met de fiets.): Bicycle is a familiar commute mode; Julio says bus.
- q2: Hoe laat vertrekt Julio? Key A = Om vijf uur. Evidence: “Ik vertrek om vijf uur.”
  - B (Om zes uur.): Six is a plausible time to leave work; Julio states five.
  - C (Om zeven uur.): Seven is a plausible time to leave work; Julio states five.

### A1:listening:batch072-bloem-beker:1

Intended tone: `ordinary`. Domain: `winkels-diensten`. Length: 32 words; sentence mean 3.6, maximum 7. Four turns and two distinct configured voice roles.

Fatima compliments a paper café decoration. Jerry thanks her and asks what she wants to eat. She orders soup and water; he confirms and directs her to sit while he brings the order.

- q1: Wat wil Fatima eten? Key B = Soep. Evidence: “Soep, graag.”
  - A (Brood.): Bread is a familiar café food; Fatima explicitly orders soup.
  - C (Rijst.): Rice is a familiar food alternative; Fatima orders soup.
- q2: Wat wil Fatima drinken? Key C = Water. Evidence: “En een glas water.”
  - A (Melk.): Milk is a familiar drink; Fatima orders water.
  - B (Sap.): Juice is a familiar drink; Fatima orders water.

### A1:listening:batch072-kat-boeken:1

Intended tone: `ordinary`. Domain: `vrije-tijd-familie`. Length: 33 words; sentence mean 3.7, maximum 6. Four turns and two distinct configured voice roles.

Ruth must leave for work but a sleeping cat blocks her bag. Roos offers to move the cat and asks when she starts. Ruth answers nine; Roos lets her take the bag and wishes her a good day.

- q1: Waar gaat Ruth nu naartoe? Key A = Naar haar werk. Evidence: “Ik moet naar mijn werk.”
  - B (Naar de winkel.): A shop is a familiar destination when leaving home; Ruth says she must go to work.
  - C (Naar de les.): A lesson is a familiar destination when leaving home; Ruth says work.
- q2: Hoe laat begint Ruth? Key B = Om negen uur. Evidence: “Om negen uur.”
  - A (Om acht uur.): Eight is a plausible work start time; Ruth answers nine.
  - C (Om tien uur.): Ten is a plausible work start time; Ruth answers nine.

## Checker results

Both exact final authored files were formatted with Prettier and checked with `npm run batch:check -- <file>`.

```text
071-authored.json
Checked 9 items, 18 questions. Keys: {"A":6,"C":6,"B":6}. Options: {"3":18}.
  info  9 of 9 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.

072-authored.json
Checked 9 items, 18 questions. Keys: {"A":6,"B":6,"C":6}. Options: {"3":18}.
  info  9 of 9 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

Independent review remains outstanding. Its source-first pass should use only the blind packets before opening these notes or full drafts. Review should check the purpose of each reply, ordinary tone in sixteen scenes, the two deliberate light jokes, and leakage through titles, situations, alts or pictures. Editorial review cannot validate difficulty or exam equivalence.
