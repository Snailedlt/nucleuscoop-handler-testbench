Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Sat Mar 15 2025 02:06:29 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "oaJFWFvNvPG6kfgqc";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["GTFO_Data"];
Game.DirExclusions = ["BepInEx", "dotnet", "LFix"];
Game.DirSymlinkExclusions = [
  "GTFO_Data\\Plugins\\x86_64"
  //"BepInEx\\config",
  //"BepInEx\\core",
  //"BepInEx\\interop",
  //"BepInEx\\plugins",
  //"BepInEx\\unity-libs",
  //"dotnet",
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "Custom.dll", "dlllist.txt", "winmm.dll", "doorstop_config.ini", "winhttp.dll"];
Game.FileSymlinkCopyInstead = ["GameAssembly.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers"];
Game.GameName = "GTFO";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "GTFO.exe";
Game.SteamID = "493520";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "GTFO";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "BepinEx";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "GTFO";
Game.SetWindowHook = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\LocalLow\\10 Chambers Collective\\GTFO";
Game.Description =
  "IMPORTANT: Make sure you have a clean install of this game without any mods before running this, also make sure you have the LAN Fix files linked here in the correct folder: https://hub.splitscreen.me/handler/oaJFWFvNvPG6kfgqc. On first launch the instances will take a while to open because BepinEx will apply the LAN fix. After an instance fully opens select the GTFO process in Nucleus process picker window, alt-tab to the process picker window if you can not move your cursor to select the process. To connect the instances host a lobby in an instance, remove the bots if there are any, select +invite and invite the other players, they will auto join your lobby, you can also invite via the overlay, alt-tab to or click on a game window and open the invite overlay with left shift+tab, right click the other players and select invite, if the overlay does not show make sure you disable any external overlays that could be interfering. Reduce graphics in your main game to improve performance. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenProcessGrab = 35;
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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
//Game.ProtoInput.BlockedMessages = [0x0008, 0x02A3, 0x02A1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  var txtPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\10 Chambers Collective\\GTFO\\GTFO_Settings.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '        "x":', Nucleus.SearchType.StartsWith) + '|        "x": ' + Context.Width + ".0,",
    Context.FindLineNumberInTextFile(txtPath, '        "y":', Nucleus.SearchType.StartsWith) + '|        "y": ' + Context.Height + ".0,",
    Context.FindLineNumberInTextFile(txtPath, '    "FullScreen": {', Nucleus.SearchType.StartsWith) + 1 + '|      "Value": 3'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\10 Chambers Collective\\GTFO", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\10 Chambers Collective\\GTFO", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\10 Chambers Collective\\GTFO", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\10 Chambers Collective\\GTFO", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GTFO_Data\\Plugins\\x86_64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GTFO_Data\\Plugins\\x86_64\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "LFix\\steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var invite = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GTFO_Data\\Plugins\\x86_64\\steam_settings\\auto_accept_invite.txt";
  var lines = [""];
  Context.WriteTextFile(invite, lines);

  var nowar = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\GTFO_Data\\Plugins\\x86_64\\steam_settings\\disable_overlay_warning_any.txt";
  var lines = [""];
  Context.WriteTextFile(nowar, lines);

  if (!System.IO.File.Exists(Context.NucleusUserRoot + "\\AppData\\LocalLow\\GTFO_TheArchive\\SaveData\\OtherConfigs\\EnabledFeatures.json")) {
    var filePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\GTFO_TheArchive\\SaveData\\FeatureSettings";
    System.IO.Directory.CreateDirectory(filePath);

    var filePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\GTFO_TheArchive\\SaveData\\OtherConfigs";
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\GTFO_TheArchive\\SaveData\\FeatureSettings\\LocalProgressionController_Settings_LocalProgressionSettings.json";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "LFix\\LocalProgressionController_Settings_LocalProgressionSettings.json");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\GTFO_TheArchive\\SaveData\\OtherConfigs\\EnabledFeatures.json";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "LFix\\EnabledFeatures.json");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\GTFO_TheArchive\\discord_game_sdk.dll";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "LFix\\discord_game_sdk.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\LFix\\EnabledFeatures.json")) {
    Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

    Context.Wait(2000);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BepInEx\\config\\BepInEx.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "## Enables showing a console", Nucleus.SearchType.StartsWith) + 3 + "|Enabled = false"];
    Context.ReplaceLinesInTextFile(txtPath, dict, "UTF-8");

    Game.ForceProcessPick = true;
  } else {
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
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
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

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, false, false, false);

      System.Threading.Thread.Sleep(200);

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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
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

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  };
};