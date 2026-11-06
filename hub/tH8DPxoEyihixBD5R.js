Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Tue Dec 03 2024 08:01:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "tH8DPxoEyihixBD5R";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
Game.AddOption(
  "Run a Local Server?",
  "Run a Celeste.Net Local server to play fully offline, in the mod options menu select connect to local server, use a different guest name per instance.",
  "Server",
  answers1
);
Game.AddOption(
  "Apply Ultra Widescreen Fix by Rose?",
  "Works to remove the black bars in horizontal split-screen and for ultra wide instances, if you have Everest already installed when the Celeste ultrawide patcher window opens change the .exe extension to .dll and click Start for the patch to apply correctly, the patcher will tell you if it was successful. Fix by: https://github.com/RoseTheFlower/UltrawideIndex/releases/tag/celeste",
  "Fix",
  answers2
);

Game.ExecutableContext = ["Content"];
Game.DirSymlinkExclusions = ["EverestSplash", "LogHistory", "Mods\\Cache", "Saves"];
Game.DirSymlinkCopyInstead = ["EverestSplash", "LogHistory", "Mods", "Mods\\Cache", "Saves"];
Game.DirExclusions = ["Backups"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "log.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "Celeste.deps.json",
  "Celeste.Mod.mm.deps.json",
  "Celeste.dll",
  "Celeste.Mod.mm.dll",
  "Celeste.Mod.mm.xml",
  "Celeste.runtimeconfig.json",
  "Celeste.xml",
  "DiscordGameSDK.dll",
  "DotNetZip.dll",
  "everest-launch.txt",
  "FNA.dll",
  "FNA.xml",
  "gamecontrollerdb.txt",
  "MiniInstaller.deps.json",
  "MiniInstaller.runtimeconfig.json",
  "miniinstaller-log.txt",
  "MonoMod.Backports.xml",
  "MonoMod.Core.xml",
  "MonoMod.Iced.xml",
  "MonoMod.Patcher.runtimeconfig.json",
  "MonoMod.Patcher.xml",
  "MonoMod.RuntimeDetour.HookGen.runtimeconfig.json",
  "MonoMod.RuntimeDetour.HookGen.xml",
  "MonoMod.RuntimeDetour.xml",
  "MonoMod.Utils.xml",
  "NETCoreifier.deps.json",
  "piton-runtime.yaml"
];
Game.BackupFolders = ["Saves"];
Game.GameName = "Celeste";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Celeste.exe";
Game.SteamID = "504230";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Celeste";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.UseGoldberg = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Celeste";
Game.HookFocus = true;
Game.ResetWindows = false;
Game.SetWindowHook = false;
//Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
//Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: This handler requires the CelesteNet online multiplayer mod and the Everest mod loader to be installed in your main game files if you want to see and interact between players, use the latest Olympus installer to install both. When an instance opens press A in the title screen with the controller you want to assign to that instance. Connect to the CelesteNet local server in the in-game mod options for all instances and start a game in the same area, use a different guest name per instance so they can connect. Your saves per instance are copies of your original ones, you can access them via Nucleus UI, after the first launch click on the wrench icon-open backup folder, if you update Everest delete the Celeste.dll files backed up in there if there are any before running the handler again.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 4;
Game.PauseBetweenProcessGrab = 20;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Saves\\settings.celeste";
  Context.ChangeXmlNodeInnerTextValue(path, "//Fullscreen", "false");
  Context.ChangeXmlNodeInnerTextValue(path, "//WindowScale", "6");

  var server = Context.Options["Server"];
  var fix = Context.Options["Fix"];

  if (server == "Yes") {
    Context.RunAdditionalFiles(["1|" + Context.ScriptFolder + "\\CelesteNet.Server-2024-09-23\\CelesteNet.Server.exe"], false, 1, true, false);

    Game.KillProcessesOnClose = ["CelesteNet.Server", "cmd"];
  }

  if (server == "No") {
  }

  if (fix == "Yes") {
    Context.BackupFiles = ["Celeste.dll"];

    if (Context.AspectRatioDecimal > 1.8) {
      if (System.IO.File.Exists(Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname + "\\uwfix.txt")) {
      } else {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Celeste ultrawide 32x9.exe");
        var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Celeste ultrawide 32x9.exe");
        System.IO.File.Copy(savePkgOrigin, savePath, true);

        Context.RunAdditionalFiles(
          ["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Celeste ultrawide 32x9.exe"],
          false,
          "" +
            Context.Nickname +
            " click OK here to launch the instance only after you applied the patch, if you have Everest already installed when the Celeste ultrawide patcher window opens change the .exe extension to .dll and click Start for the patch to apply correctly, the patcher will tell you if it was successful.",
          0,
          false,
          false,
          true,
          false
        );

        var filePath = (Context.filePath = Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname);
        System.IO.Directory.CreateDirectory(filePath);

        var uwfix = Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname + "\\uwfix.txt";
        var lines = [""];
        Context.WriteTextFile(uwfix, lines);
      }
    } else {
      var filePath = (Context.filePath = Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname);
      System.IO.Directory.CreateDirectory(filePath);

      System.IO.File.Delete(Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname + "\\uwfix.txt");

      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Celeste.dll"), System.IO.Path.Combine(Context.RootFolder, "Celeste.dll"), true);
    }
  }

  if (fix == "No") {
    var filePath = (Context.filePath = Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname);
    System.IO.Directory.CreateDirectory(filePath);

    System.IO.File.Delete(Context.NucleusUserRoot + "\\NucleusCoop\\_Game Files Backup_\\Celeste\\" + Context.Nickname + "\\uwfix.txt");

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Celeste.dll"), System.IO.Path.Combine(Context.RootFolder, "Celeste.dll"), true);
  }
};