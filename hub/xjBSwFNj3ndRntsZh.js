Hub.Handler.Version = 30; // Released at https://hub.splitscreen.me/ on Sat Sep 27 2025 23:23:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "xjBSwFNj3ndRntsZh";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
Game.AddOption("Unlock all?", "Unlocks all armors, skins, emblems and nameplates.", "Unlock", answers1);
Game.AddOption(
  "Alpha Ring native split-screen?",
  "Only select Yes if you have the Alpha Ring mod in your main game files alongside the main exe and if you want to use the 4 players max native split-screen per instance, drag 2 to 4 gamepad icons to each instance in Nucleus UI before using this. Before starting a game add the native split-screen players using the mod overlay, assign the gamepads (you can disable the keyboard being forced to the first player in the options), click on enable and close the mod overlay with F4.",
  "Native",
  answers2
);

Game.KillMutex = ["Chelankenstein"];
Game.DirSymlinkExclusions = ["Data\\UI", "halo1\\shaders", "halo2", "MCC\\Content\\Movies", "MCC\\Binaries\\Win64\\steam_settings\\load_dlls"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "local_save.txt", "xlive64.dll", "xinput1_3.dll", "FMS_logo_343_7_1_.bk2", "FMS_logo_microsoft_7_1_.bk2"];
Game.FileSymlinkCopyInstead = [
  "gametiplist.xml",
  "playercustomization.xml",
  "scoredb.xml",
  "texturepacks.xml",
  "unlockdb.xml",
  "fmod_event_net64.dll",
  "fmodex64.dll",
  "game.cfg",
  "halo1.dll",
  "user.cfg",
  "fx.bin",
  "psh.bin",
  "vsh.bin",
  "app.config",
  "d3dcompiler_47.dll",
  "SC_DLL.dll",
  "SwitchSandbox.cmd",
  "halo2.dll",
  "MOPP.dll",
  "mss64.dll",
  "mss64dsp.flt",
  "bink2w64.dll",
  "cell_release_x64_4_0.dll",
  "debug.log",
  "EOSSDK-Win64-Shipping.dll",
  "halonetworklayer_ship.dll",
  "liblz4.dll",
  "PartyWin.dll",
  "PartyWin7.dll",
  "simplenetworklibrary-x64-release.dll",
  "xaudio2_9redist.dll",
  "xforgelibrary_release.dll",
  "WTSAPI32.dll"
];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.HardlinkGame = false;
Game.ExecutableName = "MCC-Win64-Shipping.exe";
Game.SteamID = "976730";
Game.GUID = "Halo MCC";
Game.GameName = "Halo: The Master Chief Collection";
Game.BinariesFolder = "MCC\\Binaries\\Win64";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.PlayersPerInstance = 4;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Halo: The Master Chief Collection";
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UseForceBindIP = true;
Game.ForceBindIPNoDummy = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\976730\\remote";
Game.UserProfileConfigPath = "AppData\\LocalLow\\MCC";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: Do not place Nucleus inside the game files. Change network type to LAN in the game settings for all instances, then press X on your gamepad or click the roster icon to join the other players. If you are using keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. If you get stretching in Halo 4 try locking the input until you are in-game.";
Game.KeepSymLinkOnExit = false;
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
Game.ProtoInput.FindWindowHook = false;

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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash -no-eac" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\steam_settings\\load_dlls");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\steam_settings\\DLC.txt";
  var lines = [
    "1109621=MCC - Reach: Extended Language Pack",
    "1109620=MCC - H4: Extended Language Pack",
    "1108763=MCC - ODST: Extended Language Pack",
    "1108762=MCC - H3: Extended Language Pack",
    "1108761=MCC - H2: Extended Language Pack",
    "1108760=MCC - H1: Extended Language Pack",
    "1097224=MCC - Reach (Content Pack 2)",
    "1097223=MCC - H2: Multiplayer",
    "1097222=MCC - H3: Multiplayer",
    "1097220=MCC - H4: Multiplayer",
    "1080080=MCC - H1: Multiplayer",
    "1064273=Halo 4",
    "1064272=Halo 3: ODST",
    "1064271=Halo 3",
    "1064270=Halo 2: Anniversary",
    "1064221=Halo: Combat Evolved Anniversary",
    "1064220=Halo: Reach"
  ];
  Context.WriteTextFile(dlc, lines);

  var depots = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\steam_settings\\depots.txt";
  var lines = [
    "976731",
    "976732",
    "976733",
    "976734",
    "976735",
    "976736",
    "976737",
    "976738",
    "976739",
    "1064222",
    "1064223",
    "1064224",
    "1064225",
    "1064226",
    "1064227",
    "1064228",
    "1064229",
    "1064274",
    "1064275",
    "1064276"
  ];
  Context.WriteTextFile(depots, lines);

  /*var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\disable_lan_only.txt";
  var lines = [""];
  Context.WriteTextFile(nolan, lines);*/

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\steam_settings\\steam_appid.txt";
  var lines = ["976730"];
  Context.WriteTextFile(appid, lines);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\steam_settings\\load_dlls\\xlive64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xlive64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (System.IO.File.Exists(Context.NucleusUserRoot + "\\AppData\\LocalLow\\MCC\\ClockSkew.json")) {
    Context.BackupFile(Context.NucleusUserRoot + "\\AppData\\LocalLow\\MCC\\ClockSkew.json", true);

    Context.BackupFile(Context.NucleusUserRoot + "\\AppData\\LocalLow\\MCC\\SystemSettingsData.bin", true);
  }

  var unlock = Context.Options["Unlock"];
  var native = Context.Options["Native"];

  if (unlock == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\ui\\unlockdb.xml");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "unlockdb.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (native == "No") {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MCC\\Binaries\\Win64\\WTSAPI32.dll");
  }

  if (native == "Yes") {
    Game.ProtoInput.MultipleProtoControllers = true;
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

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, false, false, false);

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

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5000, true, true, false, false, false);
    }
  };
};