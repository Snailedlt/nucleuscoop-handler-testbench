Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.SymlinkGame = "False"; Game.Hook.ForceFocus = "True"; Game.Play = function () { Context.StartArguments = "sg=" + Game.SymlinkGame + " ff=" + Game.Hook.ForceFocus; };
