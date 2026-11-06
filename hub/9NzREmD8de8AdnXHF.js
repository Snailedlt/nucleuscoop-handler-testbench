Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Fri Dec 15 2023 08:31:39 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "9NzREmD8de8AdnXHF";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["reactivedrop"];
Game.KillMutex = ["hl2_singleton_mutex"];
Game.DirSymlinkExclusions = ["bin", "reactivedrop\\cfg", "reactivedrop\\bin"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "autoexec.cfg", "engine.dll", "client.dll", "server.dll", "local_save.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["steam.inf", "config.cfg"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "reactivedrop.exe";
Game.SteamID = "563560";
Game.GUID = "Alien Swarm Reactive Drop";
Game.GameName = "Alien Swarm: Reactive Drop";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
//Game.WorkingFolder = "bin";
Game.StartArguments = "";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 8;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Alien Swarm: Reactive Drop";
//Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\563560";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Host a friends only lobby and join in the other instances using the play with friends option, use your main mouse cursor to navigate the menus as some do not work with gamepad. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the escape key if the emulated mouse cursor does not hide in-game. Press the END key again to unlock the input when you finish playing.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 1;
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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_api.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\disable_lan_only.txt";
  var lines = [""];
  Context.WriteTextFile(nolan, lines);

  if (Context.IsKeyboardPlayer) {
    Context.StartArguments =
      " -windowed -noborder -novid -steam +cl_mouselook 1 +cl_mouselook2 1 +m_rawinput 1" + " -w " + Context.Width + " -h " + Context.Height + " -x " + Context.PosX + " -y " + Context.PosY;
  } else {
    Context.StartArguments = " -windowed -noborder -novid -steam" + " -w " + Context.Width + " -h " + Context.Height + " -x " + Context.PosX + " -y " + Context.PosY;
  }

  //TODO: how to update these if it comes the case?

  //patch dlls
  //patch engine no sleep
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootInstallFolder, "bin\\engine.dll"),
    System.IO.Path.Combine(Context.RootFolder, "bin\\engine.dll"),
    [0x8b, 0x01, 0x8b, 0x50, 0x3c, 0xff, 0xd2, 0x84, 0xc0, 0x75, 0x1a],
    [0x8b, 0x01, 0x8b, 0x50, 0x3c, 0x90, 0x90]
  );
  //patch select weapon for players in briefing
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootInstallFolder, "reactivedrop\\bin\\client.dll"),
    System.IO.Path.Combine(Context.RootFolder, "reactivedrop\\bin\\client.dll"),
    [0x0f, 0x84, 0xa8, 0x00, 0x00, 0x00, 0x53, 0x8d],
    [0x90, 0x90, 0x90, 0x90, 0x90, 0x90]
  );
  //patch select weapon for players in briefing
  Context.PatchFile(
    System.IO.Path.Combine(Context.RootInstallFolder, "reactivedrop\\bin\\server.dll"),
    System.IO.Path.Combine(Context.RootFolder, "reactivedrop\\bin\\server.dll"),
    [0x74, 0x12, 0x46, 0x83, 0xfe, 0x20],
    [0xeb]
  );

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\reactivedrop\\cfg\\autoexec.cfg";
  var lines = ["sv_lan 0", "sv_allow_lobby_connect_only 0", "rd_ready_mark_override 1"];

  if (Player.IsKeyboardPlayer) {
    lines.push("joystick 0");
    lines.push("sk_autoaim_mode 1");
    //lines.push("exec undo360controller.cfg");
  } else {
    lines.push("exec 360controller_pc.cfg");
    lines.push("alias selectmarine selectmarine0");
    lines.push('alias selectmarine0 "cl_selectsinglem 0 -1; alias selectmarine selectmarine1"');
    lines.push('alias selectmarine1 "cl_selectsinglem 1 -1; alias selectmarine selectmarine2"');
    lines.push('alias selectmarine2 "cl_selectsinglem 2 -1; alias selectmarine selectmarine3"');
    lines.push('alias selectmarine3 "cl_selectsinglem 3 -1; alias selectmarine selectmarine4"');
    lines.push('alias selectmarine4 "cl_selectsinglem 4 -1; alias selectmarine selectmarine5"');
    lines.push('alias selectmarine5 "cl_selectsinglem 5 -1; alias selectmarine selectmarine6"');
    lines.push('alias selectmarine6 "cl_selectsinglem 6 -1; alias selectmarine selectmarine7"');
    lines.push('alias selectmarine7 "cl_selectsinglem 7 -1; alias selectmarine selectmarine0"');
    lines.push("cl_timeout 999");
    lines.push('bind "JOY8" "selectmarine"');
    lines.push('bind "START" "selectmarine"');
    lines.push('bind "POV_DOWN" "asw_squad_hotbar 4"');
    lines.push('bind "DOWN" "asw_squad_hotbar 4"');
  }
  Context.WriteTextFile(autoExec, lines);

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

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

      System.Threading.Thread.Sleep(1000);

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

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};