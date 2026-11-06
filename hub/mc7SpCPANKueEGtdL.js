Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Oct 13 2020 05:48:39 GMT+0000 (UTC).
Hub.Handler.Id = "mc7SpCPANKueEGtdL";
Hub.Maintainer.Name = "The Shnazberry";
Hub.Maintainer.Id = "sBteBrsSMrrE7gMjj";

Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.GameName = "Blood";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "BuildGDX.exe";
Game.GUID = "BloodGDX";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 6;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Blood";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.Description =
  "At the launcher, make sure the resolution is close/at what you want to play on. Make sure it is on borderless or windowed mode. See the guide on how to create custom resolutions so it better fits the screen. Hit play, then in the process picker window, pick the process named javaw. You may need to refresh it. Press the END key in your keyboard to unlock the input when you finish playing. You can also use CTR+Q to close Nucleus and all its instances.";
Game.PauseBetweenStarts = 20;
Game.ForceProcessPick = true;
Game.PromptBetweenInstances = true;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = true;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = true;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.HookMouseVisibility = true;