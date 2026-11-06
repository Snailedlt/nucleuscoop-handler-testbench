Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Tue Mar 11 2025 10:49:13 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "T5eufEhfqWJe9CW9j";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["InvScaled", "NoScaled", "Scaled"];
Game.AddOption("Launch all instances under your Steam account?", "Only use if you want to unlock Steam achievements, connect via LAN.", "Steam", answers1);
Game.AddOption("Window Size Scale", "ONLY change if the instances are not opening already correctly resized for you.", "Scale", answers2);

Game.ExecutableContext = ["PhysXLocal", "binkw32.dll"];
Game.DirSymlinkExclusions = ["Binaries"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  "cudart.dll",
  "dbghelp.dll",
  "fmodex.dll",
  "FonixTtsDtSimpleFr.dll",
  "FonixTtsDtSimpleGr.dll",
  "FonixTtsDtSimpleIt.dll",
  "FonixTtsDtSimpleLa.dll",
  "FonixTtsDtSimpleSp.dll",
  "FonixTtsDtSimpleUk.dll",
  "FonixTtsDtSimpleUs.dll",
  "libresample.dll",
  "nvtt.dll",
  "NxCooking.dll",
  "ogg.dll",
  "PhysXCore.dll",
  "PhysXExtensions.dll",
  "SteamAPIUpdater.dll",
  "UpdateDLLWrapper.dll",
  "vorbis.dll",
  "vorbisenc.dll",
  "vorbisfile.dll",
  "wxmsw28u_adv_vc_custom.dll",
  "wxmsw28u_aui_vc_custom.dll",
  "wxmsw28u_core_vc_custom.dll",
  "wxmsw28u_dbgrid_vc_custom.dll",
  "wxmsw28u_gl_vc_custom.dll",
  "wxmsw28u_html_vc_custom.dll",
  "wxmsw28u_media_vc_custom.dll",
  "wxmsw28u_net_vc_custom.dll",
  "wxmsw28u_odbc_vc_custom.dll",
  "wxmsw28u_qa_vc_custom.dll",
  "wxmsw28u_richtext_vc_custom.dll",
  "wxmsw28u_vc_custom.dll",
  "wxmsw28u_xml_vc_custom.dll",
  "wxmsw28u_xrc_vc_custom.dll",
  "wxmsw28ud_adv_vc_custom.dll",
  "wxmsw28ud_aui_vc_custom.dll",
  "wxmsw28ud_core_vc_custom.dll",
  "wxmsw28ud_dbgrid_vc_custom.dll",
  "wxmsw28ud_gl_vc_custom.dll",
  "wxmsw28ud_html_vc_custom.dll",
  "wxmsw28ud_media_vc_custom.dll",
  "wxmsw28ud_net_vc_custom.dll",
  "wxmsw28ud_odbc_vc_custom.dll",
  "wxmsw28ud_qa_vc_custom.dll",
  "wxmsw28ud_richtext_vc_custom.dll",
  "wxmsw28ud_vc_custom.dll",
  "wxmsw28ud_xml_vc_custom.dll",
  "wxmsw28ud_xrc_vc_custom.dll"
];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.SteamID = "8980";
Game.GUID = "Borderlands";
Game.GameName = "Borderlands";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.ExecutableName = "Borderlands.exe";
Game.BinariesFolder = "Binaries";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Borderlands";
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.DocumentsSavePath = "My Games\\Borderlands\\SaveData";
Game.DocumentsConfigPath = "My Games\\Borderlands\\WillowGame\\Config";
Game.DocumentsSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = false;
Game.Description =
  "Host a mp game in one instance and join in the others, click on an instance to name the lobby. If you use keyboards/mice after the instances open and finish setting up press the END key once to lock the input for all instances to have their own cursor. Press the END key again to unlock the input when you finish playing, you can also use CTRL+Q to close Nucleus and all its instances.";
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
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;

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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-windowed -AlwaysFocus -NoLauncher -nosplash -nomoviestartup -NoController" + " -WindowPosX= " + Context.PosX + " -WindowPosY= " + Context.PosY;
  } else {
    Context.StartArguments = "-windowed -AlwaysFocus -NoLauncher -nosplash -nomoviestartup" + " -WindowPosX= " + Context.PosX + " -WindowPosY= " + Context.PosY;
  }

  var steam = Context.Options["Steam"];
  var scale = Context.Options["Scale"];

  if (scale == "InvScaled") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;
  }

  if (scale == "Scaled") {
    Context.DPIHandling = Nucleus.DPIHandling.Scaled;
  }

  if (scale == "NoScaled") {
  }

  var savePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\WillowEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "WindowedFullscreen", Context.IsFullscreen),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height),
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("WillowGame.WillowGameEngine", "bPauseLostFocusWindowed", false)
  ]);

  if (steam == "No") {
    var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_interfaces.txt";
    var lines = [
      "SteamClient011",
      "SteamGameServer010",
      "SteamGameServerStats001",
      "SteamUser016",
      "SteamFriends009",
      "SteamUtils005",
      "SteamMatchMaking008",
      "SteamMatchMakingServers002",
      "STEAMUSERSTATS_INTERFACE_VERSION010",
      "STEAMAPPS_INTERFACE_VERSION004",
      "SteamNetworking005",
      "STEAMREMOTESTORAGE_INTERFACE_VERSION004",
      "STEAMSCREENSHOTS_INTERFACE_VERSION001",
      "STEAMHTTP_INTERFACE_VERSION001",
      "SteamMasterServerUpdater001"
    ];
    Context.WriteTextFile(interfaces, lines);
  }

  if (steam == "Yes") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      //ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};