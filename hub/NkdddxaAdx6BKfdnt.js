Hub.Handler.Version = 18; // Released at https://hub.splitscreen.me/ on Tue Mar 11 2025 12:47:54 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "NkdddxaAdx6BKfdnt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption(
  "Launch all instances under your Steam account?",
  "Allows you to unlock Steam achievements, connect via LAN. Select No to use Steam emulation if you can not connect the instances.",
  "Steam",
  answers1
);

Game.DirSymlinkExclusions = [
  "OakGame\\Binaries\\Win64",
  "Engine\\Binaries\\ThirdParty\\steamworks\\steamv147\\win64\\steam_settings",
  "Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\steam_settings",
  "Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\settings"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.GameName = "Borderlands 3";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Borderlands3.exe";
Game.SteamID = "397540";
Game.GUID = "Borderlands 3";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "OakGame\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "splashscreen";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Borderlands® 3";
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "Documents\\My Games\\Borderlands 3\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "Documents\\My Games\\Borderlands 3\\Saved\\SaveGames";
Game.Description =
  "Steam version only. Go to network options, network mode and select LAN in each instance. Disable Steam input if the controllers are not restricting correctly. If you use keyboards/mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor, you need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Limit the fps for better performance, you can also alt-tab to the Nucleus app window to unfocus all instances and even out fps, the game windows will remain on top.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenProcessGrab = 7;
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
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS.

Game.Play = function() {
  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/OakGame.OakGameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/OakGame.OakGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/OakGame.OakGameUserSettings", "ResolutionSizeY", Context.Height)
  ]);

  if (Context.IsKeyboardPlayer) {
    Context.StartArguments = "-windowed -AlwaysFocus -nosplash -NoController";
  } else {
    Context.StartArguments = "-windowed -AlwaysFocus -nosplash";
  }

  var steam = Context.Options["Steam"];

  if (steam == "No") {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\steam_settings");
    System.IO.Directory.CreateDirectory(filePath);

    var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\steam_settings\\disable_overlay.txt";
    var lines = [""];
    Context.WriteTextFile(nolay, lines);

    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\steam_settings\\DLC.txt";
    var lines = [
      "1537993=Disciples of the Vault Zane Cosmetic Pack",
      "1537992=Disciples of the Vault Moze Cosmetic Pack",
      "1537991=Disciples of the Vault FL4K Cosmetic Pack",
      "1537990=Disciples of the Vault Amara Cosmetic Pack",
      "1396474=Borderlands 3: Season Pass 2",
      "1396473=Borderlands 3: FL4K Final Form Pack",
      "1396472=Borderlands 3: Moze Final Form Pack",
      "1396471=Borderlands 3: Zane Final Form Pack",
      "1396470=Borderlands 3: Amara Final Form Pack",
      "1361830=Borderlands 3: Designer's Cut",
      "1256890=Borderlands 3: Digital Deluxe Extras",
      "1233062=Borderlands 3: Season Pass",
      "1233061=Borderlands 3: Psycho Krieg and the Fantastic Fustercluck",
      "1233060=Borderlands 3: Bounty of Blood",
      "1232257=Borderlands 3: Guns, Love, and Tentacles",
      "1232256=Borderlands 3: Moxxi's Heist of the Handsome Jackpot",
      "1232255=Borderlands 3: Toy Box Weapons Pack",
      "1232254=Borderlands 3: Retro Cosmetic Pack",
      "1232253=Borderlands 3: Neon Cosmetic Pack",
      "1232252=Borderlands 3: Gold Weapons Skins Pack",
      "1232251=Borderlands 3: Gearbox Cosmetic Pack",
      "1232250=Borderlands 3: Butt Stallion Pack",
      "1232240=Borderlands 3 Boost Mods Pack"
    ];
    Context.WriteTextFile(dlc, lines);
  }

  if (steam == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\steam_api64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.OrigRootFolder, "Engine\\Binaries\\ThirdParty\\steamworks\\steamv154\\win64\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

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

      //Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages.
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      //ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
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

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5000, true, true, false, false, false);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};