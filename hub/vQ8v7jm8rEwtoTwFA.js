Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Sun Oct 04 2026 18:02:35 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vQ8v7jm8rEwtoTwFA";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw64.dll"];
Game.KillMutex = [
  //"DarkSoulsMutex",
  "f1544079" //f1544079-4eb9-4a26-abb4-5b1d7bd9de35
];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["SeamlessCoop\\crashdumps\\attachments", "SeamlessCoop\\crashdumps\\reports", "SeamlessCoop\\crashpad", "SeamlessCoop\\locale", "dllMods"];
Game.FileSymlinkExclusions = [
  "steam_appid.txt",
  "steam_interfaces.txt",
  "steamclient64.dll",
  "steamclient.dll",
  "steamclient_loader.exe",
  "steamclient_loader_x64.exe",
  "coldloader.dll",
  "dxgi.dll",
  "ReShade.ini",
  "winmm.dll",
  "dlllist.txt",
  "xinput1_3.dll",
  "xinput1_4.dll",
  "xinput9_1_0.dll"
];
Game.FileSymlinkCopyInstead = [
  "steam_api64.dll",
  "binkw64.dll",
  "fmod_event_net64.dll",
  "fmod_event64.dll",
  "fmodex64.dll",
  "ds1sc_launcher.exe",
  "ds1sc.dll",
  "ds1sc_settings.ini",
  "english.json",
  "crashpad_handler.exe",
  "PaintedWorlds.dll",
  "dinput8.dll",
  "discord_game_sdk.dll",
  "lazyLoad.ini"
];
Game.PartialMutexSearch = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DarkSoulsRemastered.exe";
Game.SteamID = "570940";
Game.GUID = "DARK SOULS REMASTERED";
Game.GameName = "DARK SOULS: REMASTERED";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.LauncherExe = "ds1sc_launcher.exe";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DARK SOULS™: REMASTERED";
Game.IgnoreWindowBorderCheck = true;
Game.HookFocus = false;
Game.ResetWindows = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\FromSoftware\\NBGI\\DarkSouls";
Game.DocumentsSavePath = "NBGI\\DARK SOULS REMASTERED";
Game.Description =
  "IMPORTANT: CLOSE Steam completely before running this. Requires the latest [Seamless Co-op mod]{https://www.nexusmods.com/darksoulsremastered/mods/899} correctly installed in your main clean game files. To connect the instances rest at a bonfire to get the co-op items then use the blessed eye orb to host in one instance and use the crystal eye orb in the other instances to join. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. To avoid stretching and resizing issues in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x600, 1920x600 etc.) so the game can see and use them (the game does not see below 600 res), get past the title screen where it says to press any button so the game resizes to its settings res. If your gamepads stop working after a while, alt-tab to a window that has top most enabled to fix them like task manager or process explorer or restart your PC.";
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
Game.ProtoInput.FocusHooks = true;
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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1")]);

  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends013",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\steam_appid.txt";
  var lines = ["570940"];
  Context.WriteTextFile(appid, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamclient64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\coldloader.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "coldloader.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var dlllist = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dlllist.txt";
  var lines = ["coldloader.dll"];
  Context.WriteTextFile(dlllist, lines);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  var screenreswidth = Context.Width;
  var screenresheight = Context.Height;

  if (screenreswidth == 1920 && screenresheight == 540) {
    //1080p Horizontal

    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1"),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Width", Context.Width),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Height", Context.Height + 60)
    ]);
  } else if (screenreswidth == 960 && screenresheight == 1080) {
    //1080p vertical

    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1"),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Width", Context.Width),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Height", Context.Height)
    ]);
  } else if (screenreswidth == 960 && screenresheight == 540) {
    //1080p 1/4

    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1"),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Width", Context.Width),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Height", Context.Height + 60)
    ]);
  } else if (screenreswidth == 1280 && screenresheight == 360) {
    //720p horizontal

    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1")]);
  } else if (screenreswidth == 640 && screenresheight == 720) {
    //720p vertical

    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1")]);
  } else if (screenreswidth == 640 && screenresheight == 360) {
    //720p 1/4

    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1")]);
  } else {
    var videoconfig = Context.NucleusUserRoot + "\\AppData\\Local\\FromSoftware\\NBGI\\DarkSouls\\DarkSouls.ini";
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DisplaySetting", "WindowMode", "1"),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Width", Context.Width),
      new Nucleus.IniSaveInfo("DisplaySettingWindow", "Height", Context.Height)
    ]);
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
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

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

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};