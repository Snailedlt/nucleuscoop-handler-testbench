// Jint 2.11 built-ins: is `Object.fromEntries([["a", 1]]).a` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Object.fromEntries([["a", 1]]).a); };
