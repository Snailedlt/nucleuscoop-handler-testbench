// Jint 2.11 built-ins: is `Object.create(null) === null` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Object.create(null) === null); };
