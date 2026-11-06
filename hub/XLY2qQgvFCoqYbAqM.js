Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Mar 06 2020 08:38:26 GMT+0000 (UTC).
Hub.Handler.Id = "XLY2qQgvFCoqYbAqM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["binaries\\win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.GameName = "Deadfall Adventures";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "ADVGame-Win32-Shipping.exe";
Game.SteamID = "231330";
Game.GUID = "Deadfall Adventures";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.BinariesFolder = "binaries\\win32";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Deadfall Adventures (32-bit, DX9)";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\231330\\remote";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Deadfall Adventures\\ADVGame\\Config\\ADVEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false)
  ]);

  if (Player.IsKeyboardPlayer) {
    Context.StartArguments = "-seekfreeloadingpcconsole -windowed -AlwaysFocus -nosplash -nomoviestartup";
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.StartArguments = "-seekfreeloadingpcconsole -windowed -AlwaysFocus -nosplash -nomoviestartup";
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\win32\\steam_interfaces.txt";
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
};
