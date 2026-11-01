Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.Play = function () { Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\X", "N", 0, Nucleus.RegType.DWord); };
