Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Apr 23 2020 16:37:23 GMT+0000 (UTC).
Hub.Handler.Id = "dDXFjwcZiwC7wNjJ8";
Hub.Maintainer.Name = "Snailedlt";
Hub.Maintainer.Id = "SE7kdQcCoCbgkzDeH";

Game.ExecutableContext = ["hl1mp"];
Game.KillMutex = ["hl2_singleton_mutex"];
Game.DirSymlinkExclusions = ["bin", "hl1mp\\cfg"];
Game.FileSymlinkExclusions = ["x360controller.cfg", "autoexec.cfg", "steam_appid.txt"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "hl2.exe";
Game.SteamID = "360";
Game.GUID = "Half Life Deathmatch Source";
Game.GameName = "Half Life Deathmatch Source";
Game.UseGoldberg = true;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = false;
Game.HideTaskbar = true;
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.CFG;
Game.WorkingFolder = "";
Game.SupportsPositioning = false;
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 16;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "HALF-LIFE: Deathmatch";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.PauseBetweenStarts = 20;
Game.KillMutexType = "Mutant";
Game.KillMutexDelay = 15;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll", "Dinput8.dll"];
Game.UseDevReorder = false; //set on true could help for split input if you use Dinput controllers
Game.PromptBetweenInstances = true;
Game.PartialMutexSearch = true;
Game.RenameNotKillMutex = false;
Game.Hook.ForceFocus = false;
Game.HookFocus = true;
Game.FakeFocus = false;
Game.PauseBetweenStarts = 40;
Game.Description =
  "Start a server on the first instance. Start the next instance when you are in-game. Click on the last Nucleus prompt when all instances are set. If you use the keyboard click/alt-tab on the corresponding keyboard-player instance.";

Game.Play = function() {
  var Args = (Context.Args = " -windowed +sv_lan 1 -game hl1mp -AlwaysFocus -insecure -novid +m_rawinput 1 " + " -w " + Context.Width + " -h " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hl1mp\\cfg\\360controller.cfg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "360controller.cfg");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hl1mp\\cfg\\autoexec.cfg";
  var lines = [
    "engine_no_focus_sleep 0", // game will not limit fps when is not focused (must used)
    "fps_max 60" // FPS limiter
  ];

  if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
    lines.push("joystick 0");
    lines.push("exec undo360controller.cfg");
  } else {
    lines.push("exec 360controller.cfg");
  }

  Context.WriteTextFile(autoExec, lines);
  if (Context.PlayerID == 0) {
  } else {
    lines.push("connect " + Context.User.GetLocalIP());
  }

  Context.WriteTextFile(autoExec, lines);
};