# Batch 005 editorial review (A2 Luisteren)

**Verdict:** Pass. All 12 fragments (28 questions) pass with no revision requests. Ready for integration as a reviewed script batch; audio and stills remain blocked until the media review.

**Reviewed source:** `content/batches/005-original.json`  
**SHA-256:** `247ee89d392c6d5046fba76fb0a9969b92a3678a24fbb924c53bdde31ad9996c` (after the focused re-review at the end of this document; the full review below was written against `eb96978feaaf050adfadf2c1ccd2fb263bedd17171235dd12c3d0197b8378dfd`, which the re-review shows differs only in the image fields named there)  
**Review date:** 10 September 2026  
**Rubric:** `content/reviews/rubric.md`, applied with `content/blueprint.md` §1, 3, 4.2, 5, 6, 8, 9, 10, 13 and `docs/research/content-workflow.md` §5.

The reviewer did not write the batch and did not edit it. Verdicts were formed from the batch file alone; the author's notes (`content/batches/005-notes.md`) were read afterwards and used only to check the distractor rationales.

**Provenance:** the reviewed bytes are the working-tree file. The version committed at `35e0e37` (SHA-256 `9343d101c1b8749d934ae19f3a8e23a6dd8bee15b5bd32cfb8416722bd6361ac`) is an earlier draft of the same twelve items (training q2 distractor "Zijn rooster", "want het is garantie", a shorter tabletten exchange, past tense in the speelplaats news item, and stills on training and werkdag). Only the working-tree version with the hash above was reviewed and passes; commit that version before integration, or the hash gate will reject the batch.

## Batch summary

Twelve original A2 listening fragments: five `gesprek` (training, scherm, tabletten, feestje, toets), two `voicemail` (parkeervergunning, voetbal), two `omroep` (bus, winkelcentrum), one `nieuws` (speelplaats), one `uitleg` (werkdag), one `reclame` (computercursus). All eight A2 domains are used (werk 2, opleiding 2, wonen-buurt 2, winkels-diensten 2, gezondheid, instanties, vervoer, vrije-tijd-familie). Every item has `exam: duo-a2`, `taskType`, `domain`, a `situation` line naming a person and the source, a short Dutch `title`, a `script` with voice roles from `config/voices.json`, a `text` equal to the joined script, two or three questions with three or four options, verbatim `evidence`, an `explanation` and a `skill` tag, `status: draft` and `targetLevelValidated: false`.

Spoken length 107–153 words per fragment (about 45–70 seconds at a deliberate A2 pace), inside the 30–90 s / 70–200 word window. Conversations have ten turns and two different roles each; monologues one speaker. Keys A 7, B 8, C 8, D 5 (D is 5 of the 11 four-option questions); no two questions in one item share a key. Four-option share 39%. Every item has at least one persona-scenario prompt; four purpose questions (one per three items).

## Checker output

`npm run batch:check content/batches/005-original.json` (run by the reviewer, 10 September 2026):

```
Checked 12 items, 28 questions. Keys: {"B":8,"C":8,"A":7,"D":5}. Options: {"3":17,"4":11}.
No failures, no warnings.
```

Reviewer's own checks in addition: JSON parses; 12 unique ids; no listening slug reused from the catalogue (`parkeervergunning` exists only as a reading slug in the uncatalogued batch 004, which the blueprint allows); a 5- and 6-word phrase scan of all scripts against `content/catalogue.json` and `content/batches/004-original.json` found no 6-word overlap and only generic 5-word phrases ("wanneer is de telefoon klaar", "een regenjas is niet nodig", "naar de balie in het", "in de grote zaal beneden"). Sentence statistics computed per fragment: average 4.8–8.5 words, longest 9–17 words, all under the A2 targets of 12 and 18. Subordinate clauses only with omdat, als, dat, want, dus, one indirect "of Amina komt"; tenses present, perfect and simple past in dialogue only.

## Method per item

