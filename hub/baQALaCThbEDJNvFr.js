Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Wed Apr 19 2023 03:41:11 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "baQALaCThbEDJNvFr";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Yes", "No"];
Game.AddOption("Would you like to start a server on startup?", 'Choose "No" only if you are hosting the server outside of Nucleus or from another comptuter.', "Server", answers1);
var answers2 = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32" /*, "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64"*/
];
Game.AddOption("Select the number of bots", "Empty slots will be filled with bots. Raising this will impact performance.", "Bots", answers2);
var answers3 = [
  "FFA-Bamboo_small",
  "FFA-Bamboo",
  "FFA-Isle_small",
  "FFA-Isle_medium",
  "FFA-Isle",
  "FFA-Acropolis_Small",
  "FFA-Acropolis_Medium",
  "FFA-Acropolis",
  "FFA-Fortress_small",
  "FFA-Fortress_medium",
  "FFA-Fortress",
  "FFA-Fjord_Small",
  "FFA-Fjord_Medium",
  "FFA-Fjord",
  "FFA-Valley_small",
  "FFA-Valley_medium",
  "FFA-Valley",
  "FFA-Frigid",
  "FFA-Moor",
  "TD-Bamboo_small",
  "TD-Bamboo",
  "TD-Isle_small",
  "TD-Isle_medium",
  "TD-Isle",
  "TD-Acropolis_Small",
  "TD-Acropolis_Medium",
  "TD-Acropolis",
  "TD-Fortress_small",
  "TD-Fortress_medium",
  "TD-Fortress",
  "TD-Fjord_Small",
  "TD-Fjord_Medium",
  "TD-Fjord",
  "TD-Valley_small",
  "TD-Valley_medium",
  "TD-Valley",
  "TD-Frigid",
  "TD-Moor",
  "LTS-Bamboo_small",
  "LTS-Bamboo",
  "LTS-Isle_small",
  "LTS-Isle_medium",
  "LTS-Isle",
  "LTS-Acropolis_Small",
  "LTS-Acropolis_Medium",
  "LTS-Acropolis",
  "LTS-Fortress_small",
  "LTS-Fortress_medium",
  "LTS-Fortress",
  "LTS-Fjord_Small",
  "LTS-Fjord_Medium",
  "LTS-Fjord",
  "LTS-Valley_small",
  "LTS-Valley_medium",
  "LTS-Valley",
  "LTS-Frigid",
  "LTS-Moor",
  "PTB-Bamboo",
  "PTB-Isle",
  "PTB-Acropolis",
  "PTB-Fortress",
  "PTB-Fjord",
  "PTB-Valley",
  "PTB-Frigid",
  "PTB-Moor",
  "HTB-Bamboo_small",
  "HTB-Bamboo",
  "HTB-Isle_small",
  "HTB-Isle_medium",
  "HTB-Isle",
  "HTB-Acropolis_Small",
  "HTB-Acropolis_Medium",
  "HTB-Acropolis",
  "HTB-Fortress_small",
  "HTB-Fortress_medium",
  "HTB-Fortress",
  "HTB-Fjord_Small",
  "HTB-Fjord_Medium",
  "HTB-Fjord",
  "HTB-Valley_small",
  "HTB-Valley_medium",
  "HTB-Valley",
  "HTB-Frigid",
  "HTB-Moor",
  "Duel-dojo"
];
Game.AddOption(
  "Select the map/gamemode you would like to start on",
  "FFA = Free For All               TD = Team Deathmatch\nLTS = Last Team Standing     Duel = Duel Mode\nPTB = Plant The Banner     HTB = Hold The Banner",
  "Map",
  answers3
);
var answers4 = ["All", "FFA", "TD", "LTS", "PTB", "HTB", "Duel", "Small", "Medium", "Large"];
Game.AddOption("Select map set", "This decides what maps and gamemodes can be voted for.", "Maplist", answers4);
var answers5 = ["No", "Yes"];
Game.AddOption("Would you like to enable big head mode?", "Big Brain", "Bighead", answers5);
var answers6 = ["No", "Yes"];
Game.AddOption("Would you like to enable low gravity mode?", "Blue Danube Waltz", "Gravity", answers6);
var answers7 = ["None", "Black Knight Mode", "Instagib"];
Game.AddOption("Select a mod", "Tis but a flesh wound", "Mod", answers7);
var answers8 = ["Default", "Slow", "Fast"];
Game.AddOption("Select a game speed", "Skooma", "Speed", answers8);

