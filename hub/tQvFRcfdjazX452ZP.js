Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Sep 01 2021 21:46:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "tQvFRcfdjazX452ZP";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64", "ChasedbyDarkness\\Binaries\\Win64", "ChasedbyDarkness\\Content\\Movies"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "3pluslogo.mp4", "Photosensitive.mp4", "trademark.mp4", "unreallogo.mp4"];
Game.SteamID = "1595710";
Game.GUID = "ChasedbyDarkness";
Game.GameName = "Chased by Darkness";
Game.HandlerInterval = 100;
Game.UseGoldberg = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.KeepSymLinkOnExit = false;
Game.ExecutableName = "ChasedbyDarkness-Win64-Shipping.exe";
Game.BinariesFolder = "ChasedbyDarkness\\Binaries\\Win64";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ChasedByDarkness  ";
Game.FakeFocus = false;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.SetWindowHook = true;
Game.SetForegroundWindowElsewhere = true;
Game.UseNucleusEnvironment = true;
Game.UserProfileConfigPath = "AppData\\Local\\ChasedbyDarkness\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\ChasedbyDarkness\\Saved\\SaveGames";
Game.PauseBetweenStarts = 20;

Game.Description =
  "block inputs when all instances are open by pressing the END key. If the fps is bad, unlock the inputs with the END key and with ALT+TAB select the nucleus window and lock the inputs again leaving the nucleus window focused.";

// -- mouse and Keyboard hook --
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
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
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
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.ClipCursorHook = false;
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
  Context.StartArguments = "-windowed -AlwaysFocus" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;
};