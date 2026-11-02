// Jint 2.11 built-ins: is `JSON.parse("[1]").length` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(JSON.parse("[1]").length); };
