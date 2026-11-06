Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Jul 12 2021 23:41:20 GMT+0000 (UTC).
Hub.Handler.Id = "dKkmhXA65vHfFgzkC";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["maps"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "dinput8.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["options.ini"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "BoringManGame.exe";
Game.SteamID = "346120";
Game.GUID = "Boring Man";
Game.GameName = "Boring Man - Online Tactical Stickman Combat";
Game.MaxPlayers = 20;
Game.MaxPlayersOneMonitor = 20;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocusWindowName = "Boring Man";
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Description = "Host a game in one instance and join in the others via direct connect. Press CTRL+T twice if an instance is behind the windows taskbar.";
Game.UserProfileConfigPath = "AppData\\Local\\BoringManRewrite";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\bm_settings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Video", "Fullscreen", '"0"')
    //new Nucleus.IniSaveInfo("Resolution", "Fullscreen", '"11"'),
  ]);
};