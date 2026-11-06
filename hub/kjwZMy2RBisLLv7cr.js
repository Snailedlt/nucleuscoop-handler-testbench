Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Jul 11 2021 19:52:38 GMT+0000 (UTC).
Hub.Handler.Id = "kjwZMy2RBisLLv7cr";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Steam", "GoG"];
Game.AddOption("GoG or Steam version?", "Select the version of the game you have.", "Version", answers1);

Game.ExecutableContext = ["..\\..\\..\\Engine\\Plugins\\Online\\OnlineSubsystemGog\\Source\\ThirdParty\\GalaxySDK\\Libraries"];
Game.KillMutex = ["UnrealEngine4"];
Game.DirSymlinkExclusions = [
  "Engine\\Plugins\\Online\\OnlineSubsystemGog\\Source\\ThirdParty\\GalaxySDK\\Libraries",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64",
  "SpaceHulkGame\\Binaries\\Win64"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "Galaxy64.dll", "steam_appid.txt"];
Game.GameName = "Space Hulk: Deathwing - Enhanced Edition";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "spacehulkgame-win64-shipping.exe";
Game.SteamID = "816090";
Game.GUID = "SpaceHulkGameEE";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "SpaceHulkGame\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = false;
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
Game.UserProfileSavePath = "AppData\\Local\\SpaceHulkEnhanced\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\SpaceHulkEnhanced\\Saved\\Config\\WindowsNoEditor";
Game.Description =
  "Script only for the Enhanced version of the game. Host an online co-op game in one instance and the other instances can join, re-join the same lobby if you get disconnected. Press the END key in your keyboard to unlock the main cursor and the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. Reduce in-game graphics per instance to improve performance. Press CTRL+T twice if you see any black bars in an instance.";
Game.PromptBetweenInstances = true;
Game.KeepSymLinkOnExit = false;
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
Game.GamePlayBeforeGameSetup = true;

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

  var id = Context.PlayerID + 6;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Plugins\\Online\\OnlineSubsystemGog\\Source\\ThirdParty\\GalaxySDK\\Libraries\\Galaxy64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Galaxy64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SpaceHulkGame\\Binaries\\Win64\\ngalaxye_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SpaceHulkGame\\Binaries\\Win64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NemirtingasGalaxyEmu.json");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SpaceHulkGame\\Binaries\\Win64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '  "galaxyid":', Nucleus.SearchType.StartsWith) + '|  "galaxyid": 14549624462898294' + id + ",",
    Context.FindLineNumberInTextFile(txtPath, '  "username":', Nucleus.SearchType.StartsWith) + '|  "username": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var ver = Context.Options["Version"];

  if (ver == "GoG") {
    Game.UseGoldberg = false;
  }

  if (ver == "Steam") {
  }
};