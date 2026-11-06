Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Jan 30 2023 10:04:14 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "kKksuxubTSdagDYhh";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["DungeonoftheEndless_Data"];
Game.DirSymlinkExclusions = ["DungeonoftheEndless_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "steam_api_dotnetwrapper.dll", "Registry.xml", "output_log.txt"];
Game.GameName = "Dungeon of the ENDLESS";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "DungeonoftheEndless.exe";
Game.SteamID = "249050";
Game.GUID = "Dungeon of the Endless";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.GoldbergExperimentalSteamClient = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dungeon of the Endless";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "Documents\\Dungeon of the Endless\\Users";
Game.Description =
  "IMPORTANT: Close Steam completely before running this. Only working with multiple keyboards/mice and just ONE gamepad instance because of Unity bad default input controller support. Host a multiplayer game in the SECOND instance and join in the others otherwise the game won't start. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

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
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ColdClientLoader.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("SteamClient", "ExeCommandLine", Args)]);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\AMPLITUDE Studios\\Dungeon of the Endless", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\AMPLITUDE Studios\\Dungeon of the Endless", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\AMPLITUDE Studios\\Dungeon of the Endless", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var path = Context.PlayerID;

  if (!System.IO.File.Exists(Context.GetFolder[Nucleus.Folder.Documents] + "Dungeon of the Endless\\Users\\106285971" + path + "\\Registry.xml")) {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Dungeon of the Endless\\Users\\106285971" + path);
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Dungeon of the Endless\\Users\\106285971" + path + "\\Registry.xml");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Registry.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
  }

  if (Context.IsKeyboardPlayer) {
    var path = "%USERPROFILE%\\Documents\\Dungeon of the Endless\\Users\\106285971" + path + "\\Registry.xml";
    Context.ChangeXmlNodeInnerTextValue(path, "//Fullscreen", "False");
    Context.ChangeXmlNodeInnerTextValue(path, "//Width", Context.Width);
    Context.ChangeXmlNodeInnerTextValue(path, "//Height", Context.Height);
    Context.ChangeXmlNodeInnerTextValue(path, "//Mode", "NoBorders");
    Context.ChangeXmlNodeInnerTextValue(path, "//EnableXBoxController", "False");
  } else {
    var path = "%USERPROFILE%\\Documents\\Dungeon of the Endless\\Users\\106285971" + path + "\\Registry.xml";
    Context.ChangeXmlNodeInnerTextValue(path, "//Fullscreen", "False");
    Context.ChangeXmlNodeInnerTextValue(path, "//Width", Context.Width);
    Context.ChangeXmlNodeInnerTextValue(path, "//Height", Context.Height);
    Context.ChangeXmlNodeInnerTextValue(path, "//Mode", "NoBorders");
    Context.ChangeXmlNodeInnerTextValue(path, "//EnableXBoxController", "True");
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient015",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);
};