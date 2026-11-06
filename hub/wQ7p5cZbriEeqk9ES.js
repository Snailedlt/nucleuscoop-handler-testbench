Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Sep 15 2025 20:25:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "wQ7p5cZbriEeqk9ES";
Hub.Maintainer.Name = "messenils";
Hub.Maintainer.Id = "5NNQPxAD7mmwGuvKp";

var answers1 = ["No", "Yes"];
Game.AddOption("Start with Cnc-online?", "Makes online play possible and the supplied network fix is not necessary. make sure you got it installed before choosing Yes", "Cnconline", answers1);

var answers2 = ["No", "Yes"];
Game.AddOption(
  "change map zoom?",
  "Draws entire terrain and enables you to zoom out more. More demanding on hardware. Deactivate if you experience lagging. Also it may not be allowed in Cnc-online",
  "Zoom",
  answers2
);

var answers14 = ["0.1", "0.02", "0.05", "0.15", "0.2"];
Game.AddOption("Controller Deadzone", "Lower means less slack.", "Dead", answers14);

var answers15 = ["15", "10", "12", "20", "30"];
Game.AddOption("Controller sensitivity", "Controller emulated cursor speed. Higher is faster", "Sens", answers15);

var answers16 = ["No", "Yes"];
Game.AddOption("Controller Primary to Secondary", "Should Primary stick be secondary?", "Contype", answers16);

//game files
Game.FileSymlinkExclusions = [
  "generals.exe",
  "EasyHook32.dll",
  "SHook.exe",
  "SHook.ini",
  "GameData.ini",
  "CNCFix32.dll",
  "CNCFix.ini",
  "d3d8.dll",
  "dinput8.dll",
  "MinHook.x86.dll",
  "Xinput.ini",
  "dlls.cfg",
  "screenshot input.dll"
];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KillMutex = ["685EAFF2-3216-4265-B047-251C5F4B82F3"]; //game.dat
Game.PartialMutexSearchProcess = true;
Game.KillLastInstanceMutex = true;
Game.ExecutableName = "generals.exe";

Game.LauncherExeIgnoreFileCheck = true;

Game.GUID = "Command & Conquer (TM) Generals Zero Hour";
Game.GameName = "Command & Conquer (TM) Generals Zero Hour";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Command & Conquer (TM) Generals Zero Hour";
Game.ToggleUnfocusOnInputsLock = true;
//Game.SetTopMostAtEnd = true;

Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = false;
Game.SteamID = "2732960";
Game.UseSteamless = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;

Game.UseNucleusEnvironment = true;
Game.DocumentsConfigPath = "Command and Conquer Generals Zero Hour Data";

Game.Description =
  "Cursor breaks if game resizes. Keep monitors on same scale 100% to prevent this. Lock input with END key after game setup.\nIf you not have CnConline you can host on the first instance and join with the rest in the lan menu.\nIf you use CnConline you need to select online in menu and you can use the same email and password for all instances if you only use different nicknames.\nPress the END key again to unlock the input after finished playing.\nYou can also use CTRL+Q to close Nucleus and all its instances.\n\nXinput mapping:\nD-pad up/down zoom.\nPrimary stick: move cursor.\nSecondary stick: scroll map.\nTriggers: mousebuttons.";

Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 4;

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
Game.InjectHookXinput = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;

Game.ResetWindows = true;

//ProtoInput

Game.SupportsMultipleKeyboardsAndMice = true;
Game.ProtoInput.SendMouseDblClkMessages = true;

Game.ProtoInput.AutoHideTaskbar = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true; // Usually this works best
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
//Game.ProtoInput.AllowFakeCursorOutOfBounds = true;

Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = true;
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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;

Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

// These settings are the default and will be overwritten in the input lock.
// Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false; // Filters take priority over blocks, so disable the filter
Game.ProtoInput.BlockedMessages = [0x0008]; //WM_KILLFOCUS 0x0008//WM_MOUSELEAVE 0x2a3

