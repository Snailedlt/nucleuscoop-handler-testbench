Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.Play = function () { Context.WriteTextFile("a.txt", ["l1", "l2"]); Context.WriteTextFile("b.txt", "l1", "l2"); };
