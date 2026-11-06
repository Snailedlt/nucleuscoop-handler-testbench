Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Aug 13 2023 04:36:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "kbmHkaeuaSK7GrPyi";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["None", "Defence Alliance", "AirFightUT", "NeoCairo", "Strike Force"];
var answers2 = ["Default", "4:3"];
var answers3 = ["90", "95", "100", "105", "110", "115", "120", "125", "130", "135", "140"];
var answers4 = ["Default", "0.040", "0.080", "0.100", "0.140", "0.180", "0.220", "0.260", "0.300", "0.340", "0.380", "0.420", "0.460", "0.500", "0.540", "0.580"];
var answers5 = ["Default", "0.040", "0.080", "0.100", "0.140", "0.180", "0.220", "0.260", "0.300", "0.340", "0.380", "0.420", "0.460", "0.500", "0.540", "0.580"];
var answers6 = ["Default", "0.040", "0.080", "0.100", "0.140", "0.180", "0.220", "0.260", "0.300", "0.340", "0.380", "0.420", "0.460", "0.500", "0.540", "0.580"];
var answers7 = ["Default", "0.040", "0.080", "0.100", "0.140", "0.180", "0.220", "0.260", "0.300", "0.340", "0.380", "0.420", "0.460", "0.500", "0.540", "0.580"];
Game.AddOption("Select mod", "Make sure to install and launch a mod outside of Nucleus before using it.", "Mod", answers1);
Game.AddOption("Select aspect ratio", "", "aspectRatio", answers2);
Game.AddOption("Select field of view", "Default is 90. Community preferred is 110-120.", "FOV", answers3);
Game.AddOption("Select gamepad 1 sensitivity", "Default is equal to 0.300.", "pad0Sen", answers4);
Game.AddOption("Select gamepad 2 sensitivity", "", "pad1Sen", answers5);
Game.AddOption("Select gamepad 3 sensitivity", "", "pad2Sen", answers6);
Game.AddOption("Select gamepad 4 sensitivity", "", "pad3Sen", answers7);

