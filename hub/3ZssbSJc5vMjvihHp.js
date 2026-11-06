Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Jan 12 2022 23:34:47 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "3ZssbSJc5vMjvihHp";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["SatelliteReignWindows_Data"];
Game.DirSymlinkExclusions = ["SatelliteReignWindows_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "output_log.txt"];
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "SatelliteReignWindows.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "268870";
Game.GUID = "Satellite Reign";
Game.GameName = "Satellite Reign";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "SatelliteReign";
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\SatelliteReign\\users";
Game.UserProfileConfigPath = "AppData\\Local\\SatelliteReign";
Game.Description =
  "IMPORTANT: Create multiple users/profiles in your main game first, select a different profile per instance after launching via Nucleus. Open the next instance until the first one/previous one finishes loading and gets to the title screen. After all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Host a multiplayer LAN game in one instance and join in the others (change internet to local in the host and join menus). Reduce in-game graphics settings to improve performance. Multiple keyboards and mice only as the game lacks gamepad support.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 14;
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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
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
Game.ProtoInput.XinputHook = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow -force-d3d9 " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  var path = Context.NucleusUserRoot + "\\AppData\\Local\\SatelliteReign\\options7.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//m_ResWidth", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//m_ResHeight", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//m_ResFullScreen", "false");

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\5 Lives Studios\\SatelliteReign", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\5 Lives Studios\\SatelliteReign", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\5 Lives Studios\\SatelliteReign", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};