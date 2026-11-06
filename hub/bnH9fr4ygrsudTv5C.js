Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Apr 16 2021 06:24:39 GMT+0000 (UTC).
Hub.Handler.Id = "bnH9fr4ygrsudTv5C";
Hub.Maintainer.Name = "LineOf7s";
Hub.Maintainer.Id = "zYddaTLp6ucHDooMz";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv137\\Win64", "ROA2\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "XInput1_3.dll"];
Game.GameName = "Rock Of Ages 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "ROA2-win64-shipping.exe";
Game.SteamID = "434460";
Game.GUID = "Rock Of Ages 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "ROA2\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseSteamStubDRMPatcher = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Rock Of Ages 2";
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