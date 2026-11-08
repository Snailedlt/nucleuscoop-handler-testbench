// AI providers for Fix with AI (Settings › AI): Claude on claude.ai (the page's `sample` capability, the viewer's own
// account), the Anthropic API (official SDK), OpenAI, or any OpenAI-compatible service (OpenRouter, Ollama, LM Studio,
// Gemini…). Each runs the same task: the prompt, the page's two tools (the real linter and the API lookup) in a loop,
// and a JSON answer { code, changes }. Keys stay in this browser (localStorage, or this tab only) and go only to the
// provider; settings export never includes them (settingsio.ts is an allowlist).
import Anthropic from '@anthropic-ai/sdk';

export type ProviderId = 'claude-page' | 'anthropic' | 'openai' | 'compatible';
export interface AiSettings {
  provider: ProviderId | 'off';
  model: string;
  baseUrl: string;
  /** Keep the key across visits (localStorage) or only in this tab (sessionStorage). */
  remember: boolean;
}
export interface PageTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute(input: Record<string, unknown>): unknown;
}
export interface RunOptions {
  signal?: AbortSignal;
  tools?: PageTool[];
  onText?: () => void;
}
export interface AiRunner {
  /** "Claude", "OpenAI (gpt-…)", for messages. */
  label: string;
  json(prompt: string, o: RunOptions): Promise<any>;
}
export class AiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

const SETTINGS_KEY = 'nucleus-workbench-ai';
const KEY_KEY = 'nucleus-workbench-ai-key';
export const DEFAULT_MODEL: Record<Exclude<ProviderId, 'claude-page'>, string> = { anthropic: 'claude-opus-5-5', openai: '', compatible: '' };
export const PRESETS: { label: string; url: string; note: string }[] = [
  { label: 'OpenRouter', url: 'https://openrouter.ai/api/v1', note: 'Many models with one key (openrouter.ai/keys).' },
  { label: 'Google Gemini', url: 'https://generativelanguage.googleapis.com/v1beta/openai', note: 'A Gemini API key (aistudio.google.com).' },
  { label: 'Ollama (on this PC)', url: 'http://localhost:11434/v1', note: 'Free, runs locally. Start Ollama with OLLAMA_ORIGINS set to this page’s address. No key needed.' },
  { label: 'LM Studio (on this PC)', url: 'http://localhost:1234/v1', note: 'Free, runs locally. Turn on CORS in its server settings. No key needed.' },
];

const store = () => { try { return localStorage; } catch { return null; } };
const tab = () => { try { return sessionStorage; } catch { return null; } };
export function aiSettings(): AiSettings {
  let s: Partial<AiSettings> = {};
  try { s = JSON.parse(store()?.getItem(SETTINGS_KEY) ?? '{}'); } catch { /* defaults */ }
  return { provider: s.provider ?? 'claude-page', model: s.model ?? '', baseUrl: s.baseUrl ?? '', remember: s.remember ?? true };
}
export function saveAiSettings(s: AiSettings) {
  try { store()?.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* not kept */ }
}
export const aiKey = () => tab()?.getItem(KEY_KEY) ?? store()?.getItem(KEY_KEY) ?? '';
export function saveAiKey(key: string, remember: boolean) {
  try {
    store()?.removeItem(KEY_KEY);
    tab()?.removeItem(KEY_KEY);
    if (key) (remember ? store() : tab())?.setItem(KEY_KEY, key);
  } catch { /* not kept */ }
}

const MAX_TURNS = 10;
const JSON_RULE = '\n\nWhen you are done, answer with only a JSON object, no other text: {"code": "<the complete fixed handler>", "changes": ["<one short line per change>"]}.';
/** The JSON object in a model's last answer (tolerates a code fence or text around it). */
export function parseAnswer(text: string): any {
  const t = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch { /* look for the object */ }
  const a = t.indexOf('{');
  const b = t.lastIndexOf('}');
  if (a >= 0 && b > a) {
    try { return JSON.parse(t.slice(a, b + 1)); } catch { /* fall through */ }
  }
  throw new AiError('invalid_json', 'The answer wasn’t in the expected format. Try again.');
}
const runTool = (tools: PageTool[] | undefined, name: string, input: Record<string, unknown>) => {
  const t = tools?.find((x) => x.name === name);
  try {
    return JSON.stringify(t ? t.execute(input) : { error: `No tool named ${name}` });
  } catch (e: any) {
    return JSON.stringify({ error: String(e?.message ?? e) });
  }
};

