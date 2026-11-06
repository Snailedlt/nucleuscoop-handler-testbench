Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Apr 03 2023 07:48:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ircn5nRbDEnWwNwLe";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Unchanged", "Enable"];
var answers2 = ["800x600", "1024x768", "1280x720", "1280x800", "1366x768", "1600x900", "1680x1050", "1920x1080"];
Game.AddOption(
  "Enable support for Diamond Edition?",
  "Enabling support for Diamond Edition will disable support for Enhanced Edition. To enable support for Diamond Edition you must select enable from this option, click play, hit CTRL+Q to close Nucleus, and open Nucleus again for the changes to take effect.",
  "DE",
  answers1
);
//Game.AddOption("Player 1 Resolution?", "All players must choose a resolution lower than the monitor's native resolution.", "P0Res", answers2);
//Game.AddOption("Player 2 Resolution?", "", "P1Res", answers2);
//Game.AddOption("Player 3 Resolution?", "", "P2Res", answers2);
//Game.AddOption("Player 4 Resolution?", "", "P3Res", answers2);

//Game.KillMutex = ["neverwinter"];
Game.FileSymlinkCopyInstead = ["nwserver.exe", "nwn.ini", "nwnplayer.ini", "nwncdkey.ini"];
Game.BinariesFolder = "bin\\win32";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.ExecutableName = "nwmain.exe";
Game.SteamID = "704450";
Game.GUID = "Neverwinter Nights";
Game.GameName = "Neverwinter Nights";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 64;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Neverwinter Nights";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "Neverwinter Nights";
Game.Description =
  'Run your main game at least once before using this. Host a local network game (by unchecking "Post Game To Internet") with one player and join with the rest. Try to join the game quickly or you might get a black screen when you click play. Once all instances have resized and repositioned, press the END key to lock input for all instances to have their own cursor. You need to left-click and/or move each mouse for the emulated cursors to appear after locking input. Press the END key again to unlock input. While input is unlocked you can use CTRL+T and CTRL+Q to minimized all instances and close all instances respectively.';
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

