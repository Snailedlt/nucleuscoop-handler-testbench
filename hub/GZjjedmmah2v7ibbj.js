Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Oct 10 2026 11:37:10 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "GZjjedmmah2v7ibbj";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["D3D12Core.dll"];
Game.KillMutex = [
  "DyingLightTheBeast"
  //"ChromeEngineGameMutex",
];
Game.DirExclusions = ["settings", "steam_settings", "nepice_settings"];
Game.FileSymlinkExclusions = ["EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "local_save.txt", "winmm.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "steam_api.dll", "fs.ini", "crashpad_handler.exe", "dinput8.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "DyingLightGame_TheBeast_x64_rwdi.exe";
Game.SteamID = "3008130";
Game.GUID = "Dying Light The Beast";
Game.GameName = "Dying Light: The Beast";
Game.BinariesFolder = "ph_ft\\work\\bin\\x64";
Game.LauncherExe = "DLTB.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
//Game.NotTopMost = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dying Light: The Beast";
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
//Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\GSE Saves\\3008130\\remote";
Game.DocumentsConfigPath = "dying light the beast\\out\\settings";
Game.UserProfileSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = false;
Game.Description =
  "📝 Important Handler Info:\nBEFORE using this run your main game and change some graphics settings in order to create the necessary configuration files. Fully CLOSE Steam too before running this handler. All players must have completed the tutorial in order to unlock multiplayer. When multiplayer is unlocked for all, open the pause menu in-game, set network mode to public and select the player you wanna join in the matchmaking browser.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 2;
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
Game.InjectHookXinput = false;

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
Game.SupportsKeyboard = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
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
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;

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

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 8000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var savePath = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\video.scr";
  var dict = [
    Context.FindLineNumberInTextFile(savePath, "WindowMode", Nucleus.SearchType.StartsWith) + "|WindowMode(1)",
    Context.FindLineNumberInTextFile(savePath, "WindowOffset", Nucleus.SearchType.StartsWith) + "|WindowOffset(" + Context.PosX + "," + Context.PosY + ")"
  ];
  Context.ReplaceLinesInTextFile(savePath, dict);

  var resLine = Context.FindLineNumberInTextFile(savePath, "Resolution", Nucleus.SearchType.StartsWith);
  Context.ReplacePartialLinesInTextFile(savePath, [resLine + "|" + "\\(([^\\)]+)\\)" + "|(" + Context.Width + "," + Context.Height + ")"]);

  var fsLine = Context.FindLineNumberInTextFile(savePath, "Fullscreen", Nucleus.SearchType.StartsWith);
  Context.RemoveLineInTextFile(savePath, fsLine);

  var RO = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);
  var BN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ph_ft\\work\\bin\\x64";
  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\engine\\source\\bin\\x64";

  //Setup Nemir epic emu 1.3.6:

  var savePath = (Context.SavePath = BN + "\\EOSSDK-Win64-Shipping.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  Context.CopyFolder(Context.ScriptFolder + "\\nepice_settings", BN + "\\nepice_settings");

  var id = 18 + Context.PlayerID;
  var pd = 4 + Context.PlayerID;

  var txtPath = BN + "\\nepice_settings\\NemirtingasEpicEmu.json";
  var dict = [
    //Context.FindLineNumberInTextFile(txtPath, '      "EpicId":', Nucleus.SearchType.StartsWith) + '|      "EpicId": "831ec62c44424917a0fb315de2b5dc'+id+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "Language":', Nucleus.SearchType.StartsWith) + '|      "Language": "' + Context.EpicLang + '",',
    //Context.FindLineNumberInTextFile(txtPath, '      "ProductUserId":', Nucleus.SearchType.StartsWith) + '|      "ProductUserId": "4e93fc9a0afba653e68be0c1e74cdac'+pd+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "UserName":', Nucleus.SearchType.StartsWith) + '|      "UserName": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\engine\\source\\bin\\x64\\steam_api64.dll")) {
    Context.StartArguments =
      "-AUTH_LOGIN=unused -AUTH_PASSWORD=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb -AUTH_TYPE=exchangecode -epicapp=CrabTest -epicenv=Prod -EpicPortal -epiclocale=" +
      Context.EpicLang +
      " -epicusername=" +
      Context.Nickname +
      " -epicuserid=0000000000000000000000000player" +
      Context.PLayerID;
  } else {
    Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", RO + "\\steam_settings");

    var savePath = (Context.SavePath = RO + "\\steamclient.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = RO + "\\steamclient64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = RO + "\\ColdClientLoader.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ColdClientLoader.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = RO + "\\DLTB.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DLTB.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = RO + "\\steam_settings\\configs.user.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
      new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
      new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
    ]);
  }
};