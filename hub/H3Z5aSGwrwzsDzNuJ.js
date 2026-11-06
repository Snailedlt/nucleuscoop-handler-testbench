Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Apr 06 2021 07:36:04 GMT+0000 (UTC).
Hub.Handler.Id = "H3Z5aSGwrwzsDzNuJ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Force DirectX 9 renderer?", "Forcing DX9 may result in better performance for some devices.", "DX9", answers1);
Game.AddOption("Lobby connect.", "Use this to connect to a private match if the overlay doesn't show in DX9.", "Lobby", answers2);

Game.ExecutableContext = ["bigfile.000.tiger"];
Game.KillMutex = ["TOMBRAIDER_MUTEX"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "xinput9_1_0.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "tombraider.exe";
Game.SteamID = "203160";
Game.GUID = "Tomb Raider";
Game.GameName = "Tomb Raider";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-nolauncher";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Tomb Raider";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\203160\\remote";
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "ExclusiveFullscreen", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "Fullscreen", 1, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "FullscreenHeight", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "FullscreenWidth", Context.Width, Nucleus.RegType.DWord);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION002"
  ];

  Context.WriteTextFile(interfaces, lines);

  var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disable_lan_only.txt";
  var lines = [""];

  Context.WriteTextFile(nolan, lines);

  if (Context.AspectRatioDecimal > 1.8) {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "AspectRatio", "35555", Nucleus.RegType.DWord);
  } else if (Context.AspectRatioDecimal < 1.2) {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "AspectRatio", "8888", Nucleus.RegType.DWord);
  } else {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "AspectRatio", "17778", Nucleus.RegType.DWord);
  }

  if (Context.NumControllers < 5) {
    Game.Hook.XInputReroute = false;
  } else {
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.XInputNames = ["xinput9_1_0.dll"];
  }

  var dx9 = Context.Options["DX9"];
  var lobby = Context.Options["Lobby"];

  if (dx9 == "Yes") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "RenderAPI", 9, Nucleus.RegType.DWord);
  }

  if (dx9 == "No") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Crystal Dynamics\\Tomb Raider\\Graphics", "RenderAPI", 0, Nucleus.RegType.DWord);
  }

  if (lobby == "Yes") {
    Game.GoldbergLobbyConnect = true;
  }

  if (lobby == "No") {
    Game.GoldbergLobbyConnect = false;
  }
};