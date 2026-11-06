Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue May 14 2024 08:49:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "YcmvJAPhxYAjaDoDm";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Basic", "Enhanced", "Default"];
Game.AddOption("Choose your HUD style.", "Basic supports all aspect ratios. Enhanced supports 16:9 to 21:9. Default supports 4:3.", "Hud", answers1);

Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Classic Marathon.exe";
Game.GUID = "Marathon";
Game.GameName = "Marathon";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HookFocus = true;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Aleph One";
Game.CreateSingleDeviceFile = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\AlephOne";
Game.UserProfileConfigPathNoCopy = true;
Game.DocumentsSavePath = "AlephOne";
Game.Description =
  "Once all instances have repositioned and lost their borders, press END to lock input and grant keyboard players control. Gather a network game with one instance and join with the rest. The game window will resize once you enter the game. You can press END again to unlock input. Depending on your setup when you return to the menu as a keyboard player you may need to press CTRL+T twice while input is unlocked to be able to interact with menu elements with the mouse again. While input is unlocked you can press CTRL+Q to close Nucleus and all of it's instances.";
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
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowStyleHook = true;
Game.ProtoInput.SetWindowPosHook = true;

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
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-w -Q -j";
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.SetWindowHookStart = false;
  } else {
    Context.StartArguments = "-w -Q";
    Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
    Game.SetWindowHookStart = true;
  }

  var filePath = (Context.SavePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath);
  System.IO.Directory.CreateDirectory(filePath);

  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Marathon Preferences";
  var txtLines = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<mara_prefs version="20240510">',
    '  <graphics scmode_width="1600" scmode_height="900" scmode_auto_resolution="false" scmode_high_dpi="true" scmode_hud="true" scmode_hud_scale="2" scmode_term_scale="2" scmode_translucent_map="false" scmode_camera_bob="1" scmode_accel="1" scmode_highres="true" scmode_draw_every_other_line="false" scmode_fov="0" scmode_fullscreen="false" scmode_bitdepth="32" scmode_gamma="2" scmode_fix_h_not_v="true" ogl_flags="19073" software_alpha_blending="0" software_sdl_driver="0" fps_target="30" anisotropy_level="0" multisamples="0" wait_for_vsync="true" gamma_corrected_blending="false" use_npot="false" movie_export_video_quality="50" movie_export_video_bitrate="0" movie_export_audio_quality="50" scripted_effects_quality="2">',
    "    <void>",
    '      <color red="0" green="0" blue="0"/>',
    "    </void>",
    "    <landscapes>",
    '      <color index="0" red="1" green="1" blue="0.400000006"/>',
    '      <color index="1" red="0.200000003" green="0.600000024" blue="1"/>',
    '      <color index="2" red="0.0941176489" green="0.0941176489" blue="0.0627298355"/>',
    '      <color index="3" red="0.0313572884" green="0.0313572884" blue="0.0627298355"/>',
    '      <color index="4" red="0.400000006" green="0.400000006" blue="0.400000006"/>',
    '      <color index="5" red="0" green="0" blue="0"/>',
    '      <color index="6" red="0" green="0" blue="0"/>',
    '      <color index="7" red="0" green="0" blue="0"/>',
    "    </landscapes>",
    '    <texture index="0" near_filter="0" far_filter="5" max_size="0"/>',
    '    <texture index="1" near_filter="0" far_filter="1" max_size="0"/>',
    '    <texture index="2" near_filter="0" far_filter="5" max_size="0"/>',
    '    <texture index="3" near_filter="0" far_filter="1" max_size="0"/>',
    '    <texture index="4" near_filter="1" far_filter="5" max_size="0"/>',
    "  </graphics>",
    '  <player name="Zensuu" color="0" team="0" last_time_ran="0" difficulty="2" bkgd_music="false" crosshairs_active="false">',
    '    <chase_cam behind="1536" upward="0" rightward="0" flags="0" damping="0.5" spring="0" opacity="1"/>',
    '    <crosshairs thickness="3" from_center="2" length="1" shape="0" opacity="0.5">',
    '      <color red="1" green="1" blue="1"/>',
    "    </crosshairs>",
    "  </player>",
    '  <input device="1" modifiers="16" sens_horizontal="16384" sens_vertical="16384" classic_vertical_aim="false" classic_aim_speed_limits="false" mouse_accel_type="0" mouse_accel_scale="1" raw_mouse_input="true" extra_mouse_precision="true" controller_analog="true" controller_sensitivity="65536" controller_deadzone="3276">',
    '    <binding action="forward" pressed="w"/>',
    '    <binding action="forward" pressed="controller-ls-up"/>',
    '    <binding action="back" pressed="s"/>',
    '    <binding action="back" pressed="controller-ls-down"/>',
    '    <binding action="look-left" pressed="left"/>',
    '    <binding action="look-left" pressed="controller-rs-left"/>',
    '    <binding action="look-right" pressed="right"/>',
    '    <binding action="look-right" pressed="controller-rs-right"/>',
    '    <binding action="strafe-left" pressed="a"/>',
    '    <binding action="strafe-left" pressed="controller-ls-left"/>',
    '    <binding action="strafe-right" pressed="d"/>',
    '    <binding action="strafe-right" pressed="controller-ls-right"/>',
    '    <binding action="glance-left" pressed="q"/>',
    '    <binding action="glance-left" pressed="controller-left"/>',
    '    <binding action="glance-right" pressed="controller-right"/>',
    '    <binding action="look-up" pressed="up"/>',
    '    <binding action="look-up" pressed="controller-rs-up"/>',
    '    <binding action="look-down" pressed="down"/>',
    '    <binding action="look-down" pressed="controller-rs-down"/>',
    '    <binding action="look-ahead" pressed="v"/>',
    '    <binding action="look-ahead" pressed="controller-rs"/>',
    '    <binding action="prev-weapon" pressed="f"/>',
    '    <binding action="prev-weapon" pressed="mouse-scroll-down"/>',
    '    <binding action="prev-weapon" pressed="controller-lb"/>',
    '    <binding action="next-weapon" pressed="r"/>',
    '    <binding action="next-weapon" pressed="mouse-scroll-up"/>',
    '    <binding action="next-weapon" pressed="controller-rb"/>',
    '    <binding action="trigger-1" pressed="space"/>',
    '    <binding action="trigger-1" pressed="mouse-left"/>',
    '    <binding action="trigger-1" pressed="controller-rt"/>',
    '    <binding action="trigger-2" pressed="mouse-right"/>',
    '    <binding action="trigger-2" pressed="controller-lt"/>',
    '    <binding action="strafe" pressed="lalt"/>',
    '    <binding action="run" pressed="lshift"/>',
    '    <binding action="run" pressed="controller-ls"/>',
    '    <binding action="look" pressed="lgui"/>',
    '    <binding action="action" pressed="e"/>',
    '    <binding action="action" pressed="controller-a"/>',
    '    <binding action="map" pressed="tab"/>',
    '    <binding action="map" pressed="controller-x"/>',
    '    <binding action="microphone" pressed="grave"/>',
    '    <binding action="microphone" pressed="controller-y"/>',
    '    <binding action="inventory-left" pressed="leftbracket"/>',
    '    <binding action="inventory-right" pressed="rightbracket"/>',
    '    <binding action="switch-player-view" pressed="backspace"/>',
    '    <binding action="volume-up" pressed="period"/>',
    '    <binding action="volume-down" pressed="comma"/>',
    '    <binding action="map-zoom-in" pressed="equals"/>',
    '    <binding action="map-zoom-in" pressed="controller-up"/>',
    '    <binding action="map-zoom-out" pressed="minus"/>',
    '    <binding action="map-zoom-out" pressed="controller-down"/>',
    '    <binding action="fps" pressed="slash"/>',
    '    <binding action="chat" pressed="backslash"/>',
    '    <binding action="net-stats" pressed="n"/>',
    '    <binding action="hotkey-1" pressed="1"/>',
    '    <binding action="hotkey-2" pressed="2"/>',
    '    <binding action="hotkey-3" pressed="3"/>',
    '    <binding action="hotkey-4" pressed="4"/>',
    '    <binding action="hotkey-5" pressed="5"/>',
    '    <binding action="hotkey-6" pressed="6"/>',
    '    <binding action="hotkey-7" pressed="7"/>',
    '    <binding action="hotkey-8" pressed="8"/>',
    '    <binding action="hotkey-9" pressed="9"/>',
    '    <binding action="hotkey-10" pressed="t"/>',
    '    <binding action="hotkey-11" pressed="g"/>',
    '    <binding action="hotkey-12" pressed="b"/>',
    "  </input>",
    '  <sound volume_db="-8" music_db="-12" flags="58" rate="44100" samples="1024" video_export_volume_db="-8" channel="2"/>',
    '  <network untimed="false" type="3" game_type="0" difficulty="2" game_options="1423" time_limit="18000" kill_limit="10" entry_point="27" autogather="false" join_by_address="false" join_address="" local_game_port="4226" game_protocol="star" use_netscript="false" netscript_file="" cheat_flags="39" advertise_on_metaserver="false" attempt_upnp="false" check_for_updates="true" verify_https="false" metaserver_login="guest" metaserver_password="72657665726f66206e6f68746172616d" use_custom_metaserver_colors="false" mute_metaserver_guests="false" join_metaserver_by_default="false" allow_stats="false">',
    '    <color index="0" red="0.607843161" green="0.290196091" blue="0.933333337"/>',
    '    <color index="1" red="0.607843161" green="0.290196091" blue="0.933333337"/>',
    "    <star_protocol>",
    '      <hub pregame_ticks_before_net_death="600" ingame_ticks_before_net_death="150" pregame_window_size="15" ingame_window_size="150" pregame_nth_element="2" ingame_nth_element="5" send_period="1" recovery_send_period="15" latency_tolerance="5" use_bandwidth_reduction="true"/>',
    '      <spoke pregame_ticks_before_net_death="2700" ingame_ticks_before_net_death="150" recovery_send_period="15" timing_window_size="90" timing_nth_element="45" adjust_timing="true"/>',
    "    </star_protocol>",
    '    <ring_protocol accept_packets_from_anyone="false" adapt_to_latency="true" latency_hold_ticks="60"/>',
    "  </network>",
    '  <environment map_file="$default$\\Map.scen" physics_file="$default$\\Physics.phys" shapes_file="$default$\\Shapes.shps" sounds_file="$default$\\Sounds.sndz" resources_file="$default$\\Marathon.appl" map_checksum="969" physics_checksum="0" shapes_mod_date="1715323638" sounds_mod_date="1715323638" group_by_directory="true" reduce_singletons="false" smooth_text="true" solo_lua_file="" use_solo_lua="false" use_replay_net_lua="false" hide_alephone_extensions="true" film_profile="7" maximum_quick_saves="0" use_native_file_dialogs="false">',
    '    <enable_plugin path="$default$\\Plugins\\Basic M1 HUD"/>',
    '    <disable_plugin path="$default$\\Plugins\\Default HUD"/>',
    '    <disable_plugin path="$default$\\Plugins\\Enhanced HUD"/>',
    "  </environment>",
    "</mara_prefs>"
  ];
  Context.WriteTextFile(txtPath, txtLines);

  if (Context.AspectRatioDecimal > 1.8) {
    var fov = 118;
  } else {
    var fov = 80;
  }

  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "  <graphics scmode_width=", Nucleus.SearchType.StartsWith) +
      '|  <graphics scmode_width="' +
      Context.Width +
      '" scmode_height="' +
      Context.Height +
      '" scmode_auto_resolution="false" scmode_high_dpi="true" scmode_hud="true" scmode_hud_scale="2" scmode_term_scale="2" scmode_translucent_map="true" scmode_camera_bob="1" scmode_accel="1" scmode_highres="true" scmode_draw_every_other_line="false" scmode_fov="' +
      fov +
      '" scmode_fullscreen="false" scmode_bitdepth="32" scmode_gamma="2" scmode_fix_h_not_v="true" ogl_flags="19073" software_alpha_blending="0" software_sdl_driver="0" fps_target="30" anisotropy_level="0" multisamples="0" wait_for_vsync="true" gamma_corrected_blending="false" use_npot="false" movie_export_video_quality="50" movie_export_video_bitrate="0" movie_export_audio_quality="50" scripted_effects_quality="2">',
    Context.FindLineNumberInTextFile(txtPath, "  <network untimed=", Nucleus.SearchType.StartsWith) +
      '|  <network untimed="false" type="3" game_type="0" difficulty="2" game_options="1423" time_limit="18000" kill_limit="10" entry_point="27" autogather="false" join_by_address="false" join_address="" local_game_port="422' +
      Context.PlayerID +
      '" game_protocol="star" use_netscript="false" netscript_file="" cheat_flags="39" advertise_on_metaserver="false" attempt_upnp="false" check_for_updates="true" verify_https="false" metaserver_login="guest" metaserver_password="72657665726f66206e6f68746172616d" use_custom_metaserver_colors="false" mute_metaserver_guests="false" join_metaserver_by_default="false" allow_stats="false">',
    Context.FindLineNumberInTextFile(txtPath, "  <player name=", Nucleus.SearchType.StartsWith) +
      '|  <player name="' +
      Context.Nickname +
      '" color="0" team="0" last_time_ran="0" difficulty="2" bkgd_music="false" crosshairs_active="false">'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Context.PlayerID > 0) {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "  <sound volume_db=", Nucleus.SearchType.StartsWith) +
        '|  <sound volume_db="-8" music_db="-20" flags="58" rate="44100" samples="1024" video_export_volume_db="-8" channel="2"/>'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "  <sound volume_db=", Nucleus.SearchType.StartsWith) +
        '|  <sound volume_db="-8" music_db="-12" flags="58" rate="44100" samples="1024" video_export_volume_db="-8" channel="2"/>'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var hud = Context.Options["Hud"];

  var BH = '    <enable_plugin path="$default$\\Plugins\\Basic M1 HUD"/>';
  var DH = '    <disable_plugin path="$default$\\Plugins\\Default HUD"/>';
  var EH = '    <disable_plugin path="$default$\\Plugins\\Enhanced HUD"/>';

  if (hud == "Enhanced") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, BH, Nucleus.SearchType.StartsWith) + "|", Context.FindLineNumberInTextFile(txtPath, EH, Nucleus.SearchType.StartsWith) + "|"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (hud == "Default") {
    var dict = [Context.FindLineNumberInTextFile(txtPath, BH, Nucleus.SearchType.StartsWith) + "|", Context.FindLineNumberInTextFile(txtPath, DH, Nucleus.SearchType.StartsWith) + "|"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      if (player.IsKeyboardPlayer) {
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
        //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

        System.Threading.Thread.Sleep(1000);

        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
      }
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      if (player.IsKeyboardPlayer) {
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      }
    }
  };
};