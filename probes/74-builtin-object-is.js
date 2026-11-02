// Jint 2.11 built-ins: is `Object.is(1, 1)` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Object.is(1, 1)); };
