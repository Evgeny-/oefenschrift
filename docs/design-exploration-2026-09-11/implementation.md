# Local implementation

The selected direction uses the illustrated subject cards from Colour workshop with a warm left side and slightly lighter content on the right. Each surface continues to its respective window edge, avoiding a separate sidebar stripe inside the centred layout. The content is warm off-white (`#f8f5ef`), while the sidebar and outer left margin use `#f3efe6`. Dark mode retains its shared neutral background. The standard home page is at `http://127.0.0.1:8766/` after `npm run dev`.

The home-page reading example now has a yellow surround by default, with a light inner panel for the passage and answer choices. It appears until the browser has a completed exercise. The development-only link `http://127.0.0.1:8766/?sample=yellow` still forces the example to appear for inspection when history exists. Sample answers are not saved as progress.

Subject cards link to the existing catalogues. Their counts follow the selected level, while the shorter descriptions switch with the interface language. Reading spans two rows on large screens; narrower layouts use two columns and then a single column. Dark mode has separate subject colours. Card hover outlines use a muted blend of the accent and card background. Recording controls and playback share one sheet, with recording errors inside it and the existing editable transcript below.

The current wordmark and Fira Sans/Nunito fonts remain. Exercise content and feedback services were not changed. No publication was performed.

Five illustrations were generated through the built-in ImageGen tool and saved as transparent 512px WebP assets in `assets/images/home/` (about 160 KB combined). The exact prompts and file mapping are in [home-art-prompts.json](home-art-prompts.json). `scripts/prepare.ts` copies these assets through the existing media workflow.

Validation used the project checks and Firefox with isolated browser profiles and databases. The focused review covered subject navigation, A2/B1 counts, both languages, dark mode, viewports from 320 to 1440 pixels, answer feedback in the yellow example, and typing after a synthetic microphone denial. All 36 focused checks passed. Screenshots and the review script are in ignored `tmp/design-implementation/`.

The latest interface changes passed type checking, formatting, source-size checks and 36 focused Firefox checks. Broader project checks encountered separate content changes: an exercise lacks listening audio, and the sentence starters need review against the updated catalogue. No exercise integration was performed in this interface task.
