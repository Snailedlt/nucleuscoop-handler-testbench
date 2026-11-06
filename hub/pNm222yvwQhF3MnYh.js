Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Sep 01 2020 17:24:13 GMT+0000 (UTC).
Hub.Handler.Id = "pNm222yvwQhF3MnYh";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["OpenAL32.dll"];
Game.KillMutex = ["HOARD"];
Game.DirSymlinkExclusions = ["win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["OptionData.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Reuben.exe";
Game.SteamID = "63000";
Game.GUID = "Hoard";
Game.GameName = "HOARD";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "win32";
Game.LauncherTitle = "Reuben";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Hoard";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HookFocus = false;
Game.Description = "Create a public multiplayer game and join in the other instances.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OptionData.txt";
  var dict = ["2|FullScreen	false", "3|ScreenWidth	" + Context.Width, "4|ScreenHeight	" + Context.Height];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\win32\\steam_interfaces.txt";
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
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(interfaces, lines);
};