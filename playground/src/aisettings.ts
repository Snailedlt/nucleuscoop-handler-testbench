// Settings › AI: which provider Fix with AI uses, its key, address and model (aiproviders.ts).
import { aiKey, aiSettings, currentRunner, DEFAULT_MODEL, PRESETS, saveAiKey, saveAiSettings, type AiSettings } from './aiproviders';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const SUGGEST: Record<string, string[]> = {
  anthropic: ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'],
};
const HELP: Record<string, string> = {
  'claude-page': 'Uses your own Claude account when this page is opened on claude.ai; nothing to set up.',
  anthropic: 'Get a key at console.anthropic.com (Settings › API keys). You pay Anthropic per use; Opus is the most capable, Sonnet and Haiku cost less.',
  openai: 'Get a key at platform.openai.com (API keys). You pay OpenAI per use. Type the model name you want.',
  compatible: 'Any service with an OpenAI-compatible API. Local models (Ollama, LM Studio) are free and keep the code on your PC.',
  off: 'Fix with AI is hidden. Fix all problems and every check still work.',
};

export function initAiSettings(sample: () => any) {
  const provider = $<HTMLSelectElement>('ai-provider');
  const url = $<HTMLInputElement>('ai-url');
  const key = $<HTMLInputElement>('ai-key');
  const model = $<HTMLInputElement>('ai-model');
  const remember = $<HTMLInputElement>('ai-remember');
  const status = $('ai-status');
  $('ai-presets').innerHTML = PRESETS.map((p, i) => `<button type="button" class="btn" data-preset="${i}" title="${p.note.replace(/"/g, '&quot;')}">${p.label}</button>`).join('');

  const fill = () => {
    const s = aiSettings();
    provider.value = s.provider;
    url.value = s.baseUrl;
    model.value = s.model;
    remember.checked = s.remember;
    key.value = aiKey();
    show();
  };
  const show = () => {
    const p = provider.value;
    const api = p === 'anthropic' || p === 'openai' || p === 'compatible';
    $('ai-fields').hidden = !api;
    $('ai-url-row').hidden = p !== 'compatible';
    $('ai-key-hint').textContent = p === 'compatible' ? 'Leave empty for a local model' : '';
    model.placeholder = p === 'anthropic' ? DEFAULT_MODEL.anthropic : p === 'openai' ? 'e.g. the GPT model you use' : 'e.g. qwen2.5-coder or openai/gpt-…';
    $('ai-model-hint').textContent = p === 'anthropic' ? `Empty: ${DEFAULT_MODEL.anthropic}` : '';
    $('ai-models').innerHTML = (SUGGEST[p] ?? []).map((m) => `<option value="${m}">`).join('');
    $('ai-help').textContent = HELP[p] ?? '';
    status.textContent = '';
  };
  const save = () => {
    const s: AiSettings = { provider: provider.value as AiSettings['provider'], baseUrl: url.value.trim(), model: model.value.trim(), remember: remember.checked };
    saveAiSettings(s);
    saveAiKey(key.value.trim(), s.remember);
    document.dispatchEvent(new Event('ai-settings-changed'));
  };
  provider.addEventListener('change', () => {
    // A model typed for one provider means nothing to another.
    model.value = '';
    show();
    save();
  });
  for (const el of [url, key, model]) el.addEventListener('change', save);
  remember.addEventListener('change', save);
  $('ai-presets').addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-preset]');
    if (!b) return;
    const p = PRESETS[Number(b.dataset.preset)];
    url.value = p.url;
    $('ai-help').textContent = p.note;
    save();
  });
  $('ai-test').addEventListener('click', async () => {
    save();
    const { runner, reason } = currentRunner(sample());
    if (!runner) {
      status.textContent = reason ?? 'Not set up.';
      return;
    }
    status.textContent = `Asking ${runner.label}…`;
    try {
      const r = await runner.json('Reply with exactly this JSON and nothing else: {"code": "ok", "changes": []}', {});
      status.textContent = r?.code === 'ok' ? `Works: ${runner.label} answered.` : `${runner.label} answered, but not as asked; Fix with AI may still work.`;
    } catch (e: any) {
      status.textContent = String(e?.message ?? e);
    }
  });
  fill();
}
