Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Apr 04 2023 23:56:59 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "A2LaQSrRHJAb76Nkm";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["data\\25AmbSnd.bif"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.ExecutableName = "Baldur.exe";
Game.SteamID = "257350";
Game.GUID = "Baldurs Gate II EE";
Game.GameName = "Baldur's Gate II: Enhanced Edition";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 6;
Game.MaxPlayers = 6;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Baldur's Gate II - Enhanced Edition";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "Baldur's Gate II - Enhanced Edition";
Game.Description =
  "Run your main game at least once before using this. Once all instances have resized and repositioned you can press END to lock input. Host a local network game with one player and join with the rest using direct connection, 127.0.0.1.";
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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = true;
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
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var luaPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Baldur.lua";
  var lines = [
    "SetPrivateProfileString('Window','Maximized','0')",
    "SetPrivateProfileString('Window','w','" + Context.Width + "')",
    "SetPrivateProfileString('Window','Full Screen','0')",
    "SetPrivateProfileString('Window','h','" + Context.Height + "')",
    "SetPrivateProfileString('Graphics','Hardware Mouse Cursor','0')",
    "SetPrivateProfileString('Multiplayer','Player Name','" + Context.Nickname + "')"
  ];
  Context.WriteTextFile(luaPath, lines);

  if (Context.PlayerID > 0) {
    var luaPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Baldur.lua";
    var lines = [
      "SetPrivateProfileString('Window','Maximized','0')",
      "SetPrivateProfileString('Window','w','" + Context.Width + "')",
      "SetPrivateProfileString('Window','Full Screen','0')",
      "SetPrivateProfileString('Window','h','" + Context.Height + "')",
      "SetPrivateProfileString('Graphics','Hardware Mouse Cursor','0')",
      "SetPrivateProfileString('Multiplayer','Player Name','" + Context.Nickname + "')",
      "SetPrivateProfileString('Program Options','Volume Music','0')"
    ];
    Context.WriteTextFile(luaPath, lines);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};