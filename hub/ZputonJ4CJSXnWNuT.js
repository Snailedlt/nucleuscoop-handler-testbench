Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sat Aug 02 2025 21:16:02 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ZputonJ4CJSXnWNuT";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["vietnam"];
Game.KillMutex = ["hl2_singleton_mutex"];
//Game.DirSymlinkExclusions = ["bin\\win64", "vietnam\\cfg", "bin\\win64\\steam_settings"];
Game.DirSymlinkCopyInstead = ["bin\\win64\\steam_settings"];
Game.FileSymlinkExclusions = ["autoexec.cfg", "steam_appid.txt", "steam_api64.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
//Game.SymlinkFolders = true;
Game.ExecutableName = "mcv_x64.exe";
Game.SteamID = "1012110";
Game.GUID = "Military Conflict Vietnam";
Game.GameName = "Military Conflict Vietnam";
Game.UseGoldberg = true;
Game.HideTaskbar = true;
Game.LauncherTitle = "";
Game.SetWindowHookStart = true;
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 24;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Military Conflict Vietnam";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.UserProfileSavePath = "AppData\\Roaming\\GSE Saves\\1012110";
Game.Description =
  "Wait until all instances have resized and repositioned before pressing END to lock input and grant all players control. Start a singleplayer game with one instance and join with the rest. Press the ~ key to open the console and press CTRL+V and then ENTER to connect if you cannot see the server in the browser.\n\nPress END again to unlock input. You can press CTRL+Q while input is unlocked to close Nucleus and all of its instances.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 15;
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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
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
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));
  Context.Wait(1500);

  var Bat = Game.Folder + "\\lanclip.bat";
  var lines = ["echo connect " + Context.User.GetLocalIP() + "| clip"];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["1|" + Game.Folder + "\\lanclip.bat"], false, 0);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\win64\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  if (Context.IsKeyboardPlayer) {
    var raw = "1";
  } else {
    var raw = "0";
  }

  var Args = (Context.Args = "-windowed -heartbeat -sv_lan 1 -AlwaysFocus -insecure -novid +m_rawinput " + raw + " -w " + Context.Width + " -h " + Context.Height);
  Context.StartArguments = Args;

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\vietnam\\cfg\\autoexec.cfg";
  var lines = [
    "engine_no_focus_sleep 0", // game will not limit fps when is not focused (must used)
    "fps_max 60" // FPS limiter
  ];

  if (Context.PlayerID > 0) {
    var mv = "0";
    var mm = "0";
    var lm = "0";
  } else {
    var mv = "1.0";
    var mm = "0.3";
    var lm = "0.5";
  }

  var cDir0 = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\local\\cfg");
  var cDir1 = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\remote\\cfg");
  System.IO.Directory.CreateDirectory(cDir0);
  System.IO.Directory.CreateDirectory(cDir1);

  var cPath0 = Context.EnvironmentPlayer + "\\" + Context.UserProfileSavePath + "\\local\\cfg\\config.cfg";
  var cPath1 = Context.EnvironmentPlayer + "\\" + Context.UserProfileSavePath + "\\remote\\cfg\\config.cfg";
  var cPkgOrigin = Context.ScriptFolder + "\\config.cfg";

  if (!System.IO.File.Exists(cPath0)) {
    System.IO.File.Copy(cPkgOrigin, cPath0, true);
    System.IO.File.Copy(cPkgOrigin, cPath1, true);
  }

  var dict = [
    Context.FindLineNumberInTextFile(cPath0, "snd_musicvolume", Nucleus.SearchType.StartsWith) + '|snd_musicvolume "' + mv + '"',
    Context.FindLineNumberInTextFile(cPath0, "snd_menumusic_volume", Nucleus.SearchType.StartsWith) + '|snd_menumusic_volume "' + mm + '"',
    Context.FindLineNumberInTextFile(cPath0, "snd_loadingscreen_music_volume", Nucleus.SearchType.StartsWith) + '|snd_loadingscreen_music_volume "' + lm + '"',
    Context.FindLineNumberInTextFile(cPath0, "con_enable", Nucleus.SearchType.StartsWith) + '|con_enable "1"'
  ];
  Context.ReplaceLinesInTextFile(cPath0, dict);

  var dict = [
    Context.FindLineNumberInTextFile(cPath1, "snd_musicvolume", Nucleus.SearchType.StartsWith) + '|snd_musicvolume "' + mv + '"',
    Context.FindLineNumberInTextFile(cPath1, "snd_menumusic_volume", Nucleus.SearchType.StartsWith) + '|snd_menumusic_volume "' + mm + '"',
    Context.FindLineNumberInTextFile(cPath1, "snd_loadingscreen_music_volume", Nucleus.SearchType.StartsWith) + '|snd_loadingscreen_music_volume "' + lm + '"',
    Context.FindLineNumberInTextFile(cPath1, "con_enable", Nucleus.SearchType.StartsWith) + '|con_enable "1"'
  ];
  Context.ReplaceLinesInTextFile(cPath1, dict);

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
    }
  };
};