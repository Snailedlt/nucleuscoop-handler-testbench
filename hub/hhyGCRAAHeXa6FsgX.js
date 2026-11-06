Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Jul 01 2022 04:02:09 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "hhyGCRAAHeXa6FsgX";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
var answers3 = ["No", "Yes"];
Game.AddOption("Patch Exe?", "ONLY select yes if you have the legit game in Steam.", "Legit", answers1);
Game.AddOption("Keep aspect ratio?", "Maintains the instances default aspect ratio without filling the monitor/stretching.", "Ratio", answers2);
Game.AddOption("Alternative method to open multiple instances?", "ONLY use if you have issues running multiple instances with the default.", "Hex", answers3);

Game.KillMutex = ["ACT_MUTEX"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "DQH2.exe"];
Game.FileSymlinkCopyInstead = ["Config.exe", "KTSLXA2C.dll", "KTSLXA27.dll", "KTSLXA29.dll", "LINKDATA.idx"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DQH2.exe";
Game.SteamID = "574050";
Game.GUID = "Dragon Quest Heroes II";
Game.GameName = "DRAGON QUEST HEROES II";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.HideDesktop = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DRAGON QUEST HEROES II";
Game.PreventWindowDeactivation = true;
Game.HookInit = false;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\SQUARE ENIX\\DRAGON QUEST HEROES II\\Savedata";
Game.Description =
  "When you unlock the multiplayer map dungeons create a lobby in one instance and join in the others. You can also do co-op story missions if the host already completed the mission. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open documents save path in the UI.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SQUARE ENIX\\DRAGON QUEST HEROES II\\Graphic Setting", "WindowMode", 1, Nucleus.RegType.DWord);

  if (Context.HasKeyboardPlayer !== true) {
    Game.SetForegroundWindowElsewhere = true;
  }

  var hex = Context.Options["Hex"];
  var ratio = Context.Options["Ratio"];
  var legit = Context.Options["Legit"];
  var Gamefolder = System.IO.Path.Combine(Game.Folder);

  if (legit == "Yes") {
    Game.PauseBetweenContextAndLaunch = 15;

    if (!System.IO.File.Exists(Gamefolder + "\\DQH2.exe")) {
      var savePath = (Context.SavePath = Gamefolder + "\\DQH2og.exe");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "DQH2.exe");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var txtPath = Game.Folder + "\\start.bat";
      var dict = ["2|set GamePath=" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "3|set ExePath=" + Game.Folder];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      Context.RunAdditionalFiles(["1|" + Gamefolder + "\\start.bat"], false, 1);
    } else {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DQH2.exe");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DQH2.exe");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  if (legit == "No") {
    var savePath = (Context.SavePath = Gamefolder + "\\DQH2.exe");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "DQH2.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DQH2.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DQH2.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (hex == "Yes") {
    if (System.IO.File.Exists(Gamefolder + "\\DQH2.exe")) {
      if (Context.PlayerID == 0) {
      }

      if (Context.PlayerID == 1) {
        //patch window class 44 00 51 00 48 00 32 00 5F 00 57 00 49 00 4E 00 44 00 4F 00 57 00 5F 00 43 00 4C 00 41 00 53 00 53 00 00 00 00 00 7A
        Context.PatchFile(
          System.IO.Path.Combine(Context.RootFolder, "DQH2.exe"),
          System.IO.Path.Combine(Context.RootFolder, "DQH2.exe"),
          [
            0x44,
            0x00,
            0x51,
            0x00,
            0x48,
            0x00,
            0x32,
            0x00,
            0x5f,
            0x00,
            0x57,
            0x00,
            0x49,
            0x00,
            0x4e,
            0x00,
            0x44,
            0x00,
            0x4f,
            0x00,
            0x57,
            0x00,
            0x5f,
            0x00,
            0x43,
            0x00,
            0x4c,
            0x00,
            0x41,
            0x00,
            0x53,
            0x00,
            0x53,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x7a
          ],
          [
            0x44,
            0x00,
            0x51,
            0x00,
            0x48,
            0x00,
            0x33,
            0x00,
            0x5f,
            0x00,
            0x57,
            0x00,
            0x49,
            0x00,
            0x4e,
            0x00,
            0x44,
            0x00,
            0x4f,
            0x00,
            0x57,
            0x00,
            0x5f,
            0x00,
            0x43,
            0x00,
            0x4c,
            0x00,
            0x41,
            0x00,
            0x53,
            0x00,
            0x53,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x7a
          ]
        );
      }

      if (Context.PlayerID == 2) {
        Context.PatchFile(
          System.IO.Path.Combine(Context.RootFolder, "DQH2.exe"),
          System.IO.Path.Combine(Context.RootFolder, "DQH2.exe"),
          [
            0x44,
            0x00,
            0x51,
            0x00,
            0x48,
            0x00,
            0x32,
            0x00,
            0x5f,
            0x00,
            0x57,
            0x00,
            0x49,
            0x00,
            0x4e,
            0x00,
            0x44,
            0x00,
            0x4f,
            0x00,
            0x57,
            0x00,
            0x5f,
            0x00,
            0x43,
            0x00,
            0x4c,
            0x00,
            0x41,
            0x00,
            0x53,
            0x00,
            0x53,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x7a
          ],
          [
            0x44,
            0x00,
            0x51,
            0x00,
            0x48,
            0x00,
            0x34,
            0x00,
            0x5f,
            0x00,
            0x57,
            0x00,
            0x49,
            0x00,
            0x4e,
            0x00,
            0x44,
            0x00,
            0x4f,
            0x00,
            0x57,
            0x00,
            0x5f,
            0x00,
            0x43,
            0x00,
            0x4c,
            0x00,
            0x41,
            0x00,
            0x53,
            0x00,
            0x53,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x7a
          ]
        );
      }

      if (Context.PlayerID == 3) {
        Context.PatchFile(
          System.IO.Path.Combine(Context.RootFolder, "DQH2.exe"),
          System.IO.Path.Combine(Context.RootFolder, "DQH2.exe"),
          [
            0x44,
            0x00,
            0x51,
            0x00,
            0x48,
            0x00,
            0x32,
            0x00,
            0x5f,
            0x00,
            0x57,
            0x00,
            0x49,
            0x00,
            0x4e,
            0x00,
            0x44,
            0x00,
            0x4f,
            0x00,
            0x57,
            0x00,
            0x5f,
            0x00,
            0x43,
            0x00,
            0x4c,
            0x00,
            0x41,
            0x00,
            0x53,
            0x00,
            0x53,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x7a
          ],
          [
            0x44,
            0x00,
            0x51,
            0x00,
            0x48,
            0x00,
            0x35,
            0x00,
            0x5f,
            0x00,
            0x57,
            0x00,
            0x49,
            0x00,
            0x4e,
            0x00,
            0x44,
            0x00,
            0x4f,
            0x00,
            0x57,
            0x00,
            0x5f,
            0x00,
            0x43,
            0x00,
            0x4c,
            0x00,
            0x41,
            0x00,
            0x53,
            0x00,
            0x53,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x7a
          ]
        );
      } else {
      }
    }
  }

  if (hex == "No") {
    Game.HookInit = true;
  }

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
  }

  if (ratio == "No") {
  }
};