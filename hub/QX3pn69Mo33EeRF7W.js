Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Fri Sep 05 2025 21:59:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "QX3pn69Mo33EeRF7W";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Private match?", "Use if you want to start a co-op or versus match with only 2 players.", "Lobby", answers1);

Game.ExecutableContext = ["data"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["logs\\GamePC"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["bugsplat.dll", "bugsplatrc.dll", "dbghelp.dll", "signatures.2048exp65537.dat"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SpaceMarine.exe";
Game.SteamID = "55150";
Game.GUID = "Space Marine";
Game.GameName = "Warhammer 40,000: Space Marine";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.StartArguments = "-window";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Warhammer 40,000: Space Marine";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusOldDll = true;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\55150\\remote";
Game.UserProfileConfigPath = "AppData\\Local\\THQ\\Relic Entertainment\\Space Marine";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Run your main game and change some graphic settings before launching this. 3 players is the minimum to start an Exterminatus co-op game, if you want to start a match with only 2 players use the Nucleus UI option for private match.";
//Game.FlawlessWidescreen = "Warhammer40kSM";
Game.PauseBetweenStarts = 25;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\gamePC.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Resolution.Height", Nucleus.SearchType.StartsWith) + "|Resolution.Height = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "Resolution.Width", Nucleus.SearchType.StartsWith) + "|Resolution.Width = " + Context.Width
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  if (Context.NumControllers < 5) {
  } else {
    Game.Hook.UseAlpha8CustomDll = true;
    Game.Hook.XInputNames = ["XInput9_1_0.dll"];
  }

  var lobby = Context.Options["Lobby"];

  if (lobby == "Yes") {
    Game.GoldbergLobbyConnect = true;
  }

  if (lobby == "No") {
    Game.GoldbergLobbyConnect = false;
  }
};