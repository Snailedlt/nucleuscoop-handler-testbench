Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sat Oct 24 2020 20:54:07 GMT+0000 (UTC).
Hub.Handler.Id = "7o9Bbp8CcfYpginep";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["F1 2012"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  "game_gdf.dll",
  "rldata.dll",
  "car_materials.xml",
  "car_monitor_setup.xml",
  "example_benchmark.xml",
  "loose_parts_settings.xml",
  "SkipFrontEnd.xml",
  "surface_materials.xml",
  "raceload.jpk",
  "win_000.nfs"
];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "f1_2012.exe";
Game.SteamID = "208500";
Game.GUID = "F1-2012";
Game.GameName = "F1 2012";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "F1 2012";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.BlockMouseEvents = true;
Game.Hook.BlockInputEvents = true;
Game.Hook.BlockKeyboardEvents = false;
Game.ResetWindows = true;
Game.UserProfileConfigPath = "Documents\\My Games\\FormulaOne2012\\hardwaresettings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\208500";
Game.DPIHandling = Nucleus.DPIHandling.Scaled;
Game.Description =
  "Connect the instances via the online play option, if the instances do not open when launching via Nucleus change the steam language in the Nucleus UI settings to match the one your regular game has. The game already has native splitscreen for 2 players max but with this you can play 4+";
Game.PauseBetweenStarts = 30;
Game.PauseBetweenProcessGrab = 5;

Game.Play = function() {
  var path = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\hardware_settings_config.xml";
  Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");
  Context.ChangeXmlAttributeValue(path, "//resolution", "oldWidth", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "oldHeight", Context.Height);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends011",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION005",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(interfaces, lines);
};