Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Tue Jun 13 2023 12:18:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "jAsugt77pyKNpRmwL";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption(
  "Letterboxing/Pillarboxing fix?",
  "Removes custom resolutions black bars, add custom resolutions and select them in-game like the handler notes mention for split-screen to work.",
  "AR",
  answers1
);

Game.ExecutableContext = ["resource"];
Game.DirSymlinkExclusions = ["steam_settings", "settings"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "winmm.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["d3dcompiler_47.dll"];
Game.GameName = "God Eater 3";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "ge3.exe";
Game.SteamID = "899440";
Game.GUID = "God Eater 3";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 4000;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "GE3";
Game.HookFocus = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\899440\\remote";
Game.Description =
  "IMPORTANT: On first Nucleus run the game instances will open in fullscreen, set them all to windowed in the game graphic settings, select the custom resolution you want and start a game for the graphics settings to save. Only works one instance per monitor unless you add custom resolutions in your AMD/Nvidia/Intel panel (For example for a 1920x1080 monitor add: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them, select the custom resolution in the in-game graphics settings as the game will not display correctly if you resize its window without changing the game resolution. After doing all that select the ge3 process in Nucleus process picker window, click refresh if you don't see it, do the same for all the instances that open. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.ForceProcessPick = true;
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 15;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  //var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  //var lines = [
  //"984057=SteamDB Unknown App 984057 (ANUBIS - Cosutume08 (984057) デポ)",
  //"984056=SteamDB Unknown App 984056 (ANUBIS - Cosutume07 (984056) デポ)",
  //"984055=SteamDB Unknown App 984055 (ANUBIS - Cosutume06 (984055) デポ)",
  //"984054=SteamDB Unknown App 984054 (ANUBIS - Cosutume05 (984054) デポ)",
  //"984053=SteamDB Unknown App 984053 (ANUBIS - Cosutume04 (984053) デポ)",
  //"984052=SteamDB Unknown App 984052 (ANUBIS - Cosutume03 (984052) デポ)",
  //"984051=SteamDB Unknown App 984051 (ANUBIS - Cosutume02 (984051) デポ)",
  //"984050=SteamDB Unknown App 984050 (ANUBIS - Cosutume01 (984050) デポ)",
  //];
  //Context.WriteTextFile(dlc, lines);

  var ar = Context.Options["AR"];

  if (ar == "Yes") {
    if (Context.AspectRatioDecimal > 1.8) {
      //patch ultra widescreen res 03 00 00 00 80 07 00 00 38 04
      //Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "ge3.exe"),
      //System.IO.Path.Combine(Context.RootFolder, "ge3.exe"),
      //[0x03, 0x00, 0x00, 0x00, 0x80, 0x07, 0x00, 0x00, 0x38, 0x04 ], //1920x1080
      //[0x03, 0x00, 0x00, 0x00, 0x80, 0x07, 0x00, 0x00, 0x1C, 0x02 ]);

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "ge3.exe"),
        System.IO.Path.Combine(Context.RootFolder, "ge3.exe"),
        [0x80, 0x07, 0x00, 0x00, 0x38, 0x04, 0x00, 0x00, 0x01], //Remove black bars 80 07 00 00 38 04 00 00 01
        [0x80, 0x07, 0x00, 0x00, 0x38, 0x04, 0x00, 0x00, 0x00]
      );
    } else if (Context.AspectRatioDecimal < 1.2) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "ge3.exe"),
        System.IO.Path.Combine(Context.RootFolder, "ge3.exe"),
        [0x80, 0x07, 0x00, 0x00, 0x38, 0x04, 0x00, 0x00, 0x01],
        [0x80, 0x07, 0x00, 0x00, 0x38, 0x04, 0x00, 0x00, 0x00]
      );
    } else {
    }
  }

  if (ar == "No") {
  }
};