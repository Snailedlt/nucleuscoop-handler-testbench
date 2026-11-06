Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Sat Jul 11 2026 05:32:15 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "vimMxkGvmzjjkWdXc";
Hub.Maintainer.Name = "solewalker";
Hub.Maintainer.Id = "Fe63bXnob7qnRezPM";

var answers1 = ["Yes", "No"];
Game.AddOption(
  "Custom resolutions fix?",
  "Matches resolution to window size to fix stretching in split-screen, lower your monitor scale % or set it to 100% if it is not working for you.",
  "Fix",
  answers1
);
var answers = ["No Change", "Low", "Medium", "High", "Maximum"];
Game.AddOption("Graphics preset", "Reduce GPU power required by using lower settings.", "gfx", answers);
Game.AddOption("Texture quality", "Reduce Vram required by using lower settings.", "txq", answers);
var answers2 = ["None", "60", "55", "50", "45", "40", "35", "30", "25", "20", "15"];
Game.AddOption("FPS Cap", "If you already have fps capping software running like RivaTuner do not enable this.", "fps", answers2);

// Game.ExecutableContext = ["bink2w64.dll", "nrsc_launcher.exe"];
Game.KillMutex = ["SekiroMutex"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["SeamlessCoop\\crashdumps\\attachments", "SeamlessCoop\\crashdumps\\reports", "SeamlessCoop\\crashpad", "SeamlessCoop\\locale"];
Game.DirSymlinkCopyInstead = ["SeamlessCoop", "NRSS"];
Game.FileSymlinkExclusions = [
  "steam_appid.txt",
  "steam_interfaces.txt",
  "steamclient64.dll",
  "steamclient.dll",
  "steamclient_loader_x64.exe",
  "fpslimiter.cfg",
  "xinput1_4.dll",
  "xinput9_1_0.dll",
  "SkipTheIntro.dll",
  "winmm.dll",
  "dlllist.txt"
];
Game.FileSymlinkCopyInstead = [
  "steam_api64.dll",
  "amd_ags_x64.dll",
  "bink2w64.dll",
  "data1.bhd",
  "data2.bhd",
  "data3.bhd",
  "oo2core_9_win64.dll",
  "regulation.bin",
  "nrsc_launcher.exe",
  "crashpad_handler.exe",
  "english.json",
  "dinput8.dll"
];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "nightreign.exe";
Game.LauncherExe = "nrsc_launcher.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.SteamID = "2622380";
Game.GUID = "ELDEN RING NIGHTREIGN";
Game.GameName = "ELDEN RING NIGHTREIGN";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocusWindowName = "ELDEN RING NIGHTREIGN";
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
// Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Nightreign";
Game.Description =
  'IMPORTANT: Close Steam completely before running this. Also disable RTSS, MSI AB or any other overlay software, else the invite overlay wont open up. Requires the latest Seamless Co-op mod to be installed correctly in your main latest clean game files: https://www.nexusmods.com/eldenringnightreign/mods/3. To connect the instances head to the round table (skip tutorial if needed). Press "Commence expedition" -> select "Matchmaking Settings" -> from there host will press "Invite Members", other players should join automatically. If facing issue joining or inviting, enable overlay from launch options, then invite from overlay when it opens. Let all instances load to the title screen before using inputs. If you are using at least one mouse and keyboard press the END key (default keybinding) to lock/unlock the input, you need to unlock the input to be able to use the invite overlay. Make sure to alt-tab to a non-game window before locking.';
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 15;
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
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
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
Game.ProtoInput.MultipleProtoControllers = true;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  // var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Launcher.bat";

  // var lines = ['powershell -WindowStyle Hidden -NoProfile -Command Start-Process -WindowStyle Hidden -FilePath "steamclient_loader_x64.bat"'];
  // Context.WriteTextFile(Bat, lines);

  var overlay = Context.Options["overlay"];

  if (overlay == "Yes") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\configs.overlay.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("overlay::general", "enable_experimental_overlay", 1)]);
  }

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  var fps = Context.Options["fps"];

  if (fps != "None") {
    var cfgFilePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\fpslimiter.cfg";
    Context.ReplaceLinesInTextFile(cfgFilePath, ["1|InitialFps=" + fps, "2|ToggleFps=" + fps]);
  } else {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\load_dlls\\fpslimiter64.dll");
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\fpslimiter.cfg");
  }

  var gfx = Context.Options["gfx"];
  if (gfx == "Maximum") {
    var gfxp1 = "MAX";
    var gfxp2 = "HIGH";
    var gfxp3 = "MAX";
    var gfxp4 = "MAX";
    var gfxp5 = "HIGH";
    var gfxp6 = "HIGH";
  }
  if (gfx == "High") {
    var gfxp1 = "HIGH";
    var gfxp2 = "HIGH";
    var gfxp3 = "HIGH";
    var gfxp4 = "HIGH";
    var gfxp5 = "HIGH";
    var gfxp6 = "HIGH";
  }
  if (gfx == "Medium") {
    var gfxp1 = "MEDIUM";
    var gfxp2 = "MEDIUM";
    var gfxp3 = "MEDIUM";
    var gfxp4 = "LOW";
    var gfxp5 = "HIGH";
    var gfxp6 = "MEDIUM";
  }
  if (gfx == "Low") {
    var gfxp1 = "LOW";
    var gfxp2 = "OFF";
    var gfxp3 = "MEDIUM";
    var gfxp4 = "LOW";
    var gfxp5 = "LOW";
    var gfxp6 = "LOW";
  }

  var txq = Context.Options["txq"];
  if (txq == "Maximum") {
    var txqp = "MAX";
  }
  if (txq == "High") {
    var txqp = "HIGH";
  }
  if (txq == "Medium") {
    var txqp = "MEDIUM";
  }
  if (txq == "Low") {
    var txqp = "LOW";
  }

  var path = Context.NucleusUserRoot + "\\AppData\\Roaming\\Nightreign\\GraphicsConfig.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//ClipCursor", "OFF");

  if (gfx != "No Change") {
    Context.ChangeXmlNodeInnerTextValue(path, "//QualitySetting", gfxp1);
    Context.ChangeXmlNodeInnerTextValue(path, "//SSAO", gfxp2);
    Context.ChangeXmlNodeInnerTextValue(path, "//DepthOfField", gfxp2);
    Context.ChangeXmlNodeInnerTextValue(path, "//MotionBlur", gfxp2);
    Context.ChangeXmlNodeInnerTextValue(path, "//ShadowQuality", gfxp1);
    Context.ChangeXmlNodeInnerTextValue(path, "//LightingQuality", gfxp1);
    Context.ChangeXmlNodeInnerTextValue(path, "//EffectsQuality", gfxp1);
    Context.ChangeXmlNodeInnerTextValue(path, "//ReflectionQuality", gfxp4);
    Context.ChangeXmlNodeInnerTextValue(path, "//WaterSurfaceQuality", gfxp5);
    Context.ChangeXmlNodeInnerTextValue(path, "//ShadeQuality", gfxp6);
    Context.ChangeXmlNodeInnerTextValue(path, "//VolumetricEffectQuality", gfxp1);
    Context.ChangeXmlNodeInnerTextValue(path, "//RaytracingQuality", gfxp1);
    Context.ChangeXmlNodeInnerTextValue(path, "//GIDataQuality", gfxp6);
    Context.ChangeXmlNodeInnerTextValue(path, "//GrassQuality", gfxp3);
  }

  if (txq != "No Change") {
    Context.ChangeXmlNodeInnerTextValue(path, "//TextureQuality", txqp);
  }

  Context.ChangeXmlNodeInnerTextValue(path, "//ScreenMode", "WINDOW");
  Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenWidth", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//Resolution-WindowScreenHeight", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//Auto-detectBestRenderingSettings", "OFF");

  var fix = Context.Options["Fix"];

  if (fix == "Yes") {
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "nightreign.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "nightreign.exe"),
      "03 00 00 80 07",
      Context.Width,
      4,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "nightreign.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "nightreign.exe"),
      "38 04 00 00 00 08",
      Context.Height,
      1,
      true
    );
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  };
};