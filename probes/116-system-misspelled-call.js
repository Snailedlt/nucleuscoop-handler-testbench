// Calling a misspelled System.IO.File member: does it throw (ending the session) or do nothing?
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { System.IO.File.Exsts("x"); Context.StartArguments = "survived"; };
