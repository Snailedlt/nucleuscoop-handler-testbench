Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed May 01 2024 21:48:04 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yvbaF3b7SAy4hcHPN";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["60", "30", "45", "120", "144", "240", "300"];
Game.AddOption("Select the FPS cap that instances will use:", "", "Fps", answers1);

Game.KillMutex = ["Project CARS"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.DirExclusions = ["steam_settings"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet";
Game.SteamID = "234630";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "pCARS64.exe";
Game.GUID = "Project CARS";
Game.GameName = "Project CARS";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.LauncherTitle = "";
Game.HookFocus = true;
Game.PreventWindowDeactivation = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Project CARS";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "Project CARS";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\234630\\local";
Game.UserProfileSavePathNoCopy = true;
Game.Description = "Wait until all instances have resized and respositioned. You might want to mute music for all but one player. Host an online game with one player and join with the rest.";
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

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = false;
Game.ProtoInput.SendMouseButtonMessages = false;
Game.ProtoInput.SendMouseMovementMessages = false;
Game.ProtoInput.SendKeyboardButtonMessages = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
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
  var fps = Context.Options["Fps"];

  Context.StartArguments = "-novr -windowed -fpscap " + fps + " -windowsize " + Context.Width + "," + Context.Height;

  var intPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient014",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(intPath, lines);

  var filePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlcPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    '242201 = "SteamDB Unknown App 242201"',
    '242202 = "SteamDB Unknown App 242202"',
    '242203 = "SteamDB Unknown App 242203"',
    '242204 = "SteamDB Unknown App 242204"',
    '242205 = "SteamDB Unknown App 242205"',
    '242206 = "SteamDB Unknown App 242206"',
    '334770 = "Project CARS - Limited Edition Upgrade"',
    '334771 = "Project CARS - Modified Car Pack"',
    '334772 = "Project CARS - Racing Icons Car Pack"',
    '334773 = "Project CARS - Audi Ruapuna Speedway Expansion Pack"',
    '334774 = "Project CARS - Old Vs New Car Pack"',
    '334780 = "Project CARS - Stanceworks Track Expansion"',
    '334781 = "Project CARS - Aston Martin Track Expansion"',
    '334782 = "Project CARS - Classic Lotus Track Expansion"',
    '334790 = "Project CARS - Japanese Car Pack"',
    '334791 = "Project CARS - Renault Sport Car Pack"',
    '334792 = "Project CARS - Pagani Nќrburgring Combined Track Expansion"',
    '334793 = "Project CARS - US Race Car Pack"',
    '334800 = "SteamDB Unknown App 334800"',
    '372900 = "Project CARS - Logitech Liveries"',
    '400440 = "SteamDB Unknown App 400440 (Project CARS eSports Package)"'
  ];
  Context.WriteTextFile(dlcPath, lines);

  if (System.IO.File.Exists(Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\graphicsconfigdx11.xml")) {
    var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\graphicsconfigdx11.xml";
    var dict = [
      Context.FindLineNumberInTextFile(cfgPath, '        <prop name="Windowed" windowed=', Nucleus.SearchType.StartsWith) + '|        <prop name="Windowed" windowed="1" />',
      Context.FindLineNumberInTextFile(cfgPath, '        <prop name="Mode" adapter=', Nucleus.SearchType.StartsWith) +
        '|        <prop name="Mode" adapter="0" width="' +
        Context.Width +
        '" height="' +
        Context.Height +
        '" refresh_num="60" refresh_dem="1" />'
    ];
    Context.ReplaceLinesInTextFile(cfgPath, dict);
  }
};