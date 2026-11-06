Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Sun Aug 04 2024 19:52:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "sjNhTXRSNaHDubaMk";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.KillMutex = ["Age of Empires II: HD Edition"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "Yucatan.rms"];
Game.FileSymlinkCopyInstead = ["Launcher.exe", "key-value-strings-utf8.txt", "zlibwapi.dll"];
Game.DirSymlinkCopyInstead = [
  "resources\\_common\\terrain",
  "resources\\_common\\dat",
  "resources\\_common\\slp",
  "resources\\_common\\drs\\gamedata_x1",
  "resources\\_common\\drs\\interface",
  "resources\\_common\\drs\\sounds"
];
//Game.DirExclusions = ["resources\\_common\\drs\\gamedata_x2", "resources\\_common\\drs\\graphics"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.KeepSymLinkOnExit = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "AoK HD.exe";
Game.SteamID = "221380";
Game.GUID = "Age of Empires II HD";
Game.GameName = "Age of Empires II HD";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 8;
Game.MaxPlayers = 8;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SetWindowHookStart = true;
Game.HideTaskbar = true;
Game.WindowStyleValues = ["~0x400000"];
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Age of Empires II: HD Edition";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.StartArguments = "SKIPINTRO";
Game.Description =
  "This handler requires 1.08 GB of space for each instance. On first launch, or when launching after deleting the Nucleus content folder, it will take some time to copy the required files. \n\nWait until setup is complete then press END to lock input and allow each player to use their own cursor. Host with one player and join with the rest. When you first enter a server, you will experience some lag in unit reaction time, this should pass after a short time. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 15;

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
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.SetWindowStyleHook = true;
//Game.ProtoInput.SetWindowPosHook = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = true; //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
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

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Microsoft\\Microsoft Games\\Age of Empires II HD", "Mod Verify Autoclose", 1, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Microsoft\\Microsoft Games\\Age of Empires II HD", "Mode Display", 2, Nucleus.RegType.DWord);

  if (Context.PlayerID > 0) {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Microsoft\\Microsoft Games\\Age of Empires II HD", "Audio Volume Music", 0, Nucleus.RegType.DWord);
  } else {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Microsoft\\Microsoft Games\\Age of Empires II HD", "Audio Volume Music", 100, Nucleus.RegType.DWord);
  }

  var batPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Copy.bat";
  var batLines = [
    "@echo off",
    "title AOE II HD COPIER",
    ":remove",
    'del "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\resources\\_common\\drs\\gamedata_x2" /f /q /s',
    'del "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\resources\\_common\\drs\\graphics" /f /q /s',
    'xcopy "' +
      (Context.RootInstallFolder + "\\resources\\_common\\drs\\gamedata_x2") +
      '" "' +
      Context.GetFolder(Nucleus.Folder.InstancedGameFolder) +
      '\\resources\\_common\\drs\\gamedata_x2\\" /S /Y',
    'xcopy "' + (Context.RootInstallFolder + "\\resources\\_common\\drs\\graphics") + '" "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\resources\\_common\\drs\\graphics\\" /S /Y'
  ];
  Context.WriteTextFile(batPath, batLines);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\resources\\_common\\drs\\gamedata_x2\\Yucatan.rms")) {
    Game.PauseBetweenContextAndLaunch = 40;
    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Copy.bat"], false, 0);
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