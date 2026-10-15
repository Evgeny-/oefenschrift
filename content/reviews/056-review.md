# Batch 056 review (A2 Luisteren, twelve replacement items)

**Verdict:** pass. Ten items pass as written, two pass after an explanation edit, and none is rejected. Each of the 28 keys follows from a verbatim evidence sentence. Every distractor is anchored in the script and clearly false.

- Proposed source: `content/batches/056-proposed.json`, SHA-256 `4594603fe1bf395753031e2d3c8504605afab0897af72b8d0f23779bb4f8de14`. It differs from the author's `content/batches/056-original.json` in two explanation strings only (paspoort-klaar q3, bezorgservice q2).
- `replaces` lists all twelve IDs. All of them are already in the catalogue. There are no starters, because these are closed items.
- Reviewed on 14 October 2026 by an independent AI reviewer (Claude Opus 5.5), in a context separate from the author's. This is AI editorial review. It does not validate CEFR difficulty or equivalence with the official exam.

## What I checked

- **Diff against the base.** I diffed every field of every item against `tmp/content-fix-2026-10-14/base/056-base.json`. Only the spec fixes and their direct consequences changed. IDs, item order, field order, titles, situations, notes, roles, image briefs and alts are unchanged. There are no `revision`, media or `type` fields. The base equals `content/catalogue.json` apart from `status` and the media fields.
- **Scripts.** I read all twelve scripts in full as a listener hears them. For every item, `text` equals the script joined as "Speaker: text" lines. No script contains a digit, and every time and number is in words.
- **Keys and distractors.** I proved each key from its evidence and tested each distractor as a competing answer (see the review JSON). No key is the longest option by more than two characters. No prompt word recurs only in the key. No explanation names an option letter.
- **Checker.** `npx tsx scripts/batch-check.ts content/batches/056-proposed.json` printed: "Checked 12 items, 28 questions. Keys: {"C":10,"B":7,"A":11}. Options: {"3":18,"4":10}." It printed the expected revision info line, then "No failures, no warnings."
- **Keys.**
  - Batch shares: A 39.3%, B 25.0%, C 35.7%, D 0.
  - Four-option keys: A4 B1 C5.
  - All seven D-keyed four-option questions that the spec lists now have A or C as the key.
  - In batch order, no letter repeats more than twice.
- **Media hashes.** I hashed every script and every question prompt and compared them with `content/audio-manifest.json`. Exactly six clips differ (see Media notes).
- **Real-world fact.** On 14 October 2026, Rijksoverheid ("Waar en hoe kan ik een paspoort of identiteitskaart aanvragen?") said that you have at most three months after applying to collect a passport, and that it is destroyed after that. The paspoort script and the q3 key agree with this. This is not a KNM item.
- **Three options at A2.** The official A2 Luisteren has three or four options (blueprint §2; exam-blueprints, Luisteren A2). In the catalogue, 62 of the 94 A2 listening questions have three options, and six items have only three-option questions.

## Verdicts

| ID (`A2:listening:…:1`) | Verdict | Level | Reason |
| --- | --- | --- | --- |
| batch023-spoor | pass | comparable | The Den Haag sprinter now ends in Leiden, which makes the announcement coherent. Farah is the persona in q1 and q3. The keys are platform five, half past three and changing in Leiden. 116 words; the longest sentence is 18 words, at the A2 limit. |
| batch023-bloedonderzoek | pass | comparable | The new q2 distractor "Vanmiddag zelf de dokter bellen." is anchored on "Vanmiddag lukt niet" and is clearly false. The visit route that the assistant offers is no longer an option. |
| batch005-voetbal | pass | comparable | The prompt now asks what Amina must wear, and the key is the white shirt. The blue shirt is negated and the raincoat is "niet nodig". Three options are acceptable for A2 listening. |
| batch022-paspoort-klaar | pass (edited) | comparable (fuller end) | q1 is keyed A after the swap. The new q3 distractor A tests the three-month limit. I edited the explanation so that it no longer implies collection with an appointment after three months. |
| batch001-markt | pass | comparable (short end) | There is no more sheltering under a stall in the wind. The bus leaves at quarter past three, a quarter of an hour after the early closing. The taxis anchor q2-C. 79 words, about 32–36 s. |
| batch005-speelplaats | pass | comparable | The explanation now says that the school's children take part in the opening and that the playground is what must stay clean. The script is unchanged. q2 is keyed C. |
| batch022-koffiegeld | pass | comparable | The q3 explanation no longer adds a rule. "Dat je het aan Ruud moet vertellen, zegt hij niet" is accurate. |
| batch023-bezorgservice | pass (edited) | comparable | The added fact "op de dag zelf is het te laat" is gone. I also edited the remaining clause, which stated as fact that the time is unknown when ordering. |
| buurthuis | pass | comparable (short end) | Option order only (q2 keyed A). The explanation names no letters. |
| batch001-schoolreis | pass | comparable (short end) | Option order only (q1 keyed C). |
| batch002-trein | pass | comparable (short end) | Option order only (q2 keyed C). |
| batch005-tabletten | pass | comparable | Option order only (q1 keyed A). |

