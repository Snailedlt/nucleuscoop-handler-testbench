Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Thu Mar 30 2023 10:39:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "RtXq253ozMBKGjwQ5";
Hub.Maintainer.Name = "Dreadnot2950";
Hub.Maintainer.Id = "hve6SZzugBAfMLCmQ";

var answers1 = ["No", "Low", "Medium", "High", "Epic"];
Game.AddOption("Change graphics settings?", "Set the quality of the in-game graphics.", "answers1", answers1);

Game.KillMutex = ["UnrealEngine4"];
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64", "HighMoon\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.GameName = "Evil West";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "HighMoon-Win64-Shipping.exe";
Game.SteamID = "1065310";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Evil West";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "HighMoon\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Evil West";
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\HighMoon\\Saved\\Config\\WindowsNoEditor";
Game.UserProfileSavePath = "AppData\\Local\\HighMoon\\Saved\\SaveGames";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "To host a game in Multiplayer, you must first complete the tutorial. Once done, you can invite the other player. If you use keyboards and mice after all the instances have launched, resized and positioned correctly, press the END key once to lock the input for all instances to have their own working cursor and keyboard. You need to left click each mouse to make the emulated cursors appear after locking the input. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances when the input is unlocked. ";
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

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash " + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ResolutionQuality", "100.000000"),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "bUseDynamicResolution", "false"),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "FullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "LastConfirmedFullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "PreferredFullscreenMode", "1"),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "DesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "DesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/HighMoon.HMGameUserSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDesiredScreenHeight", "False")
  ]);

  if (Context.AspectRatioDecimal < 1.2) {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
  } else if (Context.AspectRatioDecimal > 1.8) {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
  } else {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Engine.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/Script/Engine.LocalPlayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
  }

  var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_settings";
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv147\\Win64\\steam_settings\\DLC.txt";
  var lines = ["1997840=Evil West - Wild Wild East Skin Pack"];
  Context.WriteTextFile(dlc, lines);

  var answers1 = Context.Options["answers1"];
  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";

  switch (answers1) {
    case "No":
      break;
    case "Low":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "0"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadingQuality", "0")
      ]);
      break;
    case "Medium":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "1"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadingQuality", "1")
      ]);
      break;
    case "High":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "2"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadingQuality", "2")
      ]);
      break;
    case "Epic":
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ViewDistanceQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.AntiAliasingQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadowQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.PostProcessQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.TextureQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.EffectsQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.FoliageQuality", "3"),
        new Nucleus.IniSaveInfo("ScalabilityGroups", "sg.ShadingQuality", "3")
      ]);
      break;
  }
  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

      //Wait a bit to make sure the message is sent

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 8000, true, true, false, false, false);
    }
  };
};