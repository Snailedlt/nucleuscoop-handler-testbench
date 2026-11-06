Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Nov 26 2020 06:01:59 GMT+0000 (UTC).
Hub.Handler.Id = "jdbxt3B7Peoc2cTww";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Rage"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_interfaces.txt", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["Rage64.exe"];
Game.GameName = "RAGE";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "rage.exe";
Game.SteamID = "9200";
Game.GUID = "RAGE";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.StartArguments = "+set com_multiplayer 1 +pc_currentDisc 3";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Rage";
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.ResetWindows = true;
Game.HideCursor = false;
Game.KeepSymLinkOnExit = true;
Game.UserProfileConfigPath = "Saved Games\\id Software\\Rage\\base";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\9200\\remote";
Game.Description =
  "Set your default game to windowed before running this. On first Nucleus launch using the keyboard in the in-game settings enable gamepad, press the esc key and you can now control the menus with your gamepad, select your custom resolution in the video settings too, open the next instance with the prompt once you have done all that and when the instance has positioned, resized and lost borders correctly. Do the same for all instances, alt-tab between instances to use the keyboard. You need to add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 1920x540, 960x540 etc.) for the game to see them and resize correctly. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI. Only working with latest steam version of the game, steam needs to be open for the instances to launch correctly.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
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
};