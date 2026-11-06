Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Wed Jan 10 2024 12:28:29 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "84Nv5F4S2WfnvRdRp";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var fpscapanswers = ["60", "50", "45", "40", "30", "0"];
Game.AddOption("Limit frames per second to...", "", "fps", fpscapanswers);
var gfxapianswers = ["DirectX 12", "DirectX 11"];
Game.AddOption("Choose DirectX version", "", "gfx", gfxapianswers);
var resanswers = ["100", "95", "90", "85", "80", "75", "70", "65", "60", "55", "50"];
Game.AddOption("Resolution scale", "", "res", resanswers);
Game.KillMutex = [""];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64", "Endeavor\\Binaries\\Win64", "Endeavor\\Content\\Paks", "Endeavor\\Content\\Paks\\~mods"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "FOV100.pak", "EOSSDK-Win64-Shipping.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Endeavor-Win64-Shipping.exe";
Game.SteamID = "1549970";
Game.GUID = "AliensFTE";
Game.GameName = "Aliens Fireteam Elite";
Game.MaxPlayers = 3;
Game.MaxPlayersOneMonitor = 3;
Game.BinariesFolder = "Endeavor\\Binaries\\Win64";
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Aliens: Fireteam Elite";
Game.HasDynamicWindowTitle = false;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["Xinput1_4.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\Endeavor\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\Endeavor\\Saved\\SaveGames";
Game.Description =
  "Click the mouse once in each instance to make the in game cursor appear. This needs to be done even if you are using controllers. Make sure you see a cursor in each instance before pressing END to lock the input. This script only works with the latest version of Nucleus Co-Op.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 20;
Game.KillProcessesOnClose = ["END"];
Game.ProcessorPriorityClass = "High";

Game.SupportsMultipleKeyboardsAndMice = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
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

  Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Endeavor\\Binaries\\Win64\\nepice_settings\\NemirtingasEpicEmu.json";
  var params = [
    "{",
    '"EOSEmu": {',
    '"Achievements": {',
    ' "OnlineDatabase": ""',
    "},",
    '"Application": {',
    '"AppId": "79165699f2f8801964b79be5e2fc59b9",',
    '"DisableOnlineNetworking": false,',
    '"LogLevel": "off",',
    '"SavePath": "appdata"',
    "},",
    '"Ecom": {',
    '"UnlockDlcs": true',
    "},",
    '"Plugins": {',
    '"Overlay": {',
    ' "Enabled": false',
    "  }",
    " },",
    '"User": {',
    '"Language":' + '"' + Context.EpicLang + '"' + ",",
    '"UserName": ' + '"' + Context.Nickname + '"',
    "}",
    "},",
    '"Network": {',
    '"IceServers": [],',
    '"Plugins": {',
    '"Broadcast": {',
    '"Enabled": true',
    " },",
    '"WebSocket": {',
    '"SignalingServers": []',
    "}",
    " }",
    "}",
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  // var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64\\steam_settings");
  // System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64\\steam_settings\\DLC.txt";

  var lines = [
    "1643355=Aliens: Fireteam Elite - Hardened Marine Pack",
    "1643350=Aliens: Fireteam Elite - Endeavor Veteran Pack",
    "1643351=Aliens: Fireteam Elite - Wey-Yu Armoury",
    "1643352=Aliens: Fireteam Elite - Nostromo Salvage Pack",
    "1643352=Aliens: Fireteam Elite - Endeavor Pass Season 2",
    "1643353=Aliens: Fireteam Elite - UACM Frontline Pack",
    "1643354=Aliens: Fireteam Elite - Frontier Freelancer Pack",
    "1942650=Aliens: Fireteam Elite - Pathogen Expansion"
  ];
  Context.WriteTextFile(dlc, lines);
  var fps = Context.Options["fps"];
  var res = Context.Options["res"];
  var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Endeavor\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", fps),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bAccountLinked", "True"),
    new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "FrameRateLimit", fps),
    new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo(
      "/Script/Endeavor.EndeavorGameUserSettings",
      "ResolutionQualityOption",
      '(CVarName="r.ScreenPercentage",Value=' + res + ".000000,bSet=True,DefaultValue=100.000000,bDefaultSet=True)"
    ),
    new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "bAccountLinked", "True")
  ]);
  if (Context.PlayerID > 0) {
    var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Endeavor\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "MusicVolume", "0"),
      new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "CharacterVoiceVolume", "0")
    ]);
  }
  var gfx = Context.Options["gfx"];
  if (gfx == "DirectX 12") {
    var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Endeavor\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "EnableDX12", "True")]);
  } else {
    var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Endeavor\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Endeavor.EndeavorGameUserSettings", "EnableDX12", "False")]);
  }
};