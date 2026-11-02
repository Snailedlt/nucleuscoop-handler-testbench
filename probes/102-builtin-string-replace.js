// Jint 2.11 built-ins: is `"a-b".replace(/-/g, "+")` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String("a-b".replace(/-/g, "+")); };
