Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Dec 05 2022 21:55:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Jdpwte53p7DQ4nDHc";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64", "Exorcist\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.GameName = "Vade Retro : Exorcist";
Game.HandlerInterval = 100;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SymlinkExe = false;
Game.KeepSymLinkOnExit = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Exorcist-Win64-Shipping.exe";
Game.SteamID = "1931950";
Game.GUID = "Vade Retro - Exorcist";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Exorcist\\Binaries\\Win64";
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HasDynamicWindowTitle = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Vade Retro  ";
Game.HookFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetWindowHook = true;
Game.HideTaskbar = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SetForegroundWindowElsewhere = true;
Game.UseNucleusEnvironment = true;
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileSavePath = "AppData\\Local\\Exorcist\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\Exorcist\\Saved\\Config\\WindowsNoEditor";
Game.Description =
  "You can change settings and game details normally, just *don't touch the game's resolution*. After instances open, Press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. if you have problems with FPS, unlock the inputs and press WIN+B to unfocus the instances, press END again to lock the input";
Game.PauseBetweenStarts = 25;

// -- mouse and Keyboard --
Game.SupportsMultipleKeyboardsAndMice = true;

//old hooks
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
Game.DrawFakeMouseCursor = false;

//new proto input hooks
Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;

Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 99;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.StartArguments = "-AlwaysFocus";

  Context.Wait(2000);

  //delete the original .exe package
  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Exorcist\\Binaries\\Win64\\Exorcist-Win64-Shipping.exe")) {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Exorcist\\Binaries\\Win64\\Exorcist-Win64-Shipping.exe");
  }

  //rename the executable unpacked to original name
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Exorcist\\Binaries\\Win64\\Exorcist-Win64-Shipping.exe");
  var savePkgOrigin = System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Exorcist\\Binaries\\Win64\\Exorcist-Win64-Shipping.exe.unpacked.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //delete the old .exe unpacked
  System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Exorcist\\Binaries\\Win64\\Exorcist-Win64-Shipping.exe.unpacked.exe");

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";

  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "True"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "True"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "WindowPosX", "-1"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "WindowPosY", "-1"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "False")
  ]);
};