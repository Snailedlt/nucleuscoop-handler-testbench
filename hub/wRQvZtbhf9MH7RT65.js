Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Aug 05 2021 23:00:43 GMT+0000 (UTC).
Hub.Handler.Id = "wRQvZtbhf9MH7RT65";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["DukeForeverMutex"];
Game.DirSymlinkExclusions = ["System", "Movies"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "Attract.bik", "Dice_Intro.bik", "Legal.bik", "local_save.txt", "xinput1_3.dll"];
Game.GameName = "Duke Nukem Forever";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DukeForever.exe";
Game.SteamID = "57900";
Game.GUID = "Duke Nukem Forever";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "System";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.LauncherTitle = "splashscreen";
Game.StartArguments = "-windowed";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Duke Nukem Forever";
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\57900\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "On first Nucleus run change some advanced graphics options in the game video settings in each instance, apply then close and launch again via Nucleus to fix the stretching. Create a multiplayer lobby in one instance then join in the others.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenProcessGrab = 15;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\system.ini")) {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\system.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Engine.WindowsClient", "WindowedViewportX", Context.Width),
      new Nucleus.IniSaveInfo("Engine.WindowsClient", "WindowedViewportY", Context.Height),
      new Nucleus.IniSaveInfo("Engine.WindowsClient", "StartupFullscreen", "False")
    ]);
  } else {
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends009",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION009",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\System\\steam_settings\\DLC.txt";
  var lines = ["57925=The Doctor Who Cloned Me", "57923=Duke Nukem Forever: Hail to the Icons Parody Pack"];
  Context.WriteTextFile(dlc, lines);

  if (Player.IsKeyboardPlayer) {
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }
};