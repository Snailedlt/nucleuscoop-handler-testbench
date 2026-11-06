Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Jun 09 2022 05:59:04 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "dw8Wd88WJfwJp7X7P";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Disharmony", "Classic"];
Game.AddOption(
  "Select game version",
  "Disharmony includes the expansion and has various improvments made to balance and quality of life. Classic is the orginal release before these changes were made.",
  "Version",
  answers1
);

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "EndlessSpace.exe";
Game.SteamID = "208140";
Game.GUID = "ENDLESS Space";
Game.GameName = "ENDLESS Space";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 8;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Endless Space";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.StartArguments = "-nologo";
Game.DocumentsConfigPath = "Endless Space";
Game.DocumentsSavePath = "Endless Space\\Disharmony\\save";
Game.Description =
  "Launch the game outside of Nucleus at least once before using this. Once all instances have resized and repositioned, press END and wait a couple seconds to lock input and allow each player control. Host a public match with one player and join with the rest, do not click invite or the game will crash. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. Your saves will copied and playable in Nucleus, but any changes or new saves made will only be accessable by the Nucleus player that made them. Classic version saves can be found in the Documents Config folder.";
Game.PromptBetweenInstances = true;
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
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = true;
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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var path = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Registry.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//Fullscreen", "False");
  Context.ChangeXmlNodeInnerTextValue(path, "//Resolution", Context.Width + "x" + Context.Height + " (60)");

  if (Context.PlayerID > 0) {
    Context.ChangeXmlNodeInnerTextValue(path, "//Mute", "true");
  }

  var gamever = Context.Options["Version"];

  if (gamever == "Disharmony") {
    Context.ChangeXmlNodeInnerTextValue(path, "//DLC", "Disharmony");
  }

  if (gamever == "Classic") {
    Context.ChangeXmlNodeInnerTextValue(path, "//DLC", "Vanilla");
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};