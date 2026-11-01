Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.DPIHandling = false;
Game.Play = function () { Context.StartArguments = "dpi=" + Game.DPIHandling; };
