Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Sep 19 2025 08:55:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "xSdHTj4q8oRDocdD2";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Ikki Unite_Data"];
Game.DirSymlinkExclusions = ["Ikki Unite_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["baselib.dll", "GameAssembly.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Ikki Unite.exe";
Game.SteamID = "2061150";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Ikki Unite";
Game.GameName = "Ikki Unite";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Ikki Unite";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.UseDInputBlocker = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\2061150";
Game.UserProfileConfigPath = "AppData\\LocalLow\\SUNSOFT";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Create a multiplayer room in one instance and join in the others using the room ID code, you can click on copy room ID with your main mouse cursor and paste the ID in the other instances to join. If you use keyboards/mice after the instances open press the END key once to lock the input for all instances to have their own working cursor. Press the END key again to unlock the input when you finish playing.";
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow" + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ikki Unite_Data\\globalgamemanagers";
  var base = Context.Nickname;
  var og_Path = "Ikki Unite";
  //Create newPath by rearranging characters from base
  var newPath = og_Path.substring(0, og_Path.length - 3) + base.charAt(0) + base.charAt(base.length - 1) + base.length;

  //Ensure newPath is at least as long as og_Path
  if (newPath.length < og_Path.length) {
    while (newPath.length < og_Path.length) {
      newPath += base.charAt(base.length - 1);
    }
  } else if (og_Path.length < newPath.length) {
    //Ensure og_Path is at least 3 characters long
    newPath = newPath.substring(0, og_Path.length);
  }
  Context.PatchFile(fillPath, fillPath, og_Path, newPath);

  var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Ikki Unite_Data\\app.info";
  Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\SUNSOFT\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\SUNSOFT\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\SUNSOFT\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\SUNSOFT\\" + newPath, "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\SUNSOFT\\" + newPath, "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\SUNSOFT\\" + newPath, "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);

  if (!System.IO.File.Exists(Context.NucleusUserRoot + "\\AppData\\LocalLow\\SUNSOFT\\" + newPath + "\\config.json")) {
    var filePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\SUNSOFT\\" + newPath;
    System.IO.Directory.CreateDirectory(filePath);

    var jsonPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\SUNSOFT\\" + newPath + "\\config.json";
    var params = [
      '{"_resolutions":[{"x":1280,"y":720},{"x":1920,"y":1080},{"x":2560,"y":1440},{"x":3840,"y":2160},{"x":2560,"y":1080},{"x":3840,"y":1600},{"x":3440,"y":1440},{"x":5120,"y":2160}],"_general":{"_showPing":true},"_display":{"_screenMode":0,"_resolution":0,"_vSync":false},"_audio":{"_masterVolume":50,"_bgmVolume":100,"_seVolume":100},"_isDisplayDirty":false,"_isAudioDirty":false}'
    ];
    Context.WriteTextFile(jsonPath, params);
  }

  var txtPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\SUNSOFT\\" + newPath + "\\config.json";
  var dict = ['1|"x"|"x":' + Context.Width + ',"y":' + Context.Height + '},{"x"'];
  Context.ReplacePartialLinesInTextFile(txtPath, dict);

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

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

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

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

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
    player.ProtoController13 = Context.GamepadId;
    player.ProtoController14 = Context.GamepadId;
    player.ProtoController15 = Context.GamepadId;
    player.ProtoController16 = Context.GamepadId;
    player.ProtoController17 = Context.GamepadId;
  }
};