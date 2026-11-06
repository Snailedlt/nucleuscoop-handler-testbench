Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Apr 20 2020 18:24:53 GMT+0000 (UTC).
Hub.Handler.Id = "tse6JjegonwfnjFA5";
Hub.Maintainer.Name = "ZeroFox";
Hub.Maintainer.Id = "fd6NFJsFJef4AZoD9";

Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "TheWatchers.exe";
Game.SteamID = "1112830";
Game.GUID = "The Watchers";
Game.GameName = "The Watchers";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.None;
Game.LauncherExe = "";
Game.SupportsPositioning = true;
Game.Hook.CustomDllEnabled = false;
Game.Hook.ForceFocusWindowName = "TheWatchers";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.PauseBetweenStarts = 10;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.FakeFocus = true;
Game.BlockRawInput = true;
Game.HideTaskbar = true;
Game.UseGoldberg = true;
Game.HookFocus = true;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Straight Back Games\\TheWatchers", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Straight Back Games\\TheWatchers", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Straight Back Games\\TheWatchers", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Straight Back Games\\TheWatchers", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
};