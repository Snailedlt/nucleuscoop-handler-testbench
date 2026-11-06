Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Feb 22 2020 06:33:43 GMT+0000 (UTC).
Hub.Handler.Id = "KnXDZ6j5XgdGpwbNH";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Bin32", "Game2\\_FastLoad"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "XInput1_3.dll", "steam_interfaces.txt", "IntroMovies.pak"];
Game.FileSymlinkCopyInstead = ["system.cfg", "dedicated.cfg", "DedicatedServer.exe", "startup.pak"];
Game.KillMutex = ["CrytekApplication", "CrytekApplication(0)"];
Game.GameName = "Enemy Front";
Game.UseGoldberg = true;
Game.GoldbergLanguage = "english";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "EnemyFront.exe";
Game.SteamID = "256190";
Game.GUID = "Enemy Front";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "Bin32";
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "CryENGINE 3";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.PauseBetweenStarts = 40;
Game.Description = "Set your default game to windowed and in the resolution you want first before launching via NucleusCoop.";

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system.cfg";
  var dict = ["3|r_Fullscreen=0 ", "4|r_Width=" + Context.Width, "5|r_Height=" + Context.Height];

  Context.ReplaceLinesInTextFile(txtPath, dict);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin32\\steam_interfaces.txt";
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
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(autoExec, lines);
};