For each fragment the reviewer read the script as it will be heard (without punctuation cues), located the sentence that answers each question, confirmed it is said once and plainly with the competing detail said elsewhere, tested every distractor as a possible competing answer, checked option parallelism and key signalling, checked that the explanation supports the key and names the tempting distractor, checked the skill tag, the register (u/je), the naturalness of the spoken Dutch, the A2 level heuristics, the voice casting, the metadata, and the image brief where present. Level is stated against the official A2 fragments as described in the blueprint and `docs/research/exam-blueprints-2026-09-10.md` (30–90 s conversations, announcements, voicemails and news; fact, rule-application and purpose questions); `content/exemplars/` does not exist yet (see limitations).

## Item findings and verdicts

### 1. `A2:listening:batch005-training:1` — Pass

Supervisor (f-adult) and Karim (m-adult), 114 words, ten turns. Female supervisor, informal "je" between colleagues: natural workplace Dutch ("Kun je dinsdag?", "Dan doen we donderdag.", "voor de lunch zorgen wij").

- q1 (time-place, key B "Op donderdag."): proven by "Dan doen we donderdag." Tuesday is proposed and withdrawn ("Dinsdag werk ik de hele dag bij een klant"); "vandaag" is when the rooster is updated. Neither distractor is defensible.
- q2 (advice, key C "Zijn werkschoenen."): proven by "Je werkschoenen, want je gaat ook oefenen." Laptop "niet nodig", lunch provided, certificate received afterwards. Options parallel ("Zijn …"), equal length.
- q3 (purpose, key A): proven by "Er komt een training … Ik wil graag dat jij die volgt." B attributes Karim's own client visit to the supervisor; C reverses the certificate. Lengths 7/9/8, no signal.

"heftruck" is the one less common word; the questions do not depend on it. Situation, title, task type and domain fit; a work training is a new setting for listening. Level: comparable.

### 2. `A2:listening:batch005-scherm:1` — Pass

Fatima (f-adult) and shop employee (m-shop), 120 words, "u" both ways. Very short sentences (average 4.8 words), all natural ("Even kijken. Ja, dat kan.", "Bellen is lastig, want uw telefoon ligt dan hier.").

- q1 (quantity, key A "75 euro."): proven by "Een nieuw scherm kost 75 euro." 110 euro is the price with the battery she declines; the warranty is over ("Dan is de garantie voorbij", phone three years old). Distractor C is longer than the key, which does not signal the key.
- q2 (detail, key C "De winkel stuurt een e-mail."): proven by "Ik stuur u een e-mail." A is what Fatima asks for and is refused; B reverses who contacts whom; calling is discussed in the fragment, so B is grounded.

Image brief shows the hand-over at the counter with no prices or signs; alt is Dutch and neutral. Notes state audio with one still. Level: comparable (slightly on the easy side because of the very short turns, but the price and contact contrasts are exam-typical).

### 3. `A2:listening:batch005-tabletten:1` — Pass

Pharmacy assistant (f-adult) and mevrouw Bakker (f-older), 125 words, "u". Natural counter Dutch ("Hoe moet ik ze innemen?", "Krijg ik dan vanzelf nieuwe?").

- q1 (rule-application, key D "De tablet later op de dag innemen."): proven by "Neem de tablet dan later op de dag, met wat eten." A is forbidden ("neem nooit twee tabletten tegelijk"), B belongs to a new prescription, C to the rest of the box. Lengths 6/3/3/7: A is as long as the key, so length does not point to D.
- q2 (time-place, key B "Donderdag."): proven by "De rest ligt donderdag voor u klaar." "Vandaag" is refused ("Meer hebben we vandaag niet"); "twee weken" is what the box covers.

The advice is generic counter fiction (no medicine named, one tablet a day, never two at once); it is a comprehension stimulus, not guidance the app gives. Level: comparable.

### 4. `A2:listening:batch005-feestje:1` — Pass

Roos (f-young) and meneer De Vries (m-older), 119 words; Roos says "u" to the older neighbour. Coherent: De Vries mistakes last Friday's party at the other neighbours for Roos's.

