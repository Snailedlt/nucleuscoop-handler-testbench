// Jint 2.11 built-ins: is `Object.getOwnPropertyNames({a: 1}).length` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Object.getOwnPropertyNames({a: 1}).length); };
