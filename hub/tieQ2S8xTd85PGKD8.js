Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Oct 22 2024 11:28:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "tieQ2S8xTd85PGKD8";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers1 = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
var answers2 = ["No", "720p", "1080p"];
var answers3 = ["Default", "Very Low", "Low", "Med", "High"];
Game.AddOption("Select preferred graphic settings", "Select Default to load default or previously selected setting", "Graphics", answers3);
Game.AddOption("Apply 720p or 1080p resolution and fullscreen for low-end PC (no splitscreen)", "", "resolution", answers2);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "id", answers1);
Game.KillMutex = ["F1 2013"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "steam_api.ini"];
Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  "rldata.dll",
  "car_materials.xml",
  "car_monitor_setup.xml",
  "example_benchmark.xml",
  "loose_parts_settings.xml",
  "SkipFrontEnd.xml",
  "surface_materials.xml",
  "raceload.jpk",
  "win_000.nfs"
];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
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
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "f1_2013.exe";
Game.SteamID = "223670";
Game.GUID = "F1 2013";
Game.GameName = "F1 2013";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "F1 2013";
Game.HookFocus = true;
Game.FakeFocus = true;
Game.FakeFocusSendActivate = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.XInputPlusDll = ["XInput1_3.dll"];
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 10;
Game.DocumentsConfigPath = "My Games\\FormulaOne2013\\hardwaresettings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\223670";
Game.Description =
  "This game already has 2 player native split screen, however this handler will allow you play up to 4 player split screen both locally and over LAN. To connect the instances, have the first player create an online custom session and the other players join by searching for the online session. Enjoy!";

Game.Play = function() {
  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml")) {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Med.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Graphics = Context.Options["Graphics"];
  if (Graphics == "Default") {
  }
  if (Graphics == "Very Low") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Very_Low.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "Low") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Low.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "Med") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_Med.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "High") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config_High.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var resolution = Context.Options["resolution"];
  if (resolution == "No") {
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
    Context.ChangeXmlAttributeValue(path, "//resolution", "oldWidth", Context.Width);
    Context.ChangeXmlAttributeValue(path, "//resolution", "oldHeight", Context.Height);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", "normal");
    Context.ChangeXmlAttributeValue(path, "//resolution", "vsync", "0");

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
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", "1280");
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", "720");
    Context.ChangeXmlAttributeValue(path, "//resolution", "oldWidth", "1280");
    Context.ChangeXmlAttributeValue(path, "//resolution", "oldHeight", "720");
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "true");
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", "normal");
    Context.ChangeXmlAttributeValue(path, "//resolution", "vsync", "0");

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
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\FormulaOne2013\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", "1920");
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", "1080");
    Context.ChangeXmlAttributeValue(path, "//resolution", "oldWidth", "1920");
    Context.ChangeXmlAttributeValue(path, "//resolution", "oldHeight", "1080");
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "true");
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", "normal");
    Context.ChangeXmlAttributeValue(path, "//resolution", "vsync", "1");

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamContentServer002",
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