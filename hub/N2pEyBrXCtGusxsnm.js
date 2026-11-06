Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun Feb 16 2025 05:29:51 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "N2pEyBrXCtGusxsnm";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["SlimeRancher_Data"];
Game.DirSymlinkExclusions = ["SlimeRancher_Data\\Plugins\\x86_64", "Mods"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "UnityCrashHandler64.exe",
  "UnityPlayer.dll",
  "globalgamemanagers",
  "SRMP.dll",
  "0Harmony.dll",
  "Newtonsoft.Json.dll",
  "System.Runtime.Serialization.dll",
  "UnityCoreMod.dll",
  "UnityEngine.CoreModule.dll"
];
Game.GameName = "Slime Rancher";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "SlimeRancher.exe";
Game.SteamID = "433340";
Game.GUID = "Slime Rancher";
Game.CreateSteamAppIdByExe = true;
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseGoldberg = false;
Game.LauncherTitle = "conhost";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Slime Rancher";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Monomi Park";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Requires the latest standalone version of the Slime Rancher Multiplayer mod by Saty (SRMP) to be installed in your game files: https://satypardus.itch.io/slime-rancher-multiplayer-mod. Set your main game to windowed and in the correct custom resolution in the game options before running this for the instances to resize correctly. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add custom resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see them and you can select them in the game options. You can also change the res in the game then use CTRL+R to reposition the instances. Start a game in one instance and host a game using the SRMP mod menu that appears when you press start/escape, in the main menu join to the host using the server code or the games in the same network option, alt-tab between instances to use the keyboard and mouse to connect, pause in all instances to use the cursor correctly otherwise it gets stuck, if you get a dlc mismatch error when joining just click on manage dlc in the main menu then try to join again. If you use a keyboard/m instance disable the gamepad input for that instance in the game options once you are in-game, make sure it is enabled for the gamepads instances. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 15;
Game.PauseBetweenStarts = 35;

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
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
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
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseOpenXinput = false;
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
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Monomi Park\\Slime Rancher", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Monomi Park\\Slime Rancher", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Monomi Park\\Slime Rancher", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Monomi Park\\Slime Rancher", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  if (Context.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SlimeRancher_Data\\globalgamemanagers";
  var base = Context.Nickname;
  var og_Path = "Slime Rancher";
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

  if (!System.IO.File.Exists(Context.NucleusUserRoot + "\\AppData\\LocalLow\\Monomi Park\\" + newPath + "\\slimerancher.cfg")) {
    var filePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Monomi Park\\" + newPath;
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Monomi Park\\" + newPath + "\\slimerancher.cfg";
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\LocalLow\\Monomi Park\\Slime Rancher\\slimerancher.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.KeyboardButtonFilter = true;
    Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
  } else {
    Game.ProtoInput.KeyboardButtonFilter = false;
    Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      if (player.IsXInput) {
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
        //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

        System.Threading.Thread.Sleep(1000);

        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
      } else {
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
        //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.DontShowCursorWhenImageUpdatedID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

        System.Threading.Thread.Sleep(1000);

        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
      }
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
      //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.DontShowCursorWhenImageUpdatedID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5000, true, true, false, false, false);
    }
  };
};