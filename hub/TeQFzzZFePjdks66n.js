Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Jul 17 2025 03:43:20 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "TeQFzzZFePjdks66n";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.KillMutex = ["rusader-Definitive-Edition-exe-SingleInstanceMutex-Default"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["UnityCrashHandler64.exe"];
Game.UseGoldberg = true;
Game.SteamID = "3024040";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Stronghold Crusader Definitive Edition.exe";
Game.GUID = "Stronghold Crusader Definitive Edition";
Game.GameName = "Stronghold Crusader: Definitive Edition";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.ToggleUnfocusOnInputsLock = true;
Game.SetForegroundWindowElsewhere = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Stronghold Crusader Definitive Edition";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\LocalLow\\Firefly Studios\\Stronghold Crusader Definitive Edition";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Launch your game outside of Nucleus and set your game to windowed before using this handler.\n\nWait until setup is complete before pressing END to lock input and allow each player to use their own cursor. Host a multiplayer game with one instance and join with the rest.\n\nYou can press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and all of its instances.";
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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamless.bat";
  var lines = [
    '"' + Context.NucleusFolder + '\\utils\\Steamless\\Steamless.CLI.exe" --quiet ' + '"' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\Stronghold Crusader Definitive Edition.exe"',
    'move /y "Stronghold Crusader Definitive Edition.exe.unpacked.exe" "Stronghold Crusader Definitive Edition.exe"'
  ];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamless.bat"], false, 1);

  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  Context.Wait(1500);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Stronghold Crusader Definitive Edition_Data\\Plugins\\x86_64\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  Context.BackupFile(Context.NucleusUserRoot + "\\AppData\\LocalLow\\Firefly Studios\\Stronghold Crusader Definitive Edition\\settings.cfg", true);

  Context.StartArguments = "-screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Firefly Studios\\Stronghold 1 Definitive Edition", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Firefly Studios\\Stronghold 1 Definitive Edition", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Firefly Studios\\Stronghold 1 Definitive Edition", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Firefly Studios\\Stronghold 1 Definitive Edition", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var cfgPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Firefly Studios\\Stronghold Crusader Definitive Edition\\settings.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(cfgPath, "Name:", Nucleus.SearchType.StartsWith) + "|Name:" + Context.Nickname,
    Context.FindLineNumberInTextFile(cfgPath, "FullscreenType:", Nucleus.SearchType.StartsWith) + "|FullscreenType:-1",
    Context.FindLineNumberInTextFile(cfgPath, "WinWidth:", Nucleus.SearchType.StartsWith) + "|WinWidth:" + Context.Width,
    Context.FindLineNumberInTextFile(cfgPath, "WinHeight:", Nucleus.SearchType.StartsWith) + "|WinHeight:" + Context.Height,
    Context.FindLineNumberInTextFile(cfgPath, "FullWidth:", Nucleus.SearchType.StartsWith) + "|FullWidth:" + Context.Width,
    Context.FindLineNumberInTextFile(cfgPath, "FullHeight:", Nucleus.SearchType.StartsWith) + "|FullHeight:" + Context.Height
  ];
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "MusicVolume:", Nucleus.SearchType.StartsWith) + "|MusicVolume:0"];
  } else {
    var dict = [Context.FindLineNumberInTextFile(cfgPath, "MusicVolume:", Nucleus.SearchType.StartsWith) + "|MusicVolume:1"];
  }
  Context.ReplaceLinesInTextFile(cfgPath, dict);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};