Game.ExecutableContext = ["binkw64.dll"];
Game.DirSymlinkExclusions = ["Binaries\\Win64", "Binaries\\Win32", "Binaries\\Win64\\steam_settings", "CDWGame\\CookedSDK", "CDWGame\\Movies"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "xinput1_3.dll", "local_save.txt", "UE3_logo.bik", "TBS_logo.bik"];
Game.KillProcessesOnClose = ["SERVER"];
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "CDW.exe";
Game.SteamID = "241280";
Game.GUID = "Chivalry Deadliest Warrior";
Game.GameName = "Chivalry: Deadliest Warrior";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "Binaries\\Win64";
Game.HideTaskbar = true;
Game.SupportsPositioning = true;
Game.StartArguments = "-borderless -nosplash -FPS 60";
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.SetWindowHook = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Chivalry";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UseDevReorder = false;
Game.UserProfileConfigPath = "Documents\\My Games\\Chivalry Deadliest Warrior\\CDWGame\\Config";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\241280";
Game.Description =
  "Run your main game at least once before using this. 64bit version only. If you are having resizing, repositioning, or border removing issues with 125% windows scaling or more, set your windows scaling to 100% either through the auto scale nucleus setting or through your windows scaling setting. Wait until all instances have resized and repositioned. If you have keyboard players, you can press END to lock input and give them their own cursor. Gamepads each have their own cursor that they can control with the right stick, using the right trigger they can also click with this cursor. The gamepad cursor should always start near the upper left hand corner of the screen when opening a menu, but if you are using gamepads with input unlocked or had a menu open when you locked input, the cursor will be offscreen in the last location of your mouse. Sometimes the gamepad cursor will disapear, in this case you can unlock input and hover or click on the instances. Gamepad players have a toggle crouch and a toggle sprint, if you die while one of these is toggled, you will have to press it twice the first time you toggle them again after respawning. Join using the server browser. All weapons and cosmetics are unlocked, but they may appear locked when you first enter the server. Exit the menu and pause and all unlocks will be selectable. Press the END key again to unlock input. While input is unlocked you can use CTRL+Q to close all instances.";
Game.PauseBetweenContextAndLaunch = 5;
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

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
//Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a1]; // Blocks WM_KILLFOCUS and WM_MOUSELEAVE

