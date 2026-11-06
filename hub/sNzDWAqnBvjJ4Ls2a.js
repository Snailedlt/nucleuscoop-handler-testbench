Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Jan 07 2021 08:10:36 GMT+0000 (UTC).
Hub.Handler.Id = "sNzDWAqnBvjJ4Ls2a";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["FrontMission"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "dinput8.dll", "xinput1_3.dll"];
Game.GameName = "Front Mission Evolved";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "FrontMissionEvolved.exe";
Game.SteamID = "43000";
Game.GUID = "Front Mission Evolved";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.StartArguments = "";
Game.Hook.ForceFocusWindowName = "Front Mission Evolved";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusOldDll = true;
Game.XInputPlusDll = ["xinput1_3.dll", "Dinput8.dll"];
Game.FakeFocus = false;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.UserProfileConfigPath = "Documents\\Front Mission Evolved";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\43000\\remote";
Game.Description =
  "So the instances launch and resize correctly make sure to run your main game at least one time first and change some graphic settings. In the gamepad instances first enable gamepad in the game options before starting multiplayer. If you launch an instance with the keyboard icon the last instance that opens will be always the keyboard player, alt-tab to it if you can not control it, do not enable gamepad in options for that one. Use the cursor if you can not select a mecha or other menus with the gamepad.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\graphics.cfg";
  var dict = ["2|Fullscreen=0 ", "4|ScreenHeight=" + Context.Height, "5|ScreenWidth=" + Context.Width];

  Context.ReplaceLinesInTextFile(txtPath, dict);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)")
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay.txt";
  var lines = [""];

  Context.WriteTextFile(nolay, lines);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  Context.WriteTextFile(interfaces, lines);
};