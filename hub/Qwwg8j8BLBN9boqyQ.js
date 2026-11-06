Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 18 2024 12:05:56 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Qwwg8j8BLBN9boqyQ";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Default", "100", "90", "80", "70", "60", "50", "40"];
var answers2 = ["Default", "100", "90", "80", "70", "60", "50", "40"];
var answers3 = ["Default", "100", "90", "80", "70", "60", "50", "40"];
var answers4 = ["Default", "100", "90", "80", "70", "60", "50", "40"];
Game.AddOption(
  "Select Player 1 window scale",
  "Spelunky 2 can only display in limited resolutions and uses a window scaling setting to control resolution.\n\nThese settings set the scaling percentage for each player. For instance, 50% scaling for a 1080p monitor will be 960x540, ideal for 2-4 player splitscreen.\n\nSet scaling to 100 for players who are using an entire monitor. Default is 50%.",
  "P1scale",
  answers1
);
Game.AddOption("Select Player 2 window scale", "", "P2scale", answers2);
Game.AddOption("Select Player 3 window scale", "", "P3scale", answers3);
Game.AddOption("Select Player 4 window scale", "", "P4scale", answers4);

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "input.cfg", "savegame.sav", "settings.cfg"];
Game.FileSymlinkCopyInstead = ["local.cfg"];
Game.BackupFiles = ["savegame.sav"];
Game.KeepSymLinkOnExit = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.GameName = "Spelunky 2";
Game.GUID = "Spelunky 2";
Game.ExecutableName = "Spel2.exe";
Game.SteamID = "418530";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.HideDesktop = true;
Game.HideTaskbar = true;
Game.RefreshWindowAfterStart = true;
Game.KeepMonitorAspectRatio = true;
Game.IgnoreWindowBorderCheck = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Spelunky 2";
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Requires v1.25.0b in order to play offline, but you can play online using the official servers with the newest version.\n\nThe game already has native local co-op for 4 players, but this allows each player to have his own screen, you can use different monitors too.\n\nSelect online and use the search features to find the other players, if you are using the newest version use the code feature to connect directly to eachother without any other online players. If you don't plan on playing online, I recommend you turn input delay off in online settings.\n\nAfter all instances have resized and repositioned, press END to lock input and grant focus to each instance.\n\nPress the END key again to unlock the input. You can also use CTRL+Q to close Nucleus and all its instances.";
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
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\local.cfg";
  var lines = [
    "<Spelunky_2>",
    '    <config version="3">',
    "        <window_scale>50</window_scale>",
    "        <resolution_scale>100</resolution_scale>",
    "        <resolutionx>" + Context.Width + "</resolutionx>",
    "        <resolutiony>" + Context.Height + "</resolutiony>",
    //'        <resolutionx>' + Context.OrigWidth + '</resolutionx>',
    //'        <resolutiony>' + Context.OrigHeight + '</resolutiony>',
    "        <frequency_numerator>0</frequency_numerator>",
    "        <frequency_denominator>0</frequency_denominator>",
    "        <window_mode>2</window_mode>",
    "        <vsync>1</vsync>",
    "        <monitor>255</monitor>",
    "        <vfx>1</vfx>",
    "        <brightness>8</brightness>",
    "        <sound_enabled>1</sound_enabled>",
    "        <sound_volume>5</sound_volume>",
    "        <music_enabled>0</music_enabled>",
    "        <music_volume>5</music_volume>",
    "        <master_enabled>1</master_enabled>",
    "        <master_volume>50</master_volume>",
    "        <overscan>0</overscan>",
    "        <current_profile>0</current_profile>",
    "    </config>",
    "</Spelunky_2>"
  ];

  var scale1 = Context.Options["P1scale"];
  var scale2 = Context.Options["P2scale"];
  var scale3 = Context.Options["P3scale"];
  var scale4 = Context.Options["P4scale"];

  if (Context.PlayerID == 0) {
    if (scale1 == "Default") {
      var lines = [
        "<Spelunky_2>",
        '    <config version="3">',
        "        <window_scale>50</window_scale>",
        "        <resolution_scale>100</resolution_scale>",
        "        <resolutionx>" + Context.Width + "</resolutionx>",
        "        <resolutiony>" + Context.Height + "</resolutiony>",
        "        <frequency_numerator>0</frequency_numerator>",
        "        <frequency_denominator>0</frequency_denominator>",
        "        <window_mode>2</window_mode>",
        "        <vsync>1</vsync>",
        "        <monitor>255</monitor>",
        "        <vfx>1</vfx>",
        "        <brightness>8</brightness>",
        "        <sound_enabled>1</sound_enabled>",
        "        <sound_volume>5</sound_volume>",
        "        <music_enabled>1</music_enabled>",
        "        <music_volume>5</music_volume>",
        "        <master_enabled>1</master_enabled>",
        "        <master_volume>50</master_volume>",
        "        <overscan>0</overscan>",
        "        <current_profile>0</current_profile>",
        "    </config>",
        "</Spelunky_2>"
      ];
    } else {
      var lines = [
        "<Spelunky_2>",
        '    <config version="3">',
        "        <window_scale>" + scale1 + "</window_scale>",
        "        <resolution_scale>100</resolution_scale>",
        "        <resolutionx>" + Context.Width + "</resolutionx>",
        "        <resolutiony>" + Context.Height + "</resolutiony>",
        "        <frequency_numerator>0</frequency_numerator>",
        "        <frequency_denominator>0</frequency_denominator>",
        "        <window_mode>2</window_mode>",
        "        <vsync>1</vsync>",
        "        <monitor>255</monitor>",
        "        <vfx>1</vfx>",
        "        <brightness>8</brightness>",
        "        <sound_enabled>1</sound_enabled>",
        "        <sound_volume>5</sound_volume>",
        "        <music_enabled>1</music_enabled>",
        "        <music_volume>5</music_volume>",
        "        <master_enabled>1</master_enabled>",
        "        <master_volume>50</master_volume>",
        "        <overscan>0</overscan>",
        "        <current_profile>0</current_profile>",
        "    </config>",
        "</Spelunky_2>"
      ];
    }
  }

  if (Context.PlayerID == 1) {
    if (scale2 == "Default") {
    } else {
      var lines = [
        "<Spelunky_2>",
        '    <config version="3">',
        "        <window_scale>" + scale2 + "</window_scale>",
        "        <resolution_scale>100</resolution_scale>",
        "        <resolutionx>" + Context.Width + "</resolutionx>",
        "        <resolutiony>" + Context.Height + "</resolutiony>",
        "        <frequency_numerator>0</frequency_numerator>",
        "        <frequency_denominator>0</frequency_denominator>",
        "        <window_mode>2</window_mode>",
        "        <vsync>1</vsync>",
        "        <monitor>255</monitor>",
        "        <vfx>1</vfx>",
        "        <brightness>8</brightness>",
        "        <sound_enabled>1</sound_enabled>",
        "        <sound_volume>5</sound_volume>",
        "        <music_enabled>0</music_enabled>",
        "        <music_volume>5</music_volume>",
        "        <master_enabled>1</master_enabled>",
        "        <master_volume>50</master_volume>",
        "        <overscan>0</overscan>",
        "        <current_profile>0</current_profile>",
        "    </config>",
        "</Spelunky_2>"
      ];
    }
  }

  if (Context.PlayerID == 2) {
    if (scale3 == "Default") {
    } else {
      var lines = [
        "<Spelunky_2>",
        '    <config version="3">',
        "        <window_scale>" + scale3 + "</window_scale>",
        "        <resolution_scale>100</resolution_scale>",
        "        <resolutionx>" + Context.Width + "</resolutionx>",
        "        <resolutiony>" + Context.Height + "</resolutiony>",
        "        <frequency_numerator>0</frequency_numerator>",
        "        <frequency_denominator>0</frequency_denominator>",
        "        <window_mode>2</window_mode>",
        "        <vsync>1</vsync>",
        "        <monitor>255</monitor>",
        "        <vfx>1</vfx>",
        "        <brightness>8</brightness>",
        "        <sound_enabled>1</sound_enabled>",
        "        <sound_volume>5</sound_volume>",
        "        <music_enabled>0</music_enabled>",
        "        <music_volume>5</music_volume>",
        "        <master_enabled>1</master_enabled>",
        "        <master_volume>50</master_volume>",
        "        <overscan>0</overscan>",
        "        <current_profile>0</current_profile>",
        "    </config>",
        "</Spelunky_2>"
      ];
    }
  }

  if (Context.PlayerID == 3) {
    if (scale4 == "Default") {
    } else {
      var lines = [
        "<Spelunky_2>",
        '    <config version="3">',
        "        <window_scale>" + scale4 + "</window_scale>",
        "        <resolution_scale>100</resolution_scale>",
        "        <resolutionx>" + Context.Width + "</resolutionx>",
        "        <resolutiony>" + Context.Height + "</resolutiony>",
        "        <frequency_numerator>0</frequency_numerator>",
        "        <frequency_denominator>0</frequency_denominator>",
        "        <window_mode>2</window_mode>",
        "        <vsync>1</vsync>",
        "        <monitor>255</monitor>",
        "        <vfx>1</vfx>",
        "        <brightness>8</brightness>",
        "        <sound_enabled>1</sound_enabled>",
        "        <sound_volume>5</sound_volume>",
        "        <music_enabled>0</music_enabled>",
        "        <music_volume>5</music_volume>",
        "        <master_enabled>1</master_enabled>",
        "        <master_volume>50</master_volume>",
        "        <overscan>0</overscan>",
        "        <current_profile>0</current_profile>",
        "    </config>",
        "</Spelunky_2>"
      ];
    }
  }

  Context.WriteTextFile(cfgPath, lines);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.OnFinishedSetup = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };
};