- q1 (time-place, key B "Tot elf uur."): proven by "De muziek gaat om elf uur uit." Eight is the start, twelve is when everyone has left. Three parallel options.
- q2 (purpose, key A "Ze wil vertellen over haar feest."): proven by "Ik kom even iets zeggen. Zaterdag geef ik een feestje…". No complaint is made about the other neighbours; the car question is De Vries's. Lengths 6/6/8, no signal.

"nummer 12" and "twaalf uur" are far apart and in different frames. Level: comparable.

### 5. `A2:listening:batch005-toets:1` — Pass

Julio (m-young) and docent Dekker (m-adult), 137 words; teacher uses "je". Natural classroom Dutch ("Zeg het maar.", "Die doe je uit en in je tas.").

- q1 (time-place, key A "Op dinsdag."): proven by "Nee, de toets is op dinsdag om negen uur." Thursday is the lesson day Julio assumes; June is the retake.
- q2 (rule-application, key B "Een woordenboek."): proven by "Ja, een woordenboek mag." Phone off and in the bag, notes in the bag, "Het boek zelf mag je niet gebruiken."
- q3 (detail, key C "Per e-mail."): proven by "Na twee weken, per e-mail." "In de les" is explicitly excluded; the phone is mentioned only as something to switch off.

Julio repeats the day and time, so q1 is a little easier than a single mention; acceptable and natural. Image brief (empty classroom, no clock, calendar or board text) reveals nothing; alt neutral. Level: comparable.

### 6. `A2:listening:batch005-parkeervergunning:1` — Pass

Gemeente clerk (f-adult), 132 words, formal "u". Institutional but plain ("Betalen hoeft u nu nog niet.", "Stuurt u het document binnen twee weken?").

- q1 (rule-application, key B "Tot acht uur."): proven by "Op donderdag is de balie langer open, tot acht uur 's avonds." Five is the normal closing time, nine the opening time.
- q2 (time-place, key C "Als de vergunning klaar is."): proven by "U betaalt pas als de vergunning klaar is." "Nu meteen" is negated; "binnen twee weken" is the document deadline. The key is the longest option (5 words against 2 and 3) because it states a condition; the competing detail B is strong, so the item is not guessable from form alone.
- q3 (purpose, key D "Er mist nog een document."): proven by "Maar wij missen nog één document: een kopie van het kentekenbewijs…". A (ready), B (pay now) and C (desk closed Thursday) are each contradicted. Four parallel options of 4–5 words.

"kentekenbewijs" is glossed by "van uw auto" and by "document"; no question depends on the word. Real institution (gemeente) with an invented town. Level: comparable (at the fuller end of A2 monologues).

### 7. `A2:listening:batch005-voetbal:1` — Pass

Trainer Lisa (f-young), 127 words; "Hoi" plus "u" to a parent is plausible for a young trainer.

- q1 (purpose, key A "De wedstrijd is op een andere dag."): proven by "De wedstrijd is niet op zaterdag, maar op zondag om tien uur." B is contradicted ("haar witte shirt" implies she has one); C reverses "gaat gewoon door". A is the only true statement among the options.
- q2 (advice, key D "Het witte shirt."): proven by "Amina moet haar witte shirt aan, niet het blauwe." Blue is forbidden, raincoat "niet nodig", water is at the field. Elimination is airtight.

Amina (girl of about 10) as Fatima's daughter matches the cast. Level: comparable.

### 8. `A2:listening:batch005-bus:1` — Pass

Bus driver announcement (narrator role, as `config/voices.json` prescribes for omroep), 120 words. Realistic detail (pin only, no cash).

- q1 (advice, key B "Bij de halte Markt."): proven by "Wilt u naar het stadhuis? Stap dan uit bij de halte Markt." Stadhuisplein is skipped this week, Ziekenhuis is the next stop, the station is the line's destination. The obvious world-knowledge guess (Stadhuisplein) is wrong, so listening matters.
- q2 (time-place, key C "Vanaf zaterdag."): proven by "Vanaf zaterdag rijdt lijn 12 weer de gewone route." Monday is when the works began, Friday the last day ("tot en met vrijdag").

Level: comparable.

### 9. `A2:listening:batch005-winkelcentrum:1` — Pass

Shopping-centre announcement (narrator), 107 words.

