// Generates C# stubs of Nucleus' GenericGameInfo / GenericContext / PlayerInfo / ProtoInput
// from the REAL Nucleus source declarations (fields, defaults, method signatures).
// Method bodies record calls instead of touching Windows/the game.
import fs from 'node:fs';
import path from 'node:path';
import { findTypeBody, members, classify } from './csparse.mjs';

const N = process.argv[2]; // .../Master/NucleusGaming
const OUT = process.argv[3];
const src = (f) => fs.readFileSync(path.join(N, f), 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');

function parsed(file, cls) {
  return members(findTypeBody(src(file), 'class', cls)).map((m) => ({ m, c: classify(m, cls) })).filter((x) => x.c);
}

const KNOWN = new Set(['string', 'bool', 'int', 'uint', 'long', 'double', 'float', 'byte', 'object', 'void', 'IntPtr', 'Guid',
  'string[]', 'int[]', 'uint[]', 'float[]', 'byte[]', 'double[]', 'Action', 'Folder', 'SaveType', 'SearchType', 'RegType', 'DPIHandling',
  'DpiAwarenessMode', 'SaveInfo', 'SaveInfo[]', 'GameHookInfo', 'ProtoInputOptions', 'Hub', 'UserInfo', 'GameOption', 'CustomStep',
  'List<GameOption>', 'List<CustomStep>', 'GameMetaInfo', 'Dictionary<string, object>', 'Rectangle', 'RectangleF', 'UserScreen',
  'List<string>', 'SetWindowPosHook', 'MoveWindowHook', 'DrawFakeCursor', 'PutMouseInsideWindow', 'SetRemoveBorderHook']);

function retDefault(t, name) {
  if (t === 'void') return null;
  if (t === 'bool') return 'true';
  if (t === 'string') return name === 'GetFolder' ? 'H.Folder(folder, this)' : `"<${name}>"`;
  if (t === 'string[]') return 'new string[0]';
  if (t === 'byte[]') return 'new byte[] { 0, 0, 0, 0 }';
  if (t === 'SaveInfo') return 'new SaveInfo(section, key, value)';
  if (['int', 'uint', 'long', 'double', 'float'].includes(t)) return name === 'FindLineNumberInTextFile' ? '5' : '0';
  return `default(${t})`;
}

function emitMembers(list, { cls, props = {}, skip = new Set() }) {
  const out = [];
  const seenFields = new Set();
  for (const { c } of list) {
    if (skip.has(c.name)) continue;
    if (c.kind === 'method') {
      if (!KNOWN.has(c.csType) || c.params.some((p) => !KNOWN.has(p.csType) || p.out)) continue;
      const ps = c.params.map((p) => `${p.rest ? 'params ' : ''}${p.csType} ${p.name}${p.optional ? ` = ${p.default}` : ''}`).join(', ');
      const args = c.params.map((p) => p.name).join(', ');
      const ret = retDefault(c.csType, c.name);
      out.push(`  public ${c.isStatic ? 'static ' : ''}${c.csType} ${c.name}(${ps}) { H.Rec("${cls}.${c.name}", new object[] { ${args} }); ${ret ? `return ${ret};` : ''} }`);
      continue;
    }
    if (seenFields.has(c.name) || !KNOWN.has(c.csType)) continue;
    seenFields.add(c.name);
    if (props[c.name]) out.push(`  public ${c.csType} ${c.name} ${props[c.name]}`);
    else if (c.kind === 'property') out.push(`  public ${c.csType} ${c.name} { get { return ${retDefault(c.csType, c.name) ?? 'default'}; } set { } }`);
    else out.push(`  public ${c.isStatic ? 'static ' : ''}${c.csType} ${c.name}${c.default ? ` = ${c.default}` : ''};`);
  }
  return out.join('\n');
}

// --- GenericGameInfo -------------------------------------------------------
const game = parsed('Coop/Generic/GenericGameInfo.cs', 'GenericGameInfo');
const gameCs = `
using System; using System.Collections.Generic; using Nucleus.Gaming.Coop.Generic; using Nucleus.Gaming; using Nucleus.Gaming.Coop.ProtoInput; using Nucleus.Gaming.Generic.Step;
namespace Nucleus.Gaming {
public class GenericGameInfo {
${emitMembers(game, {
  cls: 'Game',
  skip: new Set(['IsUpdateAvailable', 'LoadCustomAssemblies', 'ShowOptionAsStep', 'SetPlayerList', 'SetProtoInputValues', 'PrePlay', 'CreateContext', 'AddOption', 'HandlerType', 'HandlerId']),
})}
  public void AddOption(string name, string desc, string key, object value, object defaultValue) { Options.Add(new GameOption(name, desc, key, value, defaultValue)); }
  public void AddOption(string name, string desc, string key, object value) { Options.Add(new GameOption(name, desc, key, value)); }
  public CustomStep ShowOptionAsStep(string optionKey, bool required, string title) { H.Rec("Game.ShowOptionAsStep", new object[] { optionKey, required, title }); var s = new CustomStep(); CustomSteps.Add(s); return s; }
}}`;

// --- GenericContext --------------------------------------------------------
const ctx = parsed('Coop/Generic/GenericContext.cs', 'GenericContext');
const ctxProps = {
  Width: '{ get { return Sim.Width; } }', Height: '{ get { return Sim.Height; } }', PosX: '{ get { return Sim.X; } }', PosY: '{ get { return Sim.Y; } }',
  MonitorWidth: '{ get { return 1920; } }', MonitorHeight: '{ get { return 1080; } }', NumberOfPlayers: '{ get { return Sim.Count; } }',
  Nickname: '{ get { return "Player" + (PlayerID + 1); } }', IsKeyboardPlayer: '{ get { return Sim.Keyboard; } }', HasKeyboardPlayer: '{ get { return true; } }',
  GamepadId: '{ get { return PlayerID + 1; } }', AspectRatioDecimal: '{ get { return (float)Sim.Width / Sim.Height; } }', AspectRatio: '{ get { return "16:9"; } }',
  OrigAspectRatioDecimal: '{ get { return 16f / 9f; } }', OrigAspectRatio: '{ get { return "16:9"; } }', Arch: '{ get { return "x64"; } }',
  Options: '{ get { return Sim.Options; } }', PlayerSteamID: '{ get { return (76561199000000000 + PlayerID).ToString(); } }',
  DocumentsPlayer: '{ get { return @"C:\\Users\\me\\Documents\\NucleusCoop\\" + Nickname + @"\\Documents\\"; } }',
  EnvironmentPlayer: '{ get { return @"C:\\Users\\me\\NucleusCoop\\" + Nickname + @"\\"; } }',
};
const ctxCs = `
using System; using System.Collections.Generic; using Nucleus.Gaming.Coop.Generic; using Nucleus.Gaming;
namespace Nucleus.Gaming {
public class Sim { public int Width, Height, X, Y, Count; public bool Keyboard; public Dictionary<string, object> Options = new Dictionary<string, object>(); }
public class UserInfo { public string GetLocalIP() { return "192.168.1.10"; } }
public class GenericContext {
  public Sim Sim;
${emitMembers(ctx, { cls: 'Context', props: ctxProps, skip: new Set(['HandlerType', 'Options']) })}
  public Dictionary<string, object> Options { get { return Sim.Options; } }
}}`;

// --- PlayerInfo --------------------------------------------------------------
const pl = parsed('Coop/PlayerInfo.cs', 'PlayerInfo');
const plCs = `
using System; using System.Drawing;
namespace Nucleus.Gaming.Coop {
public class UserScreen { public bool IsFullscreen() { return false; } public bool IsDualHorizontal() { return true; } public bool IsDualVertical() { return false; } }
public class PlayerInfo {
  public UserScreen Owner = new UserScreen();
${emitMembers(pl, { cls: 'Player', skip: new Set(['FlashIcon', 'Owner']) })}
}}`;

// --- ProtoInput runtime: real file, externs replaced by recording bodies -----
let pi = src('Coop/ProtoInput/ProtoInput.cs')
  .replace(/^using System\.Windows.*$/gm, '')
  .replace(/^using System\.Runtime\.Remoting.*$/gm, '')
  .replace(/^using System\.Xml\.Linq;$/gm, '');
// drop the private 32-bit twin class
const p32 = -1; // keep both nested classes; their externs are replaced below
if (p32 >= 0) {
  const open = pi.indexOf('{', p32);
  let d = 0, i = open;
  for (; i < pi.length; i++) { if (pi[i] === '{') d++; else if (pi[i] === '}' && --d === 0) break; }
  pi = pi.slice(0, p32) + pi.slice(i + 1);
}
pi = pi.replace(/\[DllImport\([^\]]*\)\]\s*public static extern ([\w]+) (\w+)\(([^)]*)\);/g, (_, ret, name, ps) => {
  const names = ps.split(',').map((p) => p.trim().split(/\s+/).pop()).filter(Boolean).filter((n) => !/^out$/.test(n));
  const outs = ps.split(',').map((p) => p.trim()).filter((p) => p.startsWith('out ')).map((p) => `${p.split(/\s+/).pop()} = default(${p.split(/\s+/)[1]});`).join(' ');
  return `public static ${ret} ${name}(${ps}) { ${outs} H.Rec("ProtoInput.${name}", new object[] { ${names.join(', ')} }); ${ret === 'void' ? '' : `return default(${ret});`} }`;
});
// keep only the class declarations (drop non-extern method bodies that touch Windows)
fs.writeFileSync(path.join(OUT, 'GameStub.cs'), gameCs);
fs.writeFileSync(path.join(OUT, 'ContextStub.cs'), ctxCs);
fs.writeFileSync(path.join(OUT, 'PlayerStub.cs'), plCs);
fs.writeFileSync(path.join(OUT, 'ProtoInputStub.cs'), pi);
console.log('stubs written');
