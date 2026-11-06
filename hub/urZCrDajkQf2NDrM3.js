Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Aug 18 2026 10:16:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "urZCrDajkQf2NDrM3";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirExclusions = ["settings", "steam_settings", "nepice_settings"];
Game.DirSymlinkExclusions = [
  "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv157\\Win64",
  "Engine\\Binaries\\Win64",
  "RGame\\Binaries\\Win64\\D3D12\\x64",
  "RGame\\Binaries\\Win64\\DML\\x64",
  "RGame\\Binaries\\Win64\\RedpointEOS\\x64"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "D3D12Core.dll",
  "d3d12SDKLayers.dll",
  "DirectML.dll",
  "boost_atomic-mt-x64.dll",
  "boost_chrono-mt-x64.dll",
  "boost_filesystem-mt-x64.dll",
  "boost_iostreams-mt-x64.dll",
  "boost_program_options-mt-x64.dll",
  "boost_python311-mt-x64.dll",
  "boost_regex-mt-x64.dll",
  "boost_system-mt-x64.dll",
  "boost_thread-mt-x64.dll",
  "tbb.dll",
  "tbb12.dll",
  "tbbmalloc.dll",
  "xaudio2_9redist.dll"
];
Game.UseNucleusEnvironment = true;
Game.SteamlessPatch = ["false", "--quiet --keepbind", "9000"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "RGame-Win64-Shipping.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "1721110";
Game.GUID = "Abyssus";
Game.GameName = "Abyssus";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "RGame\\Binaries\\Win64";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Abyssus";
Game.SendFakeFocusMsg = true;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\Abyssus\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\Abyssus\\Saved\\Config\\Windows";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "IMPORTANT: Get past the tutorial or skip it in all instances, use the terminal, set your session to public and save in one instance then join in the others using the session browser. Once in-game press the END key once to lock the input for all instances to have focus (even gamepad instances) and their own cursor (mkb instances), you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. Reduce ingame graphics settings to improve performance.";
Game.KeepSymLinkOnExit = false;
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 35;

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
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;
Game.ToggleUnfocusOnInputsLock = true;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = false;
Game.ProtoInput.SetCursorPosHook = false;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = false;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.SetWindowPosHook = true;
Game.ProtoInput.SetWindowStyleHook = false;
Game.ProtoInput.MoveWindowHook = false;

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
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  Context.StartArguments = "-nosplash";

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "bMuteWhenUnfocused", false),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "FullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "LastConfirmedFullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "PreferredFullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", false)
  ]);

  if (Player.Owner.IsFullscreen()) {
    var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "FullscreenMode", "2"),
      new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "LastConfirmedFullscreenMode", "2"),
      new Nucleus.IniSaveInfo("/Script/RGame.RGameUserSettings", "PreferredFullscreenMode", "2")
    ]);
  }

  var BN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\RGame\\Binaries\\Win64";
  var EN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\RGame\\Binaries\\Win64\\RedpointEOS";
  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv157\\Win64";

  Context.CopyFolder(Context.ScriptFolder + "\\steam_settings", SW + "\\steam_settings");

  var savePath = (Context.SavePath = SW + "\\steam_api64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = SW + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);

  var savePath = (Context.SavePath = EN + "\\EOSSDK-Win64-Shipping.dll");
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

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      //ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 25, true, true, true, true, true);

      System.Threading.Thread.Sleep(200);

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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};