Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Mar 17 2021 08:15:16 GMT+0000 (UTC).
Hub.Handler.Id = "AXKhL7wRsTNRF3nHM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["PhysXCooking.dll"];
Game.DirSymlinkExclusions = ["binaries\\win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "xinput1_3.dll"];
Game.GameName = "Scourge: Outbreak";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "ScourgeGame.exe";
Game.SteamID = "227560";
Game.GUID = "Scourge Outbreak";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "binaries\\win32";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Scourge: Outbreak";
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.UseDirectX9Wrapper = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\My Games\\Scourge Outbreak\\ScourgeGame\\SaveData";
Game.UserProfileConfigPath = "Documents\\My Games\\Scourge Outbreak\\ScourgeGame\\Config";
Game.Description =
  "Enable gamepad in input settings in your default game first. Create a public game in one instance and join in the others. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenStarts = 30;

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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Scourge Outbreak\\ScourgeGame\\Config\\ScourgeEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    //new Nucleus.IniSaveInfo("SystemSettings", "WindowedFullscreen", Context.IsFullscreen),
    //new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    //new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    //new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", true),
    new Nucleus.IniSaveInfo("SystemSettings", "AllowD3D10", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bMuteAudioWhenNotInFocus", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("WillowGame.WillowGameEngine", "bPauseLostFocusWindowed", false),
    new Nucleus.IniSaveInfo("WillowGame.WillowGameEngine", "bMuteAudioWhenNotInFocus", false)
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-Fullscreen -AlwaysFocus -nosplash -nomoviestartup -NoController" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
  } else {
    Context.StartArguments = "-Fullscreen -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
  }

  if (Context.HasKeyboardPlayer !== true) {
    Game.SupportsMultipleKeyboardsAndMice = false;
  }

  if (Context.NumControllers < 5) {
    Game.Hook.XInputReroute = false;
  } else {
    Game.Hook.UseAlpha8CustomDll = true;
    Game.Hook.CustomDllEnabled = true;
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\win32\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends013",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);
};