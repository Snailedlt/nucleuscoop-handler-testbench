Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Wed Dec 11 2024 11:48:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Kt7CMthoKbpbvRBQn";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Aragami_Data"];
Game.DirSymlinkExclusions = ["Aragami_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["UnityPlayer.dll", "boot.config", "globalgamemanagers"];
Game.GameName = "Aragami";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Aragami.exe";
Game.SteamID = "280160";
Game.GUID = "Aragami";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseGoldberg = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Aragami";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Lince Works";
Game.Description =
  "IMPORTANT: Disable this game Steam cloud option by right clicking this game in your Steam library then selecting properties, also make sure you do not have a folder with no name in your original game files or this handler won't work. If you do have it uninstall the game after disabling the Steam cloud option and delete any remaining files, install it again after that and run the game at least once before running it via Nucleus. Host a public multiplayer game in the same server in one instance so the other one can join. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 30;

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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  var txtPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Lince Works\\Aragami\\settings.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '      "resolution_x" :', Nucleus.SearchType.StartsWith) + '|      "resolution_x" : "' + Context.Width + '", ',
    Context.FindLineNumberInTextFile(txtPath, '      "resolution_y" :', Nucleus.SearchType.StartsWith) + '|      "resolution_y" : "' + Context.Height + '", ',
    Context.FindLineNumberInTextFile(txtPath, '      "full_screen" :', Nucleus.SearchType.StartsWith) + '|      "full_screen" : "false",'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Lince Works\\Aragami", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Lince Works\\Aragami", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Lince Works\\Aragami", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  if (Context.PlayerID == 0) {
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Aragami_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Aragami";
    //Create newPath by rearranging characters from base
    var newPath = og_Path.substring(0, og_Path.length - 3) + base.charAt(0) + base.charAt(base.length - 1) + base.length;

    //Ensure newPath is at least as long as og_Path
    if (newPath.length < og_Path.length) {
      while (newPath.length < og_Path.length) {
        newPath += base.charAt(base.length - 1);
      }
    } else if (og_Path.length < newPath.length) {
      //Ensure og_Path is at least 3 characters long
      newPath = newPath.substring(0, og_Path.length);
    }
    Context.PatchFile(fillPath, fillPath, og_Path, newPath);

    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Lince Works\\" + newPath, "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Lince Works\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Lince Works\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

    if (!System.IO.File.Exists(Context.NucleusUserRoot + "\\AppData\\LocalLow\\Lince Works\\" + newPath + "\\settings.cfg")) {
      var filePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Lince Works\\" + newPath;
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Lince Works\\" + newPath + "\\settings.cfg";
      var savePkgOrigin = System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\LocalLow\\Lince Works\\Aragami\\settings.cfg");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var txtPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Lince Works\\" + newPath + "\\settings.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, '      "resolution_x" :', Nucleus.SearchType.StartsWith) + '|      "resolution_x" : "' + Context.Width + '", ',
      Context.FindLineNumberInTextFile(txtPath, '      "resolution_y" :', Nucleus.SearchType.StartsWith) + '|      "resolution_y" : "' + Context.Height + '", ',
      Context.FindLineNumberInTextFile(txtPath, '      "full_screen" :', Nucleus.SearchType.StartsWith) + '|      "full_screen" : "false",'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
};