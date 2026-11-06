Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Jul 31 2025 07:46:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Xwb5LFebnhEACXKW2";
Hub.Maintainer.Name = "messenils";
Hub.Maintainer.Id = "5NNQPxAD7mmwGuvKp";

var answers10 = ["YES", "NO"];
Game.AddOption(
  "Would you like to retain the original aspect ratio of your selected resolution?",
  "Selecting no will stretch the game to fit the viewing space. Option invalid if widescreen mod exist",
  "Aspect",
  answers10
);

var answers11 = ["normal", "slow", "fast", "faster"];
Game.AddOption("Controller sensitivity", "Controller emulated cursor speed.", "Sens", answers11);

var answers12 = ["No", "Yes"];
Game.AddOption("Controller Primary to Secondary", "Should Primary stick be secondary?", "Contype", answers12);

Game.DirSymlinkCopyInstead = ["HeroData"];

Game.FileSymlinkExclusions = ["ddraw.dll", "ddraw.ini", "d3d9.dll", "MinHook.x86.dll", "screenshot input.dll", "Xinput.ini"];

//Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.RequiresAdmin = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Battlecry III.exe";
Game.GUID = "Warlords Battlecry III";
Game.GameName = "Warlords Battlecry III";

//Game.ChangeExe = true;
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Warlords Battlecry III";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;

//Game.DocumentsConfigPath = "Warlords Battlecry III";
Game.DocumentsSavePath = "Warlords Battlecry III\\Saved Games";
Game.Description =
  "Handler also supports the widescreen patch at: www.moddb.com/mods/warlords-battlecry-iii-widescreen-patch/downloads/wbc3-104-beta-2. Wait until setup is complete before pressing END to lock input and allow each player to use their own cursor. Host a TCP/IP game and join with the rest. You can press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and all of it's instances.\n\nController mapping:\nR2 convert buildings. R3 stop. X available worker. Y build. A radius. B inventory\nPrimary stick mouse. Secondary scroll. Triggers mouse clicks. Dpad map scroll";
Game.PauseBetweenContextAndLaunch = 4;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 2;
Game.GamePlayBeforeGameSetup = true;
Game.ToggleUnfocusOnInputsLock = true;

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

