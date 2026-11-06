Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Mon Feb 05 2024 22:39:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vr9fssW5QfFTGCyTt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["Default", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"];
Game.AddOption("Use Fusion Fix?", "Matches resolution to window size to fix stretching in split-screen, add custom resolutions like the handler notes mention before using this.", "Fix", answers1);
Game.AddOption("Increase FOV.", "Select the desired FOV factor. Only applies if you select yes to use the Fusion Fix, experimental.", "Fov", answers2);

Game.ExecutableContext = ["dat"];
Game.KillMutex = ["sSkeletonMain"];
Game.DirSymlinkExclusions = ["scripts"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_appid.txt",
  "local_save.txt",
  "xinput1_3.dll",
  "dinput8.dll",
  "RERevFix.ini",
  "ResidentEvilRevelations.FusionFix.ini",
  "ResidentEvilRevelations.FusionFix.asi"
];
Game.FileSymlinkCopyInstead = ["config.ini"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 4000;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "rerev.exe";
Game.SteamID = "222480";
Game.GUID = "Resident Evil Revelations";
Game.GameName = "Resident Evil Revelations";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "RESIDENT EVIL REVELATIONS / BIOHAZARD REVELATIONS UE";
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\222480";
Game.UserProfileConfigPath = "AppData\\Local\\CAPCOM\\RESIDENT EVIL REVELATIONS";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Create a public Raid Mode game in one instance and join in the other. If you want to fix stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    //new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("DISPLAY", "FullScreen", "OFF")
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "229630=RE Rev. / BH REV. UE: Weapon: Jill's Samurai Edge + Custom Part: " + '"S.T.A.R.S."',
    "229629=RE Rev. / BH REV. UE: Weapon: Jessica's G18 + Custom Part: " + '"BSAA"',
    "229628=RE Rev. / BH REV. UE: Weapon: Parker's Government + Custom Part: " + '"FBC"',
    '229627=RE Rev. / BH REV. UE: RAID Outfit: "Rachael Ooze"',
    '229626=RE Rev. / BH REV. UE: RAID Outfit: "LADY HUNK"',
    '229622=RE Rev. / BH REV. UE: Upgrade Parts: "Enhancement Set"',
    '229621=RE Rev. / BH REV. UE: Upgrade Parts: "Resistance Set"'
  ];
  Context.WriteTextFile(dlc, lines);

  var fix = Context.Options["Fix"];
  var fov = Context.Options["Fov"];

  if (fix == "No") {
  }

  if (fix == "Yes") {
    Context.BackupFile(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini", true);

    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
      new Nucleus.IniSaveInfo("DISPLAY", "Aspect", "default"),
      new Nucleus.IniSaveInfo("DISPLAY", "FullScreen", "OFF")
    ]);

    Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));
  }

  if (fov == "Default") {
  } else {
    var VideoConfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\ResidentEvilRevelations.FusionFix.ini");
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "FOVFactor", fov)]);
  }
};