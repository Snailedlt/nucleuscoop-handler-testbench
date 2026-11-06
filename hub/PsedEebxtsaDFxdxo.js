Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Apr 19 2021 23:34:45 GMT+0000 (UTC).
Hub.Handler.Id = "PsedEebxtsaDFxdxo";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Disable Pillarboxing/Letterboxing?", "Removes the blackbars in splitscreen, matches aspect ratio to window res.", "Pillar", answers1);

Game.KillMutex = ["SwordArtOnline Fatal Bullet"];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "SAOFB\\Binaries\\win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "XInput1_3.dll", "SAOFB-Win64-Shipping.exe"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SAOFB-Win64-Shipping.exe";
Game.BinariesFolder = "SAOFB\\Binaries\\win64";
Game.SteamID = "626690";
Game.GUID = "SAOFB";
Game.GameName = "Sword Art Online: Fatal Bullet";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SWORD ART ONLINE: FATAL BULLET";
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\SAOFB\\Saved\\SaveGames";
Game.Description =
  "IMPORTANT: This script only works with the 1.7.0 denuvo-less version of the game. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_settings\\DLC.txt";
  var lines = [
    "1010220=Sword Art Online: Fatal Bullet - Dissonance Of The Nexus Expansion",
    "990340=Sword Art Online: Fatal Bullet - Sinon ALO Outfit Set",
    "990330=Sword Art Online: Fatal Bullet - GGO Hero in the Making Weapon Set",
    "990320=Sword Art Online: Fatal Bullet - Danbo Head",
    "990310=Sword Art Online: Fatal Bullet - LLENN's Special Weapon & Hat Set",
    "836812=SWORD ART ONLINE: FATAL BULLET - Collapse of Balance",
    "836811=Sword Art Online: Fatal Bullet - Betrayal of Comrades",
    "836810=Sword Art Online: Fatal Bullet - Ambush of the Imposters",
    "802610=SWORD ART ONLINE: FATAL BULLET - Pre-order DLC",
    "800450=Sword Art Online : Fatal Bullet - Season Pass",
    "775480=Sword Art Online: Fatal Bullet - Dissonance Of The Nexus",
    "774823=Sword Art Online : Fatal Bullet - Season Pass Bonuses",
    "774822=Sword Art Online : Fatal Bullet - ALO Pack",
    "774821=Sword Art Online : Fatal Bullet - SAO Pack"
  ];

  Context.WriteTextFile(dlc, lines);

  var pillar = Context.Options["Pillar"];

  if (pillar == "Yes") {
    //remove pillar boxing
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "SAOFB-Win64-Shipping.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SAOFB\\Binaries\\win64\\SAOFB-Win64-Shipping.exe"),
      [0x00, 0xf6, 0x41, 0x2c, 0x01, 0x49],
      [0x00, 0xf6, 0x41, 0x2c, 0x00, 0x49]
    );
  }

  if (pillar == "No") {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "SAOFB-Win64-Shipping.exe"),
      System.IO.Path.Combine(Context.RootFolder, "SAOFB\\Binaries\\win64\\SAOFB-Win64-Shipping.exe"),
      [0x00, 0xf6, 0x41, 0x2c, 0x01, 0x49],
      [0x00, 0xf6, 0x41, 0x2c, 0x01, 0x49]
    );
  }
};