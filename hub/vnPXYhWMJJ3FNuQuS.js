Hub.Handler.Version = 21; // Released at https://hub.splitscreen.me/ on Wed Jul 03 2024 04:32:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vnPXYhWMJJ3FNuQuS";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Data"];
Game.KillMutex = ["FalloutNVGameMutex"];
Game.DirSymlinkExclusions = [
  //"Data\\NVSE",
  "nvmp"
];
Game.FileSymlinkExclusions = [
  //"steam_api.dll",
  "steam_appid.txt",
  "nvse_config.ini"
];
Game.FileSymlinkCopyInstead = [
  "client.cfg",
  "ExitData.mhd",
  "Fallout_default.ini",
  "FalloutNVLauncher.exe",
  "high.ini",
  "low.ini",
  "MainTitle.wav",
  "medium.ini",
  "VeryHigh.ini",
  "nvmp.log",
  "nvmp_launcher.exe",
  "nvmp_start.exe",
  "nvmp_storyserver.exe",
  "nvmp-server.log",
  "server.cfg",
  "crashpad_handler.exe",
  "nvse_loader.exe",
  "falloutnv_error.log",
  "falloutnv_havok.log",
  "nvse.log",
  "nvse_loader.log"
];
Game.StartArguments =
  'localhost 27015 22380 null null "CaravanPack.esm,ClassicPack.esm,DeadMoney.esm,FalloutNV.esm,GunRunnersArsenal.esm,HonestHearts.esm,LonesomeRoad.esm,MercenaryPack.esm,OldWorldBlues.esm,TribalPack.esm"';
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.GameName = "NVMP";
Game.ExecutableName = "FalloutNV.exe";
Game.ExecutableToLaunch = "nvmp_start.exe";
Game.SteamID = "22380";
//Game.CreateSteamAppIdByExe = true;
Game.GUID = "Fallout New Vegas";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "New Vegas: Multiplayer"; //Fallout: New Vegas
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.HookFocus = false;
Game.HookInit = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\My Games\\FalloutNV";
Game.UserProfileConfigPath = "AppData\\Local\\FalloutNV";
Game.UserProfileSavePathNoCopy = false;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  " IMPORTANT: Make sure you downloaded the clean Fallout New Vegas vanilla game files without any mods and install NVMP and the stability mods in your main game files, run your main game at least once after doing that and change some graphic settings before launching this. NVMP: https://github.com/NVMP/ClientDistribution/releases. 4gb patch and other needed stability mods: https://wiki.nv-mp.com/en/radd/RADD-Mods. Install them manually by extracting them in your main game files or use vortex, mod organizer does not work with this handler. If you launch a keyboard/mouse instance make sure it is always the first instance to launch so the keyboard and mouse work correctly, alt-tab to it or click on the kb instance to control it.";
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 25;
Game.KillProcessesOnClose = ["nvmp_storyserver", "NVMP", "nvmp_launcher.temp"];

Game.Play = function() {
  var fini = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\Fallout.ini";

  var SaveFolderPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\saves";

  if (!System.IO.File.Exists(SaveFolderPath + "\\saves_deleted.txt")) {
    System.IO.Directory.Delete(SaveFolderPath, true);

    System.IO.Directory.CreateDirectory(SaveFolderPath);

    Game.ForceUserProfileSaveCopy = true;

    System.IO.File.Create(SaveFolderPath + "\\saves_deleted.txt");
  }

  if (System.IO.File.Exists(fini)) {
    System.IO.File.SetAttributes(fini, System.IO.File.GetAttributes(fini) & ~System.IO.FileAttributes.ReadOnly);
  }

  var savePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\Fallout.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("General", "bAlwaysActive", "1"),
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "bBorderless", "0"),
    new Nucleus.IniSaveInfo("General", "SMainMenuMovieIntro", "0"),
    new Nucleus.IniSaveInfo("General", "SIntroSequence", "0"),
    new Nucleus.IniSaveInfo("Display", "fDefaultFOV", "98"),
    new Nucleus.IniSaveInfo("RenderedTerminal", "fRenderedTerminalZoom", "85"),
    new Nucleus.IniSaveInfo("General", "bPreemptivelyUnloadCells", "1"),
    new Nucleus.IniSaveInfo("General", "bSelectivePurgeUnusedOnFastTravel", "1"),
    new Nucleus.IniSaveInfo("Controls", "bBackground Mouse", "0"),
    new Nucleus.IniSaveInfo("Controls", "bBackground Keyboard", "0")
  ]);

  var savePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\FalloutPrefs.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display", "bBorderless", "0"),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("Display", "fDefaultFOV", "98"),
    new Nucleus.IniSaveInfo("RenderedTerminal", "fRenderedTerminalZoom", "85"),
    new Nucleus.IniSaveInfo("General", "bPreemptivelyUnloadCells", "1"),
    new Nucleus.IniSaveInfo("General", "bSelectivePurgeUnusedOnFastTravel", "1"),
    new Nucleus.IniSaveInfo("Controls", "bBackground Mouse", "0"),
    new Nucleus.IniSaveInfo("Controls", "bBackground Keyboard", "0")
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Fallout_default.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display", "iSize W", Context.Width),
    new Nucleus.IniSaveInfo("Display", "iSize H", Context.Height),
    new Nucleus.IniSaveInfo("Display", "bFull Screen", "0"),
    new Nucleus.IniSaveInfo("Display", "bBorderless", "0"),
    new Nucleus.IniSaveInfo("General", "SMainMenuMovieIntro", "0"),
    new Nucleus.IniSaveInfo("General", "SIntroSequence", "0"),
    new Nucleus.IniSaveInfo("Display", "fDefaultFOV", "98"),
    new Nucleus.IniSaveInfo("RenderedTerminal", "fRenderedTerminalZoom", "85"),
    new Nucleus.IniSaveInfo("General", "bPreemptivelyUnloadCells", "1"),
    new Nucleus.IniSaveInfo("General", "bSelectivePurgeUnusedOnFastTravel", "1")
  ]);

  if (Context.IsKeyboardPlayer) {
    var savePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\FalloutPrefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Interface", "bDisable360Controller", "1")]);

    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
  } else {
    var savePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\FalloutPrefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Interface", "bDisable360Controller", "0")]);

    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\client.cfg";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "AllowMultipleNVInstances=", Nucleus.SearchType.StartsWith) + "|AllowMultipleNVInstances=1.000000"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nvserver.bat";
  var lines = ["START nvmp_storyserver.exe -eos_disable"];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nvserver.bat"], false, 1);

  var Gamefolder = System.IO.Path.Combine(Game.Folder);

  Context.RunAdditionalFiles(["1|" + Gamefolder + "\\Modlist.bat"], false, 1);
};