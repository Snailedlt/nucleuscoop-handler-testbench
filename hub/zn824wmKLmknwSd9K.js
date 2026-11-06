Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 30 2020 20:01:03 GMT+0000 (UTC).
Hub.Handler.Id = "zn824wmKLmknwSd9K";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "Pit\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Pit-Win64-Shipping.exe";
Game.SteamID = "577410";
Game.GUID = "The Pit Infinity";
Game.GameName = "The Pit: Infinity";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Pit\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.Hook.ForceFocusWindowName = "The Pit: Infinity";
Game.Hook.ForceFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = false;
Game.HookFocus = true;
Game.SetWindowHook = false;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = false;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\577410\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Host a multiplayer game in one instance and join in the others, use the mouse cursor to navigate menus or select a class if you have trouble navigating with gamepads. Each instance has its own saves. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI. If you get uneven fps in the instances try alt tabbing to the NucleusCo-op app window when using multiple gamepads only, the game windows will remain on top. You can also try forcing vsync via your graphics panel or reducing graphic settings in-game.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var Args = (Context.Args = " -WindowedFullscreen " + " -AlwaysFocus " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};