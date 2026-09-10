# Interface refinement, 10 September 2026

Historical note: the user rejected the full-width header and gray sidebar after this pass. The contained layout was restored in `research/player-and-layout-2026-09-10.md`; current preferences are recorded in `DESIGN.md`.

The user requested saturated yellow actions, neutral menu states, a cleaner sidebar and more deliberate report dialogs. The earlier olive direction was a misinterpretation and has been removed from the current design notes and implementation.

The wordmark now sits in a full-width header. Removing the shell's centered width limit removes the outside gutter at larger viewports. The sidebar contains subject navigation and language/theme choices, without a duplicate progress summary. The footer centers the independent-practice notice and document links in the workspace.

Light and Dark preferences remain explicit. System is available as the default for new state and follows OS changes. The startup script and React use the same resolver. Existing drafts and progress remain in local storage; the routine draft-save label is gone.

The Base UI report dialog fades and moves on entry and exit. Content measurement lets its height transition into a smaller confirmation with the saved reference and a return button. The form retains unsent notes after dismissal or a failed request. Successful forms reset after closing. Reduced-motion mode disables the transitions.

The sentence-starter overlay covers all 36 open exercises with 108 Dutch fragments. The separate author and reviewer checked grammar, criteria alignment, learner choice and avoidance of complete answers. See `content/hints/review.json` and `research/content-workflow.md`. Build verifies the approved overlay and catalogue hashes. Showing a hint never writes to the answer field.

## Verification

Firefox used isolated profiles and a separate local report database. The user's browser data was not cleared. Screenshots were inspected at 1280px and 390px, with additional layout checks at 320px and 900px. A sidebar language-row scrollbar found during inspection was fixed.

24 browser checks covered navigation alignment, footer placement, stable filter widths, theme persistence and OS-change handling, draft preservation, dialog focus and Escape, failed-report retry, actual local report submission, confirmation resizing and exit animation. Seven further checks covered optional hints, Dutch content under translated controls, draft integrity and narrow layout. Three reduced-motion checks verified Firefox's preference, disabled transitions and focus return.

`npm run build` and `npm test` passed: 14 JavaScript tests and nine Python tests. New checks cover theme resolution and the sentence-starter review gate. No paid model or speech calls were needed for this pass. The service remains local at http://127.0.0.1:8766/.
