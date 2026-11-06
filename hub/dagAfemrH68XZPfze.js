Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Jun 05 2024 04:20:23 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "dagAfemrH68XZPfze";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.KillMutex = ["FireflyStronghold2"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.UseGoldberg = true;
Game.GoldbergNoWarning = true;
Game.SteamID = "40960";
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Stronghold2.exe";
Game.GUID = "Stronghold 2";
Game.GameName = "Stronghold 2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Stronghold 2";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "Stronghold 2";
Game.DocumentsSavePath = "Stronghold 2\\Saves";
Game.Description =
  "The steam version of this game disabled AI in multiplayer, you can renable it by installing this mod: https://github.com/WilliamVenner/stronghold2-ultimate-multiplayer-ai-patch \n\nMouse camera movement does not work properly when using this handler, so use the keyboard instead. \n\nWait until setup is complete before pressing END to lock input and allow each player to use their own cursor. Host a multiplayer game with one instance and join with the rest. You can press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and all of its instances.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 15;
Game.PauseBetweenStarts = 10;

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
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient016",
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
    "STEAMUGC_INTERFACE_VERSION003",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_002",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);

  var xmlPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Stronghold2.GraphicsSettings.xml";
  var dict = [
    Context.FindLineNumberInTextFile(xmlPath, "	<resolution width=", Nucleus.SearchType.StartsWith) +
      '|	<resolution width="' +
      Context.Width +
      '" height="' +
      Context.Height +
      '" format="X8R8G8B8" refreshRate="60"/>',
    Context.FindLineNumberInTextFile(xmlPath, "	<windowed enabled=", Nucleus.SearchType.StartsWith) + '|	<windowed enabled="true"/>',
    Context.FindLineNumberInTextFile(xmlPath, "	<settingsDialog enabled=", Nucleus.SearchType.StartsWith) + '|	<settingsDialog enabled="false"/>',
    Context.FindLineNumberInTextFile(xmlPath, "	<gfxLevel value=", Nucleus.SearchType.StartsWith) + '|	<gfxLevel value="5"/>'
  ];
  Context.ReplaceLinesInTextFile(xmlPath, dict);

  var cfgPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\config.dat";
  var cfgPkgOrigin = System.IO.Path.Combine(Game.Folder, "p" + Context.PlayerID + ".dat");
  System.IO.File.Copy(cfgPkgOrigin, cfgPath, true);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};