Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 18 2024 12:01:49 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "8xpgXY9FX2h7pZG6s";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.ExecutableContext = ["Data"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "frzlunky_save.sav", "frzlunky_save.bak", "spelunky_save.sav", "spelunky_save.bak", "Frozlunky.exe"];
Game.FileSymlinkCopyInstead = ["config.txt"];
Game.BackupFiles = ["frzlunky_save.sav"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.GameName = "Spelunky";
Game.GUID = "Spelunky";
Game.SteamID = "239350";
Game.ExecutableName = "Spelunky.exe";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 2;
Game.MaxPlayers = 2;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Spelunky";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  'Requires Spelunky Steam edition version 1.4 (you can downgrade via the "betas" tab in Spelunky properties on Steam).\n\nThe game already has native local co-op for 4 players, but this allows up to 2 players to have their own seperate screen or monitor.\n\nConfigure Frozlunky netplay for each instance before opening the next, set your selection to "Achievements" in a game instance before clicking netplay on the Frozlunky window. You may want to disable music for everyone but the first instance to prevent annoying overlap. Make sure to check "Enable own camera" for all. Set up the first instance as the host by clicking on host, buf should be set accordingly, higher buffer will introduce more input latency and lower buffer will introduce run breaking desync. I recommend 2-4 unless you experience consistant desync in which case raise as necessary. On the second instance just click connect to join the host, no need to write anything in the host field. Once both instances are connected you can click the final prompt, the host will control both instances, this is normal until you select the gamemode after which you can both join and select your character before starting the game.\n\nConnecting the instances is possible via Frozlunky: https://sashavol.github.io/Frozlunky/ (included in the handler).';
Game.PromptBetweenInstances = true;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 25;

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

Game.SupportsMultipleKeyboardsAndMice = false;

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

Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "Spelunky.exe"), System.IO.Path.Combine(Context.RootFolder, "Spelunk" + (Context.PlayerID + 1) + ".exe"), true);

  Game.ExecutableToLaunch = "Spelunk" + (Context.PlayerID + 1) + ".exe";

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  var lines = ["@echo off", "echo Waiting to start Frozlunky for " + Context.Nickname + "", "timeout /t 20 /nobreak > NUL", "start Frozlunky.exe"];
  Context.WriteTextFile(Bat, lines);

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config.txt";
  var lines = [
    "Windowed:",
    "1",
    "Screen_Width:",
    Context.Width,
    "Screen_Height:",
    Context.Height,
    "Language:",
    "0",
    "Fullscreen_Effects:",
    "2",
    "Dynamic_Shadows:",
    "1",
    "Pro_HUD:",
    "0",
    "Preferred_Refresh_Rate:",
    "0"
  ];
  Context.WriteTextFile(cfgPath, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Frozlunky.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Frozlunky.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
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
    "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.PlayerID == 0) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
      [0x53, 0x70, 0x65, 0x6c, 0x75, 0x6e, 0x6b, 0x79, 0x2e, 0x65, 0x78, 0x65],
      [0x53, 0x70, 0x65, 0x6c, 0x75, 0x6e, 0x6b, 0x31, 0x2e, 0x65, 0x78, 0x65]
    );
  }

  if (Context.PlayerID == 1) {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
      System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
      [0x53, 0x70, 0x65, 0x6c, 0x75, 0x6e, 0x6b, 0x79, 0x2e, 0x65, 0x78, 0x65],
      [0x53, 0x70, 0x65, 0x6c, 0x75, 0x6e, 0x6b, 0x32, 0x2e, 0x65, 0x78, 0x65]
    );
  }

  /*if (Context.PlayerID == 2) {
	Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
	System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
	[ 0x53, 0x70, 0x65, 0x6C, 0x75, 0x6E, 0x6B, 0x79, 0x2E, 0x65, 0x78, 0x65 ],
	[ 0x53, 0x70, 0x65, 0x6C, 0x75, 0x6E, 0x6B, 0x33, 0x2E, 0x65, 0x78, 0x65 ]);
  }

  if (Context.PlayerID == 3) {
	Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
	System.IO.Path.Combine(Context.RootFolder, "Frozlunky.exe"),
	[ 0x53, 0x70, 0x65, 0x6C, 0x75, 0x6E, 0x6B, 0x79, 0x2E, 0x65, 0x78, 0x65 ],
	[ 0x53, 0x70, 0x65, 0x6C, 0x75, 0x6E, 0x6B, 0x34, 0x2E, 0x65, 0x78, 0x65 ]);
  }*/

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat"], false, "" + Context.Nickname + " Click OK.", 0, false, false, false, false);
};