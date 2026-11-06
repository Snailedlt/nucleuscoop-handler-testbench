Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Wed Mar 05 2025 07:58:16 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "zgeLh5wySkWw6mzTB";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["DirectX 11", "DirectX 9"];
var answers2 = ["InvScaled", "NoScaled", "Scaled"];
Game.AddOption("Select Graphics API:", "Select the GAPI you want the game to use.", "API", answers1);
Game.AddOption("Resizing Scale?", "ONLY change if the instances are not opening already correctly resized for you or have cursor offset.", "Resize", answers2);

Game.ExecutableContext = ["Direct3D11.dll"];
Game.KillMutex = ["TitanQuest"];
Game.DirExclusions = ["Videos"];
Game.DirSymlinkExclusions = ["THQNOnline\\steam", "Settings", "plugins"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "MinHook.x86.dll", "TQFix.ini", "TQFix2.asi"];
Game.FileSymlinkCopyInstead = ["Engine.dll"];
Game.UseNucleusEnvironment = true;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "TQ.exe";
Game.SteamID = "475150";
Game.GUID = "Titan Quest";
Game.GameName = "Titan Quest Anniversary Edition";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Titan Quest Anniversary Edition";
//Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.PreventWindowDeactivation = false;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.DocumentsSavePath = "My Games\\Titan Quest - Immortal Throne\\SaveData";
Game.DocumentsConfigPath = "My Games\\Titan Quest - Immortal Throne\\Settings";
Game.DocumentsSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = false;
Game.Description =
  "IMPORTANT: Launch your main game at least once before running this so that the game's config files get created. Host a LAN multiplayer game in one instance and join in the others. Disable Steam Input in Steam for the gamepads to work and restrict correctly, note that the game sadly disables gamepad support if the game's window resolution is low (for example it disables gamepad support in resolutions like 960x1080, 960x540, 1920x540 etc.). If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 3;
Game.PauseBetweenStarts = 25;

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
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //0x0006, 0x001C, 0x0086, 0x0007, 0x0021, 0x0008

Game.Play = function() {
  var api = Context.Options["API"];
  var resize = Context.Options["Resize"];

  if (api == "DirectX 11") {
    Context.StartArguments = " /dx11"; //-borderless
  }

  if (api == "DirectX 9") {
    Context.StartArguments = " /dx9";
  }

  if (resize == "InvScaled") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;
  }

  if (resize == "NoScaled") {
  }

  if (resize == "Scaled") {
    Context.DPIHandling = Nucleus.DPIHandling.Scaled;
  }

  var txtPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\options.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "showIntro", Nucleus.SearchType.StartsWith) + "|showIntro                 = false",
    Context.FindLineNumberInTextFile(txtPath, "resolution", Nucleus.SearchType.StartsWith) + "|resolution                = " + Context.Width + " " + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "windowmode", Nucleus.SearchType.StartsWith) + "|windowmode                = 1",
    Context.FindLineNumberInTextFile(txtPath, "confineCursor", Nucleus.SearchType.StartsWith) + "|confineCursor             = false",
    Context.FindLineNumberInTextFile(txtPath, "showlauncher", Nucleus.SearchType.StartsWith) + "|showlauncher              = false"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins\\TQFix.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "PortOffset", Context.PlayerID + "0")]);

  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "Engine.dll"),
    System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "Engine.dll"),
    "6A 05 03 C1 99 6A 00",
    "6A 03 03 C1 99 6A 00",
    true
  );
};