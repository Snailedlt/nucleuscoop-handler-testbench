Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Aug 19 2020 11:08:38 GMT+0000 (UTC).
Hub.Handler.Id = "ofpJn8fbHPE4PPoEi";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Rek.Launcher"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "xinput1_3.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["AWVSSAO_Launcher.exe"];
Game.PartialMutexSearch = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "AWVSSAO.exe";
Game.SteamID = "607880";
Game.GUID = "AWVSSAO";
Game.GameName = "Accel World VS. Sword Art Online Deluxe Edition";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Accel World VS. Sword Art Online";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = false;
Game.UserProfileConfigPath = "AppData\\Local\\Accel World vs. Sword Art Online";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\607880\\remote\\SaveData";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Make sure you have launched your main game at least once and changed some options or settings before launching via Nucleus so that the game .ini file gets generated. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances there. Add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 1920x540, 960x540 etc.) and the game will use them to avoid stretching.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\OptionConfig.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SCREEN", "width", Context.Width),
    new Nucleus.IniSaveInfo("SCREEN", "height", Context.Height),
    new Nucleus.IniSaveInfo("SCREEN", "mode", 0),
    new Nucleus.IniSaveInfo("DISPLAY", "width", Context.Width),
    new Nucleus.IniSaveInfo("DISPLAY", "height", Context.Height)
  ]);
};