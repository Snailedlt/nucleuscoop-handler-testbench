Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Wed Jun 19 2024 17:48:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "WfAMG7akRb5Gdydms";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Default", "60", "70", "75", "90", "100"];
var answers2 = ["Default", "int", "esp", "fra", "deu", "ita", "pol", "rus"];
var answers3 = ["No", "Yes"];
Game.AddOption("Change default FOV?", "Choose the new field of view.", "FOV", answers1);
Game.AddOption("Number of Terrorist:", "Write here if you want a custom number of Terrorist for Terrorist Hunt, example: 99.", "Terro", []);
Game.AddOption("Change language?", "Select your preferred language.", "Lang", answers2);
Game.AddOption("Infinite gunfire sound loop fix?", "Only use if you get this bug frequently, turn off voice recognition in-game.", "Soundfix", answers3);

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = [
  "RainbowSixVegas2IsRunning"
  //"steam_singleton_mutext_00000000_000015a0"
];
Game.DirSymlinkExclusions = ["Binaries", "KellerGame\\Config", "KellerGame\\Startup", "KellerGame\\CookedPC\\Packages\\Camera"];
Game.FileSymlinkExclusions = [
  "R6Vegas2_Game.exe",
  "d3d9.dll",
  "dgVoodoo.conf",
  "d3d9hook.cpp",
  "d3d9hook.def",
  "d3d9hook.h",
  "d3d9hook.sln",
  "d3d9hook.vcxproj",
  "IDirect3D9.h",
  "IDirect3DDevice9.h",
  "IUnknown.h",
  "LogWindowMessagesImpl.h",
  "overrides.h",
  "TeknoR6Vegas2.exe",
  "DW_MM_Splash_a.bik",
  "Ubilogo.bik",
  "CameraConfig.uppc",
  "TakeCoverCameraConfig.uppc"
];
Game.FileSymlinkCopyInstead = ["PCKellerEngine.ini", "PCKellerJoysticks.ini", "PCKellerInput.ini", "eax.dll"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "R6Vegas2_Game.exe";
Game.SteamID = "15120";
Game.GUID = "Rainbow Six Vegas 2";
Game.GameName = "Tom Clancy's Rainbow Six Vegas 2";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
Game.LauncherExe = "Binaries\\TeknoR6Vegas2.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.BinariesFolder = "Binaries";
Game.HideTaskbar = false;
Game.NotTopMost = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Tom Clancy's Rainbow Six Vegas 2";
Game.WindowStyleEndChanges = ["~0xC00000", "0x8000000"];
Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\My Games\\Ubisoft";
Game.Description =
  "IMPORTANT: On first launch using the keyboard go to extras, options and set the xbox controller for windows option to ON for gamepad instances, alt-tab to an instance to use the kb, move the mouse cursor to the corner if it interferes with gamepad control in the menus. Connect the instances via LAN. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Start and join a LAN game using the respective keyboards, mouse will work ok once in-game. You can access each instance save in the app, after the first launch click game options/open user profile save path in the UI.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 1;
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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\D3D9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "D3D9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\dgVoodoo.conf");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dgVoodoo.conf");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\dgVoodoo.conf";
  var dict = ["178|Resolution                          = h:" + Context.Width + ", v:" + Context.Height + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\R6Vegas2_Game.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\TeknoR6Vegas2.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "TeknoR6Vegas2.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\Config\\PCKellerJoysticks.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "PCKellerJoysticks.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\Config\\PCKellerInput.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "PCKellerInput.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\Startup\\DW_MM_Splash_a.bik");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DW_MM_Splash_a.bik");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\Startup\\Ubilogo.bik");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Ubilogo.bik");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\TakeCoverCameraConfig.uppc");
  var savePkgOrigin = System.IO.Path.Combine(Context.OrigRootFolder, "KellerGame\\CookedPC\\Packages\\Camera\\TakeCoverCameraConfig.uppc");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var save = 52 + Context.PlayerID;

  if (Context.PlayerID == 0) {
  } else {
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Binaries\\R6Vegas2_Game.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Binaries\\R6Vegas2_Game.exe"),
      "52 36 56 65 67 61 73 32 00",
      save + "36 56 65 67 61 73 32 00",
      true
    );
  }

  if (Context.NumControllers < 5) {
    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
    Game.XInputPlusDll = ["xinput1_3.dll"];
  } else {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
  }

  var fov = Context.Options["FOV"];
  var terro = 0 + Context.Options["Terro"];
  var lang = Context.Options["Lang"];
  var soundfix = Context.Options["Soundfix"];

  Context.StartArguments = " 1 " + terro + " 0 ";

  if (Context.AspectRatioDecimal > 1.8) {
    Context.StartArguments = " 1 " + terro + " 1 ";
  }

  if (fov == "Default") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    var savePkgOrigin = System.IO.Path.Combine(Context.OrigRootFolder, "KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (fov == "60") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "60\\CameraConfig.uppc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (fov == "70") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "70\\CameraConfig.uppc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (fov == "75") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "75\\CameraConfig.uppc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (fov == "90") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "90\\CameraConfig.uppc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (fov == "100") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\CookedPC\\Packages\\Camera\\CameraConfig.uppc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "100\\CameraConfig.uppc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (soundfix == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\eax.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "eax.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (lang == "Default") {
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\KellerGame\\Config\\PCKellerEngine.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Engine.Engine", "Language", lang)]);
  }

  Game.OnFinishedSetup = function() {
    Context.KillProcessesMatchingWindowName("TeknoR6Vegas2");
  };

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

      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
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

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5000, true, true, false, false, false);
    }
  };
};