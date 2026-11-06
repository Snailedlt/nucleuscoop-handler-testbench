Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Apr 09 2024 21:33:39 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "EMFS49WtPDujNRwsz";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt" /*, "THQNORDIC_LOGO_Color_white.bk2", "SPDS_SplashScreen.bk2", "OpeningSplash-Question.bk2"*/];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "SnowDay-Win64-Shipping.exe";
Game.SteamID = "1214650";
Game.GUID = "South Park Snow Day!";
Game.GameName = "South Park: Snow Day!";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.BinariesFolder = "SnowDay\\Binaries\\Win64";
Game.SupportsPositioning = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
//Game.HookFocus = true;
Game.DontReposition = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "SnowDay";
Game.HasDynamicWindowTitle = true;
Game.PreventWindowDeactivation = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "XInput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\SnowDay\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\SnowDay\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Run your main game at least once before using this. Saves are tied to Steam ID so make sure players have the same Steam ID as their save folder before launch. After all instances have resized and repositioned, you can press END to lock input to grant gamepad and keyboard players control. Host a public match with one instance and join with the rest. You might want to mute music and dialogue for all but one player to avoid annoying echo. If you experience lag in all but one instance you may be able to fix it by alt-tabing to Nucleus or pressing CTRL+H to unfocus instances. You can press END again to unlock input. While input is unlocked, you can press CTRL+Q to close all instances.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;

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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
//Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
Game.ProtoInput.SetWindowStyleHook = true;
//Game.ProtoInput.SetWindowPosHook = true;

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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.DrawFakeCursor = true;
  } else {
    Game.ProtoInput.DrawFakeCursor = false;
  }

  Context.StartArguments = "-AlwaysFocus -nosplash -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var vidcfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "false"),
    new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ResolutionQuality", "100.000000"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "true"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height)
  ]);

  var ngincfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
  Context.ModifySaveFile(ngincfg, ngincfg, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")
    //new Nucleus.IniSaveInfo("SystemSettings", "r.VSync", "0"),
    //new Nucleus.IniSaveInfo("SystemSettings", "bSmoothFrameRate", "False"),
    //new Nucleus.IniSaveInfo("SystemSettings", "r.MotionBlurQuality", "0"),
  ]);

  if (Context.AspectRatioDecimal < 1.2) {
    Context.ModifySaveFile(ngincfg, ngincfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  }

  //if (Context.PlayerID > 0) {
  //Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "MusicAudioVolume", "0.000000")]);
  //}

  if (Context.HasKeyboardPlayer == true) {
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, false, true, false, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};