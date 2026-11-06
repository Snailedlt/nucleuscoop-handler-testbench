Hub.Handler.Version = 13; // Released at https://hub.splitscreen.me/ on Mon Dec 15 2025 13:21:16 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "zBbF958JXyHRwdTcb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Risk of Rain 2_Data\\Config", "Risk of Rain 2_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "Rewired_WindowsGamingInput.dll", "xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = [
  "UnityCrashHandler64.exe",
  "UnityPlayer.dll",
  "app.info",
  "boot.config",
  "globalgamemanagers",
  "globalgamemanagers.assets",
  "level0",
  "level0.resS",
  "resources.assets",
  "resources.assets.resS",
  "RuntimeInitializeOnLoads.json",
  "ScriptingAssemblies.json",
  "sharedassets0.assets",
  "sharedassets0.assets.resS",
  "autoexec.cfg",
  "config.cfg",
  "server_startup.cfg"
];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Risk of Rain 2.exe";
Game.SteamID = "632360";
Game.GUID = "Risk of Rain 2";
Game.GameName = "Risk of Rain 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Risk of Rain";
Game.FakeFocus = true;
Game.FakeFocusInterval = 7000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\632360\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "MAKE sure you disable crossplay in your main game settings first and change some graphics settings. To join the same game select multiplayer and select the option copy lobby to clipboard, then in the other instances select join clipboard lobby, the host can select create multiplayer game after that. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Reduce graphics settings in your main game to improve performance.";
Game.KeepSymLinkOnExit = false;
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 8;
Game.PauseBetweenStarts = 30;

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
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
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
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow" + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Risk of Rain 2_Data\\Config\\config.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "intro_skip 0", Nucleus.SearchType.StartsWith) + "|intro_skip 1;",
    Context.FindLineNumberInTextFile(txtPath, "splash_skip 0", Nucleus.SearchType.StartsWith) + "|splash_skip 1;",
    Context.FindLineNumberInTextFile(txtPath, "window_mode", Nucleus.SearchType.StartsWith) + "|window_mode Window;"
    //Context.FindLineNumberInTextFile(txtPath, "window_mode", Nucleus.SearchType.StartsWith) + 1 + "|resolution " + Context.Width + "x" + Context.Height + "x60;",
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Hopoo Games, LLC\\Risk of Rain 2", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Hopoo Games, LLC\\Risk of Rain 2", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Hopoo Games, LLC\\Risk of Rain 2", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Hopoo Games, LLC\\Risk of Rain 2", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\steam_appid.txt";
  var lines = ["632360"];
  Context.WriteTextFile(appid, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["2781620=Risk of Rain 2: Alloyed Collective", "2306620=Risk of Rain 2: Seekers of the Storm", "1607890=Risk of Rain 2 - Expansion 1 (Risk of Rain 2: Survivors of the Void)"];
  Context.WriteTextFile(dlc, lines);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

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
  }
};