`content/exemplars/` does not exist. The level verdicts therefore compare each item with the official A2 Luisteren description (blueprint §4.2 and §10, exam-blueprints Luisteren A2), with the earlier reviews of these items (001, 002, 005, 022, 023) and with catalogue items of the same task type. No item is off-level.

## Edits

1. **batch022-paspoort-klaar, q3 `explanation`.**
   - New text: "Na drie maanden moet Modibo een nieuw paspoort aanvragen en opnieuw betalen. Ophalen kan alleen binnen drie maanden, en iemand anders mag het paspoort niet voor hem halen."
   - Why: the author's sentence "Gewoon ophalen zonder afspraak kan alleen binnen drie maanden" restricts the claim with "zonder afspraak". That suggests collection with an appointment might still work after three months, which is the same misreading the author wanted to avoid in the spec's suggested sentence. The script only says "Haalt u het paspoort binnen drie maanden op? Anders moet u een nieuw paspoort aanvragen". No option mentions an appointment any more, so the explanation no longer needs one.
2. **batch023-bezorgservice, q2 `explanation`.**
   - New text: "De dag voor de bezorging krijgt de klant een berichtje met de tijd. De reclame zegt niet dat Karim de tijd hoort als hij bestelt, en het berichtje komt al de dag ervoor, niet op de dag zelf."
   - Why: "Bij het bestellen hoort hij de tijd nog niet" states something the advertisement only implies. The new clause says what the script supports. It follows the pattern of the koffiegeld fix and names Karim, so "hij" cannot be read as "de reclame".

Neither edit touches spoken text, a prompt or an option, so neither has a media effect.

## Rejected

None.

## Decisions on the author's doubts

1. **markt, bus at "kwart over drie": keep.**
   - The spec counts "a bus an hour after closing" as part of the implausibility, and the bus sentence lies inside the span it quotes. If the bus stayed at "kwart over vier" without the shelter lines, the announcement would send people to wait 75 minutes in strong wind.
   - At "kwart over drie", the bus leaves a quarter of an hour after the early closing, and the script is plausible.
   - q1 still works. C ("Om kwart over drie.") is the bus time and clearly false, and it is a fair A2 time contrast with "drie uur". q2 does not depend on the time. The q1 prompt is unchanged, so the q1 clip stays.
2. **voetbal q2, three options: accept.**
   - Three-option questions are official at A2 and are the majority in the catalogue (62 of 94). The checker accepts A–C.
   - The script names only a white and a blue shirt. A fourth wearable option would be invented, and "Een fles water" cannot answer "Wat moet … aan?".
   - "Wat moet Amina zondag aan?" is natural spoken Dutch. `skill: advice` fits, because the answer is the trainer's instruction.
   - The q1-B presupposition ("Het witte shirt" implies that Amina owns one) predates this batch. It is harmless, because the script says "haar witte shirt".
3. **spoor, "Farah wil naar Den Haag" in q1 and "sprinter" in q2: accept.**
   - The q1 change is a necessary consequence: q3 now uses Farah, and her train is the Den Haag sprinter. The old "Farah wil naar Leiden" would contradict q3 and would make q1 depend on inferring that the sprinter stops in Leiden.
   - "de sprinter naar Den Haag" in q2 names the announced train and excludes the unannounced connection from Leiden. The q2 clip needs new audio anyway.
   - The longest sentence is 18 words, at the A2 limit. I accept it.
4. **paspoort-klaar explanation: edited** (edit 1). I agree that the spec's "maar na drie maanden kan dat niet meer" is ambiguous. The author's rewording kept a similar implicature through "zonder afspraak", so I removed the reference to an appointment.
5. **bezorgservice clause: softened** (edit 2). It was an inference stated as fact.
6. **Key balance: accept.**
   - A at 39.3% is within the limit, and D at 0% is the aim of the spec. I verified the three forced positions (bloedonderzoek q2 C, speelplaats q2 C, buurthuis q2 A).
   - The free choices sensibly raise A, which is the rarest four-option key. Across the catalogue's four-option questions, the keys go from A2 B10 C5 D15 to A5 B10 C9 D7.
   - Seven D-keyed four-option questions remain outside this batch, for a later batch: parkeervergunning q3, werkdag q2, fietsbrug q2, taalcafe q3, pakket q2, cv-workshop q1 and herhaalmedicijn q2.
