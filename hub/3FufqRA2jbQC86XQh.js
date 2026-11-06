Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Tue May 07 2024 09:20:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "3FufqRA2jbQC86XQh";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["None", "Xinput Support v2", "Knights of The Force 2.1", "Open Jedi Project Enhanced", "Movie Battles II", "OpenJK"];
Game.AddOption("Select mod.", "KotF, MBII, and OpenJK do not support analog joystick input.", "Mod", answers1);

Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_api64.dll",
  "steam_appid.txt",
  "jaconfig.cfg",
  "jampconfig.cfg",
  "servercache.dat",
  "KotFSPconfig.cfg",
  "KotFMPconfig.cfg",
  "openjk.cfg",
  "autoexec.cfg",
  "xinput.cfg",
  "test.bat"
];
Game.FileSymlinkCopyInstead = ["jagamex86.dll", "jampgamex86.dll", "cgamex86.dll", "uix86.dll", "jospgamex86.dll", "rdjosp-vanilla_x86.dll", "rdsp-vanilla_x86.dll", "rd-vanilla_x86.dll"];
Game.HandlerInterval = 100;
Game.NeedsSteamEmulation = false;
Game.UseNucleusEnvironment = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet";
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "jamp.exe";
Game.SteamID = "6020";
Game.GUID = "JediKnightAcademy";
Game.GameName = "Star Wars: Jedi Knight - Jedi Academy";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 32;
Game.MaxPlayers = 32;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Jedi Knight";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["dinput.dll", "dinput8.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\My Games\\OpenJK\\base";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Read the description notes carefully. Alt tab and use your mouse cursor to navigate the UI in all gamepad instances. Host with one instance and join with the rest. Alt tab to a keyboard player if you have one before pressing END to lock input and give focus to all instances after all gamepad players have joined. Press the END key again to unlock the input in order to change profile details for gamepad players. You can use CTRL+Q to close Nucleus and all its instances while input is unlocked.";
Game.KillProcessesOnClose = ["MBIILauncher.exe"];
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006];

