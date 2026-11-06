Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Apr 29 2024 09:36:23 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "iZdnvnzqAu5pkWM8X";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

/*var answers1 = ["No", "Yes"];
Game.AddOption("Use Xinput Reroute?", "Select yes to play with 5 or more players. Xbox One gamepads don't work with this option enabled. Xinput pads will appear as dinput pads in the ui but native dinput pads are not supported.", "Reroute", answers1);*/

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["UnityCrashHandler64.exe", "UnityPlayer.dll", "config.ini", "preferences.ini"];
Game.DirExclusions = ["Controllers"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "BallisticNG.exe";
Game.SteamID = "473770";
Game.GUID = "BallisticNG";
Game.GameName = "BallisticNG";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.FakeFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "BallisticNG";
Game.XInputPlusDll = ["Xinput1_4.dll"];
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description = "Host a match with one instance and join with the rest. You can use the Steam lobby option or the IP lobby option, both allow for offline multiplayer.";
Game.PauseBetweenStarts = 15;

Game.Play = function() {
  /*var rR = Context.Options["Reroute"];
  if (rR == "Yes") {
  }*/

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\User\\Config\\ini\\config.ini";
  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display", "Window Mode", "3"),
    new Nucleus.IniSaveInfo("Display", "Resolution X", Context.Width),
    new Nucleus.IniSaveInfo("Display", "Resolution Y", Context.Height)
  ]);

  var prefPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\User\\Config\\ini\\preferences.ini";
  Context.ModifySaveFile(prefPath, prefPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Preferences", "First Startup", "0"),
    new Nucleus.IniSaveInfo("Preferences", "Player Name", Context.Nickname),
    new Nucleus.IniSaveInfo("Preferences", "Profile Name", Context.Nickname)
  ]);

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Audio", "Music Volume", "0")]);
  } else {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Audio", "Music Volume", "1")]);
  }
};