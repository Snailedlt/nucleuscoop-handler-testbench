Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Jun 08 2022 16:00:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "RL7eQPoSBPELTtASw";
Hub.Maintainer.Name = "gotenks";
Hub.Maintainer.Id = "PKW8fDRgHFm6aPaYH";

var answers1 = ["No", "low", "medium", "high", "ultra"];
var answers2 = ["No", "240", "144", "120", "100", "85", "75", "60", "30"];
var answers3 = ["no", "low", "medium", "high", "ultra"];
Game.AddOption("Change graphics settings?", "Set the quality of the in-game graphics.", "answers1", answers1);
Game.AddOption("Limit the frame rate (fps) of the game?", "Increase performance at the cost responsiveness, for 3-4 players 30 is recommended.", "answers2", answers2);
Game.AddOption(
  "Change texture quality? ",
  "Reduces the use of Vram of your gpu. If you exceed your vram's card the game will stutter a lot (low is recommended for 3-4 players if your gpu has 8gb or less of vram).",
  "answers3",
  answers3
);
Game.KillMutex = ["DH"];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "DH\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.GameName = "Destroy All Humans Clone Carnage";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DH-Win64-Shipping.exe";
Game.CreateSteamAppIdByExe = true;
Game.SteamID = "1872550";
Game.GUID = "Destroy All Humans Clone Carnage";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "DH\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Destroy All Humans! - Clone Carnage";
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
Game.UserProfileSavePath = "AppData\\Local\\DH\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\DH\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Create an Online Multiplayer match in one instance and join in the others. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own cursor. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI. To even out fps alt tab to any other window (the nucleus app for example) and then press the END key to lock the input.";
Game.PauseBetweenStarts = 5;

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
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "true"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "false"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "DesiredScreenHeight", Context.Height)
  ]);

  var answers1 = Context.Options["answers1"];
  var answers2 = Context.Options["answers2"];
  var answers3 = Context.Options["answers3"];

  switch (answers3) {
    case "no":
      break;
    case "low":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "0")]);
      break;
    case "medium":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "1")]);
      break;
    case "high":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "2")]);
      break;
    case "ultra":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "3")]);
      break;
  }

  if (answers2 != "No") {
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", answers2 + ".000000")]);
  }

  switch (answers1) {
    case "No":
      break;

    case "low":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "0"),
        //new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "0")
      ]);
      break;
    case "medium":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "1"),
        // new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "1")
      ]);
      break;
    case "high":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "2"),
        // new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "2")
      ]);
      break;
    case "ultra":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "3"),
        //new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "3")
      ]);
      break;
  }
};