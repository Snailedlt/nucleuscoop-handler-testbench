Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Oct 14 2025 18:45:20 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "gyM2cm5G5HojyHqwK";
Hub.Maintainer.Name = "THEKlNG";
Hub.Maintainer.Id = "5EhQGHyiGFZA689yF";

var answers = ["60", "90", "120"];
Game.AddOption("Screen refresh rate", "60 = Default", "rate", answers);

var answers1 = ["-", "Very Low", "Low", "Normal", "High", "Very High"];
Game.AddOption("Graphic settings", "", "Graphics", answers1);

var answers2 = [];
Game.AddOption(
  "Custom Mod Launcher",
  "Type the names of your mod folders located inside the main game directory.\nExample: @mod1 or separate them with semicolons for multiple mods.\nExample:@mod1;@mod2;@mod3",
  "Mod",
  answers2
);

Game.ExecutableContext = ["Dta"];
Game.DirExclusions = ["BattlEye"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll"];
Game.GameName = "ARMA 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "arma2.exe";
Game.SteamID = "33900";
Game.GUID = "ARMA 2";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 32;
Game.UseNucleusEnvironment = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocusWindowName = "ArmA 2";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "ArmA 2";
Game.DocumentsConfigPathNoCopy = true;
Game.Description =
  "📝 Handler Info:\nTested and requires the official Steam version of [Steam version of Arma 2.]{https://store.steampowered.com/app/33900/Arma_2/}\n\n🎮 Input Support:\nSupports multiple keyboards/mice and xinput controllers.\nControllers require you to use your main mouse for setup and menu navigation.\nAvoid setting controller movement to 'default', as this may cause overlap with keyboard input. Instead, remap manually if needed.\n\n🌐 Hosting & Joining:\nGo to Multiplayer → change server type from 'LAN' to 'Internet' (to avoid the “CD key in use” error when clients join) select a map and settings, then start match.\nClients should join using the Server Browser as the main method.\n\nOn low-end systems, set graphics to Very Low and reduce resolution.\n\n🔑 Input & Locking:\nAfter all instances are loaded press the END key once to lock input if you are using keyboards/mice, left-click on each mouse and move slightly for a few seconds until the emulated cursor appears and responds correctly.\nWhen you finish playing press END again to unlock the input.\nIf you are playing with controllers you do not need to lock the input, you can use the mouse cursor normally in the setup menus.\nAfter finishing gameplay, always close the game from the 'Exit' button to make sure all progress and settings are saved properly.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 30;
Game.PauseBetweenStarts = 20;

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

Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var Mod = Context.Options["Mod"];

  var Args = " -window -noPause -nosplash -name=" + Context.Nickname + " -mod=" + Mod + "";
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Bohemia Interactive Studio\\ArmA 2", "Player Name", Context.Nickname, Nucleus.RegType.String);

  var filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "";
  System.IO.Directory.CreateDirectory(filePath);

  if (Context.IsKeyboardPlayer) {
    var txtPath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\Keyboard & Mouse.txt";
    var lines = ["Keyboard & Mouse"];
    Context.WriteTextFile(txtPath, lines);

    if (System.IO.File.Exists(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\Controller.txt")) {
      System.IO.File.Delete(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\Controller.txt");
      System.IO.File.Delete(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile");
    }

    if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile")) {
      var savePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Keyboard & Mouse.ArmA2Profile");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    }
  } else {
    var txtPath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\Controller.txt";
    var lines = ["Controller"];
    Context.WriteTextFile(txtPath, lines);

    if (System.IO.File.Exists(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\Keyboard & Mouse.txt")) {
      System.IO.File.Delete(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\Keyboard & Mouse.txt");
      System.IO.File.Delete(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile");
    }

    if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile")) {
      var savePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controller.ArmA2Profile");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg")) {
    var savePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ArmA2.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var rate = Context.Options["rate"];

  var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "refresh", Nucleus.SearchType.StartsWith) + "|refresh=" + rate + ";",
    Context.FindLineNumberInTextFile(cfgPath, "Resolution_W", Nucleus.SearchType.StartsWith) + "|Resolution_W=" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "Resolution_H", Nucleus.SearchType.StartsWith) + "|Resolution_H=" + Context.Height + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winW", Nucleus.SearchType.StartsWith) + "|winW=" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winH", Nucleus.SearchType.StartsWith) + "|winH=" + Context.Height + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winX", Nucleus.SearchType.StartsWith) + "|winX=" + Context.PosX + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winY", Nucleus.SearchType.StartsWith) + "|winY=" + Context.PosY + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winDefW", Nucleus.SearchType.StartsWith) + "|winDefW=" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winDefH", Nucleus.SearchType.StartsWith) + "|winDefH=" + Context.Height + ";",
    Context.FindLineNumberInTextFile(cfgPath, "Render_W", Nucleus.SearchType.StartsWith) + '|Render_W="1280";',
    Context.FindLineNumberInTextFile(cfgPath, "Render_H", Nucleus.SearchType.StartsWith) + '|Render_H="900"'
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  var ProfilePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
  var dict = [
    Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|",
    Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|",
    Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|",
    Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|",
    Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|",
    Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|"
  ];
  Context.ReplaceLinesInTextFile(ProfilePath, dict);

  var Graphics = Context.Options["Graphics"];

  if (Graphics == "Very Low") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=0;",
      Context.FindLineNumberInTextFile(cfgPath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=0;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=150000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=1000;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=20;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=-1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexMemory", Nucleus.SearchType.StartsWith) + "|TexMemory=1;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }
  if (Graphics == "Low") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=1;",
      Context.FindLineNumberInTextFile(cfgPath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=2;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=200000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=1200;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexMemory", Nucleus.SearchType.StartsWith) + "|TexMemory=1;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }
  if (Graphics == "Normal") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=1;",
      Context.FindLineNumberInTextFile(cfgPath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=2;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=300000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=1600;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=7;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexMemory", Nucleus.SearchType.StartsWith) + "|TexMemory=1;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }
  if (Graphics == "High") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=2;",
      Context.FindLineNumberInTextFile(cfgPath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=2;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=300000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=2400;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=10;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=2;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexMemory", Nucleus.SearchType.StartsWith) + "|TexMemory=1;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }
  if (Graphics == "Very High") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA2.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=3;",
      Context.FindLineNumberInTextFile(cfgPath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=2;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA 2 Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmA2Profile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=500000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=3600;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=100;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexMemory", Nucleus.SearchType.StartsWith) + "|TexMemory=1;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  if (Context.IsKeyboardPlayer) {
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
    Game.ProtoInput.DrawFakeCursor = true;
    Game.ProtoInput.FocusHooks = true;
    Game.ProtoInput.FindWindowHook = true;
    Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = true;
    Game.ProtoInput.WindowActivateFilter = true;
    Game.ProtoInput.WindowActivateAppFilter = true;
    Game.ProtoInput.MouseWheelFilter = true;
    Game.ProtoInput.MouseButtonFilter = true;
    Game.ProtoInput.KeyboardButtonFilter = true;
    Game.ProtoInput.SendMouseWheelMessages = true;
    Game.ProtoInput.SendMouseButtonMessages = true;
    Game.ProtoInput.SendMouseMovementMessages = true;
    Game.ProtoInput.SendKeyboardButtonMessages = true;
  } else {
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
    Game.ProtoInput.DrawFakeCursor = false;
    Game.ProtoInput.FocusHooks = true;
    Game.ProtoInput.FindWindowHook = true;
    Game.ProtoInput.RawInputFilter = false;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = false;
    Game.ProtoInput.WindowActivateFilter = false;
    Game.ProtoInput.WindowActivateAppFilter = false;
    Game.ProtoInput.KeyboardButtonFilter = false;
    Game.ProtoInput.MouseWheelFilter = false;
    Game.ProtoInput.MouseButtonFilter = false;
    Game.ProtoInput.KeyboardButtonFilter = false;
    Game.ProtoInput.SendMouseWheelMessages = true;
    Game.ProtoInput.SendMouseButtonMessages = true;
    Game.ProtoInput.SendMouseMovementMessages = true;
    Game.ProtoInput.SendKeyboardButtonMessages = true;
  }

  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
    player.ProtoController2 = Context.GamepadId;
    player.ProtoController3 = Context.GamepadId;
    player.ProtoController4 = Context.GamepadId;
    player.ProtoController5 = Context.GamepadId;
    player.ProtoController6 = Context.GamepadId;
    player.ProtoController7 = Context.GamepadId;
    player.ProtoController8 = Context.GamepadId;
    player.ProtoController9 = Context.GamepadId;
    player.ProtoController10 = Context.GamepadId;
    player.ProtoController11 = Context.GamepadId;
    player.ProtoController12 = Context.GamepadId;
    player.ProtoController13 = Context.GamepadId;
    player.ProtoController14 = Context.GamepadId;
    player.ProtoController15 = Context.GamepadId;
    player.ProtoController16 = Context.GamepadId;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsController) {
      } else {
        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);
        System.Threading.Thread.Sleep(1000);
        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
        ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, true);
      }
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsController) {
        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, true, true, true);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
        ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, false);
      } else {
      }
    }
  };
};