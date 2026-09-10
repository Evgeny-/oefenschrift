#!/bin/zsh
set -eu
project_directory="${0:A:h}"
cd "$project_directory"
mkdir -p tmp
if ! curl -fsS http://127.0.0.1:8766/api/status >/dev/null 2>&1; then
  nohup npm run dev >tmp/local-server.log 2>&1 &
  for attempt in {1..100}; do
    if curl -fsS http://127.0.0.1:8766/api/status >/dev/null 2>&1; then break; fi
    sleep 0.2
  done
fi
open -a Firefox http://127.0.0.1:8766/
