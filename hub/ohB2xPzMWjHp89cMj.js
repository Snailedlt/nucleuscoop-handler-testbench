Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Dec 01 2021 23:36:08 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ohB2xPzMWjHp89cMj";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["No", "Yes"];
var answers2 = ["Custom", "4:3"];
Game.AddOption("Do you have a custom startup.txt for mods?", "If no, it will be created for you so you can use the custom aspect ratio setting.", "Startup", answers1);
Game.AddOption("Select aspect ratio when loading startup.txt", "4:3 is faithful to the original game; custom will adjust to your available space.", "aspectRatio", answers2);

Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["startup.txt"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.GameName = "Nuclear Throne Together";
Game.SteamID = "242680";
Game.GUID = "NuclearThroneTogether";
Game.ExecutableName = "NuclearThroneTogether.exe";
Game.SupportsKeyboard = false;
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.HideTaskbar = true;
Game.NotTopMost = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Nuclear Throne Together";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.UserProfileConfigPath = "AppData\\Local\\nuclearthrone";
Game.Description =
  'Requires the mod "Nuclear Throne Together", start NTT at least once before using this script. To host or join a LAN game go to COOP and set "USE STEAM" to "NO". Host a lan game with one instance and join with the others using the localhost ip (127.0.0.1). The mod already allows for 4 player local co-op but with this script everyone can have their own screen and use multiple monitors. You can set up a setup.txt in your game files to use custom mods. To load mods and/or to use custom aspect ratios, when you are at the campfire screen alt-tab between instances to press T and have each player write /sideload to enable loading mods/external content then any of the players can write /load startup to load their startup.txt, all players will have the same mods and aspect ratio as said player. Remove the 60 fps line in your startup.txt if you get freezes when starting a co-op game. Press END to lock input in order to give mouse/keyboard players exclusive control over their instances, you can press END again to unlock input. You can also use CTRL+Q to close Nucleus and all its instances.';
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
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = true;
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
  var ini = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\NuclearThroneTogether.ini";
  var sav = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\NuclearThroneTogether.sav";

  Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Player", "OfflineAlias", '"' + Context.Nickname + '"'),
    new Nucleus.IniSaveInfo("Visual", "BorderlessFullscreen", '"0"'),
    new Nucleus.IniSaveInfo("Join", "Port", '"5394"'),
    new Nucleus.IniSaveInfo("Join", "URL", '"127.0.0.1"')
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Controls", "Gamepad0", '"0"')]);
  }

  if (Context.PlayerID == 0) {
    if (Context.IsKeyboardPlayer) {
      var mus = "0.400000";
      var amb = "0.200000";
      var sfx = "0.700000";
      var pad = "0.000000";
    } else {
      var mus = "0.400000";
      var amb = "0.200000";
      var sfx = "0.700000";
      var pad = "1.000000";
    }
  }

  if (Context.PlayerID > 0) {
    if (Context.IsKeyboardPlayer) {
      var mus = "0.000000";
      var amb = "0.000000";
      var sfx = "0.000000";
      var pad = "0.000000";
    } else {
      var mus = "0.000000";
      var amb = "0.000000";
      var sfx = "0.000000";
      var pad = "1.000000";
    }
  }

  var savline = [
    '{ "VLAMBEER DRM 2013-NOW": "YUNG VENUZ WILL SHANK YOU IF YOU EDIT THIS FILE.", "version": "1200", "stats": { "charData_4": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 140.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 12878.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 6030.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_2": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 104.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 25400.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 10770.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_6": { "cwep": 39.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 26.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 9370.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 3762.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_8": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 199.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 60022.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 24156.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_15": { "cwep": 201.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 0.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 0.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 0.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_11": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 13.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 5736.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 2255.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "tot_time": 328.000000, "charData_17": { "cwep": 1.000000, "cbgt": 0.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 1.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 11.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 3999.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 0.000000, "ctot_kill": 2267.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_13": { "cwep": 108.000000, "cbgt": 0.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 2.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 2.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 10587.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 0.000000, "ctot_kill": 29256.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "custom_race_data": { }, "charData_5": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 62.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 13850.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 4650.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_1": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 4.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 1.000000, "hbst_loop": 0.000000, "ctot_dead": 18.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 4212.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 2251.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_9": { "cwep": 46.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 5.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 1185.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 555.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_7": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 6.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 88.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 32919.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 14794.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_3": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 9.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 1965.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 873.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_10": { "cwep": 1.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 5.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 1301.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 763.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_14": { "cwep": 56.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 0.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 0.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 0.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_12": { "cwep": 81.000000, "cbgt": 1.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 5.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 1728.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 1.000000, "ctot_kill": 971.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 }, "charData_16": { "cwep": 39.000000, "cbgt": 0.000000, "hbst_area": 0.000000, "hbst_kill": 0.000000, "crowns": [ 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000, 1.000000 ], "dbst_area": 0.000000, "dbst_kill": 0.000000, "cbst_race": 0.000000, "cgld": -1.000000, "ctot_hard": 0.000000, "cbst_fast": 0.000000, "ctot_uniq": 0.000000, "dbst_suba": 0.000000, "ctot_loop": 0.000000, "hbst_suba": 0.000000, "cbst_loop": 0.000000, "ctot_runs": 0.000000, "hbst_loop": 0.000000, "ctot_dead": 0.000000, "cbst_suba": 0.000000, "dbst_loop": 0.000000, "startskin": 0.000000, "ctot_wins": 0.000000, "ctot_strk": 0.000000, "ctot_time": 0.000000, "startcrown": 1.000000, "cbst_strk": 0.000000, "ctot_days": 0.000000, "hbst_race": 0.000000, "cgot": 0.000000, "ctot_kill": 0.000000, "dbst_race": 0.000000, "cbst_kill": 0.000000, "cbst_area": 0.000000 } }, "options": { "kbkeypick": 69.000000, "ambvol": ' +
      amb +
      ', "borderless": 0.000000, "gamepad": ' +
      pad +
      ', "bintro": 1.000000, "gpkeyfire": 32776.000000, "gamepadstyle": 0.000000, "fulscrn": 0.000000, "coop": 0.000000, "sond2d": 0.000000, "sfxvol": ' +
      sfx +
      ', "streamkey": 0.000000, "nicedrk": 1.000000, "sideart": 0.000000, "gpkeypick": 32771.000000, "kbkeyfire": 90.000000, "mousecp": 0.000000, "kbkeydown": 83.000000, "kbkeyright": 68.000000, "kbkeyspec": 88.000000, "streamid": 0.000000, "gpkeyswap": 32772.000000, "crosshair": 5.000000, "shake": 0.300000, "rumble": 1.000000, "gpkeyspec": 32775.000000, "lfthand": 0.000000, "kbkeyleft": 65.000000, "kbkeyswap": 32.000000, "niceshd": 1.000000, "fitscrn": 0.000000, "autoaim": 0.000000, "freeze": 0.800000, "timer": 0.000000, "musvol": ' +
      mus +
      ', "nohud": 0.000000, "kbkeyup": 87.000000, "scaling": 4.000000 }, "data": { "saveday": -1.000000, "lastarea": 1.000000, "loop_d": 0.000000, "rank_d": 0.000000, "showtutorial": 0.000000, "char_d": 0.000000, "donedaily": 1.000000, "suba_d": 0.000000, "clickeddaily": 0.000000, "checkupdate": 0.000000, "protowep": 56.000000, "hardgot": 1.000000, "area_d": 0.000000 } }'
  ];
  Context.WriteTextFile(sav, savline);

  var startup = Context.Options["Startup"];
  var ratio = Context.Options["aspectRatio"];
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\startup.txt";

  if (startup == "Yes") {
    if (ratio == "4:3") {
      var dict = ["1|/gml game_set_size(320, 240)"];
    } else if (Context.AspectRatioDecimal > 1.8) {
      var dict = ["1|/gml game_set_size(852, 240)"];
    } else if (Context.AspectRatioDecimal < 1.2) {
      var dict = ["1|/gml game_set_size(320, 360)"];
    } else {
      var dict = ["1|/gml game_set_size(426, 240)"];
    }
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (startup == "No") {
    if (ratio == "4:3") {
      var lines = ["/gml game_set_size(320, 240)"];
    } else if (Context.AspectRatioDecimal > 1.8) {
      var lines = ["/gml game_set_size(852, 240)"];
    } else if (Context.AspectRatioDecimal < 1.2) {
      var lines = ["/gml game_set_size(320, 360)"];
    } else {
      var lines = ["/gml game_set_size(426, 240)" /*"/gml q=60 room_speed=q current_time_scale=30/q", 60 fps freezes the game in LAN.*/];
    }
    Context.WriteTextFile(txtPath, lines);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};