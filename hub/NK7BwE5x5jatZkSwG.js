Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Apr 16 2021 06:22:54 GMT+0000 (UTC).
Hub.Handler.Id = "NK7BwE5x5jatZkSwG";
Hub.Maintainer.Name = "LineOf7s";
Hub.Maintainer.Id = "zYddaTLp6ucHDooMz";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "redout\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "XInput1_3.dll"];
Game.GameName = "Redout: Enhanced Edition";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "redout-win64-shipping.exe";
Game.SteamID = "517710";
Game.GUID = "Redout Enhanced Edition";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "redout\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "redout";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};