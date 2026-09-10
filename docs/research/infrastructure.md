# Development infrastructure

Updated 10 September 2026. The application now runs through React Router 8.3.1 framework mode with TypeScript, React 19, Vite 8 and an Express adapter. Route loaders and actions own database and provider access. Python is absent from the runtime, build and current test commands. Historical Python research, media-generation and evaluation scripts remain available as offline tools.

## Running and checking

Use Node 24, as recorded in `.node-version`, and install `ffprobe` for audio validation. The package minimum is Node 22.22. Run `npm ci`, then `npm run dev`. The local address remains `http://127.0.0.1:8766`, preserving browser storage from the previous server. React edits use Vite hot module replacement; `tsx watch` restarts the Node entry when it changes. The build prepares the local fonts and existing generated audio from `demo/` into `public/`.

`npm run check` generates route types, checks TypeScript, runs Node tests, verifies content review gates and builds client/server bundles. `npm run test:browser` starts a separate server, SQLite file and headless Firefox profile. It checks actual pointer interactions, hot reload without losing an answer, route transitions, set completion, failure recovery, mobile layouts and administration. API responses used for exercise feedback are mocked in browser tests. `FIREFOX_BINARY` can override the browser executable. Logs, screenshots and isolated test databases go in ignored `tmp/`.

`npm run test:production` builds the compiled application, starts an isolated production server and verifies routing, server-rendered task content, metadata, hydration and CSP in Firefox. A network intercept holds the client entry until the test has measured the visible server-rendered listening workspace, then checks its geometry after hydration.

For the compiled app, run `npm run build`, followed by `npm start`. Production code uses the compiled React Router server and fingerprinted client assets. Both modes send no-store cache headers; the production document has a nonce-based script policy. Vite's development file access excludes project secrets, private references, server files and databases. Type checking covers the migrated app, but `noImplicitAny` and `strictNullChecks` are not enabled yet. Tightening those is a remaining engineering task.

## Server rendering and saved state

The route loader resolves the exercise or set before rendering. Skill catalogues use level paths such as `/a2/reading`; that explicit level overrides cookies and restored local settings. Unqualified old links redirect to the saved level, defaulting to A2. See [SEO decisions](seo-2026-09-10.md) for canonical paths and launch work. The server sends the actual question, reading passage, audio controls or open-task brief with the navigation. Initial React state matches that response; browser storage is restored after hydration starts. A pre-paint script resolves the System theme, and CSS chooses the desktop or mobile navigation without a JavaScript layout switch.

The `inburgering_preferences` cookie contains only level, language, theme and timer preference. `inburgering_position` contains the active public set ID and question index. Both use SameSite=Lax, a one-year expiry and validation on read. No learner identifier, answer, draft or score is included. The first visit from the older version copies existing preferences into the cookie; subsequent server renders can use them. Restored drafts, checked answers and completed results can change the visible view during hydration because that state stays in browser storage.

Exercise and set pages expose unique titles, descriptions and canonical URLs. The sitemap includes currently available published exercises and stable practice sets; archived content is excluded. Private progress/session pages use noindex, and robots.txt excludes administration and API paths. These measures follow [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). Search engines cannot access this loopback-only development server.

## Data and review

`server/store.ts` uses Node's built-in SQLite API. It opens `var/reports.sqlite3`, enables WAL and applies idempotent migrations. `INBURGERING_DB` overrides the path. The existing report table and receipt IDs survive migration. Reviewed `content/catalogue.json` seeds published exercises; an updated reviewed import replaces its published copy while preserving any admin draft. Stable practice sets are seeded separately. Admin drafts never enter learner practice automatically.

Tables hold exercises, stable sets, reports, exercise history, daily service counts with token totals, and anonymous learning events (schema migration 2). Each exercise has an integer edit version for optimistic concurrency. Saving or archiving with a stale version returns 409. Reports retain the content revision and optional question ID. Archiving removes an exercise from practice and filters its set membership; restoring brings it back. It preserves reports, history and the published payload. Permanent exercise deletion is deliberately absent from the API.

`npm run db:backup` uses SQLite's online backup API to create a timestamped file in `var/backups/`. It reads the existing database without running migrations. Backups can be taken while the server is running. For a restore, stop the server, preserve the current database plus WAL/SHM files, and restore the chosen backup as `var/reports.sqlite3` before restarting. Keep backups private; report notes may contain personal information.

`npm run content:verify` checks source hashes, editorial verdicts, exact question evidence, content revisions, sentence-starter coverage and stable set membership. It does not rewrite the catalogue. `npm run content:integrate` writes reviewed changes after those checks pass. The original catalogue bytes are retained when values are unchanged, preserving the existing hint review hash. New content must include updated independent reviews and hint/catalogue hashes before integration. The JSON admin editor supplies a place to draft and revise; publication still goes through this editorial gate.

