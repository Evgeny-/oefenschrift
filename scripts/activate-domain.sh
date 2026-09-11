#!/usr/bin/env bash
# One-time move of the existing Oracle deployment to oefenschrift.nl.
# Run locally after DNS is published. The HTTP ACME vhost must already be installed.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
SSH_KEY="${SSH_KEY:-$HOME/Downloads/ssh 2/id_rsa}"
ssh_opts=(-i "$SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes)
target=ubuntu@130.61.248.252
remote() { ssh "${ssh_opts[@]}" "$target" "$@"; }

node --input-type=module <<'JS'
import { resolve4 } from 'node:dns/promises';
for (const name of ['oefenschrift.nl', 'www.oefenschrift.nl']) {
  const addresses = await resolve4(name).catch(() => []);
  if (!addresses.includes('130.61.248.252')) {
    console.error(`${name} is not publicly pointing to the server yet. The live site was not changed.`);
    process.exit(1);
  }
}
JS

# Avoid a competing GitHub deployment while changing the build and its base path.
if [[ -n "$(gh run list --workflow check.yml --limit 20 --json status --jq '.[] | select(.status != "completed") | .status')" ]]; then
  echo 'Wait for the active GitHub workflow to finish before moving the domain.' >&2
  exit 1
fi

remote "sudo certbot certonly --webroot -w /var/www/oefenschrift-acme --cert-name oefenschrift.nl -d oefenschrift.nl -d www.oefenschrift.nl --non-interactive --agree-tos --deploy-hook 'systemctl reload nginx'"
npm run typecheck
OEFENSCHRIFT_BASE_PATH= npm run test:production
rsync -az --delete -e "ssh -i \"$SSH_KEY\" -o IdentitiesOnly=yes -o BatchMode=yes" build/ "$target:/home/ubuntu/oefenschrift/build-domain-next/"
scp "${ssh_opts[@]}" config/nginx/oefenschrift.conf "$target:/tmp/oefenschrift-domain.conf"
ssh "${ssh_opts[@]}" "$target" 'sudo bash -s' <<'REMOTE'
set -euo pipefail
umask 077
cd /home/ubuntu/oefenschrift
backup="/home/ubuntu/oefenschrift/var/domain-backup-$(date -u +%Y%m%dT%H%M%SZ)"
mkdir "$backup"
cp -p .env "$backup/env"
cp -p /etc/nginx/sites-available/oefenschrift "$backup/nginx-domain"
cp -p /etc/nginx/sites-available/driving-theory "$backup/nginx-shared"
[[ -f build-domain-next/entry.mjs ]]

# Prepare the two settings and redirect before touching the running build.
python3 - <<'PY'
from pathlib import Path
import re
source = Path('.env').read_text()
for key, value in {'OEFENSCHRIFT_ORIGIN':'https://oefenschrift.nl', 'OEFENSCHRIFT_BASE_PATH':''}.items():
    source, count = re.subn(r'^' + key + r'=.*$', key + '=' + value, source, flags=re.M)
    if count == 0:
        source += '\n' + key + '=' + value + '\n'
Path('.env.domain-next').write_text(source)
shared = Path('/etc/nginx/sites-available/driving-theory').read_text()
shared, exact = re.subn(r'location = /projects/oefenschrift \{[^}]*\}', 'location = /projects/oefenschrift {\n        return 301 https://oefenschrift.nl/$is_args$args;\n    }', shared)
shared, prefix = re.subn(r'location /projects/oefenschrift/ \{[^}]*\}', 'location /projects/oefenschrift/ {\n        rewrite ^/projects/oefenschrift/(.*)$ https://oefenschrift.nl/$1 permanent;\n    }', shared)
if exact != 1 or prefix != 1:
    raise SystemExit('Shared nginx configuration changed; review its Oefenschrift locations first.')
Path('/tmp/oefenschrift-shared-next.conf').write_text(shared)
PY
chown ubuntu:ubuntu .env.domain-next
chmod 600 .env.domain-next

rollback() {
    trap - ERR
    set +e
    cp -p "$backup/env" .env
    if [[ -d "$backup/build" ]]; then
        mv build "$backup/build-failed"
        mv "$backup/build" build
    fi
    cp -p "$backup/nginx-domain" /etc/nginx/sites-available/oefenschrift
    cp -p "$backup/nginx-shared" /etc/nginx/sites-available/driving-theory
    systemctl restart oefenschrift
    nginx -t && systemctl reload nginx
    echo "Domain activation failed; restored the previous site. Backup: $backup" >&2
    exit 1
}
trap rollback ERR
mv build "$backup/build"
mv build-domain-next build
mv .env.domain-next .env
install -m 644 /tmp/oefenschrift-domain.conf /etc/nginx/sites-available/oefenschrift
install -m 644 /tmp/oefenschrift-shared-next.conf /etc/nginx/sites-available/driving-theory
nginx -t
systemctl restart oefenschrift
ready=0
for attempt in $(seq 1 30); do
    if curl -fsS --max-time 5 -H 'Host: oefenschrift.nl' -H 'X-Forwarded-Proto: https' http://127.0.0.1:8766/api/status >/dev/null 2>&1; then ready=1; break; fi
    sleep 1
 done
[[ "$ready" == 1 ]]
systemctl reload nginx
# Reload signals nginx asynchronously; wait for workers using the new certificate.
ready=0
for attempt in $(seq 1 30); do
    if curl -fsS --max-time 5 --resolve oefenschrift.nl:443:127.0.0.1 https://oefenschrift.nl/api/status >/dev/null 2>&1; then ready=1; break; fi
    sleep 1
done
[[ "$ready" == 1 ]]
curl -fsS --max-time 20 --resolve oefenschrift.nl:443:127.0.0.1 https://oefenschrift.nl/en >/dev/null
trap - ERR
printf 'Domain active. Previous build and configuration: %s\n' "$backup"
REMOTE
# DNS was verified above; bypass a stale OS resolver cache for these final probes.
curl -fsS --max-time 20 --resolve oefenschrift.nl:443:130.61.248.252 https://oefenschrift.nl/ >/dev/null
curl -fsS --max-time 20 --resolve oefenschrift.nl:443:130.61.248.252 https://oefenschrift.nl/api/status
printf '\nActivated https://oefenschrift.nl. Future deploys read this address from the server.\n'
