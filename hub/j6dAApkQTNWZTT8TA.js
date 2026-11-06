Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Jun 01 2023 10:44:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "j6dAApkQTNWZTT8TA";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["SDL2_net.dll"];
Game.FileSymlinkExclusions = ["xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["7za.dll", "alleg42.dll", "console.log", "CSMPCrashReporter.exe", "Doukutsu.ini", "libcurl.dll", "SDL2.dll", "SDL2_net.dll"];
Game.GameName = "Cave Story Multiplayer";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Doukutsu.exe";
Game.SteamID = "200900";
Game.GUID = "Cave Story Multiplayer";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.LauncherTitle = "";
Game.StartArguments = "";
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Cave Story Multiplayer ~ Doukutsu Monogatari";
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.DontRemoveBorders = true;
Game.ResetWindows = true;
Game.SetWindowHookStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: Run your main game, change and save some options before launching this so that the .ini configuration file generates correctly, start a new game too. Host a netplay game in one instance and the others can join via add server. Download latest game version from here: https://cavestorymultiplayer.com/index.php.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Doukutsu.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ServerName", Nucleus.SearchType.StartsWith) + "|ServerName=Nucleus Co-op",
    Context.FindLineNumberInTextFile(txtPath, "AllowInactiveInput", Nucleus.SearchType.StartsWith) + "|AllowInactiveInput=1",
    Context.FindLineNumberInTextFile(txtPath, "JoystickIndex", Nucleus.SearchType.StartsWith) + "|JoystickIndex=0",
    Context.FindLineNumberInTextFile(txtPath, "JoystickBind_SELECT", Nucleus.SearchType.StartsWith) + "|JoystickBind_SELECT=7",
    Context.FindLineNumberInTextFile(txtPath, "DisplayMode", Nucleus.SearchType.StartsWith) + "|DisplayMode=0",
    Context.FindLineNumberInTextFile(txtPath, "NetName", Nucleus.SearchType.StartsWith) + "|NetName=" + Context.Nickname
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};