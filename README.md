# assets

Large generated files kept off `main`: the mascot packs (`mascots/packs/*.zip`), built from the concept sheet by
`tools/mascots-pack.cjs` on `main`. The Pages build copies them to https://snailedlt.github.io/nucleuscoop-handler-testbench/mascots/packs/.
Rebuild and replace (this branch keeps no history):

    node tools/mascots-pack.cjs
    # then commit design/mascots/packs/*.zip here as mascots/packs/ and force-push
