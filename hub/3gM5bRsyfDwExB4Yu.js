Hub.Handler.Version = 12; // Released at https://hub.splitscreen.me/ on Mon Mar 10 2025 22:18:52 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "3gM5bRsyfDwExB4Yu";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["InvScaled", "NoScaled", "Scaled"];
var answers3 = ["-Windowed", "-WindowedFullscreen", "-Fullscreen"];
var answers4 = ["No", "Yes"];
Game.AddOption(
  "Launch all instances under your Steam account?",
  "Only use if you want to unlock Steam achievements or are using UCP for mods. Disconnect from the internet for faster startup.",
  "Steam",
  answers1
);
Game.AddOption("Window Size Scale", "ONLY change if the instances are not opening already correctly resized for you.", "Scale", answers2);
Game.AddOption(
  "Window Type",
  "Windowed only works correctly at 100% display scale in split-screen. WindowedFullscreen can work at higher display scales % but keyboard/mouse instances have offset at certain sizes. Fullscreen uses a D3D9 wrapper for fake borderless windowed.",
  "Wtype",
  answers3
);
Game.AddOption(
  "Disable keyboards/mice support?",
  "Fully disables Proto Input hooks for keyboards/mice so you can play with only one kb/mouse with the instance focused. ONLY use if the mkbs support is not working correctly for you or crashing the game, click on the kb instance or alt-tab to it and don't lock the input with End.",
  "Hooks",
  answers4
);

Game.DirSymlinkExclusions = ["Binaries\\Win32\\settings"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "APEX_Clothing_Legacy_x86.dll",
  "APEX_Clothing_x86.dll",
  "APEX_Destructible_Legacy_x86.dll",
  "APEX_Destructible_x86.dll",
  "ApexFramework_x86.dll",
  "bifrost.dll",
  "bink2w32.dll",
  "binkw32.dll",
  "cudart.dll",
  "cudart32_30_9.dll",
  "cudart32_41_22.dll",
  "dbghelp.dll",
  "EasyHook32.dll",
  "fbxsdk_20113_1.dll",
  "fbxsdk_20113_1d.dll",
  "Launcher.Content.dll",
  "Launcher.exe",
  "Launcher.exe.config",
  "Microsoft.Xna.Framework.dll",
  "nvtt.dll",
  "NxCharacter.dll",
  "OverlayLayout",
  "overlaylocs",
  "OverlayLocs.txt",
  "PhysXCooking.dll",
  "PhysXCore.dll",
  "PhysXDevice.dll",
  "PhysXExtensions.dll",
  "PhysXLoader.dll",
  "protobuf-net.dll",
  "protobuf-net.xml",
  "SteamWrapper.dll",
  "Patch.txt",
  "PatchOffline.txt",
  "python-sdk.log"
];
Game.GameName = "Borderlands The Pre-Sequel";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "BorderlandsPreSequel.exe";
Game.SteamID = "261640";
Game.GUID = "Borderlands The Pre-Sequel";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Binaries\\Win32";
Game.UseGoldberg = true;
Game.LauncherTitle = "splashscreen";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Borderlands: The Pre-Sequel (32-bit, DX9)";
Game.IgnoreWindowBorderCheck = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "Documents\\My Games\\Borderlands The Pre-Sequel\\WillowGame\\SaveData";
//Game.UserProfileConfigPath = "Documents\\My Games\\Borderlands The Pre-Sequel\\WillowGame\\Config";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Steam version only. Go to network options, network mode and select LAN in each instance, then use the find games option to join the other players. If you use keyboards/mice after you are in-game press the END key once to lock the input for all instances to have their own working cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input whe you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 12;
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
Game.ProtoInput.SetWindowPosHook = false;
Game.ProtoInput.SetWindowStyleHook = false;

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
  var savePath = Context.NucleusUserRoot + "\\Documents\\My Games\\Borderlands The Pre-Sequel\\WillowGame\\Config\\WillowEngine.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "WindowedFullscreen", Context.IsFullscreen),
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("WillowGame.WillowGameEngine", "bPauseLostFocusWindowed", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bMuteAudioWhenNotInFocus", false),
    new Nucleus.IniSaveInfo("Engine.Engine", "bPauseOnLossOfFocus", false),
    new Nucleus.IniSaveInfo("WillowGame.WillowGameEngine", "bMuteAudioWhenNotInFocus", false)
  ]);

  var steam = Context.Options["Steam"];
  var scale = Context.Options["Scale"];
  var wtype = Context.Options["Wtype"];
  var hooks = Context.Options["Hooks"];

  if (scale == "InvScaled") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;
  }

  if (scale == "Scaled") {
    Context.DPIHandling = Nucleus.DPIHandling.Scaled;
  }

  if (scale == "NoScaled") {
  }

  if (wtype == "-Windowed") {
    Game.RefreshWindowAfterStart = true;
    Game.ProtoInput.SetWindowPosHook = true;
    Game.ProtoInput.SetWindowStyleHook = true;
  }

  if (wtype == "-Fullscreen") {
    System.IO.File.Copy(Context.NucleusFolder + "\\utils\\DirectXWrapper\\d3d9.dll", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\d3d9.dll", true);
  }

  var args = " -AlwaysFocus -nosplash -nomoviestartup" + " -ResX= " + Context.Width + " -ResY= " + Context.Height + " -WindowPosX= " + Context.PosX + " -WindowPosY= " + Context.PosY;

  if (steam == "No") {
    var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\steam_interfaces.txt";
    var lines = [
      "SteamClient012",
      "SteamGameServer011",
      "SteamGameServerStats001",
      "SteamUser016",
      "SteamFriends013",
      "SteamUtils005",
      "SteamMatchMaking009",
      "SteamMatchMakingServers002",
      "STEAMUSERSTATS_INTERFACE_VERSION011",
      "STEAMAPPS_INTERFACE_VERSION005",
      "SteamNetworking005",
      "STEAMREMOTESTORAGE_INTERFACE_VERSION008",
      "STEAMSCREENSHOTS_INTERFACE_VERSION001",
      "STEAMHTTP_INTERFACE_VERSION001"
    ];
    Context.WriteTextFile(interfaces, lines);

    if (Context.IsKeyboardPlayer) {
      Context.StartArguments = wtype + " -NoController" + args;
    } else {
      Context.StartArguments = wtype + " -nomouse" + args;
    }
  }

  if (steam == "Yes") {
    var id = Context.PlayerID + 1;

    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.IsKeyboardPlayer) {
      Context.StartArguments = wtype + " -NoController -SaveDataId=" + id + args;
    } else {
      Context.StartArguments = wtype + " -nomouse -SaveDataId=" + id + args;
    }
  }

  if (hooks == "Yes") {
    Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
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

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

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