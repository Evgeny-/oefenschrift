# Oefenschrift design exploration

11 September 2026. Local proposals, based on the current application and catalogue.

## Deliverables

Open `index.html` to compare eight home-page mockups. Select two for a side-by-side view, or open an image at full resolution. The component workspace below the images offers eight palettes and eight exercise examples. It works as a local file and does not need the application server.

The home pages are generated raster concepts. The component workspace is a separate responsive HTML/CSS/JavaScript prototype. Changing its palette explores colour and component shape; it does not reproduce each home-page composition.

`prompts.json` contains the original image prompts. `copy-cleanup-prompts.json` records the second pass, which removed slogans and unsupported exam claims. The built-in image generation tool produced all eight final images in `images/`.

## What I inspected

- Read the current design decisions, home-page logic, subject catalogue, question workspace, open-answer controls, audio player, task blueprint and content-review workflow.
- Inspected the catalogue's 280 items: 62 reading, 46 listening, 46 writing, 58 speaking and 68 KNM items, across its available levels.
- Opened the current application in a separate Firefox profile with an isolated database and synthetic provider credentials. Viewed the home page and all five subjects; answered a reading question incorrectly to inspect the evidence state. Checked the home page and a B1 sentence task at 390px.
- Studied the form scaffold, sentence gaps, picture sequences and the distinction between KNM learning cards and factual questions.

## Home-page directions

| Direction | What changes | What to consider |
| --- | --- | --- |
| 01 Paper & marker | Keeps the current warmth; puts a sample beside the main action. | The closest starting point for an incremental redesign. Tighten the space between supporting copy and actions during implementation. |
| 02 Delft blue | Uses cobalt illustration and compact subject rows. | Gives the app more character while preserving its familiar navigation. |
| 03 Warm notebook | Treats the subject list and sample as facing pages. | The book is intentionally expressive. On phones, flatten it into ordinary stacked sections. |
| 04 Graphic yellow | Stronger typography, top navigation and numbered subject rows. | The broadest navigation departure. The current accepted sidebar would need a deliberate decision before implementation. The raster still repeats settings in the footer; implement one settings location. |
| 05 Quiet green | Emphasises a returning learner's unfinished set. | The shown progress is illustrative. Keep the existing `hasProgress` rule so first-time visitors see a start action. |
| 06 Plum studio | Broad rounded panels and a stronger speaking/writing presence. | Keep reading passages on a plain surface, with sufficient contrast for secondary text. The generated sample strip shows the question in place of the excerpt; restore the source text in an implementation. |
| 07 Night desk | Charcoal, amber and a compact subject shelf. | Use muted illustrations outside the reading task; keep all study material in the chosen theme. |
| 08 Colour workshop | Distinct subject colours and geometric illustrations. | Keep icons and labels alongside colour. The illustrations should become smaller inside exercises. |

My first choices to explore further would be Delft blue for a more distinctive identity, or Paper & marker for continuity. Graphic yellow is useful if you want a stronger change in composition.

## Exercise changes represented in the prototype

| Exercise | Current observation | Proposed treatment |
| --- | --- | --- |
| Reading | Evidence and question already sit together. | Retain that arrangement; make selected, correct and incorrect states readable without relying on colour. The prototype uses both existing questions from the bicycle-shop item. |
| Listening | A small standalone player sits above substantial unused space in short items. | Give the player a clear place in the composition, with a larger play target and an explicit transcript disclosure after completion. The preview plays the existing clip and uses its existing waveform bins. |
| A2 writing | One free-answer field fits the short-message task. | Keep the field and task visible together; let error recovery preserve the answer. |
| B1 sentence task | The source has a printed gap while the answer field appears separately below. On a phone, the learner can lose the sentence context. | Put a native editable field in the gap. Keep the surrounding e-mail intact. |
| Form task | A printed form is shown in the brief, while field labels are inserted into a single answer area. | Use separately labelled inputs, open-answer fields and radio choices in the answer area. Keep the exact existing field labels and prompt. |
| Speaking | The app already preserves a single editable transcript. | Retain one field through recording and feedback. Show typing as the recovery route when the microphone is unavailable. |
| Picture sequence | Several images and the recording controls need to fit together. | Keep the existing images in order and place the single transcript beside them on desktop, below them on phones. |
| KNM factual question | Unlike a learning card, the supporting fact is hidden before answering. | Preserve that distinction. Show the existing illustration first, then the explanation and a direct source link after checking. |

The form and inline sentence treatments are proposals for digital practice. They do not establish equivalence with official delivery or scoring. A future implementation needs to preserve drafts and feedback payloads while changing the input structure.

## Content observations

The earliest catalogue items include very short drills. For example, `A2:listening:tandarts:1` has one question and an approximately 12.5-second clip. The current project blueprint calls for longer, multi-question listening material in new batches. The prototype retains this existing item as a compact player example. Keep the distinction between a short drill and a full exam-format task visible when organising the catalogue.

I have not rewritten the exercise bank or changed any answer keys. Such changes should follow the project's author/reviewer and hash-verification workflow. The prototype reuses the existing wording and illustrations. Its example feedback is derived from the existing sample, quotes and model fields; it does not assess arbitrary input.

The KNM example uses the existing diplomawaardering item. Its central claim, that a foreign diploma is compared with a Dutch qualification, was checked on 11 September 2026 against [Rijksoverheid's explanation](https://www.rijksoverheid.nl/vraag-en-antwoord/onderwijs-en-internationalisering/hoe-laat-ik-mijn-buitenlandse-diploma-in-nederland-waarderen-of-erkennen). This was a check of that claim, not a fresh editorial review of the whole bank.

## Prototype boundaries

- All assets are local. No account, microphone access, provider request, analytics or publication is involved.
- Recording loads an existing sample answer to demonstrate the state. Feedback always labels itself as an example and shows the sample it belongs to.
- The app's local storage and database are untouched. Prototype answers live in memory and reset when the page reloads.
- The phone layout adapts the component workspace. The generated desktop images remain images and can be opened at full size.
- The generated images contain visual suggestions, not production specifications. Resolve exact font sizes, illustration assets, focus states and contrast in the chosen implementation.

The live application uses the later Fira Sans/Nunito decisions in DESIGN.md. The component prototype uses local Public Sans with Nunito headings, following the project's explicit interface constraint. Typography remains available for the next selection round.

## Verification

`npm run format`, `npm run check` and `npm run test:browser` passed. The separate gallery passed 30 Firefox checks, including comparison and Escape, exact reading evidence, playback and speed preservation, failure recovery, retained drafts, KNM explanation timing and opening the standalone file. All eight exercise examples fit at 390px, with an additional 320px check. Desktop and phone screenshots were inspected; picture thumbnails now preserve the full illustration and offer full-size links, and sentence punctuation stays beside the editable gap. `verification.json` records the checks and final image hashes.
