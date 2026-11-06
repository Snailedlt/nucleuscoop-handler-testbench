Hub.Handler.Version = 38; // Released at https://hub.splitscreen.me/ on Thu Nov 28 2024 20:55:00 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "mNF2zQudSCC72RmyS";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

Game.DirSymlinkExclusions = ["StateOfDecay2\\Binaries\\Win64", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv148\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.GameName = "State of Decay 2: Juggernaut Edition";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "StateOfDecay2-Win64-Shipping.exe";
Game.SteamID = "495420";
Game.GUID = "StateOfDecay2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "StateOfDecay2\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
Game.LaunchAsDifferentUsers = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "-WindowedFullscreen -nosplash";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "StateOfDecay2";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = true;
Game.HookFocus = true;
Game.ProcessChangesAtEnd = true;
Game.PromptProcessChangesAtEnd = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.SetForegroundWindowElsewhere = true;
Game.ToggleUnfocusOnInputsLock = true;

Game.Description =
  "Make sure you have run the game normally via steam at least once before using the script. Instances are launched under different Windows user accounts so you need to launch Nucleus as admin. The instances will start fullscreen at first, this is normal. Log in using different Microsoft accounts in each instance, you can al-tab betwwen the instances if necessary. DO NOT press the prompt to start resizing the instances until all accounts are logged in. Make sure the Microsoft accounts are friends (you can do this via xbox.com), then in game go to multiplayer in the settings and make sure hosting is turned on (its off by default). Once this is done, press start, and on the pause menu you'll see three empty player slots (little squares) just select one and you'll have the option to invite a friend, and should see the other account(s) available. Enable the option \"Keep Nucleus made user accounts\" in the Nucleus settings and save if you want to keep your login details, save games and graphics settings after closing Nucleus. If the script doesn't work or you get a game crash error try moving Nucleus to the root of the drive your games are installed on. Pess CTRL+T twice if an instance resizes incorrectly, or the resolution is wrong (pixelated). As the instances connect via the Xbox Live servers an internet connection is required.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\StateOfDecay2\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/DaytonGame.DaytonGameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/DaytonGame.DaytonGameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/DaytonGame.DaytonGameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/DaytonGame.DaytonGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/DaytonGame.DaytonGameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ResolutionQuality", "100.000000")
  ]);

  var VideoConfig = Context.NucleusUserRoot + "\\AppData\\Local\\StateOfDecay2\\Saved\\Config\\WindowsNoEditor\\Game.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/MoviePlayer.MoviePlayerSettings", "bWaitForMoviesToComplete", false),
    new Nucleus.IniSaveInfo("/Script/MoviePlayer.MoviePlayerSettings", "bMoviesAreSkippable", true),
    new Nucleus.IniSaveInfo("/Script/MoviePlayer.MoviePlayerSettings", "StartupMovies", " ")
  ]);

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "StateOfDecay2\\Binaries\\Win64\\StateOfDecay2-Win64-Shipping.exe"),
    System.IO.Path.Combine(Context.RootFolder, "StateOfDecay2\\Binaries\\Win64\\StateOfDecay2-Win64-Shipping.exe"),
    [0x10, 0xd3, 0xb7, 0x04],
    [0x1c, 0x48, 0xbd, 0x02]
  );

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "StateOfDecay2\\Binaries\\Win64\\StateOfDecay2-Win64-Shipping.exe"),
    System.IO.Path.Combine(Context.RootFolder, "StateOfDecay2\\Binaries\\Win64\\StateOfDecay2-Win64-Shipping.exe"),
    [0xcb, 0xff, 0xff, 0xcc, 0xcc, 0xcc, 0x48],
    [0xcb, 0xff, 0xff, 0xcc, 0xcc, 0xcc, 0xc3]
  );

  Context.PatchFile(
    System.IO.Path.Combine(Context.RootFolder, "StateOfDecay2\\Binaries\\Win64\\StateOfDecay2-Win64-Shipping.exe"),
    System.IO.Path.Combine(Context.RootFolder, "StateOfDecay2\\Binaries\\Win64\\StateOfDecay2-Win64-Shipping.exe"),
    [0x15, 0xc8, 0x00, 0x48, 0x85, 0xc0, 0x75],
    [0x15, 0xc8, 0x00, 0x48, 0x85, 0xc0, 0x74]
  );
};