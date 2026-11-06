Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun May 05 2024 13:07:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "684JwQG93SunjfzQM";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.DirSymlinkExclusions = [
  "BoB\\Binaries\\Win64",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64",
  "AbioticFactor\\Binaries\\Win64",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64\\bak"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.CreateSteamAppIdByExe = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet";
Game.HandlerInterval = 100;
Game.ExecutableName = "BoB-Win64-Shipping.exe";
Game.SteamID = "1227650";
Game.GUID = "Bang-On Balls Chronicles";
Game.GameName = "Bang-On Balls Chronicles";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.BinariesFolder = "BoB\\Binaries\\Win64";
Game.SupportsPositioning = true;
Game.HookFocus = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Bang-On Balls: Chronicles";
Game.HasDynamicWindowTitle = true;
Game.SetWindowHookStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPath = "AppData\\Local\\BoB\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\BoB\\Saved\\SaveGames";
Game.Description =
  "Run your main game at least once before using this. After all instances have resized and repositioned, you can enter the game with the player you wish to host with. After entering the game, press shift-tab to open the emulated steam overlay and invite the other players to your game. Alt-tab to each instance and join using the shift-tab overlay. If you have a keyboard player, alt-tab to their instance to allow control.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 15;

Game.Play = function() {
  var vidcfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "bUseDynamicResolution", "False"),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "FullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "LastConfirmedFullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "PreferredFullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/BoB.BallGameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height)
  ]);

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "MusicAudioVolume", "0.000000")]);
  } else {
    Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "MusicAudioVolume", "1.000000")]);
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  }
};