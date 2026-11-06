Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sat Oct 23 2021 18:15:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pSEDe2grDxuP6DJ6Y";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
var answers3 = ["Yes", "No"];
Game.AddOption("Will you use the game's native splitscreen?", "If yes launch only two horizontal instances, gamepads only.", "Native", answers1);
Game.AddOption("First instance two players and the others keyboards?", "Native split in the first, others kb/m.", "Mode", answers2);
Game.AddOption("Edit config file for windowed?", "Automatically edits it to force windowed.", "Windowed", answers3);

Game.ExecutableContext = ["PxFoundation_x64.dll", "PxPvdSDK_x64.dll", "PhysX3_x64.dll"];
Game.GameName = "Divinity: Original Sin 2 - Definitive Edition";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "eocapp.exe";
Game.SteamID = "435150";
Game.GUID = "Divinity Original Sin 2 DE";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "bin";
Game.NeedsSteamEmulation = false;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DOS II : DE";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Description =
  "After all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. This script is designed for 2 players per instance using the game's native splitscreen, so you can play with 4 players in only two instances of the game for better performance, so the first two gamepads will control the first instance and the other two gamepads the second, in the title screen just press start to add a local player in each instance, use different profile per player. If you want to have only 1 player per instance to use keyboards (native splitscreen only works with gamepads) select No in the UI option before pressing play in Nucleus.";
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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;

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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var native = Context.Options["Native"];
  var mode = Context.Options["Mode"];
  var windowed = Context.Options["Windowed"];

  if (native == "Yes") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
  }
  if (native == "No") {
  }

  if (mode == "Yes") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
  }

  if (mode == "No") {
  }

  if (windowed == "Yes") {
    var txtPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\Larian Studios\\Divinity Original Sin 2 Definitive Edition\\graphicSettings.lsx";
    var dict = ['57|value="1"|value="0"'];
    Context.ReplacePartialLinesInTextFile(txtPath, dict);
  }

  if (windowed == "No") {
  }
};