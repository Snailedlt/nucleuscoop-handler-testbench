Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.ProtoInput.SetWindowPosHook = true; Game.DPIHandling = true; Game.ProtoInput.DrawFakeCursor = false; Game.Play = function () { Context.StartArguments = "swp=" + Game.ProtoInput.SetWindowPosHook + " dpi=" + Game.DPIHandling; };
