Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Aug 09 2024 13:33:56 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "TTDRmLBoaLH2Gn5Tq";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Launch the first instance with Steam Overlay?", "Experimental, allows you to see when you unlock Steam achievements.", "Overlay", answers1);
Game.AddOption(
  "Launch all instances with Goldberg emu?",
  "All instances will launch with Goldberg Steam emulator applied, works without Steam and unlocks all the DLC, do not select yes in the Steam overlay option if you use this. If you select No (default) all instances will launch under your Steam account.",
  "Goldberg",
  answers2
);

Game.ExecutableContext = ["Otherworld Legends_Data"];
Game.DirSymlinkExclusions = ["Otherworld Legends_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["baselib.dll", "GameAssembly.dll", "UnityCrashHandler64.exe", "UnityPlayer.dll", "globalgamemanagers"];
Game.GameName = "Otherworld Legends";
Game.ExecutableName = "Otherworld Legends.exe";
Game.GUID = "Otherworld Legends";
Game.SteamID = "1761380";
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Otherworld Legends";
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "XInput1_4.dll"];
Game.BlockRawInput = false;
Game.UserProfileConfigPath = "AppData\\LocalLow\\Chilly Room";
Game.Description =
  "IMPORTANT: To unlock multiplayer get past the tutorial level or die and exit it. To connect the instances host a game in the room with the Owl then the other instances can join there too. Alt-tab to an instance to write the name of a room, alt-tab to the kb/m instance to control it too. Press CTRL+T twice in-game if you get stretching in vertical split-screen. If you get an error message about a directory not being found right away after launching this handler, try copying your Otherworld Legends game folder from the default Steam installation path to a shorter install path like in the root of your drive for example, then add that one to Nucleus for the handler to work.";
Game.PauseBetweenProcessGrab = 10;
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

Game.SupportsMultipleKeyboardsAndMice = false;
Game.SupportsKeyboard = true;

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
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

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
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\Otherworld Legends", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\Otherworld Legends", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\Otherworld Legends", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\Otherworld Legends", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  if (Context.IsKeyboardPlayer) {
    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.MessageFilterHook = false;
  } else {
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 20000;
    Game.SetForegroundWindowElsewhere = false;
  } else {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 8000;
    Game.SetForegroundWindowElsewhere = true;
  }

  if (Context.AspectRatioDecimal < 1.2) {
    Game.ProtoInput.SetWindowPosHook = true;
    Game.ProtoInput.SetWindowStyleHook = true;
    Context.HideTaskBar();
  }

  var overlay = Context.Options["Overlay"];
  var goldberg = Context.Options["Goldberg"];

  if (overlay == "Yes") {
    if (Context.PlayerID == 0) {
      Game.InjectHookXinput = true;
      Game.SupportsMultipleKeyboardsAndMice = true;
      Game.RefreshWindowAfterStart = true;

      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_appid.txt");
    } else {
      Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

      Game.InjectHookXinput = false;
      Game.SupportsMultipleKeyboardsAndMice = false;
      Game.RefreshWindowAfterStart = false;
    }
  }

  if (overlay == "No") {
    Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;
  }

  if (goldberg == "Yes") {
    var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Otherworld Legends_Data\\globalgamemanagers";
    var base = Context.Nickname;
    var og_Path = "Otherworld Legends";
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

    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
  }

  if (goldberg == "No") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "Otherworld Legends_Data\\Plugins\\x86_64\\steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Otherworld Legends_Data\\Plugins\\x86_64\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "Otherworld Legends_Data\\Plugins\\x86_64\\steam_api64.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Otherworld Legends_Data\\Plugins\\x86_64\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.PlayerID == 0) {
    } else {
      var fillPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Otherworld Legends_Data\\globalgamemanagers";
      var base = Context.Nickname;
      var og_Path = "Otherworld Legends";
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

      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
      Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\Chilly Room\\" + newPath, "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
    }
  }
};