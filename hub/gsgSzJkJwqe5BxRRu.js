Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Jul 02 2021 23:43:36 GMT+0000 (UTC).
Hub.Handler.Id = "gsgSzJkJwqe5BxRRu";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = [
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win32",
  "TheMeanGreens\\Binaries\\Win64",
  "TheMeanGreens\\Binaries\\Win32"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt"];
Game.GameName = "The Mean Greens - Plastic Warfare";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = true;
Game.ExecutableName = "TheMeanGreens-Win64-Shipping.exe";
Game.SteamID = "360940";
Game.GUID = "The Mean Greens";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.BinariesFolder = "TheMeanGreens\\Binaries\\Win64";
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "TheMeanGreens";
Game.FakeFocus = false;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\TheMeanGreens\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\TheMeanGreens\\Saved\\SaveGames";
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;
};