Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 25 2024 07:27:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Y7PBd85KjQ6psQbZ6";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt"];
Game.UseNucleusEnvironment = true;
Game.CreateSteamAppIdByExe = true;
Game.UseGoldberg = true;
Game.SteamID = "1836730";
Game.ExecutableName = "Greylock-Win64-Shipping.exe";
Game.GUID = "Echo Point Nova";
Game.GameName = "Echo Point Nova";
Game.BinariesFolder = "Greylock\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SetForegroundWindowElsewhere = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Greylock";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\Greylock\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\Greylock\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.HandlerInterval = 100;
Game.Description =
  "Wait until all instances have resized, repositioned, and refreshed. Press END to lock input and allow each keyboard player control of their instance.\n\nHost an online coop match with one player and join with the others.\n\nPress the END key again to unlock input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 20;

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
Game.ProtoInput.SetWindowStyleHook = true;
Game.ProtoInput.SetWindowPosHook = true;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var vidcfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "false"),
    new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ResolutionQuality", "100.000000"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "Option_ResolutionX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "Option_ResolutionY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "true")
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

  var setcfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings.ini";

  Context.ModifySaveFile(setcfg, setcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "r.setres", Context.Width + "x" + Context.Height + "w")]);

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(setcfg, setcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "GameAudio.Music", "0")]);
  } else {
    Context.ModifySaveFile(setcfg, setcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "GameAudio.Music", "0.75")]);
  }

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

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, false, false, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};