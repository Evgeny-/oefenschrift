# Design direction 03

Written 9 September 2026 as an independent alternative to [direction 02](design-direction-02.md), which is
being refined separately in `demo/`. Direction 01 was rejected as obviously AI-generated; direction 02 kept
the same underlying template, with system typefaces, rounded cards on a tinted background and a choice
between a green and a blue accent. This direction starts from the material instead of from a layout, so the
two can be compared side by side rather than merged.

The clickable result is [`design/oefenplek-prototype.html`](../design-archive/oefenplek-prototype.html), a single
self-contained file covering ten screens.

## The thesis

**Every answer is explained by pointing back at the text.** The passage never leaves the screen; the
feedback attaches to it. When a learner checks an answer, the sentence that proves the key is swept with a
highlighter in the passage beside them, and each of the three options gets one line saying why it does or
does not work.

That single promise decides everything else:

- the layout is a sheet of study material with the interface living in its margin;
- the identity is a highlighted word, so the wordmark states the promise;
- the marker sweep is the only decorative motion in the design, and it is functional.

## Working name

**Oefenplek** — a plain Dutch compound, "a place to practise", readable at A2, and a place rather than an
app. It is a placeholder. The domain has not been checked and alternatives (*Het Lokaal*, *Stap*, keeping
*Samen*) are equally open.

## Visual system

| Role | Value | Reasoning |
| --- | --- | --- |
| Ground | `#E6E9E8` | Cool grey daylight, deliberately not the warm cream that generated pages default to |
| Sheet | `#FCFDFD` | White working paper, the only lifted surface in the design |
| Ink | `#14191B` | Near-black with a blue-green bias |
| Petrol | `#0E4750` | The single interface accent: buttons, focus, active states |
| Marker | `#F5E272` | Evidence in the text. Never used decoratively |
| Goed / Fout | `#2C6A4F` / `#9E3B2C` | Reserved strictly for right and wrong so they never compete with the accent |

The interface is ink on paper. The only colour a learner sees is colour they would put there themselves:
yellow marks the evidence, pale blue marks their own answer.

**Archivo** — a sturdy grotesque with the flavour of Dutch public signage — carries the whole interface,
headings included. **Literata**, a serif built for reading on screen, carries every word of Dutch study
material. This inverts the usual serif-headline convention on purpose: the material is the subject, the
interface is scaffolding around it. An *Eenvoudig lettertype* control in the exercise bar switches the
material to sans for anyone who reads that more easily.

Hairline rules replace cards. Contrast comes from one lifted sheet, tabular numerals, and uppercase
micro-labels; not from a shadow on every block. The prototype's layout responds to container width rather
than viewport width, so the Telefoon toggle in the prototype bar reflows the real layout.

## What the design refuses to do

- No readiness percentage, no pass prediction, no converted DUO score. The review screen shows what was
  answered and where it went wrong, and says plainly that there is no pass mark.
- No streaks, badges, mascots or confetti. For most people using this the exam is a legal obligation.
- Nothing is recorded or uploaded without an explicit action. The consent panel names what is sent, to
  whom, and how long it is kept, before any button sends anything.
- Home-screen status labels state the real state of the content — one worked reading set, single examples
  elsewhere — rather than implying a bank that does not exist.

## Screens in the prototype

1. **Start** — guest-first index of the five parts with honest counts and status, level selector, resume row.
2. **Lezen, oefenen** — the core. All eight pilot questions, evidence highlighting, per-option explanations,
   tap-a-word glosses, English help behind one switch.
3. **Overzicht** — score, mistakes grouped by *type* of mistake rather than by question, repeat queue.
4. **Luisteren** — player with practice-only speed control, playback counter, transcript revealed after
   answering. Clearly flagged: no audio in this build.
5. **Schrijven** — task, self-check checklist, consent panel, then feedback that quotes the learner's own
   sentences, marks the one missing requirement, and offers one possible model answer. Includes the note
   that A2 writing is still a paper exam.
6. **Spreken** — local recording, replay, comparison with one possible answer, then optional feedback with
   a transcript-correction step before any judgement is made, and no claims about pronunciation.
7. **Proefexamen, instellen** — the rules stated before starting, including why this is not an official exam.
8. **Proefexamen, tijdens** — exam chrome, clock, question navigator, flagging, submit confirmation.
9. **KNM** — question with source, date of last factual check, the July 2025 change notice, and a pointer to
   Mijn Inburgering for anything about the learner's own obligations.
10. **Jouw werk** — local progress, export, delete, optional account, and a list of what the service does not do.

Interface labels are in English; everything a learner must read is in simple Dutch, with English help behind
one switch in the top bar. That follows the service plan; the opposite split is defensible and worth testing.

## Content used

The reading task is the eight-question A2 pilot from `pilots/a2-reading-001.json`, unchanged, with evidence
spans and per-option explanations added for this design. Those additions are worth folding back into the
pilot data. The listening, writing, speaking and KNM tasks were written new for this mockup at the same
level. No official DUO or NT2 material is reproduced in the file.

## Open questions for review

- The name, and whether the interface should be Dutch-first instead of English-first.
- Whether the mock exam should be a peer of practice on the home screen, or deliberately harder to reach
  until the blueprint audit is done.
- Whether the serif study material helps or hinders learners with low literacy; the plain-typeface control
  is a mitigation, not an answer.
