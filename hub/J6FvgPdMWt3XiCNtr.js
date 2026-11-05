Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Nov 21 2022 18:23:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "J6FvgPdMWt3XiCNtr";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Use the DX9 .exe?", "Only select yes if you want to run the game's Directx 9 exe.", "DX9", answers1);

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["SR3"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_appid.txt",
  "steam_interfaces.txt",
  "local_save.txt",
  "xinput1_3.dll",
  "SaintsRowTheThird.exe",
  "SaintsRowTheThird_DX11.exe",
  "game_launcher.exe"
];
Game.FileSymlinkCopyInstead = ["display.ini"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SaintsRowTheThird_DX11.exe";
Game.SteamID = "55230";
Game.GUID = "Saints Row The Third";
Game.GameName = "Saints Row: The Third (DX11)";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Saints Row: The Third";
Game.FakeFocus = true;
Game.FakeFocusInterval = 7000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UseForceBindIP = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\55230";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "So the instances launch and resize correctly make sure to run your main game at least once first and change some graphic settings. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add: 1920x540, 960x1080, 960x540 etc.) so the game can see and use them.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\display.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ResolutionWidth =", Nucleus.SearchType.StartsWith) + "|ResolutionWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ResolutionHeight =", Nucleus.SearchType.StartsWith) + "|ResolutionHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "Fullscreen =", Nucleus.SearchType.StartsWith) + "|Fullscreen = false",
    Context.FindLineNumberInTextFile(txtPath, "VerifyResolution =", Nucleus.SearchType.StartsWith) + "|VerifyResolution = false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\display.ini";
  var dict = ["79|SkipIntroVideo = true"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient009",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser014",
    "SteamFriends007",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION007",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking004",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
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

  var dx9 = Context.Options["DX9"];

  if (dx9 == "Yes") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SaintsRowTheThird.exe"), System.IO.Path.Combine(Context.RootFolder, "SaintsRowTheThird_DX11.exe"), true);
  }

  if (dx9 == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "SaintsRowTheThird_DX11.exe"), System.IO.Path.Combine(Context.RootFolder, "SaintsRowTheThird_DX11.exe"), true);
  }
};