// Which checks the problem lists show: the same in the workbench (both modes) and in Learn, and the same as the
// editors' Problems list (VS Code, the LSP editors): errors, warnings and infos. Hints (outdated options that do no
// harm) only fade the code; the workbench lists them on request (Advanced mode, the Hints filter).
import type { Diagnostic } from '@core/lint';

export const inProblemList = (d: Diagnostic): boolean => d.severity !== 'hint';
