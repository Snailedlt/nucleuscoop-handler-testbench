Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Apr 24 2024 03:44:26 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "fKTsxbuNufE9cioc8";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

Game.KillMutex = ["ETQW"];
Game.ExecutableName = "etqw.exe";
Game.KillProcessesOnClose = ["serverlauncher", "etqwded"];
Game.FileSymlinkExclusions = ["autoexec.cfg"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SteamID = "10000";
Game.GUID = "Enemy Territory Quake Wars";
Game.GameName = "Enemy Territory: Quake Wars";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 32;
Game.MaxPlayers = 32;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsPositioning = true;
Game.ResetWindows = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ETQW";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.UserProfileConfigPath = "AppData\\Local\\id Software\\Enemy Territory - QUAKE Wars\\sdnet";
Game.UserProfileConfigPathNoCopy = true;
Game.DocumentsSavePath = "Documents\\id Software\\Enemy Territory - QUAKE Wars";
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "When you start the handler it will open up the server launcher, set LAN Server to True, Punkbuster to False, and Team Balance to False if you want to choose your team freely. Enable bots by raising Minimum Clients setting. Change any other settings to your liking, first launch it may ask you to save and name your server config. Start the server before clicking OK on the Nucleus prompt to open the instances. Alt-tab and use the mouse to join the server and edit preferences for gamepad instances while input is unlocked. You can press END to lock input and grant keyboard players their own cursor. Press END again to unlock input. While input is unlocked you can press CTRL+Q to close Nucleus and its instances.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 10;
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
  if (Context.IsKeyboardPlayer) {
    var iM = '"1"';
  } else {
    var iM = '"0"';
  }

  if (Context.PlayerID == 0) {
    var savePath = Context.RootInstallFolder + "\\serverlauncher.exe";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "serverlauncher.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.RootInstallFolder + "\\etqwded.exe";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "etqwded.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var mV = "0";
  } else {
    var mV = "-59";
  }

  Context.RunAdditionalFiles([Context.RootInstallFolder + "\\serverlauncher.exe"], false, 0, false, true);

  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\" + Context.Nickname);
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.DocumentsSavePath + "\\base");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.DocumentsSavePath + "\\sdnet\\" + Context.Nickname + "\\base");
  System.IO.Directory.CreateDirectory(filePath);

  if (Context.AspectRatioDecimal > 1.8) {
    var rV = '"9"';
    var rH = '"32"';
  } else if (Context.AspectRatioDecimal < 1.3) {
    var rV = '"9"';
    var rH = '"8"';
  } else {
    var rV = '"9"';
    var rH = '"16"';
  }

  var basePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\" + Context.Nickname + "\\base.dict";
  var baseLines = ["userProperties {", "	properties {", '		"default"	"1"', "	}", "}"];
  Context.WriteTextFile(basePath, baseLines);

  var usrPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\" + Context.Nickname + "\\user.dat";
  var usrLines = ["userInfo {", '	username "' + Context.Nickname + '"', "	account {", '		username ""', "	}", "}"];
  Context.WriteTextFile(usrPath, usrLines);

  /*var cfgPath = Context.EnvironmentPlayer + Context.DocumentsSavePath + "\\base\\etqwconfig.cfg";
  if (!System.IO.File.Exists(Context.EnvironmentPlayer + Context.DocumentsSavePath + "\\base\\etqwconfig.cfg")) {
	var cfgLines = [
	];
	Context.WriteTextFile(cfgPath, cfgLines);
  }*/

  Context.StartArguments =
    "+set g_skipintro 1 +set pm_skipBob 0 +set gui_invertMenuPitch 1 +set r_customHeight " +
    Context.Height +
    " +set r_customWidth " +
    Context.Width +
    " +set r_customAspectRatioV " +
    rV +
    " +set r_customAspectRatioH " +
    rH +
    " +set r_aspectRatio -1 +set bse_simple 0 +set bse_detailLevel 1.0 +set r_multiSamples 16 +set com_gpuSpec 3 +set com_machineSpec 2 +set s_maxSoundsPerShader 0 +set r_megaTilesPerSecond 9999 +set r_detailTexture 1 +set r_visDistMult 1 +set r_shaderQuality 0 +set r_useDitherMask 1 +set r_useAlphaToCoverage 1 +set r_megaDrawMethod 0 +set r_softParticles 1 +set r_stuffCacheMegs 32 +set r_skipStuff 0 +set r_stuffFadeEnd 4500 +set r_stuffFadeStart 4000 +set r_MD5LodScale 3.4 +set image_specularPicMip 1 +set image_diffusePicMip 1 +set image_bumpPicMip 1 +set image_anisotropy 8 +set r_renderProgramLodDistance 200 +set com_lastCPULevel 2 +set com_lastCPUDetailLevel 2 +set g_maxTransportDebrisExtraHigh 8 +set g_maxTransportDebrisHigh 8 +set g_maxTransportDebrisMedium 8 +set g_maxTransportDebrisLow 8 +set g_transportDebrisExtraHighCutoff 8192 +set g_transportDebrisHighCutoff 4096 +set g_transportDebrisMediumCutoff 2048 +set g_transportDebrisLowCutoff 1024 +set com_lastGraphicsLevel 2 +set com_lastGraphicsDetailLevel 2 +set com_lastLightingLevel 2 +set com_lastFoliageLevel 2 +set g_showPlayerShadow 1";

  var bindPath = Context.EnvironmentPlayer + Context.DocumentsSavePath + "\\sdnet\\" + Context.Nickname + "\\base\\bindings.cfg";
  var bindLines = [
    "// *********************************************************",
    "// This file is managed by ETQW and will be",
    "// overwritten when logging in and out",
    "// Any custom commands or bindings should be put into 'autoexec.cfg'",
    "// in the same folder as this file",
    "// *********************************************************",
    "",
    "unbindall",
    'bind "w" "_forward" "" "default"',
    'bind "s" "_back" "" "default"',
    'bind "a" "_moveleft" "" "default"',
    'bind "d" "_moveright" "" "default"',
    'bind "x" "_prone" "" "default"',
    'bind "SPACE" "_moveup" "" "default"',
    'bind "c" "_movedown" "" "default"',
    'bind "q" "_leanleft" "" "default"',
    'bind "e" "_leanright" "" "default"',
    'bind "SHIFT" "_sprint" "" "default"',
    'bind "CTRL" "_speed" "" "default"',
    'bind "1" "_weapon0" "" "default"',
    'bind "2" "_weapon1" "" "default"',
    'bind "3" "_weapon2" "" "default"',
    'bind "4" "_weapon3" "" "default"',
    'bind "5" "_weapon4" "" "default"',
    'bind "6" "_weapon5" "" "default"',
    'bind "7" "useWeapon weapon_binocs" "" "default"',
    'bind "MOUSE2" "_altattack" "" "default"',
    'bind "MWHEELDOWN" "_weapnext" "" "default"',
    'bind "MWHEELUP" "_weapprev" "" "default"',
    'bind "r" "_reload" "" "default"',
    'bind "f" "_activate" "" "default"',
    'bind "b" "useWeapon weapon_binocs" "" "default"',
    'bind "g" "_usevehicle" "" "default"',
    'bind "CAPSLOCK" "_tophat" "" "default"',
    'bind "h" "_modeswitch" "" "default"',
    'bind "-" "_stroyDown" "" "default"',
    'bind "+" "_stroyUp" "" "default"',
    'bind "F1" "vote y" "" "default"',
    'bind "F2" "vote n" "" "default"',
    'bind "," "zoomOutCommandMap" "" "default"',
    'bind "." "zoomInCommandMap" "" "default"',
    'bind "o" "_showWayPoints" "" "default"',
    'bind "p" "toggle g_showWayPoints 0 1" "" "default"',
    'bind "ALT" "_showFireTeam" "" "default"',
    'bind "t" "clientMessageMode" "" "default"',
    'bind "y" "clientMessageMode 1" "" "default"',
    'bind "u" "clientMessageMode 2" "" "default"',
    'bind "v" "_context" "" "default"',
    'bind "MOUSE3" "_quickchat" "" "default"',
    'bind "F3" "_ready" "" "default"',
    'bind "TAB" "_showScores" "" "default"',
    'bind "m" "_taskmenu" "" "default"',
    'bind "n" "_commandmap" "" "default"',
    'bind "l" "_limbomenu" "" "default"',
    'bind "k" "_votemenu" "" "default"',
    'bind "KP_ENTER" "_fireteam" "" "default"',
    'bind "z" "_fireteamVoice" "" "default"',
    'bind "i" "_fireteamVoice" "" "default"',
    'bind "F5" "clientTeam gdf" "" "default"',
    'bind "F6" "clientTeam strogg" "" "default"',
    'bind "F7" "clientTeam spectator" "" "default"',
    'bind "F11" "screenshot" "" "default"',
    'bind "F12" "toggleNetDemo" "" "default"',
    'bind "KP_INS" "_vehiclecamera" "" "default"',
    'bind "joy1_RIGHT_TRIGGER" "_attack" "" "default"',
    'bind "MOUSE1" "_attack" "" "default"',
    'bind "joy1_LEFT_TRIGGER" "_altattack" "" "default"',
    'bind "joy1_LEFT_TRIGGER" "_speed" "" "vehicle"',
    'bind "joy1_3" "_reload" "" "default"',
    'bind "joy1_3" "_modeswitch" "" "vehicle"',
    'bind "joy1_4" "_weapnext" "" "default"',
    'bind "joy1_1" "_moveup" "" "default"',
    'bind "joy1_2" "_movedown" "" "default"',
    'bind "joy1_7" "_vehiclecamera" "" "vehicle"',
    'bind "joy1_7" "_ready" "" "default"',
    'bind "joy1_5" "_sprint" "" "default"',
    'bind "joy1_6" "_weapon0" "" "default"',
    'bind "joy1_DPAD_LEFT" "_leanleft" "" "default"',
    'bind "joy1_DPAD_RIGHT" "_leanright" "" "default"',
    'bind "joy1_DPAD_DOWN" "_activate" "" "default"',
    'bind "joy1_8" "_taskmenu" "" "default"',
    'bind "joy1_10" "_commandmap" "" "default"',
    'bind "joy1_DPAD_UP" "_usevehicle" "" "default"',
    'bind "joy1_9" "_limbomenu" "" "default"',
    'bind "joy1_9" "_menuAccept" "" "menu"',
    'bind "TAB" "_menuNavForward" "" "menu"',
    'bind "TAB" "_menuNavBackward" "SHIFT" "menu"',
    'bind "TAB" "_menuNavBackward" "RIGHTSHIFT" "menu"',
    'bind "ESCAPE" "_menuCancel" "" "menu"',
    'bind "ENTER" "_menuAccept" "" "menu"',
    'bind "joy1_RIGHT_TRIGGER" "_menuClick" "" "menu"',
    'bind "ENTER" "_menuNewline" "CTRL" "menu"',
    'bind "ENTER" "_menuNewline" "RIGHTCTRL" "menu"',
    'bind "KP_ENTER" "_menuAccept" "" "menu"',
    'bind "joy1_1" "_menuClick" "" "menu"',
    'bind "ESCAPE" "_menuCancel" "" "bindmenu"',
    'bind "joy1_11" "_menuCancel" "" "bindmenu"',
    'bind "joy1_2" "_menuCancel" "" "menu"'
  ];
  Context.WriteTextFile(bindPath, bindLines);

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\base\\autoexec.cfg";
  //var autoPath = Context.EnvironmentPlayer + Context.DocumentsSavePath + "\\sdnet\\" + Context.Nickname + "\\base\\autoexec.cfg";
  var cfgLines = [
    'seta in_joy4_device "232429"',
    'seta in_joy3_device "232429"',
    'seta in_joy2_device "232429"',
    'seta in_joy1_device "232429"',
    'seta net_clientPunkbusterEnabled "0"',
    "seta com_allowconsole “1”",
    'seta win_allowMultipleInstances "1"',
    "seta com_unlockFPS “1”",
    "seta com_unlock_timingMethod “2”",
    'seta com_unlock_maxFPS "60"',
    'seta ui_name "' + Context.Nickname + '"',
    'seta pm_skipBob "1"',
    "in_mouse " + iM,
    "seta s_volumeMusic_dB " + mV,
    'seta r_useThreadedRenderer "2"',
    'seta r_useStateCaching "0"',
    'seta r_fullscreen "0"',
    'seta r_mode "-1"',
    'seta r_noborder "1"',
    'seta r_centerWindow "0"',
    'seta r_customheight "' + Context.Height + '"',
    'seta r_customwidth "' + Context.Width + '"',
    "seta r_customAspectRatioV " + rV,
    "seta r_customAspectRatioH " + rH,
    'seta r_aspectRatio "-1"',
    "",
    'seta m_helicopterPitch "-0.022"',
    'seta in_hovertank_side_power "1"',
    'seta in_hovertank_side_offset "0"',
    'seta in_hovertank_side_invert "0"',
    'seta in_hovertank_side_speed "140"',
    'seta in_hovertank_side_deadZone "0.2"',
    'seta in_hovertank_side_axis "-1"',
    'seta in_hovertank_side_joy "1"',
    'seta in_hovertank_yaw_power "4"',
    'seta in_hovertank_yaw_offset "0"',
    'seta in_hovertank_yaw_invert "1"',
    'seta in_hovertank_yaw_speed "80"',
    'seta in_hovertank_yaw_deadZone "0.2"',
    'seta in_hovertank_yaw_axis "2"',
    'seta in_hovertank_yaw_joy "1"',
    'seta in_hovertank_pitch_power "4"',
    'seta in_hovertank_pitch_offset "0"',
    'seta in_hovertank_pitch_invert "0"',
    'seta in_hovertank_pitch_speed "53.3"',
    'seta in_hovertank_pitch_deadZone "0.2"',
    'seta in_hovertank_pitch_axis "3"',
    'seta in_hovertank_pitch_joy "1"',
    'seta in_hovertank_turn_power "1"',
    'seta in_hovertank_turn_offset "0"',
    'seta in_hovertank_turn_invert "0"',
    'seta in_hovertank_turn_speed "140"',
    'seta in_hovertank_turn_deadZone "0.2"',
    'seta in_hovertank_turn_axis "0"',
    'seta in_hovertank_turn_joy "1"',
    'seta in_hovertank_forward_power "1"',
    'seta in_hovertank_forward_offset "0"',
    'seta in_hovertank_forward_invert "1"',
    'seta in_hovertank_forward_speed "140"',
    'seta in_hovertank_forward_deadZone "0.2"',
    'seta in_hovertank_forward_axis "1"',
    'seta in_hovertank_forward_joy "1"',
    'seta in_heli_side_power "1"',
    'seta in_heli_side_offset "0"',
    'seta in_heli_side_invert "1"',
    'seta in_heli_side_speed "140"',
    'seta in_heli_side_deadZone "0.2"',
    'seta in_heli_side_axis "2"',
    'seta in_heli_side_joy "1"',
    'seta in_heli_forward_power "1"',
    'seta in_heli_forward_offset "0"',
    'seta in_heli_forward_invert "0"',
    'seta in_heli_forward_speed "53.3"',
    'seta in_heli_forward_deadZone "0.2"',
    'seta in_heli_forward_axis "3"',
    'seta in_heli_forward_joy "1"',
    'seta in_heli_yaw_power "1"',
    'seta in_heli_yaw_offset "0"',
    'seta in_heli_yaw_invert "0"',
    'seta in_heli_yaw_speed "80"',
    'seta in_heli_yaw_deadZone "0.2"',
    'seta in_heli_yaw_axis "0"',
    'seta in_heli_yaw_joy "1"',
    'seta in_heli_throttle_power "1"',
    'seta in_heli_throttle_offset "0"',
    'seta in_heli_throttle_invert "1"',
    'seta in_heli_throttle_speed "140"',
    'seta in_heli_throttle_deadZone "0.2"',
    'seta in_heli_throttle_axis "1"',
    'seta in_heli_throttle_joy "1"',
    'seta in_car_yaw_power "4"',
    'seta in_car_yaw_offset "0"',
    'seta in_car_yaw_invert "1"',
    'seta in_car_yaw_speed "80"',
    'seta in_car_yaw_deadZone "0.2"',
    'seta in_car_yaw_axis "2"',
    'seta in_car_yaw_joy "1"',
    'seta in_car_pitch_power "4"',
    'seta in_car_pitch_offset "0"',
    'seta in_car_pitch_invert "0"',
    'seta in_car_pitch_speed "53.3"',
    'seta in_car_pitch_deadZone "0.2"',
    'seta in_car_pitch_axis "3"',
    'seta in_car_pitch_joy "1"',
    'seta in_car_steering_power "1"',
    'seta in_car_steering_offset "0"',
    'seta in_car_steering_invert "0"',
    'seta in_car_steering_speed "140"',
    'seta in_car_steering_deadZone "0.2"',
    'seta in_car_steering_axis "0"',
    'seta in_car_steering_joy "1"',
    'seta in_car_throttle_power "1"',
    'seta in_car_throttle_offset "0"',
    'seta in_car_throttle_invert "1"',
    'seta in_car_throttle_speed "140"',
    'seta in_car_throttle_deadZone "0.2"',
    'seta in_car_throttle_axis "1"',
    'seta in_car_throttle_joy "1"',
    'seta in_player_side_power "1"',
    'seta in_player_side_offset "0"',
    'seta in_player_side_invert "0"',
    'seta in_player_side_speed "140"',
    'seta in_player_side_deadZone "0.2"',
    'seta in_player_side_axis "0"',
    'seta in_player_side_joy "1"',
    'seta in_player_forward_power "1"',
    'seta in_player_forward_offset "0"',
    'seta in_player_forward_invert "1"',
    'seta in_player_forward_speed "140"',
    'seta in_player_forward_deadZone "0.2"',
    'seta in_player_forward_axis "1"',
    'seta in_player_forward_joy "1"',
    'seta in_player_yaw_power "4"',
    'seta in_player_yaw_offset "0"',
    'seta in_player_yaw_invert "1"',
    'seta in_player_yaw_speed "80"',
    'seta in_player_yaw_deadZone "0.1"',
    'seta in_player_yaw_axis "2"',
    'seta in_player_yaw_joy "1"',
    'seta in_player_pitch_power "4"',
    'seta in_player_pitch_offset "0"',
    'seta in_player_pitch_invert "0"',
    'seta in_player_pitch_speed "53.3"',
    'seta in_player_pitch_deadZone "0.1"',
    'seta in_player_pitch_axis "3"',
    'seta in_player_pitch_joy "1"'
  ];
  Context.WriteTextFile(cfgPath, cfgLines);
  //Context.WriteTextFile(autoPath, cfgLines);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};