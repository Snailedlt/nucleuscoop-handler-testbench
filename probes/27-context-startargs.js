Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.Play = function () { Context.StartArguments = "-windowed -ResX=" + Context.Width + " -ResY=" + Context.Height + " -p" + Context.PlayerID; };