//ProtoInput

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
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActivateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 50000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008];
Game.Play = function() {
  var aspect = Context.Options["Aspect"];
  var sens = Context.Options["Sens"];
  var contype = Context.Options["Contype"];
  var gamefolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
  } else {
    var savePath = gamefolder + "\\dlls.cfg";
    var savePkgOrigin = Context.ScriptFolder + "\\dlls.cfg";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = gamefolder + "\\MinHook.x86.dll";
    var savePkgOrigin = Context.ScriptFolder + "\\MinHook.x86.dll";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //crash with dsound
    var savePath = gamefolder + "\\d3d9.dll";
    var savePkgOrigin = Context.ScriptFolder + "\\dsound.dll";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = gamefolder + "\\screenshot input.dll";
    var savePkgOrigin = Context.ScriptFolder + "\\screenshot input.dll";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = gamefolder + "\\Xinput.ini";
    var savePkgOrigin = Context.ScriptFolder + "\\Xinput.ini";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var XID = Context.GamepadId - 1;

    var dict = [Context.FindLineNumberInTextFile(savePath, "Controllerid=", Nucleus.SearchType.StartsWith) + "|Controllerid=" + XID];
    Context.ReplaceLinesInTextFile(savePath, dict);
    if (sens == "slow") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=2400",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=3200"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "normal") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=1750",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=2500"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "fast") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=1200",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=1800"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }

    if (contype == "Yes") {
      var dict = [Context.FindLineNumberInTextFile(savePath, "Righthanded=", Nucleus.SearchType.StartsWith) + "|Righthanded=1"];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
  }

  //widesceen?
  var widefile = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SDL2.dll";
  if (System.IO.File.Exists(widefile)) {
    //was unable to modify config file
    //injecting resolution.

    //findwindow
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      "74 07 32 C0 E9 28 01 00 00 C7 45 E8 00 00 00 00",
      "EB 07 32 C0 E9 28 01 00 00 C7 45 E8 00 00 00 00",
      true
    );

    //prepare width patch
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      "83 C4 0C 8B 50 14 89 15 60 14 2C 01 68 00 03 00 00",
      "BA 00 07 00 00 90 89 15 60 14 2C 01 6A 00 83 C4 0C",
      true
    );

    //prepare height patch
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      "83 C4 0C 8B 48 14 89 0D 64 14 2C 01 68 00 04 00 00",
      "B9 00 07 00 00 90 89 0D 64 14 2C 01 6A 00 83 C4 0C",
      true
    );

    Context.Wait(100);

    //apply Y
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      "B9 00 07 00 00 90 89 0D 64 14 2C 01 6A 00 83 C4 0C",
      Context.Height,
      2,
      true
    );

    //apply X
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Battlecry III.exe"),
      "BA 00 07 00 00 90 89 15 60 14 2C 01 6A 00 83 C4 0C",
      Context.Width,
      2,
      true
    );
  } else {
    //no widescreen
    Game.IdInWindowTitle = true;
    if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
    } else {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "DrawFakeCursor=", Nucleus.SearchType.StartsWith) + "|DrawFakeCursor=0",
        Context.FindLineNumberInTextFile(savePath, "IgnoreRect=", Nucleus.SearchType.StartsWith) + "|IgnoreRect=1"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    var aspect = Context.Options["Aspect"];

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.dll";
    var savePkgOrigin = Context.ScriptFolder + "\\ddraw.dll";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.ini";
    var savePkgOrigin = Context.ScriptFolder + "\\ddraw.ini";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var iniPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ddraw.ini";
    var dict = [
      Context.FindLineNumberInTextFile(iniPath, "width=", Nucleus.SearchType.StartsWith) + "|width=" + Context.Width,
      Context.FindLineNumberInTextFile(iniPath, "height=", Nucleus.SearchType.StartsWith) + "|height=" + Context.Height,
      Context.FindLineNumberInTextFile(iniPath, "custom_width=", Nucleus.SearchType.StartsWith) + "|custom_width=" + Context.Width,
      Context.FindLineNumberInTextFile(iniPath, "custom_height=", Nucleus.SearchType.StartsWith) + "|custom_height=" + Context.Height,
      Context.FindLineNumberInTextFile(iniPath, "posX=", Nucleus.SearchType.StartsWith) + "|posX=" + Context.PosX,
      Context.FindLineNumberInTextFile(iniPath, "posY=", Nucleus.SearchType.StartsWith) + "|posY=" + Context.PosY
    ];
    Context.ReplaceLinesInTextFile(iniPath, dict);
    if (aspect == "NO") {
      var dict = [Context.FindLineNumberInTextFile(iniPath, "maintas=", Nucleus.SearchType.StartsWith) + "|maintas=false"];
      Context.ReplaceLinesInTextFile(iniPath, dict);
    }

    //resolution 00 00 00 00 =800x600 01 00 00 00= 768x1024 02 00 00 00 = 1024x1268 03 00 00 00 = 1600x1200
    if (Context.Width >= 1600 && Context.Height >= 1200) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Enlight\\Warlords Battlecry III\\Options", "ResolutionSelected", "   ", Nucleus.RegType.Binary);
    } else if (Context.Width >= 1280 && Context.Height >= 1024) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Enlight\\Warlords Battlecry III\\Options", "ResolutionSelected", "   ", Nucleus.RegType.Binary);
    } else if (Context.Width >= 1024 && Context.Height >= 768) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Enlight\\Warlords Battlecry III\\Options", "ResolutionSelected", "   ", Nucleus.RegType.Binary);
    } else if (Context.Width >= 800 && Context.Height >= 600) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Enlight\\Warlords Battlecry III\\Options", "ResolutionSelected", "    ", Nucleus.RegType.Binary);
    }
    //sound 00-99
    if (Context.PlayerID > 0) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Enlight\\Warlords Battlecry III\\Options", "MusicVolume", "    ", Nucleus.RegType.Binary);
    } else {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Enlight\\Warlords Battlecry III\\Options", "MusicVolume", "�   ", Nucleus.RegType.Binary);
    }
  }
};

Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    if (Context.IsKeyboardPlayer) {
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
      ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, true);
    }
    //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

    System.Threading.Thread.Sleep(200);

    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
  }
};

Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    if (Context.IsKeyboardPlayer) {
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, false);
      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }

    if (Context.IsKeyboardPlayer) {
    } else {
      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  }
};