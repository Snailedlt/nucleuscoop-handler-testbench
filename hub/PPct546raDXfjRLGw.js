Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Jul 13 2022 05:49:57 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "PPct546raDXfjRLGw";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["SkyrimTogetherServer.exe"];
Game.DirSymlinkExclusions = [
  //"Data\\SkyrimTogetherReborn",
];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["Skyrim_Default.ini", "SkyrimSE.exe", "SkyrimSELauncher.exe", "SkyrimTogetherServer.exe", "TPProcess.exe", "crashpad_handler.exe"];
Game.GameName = "The Elder Scrolls V: Skyrim Special Edition (Skyrim Together Reborn)";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SkyrimTogether.exe";
Game.SteamID = "489830";
//Game.CreateSteamAppIdByExe = true;
Game.GUID = "Skyrim Together Reborn";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
//Game.BinariesFolder = "Data\\SkyrimTogetherReborn";
Game.UseNucleusEnvironment = false;
Game.NeedsSteamEmulation = false;
Game.LauncherTitle = "";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Skyrim Together";
Game.ResetWindows = true;
Game.HookInit = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\My Games\\Skyrim Special Edition";
Game.UserProfileSavePath = "Documents\\My Games\\Skyrim Special Edition\\Saves";
Game.Description =
  "IMPORTANT: Install and run Skyrim Together Reborn in your main game files before launching this. Use a different save slot per instance, once in-game press the right CTRL key to open the connection menu, click connect and in the adress field type 127.0.0.1 or localhost then press connect. Do the same in all instances to connect to the offline local server, alt-tab between instances so you can press the right CTRL key in all and use the mouse cursor. Reduce graphics settings in your main game or limit fps to improve performance, you can also alt-tab to the Nucleus window to balance out fps. Gamepads only for now.";
Game.PauseBetweenContextAndLaunch = 3;
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

//ProtoInput:

Game.SupportsKeyboard = false;
Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
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
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.RunAdditionalFiles([Context.OrigRootFolder + "\\SkyrimTogetherServer.exe"], false, 1);

  Game.KillProcessesOnClose = ["SkyrimTogetherServer", "TPProcess", "crashpad_handler"];

  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Skyrim_Default.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("General", "bAlwaysActive", "1"),
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "bBorderless", "1")
  ]);

  var videoconfig = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Skyrim Special Edition\\Skyrim.ini";
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("General", "bAlwaysActive", "1"),
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "bBorderless", "1")
  ]);

  var videoconfig = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Skyrim Special Edition\\SkyrimCustom.ini";
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("General", "bAlwaysActive", "1"),
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "bBorderless", "1")
  ]);

  var videoconfig = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Skyrim Special Edition\\SkyrimPrefs.ini";
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display", "bBorderless", "1"),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("General", "bAlwaysActive", "1")
  ]);

  var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Skyrim Special Edition\\Skyrim.ini";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "bAlwaysActive=", Nucleus.SearchType.StartsWith) + "|bAlwaysActive=1"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_appid.txt";
  var lines = ["489830"];
  Context.WriteTextFile(appid, lines);

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.FocusHooks = false;

    var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Skyrim Special Edition\\SkyrimPrefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "bGamepadEnable", "0")]);
  } else {
    Game.ProtoInput.FocusHooks = true;

    var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Skyrim Special Edition\\SkyrimPrefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "bGamepadEnable", "1")]);
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
  }
};