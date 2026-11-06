Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Jan 16 2022 14:52:32 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "3WFfzAJaMTLXMaysX";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

Game.ExecutableContext = ["civilians.pc"];
Game.KillMutex = ["BabelAppInstanceMutex"];
Game.DirSymlinkExclusions = ["videos", "settings"];
Game.FileSymlinkExclusions = ["steam_interfaces.txt", "steam_appid.txt", "SegaLogo.ogv", "SegaLogoLow.ogv"];
Game.FileSymlinkCopyInstead = ["appconfig.ini"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "HOTD_NG.exe";
Game.SteamID = "246580";
Game.GUID = "Typing of The Dead Overkill";
Game.GameName = "The Typing of The Dead: Overkill";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "fullscreen=0"; //disable-post-processing
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Typing of the Dead Overkill";
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.KeepMonitorAspectRatio = true;
Game.SetForegroundWindowElsewhere = true;
Game.HideDesktop = true;
Game.ResetWindows = false;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Sega\\Typing of the Dead Overkill";
Game.Description =
  "IMPORTANT: Run your main game outside of Nucleus first and set the in-game res to 960x540 if you have a 1920x1080 monitor and will play in split-screen, if you'll use multiple monitors select your monitor res. Make sure to wait until an instance loses borders before pressing the Nucleus prompt to open the next instance/apply hooks for the instances to resize correctly. In both instances select multiplayer-search for online players to connect them. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Only The House of the Dead Overkill multiplayer is playable with multiple gamepads, change to House of the Dead Overkill in the main menu. If you use multiple monitors and see white artifacts press CTRL+T twice to refresh the windows.";
Game.KeepSymLinkOnExit = true;
Game.PromptBetweenInstances = true;
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
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.AutoHideTaskbar = true;

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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.PlayerID + 1)
    ]);
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends013",
    "SteamUtils006",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION011",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);
};