Game.ProtoInput.RegisterRawInputHook = true;
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
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

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
  var DE = Context.Options["DE"];

  if (DE == "Unchanged") {
  }

  if (DE == "Enable") {
    var NucleusRoot = System.IO.Path.Combine(Game.Folder, "..", "..");
    var cfgFilePath = NucleusRoot + "\\handlers\\Neverwinter Nights.js";

    var answers = Context.FindLineNumberInTextFile(cfgFilePath, "var answers1", Nucleus.SearchType.StartsWith);
    var options = Context.FindLineNumberInTextFile(cfgFilePath, 'Game.AddOption("Enable support for Diamond Edition?', Nucleus.SearchType.StartsWith);
    var resopt1 = Context.FindLineNumberInTextFile(cfgFilePath, '//Game.AddOption("Player 1 Resolution?', Nucleus.SearchType.StartsWith);
    var resopt2 = Context.FindLineNumberInTextFile(cfgFilePath, '//Game.AddOption("Player 2 Resolution?', Nucleus.SearchType.StartsWith);
    var resopt3 = Context.FindLineNumberInTextFile(cfgFilePath, '//Game.AddOption("Player 3 Resolution?', Nucleus.SearchType.StartsWith);
    var resopt4 = Context.FindLineNumberInTextFile(cfgFilePath, '//Game.AddOption("Player 4 Resolution?', Nucleus.SearchType.StartsWith);
    var demutex = Context.FindLineNumberInTextFile(cfgFilePath, "//Game.KillMutex", Nucleus.SearchType.StartsWith);
    var binaryf = Context.FindLineNumberInTextFile(cfgFilePath, "Game.BinariesFolder", Nucleus.SearchType.StartsWith);
    var veredit = Context.FindLineNumberInTextFile(cfgFilePath, '  var VER = "EE";', Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      answers + '|var answers1 = ["Unchanged", "Disable"];',
      options +
        '|Game.AddOption("Disable support for Diamond Edition?", "Disabling support for Diamond Edition will enable support for Enhanced Edition. To disable support for Diamond Edition you must select disable from this option, click play, hit CTRL+Q to close Nucleus, and open Nucleus again for the changes to take effect.", "DE", answers1);',
      resopt1 + '|Game.AddOption("Player 1 Resolution?", "All players must choose a resolution lower than the monitor' + "'" + 's native resolution.", "P0Res", answers2);',
      resopt2 + '|Game.AddOption("Player 2 Resolution?", "", "P1Res", answers2);',
      resopt3 + '|Game.AddOption("Player 3 Resolution?", "", "P2Res", answers2);',
      resopt4 + '|Game.AddOption("Player 4 Resolution?", "", "P3Res", answers2);',
      demutex + '|Game.KillMutex = ["neverwinter"];',
      binaryf + '|//Game.BinariesFolder = "bin\\\\win32";',
      veredit + '|  var VER = "DE";'
    ]);
  }

  if (DE == "Disable") {
    var NucleusRoot = System.IO.Path.Combine(Game.Folder, "..", "..");
    var cfgFilePath = NucleusRoot + "\\handlers\\Neverwinter Nights.js";

    var answers = Context.FindLineNumberInTextFile(cfgFilePath, "var answers1", Nucleus.SearchType.StartsWith);
    var options = Context.FindLineNumberInTextFile(cfgFilePath, 'Game.AddOption("Disable support for Diamond Edition?', Nucleus.SearchType.StartsWith);
    var resopt1 = Context.FindLineNumberInTextFile(cfgFilePath, 'Game.AddOption("Player 1 Resolution?', Nucleus.SearchType.StartsWith);
    var resopt2 = Context.FindLineNumberInTextFile(cfgFilePath, 'Game.AddOption("Player 2 Resolution?', Nucleus.SearchType.StartsWith);
    var resopt3 = Context.FindLineNumberInTextFile(cfgFilePath, 'Game.AddOption("Player 3 Resolution?', Nucleus.SearchType.StartsWith);
    var resopt4 = Context.FindLineNumberInTextFile(cfgFilePath, 'Game.AddOption("Player 4 Resolution?', Nucleus.SearchType.StartsWith);
    var demutex = Context.FindLineNumberInTextFile(cfgFilePath, "Game.KillMutex", Nucleus.SearchType.StartsWith);
    var binaryf = Context.FindLineNumberInTextFile(cfgFilePath, "//Game.BinariesFolder", Nucleus.SearchType.StartsWith);
    var veredit = Context.FindLineNumberInTextFile(cfgFilePath, '  var VER = "DE";', Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      answers + '|var answers1 = ["Unchanged", "Enable"];',
      options +
        '|Game.AddOption("Enable support for Diamond Edition?", "Enabling support for Diamond Edition will disable support for Enhanced Edition. To enable support for Diamond Edition you must select enable from this option, click play, hit CTRL+Q to close Nucleus, and open Nucleus again for the changes to take effect.", "DE", answers1);',
      resopt1 + '|//Game.AddOption("Player 1 Resolution?", "All players must choose a resolution lower than the monitor' + "'" + 's native resolution.", "P0Res", answers2);',
      resopt2 + '|//Game.AddOption("Player 2 Resolution?", "", "P1Res", answers2);',
      resopt3 + '|//Game.AddOption("Player 3 Resolution?", "", "P2Res", answers2);',
      resopt4 + '|//Game.AddOption("Player 4 Resolution?", "", "P3Res", answers2);',
      demutex + '|//Game.KillMutex = ["neverwinter"];',
      binaryf + '|Game.BinariesFolder = "bin\\\\win32";',
      veredit + '|  var VER = "EE";'
    ]);
  }

  var VER = "EE";

  if (VER == "EE") {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwmain.exe"),
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwmain.exe"),
      [0x45, 0x8b, 0xf7, 0x45, 0x85, 0xff, 0x0f],
      [0x45, 0x8b, 0xf7, 0x45, 0x85, 0xff, 0xe9]
    );

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwmain.exe"),
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwmain.exe"),
      [0x84, 0x84, 0x00, 0x00, 0x00, 0x41, 0x81],
      [0x85, 0x00, 0x00, 0x00, 0x00, 0x41, 0x81]
    );

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwserver.exe"),
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwserver.exe"),
      [0x45, 0x8b, 0xf7, 0x45, 0x85, 0xff, 0x0f],
      [0x45, 0x8b, 0xf7, 0x45, 0x85, 0xff, 0xe9]
    );

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwserver.exe"),
      System.IO.Path.Combine(Context.RootFolder, "bin\\win32\\nwserver.exe"),
      [0x84, 0x84, 0x00, 0x00, 0x00, 0x41, 0x81],
      [0x85, 0x00, 0x00, 0x00, 0x00, 0x41, 0x81]
    );

    var tmlPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\settings.tml";
    var dict = [
      '18|		name = "' + Context.Nickname + '"',
      '167|		mode = "windowed"',
      "174|			height = " + Context.Height,
      "175|			width = " + Context.Width,
      "184|		hardware-pointer = false",
      '192|		mode = "if-reachable"'
    ];
    Context.ReplaceLinesInTextFile(tmlPath, dict);

    var playerini = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\nwnplayer.ini";
    var plines = [
      "[Server Options]",
      "ServerDownTimer=86400",
      "CD Banned Behavior=0",
      "Master Server Authentication Required For Player Login=0",
      "Account validation required during Master Server down times=0",
      "[Banned Ips]",
      "0=",
      "[Banned Players]",
      "0=",
      "[Banned CD Keys]",
      "0=",
      "[Profile]",
      "ShowMessageOfTheDay=1",
      "Group Room=274",
      "[Trap Colors]",
      "FriendlyColor=0,255,0",
      "HostileColor=255,0,0",
      "[Game Options]",
      "In-game Text Swear Filter=0",
      "[Login Information]"
    ];
    Context.WriteTextFile(playerini, plines);

    var cdini = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\cdkey.ini";

    if (Context.PlayerID == 0) {
      var lines = ["[NWN1]", "YourKey=YQDCY-4LPPQ-G3PU9-LFXR9-VNPED-YQ7W6-AFY93"];
    }
    if (Context.PlayerID == 1) {
      var lines = ["[NWN1]", "YourKey=QFETM-MPU3X-DN6FF-MHFDA-YWARA-4HMPE-RDJTG"];
    }
    if (Context.PlayerID == 2) {
      var lines = ["[NWN1]", "YourKey=UNJ6X-WD4HW-7H6DM-XLEWA-JPH6X-PURCJ-GEHUT"];
    }
    if (Context.PlayerID == 3) {
      var lines = ["[NWN1]", "YourKey=4YU9C-DUTT9-JFH3C-766UM-QF6N3-DHATY-3VMQM"];
    }
    if (Context.PlayerID == 4) {
      var lines = ["[NWN1]", "YourKey=RX4KP-Y6P9Q-6H6PL-GRCK7-FFP7G-PJ64E-DA9J6"];
    }
    if (Context.PlayerID == 5) {
      var lines = ["[NWN1]", "YourKey=FAQC4-X9K4G-EVDUX-HAGAL-QNP4X-34CNX-ECADC"];
    }
    if (Context.PlayerID == 6) {
      var lines = ["[NWN1]", "YourKey=9XEWK-AGG9L-TYF7M-693RY-HU3EQ-HDUD3-GR3JV"];
    }
    if (Context.PlayerID == 7) {
      var lines = ["[NWN1]", "YourKey=J7NPQ-FAECQ-J7WTM-GRRGW-EUQVG-QCEY3-P4YAE"];
    }

    Context.WriteTextFile(cdini, lines);
  }

  if (VER == "DE") {
    Game.DontResize = true;
    Game.ResetWindows = true;
    Game.DontRemoveBorders = true;

    var videoConfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nwn.ini";
    Context.ModifySaveFile(videoConfig, videoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Display Options", "FullScreen", "0"),
      new Nucleus.IniSaveInfo("Display Options", "AllowWindowedMode", "1"),
      new Nucleus.IniSaveInfo("Config", "FirstRun", "0"),
      new Nucleus.IniSaveInfo("Video Options", "Enable HardwareMouse", "1")
    ]);

    var P0 = Context.Options["P0Res"];
    var P1 = Context.Options["P1Res"];
    var P2 = Context.Options["P2Res"];
    var P3 = Context.Options["P3Res"];

    if (P0 == "800x600") {
      W0 = "800";
      H0 = "600";
    }
    if (P0 == "1024x768") {
      W0 = "1024";
      H0 = "768";
    }
    if (P0 == "1280x720") {
      W0 = "1280";
      H0 = "720";
    }
    if (P0 == "1280x800") {
      W0 = "1280";
      H0 = "800";
    }
    if (P0 == "1366x768") {
      W0 = "1366";
      H0 = "768";
    }
    if (P0 == "1600x900") {
      W0 = "1600";
      H0 = "900";
    }
    if (P0 == "1680x1050") {
      W0 = "1680";
      H0 = "1050";
    }
    if (P0 == "1920x1080") {
      W0 = "1920";
      H0 = "1080";
    }

    if (P1 == "800x600") {
      W1 = "800";
      H1 = "600";
    }
    if (P1 == "1024x768") {
      W1 = "1024";
      H1 = "768";
    }
    if (P1 == "1280x720") {
      W1 = "1280";
      H1 = "720";
    }
    if (P1 == "1280x800") {
      W1 = "1280";
      H1 = "800";
    }
    if (P1 == "1366x768") {
      W1 = "1366";
      H1 = "768";
    }
    if (P1 == "1600x900") {
      W1 = "1600";
      H1 = "900";
    }
    if (P1 == "1680x1050") {
      W1 = "1680";
      H1 = "1050";
    }
    if (P1 == "1920x1080") {
      W1 = "1920";
      H1 = "1080";
    }

    if (P2 == "800x600") {
      W2 = "800";
      H2 = "600";
    }
    if (P2 == "1024x768") {
      W2 = "1024";
      H2 = "768";
    }
    if (P2 == "1280x720") {
      W2 = "1280";
      H2 = "720";
    }
    if (P2 == "1280x800") {
      W2 = "1280";
      H2 = "800";
    }
    if (P2 == "1366x768") {
      W2 = "1366";
      H2 = "768";
    }
    if (P2 == "1600x900") {
      W2 = "1600";
      H2 = "900";
    }
    if (P2 == "1680x1050") {
      W2 = "1680";
      H2 = "1050";
    }
    if (P2 == "1920x1080") {
      W2 = "1920";
      H2 = "1080";
    }

    if (P3 == "800x600") {
      W3 = "800";
      H3 = "600";
    }
    if (P3 == "1024x768") {
      W3 = "1024";
      H3 = "768";
    }
    if (P3 == "1280x720") {
      W3 = "1280";
      H3 = "720";
    }
    if (P3 == "1280x800") {
      W3 = "1280";
      H3 = "800";
    }
    if (P3 == "1366x768") {
      W3 = "1366";
      H3 = "768";
    }
    if (P3 == "1600x900") {
      W3 = "1600";
      H3 = "900";
    }
    if (P3 == "1680x1050") {
      W3 = "1680";
      H3 = "1050";
    }
    if (P3 == "1920x1080") {
      W3 = "1920";
      H3 = "1080";
    }

    if (Context.PlayerID == 0) {
      Context.ModifySaveFile(videoConfig, videoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Options", "Width", W0), new Nucleus.IniSaveInfo("Display Options", "Height", H0)]);
    }

    if (Context.PlayerID == 1) {
      Context.ModifySaveFile(videoConfig, videoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Options", "Width", W1), new Nucleus.IniSaveInfo("Display Options", "Height", H1)]);
    }

    if (Context.PlayerID == 2) {
      Context.ModifySaveFile(videoConfig, videoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Options", "Width", W2), new Nucleus.IniSaveInfo("Display Options", "Height", H2)]);
    }

    if (Context.PlayerID == 3) {
      Context.ModifySaveFile(videoConfig, videoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Display Options", "Width", W3), new Nucleus.IniSaveInfo("Display Options", "Height", H3)]);
    }

    var playerConfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nwnplayer.ini";
    Context.ModifySaveFile(playerConfig, playerConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Profile", "Player Name", Context.Nickname),
      new Nucleus.IniSaveInfo("Profile", "Password", Context.PlayerID),
      new Nucleus.IniSaveInfo("Profile", "Remember Password", "1")
    ]);

    var cdini = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nwncdkey.ini";

    if (Context.PlayerID == 0) {
      var lines = ["[CDKEY]", "Key1=QFETM-MPU3X-DN6FF-MHFDA-YWARA-4HMPE-RDJTG", "Key2=PHQQM-GAEUY-FTNXQ-D3DTQ-VCUYN-W4FWH-JT96U", "Key3=6933Q-FXALG-PHFEE-DMLYQ-YFUAT-UD49H-3KA63"];
    }
    if (Context.PlayerID == 1) {
      var lines = ["[CDKEY]", "Key1=UNJ6X-WD4HW-7H6DM-XLEWA-JPH6X-PURCJ-GEHUT", "Key2=4YU9C-DUTT9-JFH3C-766UM-QF6N3-DHATY-3VMQM", "Key3=JD6PV-4PQ33-CKMKR-VG9T7-GNVTC-NUEM7-NJMAH"];
    }
    if (Context.PlayerID == 2) {
      var lines = ["[CDKEY]", "Key1=YQDCY-4LPPQ-G3PU9-LFXR9-VNPED-YQ7W6-AFY93", "Key2=RX4KP-Y6P9Q-6H6PL-GRCK7-FFP7G-PJ64E-DA9J6", "Key3=TXRLV-A64U3-6QJQX-MUX44-CAVVF-LHA7H-KLPLF"];
    }
    if (Context.PlayerID == 3) {
      var lines = ["[CDKEY]", "Key1=NQG7G-R6RFE-AKRFV-3GUFK-FL3A6-9VWWM-XTFYN", "Key2=FAQC4-X9K4G-EVDUX-HAGAL-QNP4X-34CNX-ECADC", "Key3=PWY73-HYMDX-9PP9C-9ALNG-7WVKX-QVRPA-QMYWP"];
    }

    Context.WriteTextFile(cdini, lines);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};