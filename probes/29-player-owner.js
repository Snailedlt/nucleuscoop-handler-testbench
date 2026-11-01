Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.Play = function () { Context.StartArguments = "fs=" + Player.Owner.IsFullscreen() + " kb=" + Context.IsKeyboardPlayer; };
