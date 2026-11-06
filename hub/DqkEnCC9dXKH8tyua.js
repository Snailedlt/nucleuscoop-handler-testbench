Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Jun 06 2021 04:35:40 GMT+0000 (UTC).
Hub.Handler.Id = "DqkEnCC9dXKH8tyua";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["data"];
Game.KillMutex = ["completeRQ", "updated", "vblank"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "dinput8.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["loadtable.bin", "localsettings.ini", "GG2OT.ini", "d3d9.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.RenameNotKillMutex = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "ggsx.exe";
Game.SteamID = "437000";
Game.GUID = "GUILTY GEAR 2 OVERTURE";
Game.GameName = "GUILTY GEAR 2 -OVERTURE-";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "GUILTY GEAR 2 -Overture- Ver.1.0.6.685";
Game.HasDynamicWindowTitle = true;
Game.IgnoreWindowBordercheck = false;
Game.DontResize = false;
Game.DontReposition = false;
Game.NotTopMost = false;
Game.FakeFocus = false;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\437000\\remote";
Game.Description =
  "The game has native split-screen for 2 players max but with this you can play the online mode locally with up to 4 players. Create an online multiplayer game in one instance and join in the others. The keyboard instance can only use the keyboard but you can move the camera with keyboard keys too. If the instances do not resize at all make sure the window name of your game matches exactly with the window name inside in the script.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient017",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser018",
    "SteamFriends015",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION007",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION013",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION007",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_003",
    "STEAMINVENTORY_INTERFACE_V001",
    "SteamController003",
    "STEAMVIDEO_INTERFACE_V001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.IsKeyboardPlayer) {
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "True";
  } else {
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }
};