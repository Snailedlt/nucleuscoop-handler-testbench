Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Sat Oct 25 2025 09:53:11 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "SXxys76eLF6BC36PF";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Subnautica_Data"];
Game.RequiresAdmin = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = false;
Game.ExecutableName = "Subnautica.exe";
Game.SteamID = "264710";
Game.GUID = "Subnautica";
Game.GameName = "Subnautica Nitrox";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.UseGoldberg = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Subnautica";
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: This uses the Subnautica [Nitrox]{https://github.com/SubnauticaNitrox/Nitrox} Alpha v1.8.0.1 build, credit to the great devs that made Nitrox, you need the latest game version. After running this via Nucleus go to options and enable allow multiple game instances in the Nitrox launcher window that will open, then select play game-play multiplayer, once the first game instance has launched set the game to windowed if it is in exclusive fullscreen, join the local server using the game multiplayer menu, write a name and select a color using your main mouse\\kb, once you are in-game select the Subnautica process on Nucleus process picker window, click refresh if you do not see it, wait for the instance to reposition then open the next Subnautica instance via the Nitrox Launcher too, repeat the same steps as in the previous instance. Enable the controller in the game options for the gamepad instances or go to options and move the controller left stick. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Reduce in-game graphics settings in your main game to improve performance.";
Game.ThirdPartyLaunch = true;
Game.IgnoreThirdPartyPrompt = true;
Game.ForceProcessPick = true;
Game.PauseBetweenProcessGrab = 15;
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
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = true;
Game.ProtoInput.AutoHideTaskbar = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Unknown Worlds\\Subnautica", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Unknown Worlds\\Subnautica", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Unknown Worlds\\Subnautica", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Unknown Worlds\\Subnautica", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Unknown Worlds\\Subnautica", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var appid = Context.RootInstallFolder + "\\steam_appid.txt";
  var lines = ["264710"];
  Context.WriteTextFile(appid, lines);

  var Gamefolder = System.IO.Path.Combine(Game.Folder);

  Context.RunAdditionalFiles(["1|" + Gamefolder + "\\Nitrox\\NitroxServer-Subnautica.exe"], false, 1);

  Context.RunAdditionalFiles(["1|" + Gamefolder + "\\Nitrox\\Nitrox.Launcher.exe"], false, 1);

  var path = Gamefolder + "\\Nitrox\\path.txt";
  var lines = ["" + Context.RootInstallFolder];
  Context.WriteTextFile(path, lines);

  Game.KillProcessesOnClose = ["Nitrox.Launcher", "NitroxServer-Subnautica"];

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.KeyboardButtonFilter = true;
  } else {
    Game.ProtoInput.KeyboardButtonFilter = false;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };

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
    player.ProtoController10 = Context.GamepadId;
    player.ProtoController11 = Context.GamepadId;
    player.ProtoController12 = Context.GamepadId;
  }
};