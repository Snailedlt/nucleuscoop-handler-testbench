Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed May 31 2023 04:48:28 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JoyDJim6oj2fQeouQ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Change aspect ratio to match the window resolution?", "Fixes stretching but only works in vertical split-screen and it's pillarboxed.", "AR", answers1);

Game.ExecutableContext = ["KL2GE.dll"];
Game.KillMutex = [
  "Type:Mutant|KANEANDLYNCH2MUTEX",
  "Type:Event|DrawBegin",
  "Type:Event|DrawEnd",
  "Type:Event|RenderThreadEnd",
  "Type:Event|RenderThreadInit",
  "Type:Event|ResetDevice",
  "Type:Event|UpdateRenderState",
  "Type:Event|DeviceUpdate"
];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "d3d9.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["binkw32.dll", "KL2GE.dll", "Patch01.zip"];
Game.RenameNotKillMutex = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "kl2.exe";
Game.SteamID = "28000";
Game.GUID = "Kane & Lynch 2 Dog Days";
Game.GameName = "Kane & Lynch 2: Dog Days";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.HideTaskbar = false;
//Game.StartArguments = "-setup";
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Kane & Lynch 2: Dog Days";
Game.UseDirectX9Wrapper = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = false;
Game.UserProfileSavePath = "Documents\\SQUARE ENIX\\Kane & Lynch 2 - Dog Days";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPath = "AppData\\Local";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Make sure you have launched your main game at least once before running this. Create an online story mode lobby in one instance and join in the other. Do not go to the game video settings when running this or it will crash the instances, change the graphic settings in your main game. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example: 960x1080, 1920x540, 960x540 etc.) for the game to use them.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days", "MicrophoneEnabled", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days\\Graphics", "DisplayHeight", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days\\Graphics", "DisplayWidth", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days\\Graphics", "EnableSSAO", 0, Nucleus.RegType.DWord);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient009",
    "SteamGameServer010",
    "SteamGameServerStats001",
    "SteamUser013",
    "SteamFriends005",
    "SteamUtils005",
    "SteamMatchMaking008",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION007",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking003",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var ar = Context.Options["AR"];

  if (ar == "Yes") {
    if (Context.AspectRatioDecimal > 1.8) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days\\Graphics", "AspectRatio", "3555", Nucleus.RegType.DWord); //1777-16:9 1600-16:10 1250-5:4 1333-4:3
    } else if (Context.AspectRatioDecimal < 1.2) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days\\Graphics", "AspectRatio", "889", Nucleus.RegType.DWord);
    } else {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\IO Interactive\\Kane & Lynch 2: Dog Days\\Graphics", "AspectRatio", "1777", Nucleus.RegType.DWord);
    }
  }

  if (ar == "No") {
  }
};