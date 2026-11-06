Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Dec 08 2019 03:31:04 GMT+0000 (UTC).
Hub.Handler.Id = "TNjzLbQHyqNwae6wJ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["binaries"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "ABProfileSettings"];
Game.FileSymlinkCopyInstead = ["DefaultEngine.ini"];
Game.KillMutex = ["UnrealEngine3_3"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "alienbreed3descent.exe";
Game.SteamID = "22670";
Game.GUID = "Alien Breed 3 Descent";
Game.GameName = "Alien Breed 3 Descent";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "binaries";
Game.LauncherTitle = "splashscreen";
Game.HideTaskbar = false;
Game.StartArguments = "-windowed -AlwaysFocus";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Alien Breed 3: Descent";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\UnrealEngine3\\AlienBreed3DescentGame\\Config\\AlienBreed3DescentEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", "False"),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", "FALSE")
  ]);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\AlienBreedEp1Game\\Config\\DefaultEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("SystemSettings", "ResetResolution", false)
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\steam_interfaces.txt";
  var lines = [
    "SteamClient008",
    "SteamGameServer009",
    "SteamUser013",
    "SteamFriends005",
    "SteamUtils004",
    "SteamMatchMaking007",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION006",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking003",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(autoExec, lines);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binaries\\steam_settings\\DLC.txt";
  var lines = [""];

  Context.WriteTextFile(autoExec, lines);

  if (Player.IsKeyboardPlayer) {
    Context.StartArguments = "-windowed -AlwaysFocus -nosplash -nomoviestartup -NoController";
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.StartArguments = "-windowed -AlwaysFocus -nosplash -nomoviestartup -nomouse";
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }
};
