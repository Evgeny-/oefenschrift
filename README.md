# Inburgering

Independent practice for the Dutch inburgering exams: reading, listening, writing and speaking at A2 and B1, plus KNM (knowledge of Dutch society). Every reading and listening answer is explained by the sentence in the text that proves it; writing and speaking tasks get bounded AI feedback against the task's own criteria. The exercises are original, the interface is Dutch or English, and progress stays in the learner's browser.

These are practice exercises, not official exams. Their difficulty has not been validated by an NT2 teacher or a learner study, and nothing here predicts a pass.

## Status

The app runs locally and has not been published yet. The catalogue has 77 original exercises (42 targeting A2, 27 targeting B1, eight KNM) in twenty short practice sets; all 36 open tasks have reviewed sentence starters and ten listening clips have generated Dutch audio. B2 is out of scope for now. Current priorities are in [docs/research/next-steps.md](docs/research/next-steps.md).

## Quick start

You need Node 24 (see `.node-version`) and `ffprobe` (part of FFmpeg) for recording validation.

```sh
npm ci
cp .env.example .env   # add provider keys if you want feedback and speech recognition
npm run dev
```

Open <http://127.0.0.1:8766/a2/reading>. Practice works without any keys; writing and speaking then offer self-review instead of AI feedback.

The operations pages at <http://127.0.0.1:8766/ops> need an account: `npm run admin:password -- <user>` writes a scrypt hash to `var/admin-credentials.json` (for local development, `INBURGERING_ADMIN_USER` and `INBURGERING_ADMIN_PASSWORD` in `.env` also work). The server binds to the local computer only.

## Configuration

Everything comes from environment variables, which the server also reads from a local `.env` (never committed; real environment variables take precedence). [`.env.example`](.env.example) lists them:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Writing and speaking feedback (model in `config/services.json`, currently GPT-5.4 nano) |
| `ELEVENLABS_API_KEY` | Speech recognition for speaking tasks; audio generation with `npm run audio:generate` |
| `OPENAI_ADMIN_KEY` | Optional: organisation cost of the last 30 days on the operations services page |
| `INBURGERING_ADMIN_USER`, `INBURGERING_ADMIN_PASSWORD` | Operations account without a stored credentials file |
| `PORT`, `INBURGERING_DB`, `INBURGERING_ADMIN_SECRET`, `INBURGERING_ADMIN_CREDENTIALS`, `INBURGERING_CREDENTIALS_FILE`, `INBURGERING_OFFLINE` | Optional overrides, documented in `.env.example` |

Keys stay on the server; the browser only learns whether a service is configured.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with hot reload |
| `npm run check` | Route types, TypeScript, formatting, file-size limit, unit/integration tests, content verification, production build |
| `npm run format` | Format the tree with Prettier (`format:check` only verifies) |
| `npm run test:browser` | Firefox journeys with an isolated server, database and profile |
| `npm run test:production` | Build and verify compiled routing, hydration and CSP in Firefox |
| `npm run build` then `npm start` | Build and run the compiled app |
| `npm run db:backup` | Online SQLite backup into ignored `var/backups/` |
| `npm run admin:password -- <user>` | Create or replace the operations account |
| `npm run content:verify` | Verify editorial hashes, evidence, hints and set coverage |
| `npm run content:integrate` | Integrate changes after all review gates pass |
| `npm run batch:check <file>` | Check a draft batch against `content/blueprint.md` before review |
| `npm run audio` | Report which listening, question and speaking clips still need audio |
| `npm run audio:generate` | Generate missing clips with the voice roles in `config/voices.json`, with a transcription round-trip check |
| `npm run illustrate:generate` | Generate exercise pictures from image briefs in the house style of `config/illustration.json` |
| `npm run hints:refresh "<reason>"` | Re-record the sentence-starter review hash after a catalogue change that touched no open task |
| `npm run feedback:evaluate -- --output <file>` | Synthetic paid checks of the feedback against the live implementation ([evaluation notes](docs/research/feedback-consistency-2026-09-10.md)) |

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
| `docs/` | Dated research notes, the pilot exercises and archived design prototypes |
| `var/`, `tmp/` | Local database, credentials, backups and test output (ignored) |

## How it works

React Router framework mode, TypeScript and Vite run both the interface and the backend; route loaders and actions connect them. The first HTML response already contains the exercise and navigation. Routes include `/a2/reading`, `/sets/a2-listening-01`, `/a2/practice-test` and `/exercise/A2%3Areading%3Ap1%3A1`; exercise and set IDs stay stable across reloads, new tabs and copied links, and old hash links redirect. The level in a catalogue URL overrides browser preferences. Each populated level/skill and exercise has its own title, description and canonical URL, and `/sitemap.xml` lists the public routes. Missing routes and assets return 404; compiled assets are fingerprinted and shell responses use no-store caching.

