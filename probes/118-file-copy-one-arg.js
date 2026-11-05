// File.Copy with 1 argument: no overload has 1 parameter.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { System.IO.File.Copy("a"); Context.StartArguments = "survived"; };
