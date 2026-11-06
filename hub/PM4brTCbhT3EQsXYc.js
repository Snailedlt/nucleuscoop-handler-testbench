Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu May 01 2025 22:45:02 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "PM4brTCbhT3EQsXYc";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

/* var answers = ["A Week in Paradise (Default)", "Apocalypse Weekend", "POSTAL 2"];
Game.AddOption(
  "Campaign Mode:", "A Week in Paradise:\n  Full story campaign – 7 days of mayhem.\n\nApocalypse Weekend:\n  Zombies, cultists, explosives.\n\nPOSTAL 2:\n  Base game content only..\n",
  "Coop",
  answers
);

var answers1 = ["Average - Normal(Default)", "Too Easy", "Very Easy", "Easy", "Remedial", "Average - Normal", "Aggressive", "Hard", "Manic", "POSTAL", "Impossible"];
Game.AddOption("Difficulty:", "Here you set how F****D you wanna be.", "Difficulty", answers1);

var answers2 = ["0% - Good friends.(Default)", "10%", "20%", "30%", "40%", "50% - Sorry, not sorry.", "60%", "70%", "80%", "90%", "100% - No more friends."];
Game.AddOption("Friendly Fire:", "Why Your Best Friend is Your Biggest Gaming Rival.", "FFire", answers2);

var answers3 = ["10% -  (Default)", "0%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
Game.AddOption("Travel Acess limit:", "How many Players you need to travel between levels.", "Travel", answers3);

var answers4 = ["True - Festive. Violent. Postal.", "False - Peace on Earth."];
Game.AddOption("Holidays Events?", "Christmas, Halloween, and other holidays get the POSTAL treatment – where celebrating means DESTROYING!!!", "Holidays", answers4); */

Game.FileSymlinkExclusions = ["NicksCoopSave.ini", "User.ini", "Postal2CoOp.ini", "Startup.fuk"];
Game.DirSymlinkCopyInstead = ["\\System"];
Game.BackupFiles = ["System\\NicksCoopSave.ini", "System\\User.ini", "System\\Postal2CoOp.ini"];

Game.GameName = "Postal 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.KeepSymLinkOnExit = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Postal2.exe";
Game.ChangeExe = true;
Game.SteamID = "223470";
Game.GUID = "Postal 2";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.WorkingFolder = "";
Game.BinariesFolder = "System";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Postal 2";
Game.HasDynamicWindowTitle = true;
Game.ForceWindowTitle = true;
// Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
// Game.PreventGameFocus = true;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 25;

Game.KillProcessesOnClose = ["cmd", "UCC"];

Game.Description =
  "SUPPORTS GAMEPADS ONLY!!!\n\n" +
  "REQUIRED: This Handler use Nicks Coop mod to enable campaign coop: (https://steamcommunity.com/sharedfiles/filedetails/?id=737631813)\n" +
  "without it, it wouldn't be possible!.\n\n" +
  "Have your game totally CLEAN!\n" +
  "!!Not necessary to download any mod manually!!\n\n" +
  "You will need to use *game build: 5025*\n" +
  "If you don't know how to change betas: https://www.moddb.com/mods/nickscoop-postal-2-coop/news/compatibility-fix-v1-4-3\n\n" +
  "IMPORTANT: Always before exiting the game, use the *SAVE GAME* option in the instances pause menu.\n" +
  "You will need to use the mouse to create a server/join as the game shares the same mouse for all instances.\n\n" +
  "FOV: Can be adjusted in-game. Press the ~ (tilde) key during gameplay to type in the game console, example: FOV 101.\n\n" +
  "ONLINE: You can play LAN and online.\n" +
  "Do not leave the option to create a dedicated server checked!!! It does not work well\n" +
  "!!Remember to only select servers that host games created with the NicksCoop mod!!\n\n" +
  "NOT is necessary to press the END key as usual, just wait for the instances to open and reposition correctly." +
  "\n" +
  "Avoid closing the game in any way, use the nucleus hotkeys to close instances (Default: Ctrl+E)" +
  "\n" +
  "Sometimes the mouse cursor may be persistent when exiting the pause menu, this is due to the game using gamepad emulating mouse in the menu, so just enter and exit the pause menu in any instance for the cursor to disappear." +
  "\n\n" +
  "CREDITS: My sincere thanks to Evil (creator of the mod) for supporting this handler and helping me fix a problem in the game engine. THANKS";

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
Game.UpdateFakeMouseWithInternalInput = false;

