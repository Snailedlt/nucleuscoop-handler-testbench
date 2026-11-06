Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jan 28 2023 23:15:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "4tXDyjGE9yWmrLGcA";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.DirSymlinkExclusions = [
  "Game"
  //"Save",
];
Game.DirSymlinkCopyInstead = [
  //"Save",
];
Game.FileSymlinkExclusions = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["ClownJob'd.dll", "ClownJob'd.ini", "ClownJob'd.log", "Launcher.exe"];
Game.GameName = "Tony Hawk's Underground 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "THUGTWO.exe";
Game.GUID = " THUG2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "Game";
Game.LauncherTitle = "";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "THUG2 ClownJob'd";
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.HasDynamicWindowTitle = true;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
//Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Description =
  "IMPORTANT: This requires the ClownJob'd THUG2 mod to be installed in your main game files, the mod adds xinput, windowed, support for custom resolutions and aspect ratios among other fixes: https://thpsx.com/forums/index.php?topic=1529. Make sure you map your gamepads in the main game first. Host a multiplayer LAN game (network play) in one instance and join in the others. If you use keyboards after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working keyboard. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 2;
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
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 8000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS.

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Game\\ClownJob'd.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("MainSettings", "BorderlessWindow", "1"),
    new Nucleus.IniSaveInfo("MainSettings", "Windowed", "1"),
    new Nucleus.IniSaveInfo("MainSettings", "Width", Context.Width),
    new Nucleus.IniSaveInfo("MainSettings", "Height", Context.Height),
    new Nucleus.IniSaveInfo("MainSettings", "PS2Controls", "0"),
    new Nucleus.IniSaveInfo("MainSettings", "DisplayIntros", "0"),
    new Nucleus.IniSaveInfo("MainSettings", "ScreenMode", "0"),
    new Nucleus.IniSaveInfo("MainSettings", "DisableXinput", "0")
  ]);

  var str = Context.GamepadGuid;
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Activision\\Tony Hawk's Underground 2\\Settings", "pad0", str.toUpperCase(), Nucleus.RegType.String);

  //Context.RunAdditionalFiles([ "all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Launcher.exe"], false, "" + Context.Nickname + " click OK here to launch the instance only after you select the correct gamepad in the game launcher, click on the Gamepad binding tab, select a gamepad and click save settings and quit in the launcher.", 0, false, false, true, false);
};

Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
    //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
    //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
    //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
    //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

    //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

    //Wait a bit to make sure the message is sent

    System.Threading.Thread.Sleep(1000);

    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
  }
};

Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
    //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
    //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
    //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 15000, true, true, false, false, false);
  }
};