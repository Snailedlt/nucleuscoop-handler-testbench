Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu May 09 2024 08:41:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "GYuySgAS5dLkofiGH";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.FileSymlinkExclusions = ["steamclient_loader.exe", "ColdClientLoader.ini", "steam_appid.txt", "local_save.txt"];
Game.FileSymlinkCopyInstead = ["steam_api.dll"];
Game.DirSymlinkExclusions = ["steam_settings", "mods"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimentalSteamClient = true;
Game.SteamID = "41014";
Game.ExecutableName = "SamHD_TSE_Unrestricted.exe";
Game.GUID = "Serious Sam HD The Second Encounter";
Game.GameName = "Serious Sam HD: The Second Encounter";
Game.BinariesFolder = "Bin";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 16;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SetForegroundWindowElsewhere = true;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Serious Sam HD: The Second Encounter";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\41010";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\41010\\local\\SeriousSamHD_TSE\\SavedGames";
Game.HandlerInterval = 100;
Game.Description =
  "Once setup is complete, host a server with one player and join with the rest. If you have at least one keyboard player press END to lock input and allow each keyboard player control of their instance. Keyboard players can press HOME to show or hide their cursor if necessary. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. If you can use workshop mods with this handler by creating a steam_settings/mods directory next to your base game exe and placing the desired workshop folders in that mods directory.";
Game.PauseBetweenContextAndLaunch = 2;
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

  var savePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\remote\\PlayerProfile_unrestricted.dat");

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.DrawFakeCursor = true;
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mkb.dat");
  } else {
    Game.ProtoInput.DrawFakeCursor = false;
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "gp.dat");
  }
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var cfgPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\local\\SeriousSamHD_TSE.ini";

  if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Local\\SeriousSamHD_TSE.ini")) {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "gfx_bFullScreen", Nucleus.SearchType.StartsWith) + "|gfx_bFullScreen = 0;",
      Context.FindLineNumberInTextFile(cfgPath, "gfx_iWaitVSyncs", Nucleus.SearchType.StartsWith) + "|gfx_iWaitVSyncs = 0;",
      Context.FindLineNumberInTextFile(cfgPath, "prj_bHardwareMouseCursor", Nucleus.SearchType.StartsWith) + "|prj_bHardwareMouseCursor = 1;",
      Context.FindLineNumberInTextFile(cfgPath, "cht_bUnlockMentalMode", Nucleus.SearchType.StartsWith) + "|cht_bUnlockMentalMode = 1;",
      Context.FindLineNumberInTextFile(cfgPath, "gfx_pixResWidth", Nucleus.SearchType.StartsWith) + "|gfx_pixResWidth = " + Context.Width + ";",
      Context.FindLineNumberInTextFile(cfgPath, "gfx_pixResHeight", Nucleus.SearchType.StartsWith) + "|gfx_pixResHeight = " + Context.Height + ";",
      Context.FindLineNumberInTextFile(cfgPath, "gfx_pixWinWidth", Nucleus.SearchType.StartsWith) + "|gfx_pixWinWidth = " + Context.Width + ";",
      Context.FindLineNumberInTextFile(cfgPath, "gfx_pixWinHeight", Nucleus.SearchType.StartsWith) + "|gfx_pixWinHeight = " + Context.Height + ";"
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  } else {
    var cfgLines = [
      "gfx_bFullScreen = 0;",
      "gfx_iWaitVSyncs = 0;",
      "prj_bHardwareMouseCursor = 0;",
      "cht_bUnlockMentalMode = 1;",
      "men_fMusicVolume = 1;",
      'snd_fMusicVolume = 1; _(version="3")',
      "gfx_pixResWidth = " + Context.Width + ";",
      "gfx_pixResHeight = " + Context.Height + ";",
      "gfx_pixWinWidth = " + Context.Width + ";",
      "gfx_pixWinHeight = " + Context.Height + ";"
    ];
    Context.WriteTextFile(cfgPath, cfgLines);
  }

  if (Context.PlayerID > 0) {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolume", Nucleus.SearchType.StartsWith) + "|men_fMusicVolume = 0;",
      Context.FindLineNumberInTextFile(cfgPath, "snd_fMusicVolume", Nucleus.SearchType.StartsWith) + '|snd_fMusicVolume = 0; _(version="3")'
    ];
  } else {
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, "men_fMusicVolume", Nucleus.SearchType.StartsWith) + "|men_fMusicVolume = 1;",
      Context.FindLineNumberInTextFile(cfgPath, "snd_fMusicVolume", Nucleus.SearchType.StartsWith) + '|snd_fMusicVolume = 1; _(version="3")'
    ];
  }
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, false, false, false, false, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.OnFinishedSetup = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, false, false, false, false, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};