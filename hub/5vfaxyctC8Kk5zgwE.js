Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon May 18 2020 02:21:34 GMT+0000 (UTC).
Hub.Handler.Id = "5vfaxyctC8Kk5zgwE";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["comcat.dll"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Game.exe";
Game.SteamID = "111400";
Game.GUID = "Bunch of Heroes";
Game.GameName = "Bunch of Heroes";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Bunch of Heroes";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.RefreshWindowAfterStart = true;
Game.Description =
  "So the instances launch and resize correctly make sure to run your main game at least one time first and change some graphic settings to generate the config file Nucleus looks for.";
Game.UserProfileConfigPath = "AppData\\Local\\BoH";
Game.UserProfileSavePath = "";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var cfgFilePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.xml";

  var windowModeLine = Context.FindLineNumberInTextFile(cfgFilePath, '<Attribute Name="FullScreen" ', Nucleus.SearchType.Contains) + 2;
  var screenHeightLine = Context.FindLineNumberInTextFile(cfgFilePath, '<Attribute Name="Height" ', Nucleus.SearchType.Contains) + 2;
  var screenWidthLine = Context.FindLineNumberInTextFile(cfgFilePath, '<Attribute Name="Width" ', Nucleus.SearchType.Contains) + 2;

  Context.ReplaceLinesInTextFile(cfgFilePath, [
    screenWidthLine + '|<Attribute Name="Width" Val=' + Context.Width + " />",
    screenHeightLine + '|<Attribute Name="Height" Val=' + Context.Height + " />",
    windowModeLine + '|<Attribute Name="FullScreen" Val="false" />'
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient011",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends009",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);
};