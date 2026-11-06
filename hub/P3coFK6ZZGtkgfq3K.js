Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Oct 17 2022 11:19:27 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "P3coFK6ZZGtkgfq3K";
Hub.Maintainer.Name = "Dreadnot2950";
Hub.Maintainer.Id = "hve6SZzugBAfMLCmQ";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64", "KeepUpHunter\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["OpenImageDenoise.dll", "tbb12.dll"];
Game.GameName = "KeepUp Hunter";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "KeepUpHunter-Win64-Shipping.exe";
Game.SteamID = "1843710";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "KeepUp Hunter";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 3;
Game.BinariesFolder = "KeepUpHunter\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "";
Game.HasDynamicWindowTitle = true;
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
Game.UserProfileConfigPath = "AppData\\Local\\KeepUpHunter\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\KeepUpHunter\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Use the mouse cursor to scroll/host a game in Multiplayer (2-3 Players) then type server name and click Join Lobby, other players can join via the Server Browser. Set graphics quality to Low for better performance.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash " + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "False"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "False"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height)
  ]);

  if (Context.AspectRatioDecimal < 1.2) {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  } else if (Context.AspectRatioDecimal > 1.8) {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
  } else {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
  }
};