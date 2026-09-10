#!/usr/bin/env bash
# Builds the site for its public path and puts it on the server, which never builds or
# runs npm itself: the compiled app, the reviewed content, the runtime configuration and a
# production-only node_modules go over rsync, then the service restarts and the public
# address is checked. The server keeps its own .env and var/ (database, secret, account).
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

SSH_HOST="${SSH_HOST:-130.61.248.252}"
SSH_USER="${SSH_USER:-ubuntu}"
SSH_KEY="${SSH_KEY:-$HOME/Downloads/ssh 2/id_rsa}"
REMOTE_DIR="${REMOTE_DIR:-/home/ubuntu/oefenschrift}"
SERVICE="${SERVICE:-oefenschrift}"
[[ -f "$SSH_KEY" ]] || { echo "SSH key not found: $SSH_KEY" >&2; exit 1; }
ssh_opts=(-i "$SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes)
target="${SSH_USER}@${SSH_HOST}"
remote() { ssh "${ssh_opts[@]}" "$target" "$@"; }

# Follow the server's active address so a domain move also applies to future CI deploys.
# Read only these public settings; provider keys and operator credentials stay on the server.
location_json=$(remote "cd '$REMOTE_DIR' && node --env-file=.env -e 'console.log(JSON.stringify({origin:process.env.INBURGERING_ORIGIN,base:process.env.INBURGERING_BASE_PATH||\"\"}))'")
configured_base=$(node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).base' <<< "$location_json")
configured_origin=$(node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).origin' <<< "$location_json")
[[ "$configured_origin" == https://* ]] || { echo "The server needs an HTTPS INBURGERING_ORIGIN" >&2; exit 1; }
export INBURGERING_BASE_PATH="${INBURGERING_BASE_PATH-$configured_base}"
PUBLIC_URL="${PUBLIC_URL:-${configured_origin}${INBURGERING_BASE_PATH}/}"

echo "Checking types and building for ${INBURGERING_BASE_PATH}..."
npm run typecheck
npm run build

echo "Installing production dependencies locally (pure JavaScript, so they run unchanged on the server)..."
stage=tmp/deploy
rm -rf "$stage" && mkdir -p "$stage"
cp package.json package-lock.json "$stage/"
(cd "$stage" && npm ci --omit=dev --ignore-scripts --no-audit --no-fund --loglevel=error)

echo "Preparing ${target}:${REMOTE_DIR}..."
remote "mkdir -p '$REMOTE_DIR/var' && test -f '$REMOTE_DIR/.env' || echo 'No .env on the server yet; see docs/research/deployment.md'"

echo "Syncing..."
sync() { rsync -az --delete -e "ssh -i \"$SSH_KEY\" -o IdentitiesOnly=yes -o BatchMode=yes" "$@"; }
sync build/ "$target:$REMOTE_DIR/build/"
sync content/ "$target:$REMOTE_DIR/content/"
sync config/ "$target:$REMOTE_DIR/config/"
sync "$stage/node_modules/" "$target:$REMOTE_DIR/node_modules/"
sync package.json package-lock.json "$target:$REMOTE_DIR/"

echo "Restarting ${SERVICE}..."
remote "sudo systemctl restart '$SERVICE' && systemctl is-active '$SERVICE'"

echo "Waiting for ${PUBLIC_URL}..."
for attempt in $(seq 1 30); do
  if curl -fsS --max-time 10 "${PUBLIC_URL}api/status" >/dev/null 2>&1; then break; fi
  [[ $attempt -eq 30 ]] && { echo "The site did not answer within 30 s; see: ssh ... 'journalctl -u $SERVICE -n 50'" >&2; exit 1; }
  sleep 1
done
curl -fsSIL --max-time 30 "$PUBLIC_URL" | head -1
curl -fsS --max-time 30 "${PUBLIC_URL}api/status"
echo
echo "Deployed: $PUBLIC_URL"
