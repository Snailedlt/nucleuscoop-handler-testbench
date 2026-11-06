Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Apr 07 2022 00:29:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "H5X6mgpJN6bSpwPiy";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var listMaps1 = ["mp_8_cliffside", "mp_8_operations", "mp_16_conversion", "mp_16_drillstation"];
var listMaps2 = ["mp_8_operations", "mp_8_cliffside", "mp_16_conversion", "mp_16_drillstation"];
var listMaps3 = ["mp_16_conversion", "mp_8_cliffside", "mp_8_operations", "mp_16_drillstation"];
var listMaps4 = ["mp_16_drillstation", "mp_8_cliffside", "mp_8_operations", "mp_16_conversion"];
var gamemode = ["DM", "TDM"];
var friendf = ["0", "1"];
var time = ["10", "20", "30", "40", "50", "5"];
var score = ["20", "30", "40", "10", "0"];
var window = ["No", "Yes"];
Game.AddOption("Game mode", "Select between Death Match and Team Death Match.", "Mode", gamemode);
Game.AddOption("Friendly fire", "Select 1 to enable it.", "FFire", friendf);
Game.AddOption("Time", "Select the max time of the round in minutes.", "Minutes", time);
Game.AddOption("Score", "Select the number of kills goal. Select 0 to disable.", "Kills", score);
Game.AddOption("Round 1 Map", "Select the multiplayer map the game will use.", "Map1", listMaps1);
Game.AddOption("Round 2 Map", "Select the multiplayer map the game will use.", "Map2", listMaps2);
Game.AddOption("Round 3 Map", "Select the multiplayer map the game will use.", "Map3", listMaps3);
Game.AddOption("Round 4 Map", "Select the multiplayer map the game will use.", "Map4", listMaps4);
Game.AddOption(
  "Windowed mode",
  "There is resizing issues when using the game regular windowed mode, only use it if the default no borders fake windowed mode is not working for you.",
  "Windowed",
  window
);

Game.ExecutableContext = ["binkw32.dll"];
Game.DirSymlinkExclusions = ["Binaries\\Win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "d3d9.dll", "xinput1_3.dll"];
Game.GameName = "Alien Rage - Unlimited";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "ARageMP.exe";
Game.SteamID = "217920";
Game.GUID = "Alien Rage Unlimited";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "Binaries\\Win32";
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ALIEN RAGE MULTIPLAYER";
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\My Games\\AlienRage\\Multiplayer\\ARageMPGame\\SaveData";
Game.UserProfileConfigPath = "Documents\\My Games\\AlienRage\\Multiplayer\\ARageMPGame\\Config";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: Join to the server using the server browser until all instances have finished setting up, you should see the server cmd window running in the background. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Reduce in-game graphics to improve performance, alt-tab to the Nucleus window to improve fps.";
Game.PauseBetweenProcessGrab = 3;
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
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var mode = Context.Options["Mode"];
  var ffire = Context.Options["FFire"];
  var minutes = Context.Options["Minutes"];
  var kills = Context.Options["Kills"];
  var map1 = Context.Options["Map1"];
  var map2 = Context.Options["Map2"];
  var map3 = Context.Options["Map3"];
  var map4 = Context.Options["Map4"];
  var windowed = Context.Options["Windowed"];

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\server.bat";
  var lines = [
    "START ARageMP.exe server ?maxplayers=16?timelimit=" +
      minutes +
      "?goalscore=" +
      kills +
      "?friendlyfire=" +
      ffire +
      "?mapcycle=4?map1=" +
      map1 +
      "?game1=" +
      mode +
      "?map2=" +
      map2 +
      "?game2=" +
      mode +
      "?map3=" +
      map3 +
      "?game3=" +
      mode +
      "?map4=" +
      map4 +
      "?game4=" +
      mode +
      '?serverdescription="Nucleus Co-op"'
  ];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["2|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\server.bat"], false, 1, false, false);

  if (windowed == "No") {
    System.IO.File.Copy(Context.NucleusFolder + "\\utils\\DirectXWrapper\\d3d9.dll", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\d3d9.dll", true);

    if (Context.IsKeyboardPlayer) {
      Game.ProtoInput.KeyboardButtonFilter = true;

      Context.StartArguments = "-fullscreen -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
    } else {
      Game.ProtoInput.KeyboardButtonFilter = false;

      Context.StartArguments = "-fullscreen -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
    }
  }

  if (windowed == "Yes") {
    if (Context.IsKeyboardPlayer) {
      Game.ProtoInput.KeyboardButtonFilter = true;

      Context.StartArguments = "-windowed -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
    } else {
      Game.ProtoInput.KeyboardButtonFilter = false;

      Context.StartArguments = "-windowed -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
    }
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends011",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION006",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);
};