Game.Play = function() {
  var server = Context.Options["Server"];
  var bots = Context.Options["Bots"];
  var map = Context.Options["Map"];
  var maplist = Context.Options["Maplist"];
  var bighead = Context.Options["Bighead"];
  var gravity = Context.Options["Gravity"];
  var mod = Context.Options["Mod"];
  var speed = Context.Options["Speed"];

  if (speed == "Default") {
    var speedArg = "";
  }
  if (speed == "Slow") {
    var speedArg = "?mutator=UTGame.UTMutator_Slomo";
  }
  if (speed == "Fast") {
    var speedArg = "?mutator=UTGame.UTMutator_SpeedFreak";
  }

  var savePkgOrigin = System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\CDW.exe");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\SERVER.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings";
  System.IO.Directory.CreateDirectory(filePath);

  var achievePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings\\achievements.json";
  var achievePkgOrigin = System.IO.Path.Combine(Game.Folder, "configs\\achievements.json");
  System.IO.File.Copy(achievePkgOrigin, achievePath, true);

  var statPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings\\stats.txt";
  var statPkgOrigin = System.IO.Path.Combine(Game.Folder, "configs\\stats.txt");
  System.IO.File.Copy(statPkgOrigin, statPath, true);

  var overlay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win64\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(overlay, lines);

  var gamePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\CDWGame.ini";
  var gamePkgOrigin = System.IO.Path.Combine(Game.Folder, "configs\\" + maplist + ".ini");
  System.IO.File.Copy(gamePkgOrigin, gamePath, true);

  var inputPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\CDWInput.ini";
  var inputPkgOrigin = System.IO.Path.Combine(Game.Folder, "configs\\CDWInput.ini");
  System.IO.File.Copy(inputPkgOrigin, inputPath, true);

  var sysPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\CDWSystemSettings.ini";
  Context.ModifySaveFile(sysPath, sysPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false),
    new Nucleus.IniSaveInfo("SystemSettings", "Borderless", true),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height)
  ]);

  var settingsPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\CDWSettings.ini";
  Context.ModifySaveFile(settingsPath, settingsPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("CDW.AOCPlayerController", "MyFOV", (2 * Math.atan((Context.AspectRatioDecimal / (16 / 9)) * Math.tan(((95 / 2) * Math.PI) / 180)) * 180) / Math.PI)
  ]);

  /*if (bots > "32") {
	Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.GameInfo", "MaxPlayers", "64")]);
  } else {
	Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.GameInfo", "MaxPlayers", "32")]);
  }*/

  if (bighead == "Yes") {
    Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("CDW.AOCGame", "bBigHeadMode", "True")]);
  } else {
    Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("CDW.AOCGame", "bBigHeadMode", "False")]);
  }

  if (gravity == "Yes") {
    Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.WorldInfo", "DefaultGravityZ", "-100.0")]);
  } else {
    Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.WorldInfo", "DefaultGravityZ", "-520.0")]);
  }

  if (mod == "None") {
    var modArg = "";
  }
  if (mod == "Black Knight Mode") {
    var modArg = "?modname=blackknight";
  }
  if (mod == "Instagib") {
    var modArg = "?modname=InstagibDW";
  }

  if (Context.PlayerID == 0) {
    Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("UTGame.UTMusicManager", "MusicVolume", "0.36")]);
    Context.ModifySaveFile(settingsPath, settingsPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("CDW.AOCPlayerController", "DefaultMusic", "0.733540")]);

    if (mod == "Black Knight Mode") {
      var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb";
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb\\blackknight.ini");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "blackknight\\blackknight.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb\\BlackKnight.u");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "blackknight\\BlackKnight.u");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb\\DefaultBlackKnight.ini");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "blackknight\\DefaultBlackKnight.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb\\SDKShaderCache-PC-D3D-SM3.upk");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "blackknight\\SDKShaderCache-PC-D3D-SM3.upk");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb\\SDKShaderCache-PC-D3D-SM5.upk");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "blackknight\\SDKShaderCache-PC-D3D-SM5.upk");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\blackknight_4a87f41042c192084b3f90b00f0de4bb\\SDKShaderCache-PC-OpenGL.upk");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "blackknight\\SDKShaderCache-PC-OpenGL.upk");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    if (mod == "Instagib") {
      var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA";
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA\\InstagibDW.ini");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "InstagibDW\\InstagibDW.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA\\InstagibDW.u");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "InstagibDW\\InstagibDW.u");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA\\DefaultInstagibDW.ini");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "InstagibDW\\DefaultInstagibDW.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA\\SDKShaderCache-PC-D3D-SM3.upk");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "InstagibDW\\SDKShaderCache-PC-D3D-SM3.upk");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA\\SDKShaderCache-PC-D3D-SM5.upk");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "InstagibDW\\SDKShaderCache-PC-D3D-SM5.upk");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CDWGame\\CookedSDK\\InstagibDW_B373EA704A0BF97C1531EEA157F369CA\\SDKShaderCache-PC-OpenGL.upk");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "InstagibDW\\SDKShaderCache-PC-OpenGL.upk");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  } else {
    Context.ModifySaveFile(gamePath, gamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("UTGame.UTMusicManager", "MusicVolume", "0.00")]);
    Context.ModifySaveFile(settingsPath, settingsPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("CDW.AOCPlayerController", "DefaultMusic", "0.000000")]);
  }

  var Bat = Game.Folder + "\\startserver.bat";
  var lines = [
    'start AutoHotkeyU64.exe "EnvironmentEditor.ahk" "' +
      Context.Nickname +
      '" "' +
      Context.GetFolder(Nucleus.Folder.InstancedGameFolder) +
      '\\Binaries\\Win64\\SERVER.exe" "server ' +
      map +
      "?numplay=" +
      bots +
      "?adminpassword=123?dedicated=true" +
      speedArg +
      modArg +
      '?seekfreeloadingserver -Port=7777 -QueryPort=7778"'
  ];
  Context.WriteTextFile(Bat, lines);

  if (server == "Yes") {
    Context.RunAdditionalFiles(["1|" + Game.Folder + "\\startserver.bat"], false, 0);
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

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
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

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};