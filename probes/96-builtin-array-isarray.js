// Jint 2.11 built-ins: is `Array.isArray([])` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Array.isArray([])); };
