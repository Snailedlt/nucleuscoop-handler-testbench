Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Aug 06 2025 23:38:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yEPA5JuMkmer8JK6D";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["DX9", "DX11"];
Game.AddOption("Red Faction Armageddon exe?", "Select the game's exe to use.", "API", answers1);

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["RFA"];
Game.DirSymlinkExclusions = ["build\\pc\\cache"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_appid.txt",
  "steam_interfaces.txt",
  "local_save.txt",
  "xinput1_3.dll",
  "RedFactionArmageddon.exe",
  "RedFactionArmageddon_DX11.exe",
  "rf4_launcher.exe",
  "legal_hd.bik",
  "legal_hd_no_esrb.bik",
  "legal_hd_PS3.bik",
  "legal_hd_PS3_no_esrb.bik",
  "legal_hd_PS3-demo.bik",
  "legal_hd-demo.bik",
  "logo_SPIKE.bik",
  "logo_SyfyGAMES.bik",
  "logo_THQ-V-RFA.bik"
];
Game.FileSymlinkCopyInstead = ["binkw32.dll"];
Game.RequiresAdmin = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimental = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "rf4_launcher.exe";
Game.SteamID = "55110";
Game.GUID = "Red Faction Armageddon";
Game.GameName = "Red Faction: Armageddon";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Red Faction: Armageddon";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UseForceBindIP = true;
Game.ForceBindIPNoDummy = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\55110";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Tested with the latest Steam version. Host an infestation internet public game in one instance and use start matchmaking to join in the others. Set your main game to windowed if the instances launch in fullscren. This FOV fix also works to change the FOV in the co-op infestation mode: https://community.pcgamingwiki.com/files/file/421-red-faction-armageddon-fov-fix/.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  Context.StartArguments = " -packfiles";

  Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\Volition\\Red Faction: Armageddon\\Video Settings", "Fullscreen", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\Volition\\Red Faction: Armageddon\\Video Settings", "ResolutionHeight", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\Volition\\Red Faction: Armageddon\\Video Settings", "ResolutionWidth", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Classes\\VirtualStore\\MACHINE\\SOFTWARE\\WOW6432Node\\Volition\\Red Faction: Armageddon\\Video Settings", "Fullscreen", 0, Nucleus.RegType.DWord);

  Context.EditRegKey(
    "HKEY_CURRENT_USER",
    "SOFTWARE\\Classes\\VirtualStore\\MACHINE\\SOFTWARE\\WOW6432Node\\Volition\\Red Faction: Armageddon\\Video Settings",
    "ResolutionHeight",
    Context.Height,
    Nucleus.RegType.DWord
  );

  Context.EditRegKey(
    "HKEY_CURRENT_USER",
    "SOFTWARE\\Classes\\VirtualStore\\MACHINE\\SOFTWARE\\WOW6432Node\\Volition\\Red Faction: Armageddon\\Video Settings",
    "ResolutionWidth",
    Context.Width,
    Nucleus.RegType.DWord
  );

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser014",
    "SteamFriends008",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION009",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking004",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var api = Context.Options["API"];

  if (api == "DX9") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "RedFactionArmageddon.exe"), System.IO.Path.Combine(Context.RootFolder, "rf4_launcher.exe"), true);
  }

  if (api == "DX11") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "RedFactionArmageddon_DX11.exe"), System.IO.Path.Combine(Context.RootFolder, "rf4_launcher.exe"), true);
  }
};