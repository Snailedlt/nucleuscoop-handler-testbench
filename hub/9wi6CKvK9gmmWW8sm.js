Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 15 2021 07:00:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "9wi6CKvK9gmmWW8sm";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = [
  "Quake III Arena",
  "Quake III Team Arena",
  "Rocket Arena 3",
  /*"Gridiron",*/ "Catch the Chicken",
  "Hunt",
  "Pain Killer Arena",
  "Akimbo",
  "Q3 Fortress",
  "Q3 Pong Arena",
  "Proball",
  "Loki's Revenge CTF",
  /*"Ultra Freeze Tag", */ "Alternate Fire",
  "Weapons Factory Arena",
  "Challenge ProMode Arena",
  "Bid For Power 1.2",
  "DBZ Bid For Power Retro 1.0",
  "DBZ Bid For Power 5.0 Final",
  "Quake Rally",
  "Urban Terror",
  "Monkeys of Doom",
  "World of Padman"
];
var answers2 = ["Default", "4:3"];
var answers3 = ["90", "95", "100", "105", "110", "115", "120", "125", "130", "135", "140"];
Game.AddOption("Select mod", "Make sure to have a mod installed before trying to launch it.", "Mod", answers1);
Game.AddOption("Select aspect ratio", "4:3 is recommended for most mods.", "aspectRatio", answers2);
Game.AddOption("Select field of view", "Default is 90. Community preferred is 110-120.", "FOV", answers3);

