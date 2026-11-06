Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Sun Dec 28 2025 08:08:57 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "eLNoCHEyD2aPnhcoM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Both instances", "Only first instance"];
Game.AddOption("Will you use the game's native splitscreen?", "Max two horizontal instances with two controllers each (no keyboard).", "Split", answers1);

Game.KillMutex = ["contagion_singleton_mutex", "ValvePlatformUIMutex", "ValvePlatformWaitMutex"];
Game.DirSymlinkExclusions = ["bin", "contagion\\cfg", "engine"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "autoexec.cfg", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["splitscreen_config.txt", "config.cfg", "video.kv2", "video.txt"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "contagion.exe";
Game.SteamID = "238430";
Game.GUID = "Contagion";
Game.GameName = "Contagion";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 8;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Contagion";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\238430";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "CREATE a LAN server in one instance and join in the others using the server browser. Use the main mouse cursor to navigate the main menus. If you select to use the game's native splitscreen in the UI player options you can play with 4 or 3 players in only two instances of the game for better performance, the first two gamepads will control the first instance and the other two gamepads the second, if you want to have only one player per instance select No. The native split-screen option only works with two instances that use two controllers each (just pick two controllers. If on the same monitor use two horizontal instances. Keyboard is not supported in native split-screen). Reduce graphic settings in your main game to improve performance and load times. F9= cap 30fps and F10= cap 60fps (instance selected). If you use keyboards/mice press the END key to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 30;

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
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;

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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var Args = " -windowed -steam -noborder -nointro -novid -sw +sv_lan 1 " + " -w " + Context.Width + " -h " + Context.Height + " -x " + Context.PosX + " -y " + Context.PosY;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\engine\\steam_api.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\contagion\\cfg\\autoexec.cfg";
  var lines = [
    "sv_lan 1",
    "fps_max 60", // <-FPS CAP, EDIT HERE
    "engine_no_focus_sleep 0",
    'bind "F9" "fps_max 30"',
    'bind "F10" "fps_max 60"'
  ];
  Context.WriteTextFile(autoExec, lines);

  if (Player.Owner.IsDualHorizontal()) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\contagion\\splitscreen_config.txt";
    var dict = ['13|		"aspect"				"64 by 9"', '21|		"aspect"				"16 by 9"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Player.Owner.IsDualVertical()) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\contagion\\splitscreen_config.txt";
    var dict = ['5|		"aspect"				"16 by 9"', '13|		"aspect"				"8 by 9"', '21|		"aspect"				"16 by 9"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var split = Context.Options["Split"];

  if (split == "No") {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\contagion\\cfg\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "ss_enable", Nucleus.SearchType.StartsWith) + '|ss_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "ss_splitmode", Nucleus.SearchType.StartsWith) + '|ss_splitmode "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    if (Context.IsKeyboardPlayer) {
      Context.StartArguments = Args + " +cl_mouselook 1 +cl_mouselook2 1 +m_rawinput 1 +ss_enable 0 +ss_splitmode 0";
    } else {
      Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 0 +ss_splitmode 0";
    }
  }

  if (split == "Both instances") {
    if (Player.Owner.IsDualHorizontal()) {
      Game.ProtoInput.XinputHook = false;
      Game.ProtoInput.UseOpenXinput = false;

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      if (Context.PlayerID == 0) {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 2";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      } else {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 2";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }
    if (Player.Owner.IsDualVertical()) {
      Game.ProtoInput.XinputHook = false;
      Game.ProtoInput.UseOpenXinput = false;

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      if (Context.PlayerID == 0) {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 1";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      } else {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 1";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }

    if (Player.Owner.IsFullscreen()) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      if (Context.PlayerID == 0) {
        Game.ProtoInput.XinputHook = false;
        Game.ProtoInput.UseOpenXinput = false;

        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 0";

        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
        var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
        System.IO.File.Copy(savePkgOrigin, savePath, true);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
      if (Context.PlayerID == 1) {
        Game.ProtoInput.XinputHook = false;
        Game.ProtoInput.UseOpenXinput = false;

        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 0";

        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
        var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
        System.IO.File.Copy(savePkgOrigin, savePath, true);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }
  }

  if (split == "Only first instance") {
    if (Player.Owner.IsDualHorizontal()) {
      Game.ProtoInput.XinputHook = false;
      Game.ProtoInput.UseOpenXinput = false;

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      if (Context.PlayerID == 0) {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 2";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      } else {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 0 +ss_splitmode 0";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }
    if (Player.Owner.IsDualVertical()) {
      Game.ProtoInput.XinputHook = false;
      Game.ProtoInput.UseOpenXinput = false;

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      if (Context.PlayerID == 0) {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 1";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      } else {
        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 0 +ss_splitmode 0";

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }

    if (Player.Owner.IsFullscreen()) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      if (Context.PlayerID == 0) {
        Game.ProtoInput.XinputHook = false;
        Game.ProtoInput.UseOpenXinput = false;

        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 1 +ss_splitmode 0";

        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
        var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
        System.IO.File.Copy(savePkgOrigin, savePath, true);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
      if (Context.PlayerID == 1) {
        Game.ProtoInput.XinputHook = false;
        Game.ProtoInput.UseOpenXinput = false;

        Context.StartArguments = Args + " +cl_mouselook 0 +cl_mouselook2 0 +m_rawinput 0 +ss_enable 0 +ss_splitmode 0";

        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
        var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
        System.IO.File.Copy(savePkgOrigin, savePath, true);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }
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

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      //ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
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

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 7000, true, true, false, false, false);
    }
  };
};