# Deployment

The site runs at <https://oefenschrift.nl/> on the Oracle free-tier VM, as a Node service behind nginx. The domain was activated on 10 September 2026. `www.oefenschrift.nl` and the former `cool-projects.duckdns.org/projects/oefenschrift/` address redirect to the primary domain, preserving the path and query. No Docker: the box has 1 GB of memory, and the app needs about 140 MB idle and 210 MB under load as a plain-node process.

## The box

`VM.Standard.E2.1.Micro` in Frankfurt, Ubuntu 24.04, 1 OCPU, 956 MB memory plus a 2 GB swap file, Node 22.22, ffmpeg (for `ffprobe`) installed for this site. Access is described in the local, uncommitted note `~/Projects/CBT-bot-server-access.md`: user `ubuntu`, key `~/Downloads/ssh 2/id_rsa`, passwordless sudo. The Outline VPN containers and Docker were stopped and disabled on 10 September; that freed about 150 MB, leaving roughly 560 MB available before this site. The CBT Telegram bot (45 MB) and Tailscale (12 MB) still run.

## Layout on the server

| Path | Contents |
| --- | --- |
| `/home/ubuntu/oefenschrift/build/` | Client assets, the server bundle and `entry.mjs`, built locally for the domain root |
| `/home/ubuntu/oefenschrift/content/`, `config/` | Reviewed catalogue, sets, hints; feedback model and voices, read at runtime |
| `/home/ubuntu/oefenschrift/node_modules/` | Production dependencies only, installed locally and synced (pure JavaScript, so the platform does not matter) |
| `/home/ubuntu/oefenschrift/.env` | Mode 600: `PORT`, `OEFENSCHRIFT_ORIGIN`, `OEFENSCHRIFT_BASE_PATH`, `OEFENSCHRIFT_TRUST_PROXY=1`, the operator account, provider keys. Never synced |
| `/home/ubuntu/oefenschrift/var/` | SQLite database, the admin secret, backups. Never synced |
| `/etc/systemd/system/oefenschrift.service` | `node --max-old-space-size=192 build/entry.mjs` as `ubuntu`, `Restart=always`, `MemoryMax=400M`, private tmp, read-only system, writable `var/` only |
| `/etc/nginx/sites-available/oefenschrift` | Primary-domain proxy to `127.0.0.1:8766`, HTTPS and www redirect; a 10 MB body limit, 90 s read timeout and response buffering disabled for streamed HTML. Source: `config/nginx/oefenschrift.conf` |
| `/etc/nginx/sites-available/driving-theory` | The other projects keep their existing locations; the former Oefenschrift path redirects to the primary domain |

The base path is baked into the bundles at build time (`OEFENSCHRIFT_BASE_PATH` → React Router `basename` and Vite `base`), and the server refuses to start when its own `OEFENSCHRIFT_BASE_PATH` differs from the build's. Everything the app writes by hand (API calls, media, icons, cookie paths, canonical URLs, the sitemap) goes through `app/domain/base.ts` or `basePath()` in `server/security.ts`; the production Firefox journey run with the variable set asserts that no server-rendered URL points at the host root.

## Deploying

```sh
npm run deploy
```

