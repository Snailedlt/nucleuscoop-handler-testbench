Hub.Handler.Version = 17; // Released at https://hub.splitscreen.me/ on Sun Mar 09 2025 17:34:07 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "wFsXDjoAkHpL4XZm8";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["InvScaled", "NoScaled", "Scaled"];
var answers3 = ["No", "Yes"];
Game.AddOption("Will you use the game's native splitscreen?", "If yes only launch TWO instances, you need 3 or 4 gamepads.", "Native", answers1);
Game.AddOption("Window Size Scale", "ONLY change if the instances are not opening already correctly resized for you or have cursor offset.", "Scale", answers2);
Game.AddOption(
  "Disable multiple keyboards/mice support?",
  "Disables the keyboards/mice Proto Input hooks so you can play with only one kb/mouse with the instance focused. ONLY use if the mkbs support is not working correctly for you, click on the kb instance or alt-tab to it and don't lock the input with End.",
  "Hooks",
  answers3
);

Game.ExecutableContext = ["left4dead2"];
Game.KillMutex = ["hl2_singleton_mutex"];
Game.DirSymlinkExclusions = ["bin", "left4dead2", "left4dead2\\cfg", "left4dead2\\addons"];
Game.FileSymlinkExclusions = ["autoexec.cfg", "steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll", "571568537.vpk"];
Game.FileSymlinkCopyInstead = ["config.cfg", "video.txt", "debug.log", "360controller.cfg"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "left4dead2.exe";
Game.SteamID = "550";
Game.GUID = "Left 4 Dead 2";
Game.GameName = "Left 4 Dead 2";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.CreateSteamAppIdByExe = true;
//Game.WorkingFolder = "bin";
Game.StartArguments = "";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 8;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Left 4 Dead 2 - Direct3D 9";
Game.HasDynamicWindowTitle = true;
//Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
//Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\550\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Host a multiplayer game in the first instance: select campaign, play with friends, press X on your gamepad, create a new room, set it to public and in server type choose local, then the other players can join the room using the play with friends options too. Use the mouse cursor to navigate the menus in all instances if you have trouble navigating the menus using gamepads as the game lacks full gamepad support in menus. Disable controller for kb instances in the game options or enable it for gamepad instances. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 25;

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
Game.SupportsKeyboard = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  /*var saveSrc = System.IO.Path.Combine(Context.RootInstallFolder, "left4dead2\\cfg\\video.txt");
        var savePath = System.IO.Path.Combine(Context.RootFolder, "left4dead2\\cfg\\video.txt");
        Context.ModifySaveFile(saveSrc, savePath, Nucleus.SaveType.CFG, [
        new Nucleus.CfgSaveInfo("config", "setting.fullscreen", "0"),
        new Nucleus.CfgSaveInfo("config", "setting.defaultres", Math.max(640, Context.Width)),
        new Nucleus.CfgSaveInfo("config", "setting.defaultresheight", Math.max(360, Context.Height)),
        new Nucleus.CfgSaveInfo("config", "setting.nowindowborder", "0"),
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.fullscreen", "0"),
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.defaultres", Math.max(640, Context.Width)),
        new Nucleus.CfgSaveInfo("VideoConfig", "setting.defaultresheight", Math.max(360, Context.Height)),
        new Nucleus.CfgSaveInfo("VideoConfig ", "setting.nowindowborder", "0"),
        ]);*/

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
  var lines = [
    "sv_lan 1",
    "sv_allow_lobby_connect_only 0",
    "engine_no_focus_sleep 0" //unlimited FPS on all screens.
  ];

  if (Context.IsKeyboardPlayer) {
    lines.push("joystick 0");
    lines.push("exec undo360controller.cfg");
  } else {
    lines.push("exec 360controller.cfg");
  }
  Context.WriteTextFile(autoExec, lines);

  var native = Context.Options["Native"];
  var scale = Context.Options["Scale"];
  var hooks = Context.Options["Hooks"];

  if (scale == "InvScaled") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;
  }

  if (scale == "Scaled") {
    Context.DPIHandling = Nucleus.DPIHandling.Scaled;
  }

  if (scale == "NoScaled") {
  }

  if (Context.IsKeyboardPlayer) {
    Context.StartArguments =
      " -windowed -noborder -nointro -novid -steam +net_graph 0 +cl_mouselook 1 +cl_mouselook2 1 +m_rawinput 1" +
      " -w " +
      Context.Width +
      " -h " +
      Context.Height +
      " -x " +
      Context.PosX +
      " -y " +
      Context.PosY;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\config.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, 'joystick "1"', Nucleus.SearchType.StartsWith) + '|joystick "0"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    Context.StartArguments = " -windowed -noborder -nointro -novid -steam +net_graph 0" + " -w " + Context.Width + " -h " + Context.Height + " -x " + Context.PosX + " -y " + Context.PosY;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\config.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, 'joystick "0"', Nucleus.SearchType.StartsWith) + '|joystick "1"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (hooks == "Yes") {
    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.GetRawInputDataHook = false;
    Game.ProtoInput.MessageFilterHook = false;
  }

  if (native == "Yes") {
    Game.PromptAfterFirstInstance = true;
    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\addons\\571568537.vpk");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "571568537.vpk");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\360controller.cfg";
    var dict = ["60|cmd2 +jlook "];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_4.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Player.Owner.IsDualHorizontal()) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\pak01_000.vpk");

      //patch native splitscreen aspect ratio 8 by 9
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "left4dead2\\pak01_000.vpk"),
        System.IO.Path.Combine(Context.RootFolder, "left4dead2\\pak01_000.vpk"),
        [0x09, 0x22, 0x38, 0x20, 0x62, 0x79, 0x20, 0x39], //09 22 38 20 62 79 20 39
        [0x09, 0x22, 0x39, 0x20, 0x62, 0x79, 0x20, 0x35]
      );

      if (Context.PlayerID == 0) {
        var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
        var lines = ["sv_lan 1", "sv_allow_lobby_connect_only 0", "engine_no_focus_sleep 0", "name2 " + Context.Nickname + "-B", "ss_splitmode 0"];
        Context.WriteTextFile(autoExec, lines);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }

      if (Context.PlayerID == 1) {
        var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
        var lines = [
          "sv_lan 1",
          "sv_allow_lobby_connect_only 0",
          "engine_no_focus_sleep 0",
          "name2 " + Context.Nickname + "-B",
          "ss_splitmode 0",
          "connect_splitscreen localhost " + Context.LocalIP + ":27015 2"
        ];
        Context.WriteTextFile(autoExec, lines);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }

    if (Player.Owner.IsDualVertical()) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\pak01_000.vpk");

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "left4dead2\\pak01_000.vpk"),
        System.IO.Path.Combine(Context.RootFolder, "left4dead2\\pak01_000.vpk"),
        [0x09, 0x22, 0x38, 0x20, 0x62, 0x79, 0x20, 0x33], //09 22 38 20 62 79 20 33
        [0x09, 0x22, 0x37, 0x20, 0x62, 0x79, 0x20, 0x34]
      );

      if (Context.PlayerID == 0) {
        var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
        var lines = ["sv_lan 1", "sv_allow_lobby_connect_only 0", "engine_no_focus_sleep 0", "name2 " + Context.Nickname + "-B", "ss_splitmode 1"];
        Context.WriteTextFile(autoExec, lines);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }

      if (Context.PlayerID == 1) {
        var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
        var lines = [
          "sv_lan 1",
          "sv_allow_lobby_connect_only 0",
          "engine_no_focus_sleep 0",
          "name2 " + Context.Nickname + "-B",
          "ss_splitmode 1",
          "hud_reloadscheme",
          "connect_splitscreen localhost " + Context.LocalIP + ":27015 2"
        ];
        Context.WriteTextFile(autoExec, lines);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }

    if (Player.Owner.IsFullscreen()) {
      if (Context.PlayerID == 0) {
        var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
        var lines = ["sv_lan 1", "sv_allow_lobby_connect_only 0", "engine_no_focus_sleep 0", "name2 " + Context.Nickname + "-B"];
        Context.WriteTextFile(autoExec, lines);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }

      if (Context.PlayerID == 1) {
        var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\left4dead2\\cfg\\autoexec.cfg";
        var lines = ["sv_lan 1", "sv_allow_lobby_connect_only 0", "engine_no_focus_sleep 0", "name2 " + Context.Nickname + "-B", "connect_splitscreen localhost " + Context.LocalIP + ":27015 2"];
        Context.WriteTextFile(autoExec, lines);

        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
          new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
        ]);
      }
    }
  }

  if (native == "No") {
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
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

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

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};