/** The Anthropic API through the official SDK, with the page tools in a manual loop. */
function anthropicRunner(key: string, model: string): AiRunner {
  const client = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true, maxRetries: 2 });
  return {
    label: `Claude (${model})`,
    async json(prompt, o) {
      const tools: Anthropic.Beta.BetaTool[] = (o.tools ?? []).map((t) => ({ name: t.name, description: t.description, input_schema: t.inputSchema as Anthropic.Beta.BetaTool.InputSchema }));
      const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: 'user', content: prompt + JSON_RULE }];
      for (let turn = 0; turn < MAX_TURNS; turn++) {
        let res: Anthropic.Beta.BetaMessage;
        try {
          res = await client.beta.messages.create(
            {
              model,
              max_tokens: 16000,
              // On a policy decline, the API retries the request on a fallback model (opt-in).
              betas: ['server-side-fallback-2026-07-01'],
              fallbacks: 'default',
              messages,
              ...(tools.length ? { tools } : {}),
            } as Anthropic.Beta.MessageCreateParamsNonStreaming,
            { signal: o.signal },
          );
        } catch (e) {
          throw anthropicError(e);
        }
        o.onText?.();
        if (res.stop_reason === 'refusal') throw new AiError('refused', 'Claude declined to change this handler.');
        if (res.stop_reason === 'tool_use') {
          messages.push({ role: 'assistant', content: res.content });
          const results: Anthropic.Beta.BetaToolResultBlockParam[] = res.content
            .filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === 'tool_use')
            .map((b) => ({ type: 'tool_result', tool_use_id: b.id, content: runTool(o.tools, b.name, b.input as Record<string, unknown>) }));
          messages.push({ role: 'user', content: results });
          continue;
        }
        if (res.stop_reason === 'max_tokens') throw new AiError('prompt_too_large', 'The answer was cut off: the handler may be too large.');
        const text = res.content.filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text').map((b) => b.text).join('');
        if (!text.trim()) throw new AiError('empty_completion', 'Claude returned nothing. Try again.');
        return parseAnswer(text);
      }
      throw new AiError('too_many_turns', 'Claude kept checking without finishing. Try again, or ask for less in the note.');
    },
  };
}
function anthropicError(e: unknown): Error {
  if (e instanceof Anthropic.APIUserAbortError) return new AiError('cancelled', 'Stopped.');
  if (e instanceof Anthropic.AuthenticationError) return new AiError('bad_key', 'The Anthropic API key was refused. Check it in Settings › AI.');
  if (e instanceof Anthropic.PermissionDeniedError) return new AiError('bad_key', 'This key may not use that model. Check Settings › AI.');
  if (e instanceof Anthropic.NotFoundError) return new AiError('bad_model', 'That model doesn’t exist. Check the model in Settings › AI.');
  if (e instanceof Anthropic.RateLimitError) return new AiError('rate_limited', 'Too many requests right now. Try again in a minute.');
  if (e instanceof Anthropic.BadRequestError) return new AiError('bad_request', `The request was refused: ${e.message}`);
  if (e instanceof Anthropic.APIConnectionError) return new AiError('network', 'Couldn’t reach the Anthropic API. Check your connection.');
  if (e instanceof Anthropic.APIError) return new AiError('api', `The Anthropic API answered ${e.status}: ${e.message}`);
  return new AiError('unknown', String((e as any)?.message ?? e));
}

