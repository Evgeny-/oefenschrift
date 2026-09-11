#!/usr/bin/env bash
set -euo pipefail

# The running server and already-open tabs can still request previous fingerprinted
# bundles. Keep those files while copying the new build; rsync's receiver-side protect
# rule still allows new assets to arrive and obsolete files elsewhere to be removed.
rsync -az --delete --filter='protect /client/assets/***' "$@"
