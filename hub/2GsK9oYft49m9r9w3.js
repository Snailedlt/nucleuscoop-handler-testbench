Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Feb 10 2022 22:12:15 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "2GsK9oYft49m9r9w3";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var fpscapanswers = ["60", "50", "45", "40", "30", "0"];
Game.AddOption("Limit frames per second to...", "", "fps", fpscapanswers);
Game.KillMutex = [""];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64", "Thunder2305\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "XInput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Thunder2305-Win64-Shipping.exe";
Game.SteamID = "377300";
Game.GUID = "ThunderTierOne";
Game.GameName = "Thunder Tier One";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Thunder2305\\Binaries\\Win64";
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergLobbyConnect = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Thunder2305";
Game.HasDynamicWindowTitle = true;
// Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["XInput9_1_0.dll", "XInput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\Thunder2305\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\Thunder2305\\Saved\\SaveGames";
Game.Description =
  "Click the mouse once in each instance to make the in game cursor appear. Make sure you see a cursor in each instance before pressing END to lock the input. This script only works with the latest version of Nucleus Co-Op.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 20;
Game.KillProcessesOnClose = ["END"];
Game.ProcessorPriorityClass = "High";

Game.ProtoInput.SetWindowStyleHook = true;
Game.ProtoInput.SetWindowPosHook = true;

Game.SupportsMultipleKeyboardsAndMice = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
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
Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

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

Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var fps = Context.Options["fps"];
  var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Thunder2305\\Saved\\Config\\WindowsClient\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", fps),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    // new Nucleus.IniSaveInfo('/Script/Engine.GameUserSettings', 'bUseDynamicResolution', 'True'),
    // new Nucleus.IniSaveInfo('/Script/Engine.GameUserSettings', 'bUseDesiredScreenHeight', 'True'),
    new Nucleus.IniSaveInfo("ServerListSetting", "LastLoginPrivateServerIp", "127.0.0.1:11888")
  ]);
  if (Context.PlayerID > 0) {
    var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Thunder2305\\Saved\\Config\\WindowsClient\\GameUserSettings.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "BgmSoundVolume", "0"),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "CharacterVoiceVolume", "0")
    ]);
  }
  if (Context.AspectRatioDecimal < 1.2) {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Thunder2305\\Saved\\Config\\WindowsClient\\Engine.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.UserInterfaceSettings", "ApplicationScale", "1")]);
  } else if (Context.AspectRatioDecimal > 1.8) {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Thunder2305\\Saved\\Config\\WindowsClient\\Engine.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.UserInterfaceSettings", "ApplicationScale", "1")]);
  } else {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\Thunder2305\\Saved\\Config\\WindowsClient\\Engine.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.UserInterfaceSettings", "ApplicationScale", "1")]);
  }
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Thunder2305\\Binaries\\Win64\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.PlayerID + 1),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.PlayerID + 1),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.PlayerID + 1)
  ]);
};