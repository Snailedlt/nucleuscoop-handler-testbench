Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Jul 04 2022 00:20:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "p4ZbA8NPfweX9W3es";
Hub.Maintainer.Name = "gotenks";
Hub.Maintainer.Id = "PKW8fDRgHFm6aPaYH";

Game.GameName = "Roller Champions";
Game.GUID = "Roller Champions";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.Description =
  "Need multiple accounts with the game, its free to play, sign in in all the launchers first, then start the game manually on the first launcher, after the game opens click on the prompt to continue, repeat the same for the other instances,if using keyboard and mouse set it as the last player, to connect the instances send a game invite to the others players, accept it in the others, and make any other player the party leader, then you can search an online match or create a custom one. always online needed.";
Game.ExecutableName = "Roller.exe";
Game.BinariesFolder = "";
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.LauncherExe = "start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.LauncherTitle = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenStarts = 10;
Game.ProcessChangesAtEnd = true;
Game.PromptBetweenInstancesEnd = true;
Game.MutexProcessExe = "upc.exe";
Game.KillMutexProcess = ["ubisoft_game_launcher_session_mutex_0"];
Game.KillMutex = ["Type:Semaphore|scimitar_semaphore"];
Game.KillMutexAtEnd = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = true;
Game.SupportsKeyboard = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Roller";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.PauseBetweenContextAndLaunch = 10;
Game.KillProcessesOnClose = ["start", "cmd", "upc"];

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ubisoft\\Roller", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ubisoft\\Roller", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ubisoft\\Roller", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ubisoft\\Roller", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var lines = [
    "chcp 65001",
    "echo off",
    'For /f "Tokens=2*" %%x In (\'Reg.exe Query "HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Ubisoft\\Launcher" /v InstallDir\') Do Set exe_path=%%y',
    'start "" /B "%exe_path%upc.exe"'
  ];
  Context.WriteTextFile(Bat, lines);
};