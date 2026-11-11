// The editors' Nucleus names in their own colours (semhl.ts), kept up to date as you type: marks over CodeMirror's
// own token colours, refreshed a moment after each change and when another handler's document is swapped in.
import { semanticSpans } from './semhl';

export function semanticMarks(editor: any, delay = 200): void {
  let marks: any[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  const paint = () => {
    const doc = editor.getDoc();
    const text = doc.getValue();
    editor.operation(() => {
      for (const m of marks) m.clear();
      marks = text.length > 400_000 ? [] : semanticSpans(text).map((s) => doc.markText(doc.posFromIndex(s.start), doc.posFromIndex(s.end), { className: s.cls }));
    });
  };
  editor.on('changes', () => { clearTimeout(timer); timer = setTimeout(paint, delay); });
  editor.on('swapDoc', () => { marks = []; paint(); });
  paint();
}
