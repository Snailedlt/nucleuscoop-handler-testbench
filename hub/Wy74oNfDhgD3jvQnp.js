Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Jul 22 2021 22:28:40 GMT+0000 (UTC).
Hub.Handler.Id = "Wy74oNfDhgD3jvQnp";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["sBioMain"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "local_save.txt", "dinput8.dll", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "rerev2.exe";
Game.SteamID = "287290";
Game.GUID = "Resident Evil Revelations 2";
Game.GameName = "Resident Evil Revelations 2";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "RESIDENT EVIL REVELATIONS 2 / BIOHAZARD REVELATIONS 2 Ver.5.00";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = false;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\CAPCOM\\RESIDENT EVIL REVELATIONS2";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\287290\\remote";
//Game.PlayerSteamIDs = ["76561198422152817","76561198131394153"];
Game.Description =
  "If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Co-op only available on raid mode using this script, get pass the first raid mode mission then you can connect both instances via quick play, start match making in the second instance then in the first to connect. Multiple gamepads and just ONE keyboard/mouse supported. Switch the crosshair to laser pointer if you notice the crosshair is off center.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = true;
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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("GAME", "LockMouse", "OFF"),
    new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("DISPLAY", "Aspect", "DEFAULT"),
    new Nucleus.IniSaveInfo("DISPLAY", "FullScreen", "OFF")
  ]);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }
};