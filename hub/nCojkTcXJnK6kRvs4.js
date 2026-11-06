Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Aug 03 2021 06:17:53 GMT+0000 (UTC).
Hub.Handler.Id = "nCojkTcXJnK6kRvs4";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["engine_x86_rwdi.dll"];
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
Game.ExecutableName = "DeadIslandGame.exe";
Game.SteamID = "91310";
Game.GUID = "Dead Island";
Game.GameName = "Dead Island";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-nologos -AlwaysFocus";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dead Island";
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
Game.UserProfileConfigPath = "Documents\\DeadIsland\\out\\settings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\91310";
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
    "SteamClient010",
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
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);
};