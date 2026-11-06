Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sat Dec 31 2022 01:03:37 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "aZG4XCBv6ppXt7A5L";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Yes", "No"];
var answers1 = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
var answers2 = ["No", "720p", "1080p"];
var answers3 = ["No", "Yes"];
Game.AddOption("Apply 720p or 1080p resolution and fullscreen for low-end PC (no splitscreen)", "", "resolution", answers2);
Game.AddOption("Apply customized config for low end PCs?", "", "Config", answers3);
Game.AddOption("Unlock all DLC?", "", "DLC", answers);
Game.AddOption("Enable music only in the first instance?", "", "Music", answers);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "id", answers1);
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = ["bink2w32.dll", "car_monitor_setup.xml", "example_benchmark.xml", "example_benchmark_attract.xml", "raceload.jpk", "surface_materials.xml", "wet_materials_remap.xml"];
Game.KillMutex = ["Codemasters GRID Autosport"];
Game.HandlerInterval = 100;
Game.UseGoldberg = true;
Game.GoldbergLanguage = "english";
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "GRIDAutosport_avx.exe";
Game.SteamID = "255220";
Game.GUID = "GRID Autosport";
Game.GameName = "GRID Autosport";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "GRID Autosport";
Game.HookFocus = false;
Game.FakeFocus = false;
Game.PreventWindowDeactivation = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.DocumentsConfigPath = "My Games\\Grid Autosport\\hardwaresettings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\255220";
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenProcessStarts = 10;
Game.ResetWindows = true;
Game.Description =
  "When searching for game, please select GRIDAutosport_avx.exe. Once in game, launch an online event session (ignore the connection refused message as the online match will work regardless of this). The game supports AI in multiplayer mode and has native split screen in offline mode. Have fun!";

Game.Play = function() {
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

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml")) {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var DLC = Context.Options["DLC"];

  if (DLC == "Yes") {
    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
    var lines = [
      "289020=Best of British Pack",
      "282090=Black Edition Pack",
      "282091=Boost Pack",
      "289023=Road & Track Car Pack",
      "282092=Premium Garage Pack",
      "289025=Drag Pack",
      "289021=Coupé Style Pack",
      "289022=Sprint Pack",
      "289024=Touring Legends Pack",
      "304450=Grid Autosport Season Pass",
      "324130=Demoman Derby Pack"
    ];
    Context.WriteTextFile(dlc, lines);
  }
  if (DLC == "No") {
    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
    var lines = [""];
    Context.WriteTextFile(dlc, lines);
  }

  var Config = Context.Options["Config"];

  if (Config == "Yes") {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hardware_settings_config.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Config == "No") {
  }
  var resolution = Context.Options["resolution"];
  if (resolution == "No") {
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");
    Context.ChangeXmlAttributeValue(path, "//resolution", "vsync", "0");
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("KeyAssign", "BACK", "RB"), new Nucleus.IniSaveInfo("KeyAssign", "RB", "BACK")]);
  }

  if (resolution == "720p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    Game.PreventWindowDeactivation = false;
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", 1280);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", 720);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "true");
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("KeyAssign", "BACK", "RB"),
      new Nucleus.IniSaveInfo("KeyAssign", "RB", "BACK"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }
  if (resolution == "1080p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    Game.PreventWindowDeactivation = false;
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "width", 1920);
    Context.ChangeXmlAttributeValue(path, "//resolution", "height", 1080);
    Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "true");
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("KeyAssign", "BACK", "RB"),
      new Nucleus.IniSaveInfo("KeyAssign", "RB", "BACK"),
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
      var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
      Context.ChangeXmlAttributeValue(path, "//music", "level", "0.00");
      Context.ChangeXmlAttributeValue(path, "//replay_music", "level", "0.00");
      Context.ChangeXmlAttributeValue(path, "//speech", "level", "0.00");
    }
  }
  if (Music == "No") {
    var path = Context.EnvironmentPlayer + "\\Documents\\My Games\\Grid Autosport\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//music", "level", "100.00");
    Context.ChangeXmlAttributeValue(path, "//replay_music", "level", "100.00");
    Context.ChangeXmlAttributeValue(path, "//speech", "level", "100.00");
  }

  var id = Context.Options["id"];

  var idF = 33 * id + Context.PlayerID;
  if (id != "-") {
  }
  if (id < 3) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["765611979729000" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
  if (id == 3 && Context.PlayerID == 0) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["765611979729000" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
  if (id == 3 && Context.PlayerID > 0) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["76561197972900" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
  if (id > 3 && id < 30) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["76561197972900" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
  if (id == 30 && Context.PlayerID < 11) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["76561197972900" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
  if (id == 30 && Context.PlayerID > 10) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["7656119797290" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
  if (id > 30) {
    var UserID = Context.NucleusUserRoot + "\\NucleusCoop" + "\\" + Context.Nickname + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\settings\\user_steam_id.txt";
    var IdNumber = ["7656119797290" + idF];
    Context.WriteTextFile(UserID, IdNumber);
  }
};