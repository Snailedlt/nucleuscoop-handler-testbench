Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Nov 11 2020 20:36:32 GMT+0000 (UTC).
Hub.Handler.Id = "wBoFNbpztQbm7fAij";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers1 = [
  "-",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32"
];
Game.AddOption("Select the FPS Cap the game will use", "", "Fps", answers);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "Id", answers1);
Game.KillMutex = ["Project CARS 2"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt"];
Game.GameName = "Project CARS 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.KeepSymLinkOnExit = false;
Game.SymlinkGame = true;
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "steam_api.dll"];
Game.SupportsKeyboard = false;
Game.ExecutableName = "pCARS2AVX.exe";
Game.LauncherExe = "steamclient_loader.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.SteamID = "378860";
Game.GUID = "ProjectCARS2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
//Game.GoldbergExperimentalSteamClient = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Project CARS 2";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["XInput9_1_0.dll"];
Game.HookFocus = true;
Game.BlockRawInput = true;
Game.SetWindowHook = true;
Game.PreventWindowDeactivation = true;
Game.PauseBetweenStarts = 30;
Game.UseSteamStubDRMPatcher = true;
Game.SteamStubDRMPatcherArch = "64";
Game.UseNucleusEnvironment = true;
Game.UserProfileConfigPath = "\\Documents\\Project CARS 2";
Game.SetForegroundWindowElsewhere = true;

Game.Play = function() {
  var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api64.dll");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ColdClientLoader.ini");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ColdClientLoader.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient64.dll");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamclient64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient.dll");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamclient.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient_loader.exe");
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamclient_loader.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var fps = Context.Options["Fps"];

  var cfgFilePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ColdClientLoader.ini";
  Context.ReplaceLinesInTextFile(
    cfgFilePath,
    [
      "1|#My own modified version of ColdClientLoader originally by Rat431",
      "2|[SteamClient]",
      "3|Exe=pCARS2AVX.exe",
      "4|ExeRunDir=" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder),
      "5|ExeCommandLine= -novr -windowed -fpscap " + fps + " -windowsize " + Context.Width + "," + Context.Height,
      "6|AppId=378860"
    ],
    "utf-8"
  );

  var id = Context.Options["Id"];

  if (id != "-") {
    Game.GoldbergIgnoreFileCheck = true;
    Game.GoldbergWriteSteamIDAndAccounts = false;

    if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings")) {
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings");
      System.IO.Directory.CreateDirectory(filePath);
    }

    var Account = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\account_name.txt";
    var Nick = [Player.Nickname];
    Context.WriteTextFile(Account, Nick);

    var idF = 33 * id + Context.PlayerID;

    if (id < 3) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 3 && Context.PlayerID == 0) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 3 && Context.PlayerID > 0) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 3 && id < 30) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 30 && Context.PlayerID < 11) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 30 && Context.PlayerID > 10) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 30) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
  }
};