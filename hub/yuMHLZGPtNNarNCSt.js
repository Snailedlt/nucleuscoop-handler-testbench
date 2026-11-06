Hub.Handler.Version = 14; // Released at https://hub.splitscreen.me/ on Tue Mar 11 2025 12:00:35 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yuMHLZGPtNNarNCSt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["bink2w64.dll"];
Game.KillMutex = ["UnrealEngine3"];
Game.DirSymlinkExclusions = ["Binaries\\Win64\\settings"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "bink2w64.dll",
  "cudart.dll",
  "dbghelp.dll",
  "fmodex64.dll",
  "FonixTtsDtSimpleFr.dll",
  "FonixTtsDtSimpleGr.dll",
  "FonixTtsDtSimpleIt.dll",
  "FonixTtsDtSimpleLa.dll",
  "FonixTtsDtSimpleSp.dll",
  "FonixTtsDtSimpleUk.dll",
  "FonixTtsDtSimpleUs.dll",
  "Launcher.Content.dll",
  "Launcher.exe",
  "libogg_64.dll",
  "libresample.dll",
  "libvorbis_64.dll",
  "libvorbisfile_64.dll",
  "nvtt.dll",
  "nvtt_64.dll",
  "NxCharacter64.dll",
  "NxCooking.dll",
  "ogg.dll",
  "PhysXCooking64.dll",
  "PhysXCore.dll",
  "PhysXCore64.dll",
  "PhysXExtensions.dll",
  "PhysXLoader64.dll",
  "protobuf-net.dll",
  "UpdateDLLWrapper.dll",
  "vorbis.dll",
  "vorbisenc.dll",
  "vorbisfile.dll",
  "wxmsw28u_adv_vc_custom_64.dll",
  "wxmsw28u_aui_vc_custom_64.dll",
  "wxmsw28u_core_vc_custom_64.dll",
  "wxmsw28u_html_vc_custom_64.dll",
  "wxmsw28u_richtext_vc_custom_64.dll",
  "wxmsw28u_vc_custom_64.dll",
  "wxmsw28u_xml_vc_custom_64.dll",
  "wxmsw28u_xrc_vc_custom_64.dll",
  "wxmsw28ud_adv_vc_custom_64.dll",
  "wxmsw28ud_aui_vc_custom_64.dll",
  "wxmsw28ud_core_vc_custom_64.dll",
  "wxmsw28ud_html_vc_custom_64.dll",
  "wxmsw28ud_richtext_vc_custom_64.dll",
  "wxmsw28ud_vc_custom_64.dll",
  "wxmsw28ud_xml_vc_custom_64.dll",
  "wxmsw28ud_xrc_vc_custom_64.dll"
];
Game.PartialMutexSearch = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "BorderlandsGOTY.exe";
Game.SteamID = "729040";
Game.GUID = "Borderlands GOTY Enhanced";
Game.GameName = "Borderlands GOTY Enhanced";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Binaries\\Win64";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Borderlands® Game of the Year Edition";
Game.HasDynamicWindowTitle = true;
Game.SetForegroundWindowElsewhere = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HideCursor = false;
Game.DocumentsSavePath = "My Games\\Borderlands Game of the Year\\Binaries\\SaveData";
Game.DocumentsConfigPath = "My Games\\Borderlands Game of the Year\\WillowGame\\Config";
Game.DocumentsSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = false;
Game.Description =
  "Start a public game in one instance, once in-game join in the other instances via quick play or the lobby browser. If you use keyboards/mice after the instances finish setting up press the END key once to lock the input for all instances to have their own cursor. Press the END key again to unlock the input, you can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenProcessGrab = 10;
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
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;

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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = " -WindowedFullscreen -AlwaysFocus -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height;

  var savePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\WillowEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", "False"),
    new Nucleus.IniSaveInfo("SystemSettings", "DisableIntroMovies", "True"),
    new Nucleus.IniSaveInfo("SystemSettings", "WindowMode", "2"),
    new Nucleus.IniSaveInfo("SystemSettings", "MuteAudioOnFocusLost", "False"),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", "FALSE"),
    new Nucleus.IniSaveInfo("Engine.Engine", "bMuteOnLossOfFocus", "FALSE"),
    new Nucleus.IniSaveInfo("WillowGame.WillowGameEngine", "bPauseLostFocusWindowed", "FALSE")
  ]);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
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

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 10000, true, true, false, false, false);
    }
  };
};