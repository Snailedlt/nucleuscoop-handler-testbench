Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Aug 01 2025 10:01:49 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "5En5rhhbm7kdhcc8e";
Hub.Maintainer.Name = "THEKlNG";
Hub.Maintainer.Id = "5EhQGHyiGFZA689yF";

var answers = ["-", "Very Low", "Low", "Normal", "High", "Very High"];
Game.AddOption("Graphic settings:", "Default = High", "Graphics", answers);

var answers1 = [];
Game.AddOption(
  "Custom Mod Loader",
  "Write the folder name of the mod located inside the main game directory. If using one mod, just type its name. For multiple mods, separate them with semicolons.\nExample: mod1 or mod1;mod2;mod3",
  "Mod",
  answers1
);

Game.ExecutableContext = ["Dta"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll"];
Game.GameName = "ARMA: Armed Assault";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "arma.exe";
Game.SteamID = "65780";
Game.GUID = "Arma Armed Assault";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 32;
Game.UseNucleusEnvironment = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ArmA";
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.DocumentsConfigPath = "ArmA";
Game.DocumentsConfigPathNoCopy = true;
Game.Description =
  "🧾 Handler Info:\nThis handler was tested using the Steam version of ARMA Gold Edition:\nhttps://store.steampowered.com/app/65780/ARMA_Gold_Edition/\nMake sure you are using the latest version of the game for the best compatibility.\n\n🖥️ Input Support:\nThis handler supports multiple keyboards/mice and partial controller support.\nMoving  the controller in the menus is not supported — you will need a mouse to navigate during setup while input is unlocked.\n\n📺 Aspect Ratio Fix:\nIf the game looks stretched (especially if you are playing in horizontal mode), go to Video Settings > Aspect Ratio and set it to 16:9.\n\n🎮 Starting a Match:\nWith the first instance, go to Multiplayer > New, and set the server type to 'LAN', choose your map and settings then start the game, the other players can join through the server browser, if a message appears that says the CD key is in use set the server to Internet mode.\n\n🧩 Loading Custom Mods:\nPlace your mod folders inside the game's main directory. In the handler mods UI option if you want to launch more than one mod write them separated by semicolons.\nExample: @CSLA;@editor_update;@BWMod.\n\n🖱️ Input Locking:\nOnce all instances are launched, resized and positioned correctly, press the END key once to lock the input, this gives each instance focus and each kb/mouse instance its own working mouse and keyboard. After locking input, each player must left-click and move the mouse for a few seconds until the emulated cursor appears and responds properly. When you're done playing, make sure to exit instances through the in-game 'Exit' button before using Ctrl + Q so that progress and settings are saved properly.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 15;
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

//ProtoInput

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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.FindWindowHook = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActivateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 50000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var Mod = Context.Options["Mod"];

  var Args = " -window -noPause -nosplash -name=" + Context.Nickname + " -mod=" + Mod + "";
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Bohemia Interactive Studio\\ArmA", "Player Name", Context.Nickname, Nucleus.RegType.String);

  Context.PatchFileFindAll(
    System.IO.Path.Combine(Context.RootFolder, "arma.exe"),
    System.IO.Path.Combine(Context.RootFolder, "arma.exe"),
    [0x39, 0x8e, 0xe3, 0x3f],
    Context.ConvertToBytes(Context.AspectRatioDecimal)
  );

  var filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg")) {
    var savePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ArmA.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "Resolution_W", Nucleus.SearchType.StartsWith) + "|Resolution_W=" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "Resolution_H", Nucleus.SearchType.StartsWith) + "|Resolution_H=" + Context.Height + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winW", Nucleus.SearchType.StartsWith) + "|winW=" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winH", Nucleus.SearchType.StartsWith) + "|winH=" + Context.Height + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winX", Nucleus.SearchType.StartsWith) + "|winX=" + Context.PosX + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winY", Nucleus.SearchType.StartsWith) + "|winY=" + Context.PosY + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winDefW", Nucleus.SearchType.StartsWith) + "|winDefW=" + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "winDefH", Nucleus.SearchType.StartsWith) + "|winDefH=" + Context.Height + ";"
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  if (Context.IsKeyboardPlayer) {
    var txtPath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\Keyboard & Mouse.txt";
    var lines = ["Keyboard & Mouse"];
    Context.WriteTextFile(txtPath, lines);

    if (System.IO.File.Exists((Context.SavePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\Controller.txt"))) {
      System.IO.File.Delete((Context.SavePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\Controller.txt"));
      System.IO.File.Delete((Context.SavePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile"));
    }

    if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile")) {
      var savePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Keyboard & Mouse.ArmAProfile");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  } else {
    var txtPath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\Controller.txt";
    var lines = ["Controller"];
    Context.WriteTextFile(txtPath, lines);

    if (System.IO.File.Exists((Context.SavePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\Keyboard & Mouse.txt"))) {
      System.IO.File.Delete((Context.SavePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\Keyboard & Mouse.txt"));
      System.IO.File.Delete((Context.SavePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile"));
    }

    if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile")) {
      var savePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Controller.ArmAProfile");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
  var dict = [
    Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
    Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=1.000000;",
    Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.000000;",
    Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
    Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=1.000000;",
    Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
  ];
  Context.ReplaceLinesInTextFile(ProfilePath, dict);

  if (Context.Width >= 3840 && Context.Height >= 1080) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.666667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.312500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.687500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 2560 && Context.Height >= 720) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.666667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.312500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.687500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1920 && Context.Height >= 600) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.400000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.291667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.708333;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1920 && Context.Height >= 540) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.666667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.312500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.687500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1600 && Context.Height >= 525) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.400000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.291667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.708333;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1600 && Context.Height >= 600) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.250000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1600 && Context.Height >= 450) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.666667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.312500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.687500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1400 && Context.Height >= 525) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.250000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1366 && Context.Height >= 384) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.667969;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.312592;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.687408;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1360 && Context.Height >= 384) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.656250;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.311765;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.688235;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1280 && Context.Height >= 512) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=1.875000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.233333;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.766667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1280 && Context.Height >= 480) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.250000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1280 && Context.Height >= 384) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.500000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.300000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.700000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1280 && Context.Height >= 360) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.666667;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.312500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.687500;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1152 && Context.Height >= 427) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.250000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1024 && Context.Height >= 384) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.250000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 1024 && Context.Height >= 300) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.560000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.304688;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.695313;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  } else if (Context.Width >= 800 && Context.Height >= 300) {
    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "fovTop", Nucleus.SearchType.StartsWith) + "|fovTop=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "fovLeft", Nucleus.SearchType.StartsWith) + "|fovLeft=2.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftX", Nucleus.SearchType.StartsWith) + "|uiTopLeftX=0.250000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiTopLeftY", Nucleus.SearchType.StartsWith) + "|uiTopLeftY=0.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightX", Nucleus.SearchType.StartsWith) + "|uiBottomRightX=0.750000;",
      Context.FindLineNumberInTextFile(ProfilePath, "uiBottomRightY", Nucleus.SearchType.StartsWith) + "|uiBottomRightY=1.000000;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  var Graphics = Context.Options["Graphics"];

  if (Graphics == "Very Low") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=-1;"];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=150000.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=1200;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=50.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=-1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=-1;",
      Context.FindLineNumberInTextFile(ProfilePath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=0;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  if (Graphics == "Low") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=0;"];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=200000.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=1250;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=20.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=0;",
      Context.FindLineNumberInTextFile(ProfilePath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=0;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  if (Graphics == "Normal") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=1;"];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=300000.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=1400;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=2;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=7;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=0;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  if (Graphics == "High") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=2;"];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=300000.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "viewDistance", Nucleus.SearchType.StartsWith) + "|viewDistance=3000;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=2;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=10;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=2;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=1;",
      Context.FindLineNumberInTextFile(ProfilePath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=1;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  if (Graphics == "Very High") {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\ArmA.cfg";
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "FSAA", Nucleus.SearchType.StartsWith) + "|FSAA=4;"];
    Context.ReplaceLinesInTextFile(cfgPath, dict);

    var ProfilePath = Context.DocumentsPlayer + "\\ArmA Other Profiles\\" + Context.Nickname + "\\" + Context.Nickname + ".ArmAProfile";
    var dict = [
      Context.FindLineNumberInTextFile(ProfilePath, "sceneComplexity", Nucleus.SearchType.StartsWith) + "|sceneComplexity=1000000.000000;",
      Context.FindLineNumberInTextFile(ProfilePath, "terrainGrid", Nucleus.SearchType.StartsWith) + "|terrainGrid=10000;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadowQuality", Nucleus.SearchType.StartsWith) + "|shadowQuality=4;",
      Context.FindLineNumberInTextFile(ProfilePath, "shadingQuality", Nucleus.SearchType.StartsWith) + "|shadingQuality=100;",
      Context.FindLineNumberInTextFile(ProfilePath, "anisoFilter", Nucleus.SearchType.StartsWith) + "|anisoFilter=4;",
      Context.FindLineNumberInTextFile(ProfilePath, "TexQuality", Nucleus.SearchType.StartsWith) + "|TexQuality=3;",
      Context.FindLineNumberInTextFile(ProfilePath, "postFX", Nucleus.SearchType.StartsWith) + "|postFX=2;"
    ];
    Context.ReplaceLinesInTextFile(ProfilePath, dict);
  }

  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
    player.ProtoController2 = Context.GamepadId;
    player.ProtoController3 = Context.GamepadId;
    player.ProtoController4 = Context.GamepadId;
    player.ProtoController5 = Context.GamepadId;
    player.ProtoController6 = Context.GamepadId;
    player.ProtoController7 = Context.GamepadId;
    player.ProtoController8 = Context.GamepadId;
    player.ProtoController9 = Context.GamepadId;
    player.ProtoController10 = Context.GamepadId;
    player.ProtoController11 = Context.GamepadId;
    player.ProtoController12 = Context.GamepadId;
    player.ProtoController13 = Context.GamepadId;
    player.ProtoController14 = Context.GamepadId;
    player.ProtoController15 = Context.GamepadId;
    player.ProtoController16 = Context.GamepadId;
    player.ProtoController17 = Context.GamepadId;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
      ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, true);
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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursorFix(player.ProtoInputInstanceHandle, false);
      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      if (Context.IsKeyboardPlayer) {
      } else {
        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
      }
    }
  };
};