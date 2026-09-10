# Production hardening and abuse control

Written 10 September 2026, before any deployment. This is the launch checklist for the semi-public phase: what the current code would do wrong on a real domain, how to stop strangers from spending the OpenAI and ElevenLabs budgets through the site's own endpoints, and how the operator switches on `/ops/services` should behave so practice keeps working when a provider is off, broken or out of quota.

**Status, later on 10 September:** steps 2, 3 and 4 of the suggested order are implemented and verified (findings 1-5, 7, 9 and 10 below; the availability model, settings table, switches, breakers, daily caps, client codes and fallbacks; the prompt-injection measures in the OpenAI request; per-address and per-pass windows, the session pass, the provider semaphores; 90-day event and one-year report retention; the privacy notice and terms pages). Deployed on the shared Oracle VM later the same day ([deployment.md](deployment.md)): nginx in front with a 10 MB body limit (finding 8), a systemd unit with a memory ceiling, no Docker. Still open: the provider hard caps (Layer 0, no code), backups off the box, monitoring and alerts, `/ops` restricted at the proxy, and the legal to-do list at the end of this note. Two things learnt while implementing: React Router's own action check compares the request URL origin with the `Origin` header, so `INBURGERING_TRUST_PROXY` is mandatory behind a TLS-terminating proxy (every form post answers 400 without it); and a route component must never use a value imported from `server/`, or Vite bundles SQLite into the client and the page stops hydrating.

## What an attacker can and cannot get

The only paid endpoints are `POST /api/feedback` (OpenAI Responses, GPT-5.4 nano) and `POST /api/transcribe` (ElevenLabs Scribe v2). `POST /api/reports` and `POST /api/events` write to SQLite. `POST /ops/login` can be brute-forced. Listening audio is pre-generated and served as files; there is no text-to-speech endpoint.

