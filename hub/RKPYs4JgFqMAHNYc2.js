Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Mar 20 2021 02:53:36 GMT+0000 (UTC).
Hub.Handler.Id = "RKPYs4JgFqMAHNYc2";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64", "Styx2\\Binaries\\Win64", "Styx2\\Content\\Movies"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "splashscreen-all.mp4", "UE4_Logo.mp4", "steam_appid.txt", "xinput1_3.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.KeyboardPlayerFirst = true;
Game.ExecutableName = "Styx2-Win64-Shipping.exe";
Game.SteamID = "355790";
Game.GUID = "Styx Shards of Darkness";
Game.GameName = "Styx: Shards of Darkness";
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.BinariesFolder = "Styx2\\Binaries\\Win64";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Styx: Shards of Darkness";
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\Styx2\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\Styx2\\Saved\\SaveGames";
Game.Description =
  "Start a game in one instance, press start and open the game to co-op then join in the other instance using the co-op option in the main menu. Reduce graphic settings in-game to improve performance. When you are in game press Win+B or Alt+Tab on Nucleus for split performance. Keyboard/mouse + Controller: Enable V-sync only on the KB/M instance. Each instance has its own save that are copies of your original one, so your original save will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -WindowedFullscreen " + " -AlwaysFocus " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", false)
  ]);
};