Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu May 08 2025 00:33:49 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "FdB2tyNMHfACEevgi";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Dollhouse_Data"];
Game.DirSymlinkExclusions = ["Dollhouse_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["UnityPlayer.dll", "globalgamemanagers"];
Game.GameName = "Dollhouse";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Dollhouse.exe";
Game.SteamID = "280850";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Dollhouse";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseGoldberg = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dollhouse";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Creazn Studio";
Game.Description =
  "Host a multiplayer game in one instance and join in the others using quick match. Do not select options in menu or you will lose your custom resolution and the windows will resize, use CTRL+R to reset the windows if that happens. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;

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
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
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
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 8000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow" + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\Dollhouse", "DisplayMode_h1925482108", 2, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\Dollhouse", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\Dollhouse", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\Dollhouse", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.DrawFakeCursor = true;
  } else {
    Game.ProtoInput.DrawFakeCursor = false;
  }

  if (Context.PlayerID == 0) {
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dollhouse_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Dollhouse";
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

    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\" + newPath, "DisplayMode_h1925482108", 2, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\" + newPath, "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Creazn Studio\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  }
};