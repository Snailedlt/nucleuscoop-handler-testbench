// System.Environment.UserName and Thread.Sleep: reachable as listed.
Game.GUID = "P";
Game.GameName = "P";
Game.ExecutableName = "p.exe";
Game.Play = function () { System.Threading.Thread.Sleep(1); Context.StartArguments = "user=" + (typeof System.Environment.UserName); };
