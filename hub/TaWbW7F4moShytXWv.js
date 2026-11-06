Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Nov 09 2020 08:46:17 GMT+0000 (UTC).
Hub.Handler.Id = "TaWbW7F4moShytXWv";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Patch 60 FPS?", "The game is locked to 30 fps, this patches 60 fps in all Nucleus instances only.", "FPS", answers1);

Game.KillMutex = ["Teenage Mutant"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "xinput1_3.dll", "tmnt_mim.exe"];
Game.GameName = "Teenage Mutant Ninja Turtles: Mutants in Manhattan";
Game.HandlerInterval = 100;
Game.PartialMutexSearch = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "tmnt_mim.exe";
Game.SteamID = "338400";
Game.GUID = "TMNT_MiM";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Teenage Mutant Ninja Turtles: Mutants in Manhattan";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = false;
Game.HookFocus = true;
Game.SetWindowHook = true;
//Game.PlayerSteamIDs = [ "76561198134585131"];
Game.UserProfileSavePath = "Documents\\TMNT_MiM";
Game.UserProfileSavePathNoCopy = true;
Game.SetForegroundWindowElsewhere = true;
Game.Description =
  "If you don't get sound from the unfocused instances disable the mute in background option in the game sound settings for each instance and apply. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var fps = Context.Options["FPS"];

  if (fps == "Yes") {
    //patch 60fps.
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "tmnt_mim.exe"),
      System.IO.Path.Combine(Context.RootFolder, "tmnt_mim.exe"),
      [0x76, 0x1d, 0xc7, 0x05],
      [0xeb, 0x1d, 0xc7, 0x05]
    );

    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "tmnt_mim.exe"),
      System.IO.Path.Combine(Context.RootFolder, "tmnt_mim.exe"),
      [0xff, 0x50, 0x18, 0x85, 0xc0, 0x75, 0x09],
      [0xff, 0x50, 0x18, 0x85, 0xc0, 0x75, 0x00]
    );
  }

  if (fps == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "tmnt_mim.exe"), System.IO.Path.Combine(Context.RootFolder, "tmnt_mim.exe"), true);
  }
};