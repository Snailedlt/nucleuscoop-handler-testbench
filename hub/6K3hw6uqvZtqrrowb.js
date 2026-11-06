Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Aug 03 2021 06:20:44 GMT+0000 (UTC).
Hub.Handler.Id = "6K3hw6uqvZtqrrowb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["bink2w64.dll", "DI"];
Game.KillMutex = ["ChromeEngine4DIMutex"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "DeadIslandGame.exe";
Game.SteamID = "383150";
Game.GUID = "Dead Island Definitive Edition";
Game.GameName = "Dead Island Definitive Edition";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-nologos -AlwaysFocus";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dead Island - Definitive Edition";
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
Game.UserProfileConfigPath = "Documents\\DeadIslandDE\\out\\settings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\383150\\remote";
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
};