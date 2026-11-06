Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Jun 05 2024 18:19:44 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "aEcRSpZ7Sr2zwCDWk";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Stronghold Crusader", "Stronghold Crusader Extreme"];
Game.AddOption("Would you like to launch Stronghold Crusader or Stronghold Crusader Extreme?", "", "Game", answers1);
var answers2 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 1:", "Choose a resolution that is smaller or equal to each instance's view space.", "P1Res", answers2);
var answers3 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 2:", "", "P2Res", answers3);
var answers4 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 3:", "", "P3Res", answers4);
var answers5 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 4:", "", "P4Res", answers5);
var answers6 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 5:", "", "P5Res", answers6);
var answers7 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 6:", "", "P6Res", answers7);
var answers8 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 7:", "", "P7Res", answers8);
var answers9 = ["Automatic", "800x600", "1024x768", "1280x720", "1280x1024", "1366x768", "1440x900", "1600x900", "1680x1050", "1920x1080", "2560x1440"];
Game.AddOption("Select your resolution for Player 8:", "", "P8Res", answers9);
var answers10 = ["Yes", "No"];
Game.AddOption("Would you like to retain the original aspect ratio of your selected resolution?", "Selecting no will stretch the game to fit the viewing space.", "Aspect", answers10);
var answers11 = ["Default", "30", "45", "80", "100", "120", "180", "240"];
Game.AddOption("Select your game speed:", "Default is 60. Double is 120.", "Speed", answers11);

Game.KillMutex = ["FireflyStrongholdCrusadersExtreme"];
Game.FileSymlinkExclusions = ["ddraw.dll", "ddraw.ini"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Stronghold Crusader.exe";
Game.GUID = "Stronghold Crusader HD";
Game.GameName = "Stronghold Crusader HD";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Stronghold Crusader";
Game.HasDynamicWindowTitle = true;
Game.DontResize = true;
Game.DontReposition = true;
Game.SetWindowHookStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "Stronghold Crusader";
Game.DocumentsSavePath = "Stronghold Crusader\\Saves";
Game.Description =
  "Wait until setup is complete before pressing END to lock input and allow each player to use their own cursor. Host a TCP/IP game and join with the rest. You can press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and all of it's instances.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 10;

//USS deprecated options:

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

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = true;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var aspect = Context.Options["Aspect"];
  var game = Context.Options["Game"];
  var speed = Context.Options["Speed"];
  var res0 = Context.Options["P1Res"];
  var res1 = Context.Options["P2Res"];
  var res2 = Context.Options["P3Res"];
  var res3 = Context.Options["P4Res"];
  var res4 = Context.Options["P5Res"];
  var res5 = Context.Options["P6Res"];
  var res6 = Context.Options["P7Res"];
  var res7 = Context.Options["P8Res"];

  if (game == "Stronghold Crusader Extreme") {
    Game.ExecutableToLaunch = "Stronghold_Crusader_Extreme.exe";
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\crusaderExtreme.cfg";
  } else {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\crusader.cfg";
  }

  if (Context.PlayerID == 0) {
    var res = res0;
  }
  if (Context.PlayerID == 1) {
    var res = res1;
  }
  if (Context.PlayerID == 2) {
    var res = res2;
  }
  if (Context.PlayerID == 3) {
    var res = res3;
  }
  if (Context.PlayerID == 4) {
    var res = res4;
  }
  if (Context.PlayerID == 5) {
    var res = res5;
  }
  if (Context.PlayerID == 6) {
    var res = res6;
  }
  if (Context.PlayerID == 7) {
    var res = res7;
  }

  if (res == "Automatic") {
    if (Context.Width >= 2560 && Context.Height >= 1440) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_2560x1440.cfg");
    } else if (Context.Width >= 1920 && Context.Height >= 1080) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1920x1080.cfg");
    } else if (Context.Width >= 1680 && Context.Height >= 1050) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1680x1050.cfg");
    } else if (Context.Width >= 1600 && Context.Height >= 900) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1600x900.cfg");
    } else if (Context.Width >= 1400 && Context.Height >= 900) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1400x900.cfg");
    } else if (Context.Width >= 1366 && Context.Height >= 768) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1366x768.cfg");
    } else if (Context.Width >= 1280 && Context.Height >= 1024) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1280x1024.cfg");
    } else if (Context.Width >= 1280 && Context.Height >= 720) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1280x720.cfg");
    } else if (Context.Width >= 1024 && Context.Height >= 768) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_1024x768.cfg");
    } else if (Context.Width >= 800 && Context.Height >= 600) {
      var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_800x600.cfg");
    }
  } else {
    var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "crusader_" + res + ".cfg");
  }
  System.IO.File.Copy(cfgPkgOrigin, cfgPath, true);

  if (Context.PlayerID > 0) {
    Context.PatchFile(System.IO.Path.Combine(cfgPath), System.IO.Path.Combine(cfgPath), [0x00, 0x00, 0x00, 0x5a, 0x00], [0x00, 0x00, 0x00, 0x00, 0x00]);
  }

  Context.PatchFile(
    System.IO.Path.Combine(cfgPath),
    System.IO.Path.Combine(cfgPath),
    [0x50, 0x00, 0x6c, 0x00, 0x61, 0x00, 0x79, 0x00, 0x65, 0x00, 0x72, 0x00, 0x31],
    [0x50, 0x00, 0x6c, 0x00, 0x61, 0x00, 0x79, 0x00, 0x65, 0x00, 0x72, 0x00, 0x30 + (Context.PlayerID + 1)]
  );

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.dll";
  var savePkgOrigin = Context.ScriptFolder + "\\ddraw.dll";
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.ini";
  var savePkgOrigin = Context.ScriptFolder + "\\ddraw.ini";
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var iniPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.ini";
  if (aspect == "No") {
    var dict = [Context.FindLineNumberInTextFile(iniPath, "maintas=", Nucleus.SearchType.StartsWith) + "|maintas=false"];
    Context.ReplaceLinesInTextFile(iniPath, dict);
  }

  if (speed == "Default") {
    var dict = [Context.FindLineNumberInTextFile(iniPath, "maxgameticks=", Nucleus.SearchType.StartsWith) + "|maxgameticks=60"];
    Context.ReplaceLinesInTextFile(iniPath, dict);
  } else {
    var dict = [Context.FindLineNumberInTextFile(iniPath, "maxgameticks=", Nucleus.SearchType.StartsWith) + "|maxgameticks=" + speed];
    Context.ReplaceLinesInTextFile(iniPath, dict);
  }

  var dict = [
    Context.FindLineNumberInTextFile(iniPath, "width=", Nucleus.SearchType.StartsWith) + "|width=" + Context.Width,
    Context.FindLineNumberInTextFile(iniPath, "height=", Nucleus.SearchType.StartsWith) + "|height=" + Context.Height,
    Context.FindLineNumberInTextFile(iniPath, "custom_width=", Nucleus.SearchType.StartsWith) + "|custom_width=" + Context.Width,
    Context.FindLineNumberInTextFile(iniPath, "custom_height=", Nucleus.SearchType.StartsWith) + "|custom_height=" + Context.Height,
    Context.FindLineNumberInTextFile(iniPath, "posX=", Nucleus.SearchType.StartsWith) + "|posX=" + Context.PosX,
    Context.FindLineNumberInTextFile(iniPath, "posY=", Nucleus.SearchType.StartsWith) + "|posY=" + Context.PosY
  ];
  Context.ReplaceLinesInTextFile(iniPath, dict);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};