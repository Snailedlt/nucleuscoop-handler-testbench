Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Jan 28 2021 01:44:37 GMT+0000 (UTC).
Hub.Handler.Id = "c9s9rirF75jbxb7eu";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["BladesOfTimeApplication"];
Game.DirSymlinkExclusions = ["video"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "gaijin.ogm", "intro.ogm"];
Game.FileSymlinkCopyInstead = ["settings.blk"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "bladesoftime.exe";
Game.SteamID = "208670";
Game.GUID = "Blades of Time";
Game.GameName = "Blades of Time";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 2;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Blades of Time";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = true;
//Game.PlayerSteamIDs = [ "76561198134585131"];
Game.UserProfileConfigPath = "AppData\\Local\\BladesOfTime";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\208670\\remote";
Game.Description =
  "Run your regular game and change some graphics settings at least once before running this. Recommended that you add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x540, 1920x540, 960x1080, 960x540 ect.) so the game can see and use them.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\settings.blk";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "  windowed:b=", Nucleus.SearchType.StartsWith) + "|  windowed:b=yes",
      Context.FindLineNumberInTextFile(txtPath, "  resolution:t=", Nucleus.SearchType.StartsWith) + "|  resolution:t=" + Context.Width + "x" + Context.Height,
      Context.FindLineNumberInTextFile(txtPath, "  usegamepad:b=", Nucleus.SearchType.StartsWith) + "|  usegamepad:b=no"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\settings.blk";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "  windowed:b=", Nucleus.SearchType.StartsWith) + "|  windowed:b=yes",
      Context.FindLineNumberInTextFile(txtPath, "  resolution:t=", Nucleus.SearchType.StartsWith) + "|  resolution:t=" + Context.Width + "x" + Context.Height,
      Context.FindLineNumberInTextFile(txtPath, "  usegamepad:b=", Nucleus.SearchType.StartsWith) + "|  usegamepad:b=yes"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

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

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["208981=Dismal Swamp DLC (Blades of Time - Dismal Swamp DLC)"];

  Context.WriteTextFile(dlc, lines);
};