Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Jun 05 2024 03:54:27 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "MxoS4n2oCwGRYJp9Q";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.KillMutex = ["{05ab566b-aeac-4746-8eec-1afff1b6d268}"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.UseGoldberg = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet";
Game.SteamID = "47400";
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Stronghold3.exe";
Game.BinariesFolder = "bin\\win32_release";
Game.GUID = "Stronghold 3";
Game.GameName = "Stronghold 3";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.ToggleUnfocusOnInputsLock = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Stronghold 3";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.DocumentsConfigPath = "Stronghold 3";
Game.DocumentsSavePath = "Stronghold 3\\Saved Games";
Game.Description =
  "Wait until setup is complete before pressing END to lock input and allow each player to use their own cursor. Ignore the prompt to make an account. Host a multiplayer game with one instance and join with the rest. You can press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and all of its instances.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenStarts = 15;

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
  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\win32_release\\steam_interfaces.txt";
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

  var xmlPath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\Profiles\\options.xml";
  var dict = [
    Context.FindLineNumberInTextFile(xmlPath, "    <graphics ssao=", Nucleus.SearchType.StartsWith) +
      '|    <graphics ssao="3" dof="true" terrain_detail="3" terrain_shader="3" terrain_detail_textures="true" rim_light="true" bloom="2" tone_mapping="true" lod_scaling="2" dynamic_lights="true" vertical_sync="false" shadow_quality="2" particle_detail="2" water_detail="1" texture_detail="3" overall="4" x_res="' +
      Context.Width +
      '" y_res="' +
      Context.Height +
      '" fullscreen="false" />'
  ];
  Context.ReplaceLinesInTextFile(xmlPath, dict);

  if (Context.PlayerID > 0) {
    Context.FindLineNumberInTextFile(xmlPath, "    <sound master_vol=", Nucleus.SearchType.StartsWith) +
      '|    <sound master_vol="90" music_vol="0" sfx_vol="90" speech_vol="60" master_on="true" music_on="true" sfx_on="true" speech_on="true" subtitles_on="true" />';
  } else {
    Context.FindLineNumberInTextFile(xmlPath, "    <sound master_vol=", Nucleus.SearchType.StartsWith) +
      '|    <sound master_vol="90" music_vol="90" sfx_vol="90" speech_vol="60" master_on="true" music_on="true" sfx_on="true" speech_on="true" subtitles_on="true" />';
  }
  Context.ReplaceLinesInTextFile(xmlPath, dict);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};