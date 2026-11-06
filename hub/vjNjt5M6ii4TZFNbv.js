Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Dec 25 2022 10:07:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vjNjt5M6ii4TZFNbv";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the default aspect ratio to avoid stretching.", "Ratio", answers1);

Game.ExecutableContext = ["data"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["LINKDATA0.idx", "LINKDATA1.idx", "LINKDATA2.idx", "LINKDATA3.idx", "ToukidenKiwami_ja.exe", "ToukidenKiwami_tw.exe", "ToukidenKiwamiLauncher.exe"];
Game.GameName = "Toukiden: Kiwami";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "ToukidenKiwami_en.exe";
Game.SteamID = "363130";
Game.GUID = "Toukiden Kiwami";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 7000;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Toukiden: Kiwami";
Game.SetForegroundWindowElsewhere = true;
//Game.HookInit = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\TOUKIDEN KIWAMI\\Savedata";
Game.Description =
  "Create an online lobby in one instance using the stone and join in the others. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open documents save path in the UI.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Toukiden_Kiwami\\Graphic Setting", "WindowMode", 1, Nucleus.RegType.DWord);

  if (Context.PlayerID == 0) {
  } else {
    var cla = 53 + Context.PlayerID;
    var sav = 61 + Context.PlayerID;

    //patch window class for multiple instances
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "ToukidenKiwami_en.exe"),
      System.IO.Path.Combine(Context.RootFolder, "ToukidenKiwami_en.exe"),
      "54 00 4F 00 55 00 4B 00 49 00 44 00 45 00 4E 00 5F 00 50 00 4C 00 55 00 53",
      "54 00 4F 00 55 00 4B 00 49 00 44 00 45 00 4E 00 5F 00 50 00 4C 00 55 00 " + cla,
      true
    );

    //patch savepath
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "ToukidenKiwami_en.exe"),
      System.IO.Path.Combine(Context.RootFolder, "ToukidenKiwami_en.exe"),
      "5C 53 61 76 65 64 61 74 61",
      "5C 53 61 76 65 64 61 74 " + sav,
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