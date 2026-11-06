Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Nov 12 2022 18:30:37 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "wcxtG5dbDdjh7A2HF";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

Game.ExecutableContext = ["Collapsed_Data"];
Game.DirSymlinkExclusions = ["Collapsed_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.GameName = "COLLAPSED";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Collapsed.exe";
Game.SteamID = "1074610";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "COLLAPSED";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseGoldberg = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Collapsed";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = true;
Game.StartHookInstances = "2,3,4";
Game.UserProfileSavePath = "AppData\\LocalLow\\Glaive Games\\Collapsed";
Game.Description =
  "IMPORTANT: USE a different save slot per player. Connect the instances using the memory void online friends option. Multiple keyboards and mice supported and ONLY ONE gamepad supported as the first instance launched (launch the gamepad instance first). This game loads very fast, when it starts loading the world depending on the resolution it may cut the subtitle that tells you to press both mice, so just press the left mouse button for both players. After all the instances have launched, resized and positioned correctly press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
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

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Glaive Games\\Collapsed", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Glaive Games\\Collapsed", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Glaive Games\\Collapsed", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Glaive Games\\Collapsed", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Collapsed_Data\\Plugins\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var stats = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Collapsed_Data\\Plugins\\stats.txt";
  var lines = ["stat_2=int=0", "stat_3=int=0"];
  Context.WriteTextFile(stats, lines);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };
};