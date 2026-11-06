Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Dec 24 2021 08:02:58 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "zJHdBkJ57B4WYCr5P";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["TTRWorldTour_Data"];
Game.DirSymlinkExclusions = ["TTRWorldTour_Data\\Plugins", "TTRWorldTour_Data\\Resources"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "NetLog.txt", "output_log.txt", "winmm.dll"];
Game.FileSymlinkCopyInstead = ["CSteamworks.dll", "XInputInterface.dll", "unity default resources", "unity_builtin_extra"];
Game.GameName = "Table Top Racing: World Tour";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "TTRWorldTour.exe";
Game.SteamID = "450670";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Table Top Racing World Tour";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Table Top Racing World Tour";
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.CreateSingleDeviceFile = false;
Game.BlockRawInput = true;
Game.StartHookInstances = "2,3,4,5,6,7,8";
Game.UserProfileSavePath = "AppData\\LocalLow\\Playrise Digital\\Table Top Racing World Tour";
Game.Description =
  "IMPORTANT: Only working with one gamepad (because the game uses the old Unity horrible default input for controller support instead of xinput, connect only one gamepad) and multiple keyboards/m. After all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Alt-Tab to the gamepad instance before locking the input if you use an Xbox one gamepad. Create a public multiplayer game in one instance and join in the others.";
Game.KeepSymLinkOnExit = false;
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
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.BlockRawInputHook = false;
Game.ProtoInput.FindWindowHook = false;
Game.ProtoInput.CreateSingleHIDHook = false;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Playrise Digital\\Table Top Racing World Tour", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Playrise Digital\\Table Top Racing World Tour", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Playrise Digital\\Table Top Racing World Tour", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\steam_appid.txt";
  var lines = ["450670"];
  Context.WriteTextFile(appid, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["512940=Table Top Racing: World Tour - Tropical Ice Pack", "450750=Table Top Racing: World Tour - Supercharger Pack"];
  Context.WriteTextFile(dlc, lines);
};