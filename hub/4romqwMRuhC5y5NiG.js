Hub.Handler.Version = 12; // Released at https://hub.splitscreen.me/ on Sun Nov 21 2021 11:36:44 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "4romqwMRuhC5y5NiG";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes", "Remastest"];
Game.AddOption("Remastest Mod?", "Only select yes if you have latest version of the Remastest mod installed.", "Mod", answers1);
Game.AddOption("Use Widescreen Fixer?", "Experimental, changes aspect ratio to fix stretching. Read notes before trying.", "WF", answers2);

Game.ExecutableContext = ["dsfix"];
Game.DirSymlinkExclusions = ["Plugins", "Widescreen Fixer"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "xinput1_3.dll", "DARKSOULS.exe", "MODSOULS.exe"];
Game.FileSymlinkCopyInstead = ["DSfix.ini", "DINPUT8.dll", "d3d9_Mod.ini"];
Game.GameName = "DARK SOULS";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DARKSOULS.exe";
Game.SteamID = "211420";
Game.GUID = "Dark Souls";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.LauncherExe = "DS.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DARK SOULS";
Game.HookFocus = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\NBGI\\DarkSouls";
Game.DocumentsSavePath = "NBGI\\DarkSouls";
Game.Description =
  "Run your main game at least once before using this. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. The default Dark Souls menu key is END, remap it in the game settings so that it doesn't interfere with the input locking. Each instance has its own saves that are copies of your original ones, your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open documents save path in the UI. If you want to fix the stretching in vertical or horizontal split-screen you can use the experimental Widescreen Fixer UI option, if you select yes and click play Widescreen Fixer will open, click on the gear icon in the Dark Souls plugin and untick Automatically Detect Resolution, set Display Count to 1 and set the resolutions to match the window size of the instance, for example 1920x540 for horizontal and 960x1080 for vertical if you have a 1920x1080 monitor. Save the settings and go back, you have to do this before opening the first game instance using the prompt, when the instance opens Widescreen Fixer will hook to the game. Get in-game before starting the next instance using the Nucleus prompt. Once you do that another instance of Widescreen Fixer will open, do the same as in the last one. Select Remastest in the Widescreen Fixer UI option if you want to use WF in latest version of the Remastest mod and you have latest version of the Remastest mod installed.";