7. **bloedonderzoek, "vanmiddag" in q1-A and q2-A: accept.** Both options rest on "Vanmiddag lukt niet, want dan heeft ze spreekuur". Neither reveals the other's key.

## Observations left unchanged

These predate the batch and are outside the spec. Each would need a new prompt clip to fix.

- **bloedonderzoek.** The q1 prompt "Wanneer belt de dokter meneer De Vries?" presupposes the call, which is what the q2 key "Wachten tot de dokter belt." says. This only helps a learner who missed "Ze belt u daarvoor op". Candidate for a later sweep.
- **paspoort-klaar.** Read literally, the q3 premise "Modibo haalt het paspoort pas na vier maanden op" says he collects it, and the new A "Hij kan het paspoort nog gewoon ophalen." sounds like it. The persona-scenario reading ("goes to collect it only after four months") is the natural one, and the evidence decides clearly. Optional later wording: "Modibo gaat pas na vier maanden naar het stadhuis."

## Diversity and set assembly

- **spoor and trein.** Both items are station announcements with a broken train on another platform, a platform to go to and a lift or stairs. They predate this batch and sit in different drill sets (a2-listening-08 and a2-listening-02). A mock form should hold only one of them.
- **Drill-set keys after adoption.** I recomputed these from `content/practice-sets.json`, and they match the author's table.
  - a2-listening-01: A3 B2 C3
  - a2-listening-02: A2 B2 C2
  - a2-listening-03: A5 B4 C3
  - a2-listening-04: A1 B4 C3 D1
  - a2-listening-05: A2 B1 C3 D1
  - a2-listening-06: unchanged (A5 B5 C4 D1)
  - a2-listening-07: A4 B4 C4 D2
  - a2-listening-08: A3 B3 C4 D1
- **a2-listening-03.** A is 5 of 12 keys (42%). Drill sets are not mock forms, so this is not a blueprint failure. A later sweep can rebalance the set's other items.
- **Topics.** Settings, purposes, task types and domains are unchanged from the published items. The two new nouns, "taxi's" and "parkeerterrein", are generic, and the batch adds no organisation or person names.

## Media notes

- **New audio needed: six clips**, 1,279 characters in total. Generate them only after adoption, and pass each through the Scribe round trip.
  - `A2:listening:batch023-spoor:1#fragment`: script sentences 2 and 4 changed (narrator, single voice).
  - `A2:listening:batch023-spoor:1#q1`: prompt changed.
  - `A2:listening:batch023-spoor:1#q2`: prompt changed.
  - `A2:listening:batch023-spoor:1#q3`: prompt changed (Sem → Farah).
  - `A2:listening:batch005-voetbal:1#q2`: prompt changed.
  - `A2:listening:batch001-markt:1#fragment`: script changed (narrator, single voice).
- **No synthesis for every other clip.** Every other fragment and question clip of the twelve items still matches its manifest hash, and the files exist. A2 listening question audio reads only the prompt, and none of these prompts changed.
- **Question clips that integration drops.** Integration (`scripts/content.ts`) keeps `questionAudio` only when both the prompt and the options JSON are unchanged. Ten questions changed options but kept their prompt: bloedonderzoek q2, paspoort-klaar q1 and q3, markt q1 and q2, speelplaats q2, buurthuis q2, schoolreis q1, trein q2 and tabletten q1. They lose the field at integration. `npm run audio:generate -- --apply` re-attaches the existing files from the manifest without new synthesis.
- **Revisions.** `questions` is part of the revision core, so all twelve items get new revisions. Saved answers to the old versions are not reused.
- **Pictures and voices.** No image brief changed, so the five drawings stay: bloedonderzoek, speelplaats, bezorgservice, buurthuis and tabletten. Voice roles are unchanged. The two new fragments use the narrator alone, so no voice pairing is affected.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- The spoor and markt scripts and four question prompts changed. Their audio does not exist yet and still needs generation and a transcription round trip (Scribe, CER ≤ 4%). The published items stay blocked on that media review. I did not listen to any audio.
- `content/exemplars/` does not exist, so the level verdicts are not calibrated against two exemplars per task type.
- The station, the market and gemeente Rietburg are fictional. The only fact checked on the web was the passport collection window.
- I did not run browser, integration or app checks.
