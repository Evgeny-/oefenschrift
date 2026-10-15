# Batch 057 review (B1 listening, authorised replacement)

**Verdict: pass.** All 7 texts (45 questions) pass: 5 unchanged from the author's file, 2 with a reviewer edit to one explanation each, none rejected. `content/batches/057-proposed.json` has SHA-256 `47fa99c3951839e9f55cc1f1ab1ab6d822cc9e76c91e986d53d2f244b9d54ea1`.

Reviewer: an independent AI reviewer (Claude Opus 5.5) working in a separate context. I did not write this batch. Reviewed on 14 October 2026 against `docs/briefs/review.md`, `content/reviews/rubric.md`, blueprint §4.7, `tmp/content-fix-2026-10-14/spec/common.md`, `review-common.md` and the 057 section of `056-057.md`.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:listening:batch036-afvalbeleid:1 | pass | comparable | All 11 labels now read "Medewerker", matching the intro and the q4 prompt. Spoken words and role are unchanged, and the question texts and item text are rebuilt exactly. Keys C/B/A/B/C/B proven. |
| B1:listening:batch037-hovenier:1 | pass | comparable (upper range) | q7 now says "veertig jaar", in line with q1 and q2. The explanation follows the script. Keys B/A/C/B/C/A/B proven. |
| B1:listening:batch013-ziekenhuiskeuken:1 | pass (edited) | comparable | The q6 prompt now asks about this fragment, and key A is entailed by fragment 6 with the intro in view. I rewrote the explanation to argue from fragment 6. Keys B/A/C/B/C/A proven. |
| B1:listening:batch012-mantelzorg:1 | pass | comparable | The q6 explanation now rejects distractor A with his own words from fragment 6. Keys A/C/B/C/A/C proven. |
| B1:listening:batch002-lekkage:1 | pass | comparable | The q3 evidence is one sentence inside one turn, and it entails C. Keys B/A/C/A/B/C proven. |
| B1:listening:batch013-logistiek:1 | pass (edited) | comparable | q6 option A now says "uiterlijk", as the script does. I added the deadline to the explanation because the single-turn evidence cannot carry it. Keys A/B/C/B/C/A/B proven. |
| B1:listening:batch036-functioneringsgesprek:1 | pass | comparable (upper range) | The q3 prompt now says "de pallet met beschadigde dozen", as the script does. Keys B/A/C/A/B/C/A proven. |

## Edits made in the proposed file

1. **ziekenhuiskeuken q6 `explanation`** →
   - New text: "Roos vergelijkt de regels in de ziekenhuiskeuken met het restaurant waar ze werkte: daar was het minder streng. Ze heeft dus wel keukenervaring, maar in het ziekenhuis zijn de regels strenger, omdat de patiënten op de keuken vertrouwen. De regels waren in het restaurant juist anders, en ze leert niet alles van Fatima: wat ze niet zeker weet, mag ze ook aan Hasan vragen."
   - Why: the prompt now asks what this fragment shows. The old explanation had three problems:
     - It stated the inference as something heard ("restaurantkeuken").
     - It relied on fragment 1 ("alleen nog niet in een ziekenhuis").
     - It never answered the Fatima half of distractor B, which fragment 6 introduces.
2. **logistiek q6 `explanation`** →
   - New text: "Mevrouw Jansen zegt dat Karim zich alvast moet aanmelden, omdat de aanmelding niets kost en de betaling pas na de intake wordt geregeld. Aanmelden kan via de website, uiterlijk vijftien december. Wachten tot januari is juist het probleem: dan is hij te laat voor februari en kan hij pas in september beginnen."
   - Why: the key's deadline was in neither the evidence nor the explanation. The explanation now also says why September (option C) is the result of waiting, not her advice.

Neither edit has an audio effect. Nothing was rejected.

## Decisions on the doubts

1. **ziekenhuiskeuken q6: keep key A and the options; reject the literal alternative.**
   - "Het ziekenhuis is strenger" is literal in "In het restaurant waar ik werkte, was het minder streng, maar ik snap wel waarom het hier zo is."
   - "Kent keukenwerk" is one inference step inside fragment 6. Roos compares Hasan's rules with those of the restaurant where she worked. The intro calls them the kitchen rules, and `Session.tsx` keeps the intro in view with every fragment.
   - Fragment 1 is not needed for the key.
   - Even a learner who refuses the inference step finds one best answer:
     - B fails on "en anders aan mij".
     - C fails on "minder streng".
   - The literal wording would make q6 a near-verbatim detail item. It would also move the same inference into B, whose remaining falsifier would be the single word "alles".
