Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Feb 23 2025 21:11:07 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yFfHvXDXmvvZLi4Kc";
Hub.Maintainer.Name = "supersmo";
Hub.Maintainer.Id = "sir9QJagivmXj7AS2";

Game.GameName = "Last Train Outta' Wormtown";
Game.HandlerInterval = 100;
Game.ExecutableName = "Last Train Out Of WormTown.exe";
Game.SteamID = "2318480";
Game.GUID = "Last Train Outta' Wormtown";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.UseGoldberg = true;

Game.ExecutableContext = ["Last Train Out Of WormTown_Data"];
Game.DirSymlinkExclusions = ["Last Train Out Of WormTown_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "local_save.txt", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["UnityPlayer.dll", "boot.config", "globalgamemanagers"];
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.Description =
  "Alt tab and use your mouse cursor to navigate the UI in all gamepad instances. Host a private game in one instance and join with the others using the Lobby Browser.\n\nIt is recommended to put the worm(s) on another monitor to avoid screen cheating.\n\nIf you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.\n\nIf you are a keyboard player and the cursor is visible during gameplay, press ESC twice.\nIf you are a gamepad player and you open up the Objectives Manual with D-Pad, the manual will need to be closed by using a mouse.";

Game.PauseBetweenStarts = 30;

// This can be true or false, whether or not you want to allow raw keyboards/mice to be selected in the Nucleus GUI. Doesn't actually affect the hooks being injected or not.
Game.SupportsMultipleKeyboardsAndMice = true;

// Deprecated options
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

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

// This hook should always be on, regardless of input lock
Game.ProtoInput.RegisterRawInputHook = true;

// This can always be enabled, since we are going to allow/disallow raw input with the bypass function
Game.ProtoInput.GetRawInputDataHook = true;

// We will be installing/uninstalling the filters manually so there's no need to
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;

// These aren't problematic to leave on, since the external "freeze fake input input" when real input ISN'T locked will prevent these from interfering
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

// Handled on input lock/unlock, don't enable this by default
Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.DrawFakeCursor = false; // This is set in the input locking
Game.ProtoInput.CursorVisibilityHook = false; //This is set in the input locking
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
//Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;

Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3]; // Blocks WM_KILLFOCUS and WM_MOUSELEAVE

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

// We can leave these on and not worry about input lock.
// It doesn't matter if controller input still works since it won't get in the way
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;

// The old Nucleus options. Don't use these with the Xinput hook
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;

Game.ProtoInput.AutoHideTaskbar = true;

Game.Play = function() {
  Context.StartArguments = "-screen-fullscreen 0 -popupwindow -screen-width " + Context.Width + " -screen-height " + Context.Height;

  if (Context.PlayerID == 0) {
    //Use the default paths for Player 1.
  } else {
    //Give each player their own area to store save files and windows registry. Copied from ... handler.
    //Patch the globalgamemanagers file for each player so each player gets unique AppData\LocalLow files and place in the Windows registry
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Last Train Out Of WormTown_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Last Train Out Of WormTown";
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
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsKeyboardPlayer) {
        //Only do this for keyboard players otherwise there are issues with cursor visibility for gamepad players after unlocking input.

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);

        // Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
        //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, false, false, true, true);
        System.Threading.Thread.Sleep(1000);
        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
      }
      // Disable the bypass: Don't allow any raw input to pass. Doing this for all players otherwise with mixed keyboard and gamepad players you need to be careful to focus a keyboard player before locking inputs.
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsKeyboardPlayer) {
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

        // Intentionally disable focus so all the instances don't respond to input at the same time
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

        // Intentionally disable focus so all the instances don't respond to input at the same time
        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle); //For this handler it's already stopped though
      }
      // Enable the bypass: allow any raw input to pass
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};