Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Jul 03 2022 21:23:42 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "C8yinKzMXRaYxbgpo";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["base"];
Game.KillMutex = ["Wolfenstein Youngblood"];
Game.DirSymlinkExclusions = ["server_rel", "source_code"];
Game.DirExclusions = ["server_rel", "source_code"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "steamclient64.dll", "xinput1_3.dll", "run_server.bat", "run.bat", "Readme.txt", "patch_exe_serveremu.exe"];
Game.GameName = "Wolfenstein: Youngblood";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Youngblood_x64vk.exe";
Game.SteamID = "1056960";
Game.GUID = "Wolfenstein Youngblood";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 8000;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Wolfenstein: Youngblood (x64vk)";
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.RefreshWindows = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.KillProcessesOnClose = ["cmd", "python"];
Game.UserProfileSavePath = "Saved Games\\MachineGames\\Wolfenstein Youngblood\\base\\savegame.user";
//Game.UserProfileConfigPath = "Saved Games\\MachineGames\\Wolfenstein Youngblood\\base";
Game.Description =
  "IMPORTANT: The game can be very demanding so reduce graphics settings like textures and shadows in your main game before running this. One player must host a public game and start the game, once the host has started the game the other player can press quickmatch to join the game, make sure each player selects a different sister. Wait until all instances finish setting up, do not alt-tab or click on an instance after that or you will lose focus, if you lose focus ingame press the END key once to get focus back. Gamepads only. You can change the FOV ingame if you play in horizontal splitscreen.";
Game.PauseBetweenContextAndLaunch = 4;
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 40;

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

Game.SupportsMultipleKeyboardsAndMice = false;

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
  Context.StartArguments = "+com_skipBootSequence 1 +r_fullscreen 0" + " +r_windowWidth " + Context.Width + " +r_windowHeight " + Context.Height;

  var txtPath = Context.NucleusUserRoot + "\\Saved Games\\MachineGames\\Wolfenstein Youngblood\\base\\Wolfenstein YoungbloodConfig.local";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "r_windowHeight", Nucleus.SearchType.StartsWith) + '|r_windowHeight "' + Context.Height + '"',
    Context.FindLineNumberInTextFile(txtPath, "r_windowWidth", Nucleus.SearchType.StartsWith) + '|r_windowWidth "' + Context.Width + '"'
    //Context.FindLineNumberInTextFile(txtPath, "r_fullscreen", Nucleus.SearchType.StartsWith) + '|r_fullscreen "0"',
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  //patch ip
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "Youngblood_x64vk.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Youngblood_x64vk.exe"),
    [0x73, 0x3a, 0x2f, 0x2f, 0x61, 0x70, 0x69, 0x2e, 0x62, 0x65, 0x74, 0x68, 0x65, 0x73, 0x64, 0x61, 0x2e, 0x6e, 0x65, 0x74], //73 3A 2F 2F 61 70 69 2E 62 65 74 68 65 73 64 61 2E 6E 65 74
    [0x3a, 0x2f, 0x2f, 0x31, 0x32, 0x37, 0x2e, 0x30, 0x2e, 0x30, 0x2e, 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
  );

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "Youngblood_x64vk.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Youngblood_x64vk.exe"),
    [
      0x73,
      0x3a,
      0x2f,
      0x2f,
      0x70,
      0x72,
      0x6f,
      0x64,
      0x2d,
      0x6e,
      0x6f,
      0x74,
      0x69,
      0x66,
      0x69,
      0x63,
      0x61,
      0x74,
      0x69,
      0x6f,
      0x6e,
      0x2d,
      0x77,
      0x65,
      0x62,
      0x73,
      0x6f,
      0x63,
      0x6b,
      0x65,
      0x74,
      0x2e,
      0x62,
      0x65,
      0x74,
      0x68,
      0x65,
      0x73,
      0x64,
      0x61,
      0x2e,
      0x6e,
      0x65,
      0x74
    ], //73 3A 2F 2F 70 72 6F 64 2D 6E 6F 74 69 66 69 63 61 74 69 6F 6E 2D 77 65 62 73 6F 63 6B 65 74 2E 62 65 74 68 65 73 64 61 2E 6E 65 74
    [
      0x3a,
      0x2f,
      0x2f,
      0x31,
      0x32,
      0x37,
      0x2e,
      0x30,
      0x2e,
      0x30,
      0x2e,
      0x31,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00
    ]
  );

  Context.RunAdditionalFiles([System.IO.Path.Combine(Context.ScriptFolder, "run_server.bat")], false, 0);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.DisableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);
      System.Threading.Thread.Sleep(1000);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0006);
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    }
  };
};