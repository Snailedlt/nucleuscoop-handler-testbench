Hub.Handler.Version = 11; // Released at https://hub.splitscreen.me/ on Wed Jul 09 2025 10:12:24 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "uAoSw4LaK2j6tuJME";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["FactoryGame\\Binaries\\Win64", "Engine\\Binaries\\Win64", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv157\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "EOSSDK-Win64-Shipping.dll", "dsound.dll", "SatisfactoryUltrawideRose.asi", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["FactoryGame.exe"];
Game.GameName = "Satisfactory";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "FactoryGameSteam-Win64-Shipping.exe";
Game.SteamID = "526870";
Game.GUID = "Satisfactory";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Engine\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
//Game.LauncherExe = "FactoryGame.exe";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Satisfactory";
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\FactoryGame\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\FactoryGame\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  'Steam version only. Saves are tied to Player Nickname and Steam ID. Wait until each instance has resized, repositioned, and loaded to the main menu before launching the next one.\n\nOnce all instances have finished setting up and you have clicked the final prompt, press the END key to lock the input and grant each instance their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input.\n\nLoad or start a game with one instance, making sure that in "Multiplayer Settings" "Session Type" is set to "Steam" before starting. Once in game, pause with ESC and go to "Manage Session" > "Session Settings", click "Show" next to "Session ID", and click "Copy to Clipboard".\n\nJoin with the other instances using "Join game directly..." and click "Paste From Clipboard". If you get a timeout error just try again until it works.\n\nPress the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Reduce in-game graphics settings per instance to improve performance.';
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 8;
Game.PauseBetweenStarts = 40;

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

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.FindWindowHook = false;

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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = " FactoryGame -windowed -AlwaysFocus -nosplash -NO_EOS_OVERLAY" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  if (Context.AspectRatioDecimal > 1.78) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\Win64\\dsound.dll";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dsound.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\Win64\\SatisfactoryUltrawideRose.asi";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SatisfactoryUltrawideRose.asi");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var vidcfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "bUseDynamicResolution", "False"),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "mIntValues", '(("FG.MaintainYAxisFOV", 1))'),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "mFloatValues", '(("RTPC.Music_Bus_Volume", 1.000000))'),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGSessionSettings", "mSessionDefinitionName", "SessionDef_Steam"),
    new Nucleus.IniSaveInfo("/Script/FactoryGame.FGSessionSettings", "mLastUsedProfilePerSessionDefinition", '(("SessionDef_Steam", "Open"))')
  ]);

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "mFloatValues", '(("RTPC.Music_Bus_Volume", 0.000000))')]);
  }

  if (Context.AspectRatioDecimal < 1.2) {
    Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/FactoryGame.FGGameUserSettings", "mIntValues", '(("FG.MaintainYAxisFOV", 0))')]);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  };
};