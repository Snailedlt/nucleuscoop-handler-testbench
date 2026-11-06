Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Dec 25 2022 13:11:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "HKGTL3q87m6CQuXSi";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the default aspect ratio to avoid stretching.", "Ratio", answers1);

Game.ExecutableContext = ["LINKDATA"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "Dinput8.dll", "XInputPlus.ini", "winmm.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 7000;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "AoT.exe";
Game.SteamID = "449800";
Game.GUID = "Attack on Titan";
Game.GameName = "Attack on Titan / A.O.T. Wings of Freedom";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Attack on Titan / A.O.T. Wings of Freedom";
Game.FakeFocus = false;
Game.HookFocus = true;
//Game.HookInit = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "Dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = false;
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\Attack on Titan";
Game.Description =
  "Create an expedition mode online room and join in the others. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt-tabbing to the NucleusCo-op window, the game windows will remain on top. You can also try reducing graphic settings in-game.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Attack on Titan\\System", "WindowMode", 1, Nucleus.RegType.DWord);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)")
  ]);

  if (Context.PlayerID == 0) {
  } else {
    var cla = 55 + Context.PlayerID;
    var sav = 41 + Context.PlayerID;

    //patch window class PROJECT_AT_WIN_OS_EU for multiple instances
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "AoT.exe"),
      System.IO.Path.Combine(Context.RootFolder, "AoT.exe"),
      "50 52 4F 4A 45 43 54 5F 41 54 5F 57 49 4E 5F 4F 53 5F 45 55",
      "50 52 4F 4A 45 43 54 5F 41 54 5F 57 49 4E 5F 4F 53 5F 45 " + cla,
      true
    );

    //patch savepath for different save per instance
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "AoT.exe"),
      System.IO.Path.Combine(Context.RootFolder, "AoT.exe"),
      "53 00 41 00 56 00 45 00 44 00 41 00 54 00 41",
      "53 00 41 00 56 00 45 00 44 00 41 00 54 00 " + sav,
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