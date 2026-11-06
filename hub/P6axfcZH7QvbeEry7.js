Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sun Dec 27 2020 02:58:06 GMT+0000 (UTC).
Hub.Handler.Id = "P6axfcZH7QvbeEry7";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableName = "dirt3_game.exe";
Game.KillMutex = ["Codemasters DiRT3"];

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  "ogg.dll",
  "surface_materials.xml",
  "car_materials.xml",
  "car_monitor_setup.xml",
  "example_benchmark.xml",
  "wet_materials_remap.xml",
  "vorbis.dll",
  "vorbisfile.dll",
  "surface_materials.xml",
  "raceload.jpk",
  "win_000.nfs",
  "game_version.xml",
  "game.exe.cfg",
  "dbxLive32.dll"
];

Game.SteamID = "321040";
Game.GUID = "DiRT3";
Game.GameName = "DiRT 3: Complete Edition";
Game.WorkingFolder = "";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 8;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.KeepSymLinkOnExit = false;
Game.HardcopyGame = false;
Game.HardlinkGame = false;
Game.HideTaskbar = false;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = false; //set this on false. Usually not needed enabled with customdlls. Can be activare in context when there are more than 4 controllers but it was still working without problems.
Game.Hook.ForceFocusWindowName = "DiRT 3";
Game.SupportsKeyboard = true;
Game.HideCursor = true;
Game.KeyboardPlayerFirst = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = true; //set it on true for use more than 4 controllers
Game.ResetWindows = true;
Game.FakeFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false
Game.Hook.CustomDllEnabled = false;
//Added these three lines so when using CustomDlls players will be able to use mouse and keyboard on all instances for edit profile names.
Game.Hook.BlockMouseEvents = false; //If force focus is enabled, this blocks all mouse input.
Game.Hook.BlockInputEvents = false; //If force focus is enabled, this blocks all input events but gamepad.
Game.Hook.BlockKeyboardEvents = false; //If force focus is enabled, this blocks all keyboard input.

//Game.DPIHandling = Nucleus.DPIHandling.Scaled;

Game.HandlerInterval = 100;
Game.PauseBetweenStarts = 20;
Game.PauseBetweenProcessGrab = 5;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.GoldbergNeedSteamInterface = false;
Game.PromptBetweenInstances = false;

Game.UserProfileConfigPath = "Documents\\My Games\\DiRT3\\hardwaresettings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\321040";

Game.Description =
  'Has native splitscreen, but this allow you to use first person view and play with more than 2 players. Create a profile for each instance, the name of each profile is "Player One" by default, it does not affect your in game name. Host and join games via online multiplayer. "Jam Session" lets you create a custom game. Search for and join the match with the other instances via "custom match" not quickplay. If you have a keyboard player, alt tab to their instance to give them control. LAN play is possible by eding the lankey in each instances "game.exe.cfg" file, but with lan steam emu it is unnecessary';

Game.Play = function() {
  //We will use different input dll in context the number of controllers
  // If the total of controllers are less then 5
  if (Context.NumControllers < 5) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.Hook.XInputReroute = false;
    Game.Hook.CustomDllEnabled = true;
  }

  // If the total of controllers are more than 5
  else {
    //Using Ilyaki Universal Split-Screen hooks for more than 4 controllers. CustomDlls was not working.
    //This gives an error for the keyboard player. Until you don't click ok on the prompt, instance will player without problems. If you click ok, keyboard player will be closed.
    Game.InjectHookXinput = true;
    Game.InjectDinputToXinputTranslation = true;
  }

  var path = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\hardware_settings_config.xml";
  Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");
  Context.ChangeXmlAttributeValue(path, "//resolution", "vsync", "1"); //added vsync cap for better performance.
  // tried FPS cap but works only when the game is on fullscreen.

  //With these lines editing seems working but still native LAN doesn't.
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game.exe.cfg";
  var lankey = Context.FindLineNumberInTextFile(txtPath, "<lankey", Nucleus.SearchType.Contains);
  var dict = [
    lankey +
      '|    <lankey xmlns="http://schemas.microsoft.com/XBOX/LIVE/LIVECONFIG/2007/01">FEEFF00D0102030450607172' +
      Context.PlayerID +
      'a8da99a</lankey><OriginalXliveTarget xmlns="http://schemas.microsoft.com/XBOX/LIVE/LIVECONFIG/2007/01">3.0.121.0</OriginalXliveTarget></Liveconfig>'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION003",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_002",
    "SteamClient016",
    "SteamGameServer012",
    "SteamGameServerStats001"
  ];

  Context.WriteTextFile(interfaces, lines);
};