Preference cookies and the current public set position let the server render the saved view. Answers, scores and drafts restore from browser storage during hydration and are absent from those cookies; the Privacy page describes this storage.

SQLite at `var/reports.sqlite3` holds learner reports, published exercises, unpublished drafts, exercise history, stable sets, aggregate API usage with token counts, and anonymous learning events. `/ops` signs an operator in and shows an overview (unique and returning visitors, answers and accuracy per day and per subject, service requests and failures, language and level split, the hardest questions with their most-chosen wrong option, the most practised exercises), the exercise list with per-exercise usage and a per-question option breakdown in the editor, the report queue, and a services page with the live ElevenLabs balance and OpenAI token usage. Charts use Apache ECharts in a palette validated for colour vision. Sessions last twelve hours, login attempts are rate-limited and mutations keep the CSRF check. `/ops` and `/api/ops` are excluded from robots.txt and the sitemap and carry a noindex header. Version checks prevent stale edits from overwriting a newer draft; archiving preserves reports and history; drafts need independent editorial review before they become available in practice.

Daily usage records contain counts, failures, total processing time and token counts. Learning events carry a keyed hash of a random browser id, exercise and question ids, the chosen option letter, whether it was correct (decided from the answer key on the server), the interface language, level and mode. Answer texts, transcripts, recordings and names are never sent or stored. See [infrastructure and APIs](docs/research/infrastructure.md) for configuration, database migrations, backups, admin endpoints and current limits.

## Practice and feedback

Every subject opens a catalogue of short practice sets that resume independently and offer the next set at completion. Speaking uses microphone recording and one editable transcript: stopping a recording sends it to ElevenLabs Scribe v2, as explained by the information icon beside Record; there is no upload button. Audio is limited to two minutes and 6 MB; the server validates it with `ffprobe` and deletes the temporary file.

Feedback uses a strict structured response and exact evidence checks to produce one canonical assessment with Dutch and English explanations; switching language preserves its decisions. Suggested answers and their changes remain visible, with placeholders for missing information inserted before the sign-off. A judgment that fails verification (a quote that is not in the answer, a wrong criteria count, an incomplete response) is retried once with a corrective note before the learner sees an error; quotes that differ in spacing, punctuation, diacritics or case, or with one changed word, resolve to the exact span in the answer. The model can still make semantic mistakes; see the [feedback evaluation](docs/research/feedback-consistency-2026-09-10.md). Result caches last at most 30 minutes. Neither this feedback nor speech recognition establishes an official score or pronunciation assessment.

The interface keeps a contained sidebar, Public Sans, warm paper with a lifted sheet for the Dutch material, charcoal dark mode and saturated yellow actions. Closed questions accept A/B/C or 1/2/3 and Enter; on phones the question floats as a bottom sheet over the text. Listening transcripts open after checking. Set results group mistakes by skill and offer a focused retry of only the missed questions that keeps the first score. Progress can be exported and imported as JSON. Design decisions are recorded in [DESIGN.md](DESIGN.md).

## Content

- [Exercise blueprint](content/blueprint.md), what each exercise must look like per exam part
- [Content creation and validation](docs/research/content-workflow.md) and the [editorial rubric](content/reviews/rubric.md)
- [Exam blueprints and content gap analysis](docs/research/exam-blueprints-2026-09-10.md), the official formats measured against the current bank
- [Voice audition](docs/research/voice-audition-2026-09-10.md), Dutch voices for multi-voice listening audio
- [Feedback latency measurements](docs/research/feedback-latency.md), [practice-set behaviour](docs/research/practice-sets-and-controls-2026-09-10.md), [SEO](docs/research/seo-2026-09-10.md), [design research](docs/research/ai-design-patterns.md)
- [Feasibility assessment](docs/research/feasibility.md), [public service plan](docs/research/service-plan.md), the earlier [design directions](docs/research/design-direction-03.md) and their [clickable prototype](docs/design-archive/oefenplek-prototype.html)
- The original [A2](docs/pilots/a2-reading-001.md) and [B1](docs/pilots/b1-reading-001.md) reading pilots (also as JSON)

Official DUO and NT2 practice material was studied locally to define task specifications; it lives in the ignored `reference-private/` folder, its copyright remains with the respective owners, and none of it is redistributed here. `tools/download_references.py` fetches the publicly offered files into that folder and can resume.

## Contributing

`npm run check` must pass: it includes Prettier formatting (`npm run format` fixes it) and a 1200-line limit per source file, so split rather than grow. Firefox journeys run in CI. Content changes follow the blueprint, the content workflow and the rubric, and only hash-verified batches are integrated. Agents working in this repository read [AGENTS.md](AGENTS.md) first.

## License

[MIT](LICENSE). The exercises, generated audio and illustrations in this repository are original work released under the same licence; Public Sans is used under the SIL Open Font License (`assets/fonts/PublicSans-LICENSE.txt`).