- q1 (time-place, key C "Bij de informatiebalie."): proven by "Dan kunt u hem ophalen bij de informatiebalie op de eerste verdieping." Noord is where the coat was found; the lift at Zuid is unrelated to the coat.
- q2 (rule-application, key B "Tot half tien."): proven by "Let op: de parkeergarage sluit om half tien." Nine (centre), ten (tomorrow's opening) and half elf (bicycle shed) are each said once with their own subject. Four parallel three-word options. This is the most demanding question in the batch, but each time is explicit and distinct when spoken.

Level: comparable (harder end of A2, exam-typical).

### 10. `A2:listening:batch005-speelplaats:1` — Pass

Regional news item (presenter), 125 words, longer sentences (average 8.3) but all under 18 words.

- q1 (person, key A "De gemeente."): proven by "De gemeente betaalt de nieuwe speelplaats." Residents asked for it; the school's children take part in the opening.
- q2 (advice, key D "Bij het wijkcentrum."): proven by "Meld u dan bij het wijkcentrum aan de Vijverlaan." The gemeente "zoekt ook hulp" but the reporting point is explicit; school and playground are opening-day places. "aan de Vijverlaan" also describes the old playground, which makes C a fair competing detail.

"wethouder" appears once as the person who opens the playground; no politics. Image brief (playground, no sign, banner or clock) reveals nothing; alt neutral. Level: comparable.

### 11. `A2:listening:batch005-werkdag:1` — Pass

Team leader Bram (m-adult), 148 words, "je". Natural first-day briefing; the clock-in device is described in A2 words ("Daar houd je je pas tegenaan").

- q1 (rule-application, key A "Voor zeven uur bellen."): proven by "Bel mij dan voor zeven uur 's ochtends." Message discouraged ("Stuur geen berichtje"), reception is for the key, coming to him is for questions.
- q2 (time-place, key D "Op de eerste verdieping."): proven by "De kantine is op de eerste verdieping, naast de keuken." The device hangs next to the staff entrance, the key is at reception, clothes are in the changing room.
- q3 (detail, key C "Bij de receptie."): proven by "De sleutel van je kastje haal je bij de receptie."

q2 and q3 draw on adjacent sentences with overlapping distractor sets; each has its own evidence and neither reveals the other's key. Level: comparable (longest fragment, about 60–65 s).

### 12. `A2:listening:batch005-computercursus:1` — Pass

Radio advertisement (presenter), 153 words; the longest sentence (17 words) is a list of three skills.

- q1 (rule-application, key C "Niets."): proven by "Hebt u een stadspas? Dan is de cursus gratis." 20 euro without a pass, 40 euro for the advanced course; the prompt names the beginners' course, so the later price cannot compete.
- q2 (quantity, key B "Tien."): proven by "De groep is klein: maximaal tien mensen." Eight is the number of lessons, twenty and forty are the prices. Four one-word options.

"dinsdag 6 oktober" is a Tuesday in 2026. Image brief shows four adults with laptops (not the maximum of ten) and a helper; alt neutral. Level: comparable.

## Revision requests

None. Every item passes as written.

The following observations are **not** revision requests; they are recorded so the coordinator can decide, and none changes a key, an evidence quote or a learner-facing text unless the coordinator chooses to act on it. Any byte change to the batch file would invalidate the hash above and require a focused re-review.

- **Items 1, 3, 4 (training, tabletten, feestje): no still.** Blueprint §4.2 says a conversation the official exam would show on video "is an audio conversation with one still"; these three notes say "alleen audio" and carry no `imageBrief`/`imageAlt`, while items 2 and 5 do. Images are produced and reviewed in the media stage (§13), so this does not block the editorial pass. If the coordinator wants stills on all five conversations, ask the author for briefs before the hash gate rather than after.
- **Item 8 (bus): the driver is voiced by `narrator`,** the voice that also reads every question. This follows `config/voices.json` ("announcements (omroep)"). If a live in-vehicle speaker should sound different from the question reader, `m-adult` would fit; item 9 (PA announcement) is right with `narrator` either way.
- **Purpose questions and sibling prompts.** In items 1 and 6 the purpose question comes last and its key ("training", "document") is already mentioned in the earlier prompts of the same fragment. The app shows one question at a time (`app/components/Session.tsx`), so the learner has listened before reaching it, and the official exam has the same property; no change needed.
- **Item 7 q2:** "een regenjas is niet nodig" as a distractor repeats the pattern of the existing `A2:listening:batch001-schoolreis:1` (also a voicemail to a parent). The key (white versus blue shirt) and the purpose question are new. Optional: replace distractor B with another item the trainer mentions if the two items ever sit in one drill.
- **Item 6 q2:** the key is the longest option because it states a condition; the competing detail "binnen twee weken" carries the difficulty. Optional only.
- **Item 5 image brief** says "an older male teacher" while the voice is `m-adult`; align at the illustration stage ("a male teacher of about fifty") so the still and the voice agree. Cosmetic.
- **Media-stage notes:** item 3 has two female voices (f-adult, f-older): check that they are distinct in the rendered dialogue. Digit strings ("75 euro", "lijn 12", "0345 12 34 56", "6 oktober") depend on the TTS reading them in Dutch; the round-trip check normalises numbers, and no phone number is answer-relevant.

## Diversity review

Within the batch, the twelve settings, communicative purposes and information structures are distinct: a training date negotiation, a repair intake with a price choice, a dosage instruction, a party announcement, test rules, a missing document, a match change, a bus detour, a shopping-centre announcement, a news item about who pays and where to report, a first-day briefing, and a course advertisement with a price rule. Tested skills spread over time-place 8, rule-application 6, advice 4, purpose 4, detail 3, quantity 2, person 1.

Against the catalogue, no listening setting from blueprint §9 (tandarts, taalles buurthuis, marktomroep, schoolreis, stationsomroep, bakker, zwembad) is repeated, and no item is an earlier item with new names or numbers. Cross-part setting re-use exists with the uncatalogued reading batch 004 (parkeervergunning at the gemeente, telefoonwinkel screen repair, apotheek with mevrouw Bakker, pin-only bus tickets): each 005 item tests different facts through a different channel, and reading and listening items never share a drill or a mock form, so this is acceptable; the coordinator should be aware that these four settings now appear twice in the bank. Two of twelve items are `wonen-buurt` (one with a volunteering ending), which §9 asks to use sparingly; the other domains are all served, so the balance is acceptable. The `nieuws` and `reclame` task types appear in the bank for the first time.

## Limitations

- This is an AI editorial review of scripts before audio exists. It does not replace review by a Dutch-language educator, learner trials or psychometric calibration, and it does not establish equivalence with the official DUO exam. The A2 label remains an unvalidated authoring target on every item.
- Originality was judged by plausibility and by a phrase scan against this project's own catalogue and batch 004; the reviewer did not compare the scripts with the official practice-exam audio, which the blueprint says is read for structure only.
- `content/exemplars/` does not exist yet, so the level check compares each item with the blueprint's description of the official fragments and with the shorter existing items, not with two exemplars per task type as blueprint §10 intends. A second, independent level check (blueprint §12 step 5) is still due.
- Listening items stay blocked for publication until the generated audio passes the round-trip check and a media review, and until the stills (where present) are reviewed against `config/illustration.json`.

## Focused re-review (10 September 2026)

**Scope:** the coordinator's revision recorded at the end of `content/batches/005-notes.md`: `imageBrief` and `imageAlt` added to `batch005-training`, `batch005-tabletten` and `batch005-feestje`, and "an older male teacher" changed to "a male teacher of about forty" in the `imageBrief` of `batch005-toets`.
**Verdict:** pass. `batch_verdict` stays "pass" and `ready_for_integration` stays true.
**Reviewed SHA-256:** `247ee89d392c6d5046fba76fb0a9969b92a3678a24fbb924c53bdde31ad9996c` (supersedes `eb96978feaaf050adfadf2c1ccd2fb263bedd17171235dd12c3d0197b8378dfd`).

What was checked:

- **Nothing else changed.** HEAD (`35e0e37`) still holds the earlier draft, so `git diff HEAD` cannot isolate the coordinator's change. Instead the reviewer reverted exactly the four changes in a copy (deleted the six new fields, restored the old toets wording, re-serialised with the file's own two-space JSON format): the result hashes to `eb96978feaaf050adfadf2c1ccd2fb263bedd17171235dd12c3d0197b8378dfd`, the version of the full review, byte for byte. So no script, question, option, key, evidence, explanation or metadata field changed. In addition, per item: `text` equals the joined script, every `evidence` is verbatim, roles are valid keys of `config/voices.json`, two roles per conversation, keys and spoken word counts (114, 120, 125, 119, 137, 132, 127, 120, 107, 125, 148, 153) are as stated in the item findings above. The scripts and all questions of training, tabletten, feestje, toets, parkeervergunning and winkelcentrum were re-read in full against those findings; all match.
- **Checker:** `npm run batch:check content/batches/005-original.json`: "Checked 12 items, 28 questions. Keys: {B:8, C:8, A:7, D:5}. Options: {3:17, 4:11}. No failures, no warnings." `shasum -a 256` gives the hash above.
- **Image fields** (blueprint §4.2 "supports the situation without answering a question", §7 plain scene, cast with fixed traits, Dutch alt without a key; `config/illustration.json` review checklist and cast):
  - *training* — Karim beside the desk of his female supervisor in a small office; no calendar, no clock, no text on the screen, so neither the day (q1), the shoes (q2) nor the training (q3) is shown. Alt "Karim praat op kantoor met zijn leidinggevende." is neutral Dutch. "Karim" is the exact cast key and expands to his three traits; he is m-adult and the cast says "man in his thirties"; the female supervisor matches the f-adult Leidinggevende.
  - *tabletten* — the assistant hands mevrouw Bakker a small box at the pharmacy counter; no labels, no text, no clock, so neither the forgotten-tablet rule (q1) nor the pick-up day (q2) is shown. Alt neutral. "mevrouw Bakker" is deliberately in lower case at the start of the brief: `scripts/illustrate.ts` (`expandCast`) matches cast keys case-sensitively, so this spelling expands (woman of about 65, short white hair, red cardigan) whereas "Mevrouw Bakker" would not. f-older for mevrouw Bakker and f-adult for the female assistant match.
  - *feestje* — Roos at the open front door of meneer De Vries's terraced house; no house number, no text, no clock, so neither the music time (q1) nor her purpose (q2) is shown; the bicycle by the wall is generic Dutch scenery and no tested fact. Alt "Roos staat bij de voordeur en praat met haar buurman, meneer De Vries." is neutral. Both names are exact cast keys and expand; f-young (young woman) and m-older (man of about 60) match.
  - *toets* — only the teacher's age changed. "A male teacher of about forty" agrees with the m-adult voice (the full review suggested "about fifty"; forty is equally an adult rather than an older voice). The rest of the brief and the unchanged alt still reveal nothing (no clock, calendar or board text; the bag was already there).
  - All four briefs are one plain sentence with explicit exclusions, as §7 asks ("detail is the enemy"); all alts are Dutch and name the persona exactly as the questions do.

This resolves the first and fifth observations of the full review (no still on training, tabletten and feestje; "older male teacher" in the toets brief).

Observations, not blocking:

- The `notes` of training, tabletten and feestje still say "hier is het alleen audio", although the items now carry a still brief; scherm and toets say "hier is het audio met één still". `notes` is not shown by the app (no reference in `app/` or `server/`), so this is an editorial inconsistency with blueprint §4.2 ("Say so in the item's `notes`"), not a learner-facing error and not a change to any key, evidence or script. Fix the wording together with any later edit (every byte change needs another focused re-review), or accept it as is.
- `content/batches/005-notes.md` §8 still lists four briefs and the "older male teacher" wording; the coordinator's addendum at the end records the change, so the notes read as a history.
- Media stage: the training brief's "a computer and a folder on the desk" may be drawn as a laptop. It is the supervisor's and does not make q2 distractor A ("Zijn laptop.") true, but a desktop screen is preferable when the still is reviewed against `config/illustration.json`.
