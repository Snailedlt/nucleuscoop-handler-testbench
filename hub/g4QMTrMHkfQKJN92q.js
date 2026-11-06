Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Apr 29 2020 21:33:15 GMT+0000 (UTC).
Hub.Handler.Id = "g4QMTrMHkfQKJN92q";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["UnendingDusk_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_api64.dll"];
Game.GameName = "Unending Dusk";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "UnendingDusk.exe";
Game.SteamID = "806530";
Game.GUID = "UnendingDusk";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "UnendingDusk";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.BlockRawInput = true;
Game.FakeFocus = true;
Game.Description =
  "Host an online game then use the overlay that appears to invite the other players, right click other player names to invite. If you do not see the other player ingame invite again.";
Game.SetWindowHook = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\VindicateGames\\UnendingDusk", "Fullscreen_h2248877754", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\VindicateGames\\UnendingDusk", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\VindicateGames\\UnendingDusk", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\VindicateGames\\UnendingDusk", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};