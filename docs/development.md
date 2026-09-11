# Development guide

The long form of the [README](../README.md): configuration, commands, layout, how the app works, content and operations. Dated decisions live in [research/](research/).

Oefenschrift is independent practice for the Dutch inburgering exams: reading, listening, writing and speaking at A2 and B1, plus KNM (knowledge of Dutch society). Every reading and listening answer is explained by the sentence in the text that proves it; writing and speaking tasks get bounded AI feedback against the task's own criteria. The exercises are original, the interface is Dutch or English, and progress stays in the learner's browser.

These are practice exercises, not official exams. Their difficulty has not been validated by an NT2 teacher or a learner study, and nothing here predicts a pass.

## Status

A semi-public version runs at <https://cool-projects.duckdns.org/projects/oefenschrift/> (see [deployment](research/deployment.md)); a real domain comes later. The catalogue has 77 original exercises (42 targeting A2, 27 targeting B1, eight KNM) in twenty short practice sets; all 36 open tasks have reviewed sentence starters and ten listening clips have generated Dutch audio. B2 is out of scope for now. Current priorities are in [docs/research/next-steps.md](research/next-steps.md).

## Quick start

You need Node 24 (see `.node-version`) and `ffprobe` (part of FFmpeg) for recording validation.

```sh
npm ci
cp .env.example .env   # add provider keys if you want feedback and speech recognition
npm run dev
```

Open <http://127.0.0.1:8766/>. The start page says what the site is and offers one action — continue the set you started or begin the first subject — plus the level check (ten questions across reading and listening that end in a per-subject picture and one recommended set, never an exam prediction), followed by three short reasons; the maker line and GitHub link come from `content/site.json`. Practice works without any keys; writing and speaking then offer self-review instead of AI feedback.

The operations pages at <http://127.0.0.1:8766/ops> need an account: `npm run admin:password -- <user>` writes a scrypt hash to `var/admin-credentials.json` (for local development, `OEFENSCHRIFT_ADMIN_USER` and `OEFENSCHRIFT_ADMIN_PASSWORD` in `.env` also work). The server binds to the local computer only.

## Configuration

Everything comes from environment variables, which the server also reads from a local `.env` (never committed; real environment variables take precedence). [`.env.example`](../.env.example) lists them:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Writing and speaking feedback (model in `config/services.json`, currently GPT-5.4 nano) |
| `ELEVENLABS_API_KEY` | Speech recognition for speaking tasks; audio generation with `npm run audio:generate` |
| `OPENAI_ADMIN_KEY` | Optional: organisation cost of the last 30 days on the operations services page |
| `OEFENSCHRIFT_ADMIN_USER`, `OEFENSCHRIFT_ADMIN_PASSWORD` | Operations account without a stored credentials file |
| `OEFENSCHRIFT_ORIGIN`, `OEFENSCHRIFT_TRUST_PROXY` | Public deployment: the bare origin the site is served on, and the number of reverse-proxy hops to trust (required behind a proxy) |
| `OEFENSCHRIFT_BASE_PATH` | The path the site lives under on a shared host (`/projects/oefenschrift`); a build-time choice that the server checks at start |
| `OEFENSCHRIFT_FEEDBACK_DAILY_CAP`, `OEFENSCHRIFT_SPEECH_DAILY_CAP` | Default daily caps on paid requests (2,000 and 600); changeable on the operations services page |
| `PORT`, `OEFENSCHRIFT_DB`, `OEFENSCHRIFT_ADMIN_SECRET`, `OEFENSCHRIFT_ADMIN_CREDENTIALS`, `OEFENSCHRIFT_CREDENTIALS_FILE`, `OEFENSCHRIFT_OFFLINE` | Optional overrides, documented in `.env.example` |

Keys stay on the server; the browser only learns whether a service is configured. Cookies and browser storage use the `oefenschrift` prefix. Existing browser data migrates on the next visit; old names remain only as compatibility aliases. Environment variables use `OEFENSCHRIFT_`, with `INBURGERING_` accepted when the new name is unset. Database and credential file paths stay the same.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with hot reload |
| `npm run check` | Route types, TypeScript, formatting, file-size limit, unit/integration tests, content verification, production build |
| `npm run format` | Format the tree with Prettier (`format:check` only verifies) |
| `npm run test:browser` | Firefox journeys with an isolated server, database and profile |
| `npm run test:production` | Build and verify compiled routing, hydration and CSP in Firefox |
| `npm run build` then `npm start` | Build (client, server and the compiled Node entry `build/entry.mjs`) and run the compiled app |
| `npm run deploy` | Build for the public path and rsync the app to the server; see [docs/research/deployment.md](research/deployment.md) |
| `npm run db:backup` | Online SQLite backup into ignored `var/backups/` |
| `npm run admin:password -- <user>` | Create or replace the operations account |
| `npm run content:verify` | Verify editorial hashes, evidence, hints and set coverage |
| `npm run content:integrate` | Integrate changes after all review gates pass |
| `npm run batch:check <file>` | Check a draft batch against `content/blueprint.md` before review |
| `npm run batch:adopt <NNN>` | Adopt a reviewer's proposed batch (hash verified, checker run); `content/blueprint.md` §12 |
| `npm run media:prune` | List clips and pictures nothing references; `--delete` removes them |
| `npm run audio` | Report which listening, question and speaking clips still need audio |
| `npm run audio:generate` | Generate missing clips with the voice roles in `config/voices.json`, with a transcription round-trip check |
| `npm run illustrate:generate` | Generate exercise pictures from image briefs in the house style of `config/illustration.json` (`--concurrency 4`, `--redo <key>` redraws one) |
| `npm run content:integrate -- --refresh-hints "<reason>"` | Integrate closed-item batches or media fields and re-record the sentence-starter review hash when no open task changed |
| `npm run feedback:evaluate -- --output <file>` | Synthetic paid checks of the feedback against the live implementation ([evaluation notes](research/feedback-consistency-2026-09-10.md)) |

