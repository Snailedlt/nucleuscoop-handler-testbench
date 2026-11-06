Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Sep 02 2026 00:35:25 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "7jH9geBpjAhjMjcYX";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

var answers = ["AVX", "Non-AVX"];
Game.AddOption("CPU Instruction Set", "Use AVX only if your processor supports it.", "SELECT", answers);

Game.BackupFiles = ["gamedata\\configs\\axr_options.ltx"];
Game.BackupFolders = ["appdata"];

Game.DirSymlinkExclusions = ["logs"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "AnomalyDX8.exe", "AnomalyDX8AVX.exe", "AnomalyDX9.exe", "AnomalyDX9AVX.exe", "AnomalyDX10.exe", "AnomalyDX10AVX.exe", "xrrazom_lan_id.bin"];

Game.DirSymlinkCopyInstead = ["bin", "gamedata", "savedgames"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.FileSymlinkCopyInstead = ["fsgame.ltx", "user.ltx"];

Game.KillMutex = ["STALKER-COP_68a2b5c5"];

Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.GameName = "S.T.A.L.K.E.R - Anomaly Co-Op";
Game.ExecutableNames = ["AnomalyDX11AVX.exe"];
Game.GUID = "Stalker Anomaly Co-Op";
Game.SteamID = "41700";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "S.T.A.L.K.E.R.: Anomaly";
Game.HasDynamicWindowTitle = true;
Game.BinariesFolder = "bin";
// Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "📌 REQUIRED:\n" +
  "• *<Follow the installation guides for S.T.A.L.K.E.R. Anomaly and xrRazom Co-op carefully|100,180,255>*\n" +
  "• https://hub.splitscreen.me/handler/aoCLfCE9QPsc4Tgzb\n" +
  "• Launch the game *<(DX11)|200,200,200>* at least once and create a new save before using Nucleus Co-op,\n" +
  "so the game can generate and save its configuration files. *<(MANDATORY!)|255,80,80>*\n\n" +
  "⚠️ MOD CONFIGURATION:\n" +
  "ℹ️ Go to *<Settings|230,140,60>* → *<xrRazom Co-op:|230,140,60>*\n" +
  "• Set a unique *<Player Name|100,180,255>* for each player.\n" +
  "• Host session on game start: *<ENABLED|80,220,120>*.\n" +
  "• Host via Steam ID (P2P): *<DISABLED|255,80,80>*.\n" +
  "• LAN Port: *<27015|216,222,18>* is the default and does not need to be changed when playing only through Nucleus Co-op.\n\n" +
  "🔗 HOW TO CONNECT:\n" +
  "• One player creates a new save or loads an existing save.\n" +
  "• Other players select *<Connect to Session|100,180,255>* from the main menu.\n" +
  "• Nucleus users can leave the connection field *<Empty|200,200,200>* and press *<OK|80,220,120>* to join automatically.\n\n" +
  "🧩 NUCLEUS:\n" +
  "• Wait until all instances are resized and positioned.\n" +
  "• Press *<END|200,200,200>* to lock the input.\n" +
  "• Left-click once with each mouse to make the emulated cursors appear.\n" +
  "• Press *<END|200,200,200>* again to unlock the input when you finish playing.\n" +
  "• *<CTRL+Q|200,200,200>* closes Nucleus and all instances while the input is unlocked.\n" +
  "• *<CTRL+H|200,200,200>* unfocuses the instances.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 15;

// -- mouse and Keyboard --
Game.SupportsMultipleKeyboardsAndMice = true;

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

Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.ExtendFakeCursorBounds = false;
Game.ProtoInput.FocusHooks = true;

Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;

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
// Game.ProtoInput.FocusLoopIntervalMilliseconds = 99000;
// Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
// Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
// Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
// Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
// Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

//gamepads
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.Play = function() {
  Context.StartArguments = "";

  //Copy all necessary files (Disable SplashScreen)
  Context.CopyFolder(Game.Folder, Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin");

  //######################################################################################################################

  var AVX = Context.Options["SELECT"];

  if (AVX == "AVX") {
    //dummmy empty
  }

  if (AVX == "Non-AVX") {
    Game.ExecutableToLaunch = "bin\\AnomalyDX11.exe";
  }

  //######################################################################################################################

  // user.ltx
  var settings = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\appdata\\user.ltx";
  Context.EditTextFile(settings, ["rs_screenmode "], ["rs_screenmode windowed"], "UTF-8");
  Context.EditTextFile(settings, ["rs_v_sync"], ["rs_v_sync on"], "UTF-8");
  Context.EditTextFile(settings, ["discord_status "], ["discord_status off"], "UTF-8");
  Context.EditTextFile(settings, ["vid_mode "], ["vid_mode " + Context.Width + "x" + Context.Height + ""], "UTF-8");

  //xrRazom
  Context.EditTextFile(settings, ["xrr_host_lan_port "], ["xrr_host_lan_port 27015"], "UTF-8");
  Context.EditTextFile(settings, ["xrr_host_session "], ["xrr_host_session on"], "UTF-8");
  Context.EditTextFile(settings, ["xrr_host_steam "], ["xrr_host_steam off"], "UTF-8");
  Context.EditTextFile(settings, ["xrr_max_players "], ["xrr_max_players 4"], "UTF-8");

  //######################################################################################################################

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      // Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      // ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

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
    }
  };
};