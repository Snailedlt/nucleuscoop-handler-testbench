Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Tue Mar 01 2022 17:02:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "rcCrC6oeeSWdXQWmm";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Binaries\\Win64", "Binaries\\Win64\\steam_settings"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_interfaces.txt", "steam_appid.txt", "EOSSDK-Win64-Shipping.dll", "achievements.json", "default_items.json", "items.json", "xinput1_3.dll"];
Game.UseNucleusEnvironment = false;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.EpicEmuArgs = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "KFGame.exe";
Game.SteamID = "232090";
Game.GUID = "Killing Floor 2";
Game.GameName = "Killing Floor 2";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "Binaries\\Win64";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "127.0.0.1 -windowed -AlwaysFocus -nosplash -nostartupmovies";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Killing Floor 2 (64-bit, DX11)";
Game.HasDynamicWindowTitle = true;
Game.PreventWindowDeactivation = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\232090\\remote";
Game.Description =
  "This game takes a long time to open so only click the open next instance prompt after the first instance opens, positions and resizes correctly, same with all others. Start a local server first then run this, the instances should join automatically.";
Game.KeepSymLinkOnExit = true;
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var path = "%USERPROFILE%\\Documents\\My Games\\KillingFloor2\\KFGame\\Config\\GFXSettings.KFGame.xml";
  Context.ChangeXmlAttributeValue(path, "//RESOLUTION", "Width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//RESOLUTION", "Height", Context.Height);

  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\KillingFloor2\\KFGame\\Config\\KFSystemSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", "False"),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height)
  ]);

  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\KillingFloor2\\KFGame\\Config\\KFEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", "FALSE")]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_interfaces.txt";
  var lines = [
    "SteamClient017",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser018",
    "SteamFriends015",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION007",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION013",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION007",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_003",
    "STEAMINVENTORY_INTERFACE_V001",
    "SteamController003",
    "STEAMVIDEO_INTERFACE_V001"
  ];

  Context.WriteTextFile(interfaces, lines);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings\\achievements.json");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "achievements.json");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings\\default_items.json");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "default_items.json");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings\\items.json");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "items.json");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Binaries\\Win64\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};