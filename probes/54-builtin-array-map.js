// Jint 2.11 built-ins: is `[1,2].map(function (x) { return x; }).length` available?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = String([1,2].map(function (x) { return x; }).length); };
