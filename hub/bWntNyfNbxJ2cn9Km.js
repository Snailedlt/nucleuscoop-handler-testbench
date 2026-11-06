Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Dec 30 2020 01:47:04 GMT+0000 (UTC).
Hub.Handler.Id = "bWntNyfNbxJ2cn9Km";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Outbreak3D_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "XInput1_3.dll"];
Game.GameName = "Outbreak: The New Nightmare";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "outbreak3d.exe";
Game.SteamID = "644480";
Game.GUID = "Outbreak The New Nightmare";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Outbreak The New Nightmare";
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.InjectHookXinput = true;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = true;
Game.FakeFocus = true;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\644480";
Game.Description =
  "Connect the instances via the multiplayer option. The game already has native splitscreen for 2 players max but with this you can play with 4, everyone with his own screen and menu. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenStarts = 30;

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

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak The New Nightmare", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak The New Nightmare", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak The New Nightmare", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak The New Nightmare", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Dead Drop Studios LLC\\Outbreak The New Nightmare", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
};