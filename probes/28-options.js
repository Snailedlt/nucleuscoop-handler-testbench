Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.AddOption("Gfx", "d", "gfx", ["Low", "High"]); Game.Play = function () { Context.StartArguments = "gfx=" + Context.Options["gfx"]; };
