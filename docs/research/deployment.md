# Deployment

Set up on 10 September 2026. The site runs at <https://cool-projects.duckdns.org/projects/oefenschrift/> on the same Oracle free-tier VM that hosts the static projects, as a Node service behind the existing nginx. No Docker: the box has 1 GB of memory, and the app needs about 140 MB idle and 210 MB under load as a plain-node process. A real domain comes later; moving is a config change (see the last section).

## The box

`VM.Standard.E2.1.Micro` in Frankfurt, Ubuntu 24.04, 1 OCPU, 956 MB memory plus a 2 GB swap file, Node 22.22, ffmpeg (for `ffprobe`) installed for this site. Access is described in the local, uncommitted note `~/Projects/CBT-bot-server-access.md`: user `ubuntu`, key `~/Downloads/ssh 2/id_rsa`, passwordless sudo. The Outline VPN containers and Docker were stopped and disabled on 10 September; that freed about 150 MB, leaving roughly 560 MB available before this site. The CBT Telegram bot (45 MB) and Tailscale (12 MB) still run.

## Layout on the server

| Path | Contents |
| --- | --- |
| `/home/ubuntu/oefenschrift/build/` | Client assets, the server bundle and `entry.mjs`, built locally for the base path |
| `/home/ubuntu/oefenschrift/content/`, `config/` | Reviewed catalogue, sets, hints; feedback model and voices, read at runtime |
| `/home/ubuntu/oefenschrift/node_modules/` | Production dependencies only, installed locally and synced (pure JavaScript, so the platform does not matter) |
| `/home/ubuntu/oefenschrift/.env` | Mode 600: `PORT`, `INBURGERING_ORIGIN`, `INBURGERING_BASE_PATH`, `INBURGERING_TRUST_PROXY=1`, the operator account, provider keys. Never synced |
| `/home/ubuntu/oefenschrift/var/` | SQLite database, the admin secret, backups. Never synced |
| `/etc/systemd/system/oefenschrift.service` | `node --max-old-space-size=192 build/entry.mjs` as `ubuntu`, `Restart=always`, `MemoryMax=400M`, private tmp, read-only system, writable `var/` only |
| `/etc/nginx/sites-available/driving-theory` | The shared vhost; `location /projects/oefenschrift/` proxies to `127.0.0.1:8766` with the real client address and scheme, a 10 MB body limit and a 90 s read timeout for feedback; a copy of the file before the change sits next to it as `.bak-<date>` |

The base path is baked into the bundles at build time (`INBURGERING_BASE_PATH` → React Router `basename` and Vite `base`), and the server refuses to start when its own `INBURGERING_BASE_PATH` differs from the build's. Everything the app writes by hand (API calls, media, icons, cookie paths, canonical URLs, the sitemap) goes through `app/domain/base.ts` or `basePath()` in `server/security.ts`; the production Firefox journey run with the variable set asserts that no server-rendered URL points at the host root.

## Deploying

```sh
npm run deploy
```

`scripts/deploy.sh` type-checks, builds for `/projects/oefenschrift`, installs production dependencies into `tmp/deploy/`, syncs `build/`, `content/`, `config/`, `node_modules/` and the package files with `rsync --delete`, restarts the service and waits for `/api/status` on the public address. Override `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `REMOTE_DIR`, `INBURGERING_BASE_PATH` or `PUBLIC_URL` for a one-off. Nothing is built or installed on the server: a Vite build needs more memory than the box has.

The usual way is a push to `main` of [github.com/Evgeny-/oefenschrift](https://github.com/Evgeny-/oefenschrift): the `deploy` job in `.github/workflows/check.yml` runs the same script after the `check` and `browser` jobs pass (typecheck, unit tests, build, the Firefox journeys at the root and under the base path). It signs in with a dedicated ed25519 key that exists only as the repository secret `SSH_PRIVATE_KEY` (with `SSH_HOST` and `SSH_USER`); its public half is the `oefenschrift-deploy` line in `~/.ssh/authorized_keys` on the server, so revoking it is deleting that line. Deploys never overlap (`concurrency: deploy`), and a failed job leaves the previous version running.

Useful checks:

```sh
ssh -i "$HOME/Downloads/ssh 2/id_rsa" ubuntu@130.61.248.252 'systemctl status oefenschrift --no-pager -n 20'
ssh -i "$HOME/Downloads/ssh 2/id_rsa" ubuntu@130.61.248.252 'journalctl -u oefenschrift -n 100 --no-pager'
ssh -i "$HOME/Downloads/ssh 2/id_rsa" ubuntu@130.61.248.252 'free -m'
```

The operator account is `operator`; its generated password sits in the server's `.env` (`grep ADMIN_PASSWORD ~/oefenschrift/.env` over SSH). To replace it with a stored scrypt hash, run `npm run admin:password -- <user>` locally and copy `var/admin-credentials.json` to the server's `var/`, then remove the two `INBURGERING_ADMIN_*` lines from `.env`.

## What the shared host means

Everything under `cool-projects.duckdns.org` is one origin, so the site shares cookies, browser storage and the microphone permission with the other projects there. Cookies are limited by `Path=/projects/oefenschrift` and the storage keys carry the `inburgering.` prefix, which keeps the projects from reading each other's state by accident, not by design. `robots.txt` only counts at the host root, which answers nothing (`return 444`), so `/projects/oefenschrift/robots.txt` documents intent and the sitemap is what to hand to a search console. HSTS is sent by the app for its own path; the certificate is the host's Let's Encrypt one, renewed by `certbot.timer`.

## Backups and the database

`var/reports.sqlite3` holds reports, service counters and the anonymous events; `var/admin-secret` keys the visitor hashes. There is no `sqlite3` CLI on the box and `npm run db:backup` needs `tsx`, which is not installed there, so until a scheduled backup exists copy the directory from here: `rsync -az -e 'ssh -i "$HOME/Downloads/ssh 2/id_rsa"' ubuntu@130.61.248.252:oefenschrift/var/ var-backup/` (the database is in WAL mode: copy the `-wal` and `-shm` files with it, or stop the service first for a clean copy). A nightly backup off the box is still to do.

## Moving to a real domain later

1. Point the domain at `130.61.248.252`, add an nginx `server` block for it with `proxy_pass http://127.0.0.1:8766` at `location /` and get a certificate (`sudo certbot --nginx -d example.nl`).
2. In the server's `.env`: `INBURGERING_ORIGIN=https://example.nl` and `INBURGERING_BASE_PATH=` (empty).
3. Deploy with `INBURGERING_BASE_PATH= npm run deploy` (the script's default is the shared path).
4. Keep the old location block for a while as `return 301 https://example.nl$request_uri` after stripping the prefix, so shared links and search results keep working.