Game.ExecutableContext = ["UnrealEd.exe"];
Game.FileSymlinkExclusions = [
  "User.ini",
  "UnrealTournament.ini",
  "foxWSFix99.u",
  "DefenceAlliance.ini",
  "DAUser.ini",
  "AirFightUT.ini",
  "AirfightUT_User.ini",
  "TeamOrbit.ini",
  "NCUser.ini",
  "StrikeForce.ini",
  "SFUser.ini"
];
Game.ExecutableName = "UnrealTournament.exe";
Game.SteamID = "13240";
Game.GUID = "UnrealTournament99";
Game.GameName = "Unreal Tournament";
Game.BinariesFolder = "System";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ChangeExe = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.NotTopMost = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Unreal Tournament";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["dinput.dll", "dinput8.dll", "xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HandlerInterval = 100;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.GoldbergNeedSteamInterface = false;
Game.Description =
  "Requires OldUnreal's Newest Unofficial Unreal Tournament Patch. Launch the game after installing the patch at least once to make sure it is working properly and set XOpenGL as your Video Driver. Alt tab and use the mouse cursor to navigate the UI in all gamepad instances, you need to press ESC to exit the Unreal Tournament logo and enter the main menu for each instance after launch. You must choose your skins before joining if you want them to show up in game. Host a lan server with one player and join with the rest. If you have at least one keyboard player alt tab to a gamepad player and press END to lock input after all gamepad players have selected their player settings and joined. Keyboard players can press HOME to hide their cursor if it fails to hide properly in game. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenContextAndLaunch = 2;
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

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
//Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

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
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder + "\\utils\\XInputPlus\\winmm\\Winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var xplusPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\XInputPlus.ini";
  Context.ModifySaveFile(xplusPath, xplusPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_4", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", false),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Button12"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Button13"),
    new Nucleus.IniSaveInfo("X2DInput", "DisableUnmappedObject", true)
  ]);

  System.IO.File.Copy(
    System.IO.Path.Combine(Context.RootInstallFolder, "UnrealTournament.ini"),
    System.IO.Path.Combine(Context.RootFolder, "System\\UnrealTournament - Player " + (Context.PlayerID + 1) + ".ini"),
    true
  );

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "User.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\User.ini"), true);

  var mod = Context.Options["Mod"];

  if (mod == "None") {
    var modArgs = "";
    var console = "UTMenu.UTConsole";
    var wsconsole = "foxWSFix99.foxUTConsole";

    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\UnrealTournament - Player " + (Context.PlayerID + 1) + ".ini");
    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini";
  }

  if (mod == "Defence Alliance") {
    var modArgs = " intro-da.unr INI=DefenceAlliance.ini USERINI=DAUser.ini LOG=DefenceAlliance.log";

    var console = "DefenceAlliance.DAConsole";
    var wsconsole = "DefenceAlliance.DAConsole";

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DefenceAlliance.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\DefenceAlliance.ini"), true);
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DAUser.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\DAUser.ini"), true);
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\DefenceAlliance.ini");
    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\DAUser.ini";
  }

  if (mod == "AirFightUT") {
    var modArgs = " AirfightUT-Logo-Map INI=AirfightUT.ini USERINI=AirfightUT_User.ini LOG=AirfightUT.log";

    var console = "UTMenu.UTConsole";
    var wsconsole = "foxWSFix99.foxUTConsole";

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "AirFightUT.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\AirFightUT.ini"), true);
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "AirFightUT_User.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\AirFightUT_User.ini"), true);
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\AirFightUT.ini");
    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\AirFightUT_User.ini";
  }

  if (mod == "NeoCairo") {
    var modArgs = " OWI-NeoCairoCityIntro?Game=TeamOrbit.OW_LadderTransition INI=TeamOrbit.ini USERINI=NCUser.ini LOG=TeamOrbit.log";

    var console = "UTMenu.UTConsole";
    var wsconsole = "foxWSFix99.foxUTConsole";

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "TeamOrbit.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\TeamOrbit.ini"), true);
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "NCUser.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\NCUser.ini"), true);
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\TeamOrbit.ini");
    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NCUser.ini";
  }

  if (mod == "Strike Force") {
    var modArgs = " INI=StrikeForce.ini USERINI=SFUser.ini";

    var console = "SFMenu.SFConsole";
    var wsconsole = "SFMenu.SFConsole";

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "StrikeForce.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\StrikeForce.ini"), true);
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SFUser.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\SFUser.ini"), true);
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\StrikeForce.ini");
    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\SFUser.ini";
  }

  /*	if (mod == "Thievery UT") {
		var modArgs = " -nolog INI=ThAux.ini USERINI=ThieveryUser.ini LOG=Thievery.log";

		var console = "ThMenu.ThConsole"
		var wsconsole = "ThMenu.ThConsole"

		System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "ThAux.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\ThAux.ini"), true);
		System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "ThieveryUser.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\ThieveryUser.ini"), true);
		var cfgPath = Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\ThAux.ini";
		var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\ThieveryUser.ini";
	}*/

  Context.StartArguments = modArgs;

  var fov = Context.Options["FOV"];

  Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
    new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "E", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "W", "MoveForward"),
    new Nucleus.IniSaveInfo("Engine.Input", "A", "StrafeLeft"),
    new Nucleus.IniSaveInfo("Engine.Input", "S", "MoveBackward"),
    new Nucleus.IniSaveInfo("Engine.Input", "D", "StrafeRight"),
    new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Alt", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "InventoryNext"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "PrevWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "NextWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "Feigndeath"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy11", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Fire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy14", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy15", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis astrafe speed=0.3"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY speed=0.3"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-0.200"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=0.300"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", "Taunt Victory1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", "Taunt Taunt1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", "Taunt wave"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", "Taunt Thrust"),
    new Nucleus.IniSaveInfo("Engine.PlayerPawn", "DesiredFOV", fov),
    new Nucleus.IniSaveInfo("Engine.PlayerPawn", "DefaultFOV", fov)
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.PlayerInput", "bEnableDodging", true)]);
  } else {
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.PlayerInput", "bEnableDodging", false)]);
  }

  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("URL", "LocalMap", "UT-Logo-Map.unr"),
    new Nucleus.IniSaveInfo("XOpenGLDrv.XOpenGLRenderDevice", "UseVSync", "off"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedColorBits", "32"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseDirectInput", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", false),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MinDesiredFrameRate", "60"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FrameRateLimit", "60")
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", false),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseDirectInput", false),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseRawHIDInput", true),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", true)
    ]);
  }

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Cluster.ClusterAudioSubsystem", "MusicVolume", "0")]);
  }

  if (Context.AspectRatioDecimal > 1.4) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\foxWSFix99.u");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "foxWSFix99.u");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.Engine", "Console", wsconsole),
      new Nucleus.IniSaveInfo("foxWSFix99.foxUTConsole", "Desired43FOV", fov)
    ]);

    if (wsconsole != "foxWSFix99.foxUTConsole") {
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.PlayerPawn", "DesiredFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerPawn", "DefaultFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI)
      ]);
    }
  } else {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.Engine", "Console", console)]);
  }

  var sen0 = Context.Options["pad0Sen"];
  var sen1 = Context.Options["pad1Sen"];
  var sen2 = Context.Options["pad2Sen"];
  var sen3 = Context.Options["pad3Sen"];

  if (Context.PlayerID == 0) {
    if (sen0 == "Default") {
    } else {
      sen = sen0;
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen / 1.5)
      ]);
    }
  }

  if (Context.PlayerID == 1) {
    if (sen1 == "Default") {
    } else {
      sen = sen1;
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen / 1.5)
      ]);
    }
  }

  if (Context.PlayerID == 2) {
    if (sen2 == "Default") {
    } else {
      sen = sen2;
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen / 1.5)
      ]);
    }
  }

  if (Context.PlayerID == 3) {
    if (sen3 == "Default") {
    } else {
      sen = sen3;
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen / 1.5)
      ]);
    }
  }

  var ratio = Context.Options["aspectRatio"];

  if (ratio == "4:3") {
    Game.DontResize = true;
    Game.ResetWindows = true;

    if (Context.AspectRatioDecimal > 1.4) {
      Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Height * 1.3333333333),
        new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height)
      ]);
    } else if (Context.AspectRatioDecimal < 1.2) {
      Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
        new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Width / 1.3333333333)
      ]);
    } else {
    }
  } else {
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

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

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
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