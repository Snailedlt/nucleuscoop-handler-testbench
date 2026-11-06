# assets

Large generated files kept off `main`: the mascot packs (`mascots/packs/*.zip`), built from the concept sheet by
`tools/mascots-pack.cjs` on `main`. The Pages build copies them to https://snailedlt.github.io/nucleuscoop-handler-testbench/mascots/packs/.
Rebuild and replace:

    node tools/mascots-pack.cjs
    # then copy design/mascots/packs/*.zip here to mascots/packs/, commit and push
