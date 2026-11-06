Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Jul 26 2021 18:59:56 GMT+0000 (UTC).
Hub.Handler.Id = "st5XuBxS94eES8Hb2";
Hub.Maintainer.Name = "Snailedlt";
Hub.Maintainer.Id = "SE7kdQcCoCbgkzDeH";

var answers1 = ["No", "Yes"];
Game.AddOption("Launch all instances under your Steam account?", "Only use if you want to unlock achievements, connect via LAN. Unstable.", "Steam", answers1);

Game.ExecutableContext = ["fmodex.dll"];
Game.KillMutex = ["CrytekApplication(0)", "CrytekApplication"];
Game.DirSymlinkExclusions = ["Bin32", "Game\\_FastLoad"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "IntroMovies.pak", "autoexec.cfg"];
Game.FileSymlinkCopyInstead = ["system.cfg"];
Game.GameName = "Sniper: Ghost Warrior 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SniperGhostWarrior2.exe";
Game.SteamID = "34870";
Game.GUID = "Sniper Ghost Warrior 2";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.BinariesFolder = "Bin32";
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Sniper Ghost Warrior 2";
Game.PreventWindowDeactivation = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "Saved Games\\SniperGhostWarrior2\\Profiles";
Game.Description =
  "Run your main game and change some graphic settings before using this. Create a multiplayer server in one instance and join in the others. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "r_Fullscreen", Nucleus.SearchType.StartsWith) + "|r_Fullscreen=0",
    Context.FindLineNumberInTextFile(txtPath, "r_Width", Nucleus.SearchType.StartsWith) + "|r_Width=" + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "r_Height", Nucleus.SearchType.StartsWith) + "|r_Height=" + Context.Height
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.NucleusUserRoot + "\\Saved Games\\SniperGhostWarrior2\\Profiles\\default\\attributes.xml";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '<Attr name="video_fullscreen"', Nucleus.SearchType.StartsWith) + '| <Attr name="video_fullscreen" value="0"/>',
    Context.FindLineNumberInTextFile(txtPath, ' <Attr name="video_res_x"', Nucleus.SearchType.StartsWith) + '| <Attr name="video_res_x" value="' + Context.Width + '"/>',
    Context.FindLineNumberInTextFile(txtPath, ' <Attr name="video_res_y"', Nucleus.SearchType.StartsWith) + '| <Attr name="video_res_y" value="' + Context.Height + '"/>'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\autoexec.cfg";
  var lines = ["r_Width=" + Context.Width, "r_Height=" + Context.Height, "r_FullscreenWindow=1"];
  Context.WriteTextFile(txtPath, lines);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin32\\steam_interfaces.txt";
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

  if (Context.NumControllers < 5) {
    Game.Hook.XInputReroute = false;
  } else {
    Game.Hook.UseAlpha8CustomDll = true;
    Game.Hook.CustomDllEnabled = true;
  }

  var steam = Context.Options["Steam"];

  if (steam == "No") {
  }

  if (steam == "Yes") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin32\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};