Learner answers, progress and drafts remain in local browser storage. The database stores daily service request counts, failures and summed response times, without learner IDs, answers or audio. Those counters include cache hits and validation failures. Feedback and transcription cache results in memory for at most 30 minutes. Switching interface language uses the same canonical feedback decisions. The TypeScript port retains GPT-5.4 nano, the existing rubric, structured-output validation and ElevenLabs Scribe v2.

## Operations and API

Open `/ops` for the operator panel. It requires a login: `npm run admin:password -- <user>` stores a scrypt hash in `var/admin-credentials.json` (mode 600), or `INBURGERING_ADMIN_USER` plus `INBURGERING_ADMIN_PASSWORD` in the environment serve local development and the browser tests. A successful login sets a signed HttpOnly SameSite=Strict cookie valid for twelve hours; five failed attempts per address pause logins for fifteen minutes; Sign out clears the cookie. Writes still require an exact Origin and a CSRF value equal to the session cookie. The server binds to loopback and rejects other hosts and cross-site requests; `/ops`, `/ops/login` and `/api/ops` answer with `X-Robots-Tag: noindex, nofollow, noarchive`, robots.txt disallows `/ops`, the sitemap never lists it, and the former `/admin` path is a 404. Operator roles are still a single account.

The overview aggregates anonymous learning events (`events` table): unique and returning visitors, learners, answers and accuracy per day, subject and level, service requests and failures per day, interface language and level split, the hardest questions with their most-chosen wrong option, and the most practised exercises, for 7, 30 or 90 days. Exercises lists usage per exercise; the editor shows a per-question option breakdown and the exercise's reports. Services reads the ElevenLabs subscription live (cached five minutes) and shows OpenAI token usage from this server's counters; OpenAI exposes no balance to a project key, so daily organisation costs appear only when `OPENAI_ADMIN_KEY` is set. `INBURGERING_OFFLINE=1` skips provider balance reads (the browser tests set it). Charts are Apache ECharts, loaded on demand in the browser, with a palette validated for colour-vision deficiency in light and dark mode.

Learners post events to `POST /api/events` as `{visitor, events}`: a random 32-hex browser id from local storage (hashed with the admin secret before storage) and up to 50 events of kind `visit` (lang, level), `answer` (item, question, selected, mode) or `review` (item, mode ai|self). Correctness is decided on the server from the answer key; unknown items, questions or options are dropped. Feedback and transcription requests may include `visitor` so their service events count per exercise. Events never carry answer text.

For local automation, sign in with `POST /ops/login` (form fields `user`, `password`), keep the cookie, then GET `/api/ops/exercises`, `/api/ops/reports` or `/api/ops/stats`. The response contains `{data, csrf}`. Send `X-CSRF-Token`, `Origin: http://127.0.0.1:8766` and `Content-Type: application/json` on writes. Encode exercise IDs as a single URL segment.

| Method and path | JSON body | Effect |
| --- | --- | --- |
| GET `/api/ops/exercises/:id` | none | Published/draft payload, version and archive state |
| POST `/api/ops/exercises` | `{exercise}` | Create an unpublished draft with a new stable ID |
| PUT `/api/ops/exercises/:id` | `{exercise, version}` | Save a draft without changing its ID |
| DELETE `/api/ops/exercises/:id` | `{version}` | Archive the exercise |
| PATCH `/api/ops/exercises/:id` | `{archived:false, version}` | Restore the exercise |
| PATCH `/api/ops/reports/:id` | `{status:"resolved"}` or `{status:"open"}` | Update the report queue |

Study endpoints remain `/api/status`, `/api/feedback`, `/api/transcribe`, `/api/reports` and `/api/events`. Provider requests run only on the server; keys are loaded from the existing authorized credential path or environment variables. No provider key is bundled into the client. Synthetic live smoke checks are separate from the automated suite, so routine tests do not spend provider credits.

## Verification on 10 September 2026

Type checking, all 36 Node tests and production compilation pass. The isolated Firefox development suite passes 65 checks; the compiled-app suite passes 25 more, including nonce coverage for every streamed inline script and actual hydration. The hot-reload check edits a component and confirms that the typed answer and window state survive. Desktop, 390px and 320px layouts were inspected.

A live synthetic feedback request completed in 3.46 seconds with three criteria and a suggested answer. Transcribing an existing generated Dutch clip of 12.45 seconds took 1.07 seconds. Repeating the feedback request in Dutch and English reused matching canonical decisions. These are smoke measurements, not a latency benchmark.

The former Python process on port 8766 was replaced by the TypeScript development server. The SQLite backup passed its integrity check; comparing the existing report rows before and after migration confirmed unchanged data. All 77 reviewed exercises loaded. Browser progress was kept on the same origin. No site was published.
