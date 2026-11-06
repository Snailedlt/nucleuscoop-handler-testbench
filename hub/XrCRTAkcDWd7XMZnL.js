Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Apr 11 2020 22:45:42 GMT+0000 (UTC).
Hub.Handler.Id = "XrCRTAkcDWd7XMZnL";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["DinosaurHunterWin_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.GameName = "Dinosaur Hunt Africa Contract";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "dinosaurhunterwin.exe";
Game.SteamID = "401190";
Game.GUID = "Dinosaur Hunt";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dinosaur Hunt";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = false;
Game.HookFocus = true;
Game.BlockRawInput = false;
Game.Description = "Start a multiplayer game in one instance and connect in the others using the server browser option, use the mouse cursor if you have trouble selecting.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\ANPA.US\\Dinosaur Hunt", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\ANPA.US\\Dinosaur Hunt", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\ANPA.US\\Dinosaur Hunt", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DinosaurHunterWin_Data\\Plugins\\steam_interfaces.txt";
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
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION007",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_003",
    "STEAMINVENTORY_INTERFACE_V001",
    "STEAMVIDEO_INTERFACE_V001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(autoExec, lines);
};