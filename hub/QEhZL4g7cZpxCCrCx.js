Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Jan 19 2026 04:18:02 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "QEhZL4g7cZpxCCrCx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["BloonsTD6_Data"];
Game.DirSymlinkExclusions = ["BloonsTD6_Data\\Plugins\\x86_64", "D3D12"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "local_save.txt"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "D3D12Core.dll", "baselib.dll", "GameAssembly.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers"];
Game.GameName = "Bloons TD 6";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "BloonsTD6.exe";
Game.SteamID = "960090";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Bloons TD 6";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "BloonsTD6";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\960090\\local";
//Game.UserProfileConfigPath = "AppData\\LocalLow\\Ninja Kiwi";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: Steam version only. Multiple keyboards/mice only as the game lacks native gamepad support. Press the END key once when the instances finish setting up to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. Co-op unlocks after level 20, host a co-op game in one instance and join via the room code in the other. The first instance will use your Steam account, log-in in the game settings to your Steam account in the first instance only, the other instance will use the default player profile, this is needed to connect the instances in latest version of the game, max 2 players. You can access the second player save file via Nucleus UI, click game options-open user profile save path, the first instance will use your regular Steam save.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 2;
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
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow" + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\BloonsTD6", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\BloonsTD6", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\BloonsTD6", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\BloonsTD6", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\BloonsTD6", "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\BloonsTD6", "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);

  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BloonsTD6_Data\\Plugins\\x86_64";

  if (Context.PlayerID == 0) {
  } else {
    Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", SW + "\\steam_settings");

    var savePath = (Context.SavePath = SW + "\\steam_api64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = SW + "\\steam_settings\\configs.user.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
      new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
      new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
    ]);

    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BloonsTD6_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "BloonsTD6";
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

    var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BloonsTD6_Data\\app.info";
    Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\" + newPath, "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Ninja Kiwi\\" + newPath, "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);
  }
};