Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Mar 19 2020 05:16:08 GMT+0000 (UTC).
Hub.Handler.Id = "LBZpqaF7vwYaixh7z";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["PreventTheFall\\Binaries\\Win64", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.GameName = "PreventTheFall";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "vrexppluginexample-win64-shipping.exe";
Game.SteamID = "595090";
Game.GUID = "PreventTheFall";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "PreventTheFall\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "PreventTheFall";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.UserProfileSavePath = "AppData\\Local\\PreventTheFall\\Saved\\SaveGames";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};
