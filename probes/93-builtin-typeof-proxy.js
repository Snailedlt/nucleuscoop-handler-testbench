// Jint 2.11 built-ins: is `typeof Proxy` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String(typeof Proxy); };
