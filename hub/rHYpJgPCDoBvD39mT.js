Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu May 06 2021 01:58:35 GMT+0000 (UTC).
Hub.Handler.Id = "rHYpJgPCDoBvD39mT";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "CastleMinerZ.exe";
Game.SteamID = "253430";
Game.GUID = "CastleMiner Z";
Game.GameName = "CastleMiner Z";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "CastleMiner Z";
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\CastleMinerZ";
Game.Description =
  "So the instances resize correctly make sure you run your main game at least once and change some graphic settings. Some menus are only clickable with the mouse cursor so alt-tab between the instances to use it.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.NucleusUserRoot + "\\AppData\\Local\\CastleMinerZ\\user.settings";
  var dict = ["2|FullScreen=False, ", "4|ScreenWidth=" + Context.Width + ",", "5|ScreenHeight=" + Context.Height + ","];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends013",
    "SteamUtils006",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION011",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(interfaces, lines);
};