// Reading a misspelled System.IO.File member: undefined, or does a .NET type throw on an unknown member?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { var x = System.IO.File.Exsts; Context.StartArguments = "read=" + typeof x; };