Game.PauseBetweenProcessGrab = 7;
Game.PauseBetweenStarts = 40;

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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\DarkSouls.ini"; //Context.NucleusUserRoot + "\\AppData\\Local\\NBGI\\DarkSouls.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1"),
    new Nucleus.IniSaveInfo("DisplaySettingWindow", "Width", Context.Width),
    new Nucleus.IniSaveInfo("DisplaySettingWindow", "Height", Context.Height),
    new Nucleus.IniSaveInfo("DisplaySettingFilter", "Antialiasing", "0")
  ]);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DSfix.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "renderWidth", Nucleus.SearchType.StartsWith) + "|renderWidth " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "renderHeight", Nucleus.SearchType.StartsWith) + "|renderHeight " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "presentWidth", Nucleus.SearchType.StartsWith) + "|presentWidth 1280",
    Context.FindLineNumberInTextFile(txtPath, "presentHeight", Nucleus.SearchType.StartsWith) + "|presentHeight 800",
    //Context.FindLineNumberInTextFile(txtPath, "presentWidth", Nucleus.SearchType.StartsWith) + "|presentWidth " + Context.Width,
    //Context.FindLineNumberInTextFile(txtPath, "presentHeight", Nucleus.SearchType.StartsWith) + "|presentHeight " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "borderlessFullscreen", Nucleus.SearchType.StartsWith) + "|borderlessFullscreen 0",
    Context.FindLineNumberInTextFile(txtPath, "captureCursor", Nucleus.SearchType.StartsWith) + "|captureCursor 0",
    Context.FindLineNumberInTextFile(txtPath, "forceWindowed", Nucleus.SearchType.StartsWith) + "|forceWindowed 0",
    Context.FindLineNumberInTextFile(txtPath, "forceFullscreen", Nucleus.SearchType.StartsWith) + "|forceFullscreen 0"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils006",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DS.bat";
  var lines = ["START DARKSOULS.exe"];
  Context.WriteTextFile(Bat, lines);

  var mod = Context.Options["Mod"];
  var wf = Context.Options["WF"];
  var id = Context.PlayerID;

  if (mod == "Yes") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MODSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);

    var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9_Mod.ini");
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Dark Souls Overhaul Settings", "CustomSaveLocation", "  "),
      new Nucleus.IniSaveInfo("Dark Souls Overhaul Settings", "EnableMultiphantom", "0")
    ]);
  }

  if (mod == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DARKSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);
  }

  if (wf == "Yes") {
    Game.PauseBetweenContextAndLaunch = 10;
    Game.PromptBetweenInstances = true;
    Game.SetWindowHook = true;
    Game.KillProcessesOnClose = ["Widescreen Fixer"];

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Plugins");
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Widescreen Fixer.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Widescreen Fixer.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\yasm.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\yasm.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.DetectDisplays.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.DetectDisplays.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Forms.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Forms.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Math.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Math.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Plugin.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Plugin.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Process.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Process.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Update.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Update.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Unmanaged.DetectDisplays32.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Unmanaged.DetectDisplays32.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Unmanaged.DetectDisplays64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Unmanaged.DetectDisplays64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.PlayerID == 0) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    if (Context.PlayerID == 1) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x31]
      );
    }

    if (Context.PlayerID == 2) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x32]
      );
    }

    if (Context.PlayerID == 3) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x33]
      );
    }

    if (Context.PlayerID == 4) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x34]
      );
    }

    if (Context.PlayerID == 5) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x35]
      );
    }

    if (Context.PlayerID == 6) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x36]
      );
    }

    if (Context.PlayerID == 7) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x37]
      );
    }

    if (Context.AspectRatioDecimal > 1.8) {
      if (Context.PlayerID == 0) {
        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DARKSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"'];
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      } else {
        Game.ExecutableName = "DARKSOUL" + id + ".exe";

        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DARKSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOUL" + id + ".exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DS.bat";
        var lines = ["START DARKSOUL" + id + ".exe"];
        Context.WriteTextFile(Bat, lines);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"']; //"ping 127.0.0.1 -n 30"
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      }
    } else if (Context.AspectRatioDecimal < 1.2) {
      if (Context.PlayerID == 0) {
        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DARKSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"'];
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      } else {
        Game.ExecutableName = "DARKSOUL" + id + ".exe";

        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DARKSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOUL" + id + ".exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DS.bat";
        var lines = ["START DARKSOUL" + id + ".exe"];
        Context.WriteTextFile(Bat, lines);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"'];
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      }
    } else {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DARKSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);
    }
  }

  if (wf == "Remastest") {
    Game.PauseBetweenContextAndLaunch = 10;
    Game.PromptBetweenInstances = true;
    Game.SetWindowHook = true;
    Game.KillProcessesOnClose = ["Widescreen Fixer"];

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Plugins");
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Widescreen Fixer.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Widescreen Fixer.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\yasm.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\yasm.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.DetectDisplays.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.DetectDisplays.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Forms.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Forms.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Math.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Math.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Plugin.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Plugin.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Process.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Process.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Library.Update.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Library.Update.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Unmanaged.DetectDisplays32.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Unmanaged.DetectDisplays32.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Unmanaged.DetectDisplays64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Unmanaged.DetectDisplays64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.PlayerID == 0) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    if (Context.PlayerID == 1) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x31]
      );
    }

    if (Context.PlayerID == 2) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x32]
      );
    }

    if (Context.PlayerID == 3) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x33]
      );
    }

    if (Context.PlayerID == 4) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x34]
      );
    }

    if (Context.PlayerID == 5) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x35]
      );
    }

    if (Context.PlayerID == 6) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x36]
      );
    }

    if (Context.PlayerID == 7) {
      Context.PatchFile(
        System.IO.Path.Combine(Game.Folder, "Widescreen Fixer\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        System.IO.Path.Combine(Context.RootFolder, "Widescreen Fixer\\Plugins\\Plugin.Dark Souls Prepare to Die Edition.dll"),
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x53],
        [0x44, 0x00, 0x41, 0x00, 0x52, 0x00, 0x4b, 0x00, 0x53, 0x00, 0x4f, 0x00, 0x55, 0x00, 0x4c, 0x00, 0x37]
      );
    }

    if (Context.AspectRatioDecimal > 1.8) {
      if (Context.PlayerID == 0) {
        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MODSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"'];
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      } else {
        Game.ExecutableName = "DARKSOUL" + id + ".exe";

        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MODSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOUL" + id + ".exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DS.bat";
        var lines = ["START DARKSOUL" + id + ".exe"];
        Context.WriteTextFile(Bat, lines);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"']; //"ping 127.0.0.1 -n 30"
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      }
    } else if (Context.AspectRatioDecimal < 1.2) {
      if (Context.PlayerID == 0) {
        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MODSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"'];
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      } else {
        Game.ExecutableName = "DARKSOUL" + id + ".exe";

        System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MODSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOUL" + id + ".exe"), true);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DS.bat";
        var lines = ["START DARKSOUL" + id + ".exe"];
        Context.WriteTextFile(Bat, lines);

        var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat";
        var lines = ['START "" "Widescreen Fixer.exe"'];
        Context.WriteTextFile(Bat, lines);

        Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Widescreen Fixer\\WF.bat"], false, 1, false, true);
      }
    } else {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MODSOULS.exe"), System.IO.Path.Combine(Context.RootFolder, "DARKSOULS.exe"), true);
    }
  }

  if (wf == "No") {
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

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

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
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
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