Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Sat Jan 06 2024 08:13:00 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "tPAYJiNjiegWiNTRd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv142\\Win64", "Astro\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergLobbyConnect = false;
Game.UseSteamStubDRMPatcher = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Astro-Win64-Shipping.exe";
Game.SteamID = "361420";
Game.GUID = "Astroneer";
Game.GameName = "Astroneer";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Astro\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ASTRONEER";
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\Astro\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Requires Steam to be opened to launch. Start a game in one instance then press left shift + tab to invite the other players using the overlay that appears, right click the other players names, click invite and accept the invite in the other instances. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash " + " -ResX=" + Context.Width + " -ResY=" + Context.Height;
};