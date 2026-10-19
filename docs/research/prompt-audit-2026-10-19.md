# Prompt audit after learner report 6 (19 October 2026)

## The report

On 19 October 2026 a learner filed report 6 against `A2:speaking:batch001-apotheek:1`:

> "In de opdracht staat al waar Roos is. De vraag over hulp bij de apotheek is onduidelijk."

The prompt read "Roos is bij de apotheek. Vertel waar Roos is. … Vertel ook wat u van hulp bij de apotheek vindt." It had two defects:

- The situation line gave away the answer to the first criterion.
- The opinion question was about an abstract noun ("hulp"), so it had no clear answer.

The project owner asked for the item to be fixed and for every similar exercise to be checked.

## Audit

Three independent agents read every published speaking and writing item: 59 A2 speaking, 39 B1 speaking and 66 writing. Each looked for:

- a prompt, visible criterion, starter or title that already contains what a criterion scores;
- meaningless or unanswerable questions;
- clumsy Dutch;
- prompts the picture or table cannot support;
- spoken cues made pointless by a printed prompt.

The reports are kept in `tmp/content-fix-2026-10-19/audit/`, which is gitignored. The A2 speaking audit found 9 items, the B1 speaking audit 8 and the writing audit 13, plus low-priority notes.

Calibration for writing follows the official booklets. Passing on a fact the recipient needs, such as the hours on a payslip, is the official form and stays. Copyable reasons, pointless form questions and stiff wording were fixed. Where a reason was removed, the criterion now says "Bedenk zelf …", as the official e-mails do.

## Replacement batches

Each batch had a separate author and an independent reviewer, and passed the hash gate and `content:integrate`.

| Batch | Part | Items | Main changes |
| --- | --- | --- | --- |
| 063 | A2 speaking | 16 | Apotheek (neutral situation "Roos heeft medicijnen nodig.", concrete opinion question, neutral title, alt naming the setting for the judge); four other giveaways (jas, speeltuin, monteur, partly keuken/regen); printed copies of cue questions removed (buurvrouw, te-laat); "andere" ambiguity (koelkast); four titles that printed the cue question; burenpakket, verjaardag and tramkaart wording |
| 064 | A2 writing | 10 | Lantaarnpaal form no longer answered by the prompt; bibliotheekpas asks a real question (the price of a new card); six e-mails no longer hand over the reason/day/place; sleutel and loonstrook wording |
| 065 | B1 writing | 3 | Kledingkast contradiction, groepsresultaten 40-word sentence, avondcursus label |
| 066 | B1 speaking | 15 | Slaapkamerraam and portemonnee-tram giveaways (including visible criteria and titles), teamtaak/werkdruk/cursusgemist role-play facts, inwerken and cursuslocatie wording, semicolon prompts split, small fixes from the low-priority notes |

`A2:writing:batch008-meerijden:1` was deliberately left alone. Its reason is a fact the colleague needs, and its criterion was tuned with a judge evaluation after learner report 5.

## Media

Twenty-three prompt clips changed: 11 A2 and 12 B1. All were regenerated with the narrator voice and passed the Scribe round trip with a character error rate of 0. The 23 superseded clips were removed. No cue text and no image brief changed.

## Feedback check

Five synthetic cases were added to `scripts/evaluate-feedback.ts` and run once on 19 October 2026, with all five decisions as expected:

- The apotheek place is inferred from the picture alt: "bij de apotheek" passes, "bij de huisarts" fails.
- An opinion without the asked reason fails.
- The new bibliotheekpas price question passes, and a plain request for a card fails it.

This is a bounded smoke check, not a measurement of judge accuracy.

## App changes made the same day

- The spoken cue of a speaking task is now the main player ("Luister naar …", with progress and speed). The printed instruction has a small read-aloud button.
- Practice sets can be skipped and walked back. See `DESIGN.md`.

## Speaking criteria hidden until review

The audits found that picture and table speaking tasks without a cue showed their criteria before the learner answered, and some criteria named what the pictures should supply. Machinestoring, for example, showed "de machine stoppen" beside a picture of exactly that. The project owner approved a code-level fix the same day: every speaking task now shows only its instruction with its pictures, table or cue, and the criteria appear at review time beside the feedback, as the official exam has no checklist.

Two more reviewed batches made every instruction ask for what its criteria check. Each had a separate author and an independent reviewer, and each reviewer re-checked every task the author had marked "ok":

| Batch | Part | Changed | Main changes |
| --- | --- | --- | --- |
| 067 | A2 speaking | 38 of 44 | 12 picture-choose prompts now end with "Zeg ook iets over het andere plaatje."; 11 picture-describe prompts say "Vertel wat u ziet. Noem twee dingen die …" where the criteria demand a scene and at least two things; 15 sequence (and jas) starters no longer give away the picture's action, and keep only the order words |
| 068 | B1 speaking | 5 of 16 | Feeling criteria no longer tied to one moment (trein-gemist, portemonnee-tram); the werktelefoon prompt asks which plan suits your work; two starters that handed over the answer |

Twenty-four more prompt clips were regenerated, and all passed the round trip (CER at most 0.017). Two further judge cases (gymles: complete answer, one action only) behaved as expected.

The sentence starters stay available on request as an opt-in hint, and no longer name content the pictures supply.

## Left open

Other low-priority notes not taken:

- the placeholder e-mail addresses (`example.org`/`.invalid`) in older writing headers;
- fact transfer in a few A2 e-mails;
- form labels phrased as instructions.

These limits are AI editorial review only. They do not validate CEFR difficulty or establish exam equivalence.
