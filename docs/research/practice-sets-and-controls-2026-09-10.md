# Practice sets and compact controls, 10 September 2026

The catalogue now starts short sessions containing three to five exercises. Previously, a one-question listening exercise ended at a result screen and sent the learner back to the catalogue. The new flow continues through every question in the set before showing a result. Writing and speaking move to the next task after review. A completed set offers the next set as its primary action.

## Membership and links

`content/practice-sets.json` defines 20 sets covering all 77 existing exercises exactly once. The initial grouping follows catalogue order within each subject and level, with balanced groups of three to five. KNM remains independent of language level. This changes navigation without changing exercise wording or claiming a calibrated teaching sequence.

Each set has a stable URL, such as `/sets/a2-listening-01`. Individual `/exercise/<id>` links still work; completed standalone closed exercises also offer the next exercise. Copies of either kind of link contain no learner answers.

Keep existing set IDs and membership stable. New content needs explicit new set definitions. The build verifies catalogue coverage, unique membership and matching subject/level. The separate practice-test builder still offers delayed explanations across available closed questions; these short sets do not reproduce an official exam.

## Saved work

The existing `inburgering.study.v2` record gains a `sessions` map keyed by set ID. Each set saves its question position, choices, checked answers and start/end times. Moving to another set preserves both positions. Opening a matching set restores its unfinished session; an explicit retry starts it again. A changed membership does not silently reuse an incompatible snapshot.

Writing and speaking save completion after each review and keep the original per-exercise drafts. Closed sets save question-level result records after the final answer. An unfinished closed set still retains its selections in the session snapshot. Existing records, drafts and settings remain intact. Feedback prose itself remains transient; reloading an unfinished open task restores its draft for another review.

## Interface changes

The root font size is 90% of the browser default, reducing rem-based typography and layout by about 10%. The shell remains contained at 80rem, with a 12rem sidebar. Coarse-pointer rules preserve comfortable controls for touch.

Language choices use circular Dutch and British SVG flags, retaining accessible language names. Theme uses sun, moon and system icons. The rounded selector indicator animates independently of the labels, so their widths remain fixed. Exercise filters use an animated yellow underline.

On phones the wordmark and levels share a row. All five subjects remain visible underneath; Practice test and Progress sit beside a preferences button. Its popover holds language and theme together. Rows retain side padding at 320px and 390px.

The elapsed-time setting uses Base UI Switch again, including its hidden native checkbox. The 44×26px track has an 18px thumb with equal four-pixel end gaps. Thumb movement and track colour animate; repeated label clicks cannot select text. Reduced-motion preferences disable control motion.

Exercise rows have transparent backgrounds and a rounded hover surface without dividers. Dark mode uses neutral charcoal (`#242424`). The listening player no longer displays “Synthetic sample voice”; the About page retains the generated-audio explanation. An information icon beside Record contains the transcription notice, limits and Privacy link.

## Suggested answers

Suggestions now stay visible for incomplete answers. Missing details use Dutch bracket placeholders, with a brief instruction to fill them and verify the meaning. If the model omits the suggestion or supplies too few placeholders, the server returns the submitted text plus missing rubric labels in brackets. Complete wording may remain unchanged and is still shown.

The bounded synthetic run returned visible suggestions in all five cases. Four matched the expected criterion decisions; one incorrectly marked a proposed solution as missing. Placeholder counting cannot verify semantic fidelity. See [the evaluation note](feedback-consistency-2026-09-10.md#later-update-visible-suggested-answers) and [recorded outputs](feedback-visible-suggestions.json). No real user answers or recordings were used, and the configured model was not changed.

## Verification

The local test suite passes 23 Node checks and 21 Python checks. Set regressions cover complete catalogue membership, closed-question results, open-task progression, route parsing and independent saved sessions. Service tests cover direct set URLs as well as suggestion fallbacks.

Two isolated Firefox scripts passed 65 checks across desktop and 390px/320px viewports. They exercise complete listening and writing sets, reload/resume, switching subjects, next-set actions, standalone links, feedback failure recovery, language consistency, suggestions, selector geometry, the Switch keyboard/label behavior and preferences focus return. Screenshots were inspected in light and dark mode. Browser tests use synthetic state on a separate local origin and never clear the user's browser data.

The scripts are `tests/browser/refinement.mjs` and `tests/browser/soft-controls.mjs`. They expect a test server at port 8767 and an isolated Firefox WebDriver BiDi endpoint at port 9226. The main local server remains on port 8766. Nothing was published.
