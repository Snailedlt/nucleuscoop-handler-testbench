Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Tue Apr 04 2023 23:32:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "AEyfiDGrFKQoEeS4J";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["250", "500", "1000", "1500", "2000", "4000", "8000"];
Game.AddOption("Select the unit cap for each player in multiplayer", "Default is 250. Raising this limit will impact performance.", "UnitCap", answers1);
var answers2 = ["No", "Yes"];
Game.AddOption("Is someone playing in fullscreen using the primary monitor?", "Select yes if so. This will keep borders in order to prevent issues.", "P0FullScreen", answers2);

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["preferences.ini"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "Rusted Warfare - 64.exe";
Game.SteamID = "647960";
Game.GUID = "Rusted Warfare";
Game.GameName = "Rusted Warfare";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 10;
Game.MaxPlayers = 10;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.LauncherTitle = "";
Game.LauncherExe = "start.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.RefreshWindowAfterStart = true;
Game.DontRemoveBorders = false;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Rusted Warfare";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Once all instances have repositioned, press END to lock input and allow each player to use their own cursor. If you can not see your mouse cursor press HOME to make it visible. Host a LAN match with one player and join with the rest using direct connect, if you are connecting to a server hosted on the same computer, use either 'localhost' or '127.0.0.1'. You can also play online. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances. Supports all mods, but Steam workshop mods must have their folders moved to the 'mods/units' folder in your Rusted Warefare root directory before launching the handler.";
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
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
//Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

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
  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var lines = ['start "" "Rusted Warfare - 64.exe"'];
  Context.WriteTextFile(Bat, lines);

  var full = Context.Options["P0FullScreen"];

  if (full == "Yes") {
    Game.DontRemoveBorders = true;
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\preferences.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "lastNetworkPlayerName:", Nucleus.SearchType.StartsWith) + "|lastNetworkPlayerName:" + Context.Nickname,
    Context.FindLineNumberInTextFile(txtPath, "slick2dBorderless:", Nucleus.SearchType.StartsWith) + "|slick2dBorderless:false",
    Context.FindLineNumberInTextFile(txtPath, "slick2dFullScreen:", Nucleus.SearchType.StartsWith) + "|slick2dFullScreen:false",
    Context.FindLineNumberInTextFile(txtPath, "enableMouseCapture:", Nucleus.SearchType.StartsWith) + "|enableMouseCapture:true"
    //Context.FindLineNumberInTextFile(txtPath, "slick2dResolution:", Nucleus.SearchType.StartsWith) + '|slick2dResolution:'+ Context.Width + "x" + Context.Height,
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [Context.FindLineNumberInTextFile(txtPath, "musicVolume:", Nucleus.SearchType.StartsWith) + "|musicVolume:0.00"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var cap = Context.Options["UnitCap"];

  var dict = [Context.FindLineNumberInTextFile(txtPath, "teamUnitCapHostedGame:", Nucleus.SearchType.StartsWith) + "|teamUnitCapHostedGame:" + cap];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};