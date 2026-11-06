Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Jul 08 2025 16:50:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "4rPpjaHD9WW29YbTP";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers2 = ["No", "Yes"];
Game.AddOption("Would you like to launch with DirectX 11 instead of DirectX 12?", "Use if your machine does not support DirectX 12.", "Dx11", answers2);

Game.DirSymlinkExclusions = ["AbioticFactor\\Binaries\\Win64", "Engine\\Binaries\\Win64", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv157\\Win64"];
//Game.DirExclusions = ["steam_settings"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "AbioticFactor-Win64-Shipping.exe";
Game.SteamID = "427410";
Game.GUID = "Abiotic Factor";
Game.GameName = "Abiotic Factor";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 24;
Game.MaxPlayers = 24;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.BinariesFolder = "AbioticFactor\\Binaries\\Win64";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Abiotic Factor";
Game.HasDynamicWindowTitle = true;
Game.SetForegroundWindowElsewhere = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\AbioticFactor\\Saved\\Config\\Windows";
Game.UserProfileSavePath = "AppData\\Local\\AbioticFactor\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Run your main game at least once before using this. Saves are tied to Steam ID so make sure players have the same Steam ID as their save folder before launch.\n\nAfter all instances have resized, repositioned, and refreshed, click on each gamepad instance or they won't be able to use their cursor. You can use the mouse and keyboard in gamepad instances while input is unlocked, allowing you type of needed.\n\nPress END to lock input and grant players control. Host a LAN server with one instance and join with the rest.\n\nIf you experience lag in all but one instance you may be able to fix it by alt-tabing to Nucleus or pressing CTRL+H to unfocus instances.\n\nYou can press END again to unlock input. While input is unlocked, you can press CTRL+Q to close all instances.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 10;
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
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
Game.ProtoInput.SetWindowStyleHook = true;
Game.ProtoInput.SetWindowPosHook = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  Context.Wait(1500);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv157\\Win64\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  var dx11 = Context.Options["Dx11"];
  if (dx11 == "Yes") {
    var dx = "-dx11 ";
  } else {
    var dx = "-dx12 ";
  }

  Context.StartArguments = dx + "-AlwaysFocus -nosplash -ResX=" + Context.Width + " -ResY=" + Context.Height;

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

  var setini = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings.ini";
  Context.ModifySaveFile(setini, setini, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "Gameplay.Analytics", "0"), new Nucleus.IniSaveInfo("Settings", "Gameplay.HardwareCursor", "1")]);

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(setini, setini, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Settings", "GameAudio.NPCDialog", "0.0"),
      new Nucleus.IniSaveInfo("Settings", "GameAudio.Music", "0.0"),
      new Nucleus.IniSaveInfo("Settings", "GameAudio.PlayerDialog", "0.0")
    ]);
  } else {
    Context.ModifySaveFile(setini, setini, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Settings", "GameAudio.NPCDialog", "1.0"),
      new Nucleus.IniSaveInfo("Settings", "GameAudio.Music", "0.7"),
      new Nucleus.IniSaveInfo("Settings", "GameAudio.PlayerDialog", "1.0")
    ]);
  }

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

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};