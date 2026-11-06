Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Feb 19 2025 09:14:47 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "qELvapRxAPPM2xi2Q";
Hub.Maintainer.Name = "messenils";
Hub.Maintainer.Id = "5NNQPxAD7mmwGuvKp";

var answers5 = ["Standard", "0.5X", "0.75X", "1.5X", "2X"];
Game.AddOption("Game speed", "Speed modifier.", "Speed", answers5);

Game.SupportsMultipleKeyboardsAndMice = true;
//game files
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Attack On Pearl Harbor.exe";

Game.FileSymlinkCopyInstead = ["config.ini", "pilots.dta"];
Game.FileSymlinkExclusions = ["Xinput1_2.dll"];

Game.GUID = "Attack On Pearl Harbor";
Game.GameName = "Attack On Pearl Harbor";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Attack On Pearl Harbor";
//Game.HasDynamicWindowTitle = true;
//Game.ToggleUnfocusOnInputsLock = true;
//Game.SetTopMostAtEnd = true;

Game.Description =
  "For V1.0 with clean game files.\n\nThe Game supports multiple mice and keyboards, mice/keyboards, and Xinput controllers. For example: one set of mouse and keyboard can play 2 instances.\n\nTo navigate the menu in another instance you can use the windows cursor, and click the mouse on another window.\n\nStart a LAN server in one instance and join with the rest.\n\nPress END to lock input when the game setup is complete.\n\nWhen you want to quit, press END, and then CTRL+Q to quit all instances";
Game.PauseBetweenContextAndLaunch = 3;
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 2;

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
Game.LockInputAtStart = false;
Game.DontRemoveBorders = true;

Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
//Game.XInputPlusDll = ["xinput1_2.dll"];
//Game.ProtoInput.UseOpenXinput = true;
//Game.Hook.XInputNames = ["xinput1_2.dll"];

//ProtoInput
Game.ProtoInput.AutoHideTaskbar = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true; // Usually this works best
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.RawInputFilter = false;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;

Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.AllowFakeCursorOutOfBounds = false;
Game.ProtoInput.DrawFakeCursor = false;

Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;

Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

// These settings are the default and will be overwritten in the input lock.
Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false; // Filters take priority over blocks, so disable the filter
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS //WM_MOUSELEAVE

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.GamePlayBeforeGameSetup = true;

