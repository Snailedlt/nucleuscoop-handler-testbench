Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Jun 11 2025 23:05:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ZpDxPT3WnCeBNyLMo";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["nativeDX11x64", "config.ini"];
Game.KillMutex = ["sSkeletonMain"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["nativeDX11x64", "settings", "steam_settings"];
Game.FileSymlinkExclusions = ["game.exe", "steam_api64.dll", "steamclient_loader.exe", "ColdClientLoader.ini", "steam_appid.txt", "local_save.txt", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["config.ini", "dinput8.dll"];
Game.GameName = "Monster Hunter Stories 2: Wings of Ruin";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "game.exe";
Game.SteamID = "1277400";
Game.GUID = "Monster Hunter Stories 2 Wings of Ruin";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldbergNoOGSteamDlls = true;
Game.CustomSteamApiDllPath = ["steam_api64.dll"];
Game.GoldbergNoLocalSave = true;
Game.GoldbergLanguage = "english";
Game.DontRemoveBorders = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MONSTER HUNTER STORIES 2: WINGS OF RUIN";
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1277400\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "READ: On first run set each instance to borderless and in the resolution that matches the window size (the game does not see all custom resolutions, for example it sees 960x540 but not 960x1080 and 1920x540), select the language of the game you want too. You have to unlock the co-op and multiplayer quests in all instances to connect the instances, they unlock about 3-4 quests deep on the 2nd village. Set your monitor scale to 100% if the instances do not resize correctly. If you use keyboards/mice after the instances finish setting up press the END key once to lock the input for all instances to have their own working cursor. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. In-game right click if you can not move the camera. The in-game res has to match the window size for the keyboards/mice to work correctly.";
Game.PauseBetweenContextAndLaunch = 2;
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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;
Game.ProtoInput.AllowFakeCursorOutOfBounds = false;
Game.ProtoInput.ExtendFakeCursorBounds = false;
Game.ProtoInput.SetWindowPosHook = true;
Game.ProtoInput.SetWindowStyleHook = false;
Game.ProtoInput.AutoHideTaskbar = true;

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
Game.ProtoInput.UseOpenXinput = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
//Game.ProtoInput.BlockedMessages = [0x0008, 0x02A3, 0x02A1]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    //new Nucleus.IniSaveInfo("DISPLAY", "Aspect", Context.AspectRatio),
    new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("DISPLAY", "ScreenMode", "BORDERLESS"),
    //new Nucleus.IniSaveInfo("DISPLAY", "BorderlessWindowType", "KEEPEASPECT"),
    new Nucleus.IniSaveInfo("Window", "MainX", Context.PosX),
    new Nucleus.IniSaveInfo("Window", "MainY", Context.PosY)
  ]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\steam_appid.txt";
  var lines = ["1277400"];
  Context.WriteTextFile(appid, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "1552588=Monster Hunter Stories 2: Wings of Ruin - Launch Starter Pack",
    "1552585=Monster Hunter Stories 2: Wings of Ruin - Character Edit Ticket Three-Pack",
    "1552584=Monster Hunter Stories 2: Wings of Ruin - Character Edit Ticket Two-Pack",
    "1552583=Monster Hunter Stories 2: Wings of Ruin - Character Edit Ticket One-Pack",
    "1552582=Monster Hunter Stories 2: Wings of Ruin - Rider's Hairstyle: Mohawk Kulu",
    "1552581=Monster Hunter Stories 2: Wings of Ruin - Rider's Hairstyle: Mizutsune Braid",
    "1552580=Monster Hunter Stories 2: Wings of Ruin - Rider's Hairstyle: Lumu Afro",
    "1552569=Monster Hunter Stories 2: Wings of Ruin - Rider's Hairstyle: Shaggy Legiana",
    "1552568=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Velkhana Costume",
    "1552567=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Fulgur Anja Costume",
    "1552566=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Anjanath Costume",
    "1552565=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Paolumu Costume",
    "1552564=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Legiana Costume",
    "1552563=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Kulu-Ya-Ku Costume",
    "1552562=Monster Hunter Stories 2: Wings of Ruin - Navirou's Outfit: Downy Duds",
    "1552561=Monster Hunter Stories 2: Wings of Ruin - Rider's Layered Armor: Hakum Rider Outfit",
    "1552560=Monster Hunter Stories 2: Wings of Ruin - Ena's Outfit: Kamura Maiden Outfit",
    "1461854=Monster Hunter Stories 2: Wings of Ruin - Ena's Outfits: Cheerleader Three-Pack (Blue/Orange/Pink)",
    "1461853=Monster Hunter Stories 2: Wings of Ruin - Ena's Outfit: Felyne Shelter Garb",
    "1461852=Monster Hunter Stories 2: Wings of Ruin - Ena's Outfit: Ancient Raiment",
    "1461851=Monster Hunter Stories 2: Wings of Ruin - Ena's Outfit: Tropical Dress",
    "1461850=Monster Hunter Stories 2: Wings of Ruin - Deluxe Kit"
  ];
  Context.WriteTextFile(dlc, lines);

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

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, false);

      System.Threading.Thread.Sleep(1000);

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
      //ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
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