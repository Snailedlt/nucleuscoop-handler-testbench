Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Aug 25 2025 09:04:29 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "EjJLt5yBadfKfNdaW";
Hub.Maintainer.Name = "THEKlNG";
Hub.Maintainer.Id = "5EhQGHyiGFZA689yF";

var answers = ["No", "Yes"];
var answers1 = ["No", "Yes"];
var answers2 = ["65", "70", "75", "80", "90"];
var answers3 = ["vsync", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "200"];
var answers4 = ["Automatic", "Low", "Normal", "High", "Extra"];
var answers5 = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"];
var answers6 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
var answers7 = [];
var answers8 = ["No mod", "Yes", "Custom mod"];
Game.AddOption(
  "Start the game with PeZBots MOD?",
  "Bots will go away if you start a new game so you need to press F5 in your keyboard to return the number of bots you have selected.",
  "Mod",
  answers8
);
Game.AddOption("Custom mod launcher", "Put your custom mod in the 'Mods' folder inside the instance or your root game folder, and write its folder name here.", "MOD", answers7);
Game.AddOption("Number of Bots", "The chosen amount of bots will be added for each team.", "Bots", answers6);
Game.AddOption("Bot skill level", "Bot skill level (1.0 = highest, 0.1 = lowest).", "Skill", answers5);
Game.AddOption("Graphic settings", "", "Graphics", answers4);
Game.AddOption("FPS Cap", "", "FPS", answers3);
Game.AddOption("Field of view", "65 = Default\nyou can choose higher for better view", "FOV", answers2);
Game.AddOption("Unlock all stats?", "Level up to 55 with all challenges, guns, and every camouflage unlocked!", "Unlock", answers1);
Game.AddOption("Apply registry fix for CD key?", "Needed for the unlock all stats option to work and to connect to online servers.", "registry", answers);

Game.DirExclusions = ["players", "pezbots"];
Game.FileSymlinkCopyInstead = ["binkw32.dll", "mss32.dll", "miles32.dll", "cod.bmp", "codlogo.bmp"];
Game.BackupFolders = ["players"];
Game.GameName = "Call of Duty 4: Modern Warfare (2007)";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.ExecutableName = "iw3mp.exe";
Game.GUID = "Call of Duty 4 Modern Warfare";
Game.SteamID = "7940";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 32;
Game.HideTaskbar = false;
Game.UseNucleusEnvironment = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Call of Duty 4";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.KillProcessesOnClose = ["Aspects Fixer", "prompt1", "prompt2"];
Game.UserProfileSavePath = "AppData\\Local\\CallofDuty4MW";
Game.Description =
  "This handler works with the legit Steam Version and COD4X mod version.\n\nYou can get the latest patches and client version 21_1 from this link (https://cod4x.ovh/t/cod4x-releases/24) if you are using the CODX4 mod.\n\nFor best performance fully close Steam before using the handler.\n\nThis handler includes a Bots mod and autoit exe files (make sure you make an exception to the handler folder in your Antivirus as to not remove or block any files of the handler).\n\nIf you want to launch your custom mod just put it in the 'Mods' folder into your main game or instance folder and write its folder name in the custom mod Nucleus UI option, the mod will launch automatically when you enter the game.\n\nCreate a match with the first instance and there are 2 ways for other players to join:\n\n1)Press '~' in your keyboard and type 127.0.0.1 local direct ip in the console and connect to the server.\n\n2)When you are in the main menu click join game and choose Favorites or Lan then you can see the host server appear, click on it and connect normally.\n\nOnce all the players have connected to the server you can quickly restart the match by pressing F3 on the first player keyboard.\n\nAfter all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.\n\nHave Fun!";
Game.PauseBetweenContextAndLaunch = 3;
Game.PauseBetweenProcessGrab = 20;
Game.PauseBetweenStarts = 10;

//USS deprecated options:

