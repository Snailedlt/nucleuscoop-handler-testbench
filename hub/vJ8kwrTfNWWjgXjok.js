Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 09 2022 06:57:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vJ8kwrTfNWWjgXjok";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["assets"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "crash_log.txt", "crash_logs.txt"];
Game.FileSymlinkCopyInstead = ["config.ini"];
Game.UseNucleusEnvironment = false;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "PlanetCentauri.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "385380";
Game.GUID = "Planet Centauri";
Game.GameName = "Planet Centauri";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Planet Centauri";
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\PlanetCentauri";
Game.Description =
  "Make sure you ran the main game at least once before launching this. The host must go to Multiplayer>Manual>Host Server>Select Port 7777> Create (select) a Character and World. Clients can connect with IP 127.0.0.1 and port 7777 via Multiplayer > Manual > Join > Create (select) character. Multiple keyboards/mice only as this game doesn't have built-in gamepad support. Once all instances are running, resized, and positioned correctly, press the END key to lock input for all instances to have their own cursor. You need to left-click each mouse for the emulated cursors to appear after locking input. Press the END key again to unlock input when you're done playing. You can also use CTRL+Q to close Nucleus and all of its instances when the input is unlocked. If the instances do not resize correctly set your monitor scale to 100% or add custom resolutions to your graphics panel (like 960x1080, 1920x540).";
Game.PauseBetweenProcessGrab = 2;
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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;
Game.ProtoInput.AutoHideTaskbar = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 8000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("graphics", "fullscreen", "0"),
    new Nucleus.IniSaveInfo("graphics", "use_custom_cursor", "1"),
    new Nucleus.IniSaveInfo("graphics", "window_height", Context.Height),
    new Nucleus.IniSaveInfo("graphics", "window_width", Context.Width)
  ]);
};