Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Thu Aug 07 2025 21:56:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JnxP25zLdjBphvAtB";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64", "RoboQuest\\Binaries\\Win64\\x64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "EOSSDK-Win64-Shipping.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["libScePad.dll", "turbojpeg.dll", "xaudio2_9redist.dll"];
Game.GameName = "Roboquest";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "RoboQuest-Win64-Shipping.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "692890";
Game.GUID = "Roboquest";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "RoboQuest\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoWarning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "RoboQuest";
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\RoboQuest\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\RoboQuest\\Saved\\SaveGames";
Game.Description =
  "IMPORTANT: Set your main game to windowed before running this. After the tutorial press start, select multiplayer-copy ID and join in the other instance using the join by ID option. Each instance has their own saves that are copies of your original one, so your original save will not be overwritten, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked.";
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.SetWindowPosHook = true;
Game.ProtoInput.SetWindowStyleHook = false;

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
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = " -windowed -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "True")
  ]);

  var BN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\RoboQuest\\Binaries\\Win64";
  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64";

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

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_api64.dll")) {
  } else {
    //Setup goldberg fork version that still used the .txt configs:

    var filePath = SW + "\\steam_settings\\mods";
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = SW + "\\steam_api64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var nolan = SW + "\\disable_lan_only.txt";
    var lines = [""];
    Context.WriteTextFile(nolan, lines);

    var nolay = SW + "\\steam_settings\\disable_overlay.txt";
    var lines = [""];
    Context.WriteTextFile(nolay, lines);

    var ainvite = SW + "\\steam_settings\\auto_accept_invite.txt";
    var lines = [""];
    Context.WriteTextFile(ainvite, lines);

    var dwar = SW + "\\steam_settings\\disable_overlay_warning_any.txt";
    var lines = [""];
    Context.WriteTextFile(dwar, lines);

    var token = SW + "\\steam_settings\\gc_token.txt";
    var lines = [""];
    Context.WriteTextFile(token, lines);

    var nticket = SW + "\\steam_settings\\new_app_ticket.txt";
    var lines = [""];
    Context.WriteTextFile(nticket, lines);
  }
};