Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Feb 28 2022 07:36:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ZSrFAJoaexSAn482W";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Custom match?", "Only use if you're having issues connecting more than 2p to the same game.", "Lobby", answers1);

Game.DirSymlinkExclusions = ["Data\\Cutscenes", "Win\\Packs"];
Game.DirSymlinkCopyInstead = ["Win\\Packs"];
Game.FileSymlinkExclusions = ["steam_api.dll", "DF_Logo.bik", "steam_interfaces.txt", "XInput1_3.dll"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = false;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "BrutalLegend.exe";
Game.SteamID = "225260";
Game.GUID = "Brutal Legend";
Game.GameName = "Brütal Legend";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Brütal Legend";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HideCursor = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Doublefine\\BrutalLegend";
Game.Description =
  "IMPORTANT: On first Nucleus run the instances will take some time to launch because Nucleus needs to make a full copy of one of the game's folders for this to work correctly, be patient. So the instances launch and resize correctly make sure you ran your main game at least once and changed some graphic settings. Select multiplayer-matchmaking in all instances then press start at the same time to find the other players. If you select the custom match option in Nucleus UI click the prompt to open the other instances until you have created a custom multiplayer match in the first.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var txtPath = Context.NucleusUserRoot + "\\AppData\\Roaming\\Doublefine\\BrutalLegend\\screen.dat";
  var dict = ["1|fullscreen = false", "2|width = " + Context.Width, "3|height = " + Context.Height];
  Context.ReplaceLinesInTextFile(txtPath, dict);

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

  if (Context.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  var lobby = Context.Options["Lobby"];

  if (lobby == "Yes") {
    Game.GoldbergLobbyConnect = true;
  }

  if (lobby == "No") {
    Game.GoldbergLobbyConnect = false;
  }
};