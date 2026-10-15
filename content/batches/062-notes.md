# Batch 062 — B1 speaking, one item (15 October 2026)

Replacement of `B1:speaking:batch017-machinestoring:1`. Base: the published record with media fields removed (`tmp/content-fix-2026-10-15/062-base.json`).

## Change

- `prompt`: appended "Geef ook een waarschuwing." The fourth criterion ("Geef een reden of een waarschuwing, bijvoorbeeld waarom hij de machine niet zelf mag repareren.") was graded but never asked for in the prompt (audit `docs/research/content-and-feedback-audit-2026-10-14.md`, section 6, "Left for later"). The wording matches the reviewed `B1:speaking:batch031-brandalarm:1` from batch 061, which announces the same criterion the same way.

Nothing else changed: criteria, sample, quotes, model, images (briefs and alts) and starters are identical to the base. The sample still misses only criterion 1 (whom to call); its warning sentence meets criterion 3, and the model's "Probeer de machine nooit zelf te repareren, want dat is gevaarlijk." meets it too. The starter "Doe dat niet zelf, want …" already supports the warning.

The criteria of this item are visible before answering (middellang without a cue), so learners could already see the requirement; the prompt is read aloud by the narrator, though, and should name everything that is graded.

## Media

The prompt changed, so its narrator clip (`#prompt`) needs new audio. No picture changes.

## Check

`npx tsx scripts/batch-check.ts content/batches/062-original.json`: no failures, no warnings. The prompt is 56 words, the same length as the brandalarm prompt.
