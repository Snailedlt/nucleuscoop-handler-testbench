Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Aug 02 2021 23:40:16 GMT+0000 (UTC).
Hub.Handler.Id = "GxxexXD9F8h2r34Gx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Outbreak Epidemic_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt"];
Game.GameName = "Outbreak: Epidemic";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Outbreak Epidemic.exe";
Game.SteamID = "1082220";
Game.GUID = "Outbreak Epidemic";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Outbreak Epidemic";
Game.FakeFocus = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = true;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1082220";
Game.Description =
  "Connect the instances via the online multiplayer option. The game already has native split-screen for 2 players max but with this you can play with 4, everyone with his own screen and menu. If you use keyboards and mice after the instances open press the END key to lock the input and for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 40;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = true;
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
Game.DrawFakeMouseCursor = true;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak Epidemic", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak Epidemic", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak Epidemic", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak Epidemic", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
};