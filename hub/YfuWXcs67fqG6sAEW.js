Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Mar 26 2020 08:18:53 GMT+0000 (UTC).
Hub.Handler.Id = "YfuWXcs67fqG6sAEW";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Grin Engine Game"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.KillMutexType = "Event";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = false;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "lag_win32_public_dev.exe";
Game.SteamID = "42120";
Game.GUID = "Lead and Gold Gangs of the Wild West";
Game.GameName = "Lead and Gold: Gangs of the Wild West";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Lead and Gold";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.UserProfileConfigPath = "AppData\\Local\\LAG\\data\\settings";
Game.UserProfileSavePath = "AppData\\Local\\LAG\\saves";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\renderer_settings.xml";
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "resolution", Context.Width + " " + Context.Height);
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "windowed", "true");
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "aspect_ratio", Context.AspectRatioDecimal);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient009",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser013",
    "SteamFriends005",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION007",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking003",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(autoExec, lines);
};