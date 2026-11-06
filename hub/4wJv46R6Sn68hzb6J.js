Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Nov 17 2022 20:07:48 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "4wJv46R6Sn68hzb6J";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "Desolate\\Binaries\\win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "xinput1_3.dll", "winmm.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "SH-Win64-Shipping.exe";
Game.BinariesFolder = "Desolate\\Binaries\\win64";
Game.SteamID = "671510";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "DESOLATE";
Game.GameName = "DESOLATE";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Desolate";
Game.HookFocus = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\Desolate\\Saved\\SaveGames";
Game.Description = "Launch with Steam opened.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\Desolate\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "PreferredFullscreenMode", "2")
  ]);
};