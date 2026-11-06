Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Jan 12 2023 05:20:09 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yCKqB6GGpTBNFkYDd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Ashen-Win64-Shipping.exe";
Game.SteamID = "649950";
Game.GUID = "Ashen";
Game.GameName = "Ashen";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "Ashen\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Ashen";
Game.HookFocus = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\Ashen\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\Ashen\\Saved\\SaveGames";
Game.Description =
  "Must complete first mission to unlock coop. Both players need to meet outside of town (be in same area), go to System -> Multiplayer, enable Multiplayer Filter and set code to 111111. Each player then presses up on D-Pad and they will appear to the other player.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash " + " -ResX=" + Context.Width + " -ResY=" + Context.Height;
};