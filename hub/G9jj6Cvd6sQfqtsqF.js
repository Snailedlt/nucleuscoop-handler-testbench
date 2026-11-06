Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Feb 15 2025 18:59:22 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "G9jj6Cvd6sQfqtsqF";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.DirSymlinkExclusions = [
  "SparkingZERO\\Binaries\\Win64",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv16\\Win64",
  "SparkingZERO\\Binaries\\Win64",
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv16\\Win64\\bak"
];
Game.FileSymlinkExclusions = ["disable_overlay.txt", "steamclient_loader.exe", "ColdClientLoader.ini", "steam_appid.txt", "local_save.txt", "dsound.dll", "WukongTweak.asi", "WukongTweak.ini"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll"];
Game.UseNucleusEnvironment = true;
Game.CreateSteamAppIdByExe = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimentalSteamClient = true;
Game.SteamID = "1790600";
Game.ExecutableName = "SparkingZERO-Win64-Shipping.exe";
Game.GUID = "Dragon Ball Sparking! Zero";
Game.GameName = "Dragon Ball: Sparking! Zero";
Game.BinariesFolder = "SparkingZERO\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 6;
Game.MaxPlayers = 6;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SetForegroundWindowElsewhere = true;
Game.HideTaskbar = true;
Game.ResetWindows = true;
Game.SetWindowHookStart = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DRAGON BALL Sparking! ZERO";
Game.HasDynamicWindowTitle = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll", "XInput9_1_0.dll"];
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\SparkingZERO\\Saved\\Config\\Windows";
Game.HandlerInterval = 100;
Game.Description =
  "Make sure to have at least one save before using this handler or instance saves will not persist between launches. To use your Steam save, set your Steam ID in Nucleus.\n\nClose Steam before using this handler. Wait until all instances have resized and repositioned. If you have at least one keyboard player press END to lock input and allow each keyboard player control of their instance.\n\nHost an online match with one player and join with the others. You may want to mute the music and voice volume for all but one instance.\n\nPress the END key again to unlock input. You can also use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenProcessGrab = 20;
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
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.SetWindowStyleHook = true;
Game.ProtoInput.SetWindowPosHook = true;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var aspect = Context.Options["Aspect"];

  Context.Wait(2000);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\steamless.bat";
  var lines = [
    '"' +
      Context.NucleusFolder +
      '\\utils\\Steamless\\Steamless.CLI.exe" --quiet ' +
      '"' +
      Context.GetFolder(Nucleus.Folder.InstancedGameFolder) +
      '\\SparkingZERO\\Binaries\\Win64\\SparkingZERO-Win64-Shipping.exe"',
    'move /y "SparkingZERO-Win64-Shipping.exe.unpacked.exe" "SparkingZERO-Win64-Shipping.exe"'
  ];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\steamless.bat"], false, 1);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\winmm.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\SUWSF.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SUWSF.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\SUWSF.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SUWSF.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var vidcfg = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(vidcfg, vidcfg, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "bUseDynamicResolution", "false"),
    new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ResolutionQuality", "100.000000"),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "Option_ResolutionX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "Option_ResolutionY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SS.SSGameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "true")
  ]);

  var asicfg = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SparkingZERO\\Binaries\\Win64\\SUWSF.ini";
  Context.ModifySaveFile(asicfg, asicfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("UserSettings", "Resolution", Context.Width + "x" + Context.Height)]);

  if (Context.AspectRatioDecimal < 1.8) {
    Context.ModifySaveFile(asicfg, asicfg, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Patch:AspectRatioAxisConstraint", "Enabled", "false")]);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.OnFinishedSetup = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, false, false, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};