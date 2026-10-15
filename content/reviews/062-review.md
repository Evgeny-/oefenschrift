# Batch 062 independent review

The single item passes as the author wrote it. I made no edits and rejected nothing. This is an authorised replacement batch for one existing ID; the ID, field order and set membership (`b1-speaking-03`) are kept.

- `content/batches/062-proposed.json` is a byte-identical copy of the author's file. SHA-256: `868e159d174366ab33d55ed714a0ec5183f15de2730293973c5ef07ec12d42e2`.
- No starter changed, so there is no proposed starters file. The starters source is `content/batches/062-starters.json`, SHA-256 `6829677bbc41e9af0107cf5bfbea115d55d5b5e5e6c5b4dff2839d64e9fe6704`. Its four fragments equal the current entry in `content/hints/sentence-starters.json`.

`npx tsx scripts/batch-check.ts content/batches/062-proposed.json` reports no failures and no warnings. It prints the expected info line that the item is already in the catalogue.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:speaking:batch017-machinestoring:1 | pass | comparable | "Geef ook een waarschuwing." now announces C3. A learner who does exactly what the prompt says meets all four criteria in about 15–20 s of the 30. |

## What changed

I diffed the item field by field against `tmp/content-fix-2026-10-15/062-base.json`. The only changed leaf is `prompt`, which gains the final sentence "Geef ook een waarschuwing." (52 → 56 words). Key order, criteria, sample, quotes, model, image briefs and alts are byte-identical. No `revision`, `promptAudio`, `images[].file` or other generated field is present, and there is no `type` field.

The base equals the published catalogue record with `promptAudio`, `revision` and `images[].file` removed.

## Does a learner who follows the prompt meet every criterion?

Yes. This is a middellang task without a cue, so the criteria are visible before answering (`OpenExercise.tsx` hides them only for picture notes, zinstaken, cued tasks and picture deelschrijftaken). The narrated prompt now names every graded point as well:

- **C0 (stop the machine):** "wat hij eerst moet doen". Picture 1 shows the man pressing the round red button.
- **C1 (whom to call):** "wie hij daarna moet bellen". Picture 2 shows a technician with a toolbox in the speech bubble.
- **C2 (steps in order, as instructions):** "Leg hem stap voor stap uit wat hij … moet doen", with "eerst … daarna".
- **C3 (a reason or a warning):** "Geef ook een waarschuwing." The prompt asks for the narrower half of the criterion, so meeting the prompt meets C3. This is the same wording and the same relation as the reviewed `B1:speaking:batch031-brandalarm:1`.

**Time.** A minimal answer that meets all four criteria has 27 words: "Eerst druk je op de rode knop, dan stopt de machine. Daarna bel je de monteur. Maak de machine niet zelf open, want dat is gevaarlijk." At 1.5–2 words per second that takes about 14–18 s of the 30.

**Narration.** The new sentence has four words, no digits and no abbreviation. It follows the instruction sentence the way the brandalarm prompt does and reads as natural spoken B1 Dutch. The prompt has six sentences of 4–17 words. At 56 words it is three words longer than brandalarm (53) and within the range of the published B1 middellang prompts (32–70 words). It is not overlong for 15 seconds of preparation, since the narration plays before the preparation starts.

## Full rubric pass on the final item

- **Criteria.** All four are concrete and accept natural wording. C2 is an instruction-form requirement that the prompt's "Leg hem … uit wat hij moet doen" produces; it is not a compound trap. C3 is lenient: any reason also counts. It matches brandalarm.
- **Sample.** 44 words. It has exactly one null quote, at C1: "meteen bellen" and "tot er iemand komt" name no callee.
  - quotes[0] is verbatim and meets C0 ("eerst op rode knop drukken").
  - quotes[2] is verbatim and meets C2, an ordered instruction ("Daarna … moet je … bellen").
  - quotes[3] is verbatim and meets C3, a warning with a reason.
  - The two deliberate learner errors stay: the missing article in "op rode knop" and no inversion in "Daarna je moet".
- **Model.** 68 words, within 40–70, in six sentences of 9–17 words (mean 11.3), with *als*, *zodat*, *want* and *tot*. Each criterion is met:
  - "moet je hem eerst stopzetten. Druk op de grote rode knop" meets C0.
  - "Daarna bel je de technische dienst … tot de monteur er is" meets C1.
  - The imperatives and *je*-instructions in order meet C2.
  - "Probeer de machine nooit zelf te repareren, want dat is gevaarlijk." meets C3.
  - No prompt sentence is reused.
- **Pictures.** I converted and viewed the published panels, `public/images/9a4223167db7585a.webp` and `2a1fc29ab5c48175.webp`. Panel 1 shows the red button pressed and the box crooked in the opening. Panel 2 shows the phone call beside the stopped machine and the technician with a toolbox in the bubble.
  - Hasan's fixed traits (grey moustache, brown cap) match across the panels. His clothes differ (dark overall vs. mustard top with dungarees). That is a minor drift that does not affect the task, and the briefs are unchanged.
  - Both alts describe the drawings accurately. The judge sees the alts, not the briefs. "Tekstwolk" is less common than "tekstballon" but understandable, so it is not a defect worth an edit.
- **Starters.** Four partial fragments, each with "…", one per criterion:
  - "Als de machine kapotgaat, moet je eerst …" → C0
  - "Daarna bel je …" → C1
  - "Het is belangrijk dat je eerst … en pas daarna …" → C2
  - "Doe dat niet zelf, want …" → C3

  None gives a complete answer or invents a fact. The prompt change needs no starter change.
- **Contract.** `exam: nt2-i`, `taskType: middellang`, `domain: werk`, `rubric: b1-spreken`, `prepSeconds: 15` and `speakingSeconds: 30` match blueprint §4.9 ("instruct step by step", two pictures). `status` is `ai-editorially-reviewed` and `targetLevelValidated` is false. No official-score claim is made. There are no names of real businesses ("de technische dienst" is generic) and nothing on the §9 avoid list (the warning is mild).

## Edits

None.

## Rejected

None.

## Diversity and set assembly

The task concept is close to brandalarm. Both have a colleague at work asking what to do in an emergency, a step-by-step instruction from pictures, and a warning. They differ in setting (factory machine vs. office evacuation), stimulus (a picture pair vs. a floor plan) and content (stop and call vs. route and assembly point). They sit in different sets (`b1-speaking-03` vs. `b1-speaking-10`), so a learner does not meet them back to back in one drill. A mock form should not hold both. Membership is unchanged.

## Media notes

- **Needs new audio:** `B1:speaking:batch017-machinestoring:1#prompt` (narrator), because the prompt text changed. Generate it from the adopted prompt with the transcription round trip. The item has no cue clip.
- **No new pictures:** the briefs are unchanged, so both images stay.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- The prompt changed. New prompt audio still needs generation from the adopted text, with a transcription round trip; none was generated in this review.
- No feedback calls were made, so judge behaviour on the changed prompt was not measured.
- `content/exemplars/` does not exist. The level comparison uses brandalarm and the other middellang instruction items in the bank, so it does not calibrate difficulty.
- Timing assumes 1.5–2 words per second for a B1 speaker; it was not measured.
