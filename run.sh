#!/usr/bin/env bash
# Run handlers through the harness: load exactly like Nucleus, then Game.Play per player.
#
#   ./run.sh --verified                 all Hub handlers admitted by tools/fetch_verified.py
#   ./run.sh --verified <id>-v<N>.js    specific admitted Hub handlers
#   ./run.sh --own path/to/MyGame.js    handlers YOU wrote (never Hub downloads)
#   add --verbose to print the recorded Context/ProtoInput calls
#
# Safety: Hub handlers run only if listed in downloads/verified-manifest.json with a
# matching sha256 (i.e. that exact version was verified on the Hub). Handlers get .NET
# access through Jint, so nothing else from the internet is run. When available, the
# harness runs without network access (unshare -n) in a throwaway working directory.
set -euo pipefail
cd "$(dirname "$0")"
[ -f build/harness.exe ] || { echo "Run ./setup.sh first."; exit 1; }

mode=""; verbose=(); files=()
for a in "$@"; do
  case "$a" in
    --verified) mode=verified ;;
    --own) mode=own ;;
    --verbose) verbose=(--verbose) ;;
    -h|--help) sed -n 2,13p "$0"; exit 0 ;;
    *) files+=("$a") ;;
  esac
done
[ -n "$mode" ] || { echo "Choose --verified or --own (see --help)."; exit 2; }

run_list=()
if [ "$mode" = verified ]; then
  manifest=downloads/verified-manifest.json
  [ -f "$manifest" ] || { echo "No $manifest. Run: python3 -I tools/fetch_verified.py"; exit 1; }
  mapfile -t run_list < <(python3 -I - "$manifest" "${files[@]+"${files[@]}"}" <<'EOF'
import hashlib, json, os, sys
manifest, wanted = sys.argv[1], sys.argv[2:]
base = os.path.join(os.path.dirname(manifest), 'handlers')
entries = json.load(open(manifest))
names = [os.path.basename(w) for w in wanted] or [e['file'] for e in entries]
by_name = {e['file']: e for e in entries}
for n in names:
    e = by_name.get(n)
    p = os.path.join(base, n)
    if not e:
        sys.stderr.write(f'REFUSED {n}: not in the verified manifest\n'); continue
    if not os.path.isfile(p) or hashlib.sha256(open(p, 'rb').read()).hexdigest() != e['sha256']:
        sys.stderr.write(f'REFUSED {n}: file missing or changed since verification\n'); continue
    print(p)
EOF
)
else
  for f in "${files[@]+"${files[@]}"}"; do
    case "$(realpath "$f")" in
      "$(realpath downloads 2>/dev/null || echo /nonexistent)"/*) echo "REFUSED $f: Hub downloads must be run with --verified"; exit 2 ;;
    esac
    run_list+=("$f")
  done
fi
[ ${#run_list[@]} -gt 0 ] || { echo "Nothing to run."; exit 1; }

sandbox=$(mktemp -d)
trap 'rm -rf "$sandbox"' EXIT
isolate=()
# Network isolation: a new network namespace (root), or one inside an unprivileged user namespace.
if command -v unshare >/dev/null && unshare -n true 2>/dev/null; then isolate=(unshare -n)
elif command -v unshare >/dev/null && unshare -rn true 2>/dev/null; then isolate=(unshare -rn)
elif [ "${REQUIRE_ISOLATION:-}" = 1 ]; then echo "Network isolation unavailable and REQUIRE_ISOLATION=1: not running."; exit 3
else echo "(network isolation unavailable; running without it)"; fi
HOME=$sandbox TMPDIR=$sandbox "${isolate[@]}" mono build/harness.exe "${verbose[@]}" "${run_list[@]}"
