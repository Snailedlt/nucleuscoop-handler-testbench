Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Apr 05 2021 12:36:41 GMT+0000 (UTC).
Hub.Handler.Id = "nzmoCbyEvQNd7LFEo";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers1 = [
  "-",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32"
];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "Id", answers1);

Game.CustomUserGeneralPrompts = [
  "If you are playing in LAN with other PCs, enter the IP of the Host computer only if this PC is a Client (if you are just playing on the same PC or this is the Host PC, leave it blank)."
];
Game.SaveAndEditCustomUserGeneralValues = false;

Game.ExecutableContext = ["cstrike"];
Game.KillMutex = ["hl2_singleton_mutex"];
Game.DirSymlinkExclusions = ["bin", "cstrike\\cfg"];
Game.FileSymlinkExclusions = ["x360controller.cfg", "autoexec.cfg", "steam_appid.txt"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "hl2.exe";
Game.SteamID = "240";
Game.GUID = "Counter Strike Source";
Game.GameName = "Counter Strike Source";
Game.UseGoldberg = true;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = false;
Game.HideTaskbar = true;
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.CFG;
Game.WorkingFolder = "";
Game.SupportsPositioning = false;
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 32;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Counter Strike Source";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
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

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = true;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Description =
  "Start a server on the first instance. Start the next instance when you are in-game. Click on the last Nucleus prompt when all instances are set and press the 'END' key for restrict the keyboards input (press it again for release it). You can press F8 for pause the server.";

Game.Play = function() {
  if (Player.IsKeyboardPlayer) {
    Game.FakeFocus = true;
    Game.HookMouseVisibility = true;
  } else {
    Game.FakeFocus = false;
    Game.HookMouseVisibility = false;
  }

  var Args = (Context.Args = " -windowed -game cstrike -AlwaysFocus -insecure -novid " + " -w " + Context.Width + " -h " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\cstrike\\cfg\\360controller.cfg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "360controller.cfg");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var fps = Context.Options["Fps"];

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\cstrike\\cfg\\autoexec.cfg";
  var lines = [
    "sv_lan 1",
    "sv_pausable 1",
    "engine_no_focus_sleep 0", // game will not limit fps when is not focused (must used)
    "bind F8 pause",
    "fps_max " + fps, // FPS limiter
    "host_writeconfig"
  ];

  if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
    lines.push("joystick 0");
    lines.push("joystick_force_disabled 1");
    lines.push("joystick_force_disabled_set 1");
    lines.push("m_rawinput 1");
    lines.push("exec undo360controller.cfg");
  } else {
    lines.push("joystick_force_disabled_set 0");
    lines.push("joystick_force_disabled 0");
    lines.push("joystick 1");
    lines.push("m_rawinput 0");
    lines.push("exec 360controller.cfg");
  }

  if (Context.CustomUserGeneralValues[0] == null) {
    if (Context.PlayerID == 0) {
    } else {
      lines.push("connect " + Context.LocalIP);
    }

    Context.WriteTextFile(autoExec, lines);
  } else if (Context.CustomUserGeneralValues[0] != null) {
    lines.push("connect " + Context.CustomUserGeneralValues[0]);
  }

  Context.WriteTextFile(autoExec, lines);

  var id = Context.Options["Id"];

  if (id != "-") {
    Game.GoldbergIgnoreFileCheck = true;
    Game.GoldbergWriteSteamIDAndAccounts = false;

    if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings")) {
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings");
      System.IO.Directory.CreateDirectory(filePath);
    }
    var Account = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\account_name.txt";
    var Nick = [Player.Nickname];
    Context.WriteTextFile(Account, Nick);

    var idF = 33 * id + Context.PlayerID;

    if (id < 3) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 3 && Context.PlayerID == 0) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 3 && Context.PlayerID > 0) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 3 && id < 30) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 30 && Context.PlayerID < 11) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 30 && Context.PlayerID > 10) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 30) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
  }
};