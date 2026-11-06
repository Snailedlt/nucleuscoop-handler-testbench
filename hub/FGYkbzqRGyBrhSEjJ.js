Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Fri Dec 25 2020 18:01:43 GMT+0000 (UTC).
Hub.Handler.Id = "FGYkbzqRGyBrhSEjJ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = ["config.cfg"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "unepic.exe";
Game.SteamID = "233980";
Game.GUID = "Unepic";
Game.GameName = "Unepic";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Unepic";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = true;
Game.HookFocus = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\233980";
Game.Description = "";
Game.KeepSymLinkOnExit = false;
Game.Description =
  "Use the mouse cursor if you have trouble selecting some menus with gamepad, alt-tab between instances to use the keyboard for naming characters and such. In the game options you can change the panels size if they are blocking the view and you can also change the aspect ratio to see better.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var filePath = (Context.filePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote");
  System.IO.Directory.CreateDirectory(filePath);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote\\config.cfg")) {
    var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote\\config.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootFolder, "config.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote\\config.cfg";
    Context.ChangeXmlNodeInnerTextValue(path, "//screenMode", "1");
    Context.ChangeXmlNodeInnerTextValue(path, "//padEnabled", "1");
  } else {
    var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote\\config.cfg";
    Context.ChangeXmlNodeInnerTextValue(path, "//screenMode", "1");
    Context.ChangeXmlNodeInnerTextValue(path, "//padEnabled", "1");
  }

  if (Player.IsKeyboardPlayer) {
    var path = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote\\config.cfg";
    Context.ChangeXmlNodeInnerTextValue(path, "//padEnabled", "0");
  }
};