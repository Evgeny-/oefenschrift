# What people call AI slop in interface design

Research and application, 9 September 2026. The skill cutoff for this review is 9 June 2026. Discussion posts describe people's reactions; they do not reliably identify whether AI produced an interface.

## Findings

The recurring complaints go beyond gradients. In a [recent UXDesign discussion](https://www.reddit.com/r/UXDesign/comments/1ut0n4d/what_makes_design_obvious_as_ai_created/), commenters describe redundant copy, excessive features, small labels surrounded by large gaps, repeated rounded shapes, and decorative icons. Several point out that those visual devices existed before AI. A [recent UI_Design discussion](https://www.reddit.com/r/UI_Design/comments/1w70kqb/question_about_websites_looking_like_ai_slop/) challenges the tendency to label every border or shadow as bad design.

For this project, the useful distinctions are:

| Symptom | What to examine | Response in the demo |
| --- | --- | --- |
| Every region gets the same box treatment | Whether the boundary groups information or indicates a control | Keep field outlines; remove the outer mockup frame and filled sidebar |
| Unrelated regions have identical padding | Label proximity, task separation, reading measure and control size | Give rows and controls different spacing roles; retain comfortable passage leading |
| A template dictates the first screen | Whether it helps the learner start an exercise | Preserve the accepted subject navigation and reading catalogue |
| Subtitles repeat what is already visible | Whether removing the sentence loses useful information | Replace generic instructions with the actual amount of available reading material |
| Every link receives an icon or repeated action label | Whether the text already explains it | Use text navigation and direct exercise titles |
| Cosmetic polish hides broken behaviour | Empty results, focus, wrong answers, unavailable media | Exercise those states; keep limitations next to the affected feature |

The conclusion is our design judgment from selected sources. It is not a validated detector or a claim that a colour causes poor design.

## Fresh skills checked

Dates were retrieved using GitHub's commits API with a file-path filter. Search crawl dates were not accepted as update dates.

| Candidate | Evidence within the window | Assessment |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/commit/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f) | Skill updated 3 September 2026, specifically revising generic defaults | Best concise starting point for product-specific decisions and useful copy |
| [Impeccable](https://github.com/pbakaus/impeccable/commit/c7588067a48180296bf49bec77612f589bd5db26) | Inspected craft reference updated 14 August 2026 in a generated-provider sync; launcher entry updated 9 September | Useful grouping and layout guidance; launcher release is not proof of new design guidance |
| [Hallmark](https://github.com/Nutlope/hallmark/commit/f5f4a2ceb0ff302f2e69fb33679501611eadee32) | Skill updated 6 August 2026 while adding a theme | Useful emphasis on structural variety; its prescribed themes and scoring process exceed our needs |
| [unslop-ui collection copy](https://github.com/iamneilroberts/claude-skills/commit/37f97cad004fad20cc20f688bde99b0c4c62e7ea) | Initial import dated 3 July 2026 | Original maintenance remains unverified; not used as research evidence |

The unslop-ui copy advertises precise percentages from a large Reddit analysis. We could not verify the underlying dataset or method from the inspected material, so those numbers were excluded. We did not install any candidate's executable helpers or import its workflow wholesale.

## Our skill

Created `design-with-restraint` at `/Users/evgeny.nikiforov/.codex/skills/design-with-restraint/SKILL.md`. Its supporting source notes record exact commits and caveats. It separates reusable review guidance from the project's preferences in `DESIGN.md`. The skill validator passed. Its practical first application is the local demo; aesthetic success still needs user review.

## Libraries

The demo uses native HTML controls with plain CSS and a locally hosted Source Sans 3 font. It has no Tailwind dependency and no component-library theme. [Tailwind supports custom theme tokens](https://tailwindcss.com/docs/theme), so its default palette is not technically unavoidable; avoiding it here follows the user's preference.

[Base UI](https://base-ui.com/react/overview/about) and [React Aria](https://react-spectrum.adobe.com/react-aria/) are possible later choices for unstyled React controls with accessibility behaviour. Consider them when introducing complex dialogs or comboboxes. Adding either now would introduce a framework without solving the current colour and spacing problems.

## Local delivery

`demo/index.html` is a standalone page with local assets and no Codex host dependency. `open-demo.command` opens it directly in Firefox without a running server. `python3 scripts/serve_demo.py` serves only `demo/` at `http://127.0.0.1:8765/`. Official reference material is outside that served directory. Nothing is published.

Validation: Firefox 155 rendered the local URL at 1280px and 360px, and opened the speaking view directly from disk. The visible Firefox session was used to check the missing-answer message, wrong-answer explanation, question navigation and keyboard focus. JavaScript syntax passed; embedded pilot data matches the original JSON. Demo assets return HTTP 200, and the private-reference URL returns 404. Audio and AI remain labelled examples.
