Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu May 09 2024 08:44:03 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "chs98LpNvCbFRbTS7";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.FileSymlinkExclusions = ["disable_overlay.txt", "steamclient_loader.exe", "ColdClientLoader.ini", "steam_appid.txt", "local_save.txt", "zz1132149641.gro", "zz1132149641.jpg", "zz1132149641.txt"];
Game.FileSymlinkCopyInstead = ["steam_api.dll", "SeriousSam2017.ini"];
Game.DirSymlinkExclusions = ["steam_settings", "mods", "1132149641"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimentalSteamClient = true;
Game.PlayerSteamIDs = [
  "76561198620051760",
  "76561198620051761",
  "76561198620051762",
  "76561198620051763",
  "76561198620051764",
  "76561198620051765",
  "76561198620051766",
  "76561198620051767",
  "76561198620051768",
  "76561198620051769",
  "76561198620051770",
  "76561198620051771",
  "76561198620051772",
  "76561198620051773",
  "76561198620051774",
  "76561198620051775"
];
Game.SteamID = "564310";
Game.ExecutableName = "Sam2017_Unrestricted.exe";
Game.GUID = "Serious Sam Fusion 2017";
Game.GameName = "Serious Sam Fusion 2017";
Game.BinariesFolder = "Bin\\x64";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SetForegroundWindowElsewhere = true;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Serious Sam Fusion 2017";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\564310";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\564310\\remote\\SavedGames_unrestricted";
Game.HandlerInterval = 100;
Game.Description =
  "IMPORTANT: Make sure you are not using custom steamids for any player or else controls and unlocks will not work properly (Will be fixed in a future Nucleus update). Once setup is complete, host a server with one player and join with the rest. If you have at least one keyboard player press END to lock input and allow each keyboard player control of their instance. Keyboard players can press HOME to show or hide their cursor if necessary. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. If you can use workshop mods with this handler by creating a steam_settings/mods directory next to your base game exe and placing the desired workshop folders in that mods directory.";
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 15;

//USS deprecated options:

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\local");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\remote");
  System.IO.Directory.CreateDirectory(filePath);

  var userPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UserData");
  System.IO.Directory.CreateDirectory(userPath);

  var modPath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin\\x64\\steam_settings\\mods\\1132149641");
  System.IO.Directory.CreateDirectory(modPath);

  var doPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin\\x64\\steam_settings\\disable_overlay.txt";
  var doLines = [""];
  Context.WriteTextFile(doPath, doLines);

  var modfilePath = (Context.SavePath = modPath + "\\zz1132149641.gro");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "zz1132149641.gro");
  System.IO.File.Copy(savePkgOrigin, modfilePath, true);

  var modfilePath = (Context.SavePath = modPath + "\\zz1132149641.jpg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "zz1132149641.jpg");
  System.IO.File.Copy(savePkgOrigin, modfilePath, true);

  var modfilePath = (Context.SavePath = modPath + "\\zz1132149641.txt");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "zz1132149641.txt");
  System.IO.File.Copy(savePkgOrigin, modfilePath, true);

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\remote\\PlayerProfile_unrestricted.dat");
  var bkpPath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\remote\\PlayerProfile_unrestricted.dat.bkp");

  if (Context.IsKeyboardPlayer) {
    var ptype = "mkb";
  } else {
    var ptype = "gp";
  }

  var pid = Context.PlayerID + 60;

  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "" + ptype + "" + pid + ".dat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  System.IO.File.Copy(savePkgOrigin, bkpPath, true);

  var cfgPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\local\\SeriousSam2017.ini";
  var usrPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UserData\\SeriousSam2017.ini";

  var cfgLines = [
    "gfx_bFullScreen = 0;",
    "gfx_iWaitVSyncs = 0;",
    'men_bShowIntroCutscene = 0; _(version="2")',
    "prj_bHardwareMouseCursor = 0;",
    'inp_bRawInput = 0; _(version="2")',
    "cht_bUnlockMentalMode = 1;",
    "men_fMusicVolumeLoadingMenu = 1;",
    'men_fMusicVolumeMainMenu = 0.2; _(version="1")',
    "men_fMusicVolumeStartMenu = 1;",
    'snd_fMovieVolume = 0.7; _(version="3")',
    'snd_fMusicVolume = 0.60000004; _(version="3")',
    "gfx_pixResWidth = " + Context.Width + ";",
    "gfx_pixResHeight = " + Context.Height + ";",
    "gfx_pixWinWidth = " + Context.Width + ";",
    "gfx_pixWinHeight = " + Context.Height + ";"
  ];

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Local\\SeriousSam2017.ini")) {
    Context.WriteTextFile(cfgPath, cfgLines);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UserData\\SeriousSam2017.ini")) {
    Context.WriteTextFile(usrPath, cfgLines);
  }

  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "gfx_bFullScreen", Nucleus.SearchType.StartsWith) + "|gfx_bFullScreen = 0;",
    Context.FindLineNumberInTextFile(cfgPath, "gfx_iWaitVSyncs", Nucleus.SearchType.StartsWith) + "|gfx_iWaitVSyncs = 0;",
    Context.FindLineNumberInTextFile(cfgPath, "men_bShowIntroCutscene", Nucleus.SearchType.StartsWith) + '|men_bShowIntroCutscene = 0; _(version="2")',
    Context.FindLineNumberInTextFile(cfgPath, "prj_bHardwareMouseCursor", Nucleus.SearchType.StartsWith) + "|prj_bHardwareMouseCursor = 0;",
    Context.FindLineNumberInTextFile(cfgPath, "inp_bRawInput", Nucleus.SearchType.StartsWith) + '|inp_bRawInput = 0; _(version="2")',
    Context.FindLineNumberInTextFile(cfgPath, "cht_bUnlockMentalMode", Nucleus.SearchType.StartsWith) + "|cht_bUnlockMentalMode = 1;",
    Context.FindLineNumberInTextFile(cfgPath, "gfx_pixResWidth", Nucleus.SearchType.StartsWith) + "|gfx_pixResWidth = " + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "gfx_pixResHeight", Nucleus.SearchType.StartsWith) + "|gfx_pixResHeight = " + Context.Height + ";",
    Context.FindLineNumberInTextFile(cfgPath, "gfx_pixWinWidth", Nucleus.SearchType.StartsWith) + "|gfx_pixWinWidth = " + Context.Width + ";",
    Context.FindLineNumberInTextFile(cfgPath, "gfx_pixWinHeight", Nucleus.SearchType.StartsWith) + "|gfx_pixWinHeight = " + Context.Height + ";"
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);
  Context.ReplaceLinesInTextFile(usrPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolumeLoadingMenu", Nucleus.SearchType.StartsWith) + "|men_fMusicVolumeLoadingMenu = 0;",
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolumeMainMenu", Nucleus.SearchType.StartsWith) + '|men_fMusicVolumeMainMenu = 0; _(version="1")',
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolumeStartMenu", Nucleus.SearchType.StartsWith) + "|men_fMusicVolumeStartMenu = 0;",
      Context.FindLineNumberInTextFile(cfgPath, "snd_fMovieVolume", Nucleus.SearchType.StartsWith) + '|snd_fMovieVolume = 0; _(version="3")',
      Context.FindLineNumberInTextFile(cfgPath, "snd_fMusicVolume", Nucleus.SearchType.StartsWith) + '|snd_fMusicVolume = 0; _(version="3")'
    ];
  } else {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolumeLoadingMenu", Nucleus.SearchType.StartsWith) + "|men_fMusicVolumeLoadingMenu = 1;",
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolumeMainMenu", Nucleus.SearchType.StartsWith) + '|men_fMusicVolumeMainMenu = 0.2; _(version="1")',
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolumeStartMenu", Nucleus.SearchType.StartsWith) + "|men_fMusicVolumeStartMenu = 1;",
      Context.FindLineNumberInTextFile(cfgPath, "snd_fMovieVolume", Nucleus.SearchType.StartsWith) + '|snd_fMovieVolume = 0.7; _(version="3")',
      Context.FindLineNumberInTextFile(cfgPath, "snd_fMusicVolume", Nucleus.SearchType.StartsWith) + '|snd_fMusicVolume = 0.60000004; _(version="3")'
    ];
  }
  Context.ReplaceLinesInTextFile(cfgPath, dict);
  Context.ReplaceLinesInTextFile(usrPath, dict);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.OnFinishedSetup = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, false, false, false, true, false);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};