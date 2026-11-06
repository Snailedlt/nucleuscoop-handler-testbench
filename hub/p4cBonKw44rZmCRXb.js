Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Thu Feb 05 2026 10:50:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "p4cBonKw44rZmCRXb";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

Game.DirExclusions = ["settings", "steam_settings", "nepice_settings"];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64", "Engine\\Binaries\\Win64", "OMD\\Binaries\\Win64", "OMD\\Content\\Movies"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "RobotEntertainment_Logo_6_Seconds.mp4", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["D3D12Core.dll", "OpenImageDenoise.dll", "tbb.dll", "tbb12.dll", "tbbmalloc.dll"];
Game.GameName = "Orcs Must Die! 3";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "OMD-Win64-Shipping.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "1522820";
Game.GUID = "Orcs Must Die 3";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "OMD\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoWarning = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "OMD";
Game.RefreshWindowAfterStart = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\Robot Entertainment\\Orcs Must Die! 3\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\Robot Entertainment\\Orcs Must Die! 3\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Set your main game to windowed before running this. Create a multiplayer game in one instance and join in the other. If you use mice and keyboards after all the instances open press the END key once to lock the input and give each instance its own cursor, you need to left click each mouse to make the cursors appear after locking the input, alt-tab to a third window before locking the input for better performance. Press the END key again to unlock the input. You can use CTRL+Q to close Nucleus and all its instances.";
Game.PauseBetweenProcessGrab = 3;
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
Game.ProtoInput.SetWindowPosHook = false;
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
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var ini = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "bUseHDRDisplayOutput", "False"),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "LastConfirmedFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "PreferredFullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/OMD.OMDGameUserSettings", "DesiredScreenHeight", Context.Height)
  ]);

  var ini = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
  Context.ModifySaveFile(ini, ini, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("SystemSettings", "r.HDR.EnableHDROutput", "0")]);

  var BN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OMD\\Binaries\\Win64";
  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv151\\Win64";

  var filePath = SW + "\\steam_settings\\mods";
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = SW + "\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var token = SW + "\\steam_settings\\gc_token.txt";
  var lines = [""];
  Context.WriteTextFile(token, lines);

  var nticket = SW + "\\steam_settings\\new_app_ticket.txt";
  var lines = [""];
  Context.WriteTextFile(nticket, lines);

  var dlc = SW + "\\steam_settings\\DLC.txt";
  var lines = ["1669920=OMD!3 - Preorder Overlord Skins", "1781510=Orcs Must Die! 3 - Cold as Eyes Expansion", "1936590=Orcs Must Die! 3 - Tipping the Scales DLC"];
  Context.WriteTextFile(dlc, lines);

  Context.CopyFolder(Context.ScriptFolder + "\\nepice_settings", BN + "\\nepice_settings");

  var savePath = (Context.SavePath = BN + "\\EOSSDK-Win64-Shipping.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = BN + "\\nepice_settings\\NemirtingasEpicEmu.json";
  var dict = [
    //Context.FindLineNumberInTextFile(txtPath, '      "EpicId":', Nucleus.SearchType.StartsWith) + '|      "EpicId": "831ec62c44424917a0fb315de2b5dc'+id+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "Language":', Nucleus.SearchType.StartsWith) + '|      "Language": "' + Context.EpicLang + '",',
    //Context.FindLineNumberInTextFile(txtPath, '      "ProductUserId":', Nucleus.SearchType.StartsWith) + '|      "ProductUserId": "4e93fc9a0afba653e68be0c1e74cdac'+pd+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "UserName":', Nucleus.SearchType.StartsWith) + '|      "UserName": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};