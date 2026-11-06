Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Thu Oct 24 2024 23:19:22 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "MF4DBMnzoNDZZbByz";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = [
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv150\\Win64",
  "Engine\\Binaries\\ThirdParty\\EpicOnlineServices",
  "Towers\\Plugins\\OnlineSubsystemGOG\\Source\\ThirdParty\\GalaxySDK\\Libraries",
  "Towers\\Binaries\\Win64",
  "Towers\\Content\\Movies"
];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt",
  "EOSSDK-Win64-Shipping.dll",
  "Galaxy64.dll",
  "xinput1_3.dll",
  "505games_logo_1088p.mp4",
  "alienware_logo_1088p.mp4",
  "Legal_1088p.mp4",
  "TyphoonIntroVideo_1088p.mp4",
  "UE4_Moving_Logo_1088p.mp4"
];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.UseNemirtingasGalaxyEmu = true;
Game.EpicEmuArgs = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Towers-Win64-Shipping.exe";
Game.SteamID = "973810";
Game.GUID = "Journey To The Savage Planet";
Game.GameName = "Journey To The Savage Planet";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "Towers\\Binaries\\Win64";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Journey To The Savage Planet";
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\Towers\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\Towers\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Select cooperative-invite and you should see the other player name right away so he can join you. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 3;
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

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 7000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var configPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(configPath, configPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Towers.TowersGameUserSettings", "bUseDynamicResolution", false),
    new Nucleus.IniSaveInfo("/Script/Towers.TowersGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Towers.TowersGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Towers.TowersGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Towers.TowersGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Towers.TowersGameUserSettings", "DesiredScreenHeight", Context.Height)
  ]);

  if (Context.HasKeyboardPlayer !== true) {
    Game.SetForegroundWindowElsewhere = true;
  }

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\Towers\\Plugins\\OnlineSubsystemGOG\\Source\\ThirdParty\\GalaxySDK\\Libraries\\Galaxy64.dll")) {
    Game.UseGoldberg = false;
    Game.UseNemirtingasEpicEmu = false;
    Game.UseNemirtingasGalaxyEmu = true;

    var idg = Context.PlayerID + 6;

    var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Towers\\Binaries\\Win64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
    var params = [
      "{",
      '  "api_version": "1.144.1.0",', //1.148.5.0
      '  "enable_overlay": false,',
      '  "galaxyid": 14549624462898294' + idg + ",",
      '  "language": ' + '"' + Context.GogLang + '",',
      '  "productid": 1519147341,',
      '  "username": ' + '"' + Context.Nickname + '"',
      "}"
    ];
    Context.WriteTextFile(jsonPath, params);
  } else {
    Game.UseNemirtingasGalaxyEmu = false;
  }

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv150\\Win64\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};