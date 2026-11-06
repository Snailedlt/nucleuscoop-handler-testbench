Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu May 09 2024 10:02:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "za3NdPNCCLrynuwF7";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["90", "95", "100", "105", "110", "115", "120", "125", "130", "135", "140"];
var answers2 = ["2 or more", "1"];
Game.AddOption("Select field of view", "Default is 90.", "FOV", answers1);
Game.AddOption(
  "How many gamepads do you have plugged into your computer?",
  "This game has a strange relationship with xinputplus. If you are having trouble with input when using a single gamepad try changing this setting.",
  "Gamepads",
  answers2
);

Game.ExecutableContext = ["GameGUI.dll"];
Game.FileSymlinkExclusions = ["Controls0.ctl", "Player0.plr", "SeriousSam.gms"];
Game.FileSymlinkCopyInstead = ["PersistentSymbols.ini"];
Game.ExecutableName = "SeriousSam_Custom.exe";
Game.SteamID = "41050";
Game.GUID = "Serious Sam The First Encounter";
Game.GameName = "Serious Sam: The First Encounter";
Game.BinariesFolder = "Bin";
Game.LauncherTitle = "";
Game.LauncherExe = "start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.HideTaskbar = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.RefreshWindowAfterStart = true;
Game.PreventWindowDeactivation = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Serious Sam";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.HandlerInterval = 100;
Game.Description =
  "Requires the Serious Sam Classics Patch by Dreamy Cecil: https://dreamycecil.itch.io/classics-patch \nLaunch the mod at least once before using this handler. Once setup is complete alt tab and use the mouse cursor to navigate the UI in all gamepad instances. Host a server with one player and join with the rest. Once all gamepad players have joined the server and selected their preferences, press END to lock input to bring control to gamepad instances and allow each keyboard player their own cursor and keys. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenContextAndLaunch = 5;
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

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
Game.ProtoInput.SetWindowPosHook = true;

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
  if (Context.HasKeyboardPlayer == true) {
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Players\\Player0.plr");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Player0.plr");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var batPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var conPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Controls\\Controls0.ctl";

  var ini1Path = Context.ScriptFolder + "\\1.ini";
  var ini2Path = Context.ScriptFolder + "\\2.ini";
  var ini3Path = Context.ScriptFolder + "\\3.ini";
  var ini4Path = Context.ScriptFolder + "\\4.ini";

  var gps = Context.Options["Gamepads"];

  if (gps == "1") {
    var idnum = gps;
  } else {
    var idnum = "2";
  }

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.DrawFakeCursor = true;

    var batLines = ['start Bin\\SeriousSam_Custom.exe"'];

    var conLines = [
      "Button",
      "Name: TTRS Move Forward",
      "Key1: W",
      "Key2: Arrow Up",
      "Pressed:  ctl_bMoveForward = 1;",
      "Released: ctl_bMoveForward = 0;",
      "Button",
      "Name: TTRS Move Backward",
      "Key1: S",
      "Key2: Arrow Down",
      "Pressed:  ctl_bMoveBackward = 1;",
      "Released: ctl_bMoveBackward = 0;",
      "Button",
      "Name: TTRS Strafe Left",
      "Key1: A",
      "Key2: Q",
      "Pressed:  ctl_bMoveLeft = 1;",
      "Released: ctl_bMoveLeft = 0;",
      "Button",
      "Name: TTRS Strafe Right",
      "Key1: D",
      "Key2: E",
      "Pressed:  ctl_bMoveRight = 1;",
      "Released: ctl_bMoveRight = 0;",
      "Button",
      "Name: TTRS Up/Jump",
      "Key1: Space",
      "Key2: None",
      "Pressed:  ctl_bMoveUp = 1;",
      "Released: ctl_bMoveUp = 0;",
      "Button",
      "Name: TTRS Down/Duck",
      "Key1: Left Alt",
      "Key2: C",
      "Pressed:  ctl_bMoveDown = 1;",
      "Released: ctl_bMoveDown = 0;",
      "Button",
      "Name: TTRS Turn Left",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bTurnLeft = 1;",
      "Released: ctl_bTurnLeft = 0;",
      "Button",
      "Name: TTRS Turn Right",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bTurnRight = 1;",
      "Released: ctl_bTurnRight = 0;",
      "Button",
      "Name: TTRS Look Up",
      "Key1: Mouse Button 4",
      "Key2: None",
      "Pressed:  ctl_bTurnUp = 1;",
      "Released: ctl_bTurnUp = 0;",
      "Button",
      "Name: TTRS Look Down",
      "Key1: Mouse Button 5",
      "Key2: None",
      "Pressed:  ctl_bTurnDown = 1;",
      "Released: ctl_bTurnDown = 0;",
      "Button",
      "Name: TTRS Center View",
      "Key1: Home",
      "Key2: None",
      "Pressed:  ctl_bCenterView = 1;",
      "Released: ctl_bCenterView = 0;",
      "Button",
      "Name: TTRS Walk",
      "Key1: Left Shift",
      "Key2: None",
      "Pressed:  ctl_bWalk = !ctl_bWalk;",
      "Released: ctl_bWalk = !ctl_bWalk;",
      "Button",
      "Name: TTRS Walk/Run Toggle",
      "Key1: Caps Lock",
      "Key2: None",
      "Pressed:  ctl_bWalk = !ctl_bWalk;",
      "Released: ;",
      "Button",
      "Name: TTRS Strafe",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bStrafe = 1;",
      "Released: ctl_bStrafe = 0;",
      "Button",
      "Name: TTRS Fire",
      "Key1: Mouse Button 1",
      "Key2: None",
      "Pressed:  ctl_bFire = 1;",
      "Released: ctl_bFire = 0;",
      "Button",
      "Name: TTRS Reload",
      "Key1: R",
      "Key2: None",
      "Pressed:  ctl_bReload = 1;",
      "Released: ctl_bReload = 0;",
      "Button",
      "Name: TTRS 3rd Person View",
      "Key1: H",
      "Key2: None",
      "Pressed:  ctl_b3rdPersonView = 1;",
      "Released: ctl_b3rdPersonView = 0;",
      "Button",
      "Name: TTRS Use/Invoke NETRICSA",
      "Key1: Mouse Button 2",
      "Key2: Enter",
      "Pressed:  ctl_bUseOrComputer = 1;",
      "Released: ctl_bUseOrComputer = 0;",
      "Button",
      "Name: TTRS Use",
      "Key1: E",
      "Key2: None",
      "Pressed:  ctl_bUse = 1;",
      "Released: ctl_bUse = 0;",
      "Button",
      "Name: TTRS Invoke NETRICSA",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bComputer = 1;",
      "Released: ctl_bComputer = 0;",
      "Button",
      "Name: TTRS Talk",
      "Key1: T",
      "Key2: None",
      "Pressed:  con_bTalk=1;",
      "Released: ",
      "Button",
      "Name: TTRS Previous Weapon",
      "Key1: Mouse Wheel Up",
      "Key2: [",
      "Pressed:  ctl_bWeaponPrev = 1;",
      "Released: ctl_bWeaponPrev = 0;",
      "Button",
      "Name: TTRS Next Weapon",
      "Key1: Mouse Wheel Down",
      "Key2: ]",
      "Pressed:  ctl_bWeaponNext = 1;",
      "Released: ctl_bWeaponNext = 0;",
      "Button",
      "Name: TTRS Flip Weapon",
      "Key1: Mouse Button 3",
      "Key2: None",
      "Pressed:  ctl_bWeaponFlip = 1;",
      "Released: ctl_bWeaponFlip = 0;",
      "Button",
      "Name: TTRS Knife",
      "Key1: 1",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[1] = 1;",
      "Released: ctl_bSelectWeapon[1] = 0;",
      "Button",
      "Name: TTRS Colt/Two Colts",
      "Key1: 2",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[2] = 1;",
      "Released: ctl_bSelectWeapon[2] = 0;",
      "Button",
      "Name: TTRS Single/Double Shotgun",
      "Key1: 3",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[3] = 1;",
      "Released: ctl_bSelectWeapon[3] = 0;",
      "Button",
      "Name: TTRS Tommygun/Minigun",
      "Key1: 4",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[4] = 1;",
      "Released: ctl_bSelectWeapon[4] = 0;",
      "Button",
      "Name: TTRS Rocket Launcher",
      "Key1: 5",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[5] = 1;",
      "Released: ctl_bSelectWeapon[5] = 0;",
      "Button",
      "Name: TTRS Grenade Launcher",
      "Key1: 6",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[6] = 1;",
      "Released: ctl_bSelectWeapon[6] = 0;",
      "Button",
      "Name: TTRS Laser",
      "Key1: 7",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[8] = 1;",
      "Released: ctl_bSelectWeapon[8] = 0;",
      "Button",
      "Name: TTRS Cannon",
      "Key1: 8",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[9] = 1;",
      "Released: ctl_bSelectWeapon[9] = 0;",
      "Button",
      "Name: TTRS Strafe Left",
      "Key1: Arrow Left",
      "Key2: None",
      "Pressed:  ctl_bMoveLeft = 1;",
      "Released: ctl_bMoveLeft = 0;",
      "Button",
      "Name: TTRS Strafe Right",
      "Key1: Arrow Right",
      "Key2: None",
      "Pressed:  ctl_bMoveRight = 1;",
      "Released: ctl_bMoveRight = 0;",
      'Axis "move u/d" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "move l/r" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "move f/b" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "look u/d" "mouse Y" 50 0 NotInverted Relative NotSmooth',
      'Axis "turn l/r" "mouse X" 50 0 NotInverted Relative NotSmooth',
      'Axis "banking" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "view u/d" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "view l/r" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "view banking" "None" 50 0 NotInverted Absolute NotSmooth',
      "GlobalDontInvertLook",
      "GlobalSmoothAxes",
      "GlobalSensitivity 50",
      ""
    ];
  } else {
    var batLines = [
      'cd /D "' + Context.NucleusFolder + '\\utils\\XInputPlus\\Loader"',
      'start XInputPlusLoader.exe "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\Bin\\SeriousSam_Custom.exe"'
    ];

    var conLines = [
      "Button",
      "Name: TTRS Move Forward",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bMoveForward = 1;",
      "Released: ctl_bMoveForward = 0;",
      "Button",
      "Name: TTRS Move Backward",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bMoveBackward = 1;",
      "Released: ctl_bMoveBackward = 0;",
      "Button",
      "Name: TTRS Strafe Left",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bMoveLeft = 1;",
      "Released: ctl_bMoveLeft = 0;",
      "Button",
      "Name: TTRS Strafe Right",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bMoveRight = 1;",
      "Released: ctl_bMoveRight = 0;",
      "Button",
      "Name: TTRS Up/Jump",
      "Key1: Joy 1 Button 0",
      "Key2: None",
      "Pressed:  ctl_bMoveUp = 1;",
      "Released: ctl_bMoveUp = 0;",
      "Button",
      "Name: TTRS Down/Duck",
      "Key1: Joy 1 Button 1",
      "Key2: None",
      "Pressed:  ctl_bMoveDown = !ctl_bMoveDown;",
      "Released: ctl_bMoveDown = !ctl_bMoveDown;",
      "Button",
      "Name: TTRS Turn Left",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bTurnLeft = 1;",
      "Released: ctl_bTurnLeft = 0;",
      "Button",
      "Name: TTRS Turn Right",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bTurnRight = 1;",
      "Released: ctl_bTurnRight = 0;",
      "Button",
      "Name: TTRS Look Up",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bTurnUp = 1;",
      "Released: ctl_bTurnUp = 0;",
      "Button",
      "Name: TTRS Look Down",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bTurnDown = 1;",
      "Released: ctl_bTurnDown = 0;",
      "Button",
      "Name: TTRS Center View",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bCenterView = 1;",
      "Released: ctl_bCenterView = 0;",
      "Button",
      "Name: TTRS Walk",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bWalk = !ctl_bWalk;",
      "Released: ctl_bWalk = !ctl_bWalk;",
      "Button",
      "Name: TTRS Walk/Run Toggle",
      "Key1: Joy 1 Button 8",
      "Key2: None",
      "Pressed:  ctl_bWalk = !ctl_bWalk;",
      "Released: ;",
      "Button",
      "Name: TTRS Strafe",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bStrafe = 1;",
      "Released: ctl_bStrafe = 0;",
      "Button",
      "Name: TTRS Fire",
      "Key1: Joy 1 Button 11",
      "Key2: None",
      "Pressed:  ctl_bFire = 1;",
      "Released: ctl_bFire = 0;",
      "Button",
      "Name: TTRS Reload",
      "Key1: Joy 1 Button 10",
      "Key2: None",
      "Pressed:  ctl_bReload = 1;",
      "Released: ctl_bReload = 0;",
      "Button",
      "Name: TTRS 3rd person view",
      "Key1: Joy 1 Button 9",
      "Key2: None",
      "Pressed:  ctl_b3rdPersonView = 1;",
      "Released: ctl_b3rdPersonView = 0;",
      "Button",
      "Name: TTRS Use/Invoke NETRICSA",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bUseOrComputer = 1;",
      "Released: ctl_bUseOrComputer = 0;",
      "Button",
      "Name: TTRS Use",
      "Key1: Joy 1 Button 2",
      "Key2: None",
      "Pressed:  ctl_bUse = 1;",
      "Released: ctl_bUse = 0;",
      "Button",
      "Name: TTRS Invoke NETRICSA",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bComputer = 1;",
      "Released: ctl_bComputer = 0;",
      "Button",
      "Name: TTRS Talk",
      "Key1: None",
      "Key2: None",
      "Pressed:  con_bTalk=1;",
      "Released: ",
      "Button",
      "Name: TTRS Previous Weapon",
      "Key1: Joy 1 Button 4",
      "Key2: None",
      "Pressed:  ctl_bWeaponPrev = 1;",
      "Released: ctl_bWeaponPrev = 0;",
      "Button",
      "Name: TTRS Next Weapon",
      "Key1: Joy 1 Button 5",
      "Key2: None",
      "Pressed:  ctl_bWeaponNext = 1;",
      "Released: ctl_bWeaponNext = 0;",
      "Button",
      "Name: TTRS Flip Weapon",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bWeaponFlip = 1;",
      "Released: ctl_bWeaponFlip = 0;",
      "Button",
      "Name: TTRS Knife",
      "Key1: Joy 1 POV S",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[1] = 1;",
      "Released: ctl_bSelectWeapon[1] = 0;",
      "Button",
      "Name: TTRS Colt/Two Colts",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[2] = 1;",
      "Released: ctl_bSelectWeapon[2] = 0;",
      "Button",
      "Name: TTRS Single/Double Shotgun",
      "Key1: Joy 1 POV W",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[3] = 1;",
      "Released: ctl_bSelectWeapon[3] = 0;",
      "Button",
      "Name: TTRS Tommygun/Minigun",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[4] = 1;",
      "Released: ctl_bSelectWeapon[4] = 0;",
      "Button",
      "Name: TTRS Rocket Launcher",
      "Key1: Joy 1 POV N",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[5] = 1;",
      "Released: ctl_bSelectWeapon[5] = 0;",
      "Button",
      "Name: TTRS Grenade Launcher",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[6] = 1;",
      "Released: ctl_bSelectWeapon[6] = 0;",
      "Button",
      "Name: TTRS Laser",
      "Key1: None",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[8] = 1;",
      "Released: ctl_bSelectWeapon[8] = 0;",
      "Button",
      "Name: TTRS Cannon",
      "Key1: Joy 1 POV E",
      "Key2: None",
      "Pressed:  ctl_bSelectWeapon[9] = 1;",
      "Released: ctl_bSelectWeapon[9] = 0;",
      'Axis "move u/d" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "move l/r" "Joy 1 Axis X" 50 10 Inverted Relative NotSmooth',
      'Axis "move f/b" "Joy 1 Axis Y" 50 10 Inverted Relative NotSmooth',
      'Axis "look u/d" "Joy 1 Axis R" 44 10 Inverted Relative NotSmooth',
      'Axis "turn l/r" "Joy 1 Axis U" 48 10 NotInverted Relative NotSmooth',
      'Axis "banking" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "view u/d" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "view l/r" "None" 50 0 NotInverted Absolute NotSmooth',
      'Axis "view banking" "None" 50 0 NotInverted Absolute NotSmooth',
      "GlobalDontInvertLook",
      "GlobalDontSmoothAxes",
      "GlobalSensitivity 50",
      ""
    ];

    if (Context.GamepadId == 1) {
      var iniPkgOrigin = System.IO.Path.Combine(Game.Folder, "0.ini");
      System.IO.File.Copy(iniPkgOrigin, ini1Path, true);
      System.IO.File.Copy(iniPkgOrigin, ini2Path, true);
      System.IO.File.Copy(iniPkgOrigin, ini3Path, true);
      System.IO.File.Copy(iniPkgOrigin, ini4Path, true);

      Context.ModifySaveFile(ini1Path, ini1Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID" + idnum, "{" + Context.GamepadGuid + "}")]);

      Context.ModifySaveFile(ini3Path, ini3Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID2", "{" + Context.GamepadGuid + "}")]);

      Context.ModifySaveFile(ini4Path, ini4Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID3", "{" + Context.GamepadGuid + "}")]);
    }

    if (Context.GamepadId == 2) {
      Context.ModifySaveFile(ini2Path, ini2Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID2", "{" + Context.GamepadGuid + "}")]);

      Context.ModifySaveFile(ini3Path, ini3Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID3", "{" + Context.GamepadGuid + "}")]);

      Context.ModifySaveFile(ini4Path, ini4Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID4", "{" + Context.GamepadGuid + "}")]);
    }

    if (Context.GamepadId == 3) {
      Context.ModifySaveFile(ini3Path, ini3Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID1", "{" + Context.GamepadGuid + "}")]);
    }

    if (Context.GamepadId == 4) {
      Context.ModifySaveFile(ini4Path, ini4Path, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("X2DInput", "DeviceID2", "{" + Context.GamepadGuid + "}")]);
    }

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin\\XInputPlus.ini";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "" + Context.GamepadId + ".ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  Context.WriteTextFile(batPath, batLines);
  Context.WriteTextFile(conPath, conLines);

  var fov = Context.Options["FOV"];

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Scripts\\PersistentSymbols.ini";
  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_bFullScreen", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_bFullScreen=(INDEX)0;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_iWindowMode", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_iWindowMode=(INDEX)1;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT hud_fCrosshairScale", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT hud_fCrosshairScale=(FLOAT)1;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user INDEX snd_iInterface", Nucleus.SearchType.StartsWith) + "|persistent extern user INDEX snd_iInterface=(INDEX)0;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_bAutoAdjustAudio", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_bAutoAdjustAudio=(INDEX)0;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT hud_fScaling", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT hud_fScaling=(FLOAT)0.6;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT plr_fFOV", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT plr_fFOV=(FLOAT)" + fov + ";",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT sam_fCustomFOV", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT sam_fCustomFOV=(FLOAT)" + fov + ";",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT sam_fThirdPersonFOV", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT sam_fThirdPersonFOV=(FLOAT)90;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_bShowAllLevels", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_bShowAllLevels=(INDEX)1;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_bMentalActivated", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_bMentalActivated=(INDEX)1;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern user INDEX sam_bAutoPlayDemos", Nucleus.SearchType.StartsWith) + "|persistent extern user INDEX sam_bAutoPlayDemos=(INDEX)0;",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_iScreenSizeI", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_iScreenSizeI=(INDEX)" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "persistent extern INDEX sam_iScreenSizeJ", Nucleus.SearchType.StartsWith) + "|persistent extern INDEX sam_iScreenSizeJ=(INDEX)" + Context.Height + ";"
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT snd_fMusicVolume", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT snd_fMusicVolume=(FLOAT)0;"];
  } else {
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT snd_fMusicVolume", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT snd_fMusicVolume=(FLOAT)1;"];
  }
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  if (Context.AspectRatioDecimal < 1.2) {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT plr_fFOV", Nucleus.SearchType.StartsWith) +
        "|persistent extern user FLOAT plr_fFOV=(FLOAT)" +
        (2 * Math.atan((9 / 8) * (16 / 9) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI +
        ";",
      Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT sam_fCustomFOV", Nucleus.SearchType.StartsWith) +
        "|persistent extern user FLOAT sam_fCustomFOV=(FLOAT)" +
        (2 * Math.atan((9 / 8) * (16 / 9) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI +
        ";",
      Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT sam_fThirdPersonFOV", Nucleus.SearchType.StartsWith) +
        "|persistent extern user FLOAT sam_fThirdPersonFOV=(FLOAT)" +
        (2 * Math.atan((9 / 8) * (16 / 9) * Math.tan(((90 / 2) * Math.PI) / 180)) * 180) / Math.PI +
        ";",
      Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT hud_fScaling", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT hud_fScaling=(FLOAT)0.3;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  if (Context.AspectRatioDecimal > 1.8) {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "persistent extern user FLOAT hud_fCrosshairScale", Nucleus.SearchType.StartsWith) + "|persistent extern user FLOAT hud_fCrosshairScale=(FLOAT)0.495;"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "Players\\Player0.plr"),
    System.IO.Path.Combine(Context.RootFolder, "Players\\Player0.plr"),
    [0x00, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x20, 0x31, 0x00],
    [0x00, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x20, 0x30 + (Context.PlayerID + 1), 0x00]
  );

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "Players\\Player0.plr"),
    System.IO.Path.Combine(Context.RootFolder, "Players\\Player0.plr"),
    [0x4c, 0xae, 0x29, 0xe5, 0x99],
    [0x4c, 0xae, 0x00 + (Context.PlayerID + 1), 0xe5, 0x99]
  );

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

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