Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Apr 04 2021 16:28:21 GMT+0000 (UTC).
Hub.Handler.Id = "Cxxb3GoLdyKxDNnvg";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "OTWD\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "OTWD-Win64-Shipping.exe";
Game.SteamID = "717690";
Game.GUID = "OVERKILLs The Walking Dead";
Game.GameName = "OVERKILL's The Walking Dead";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "OTWD\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.Hook.ForceFocusWindowName = "OVERKILL's The Walking Dead";
Game.Hook.ForceFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\OTWD\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\OTWD\\Saved\\SaveGames";
Game.Description =
  "Works best with two player horizontal split (may not be able to select first mission on vertical). Use Goldberg Overlay (Shift+Tab) to invite and join other players. While navigating menus, thumbstick/cursor is shared between screens but in-game controls are independent.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);
  Context.StartArguments = Args;

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_settings\\DLC.txt";
  var lines = [
    "999050=OVERKILL's The Walking Dead: S02E03 Enemy Of My Enemy",
    "996990=OVERKILL's The Walking Dead: S02E02 On The Run",
    "991910=OVERKILL's The Walking Dead Standard Edition",
    "987170=OVERKILL's The Walking Dead: S02E01 No Sanctuary",
    "977220=OVERKILL's The Walking Dead: Deluxe Upgrade",
    "880451=OVERKILL's The Walking Dead: Night Raid Flask",
    "880450=OVERKILL's The Walking Dead: Night Raid Knife Gun",
    "880440=OVERKILL's The Walking Dead: Night Raid Flare Gun Skin",
    "880430=OVERKILL's The Walking Dead: OVERKILL Flare Gun Skin",
    "880420=OVERKILL's The Walking Dead: OVERKILL Skin Pack",
    "880414=OVERKILL's The Walking Dead: Original Soundtrack",
    "880413=OVERKILL's The Walking Dead: Digital Art Book",
    "880412=OVERKILL's The Walking Dead: Night Raid Skin Pack",
    "880411=OVERKILL's The Walking Dead: OVERKILL Knife Skin",
    "880410=OVERKILL's The Walking Dead: OVERKILL Flask"
  ];

  Context.WriteTextFile(dlc, lines);
};