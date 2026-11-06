Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Aug 03 2021 06:19:41 GMT+0000 (UTC).
Hub.Handler.Id = "nHgod932fXJtmndaK";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["berkelium.dll"];
Game.KillMutex = ["ChromeEngine4DIMutex"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "DeadIslandGame_x86_rwdi.exe";
Game.SteamID = "216250";
Game.GUID = "Dead Island Riptide";
Game.GameName = "Dead Island: Riptide";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-nologos -AlwaysFocus";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dead Island Riptide";
Game.HasDynamicWindowTitle = true;
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\Riptide\\out\\settings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\216250\\remote";
Game.Description =
  "Enable xbox gamepads in the game options per instance for the gamepad instances, apply and relaunch via Nucleus, if you use a keyboard instance enable keyboard/mouse in the game options for just that instance instead. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.PauseBetweenProcessGrab = 8;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\video.scr";

  var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
  Context.ReplacePartialLinesInTextFile(savePath, [resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"]);

  var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
  Context.RemoveLineInTextFile(savePath, fsLine);

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
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION006",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);
};