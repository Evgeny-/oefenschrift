# Batch 059 review (A2 Spreken, 22 replacement tasks)

**Verdict:** pass. 22 items: 17 pass, 5 pass after small edits, 0 rejected. I made seven edits, all in `sample` or `quotes`, so none of them changes audio, pictures, criteria or starters. The author's starters pass unchanged, so there is no proposed starters file.

- Proposed source: `content/batches/059-proposed.json`, SHA-256 `f0b28b476b9c4cebd26f77a9dff63ff8b720a2df26719e1514266632a15d5d9f`
- Starters: `content/batches/059-starters.json` (the author's file), SHA-256 `dd73079676c79f6f0107c89de285803b1e89a325dcc637e49f731f7d86927dbc`
- Reviewed on 14 October 2026 by an independent AI reviewer (Claude Opus 5.5), in a context separate from the author's. This is AI editorial review. It does not validate CEFR difficulty or equivalence with the official exam.

## What I checked

- **Diff against the base.** I compared every leaf of every item with `tmp/content-fix-2026-10-14/base/059-base.json`.
  - The author changed 62 leaves, all of them spec fixes 1–7 or their direct consequences: 13 prompts, 12 × C2 (nl and en), and the samples, quotes and models listed in the notes.
  - Item order and key order are unchanged. Cues, image briefs and image alts are byte-identical.
  - No `revision`, audio or `images[].file` fields; status is `draft` and `targetLevelValidated` is `false`.
  - The base equals `content/catalogue.json` apart from status, revision and media. The starters base equals `content/hints/sentence-starters.json`.
- **Starters.** Four fragments changed, all because a criterion or a name changed: ochtenddienst C2, woorden-leren C2, taalcafe-oefenen C2 and keuken C1. Every fragment is partial, contains "…", follows its criterion in order, and gives neither an answer nor an invented fact.
- **Checker.** `npx tsx scripts/batch-check.ts content/batches/059-proposed.json`: "Checked 22 items, 0 questions", 22 of 22 already in the catalogue, "No failures, no warnings."
- **Samples, quotes and models.**
  - Every sample has exactly one `null` quote. Every other quote is verbatim and meets its own criterion.
  - I read every sample in full for any sentence that could meet the null criterion by implication (the judge reads the whole answer).
  - Models are 27–44 words and no sentence is longer than 14 words. Every model meets every criterion. No sample or model copies a prompt sentence.
  - Prompts and cues contain no digits or abbreviations.
- **What learners see.** `app/components/OpenExercise.tsx` (lines 290–310) hides criteria and starters until review for cued tasks. Picture tasks without a cue show both. For the 12 fix-1 items, the prompt is the only place where the third requirement appears before review.
- **Pictures.** I looked at all 18 drawings of the nine picture tasks and at the monteur, bushalte and woorden-leren stills. Notable details:
  - kleermaker: picture 2 shows a kneeling tailor pinning the hem. Picture 3 shows a paper bag handed over at the counter and no payment.
  - flat-dorp: picture 2 shows a bicycle at the fence.
  - keuken: a boy cuts vegetables and a girl puts plates on the table.
  - monteur: Sabrina sits at a desk holding a telephone receiver.
- **Judge evidence.** I did not call the judge. The audit ran the judge twice on the base samples: `tmp/feedback-audit-2026-10-14/pic-new.log` without picture descriptions and `pic-new-f.log` with them, both with the old criteria.
  - Without picture descriptions, bakkerij's "Ik vind brood bakken ook leuke werk." was credited as the null criterion. The judge's comment was "You also mention the other picture…".
  - feest-thuis's "meer leuk" was credited as a reason (fix 5).
  - With picture descriptions, bus-fiets's "ik moet niet betalen" was credited as "something about the bus" (fix 6).
  - fiets-lopen's "sneller" was not credited in either run.
- **Not applicable.** There are no KNM facts and no closed questions. The batch invents no organisation or business names, so no web check was needed.

## Verdicts

| ID (`A2:speaking:…:1`) | Verdict | Level | Reason |
| --- | --- | --- | --- |
| batch009-ochtenddienst | pass | comparable | "Zeg ook hoe laat u wilt beginnen." is natural and makes sense before the cue. The sample misses only the start time ("in de avond" is not a clock time). The model has "Ik begin graag om zeven uur." (33 words). |
| batch009-thuis-oefenen | pass | comparable | "Zeg ook waarom thuis oefenen u helpt." is grammatical and clear when heard. The quote "Zo leer ik nieuwe woorden." meets C2, and the sample misses only how often. The model is 36 words. |
| batch009-nieuwe-buurvrouw | pass (edited) | comparable | "Zeg ook wat er dichtbij is." is natural advice for a new neighbour. I narrowed the C2 quote to "er is een park dichtbij." The model is 33 words. |
| batch009-slaap | pass | comparable | "Vertel ook hoe u slaapt." fits a GP's question. The added "Ik slaap niet goed." meets C2, and the sample misses only the time of getting up. The model has "Ik word 's nachts ook vaak wakker." |
| batch009-abonnement | pass (edited) | comparable | "Zeg ook waarvoor u uw telefoon gebruikt." is natural. I narrowed the C2 quote to "Ik bel vooral en ik stuur berichten." The sample makes no choice. The model is 34 words. |
| batch009-bushalte | pass | comparable | "Zeg ook waar hij moet wachten." becomes concrete once the man asks about the bus. "hier" and "aan de overkant" both meet C2, and "de man" in C2 reads on its own at review. The model is 27 words. |
| batch026-lunchpauze | pass | comparable | "Zeg ook met wie u eet." is natural. "Ik neem mijn eten mee van thuis" says where the food comes from, not where the learner eats, so C1 stays unmet. The model is 39 words. |
| batch026-woorden-leren | pass | comparable | At 9 words this is the longest new sentence, but it is plain A2 and becomes concrete when Modibo asks. The sample's "want dan vergeet ik ze niet" meets C2. In the model, "Zo onthoud ik het beter." is a natural answer to "why does it work". The model is 43 words. |
| batch026-huisarts-afspraak | pass | comparable | Asking for "dag" keeps C2 apart from C0 (morning or afternoon). The quote "Kan ik donderdag komen? Dan ik ben vrij." stays whole: its second sentence only supports the day. The model is 39 words. |
| batch027-ziekmelden | pass | comparable | "wanneer" accepts "voor acht uur" and "'s ochtends". Any other reading of the prompt is judged against the same words, so a learner who follows the prompt cannot fail it. The model is 40 words. |
| batch027-taalcafe-oefenen | pass | comparable | "Zeg ook waarom u wilt oefenen." makes sense before the cue and accepts any reason. The sample and the model both give one ("ik praat niet goed", "praten vind ik moeilijk"). The model is 39 words. |
| batch027-cursuskeuze | pass | comparable | "Zeg ook op welke avonden u kunt komen." is natural, and naming a single evening also meets it. The sample misses only the reason. The model is 40 words. |
| batch003-monteur | pass | comparable | The prompt now says that the learner phones the company, which matches the still. The longest prompt in the A2 video-answer set (see below). The model is 30 words. |
| batch009-kleermaker | pass | comparable | The sample, quotes and model now describe the drawn actions: the mirror, the pinning and collecting at the counter. Nobody pays. "spelden" is supported by the picture and by the alt ("speldt … op"). The model is 43 words. |
| batch009-flat-dorp | pass | comparable | Clear choice that names the picture. The village sentences only describe what is drawn, so the reason is unambiguously missing. The sample has the de/het error "bij de hek". |
| batch026-online-winkel | pass | comparable | Clear choice ("plaatje één, online"). The reason sentence is unchanged. Nothing mentions the shop. |
| batch027-contant-pinnen | pass | comparable | Clear choice. "Ik betaal liever contant" is a preference, not a reason. The picture-2 sentence matches the drawing and keeps both old error types. |
| batch026-fiets-lopen | pass (edited) | comparable | The model says "een man", not "Julio". I changed the sample's "sneller" to "snel" (see Edits). |
| batch027-bakkerij | pass (edited) | comparable | The model says "een man", not "Julio". I removed the sample sentence that the judge credited as the null criterion (see Edits). |
| batch027-keuken | pass | comparable | "haar zoon" and "haar dochter" can be seen in the picture and follow from "haar kinderen" in the prompt. The starter changed in step. The model is 42 words. |
| batch027-bus-fiets | pass | comparable | "Fietsen is gezond en ik ben graag buiten." gives a reason without implying anything about the bus. |
| batch026-feest-thuis | pass (edited) | comparable | Fix 5 is applied. I removed "ook" (see Edits). |

No item is flagged as off-level.

## Edits

All seven edits are in `content/batches/059-proposed.json`.

1. **batch009-nieuwe-buurvrouw `quotes[2]`.**
   - Before: "De buren zijn vriendelijk en er is een park dichtbij."
   - After: "er is een park dichtbij."
   - Why: the new C2 asks what is nearby. "De buren zijn vriendelijk" is an opinion about the neighbourhood, which is C1 evidence, so the old quote blurred which words meet which criterion.
2. **batch009-abonnement `quotes[2]`.**
   - Before: "Ik bel vooral en ik stuur berichten. Thuis heb ik wifi."
   - After: "Ik bel vooral en ik stuur berichten."
   - Why: "Thuis heb ik wifi." is about internet use, which belongs to C1, not about what the phone is used for.
3. **batch026-fiets-lopen `sample` and `quotes[1]`.**
   - Before: "Met de fiets ik ben sneller op mijn werk."
   - After: "Met de fiets ik ben snel op mijn werk."
   - Why: the comparative implies something about walking while C2 (the other picture) is the null criterion. This is the pattern that fix 6 removed from bus-fiets, where the judge did take it as C2. The audit's two runs did not credit "sneller", so this edit is a precaution. The reason and the word-order error are kept.
4. **batch027-bakkerij `sample`.**
   - Removed: " Ik vind brood bakken ook leuke werk."
   - New sample: "Ik kies plaatje één. Ik werk liever vroeg in de ochtend, want dan ik ben 's middags vrij."
   - Why: in the audit run without picture descriptions, the judge credited this sentence as the null C2 ("You also mention the other picture…"). Both pictures show bread baking, so the sentence can be read as covering the other picture. This is the same kind of leak that fix 5 removed from feest-thuis.
   - The quotes are unchanged and still verbatim. The sample keeps one typical error, "dan ik ben".
5. **batch026-feest-thuis `sample` and `quotes[2]`.**
   - Before: "Thuis, op het eerste plaatje, ze zitten ook gezellig aan tafel."
   - After: "Thuis, op het eerste plaatje, ze zitten gezellig aan tafel."
   - Why: fix 5 removed "Ik vind een restaurant meer leuk.", so "ook" now refers only back to the chosen restaurant. The sentence therefore implies that the restaurant is gezellig too, the only merit the sample gives the choice, while the reason (C1) is the null criterion.
   - The sentence stays a remark about the other picture and keeps the word-order error.

## Rejected

None.

## Decisions on the author's doubts and the coordinator's points

1. **flat-dorp sample:** I accept the author's version instead of the spec's example. In "…, maar je hebt een auto nodig", a drawback of the village can be read as the reason for choosing the flat. That is the same cross-criterion content that fixes 5 and 6 remove. The descriptive sentences match the drawing, including the bicycle at the fence.
2. **Which criterion each fix-4 sample misses:** accepted. flat-dorp and contant-pinnen miss the reason; online-winkel misses the other picture. Mixing the gaps keeps the prepared feedback varied.
3. **woorden-leren extra detail:** accepted.
   - "Waarom uw manier van leren goed werkt" follows naturally from "Hoe onthoud jij nieuwe woorden?". It needs no antecedent before the cue.
   - The existing sample keeps a single gap. "Zeg ook wat het woord betekent" would have made the sample miss two criteria.
   - The model's "Zo onthoud ik het beter." is enough. A longer reason would push the model past 45 words.
4. **taalcafe-oefenen broad wording:** accepted. "Waarom u wilt oefenen" makes sense before the cue, while "dat" would have had no antecedent. It accepts any reason, and both the sample and the model meet it.
5. **ziekmelden "wanneer":** accepted.
   - In the context of a colleague asking how to call in sick, "wanneer" reads as timing. It accepts "'s ochtends", "voor acht uur" and "voor je dienst".
   - A conditional answer ("als je ziek bent") would also be judged against the same words, so the breadth only makes the item lenient, never unfair.
6. **bushalte C2 "de man":** accepted. The criterion has to read on its own at review time.
7. **The three wider quotes:**
   - nieuwe-buurvrouw and abonnement: narrowed (Edits 1 and 2), because the extra words were evidence for C1.
   - huisarts-afspraak: kept. "Dan ik ben vrij" only supports the chosen day, and no other criterion depends on it.
   - By the same rule I left lunchpauze ("…en we praten over de weekend") and ziekmelden ("…anders het is te laat") unchanged.
8. **kleermaker "spelden":** accepted. It is one less common word in 43, and both the picture and the alt support it. "Zij maakt de broek korter" would describe a result that picture 2 does not yet show.
9. **fiets-lopen "sneller" and feest-thuis "ook gezellig":** both fixed (Edits 3 and 5). I also fixed bakkerij (Edit 4), which neither the spec nor the notes mentioned, because the audit shows the judge crediting its null criterion.
10. **monteur prompt length:** accepted without cutting. The details:
    - The prompt has 48 words in nine sentences of at most eight words. The next longest A2 video-answer prompts are buurvrouw (40) and te-laat (36). The published version had 42.
    - Each sentence carries something the answer needs: the window, the current time, the call and who answers. The prompt text stays printed during the answer.
    - Dropping "Medewerker" would save one word but leave the spec's wording for no real gain. "neemt op" is common phone vocabulary, and the still shows Sabrina holding a phone receiver.
11. **Judge does not receive the cue:** left to the coordinator, as instructed. The uncommitted `server/services.ts` in the working tree already adds `spoken_cue` and `pictures`. I reviewed the content on its own, and the edited samples no longer depend on the picture descriptions.

## Prompt naturalness (read aloud)

- The 12 new sentences are imperatives of 5–9 words with one embedded question word: hoe laat, waarom, wat, hoe, waarvoor, waar, met wie, op welke dag, wanneer, op welke avonden. All use common A2 words.
- Each one makes sense when the narrator reads it before the cue, and each matches its criterion word for word, minus "ook".
- A learner who answers both parts of the spoken question and then does what the last prompt sentence says meets all three criteria in every item.
- The cues are unchanged and natural.

## Diversity and set assembly

- All 22 IDs keep their topics and set memberships (a2-speaking-03, -04, -05, -09, -11, -12, -14, -16, -17 and -18).
- Within each video-answer set the new extra details differ:
  - set 04: start time, why practising helps, where to wait;
  - set 05: how you sleep, what you use the phone for, what is nearby;
  - set 12: with whom, why the method works, which day.
- In set 16, cursuskeuze's new "op welke avonden" repeats the day question in taalcafe-oefenen's cue, next to ziekmelden's timing. The base example ("bijvoorbeeld wanneer u kunt") already pointed there, and the main tasks differ, so I accept it. A mock form should still not pair cursuskeuze and taalcafe-oefenen.

## Media

- **New prompt audio (narrator `promptAudio`), 13 clips.** These prompts changed:
  1. batch009-ochtenddienst
  2. batch009-thuis-oefenen
  3. batch009-nieuwe-buurvrouw
  4. batch009-slaap
  5. batch009-abonnement
  6. batch009-bushalte
  7. batch026-lunchpauze
  8. batch026-woorden-leren
  9. batch026-huisarts-afspraak
  10. batch027-ziekmelden
  11. batch027-taalcafe-oefenen
  12. batch027-cursuskeuze
  13. batch003-monteur

  Each needs generation and a transcription round trip after adoption.
- **Unchanged media.** All 13 `cueAudio` clips stay, because the cue texts are unchanged. The nine picture tasks keep their prompt audio. No picture is redrawn, because briefs and alts are unchanged. My edits touch only samples and quotes, which are never voiced.
- **Revisions.** Every item changes a revision-core field (prompt, criteria, sample, quotes or model), so all 22 get new revisions and saved answers to them start fresh.

## Coordinator

1. Adopt with `npm run batch:adopt 059`. The review records the proposed hash `f0b28b47…5d9f` and the author's starters hash `dd730796…7dbc`.
2. Generate the 13 prompt clips. Then run `npm run content:integrate -- --refresh-hints "<reason>"`, because four starters changed.
3. The pictures and `spoken_cue` payload in `server/services.ts` is still uncommitted. It ships separately from this content.
4. If you run a bounded judge check, rerun these:
   - the eight changed picture-task samples: kleermaker, flat-dorp, online-winkel, contant-pinnen, fiets-lopen, bakkerij, bus-fiets and feest-thuis;
   - the 12 fix-1 models against their new C2. woorden-leren's "Zo onthoud ik het beter." is the one to watch.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- The 13 changed prompts still need new audio, generated from the reviewed text and checked with a transcription round trip. Until then, the published clips read the old prompts.
- I did not call the feedback judge. The judge evidence above comes from the audit's two runs on the base samples with the old criteria. The new criteria and the edited samples have not been run.
- `content/exemplars/` does not exist. I compared level against the official instruction patterns in blueprint §4.3 and `docs/research/exam-blueprints-2026-09-10.md` and against the catalogue's buurvrouw and te-laat items.
