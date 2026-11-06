Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Mon Aug 10 2026 10:58:11 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "d6rWqasXNJ3KcmDPp";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["jre"];
Game.DirSymlinkExclusions = ["jre\\bin\\server", "lib"];
Game.DirSymlinkCopyInstead = ["lib"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "local_save.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "jli.dll",
  "Necesse.jar",
  "Necesse.json",
  "res.data",
  "Server.jar",
  "StartClientJava.bat",
  "StartServer.bat",
  "StartServer-nogui.bat",
  "java.exe",
  "javaw.exe",
  "zip.dll",
  "verify.dll",
  "steamworks4j64.dll"
];
Game.GameName = "Necesse";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Necesse.exe";
Game.SteamID = "1169040";
Game.GUID = "Necesse";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.UseNucleusEnvironment = true;
//Game.BinariesFolder = "jre\\bin";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Necesse v. 1.3.2";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\GSE Saves\\1169040";
Game.UserProfileConfigPath = "AppData\\Roaming\\Necesse\\cfg";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Run your main game, change some graphics settings like the resolution and close it before launching this. Host a multiplayer game in one instance and join in the others. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 15;
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
Game.ProtoInput.FindWindowHook = false;

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
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.
Game.KillProcessesOnClose = ["javaw.exe"];

Game.Play = function() {
  //Context.StartArguments = ' -Xms512m -Xmx4G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M -jar "' + Context.RootFolder + '\\Necesse.jar"';

  //var txtPath = Context.NucleusUserRoot + "\\AppData\\Roaming\\Necesse\\cfg\\settings.cfg";
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\settings.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "		pauseOnFocusLoss =", Nucleus.SearchType.StartsWith) + "|		pauseOnFocusLoss = false,",
    Context.FindLineNumberInTextFile(txtPath, "		savePerformanceOnFocusLoss =", Nucleus.SearchType.StartsWith) + "|		savePerformanceOnFocusLoss = false,",
    Context.FindLineNumberInTextFile(txtPath, "		displayMode =", Nucleus.SearchType.StartsWith) + "|		displayMode = Windowed,",
    Context.FindLineNumberInTextFile(txtPath, "		displaySize =", Nucleus.SearchType.StartsWith) + "|		displaySize = [" + Context.Width + ", " + Context.Height + "],"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var TMP = Context.NucleusUserRoot + "\\AppData\\Local\\Temp\\lwjgl_" + Context.UserName + "\\3.4.1+2\\x64"; //3.3.2+13

  var filePath = TMP + "\\steam_settings\\controller\\glyphs";
  System.IO.Directory.CreateDirectory(filePath);

  var appid = TMP + "\\steam_settings\\steam_appid.txt";
  var lines = ["1169040"];
  Context.WriteTextFile(appid, lines);

  var gamepad = TMP + "\\steam_settings\\controller\\GameControls.txt";
  var lines = [
    "mainmenu=START",
    "showmap=BACK",
    "prevhotbar=LBUMPER",
    "nexthotbar=RBUMPER",
    "placetorch=A",
    "healthpotion=B",
    "trinketability=X",
    "Inventory=Y",
    "interact=DLTRIGGER",
    "attack=DRTRIGGER",
    "toggleaim=RSTICK",
    "aim=RJOY=joystick_move",
    "pipette=LSTICK",
    "Move=LJOY=joystick_move",
    "manapotion=DUP",
    "usemount=DDOWN",
    "setability=DRIGHT",
    //"opensettlement=DLEFT",
    "menuinteractitem=START",
    "MenuUp=DUP,DLJOYUP",
    "MenuDown=DDOWN,DLJOYDOWN",
    "MenuRight=DRIGHT,DLJOYRIGHT",
    "MenuLeft=DLEFT,DLJOYLEFT",
    "menuselect=A",
    "menuback=B",
    "menuitemactionsmenu=X"
  ];
  Context.WriteTextFile(gamepad, lines);

  var menu = TMP + "\\steam_settings\\controller\\MenuControls.txt";
  var lines = [
    "placetorch=A",
    "healthpotion=B",
    //"trinketability=X",
    "Inventory=Y",
    "interact=DLTRIGGER",
    "attack=DRTRIGGER",
    "showmap=BACK",
    "prevhotbar=LBUMPER",
    "nexthotbar=RBUMPER",
    "Move=LJOY=joystick_move",
    "aim=RJOY=joystick_move",
    "menuselect=A",
    "menuback=B",
    "menuitemactionsmenu=X",
    "toggleaim=RSTICK",
    "smartmining=LSTICK",
    "manapotion=DUP",
    "usemount=DDOWN",
    "setability=DRIGHT",
    //"opensettlement=DLEFT",
    "menuinteractitem=START",
    //"MenuUp=DUP,DLJOYUP",
    //"MenuDown=DDOWN,DLJOYDOWN",
    //"MenuRight=DRIGHT,DLJOYRIGHT",
    //"MenuLeft=DLEFT,DLJOYLEFT",
    "menunext=RBUMPER",
    "menuprevious=LBUMPER"
  ];
  Context.WriteTextFile(menu, lines);

  Context.CopyFolder(Context.NucleusFolder + "\\utils\\GoldbergEmu\\steam_settings.EXAMPLE\\controller.EXAMPLE\\glyphs", TMP + "\\steam_settings\\controller\\glyphs");

  var Bat = Game.Folder + "\\patch-Jar.bat";
  var lines = [
    "@echo off",
    "setlocal enabledelayedexpansion",
    "TITLE Extracting and patching the necessary files...",
    'cd /D "%~dp0"',
    'set folder_lib="' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\lib"',
    'for %%F in (%folder_lib%\\steamworks4j*.jar) do (set "FileName=%%~nxF")',
    "echo The Filename is:-- %FileName% --",
    "",
    '7z.exe a "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\lib\\%FileName%" "' + Game.Folder + '\\steam_api64.dll"',
    "",
    "endlocal",
    "exit"
  ];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["all|" + Game.Folder + "\\patch-Jar.bat"], false, 0);

  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", TMP + "\\steam_settings");

  var savePath = TMP + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
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
    }
  };
};