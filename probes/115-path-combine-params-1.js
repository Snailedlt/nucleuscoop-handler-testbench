// System.IO.Path.Combine with 1 part: only the params overload could match.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = System.IO.Path.Combine("a"); };
