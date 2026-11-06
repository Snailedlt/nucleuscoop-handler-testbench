Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Jan 13 2025 07:22:25 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "AFXHGo5SvWw84fNQB";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Low", "Medium", "High", "Very High", "Ultra", "Maximum"];
var answers2 = ["No", "Yes"];
Game.AddOption(
  "Select graphics quality:",
  "This game currently has an issue where it will crash randomly. Updating your drivers and/or setting the game settings to low may minimize this, even on high end graphics cards.",
  "Graphics",
  answers1
);
Game.AddOption("Use the first Nucleus nickname for Player 1?", "If not they will be named Player1. Character data is tied to player name.", "P1Nick", answers2);

Game.FileSymlinkExclusions = ["goggame-1274395712.info"];
Game.FileSymlinkCopyInstead = ["UnityCrashHandler64.exe", "UnityPlayer.dll"];
Game.UseNucleusEnvironment = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Planet Crafter.exe";
Game.SteamID = "1284190";
Game.GUID = "Planet Crafter";
Game.GameName = "Planet Crafter";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Planet Crafter";
Game.HideTaskbar = true;
Game.ResetWindows = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\LocalLow\\MijuGames\\Planet Crafter";
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "If you are using the Steam version make sure that Steam is closed before using this. This handler edits the Server.conf in your user folder if you have one, so back it up if you care about it. Wait until each instance has loaded in the world before opening the next one. Host a match with the first player and use your localhost ip and the default port: 127.0.0.1:7777 to join with each successive instance. You can alt tab and use the keyboard to type in gamepad instances or press esc to open the menu when in game. By default the players will be named generic player names, character data is tied to player names, so if you want to use a custom name be sure to type it on the join screen manually whenever you join the server.  If on any menu you have mouse alignment issues you can press CTRL+T twice to toggle top most and fix this. You can use CTRL+Q to close Nucleus and all its instances, make sure to save first.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 40;

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

Game.ProtoInput.InjectStartup = true;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
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
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;
Game.ProtoInput.SetWindowStyleHook = true;
Game.ProtoInput.SetWindowPosHook = true;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
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
Game.ProtoInput.MultipleProtoControllers = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008, 0x02a3, 0x02a1]; // Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE

Game.Play = function() {
  var filePath = (Context.SavePath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\MijuGames\\Planet Crafter");
  System.IO.Directory.CreateDirectory(filePath);

  var p1 = Context.Options["P1Nick"];

  var cfgPath = Context.NucleusUserRoot + "\\AppData\\LocalLow\\MijuGames\\Planet Crafter\\Server.conf";
  if (p1 == "Yes") {
    var cfgLines = ['{"hostPort":7777,"hostPlayerName":"' + Context.Nickname + '"}'];
  } else {
    var cfgLines = ['{"hostPort":7777,"hostPlayerName":"Player1"}'];
  }
  Context.WriteTextFile(cfgPath, cfgLines);

  if (Context.PlayerID > 0) {
    var musVol = "54,c0";
  } else {
    var musVol = "00,00";
  }

  if (Context.PlayerID >= 0 && Context.PlayerID <= 8) {
    var hexId = "3" + (Context.PlayerID + 1);
  } else {
    var hexId = "31,3" + (Context.PlayerID - 9);
  }

  var batPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Edit.bat";
  var batLines = ["@echo off", 'cd /D "%~dp0"', "", 'REG IMPORT "Edit.reg"', "exit"];
  Context.WriteTextFile(batPath, batLines);

  var humPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\goggame-1274395712.info";
  var humLines = [
    "{",
    '    "languages": [',
    '        "*"',
    "    ],",
    '    "version": 1,',
    '    "name": "The Planet Crafter - Planet Humble",',
    '    "language": "neutral",',
    '    "gameId": "1274395712",',
    '    "rootGameId": "1882985557",',
    '    "playTasks": [],',
    '    "buildId": "58200747775885555"',
    "}"
  ];
  Context.WriteTextFile(humPath, humLines);

  var regPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Edit.reg";
  var regLines = [
    "Windows Registry Editor Version 5.00",
    "",
    "[HKEY_CURRENT_USER\\SOFTWARE\\MijuGames\\Planet Crafter]",
    '"GameOptions.Audio.Parameter.Music_h1057744587"=hex(4):00,00,00,00,00,00,' + musVol,
    '"Multiplayer.PlayerName_h3893976229"=hex:50,6c,61,79,65,72,' + hexId + ",00",
    '"Multiplayer.ServerAddress_h2784248578"=hex:31,32,37,2e,30,2e,30,2e,31,3a,37,\\',
    "  37,37,37,00"
  ];
  Context.WriteTextFile(regPath, regLines);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Edit.bat"], false, 0, true, false);

  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.FullScreenMode_h2179283858", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.ResolutionHeight_h3069183167", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.ResolutionWidth_h243182214", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "Screenmanager Resolution Window Height_h1684712807", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "Screenmanager Resolution Window Width_h2524650974", Context.Width, Nucleus.RegType.DWord);

  var gfx = Context.Options["Graphics"];

  if (gfx == "Low") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.Quality_h3188433699", 0, Nucleus.RegType.DWord);
  }

  if (gfx == "Medium") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.Quality_h3188433699", 1, Nucleus.RegType.DWord);
  }

  if (gfx == "High") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.Quality_h3188433699", 2, Nucleus.RegType.DWord);
  }

  if (gfx == "Very High") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.Quality_h3188433699", 3, Nucleus.RegType.DWord);
  }

  if (gfx == "Ultra") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.Quality_h3188433699", 4, Nucleus.RegType.DWord);
  }

  if (gfx == "Maximum") {
    Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\MijuGames\\Planet Crafter", "GameOptions.Graphics.Quality_h3188433699", 5, Nucleus.RegType.DWord);
  }

  var dllPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\UnityPlayer.dll";

  var searchPattern = "57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2E 00 47 00 61 00 6D 00 69 00 6E 00 67 00 2E 00 49 00 6E 00 70 00 75 00 74 00 2E 00 47 00 61 00 6D 00 65 00 70 00 61 00 64";
  var patchPattern = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";

  Context.PatchFileFindPattern(dllPath, dllPath, searchPattern, patchPattern, true);

  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
    player.ProtoController2 = Context.GamepadId;
    player.ProtoController3 = Context.GamepadId;
    player.ProtoController4 = Context.GamepadId;
    player.ProtoController5 = Context.GamepadId;
    player.ProtoController6 = Context.GamepadId;
    player.ProtoController7 = Context.GamepadId;
    player.ProtoController8 = Context.GamepadId;
    player.ProtoController9 = Context.GamepadId;
    player.ProtoController10 = Context.GamepadId;
  }
};