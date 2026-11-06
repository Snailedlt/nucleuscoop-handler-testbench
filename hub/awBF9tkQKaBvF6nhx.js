Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Feb 25 2024 00:28:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "awBF9tkQKaBvF6nhx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Non inverted right stick?", "Disables the default inverted right stick axes for controllers.", "Uninvert", answers1);
Game.AddOption(
  "Use alternative controller restriction method?",
  "The xinput indexes option In Nucleus Co-op settings players tab has to be disabled for this to work. Does not work with Xbox one/series gamepads and window focus.",
  "Dinput",
  answers2
);

Game.ExecutableContext = ["binkw32.dll"];
Game.DirSymlinkExclusions = [
  //"Save",
];
Game.DirSymlinkCopyInstead = [
  //"Save",
];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.FileSymlinkCopyInstead = ["thugpro.dll", "updt.dll", "thugpro.log", "thugpro_scripting.log", "THUGProLauncher.exe"];
Game.GameName = "THUG Pro";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "THUGPro.exe";
Game.GUID = " THUG Pro";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "THUG Pro";
//Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
//Game.WindowStyleValues = ["~0x00800000"];
//Game.DontRemoveBorders = true;
//Game.ResetWindows = true;
Game.IgnoreWindowBorderCheck = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: This handler is made for THUG Pro: http://thugpro.com/. The modded game installs in AppData\\Local\\THUG Pro, search for the exe there. Make sure your gamepads work correctly in the main game first, map them correctly in the THUG Pro launcher. Select play online-local and host a multiplayer LAN game in one instance and join in the others. If you use keyboards after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working keyboard. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Lower your monitor scale if the instances do not resize correctly.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenProcessGrab = 7;
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
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowPosHook = true;
Game.ProtoInput.SetWindowStyleHook = false;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 8000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Settings", "height", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Settings", "width", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Settings", "window_height", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Settings", "window_width", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Settings", "windowed_mode", 1, Nucleus.RegType.DWord);

  if (Player.Owner.IsFullscreen()) {
  } else {
    if (Context.PlayerID > 0) {
      Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Game", "MusicLevel", 0, Nucleus.RegType.DWord);
    }
  }

  var uninvert = Context.Options["Uninvert"];
  var dinput = Context.Options["Dinput"];

  if (uninvert == "Yes") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("RightStick", "InvertY", true), new Nucleus.IniSaveInfo("RightStick", "InvertX", true)]);
  }

  if (dinput == "Yes") {
    var str = Context.GamepadGuid;
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\THUG Pro\\Settings", "pad0", str.toUpperCase(), Nucleus.RegType.String);

    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_4.dll");

    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
  }
};