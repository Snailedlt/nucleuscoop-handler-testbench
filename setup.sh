#!/usr/bin/env bash
# Builds the test harness: the exact Jint version Nucleus Co-op uses, plus C# stubs
# generated from the real Nucleus source declarations.
#
# Requires: mono (mcs), node >= 18, git, curl, unzip, python3.
set -euo pipefail
cd "$(dirname "$0")"

# Pin the Nucleus sources the stubs are generated from. Update deliberately.
NUCLEUS_REPO=${NUCLEUS_REPO:-https://github.com/SplitScreen-Me/splitscreenme-nucleus}
NUCLEUS_REF=${NUCLEUS_REF:-3d22c0e8a6dd624f08a5cce286cd594c8abf264d}
JINT_VERSION=2.11.58          # must match Master/NucleusGaming/packages.config
NEWTONSOFT_VERSION=13.0.3

for tool in mcs mono node git curl unzip python3; do
  command -v "$tool" >/dev/null || { echo "Missing $tool (on Ubuntu: apt-get install mono-complete nodejs git curl unzip python3)"; exit 1; }
done

mkdir -p work build
if [ ! -d work/nucleus/.git ]; then
  git clone --quiet --filter=blob:none "$NUCLEUS_REPO" work/nucleus
fi
git -C work/nucleus fetch --quiet --depth 1 origin "$NUCLEUS_REF" 2>/dev/null || true
git -C work/nucleus checkout --quiet "$NUCLEUS_REF"
N=work/nucleus/Master/NucleusGaming

grep -q "id=\"Jint\" version=\"$JINT_VERSION\"" "$N/packages.config" \
  || { echo "Nucleus at $NUCLEUS_REF no longer uses Jint $JINT_VERSION; update JINT_VERSION."; exit 1; }

fetch_nupkg() { # id version path-in-package
  local f="work/$1.$2.nupkg"
  [ -f "$f" ] || curl -sSfL -o "$f" "https://api.nuget.org/v3-flatcontainer/$1/$2/$1.$2.nupkg"
  unzip -o -q -j "$f" "$3" -d build
}
fetch_nupkg jint "$JINT_VERSION" lib/net451/Jint.dll
fetch_nupkg newtonsoft.json "$NEWTONSOFT_VERSION" lib/net45/Newtonsoft.Json.dll

# Real, self-contained Nucleus types, used verbatim.
rm -rf work/real && mkdir -p work/real
for f in Coop/Generic/GameHookInfo.cs Coop/Generic/DynamicAttribute.cs Coop/ProtoInput/ProtoInputOptions.cs \
         Coop/ProtoInput/ProtoInputEnumsOptions.cs Coop/Generic/Folder.cs Coop/Generic/SaveType.cs Coop/Generic/SearchType.cs \
         Coop/Generic/RegType.cs Coop/Generic/DPIHandling.cs Coop/Generic/SaveInfo.cs Coop/Generic/SaveData/IniSaveInfo.cs \
         Coop/Generic/SaveData/CfgSaveInfo.cs Coop/Generic/Hub.cs; do
  cp "$N/$f" work/real/
done
# DpiAwarenessMode lives next to Windows-only code; take just the enum.
F=$N/Tools/Hdpi/GameDpiAwareness.cs
{ grep -m1 -o 'namespace [A-Za-z.]*' "$F"; echo "{"; awk '/public enum DpiAwarenessMode/{f=1} f{print} f&&/}/{exit}' "$F"; echo "}"; } > work/real/DpiAwarenessMode.cs

# Stubs for GenericGameInfo / GenericContext / PlayerInfo / ProtoInput, generated from the real declarations.
node tools/mkstubs.mjs "$N" work

mcs -langversion:7.2 -out:build/harness.exe -r:build/Jint.dll -r:build/Newtonsoft.Json.dll -r:System.Drawing.dll \
  -nowarn:0169,0649,0414,0219,0168 \
  src/Harness.cs src/Globals.cs work/GameStub.cs work/ContextStub.cs work/PlayerStub.cs work/ProtoInputStub.cs work/real/*.cs

echo "Built build/harness.exe (Jint $JINT_VERSION, Nucleus $NUCLEUS_REF)"
