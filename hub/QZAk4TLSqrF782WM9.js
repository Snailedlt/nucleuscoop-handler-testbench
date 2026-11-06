Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Fri Mar 29 2024 11:06:19 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "QZAk4TLSqrF782WM9";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Use DirectX9 Wrapper?", "Only use if the game instances have trouble running fullscreen on first run in your PC, read the handler notes carefully.", "D3D9", answers1);
Game.AddOption(
  "Use Flawless Widescreen?",
  "Only select yes if you want to change the FOV and fix hud/menus. If you select yes when you launch it for the first time you will get a message saying it can't find the Flawless Widescreen module, click ok and FWS will open, in the list of modules select the War in the North one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again and the patches should apply automatically, if they don't apply automatically after FWS opens the second time just select the new instances modules that Nucleus created in the FWS UI and they should enable. Use CTRL+T if Nucleus instances get in the way.",
  "FW",
  answers2
);

Game.ExecutableContext = ["res"];
Game.KillMutex = ["TRIXIE_RUNNING_COUNT"];
Game.DirSymlinkExclusions = [
  "32800",
  "32800\\local",
  "res",
  "res\\audio",
  "res\\engine",
  "res\\engine\\padmap",
  "res\\engine\\shaders",
  "res\\entities\\entitydefs\\dwarfpaqs",
  "res\\entities\\entitydefs\\elfpaqs",
  "res\\entities\\entitydefs\\humanpaqs",
  "res\\entities\\entitydefs\\players",
  "res\\entities\\entitydefs\\allies\\archer",
  "res\\entities\\entitydefs\\allies\\defender",
  "res\\entities\\entitydefs\\allies\\mage",
  "res\\gamedata",
  "res\\quests",
  "res\\worlds",
  "res\\worlds\\barrow_downs\\area_2_level_1_b",
  "res\\worlds\\barrow_downs\\area_2_level_3",
  "res\\worlds\\bree",
  "res\\worlds\\carn_dum\\carn_dum_level_1",
  "res\\worlds\\carn_dum\\carn_dum_level_2",
  "res\\worlds\\empty_frontend",
  "res\\worlds\\ettenmoors\\ettenmoors_1",
  "res\\worlds\\ettenmoors\\ettenmoors_2",
  "res\\worlds\\ettenmoors\\ettenmoors_boss",
  "res\\worlds\\fornost\\area_4_level_1",
  "res\\worlds\\fornost\\area_4_level_1b",
  "res\\worlds\\fornost\\area_4_level_2",
  "res\\worlds\\fornost\\area_4_level_3",
  "res\\worlds\\fornost\\area_4_level_3b",
  "res\\worlds\\fornost\\area_4_sidequest_1",
  "res\\worlds\\lorien\\dlc_lorien_outpost",
  "res\\worlds\\mirkwood\\mirkwood_level_1a",
  "res\\worlds\\mirkwood\\mirkwood_level_1b",
  "res\\worlds\\mirkwood\\mirkwood_level_2a",
  "res\\worlds\\mirkwood\\mirkwood_level_2b",
  "res\\worlds\\mount_gundabad\\mount_gundabad_level_1",
  "res\\worlds\\mount_gundabad\\mount_gundabad_level_2",
  "res\\worlds\\mount_gundabad\\mount_gundabad_level_2b",
  "res\\worlds\\nordinbad\\nordinbad",
  "res\\worlds\\nordinbad\\nordinbad_aftermath",
  "res\\worlds\\nordinbad\\nordinbad_siege",
  "res\\worlds\\osgiliath",
  "res\\worlds\\rivendell",
  "res\\worlds\\sarn_ford\\area1_level1",
  "res\\worlds\\urgost\\urgost_intro",
  "res\\worlds\\urgost\\urgost_lair"
];
Game.DirSymlinkCopyInstead = [
  "res\\audio",
  "res\\engine",
  "res\\engine\\padmap",
  "res\\engine\\shaders",
  "res\\entities\\entitydefs\\dwarfpaqs",
  "res\\entities\\entitydefs\\elfpaqs",
  "res\\entities\\entitydefs\\humanpaqs",
  "res\\entities\\entitydefs\\players",
  "res\\entities\\entitydefs\\allies\\archer",
  "res\\entities\\entitydefs\\allies\\defender",
  "res\\entities\\entitydefs\\allies\\mage",
  "res\\gamedata",
  "res\\quests",
  "res\\worlds",
  "res\\worlds\\barrow_downs",
  "res\\worlds\\barrow_downs\\area_2_level_1_b",
  "res\\worlds\\barrow_downs\\area_2_level_3",
  "res\\worlds\\bree",
  "res\\worlds\\carn_dum",
  "res\\worlds\\carn_dum\\carn_dum_level_1",
  "res\\worlds\\carn_dum\\carn_dum_level_2",
  "res\\worlds\\empty_frontend",
  "res\\worlds\\ettenmoors",
  "res\\worlds\\ettenmoors\\ettenmoors_1",
  "res\\worlds\\ettenmoors\\ettenmoors_2",
  "res\\worlds\\ettenmoors\\ettenmoors_boss",
  "res\\worlds\\fornost",
  "res\\worlds\\fornost\\area_4_level_1",
  "res\\worlds\\fornost\\area_4_level_1b",
  "res\\worlds\\fornost\\area_4_level_2",
  "res\\worlds\\fornost\\area_4_level_3",
  "res\\worlds\\fornost\\area_4_level_3b",
  "res\\worlds\\fornost\\area_4_sidequest_1",
  "res\\worlds\\lorien\\dlc_lorien_outpost",
  "res\\worlds\\mirkwood",
  "res\\worlds\\mirkwood\\mirkwood_level_1a",
  "res\\worlds\\mirkwood\\mirkwood_level_1b",
  "res\\worlds\\mirkwood\\mirkwood_level_2a",
  "res\\worlds\\mirkwood\\mirkwood_level_2b",
  "res\\worlds\\mount_gundabad",
  "res\\worlds\\mount_gundabad\\mount_gundabad_level_1",
  "res\\worlds\\mount_gundabad\\mount_gundabad_level_2",
  "res\\worlds\\mount_gundabad\\mount_gundabad_level_2b",
  "res\\worlds\\nordinbad",
  "res\\worlds\\nordinbad\\nordinbad",
  "res\\worlds\\nordinbad\\nordinbad_aftermath",
  "res\\worlds\\nordinbad\\nordinbad_siege",
  "res\\worlds\\osgiliath",
  "res\\worlds\\rivendell",
  "res\\worlds\\sarn_ford\\area1_level1",
  "res\\worlds\\urgost",
  "res\\worlds\\urgost\\urgost_intro",
  "res\\worlds\\urgost\\urgost_lair"
];
Game.DirExclusions = ["redist"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "local_save.txt", "d3d9.dll", "binkw32.dll", "GameSettings.sav", "UserSettings.sav", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["gdf.dll"];
Game.KillMutexType = "Semaphore";
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "witn.exe";
Game.SteamID = "32800";
Game.GUID = "War in the North";
Game.GameName = "Lord of the Rings: War in the North";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "The Lord of the Rings: War in the North";
Game.HasDynamicWindowTitle = true;
Game.UseDirectX9Wrapper = false;
Game.SetWindowHook = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\WB Games\\War in the North";
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\32800\\local";
Game.UserProfileSavePathNoCopy = false;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: First time you run this the instances will take a very long time to open because Nucleus needs to make full copies of almost all the files inside the game's res folder for the different instances to work correctly but the instances will open a lot faster after that. On first run after the first instance opens quickly set windowed mode in the in-game graphics settings and apply, do the same for other instances and close Nucleus, launch again and the instances will now position and resize correctly. If you notice the windows resize again after pressing start in the title screen, try getting past that title screen before Nucleus resizes the game window. You can click on game options-delete Nucleus content folder in the UI if you want to delete the copies of the game Nucleus made. If you want to use custom resolutions or change the FOV select the flawless widescreen option in the UI.";
Game.KeepSymLinkOnExit = true;
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 12;
Game.PauseBetweenStarts = 40;
Game.GamePlayBeforeGameSetup = true;
Game.ProtoInput.AutoHideTaskbar = true;

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binkw32.dll")) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "binkw32.dll"), System.IO.Path.Combine(Context.RootFolder, "binkw32.dll"), true);
  } else {
    Game.PromptBetweenInstances = false;
    Game.PauseBetweenStarts = 30;
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.PreventWindowDeactivation = true;
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 5000;
    Game.SendFakeFocusMsg = true;
    Game.SetForegroundWindowElsewhere = true;
  }

  var d3d9 = Context.Options["D3D9"];
  var fw = Context.Options["FW"];

  if (d3d9 == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\DirectXWrapper\\d3d9.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (d3d9 == "No") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
    }
  }

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "LOTRWITN";
  }

  if (fw == "No") {
  }
};