2. **logistiek q6: keep the evidence; add the deadline to the explanation.**
   - The validator requires one evidence string from the question's own fragment, and the quote must not cross Karim's turn.
   - The quote entails what the prompt asks: register now, despite the open payment question.
   - The date comes from the same speaker in the same fragment ("Je meldt je aan via onze website, uiterlijk vijftien december."). I recorded it in the JSON as a supporting quote.
3. **functioneringsgesprek q3: accept.** "beschadigde dozen" now appears in the prompt and in distractor A only. This gives no signal toward the key, and A stays clearly false ("Slim opgelost, daar gaat het niet om").
4. **afvalbeleid: keep "Medewerker".** It matches the intro and the q4 prompt, it is the label lekkage already uses, and it keeps all audio.
5. **mantelzorg q6: pass as written.** Answering with a colon and no quotation marks matches the catalogue, which has no explanations with quotation marks. "Wacht niet tot u het niet meer volhoudt" is verbatim from fragment 6.

The protected wordings are untouched: "hun" (hovenier q2), "W-M-O" and "m-b-o". The word "van binnen" (bouwplaats) is not in this batch.

## What was checked

- **Diff against the base.** I deep-diffed every item against `057-base.json`. The author's changes are exactly the spec fixes plus the rebuilt derived text, and the order of items, questions, options and keys is unchanged. The base has no retired or media fields.
- **Derived text.** Every question `text` equals its script joined as "Speaker: text" lines. The item `text` equals the fragments joined by a blank line. I checked both by script, including the afvalbeleid labels.
- **Keys and distractors.** I read all 45 questions in full with their fragments. Every key is proven from a verbatim quote inside one turn of its own fragment. All 90 distractors were tested as competing answers; the audit is in the JSON.
- **Key signals.** No key is clearly the longest option, and no prompt word recurs only in a key.
- **Whole-text prompts.** Four prompts name the whole text: functioneringsgesprek q7, mantelzorg q6, logistiek q7 and afvalbeleid q6. Each is answerable from its own fragment.
- **Shape and level heuristics.**
  - Fragments have 109–158 spoken words, and each text runs about 5.1–5.7 minutes.
  - Intros have 27–47 words.
  - Sentence means run 9.2–13.9 words, with the longest at 29.
  - Numbers are written in words, and the sums are correct.
  - Keys are A 14, B 16 and C 15.
- **Checker.** `npx tsx scripts/batch-check.ts content/batches/057-proposed.json` reports no failures and no warnings. Its info line says the items are already in the catalogue.
- **Facts.** These are unchanged mantelzorg facts, not KNM. rijksoverheid.nl "Verpleging en verzorging thuis" (accessed 14 October 2026) confirms the claims about the basispakket, eigen risico, referral and the wijkverpleegkundige.

## Diversity and set notes

This is a replacement batch. Settings, task types, text types, domains and set membership are unchanged, and no new topic is introduced.

## Media notes

**New audio needed (3 clips, 702 characters):**

| Clip | Change |
| --- | --- |
| `B1:listening:batch037-hovenier:1#q7-fragment` | Spoken text changed. Presenter and f-older, stitched. |
| `B1:listening:batch013-ziekenhuiskeuken:1#q6` | New question prompt. |
| `B1:listening:batch036-functioneringsgesprek:1#q3` | New question prompt. |

**Re-attach without synthesis (7 clips):**

- `B1:listening:batch036-afvalbeleid:1#q1-fragment` to `#q6-fragment`
- `B1:listening:batch013-logistiek:1#q6`

`content:integrate` drops these clips because it compares the full script JSON (labels included) and the options. `audio.ts`, however, hashes spoken text and voices only, so `audio:generate -- --apply` re-attaches the manifest files. The manifest hashes match and the files exist.

**Unchanged:** all intros and every other clip. The voice pairs are unchanged.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- The three changed clips still need generation and a Scribe transcription round trip before these items pass media review.
- No audio was heard.
- There is no `content/exemplars` directory. Level verdicts compare the scripts with the official B1 Luisteren I description and the earlier reviews of these texts.
- Clip reuse was checked against the manifest hashes and the files on disk, not against recomputed voice tokens.
- Respijtzorg funding was confirmed from secondary sources only.
