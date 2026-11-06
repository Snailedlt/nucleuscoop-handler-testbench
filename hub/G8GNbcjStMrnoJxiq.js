Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri May 21 2021 02:20:10 GMT+0000 (UTC).
Hub.Handler.Id = "G8GNbcjStMrnoJxiq";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64", "PostalREDUX\\Binaries\\Win64", "PostalREDUX\\Content\\Movies"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "RWS Intro.mp4", "xinput1_3.dll"];
Game.GameName = "POSTAL Redux";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = true;
Game.ExecutableName = "PostalREDUX-Win64-Shipping.exe";
Game.SteamID = "401680";
Game.GUID = "POSTAL Redux";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "PostalREDUX\\Binaries\\Win64";
Game.UseNucleusEnvironment = false;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "POSTAL Redux";
Game.FakeFocus = false;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\PostalREDUX\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\PostalREDUX\\Saved\\SaveGames";
Game.Description = "Host a multiplayer game in one instance and join in the others via browse games.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height;
};