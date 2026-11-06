Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Wed Jan 29 2025 07:00:25 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Dc3MuMtwqKcL34kbE";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Latest legit Steam version?", "Select yes if you have it, you need the latest version of the game.", "Legit", answers1);

Game.ExecutableContext = ["data"];
Game.KillMutex = ["DeadRising2"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "deadrising4.exe"];
Game.FileSymlinkCopyInstead = ["amd_ags_x64.dll", "bink2w64.dll", "cl.txt", "fmod64.dll", "gdf.dll", "LogCode.txt", "master.ini", "msvcp110.dll", "msvcr110.dll", "profile_dvr_user.ini"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "deadrising4.exe";
Game.SteamID = "543460";
Game.GUID = "Dead Rising 4";
Game.GameName = "Dead Rising 4";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dead Rising 4";
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.DocumentsSavePath = "My Games\\Dead Rising 4\\saves";
Game.DocumentsConfigPath = "My Games\\Dead Rising 4";
Game.Description =
  "You need to run the game at least once outside of Nucleus (launching it normally) before you can use it in Nucleus. Select multiplayer then invite, use the Goldberg Overlay (Left Shift+Tab) to invite and join other players. Make sure none of the game windows have focus, as that will result in other instances having lower FPS, you can alt-tab to any other window.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\rendersettings.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "WindowWidth", Nucleus.SearchType.StartsWith) + "|WindowWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "WindowHeight", Nucleus.SearchType.StartsWith) + "|WindowHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "WindowMode", Nucleus.SearchType.StartsWith) + "|WindowMode = Windowed"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var legit = Context.Options["Legit"];

  if (legit == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\deadrising4og.exe");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "deadrising4.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\hpatchz.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "hpatchz.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\patch");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
    var lines = ["hpatchz.exe deadrising4og.exe patch deadrising4.exe"];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat"], false, 1);
  }

  if (legit == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\deadrising4.exe");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "deadrising4.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};