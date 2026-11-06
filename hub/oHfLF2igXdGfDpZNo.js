Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Mar 26 2020 02:58:00 GMT+0000 (UTC).
Hub.Handler.Id = "oHfLF2igXdGfDpZNo";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Binaries\\Win32"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "mnc.exe";
Game.SteamID = "63200";
Game.GUID = "Monday Night Combat";
Game.GameName = "Monday Night Combat";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.BinariesFolder = "Binaries\\Win32";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Monday Night Combat";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.UseAlpha8CustomDll = false;
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = false;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Description = "Use mouse to navigate menus/pick classes. When selecting a class after starting press start on the gamepad on that instance so you can move the cursor to join in the other.";
Game.PauseBetweenStarts = 30;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\63200";

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\steam_interfaces.txt";
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

  Context.WriteTextFile(autoExec, lines);
};