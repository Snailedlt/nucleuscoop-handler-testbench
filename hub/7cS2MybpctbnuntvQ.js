Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Sun May 18 2025 17:41:09 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "7cS2MybpctbnuntvQ";
Hub.Maintainer.Name = "Vlxst";
Hub.Maintainer.Id = "wZTsDsXZnJhD4fwfz";

var answers = ["Default/No!", "Yes!"];
Game.AddOption(
  "Host a local dedicated server?",
  "Operates independently, can be configured manually in the game files.\n(Read V rising Guide on Github).\n----------Server Info----------\nGameMode: PVE\nDifficulty: Normal\nMaxPlayers: 16",
  "select",
  answers
);

Game.ExecutableContext = ["VRising_Data"];
Game.DirSymlinkExclusions = ["VRising_Data\\Plugins\\x86_64", "VRising_Server", "VRising_Server\\VRisingServer_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = [
  "VRisingServer.exe",
  "UnityCrashHandler64.exe",
  "UnityPlayer.dll",
  "GameAssembly.dll",
  "baselib.dll",
  "ServerGameSettings.json",
  "ServerHostSettings.json",
  "UnityCrashHandler64.exe"
];
Game.GameName = "V Rising";
Game.HandlerInterval = 100;
Game.SteamID = "1604030";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "V Rising";
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "VRising.exe";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 16;
Game.UseGoldberg = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "VRising";
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Stunlock Studios\\VRising";
Game.UserProfileConfigPath = "AppData\\LocalLow\\Stunlock Studios\\VRising\\Settings";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  'IMPORTANT: Run your main game,change some graphics settings and put "IP" mode on "PREFERRED CONNECTION MODE" (without this it is not possible to connect), Put on "Window Mode" for the resizing to work in nucleus.\n\nNow to connect, just go to PLAY > ONLINE PLAY > show all servers. If the server list is empty, just press "Refresh"\nYou can also choose between a server hosted by the game (Private Game) or a dedicated server (if you want to configure it, it is done manually).\n\nYou need to add custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add custom resolutions like: 960x1080, 1920x540, 960x540 etc.)\n!!!NOT ALL VERTICAL RESOLUTIONS ARE SUPPORTED, SO CHANGE THE LAYOUT TO HORIZONTAL!!!.\n\nAfter all the instances have launched, resized and positioned correctly, press the "END" key once to lock the input for all instances to have their own cursor.\nYou need to left click each mouse to make the emulated cursors appear after locking the input. Press the "END" key again to unlock the input when you finish playing.\nIf you need to use the Mouse and Keyboard in instances that contain gamepads, simply press ALT+TAB to the instance in question (make sure the input is not blocked - END Key).\nYou can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.\n Ctrl+H to the Nucleus window before locking the input to balance fps.\nMultiple keyboards/mice and gamepads support.';
Game.PauseBetweenStarts = 20;
Game.KillProcessesOnClose = ["cmd", "VRisingServer"];

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
Game.InjectHookXinput = false;

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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
// Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
// Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
// Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
// Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
// Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
// Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  //////////////Patch the UnityPlayer.dll
  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);

  var dllPath2 = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\VRising_Server\\UnityPlayer.dll";
  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
  Context.PatchFileFindPattern(dllPath2, dllPath2, searchPattern, patchPattern, true);

  ///////////// settings the DLCs
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\VRising_Data\\Plugins\\x86_64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\VRising_Data\\Plugins\\x86_64\\steam_settings\\DLC.txt";
  var lines = [
    "2833600=V Rising - Legacy of Castlevania Premium Pack",
    "3604340=V Rising - Eternal Dominance Pack",
    "2169180=V Rising - Haunted Nights Castle Pack",
    "1997210=V Rising - Razer Night Serpent Pack",
    "1983900=V Rising - Dracula's Relics Pack",
    "1983901=V Rising - Founder's Pack: Eldest Bloodline",
    "2358430=V Rising - Sinister Evolution Pack"
  ];
  Context.WriteTextFile(dlc, lines);

  /////////////  edit CLientSettings.json
  var txtPath = Context.NucleusUserRoot + "\\" + Context.UserProfileConfigPath + "\\v4\\ClientSettings.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '      "x": ', Nucleus.SearchType.StartsWith) + '|      "x": ' + Context.Width + ",",
    Context.FindLineNumberInTextFile(txtPath, '      "y": ', Nucleus.SearchType.StartsWith) + '|      "y": ' + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, '    "WindowMode": ', Nucleus.SearchType.StartsWith) + '|    "WindowMode": 3,',
    Context.FindLineNumberInTextFile(txtPath, '    "AnalyticsEnabled": ', Nucleus.SearchType.StartsWith) + '|    "AnalyticsEnabled": false,',
    Context.FindLineNumberInTextFile(txtPath, '    "HasSeenCinematic": ', Nucleus.SearchType.StartsWith) + '|    "HasSeenCinematic": true,',
    Context.FindLineNumberInTextFile(txtPath, '    "HasCompletedFirstStartup": ', Nucleus.SearchType.StartsWith) + '|    "HasCompletedFirstStartupV4": true'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  ///////////// Registry edit
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Fullscreen mode Default_h401710285", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Resolution Window Height_h1684712807", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Resolution Window Width_h2524650974", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Stunlock Studios\\VRising", "Screenmanager Resolution Use Native Default_h1405981789", 0, Nucleus.RegType.DWord);

  /////// IF PLAYING IN VERTICAL
  if (Context.AspectRatioDecimal > 1.8) {
  } else if (Context.AspectRatioDecimal < 1.2) {
    Game.KeepMonitorAspectRatio = true;
    Game.ResetWindows = false;
  } else {
  }

  //////select a option for Dedicated Server
  var res = Context.Options["select"];
  if (res == "Default/No!") {
  }

  if (res == "Yes!") {
    //create .bat file
    var Bat = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\VRising_Server\\Dedicated Server on NucleuCoop.bat");
    var lines = [
      "@echo off",
      "TITLE V Rising Dedicated Server",
      "set SteamAppId=1604030",
      'if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit',
      'echo "Starting V Rising Dedicated Server - PRESS CTRL-C to exit"',
      "@echo on",
      'VRisingServer.exe -listing true -secure false -preset StandardPvE -difficultyPreset Difficulty_Normal -maxUsers 16 -serverName "V Rising Dedicated Server NucleuCoop" -saveName "nucleuscoopWorld"'
    ];
    Context.WriteTextFile(Bat, lines);

    if (System.IO.Directory.Exists((Context.filePath = Context.HandlersFolder + "\\V Rising"))) {
      // var filePath = (Context.filePath = Context.HandlersFolder + "\\V Rising");
      // System.IO.Directory.Delete(filePath, true);
      var filePath = (Context.filePath = Context.HandlersFolder + "\\V Rising");
      System.IO.Directory.CreateDirectory(filePath);
    } else {
      var filePath = (Context.filePath = Context.HandlersFolder + "\\V Rising");
      System.IO.Directory.CreateDirectory(filePath);
    }

    //create .bat of NucleuCheck
    var BatCheck = Context.ScriptFolder + "\\checknucleus.bat";
    var lines = [
      "@echo off",
      'if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit',
      "timeout /t 2 /nobreak",
      "set current=%cd%",
      "",
      ":check",
      "echo NUCLEUSCOOP IS RUNNING.",
      "echo DO NOT CLOSE THIS CMD. IT WILL CLOSE BY IT SELF WHEN NUSCLEUS WILL BE CLOSED.",
      "set pid=",
      "timeout /t 5 /nobreak",
      "set /a varCheck=0",
      ":: Checking if NucleusCoop.exe process is running. This 'for' will return value until the process is running. When Nucleus will be stopped, the variable will be empty and the bat will go further with restoring the registry.",
      'for /F "tokens=2" %%T in (\'tasklist /FI "ImageName eq NucleusCoop.exe" /fo table /nh\') do ( set pid=%%T )',
      "set /a varCheck=%varCheck%+%pid%",
      "if %varCheck% == 0 ( goto restore ) else ( goto check )",
      "",
      ":restore",
      "echo NUCLEUSCOOP IS NOT RUNNING.",
      "",
      "taskkill /IM VRisingServer.exe /F",
      "",
      "exit"
    ];
    Context.WriteTextFile(BatCheck, lines);

    Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\VRising_Server\\Dedicated Server on NucleuCoop.bat"], false, 1, false, false);
    Context.RunAdditionalFiles(["1|" + Game.Folder + "\\checknucleus.bat"], false, 1, true, false);
  }

  //////////////PROTO Things

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.KeyboardButtonFilter = true;
  } else {
    Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.CursorVisibilityHook = false;
    Game.ProtoInput.KeyboardButtonFilter = false;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (!player.IsXInput) {
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        // ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 10000, true, true, false, false, false);
      } else {
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        // ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 10000, true, true, false, false, false);
      }
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (!player.IsXInput) {
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        // ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      } else {
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        // ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      }
    }
  };

  ////////MULTI Proto Gamepads
  var numPlayers = 0;
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
  }
};