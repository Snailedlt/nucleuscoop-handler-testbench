Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Jan 20 2021 17:55:08 GMT+0000 (UTC).
Hub.Handler.Id = "dknxjjafhm6tBDiu5";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.KillMutex = ["AVPClassic2000SingleInstanceMutex"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "Galaxy.dll", "GalaxyPeer.dll", "xinput1_3.dll"];
Game.NeedsSteamEmulation = false;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "AvP_Classic.exe";
Game.SteamID = "3730";
Game.GUID = "AVP_Classic";
Game.GameName = "Aliens versus Predator Classic 2000";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 32;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "";
Game.LauncherExe = "start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.HideTaskbar = false;
Game.SetWindowHook = true;
Game.StartArguments = "-windowed";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "AvP";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.SupportsKeyboard = true;
Game.Hook.EnableMKBInput = false;
Game.UserProfileConfigPath = "AppData\\Local\\Rebellion\\AvP Classic";
Game.Description =
  "Steam version only. Make sure you add the AvP_Classic.exe inside the bin folder and not the one inside bin_Crossplay. Alt-tab to the keyboard player if you have one. Launch a new multiplayer game with the settings of your choice and join in the other instances. If the host is using a gamepad do not press A on any server settings or you will need ESC on the keyboard to unselect, instead use the d-pad to browse and change server settings. Hold left or right on the d-pad to change values faster.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\video.cfg";
  var lines = ["Width = " + Context.Width + "", "Height = " + Context.Height + "", "Depth = 32"];
  Context.WriteTextFile(txtPath, lines);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var lines = ["start bin\\AvP_Classic.exe -windowed"];

  Context.WriteTextFile(Bat, lines);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_interfaces.txt";
  var lines = [
    "SteamFriends014",
    "SteamClient008",
    "SteamGameServer009",
    "SteamUser013",
    "SteamFriends005",
    "SteamUtils005",
    "SteamMatchMaking007",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION006",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking003",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);

  if (Context.IsKeyboardPlayer) {
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

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "True";
  }
};