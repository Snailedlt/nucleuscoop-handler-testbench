Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Jul 30 2023 06:36:15 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "4fEQ29RwqKnPQ9y2F";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["CEGUIBase.dll"];
Game.FileSymlinkExclusions = [
  //"steam_api.dll",
  "steam_appid.txt"
];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Torchlight2.exe";
Game.SteamID = "200710";
Game.GUID = "Torchlight II";
Game.GameName = "Torchlight II";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.LauncherTitle = "";
//Game.LauncherExe = "ModLauncher.exe";
Game.HideTaskbar = false;
Game.StartArguments = "-windowed";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Torchlight II";
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.HasDynamicWindowTitle = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsSavePath = "My Games\\Runic Games\\Torchlight 2\\save";
Game.DocumentsConfigPath = "My Games\\Runic Games\\Torchlight 2";
Game.Description =
  "IMPORTANT: So the instances launch and resize correctly make sure you ran your main game at least once and changed some graphic settings before launching via Nucleus. Use a different character per instance and connect them via LAN. Multiple Keyboards/Mice only as the game has no native gamepad support. After all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Each instance has its own saves that are copies of your original ones, your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open documents save path in the UI.";
Game.PauseBetweenProcessGrab = 7;
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
Game.ProtoInput.DrawFakeCursor = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
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
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var txtPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\local_settings.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "WINDOWED_FULLSCREEN :", Nucleus.SearchType.StartsWith) + "|WINDOWED_FULLSCREEN :0",
    Context.FindLineNumberInTextFile(txtPath, "FULLSCREEN :", Nucleus.SearchType.StartsWith) + "|FULLSCREEN :0",
    Context.FindLineNumberInTextFile(txtPath, "RESTART_ON_FULLSCREEN_CHANGE :", Nucleus.SearchType.StartsWith) + "|RESTART_ON_FULLSCREEN_CHANGE :0",
    Context.FindLineNumberInTextFile(txtPath, "WINDOW_WIDTH :", Nucleus.SearchType.StartsWith) + "|WINDOW_WIDTH :" + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "WINDOW_HEIGHT :", Nucleus.SearchType.StartsWith) + "|WINDOW_HEIGHT :" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "RES_WIDTH :", Nucleus.SearchType.StartsWith) + "|RES_WIDTH :" + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "RES_HEIGHT :", Nucleus.SearchType.StartsWith) + "|RES_HEIGHT :" + Context.Height
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict, "UTF-16");
};