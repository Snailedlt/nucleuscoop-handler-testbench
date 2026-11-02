// ...passing every parameter works.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = "r=" + Context.RandomString(8, false).length; };
