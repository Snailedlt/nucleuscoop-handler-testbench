Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Nov 08 2021 04:38:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "G2H3AJ6sfrZfFghmu";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["cg.dll"];
Game.DirSymlinkExclusions = ["binaries\\steam_settings"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "stats.txt", "start.bat"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "showdown.exe";
Game.SteamID = "204080";
Game.GUID = "The Showdown Effect";
Game.GameName = "The Showdown Effect";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "binaries";
Game.LauncherTitle = "";
Game.LauncherExe = "binaries\\start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "The Showdown Effect";
Game.HookFocus = false;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\204080";
Game.UserProfileConfigPath = "AppData\\Roaming\\Arrowhead\\TheShowdownEffect";
Game.Description =
  "Multiple keyboards and mice only as the game lacks native gamepad support. After all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Create a public custom match in one instance and join in the others. So the instances launch and resize correctly make sure you run your main game at least once first and change some graphic settings.";
Game.KeepSymLinkOnExit = false;
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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;

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
  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\start.bat";
  var lines = ["cd ..\\contents", 'start ..\\binaries\\showdown.exe -bundle-dir "." -ini settings -window-title "The Showdown Effect"'];
  Context.WriteTextFile(Bat, lines);

  if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\user_settings.config")) {
    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\user_settings.config";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "aspect_ratio =", Nucleus.SearchType.StartsWith) + "|aspect_ratio = -1",
      Context.FindLineNumberInTextFile(txtPath, "fullscreen =", Nucleus.SearchType.StartsWith) + "|fullscreen = false",
      Context.FindLineNumberInTextFile(txtPath, "popup_window =", Nucleus.SearchType.StartsWith) + "|popup_window = false"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var stats = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\steam_settings\\stats.txt";
  var lines = [
    "lifetime_experience=int=0",
    "experience=int=0",
    "im_not_a_part_of_this_system_progress=int=0",
    "rounds_fired=int=0",
    "rounds_hit=int=0",
    "machinegun_hits=int=0",
    "showdown_kills=int=0",
    "showdown_deaths=int=0",
    "showdown_wins=int=0",
    "showdown_losses=int=0",
    "showdown_playtime=int=0",
    "kills_pistol=int=0",
    "gunslinger_progress=int=0",
    "hobo_progress=int=0",
    "are_you_crazy_progress=int=0",
    "commando_progress=int=0",
    "soldier_progress=int=0",
    "holy_diver_progress=int=0",
    "showdown_total_score=int=0",
    "showdown_times_last_man_standing=int=0",
    "showdown_played_matches=int=0",
    "showdown_rating=int=0"
  ];
  Context.WriteTextFile(stats, lines);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\steam_interfaces.txt";
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
    "STEAMREMOTESTORAGE_INTERFACE_VERSION008",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);
};