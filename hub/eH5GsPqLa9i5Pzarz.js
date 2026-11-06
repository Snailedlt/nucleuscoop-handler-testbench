Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sun Dec 25 2022 05:49:30 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "eH5GsPqLa9i5Pzarz";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the default aspect ratio to avoid stretching.", "Ratio", answers1);

Game.ExecutableContext = ["data"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "KTSLXA2C.dll",
  "KTSLXA27.dll",
  "KTSLXA29.dll",
  "LINKDATA0.idx",
  "LINKDATA0_EN.idx",
  "LINKDATA0_JP.idx",
  "LINKDATA1.idx",
  "LINKDATA2.idx",
  "Toukiden2_JA.exe",
  "Toukiden2Launcher.exe"
];
Game.GameName = "Toukiden 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Toukiden2_EN.exe";
Game.SteamID = "551730";
Game.GUID = "Toukiden 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 7000;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "討鬼伝2";
Game.HasDynamicWindowTitle = true;
Game.SetForegroundWindowElsewhere = true;
//Game.HookInit = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\TOUKIDEN2";
Game.Description =
  "Create an online lobby in one instance using the portal stone and join in the others. If you get uneven fps in the instances try alt tabbing to the Nucleus window if you are using multiple gamepads or try limiting or reducing the fps in the game settings. You can access your saves per instance via the app, after the first launch click game options/open documents save path in the UI. Alt-Tab to the keyboard instance to control it.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Toukiden2\\Graphic Setting", "MultiPlayRegionLock", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Toukiden2\\Graphic Setting", "VoiceChat", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Toukiden2\\Graphic Setting", "WindowMode", 1, Nucleus.RegType.DWord);

  if (Context.PlayerID == 0) {
  } else {
    var cla = 32 + Context.PlayerID;
    var sav = 47 + Context.PlayerID;

    //patch window class for multiple instances
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Toukiden2_EN.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Toukiden2_EN.exe"),
      "FF 00 00 00 00 54 00 4F 00 55 00 4B 00 49 00 44 00 45 00 4E 00 32",
      "FF 00 00 00 00 54 00 4F 00 55 00 4B 00 49 00 44 00 45 00 4E 00 " + cla,
      true
    );

    //patch savepath
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Toukiden2_EN.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Toukiden2_EN.exe"),
      "53 61 76 65 64 61 74 61 5F 45 4E 47",
      "53 61 76 65 64 61 74 61 5F 45 4E " + sav,
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