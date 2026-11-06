Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Apr 21 2020 22:39:00 GMT+0000 (UTC).
Hub.Handler.Id = "TezCrQvs72uqce93G";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["OnlineSubsystemSteamworks.U"];
Game.DirSymlinkExclusions = ["MP\\Builds\\Binaries", "SP\\Builds\\Binaries"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = ["DefaultOptions.ini"];
Game.GameName = "BioShock 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Bioshock2.exe";
Game.SteamID = "8850";
Game.GUID = "BioShock 2";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.BinariesFolder = "MP\\Builds\\Binaries";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "BioShock 2";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.Description = "Start a private MP game and the other instances can join via the search match option.";
Game.UserProfileConfigPath = "AppData\\Roaming\\Bioshock2Steam";
Game.UserProfileSavePath = "Documents\\Bioshock2\\SaveGames";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var username = System.Environment.UserName;
  var VideoConfig = "C:\\Users\\" + username + "\\AppData\\Roaming\\Bioshock2Steam\\Bioshock2MP.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false)
  ]);

  var username = System.Environment.UserName;
  var VideoConfig = "C:\\Users\\" + username + "\\AppData\\Roaming\\Bioshock2Steam\\Bioshock2SP.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", false)
  ]);

  var username = System.Environment.UserName;
  var VideoConfig = "C:\\Users\\" + username + "\\AppData\\Roaming\\Bioshock2Steam\\Shared.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SharedOptions", "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("SharedOptions", "ViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SharedOptions", "ViewportY", Context.Height)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MP\\Builds\\Binaries\\DefaultOptions.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SharedOptions", "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("SharedOptions", "ViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SharedOptions", "ViewportY", Context.Height)
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MP\\Builds\\Binaries\\steam_interfaces.txt";
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

  Context.WriteTextFile(interfaces, lines);
};