Game.Play = function() {
  var mod = Context.Options["Mod"];

  var xinputCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\base\\xinput.cfg";

  var xplusPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";

  if (mod == "None") {
    Game.ProtoInput.RegisterRawInputHook = true;

    Context.ModifySaveFile(xplusPath, xplusPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", false),
      new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", false),
      new Nucleus.IniSaveInfo("Misc", "UseXInput1_3", false),
      new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", false),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", ""),
      new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
      new Nucleus.IniSaveInfo("X2DInput", "LS_X", "Z_Axis"),
      new Nucleus.IniSaveInfo("X2DInput", "LS_Y", "X_Rot"),
      new Nucleus.IniSaveInfo("X2DInput", "RS_X", "X_Axis"),
      new Nucleus.IniSaveInfo("X2DInput", "RS_Y", "Y_Axis(INV)"),
      new Nucleus.IniSaveInfo("X2DInput", "LT", "Button12"),
      new Nucleus.IniSaveInfo("X2DInput", "RT", "Button13"),
      new Nucleus.IniSaveInfo("X2DInput", "DisableUnmappedObject", true),
      new Nucleus.IniSaveInfo("X2DInput", "DisableXInput", true)
    ]);

    var lines = [
      "in_joystick 1",
      "in_restart",
      'seta joy_threshold "0.1"',
      'seta cl_pitchspeed "200"',
      'seta cl_yawspeed "300"',
      'bind JOY1 "forceprev"',
      'bind JOY0 "+moveup"',
      'bind JOY2 "+use"',
      'bind JOY3 "forcenext"',
      'bind JOY4 "saberAttackCycle"',
      'bind JOY6 "+scores"',
      'bind JOY7 "togglemenu"',
      'bind JOY8 "+movedown"',
      'bind JOY9 "cg_thirdperson !"',
      'bind JOY24 "taunt"',
      'bind JOY25 "cg_thirdperson !"',
      'bind JOY5 "+altattack"',
      'bind JOY26 "weapprev"',
      'bind JOY27 "weapnext"',
      'bind JOY11 "+useforce"',
      'bind JOY12 "+attack"',
      'bind JOY16 "+moveleft"',
      'bind JOY17 "+moveright"',
      'bind JOY18 "+forward"',
      'bind JOY19 "+back"'
    ];

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\del.bat";
    var batlines = ["@echo off", "del cgamex86.dll jampgamex86.dll jospgamex86.dll rdjosp-vanilla_x86.dll rdsp-vanilla_x86.dll rd-vanilla_x86.dll uix86.dll"];
    Context.WriteTextFile(Bat, batlines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\del.bat"], false, 1);
  }

  if (mod == "Xinput Support v2") {
    Game.Hook.ForceFocusWindowName = "OpenJK (MP)";
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "openjk.x86.exe"), System.IO.Path.Combine(Context.RootFolder, "jamp.exe"), true);

    Game.ProtoInput.RegisterRawInputHook = true;

    var lines = [
      "in_joystick 2",
      "in_restart",
      'seta joy_threshold "0.1"',
      'seta cl_pitchspeed "100"',
      'seta cl_yawspeed "140"',
      'bind JOY12 "forceprev"',
      'bind JOY11 "+moveup"',
      'bind JOY13 "+use"',
      'bind JOY14 "forcenext"',
      'bind JOY5 "+scores"',
      'bind JOY4 "togglemenu"',
      'bind JOY6 "+movedown"',
      'bind JOY7 "cg_thirdperson !"',
      'bind JOY8 "saberAttackCycle"',
      'bind JOY9 "+altattack"',
      'bind JOY0 "taunt"',
      'bind JOY1 "cg_thirdperson !"',
      'bind JOY2 "weapprev"',
      'bind JOY3 "weapnext"',
      'bind JOY15 "+useforce"',
      'bind JOY16 "+attack"'
    ];
  }

  if (mod == "Open Jedi Project Enhanced") {
    Game.ProtoInput.RegisterRawInputHook = true;

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "ojpenhanced\\jampconfig.cfg"), System.IO.Path.Combine(Context.RootFolder, "ojpenhanced\\jampconfig.cfg"), true);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ojpenhanced\\jampconfig.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta r_gamma", Nucleus.SearchType.StartsWith) + '|seta r_gamma "1"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var modArgs = "+set fs_game ojpenhanced";
    Context.StartArguments = modArgs;

    Context.ModifySaveFile(xplusPath, xplusPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", false),
      new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", false),
      new Nucleus.IniSaveInfo("Misc", "UseXInput1_3", false),
      new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", false),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", ""),
      new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
      new Nucleus.IniSaveInfo("X2DInput", "LS_X", "Z_Axis"),
      new Nucleus.IniSaveInfo("X2DInput", "LS_Y", "X_Rot"),
      new Nucleus.IniSaveInfo("X2DInput", "RS_X", "X_Axis"),
      new Nucleus.IniSaveInfo("X2DInput", "RS_Y", "Y_Axis(INV)"),
      new Nucleus.IniSaveInfo("X2DInput", "LT", "Button12"),
      new Nucleus.IniSaveInfo("X2DInput", "RT", "Button13"),
      new Nucleus.IniSaveInfo("X2DInput", "DisableUnmappedObject", true),
      new Nucleus.IniSaveInfo("X2DInput", "DisableXInput", true)
    ]);

    var lines = [
      "in_joystick 1",
      "in_restart",
      'seta joy_threshold "0.1"',
      'seta cl_pitchspeed "200"',
      'seta cl_yawspeed "300"',
      'bind JOY1 "forceprev"',
      'bind JOY0 "+moveup"',
      'bind JOY2 "+use"',
      'bind JOY3 "forcenext"',
      'bind JOY4 "saberAttackCycle"',
      'bind JOY6 "datapad"',
      'bind JOY7 "togglemenu"',
      'bind JOY8 "+movedown"',
      'bind JOY9 "cg_thirdperson !"',
      'bind JOY24 "saberAttackCycle"',
      'bind JOY25 "cg_thirdperson !"',
      'bind JOY5 "+altattack"',
      'bind JOY26 "weapprev"',
      'bind JOY27 "weapnext"',
      'bind JOY11 "+useforce"',
      'bind JOY12 "+attack"',
      'bind JOY16 "+moveleft"',
      'bind JOY17 "+moveright"',
      'bind JOY18 "+forward"',
      'bind JOY19 "+back"'
    ];

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\del.bat";
    var batlines = ["@echo off", "del cgamex86.dll jampgamex86.dll jospgamex86.dll rdjosp-vanilla_x86.dll rdsp-vanilla_x86.dll rd-vanilla_x86.dll uix86.dll"];
    Context.WriteTextFile(Bat, batlines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\del.bat"], false, 1);

    var modArgs = "+set fs_game ojpenhanced";
    Context.StartArguments = modArgs;
  }

  if (mod == "Knights of The Force 2.1") {
    Game.Hook.ForceFocusWindowName = "Knights of the Force";
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "KotF 2.1 MP.exe"), System.IO.Path.Combine(Context.RootFolder, "jamp.exe"), true);

    if (Context.IsKeyboardPlayer) {
      Game.ProtoInput.RegisterRawInputHook = true;
    } else {
    }

    var lines = [
      "in_joystick 1",
      "in_restart",
      'seta joy_threshold "0.25"',
      'seta cl_pitchspeed "100"',
      'seta cl_yawspeed "150"',
      'bind JOY2 "forceprev"',
      'bind JOY1 "+moveup"',
      'bind JOY3 "+use"',
      'bind JOY4 "forcenext"',
      'bind JOY7 "meditate"',
      'bind JOY11 "flourish"',
      'bind JOY8 "taunt"',
      'bind JOY9 "+movedown"',
      'bind JOY10 "cg_thirdperson !"',
      'bind JOY5 "saberAttackCycle"',
      'bind JOY6 "+altattack"',
      'bind JOY28 "bow"',
      'bind JOY30 "gloat"',
      'bind JOY31 "weapprev"',
      'bind JOY29 "weapnext"',
      'bind JOY17 "+useforce"',
      'bind JOY23 "+attack"',
      'bind JOY18 "+left"',
      'bind JOY19 "+right"',
      'bind JOY20 "+lookup"',
      'bind JOY21 "+lookdown"',
      'bind "UPARROW" "+forward"',
      'bind "DOWNARROW" "+back"',
      'bind "LEFTARROW" "+moveleft"',
      'bind "RIGHTARROW" "+moveright"'
    ];
  }

  if (mod == "Movie Battles II") {
    Context.RunAdditionalFiles(["1|" + Context.RootInstallFolder + "\\MBIILauncher.exe"], false, 0);

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MBII\\jampconfig.cfg"), System.IO.Path.Combine(Context.RootFolder, "MBII\\jampconfig.cfg"), true);

    Game.Hook.ForceFocusWindowName = "OpenJK (MP)";
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "mbii.x86.exe"), System.IO.Path.Combine(Context.RootFolder, "jamp.exe"), true);

    if (Context.IsKeyboardPlayer) {
      Game.ProtoInput.RegisterRawInputHook = true;
    } else {
    }

    var lines = [
      "in_joystick 1",
      "in_restart",
      'seta joy_threshold "0.25"',
      'seta cl_pitchspeed "100"',
      'seta cl_yawspeed "150"',
      'bind JOY2 "forceprev"',
      'bind JOY1 "+moveup"',
      'bind JOY3 "+use"',
      'bind JOY4 "forcenext"',
      'bind JOY7 "meditate"',
      'bind JOY11 "flourish"',
      'bind JOY8 "taunt"',
      'bind JOY9 "+movedown"',
      'bind JOY10 "cg_thirdperson !"',
      'bind JOY5 "saberAttackCycle"',
      'bind JOY6 "+altattack"',
      'bind JOY28 "bow"',
      'bind JOY30 "gloat"',
      'bind JOY31 "weapprev"',
      'bind JOY29 "weapnext"',
      'bind JOY17 "+useforce"',
      'bind JOY23 "+attack"',
      'bind JOY18 "+left"',
      'bind JOY19 "+right"',
      'bind JOY20 "+lookup"',
      'bind JOY21 "+lookdown"',
      'bind "UPARROW" "+forward"',
      'bind "DOWNARROW" "+back"',
      'bind "LEFTARROW" "+moveleft"',
      'bind "RIGHTARROW" "+moveright"'
    ];
  }

  if (mod == "OpenJK") {
    Game.Hook.ForceFocusWindowName = "OpenJK (MP)";
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "openjk.x86.exe"), System.IO.Path.Combine(Context.RootFolder, "jamp.exe"), true);

    if (Context.IsKeyboardPlayer) {
      Game.ProtoInput.RegisterRawInputHook = true;
    } else {
    }

    var lines = [
      "in_joystick 1",
      "in_restart",
      'seta joy_threshold "0.25"',
      'seta cl_pitchspeed "100"',
      'seta cl_yawspeed "150"',
      'bind JOY2 "forceprev"',
      'bind JOY1 "+moveup"',
      'bind JOY3 "+use"',
      'bind JOY4 "forcenext"',
      'bind JOY7 "+scores"',
      'bind JOY8 "taunt"',
      'bind JOY9 "+movedown"',
      'bind JOY10 "cg_thirdperson !"',
      'bind JOY5 "saberAttackCycle"',
      'bind JOY6 "+altattack"',
      'bind JOY28 "taunt"',
      'bind JOY30 "cg_thirdperson !"',
      'bind JOY31 "weapprev"',
      'bind JOY29 "weapnext"',
      'bind JOY17 "+useforce"',
      'bind JOY23 "+attack"',
      'bind JOY18 "+left"',
      'bind JOY19 "+right"',
      'bind JOY20 "+lookup"',
      'bind JOY21 "+lookdown"',
      'bind "UPARROW" "+forward"',
      'bind "DOWNARROW" "+back"',
      'bind "LEFTARROW" "+moveleft"',
      'bind "RIGHTARROW" "+moveright"'
    ];
  }

  Context.WriteTextFile(xinputCfg, lines);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\base\\autoexec.cfg";
  var lines = [
    'seta name "' + Context.Nickname + '"',
    'seta r_mode "-1"',
    'seta r_customwidth "' + Context.Width + '"',
    'seta r_customheight "' + Context.Height + '"',
    'seta r_fullscreen "0"',
    'seta r_allowResize "1"',
    'seta r_noborder "1"',
    'seta r_centerWindow "0"',
    'seta cg_deferPlayers "0"',
    'seta cg_fixedAspect "2"',
    'seta s_UseOpenAL "1"',
    'seta s_musicvolume "0.25"',
    'seta in_mouse "1"',
    'seta in_joystick "2"',
    'seta joy_xbutton "0"',
    'seta joy_ybutton "0"',
    'seta sv_maxConnections "0"',
    // 'seta sv_cheats "1"',
    // 'seta helpusobi "1"',
    // 'seta g_saberMoreRealistic "3"',
    // 'seta g_dismemberment "3"',
    // 'seta g_dismemberProbabilities "100"',
    // 'seta g_corpseRemovalTime "0"',
    // 'seta broadsword "1"',
    "exec xinput.cfg"
  ];

  Context.WriteTextFile(autoExec, lines);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\base\\autoexec.cfg";

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta s_musicvolume", Nucleus.SearchType.StartsWith) + '|seta s_musicvolume "0.0"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.DisableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, false, false, false, false);

      System.Threading.Thread.Sleep(100);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};