Game.InjectHookXinput = false;
Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;
Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.FindWindowHook = true;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\Aspects Fixer.exe"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\prompt1.exe"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\prompt2.exe"], false, 10);

  var Args = " +ui_playerProfileAlreadyChosen 1 ";
  var Playername = Context.Nickname;
  Context.StartArguments = Args;

  var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername;
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername);
  System.IO.Directory.CreateDirectory(filePath);

  var txtPath = Context.ScriptFolder + "\\aspects.txt";
  var lines = ["" + Context.AspectRatioDecimal];
  Context.WriteTextFile(txtPath, lines);

  var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\active.txt";
  var lines = ["" + Playername];
  Context.WriteTextFile(txtPath, lines);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\active.txt";
  var lines = ["" + Playername];
  Context.WriteTextFile(txtPath, lines);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg")) {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Config\\config_mp.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg")) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Config\\config_mp.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Unlock = Context.Options["Unlock"];
  if (Unlock == "Yes") {
    var datapath = (Context.SavePath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\mpdata");
    var saveOrigin = System.IO.Path.Combine(Game.Folder, "PeZBOT\\mpdata");
    System.IO.File.Copy(saveOrigin, datapath, true);

    var datapath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\mpdata");
    var saveOrigin = System.IO.Path.Combine(Game.Folder, "PeZBOT\\mpdata");
    System.IO.File.Copy(saveOrigin, datapath, true);
  }

  var registry = Context.Options["registry"];
  if (registry == "Yes") {
    Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\Activision\\Call of Duty 4", "codkey", "DL2J8PY44Q22GE4888D2", Nucleus.RegType.String);
  }

  var Mod = Context.Options["Mod"];
  if (Mod == "Yes") {
    var Skill = Context.Options["Skill"];
    var Bots = Context.Options["Bots"];
    var unlock = Context.Options["Unlock"];
    if (unlock == "Yes") {
      unlock = "1";
    }
    if (unlock == "No") {
      unlock = "0";
    }

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods");
    System.IO.Directory.CreateDirectory(filePath);

    var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\pezbots";
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\pezbots\\mod.ff";
    var savePkgOrigin = Context.ScriptFolder + "\\PeZBOT\\mod.ff";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\pezbots\\pezbot_dev.cfg";
    var savePkgOrigin = Context.ScriptFolder + "\\PeZBOT\\pezbot_dev.cfg";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\pezbots\\pezbot.iwd";
    var savePkgOrigin = Context.ScriptFolder + "\\PeZBOT\\pezbot.iwd";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Mods\\pezbots\\pezbot.cfg";
    var lines = [
      'set svr_pezbots "' + Bots + '"',
      'set svr_pezbots_allies "0"',
      'set svr_pezbots_axis "0"',
      'set svr_pezbots_skill "' + Skill + '"',
      'set svr_pezbots_playstyle "2"',
      'set svr_pezbots_useperks "1"',
      'svr_pezbots_modelchoice "0"',
      'set svr_pezbots_chatter "1"',
      'set svr_pezbots_dewards "0"',
      'set svr_pezbots_grenadepickup "1"',
      'set svr_pezbots_XPcheat "' + unlock + '"',
      'set svr_pezbots_roundCount "2"',
      'set svr_pezbots_mode "normal"',
      'bind F5 "exec pezbot.cfg"'
    ];
    Context.WriteTextFile(cfgPath, lines);

    Args += '+set fs_game "Mods/pezbots" +exec pezbot.cfg';
    Context.StartArguments = Args;
  }
  if (Mod == "Custom mod") {
    var MOD = Context.Options["MOD"];

    Args += '+set fs_game "Mods/' + MOD + '"';
    Context.StartArguments = Args;
  }

  var FOV = Context.Options["FOV"];

  var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "' + FOV + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "auto"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_displayMode", Nucleus.SearchType.StartsWith) + '|seta r_displayMode "windowed (no border)"',
    Context.FindLineNumberInTextFile(cfgPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Playername + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta intro", Nucleus.SearchType.StartsWith) + '|seta intro "0"',
    Context.FindLineNumberInTextFile(cfgPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "' + Context.PosX + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + Context.PosY + '"'
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "' + FOV + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "auto"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta r_displayMode", Nucleus.SearchType.StartsWith) + '|seta r_displayMode "windowed (no border)"',
    Context.FindLineNumberInTextFile(cfgPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Playername + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta intro", Nucleus.SearchType.StartsWith) + '|seta intro "0"',
    Context.FindLineNumberInTextFile(cfgPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "' + Context.PosX + '"',
    Context.FindLineNumberInTextFile(cfgPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + Context.PosY + '"'
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  var FPS = Context.Options["FPS"];

  if (FPS == "vsync") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"'];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"'];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "30") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "30"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "30"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "40") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "40"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "40"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "50") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "50"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "50"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "60") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "60"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "60"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "70") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "70"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "70"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "80") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "80"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "80"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "90") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "90"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "90"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "100") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "100"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "100"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "110") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "110"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "110"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "120") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "120"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "120"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
  if (FPS == "200") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "200"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "200"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  var Graphics = Context.Options["Graphics"];

  if (Graphics == "Automatic") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  if (Graphics == "Low") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  if (Graphics == "Normal") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  if (Graphics == "High") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  if (Graphics == "Extra") {
    var cfgPath = Context.EnvironmentPlayer + "\\AppData\\Local\\CallofDuty4MW\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\profiles\\" + Playername + "\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_picmip_water", Nucleus.SearchType.StartsWith) + '|seta r_picmip_water "0"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(cfgPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);
      System.Threading.Thread.Sleep(1000);
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };
};