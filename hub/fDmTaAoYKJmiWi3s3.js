Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Tue Jul 14 2026 14:45:22 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "fDmTaAoYKJmiWi3s3";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var fpscapanswers = ["60", "50", "45", "40", "30", "0"];
var servanswers = ["No", "Yes"];
var steamanswers = ["No", "Yes"];
Game.AddOption("Limit frames per second to:", "", "fps", fpscapanswers);
Game.AddOption(
  "Automatically Launch Server?",
  "Only use this if the server folder is in the same location as the game folder. Make sure both are installed to the same drive in Steam and you should be fine.",
  "serv",
  servanswers
);
Game.AddOption("Launch the first instance under your Steam account?", "REQUIRES DEDICATED SERVER. Allows you to unlock Steam achievements in the first instance.", "Steam", steamanswers);

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv153\\Win64", "Pal\\Binaries\\Win64", "Engine\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "EOSSDK-Win64-Shipping.dll", "steam_appid.txt", "FOV100.pak", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.GameName = "Palworld";
Game.ExecutableName = "Palworld-Win64-Shipping.exe";
Game.GUID = "Palworld";
Game.SteamID = "1623730";
Game.CreateSteamAppIdByExe = true;
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Pal\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.Hook.ForceFocusWindowName = "Pal";
Game.HasDynamicWindowTitle = false;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = true;
Game.ToggleUnfocusOnInputsLock = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
// Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Local\\Pal\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\Pal\\Saved\\Config\\Windows";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  'READ ALL OF THESE NOTES!\n \nTHIS HANDLER IS FOR THE STEAM VERSION OF THE GAME!\n \nOnce all instances are in game and connected lock input (default lock shortcut is the END key) for controllers and/or mice/keys to function correctly. Press the lock shortcut again to unlock the input when you have finished playing. Read about the two connection methods below.\n \nINVITE CODE INSTRUCTIONS (NO SERVER NEEDED):\n \nBEFORE LOCKING INPUT: Once all instances have loaded to the menu screen, using the mouse (even for controller instances) start a game on the first instance. \n \nOnce in game go to the menu and on the options page press the button to copy the invite code. \n \nOn the other instances, again using the mouse, select "Join Multiplayer Game (Invite Code)" and use ctrl+v to paste the invite code in to each instance and connect. \n \nDEDICATED SERVER INSTRUCTIONS:\n \nInstall the server either manually through Steam or by opening this link in your web browser - steam://install/2394010 \n \nTo use the auto launch server option ensure the server is installed to the same drive as the game if you have your library split across multiple drives.\n \nBEFORE LOCKING INPUT: Once all instances have loaded to the menu screen, using the mouse/mice (even for controller instances) select "Join Multiplayer Game" then press the "Connect" button, next to where it says 127.0.0.1:8211, to join the local server. Repeat for each instance. \n \n \nIf you experience crashes try disabling any overlays that might be added by apps like Discord/Geforce Experience/RivaTuner/etc \n \nHandler by Talos91 and PoundlandBacon, support our work here if you can - https://ko-fi.com/talos91';
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 20;

// OUTDATED OPTIONS, DISABLED TO AVOID CONFLICTS
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

// REQUIRED FOR MICE/KEYS
Game.SupportsMultipleKeyboardsAndMice = true;

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
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

// REQUIRED FOR CONTROLLERS
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;

// INPUT LOCK/UNLOCK
Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    if (!player.IsXInput) {
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);
    }
  }
};

Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    if (!player.IsXInput) {
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
    }
  }
};

Game.KillProcessesOnClose = ["PalServer", "PalServer-Win64-Test-Cmd"];

Game.Play = function() {
  Context.StartArguments = "-windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;

  var steam = Context.Options["Steam"];
  var fps = Context.Options["fps"];
  var serv = Context.Options["serv"];

  if (System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\Pal\\Saved\\Config\\Windows\\GameUserSettings.ini")) {
    var VideoConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Pal\\Saved\\Config\\Windows\\GameUserSettings.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", fps),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "True"),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "2")
    ]);

    if (Context.AspectRatioDecimal > 1.8) {
      var ARConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Pal\\Saved\\Config\\Windows\\engine.ini";
      Context.ModifySaveFile(ARConfig, ARConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/script/engine.localplayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainYFOV")]);
    } else {
      var ARConfig = Context.EnvironmentPlayer + "\\AppData\\Local\\Pal\\Saved\\Config\\Windows\\engine.ini";
      Context.ModifySaveFile(ARConfig, ARConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("/script/engine.localplayer", "AspectRatioAxisConstraint", "AspectRatio_MaintainXFOV")]);
    }
  }

  if (Context.PlayerID == 0 && serv == "Yes") {
    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.bat";
    var lines = ['cd /D "' + Context.RootInstallFolder + '"', "cd ..", "cd ..", "cd ..", "cd ..", 'start "" /B "PalServer\\PalServer.exe"'];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles([Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.bat"], false, 1);
  }

  if (Context.PlayerID == 0 && steam == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv153\\Win64\\steam_api64.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.OrigRootFolder, "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv153\\Win64\\steam_api64.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\Win64\\EOSSDK-Win64-Shipping.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.OrigRootFolder, "Engine\\Binaries\\Win64\\EOSSDK-Win64-Shipping.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};