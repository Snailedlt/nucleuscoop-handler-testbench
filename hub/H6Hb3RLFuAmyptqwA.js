Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Feb 05 2022 16:08:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "H6Hb3RLFuAmyptqwA";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["90", "95", "100", "105", "110", "115", "120", "125", "130", "135", "140"];
var answers2 = ["Default", "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75"];
var answers3 = ["Default", "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75"];
var answers4 = ["Default", "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75"];
var answers5 = ["Default", "0.25", "0.50", "0.75", "1.00", "1.25", "1.50", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00", "3.25", "3.50", "3.75"];
Game.AddOption("Select field of view", "Default is 90. Community preferred is 110-120.", "FOV", answers1);
Game.AddOption("Select gamepad 1 sensitivity", "Default is equal to 2.00.", "pad0Sen", answers2);
Game.AddOption("Select gamepad 2 sensitivity", "", "pad1Sen", answers3);
Game.AddOption("Select gamepad 3 sensitivity", "", "pad2Sen", answers4);
Game.AddOption("Select gamepad 4 sensitivity", "", "pad3Sen", answers5);

Game.ExecutableContext = ["UnrealEd.exe"];
Game.FileSymlinkExclusions = ["User.ini", "U2XMP.ini"];
Game.FileSymlinkCopyInstead = [""];
Game.ExecutableName = "U2XMP.exe";
Game.SteamID = "13200";
Game.GUID = "Unreal2";
Game.GameName = "Unreal 2: The Awakening";
Game.BinariesFolder = "System";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 32;
Game.MaxPlayers = 32;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.ChangeExe = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "U2XMP";
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
  "Launch the game at least once before using this script. Requires the XMP (Expanded Multiplayer) expansion. If you are using the Steam or retail anthology versions you must use Unreal 2 XMP Community Edition, don't install the expansion in your game files, install it in its own folder. Join one of the online official servers, if you wish to play offline LAN, or with custom settings, you need to setup a dedicated server (not a listen server) outside of nucleus as opening one in-game does not allow other instances to join. The dodge is touchy for gamepad players, with no setting to change it, so mouse and keyboard is recommended if you have issues. After all gamepad players have joined and selected their class, press END and wait a few seconds to lock input to allow each keyboard player control of their instance. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all of its instances.";
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

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
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
    Game.ProtoInput.FocusHooks = true;
  } else {
  }
  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "U2XMP.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\U2XMP - Player " + (Context.PlayerID + 1) + ".ini"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "User.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\User.ini"), true);

  var xplusPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\XInputPlus.ini";
  Context.ModifySaveFile(xplusPath, xplusPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_4", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", false),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Button11"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Button12"),
    new Nucleus.IniSaveInfo("X2DInput", "GUIDE", "Button13"),
    new Nucleus.IniSaveInfo("X2DInput", "DisableUnmappedObject", true)
  ]);

  var fov = Context.Options["FOV"];

  var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\U2XMP - Player " + (Context.PlayerID + 1) + ".ini");
  var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini";

  Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
    new Nucleus.IniSaveInfo("Engine.Input", "E", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
    //new Nucleus.IniSaveInfo("Engine.Input", "LeftMouse", ""),
    //new Nucleus.IniSaveInfo("Engine.Input", "RightMouse", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "PrevWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "NextWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "Sprint"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "Grab"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy8", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Taunt 1"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "Taunt 2"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "Taunt 3"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "Taunt 4"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=2.0 DeadZone=0.01"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=1.33 DeadZone=0.01 Invert=-1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", ""),
    new Nucleus.IniSaveInfo("Engine.PlayerController", "DesiredFOV", fov),
    new Nucleus.IniSaveInfo("Engine.PlayerController", "DefaultFOV", fov),
    new Nucleus.IniSaveInfo("Engine.PlayerController", "FOVAngle", fov),
    new Nucleus.IniSaveInfo("Engine.PlayerInput", "bEnableDodging", true)
  ]);

  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.Engine", "RenderDevice", "D3DDrv.D3DRenderDevice"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedColorBits", "32"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", true),
    //new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseDirectInput", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FrameRateLimit", "120"),
    new Nucleus.IniSaveInfo("ALAudio.ALAudioSubsystem", "UseDefaultDriver", false),
    new Nucleus.IniSaveInfo("D3DDrv.D3DRenderDevice", "ReduceMouseLag", false)
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", false)
      //new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", true)
    ]);
  }

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ALAudio.ALAudioSubsystem", "MusicVolume", "0.000000")]);
  }

  if (Context.AspectRatioDecimal > 1.35) {
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.PlayerController", "DesiredFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
      new Nucleus.IniSaveInfo("Engine.PlayerController", "DefaultFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
      new Nucleus.IniSaveInfo("Engine.PlayerController", "FOVAngle", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI)
    ]);
  }

  var sen0 = Context.Options["pad0Sen"];
  var sen1 = Context.Options["pad1Sen"];
  var sen2 = Context.Options["pad2Sen"];
  var sen3 = Context.Options["pad3Sen"];

  if (Context.PlayerID == 0) {
    if (sen0 == "Default") {
    } else {
      sen = sen0 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + " DeadZone=0.01"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + " DeadZone=0.01 Invert=-1")
      ]);
    }
  }

  if (Context.PlayerID == 1) {
    if (sen1 == "Default") {
    } else {
      sen = sen1 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + " DeadZone=0.01"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + " DeadZone=0.01 Invert=-1")
      ]);
    }
  }

  if (Context.PlayerID == 2) {
    if (sen2 == "Default") {
    } else {
      sen = sen2 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + " DeadZone=0.01"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + " DeadZone=0.01 Invert=-1")
      ]);
    }
  }

  if (Context.PlayerID == 3) {
    if (sen3 == "Default") {
    } else {
      sen = sen3 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + " DeadZone=0.02"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + " DeadZone=0.01 Invert=-1")
      ]);
    }
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
    }
  };
};