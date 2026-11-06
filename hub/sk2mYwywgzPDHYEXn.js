Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Apr 09 2020 20:34:52 GMT+0000 (UTC).
Hub.Handler.Id = "sk2mYwywgzPDHYEXn";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.KillMutex = ["Vicious Cycle Software EDF"];
Game.GameName = "Earth Defense Force: Insect Armageddon";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "edf-ia.exe";
Game.SteamID = "23530";
Game.GUID = "EDF Insect Armageddon";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.StartArguments = "-windowed -AlwaysFocus";
Game.Hook.ForceFocusWindowName = "EDF";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\23530\\remote";
Game.PreventWindowDeactivation = true;
Game.Description =
  "Set your regular game to windowed and in the custom resolution you want before running this. To avoid streching, you need to create a custom resolution from the AMD/Nvidia/Intel panel (For example: 960x540, 1920x540, 960x1080, 960x540 ect.) and select it in the in-game resolution settings.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  Context.WriteTextFile(autoExec, lines);
};