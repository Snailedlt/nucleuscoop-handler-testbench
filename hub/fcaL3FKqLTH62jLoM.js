Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Apr 03 2023 07:59:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "fcaL3FKqLTH62jLoM";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "EndlessSpace2.exe";
Game.SteamID = "392110";
Game.GUID = "ENDLESS Space 2";
Game.GameName = "ENDLESS Space 2";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 8;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.HideTaskbar = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Endless Space 2";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.StartArguments = "-novideo -popupwindow";
Game.DocumentsConfigPath = "Endless Space 2";
Game.Description =
  "Launch the game outside of Nucleus at least once before using this. Once all instances have resized and repositioned, press END and wait a couple seconds to lock input and allow each player control. Host a public match with one player and join with the rest, do not click invite or the game will crash. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  //if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.Documents) + "\\Endless Space 2\\Users\\106285971" + Context.PlayerID + "\\Registry.xml")) {
  //}

  var filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Users\\106285971" + Context.PlayerID;
  System.IO.Directory.CreateDirectory(filePath);

  var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Users\\106285971" + Context.PlayerID + "\\Registry.xml";
  //var cfgPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Endless Space 2\\Users\\106285971" + Context.PlayerID + "\\Registry.xml";
  var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "Registry.xml");
  System.IO.File.Copy(cfgPkgOrigin, cfgPath, true);

  Context.ChangeXmlNodeInnerTextValue(cfgPath, "//DisplayMode", "Windowed");
  Context.ChangeXmlNodeInnerTextValue(cfgPath, "//Resolution", Context.Width + "x" + Context.Height + " (60)");

  if (Context.PlayerID > 0) {
    //Context.ChangeXmlNodeInnerTextValue(cfgPath, "//Mute", "true");
    //Context.ChangeXmlNodeInnerTextValue(cfgPath, "//MusicIntervalDuration", "0"); //Default is 120
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 50, true, true, false, false, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};