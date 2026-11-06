Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Jan 10 2021 00:21:21 GMT+0000 (UTC).
Hub.Handler.Id = "7s2vESyxbJMDWFTTX";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Carmageddon: Max Damage"];
Game.DirSymlinkExclusions = ["bin", "Data_Misc\\splashscreen"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_api64.dll",
  "steam_appid.txt",
  "splash.png",
  "steam_interfaces.txt",
  "Carmageddon_Max_Damage.exe",
  "binkw32.dll",
  "d3dcompiler_46.dll",
  "fmod_event.dll",
  "fmodex.dll",
  "SciLexer.dll",
  "vcomp110.dll"
];
Game.FileSymlinkCopyInstead = ["config.lua"];
Game.DeleteOnClose = ["steam_api.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Carmageddon_Max_Damage.exe";
Game.SteamID = "505170";
Game.GUID = "Carmageddon Max Damage";
Game.GameName = "Carmageddon: Max Damage";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "";
Game.LauncherExe = "Carmageddon_Max_Damage.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Carmageddon: Max Damage";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.HookFocus = true;
Game.UserProfileSavePath = "Documents\\Carmageddon Max Damage";
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\505170";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.UseForceBindIP = true;
Game.SetForegroundWindowElsewhere = true;
Game.Description =
  "IMPORTANT: Make sure your Carmageddon .exe and dlls are inside your main game files bin folder, they should be there by default. Only working in the steam version, steam needs to be open. So the instances launch and resize correctly make sure to run your main game at least once first and change some graphic settings. Create an online multiplayer game and join in the other instances. You need to add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 1920x540, 960x540 etc.) for the windows to resize correctly, the game will see them in the in-game video settings. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.PauseBetweenStarts = 30;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var cfgFilePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.lua";

  var windowModeLine = Context.FindLineNumberInTextFile(cfgFilePath, "start_in_fullscreen", Nucleus.SearchType.Contains);
  var screenHeightLine = Context.FindLineNumberInTextFile(cfgFilePath, "height", Nucleus.SearchType.Contains);
  var screenWidthLine = Context.FindLineNumberInTextFile(cfgFilePath, "width", Nucleus.SearchType.Contains);

  Context.ReplaceLinesInTextFile(cfgFilePath, [
    windowModeLine + "|  start_in_fullscreen = false,",
    screenHeightLine + "|    no = " + Context.Height + ",",
    screenWidthLine + "|    no = " + Context.Width
  ]);

  var cfgFilePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.lua";

  var screenHeightLine = Context.FindLineNumberInTextFile(cfgFilePath, "height", Nucleus.SearchType.Contains);
  var screenWidthLine = Context.FindLineNumberInTextFile(cfgFilePath, "width", Nucleus.SearchType.Contains);

  Context.ReplaceLinesInTextFile(cfgFilePath, [screenHeightLine + "|    height = " + Context.Height + ",", screenWidthLine + "|    width = " + Context.Width]);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Carmageddon_Max_Damage.exe"), System.IO.Path.Combine(Context.RootFolder, "Carmageddon_Max_Damage.exe"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "binkw32.dll"), System.IO.Path.Combine(Context.RootFolder, "binkw32.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "d3dcompiler_46.dll"), System.IO.Path.Combine(Context.RootFolder, "d3dcompiler_46.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "fmod_event.dll"), System.IO.Path.Combine(Context.RootFolder, "fmod_event.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "fmodex.dll"), System.IO.Path.Combine(Context.RootFolder, "fmodex.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SciLexer.dll"), System.IO.Path.Combine(Context.RootFolder, "SciLexer.dll"), true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "vcomp110.dll"), System.IO.Path.Combine(Context.RootFolder, "vcomp110.dll"), true);

  System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\x86\\xinput1_3.dl_", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll", true);
  System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\XInputPlus.ini", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini", true);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api.dll")) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll"), System.IO.Path.Combine(Context.OrigRootFolder, "steam_api.dll"), true);
  } else {
  }

  if (Player.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
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
    "SteamFriends014",
    "SteamUtils006",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(interfaces, lines);
};