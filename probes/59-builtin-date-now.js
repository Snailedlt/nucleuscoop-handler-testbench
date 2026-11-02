// Jint 2.11 built-ins: is `Date.now() > 0` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(Date.now() > 0); };
