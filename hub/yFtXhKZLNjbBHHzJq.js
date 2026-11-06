Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Jul 28 2025 18:50:43 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yFtXhKZLNjbBHHzJq";
Hub.Maintainer.Name = "SAM1430B";
Hub.Maintainer.Id = "ELkGJMwSHnJRPNdpE";

var answers1 = ["-", "Yes", "No"];
var answers2 = ["Default", "30", "45", "60", "85", "120", "144", "165", "240"];
var answers3 = ["-", "High", "Medium", "Low", "Lowest"];
var answers4 = ["-", "High", "Medium", "Low", "Lowest"];
Game.AddOption("FPS", "Keep it empty to use the default", "FPS", []);
Game.AddOption("Enable Vsync", "", "VSYNC", answers1);
Game.AddOption("Graphics Quality", "", "QUALITY", answers3);
Game.AddOption("Resolution Quality", "", "RESQUALITY", answers4);

Game.KillMutex = ["UnrealEngine4"];
Game.DirSymlinkExclusions = [
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64",
  "Praetorians\\Binaries\\Win64",
  "Praetorians\\Plugins\\OnlineSubsystemGOG\\Source\\ThirdParty\\GalaxySDK\\Libraries"
];
Game.FileSymlinkExclusions = ["Galaxy64.dll", "steam_api64.dll", "KalypsoLogo.mp4", "PyroLogo.mp4", "TorusLogo.mp4"];
Game.GameName = "Praetorians - HD Remaster";
Game.HandlerInterval = 100;
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Praetorians-Win64-Shipping.exe";
Game.BinariesFolder = "Praetorians\\Binaries\\Win64";
Game.SteamID = "1100420";
Game.GUID = "Praetorians - HD Remaster";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseGoldberg = true;
Game.UseNemirtingasGalaxyEmu = true;
Game.SupportsPositioning = true;
Game.Hook.ForceFocus = true;
Game.ForceWindowTitle = true;
Game.Hook.ForceFocusWindowName = "Praetorians - HD Remaster  ";
Game.HookFocus = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "You need Nucleus Co-op v2.3.4 or later.\n\n" +
  "Once instances have resized and repositioned, you need to click on each gamepad instance in order for their cursor to show up in game.\n\n" +
  "Press END to lock input and grant all players control. You may want to mute music in all but one instance. Create multiplayer game and join with the rest, you may have to a refresh a few times to get the server to show up.\n\n" +
  "Press END again to unlock input, While input is unlocked you can press CTRL+Q to close Nucleus and all of its instances.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 10;

Game.UserProfileConfigPath = "AppData\\Local\\Praetorians";

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

//ProtoInput

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = true;
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
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.SetWindowPosHook = true;
Game.ProtoInput.SetRemoveBorderHook = true;
Game.ProtoInput.PutMouseInsideWindow = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = true;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseDblClkMessages = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER

Game.Play = function() {
  if (!Context.IsKeyboardPlayer) {
    Game.ProtoInput.DrawFakeCursor = true;
  }

  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var vsync = Context.Options["VSYNC"];
  var fps = Context.Options["FPS"];
  var quality = Context.Options["QUALITY"];
  var resQuality = Context.Options["RESQUALITY"];

  var configPath = Context.EnvironmentPlayer + "\\" + Context.UserProfileConfigPath + "\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";

  if (vsync == "-") {
  }
  if (vsync == "Yes") {
    Context.ModifySaveFile(configPath, configPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "True")]);
  }
  if (vsync == "No") {
    Context.ModifySaveFile(configPath, configPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "False")]);
  }

  if (fps == "") {
    var frl = "0";
  } else {
    var frl = fps;
  }
  Context.ModifySaveFile(configPath, configPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", frl)]);

  const qualityOptions = {
    High: "3",
    Medium: "2",
    Low: "1",
    Lowest: "0"
  };
  const GFXquality = qualityOptions[quality];
  if (GFXquality !== undefined) {
    Context.ModifySaveFile(configPath, configPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", GFXquality),
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadingQuality", GFXquality)
    ]);
  }

  const resQualityOptions = {
    High: "100",
    Medium: "80",
    Low: "65",
    Lowest: "55"
  };
  const ResQuality = resQualityOptions[resQuality];
  if (ResQuality !== undefined) {
    Context.ModifySaveFile(configPath, configPath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ResolutionQuality", ResQuality)
      //new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings","ResolutionSizeX", Context.Width),
      //new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings","ResolutionSizeY", Context.Height),
    ]);
  }

  var idg = Context.PlayerID + 1;
  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Praetorians\\Binaries\\Win64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var params = [
    "{",
    '  "api_version": "1.139.2.0",',
    '  "enable_overlay": false,',
    '  "galaxyid": 14549624462898294' + idg + ",",
    '  "language": ' + '"' + Context.GogLang + '",',
    '  "productid": 1999861490,',
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 1000, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};