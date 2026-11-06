Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu May 06 2021 03:22:33 GMT+0000 (UTC).
Hub.Handler.Id = "GJPaNDW2gv8zRCQiz";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["PhysXCore.dll"];
Game.KillMutex = ["NAS4Mutex"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.GameName = "NASCAR '15 Victory Edition";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "NASCAR15.exe";
Game.SteamID = "345890";
Game.GUID = "NASCAR 15";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "bin";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "NASCAR '15 Victory Edition";
Game.HookFocus = false;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\345890\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Create a private online game in one instance and select invite players, use the overlay that appears to invite the other instances, right click on a player and select invite, then join using the mouse cursor in the other instances, close the overlay by clicking in the top right corner. If you want the instances to resize and lose borders correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) and set those in-game in each instance in My NASCAR-options-graphics settings and apply before opening the next instance. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. Alt-tab or click on the keyboard instance to control it. If the invite overlay does not show make sure you disable any external overlay apps that could be interfering (e.g. MSI Afterburner).";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Eutechnyx\\NASCAR 15", "ScreenResH", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Eutechnyx\\NASCAR 15", "ScreenResW", Context.Width, Nucleus.RegType.DWord);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Eutechnyx\\NASCAR 15", "WindowHeight", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Eutechnyx\\NASCAR 15", "WindowState", 3, Nucleus.RegType.DWord);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Eutechnyx\\NASCAR 15", "WindowWidth", Context.Width, Nucleus.RegType.DWord);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_interfaces.txt";
  var lines = [
    "SteamClient016",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION003",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_002",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(interfaces, lines);

  if (Context.NumControllers < 5) {
    Game.Hook.XInputReroute = false;
  } else {
    Game.Hook.UseAlpha8CustomDll = true;
    Game.Hook.CustomDllEnabled = true;
  }
};