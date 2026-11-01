Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.ProtoInput.SetWindowPosHook = Nucleus.SetWindowPosHook.DontResize; Game.Play = function () { Context.StartArguments = "swp=" + Game.ProtoInput.SetWindowPosHook; };
