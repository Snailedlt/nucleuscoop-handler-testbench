Hub.Handler.Version = 14; // Released at https://hub.splitscreen.me/ on Fri Oct 25 2024 16:34:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "3zcxvWqWQqnJCKCWA";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Yes", "No"];
var answers1 = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
var answers2 = ["No", "720p", "1080p"];
var answers3 = ["No", "Yes"];
var answers4 = ["Default", "Low", "Med", "High"];
Game.AddOption("Select preferred graphic settings", "Select Default to load default or previously selected setting", "Graphics", answers4);
Game.AddOption("Apply Cockpit Cam Mod", "", "Mod", answers3);
Game.AddOption("Apply 720p or 1080p resolution and fullscreen for low-end PC (no splitscreen)", "", "resolution", answers2);
Game.AddOption("Enable music only in the first instance?", "", "Music", answers);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "id", answers1);
Game.KillMutex = ["Codemasters GRID 2"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = [
  "bink2w32.dll",
  "car_monitor_setup.xml",
  "example_benchmark.xml",
  "example_benchmark_attract.xml",
  "modifications.txt",
  "raceload.jpk",
  "surface_materials.xml",
  "wet_materials_remap.xml"
];
Game.HandlerInterval = 100;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.GoldbergLanguage = "english";
Game.PlayerSteamIDs = [
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438"
];
Game.KeepSymLinkOnExit = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "grid2_avx.exe";
Game.SteamID = "44350";
Game.GUID = "GRID 2";
Game.GameName = "GRID 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "GRID 2";
Game.HookFocus = true;
Game.FakeFocus = true;
Game.FakeFocusSendActivate = false;
Game.PreventWindowDeactivation = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.XInputPlusDll = ["XInput1_3.dll"];
Game.DocumentsConfigPath = "My Games\\Grid 2\\hardwaresettings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\44350";
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenProcessStarts = 10;
Game.ResetWindows = true;
Game.Description =
  "Once prompted, select the grid2_avx.exe. Once in game, launch an online event session (ignore the connection refused message as the online match will work regardless of this). Once the session has been created, have the other instances connect to the session by selecting quick match. To play with multiple PCs over LAN, (only) the connecting PCs will need to edit one of the lines of the GRID 2 script. The line is Game.PlayerSteamIDs and the last two digits of each of the four sets of numbers must be changed so that each PC has its own unique sets of numbers. The game supports AI in multiplayer mode and has native split screen in offline mode. Have fun!";

Game.Play = function() {
  var Mod = Context.Options["Mod"];

  if (Mod == "No") {
  }
  if (Mod == "Yes") {
    Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

    var Args = "-mod" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\configuration.xml";
    Context.StartArguments = Args;
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
  var dict = ["16|LB=RSB", "19|RSB=LB"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  Context.WriteTextFile(autoExec, lines);

  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml")) {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Med.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Graphics = Context.Options["Graphics"];
  if (Graphics == "Default") {
  }
  if (Graphics == "Low") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Low.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "Med") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Med.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "High") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_High.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var resolution = Context.Options["resolution"];
  if (resolution == "No") {
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "" + Context.GamepadId + ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "")
    ]);
  }

  var resolution = Context.Options["resolution"];
  if (resolution == "720p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    Game.PreventWindowDeactivation = false;
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", 1280);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", 720);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "true");

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }
  var resolution = Context.Options["resolution"];
  if (resolution == "1080p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    Game.PreventWindowDeactivation = false;
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", 1920);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", 1080);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "true");

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }
  var Music = Context.Options["Music"];

  if (Music == "Yes") {
    if (Context.PlayerID == 0) {
    } else {
      var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
      Context.ChangeXmlAttributeValue(path, "//music", "level", "0.00");
      Context.ChangeXmlAttributeValue(path, "//speech", "level", "0.00");
    }
  }
  if (Music == "No") {
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid 2\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//music", "level", "100.00");
    Context.ChangeXmlAttributeValue(path, "//speech", "level", "100.00");
  }

  var id = Context.Options["id"];
  Game.PlayerSteamIDs = [
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + ""
  ];
};