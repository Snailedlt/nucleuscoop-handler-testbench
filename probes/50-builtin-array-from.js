// Jint 2.11 built-ins: is `Array.from([1])` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Array.from([1])); };
