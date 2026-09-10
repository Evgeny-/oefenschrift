# Inburgering

Local Dutch exam practice in `/Users/evgeny.nikiforov/Projects/inburgering`. The previous project path is a compatibility symlink. Nothing has been published.

## Development

Use Node 24 and install `ffprobe` for recording validation. Then:

```sh
npm ci
npm run dev
```

Open [the app](http://127.0.0.1:8766/a2/reading) or [operations](http://127.0.0.1:8766/ops) in Firefox. Operations needs an account: `npm run admin:password -- <user>` writes a scrypt hash to `var/admin-credentials.json` (for local development, `INBURGERING_ADMIN_USER` and `INBURGERING_ADMIN_PASSWORD` in the environment also work). `open-demo.command` starts the same development server and opens Firefox. React Router framework mode, TypeScript and Vite now run both the interface and backend. Component edits use hot reload; Node entry changes restart the development server. Python is not used by the app, build or current test commands.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with hot reload |
| `npm run check` | Route types, TypeScript, unit/integration tests, content verification and production build |
| `npm run test:browser` | Firefox journeys with an isolated server, database and profile |
| `npm run build` then `npm start` | Build and run the compiled app |
| `npm run test:production` | Build and verify compiled routing, hydration and CSP in Firefox |
| `npm run db:backup` | Online SQLite backup into ignored `var/backups/` |
| `npm run admin:password -- <user>` | Create or replace the operations account |
| `npm run content:verify` | Verify editorial hashes, evidence, hints and set coverage |
| `npm run content:integrate` | Integrate changes after all review gates pass |
| `npm run audio` | Report which listening, question and speaking clips still need audio |
| `npm run audio:generate` | Generate missing clips with the voice roles in `config/voices.json`, with a transcription round-trip check |
| `npm run batch:check <file>` | Check a draft batch against `content/blueprint.md` before review |
| `npm run illustrate:generate` | Generate exercise pictures from image briefs in the house style of `config/illustration.json` |
| `npm run hints:refresh "<reason>"` | Re-record the sentence-starter review hash after a catalogue change that touched no open task |

See [infrastructure and APIs](docs/research/infrastructure.md) for configuration, database migrations, backups, admin endpoints and current limits. The browser runner accepts `FIREFOX_BINARY` and writes its logs and screenshots to `tmp/`. Routine tests use mocked feedback and synthetic credentials. CI runs `npm run check` on Node 24.

## Application and data

`app/` contains the React interface, plain CSS, unstyled Base UI controls and typed route modules. `server/` holds the SQLite store, provider services and local admin security. React Router loaders and actions connect them. Reviewed source exercises live in `content/catalogue.json`; stable set membership lives in `content/practice-sets.json`. Build output goes in `build/`. The existing generated listening audio and local Public Sans files are copied from `demo/` into `public/` during preparation. Old prototype files and Python research/evaluation scripts are historical offline tools.

Routes include `/a2/reading`, `/sets/a2-listening-01`, `/practice-test` and `/exercise/A2%3Areading%3Ap1%3A1`. Exercise and set IDs stay stable across reloads, new tabs and copied links. Old hash links redirect. The same local port preserves existing learner progress and drafts; no browser data is cleared during migration. A localhost link is accessible on the computer running the server. Missing routes and assets return 404. Compiled assets are fingerprinted and shell responses use no-store caching.

React Router renders the actual exercise and navigation into the first HTML response. The level in a catalogue URL overrides browser preferences. Each populated level/skill and exercise has its own title, description and canonical URL; `/sitemap.xml` lists the available public routes. The app remains local, so search engines cannot reach it. Preference cookies and the current public set position let the server render the saved view. Answers, scores and drafts restore from browser storage during hydration; they are absent from these cookies. The Privacy page describes this storage.

SQLite at `var/reports.sqlite3` now holds the existing reports plus published exercises, unpublished drafts, exercise history, stable sets, aggregate API usage with token counts, and anonymous learning events. `/ops` signs an operator in with a user name and password and shows an overview (unique and returning visitors, answers and accuracy per day and per subject, service requests and failures, language and level split, the hardest questions with their most-chosen wrong option, the most practised exercises), the exercise list with per-exercise usage and a per-question option breakdown in the editor, the report queue, and a services page with the live ElevenLabs balance and OpenAI token usage. Charts use Apache ECharts in a palette validated for colour vision. Sessions last twelve hours, login attempts are rate-limited and mutations keep the CSRF check. `/ops` and `/api/ops` are excluded from robots.txt and the sitemap and carry a noindex header; the old `/admin` path returns 404. Version checks prevent stale edits from overwriting a newer draft. Archiving preserves reports and history. Drafts need independent editorial review before they become available in practice. The server still binds to the local computer.

Daily usage records contain counts, failures, total processing time and token counts. Learning events carry a keyed hash of a random browser id, exercise and question ids, the chosen option letter, whether it was correct (decided from the answer key on the server), the interface language, level and mode. Answer texts, transcripts, recordings and names are never sent or stored; the Privacy page describes this. Learner progress and drafts stay in their browser. Provider keys remain on the server, loaded from the authorized credential path in `config/services.json` or environment variables. See the in-app Privacy page for the processing details.

## Practice and feedback

The catalogue has 77 original exercises: 42 language exercises targeting A2, 27 targeting B1 and eight KNM exercises. Twenty sets group them into sessions of three to five exercises. KNM remains available independently of language level. Each unfinished set resumes independently and completion offers the next set. All 36 open tasks have reviewed partial sentence starters; ten listening clips use the previously selected Dutch ElevenLabs voice. B2 material is not populated yet. These exercises have AI editorial review, without a validated CEFR difficulty or official exam score conversion.

Speaking uses microphone recording and one editable transcript. Stopping a recording sends it to ElevenLabs Scribe v2, as explained by the information icon beside Record. There is no upload button. Type instead can be opened and closed without losing its draft. Playback reuses the listening controls and generates a waveform from the actual recording. Audio is limited to two minutes and 6 MB; the server validates it with `ffprobe` and deletes the temporary file.

Feedback uses the existing GPT-5.4 nano configuration. A strict structured response and exact evidence checks support one canonical assessment with Dutch and English explanations. Switching language preserves its decisions. Suggested answers and their changes remain visible, with placeholders for missing information. Missing criteria open immediately. The model can still make semantic mistakes; see [feedback evaluation](docs/research/feedback-consistency-2026-09-10.md). A judgment that fails verification (a quote that is not in the answer, a wrong criteria count, an incomplete response) is retried once with a corrective note before the learner sees an error; the server log in `tmp/local-server.log` names the reason without the answer text. Quotes that differ in spacing, punctuation, quote marks, diacritics or case, or with one changed word, resolve to the exact span in the answer. If the retry still quotes words that are not in the answer, the verdict stands without a highlight for that criterion (logged as unlocated evidence); structural problems still fail closed. Local result caches last at most 30 minutes. Neither this feedback nor speech recognition establishes an official score or pronunciation assessment.

The interface keeps the contained sidebar, Public Sans, charcoal dark mode and saturated yellow actions. The root now follows the browser default with interface sizes tuned to the previous feel, while Dutch study material uses a larger reading size on a lifted paper sheet labelled with its text type. The wordmark carries the evidence marker, navigation links have small stroke icons, catalogue rows name their texts and end with a progress ring, and the footer spreads across the column. Closed questions accept A/B/C or 1/2/3 and Enter; on phones the question floats as a bottom sheet over the text. Listening transcripts open after checking. Set results group mistakes by skill and offer a focused retry of only the missed questions that keeps the first score. Progress can be exported and imported as JSON. Missing points in a suggested written answer are inserted before the sign-off. Timer and report controls sit beside the exercise metadata. Speaking groups Record, its information icon and Type instead; partial hints open under Sentence starters. Mobile layouts keep levels and all subject links visible. Design decisions are recorded in [DESIGN.md](DESIGN.md).

- [Exercise blueprint](content/blueprint.md), what each exercise must look like per exam part
- [Exam blueprints and content gap analysis](docs/research/exam-blueprints-2026-09-10.md), the official formats measured against the current bank
- [Voice audition](docs/research/voice-audition-2026-09-10.md), Dutch voices for multi-voice listening audio
- [Content creation and validation](docs/research/content-workflow.md)
- [Editorial rubric](content/reviews/rubric.md)
- [Next steps](docs/research/next-steps.md)
- [Feedback latency measurements](docs/research/feedback-latency.md)
- [Practice-set behavior](docs/research/practice-sets-and-controls-2026-09-10.md)
- [SEO changes and remaining work](docs/research/seo-2026-09-10.md)
- [Design research](docs/research/ai-design-patterns.md)

## Reference material

The local `reference-private/` folder contains 63 official files, approximately 635 MB: 48 NT2 PDFs, 12 NT2 media archives, and 3 A2 writing PDFs. The NT2 material covers 2023-2025 for reading, listening, writing and speaking at B1 and B2. The reference files and extracted text are excluded from Git. Their copyright remains with the respective owners.

- [Feasibility assessment](docs/research/feasibility.md)
- [Public service plan](docs/research/service-plan.md), exam scope, audio and AI feedback, costs and delivery stages
- [Prompt for another design agent](docs/research/design-agent-prompt.md), concise concept and data sources
- [Second design direction](docs/research/design-direction-02.md), rationale and design guidance
- [Third design direction](docs/research/design-direction-03.md), an alternative concept developed in parallel
- [Clickable prototype for direction 03](docs/design-archive/oefenplek-prototype.html), ten screens in one self-contained file; open it directly in a browser
- [Original A2 reading pilot](docs/pilots/a2-reading-001.md), eight questions for your review
- [A2 pilot as structured data](docs/pilots/a2-reading-001.json)
- [Original B1 reading pilot](docs/pilots/b1-reading-001.md), eight questions with explanations
- [Pilot as structured data](docs/pilots/b1-reading-001.json)
- [Local download manifest](reference-private/manifest.json), with source URLs and SHA-256 hashes
- [Local file inventory](reference-private/inventory.json), with PDF page counts and media archive contents
- [Official A2 and KNM practice links](reference-private/duo-practice-links.json)

We are starting user review at A2. Both pilots are original drafts, shorter than an official paper, with no validated pass threshold or official score conversion. Their target levels have not been validated by an NT2 teacher or learner study.

`tools/download_references.py` downloads the files offered by the public NT2 download catalogue and the A2 writing links on DUO's practice page. It can resume by checking existing local files. It does not export the A2/KNM online players or the separate NT2 individual-task bank.

The intended workflow is to study the official material locally, define task specifications, and write new content. Distribution of official material requires a separate rights decision. A personal-study copy does not confer permission to publish it or close adaptations.
