Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.Play = function () { var p = "c.ini"; Context.ModifySaveFile(p, p, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("D", "W", Context.Width), new Nucleus.IniSaveInfo("D", "F", false)]); };
