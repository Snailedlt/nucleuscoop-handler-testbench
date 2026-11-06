Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Wed Apr 19 2023 03:43:01 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ye9NKnb7eBFREecZc";
Hub.Maintainer.Name = "Zensuu";
Hub.Maintainer.Id = "sshRgms8c4xET4sCy";

var answers1 = ["Yes", "No"];
Game.AddOption("Would you like to start a server on startup?", 'Choose "No" only if you are hosting the server outside of Nucleus or from another comptuter.', "Server", answers1);
var answers2 = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
Game.AddOption("Select the maximum amount of players.", "Empty slots will be filled with bots if bots are enabled. Raising this with bots enabled will impact performance.", "Slots", answers2);
var answers3 = ["Yes", "No"];
Game.AddOption("Would you like to enable bots?", "", "Bots", answers3);
var answers4 = [
  "ar_ThePit",
  "ar_BloodMoon",
  "ar_CellBlock",
  "ar_OldArena",
  "ar_Spire",
  "ar_StormDrain",
  "ar_Tunnel",
  "tdm_Bridge",
  "tdm_Courtyard",
  "tdm_DryDock",
  "tdm_FalconRidge",
  "tdm_Mirrors",
  "tdm_RockBottom",
  "tdm_SunkenCity",
  "to_Bazaar",
  "to_Academy",
  "to_Ravine",
  "cp_Bridge",
  "cp_Courtyard",
  "cp_RockBottom",
  "cp_SunkenCity",
  "ctf_Bridge",
  "ctf_Courtyard",
  "ctf_DryDock",
  "ctf_Lighthouse",
  "ctf_Mirrors",
  "ctf_RockBottom",
  "ps_Courtyard",
  "ps_DryDock",
  "ps_Lighthouse"
];
Game.AddOption(
  "Select the map/gamemode you would like to start on",
  "AR = Arena                       TDM = Team Deathmatch\nTO = Team Objective               CP = Capture Points\nCTF = Capture The FLag         PS = Ark Escort",
  "Map",
  answers4
);

Game.ExecutableContext = ["BugSplat64.dll"];
Game.DirSymlinkExclusions = ["TBL\\Binaries\\Win64", "TBL\\Binaries\\Win64\\steam_settings", "TBL\\Config", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win64", "TBL\\Content\\Movies"];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_api.dll",
  "steam_appid.txt",
  "xinput1_3.dll",
  "local_save.txt",
  "DefaultGame.ini",
  "OverrideEngine.ini",
  "DefaultGameUserSettings.ini",
  "logosSequence.mp4",
  "lore.mp4",
  "tbs.mp4",
  "ue4_logo.mp4"
];
Game.FileSymlinkCopyInstead = ["TBLServer-Win64-Shipping.exe"];
Game.KillProcessesOnClose = ["TBLServer-Win64-Shipping"];
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "TBL-Win64-Shipping.exe";
Game.SteamID = "368420";
Game.GUID = "Mirage Arcane Warfare";
Game.GameName = "Mirage: Arcane Warfare";
Game.MaxPlayers = 32;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "TBL\\Binaries\\Win64";
Game.HideTaskbar = true;
Game.SupportsPositioning = true;
Game.SetWindowHookStart = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Mirage: Arcane Warfare";
Game.HasDynamicWindowTitle = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UseDevReorder = false;
Game.UserProfileConfigPath = "AppData\\Local\\TBL\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\368420";
Game.Description =
  "IMPORTANT: This requires the TBLServer-Win64-Shipping.exe from the official dedicated server files to be placed in your Mirage Arcane Warfare's TBL\\Binaries\\Win64 folder. You can download it here: https://drive.google.com/u/0/uc?id=1nqgf1S9eTnIL8OPX9sPU7EHXePiVlht8 \nMake sure your windows scaling is set to 100% before launch, either through the auto scale nucleus setting or through your windows scaling setting. Wait until all instances have resized and repositioned. Join the server through the server browser with each player, it may take a few minutes to appear. If for some reason it does not show up, you can join manually by entering 'open 127.0.0.1' into the console. You can alt tab and use the mouse and keyboard to select the class, weapons, customization, and abilities for each gamepad player. If you have keyboard players, after all players have joined and all gamepad players have chosen their options you can press END to lock input and give them their own cursor. If at any point you can not see your mouse cursor press HOME to make it visible. Press the END key again to unlock input. While input is unlocked you can use CTRL+Q to close all instances.";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 5;
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
Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = true;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
//Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.BlockedMessages = [0x0008];

Game.Play = function() {
  Context.StartArguments = "-AlwaysFocus -nosplash -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var server = Context.Options["Server"];
  var slots = Context.Options["Slots"];
  var bots = Context.Options["Bots"];
  var map = Context.Options["Map"];

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Config\\DefaultGame.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "configs\\DefaultGame.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var enginePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Config\\OverrideEngine.ini");
  var lines = ["bVACEnabled=0"];
  Context.WriteTextFile(enginePath, lines);

  var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Binaries\\Win64\\steam_settings";
  System.IO.Directory.CreateDirectory(filePath);

  var statPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Binaries\\Win64\\steam_settings\\stats.txt";
  var statPkgOrigin = System.IO.Path.Combine(Game.Folder, "configs\\stats.txt");
  System.IO.File.Copy(statPkgOrigin, statPath, true);

  var overlay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Binaries\\Win64\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(overlay, lines);

  var cfgPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Config\\DefaultGame.ini";
  var defsetPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Config\\DefaultGameUserSettings.ini";
  var setPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";

  Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameSession", "MaxPlayers", slots)]);

  if (bots == "Yes") {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/TBL.TBLGameMode", "bConfigBotAssistedServer", "true")]);
  }

  if (bots == "No") {
    Context.ModifySaveFile(cfgPath, cfgPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/TBL.TBLGameMode", "bConfigBotAssistedServer", "false")]);
  }

  Context.ModifySaveFile(setPath, setPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/TBL.TBLGameUserSettings", "FullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/TBL.TBLGameUserSettings", "LastConfirmedFullscreenMode", "1")
  ]);

  Context.ModifySaveFile(defsetPath, defsetPath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastConfirmedFullscreenMode", "1")
  ]);

  if (Context.PlayerID == 0) {
    Context.ModifySaveFile(setPath, setPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/TBL.TBLGameUserSettings", "MusicMasterVolume", "75.000000")]);

    Context.ModifySaveFile(defsetPath, defsetPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "MusicMasterVolume", "75.000000")]);
  }

  if (Context.PlayerID > 0) {
    Context.ModifySaveFile(setPath, setPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/TBL.TBLGameUserSettings", "MusicMasterVolume", "0.000000")]);

    Context.ModifySaveFile(defsetPath, defsetPath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "MusicMasterVolume", "0.000000")]);
  }

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Binaries\\Win64\\startserver.bat";
  var lines = ["TBLServer-Win64-Shipping.exe " + map + " -dedicated=true -log -seekfreeloadingserver -Port=7777 -QueryPort=7778"];
  Context.WriteTextFile(Bat, lines);

  if (server == "Yes") {
    Context.RunAdditionalFiles(["1|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TBL\\Binaries\\Win64\\startserver.bat"], false, 0);
  }

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, true, true);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

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
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};