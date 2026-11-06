Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Aug 28 2020 06:57:30 GMT+0000 (UTC).
Hub.Handler.Id = "AiQgAtSyMPeknQfNb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["McDROID_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "McDROID.exe";
Game.SteamID = "252970";
Game.GUID = "McDROID";
Game.GameName = "McDROID";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "McDROID";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.BlockRawInput = true;
Game.StartHookInstances = "2,3,4";
Game.ResetWindows = true;
Game.PromptBetweenInstances = false;
Game.Description =
  "IMPORTANT: Only working with one gamepad (cause of Unity horrid default input, connect only one gamepad) and multiple keyboards and mice. Press the END key to unlock the input and the main cursor after playing. You can also use CTRL+Q to close Nucleus and all its instances. Host a co-op game in the first instance and join in the others using the mouse cursor.";
Game.PauseBetweenStarts = 40;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "fullScreen_h4289535994", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "resolution_h780945291", Context.Width + "x" + Context.Height + "@60", Nucleus.RegType.String);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "PauseInBG_h3931440373", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Elefantopia\\McDROID", "disableGamepad_h3189105226", 0, Nucleus.RegType.DWord);
};