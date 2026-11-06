Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Mar 10 2024 10:51:36 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yC86MmzHSMYXdPuGy";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["OutRun2006: Coast to Coast"];
Game.DirSymlinkExclusions = ["FXTcfg", "SaveGame"];
Game.FileSymlinkExclusions = [
  "OR2006C2C.exe",
  "common.dat",
  "dummy.txt",
  "License1.dat",
  "License2.dat",
  "License3.dat",
  "rankings.dat",
  "XInputPlus.ini",
  "dinput8.dll",
  "xinput1_4.dll",
  "EasyHook32.dll",
  "OR2Fix32.dll",
  "OR2Fix32.exe",
  "OR2FixInjector32.exe",
  "patch.txt"
];
Game.FileSymlinkCopyInstead = [
  "Config.exe",
  "FXTConfig.exe",
  "outrun2006.ini",
  "d3dx9_29.dll",
  "dx8vb.dll",
  "FF.ini",
  "GearShift.ini",
  "ogglist.txt",
  "Pedals.ini",
  "Playlist.txt",
  "Settings.ini",
  "VRButtons.ini",
  "Wheel.ini",
  "Xinput.ini"
];
Game.GameName = "OutRun 2006: Coast 2 Coast";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "OR2006C2C.exe";
Game.SteamID = "4730";
Game.GUID = "OutRun 2006";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.NeedsSteamEmulation = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "OutRun2006: Coast to Coast";
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Tested and working with the latest vanilla clean version that was available in Steam. Create a multiplayer LAN match in the first instance and join in the others. Each instance has its own save in Nucleus content folder inside the instances SaveGame folder, so be careful about not deleting them, you can also copy your main save to the instances folders. If you use keyboards after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working keyboard. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenContextAndLaunch = 3;
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
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowPosHook = false;
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
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\outrun2006.ini";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "DX/RES/WIDTH =", Nucleus.SearchType.StartsWith) + "|DX/RES/WIDTH = " + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "DX/RES/HEIGHT =", Nucleus.SearchType.StartsWith) + "|DX/RES/HEIGHT = " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "DX/WINDOWED =", Nucleus.SearchType.StartsWith) + "|DX/WINDOWED = 1"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)")
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OR2006C2C.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EasyHook32.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EasyHook32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OR2Fix32.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "OR2Fix32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OR2Fix32.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "OR2Fix32.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OR2Fix32.exe"], false, 1);
};