Hub.Handler.Version = 12; // Released at https://hub.splitscreen.me/ on Fri Apr 29 2022 12:55:30 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "i2Er3L8TMs68hYWQC";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "very low", "low", "medium", "high", "ultra"];
var answers2 = ["No", "120", "90", "60", "30"];
var answers3 = ["no", "low", "medium", "high", "ultra"];
Game.AddOption("Change graphics settings?", "Set the quality of the in-game graphics.", "answers1", answers1);
Game.AddOption("Limit the frame rate (fps) of the game?", "Increase performance at the cost responsiveness, for 3-4 players 30 is recommended.", "answers2", answers2);
Game.AddOption(
  "Change texture quality? ",
  "Reduces the use of Vram by the gpu. If you exceed your vram's card the game will stutter a lot (choose low for 3-4 players if your gpu has 8gb or less of vram).",
  "answers3",
  answers3
);

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "Remnant\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "winmm.dll", "EOSSDK-Win64-Shipping.dll", "xinput1_3.dll"];
Game.GameName = "Remnant: From the Ashes";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Remnant-Win64-Shipping.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "617290";
Game.GUID = "Remnant From the Ashes";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Remnant\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.EpicEmuArgs = false;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Remnant";
Game.FakeFocus = false;
Game.HookFocus = false;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Local\\Remnant\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\Remnant\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Start a public game in one instance and join in the others using quickplay. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI. Create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Launch with Steam open if you have the Steam version.";
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

//ProtoInput

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = true;
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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height;

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "bUseDynamicResolution", "False"),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "DesiredScreenHeight", Context.Height)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Remnant\\Binaries\\Win64\\EOSSDK-Win64-Shipping.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_settings");
    System.IO.Directory.CreateDirectory(filePath);

    var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\steam_settings\\DLC.txt";
    var lines = [
      "1344680=Remnant: From the Ashes - Subject 2923",
      "1245150=Remnant: From the Ashes - Swamps of Corsus",
      "1147300=Remnant: From the Ashes - Bomber Hat",
      "1120500=Remnant: From the Ashes - Flight Team Cap",
      "1074850=Remnant: From the Ashes pre-order bundle"
    ];
    Context.WriteTextFile(dlc, lines);
  }

  var answers1 = Context.Options["answers1"];
  var answers2 = Context.Options["answers2"];
  var answers3 = Context.Options["answers3"];

  switch (answers3) {
    case "no":
      break;
    case "low":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "TextureQuality", "0")]);
      break;
    case "medium":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "TextureQuality", "1")]);
      break;
    case "high":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "TextureQuality", "2")]);
      break;
    case "ultra":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "TextureQuality", "3")]);
      break;
  }

  switch (answers2) {
    case "no":
      break;
    case "30":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MaxFPS", "30")]);
      break;
    case "60":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MaxFPS", "60")]);
      break;
    case "90":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MaxFPS", "90")]);
      break;
    case "120":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MaxFPS", "120")]);
      break;
  }

  switch (answers1) {
    case "no":
      break;
    case "very low":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "sg.FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MotionBlur", "false"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowDistance", "0.00"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "AntiAliasing", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ViewDistance", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "PostProcessing", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "EffectsQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "InputLag", "false")
      ]);
      break;
    case "low":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "sg.FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MotionBlur", "false"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowDistance", "0.20"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "AntiAliasing", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ViewDistance", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "PostProcessing", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "EffectsQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "InputLag", "false")
      ]);
      break;
    case "medium":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "1"),
        new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "sg.FoliageQuality", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MotionBlur", "false"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowDistance", "0.35"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowQuality", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "AntiAliasing", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ViewDistance", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "PostProcessing", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "EffectsQuality", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "FoliageQuality", "1"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "InputLag", "false")
      ]);
      break;
    case "high":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "2"),
        new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "sg.FoliageQuality", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MotionBlur", "true"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowDistance", "0.50"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowQuality", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "AntiAliasing", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ViewDistance", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "PostProcessing", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "EffectsQuality", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "FoliageQuality", "2"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "InputLag", "true")
      ]);
      break;
    case "ultra":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "3"),
        new Nucleus.IniSaveInfo("/Script/GunfireRuntime.GameUserSettingsGunfire", "sg.FoliageQuality", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "MotionBlur", "true"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowDistance", "0.70"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ShadowQuality", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "AntiAliasing", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "ViewDistance", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "PostProcessing", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "EffectsQuality", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "FoliageQuality", "3"),
        new Nucleus.IniSaveInfo("GameUserSettingsGunfire", "InputLag", "true")
      ]);
      break;
  }
};