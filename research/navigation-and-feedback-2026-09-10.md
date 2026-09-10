# Navigation and feedback refinement

The contained sidebar/content shell remains, with the same paper background and four-size Public Sans scale. The sidebar wordmark returns above level choices. Language uses a compact NL / EN group; theme uses sun, moon and system icons with accessible names. Mobile places the wordmark and levels in one row. The footer stays centered on a single desktop row.

Completed rows use muted text and a small unfilled check at the right. Drafts use the same place. Filled yellow completion badges and repeated “Not started” labels are removed. The catalogue’s generic feedback appeal is removed too.

All exercise types share the title/subtitle, timer and Report a problem control group. Each open exercise has a locally stored starting time. The practice-test timer preference is a real checkbox with a non-selectable label. Recording keeps a brief visible external-transcription notice and Privacy link. An information icon beside feedback actions opens a Base UI popover on hover or click, with keyboard support and a privacy link. Existing report-dialog motion and failure recovery remain intact.

Every exercise has a normal ID route, including reading/listening sets. Catalogue entries are real links, so copy-link and new-tab gestures work. Direct requests and reloads receive the app shell; unknown media/asset paths remain 404s. Old hash links migrate to normal paths. A local-only URL still needs this server; this change does not publish the app.

Builds fingerprint app asset references. The local server sends no-store for the shell and application JavaScript/CSS and ignores stale conditional validators for these files. Progress and drafts use their existing browser storage key. Offline file practice remains in `demo/offline.html`.

Validation used an isolated Firefox profile and a separate server on port 8767. The main journey checked normal routes, old-link migration, saved answers, Back/Forward navigation, compact settings, stable filters/timer geometry, native checkbox behavior, bilingual feedback while a request was pending, visible suggestions, open missing criteria, failure recovery and narrow layouts. Speaking playback was checked with synthetic audio and mocked transcription to avoid sending user audio or making paid ASR requests. No data in the user’s own browser was cleared.

The repeatable browser journey is in `tests/browser/refinement.mjs`. Run it only after starting a separate server on 8767 and a dedicated Firefox test profile with WebDriver BiDi on port 9226. It writes screenshots into `tmp/` and deliberately seeds only its test browser’s state. The unit/service suite runs with `npm test`.

[The feedback evaluation](feedback-consistency-2026-09-10.md) records the model’s remaining semantic limitations and why the app now withholds rewrites when required meaning is missing.
