Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Oct 31 2022 00:50:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "L7nEFYg8D9XTxHNFT";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64", "HauntChaser\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.GameName = "Haunt Chaser";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.KeepSymLinkOnExit = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "HauntChaser-Win64-Shipping.exe";
Game.SteamID = "1450180";
Game.GUID = "Haunt Chaser";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "HauntChaser\\Binaries\\Win64";
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Haunt Chaser  ";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.UseNucleusEnvironment = true;
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileSavePath = "AppData\\Local\\HauntChaser\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\HauntChaser\\Saved\\Config\\WindowsNoEditor";
Game.Description =
  "You can change settings and game details normally, just *don't touch the game's resolution*. After instances open, Press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenStarts = 35;

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
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var stats = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64\\steam_settings\\stats.txt";
  var lines = [
    "CompleteObjective_CompleteObjective=int=0",
    "TakenPhotographs_TakenPhotographs=int=0",
    "CaughtCount_CaughtCount=int=0",
    "RebornCount_RebornCount=int=0",
    "BanishCount_BanishCount=int=0",
    "SealedCount_SealedCount=int=0",
    "FindedTreasure_FindedTreasure=int=0",
    "PlacedWards_PlacedWards=int=0",
    "TrapEntity_TrapEntity=int=0",
    "TeleportCount_TeleportCount=int=0",
    "SpeedCount_SpeedCount=int=0",
    "HearedSound_HearedSound=int=0",
    "CaughtTrap_CaughtTrap=int=0",
    "RevivedCount_RevivedCount=int=0",
    "CatchedCount_CatchedCount=int=0",
    "WinCount_WinCount=int=0"
  ];
  Context.WriteTextFile(stats, lines);
};