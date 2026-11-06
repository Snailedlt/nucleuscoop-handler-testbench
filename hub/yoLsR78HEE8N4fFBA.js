Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Wed May 31 2023 09:57:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yoLsR78HEE8N4fFBA";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "Scale", "No"];
var answers2 = ["No", "Yes"];
Game.AddOption(
  "Edit resolution to match window size?",
  "Fixes stretching in split-screen, choose Scale only if your monitor scale is higher than 100% in Windows display settings and have minor scaling issues (and have Auto Set Desktop Scale in Nucleus Co-op settings disabled).",
  "Ratio",
  answers1
);
Game.AddOption("Alternative method to open multiple instances?", "ONLY use if you have issues running multiple instances with the default.", "Hook", answers2);

Game.ExecutableContext = ["LINKDATA"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["Launcher.exe"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "AOT2_EU.exe";
Game.SteamID = "601050";
Game.GUID = "Attack on Titan 2";
Game.GameName = "Attack on Titan 2 - A.O.T.2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Attack on Titan 2 / A.O.T. 2";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\KoeiTecmo\\Attack on Titan2_AOT2\\SAVEDATA";
Game.Description =
  "In Another World mode create a room in one instance and the others can join via room search or room id. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenContextAndLaunch = 3;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Attack on Titan2_AOT2\\System", "ScreenMode", 0, Nucleus.RegType.DWord);

  if (Context.HasKeyboardPlayer == true) {
    //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Attack on Titan2_AOT2\\System", "PreferInput", 0, Nucleus.RegType.DWord);
  } else {
    Game.SetForegroundWindowElsewhere = true;

    //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Attack on Titan2_AOT2\\System", "PreferInput", 1, Nucleus.RegType.DWord);
  }

  var ratio = Context.Options["Ratio"];
  var hook = Context.Options["Hook"];

  if (ratio == "Yes") {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Attack on Titan2_AOT2\\System", "Resolution", 2, Nucleus.RegType.DWord);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      "03 80 07",
      Context.Width,
      2,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      "38 04 00 0A",
      Context.Height,
      1,
      true
    );

    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootFolder, "AOT2_EU.exe"),
      System.IO.Path.Combine(Context.RootFolder, "AOT2_EU.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (ratio == "Scale") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\KoeiTecmo\\Attack on Titan2_AOT2\\System", "Resolution", 2, Nucleus.RegType.DWord);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      "03 80 07",
      Context.Width,
      2,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
      "38 04 00 0A",
      Context.Height,
      1,
      true
    );

    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootFolder, "AOT2_EU.exe"),
      System.IO.Path.Combine(Context.RootFolder, "AOT2_EU.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (ratio == "No") {
  }

  if (hook == "Yes") {
    Game.HookInit = true;
  }

  if (hook == "No") {
    if (Context.PlayerID == 0) {
    } else {
      var wclass = 55 + Context.PlayerID;

      Context.PatchFileFindPattern(
        System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
        System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "AOT2_EU.exe"),
        "52 45 56 45 4E 47 45 5F 45 55",
        "52 45 56 45 4E 47 45 5F 45" + wclass,
        true
      );
    }
  }
};