/** OpenAI's Chat Completions, and every service that speaks it (OpenRouter, Gemini, Ollama, LM Studio…). */
function openAiRunner(baseUrl: string, key: string, model: string, label: string): AiRunner {
  const url = `${baseUrl.replace(/\/+$/, '')}/chat/completions`;
  return {
    label: `${label}${model ? ` (${model})` : ''}`,
    async json(prompt, o) {
      const tools = (o.tools ?? []).map((t) => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.inputSchema } }));
      const messages: any[] = [{ role: 'user', content: prompt + JSON_RULE }];
      for (let turn = 0; turn < MAX_TURNS; turn++) {
        let r: Response;
        try {
          r = await fetch(url, {
            method: 'POST',
            signal: o.signal,
            headers: { 'content-type': 'application/json', ...(key ? { authorization: `Bearer ${key}` } : {}) },
            body: JSON.stringify({ model, messages, ...(tools.length ? { tools } : {}) }),
          });
        } catch (e: any) {
          if (e?.name === 'AbortError') throw new AiError('cancelled', 'Stopped.');
          throw new AiError('network', `Couldn’t reach ${new URL(url).host}. If it runs on this PC, check it's running and allows this page (CORS).`);
        }
        if (!r.ok) {
          const body = await r.text().catch(() => '');
          const msg = (() => { try { return JSON.parse(body).error?.message ?? body; } catch { return body; } })().slice(0, 200);
          if (r.status === 401 || r.status === 403) throw new AiError('bad_key', `The key was refused (${r.status}). Check it in Settings › AI.`);
          if (r.status === 404) throw new AiError('bad_model', `Not found (404): check the address and model in Settings › AI. ${msg}`);
          if (r.status === 429) throw new AiError('rate_limited', 'Too many requests right now. Try again in a minute.');
          throw new AiError('api', `${new URL(url).host} answered ${r.status}: ${msg}`);
        }
        const data = await r.json();
        o.onText?.();
        const m = data.choices?.[0]?.message;
        if (!m) throw new AiError('empty_completion', 'The answer was empty. Try again.');
        if (m.tool_calls?.length) {
          messages.push({ role: 'assistant', content: m.content ?? null, tool_calls: m.tool_calls });
          for (const c of m.tool_calls) {
            let input: Record<string, unknown> = {};
            try { input = JSON.parse(c.function?.arguments || '{}'); } catch { /* empty input */ }
            messages.push({ role: 'tool', tool_call_id: c.id, content: runTool(o.tools, c.function?.name, input) });
          }
          continue;
        }
        if (!String(m.content ?? '').trim()) throw new AiError('empty_completion', 'The answer was empty. Try again.');
        return parseAnswer(String(m.content));
      }
      throw new AiError('too_many_turns', 'The model kept checking without finishing. Try again.');
    },
  };
}

/** The runner Fix with AI uses now, or null (turned off, or not set up: the reason says what's missing). */
export function currentRunner(sample: any): { runner: AiRunner | null; reason?: string } {
  const s = aiSettings();
  if (s.provider === 'off') return { runner: null, reason: 'off' };
  if (s.provider === 'claude-page') {
    if (!sample) return { runner: null, reason: 'Claude on claude.ai only works when this page is opened on claude.ai. Pick another provider in Settings › AI.' };
    return { runner: { label: 'Claude', json: (p, o) => sample.json(p, { signal: o.signal, ...(o.tools ? { tools: o.tools } : { cache: false }), onText: o.onText }) } };
  }
  const key = aiKey();
  if (s.provider === 'anthropic') {
    if (!key) return { runner: null, reason: 'Add your Anthropic API key in Settings › AI.' };
    return { runner: anthropicRunner(key, s.model || DEFAULT_MODEL.anthropic) };
  }
  if (s.provider === 'openai') {
    if (!key) return { runner: null, reason: 'Add your OpenAI API key in Settings › AI.' };
    if (!s.model) return { runner: null, reason: 'Pick an OpenAI model in Settings › AI.' };
    return { runner: openAiRunner('https://api.openai.com/v1', key, s.model, 'OpenAI') };
  }
  if (!s.baseUrl) return { runner: null, reason: 'Add the service’s address in Settings › AI.' };
  if (!s.model) return { runner: null, reason: 'Add a model name in Settings › AI.' };
  let host = s.baseUrl;
  try { host = new URL(s.baseUrl).host; } catch { /* as typed */ }
  return { runner: openAiRunner(s.baseUrl, key, s.model, host) };
}
