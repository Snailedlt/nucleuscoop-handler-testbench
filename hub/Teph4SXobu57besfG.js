Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Aug 13 2023 04:38:14 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Teph4SXobu57besfG";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["RuneEd.exe"];
Game.FileSymlinkExclusions = ["User.ini", "Rune.ini"];
Game.ExecutableName = "Rune.exe";
Game.SteamID = "210950";
Game.GUID = "RuneClassic";
Game.GameName = "Rune";
Game.BinariesFolder = "System";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 5;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ChangeExe = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Rune";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["dinput.dll", "xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HandlerInterval = 100;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.GoldbergNeedSteamInterface = false;
Game.Description =
  "Use your mouse cursor to navigate the UI in all gamepad instances. You must choose your skins before joining if you want them to show up in game. Host a lan server with one player and join with the rest. Alt tab to the keyboard player if you have one.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder + "\\utils\\XInputPlus\\winmm\\Winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput1_4", false),
    new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", false),
    //new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", (Context.PlayerID + 1)),
    //new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
    //new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
    //new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", ""),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Button12"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Button13"),
    new Nucleus.IniSaveInfo("X2DInput", "DisableUnmappedObject", true)
    //new Nucleus.IniSaveInfo("X2DInput", "DisableXInput", true),
    //new Nucleus.IniSaveInfo("X2DInput", "DeviceID" + (Context.PlayerID + 1), "{" + Context.GamepadGuid + "}"),
  ]);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Rune - Player " + (Context.PlayerID + 1) + ".ini")) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "rune.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\Rune - Player " + (Context.PlayerID + 1) + ".ini"), true);

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "User.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\User.ini"), true);
  } else {
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Rune - Player " + (Context.PlayerID + 1) + ".ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedColorBits", "32"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseDirectInput", true),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", false),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false)
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", false),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", true)
    ]);
  }

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname),
    new Nucleus.IniSaveInfo("Engine.Input", "F", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "Duck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy1", "Jump"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy2", "Powerup"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy3", "Use"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy4", "Throw"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy5", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy6", "Fire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy7", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy8", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy9", "Duck"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy10", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy11", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy12", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy13", "Fire"),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy14", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy15", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "Joy16", "AltFire"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyX", "Axis astrafe speed=2"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyY", "Axis aBaseY speed=2"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyZ", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-0.1"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=0.2"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyV", ""),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovRight", "SwitchWeapon 4"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovLeft", "SwitchWeapon 2"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovUp", "SwitchWeapon 3"),
    new Nucleus.IniSaveInfo("Engine.Input", "JoyPovDown", "SwitchWeapon 1")
  ]);
};