Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri May 08 2020 22:05:13 GMT+0000 (UTC).
Hub.Handler.Id = "wDmBb7ChJj7qibCtn";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["IFC23.dll"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = ["game.cfg", "game_local.cfg", "lang.cfg", "user.cfg"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "GodMode.exe";
Game.SteamID = "227480";
Game.GUID = "God Mode";
Game.GameName = "God Mode";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.SupportsPositioning = true;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "GodMode";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SetWindowHookStart = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\227480\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.PreventGameFocus = false;
Game.Description =
  "You have to do this or this won't work: Press the windows keyboard key before the first instance opens, when all instances have opened and positioned press the windows key again to close the start menu. Create a game in one instance and the other players can join by selecting the host player in friends and select join, if you get crashes when startig a co-op game set each instance textures to low and ambient occlusion to off in the game graphics settings. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI. If you have the game in steam you need to open steam before running this.";
Game.UseDirectX9Wrapper = true;
Game.NotTopMost = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\game.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "VIDEO_TripleBuf = 0", Nucleus.SearchType.Contains) + "|VIDEO_TripleBuf = 1",
    Context.FindLineNumberInTextFile(txtPath, "VIDEO_TripleBuf = 1", Nucleus.SearchType.Contains) + "|VIDEO_TripleBuf = 0"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_interfaces.txt";
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