Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Jan 02 2021 23:53:19 GMT+0000 (UTC).
Hub.Handler.Id = "gFS54ndbopL3eXpvw";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw64.dll"];
Game.DirSymlinkExclusions = ["binaries\\x64", "binaries\\x86"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_interfaces.txt", "steam_appid.txt"];
Game.GameName = "HELLDIVERS";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "helldivers.exe";
Game.SteamID = "394510";
Game.GUID = "Helldivers";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "binaries\\x64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.LauncherExe = "start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.StartArguments = "-bundle-dir contents -ini settings";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Helldivers";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.KeepSymLinkOnExit = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
//Game.PlayerSteamIDs = [ "76561198422152818"];
Game.UserProfileSavePath = "AppData\\Roaming\\Arrowhead\\Helldivers\\saves";
Game.UserProfileConfigPath = "AppData\\Roaming\\Arrowhead\\Helldivers";
Game.Description =
  "This game already supports 4 player local co-op but with this script each player can have different progression and have their own upgrades. Join the other players in multiplayer via the friends tab.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var username = System.Environment.UserName;

  if (System.IO.File.Exists("C:\\Users\\" + username + "\\AppData\\Roaming\\Arrowhead\\Helldivers\\user_settings.config")) {
    Context.BackupFile("C:\\Users\\" + username + "\\AppData\\Roaming\\Arrowhead\\Helldivers\\user_settings.config", true);

    var txtPath = "C:\\Users\\" + username + "\\AppData\\Roaming\\Arrowhead\\Helldivers\\user_settings.config";
    var dict = [
      "3|aspect_ratio = -1",
      "4|borderless_fullscreen = false",
      "5|fullscreen = false"
      //"48|    " + Context.Width,
      //"49|    " + Context.Height,
    ];

    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
  }

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var lines = ["start binaries\\x64\\helldivers.exe -bundle-dir contents -ini settings"];

  Context.WriteTextFile(Bat, lines);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\x64\\steam_interfaces.txt";
  var lines = [
    "SteamClient014",
    "SteamGameServer012",
    "SteamGameServerStats001",
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
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(interfaces, lines);
};