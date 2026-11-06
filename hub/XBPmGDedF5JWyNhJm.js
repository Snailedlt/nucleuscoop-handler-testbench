Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Apr 05 2021 06:38:16 GMT+0000 (UTC).
Hub.Handler.Id = "XBPmGDedF5JWyNhJm";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.KeyboardPlayerFirst = true;
Game.ExecutableName = "FullMojo.exe";
Game.SteamID = "225280";
Game.GUID = "Full Mojo Rampage";
Game.GameName = "Full Mojo Rampage";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Full Mojo Rampage (32 bits)";
Game.FakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\Over the Top Games\\Full Mojo Rampage";
//Game.UserProfileSavePath = "Documents\\Over the Top Games\\Full Mojo Rampage";
Game.Description =
  "So the instances launch and resize correctly make sure to run your main game at least once first and change some graphic settings. If you launch an instance with the keyboard icon the first instance will always be the keyboard player. The game already has local co-op for 2 players max but second player is just a ghost copy of the first player, with this you can play up to 4 players in co-op, each player with an unique customizable character and each instance with its own save. Each instance has its own saves that are copies of your original one, so your original save will not be overwritten. You can access these saves in the app, after the first launch click game options/open documents config path in the UI. You can also delete them if you get the same name in all instances.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\ConfigPC.cfg";
  var dict = ["1|*WIDTH " + Context.Width, "2|*HEIGHT " + Context.Height, "3|*FULLSCREEN 0", "4|*NO_WINDOW_BORDER 0"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient014",
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
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(interfaces, lines);
};