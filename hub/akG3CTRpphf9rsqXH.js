Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Fri Nov 05 2021 09:09:19 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "akG3CTRpphf9rsqXH";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.DirSymlinkExclusions = ["Binaries\\Win32", "PecanGame\\Config"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["DefaultEngine.ini"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SteamID = "49540";
Game.GUID = "Aliens Colonial Marines";
Game.GameName = "Aliens: Colonial Marines";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.LauncherTitle = "";
Game.ExecutableName = "ACM.exe";
Game.BinariesFolder = "Binaries\\Win32";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Aliens: Colonial Marines - PC";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\My Games\\Aliens Colonial Marines\\PecanGame\\Config";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\49540";
Game.Description =
  "If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. To connect the instances in co-op campaign select advanced settings, choose LAN in network mode and create game, create one then the others can join by following the same steps and selecting find game instead.";
Game.PauseBetweenStarts = 35;

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

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\PecanEngine.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("SystemSettings", "WindowedFullscreen", Context.IsFullscreen),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("PecanGame.PecanGameEngine", "bPauseLostFocusWindowed", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bMuteAudioWhenNotInFocus", false),
    new Nucleus.IniSaveInfo("PecanGame.PecanGameEngine", "bMuteAudioWhenNotInFocus", false),
    new Nucleus.IniSaveInfo("FullScreenMovie", "bForceNoMovies", false),
    new Nucleus.IniSaveInfo("Core.System", "bForceNoMovies", false)
  ]);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\PecanGame\\Config\\DefaultEngine.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "+ClassRemapping=PecanGAme.PecanSeqAct_AttachXenoToTether", Nucleus.SearchType.StartsWith) +
      "|+ClassRemapping=PecanGAme.PecanSeqAct_AttachXenoToTether -> PecanGame.PecanSeqAct_AttachPawnToTether"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\PecanEngine.ini")) {
  } else {
    var iniPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\PecanEngine.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "ClassRemapping=PecanGAme.PecanSeqAct_AttachXenoToTether", Nucleus.SearchType.StartsWith) +
        "|ClassRemapping=PecanGAme.PecanSeqAct_AttachXenoToTether -> PecanGame.PecanSeqAct_AttachPawnToTether"
    ];
    Context.ReplaceLinesInTextFile(iniPath, dict);
  }

  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-windowed -AlwaysFocus -nosplash -nomoviestartup -NoController" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
  } else {
    Context.StartArguments = "-windowed -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\win32\\steam_interfaces.txt";
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
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION002"
  ];
  Context.WriteTextFile(interfaces, lines);
};