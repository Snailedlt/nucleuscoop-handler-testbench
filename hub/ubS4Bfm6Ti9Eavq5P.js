Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Jul 27 2021 06:35:41 GMT+0000 (UTC).
Hub.Handler.Id = "ubS4Bfm6Ti9Eavq5P";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Use Process Picker?", "If you want to set the game to windowed or change res, this makes it easier.", "Picker", answers1);

Game.KillMutex = ["CrytekApplication(0)"];
Game.DirSymlinkExclusions = ["Bin64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["system.cfg"];
Game.GameName = "Ryse Son of Rome";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "ryse.exe";
Game.SteamID = "302510";
Game.GUID = "Ryse Son of Rome";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Bin64";
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Ryse(TM)";
Game.PreventWindowDeactivation = true;
Game.HookFocus = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\302510\\remote";
Game.Description =
  "On first Nucleus launch select your custom resolution in the game graphics settings and disable fullscreen for all instances, use the process picker UI option to make this easier, select the ryse process in process picker after you finish setting up an instance. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Create a gladiator custom match, select the map and choose match me, do the same in the other instance to connect. Reduce graphics settings per instance like shadows and textures to improve performance.";
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin64\\steam_interfaces.txt";
  var lines = [
    "SteamClient015",
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
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);

  var picker = Context.Options["Picker"];

  if (picker == "Yes") {
    Game.ForceProcessPick = true;
    Game.PromptBetweenInstances = true;
  }

  if (picker == "No") {
  }
};