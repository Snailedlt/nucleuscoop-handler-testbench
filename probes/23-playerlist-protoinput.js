Game.GUID = "Probe";
Game.GameName = "Probe";
Game.ExecutableName = "probe.exe";
Game.ProtoInput.OnInputLocked = function () { for (var i = 0; i < PlayerList.Count; i++) { var player = PlayerList[i]; ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID); ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID); ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true); } }; Game.Play = function () {};