Game.Play = function() //set resolution
{
  var speed = Context.Options["Speed"];

  var music = "0";
  var controltype = "1";

  if (Context.PlayerID == 0) {
    music = "1";
  }

  if (Player.IsRawKeyboard && Player.IsRawMouse) {
    controltype = "1";
  } else if (Player.IsKeyboardPlayer && Player.IsRawKeyboard) {
    controltype = "2";
  } else if (Player.IsRawMouse) {
    controltype = "1";
  } else {
    controltype = "4"; //3 is dinput
    var XID = Context.GamepadId - 1;

    //xinput getstate dwuserindex
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "6A 00 89 56 0C E8 E5 B6 01 00 89 46 20 5E C3 CC",
      "6A 0" + XID + "89 56 0C E8 E5 B6 01 00 89 46 20 5E C3 CC",
      true
    );

    //xinput setstate dwuserindex vibration
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "6A 00 E8 CD B6 01 00 0F B7 1F 3B 5E 28 7E 4D D9",
      "6A 0" + XID + "E8 CD B6 01 00 0F B7 1F 3B 5E 28 7E 4D D9",
      true
    );
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini";

  var lines = [
    "[Graphics]",
    Context.Width + " x " + Context.Height,
    "TextureVideoMemory 1",
    "SpecialEffects 3",
    "Shadows 1",
    "Windowed 1",
    "WideScreen 1",
    "Vsync 0",
    " ",

    "[Controls]",
    "ControlType " + controltype, // 0 = skyview 1 = keyboard+mouse 2=keyboard 3=controller
    "XAxis 3",
    "YAxis 3",
    "Cross 1",
    "Invert 0",
    " ",

    "[Sounds]",
    "SoundEnabled 1",
    "SoundVolume 8",
    "MusicEnabled " + music,
    "MusicVolume 4",
    " ",

    "[Others]",
    "LogInfo 0",
    "ErrorMessages 0",
    "WarningMessages 0",
    "LanguagePrefix _en",
    "",

    "[Editor]",
    "EditorEnabled 0"
  ];
  Context.WriteTextFile(txtPath, lines);

  //windowstyle
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "68 00 00 CF 10 68 00 05 4D 00 68 00 05 4D 00 68",
    "68 00 00 00 80 68 00 05 4D 00 68 00 05 4D 00 68",
    true
  );

  //windowspos prepare
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "80 3D A0 55 1A 02 00 8B 35 E0 01 4D 00 75 37 8B 8C 24 90 00 00",
    "90 8B 35 E0 01 4D 00 8B 8C 24 90 00 00 00 8B 15 94 55 1A 02 A1",
    true
  );

  //windowspos prepare
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "00 8B 15 94 55 1A 02 A1 90 55 1A 02 57 51 57 57 52 50 6A 64 6A 64",
    "90 55 1A 02 57 51 57 57 52 50 68 00 00 00 00 68 00 00 00 00 90 90",
    true
  );

  //Y pos apply
  Context.Wait(500);
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "90 55 1A 02 57 51 57 57 52 50 68 00 00 00 00 68",
    Context.PosY,
    12,
    true
  );

  //X pos apply
  Context.Wait(500);
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "00 00 68 00 00 00 00 90 90 68 00 00 00 80 68 00",
    Context.PosX,
    4,
    true
  );

  //dont hide real cursor
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "57 FF 15 F4 01 4D 00 8B 0D 68 4C 4F 00 8D 44 24",
    "90 90 90 90 90 90 90 8B 0D 68 4C 4F 00 8D 44 24",
    true
  );

  //always focus focuspatch
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "74 3C 8B 0D 68 4C 4F 00 8D 44 24 08 50 51 C6 05",
    "90 90 8B 0D 68 4C 4F 00 8D 44 24 08 50 51 C6 05",
    true
  );

  //game fix V1
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "E9 EE 05 00 00 B9 E8 4D 69 00 E8 DE 70 01 00 B9",
    "E9 00 00 00 00 B9 E8 4D 69 00 E8 DE 70 01 00 B9",
    true
  );

  //game fix extra jump
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
    "8B 0D 68 4C 4F 00 6A 10 68 3C 05 4D 00 68 30 05",
    "EB 17 90 90 90 90 6A 10 68 3C 05 4D 00 68 30 05",
    true
  );

  if (Context.AspectRatioDecimal > 1.8) {
    //FOV value. a little stretch but renders terrain correctly
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "C1 33 6C 3F 49 6E 74 72  6F 00 00 00 00 00 80 3E",
      "83 29 15 3F 49 6E 74 72  6F 00 00 00 00 00 80 3E",
      true
    );
  }
  if (speed == "0.5X") {
    //set float 15
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "00 00 00 00 00 00 3E 40 00 00 00 00 00 40 8F 40",
      "00 00 00 00 00 00 2E 40 00 00 00 00 00 40 8F 40",
      true
    );
  }
  if (speed == "0.75X") {
    //set float 22.5
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "00 00 00 00 00 00 3E 40 00 00 00 00 00 40 8F 40",
      "00 00 00 00 00 80 36 40 00 00 00 00 00 40 8F 40",
      true
    );
  }
  if (speed == "1.5X") {
    //set float 45
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "00 00 00 00 00 00 3E 40 00 00 00 00 00 40 8F 40",
      "00 00 00 00 00 80 46 40 00 00 00 00 00 40 8F 40",
      true
    );
  }
  if (speed == "2X") {
    // set float 60
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Attack On Pearl Harbor.exe"),
      "00 00 00 00 00 00 3E 40 00 00 00 00 00 40 8F 40",
      "00 00 00 00 00 00 4E 40 00 00 00 00 00 40 8F 40",
      true
    );
  }
};
Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);

    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, true, true, true, true);

    System.Threading.Thread.Sleep(200);

    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

    // Disable the bypass: Don't allow any raw input to pass. Doing this for all players otherwise with mixed keyboard and gamepad players you need to be careful to focus a keyboard player before locking inputs.
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
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

    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
    //Intentionally disable focus so all the instances don't respond to input at the same time
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    // Enable the bypass: allow any raw input to pass
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
  }
};