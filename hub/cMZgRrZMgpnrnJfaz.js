Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Jan 05 2022 14:03:23 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "cMZgRrZMgpnrnJfaz";
Hub.Maintainer.Name = "Snailedlt";
Hub.Maintainer.Id = "SE7kdQcCoCbgkzDeH";

Game.ExecutableContext = ["pvkii"];
Game.KillMutex = ["hl2_singleton_mutex"];
Game.DirSymlinkExclusions = ["bin", "sdkbase_pvkii\\pvkii\\cfg"];
Game.FileSymlinkExclusions = ["x360controller.cfg", "autoexec.cfg", "steam_appid.txt"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "pvkii.exe";
Game.SteamID = "360";
Game.GUID = "Pirates Vikings and Knights II";
Game.GameName = "Pirates Vikings and Knights II";
Game.UseGoldberg = true;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = false;
Game.HideTaskbar = true;
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.CFG;
Game.BinariesFolder = "sdkbase_pvkii";
Game.WorkingFolder = "";
Game.SupportsPositioning = false;
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 16;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Pirates, Vikings and Knights II";
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
  "In order to get the script working  you need to move and the `pvkii` folder into `sdkbase_pvkii`. If a prompt comes up to replace the files, click yes." +
  "So the new path for pvkii will now be `pirates, vikings and knights ii\\sdkbase_pvkii\\pvkii`." +
  "Please note that controller config might not be optimal, if you want to change the controls in any way, please edit the cfg file inside YOUR_NUCLEUSCOOP_FOLDER\\scripts\\Pirates Vikings and Knights II." +
  "Start a server on the first instance. Start the next instance when you are in-game. Click on the last Nucleus prompt when all instances are set." +
  " If you use the keyboard click/alt-tab on the corresponding keyboard-player instance.";

Game.Play = function() {
  var Args = (Context.Args = " -windowed +sv_lan 1 -game pvkii -steam -AlwaysFocus -insecure -novid +m_rawinput 1 " + " -w " + Context.Width + " -h " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\sdkbase_pvkii\\pvkii\\cfg\\360controller.cfg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "360controller.cfg");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\sdkbase_pvkii\\pvkii\\cfg\\autoexec.cfg";
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