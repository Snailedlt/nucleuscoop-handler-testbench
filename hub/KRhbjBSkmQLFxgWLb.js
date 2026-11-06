Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Apr 02 2020 23:18:56 GMT+0000 (UTC).
Hub.Handler.Id = "KRhbjBSkmQLFxgWLb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["bink2w64.dll"];
Game.DirSymlinkExclusions = [
  //"savegame",
];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_api.dll",
  "steam_appid.txt"
  //"save.sav",
];
Game.KillMutex = ["Bulldog_unique"];
Game.KillMutexType = "Semaphore";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "xgameFinal.exe";
Game.SteamID = "459220";
Game.GUID = "Halo Wars Definitive Edition";
Game.GameName = "Halo Wars: Definitive Edition";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.ForceFinishOnPlay = true;
Game.SupportsPositioning = true;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Halo Wars: Definitive Edition";
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputNames = ["xinput1_4.dll", "Xinput9_1_0.dll"];
Game.FakeFocus = true;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileConfigPath = "AppData\\Local\\Halo Wars";
Game.KeepSymLinkOnExit = false;
Game.Description = "Set your main game to windowed and in the custom resolution you want before running this.";
Game.PauseBetweenStarts = 25;