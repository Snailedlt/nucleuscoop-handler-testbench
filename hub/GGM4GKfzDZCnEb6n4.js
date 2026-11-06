Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Fri Jul 01 2022 03:54:44 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "GGM4GKfzDZCnEb6n4";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmodex.dll"];
Game.DirSymlinkExclusions = ["US\\Video"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "local_save.txt", "acquire_logo_HD.wmv", "ag_opening.wmv", "nis_logo_HD.wmv"];
Game.FileSymlinkCopyInstead = ["ConfigTool.exe", "fmodex.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "ClanOfChampions.exe";
Game.SteamID = "206230";
Game.GUID = "Clan of Champions";
Game.GameName = "Clan of Champions";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.ProtoInput.AutoHideTaskbar = true;
Game.HideDesktop = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Clan of Champions (206230)";
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = false;
Game.KeepMonitorAspectRatio = true;
Game.IgnoreWindowBorderCheck = true;
Game.RefreshWindowAfterStart = false;
Game.SetWindowHook = true;
Game.HookFocus = false;
Game.HookInit = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\206230\\remote";
Game.Description = "Get pass the tutorial in all instances then create a team or versus lobby in one instance and join in the others.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends011",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION004",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION005",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);
};