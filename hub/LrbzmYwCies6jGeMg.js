Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Jun 19 2024 09:25:49 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "LrbzmYwCies6jGeMg";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.FileSymlinkExclusions = ["Kex.ogv", "NewBloodLogo.ogv", "NightDive.ogv", "steam_api.dll"];
Game.FileSymlinkCopyInstead = ["SDL2.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoWarning = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "RottEX.exe";
Game.SteamID = "1421490";
Game.GUID = "Rise of the Triad Ludicrous Edition";
Game.GameName = "Rise of the Triad: Ludicrous Edition";
Game.FakeFocus = true;
Game.PreventWindowDeactivation = true;
Game.MaxPlayers = 11;
Game.MaxPlayersOneMonitor = 11;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Rise of the Triad - Ludicrous Edition";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll", "Xinput9_1_0.dll"];
Game.UserProfileConfigPath = "Saved Games\\Nightdive Studios\\Rise of the Triad - Ludicrous Edition";
Game.Description =
  "Run the game outside of Nucleus at least once before using this handler.\n\nIf you are playing with a keyboard player make sure to add them last. Alt tab to the keyboard instance to grant them control.\n\nHost a LAN game with one instance and join with the rest.";
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

Game.SupportsMultipleKeyboardsAndMice = false;

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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.ClipCursorHook = false;
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
    Game.KeyboardPlayerSkipFakeFocus = true;
  }

  Context.BackupFile(Context.NucleusUserRoot + "\\Saved Games\\Nightdive Studios\\Rise of the Triad - Ludicrous Edition\\kexengine.cfg", true);

  var txtPath = Context.NucleusUserRoot + "\\" + Context.UserProfileConfigPath + "\\kexengine.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "seta v_windowmode", Nucleus.SearchType.StartsWith) + '|seta v_windowmode "1"',
    //Context.FindLineNumberInTextFile(txtPath, "seta g_nativeMouse", Nucleus.SearchType.StartsWith) + '|seta g_nativeMouse "1"',
    Context.FindLineNumberInTextFile(txtPath, "seta v_height", Nucleus.SearchType.StartsWith) + '|seta v_height "' + Context.Height + '" ',
    Context.FindLineNumberInTextFile(txtPath, "seta v_width", Nucleus.SearchType.StartsWith) + '|seta v_width "' + Context.Width + '" '
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta snd_musicvolume", Nucleus.SearchType.StartsWith) + '|seta snd_musicvolume "0.0"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta snd_musicvolume", Nucleus.SearchType.StartsWith) + '|seta snd_musicvolume "0.5"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
};