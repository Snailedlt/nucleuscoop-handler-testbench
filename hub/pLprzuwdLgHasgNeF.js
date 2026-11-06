Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Apr 12 2022 19:45:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pLprzuwdLgHasgNeF";
Hub.Maintainer.Name = "Drago";
Hub.Maintainer.Id = "MFgv4monqSmLYjgQb";

Game.ExecutableContext = ["CoJ2", "engine_x86.dll"];
Game.KillMutex = ["ChromeEngine4CoJ2Mutex"];
Game.DirSymlinkExclusions = ["Coj2\\Out\\profiles", "Coj2\\Out\\Settings", "Coj2\\Data\\Menu\\Movies"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll", "attract.wmv", "Ubisoft_720p.wmv", "Ubisoft_720p_4_3.wmv"];
Game.FileSymlinkCopyInstead = [
  "Audio.scr"
  //"Video.scr"
];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "CoJBiBGame_x86.exe";
Game.SteamID = "21980";
Game.GUID = "Call of Juarez Bound in Blood";
Game.GameName = "Call of Juarez: Bound in Blood";
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Call of Juarez: Bound in Blood";
Game.FakeFocus = true;
Game.FakeFocusInterval = 40000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "Documents\\Call of Juarez - Bound in Blood\\Out\\profiles";
Game.UserProfileConfigPath = "Documents\\Call of Juarez - Bound in Blood\\Out\\Settings";
Game.Description =
  "IMPORTANT: Run your main game, change some graphics settings and close it before launching this. Only working with the latest legit Steam version. For gamepad instances enable the gamepad controls in the game options-controls and select ok so you can move with them in-game, for the keyboard/m instance make sure the kb controls are enabled there too and click ok, alt-tab to the kb instance to control it if you can not move. Create a multiplayer LAN game in one instance and join in the others.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  /*var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Coj2\\Out\\Settings\\Video.scr"; 
	
	var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
	Context.ReplacePartialLinesInTextFile(savePath, [
	resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"
	]);

	var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
	Context.RemoveLineInTextFile(savePath,fsLine);  */

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Video.scr";

  var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
  Context.ReplacePartialLinesInTextFile(savePath, [resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"]);

  var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
  Context.RemoveLineInTextFile(savePath, fsLine);

  if (Context.HasKeyboardPlayer == true) {
    Game.SetForegroundWindowElsewhere = false;
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }
};