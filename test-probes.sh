#!/usr/bin/env bash
# Regression check of Jint/Nucleus engine behaviours that handler tooling relies on.
# Each probes/*.js isolates one behaviour; probes/expected.txt holds the reviewed results.
set -euo pipefail
cd "$(dirname "$0")"
actual=$( (./run.sh --own probes/*.js || true) | grep -E '^(OK|LOADED|LOAD-FAIL|PLAY-FAIL|ENV|HARNESS)' | sed -E 's#^([A-Z-]+) +([^ ]*/)?([^ ]+)(.*)#\1 \3\4#')
if diff <(cat probes/expected.txt) <(echo "$actual"); then
  echo "All $(echo "$actual" | wc -l) probes match."
else
  echo "Probe results changed (see diff above). Review, then update probes/expected.txt if intended."
  exit 1
fi
