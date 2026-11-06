Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Jun 27 2021 04:22:27 GMT+0000 (UTC).
Hub.Handler.Id = "i2kkWnG8yf76sjGee";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Patch Exe?", "ONLY select yes if you have the legit game in Steam.", "Patch", answers1);

Game.KillMutex = ["SniperV2"];
Game.DirSymlinkExclusions = ["bin", "FMV"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "winmm.dll", "rebellion.bik", "local_save.txt", "xinput1_3.dll", "SniperEliteV2.exe"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergLobbyConnect = true;
Game.GoldbergNoLocalSave = true;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SniperEliteV2.exe";
Game.SteamID = "63380";
Game.GUID = "Sniper Elite V2";
Game.GameName = "Sniper Elite V2";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.LauncherTitle = "splashscreen";
Game.BinariesFolder = "bin";
Game.HideTaskbar = false;
Game.StartArguments = "-subwindow"; //-60Hz
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SniperV2";
Game.FakeFocus = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\SniperV2";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\63380\\remote";
Game.Description =
  "Close steam before running this. To connect the players in Campaign create a private co-op game in the first instance then start the next instance. You can access each instance saves in the app, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Width", Context.Width),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Height", Context.Height)
  ]);

  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\SniperV2\\Settings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Width", Context.Width),
    new Nucleus.IniSaveInfo("Display Settings", "Resolution_Height", Context.Height)
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var patch = Context.Options["Patch"];

  if (patch == "Yes") {
    Game.KillProcessesOnClose = ["SEV2 Patcher"];

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SniperEliteV2.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\SniperEliteV2.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\SEV2 Patcher.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SEV2 Patcher.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\LumaCEG.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "LumaCEG.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\SEV2 Patcher.exe"], false, 1);

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\close.bat";
    var lines = ["timeout /t 8 /nobreak", 'taskkill -im "SEV2 Patcher.exe"'];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\close.bat"], false, 1);
  }

  if (patch == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SniperEliteV2.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\SniperEliteV2.exe"), true);
  }
};