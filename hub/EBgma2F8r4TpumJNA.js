Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Sat Dec 27 2025 23:44:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "EBgma2F8r4TpumJNA";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["data"];
Game.KillMutex = ["Luna"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["language"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "steamclient.dll", "steamclient64.dll", "steamclient_loader_64.exe", "ColdClientLoader.ini", "config.dat", "user.dat"];
Game.FileSymlinkCopyInstead = [
  "100orange_x86.exe",
  "100OrangeJuiceLogWindows.txt",
  "d3dcompiler_47.dll",
  "discord_game_sdk.dll",
  "libEGL.dll",
  "libGLESv2.dll",
  "settings.ojc",
  "steam_api.dll",
  "steam_api64.dll",
  "vk_swiftshader.dll",
  "vulkan-1.dll"
];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "100orange.exe";
Game.LauncherExe = "OrangeL.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.SteamID = "282800";
Game.GUID = "100 Orange Juice";
Game.GameName = "100% Orange Juice";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
//Game.LauncherTitle = "splashscreen";
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "100% Orange Juice";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 3000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: Fully CLOSE Steam before launching this. After all the instances finish setting up press the END key once to lock the input so that each instance get its own working mouse cursor. In latest version of the game the instances will save in your main game files Save folder in a different numbered folder each. Add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 15;
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
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;

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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\settings.ojc";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '        "height":', Nucleus.SearchType.StartsWith) + '|        "height": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "screen_mode":', Nucleus.SearchType.StartsWith) + '|        "screen_mode": 1,',
    Context.FindLineNumberInTextFile(txtPath, '        "width":', Nucleus.SearchType.StartsWith) + '|        "width": ' + Context.Width
    //Context.FindLineNumberInTextFile(txtPath, '        "showStartupDialog":', Nucleus.SearchType.StartsWith) + '|        "showStartupDialog": false,',
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\language\\sdlls\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\language\\sdlls\\settings");
  System.IO.Directory.CreateDirectory(filePath);

  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\language\\sdlls\\steam_settings");

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\language\\sdlls\\steamclient.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\language\\sdlls\\steamclient64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OrangeL.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "OrangeL.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ColdClientLoader.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ColdClientLoader.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ColdClientLoader.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SteamClient", "SteamClientDll", Context.RootFolder + "\\language\\sdlls\\steamclient.dll"),
    new Nucleus.IniSaveInfo("SteamClient", "SteamClient64Dll", Context.RootFolder + "\\language\\sdlls\\steamclient64.dll")
  ]);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\language\\sdlls\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);
};