//// for work gamepads
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = true;

Game.Play = function() {
  //start arguments
  var Args = (Context.Args = "-INI=Postal2CoOp.ini");
  Context.StartArguments = Args;

  ///////////////////////////

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
  Game.ProtoInput.DrawFakeCursor = true;
  Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
  Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
  Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

  Game.ProtoInput.AllowFakeCursorOutOfBounds = false;
  Game.ProtoInput.ExtendFakeCursorBounds = true;

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

  Game.ProtoInput.EnableFocusMessageLoop = false;
  //Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
  //Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
  //Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
  //Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
  //Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
  //Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
  Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

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

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Valuesaaaaaa.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
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

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };

  //// for xinput work
  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //copy files of NicksCoop mod
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Maps\\NicksCoopMapLoader.fuk");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\Maps\\NicksCoopMapLoader.fuk");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoop.int");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\NicksCoop.int");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoop.u");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\NicksCoop.u");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoopCustomMods.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\NicksCoopCustomMods.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoopInvReplace.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\NicksCoopInvReplace.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoopSave.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\NicksCoopSave.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\Postal2CoOp.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\UCC.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\UCC.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoop_RunServer.bat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\NicksCoop_RunServer.bat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\User.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //d3d8tod3d9
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\d3d8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d8.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Skip intro By V
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Maps\\Startup.fuk");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Startup.fuk");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Postal2.int and Splashscreen - not remove

  var fileint = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2 - Player " + (Context.PlayerID + 1) + ".int";
  System.IO.File.Copy(System.IO.Path.Combine(Game.Folder, "NicksCoop Files\\System\\Postal2.int"), fileint, true);

  var splashPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2 - Player " + (Context.PlayerID + 1) + "Splash.bmp";
  System.IO.File.Copy(System.IO.Path.Combine(Game.Folder, "Postal2Splash.bmp"), splashPath, true);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //editing ini files
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", "False"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FullscreenWindowed", "False"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FullscreenViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FullscreenViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MenuViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MenuViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "WindowedViewporty", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "MenuViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "MenuViewportY", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "FullscreenViewportY", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "FullscreenViewportX", Context.Width),
    new Nucleus.IniSaveInfo("NicksCoop.CoopMenu", "MultiPlayerName", Context.Nickname),
    new Nucleus.IniSaveInfo("NicksCoop.CoopMenu", "MultiPlayerHostName", Context.Nickname),
    new Nucleus.IniSaveInfo("Postal2Game.P2GameInfo", "bWidescreenStretch", "True"),
    new Nucleus.IniSaveInfo("D3DDrv.D3DRenderDevice", "UseVSync", "True"),
    new Nucleus.IniSaveInfo("D3DDrv.D3DRenderDevice", "ReduceMouseLag", "False"), //no edit
    new Nucleus.IniSaveInfo("OpenGLDrv.OpenGLRenderDevice", "ReduceMouseLag", "False"), //no edit

    //Server Settings
    new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopSaveServerID", "AAAA-AAAA-AAAA-AAAA"), //DO NOT TOUCH
    new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopHostNameID", "AAAA_AAAA") //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopTravelPortalName", ""), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "bCoopRagdollSync", "True"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "ReportLogFileType", "ReportLog_D%D_M%M_Y%Y"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "bNonDedicatedAutoSave", "True"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "bAutoSave_FirstRun", "False"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "xResetVoteTimeStamp", "0.000000"), //DO NOT TOUCH

    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopFriendlyFireScale", "0.000000"), //FriendlyFire Max 1.000000
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopStoryModeType", "2"), // Story Mode: 0 = POSTAL 2 , 1 = Apocalypse Weekend , 2 = A Week in Paradise
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopTravelAccessPercent", "0.500000"), //How many Players you need to travel between levels (more tha value). Max value 1.000000.
    // new Nucleus.IniSaveInfo("Engine.GameInfo", "GameDifficulty", "5.000000"), //Difficulty 0.000000 at 10.000000. Default Normal = 5.000000
    // new Nucleus.IniSaveInfo("Engine.GameInfo", "MaxSpectators", "5"), //Max 10
    // new Nucleus.IniSaveInfo("Engine.GameInfo", "MaxPlayers", "16"), // Max 16
    // new Nucleus.IniSaveInfo("UTBrowser.UMenuBotmatchClientWindow", "AdminPassword", "Nick"), //Admin Password
    // new Nucleus.IniSaveInfo("Engine.GameReplicationInfo", "ServerName", "(NucleusCoop)NicksCoop Local Server"), //server name
    // new Nucleus.IniSaveInfo("Engine.GameReplicationInfo", "ShortName", "(NucleusCoop)NicksCoop Local Server"), //server name
    // new Nucleus.IniSaveInfo("Postal2Game.P2GameInfoSingle", "bNoHolidays", "False") // No Holidays Events (True or False)
  ]);

  /////////////////////////////////////////////////////////////////////////

  ///// Restore Save backup

  if (System.IO.File.Exists(Context.PlayerGameFilesBackupFolder + "\\System\\Postal2CoOp.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini");
    var savePkgOrigin = System.IO.Path.Combine(Context.PlayerGameFilesBackupFolder + "\\System\\Postal2CoOp.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (System.IO.File.Exists(Context.PlayerGameFilesBackupFolder + "\\System\\NicksCoopSave.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoopSave.ini");
    var savePkgOrigin = System.IO.Path.Combine(Context.PlayerGameFilesBackupFolder + "\\System\\NicksCoopSave.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (System.IO.File.Exists(Context.PlayerGameFilesBackupFolder + "\\System\\User.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini");
    var savePkgOrigin = System.IO.Path.Combine(Context.PlayerGameFilesBackupFolder + "\\System\\User.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  //editing ini files
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("DefaultPlayer", "Name", Context.Nickname)]);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", "False"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FullscreenWindowed", "False"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FullscreenViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "FullscreenViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MenuViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MenuViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "WindowedViewporty", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "MenuViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "MenuViewportY", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "FullscreenViewportY", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "FullscreenViewportX", Context.Width),
    new Nucleus.IniSaveInfo("NicksCoop.CoopMenu", "MultiPlayerName", Context.Nickname),
    new Nucleus.IniSaveInfo("NicksCoop.CoopMenu", "MultiPlayerHostName", Context.Nickname),
    new Nucleus.IniSaveInfo("Postal2Game.P2GameInfo", "bWidescreenStretch", "True"),
    new Nucleus.IniSaveInfo("D3DDrv.D3DRenderDevice", "UseVSync", "True"),
    new Nucleus.IniSaveInfo("D3DDrv.D3DRenderDevice", "ReduceMouseLag", "False"), //no edit
    new Nucleus.IniSaveInfo("OpenGLDrv.OpenGLRenderDevice", "ReduceMouseLag", "False"), //no edit

    //Server Settings
    new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopSaveServerID", "AAAA-AAAA-AAAA-AAAA"), //DO NOT TOUCH
    new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopHostNameID", "AAAA_AAAA") //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopTravelPortalName", ""), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "bCoopRagdollSync", "True"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "ReportLogFileType", "ReportLog_D%D_M%M_Y%Y"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "bNonDedicatedAutoSave", "True"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "bAutoSave_FirstRun", "False"), //DO NOT TOUCH
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "xResetVoteTimeStamp", "0.000000"), //DO NOT TOUCH

    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopFriendlyFireScale", "0.000000"), //FriendlyFire Max 1.000000
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopStoryModeType", "2"), // Story Mode: 0 = POSTAL 2 , 1 = Apocalypse Weekend , 2 = A Week in Paradise
    // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopTravelAccessPercent", "0.500000"), //How many Players you need to travel between levels (more tha value). Max value 1.000000.
    // new Nucleus.IniSaveInfo("Engine.GameInfo", "GameDifficulty", "5.000000"), //Difficulty 0.000000 at 10.000000. Default Normal = 5.000000
    // new Nucleus.IniSaveInfo("Engine.GameInfo", "MaxSpectators", "5"), //Max 10
    // new Nucleus.IniSaveInfo("Engine.GameInfo", "MaxPlayers", "16"), // Max 16
    // new Nucleus.IniSaveInfo("UTBrowser.UMenuBotmatchClientWindow", "AdminPassword", "Nick"), //Admin Password
    // new Nucleus.IniSaveInfo("Engine.GameReplicationInfo", "ServerName", "(NucleusCoop)NicksCoop Local Server"), //server name
    // new Nucleus.IniSaveInfo("Engine.GameReplicationInfo", "ShortName", "(NucleusCoop)NicksCoop Local Server"), //server name
    // new Nucleus.IniSaveInfo("Postal2Game.P2GameInfoSingle", "bNoHolidays", "False") // No Holidays Events (True or False)
  ]);

  //sum of aspect
  if (Context.AspectRatioDecimal < 1.2) {
    //vertical below 4:3
  } else {
    //fix Map on horizontal
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Postal2Game.P2GameInfo", "bWidescreenStretch", "False")]);
  }

  //Campaign Mode: -----------------------------
  /* var modeMap = {
  "POSTAL 2": "0",
  "Apocalypse Weekend": "1",
  "A Week in Paradise": "2"
};

var Mode = Context.Options["Coop"];
var modeValue = modeMap[Mode];

if (modeValue !== undefined) {
  var baseFolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);

  var files = [
    {
      path: baseFolder + "\\System\\Postal2CoOp.ini",
      section: "NicksCoop.CoopGameInfo",
      key: "CoopStoryModeType"
    },
    {
      path: baseFolder + "\\System\\NicksCoopSave.ini",
      section: "NicksCoop.CoopSaveSystem",
      key: "CoopSave_CoopStoryModeType"
    }
  ];

  for (var i = 0; i < files.length; i++) {
    Context.ModifySaveFile(
      files[i].path, files[i].path,
      Nucleus.SaveType.INI,
      [ new Nucleus.IniSaveInfo(
          files[i].section,
          files[i].key,
          modeValue
        )
      ]
    );
  }
} */

  // new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopStoryModeType", "2"), // Story Mode: 0 = POSTAL 2 , 1 = Apocalypse Weekend , 2 = A Week in Paradise

  /*     var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoopSave.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("NicksCoop.CoopSaveSystem", "CoopSave_LastLevel", ""),  //save last player location 
    new Nucleus.IniSaveInfo("NicksCoop.CoopSaveSystem", "CoopSave_ServerNextLevel", ""), 
  ]); */

  //Difficulty: -----------------------------
  /*   var difficultyMap = {
  "Too Easy": "1.000000",
  "Very Easy": "2.000000",
  "Easy": "3.000000",
  "Remedial": "4.000000",
  "Average - Normal(Default)": "5.000000",
  "Average - Normal": "5.000000",
  "Aggressive": "6.000000",
  "Hard": "7.000000",
  "Manic": "8.000000",
  "POSTAL": "9.000000",
  "Impossible": "10.000000"
};

var difficultyValue = difficultyMap[Context.Options["Difficulty"]];
if (difficultyValue !== undefined) {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Engine.GameInfo", "GameDifficulty", difficultyValue)
  ]);
} */

  //friendlyFire: -----------------------------
  /* var friendlyFireMap = {
  "0% - Good friends.(Default)": "0.000000",
  "10%": "0.100000",
  "20%": "0.200000",
  "30%": "0.300000",
  "40%": "0.400000",
  "50% - Sorry, not sorry.": "0.500000",
  "60%": "0.600000",
  "70%": "0.700000",
  "80%": "0.800000",
  "90%": "0.900000",
  "100% - No more friends.": "1.000000"
};

var ffValue = friendlyFireMap[Context.Options["FFire"]];
if (ffValue !== undefined) {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopFriendlyFireScale", ffValue)
  ]);
} */

  //Travel acess: -----------------------------
  /* var travelAccessMap = {
  "0%": "0.000000",
  "10% -  (Default)": "0.100000",
  "20%": "0.200000",
  "30%": "0.300000",
  "40%": "0.400000",
  "50%": "0.500000",
  "60%": "0.600000",
  "80%": "0.800000",
  "90%": "0.900000",
  "100%": "1.000000"
};

var travelValue = travelAccessMap[Context.Options["Travel"]];
if (travelValue !== undefined) {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("NicksCoop.CoopGameInfo", "CoopTravelAccessPercent", travelValue)
  ]);
} */

  //Holidays Events: -----------------------------
  /* var holidaysMap = {
  "True - Festive. Violent. Postal.": "False",
  "False - Peace on Earth.": "True",
};

var holidaysValue = holidaysMap[Context.Options["Holidays"]];
if (holidaysValue !== undefined) {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\Postal2CoOp.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Postal2Game.P2GameInfoSingle", "bNoHolidays", holidaysValue)
  ]);
} */

  //Skins: -----------------------------
  /*     const playerSkins = [
    "NicksCoop.ExtraStuff.Punisher_Skin",               // Player 1
    "NicksCoop.ExtraStuff.HNDudeSanta_Skin",               // Player 2
    "ChameleonSkins.Special.Dude",               // Player 3
    "NicksCoop.ExtraStuff.PRDude_Skin",      // Player 4
    "ChameleonSkins.Scientists.MW__164__Avg_Dude",      // Player 5
    "NicksCoop.ExtraStuff.SJDudeShtopor_Skin00",        // Player 6
    "NicksCoop.ExtraStuff.P1Dude_Skin",                 // Player 7
    "NicksCoop.ExtraStuff.EDDude_Skin",              // Player 8
    "NicksCoop.ExtraStuff.P3Dude_Skin",                 // Player 9
    "NicksCoop.ExtraStuff.TalibDude_Skin",              // Player 10
    "NicksCoop.ExtraStuff.SJDudeShtopor_Skin01",              // Player 11
    "NicksCoop.ExtraStuff.BetaNiceDude_Skin",           // Player 12
    "MPSkins.RedTeam.MW__008__Avg_Dude",           // Player 13
    "MPSkins.BlueTeam.MW__007__Avg_Dude",           // Player 14
    "ChameleonSkins.Scientists.MW__005__Avg_Dude",           // Player 15
	"NicksCoop.ExtraStuff.EDDude_Skin",              // Player 16
  // ... add more skins
	];

if (Context.PlayerID >= 0 && Context.PlayerID < playerSkins.length) {
	
	const savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\User.ini";
	Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
	new Nucleus.IniSaveInfo("DefaultPlayer", "Skin", playerSkins[Context.PlayerID]),
	]);
  } */

  //SERVER
  // Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\NicksCoop_RunServer.bat"], false, 0, false, false);
  // Context.RunAdditionalFiles(["1|" + Game.Folder + "\\checknucleus.bat"], false, 1, true, false);
};