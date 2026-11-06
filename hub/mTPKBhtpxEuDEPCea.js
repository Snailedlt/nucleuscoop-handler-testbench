Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sun May 22 2022 02:33:51 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "mTPKBhtpxEuDEPCea";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Tinkertown_Data"];
Game.DirSymlinkExclusions = ["Tinkertown_Data\\Plugins\\x86_64", "Server\\TinkertownServer_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_4.dll"];
Game.GameName = "Tinkertown";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Tinkertown.exe";
Game.SteamID = "1276660";
Game.GUID = "Tinkertown";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 3;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Tinkertown";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\LocalLow\\Headup\\Tinkertown";
Game.Description =
  "Host a multiplayer world in one instance then join in the others by using the friend code, use the mouse and kb to do this if you have trouble joining, use a different character per instance. Click on or alt-tab to the kb/m instance to control it.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  var txtPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Headup\\Tinkertown\\playerSettings\\playerSettings.dat";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '    "x":', Nucleus.SearchType.StartsWith) + '|    "x": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '    "y":', Nucleus.SearchType.StartsWith) + '|    "y": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '  "FullScreenMode":', Nucleus.SearchType.StartsWith) + '|  "FullScreenMode": 3,'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "FullscreenMode_h1345374073", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "ResolutionHeight_h1843629172", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "ResolutionWidth_h1003235053", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Headup\\Tinkertown", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
};