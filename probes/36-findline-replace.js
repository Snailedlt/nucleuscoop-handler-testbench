Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.Play = function () { var p = "s.cfg"; Context.ReplaceLinesInTextFile(p, [Context.FindLineNumberInTextFile(p, "W", Nucleus.SearchType.StartsWith) + "|W " + Context.Width]); };
