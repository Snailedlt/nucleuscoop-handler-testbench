Hub.Handler.Version = 11; // Released at https://hub.splitscreen.me/ on Sun Oct 04 2026 20:36:40 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "8ToryPKXFmff7D8h7";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
Game.AddOption(
  "Custom resolutions fix?",
  "Matches resolution to window size to fix stretching in split-screen, lower your monitor scale % or set it to 100% if it is not working for you.",
  "Fix",
  answers1
);
Game.AddOption("Alternative focus hooks?", "ONLY try if the instances freeze or you can not control them with their respective controller.", "Fhook", answers2);

Game.ExecutableContext = ["binkw64.dll"];
Game.KillMutex = ["DarkSoulsIIIMutex"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["Game", "SeamlessCoop\\crashdumps\\attachments", "SeamlessCoop\\crashdumps\\reports", "SeamlessCoop\\crashpad", "SeamlessCoop\\locale", "dllMods"];
Game.FileSymlinkExclusions = [
  "steam_appid.txt",
  "steam_interfaces.txt",
  "steamclient64.dll",
  "steamclient.dll",
  "steamclient_loader_x64.exe",
  "coldloader.dll",
  "dxgi.dll",
  "StubDRM64.dll",
  "winmm.dll",
  "dlllist.txt",
  "metadata",
  "settings.dat",
  "xinput1_3.dll"
];
Game.FileSymlinkCopyInstead = [
  "steam_api64.dll",
  "binkw64.dll",
  "Data0.bdt",
  "Data0.bhd",
  "Data1.bhd",
  "Data2.bhd",
  "Data3.bhd",
  "Data4.bhd",
  "Data5.bhd",
  "DLC1.bhd",
  "DLC2.bhd",
  "fmod_event64.dll",
  "fmodex64.dll",
  "ds3sc_launcher.exe",
  "ds3sc.dll",
  "ds3sc_settings.ini",
  "english.json",
  "crashpad_handler.exe",
  "PaintedWorlds.dll",
  "dinput8.dll",
  "discord_game_sdk.dll",
  "lazyLoad.ini",
  "SoulsUnsqueezed.ini",
  "dxgi.ini"
];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DarkSoulsIII.exe";
Game.SteamID = "374320";
Game.GUID = "DARK SOULS III";
Game.GameName = "DARK SOULS III";
Game.LauncherExe = "ds3sc_launcher.exe";
Game.SteamlessPatch = ["false", "--quiet --keepbind", "8000"];
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DARK SOULS III";
Game.IgnoreWindowBorderCheck = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\DarkSoulsIII";
Game.Description =
  "IMPORTANT: CLOSE Steam completely before running this. Requires the latest [Seamless Co-op mod]{https://www.nexusmods.com/darksouls3/mods/1895} correctly installed in your main clean game files. To connect the instances rest at a bonfire to get the co-op items then use the crystalline pendant to host in one instance and use the stone pendant in the other instances to join. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenContextAndLaunch = 3;
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
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
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
  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");

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
  var lines = ["374320"];
  Context.WriteTextFile(appid, lines);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  var xml = Context.NucleusUserRoot + "\\AppData\\Roaming\\DarkSoulsIII\\GraphicsConfig.xml";

  if (System.IO.File.Exists(xml)) {
    System.IO.File.SetAttributes(xml, System.IO.File.GetAttributes(xml) & ~System.IO.FileAttributes.ReadOnly);
  }

  var fix = Context.Options["Fix"];
  var fhook = Context.Options["Fhook"];

  if (fix == "Yes") {
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DarkSoulsIII.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DarkSoulsIII.exe"),
      "03 00 00 80 07",
      Context.Width,
      4,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DarkSoulsIII.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "DarkSoulsIII.exe"),
      "38 04 00 00 00 08",
      Context.Height,
      1,
      true
    );

    var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\DarkSoulsIII\\GraphicsConfig.xml";
    Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
    //Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenWidth", "1920");
    //Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenHeight", "1080");
    Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenWidth", Context.Width);
    Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenHeight", Context.Height);
  }

  if (fix == "No") {
    if (Player.Owner.IsFullscreen()) {
      var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\DarkSoulsIII\\GraphicsConfig.xml";
      Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
      Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenWidth", Context.Width);
      Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenHeight", Context.Height);
    } else {
      var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\DarkSoulsIII\\GraphicsConfig.xml";
      Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
    }
  }

  if (fhook == "Yes") {
    Game.HookFocus = true;
    Game.ProtoInput.FocusHooks = false;
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

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      //ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
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