Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Feb 05 2021 20:29:56 GMT+0000 (UTC).
Hub.Handler.Id = "BWFeqjN8YLbYoCni4";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmodex.dll"];
Game.KillMutex = ["TITLE-392"]; //TITLE-39291D0A-900F-4c8d-B051-E0EDF94517A6
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.FileSymlinkCopyInstead = [
  "EffectFragments_F.dll",
  "fmod_event.dll",
  "fmodex.dll",
  "FragmentBundle_F.dll",
  "GuiFragments_F.dll",
  "Pf2DFragments_F.dll",
  "DX10_Shaders_F.shader_bundle",
  "DX10_SpecialShaders_F.shader_bundle",
  "ShadersDLC_F.shader_bundle"
];
Game.PartialMutexSearch = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "RenegadeOps.exe";
Game.SteamID = "99300";
Game.GUID = "Renegade Ops";
Game.GameName = "Renegade Ops";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
//Game.StartArguments = "/borderless";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Renegade Ops";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.SetForegroundWindowElsewhere = true;
Game.UseForceBindIP = true;
Game.UserProfileSavePath = "Documents\\SEGA\\Renegade Ops\\Saves";
Game.Description =
  "Needs steam open to launch correctly. Set your main game to windowed and in the custom resolution you want before running this. If you want to avoid screen stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540 etc.) and set those in-game in each instance. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. This game already has native splitscreen for 2 players max but with this script you can play with 4.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient011",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends009",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];

  Context.WriteTextFile(interfaces, lines);
};