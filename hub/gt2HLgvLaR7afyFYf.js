Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Dec 04 2024 09:31:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "gt2HLgvLaR7afyFYf";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes", "Only first instance"];
Game.AddOption("Keep aspect ratio?", "Maintains the game default aspect ratio with black bars to avoid stretching.", "Ratio", answers1);
Game.AddOption(
  "Launch all instances under your Steam account?",
  "You won't be able to battle nor connect to the other instances if you use this option but you can make progress in single player in all instances this way (use a different save slot per instance) to unlock Steam achievements, then you can use the same save for one of the instances without this option for mp battles and trading, read the handler notes for how to move saves. Disable Steam Input for this game in Steam for controllers to work correctly.",
  "Steam",
  answers2
);

Game.ExecutableContext = ["data"];
Game.KillMutex = ["LIGHT1_NBGY"];
Game.DirSymlinkExclusions = ["exe", "exe\\settings", "exe\\1798010"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steamclient.dll", "steamclient64.dll", "MMBN_LC1.exe", "steam_appid.txt", "local_save.txt", "xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["launcher_config.ini", "Noesis.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.GameName = "Mega Man Battle Network Legacy Collection Vol. 1";
Game.ExecutableName = "MMBN_LC1.exe";
Game.GUID = "Mega Man Battle Network Legacy Collection Vol 1";
Game.SteamID = "1798010";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "exe";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "MegaMan_BattleNetwork_LegacyCollection_Vol1";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = false;
Game.SetWindowHook = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1798010\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: On first launch if the instances resize incorrectly just get past the title screen in all instances, close Nucleus and launch again.\n\nStart a game in all instances then press start and go to network, host a public lobby in one instance and join in the other by selecting guest, use the same online options.\n\nThis game ties save data to player steam id so if you want to use your main save in one of the instances you have to find and set your player steam id in Nucleus settings players tab, then copy your main save to the correct Nucleus save path you can access in the UI by right clicking the game and selecting open userprofile save path.";
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\exe\\launcher_config.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ScreenMode", Nucleus.SearchType.StartsWith) + "|ScreenMode:2",
    Context.FindLineNumberInTextFile(txtPath, "WindowSize", Nucleus.SearchType.StartsWith) + "|WindowSize:0"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var ratio = Context.Options["Ratio"];
  var steam = Context.Options["Steam"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
    Game.ResetWindows = true;
  }

  if (steam == "Yes") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MMBN_LC1.exe"), System.IO.Path.Combine(Context.RootFolder, "exe\\MMBN_LC1.exe"), true);

    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api64.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\exe\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (steam == "Only first instance") {
    if (Context.PlayerID == 0) {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "MMBN_LC1.exe"), System.IO.Path.Combine(Context.RootFolder, "exe\\MMBN_LC1.exe"), true);

      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api64.dll");
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\exe\\steam_api64.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    } else {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\exe\\MMBN_LC1.exe");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch.txt");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  if (steam == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\exe\\MMBN_LC1.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch.txt");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};