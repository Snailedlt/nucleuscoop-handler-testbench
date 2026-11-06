Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Mar 25 2022 21:31:56 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "kbehD8LHWfG4Cwnj5";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["hic.bin"];
Game.DirSymlinkExclusions = ["data\\0"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["ninja_setting.ini", "ninja_system.ini"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Ninja.exe";
Game.SteamID = "464070";
Game.GUID = "Diorama Battle of NINJA";
Game.GameName = "Diorama Battle of NINJA";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Diorama Battle of Ninja ver.1.0.0.01";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 7000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\464070";
Game.Description =
  "IMPORTANT: Run your main game before launching this, change some graphics settings, apply then close the game. You need to create custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add: 1920x540, 960x1080, 960x540 etc.) before running the game via Nucleus so the game can see and use them, this way the instances will resize correctly without stretching. Host a multiplayer game in one instance and join in the others.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\0\\ninja_setting.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Setup", "ScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("Setup", "ScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("Setup", "WindowMode", "1")
  ]);

  if (Context.HasKeyboardPlayer == true) {
    Game.SetForegroundWindowElsewhere = false;
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }
};