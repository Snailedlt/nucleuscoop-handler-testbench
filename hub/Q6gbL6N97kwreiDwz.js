Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Nov 21 2021 12:16:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Q6gbL6N97kwreiDwz";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars in split-screen.", "Pillar", answers1);

Game.ExecutableContext = ["HiveJump_Data"];
Game.DirSymlinkExclusions = ["HiveJump_Data\\Plugins", "HiveJump_Data\\Managed"];
Game.FileSymlinkExclusions = ["Assembly-CSharp.dll", "steam_api.dll", "steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.GameName = "Hive Jump";
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "HiveJump.exe";
Game.SteamID = "295670";
Game.GUID = "Hive Jump";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "HiveJump";
Game.FakeFocus = true;
Game.FakeFocusInterval = 10000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.BlockRawInput = false;
Game.UserProfileConfigPath = "AppData\\LocalLow\\Graphite Lab\\Hive Jump";
Game.UserProfileSavePath = "AppData\\LocalLow\\Graphite Lab\\Hive Jump\\Profiles";
Game.Description =
  "Use different game profiles per instance. Set the lobby to online and public in one instance then the others can join using find match. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. The game already has 4 player local co-op but with this script each player gets his own screen and can separate, you can also use multiple monitors and multiple kb/m.";
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  var txtPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\Graphite Lab\\Hive Jump\\game_settings.gls";
  var dict = ['1|"isFullscreen":true,|"isFullscreen":false,'];
  Context.ReplacePartialLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Graphite Lab\\Hive Jump", "Screenmanager Is Fullscreen mode_h3981298716", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Graphite Lab\\Hive Jump", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Graphite Lab\\Hive Jump", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var pillar = Context.Options["Pillar"];

  if (pillar == "Yes") {
    //Remove letterboxing/pillarboxing

    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootInstallFolder, "HiveJump_Data\\Managed\\Assembly-CSharp.dll"),
      System.IO.Path.Combine(Context.RootFolder, "HiveJump_Data\\Managed\\Assembly-CSharp.dll"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (pillar == "No") {
    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "HiveJump_Data\\Managed\\Assembly-CSharp.dll"),
      System.IO.Path.Combine(Context.RootFolder, "HiveJump_Data\\Managed\\Assembly-CSharp.dll"),
      true
    );
  }
};