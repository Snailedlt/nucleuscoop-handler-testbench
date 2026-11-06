Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Dec 25 2025 01:54:07 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "euYKG4PmbAfgugndv";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["LP2DX9", "LP2DX11"];
var answers2 = ["Yes", "No"];
Game.AddOption(
  "Lost Planet 2 exe",
  "Select the game's exe to use. The DirectX 11 exe windows borders remain as it has an issue that if you remove the borders the game goes exclusive fullscreen.",
  "API",
  answers1
);
Game.AddOption("D3D9 wrapper?", "Fixes borders removal for the LP2DX9 exe. Certain versions of LP2 do not need it (like version 10000285).", "D3D9", answers2);

Game.ExecutableContext = ["nativePC"];
Game.KillMutex = [
  "Type:Mutant|sPlanetMain"
  //"Type:Event|XLive-S-1-5-21-4218820312-1937273298-907694023-1001-2",
  //"Type:Event|XLive-S-1-5-21-4218820312-1937273298-907694023-1001",
];
/*Game.KillMutexLauncher = [
    "CAP_LP2_LAUNCHER",
];*/
Game.DirExclusions = ["XLiveLessNess"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xlive.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["LP2DX11.exe", "Launcher.exe", "LP2DX9.exe.cfg", "LP2DX11.exe.cfg", "d3d9.dll", "dinput8.dll"];
Game.NeedsSteamEmulation = false;
//Game.SteamlessPatch = ["true", "--quiet --keepbind", "2500"];
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "LP2DX9.exe";
Game.SteamID = "45750";
Game.GUID = "Lost Planet 2";
Game.GameName = "Lost Planet 2";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "XLLN #1 v1.5.1.1";
//Game.LauncherExe = "Launcher.exe";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Lost Planet2 Ver 1.100 for DX9";
Game.HasDynamicWindowTitle = true;
Game.UseDirectX9Wrapper = false;
Game.ResetWindows = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\CAPCOM\\LOST PLANET 2";
//Game.UserProfileConfigPath = "AppData\\Local\\XLiveLessNess";
Game.Description =
  "IMPORTANT: Make sure the game launches and works correctly in your PC before using this, tested using the latest clean Steam version. Create a campaign co-op game in one instance (connection type GFWL) and join in the others using quick match or custom match. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. To avoid stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Connecting the instances in the same PC is only possible thanks to the great work of the [XLiveLessNess]{https://gitlab.com/GlitchyScripts/xlivelessness} dev.";
Game.ForceProcessPick = false;
Game.PromptBetweenInstances = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 2;
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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
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
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  var VideoConfig = Context.NucleusUserRoot + "\\Documents\\CAPCOM\\LOST PLANET 2\\config.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("DISPLAY", "FullScreen", "OFF")
  ]);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Classes\\SOFTWARE\\Microsoft\\XLive", "PCID", "15546641655277177110", Nucleus.RegType.QWord);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xlive.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xlive.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Context.CopyFolder(Context.ScriptFolder + "\\XLiveLessNess", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XLiveLessNess");

  var number = Context.PlayerID + 1;
  var port = Context.PlayerID + 20;
  var VideoConfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XLiveLessNess\\xlln-config-" + number + ".ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_base_port", port + "00"),
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_base_port_broadcast_spacing", " 2000,100,4000"),
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_xhv_engine_enabled", 0),
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_username_p1", Context.Nickname),
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_user_live_enabled_p1", 1),
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_user_online_enabled_p1", 1),
    new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_user_auto_login_p1", 1)
  ]);

  if (Context.IsKeyboardPlayer) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Context.NumControllers < 5) {
    //><

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Vibration", "EnableTriggerVibration", true)]);
  } else {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");

    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }

  var api = Context.Options["API"];
  var d3d9 = Context.Options["D3D9"];

  if (api == "LP2DX9") {
    //Context.PatchFileFindPattern(System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), 'LP2DX9.exe'), System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), 'LP2DX9.exe'),"DB 83 C4 04 3B C3 7D","DB 83 C4 04 3B C3 EB",true);
  }

  if (api == "LP2DX11") {
    Game.ExecutableToLaunch = "LP2DX11.exe";

    Game.ExecutableName = "LP2DX11.exe";

    Game.DontRemoveBorders = true;
  }

  if (d3d9 == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
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

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, true);

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

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  };
};