Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Jul 27 2021 05:57:53 GMT+0000 (UTC).
Hub.Handler.Id = "TG25nFpMSE4XF3rH8";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars in split. Use it after you already set the res in-game.", "Pillar", answers1);
Game.AddOption("Use Process Picker?", "If you want to set the game to window or change the res this makes it easier.", "Picker", answers2);

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "EDF41.exe"];
Game.GameName = "EARTH DEFENSE FORCE 4.1 The Shadow of New Despair";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "edf41.exe";
Game.SteamID = "410320";
Game.GUID = "Earth Defense Force 4.1";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "EarthDefenseForce 4.1 for Windows";
Game.PreventWindowDeactivation = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
//Game.PlayerSteamIDs = ["76561198134585131"];
Game.UserProfileSavePath = "Documents\\My Games\\EDF4.1\\SAVE_DATA";
Game.Description = "";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "411380=Mission Pack 2: Extreme Battle",
    "410780=Mission Pack 1: Time of the Mutants",
    "473442=Volatile Napalm",
    "464203=Spark Lancer",
    "473440=Reflectron Laser",
    "473444=Pure Decoy Launcher 5 Pack B [Seira] [Miyabi] [Noko] [Mitsuki] [Anju]",
    "473443=Pure Decoy Launcher 5 Pack A [Karia] [Moegi] [Chiri] [Ouka] [Rinrin]",
    "464200=Ifrit",
    "464202=Gleipnir",
    "464220=Gigantus Tank, Natsuiro HS Markings",
    "464206=Gigantus Tank, EDF IFPS Markings",
    "464205=Gigantus Tank, Bullet Girls Marking",
    "473446=Gigantus DCC-Zero Marking",
    "473447=Gigantus DCC-Gogo. Marking",
    "473445=Depth Crawler Gold Coat",
    "464201=Blood Storm",
    "464204=BM03 Vegalta Gold",
    "473441=Sting Shot"
  ];

  Context.WriteTextFile(dlc, lines);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var pillar = Context.Options["Pillar"];
  var picker = Context.Options["Picker"];

  if (pillar == "Yes") {
    //remove pillar boxing
    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootInstallFolder, "EDF41.exe"),
      System.IO.Path.Combine(Context.RootFolder, "EDF41.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (pillar == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "EDF41.exe"), System.IO.Path.Combine(Context.RootFolder, "EDF41.exe"), true);
  }

  if (picker == "Yes") {
    Game.ForceProcessPick = true;
    Game.PromptBetweenInstances = true;
  }

  if (picker == "No") {
  }
};