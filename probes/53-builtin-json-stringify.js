// Jint 2.11 built-ins: is `JSON.stringify({a: 1})` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(JSON.stringify({a: 1})); };