The feedback endpoint is not a general-purpose model proxy. Instructions are fixed on the server, the prompt must be a catalogue writing or speaking task, the answer is capped at 3,000 characters, the response is a strict JSON schema and at most 1,800 output tokens ([server/services.ts:304-333](../../server/services.ts#L304)). Someone who copies the request from the browser's network tab gets grading of Dutch exam answers and nothing else. Transcription is more attractive: up to two minutes of Dutch audio, free ([server/services.ts:553-594](../../server/services.ts#L553)).

So the realistic abuse is cost and lock-out, not stolen compute:

| Call | Approximate cost | Source |
| --- | --- | --- |
| One feedback request | ≈ $0.0006 (about 1,000 input, 350 output tokens at $0.20 / $1.25 per million) | [feedback-latency.md](feedback-latency.md) |
| One transcription, two-minute clip | ≈ $0.0073 ($0.22 per audio hour) | [service-plan.md](service-plan.md) |

Today's single global limiter of 30 paid calls per minute ([app/routes/api.ts:71](../../app/routes/api.ts)) already bounds the worst-case bill at roughly 43,000 calls a day (≈ $26 of feedback or ≈ $315 of transcription). The bigger problem is that the same limiter is shared by everyone, so one script running from one laptop locks every learner out of feedback, transcription and reporting for as long as it runs. The keys themselves are safe: they never leave the server and the client only learns `true`/`false` per service.

## Findings in the current code that block a public launch

These are not abuse questions; the site would simply not work, or would be trivially bypassed, on a real domain.

| # | Finding | Where | Effect on a real domain | Fix |
| --- | --- | --- | --- | --- |
| 1 | Host allowlist is `127.0.0.1:port` and `localhost:port` only | [server/index.ts:15-16](../../server/index.ts) | Every request answers `403 Host rejected` | Read the public origin from `INBURGERING_ORIGIN` (for example `https://oefenschrift.nl`), allow that host plus the loopback ones in development |
| 2 | Any request with `Sec-Fetch-Site: cross-site` is rejected | [server/index.ts:19](../../server/index.ts), [server/security.ts:11](../../server/security.ts) | Browsers send exactly that header on a top-level navigation from another site: a click from Google, WhatsApp or a forum returns 403. The site would be reachable only by typing the address | Allow `Sec-Fetch-Mode: navigate` GET/HEAD requests; keep rejecting cross-site for everything else (API, forms) |
| 3 | `assertLocal` requires the hostname to be loopback | [server/security.ts:5-8](../../server/security.ts), used by every `/api` and `/ops` loader | Same as 1, at route level | Replace with `assertOrigin` that compares against the configured origin |
| 4 | Origin checks compare against the origin derived from the request | [app/routes/api.ts:34](../../app/routes/api.ts), [server/security.ts:9](../../server/security.ts), [server/security.ts:160](../../server/security.ts#L160) | Behind a reverse proxy the app sees `http://…` while the browser sends `Origin: https://…`; every POST fails. Canonical URLs and the sitemap also come out as `http://` | `app.set('trust proxy', 1)` in Express so `X-Forwarded-Proto` is honoured, and compare against `INBURGERING_ORIGIN` rather than the request |
| 5 | Login throttle keys on the first value of `X-Forwarded-For` | [app/routes/admin-login.tsx:27](../../app/routes/admin-login.tsx) | Proxies append the real address to whatever the client sent, so the first value is attacker-chosen: unlimited password guesses by rotating the header | Take the client address from Express (`req.ip` with `trust proxy` set to the number of proxies in front) and hand it to loaders through `getLoadContext` |
| 6 | One in-memory bucket for reports, feedback and transcription; nothing per client | [app/routes/api.ts:10-17](../../app/routes/api.ts), [app/routes/api.ts:71](../../app/routes/api.ts) | Trivial lock-out (see above); reports spam blocks feedback | Per-address and per-session buckets, one per endpoint (design below) |
| 7 | Operator cookie is not `Secure` | [server/security.ts:63-65](../../server/security.ts) | Session token would travel over plain HTTP if anything ever downgrades | Add `Secure` when the configured origin is `https:`, keep `HttpOnly; SameSite=Strict` |
| 8 | The whole request body is buffered before the size check | [app/routes/api.ts:41-49](../../app/routes/api.ts) | A chunked upload without `Content-Length` is read fully into memory before `text.length` is compared; a few parallel 500 MB uploads exhaust the process | Enforce the body limit at the proxy (`request_body max_size 10MB` in Caddy, `client_max_body_size` in nginx) and count bytes while reading in the app |
| 9 | No cap on concurrent provider calls | [server/services.ts:319](../../server/services.ts), [server/services.ts:581](../../server/services.ts) | Thirty transcriptions a minute each holding a 60 s upstream request keep many sockets and temp files open; also the fastest way to run into provider 429s | Semaphore per provider (proposal: 6 feedback, 3 transcriptions in flight), queue for a few seconds, then `503 busy` |
| 10 | `Cache-Control: no-store` is set before `express.static` | [server/index.ts:25](../../server/index.ts), [server/index.ts:58](../../server/index.ts) | Fingerprinted scripts, fonts and every listening clip are re-downloaded on each page view | Keep `no-store` for HTML and `/api`; `public, max-age=31536000, immutable` for `/assets/` and `/audio/` |

Item 2 is worth testing explicitly after the fix: open the site from a link in another site or app in Firefox and Safari, not only by typing the address.

## Layered abuse control

The goal is not to make the endpoints unreachable (anyone who can load the page can call them) but to make the worst case equal to a number you chose, not to your credit card. Each layer catches what the previous one lets through.

### Layer 0: hard caps at the providers

This is the only layer that holds when everything else has a bug. Do it first; it takes fifteen minutes.

- OpenAI: create a **project** for the site with its own key, restrict the key to model requests only, and set the project's **monthly budget as a hard limit** plus an alert at half. Use a *different* key for `scripts/` (evaluation, hints, illustrations) so either can be revoked without the other.
- ElevenLabs: create a key **restricted to speech-to-text** and, if the plan offers it, a per-key credit limit; turn off usage-based billing/overage so the plan quota is a wall, not a threshold. The `/ops/services` page already reads the remaining characters live.
- Rotate both keys at launch: the current ones have lived in a `.env` on a laptop. Put the new ones only on the server.

### Layer 1: the edge

- HTTPS with HSTS. Caddy in front of the Node process gives automatic certificates in three lines; nginx works too. The app keeps binding to `127.0.0.1:8766` ([server/index.ts:67](../../server/index.ts)), which is right: only the proxy is public.
- The proxy sets the real client address (`X-Forwarded-For`, `X-Forwarded-Proto`) and the app trusts exactly one hop. If Cloudflare is added later, trust `CF-Connecting-IP` only from Cloudflare's published ranges.
- Body limits at the proxy: 10 MB on `/api/transcribe`, 64 KB on everything else under `/api`, 8 KB elsewhere.
- Connection-level rate limits at the proxy as a blunt first filter (Caddy `rate_limit` or nginx `limit_req`): for example 60 requests a minute per address on `/api/*`, 10 a minute on `/ops/login`. These are cheap and run before Node does any work.
- **Hide `/ops` from the internet.** The panel is one account with a password; the strongest cheap protection is to not expose it: allow only your own addresses or a VPN (Tailscale) at the proxy, or at least an extra HTTP basic auth in front of `/ops` and `/api/ops`. Everything the panel already does (noindex, robots, hidden path) stays.
- Security headers the app does not set yet: `Strict-Transport-Security` (at the proxy), `Permissions-Policy: microphone=(self), camera=(), geolocation=()` (the recorder uses the microphone; everything else should be denied). The existing CSP, `frame-ancestors 'none'`, `nosniff` and `Referrer-Policy: no-referrer` are fine.

### Layer 2: per-address limits in the app

Replace the global list in [app/routes/api.ts](../../app/routes/api.ts) with buckets keyed by client address (IPv4 address, or the /64 prefix for IPv6, since one household gets a whole /64) and by endpoint. Proposal:

| Endpoint | Per minute | Per hour | Per day | Why |
| --- | --- | --- | --- | --- |
| `/api/feedback` | 6 | 40 | 150 | Ten learners behind one school or asylum-centre address each doing fifteen tasks still fit |
| `/api/transcribe` | 4 | 30 | 100 | The expensive one; a real learner records once per task |
| `/api/reports` | 2 | 5 | 10 | Free text into the database; nobody reports ten questions an hour |
| `/api/events` | 20 | 300 | 2,000 | Batches of up to 50 events; a session sends one every few seconds at most |
| `/ops/login` | — | 5 per 15 minutes (existing) plus 50 per 15 minutes across all addresses | — | The global ceiling defends against distributed guessing |

A limited request answers `429` with `Retry-After` and a machine-readable `code` (see the client section). The buckets live in memory (one process; fine for a single VM) with an hourly sweep; if the app ever runs as several processes they move to a small SQLite table.

Per-address limits alone are not enough for this audience: many learners share one public address (language schools, libraries, asylum-seeker centres, mobile carriers). That is why the next layer keys on the browser as well.

### Layer 3: a signed session pass per browser

This is the "browser token" idea. The server issues an HttpOnly cookie on the first HTML response of a visit:

```
inburgering_pass = pass.<issued-ms>.<16 random bytes hex>.<HMAC-SHA256 with the server secret>
Path=/; HttpOnly; SameSite=Strict; Secure (when the origin is https); Max-Age=24h
```

It reuses the signing already used for operator sessions ([server/security.ts:32-56](../../server/security.ts#L32)). The pass is renewed when older than twelve hours, carries no learner data, and is not tied to the address (mobile addresses change). Every paid call requires a valid pass, the exact `Origin` (already checked) and a same-origin fetch (`Sec-Fetch-Site: same-origin`, which browsers add automatically). A pass that is missing or expired answers `403 pass_required`; the client fetches `/api/status`, which issues one, and retries once.

Allowances are counted per pass id, in memory, next to the address buckets:

| Per pass | Per minute | Per day |
| --- | --- | --- |
| Feedback | 3 (the interface never sends two at once) | 30 |
| Transcription | 2 | 20 |
| Reports | 1 | 10 |
| Events | 10 | 500 |

Thirty feedback requests a day is more than a diligent learner uses: the catalogue has 36 open tasks and most get one or two attempts. When a pass reaches its allowance the answer is `429 allowance_exhausted`, the interface switches that task to self-review for the rest of the day, and the text says so honestly ("Je hebt vandaag alle AI-beoordelingen gebruikt; zelf nakijken kan altijd."). Optionally show the remaining count when it drops under five.

What this buys: a copied `curl` command stops working without first loading a page; each browser has a small budget regardless of how many addresses it uses; each address has a ceiling regardless of how many browsers it fakes; clearing cookies to get a fresh pass still runs into the address limit. Someone who scripts page loads, cookie jars and proxies can still spend up to the address limit per proxy, which is why Layer 4 exists.

### Layer 4: server-side daily caps and concurrency

The `service_stats` table already counts calls per day per service ([server/store.ts:259-293](../../server/store.ts#L259)). A daily cap is therefore a comparison, not new bookkeeping:

- `feedback_daily_cap` (proposal: 2,000 calls ≈ $1.20) and `speech_daily_cap` (proposal: 600 calls, ≈ $4.40 at the two-minute maximum, realistically a third of that).
- Defaults from `.env`, overridable on `/ops/services`. When a cap is reached the service reports itself unavailable until midnight UTC, the client falls back to self-review or typing, and the overview shows "cap reached at 14:32".
- With these numbers the worst month is about $170 in feedback and transcription together before Layer 0 stops it; pick numbers you are comfortable losing to a determined script, and raise them when real usage is known.
- Concurrency semaphores per provider (Layer 1 table, item 9). Beyond the queue, `503 busy` with a short retry hint; the learner keeps the answer and retries.

### Layer 5: circuit breakers

A provider that is down, rate-limiting us or rejecting the key must not make every learner wait 45-60 seconds for a timeout. Per service:

- Count consecutive upstream failures (network error, 5xx, 429). Five in a row open the breaker for five minutes; requests during that window answer `503 provider_paused` immediately.
- A `401`, `402` or `403` from the provider means the key was revoked or the quota is exhausted: open for thirty minutes and flag it on `/ops` so you see it.
- Half-open: after the window, one real request is let through; success closes the breaker, failure re-opens it.
- The breaker state is part of the availability model below, so the interface stops offering AI feedback while it is open instead of failing per request.

### Later, only if abuse shows up

- **Task tokens**: a one-time signed token issued when a speaking or writing task is opened, consumed by the paid call, bound to that exercise id, valid for an hour with three attempts. It binds each paid call to a real task view and stops replaying one recorded request with varied answers. Cheap to add on top of the pass; not needed on day one because caches already make identical replays free and the allowances bound varied ones.
- **Cloudflare Turnstile** on the first paid call of a pass when the address is above a soft threshold.
- **Accounts** with a per-user allowance; the service plan keeps registration optional and this note does not change that.

## Service switches on `/ops/services` with graceful degradation

### Availability model

Replace the two `!!keys().X` checks ([app/routes/api.ts:23-24](../../app/routes/api.ts#L23), [app/routes/study.tsx:60-61](../../app/routes/study.tsx)) with one function used by both the status endpoint and the server render:

```
available(service) = configured (key present)
                  && enabled (operator switch, stored in SQLite)
                  && !breaker.open
                  && callsToday < dailyCap
```

`/api/status` and the loader return `feedback`/`speech` as booleans exactly as today, so the existing client fallbacks keep working: without `feedback` the button is already "Zelf nakijken" ([app/components/OpenExercise.tsx:305-321](../../app/components/OpenExercise.tsx)), without `speech` the recorder already says "type your answer" ([app/components/SpeakingRecorder.tsx:60-69](../../app/components/SpeakingRecorder.tsx)). The API refuses with `503` and a code whenever `available()` is false, regardless of cache, so a switched-off service is off.

### Storage

A `settings` table (`key TEXT PRIMARY KEY, value TEXT, updated_at TEXT`) as schema migration 3 in [server/store.ts](../../server/store.ts), with `setting(key)` / `setSetting(key, value)`. Keys: `feedback_enabled`, `speech_enabled` (default on), `feedback_daily_cap`, `speech_daily_cap` (default from `.env`). Switches survive a restart. Breaker state stays in memory; a restart closes it, which is the behaviour you want after fixing something.

### The page

Two cards on `/ops/services`, one per provider, each with:

- a switch **On / Off** (a form post to a new action on the page, with the existing CSRF and Origin checks from [server/security.ts:157-163](../../server/security.ts#L157));
- the state line: *Configured · On · 412 of 2,000 calls today* or *Paused automatically: 5 provider errors, resumes in 3 min* or *Cap reached at 14:32, resumes at midnight* or *No key configured* (switch disabled);
- a **Resume now** button that closes an open breaker;
- the daily cap as a number field.

The overview page gets a one-line banner when either service is off, paused or capped, so you notice without opening Services.

### What the learner sees

Every refusal from the API carries `{ error, code, retryAfter? }`. Today the client ignores the server message and shows one generic sentence ([app/components/OpenExercise.tsx:175-184](../../app/components/OpenExercise.tsx)); with codes it can react:

| Code | Status | Interface |
| --- | --- | --- |
| `feedback_off`, `feedback_paused`, `feedback_cap` | 503 | Mark feedback unavailable in the app state; the button becomes "Zelf nakijken" for the rest of the session; text: "AI-feedback is nu niet beschikbaar. Kijk je antwoord zelf na." / "AI feedback is unavailable right now. Review your answer yourself." |
| `speech_off`, `speech_paused`, `speech_cap` | 503 | Recorder keeps the recording, opens the text field, says "Spraakherkenning is nu niet beschikbaar. Typ je antwoord." |
| `provider_failed` (upstream error after retries) | 502 | Same as paused for this attempt; the answer stays in the draft, retry allowed |
| `busy` | 503 | "Het is druk. Probeer het over een minuut opnieuw." with the button still active |
| `rate_limited` | 429 | "Even wachten · 40 s" counting down from `retryAfter` |
| `allowance_exhausted` | 429 | Self-review offered; honest text about today's allowance |
| `pass_required` | 403 | Silent: fetch `/api/status`, retry once |

The rule the user asked for holds in every row: practice continues, the draft is never lost, and self-review is always available. The client also re-fetches `/api/status` after any 503 and when the tab becomes visible again, so a service that comes back is offered again without a reload.

### Tests

- Unit: address and pass buckets with an injected clock; breaker open, half-open, close; `available()` for every combination of key, switch, breaker and cap; pass issue and verify (expiry, bad signature).
- Integration ([tests/infrastructure.test.ts](../../tests/infrastructure.test.ts)): a switched-off service answers 503 with the code and records no provider call; a capped service the same; the ops action needs the CSRF value.
- Browser ([tests/browser/](../../tests/browser/)): switch feedback off in `/ops`, open a writing task, see "Zelf nakijken" and finish the task; switch it back on and see "Laat nakijken" again; start a request, turn the service off while it runs, see the fallback without losing the draft.
- Production journey: the same rejection of cross-site fetches, and a top-level navigation with `Sec-Fetch-Site: cross-site` that succeeds (item 2).

## Deployment shape

One small VM is enough for this phase (the whole app is one Node process and one SQLite file):

- `systemd` unit running `npm start` as an unprivileged user with `Restart=always`, `NODE_ENV=production`, `Environment` from a root-owned `.env` (mode 600), `ProtectSystem=strict` with `var/` and `tmp` writable, a memory limit.
- Caddy (or nginx) as the only public listener: HTTPS, HSTS, proxy headers, body limits, rate limits, `/ops` allowlist.
- New variables in [.env.example](../../.env.example): `INBURGERING_ORIGIN`, `INBURGERING_TRUST_PROXY` (number of hops, default 0), `INBURGERING_FEEDBACK_DAILY_CAP`, `INBURGERING_SPEECH_DAILY_CAP`.
- Backups: `npm run db:backup` nightly from cron, copied off the machine (rclone to an object store or a second host), rotate thirty days, and **restore one backup once** before launch to know the procedure works. `var/admin-secret` and `var/admin-credentials.json` belong in the same backup.
- Logs: journald with a size cap. The app logs failure reasons and never learner text ([server/services.ts:385](../../server/services.ts#L385)); keep it that way. Add one aggregate line per hour with the count of 429s per endpoint so abuse is visible in the log, without addresses.
- Monitoring: an external uptime check on `/` and `/api/status`; the `/ops` overview already shows requests, failures and token counts per day and the live ElevenLabs balance. Add an e-mail or a simple webhook when a breaker opens or a daily cap is hit, otherwise you only find out on the next visit.
- After deploy: run the production Firefox journey ([tests/browser/production.mjs](../../tests/browser/production.mjs)) against the real domain once, plus one real feedback and one real transcription from a phone on mobile data.

## Not security, still before launch

- Privacy page: name OpenAI and ElevenLabs as processors, what is sent (the answer text; the recording), the 30-minute in-memory cache, that recordings are not stored, the events table, and how to ask for deletion. The recorder's information icon already explains the upload before the first recording; keep that.
- Operator identity and a contact address on the site (the `creator` fields in `content/site.json` are empty).
- `npm audit` and a dependency check in CI; the versions are pinned already.
- Retention: delete raw learner events older than 90 days (the analytics never look further back) and resolved reports older than a year; a nightly job.

## Suggested order

1. **Provider caps and key rotation** (Layer 0). No code.
2. **Launch blockers 1-5 and 7**: configured origin, `Sec-Fetch` rule, `trust proxy`, address from context, `Secure` cookie. Half a day, mostly in [server/index.ts](../../server/index.ts) and [server/security.ts](../../server/security.ts); the Firefox journeys and [tests/browser/run.ts](../../tests/browser/run.ts) keep running on loopback with `INBURGERING_ORIGIN` unset.
3. **Availability model, settings table, switches on `/ops/services`, client error codes and fallbacks**. One day. New `server/availability.ts` and `server/limits.ts` keep [server/services.ts](../../server/services.ts) under the 1,200-line limit.
4. **Per-address buckets, session pass, per-pass allowances, daily caps, concurrency, breakers**. One day, mostly in `server/limits.ts` and [app/routes/api.ts](../../app/routes/api.ts).
5. **Body limits at the proxy, static caching, deployment unit, backups, monitoring, privacy text**. Half a day plus the hosting setup.

Steps 2-4 can go in one branch with the tests above; after that the site can take real traffic with a known worst-case bill.

## Legal and privacy to-do before launch

Pages exist now: `/privacy` (controller, processing per feature, cookie and storage table, processors and transfers, retention, rights, AI statement) and `/terms` (unofficial, AI limits, fair use, licence, liability, Dutch law), both fed from `content/site.json`. What remains is not code:

1. **Processor agreements (GDPR art. 28):** accept OpenAI's API data processing addendum and ElevenLabs' DPA in their dashboards and keep the copies. Confirm both providers' current EU-US Data Privacy Framework status on the DPF list; the notice says "where the provider is certified and otherwise standard contractual clauses", which is true either way but should be checked once.
2. **Provider settings:** ElevenLabs training on workspace data is off (done 10 September); zero-retention is an enterprise arrangement and the notice says so. OpenAI API data is not used for training by default and may be kept up to 30 days for abuse monitoring; the notice says that too.
3. **Hosting location:** the notice deliberately does not say where the server is; if the host is outside the EU, add it to the transfers section.
4. **Register of processing activities (art. 30):** one page listing the five processings (feedback, transcription, reports, statistics, abuse counters) with purpose, basis, processors, retention. Not optional for regular processing of voice data; cheap to write from the notice.
5. **DPIA:** not required at this scale, but the audience (people in the integration process) can be vulnerable; a short written assessment of the voice path is prudent and mostly restates the notice.
6. **AI Act:** the site labels AI feedback and synthetic voices as such and states in the terms that nothing here evaluates anyone formally; that transparency is what article 50 asks. A voluntary practice aid with no institutional or legal consequence is not an Annex III "evaluation of learning outcomes" system, and the terms document that intended purpose. Keep it that way: no scores that feed into anything, no admission or certification use.
7. **Contact:** `content/site.json` carries the name and e-mail the pages show; the footer already has the contact link. A cookie banner is not needed for the cookies in the table (strictly necessary or negligible-impact under Telecommunicatiewet 11.7a); a separate cookie page is not needed either, the table in the notice covers the information duty.