Routine tests use mocked feedback and synthetic credentials and make no provider calls. Continuous integration runs `npm run check` and the Firefox journeys on every push and pull request; Firefox is only needed locally if you want to run the journeys yourself (`FIREFOX_BINARY` overrides the binary; logs and screenshots go to `tmp/`).

## Layout

| Path | Contents |
| --- | --- |
| `app/` | React interface: routes, components, domain logic, plain CSS in `app/styles/` |
| `server/` | Express entry, SQLite store, provider services, operations security |
| `content/` | Reviewed exercises (`catalogue.json`), practice sets, hints, batches, reviews and the blueprint |
| `assets/` | Public Sans (OFL) and generated listening audio, copied into `public/` during preparation |
| `config/` | Feedback model, voice roles and illustration style |
| `scripts/`, `tools/` | Content, audio, illustration and evaluation scripts; the offline reference downloader |
| `tests/` | Node unit and integration tests, Firefox journeys in `tests/browser/` |
| `docs/` | Dated research notes, the pilot exercises, archived design prototypes and the wordmark candidates (`docs/logos/`; after `npm install --no-save opentype.js`, `node docs/logos/fonts.mjs` builds the review pages and the wordmark module, `icon.mjs` the site icon) |
| `var/`, `tmp/` | Local database, credentials, backups and test output (ignored) |

## How it works

React Router framework mode, TypeScript and Vite run both the interface and the backend; route loaders and actions connect them. The first HTML response already contains the exercise and navigation. Routes include `/a2/reading`, `/sets/a2-listening-01`, `/a2/practice-test`, `/a2/level-check` and `/exercise/A2%3Areading%3Ap1%3A1`; exercise and set IDs stay stable across reloads, new tabs and copied links, and old hash links redirect. The level in a catalogue URL overrides browser preferences. The interface language is part of the address too: the plain path is Dutch, `/en/…` (`/en`, `/en/a2/reading`, `/en/exercise/…`) is English, and a browser that chose English is sent from a plain path to its `/en` twin with a temporary redirect, while a crawler without a preference always finds Dutch there. Each page has a title and description in both languages, a canonical URL per language and `hreflang` links naming both versions (`x-default` is Dutch); the language choice is a pair of real links, so the versions reach each other. `/sitemap.xml` lists the public routes in both languages with their alternates. Missing routes and assets return 404; compiled assets are fingerprinted and shell responses use no-store caching.

Preference cookies and the current public set position let the server render the saved view. Answers, scores and drafts restore from browser storage during hydration and are absent from those cookies; the Privacy page describes this storage.

SQLite at `var/reports.sqlite3` holds learner reports, published exercises, exercise history, stable sets, aggregate API usage with token counts, and anonymous learning events. `/ops` signs an operator in and shows an overview (unique and returning visitors, answers and accuracy per day and per subject, service requests and failures, language and level split, the hardest questions with their most-chosen wrong option, the most practised exercises), the exercise list with per-exercise usage, an exercise page with a per-question option breakdown, its reports and a switch that removes it from practice (content itself is authored in the reviewed catalogue, not in the panel), the report queue, and a services page with the live ElevenLabs balance, OpenAI token usage and a switch and daily cap per provider. A service that is switched off, over its cap or paused by its circuit breaker (five provider failures in a row, thirty minutes after a rejected key) answers with a code instead of calling the provider; learners then get self-review instead of AI feedback and type instead of dictating, without losing their draft. Paid calls also need a signed session pass cookie that the first page sets, and are limited per network address (an IPv6 /64 counts as one) and per browser: for example 6 a minute, 40 an hour and 150 a day per address and 30 a day per browser for feedback, 4/30/100 and 20 for transcription; a used-up day answers `allowance_exhausted` and the task offers self-review until tomorrow. Provider calls share six feedback and three transcription slots; beyond a four-second wait the answer is `busy`. Anonymous events are deleted after 90 days and resolved reports a year after they were filed. The privacy notice (`/privacy`) lists every cookie and storage item; the terms (`/terms`) state what the site is not, how the AI features may be used and the licence. Charts use Apache ECharts in a palette validated for colour vision. Sessions last six months (Sign out ends one earlier), login attempts are rate-limited and mutations keep the CSRF check. `/ops` and `/api/ops` are excluded from robots.txt and the sitemap and carry a noindex header. Version checks prevent stale edits from overwriting a newer draft; archiving preserves reports and history; drafts need independent editorial review before they become available in practice.

