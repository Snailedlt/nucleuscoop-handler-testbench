Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun May 02 2021 02:15:55 GMT+0000 (UTC).
Hub.Handler.Id = "snLieKZ9NWSQnhdrZ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SwordUltimate.exe";
Game.SteamID = "419130";
Game.GUID = "Strength of the Sword ULTIMATE";
Game.GameName = "Strength of the Sword ULTIMATE";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 2;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sword Ultimate";
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Saved Games\\IVENT\\SOTS";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\419130\\remote";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Invite the other player using the overlay that appears when you select the invite friend option in co-op, right click the other player with the mouse cursor, select invite and accept it in the other instance, close the overlay in the first instance so you can join. Note that you need to get enough points to buy and equip a different part to start co-op or pvp. If you use keyboards and mice after the instances open press the END key to lock the input for all instances. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.PauseBetweenStarts = 30;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = true;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var VideoConfig = Context.NucleusUserRoot + "\\Saved Games\\IVENT\\SOTS\\settings.txt";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Settings", "NativeHeight", Context.Height + ".000000"),
    new Nucleus.IniSaveInfo("Settings", "Fullscreen", "0.000000"),
    new Nucleus.IniSaveInfo("Settings", "ScreenHeight", Context.Height + ".000000"),
    new Nucleus.IniSaveInfo("Settings", "ScreenIsWide", "1.000000"),
    new Nucleus.IniSaveInfo("Settings", "NativeWidth", Context.Width + ".000000"),
    new Nucleus.IniSaveInfo("Settings", "ScreenWidth", Context.Width + ".000000")
  ]);

  if (Context.IsKeyboardPlayer) {
    var VideoConfig = Context.NucleusUserRoot + "\\Saved Games\\IVENT\\SOTS\\settings.txt";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "ControllerUI", "1.000000")]);
  } else {
    var VideoConfig = Context.NucleusUserRoot + "\\Saved Games\\IVENT\\SOTS\\settings.txt";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "ControllerUI", "3.000000")]);
  }
};