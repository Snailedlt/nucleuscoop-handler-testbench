Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Mar 10 2021 01:54:28 GMT+0000 (UTC).
Hub.Handler.Id = "GjdcjLwoty9PDFAZZ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["SAOLS."];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["OptionConfig.ini"];
Game.PartialMutexSearch = true;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "SAOLS.exe";
Game.SteamID = "840720";
Game.GUID = "SAOLS";
Game.GameName = "Sword Art Online: Lost Song";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sword Art Online: Lost Song";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\840720\\remote\\savedata";
Game.Description =
  "Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances there. Remember multiplayer unlocks after you beat the first world when you defeat the big dragon boss. You need to add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540 etc.) so the game will see and use them.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OptionConfig.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DISPLAY", "width", Context.Width),
    new Nucleus.IniSaveInfo("DISPLAY", "height", Context.Height),
    new Nucleus.IniSaveInfo("SCREEN", "width", Context.Width),
    new Nucleus.IniSaveInfo("SCREEN", "height", Context.Height),
    new Nucleus.IniSaveInfo("SCREEN", "mode", 1),
    new Nucleus.IniSaveInfo("WINDOW", "windowWidth", Context.Width),
    new Nucleus.IniSaveInfo("WINDOW", "windowHeight", Context.Height)
  ]);
};