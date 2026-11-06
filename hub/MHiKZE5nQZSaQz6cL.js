Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Feb 15 2021 20:16:58 GMT+0000 (UTC).
Hub.Handler.Id = "MHiKZE5nQZSaQz6cL";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Launch the game in DX9 mode?", "Only select yes if you want to run the game in Directx 9 mode.", "DX9", answers1);

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["RFG"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "XInput1_3.dll"];
Game.FileSymlinkCopyInstead = ["FirewallInstallHelper.dll", "GameuxInstallHelper.dll", "RFG_GDF.dll", "rfg_launcher.exe"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "RFG.exe";
Game.SteamID = "20500";
Game.GUID = "Red Faction Guerrilla Steam Edition";
Game.GameName = "Red Faction Guerrilla Steam Edition";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
//Game.LauncherExe = "rfg_launcher.exe";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Red Faction: Guerrilla";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UseForceBindIP = true;
Game.UserProfileConfigPath = "Documents\\My Games\\Red Faction Guerrilla\\Options";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\20500";
Game.Description =
  "IMPORTANT: Set the regular game to windowed before running this. Connect the instaces via the default internet matchmaking option, private groups don't seem to work. Minimum required players is 3 in modes like Anarchy. If you run one instance with keyboard you have to set keyboard and mouse control in the in-game options for that instance, same for gamepads if you had set keyboard previously.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient015",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];

  Context.WriteTextFile(interfaces, lines);

  if (Player.IsKeyboardPlayer) {
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = false;
    Game.HookFocus = false;
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.UseAlpha8CustomDll = true;
  } else {
  }

  if (Context.NumControllers < 5) {
    Game.Hook.XInputReroute = false;
  } else {
    Game.FakeFocus = false;
    Game.HookFocus = false;
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.UseAlpha8CustomDll = true;
  }

  var dx9 = Context.Options["DX9"];

  if (dx9 == "Yes") {
    var Args = (Context.Args = " -nod3d11 " + " -w " + Context.Width + " -h " + Context.Height);

    Context.StartArguments = Args;
  }

  if (dx9 == "No") {
    var Args = (Context.Args = " -w " + Context.Width + " -h " + Context.Height);

    Context.StartArguments = Args;
  }
};