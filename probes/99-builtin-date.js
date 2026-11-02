// Jint 2.11 built-ins: is `new Date(0).toISOString()` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(new Date(0).toISOString()); };