`scripts/deploy.sh` reads only `OEFENSCHRIFT_ORIGIN` and `OEFENSCHRIFT_BASE_PATH` from the server’s `.env`, type-checks, builds for that active path, installs production dependencies into `tmp/deploy/`, syncs `build/`, `content/`, `config/`, `node_modules/` and the package files with `rsync --delete`, restarts the service and waits for `/api/status` on the public address. Override `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `REMOTE_DIR`, `OEFENSCHRIFT_BASE_PATH` or `PUBLIC_URL` for a one-off. Nothing is built or installed on the server: a Vite build needs more memory than the box has.

The usual way is a push to `main` of [github.com/Evgeny-/oefenschrift](https://github.com/Evgeny-/oefenschrift): the `deploy` job in `.github/workflows/check.yml` runs the same script after the `check` and `browser` jobs pass (typecheck, unit tests, build, the Firefox journeys at the root and under the base path). It signs in with a dedicated ed25519 key that exists only as the repository secret `SSH_PRIVATE_KEY` (with `SSH_HOST` and `SSH_USER`); its public half is the `oefenschrift-deploy` line in `~/.ssh/authorized_keys` on the server, so revoking it is deleting that line. Deploys never overlap (`concurrency: deploy`), and a failed job leaves the previous version running.

Useful checks:

```sh
ssh -i "$HOME/Downloads/ssh 2/id_rsa" ubuntu@130.61.248.252 'systemctl status oefenschrift --no-pager -n 20'
ssh -i "$HOME/Downloads/ssh 2/id_rsa" ubuntu@130.61.248.252 'journalctl -u oefenschrift -n 100 --no-pager'
ssh -i "$HOME/Downloads/ssh 2/id_rsa" ubuntu@130.61.248.252 'free -m'
```

The operator account is `operator`; its generated password sits in the server's `.env` (`grep ADMIN_PASSWORD ~/oefenschrift/.env` over SSH). To replace it with a stored scrypt hash, run `npm run admin:password -- <user>` locally and copy `var/admin-credentials.json` to the server's `var/`, then remove the two `OEFENSCHRIFT_ADMIN_*` lines from `.env`.

## Domain, streaming and certificates

The service uses `OEFENSCHRIFT_ORIGIN=https://oefenschrift.nl`, an empty `OEFENSCHRIFT_BASE_PATH` and `OEFENSCHRIFT_TRUST_PROXY=1`. Canonical URLs and the sitemap use the primary origin. Both domain names have a Let's Encrypt certificate; the HTTP ACME challenge path is served from `/var/www/oefenschrift-acme`. `certbot.timer` renews the certificate and its deploy hook reloads nginx.

nginx streams app responses with `proxy_buffering off` and enables gzip for text assets, JSON and React Router’s `text/x-script` responses. Deployment checks fetch complete Dutch and English home pages, because a successful HEAD or API status response cannot detect truncated HTML. The production Firefox suite captures `securitypolicyviolation` events and checks the home pages' script nonces. When checking nginx configuration, use the installed configuration with `sudo nginx -t`: testing a reduced configuration that omits its `user www-data` directive can change the ownership of nginx's temporary directories and break active workers.

## Backups and the database

`var/reports.sqlite3` holds reports, service counters and the anonymous events; `var/admin-secret` keys the visitor hashes. There is no `sqlite3` CLI on the box and `npm run db:backup` needs `tsx`, which is not installed there, so until a scheduled backup exists copy the directory from here: `rsync -az -e 'ssh -i "$HOME/Downloads/ssh 2/id_rsa"' ubuntu@130.61.248.252:oefenschrift/var/ var-backup/` (the database is in WAL mode: copy the `-wal` and `-shm` files with it, or stop the service first for a clean copy). A nightly backup off the box is still to do.

## Activating oefenschrift.nl

Activation completed on 10 September 2026. The GoDaddy zone has `A @ 130.61.248.252` and `CNAME www oefenschrift.nl`. The pre-activation build and configuration are retained in `var/domain-backup-20260910T180428Z/` on the server. The procedure below documents the completed move; it does not need to run during normal deployment.

After both names resolve publicly to the VM, with no GitHub workflow running:

```sh
bash scripts/activate-domain.sh
```

The script checks DNS before changing anything, obtains a Let's Encrypt certificate for both names through the prepared HTTP vhost, and runs the production Firefox tests at the root. It stages that build beside the active build, backs up `.env` and both nginx vhosts into `var/domain-backup-<date>/`, and moves the app to `OEFENSCHRIFT_ORIGIN=https://oefenschrift.nl` with an empty base path. It installs `config/nginx/oefenschrift.conf` and redirects the old Oefenschrift path to the new origin, preserving the remaining path and query. The other shared-host projects keep their locations. A failed nginx check, startup or HTTPS health check restores the previous build and settings.

Future pushes automatically use the active origin and base path read from the server, so CI needs no secret changes. Certbot saves a deploy hook to reload nginx after certificate renewal. The live link and deployment documentation now use the primary address.

The domain move does not copy browser-local progress across origins; progress saved at the shared address remains in that origin's storage. The server database and operator account stay in place.
