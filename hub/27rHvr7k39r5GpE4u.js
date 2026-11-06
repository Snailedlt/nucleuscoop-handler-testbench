Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 01 2021 13:38:59 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "27rHvr7k39r5GpE4u";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["res\\mapdata"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "xinput1_4.dll", "HMH.exe"];
Game.FileSymlinkCopyInstead = ["steam_api.dll"];
Game.NeedsSteamEmulation = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "HMH.exe";
Game.SteamID = "214830";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Half Minute Hero";
Game.GameName = "Half Minute Hero: Super Mega Neo Climax Ultimate Boy";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.StartArguments = "-console";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Half Minute Hero: Super Mega Neo Climax Ultimate Boy";
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "Dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\SmartSteamEmu";
Game.Description =
  "IMPORTANT: Set each instance to windowed right away with Alt+Enter for the instances to resize correctly. For all the gamepads to work correctly after the instances have finished resizing unfocus all instances by clicking on an instance then clicking outside the window or by alt-tabbing to the Nucleus app window. Select multiplayer in one instance then the others can join the same way. You can change to controller buttons prompts by pressing right or left in the game keyboard config options. This script needs latest legit Steam version to work.";
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

Game.SupportsMultipleKeyboardsAndMice = false;

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
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.FindWindowHook = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = false;
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
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)")
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends011",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION010",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION006",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.PlayerID == 0) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "HMH.exe"), System.IO.Path.Combine(Context.RootFolder, "HMH.exe"), true);
  }

  if (Context.PlayerID == 1) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "HMH.exe"),
      System.IO.Path.Combine(Context.RootFolder, "HMH.exe"),
      [0x4d, 0x00, 0x75, 0x00, 0x74, 0x00, 0x65, 0x00, 0x78, 0x00], //4D 00 75 00 74 00 65 00 78 00
      [0x4e, 0x00, 0x75, 0x00, 0x74, 0x00, 0x65, 0x00, 0x78, 0x00]
    );
  }

  if (Context.PlayerID == 2) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "HMH.exe"),
      System.IO.Path.Combine(Context.RootFolder, "HMH.exe"),
      [0x4d, 0x00, 0x75, 0x00, 0x74, 0x00, 0x65, 0x00, 0x78, 0x00],
      [0x4f, 0x00, 0x75, 0x00, 0x74, 0x00, 0x65, 0x00, 0x78, 0x00]
    );
  }

  if (Context.PlayerID == 3) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "HMH.exe"),
      System.IO.Path.Combine(Context.RootFolder, "HMH.exe"),
      [0x4d, 0x00, 0x75, 0x00, 0x74, 0x00, 0x65, 0x00, 0x78, 0x00],
      [0x40, 0x00, 0x75, 0x00, 0x74, 0x00, 0x65, 0x00, 0x78, 0x00]
    );
  }
};