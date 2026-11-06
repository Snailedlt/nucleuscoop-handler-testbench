Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Jul 10 2021 20:13:36 GMT+0000 (UTC).
Hub.Handler.Id = "n5jW59LegySKm9YZp";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["..\\..\\..\\SpaceHulkGame\\Content\\Movies\\zob.wmv"];
Game.KillMutex = ["UnrealEngine4"];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64", "SpaceHulkGame\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll"];
Game.GameName = "Space Hulk: Deathwing";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "spacehulkgame-win64-shipping.exe";
Game.SteamID = "298900";
Game.GUID = "SpaceHulkGame";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "SpaceHulkGame\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = true;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SpaceHulkGame";
Game.FakeFocus = true;
Game.FakeFocusSendActivateIgnoreKB = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Local\\SpaceHulkGame\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\SpaceHulkGame\\Saved\\Config\\WindowsNoEditor";
Game.Description =
  "Script only for the regular non enhanced version of the game. Host an online co-op game in one instance and the other instances can join. Press the END key in your keyboard to unlock the main cursor and the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 35;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height;

  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/SpaceHulkGame.SHUserSettings", "LastConfirmedFullscreenMode", "2")
  ]);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }
};