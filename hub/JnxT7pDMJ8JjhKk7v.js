Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Mar 03 2024 17:14:23 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JnxT7pDMJ8JjhKk7v";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

var answers1 = ["90", "95", "100", "105", "110", "115", "120", "125", "130", "135", "140"];
var answers2 = ["Default", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5"];
var answers3 = ["Default", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5"];
var answers4 = ["Default", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5"];
var answers5 = ["Default", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5"];
Game.AddOption("Select field of view", "Default is 90. Community preferred is 110-120.", "FOV", answers1);
Game.AddOption("Select gamepad 1 sensitivity", "Default is equal to 4.0.", "pad0Sen", answers2);
Game.AddOption("Select gamepad 2 sensitivity", "", "pad1Sen", answers3);
Game.AddOption("Select gamepad 3 sensitivity", "", "pad2Sen", answers4);
Game.AddOption("Select gamepad 4 sensitivity", "", "pad3Sen", answers5);

Game.FileSymlinkExclusions = ["unreal.ini", "user.ini"];
Game.ExecutableContext = ["SkTrooperSkins.int"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "unreal.exe";
Game.SteamID = "13250";
Game.ChangeExe = true;
Game.GUID = "Unreal Gold";
Game.GameName = "Unreal";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "System";
Game.HideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Unreal";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "Dinput8.dll", "Dinput.dll"];
Game.HookFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.KeepSymLinkOnExit = true;
Game.ForceSymlink = true;
Game.Description =
  "Requires OldUnreal's 227i patch to function properly. Alt tab and use the keyboard to navigate the ui in all instances. If you want to play this with xbox one pads just connect an old xbox360 wired pad before the game starts, or try XOutput.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 15;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder + "\\utils\\XInputPlus\\winmm\\Winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\unreal - Player " + (Context.PlayerID + 1) + ".ini")) {
  } else {
    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "Unreal.ini"),
      System.IO.Path.Combine(Context.RootFolder, "System\\unreal - Player " + (Context.PlayerID + 1) + ".ini"),
      true
    );
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "User.ini"), System.IO.Path.Combine(Context.RootFolder, "System\\User.ini"), true);
  }

  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\Running.ini")) {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\Running.ini");
  }

  var xplusPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\XInputPlus.ini";
  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\unreal - Player " + (Context.PlayerID + 1) + ".ini";
  var userPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\user.ini";

  var fov = Context.Options["FOV"];
  var sen0 = Context.Options["pad0Sen"];
  var sen1 = Context.Options["pad1Sen"];
  var sen2 = Context.Options["pad2Sen"];
  var sen3 = Context.Options["pad3Sen"];

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

  var userdict = [
    Context.FindLineNumberInTextFile(userPath, "Name=", Nucleus.SearchType.StartsWith) + "|Name=" + Context.Nickname,
    Context.FindLineNumberInTextFile(userPath, "Joy1=", Nucleus.SearchType.StartsWith) + "|Joy1=Jump",
    Context.FindLineNumberInTextFile(userPath, "Joy2=", Nucleus.SearchType.StartsWith) + "|Joy2=toggle bDuck",
    Context.FindLineNumberInTextFile(userPath, "Joy3=", Nucleus.SearchType.StartsWith) + "|Joy3=Use",
    Context.FindLineNumberInTextFile(userPath, "Joy4=", Nucleus.SearchType.StartsWith) + "|Joy4=InventoryActivate",
    Context.FindLineNumberInTextFile(userPath, "Joy5=", Nucleus.SearchType.StartsWith) + "|Joy5=NextWeapon",
    Context.FindLineNumberInTextFile(userPath, "Joy6=", Nucleus.SearchType.StartsWith) + "|Joy6=PrevWeapon",
    Context.FindLineNumberInTextFile(userPath, "Joy7=", Nucleus.SearchType.StartsWith) + "|Joy7=InventoryActivate",
    Context.FindLineNumberInTextFile(userPath, "Joy8=", Nucleus.SearchType.StartsWith) + "|Joy8=",
    Context.FindLineNumberInTextFile(userPath, "Joy9=", Nucleus.SearchType.StartsWith) + "|Joy9=toggle bDuck",
    Context.FindLineNumberInTextFile(userPath, "Joy10=", Nucleus.SearchType.StartsWith) + "|Joy10=SwitchWeapon 1",
    Context.FindLineNumberInTextFile(userPath, "Joy11=", Nucleus.SearchType.StartsWith) + "|Joy11=",
    Context.FindLineNumberInTextFile(userPath, "Joy12=", Nucleus.SearchType.StartsWith) + "|Joy12=AltFire",
    Context.FindLineNumberInTextFile(userPath, "Joy13=", Nucleus.SearchType.StartsWith) + "|Joy13=Fire",
    Context.FindLineNumberInTextFile(userPath, "JoyX=", Nucleus.SearchType.StartsWith) + "|JoyX=Axis astrafe speed=2",
    Context.FindLineNumberInTextFile(userPath, "JoyY=", Nucleus.SearchType.StartsWith) + "|JoyY=Axis aBaseY speed=2",
    Context.FindLineNumberInTextFile(userPath, "JoyZ=", Nucleus.SearchType.StartsWith) + "|JoyZ=",
    Context.FindLineNumberInTextFile(userPath, "JoyR=", Nucleus.SearchType.StartsWith) + "|JoyU=Axis aLookUp speed=-2.66",
    Context.FindLineNumberInTextFile(userPath, "JoyU=", Nucleus.SearchType.StartsWith) + "|JoyR=Axis aturn speed=4",
    Context.FindLineNumberInTextFile(userPath, "JoyV=", Nucleus.SearchType.StartsWith) + "|JoyV=",
    Context.FindLineNumberInTextFile(userPath, "Escape=", Nucleus.SearchType.StartsWith) + "|Escape=ShowMenu",
    Context.FindLineNumberInTextFile(userPath, "DodgeClickTime=", Nucleus.SearchType.StartsWith) + "|DodgeClickTime=-1.000000",
    Context.FindLineNumberInTextFile(userPath, "JoyPovUp=", Nucleus.SearchType.StartsWith) + "|JoyPovUp=ChangeHud",
    Context.FindLineNumberInTextFile(userPath, "JoyPovLeft=", Nucleus.SearchType.StartsWith) + "|JoyPovLeft=InventoryPrevious",
    Context.FindLineNumberInTextFile(userPath, "JoyPovRight=", Nucleus.SearchType.StartsWith) + "|JoyPovRight=InventoryNext",
    Context.FindLineNumberInTextFile(userPath, "JoyPovDown=", Nucleus.SearchType.StartsWith) + "|JoyPovDown=Cancel",
    Context.FindLineNumberInTextFile(userPath, "LeftMouse=", Nucleus.SearchType.StartsWith) + "|LeftMouse=",
    Context.FindLineNumberInTextFile(userPath, "RightMouse=", Nucleus.SearchType.StartsWith) + "|RightMouse=",
    Context.FindLineNumberInTextFile(userPath, "Ctrl=", Nucleus.SearchType.StartsWith) + "|Ctrl=",
    Context.FindLineNumberInTextFile(userPath, "Alt=", Nucleus.SearchType.StartsWith) + "|Alt=",
    Context.FindLineNumberInTextFile(userPath, "Enter=", Nucleus.SearchType.StartsWith) + "|Enter="
  ];
  Context.ReplaceLinesInTextFile(userPath, userdict);

  if (Context.PlayerID == 0) {
    if (sen0 == "Default") {
    } else {
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen0 / 1.5),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen0)
      ]);
    }
  }

  if (Context.PlayerID == 1) {
    if (sen1 == "Default") {
    } else {
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen1 / 1.5),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen1)
      ]);
    }
  }

  if (Context.PlayerID == 2) {
    if (sen2 == "Default") {
    } else {
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen2 / 1.5),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen2)
      ]);
    }
  }

  if (Context.PlayerID == 3) {
    if (sen3 == "Default") {
    } else {
      Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Engine.Input", "JoyU", "Axis aLookUp speed=-" + sen3 / 1.5),
        new Nucleus.IniSaveInfo("Engine.Input", "JoyR", "Axis aturn speed=" + sen3)
      ]);
    }
  }

  var cfgdict = [
    Context.FindLineNumberInTextFile(cfgPath, "WindowedViewportX=", Nucleus.SearchType.StartsWith) + "|WindowedViewportX=" + Context.Width,
    Context.FindLineNumberInTextFile(cfgPath, "WindowedViewportY=", Nucleus.SearchType.StartsWith) + "|WindowedViewportY=" + Context.Height,
    Context.FindLineNumberInTextFile(cfgPath, "StartupFullscreen=", Nucleus.SearchType.StartsWith) + "|StartupFullscreen=False",
    //Context.FindLineNumberInTextFile(cfgPath, "FrameRateLimit=", Nucleus.SearchType.StartsWith) + '|FrameRateLimit=120',
    Context.FindLineNumberInTextFile(cfgPath, "UseVSync=", Nucleus.SearchType.StartsWith) + "|UseVSync=False",
    Context.FindLineNumberInTextFile(cfgPath, "UseDirectInput=", Nucleus.SearchType.StartsWith) + "|UseDirectInput=True",
    Context.FindLineNumberInTextFile(cfgPath, "UseRawHIDInput=", Nucleus.SearchType.StartsWith) + "|UseRawHIDInput=False",
    Context.FindLineNumberInTextFile(cfgPath, "GameRenderDevice=", Nucleus.SearchType.StartsWith) + "|GameRenderDevice=D3D9Drv.D3D9RenderDevice",
    Context.FindLineNumberInTextFile(cfgPath, "Console=", Nucleus.SearchType.StartsWith) + "|Console=Engine.Console",
    Context.FindLineNumberInTextFile(cfgPath, "UseJoystick=", Nucleus.SearchType.StartsWith) + "|UseJoystick=True",
    Context.FindLineNumberInTextFile(cfgPath, "CaptureMouse=", Nucleus.SearchType.StartsWith) + "|CaptureMouse=False"
  ];
  Context.ReplaceLinesInTextFile(cfgPath, cfgdict);

  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("UnrealShare.UnrealServerMenu", "Map", "Vortex2.unr"),
    new Nucleus.IniSaveInfo("UnrealShare.UnrealServerMenu", "GameType", "UnrealShare.CoopGame")
  ]);

  var userdict = [Context.FindLineNumberInTextFile(userPath, "MainFOV=", Nucleus.SearchType.StartsWith) + "|MainFOV=" + fov + ".000000"];

  if (Context.AspectRatioDecimal > 1.35) {
    var userdict = [
      Context.FindLineNumberInTextFile(userPath, "MainFOV=", Nucleus.SearchType.StartsWith) +
        "|MainFOV=" +
        (2 * Math.atan((Context.AspectRatioDecimal / (4 / 3)) * Math.tan(((fov / 2) * Math.PI) / 180)) * 180) / Math.PI
    ];
  }

  Context.ReplaceLinesInTextFile(userPath, userdict);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", false),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseDirectInput", false),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseRawHIDInput", true),
      new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "CaptureMouse", true)
    ]);
    Context.ModifySaveFile(userPath, userPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.Input", "LeftMouse", "Fire"),
      new Nucleus.IniSaveInfo("Engine.Input", "RightMouse", "AltFire"),
      new Nucleus.IniSaveInfo("Engine.Input", "Ctrl", "toggle bDuck"),
      new Nucleus.IniSaveInfo("Engine.Input", "Alt", ""),
      new Nucleus.IniSaveInfo("Engine.Input", "Enter", "InventoryActivate"),
      new Nucleus.IniSaveInfo("Engine.Input", "E", "InventoryActivate")
    ]);
  }

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ALAudio.ALAudioSubsystem", "MusicVolume", "0")]);
  }
};