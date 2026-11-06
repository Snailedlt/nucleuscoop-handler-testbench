Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Aug 16 2022 08:23:24 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "xymx9MomDLgjcQbs7";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Versus", "Coop"];
Game.AddOption("Game Mode", "Select the the type of multiplayer you want to play.", "GameMode", answers1);

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "autoexec.cfg", "xinput.cfg"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "ioWolfMP.x64.exe";
Game.SteamID = "9010";
Game.GUID = "RTCW";
Game.GameName = "Return to Castle Wolfenstein";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 36;
Game.MaxPlayers = 64;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Return to Castle Wolfenstein";
Game.HasDynamicWindowTitle = true;
Game.DontRemoveBorders = true;
Game.HideTaskbar = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsSavePath = "RTCW\\Main";
Game.DocumentsConfigPath = "RTCWCoop";
Game.Description =
  "Requires the ioRTCW source port, coop requires ioRTCW and the RTCWCoop mod. Install ioRTCW first and do not overwrite SDL264.dll when you RTCWCoop. Start both ioWolfMP.x64.exe and RTCWCoop.x64.exe at least once before using this handler. Coop is limited to 8 players max. Alt tab and use your mouse cursor to navigate the UI in all gamepad instances. Each keyboard player can only use their own keyboard and mouse. Host with one instance and join with the rest, but do not host or join with an instance until it has repositioned. Once all instances have resized/repositioned, all gamepad players have joined and ,if in versus, selected their class, alt tab to a keyboard player and press the END key to lock input so keyboard instances to have their own cursor. You need to left-click and/or move each mouse for the emulated cursors to appear after locking input. Press the END key again to unlock input so you can edit gamepad player settings and versus equipment. While input is unlocked you can use CTRL+Q to close all instances.";
