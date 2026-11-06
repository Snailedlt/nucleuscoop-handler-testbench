Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Jan 16 2023 07:27:56 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "jXrgsvX77t32x5ngP";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Tools"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DarknessII.exe";
Game.SteamID = "67370";
Game.GUID = "The Darkness II";
Game.GameName = "The Darkness II";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
//Game.StartArguments = "-windowed";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "The Darkness II";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\DarknessII";
Game.Description =
  "IMPORTANT: Set your default game to windowed and in the resolution you want before launching via Nucleus Co-op. Start an online lobby in the first instance before opening the second one, alt-tab between the instances to control them before activating the focus hooks with the last prompt.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Tools\\steam_interfaces.txt";
  var lines = [
    "SteamClient010",
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
    "STEAMHTTP_INTERFACE_VERSION001",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Tools\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Tools\\steam_settings\\DLC.txt";
  var lines = [
    "204803=Darkness II Poster",
    "204802=Darkness II Comixology Code",
    "204800=Darkness II Pre-order",
    "67402=Darkness II DLC 3",
    "67401=Darkess II DLC 2",
    "67400=Darkness II DLC 1"
    //"67379=Darkness II Low Violence",
  ];
  Context.WriteTextFile(dlc, lines);
};