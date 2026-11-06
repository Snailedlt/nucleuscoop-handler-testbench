Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Fri Dec 10 2021 04:27:07 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "93bv5Bhbo6ox4a4h4";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = [
  "None",
  "Killing Floor",
  "Red Orchestra",
  "UnWheel",
  "ChaosUT2: Evolution",
  "AirBuccaneers",
  "Gunreal",
  "Troopers: Dawn of Destiny",
  "Defence Alliance 2",
  "Alien Swarm",
  "Mars Wars",
  "Frag.Ops: The Final Battle",
  "Blue Moon Rising"
];
var answers2 = ["Default", "4:3"];
var answers3 = ["90", "95", "100", "105", "110", "115", "120", "125", "130", "135", "140"];
var answers4 = ["Default", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
var answers5 = ["Default", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
var answers6 = ["Default", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
var answers7 = ["Default", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
Game.AddOption("Select mod", "Make sure to install and launch a mod outside of Nucleus before using it.", "Mod", answers1);
Game.AddOption("Select aspect ratio", "4:3 is recommended for some mods. Borders do not get removed.", "aspectRatio", answers2);
Game.AddOption("Select field of view", "Default is 90. Community preferred is 110-120.", "FOV", answers3);
Game.AddOption("Select gamepad 1 sensitivity", "Default is equal to 8. (When playing UnWheel, Default is equal to 5)", "pad0Sen", answers4);
Game.AddOption("Select gamepad 2 sensitivity", "", "pad1Sen", answers5);
Game.AddOption("Select gamepad 3 sensitivity", "", "pad2Sen", answers6);
Game.AddOption("Select gamepad 4 sensitivity", "", "pad3Sen", answers7);

Game.ExecutableContext = ["UnrealEd.exe"];
Game.FileSymlinkExclusions = [
  "User.ini",
  "ut2004.ini",
  "foxWSFix.u",
  "d3d8.dll",
  "KFmod20User.ini",
  "RedOrchestraUser.ini",
  "UnWheelUser.ini",
  "TroopersUser.ini",
  "DA2User.ini",
  "MarsWarsUser.ini",
  "FragOpsUser.ini",
  "BlueMoonRisingUser.ini"
];
Game.FileSymlinkCopyInstead = [
  "RedOrchestra.ini",
  "KFMod20.ini",
  "UnWheel.ini",
  "ChaosUT2.ini",
  "AirBuccaneers.ini",
  "Gunreal.ini",
  "Troopers.ini",
  "DA2.ini",
  "AlienSwarm.ini",
  "MarsWars.ini",
  "FragOps.ini",
  "BlueMoonRising.ini",
  "DedicatedServer-windows.bat"
];
Game.ExecutableName = "UT2004.exe";
Game.SteamID = "13230";
Game.GUID = "UnrealTournament04";
Game.GameName = "Unreal Tournament 2004";
Game.BinariesFolder = "System";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 32;
Game.MaxPlayers = 32;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.ChangeExe = true;
Game.HideTaskbar = true;
//Game.ProtoInput.AutoHideTaskbar = true;
//Game.HideDesktop = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Unreal Tournament 2004";
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
  "Launch the game at least once before using this script. Requires GOG version. You can use the steam version if you replace the default steam UT2004.exe in your game files wih an exe patched using atom0s' Steamless - SteamStub DRM Remover. Alt tab and use the mouse cursor to navigate the UI in all gamepad instances. You must choose your skins before joining if you want them to show up in game. Host a lan server with one player and join with the rest, except if using the FragOps mod, in which case a dedicated server will be hosted for you. If you have at least one keyboard player alt tab to a keyboard player and press END to lock input after all gamepad players have selected their player settings and joined to allow each keyboard player control of their instance. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. 4:3 aspect or vertical splitscreen is recommended for Red Orchestra, Gunreal, and FragOps as in their case wide screen aspects use vert- scaling.";
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
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

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
    Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
  } else {
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\d3d8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d8.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "ut2004.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\ut2004 - Player " + (Context.PlayerID + 1) + ".ini"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "User.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\User.ini"), true);

  var xplusPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\XInputPlus.ini";
  Context.ModifySaveFile(xplusPath, xplusPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_4", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", false),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", ""),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Button11"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Button12"),
    new Nucleus.IniSaveInfo("X2DInput", "GUIDE", "Button13"),
    new Nucleus.IniSaveInfo("X2DInput", "DisableUnmappedObject", true),
    new Nucleus.IniSaveInfo("X2DInput", "DisableXInput", true),
    new Nucleus.IniSaveInfo("X2DInput", "DeviceID" + (Context.PlayerID + 1), "{" + Context.GamepadGuid + "}")
  ]);

  var fov = Context.Options["FOV"];

  var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini";
  Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
    new Nucleus.IniSaveInfo("Engine.Input", "E", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "InventoryNext"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "PrevWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "NextWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Taunt gesture_point"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "Taunt pthrust"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "Taunt asssmack"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "Taunt throatcut"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=80.0 DeadZone=0.02"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=53.3 DeadZone=0.02 Invert=-1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", ""),
    new Nucleus.IniSaveInfo("Engine.PlayerController", "DesiredFOV", fov),
    new Nucleus.IniSaveInfo("Engine.PlayerController", "DefaultFOV", fov),
    new Nucleus.IniSaveInfo("Engine.PlayerController", "FOVAngle", fov)
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.PlayerInput", "bEnableDodging", true)]);
  } else {
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.PlayerInput", "bEnableDodging", false)]);
  }

  var mod = Context.Options["Mod"];

  if (mod == "None") {
    var modArgs = "";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\ut2004 - Player " + (Context.PlayerID + 1) + ".ini");
  }

  if (mod == "Killing Floor") {
    var modArgs = "-mod=KFMod20";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KFMod20\\System\\KFMod20.ini");

    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "..\\KFMod20\\System\\KFMod20User.ini"),
      System.IO.Path.Combine(Context.RootFolder, "KFMod20\\System\\KFMod20User.ini"),
      true
    );

    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KFMod20\\System\\KFMod20User.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "R", "ReloadMeNow | onrelease finishreloading | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "ReloadMeNow | onrelease finishreloading | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "InventoryNext"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "PrevWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Taunt gesture_point"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "Taunt pthrust"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "Taunt asssmack"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "Taunt throatcut"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=80.0 DeadZone=0.02"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=53.3 DeadZone=0.02 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", "")
    ]);
  }

  if (mod == "Red Orchestra") {
    var modArgs = "-mod=RedOrchestra";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\RedOrchestra\\System\\RedOrchestra.ini");

    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "..\\RedOrchestra\\System\\RedOrchestraUser.ini"),
      System.IO.Path.Combine(Context.RootFolder, "RedOrchestra\\System\\RedOrchestraUser.ini"),
      true
    );

    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\RedOrchestra\\System\\RedOrchestraUser.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "Q", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "SwitchFireMode"),
      new Nucleus.IniSaveInfo("Engine.Input", "C", "Prone"),
      new Nucleus.IniSaveInfo("Engine.Input", "Shift", "Button bSprint"),
      new Nucleus.IniSaveInfo("Engine.Input", "MiddleMouse", "ROIronSights"),
      new Nucleus.IniSaveInfo("Engine.Input", "RightMouse", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "R", "ROManualReload | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "Duck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "ROManualReload | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "Button bSprint"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowObjectives | onrelease ShowObjectives"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "Prone"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "ROIronSights"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "SwitchFireMode"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "ROMGOperation"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "PrevWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=80.0 DeadZone=0.02"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=53.3 DeadZone=0.02 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", "")
    ]);

    var rouserPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\RedOrchestra\\System\\RedOrchestraUser.ini";
    if (Context.AspectRatioDecimal > 1.35) {
      Context.ModifySaveFile(rouserPath, rouserPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.PlayerController", "DesiredFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerController", "DefaultFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerController", "FOVAngle", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI)
      ]);
    }
  }

  if (mod == "UnWheel") {
    var modArgs = "-mod=UnWheel";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnWheel\\System\\UnWheel.ini");

    Context.ModifySaveFile(xplusPath, xplusPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("X2DInput", "LT", "Y_Axis(+)"),
      new Nucleus.IniSaveInfo("X2DInput", "RT", "Y_Axis(-)"),
      new Nucleus.IniSaveInfo("X2DInput", "LS_Y", "")
    ]);

    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "..\\UnWheel\\System\\UnWheelUser.ini"),
      System.IO.Path.Combine(Context.RootFolder, "UnWheel\\System\\UnWheelUser.ini"),
      true
    );

    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnWheel\\System\\UnWheelUser.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "Jump"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "DoTurbo | OnRelease DoTurbo"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "FixMe"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "CameraMode"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "RearView | OnRelease RearView"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "PrevWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "FlipMe"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "ResetMe"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.0"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.0 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=50.0 DeadZone=0.2"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=50.0 DeadZone=0.2 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", "")
    ]);
  }

  if (mod == "ChaosUT2: Evolution") {
    var modArgs = "-mod=ChaosUT2";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ChaosUT2\\System\\ChaosUT2.ini");
  }

  if (mod == "AirBuccaneers") {
    var modArgs = "-mod=AirBuccaneers";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\AirBuccaneers\\System\\AirBuccaneers.ini");
  }

  if (mod == "Gunreal") {
    var modArgs = "-mod=Gunreal";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Gunreal\\System\\Gunreal.ini");

    var gruserPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Gunreal\\System\\GunrealUser.ini";
    if (Context.AspectRatioDecimal > 1.35) {
      Context.ModifySaveFile(gruserPath, gruserPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.PlayerController", "DesiredFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerController", "DefaultFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerController", "FOVAngle", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI)
      ]);
    }
  }

  if (mod == "Troopers: Dawn of Destiny") {
    var modArgs = "-mod=Troopers";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Troopers\\System\\Troopers.ini");

    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "..\\Troopers\\System\\TroopersUser.ini"),
      System.IO.Path.Combine(Context.RootFolder, "Troopers\\System\\TroopersUser.ini"),
      true
    );

    if (Context.HasKeyboardPlayer == true) {
      Game.ProtoInput.MouseMoveFilter = true;
    }

    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Troopers\\System\\TroopersUser.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Shift", "Sprint"),
      new Nucleus.IniSaveInfo("Engine.Input", "MiddleMouse", "ToggleWeaponZoom"),
      new Nucleus.IniSaveInfo("Engine.Input", "RightMouse", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "R", "Reload | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Reload | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "InventoryNext"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "PrevWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "Sprint"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "ToggleWeaponZoom"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Taunt gesture_point"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "Taunt pthrust"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "Taunt asssmack"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "Taunt throatcut"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=80.0 DeadZone=0.02"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=53.3 DeadZone=0.02 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", "")
    ]);
  }

  if (mod == "Defence Alliance 2") {
    var modArgs = "-mod=DA2";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DA2\\System\\DA2.ini");

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "..\\DA2\\System\\DA2User.ini"), System.IO.Path.Combine(Context.RootFolder, "DA2\\System\\DA2User.ini"), true);

    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DA2\\System\\DA2User.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "InventoryNext"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "PrevWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Taunt gesture_point"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "Taunt pthrust"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "Taunt asssmack"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "Taunt throatcut"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=80.0 DeadZone=0.02"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=53.3 DeadZone=0.02 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", "")
    ]);
  }

  if (mod == "Alien Swarm") {
    var modArgs = "-mod=AlienSwarm";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\AlienSwarm\\System\\AlienSwarm.ini");
  }

  if (mod == "Mars Wars") {
    var modArgs = "-mod=MarsWars";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MarsWars\\System\\MarsWars.ini");

    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "..\\MarsWars\\System\\MarsWarsUser.ini"),
      System.IO.Path.Combine(Context.RootFolder, "MarsWars\\System\\MarsWarsUser.ini"),
      true
    );

    var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MarsWars\\System\\MarsWarsUser.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "InventoryNext"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "PrevWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "NextWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy7", "ShowScores | onrelease ShowScores"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy8", "ThrowWeapon"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy10", "SwitchWeapon 1"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy11", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Taunt gesture_point"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy14", "Taunt pthrust"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy15", "Taunt asssmack"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "Taunt throatcut"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis aStrafe SpeedBase=300.0 DeadZone=0.01"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY SpeedBase=300.0 DeadZone=0.01 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=80.0 DeadZone=0.02"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=53.3 DeadZone=0.02 Invert=-1"),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider1", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "JoySlider2", "")
    ]);
  }

  if (mod == "Frag.Ops: The Final Battle") {
    Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FragOps\\DedicatedServer-windows.bat"], false, 1);

    var modArgs = "-mod=FragOps";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FragOps\\System\\FragOps.ini");

    //System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "..\\FragOps\\System\\FragOpsUser.ini"), System.IO.Path.Combine(Context.RootFolder, "FragOps\\System\\FragOpsUser.ini"), true);

    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.Input", "B", "BuyMenu"),
      new Nucleus.IniSaveInfo("Engine.Input", "V", "BuyAmmo"),
      new Nucleus.IniSaveInfo("Engine.Input", "R", "Reload | Use"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Reload | Use | BuyAmmo")
    ]);

    var fouserPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FragOps\\System\\FragOpsUser.ini";
    if (Context.AspectRatioDecimal > 1.35) {
      Context.ModifySaveFile(fouserPath, fouserPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.PlayerController", "DesiredFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerController", "DefaultFOV", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI),
        new Nucleus.IniSaveInfo("Engine.PlayerController", "FOVAngle", (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI)
      ]);
    }
  }

  if (mod == "Blue Moon Rising") {
    var modArgs = "-mod=BlueMoonRising";
    var cfgPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BlueMoonRising\\System\\BlueMoonRising.ini");

    //System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "..\\BlueMoonRising\\System\\BlueMoonRisingUser.ini"), System.IO.Path.Combine(Context.RootFolder, "BlueMoonRising\\System\\BlueMoonRisingUser.ini"), true);

    //var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BlueMoonRising\\System\\BlueMoonRisingUser.ini";
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Engine.Input", "F", "UseTorch"),
      new Nucleus.IniSaveInfo("Engine.Input", "R", "ReloadFirearm"),
      new Nucleus.IniSaveInfo("Engine.Input", "Shift", "button bSprint"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "ReloadFirearm"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "UseTorch"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "button bSprint"),
      new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "UseTorch")
    ]);
  }

  Context.StartArguments = modArgs;

  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.Engine", "RenderDevice", "D3DDrv.D3DRenderDevice"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedColorBits", "32"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseDirectInput", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", false),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FrameRateLimit", "120"),
    new Nucleus.IniSaveInfo("ALAudio.ALAudioSubsystem", "UseDefaultDriver", false),
    new Nucleus.IniSaveInfo("D3DDrv.D3DRenderDevice", "ReduceMouseLag", false)
  ]);

  var ratio = Context.Options["aspectRatio"];

  if (ratio == "4:3") {
    Game.DontResize = true;
    Game.ResetWindows = true;
    Game.DontRemoveBorders = true;

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

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", false),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", true)
    ]);
  }

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ALAudio.ALAudioSubsystem", "MusicVolume", "0.000000")]);
  }

  if (Context.AspectRatioDecimal > 1.4) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\foxWSFix.u");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "foxWSFix.u");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.PlayerController", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("UnrealGame.UnrealPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("XGame.XPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("TGame.TPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("KFmod.KFPlayerController", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("UnWheel.UWPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("RFSystem.RFxPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      new Nucleus.IniSaveInfo("foxWSFix.foxPlayerInput", "Desired43FOV", fov)
      //new Nucleus.IniSaveInfo("ROGame.ROPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      //new Nucleus.IniSaveInfo("FragOps.FOPlayer", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
      //new Nucleus.IniSaveInfo("BMR.BMRPlayerController", "InputClass", "Class'foxWSFix.foxPlayerInput'"),
    ]);

    //Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
    //new Nucleus.IniSaveInfo("Engine.Engine", "GUIController", "foxWSFix.foxUT2K4GUIController")
    //])  ;
  } else {
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.PlayerController", "InputClass", "Class'Engine.PlayerInput'"),
      new Nucleus.IniSaveInfo("UnrealGame.UnrealPlayer", "InputClass", "Class'Engine.PlayerInput'"),
      new Nucleus.IniSaveInfo("XGame.XPlayer", "InputClass", "Class'Engine.PlayerInput'"),
      new Nucleus.IniSaveInfo("TGame.TPlayer", "InputClass", "Class'Engine.PlayerInput'"),
      new Nucleus.IniSaveInfo("KFmod.KFPlayerController", "InputClass", "Class'Engine.PlayerInput'"),
      new Nucleus.IniSaveInfo("UnWheel.UWPlayer", "InputClass", "Class'Engine.PlayerInput'"),
      new Nucleus.IniSaveInfo("RFSystem.RFxPlayer", "InputClass", "Class'Engine.PlayerInput'")
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
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + ".0 DeadZone=0.02"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + ".0 DeadZone=0.02 Invert=-1")
      ]);
    }
  }

  if (Context.PlayerID == 1) {
    if (sen1 == "Default") {
    } else {
      sen = sen1 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + ".0 DeadZone=0.02"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + ".0 DeadZone=0.02 Invert=-1")
      ]);
    }
  }

  if (Context.PlayerID == 2) {
    if (sen2 == "Default") {
    } else {
      sen = sen2 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + ".0 DeadZone=0.02"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + ".0 DeadZone=0.02 Invert=-1")
      ]);
    }
  }

  if (Context.PlayerID == 3) {
    if (sen3 == "Default") {
    } else {
      sen = sen3 + "0";
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn SpeedBase=" + sen + ".0 DeadZone=0.02"),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp SpeedBase=" + sen / 1.5 + ".0 DeadZone=0.02 Invert=-1")
      ]);
    }
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

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