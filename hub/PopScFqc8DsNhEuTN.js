Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Dec 21 2022 06:42:03 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "PopScFqc8DsNhEuTN";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the default aspect ratio to avoid stretching.", "Ratio", answers1);

Game.ExecutableContext = ["data_ea"];
Game.KillMutex = ["BLADEULT_MUTEX"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "Config.exe",
  "Launch.exe",
  "Launch_JP.exe",
  //"LINKDATA0.bin",
  "LINKDATA0.idx",
  "LINKDATA1.bin",
  "LINKDATA1.idx",
  "LINKDATA2.bin",
  "LINKDATA2.idx"
];
Game.GameName = "Bladestorm: Nightmare";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.HardlinkGame = true;
Game.ExecutableName = "Launch_EA.exe";
Game.SteamID = "350310";
Game.GUID = "Bladestorm Nightmare";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 7000;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "BLADESTORM: Nightmare";
Game.SendFakeFocusMsg = true;
Game.SetForegroundWindowElsewhere = true;
//Game.HookInit = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = false;
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\BLADESTORM Nightmare\\Savedata";
Game.Description =
  "Use a different save slot per instance. Your game and Nucleus need to be in the same drive for this to work but do not place Nucleus inside the game files. In Story Mode go to Contract and press Square/X for Online mode.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\BLADESTORM Nightmare\\Graphic Setting", "WindowMode", 1, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = ["363911=my GAMECITY GCコインシリアルナンバー ", "363910=GAMECITYオンラインユーザー登録シリアルナンバー (GAMECITYオンラインユーザー登録シリアル)"];
  Context.WriteTextFile(dlc, lines);

  if (Context.PlayerID == 0) {
  } else {
    var cla = 54 + Context.PlayerID;

    //patch window class
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Launch_EA.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Launch_EA.exe"),
      "58 00 00 00 42 4C 41 44 45 55 4C 54",
      "58 00 00 00 42 4C 41 44 45 55 4C " + cla,
      true
    );
  }

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
  }
};