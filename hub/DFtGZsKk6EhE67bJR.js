Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Oct 11 2022 07:39:11 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "DFtGZsKk6EhE67bJR";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4"; //Game.KillMutex = [

//"{cff2f1a0-500e-4fae-a789-ceaa827d8c08}",
//];
Game.ExecutableContext = ["strings.dll"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = false;
Game.SymlinkFolders = false;
Game.ExecutableName = "haloce.exe";
Game.GUID = "Halo Custom Edition";
Game.GameName = "Halo Custom Edition";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Halo";
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.HideCursor = true;
Game.Description =
  "Requires Halo Custom Edition: http://hce.halomaps.org/?fid=410 , patch it with Halo Custom Edition Patch V1.0.10: http://hce.halomaps.org/index.cfm?fid=6798 and latest Chimera: https://opencarnage.net/index.php?/topic/6916-chimera/ .";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 35;

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
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
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

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = false;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  Context.StartArguments = " -window" + " -vidmode " + (Context.Width - 1) + "," + (Context.Height - 1) + " -path " + Context.Nickname + " -cport 2" + Context.PlayerID + 3 + "02";

  var txtPath = Context.OrigRootFolder + "\\chimera.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "background_playback", Nucleus.SearchType.StartsWith) + "|background_playback=1",
    Context.FindLineNumberInTextFile(txtPath, ";multiple_instances=1", Nucleus.SearchType.StartsWith) + "|multiple_instances=1",
    Context.FindLineNumberInTextFile(txtPath, "multiple_instances", Nucleus.SearchType.StartsWith) + "|multiple_instances=1"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};