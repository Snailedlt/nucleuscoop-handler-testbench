Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Tue Aug 05 2025 06:05:01 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "gqweMeg96Do5ownhR";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Vulkan?", "Use Vulkan graphics mode.", "VULKAN", answers1);
Game.AddOption("Launch all instances under your Steam account?", "Only use if you want to unlock Steam achievements.", "Steam", answers2);

Game.ExecutableContext = ["FireProject_Data"];
Game.DirSymlinkExclusions = ["FireProject_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "dinput8.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["UnityCrashHandler64.exe", "UnityPlayer.dll", "app.info", "boot.config", "globalgamemanagers"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "FireProject.exe";
Game.SteamID = "1062830";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Embr";
Game.GameName = "Embr";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Embr";
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.UseDInputBlocker = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.Description =
  "Complete the tutorial in all instances then create a non visible multiplayer game in one instance and join in the others using the room code or via LAN. If you use keyboards and mice after the instances open press the END key once to lock the input for all instances to have their own working cursor. Press the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. So the instances resize correctly in splitscreen you need to add custom resolutions in your AMD/Nvidia/Intel panel (for example: 960x1080, 960x540 etc.). Reduce graphic settings like textures in your main game to improve performance.";
Game.PauseBetweenProcessGrab = 15;
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
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\FireProject", "resolution_new_h2735577768", "640x480", Nucleus.RegType.Binary);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\FireProject", "resolution_new_h2735577768", Context.Width + "x" + Context.Height, Nucleus.RegType.Binary);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\FireProject", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\FireProject", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\FireProject", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\FireProject", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var Vulkan = Context.Options["VULKAN"];
  var steam = Context.Options["Steam"];
  var id = Context.PlayerID + 5;

  if (Vulkan == "Yes") {
    Context.StartArguments = " -screen-fullscreen 0 -popupwindow -force-vulkan GamePort=505" + id + " -screen-width " + Context.Width + " -screen-height " + Context.Height;
  } else {
    Context.StartArguments = " -screen-fullscreen 0 -popupwindow -force-d3d11 GamePort=505" + id + " -screen-width " + Context.Width + " -screen-height " + Context.Height;
  }

  if (steam == "Yes") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "FireProject_Data\\Plugins\\x86_64\\steam_api64.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FireProject_Data\\Plugins\\x86_64\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.PlayerID == 0) {
    } else {
      var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FireProject_Data\\globalgamemanagers";
      var base = Context.Nickname;
      var og_Path = "FireProject";
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

      var appInfoPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\FireProject_Data\\app.info";
      Context.PatchFile(appInfoPath, appInfoPath, og_Path, newPath);

      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\" + newPath, "resolution_new_h2735577768", "640x480", Nucleus.RegType.Binary);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Muse Games\\" + newPath, "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
    }
  }

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.KeyboardButtonFilter = true;
  } else {
    Game.ProtoInput.KeyboardButtonFilter = false;
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

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
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

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };

  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
    player.ProtoController2 = Context.GamepadId;
    player.ProtoController3 = Context.GamepadId;
    player.ProtoController4 = Context.GamepadId;
    player.ProtoController5 = Context.GamepadId;
  }
};