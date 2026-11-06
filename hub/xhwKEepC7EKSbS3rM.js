Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Oct 10 2022 06:26:39 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "xhwKEepC7EKSbS3rM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["MonsterOutbreak.pck"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["steam_api64.lib"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "MonsterOutbreak.exe";
Game.SteamID = "1525190";
Game.GUID = "Monster Outbreak";
Game.GameName = "Monster Outbreak";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Monster Outbreak";
Game.HookFocus = false;
Game.ResetWindows = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\MonsterOutbreak\\saves";
Game.UserProfileConfigPath = "AppData\\Roaming\\MonsterOutbreak";
Game.Description =
  "This game already has 2 players max native splitscreen co-op but with this handler you can play up to 4 players, one player per instance. Host an online game in one instance and join in the others using the join code, use your mouse cursor to copy it, you can use ctrl+v to paste it.";
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.cfg";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("graphics", "fullscreen", "false")]);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};