Game.ExecutableContext = ["baseq3"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "q3config.cfg", "autoexec.cfg", "xinput.cfg"];
Game.FileSymlinkCopyInstead = ["akimbo.cfg", "vm.pk3"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "ioquake3.x86_64.exe";
Game.SteamID = "2200";
Game.GUID = "QuakeIII";
Game.GameName = "Quake III Arena";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ioquake3";
Game.HasDynamicWindowTitle = true;
Game.DontRemoveBorders = true;
Game.HideDesktop = true;
Game.SetForegroundWindowElsewhere = true;
Game.ProtoInput.AutoHideTaskbar = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Quake3";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Requires the ioquake3 source port and ZTM’s Flexible HUD mod. Alt tab and use your mouse cursor to navigate the UI in all gamepad instances. Each keyboard player can only use their own keyboard and mouse. Host with one instance and join with the rest, but do not host or join with an instance until it has repositioned. After all gamepad players have selected their player settings and joined, alt tab to a keyboard player if you have one and press END to lock input. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. Standalone mods will work by dragging there base folder into your Quake III directory so it can be ran like a normal mod. In the case of DBZ Bid for Power 5.0 Final you must rename it's baseq3 folder to bfp5 before copying. In the case of Rocket Arena 3 and Challenge Pro Arena you must either join an online server or host a dedicated server manually in order to play.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 5;
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

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

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
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.RegisterRawInputHook = true;
  } else {
  }

  var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\baseq3\\mkb.cfg";
  var lines = [
    "in_joystick 0",
    "in_restart",
    'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
    'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
    'set crouchToggle "vstr duck"',
    'bind c "vstr crouchToggle"',
    'bind v "+button3"'
  ];

  Context.WriteTextFile(mkbCfg, lines);

  var xinputCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\baseq3\\xinput.cfg";
  var lines = [
    "in_joystick 1",
    "in_restart",
    'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
    'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
    'set crouchToggle "vstr duck"',
    'bind PAD0_B "weapprev"',
    'bind PAD0_A "+moveup"',
    'bind PAD0_X "weapon 1"',
    'bind PAD0_Y "weapnext"',
    'bind PAD0_BACK ""',
    'bind PAD0_START "togglemenu"',
    'bind PAD0_LEFTSTICK_CLICK "vstr crouchToggle"',
    'bind PAD0_RIGHTSTICK_CLICK "+zoom"',
    'bind PAD0_LEFTSHOULDER "+moveup"',
    'bind PAD0_RIGHTSHOULDER ""',
    'bind PAD0_DPAD_UP "+button2"',
    'bind PAD0_DPAD_DOWN "+button3"',
    'bind PAD0_DPAD_LEFT "weapprev"',
    'bind PAD0_DPAD_RIGHT "weapnext"',
    'bind PAD0_LEFTSTICK_LEFT "+moveleft"',
    'bind PAD0_LEFTSTICK_RIGHT "+moveright"',
    'bind PAD0_LEFTSTICK_UP "+forward"',
    'bind PAD0_LEFTSTICK_DOWN "+back"',
    'bind PAD0_RIGHTSTICK_LEFT "+left"',
    'bind PAD0_RIGHTSTICK_RIGHT "+right"',
    'bind PAD0_RIGHTSTICK_UP "+lookup"',
    'bind PAD0_RIGHTSTICK_DOWN "+lookdown"',
    'bind PAD0_LEFTTRIGGER ""',
    'bind PAD0_RIGHTTRIGGER "+attack"',
    "in_joystickuseanalog 1",
    'seta j_pitch "0.008"',
    'seta j_yaw "-0.008"'
  ];

  Context.WriteTextFile(xinputCfg, lines);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\baseq3\\autoexec.cfg";
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
    'seta s_musicvolume "0.5"',
    'seta in_joystickUseAnalog "1"',
    'seta in_joystick "1"',
    "exec xinput.cfg"
  ];

  Context.WriteTextFile(autoExec, lines);

  var fov = Context.Options["FOV"];

  var fovArgs = "+set cg_fov " + fov;

  var ratio = Context.Options["aspectRatio"];

  var ratioArgs = "";

  if (ratio == "4:3") {
    Game.DontResize = true;
    Game.ResetWindows = true;

    if (Context.AspectRatioDecimal > 1.4) {
      var ratioArgs = "+set r_customwidth " + Context.Height * 1.3333333333 + " +set r_customheight " + Context.Height + "";
    } else if (Context.AspectRatioDecimal < 1.2) {
      var ratioArgs = "+set r_customwidth " + Context.Width + " +set r_customheight " + Context.Width / 1.3333333333 + "";
    } else {
    }
  } else {
  }

  var mod = Context.Options["Mod"];

  if (mod == "Quake III Arena") {
    var modArgs = "+set cg_stretch 0 +set cg_fovAspectAdjust 1 +set cg_fovGunAdjust 0";
  }

  if (mod == "Quake III Team Arena") {
    var modArgs = "+set cg_stretch 0 +set cg_fovAspectAdjust 1 +set cg_fovGunAdjust 0 +set fs_game missionpack";
  }

  if (mod == "Rocket Arena 3") {
    var Args = (Context.Args = "+set fs_game arena");
  }

  /*  if (mod == "Gridiron") {
	var Args = Context.Args = "+set fs_game gridiron";
  }*/

  if (mod == "Catch the Chicken") {
    var modArgs = "+set fs_game q3ctc +nosplash";
  }

  if (mod == "Hunt") {
    var modArgs = "+set fs_game hunt +nosplash";
  }

  if (mod == "Pain Killer Arena") {
    var modArgs = "+set fs_game pkarena";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "weapon 10"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "dragondeploy"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_DOWN", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_DOWN "+button12"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\pkarena\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"',
      'bind v "+button3"',
      'bind f "weapon 10"'
    ];

    Context.WriteTextFile(mkbCfg, lines);
  }

  if (mod == "Akimbo") {
    var modArgs = "+set fs_game akimbo +nosplash";

    if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\akimbo\\ak_binds.cfg")) {
      System.IO.File.Delete(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\akimbo\\ak_binds.cfg");
    }

    var akimboCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\akimbo\\ak_binds.cfg";
    var lines = [
      "in_joystick 1",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind PAD0_B "weapprev"',
      'bind PAD0_A "+moveup"',
      'bind PAD0_X "weapon 1"',
      'bind PAD0_Y "weapnext"',
      'bind PAD0_BACK "+scores"',
      'bind PAD0_START "togglemenu"',
      'bind PAD0_LEFTSTICK_CLICK "vstr crouchToggle"',
      'bind PAD0_RIGHTSTICK_CLICK "+zoom"',
      'bind PAD0_LEFTSHOULDER "+moveup"',
      'bind PAD0_RIGHTSHOULDER "+button6"',
      'bind PAD0_DPAD_UP "lweapnext"',
      'bind PAD0_DPAD_DOWN "lweapprev"',
      'bind PAD0_DPAD_LEFT "rweapprev"',
      'bind PAD0_DPAD_RIGHT "rweapnext"',
      'bind PAD0_LEFTSTICK_LEFT "+moveleft"',
      'bind PAD0_LEFTSTICK_RIGHT "+moveright"',
      'bind PAD0_LEFTSTICK_UP "+forward"',
      'bind PAD0_LEFTSTICK_DOWN "+back"',
      'bind PAD0_RIGHTSTICK_LEFT "+left"',
      'bind PAD0_RIGHTSTICK_RIGHT "+right"',
      'bind PAD0_RIGHTSTICK_UP "+lookup"',
      'bind PAD0_RIGHTSTICK_DOWN "+lookdown"',
      'bind PAD0_LEFTTRIGGER "+attack"',
      'bind PAD0_RIGHTTRIGGER "+button5"',
      "in_joystickuseanalog 1",
      'seta j_pitch "0.008"',
      'seta j_yaw "-0.008"',
      'bind MOUSE1 "+button5"',
      'bind MOUSE2 "+attack"',
      'bind f "+button6"'
    ];

    Context.WriteTextFile(akimboCfg, lines);
  }

  if (mod == "Q3 Fortress") {
    var modArgs = "+set fs_game q3f2";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "special"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTSHOULDER "toggletwo"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "toggleone"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_X", Nucleus.SearchType.StartsWith) + '|bind PAD0_X "reload"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_DOWN", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_DOWN "dropflag"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_LEFT", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_LEFT "armorme"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_RIGHT", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_RIGHT "saveme"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);
  }

  if (mod == "Q3 Pong Arena") {
    var modArgs = "+set fs_game q3pong +nosplash";

    var dict = [Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "weapon 10"'];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\q3pong\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"',
      'bind v "+button3"',
      'bind f "weapon 10"'
    ];

    Context.WriteTextFile(mkbCfg, lines);
  }

  if (mod == "Proball") {
    var modArgs = "+set fs_game proball +nosplash";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+speed"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button2"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);
  }

  if (mod == "Loki's Revenge CTF") {
    var modArgs = "+set fs_game lrctf +nosplash";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+button5"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button5"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\lrctf\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"',
      'bind v "+button3"',
      'bind MOUSE2 "+button5"',
      'bind f "+button5"'
    ];

    Context.WriteTextFile(mkbCfg, lines);
  }

  /*  if (mod == "Ultra Freeze Tag") {
	var modArgs = "+set fs_game ufreeze";
  }*/

  if (mod == "Alternate Fire") {
    var modArgs = "+set fs_game alternatefire +nosplash +set g_offhandGrapple 1";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+button5"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button6"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\alternatefire\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"',
      'bind v "+button3"',
      'bind MOUSE2 "+button5"',
      'bind f "+button6"'
    ];

    Context.WriteTextFile(mkbCfg, lines);
  }

  if (mod == "Weapons Factory Arena") {
    var modArgs = "+set fs_game wfa";
  }

  if (mod == "Challenge ProMode Arena") {
    var modArgs = "+set fs_game cpma";
  }

  if (mod == "Bid For Power 1.2") {
    var modArgs = "+set fs_game bfpq3 +set g_basePL 999";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+movedown; +movedown"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button7"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_B", Nucleus.SearchType.StartsWith) + '|bind PAD0_B "+button10"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_A", Nucleus.SearchType.StartsWith) + '|bind PAD0_A "+button12"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_X", Nucleus.SearchType.StartsWith) + '|bind PAD0_X "kiusetoggle"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_Y", Nucleus.SearchType.StartsWith) + '|bind PAD0_Y "+button9"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_UP", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_UP "+button2"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_DOWN", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_DOWN "+button3"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_LEFT", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_LEFT "weapprev"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_RIGHT", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_RIGHT "weapnext"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);
  }

  if (mod == "DBZ Bid For Power Retro 1.0") {
    var modArgs = "+set fs_game bfpretro +set g_basePL 999";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+movedown; +movedown"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button7"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_B", Nucleus.SearchType.StartsWith) + '|bind PAD0_B "+button10"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_A", Nucleus.SearchType.StartsWith) + '|bind PAD0_A "+button12"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_X", Nucleus.SearchType.StartsWith) + '|bind PAD0_X "kiusetoggle"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_Y", Nucleus.SearchType.StartsWith) + '|bind PAD0_Y "+button9"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);
  }

  if (mod == "DBZ Bid For Power 5.0 Final") {
    var modArgs = "+set fs_game bfp5 +set g_basePL 999";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+movedown; +movedown"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button7"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_B", Nucleus.SearchType.StartsWith) + '|bind PAD0_B "+button10"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_A", Nucleus.SearchType.StartsWith) + '|bind PAD0_A "+button12"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_X", Nucleus.SearchType.StartsWith) + '|bind PAD0_X "kiusetoggle"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_Y", Nucleus.SearchType.StartsWith) + '|bind PAD0_Y "+button9"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);
  }

  if (mod == "Quake Rally") {
    var modArgs = "+set fs_game baseq3r";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "+back"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTTRIGGER "+forward"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTSHOULDER "+speed"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button14"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_B", Nucleus.SearchType.StartsWith) + '|bind PAD0_B "+movedown"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTSTICK_LEFT", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTSTICK_LEFT "+left"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTSTICK_RIGHT", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTSTICK_RIGHT "+right"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_X", Nucleus.SearchType.StartsWith) + '|bind PAD0_X "+button2"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_Y", Nucleus.SearchType.StartsWith) + '|bind PAD0_Y "+attack"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_UP", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_UP "headlights"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);
  }

  if (mod == "Urban Terror") {
    var modArgs = "+set fs_game q3ut4 +set com_zoneMegs 512 +set com_hunkMegs 1024";

    var dict = [
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTTRIGGER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTTRIGGER "ut_zoomin"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_LEFTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_LEFTSHOULDER "+button8"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHTSHOULDER", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSHOULDER "+button6"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_X", Nucleus.SearchType.StartsWith) + '|bind PAD0_X "+button5; +button7"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_UP", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_UP "ut_itemuse"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_DOWN", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_DOWN "ut_itemdrop"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_LEFT", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_LEFT "ut_itemprev"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_DPAD_RIGHT", Nucleus.SearchType.StartsWith) + '|bind PAD0_DPAD_RIGHT "ut_itemprev"',
      Context.FindLineNumberInTextFile(xinputCfg, "bind PAD0_RIGHSTICK_CLICK", Nucleus.SearchType.StartsWith) + '|bind PAD0_RIGHTSTICK_CLICK "weapon 1"'
    ];
    Context.ReplaceLinesInTextFile(xinputCfg, dict);

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\q3ut4\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"',
      'bind e "+button7"',
      'bind SHIFT "+button8"',
      'bind MOUSE2 "ut_zoomin"',
      'bind MOUSE3 "+button3"',
      'bind f "+button6"',
      'bind r "+button5"',
      'bind UPARROW "ut_itemuse"',
      'bind DOWNARROW "ut_itemdrop"',
      'bind LEFTARROW "ut_itemprev"',
      'bind RIGHTARROW "ut_itemnext"'
    ];

    Context.WriteTextFile(mkbCfg, lines);
  }

  if (mod == "Monkeys of Doom") {
    var modArgs = "+set fs_game basemod";
  }

  if (mod == "World of Padman") {
    var modArgs = "+set fs_game wop";
  }

  Context.StartArguments = "+set com_zoneMegs 256 +set com_hunkMegs 512 " + ratioArgs + " " + fovArgs + " " + modArgs;

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\baseq3\\autoexec.cfg";

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta s_musicvolume", Nucleus.SearchType.StartsWith) + '|seta s_musicvolume "0.0"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Player.IsKeyboardPlayer) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "exec xinput.cfg", Nucleus.SearchType.StartsWith) + "|exec mkb.cfg"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, false, true, false, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

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