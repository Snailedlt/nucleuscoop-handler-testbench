// What the Hub sees from the testbench's own scripts: that the request comes from the SplitScreen.Me devtools,
// which tool, and which job. The same format as the extension's tools (core/hub.ts there); nothing personal.
//   User-Agent:       SplitScreenMe-DevTools/testbench (testbench-<tool>; <job>; +https://github.com/Snailedlt/nucleuscoop-handler-testbench)
//   X-Requested-With: SplitScreenMe-DevTools/testbench testbench-<tool> <job>   (the one custom header the Hub's CORS allows)
export function hubClientHeaders(tool, job) {
  return {
    'user-agent': `SplitScreenMe-DevTools/testbench (testbench-${tool}; ${job}; +https://github.com/Snailedlt/nucleuscoop-handler-testbench)`,
    'x-requested-with': `SplitScreenMe-DevTools/testbench testbench-${tool} ${job}`,
  };
}
