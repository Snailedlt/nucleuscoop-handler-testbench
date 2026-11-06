Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 24 2021 05:37:23 GMT+0000 (UTC).
Hub.Handler.Id = "XSAXdJnAYNcKd3Qtx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Steam", "GoG"];
Game.AddOption("GoG or Steam version?", "Select the version of the game you have.", "Version", answers1);

Game.KillMutex = ["ThereShouldOnlyBeOneVersionOfRogueTrooperReduxRunningAtOneTime"];
Game.DirSymlinkExclusions = ["bin\\x64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "Galaxy64.dll", "GalaxyPeer64.dll", "winmm.dll", "RTR_x64.exe"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "RTR_x64.exe";
Game.SteamID = "529490";
Game.GUID = "Rogue Trooper Redux";
Game.GameName = "Rogue Trooper Redux";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "splashscreen";
Game.BinariesFolder = "bin\\x64";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Rogue Trooper Redux";
Game.FakeFocus = false;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SupportsKeyboard = true;
Game.KeyboardPlayerFirst = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Rogue Trooper Redux GOG";
Game.UserProfileConfigPath = "AppData\\Roaming\\Rogue Trooper Redux";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: Set your main game to windowed and in the custom resolution you want before running this. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. You need to make sure each instance is set to windowed and select the custom resolution you will use per instance in the game settings on first run. If you use a kb/m instance the first instance that opens will always be the keyboard player, alt-tab or click on it if you can not control it. Reduce in-game graphic settings per instance to improve performance.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 25;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var id = Context.PlayerID + 6;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\Galaxy64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Galaxy64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "GalaxyPeer64.dll"), System.IO.Path.Combine(Context.RootFolder, "bin\\x64\\GalaxyPeer64.dll"), true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\ngalaxye_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NemirtingasGalaxyEmu.json");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '  "galaxyid":', Nucleus.SearchType.StartsWith) + '|  "galaxyid": 14549624462898294' + id + ",",
    Context.FindLineNumberInTextFile(txtPath, '  "username":', Nucleus.SearchType.StartsWith) + '|  "username": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.HasKeyboardPlayer !== true) {
    Game.SetForegroundWindowElsewhere = true;
  }

  var ver = Context.Options["Version"];

  if (ver == "GoG") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "RTR_x64.exe"), System.IO.Path.Combine(Context.RootFolder, "bin\\x64\\RTR_x64.exe"), true);
  }

  if (ver == "Steam") {
    Game.PauseBetweenContextAndLaunch = 10;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\RTR_x64og.exe");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "RTR_x64.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\JDiff.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "JDiff.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\RTR_x64.jdf");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "RTR_x64.jdf");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\start.bat";
    var lines = ["jdiff.exe -u RTR_x64og.exe RTR_x64.jdf RTR_x64.exe"];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\start.bat"], false, 1);

    if (System.IO.Directory.Exists(Context.EnvironmentPlayer + "\\AppData\\Roaming\\Rogue Trooper Redux GOG")) {
    } else {
      var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\AppData\\Roaming\\Rogue Trooper Redux GOG");
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\RTR.gs");
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusUserRoot, "AppData\\Roaming\\Rogue Trooper Redux\\RTR.gs");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }
};