Game.PauseBetweenContextAndLaunch = 2;
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

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

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
  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.MessageFilterHook = true;
  } else {
    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.MessageFilterHook = false;
  }

  var gamemode = Context.Options["GameMode"];

  if (gamemode == "Versus") {
    System.IO.File.Delete(Context.DocumentsPlayer + "\\" + Context.DocumentsSavePath + "\\iowolfmp.pid");

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Main\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"'
    ];

    Context.WriteTextFile(mkbCfg, lines);

    var xinputCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Main\\xinput.cfg";
    var lines = [
      "in_joystick 1",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind PAD0_B "weapprev"',
      'bind PAD0_A "+moveup"',
      'bind PAD0_X "+reload; +activate"',
      'bind PAD0_Y "weapnext"',
      'bind PAD0_BACK "notebook"',
      'bind PAD0_START "togglemenu"',
      'bind PAD0_LEFTSTICK_CLICK "vstr crouchToggle"',
      'bind PAD0_RIGHTSTICK_CLICK "+zoom"',
      'bind PAD0_LEFTSHOULDER "+sprint"',
      'bind PAD0_RIGHTSHOULDER "+kick"',
      'bind PAD0_DPAD_UP "+useitem"',
      'bind PAD0_DPAD_DOWN "itemnext"',
      'bind PAD0_DPAD_LEFT "+leanleft"',
      'bind PAD0_DPAD_RIGHT "+leanright"',
      'bind PAD0_LEFTSTICK_LEFT "+moveleft"',
      'bind PAD0_LEFTSTICK_RIGHT "+moveright"',
      'bind PAD0_LEFTSTICK_UP "+forward"',
      'bind PAD0_LEFTSTICK_DOWN "+back"',
      'bind PAD0_RIGHTSTICK_LEFT "+left"',
      'bind PAD0_RIGHTSTICK_RIGHT "+right"',
      'bind PAD0_RIGHTSTICK_UP "+lookup"',
      'bind PAD0_RIGHTSTICK_DOWN "+lookdown"',
      'bind PAD0_LEFTTRIGGER "weapalt"',
      'bind PAD0_RIGHTTRIGGER "+attack"',
      "in_joystickuseanalog 1",
      'seta j_pitch "0.005"',
      'seta j_yaw "-0.008"'
    ];

    Context.WriteTextFile(xinputCfg, lines);

    var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Main\\autoexec.cfg";
    var lines = [
      "set devdll 1",
      'seta name "' + Context.Nickname + '"',
      'seta r_customwidth "' + Context.Width + '"',
      'seta r_customheight "' + Context.Height + '"',
      'seta r_mode "-1"',
      'seta r_fullscreen "0"',
      'seta r_allowResize "1"',
      'seta r_noborder "1"',
      'seta r_centerWindow "0"',
      'seta cg_fixedAspect "2"',
      'seta s_musicvolume "0.5"',
      'seta in_joystickUseAnalog "1"',
      'seta in_joystick "1"',
      "exec xinput.cfg"
    ];

    Context.WriteTextFile(autoExec, lines);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Main\\autoexec.cfg";

    if (Context.PlayerID > 0) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "seta s_musicvolume", Nucleus.SearchType.StartsWith) + '|seta s_musicvolume "0.0"'];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Player.IsKeyboardPlayer) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "exec xinput.cfg", Nucleus.SearchType.StartsWith) + "|exec mkb.cfg"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  if (gamemode == "Coop") {
    System.IO.File.Delete(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\main\\iowolfsp.pid");

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "RTCWCoop.x64.exe"), System.IO.Path.Combine(Context.RootFolder, "ioWolfMP.x64.exe"), true);

    var mkbCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\coopmain\\mkb.cfg";
    var lines = [
      "in_joystick 0",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind c "vstr crouchToggle"'
    ];

    Context.WriteTextFile(mkbCfg, lines);

    var xinputCfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\coopmain\\xinput.cfg";
    var lines = [
      "in_joystick 1",
      "in_restart",
      'set duck "+movedown; set crouchToggle vstr stand; echo ^3Crouching...^7"',
      'set stand "-movedown; set crouchToggle vstr duck; echo ^2Standing...^7"',
      'set crouchToggle "vstr duck"',
      'bind PAD0_B "weapprev"',
      'bind PAD0_A "+moveup"',
      'bind PAD0_X "+reload; +activate"',
      'bind PAD0_Y "weapnext"',
      'bind PAD0_BACK "notebook"',
      'bind PAD0_START "togglemenu"',
      'bind PAD0_LEFTSTICK_CLICK "vstr crouchToggle"',
      'bind PAD0_RIGHTSTICK_CLICK "+zoom"',
      'bind PAD0_LEFTSHOULDER "+sprint"',
      'bind PAD0_RIGHTSHOULDER "+kick"',
      'bind PAD0_DPAD_UP "+useitem"',
      'bind PAD0_DPAD_DOWN "itemnext"',
      'bind PAD0_DPAD_LEFT "+leanleft"',
      'bind PAD0_DPAD_RIGHT "+leanright"',
      'bind PAD0_LEFTSTICK_LEFT "+moveleft"',
      'bind PAD0_LEFTSTICK_RIGHT "+moveright"',
      'bind PAD0_LEFTSTICK_UP "+forward"',
      'bind PAD0_LEFTSTICK_DOWN "+back"',
      'bind PAD0_RIGHTSTICK_LEFT "+left"',
      'bind PAD0_RIGHTSTICK_RIGHT "+right"',
      'bind PAD0_RIGHTSTICK_UP "+lookup"',
      'bind PAD0_RIGHTSTICK_DOWN "+lookdown"',
      'bind PAD0_LEFTTRIGGER "weapalt"',
      'bind PAD0_RIGHTTRIGGER "+attack"',
      "in_joystickuseanalog 1",
      'seta j_pitch "0.005"',
      'seta j_yaw "-0.008"'
    ];

    Context.WriteTextFile(xinputCfg, lines);

    var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\coopmain\\autoexec.coop.cfg";
    var lines = [
      'seta name "' + Context.Nickname + '"',
      'seta r_customwidth "' + Context.Width + '"',
      'seta r_customheight "' + Context.Height + '"',
      'seta r_mode "-1"',
      'seta r_fullscreen "0"',
      'seta r_allowResize "1"',
      'seta r_noborder "1"',
      'seta r_centerWindow "0"',
      'seta cg_fixedAspect "2"',
      'seta s_musicvolume "0.5"',
      'seta in_joystickUseAnalog "1"',
      'seta in_joystick "1"',
      "exec xinput.cfg"
    ];

    Context.WriteTextFile(autoExec, lines);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\coopmain\\autoexec.coop.cfg";

    if (Context.PlayerID > 0) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "seta s_musicvolume", Nucleus.SearchType.StartsWith) + '|seta s_musicvolume "0.0"'];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Player.IsKeyboardPlayer) {
      var dict = [Context.FindLineNumberInTextFile(txtPath, "exec xinput.cfg", Nucleus.SearchType.StartsWith) + "|exec mkb.cfg"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, false, true, false, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.ClipCursorHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.ClipCursorHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};