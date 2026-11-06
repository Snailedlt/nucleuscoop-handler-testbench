Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Fri Aug 15 2025 09:25:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "MYutujfMT93Duiriz";
Hub.Maintainer.Name = "messenils";
Hub.Maintainer.Id = "5NNQPxAD7mmwGuvKp";

var answers5 = ["Yes", "No"];
Game.AddOption("Fast setup", "Starts games in correct position. Report if you experience problems with this option", "Initpos", answers5);
var answers1 = ["ONE", "ALL", "NONE"];
Game.AddOption("Music", "How many instances play music.", "Music", answers1);
var answers2 = ["60", "0", "10", "20", "30", "40", "50", "70", "80", "90", "100"];
Game.AddOption("Music Volume", "music volume.", "Volume", answers2);
var answers3 = ["100", "0", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
Game.AddOption("Sound Volume", "sound volume.", "SFVolume", answers3);
var answers4 = ["No Change", "100", "125", "150", "175", "200", "225", "250", "275"];
Game.AddOption("Interface size", "recommend from 125 to 225 depending on screen size", "Interface", answers4);

var answers11 = ["normal", "very slow", "slow", "fast", "faster"];
Game.AddOption("Controller sensitivity", "Controller emulated cursor speed.", "Sens", answers11);

var answers12 = ["No", "Yes"];
Game.AddOption("Controller Primary to Secondary", "Should Primary stick be secondary?", "Contype", answers12);

Game.SupportsMultipleKeyboardsAndMice = true;

//Game files
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "openttd.exe";
Game.GUID = "OpenTTD";
Game.GameName = "OpenTTD";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 8;
Game.FileSymlinkExclusions = ["MinHook.x64.dll", "screenshot input.dll", "winmm.dll", "Xinput.ini"];

//Window
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "OpenTTD";
Game.HasDynamicWindowTitle = true;
Game.WindowStyleEndChanges = ["~0xC00000", "0x8000000"];
Game.ToggleUnfocusOnInputsLock = true;

//Environment
Game.UseNucleusEnvironment = true;
Game.DocumentsConfigPath = "OpenTTD";

//Controllers
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;

//Description
Game.Description =
  "Handler for OpenTTD: https://www.openttd.org/.\n\nKeyboards/mice and Xinput support.\n\nAfter all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input.\nPress the END key again to unlock the input when you finish playing.\n\nController mapping:\nL2 and R2:zoom\nB:choose build category road/railroad/sea/airport/landscaping\nA: Choose various roads or tracks in category.\nX: build stations or garages\nY: close a window.\nR3: Demolish.\nL3: bridges and tunnels";

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
Game.InjectHookXinput = false;
Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;

//ProtoInput
Game.ProtoInput.AutoHideTaskbar = true;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true; // Usually this works best
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.AllowFakeCursorOutOfBounds = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false; // Filters take priority over blocks, so disable the filter
Game.ProtoInput.BlockedMessages = [0x0008, 0x2a3]; // Blocks WM_KILLFOCUS //WM_MOUSELEAVE

Game.PauseBetweenContextAndLaunch = 3;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 10;

Game.Play = function() {
  var music = Context.Options["Music"];
  var volume = Context.Options["Volume"];
  var sfvolume = Context.Options["SFVolume"];
  var interface = Context.Options["Interface"];
  var initpos = Context.Options["Initpos"];
  var txtPath = Context.EnvironmentPlayer + "\\Documents\\OpenTTD\\openttd.cfg";
  var exename = "openttd.exe";
  var sens = Context.Options["Sens"];
  var contype = Context.Options["Contype"];
  var gamefolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
  } else {
    Context.CopyFolder(Context.ScriptFolder, gamefolder);

    var savePath = gamefolder + "\\Xinput.ini";

    var XID = Context.GamepadId - 1;

    var dict = [Context.FindLineNumberInTextFile(savePath, "Controllerid=", Nucleus.SearchType.StartsWith) + "|Controllerid=" + XID];
    Context.ReplaceLinesInTextFile(savePath, dict);
    if (sens == "very slow") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=9000",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=14200"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "slow") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=6000",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=7800"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "normal") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=3750",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=4500"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
    if (sens == "fast") {
      var dict = [
        Context.FindLineNumberInTextFile(savePath, "Hsensitivity=", Nucleus.SearchType.StartsWith) + "|Hsensitivity=3200",
        Context.FindLineNumberInTextFile(savePath, "Vsensitivity=", Nucleus.SearchType.StartsWith) + "|Vsensitivity=3800"
      ];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }

    if (contype == "Yes") {
      var dict = [Context.FindLineNumberInTextFile(savePath, "Righthanded=", Nucleus.SearchType.StartsWith) + "|Righthanded=1"];
      Context.ReplaceLinesInTextFile(savePath, dict);
    }
  }

  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "resolution = ", Nucleus.SearchType.StartsWith) + "|resolution = " + Context.Width + "," + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "fullscreen = ", Nucleus.SearchType.StartsWith) + "|fullscreen = false",
    Context.FindLineNumberInTextFile(txtPath, "video_vsync = ", Nucleus.SearchType.StartsWith) + "|video_vsync = true",
    Context.FindLineNumberInTextFile(txtPath, "effect_vol = ", Nucleus.SearchType.StartsWith) + "|effect_vol = " + sfvolume
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
  if (music == "ONE") {
    if (Context.PlayerID == 0) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "music_vol = ", Nucleus.SearchType.StartsWith) + "|music_vol = " + volume];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
    if (Context.PlayerID > 0) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "music_vol = ", Nucleus.SearchType.StartsWith) + "|music_vol = 0"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }
  if (music == "ALL") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "music_vol = ", Nucleus.SearchType.StartsWith) + "|music_vol = " + volume];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (music == "NONE") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "music_vol = ", Nucleus.SearchType.StartsWith) + "|music_vol = 0"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (interface != "No Change") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "gui_scale = ", Nucleus.SearchType.StartsWith) + "|gui_scale = " + interface];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  var txtPath = Context.EnvironmentPlayer + "\\Documents\\OpenTTD\\private.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "client_name = ", Nucleus.SearchType.StartsWith) + "|client_name = " + Context.Nickname,
    Context.FindLineNumberInTextFile(txtPath, "server_name = ", Nucleus.SearchType.StartsWith) + "|server_name = nucleus server",
    Context.FindLineNumberInTextFile(txtPath, "connect_to_ip = ", Nucleus.SearchType.StartsWith) + "|connect_to_ip = 127.0.0.1",
    Context.FindLineNumberInTextFile(txtPath, "last_joined = ", Nucleus.SearchType.StartsWith) + "|last_joined = 127.0.0.1"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
  if (initpos == "Yes") {
    Game.PauseBetweenProcessGrab = 3;
    Game.PauseBetweenStarts = 0;

    //windowstyle
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, exename),
      System.IO.Path.Combine(Context.RootFolder, exename),
      "41 BD 00 00 CF 00 80 3D FA E0 8E 00 00 44 0F 45",
      "41 BD 00 00 00 80 80 3D FA E0 8E 00 00 44 0F 45",
      true
    );

    Context.Wait(500);
    //Y pos prepare
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, exename),
      System.IO.Path.Combine(Context.RootFolder, exename),
      "99 2B C2 D1 F8 8B F0 EB 03 41 8B F4 48 8D 4D A8",
      "B8" + "88 88" + "00 00 8B F0 EB 03 41 8B F4 48 8D 4D A8",
      true
    );
    Context.Wait(500);
    //X pos prepare
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, exename),
      System.IO.Path.Combine(Context.RootFolder, exename),
      "2B C7 99 2B C2 D1 F8 44 8B E0 8B 45 A0 2B 45 98",
      "99 90 B8" + "99 99" + "00 00 44 8B E0 8B 45 A0 2B 45 98",
      true
    );
    //Y pos apply
    Context.Wait(500);
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, exename),
      System.IO.Path.Combine(Context.RootFolder, exename),
      "B8 88 88 00 00 8B F0 EB 03 41 8B F4 48 8D 4D A8",
      Context.PosY,
      2,
      true
    );
    //X pos apply
    Context.Wait(500);
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, exename),
      System.IO.Path.Combine(Context.RootFolder, exename),
      "99 90 B8 99 99 00 00 44 8B E0 8B 45 A0 2B 45 98",
      Context.PosX,
      4,
      true
    );
  } else {
    Game.RefreshWindowAfterStart = true;
  }
  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsXInput) {
      } else {
        //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      }

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsXInput) {
        //ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
      } else {
        //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      }
    }
  };
};