Game.GamePlayBeforeGameSetup = true;
//Game.ForceProcessPick = true;
Game.Play = function() {
  var cnconline = Context.Options["Cnconline"];
  var zoom = Context.Options["Zoom"];
  var sens = Context.Options["Sens"];
  var contype = Context.Options["Contype"];
  var dead = Context.Options["Dead"];
  var gamefolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
  } else {
    Context.CopyFolder(Context.ScriptFolder + "\\Xinput", gamefolder);

    var savePath = gamefolder + "\\Xinput.ini";

    var XID = Context.GamepadId - 1;

    var dict = [Context.FindLineNumberInTextFile(savePath, "Controllerid=", Nucleus.SearchType.StartsWith) + "|Controllerid=" + XID];
    Context.ReplaceLinesInTextFile(savePath, dict);
    if (sens == "15") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Sensitivity=", Nucleus.SearchType.StartsWith) + "|Sensitivity=15.0",
        Context.FindLineNumberInTextFile(savePath, "Accel_Multiplier=", Nucleus.SearchType.StartsWith) + "|Accel_Multiplier=1.3",
        Context.FindLineNumberInTextFile(savePath, "Radial_Deadzone=", Nucleus.SearchType.StartsWith) + "|Radial_Deadzone=" + dead
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "10") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Sensitivity=", Nucleus.SearchType.StartsWith) + "|Sensitivity=10.0",
        Context.FindLineNumberInTextFile(savePath, "Accel_Multiplier=", Nucleus.SearchType.StartsWith) + "|Accel_Multiplier=1.1",
        Context.FindLineNumberInTextFile(savePath, "Radial_Deadzone=", Nucleus.SearchType.StartsWith) + "|Radial_Deadzone=" + dead
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "12") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Sensitivity=", Nucleus.SearchType.StartsWith) + "|Sensitivity=12.0",
        Context.FindLineNumberInTextFile(savePath, "Accel_Multiplier=", Nucleus.SearchType.StartsWith) + "|Accel_Multiplier=1.2",
        Context.FindLineNumberInTextFile(savePath, "Radial_Deadzone=", Nucleus.SearchType.StartsWith) + "|Radial_Deadzone=" + dead
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "20") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Sensitivity=", Nucleus.SearchType.StartsWith) + "|Sensitivity=20.0",
        Context.FindLineNumberInTextFile(savePath, "Accel_Multiplier=", Nucleus.SearchType.StartsWith) + "|Accel_Multiplier=1.3",
        Context.FindLineNumberInTextFile(savePath, "Radial_Deadzone=", Nucleus.SearchType.StartsWith) + "|Radial_Deadzone=" + dead
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "30") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Sensitivity=", Nucleus.SearchType.StartsWith) + "|Sensitivity=30.0",
        Context.FindLineNumberInTextFile(savePath, "Accel_Multiplier=", Nucleus.SearchType.StartsWith) + "|Accel_Multiplier=1.5",
        Context.FindLineNumberInTextFile(savePath, "Radial_Deadzone=", Nucleus.SearchType.StartsWith) + "|Radial_Deadzone=" + dead
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }

    if (contype == "Yes") {
      var dict = [Context.FindLineNumberInTextFile(savePath, "Righthanded=", Nucleus.SearchType.StartsWith) + "|Righthanded=1"];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
  }

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\generals.exe";
  var savePkgOrigin = Context.OrigRootFolder + "\\game.dat";
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  Context.Wait(500);

  if (zoom == "Yes") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Data\\INI\\GameData.ini";
    var savePkgOrigin = Context.ScriptFolder + "\\GameData.ini";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.AspectRatioDecimal > 1.8) {
      var ndict = [
        Context.FindLineNumberInTextFile(savePath, "  CameraHeight =", Nucleus.SearchType.StartsWith) + "|  CameraHeight = 450",
        Context.FindLineNumberInTextFile(savePath, "  MaxCameraHeight =", Nucleus.SearchType.StartsWith) + "|  MaxCameraHeight = 650",
        Context.FindLineNumberInTextFile(savePath, "  DrawEntireTerrain =", Nucleus.SearchType.StartsWith) + "|  DrawEntireTerrain = Yes"
      ];
    } else if (Context.AspectRatioDecimal < 1.3) {
      var ndict = [
        Context.FindLineNumberInTextFile(savePath, "  CameraHeight =", Nucleus.SearchType.StartsWith) + "|  CameraHeight = 300",
        Context.FindLineNumberInTextFile(savePath, "  MaxCameraHeight =", Nucleus.SearchType.StartsWith) + "|  MaxCameraHeight = 600",
        Context.FindLineNumberInTextFile(savePath, "  DrawEntireTerrain =", Nucleus.SearchType.StartsWith) + "|  DrawEntireTerrain = Yes"
      ];
    } else {
      var ndict = [
        Context.FindLineNumberInTextFile(savePath, "  CameraHeight =", Nucleus.SearchType.StartsWith) + "|  CameraHeight = 250",
        Context.FindLineNumberInTextFile(savePath, "  MaxCameraHeight =", Nucleus.SearchType.StartsWith) + "|  MaxCameraHeight = 600",
        Context.FindLineNumberInTextFile(savePath, "  DrawEntireTerrain =", Nucleus.SearchType.StartsWith) + "|  DrawEntireTerrain = Yes"
      ];
    }
    Context.ReplaceLinesInTextFile(savePath, ndict);
  }
  //retail
  //dwstyle retail
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "81 E2 F8 FF BF 00 81 C2 08 00 08 90",
    "BA 00 00 00 80 90 81 E2 00 00 00 80",
    true
  );
  Context.Wait(100);
  //retail direct launch 1st jump
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "75 32 8B 35 A0 9B A2 00 3B F3 89 75 10 0F 84 F2",
    "EB 32 8B 35 A0 9B A2 00 3B F3 89 75 10 0F 84 F2",
    true
  );
  Context.Wait(100);
  //retail direct launch last jump
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "73 76 8B 2D 14 92 93 00 8B 0D B4 9F 93 00 51 6A",
    "EB 76 8B 2D 14 92 93 00 8B 0D B4 9F 93 00 51 6A",
    true
  );
  Context.Wait(100);
  //retail direct launch last jump return value
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "32 C0 5B 83 C4 1C C3 8B 44 24 1C 6A 00 6A 00 6A",
    "B0 01 5B 83 C4 1C C3 8B 44 24 1C 6A 00 6A 00 6A",
    true
  );
  Context.Wait(100);
  //serial duplicate check retail
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "74 06 46 E9 9A FE FF FF 8B 55 40 B8 05 00 00 00",
    "90 90 46 E9 9A FE FF FF 8B 55 40 B8 05 00 00 00",
    true
  );

  //steam
  Context.Wait(100);
  //steamcheck
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "75 2D 56 68 24 DC 9C 00 68 EC DB 9C 00 56 FF 15",
    "EB 2D 56 68 24 DC 9C 00 68 EC DB 9C 00 56 FF 15",
    true
  );
  Context.Wait(100);
  //steamcheck messagebox
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    System.IO.Path.Combine(Context.RootFolder, "generals.exe"),
    "50 68 F4 57 A2 00 56 6A 00 FF 15 DC 35 94 00 85",
    "90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 85",
    true
  );

  //3C 4D 75 6E 6B 65 65 3E 00 00 00 00 25 64 2E 25 //74 1C 50 FF 15 34 92 93 00 8B 06 66 83 38 00 75
  var OriName = Context.Nickname;
  var PlayerName = OriName[0];

  for (var i = 1; i < OriName.length; i++) {
    PlayerName += "_00" + OriName[i];
  }
  var namePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Network.ini";
  if (System.IO.File.Exists(namePath)) {
    var ndict = [Context.FindLineNumberInTextFile(namePath, "UserName =", Nucleus.SearchType.StartsWith) + "|UserName = " + PlayerName + ""];
    Context.ReplaceLinesInTextFile(namePath, ndict);
  }

  var txtPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\options.ini";
  if (System.IO.File.Exists(txtPath)) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "Resolution =", Nucleus.SearchType.StartsWith) + "|Resolution = 800 600"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EasyHook32.dll";
  var savePkgOrigin = Context.ScriptFolder + "\\EasyHook32.dll";
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SHook.exe";
  var savePkgOrigin = Context.ScriptFolder + "\\SHook.exe";
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var aargs = " -win -xres " + Context.Width + " -yres " + Context.Height + " -quickstart";

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SHook.ini";
  var lines = ["[Settings]", "ProgramName=generals.exe" + aargs];
  Context.WriteTextFile(txtPath, lines);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins\\CNCFix32.dll";
  var savePkgOrigin = Context.ScriptFolder + "\\plugins\\CNCFix32.dll";
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (Context.PlayerID == 0) {
    var port = "0";
  }
  if (Context.PlayerID == 1) {
    var port = "3";
  }
  if (Context.PlayerID == 2) {
    var port = "6";
  }
  if (Context.PlayerID == 3) {
    var port = "9";
  }
  if (Context.PlayerID == 4) {
    var port = "12";
  }
  if (Context.PlayerID == 5) {
    var port = "15";
  }
  if (Context.PlayerID == 6) {
    var port = "18";
  }
  if (Context.PlayerID == 7) {
    var port = "21";
  }

  var player = Context.PlayerID + 1;

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins\\CNCFix.ini";
  var lines = ["[Settings]", "TargetHostname=Player" + player, "PortOffset=" + port];
  Context.WriteTextFile(txtPath, lines);

  if (cnconline == "Yes") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d8.dll";
    var savePkgOrigin = Context.OrigRootFolder + "\\d3d8.dll";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.StartArguments = aargs;

    Game.KillMutex = ["685EAFF2-3216-4265-B047-251C5F4B82F3", "95aaef3f-473a-4b8d-a89f-013cd1536108"];
  } else {
    Game.LauncherExe = "SHook.exe";
    Game.ExecutableToLaunch = "SHook.exe";

    Game.PauseBetweenContextAndLaunch = 3;
    Game.PauseBetweenProcessGrab = 5;
    Game.PauseBetweenStarts = 30;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsXInput) {
      } else {
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
        ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, true);
      }
      // Disable the bypass: Don't allow any raw input to pass. Doing this for all players otherwise with mixed keyboard and gamepad players you need to be careful to focus a keyboard player before locking inputs.
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsXInput) {
        //ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
      } else {
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);

        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, false);
        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      }
      // Enable the bypass: allow any raw input to pass
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};