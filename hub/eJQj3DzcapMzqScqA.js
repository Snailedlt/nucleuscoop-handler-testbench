Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun May 29 2022 06:05:37 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "eJQj3DzcapMzqScqA";
Hub.Maintainer.Name = "Dreadnot";
Hub.Maintainer.Id = "imcayCstgHndCbyMo";

Game.ExecutableContext = ["IFC23.dll"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steamclient.dll", "steam_appid.txt", "steam_interfaces.txt", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["lang.cfg"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Inversion.exe";
Game.SteamID = "212410";
Game.GUID = "Inversion";
Game.GameName = "Inversion";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.BinariesFolder = "bin";
Game.LauncherTitle = "";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Inversion";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 1000;
Game.SendFakeFocusMsg = true;
Game.UseDirectX9Wrapper = true;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\Inversion Saves";
//Game.UserProfileSavePath = "Documents\\Inversion Saves";
Game.Description =
  "IMPORTANT DO THIS OR THIS WON'T WORK: Make sure you can launch and play this game fine from Steam before using this. On Nucleus launch press the Windows keyboard key before the first instance opens, when all the other instances have opened press the windows key again to close the start menu, you have to do this or the instances will not resize correctly. In the title menu go to party settings and set all instances to System Link/LAN, press Y in your gamepad to open that menu, if the instances do not see each other in the top right players menu set the instances back to online, accept then back to System Link/LAN until they see the other players. After the instances are connected start a co-op campaign or multiplayer game. If you want to fix stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (this game only sees custom horizontal resolutions like 1920x600 and 3840x1080) so the game can see and use them. Reduce res and other graphics settings in-game to improve performance, apply then launch again.";
Game.UseForceBindIP = true;
//Game.FlawlessWidescreen = "Inversion";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 7;
Game.PauseBetweenStarts = 32;

Game.Play = function() {
  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steamless.bat";
  var lines = [
    '"' + Context.NucleusFolder + '\\utils\\Steamless\\Steamless.CLI.exe" --quiet --keepbind ' + '"' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\bin\\Inversion.exe"',
    'move /y "Inversion.exe.unpacked.exe" "Inversion.exe"'
  ];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steamless.bat"], false, 1);

  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\game_local.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "	VIDEO_FullScr", Nucleus.SearchType.StartsWith) + "|	VIDEO_FullScr    =    0",
    Context.FindLineNumberInTextFile(txtPath, "	Voice", Nucleus.SearchType.StartsWith) + "|	Voice    =    0"
    //Context.FindLineNumberInTextFile(txtPath, "	FocusDevice", Nucleus.SearchType.StartsWith) + '|	FocusDevice    =    controller',
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_interfaces.txt";
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
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION006",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.AspectRatioDecimal > 1.8) {
    Context.BackupFile(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\game_local.cfg", true);

    var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\game_local.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "	VIDEO_SizeX", Nucleus.SearchType.StartsWith) + "|	VIDEO_SizeX    =    " + Context.Width,
      Context.FindLineNumberInTextFile(txtPath, "	VIDEO_SizeY", Nucleus.SearchType.StartsWith) + "|	VIDEO_SizeY    =    " + Context.Height
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else if (Context.AspectRatioDecimal < 1.2) {
  } else {
  }
};