Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Mar 02 2026 06:32:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ovMonAxAxWih3ro55";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["DirectX 11", "DirectX 12"];
Game.AddOption("Select Graphics API:", "Select the GAPI you want the game to use.", "API", answers1);

Game.ExecutableContext = ["libfbxsdk.dll"];
Game.DirSymlinkExclusions = ["bin", "conf"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "steam_api64.dll",
  "amd_ags_x64.dll",
  "CrashReporter.exe",
  "d3dcompiler_47.dll",
  "dxcompiler.dll",
  "dxil.dll",
  "easy_profiler.dll",
  "GameNetworkingSockets.dll",
  "GfeSDK.dll",
  "GFSDK_Aftermath_Lib.x64.dll",
  "GFSDK_Aftermath_Lib.x86.dll",
  "glut32.dll",
  "Launcher.exe",
  "libfbxsdk.dll",
  "libprotobuf.dll",
  "libsodium.dll",
  "libxess.dll",
  "nvToolsExt64_1.dll",
  "PhysX3_x64.dll",
  "PhysX3CharacterKinematic_x64.dll",
  "PhysX3Common_x64.dll",
  "PhysX3Cooking_x64.dll",
  "PhysX3Gpu_x64.dll",
  "PhysXDevice64.dll",
  "PxFoundation_x64.dll",
  "PxPvdSDK_x64.dll",
  "riftbreaker_dll_win_release.dll",
  "WinPixEventRuntime.dll",
  "xaudio2_9redist.dll",
  "XCurl.dll",
  "XeFX_Loader.dll",
  "initial_config.cfg",
  "initial_config_steamdeck.cfg",
  "initial_config_win.cfg",
  "initial_config_win_safe.cfg",
  "changed_content_full_01.txt"
];
Game.GameName = "The Riftbreaker";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "riftbreaker_win_release.exe";
Game.SteamID = "780310";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "The Riftbreaker";
Game.BinariesFolder = "bin";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "The Riftbreaker EXE: 1092 DATA: 718 DX11";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.DocumentsSavePath = "The Riftbreaker";
Game.DocumentsConfigPath = "The Riftbreaker\\config";
Game.DocumentsSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: If a prompt saying the game did not shutdown properly shows quickly click on No to launch an instance. Create a multiplayer game in one instance and join in the others using the server browser. Reduce graphics settings per instance to improve performance. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. To avoid stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.PauseBetweenProcessGrab = 20;
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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
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
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var filePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\local.cfg")) {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\local.cfg";
    var params = ['set full_screen "0"', 'set video_mode "1920x1080:32"'];
    Context.WriteTextFile(cfgPath, params);
  }

  var txtPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\local.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "set full_screen", Nucleus.SearchType.StartsWith) + '|set full_screen "0"',
    Context.FindLineNumberInTextFile(txtPath, "set video_mode", Nucleus.SearchType.StartsWith) + '|set video_mode "' + Context.Width + "x" + Context.Height + ':32"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\conf\\initial_config.cfg";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "set full_screen", Nucleus.SearchType.StartsWith) + '|set full_screen "0"'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\conf\\initial_config_win.cfg";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "set disable_steam", Nucleus.SearchType.StartsWith) + '|set disable_steam "1"'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var api = Context.Options["API"];

  if (api == "DirectX 11") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\conf\\initial_config_win.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "set render_system", Nucleus.SearchType.StartsWith) + '|set render_system "dx11"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (api == "DirectX 12") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\conf\\initial_config_win.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "set render_system", Nucleus.SearchType.StartsWith) + '|set render_system "dx12"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

      System.Threading.Thread.Sleep(1000);

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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  };
};