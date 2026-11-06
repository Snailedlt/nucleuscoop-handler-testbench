Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Nov 21 2022 18:28:22 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "R7EZK6QfMLg8y7Aq8";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw64.dll"];
Game.KillMutex = [
  "SRTTR" //SRTTR
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["amd_ags_x64.dll", "binkw64.dll", "display.ini"];
Game.PartialMutexSearch = true;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SRTTR.exe";
Game.SteamID = "978300";
Game.GUID = "Saints Row The Third Remastered";
Game.GameName = "Saints Row: The Third Remastered";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Saints Row®: The Third™ Remastered";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 7000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = false;
Game.UseForceBindIP = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\978300\\remote";
Game.Description =
  "Steam version only. So the instances launch and resize correctly make sure to run your main game at least once first and change some graphic settings. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add: 1920x540, 960x1080, 960x540 etc.) so the game can see and use them. This game is very demanding so reduce graphics settings per instance to improve performance.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 30;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\display.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ResolutionWidth =", Nucleus.SearchType.StartsWith) + "|ResolutionWidth = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ResolutionHeight =", Nucleus.SearchType.StartsWith) + "|ResolutionHeight = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "ScreenMode =", Nucleus.SearchType.StartsWith) + "|ScreenMode = 1",
    Context.FindLineNumberInTextFile(txtPath, "VerifyResolution =", Nucleus.SearchType.StartsWith) + "|VerifyResolution = false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\display.ini";
  var dict = ["74|SkipIntroVideo = true"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\EOSSDK-Win64-Shipping.dll")) {
    Game.UseGoldberg = false;
    Game.UseNemirtingasEpicEmu = true;
    Game.EpicEmuArgs = false;
    Game.UseForceBindIP = false;
  } else {
  }
};