// C# default parameter values do not make a parameter optional in Jint 2.11: RandomString(int size, bool lowerCase = false) needs both.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { Context.StartArguments = "r=" + Context.RandomString(8).length; };