Daily usage records contain counts, failures, total processing time and token counts. Learning events carry a keyed hash of a random browser id, exercise and question ids, the chosen option letter, whether it was correct (decided from the answer key on the server), the interface language, level and mode. Answer texts, transcripts, recordings and names are never sent or stored. See [infrastructure and APIs](research/infrastructure.md) for configuration, database migrations, backups, admin endpoints and current limits.

## Practice and feedback

Every subject opens a catalogue of short practice sets that resume independently and offer the next set at completion. Speaking uses microphone recording and one editable transcript: stopping a recording sends it to ElevenLabs Scribe v2, as explained by the information icon beside Record; there is no upload button. Audio is limited to two minutes and 6 MB; the server validates it with `ffprobe` and deletes the temporary file.

Feedback uses a strict structured response and exact evidence checks to produce one canonical assessment with Dutch and English explanations; switching language preserves its decisions. The learner's text is treated as untrusted input: it travels as the user message below a developer message with the task, the model must flag text that is not an attempt at the task (which then gets no verdict and no suggested wording), and any judgment with a link, an over-long explanation or a suggestion far longer than the answer is rejected. Suggested answers and their changes remain visible, with placeholders for missing information inserted before the sign-off. A judgment that fails verification (a quote that is not in the answer, a wrong criteria count, an incomplete response) is retried once with a corrective note before the learner sees an error; quotes that differ in spacing, punctuation, diacritics or case, or with one changed word, resolve to the exact span in the answer. The model can still make semantic mistakes; see the [feedback evaluation](research/feedback-consistency-2026-09-10.md). Result caches last at most 30 minutes. Neither this feedback nor speech recognition establishes an official score or pronunciation assessment.

The interface keeps a contained sidebar, Public Sans, warm paper with a lifted sheet for the Dutch material, charcoal dark mode and saturated yellow actions. Closed questions accept A/B/C or 1/2/3 and Enter; on phones the question floats as a bottom sheet over the text. Listening transcripts open after checking. Set results group mistakes by skill and offer a focused retry of only the missed questions that keeps the first score. Progress can be exported and imported as JSON. Design decisions are recorded in [DESIGN.md](../DESIGN.md).

## Content

- [Exercise blueprint](../content/blueprint.md), what each exercise must look like per exam part
- [Content creation and validation](research/content-workflow.md) and the [editorial rubric](../content/reviews/rubric.md)
- [Exam blueprints and content gap analysis](research/exam-blueprints-2026-09-10.md), the official formats measured against the current bank
- [Voice audition](research/voice-audition-2026-09-10.md), Dutch voices for multi-voice listening audio
- [Feedback latency measurements](research/feedback-latency.md), [practice-set behaviour](research/practice-sets-and-controls-2026-09-10.md), [SEO](research/seo-2026-09-10.md), [design research](research/ai-design-patterns.md)
- [Feasibility assessment](research/feasibility.md), [public service plan](research/service-plan.md), the earlier [design directions](research/design-direction-03.md) and their [clickable prototype](design-archive/oefenplek-prototype.html)
- [Production hardening and abuse control](research/production-hardening-2026-09-10.md), the launch checklist: blockers in the current code, layered limits for the paid endpoints, provider switches with graceful degradation
- The original [A2](pilots/a2-reading-001.md) and [B1](pilots/b1-reading-001.md) reading pilots (also as JSON)

Official DUO and NT2 practice material was studied locally to define task specifications; it lives in the ignored `reference-private/` folder, its copyright remains with the respective owners, and none of it is redistributed here. `tools/download_references.py` fetches the publicly offered files into that folder and can resume.

## Contributing

`npm run check` must pass: it includes Prettier formatting (`npm run format` fixes it) and a 1200-line limit per source file, so split rather than grow. Firefox journeys run in CI. Content changes follow the blueprint, the content workflow and the rubric, and only hash-verified batches are integrated. Agents working in this repository read [AGENTS.md](../AGENTS.md) first.

## License

[MIT](../LICENSE). The exercises, generated audio and illustrations in this repository are original work released under the same licence; Fira Sans and Nunito are used under the SIL Open Font License (`assets/fonts/*-LICENSE.txt`), as is Public Sans, kept as the reference for the typeface comparison that `node docs/logos/typefaces.mjs` rebuilds into the ignored `assets/fonts/eval/` and `docs/logos/out/`.
