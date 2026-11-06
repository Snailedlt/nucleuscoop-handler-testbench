Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Oct 22 2024 11:34:16 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JJJ4rS4XAoLPSKtwA";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Yes", "No"];
var answers1 = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
var answers2 = ["No", "720p", "1080p"];
var answers3 = ["No", "Yes"];
var answers4 = ["1 controller per instance", "2 controllers per instance", "Default (no split screen)"];
Game.AddOption("Select controller distribution", "", "split", answers4);
Game.AddOption("Apply 720p or 1080p resolution and fullscreen for low-end PC (no splitscreen)", "", "resolution", answers2);
Game.AddOption("Unlock all DLC?", "", "DLC", answers);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "id", answers1);
Game.KillMutex = ["SSFIVAE"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_api.ini", "steam_interfaces.txt"];
Game.HandlerInterval = 100;
Game.UseGoldberg = true;
Game.GoldbergLanguage = "english";
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
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "SSFIV.exe";
Game.SteamID = "45760";
Game.GUID = "Ultra Street Fighter IV";
Game.GameName = "Ultra Street Fighter IV";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SSFIVAE";
Game.HookFocus = true;
Game.FakeFocus = false;
Game.PreventWindowDeactivation = true;
Game.Hook.XInputEnabled = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.XInputPlusDll = ["XInput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\45760";
Game.DocumentsConfigPath = "CAPCOM\\SUPERSTREETFIGHTERIV";
Game.PauseBetweenStarts = 20;
Game.Description =
  "This handler allows you to launch USFIV in split screen, allowing up to 4 players to play simultaneously over multiplayer. Simply have the first player create a team battle or tournament match and then have the other players join by simply selecting quick match under team battle or tournament. Please note that when playing horizontal split screen, menus are not evenly proportioned to the screen, however once a match has been launched, the graphics look fine and are evenly proportioned to the screen";

Game.Play = function() {
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootInstallFolder, "SSFIV.exe"),
    System.IO.Path.Combine(Context.RootFolder, "SSFIV.exe"),
    [0x39, 0x8e, 0xe3, 0x3f],
    Context.ConvertToBytes(Context.AspectRatioDecimal)
  );

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  Context.WriteTextFile(autoExec, lines);

  var filePath = Context.EnvironmentPlayer + "\\Documents";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\CAPCOM";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.EnvironmentPlayer + "\\Documents\\CAPCOM\\SUPERSTREETFIGHTERIV";
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\CAPCOM\\SUPERSTREETFIGHTERIV\\config.ini")) {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\CAPCOM\\SUPERSTREETFIGHTERIV\\config.ini";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "config.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var resolution = Context.Options["resolution"];
  if (resolution == "No") {
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\CAPCOM\\SUPERSTREETFIGHTERIV\\config.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "Resolution=", Nucleus.SearchType.StartsWith) + "|Resolution=" + Context.Width + "x" + Context.Height,
      Context.FindLineNumberInTextFile(txtPath, "FullScreen=", Nucleus.SearchType.StartsWith) + "|FullScreen=OFF",
      Context.FindLineNumberInTextFile(txtPath, "Aspect=", Nucleus.SearchType.StartsWith) + "|Aspect=" + Context.AspectRatio
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (resolution == "720p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\CAPCOM\\SUPERSTREETFIGHTERIV\\config.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "Resolution=", Nucleus.SearchType.StartsWith) + "|Resolution=1280x720",
      Context.FindLineNumberInTextFile(txtPath, "FullScreen=", Nucleus.SearchType.StartsWith) + "|FullScreen=ON"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (resolution == "1080p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\CAPCOM\\SUPERSTREETFIGHTERIV\\config.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "Resolution=", Nucleus.SearchType.StartsWith) + "|Resolution=1920x1080",
      Context.FindLineNumberInTextFile(txtPath, "FullScreen=", Nucleus.SearchType.StartsWith) + "|FullScreen=ON"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var DLC = Context.Options["DLC"];

  if (DLC == "Yes") {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
    System.IO.Directory.CreateDirectory(filePath);

    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
    var lines = [
      "45790=Super Street Fighter IV: Complete Brawler Pack",
      "45791=Super Street Fighter IV: Complete Femme Fatale Pack",
      "45792=Super Street Fighter IV: Complete Shadaloo Pack",
      "45793=Super Street Fighter IV: Complete Shoryuken Pack",
      "45794=Super Street Fighter IV: Complete Classic Pack",
      "45795=Super Street Fighter IV: Complete Challengers 1 Pack",
      "45796=Super Street Fighter IV: Complete Challengers 2 Pack",
      "45797=Super Street Fighter IV: Arcade Challengers Pack",
      "457989=Super Street Fighter IV: All-in Costume Pack",
      "301660=Ultra SFIV Digital Upgrade",
      "306610=Super Street Fighter IV: Fantasy 2014 Challengers Pack"
    ];
    Context.WriteTextFile(dlc, lines);
  }
  if (DLC == "No") {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
    System.IO.Directory.CreateDirectory(filePath);

    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
    var lines = [""];
    Context.WriteTextFile(dlc, lines);
  }

  var split = Context.Options["split"];

  if (split == "Default (no split screen)") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }
  if (split == "1 controller per instance") {
  }

  if (split == "2 controllers per instance") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
  }

  if (Player.Owner.IsDualVertical()) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "SSFIV.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SSFIV.exe"),
      [0xab, 0xaa, 0xaa, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  } else {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "SSFIV.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SSFIV.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
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