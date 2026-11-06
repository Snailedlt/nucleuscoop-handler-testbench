Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Mar 17 2021 06:21:32 GMT+0000 (UTC).
Hub.Handler.Id = "kPHKXNftSoA37JPL8";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Type:Semaphore|OrcsMustDie2"];
Game.ExecutableContext = ["NXCHARACTER.DLL"];
Game.DirSymlinkExclusions = ["build\\game", "build\\release"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "dinput8.dll", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "OrcsMustDie2.exe";
Game.SteamID = "201790";
Game.GUID = "Orcs Must Die 2";
Game.GameName = "Orcs Must Die! 2";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "build\\game";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Orcs Must Die 2";
Game.FakeFocus = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\Shiner";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\201790";
Game.Description =
  "IMPORTANT: So the instances launch and resize correctly make sure you run your main game at least once and change some graphic settings before launching via Nucleus. Use the mouse cursor to create a group in one instance and invite the other player using the overlay that will appear, right click his name in the overlay to invite and accept with the cursor in the other instance, do that before clicking on Nucleus last prompt. Click on one instance if the camera movement is erratic in-game. Alt-tab between instances to use the keyboard.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\VideoSettings.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//XResolution", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//YResolution", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//Fullscreen", "0");
  Context.ChangeXmlNodeInnerTextValue(path, "//Borderless", "0");

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\build\\game\\steam_interfaces.txt";
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