Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Mon Jun 01 2026 06:08:40 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "qLgTZnC8d64zCTPH6";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Enable VR for 1st player?", "The first player is the one who first got assigned a keyboard, mouse or gamepad in the layout.", "VR enabled", answers1);

Game.ExecutableContext = ["Escape Simulator_Data"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\controller", "Escape Simulator_Data\\Plugins\\x86_64", "Controller"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["D3D12Core.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers", "manifest.vdf"];
Game.GameName = "Escape Simulator";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Escape Simulator.exe";
Game.SteamID = "1435790";
Game.GUID = "Escape Simulator";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Escape Simulator";
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
Game.UserProfileSavePath = "AppData\\LocalLow\\Pine Studio";
Game.Description =
  "IMPORTANT: Host a game in one instance and invite the others using the invite code, alt-tab between the instances to use the keyboard. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. In-game press the escape key if the cursor is visible for mkb instances. If you use gamepads press A in the main menus to control them. Known issues: Gamepad UI prompts do not show in the game.";
Game.PauseBetweenContextAndLaunch = 2;
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
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
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
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

var configureSettingsFile = function(settingsFile, width, height) {
  var settings = {};
  if (System.IO.File.Exists(settingsFile)) {
    var settingsJson = System.IO.File.ReadAllText(settingsFile);
    var settings = JSON.parse(settingsJson);
  }

  settings.fullScreenMode = 3;
  settings.screenResolutionWidth = width;
  settings.screenResolutionHeight = height;
  //settings.screenRefreshRate = 60; //Since it's in windowed mode, the actual refresh rate will be whatever the monitor is set to. The only downside to not setting this is that the settings UI will probably display the wrong resolution.

  System.IO.File.WriteAllText(settingsFile, JSON.stringify(settings, null, 4));
};

Game.Play = function() {
  var vrEnabled = Context.Options["VR enabled"].toLowerCase() == "yes";
  Context.StartArguments = "";
  if (Context.PlayerID == 0 && vrEnabled) {
    Context.StartArguments += " es_vr";
  }

  Context.StartArguments += " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\Escape Simulator", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\Escape Simulator", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\Escape Simulator", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\Escape Simulator", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\Escape Simulator", "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\Escape Simulator", "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);

  if (Context.PlayerID == 0) {
    var settingsDir = System.IO.Path.Combine(Context.EnvironmentRoot, "..\\AppData\\LocalLow\\Pine Studio\\Escape Simulator");
    System.IO.Directory.CreateDirectory(settingsDir); // In case game has never been started normally before starting in Nucleus.
    var settingsFile = System.IO.Path.Combine(settingsDir, "EscapeSimulatorSettings-v2.bin");
    configureSettingsFile(settingsFile, Context.Width, Context.Height);
  } else {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Escape Simulator";
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

    var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\app.info";
    Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

    var settingsDir = System.IO.Path.Combine(Context.EnvironmentRoot, "..\\AppData\\LocalLow\\Pine Studio", newPath);
    System.IO.Directory.CreateDirectory(settingsDir);
    var settingsFile = System.IO.Path.Combine(settingsDir, "EscapeSimulatorSettings-v2.bin");
    configureSettingsFile(settingsFile, Context.Width, Context.Height);

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\" + newPath, "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\" + newPath, "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Pine Studio\\" + newPath, "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\controller\\glyphs");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings");

  Context.CopyFolder(
    Context.NucleusFolder + "\\utils\\GoldbergEmu\\steam_settings.EXAMPLE\\controller.EXAMPLE\\glyphs",
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\controller\\glyphs"
  );

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.KeyboardButtonFilter = true;
  } else {
    Game.ProtoInput.KeyboardButtonFilter = false;

    var exam = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\controller\\ModeExamine.txt";
    var lines = [
      "ExamineCancel=BACK,B",
      "ExamineItemPrevious=LBUMPER",
      "ExamineItemNext=RBUMPER",
      "ExamineInteract=A,DRTRIGGER",
      "ExamineSelected=X",
      "ExamineRotateItem=LJOY=joystick_move",
      "ExamineZoom=RSTICK",
      "ExamineVirtualCursor=RJOY=joystick_move",
      "ExaminePinRight=DRIGHT",
      "ExaminePinLeft=DLEFT"
    ];
    Context.WriteTextFile(exam, lines);

    var ingame = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\controller\\ModeInGame.txt";
    var lines = [
      "InGameOpenMenu=START",
      "InGameCancel=BACK,B",
      "InGameItemPrevious=LBUMPER",
      "InGameItemNext=RBUMPER",
      "InGameInteract=A",
      "InGameExamine=X",
      "InGameCrouch=Y",
      "InGameThrow=DLTRIGGER",
      "InGameInteractHold=DRTRIGGER",
      "InGameRun=LSTICK",
      "InGameMove=LJOY=joystick_move",
      "InGameZoomIn=RSTICK",
      "InGameLook=RJOY=joystick_move",
      "InGamePing=DUP,DDOWN",
      "InGamePinRight=DRIGHT",
      "InGamePinLeft=DLEFT"
    ];
    Context.WriteTextFile(ingame, lines);

    var menu = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Escape Simulator_Data\\Plugins\\x86_64\\steam_settings\\controller\\ModeMenu.txt";
    var lines = [
      "MenuCancel=BACK,B",
      "MenuSelect=A",
      "MenuExtra=X",
      "MenuConfigure=Y",
      "MenuRateWorkshopUp=DLTRIGGER",
      "MenuRateWorkshopDown=DRTRIGGER",
      "MenuNavigation=DPAD,LJOY=joystick_move",
      "MenuChangeValue=RJOY=joystick_move"
    ];
    Context.WriteTextFile(menu, lines);
  }

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

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
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

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };
};