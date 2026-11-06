Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Sep 13 2024 20:04:37 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "gbu2MNRCZQi3E8Dg7";
Hub.Maintainer.Name = "happyexpress";
Hub.Maintainer.Id = "yasq5hW6LH5sjwQty";

Game.Description =
  "Only compatible with the Operation Throwback project: \n" +
  "https://www.r6downloads.com/discord \n" +
  "Only Vanilla-Y4S4 are supported. \n" +
  "\n" +
  "Steps: \n" +
  "-Close Steam. \n" +
  "-Make sure your RainbowSix.exe has 'Run this program as an administrator' set to OFF. \n" +
  "-Add your Nucleus Co-op install folder to your anti-virus program's exclusions. \n" +
  "-Inputs will lock automatically once all players launch. Press the End key to unlock inputs and end the session. \n" +
  "-Player 1 should go to Multiplayer -> Custom Game -> Local -> Create. \n" +
  "-Everyone else can go to Multiplayer -> Custom Game -> Local -> Join. \n" +
  "\n" +
  "To play Terrorist Hunt or Outbreak: \n" +
  "-Enable the R6Liberator option and set up a custom game like before. \n" +
  "-Have everyone join the Blue team. \n" +
  "-Press End to unlock inputs and then Ctrl+T to minimize the game windows. \n" +
  "-Go to the R6Liberator window, open the Terrorist Hunt or Outbreak category, and double click a map. \n" +
  "-Press Ctrl+T and End to restore the game windows and start the match. \n";

Game.FileSymlinkExclusions = ["RainbowSix.exe"];
Game.FileSymlinkCopyInstead = ["CPlay.ini", "uplay_r2.ini"];

Game.GameName = "Tom Clancys Rainbow Six Siege";
Game.HandlerInterval = 100;
Game.SupportsKeyboard = false;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
//Game.KeepSymLinkOnExit = true;
Game.GUID = "RainbowSixSiege";
Game.ExecutableName = "RainbowSix.exe";
Game.LauncherExe = "SHook.exe";
Game.LauncherExeIgnoreFileCheck = true;
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;

Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;

Game.XInputPlusDll = [];
Game.PauseBetweenStarts = 0;
Game.PauseBetweenContextAndLaunch = 0;
Game.PauseBetweenProcessGrab = 30;
Game.HideDesktop = true;
Game.HideTaskbar = true;
Game.RequiresAdmin = true;
Game.StartArguments = "/belaunch";
//Game.SetForegroundWindowElsewhere = true;
Game.KillProcessesOnClose = ["R6_Liberator_0.0.0.22.exe"];

Game.SupportsMultipleKeyboardsAndMice = true;

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
Game.DrawFakeMouseCursor = false;

Game.LockInputAtStart = true;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.BlockedMessages = [0x0008];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.AutoHideTaskbar = true;

// var VersionAnswers = ["Vanilla-Y6S3", "Y6S4-Y8S4"];
// Game.AddOption(
// "Select your game version."
// ,""
// ,"Version"
// ,VersionAnswers
// );

var MusicAnswers = ["Yes", "No"];
Game.AddOption("Enable music only for first instance?", "", "Music", MusicAnswers);

var LibAnswers = ["No", "Yes"];
Game.AddOption("Use R6Liberator?", "Enable this to play Terrorist Hunt or Outbreak.", "UseLiberator", LibAnswers);

var ResAnswers = ["1x", "1.5x", "2x", "4x", "0.8x", "0.6x", "0.4x"];
var ResValues = [1, 1.5, 2, 4, 0.8, 0.6, 0.4];
Game.AddOption("Resolution Scale", "Scale the internal rendering resolution relative to the window size.", "ResolutionScale", ResAnswers);

var GfxAnswers = ["None", "Low", "Medium", "High", "Very High"];
Game.AddOption("Graphics Preset", "Set the graphics settings to a preset.", "GraphicsPreset", GfxAnswers);

Game.Play = function() {
  InstanceFolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);
  var UserRoot = "C:\\Users\\" + Context.UserName;
  //var Version = Context.Options["Version"];
  var Music = Context.Options["Music"] == "Yes";
  var UseLiberator = Context.Options["UseLiberator"] == "Yes";
  var ResolutionScale = ResValues[ResAnswers.indexOf(Context.Options["ResolutionScale"])];
  var GraphicsPreset = Context.Options["GraphicsPreset"];

  if (UseLiberator && Context.PlayerID == 0) {
    Context.RunAdditionalFiles([Game.Folder + "\\R6_Liberator_0.0.0.22.exe"], false, "Press OK when R6Liberator starts.", 0, false, false, true, false);
  }

  System.IO.Directory.CreateDirectory(InstanceFolder + "\\plugins");

  const copiedFiles = ["EasyHook64.dll", "SHook.exe", "SHook.ini", "plugins\\R6Fix.dll"];

  for (let index = 0; index < copiedFiles.length; ++index) {
    const fileName = copiedFiles[index];
    System.IO.File.Copy(Game.Folder + "\\R6Fix\\" + fileName, InstanceFolder + "\\" + fileName, true);
  }

  var PlayerSettings = UserRoot + "\\Documents\\My Games\\Rainbow Six - Siege\\" + Context.Nickname;

  if (!System.IO.File.Exists(PlayerSettings + "\\GameSettings.ini")) {
    // If this folder doesn't exist, we can assume first time setup needs to be done
    System.IO.Directory.CreateDirectory(PlayerSettings);
    var savePath = PlayerSettings + "\\GameSettings.ini";
    var savePkgOrigin = Game.Folder + "\\GameSettings.ini";
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  Context.ModifySaveFile(
    PlayerSettings + "\\GameSettings.ini",
    PlayerSettings + "\\GameSettings.ini",
    Nucleus.SaveType.INI,
    [
      new Nucleus.IniSaveInfo("DISPLAY_SETTINGS", "ResolutionWidth", (Context.Width * ResolutionScale) | 0),
      new Nucleus.IniSaveInfo("DISPLAY_SETTINGS", "ResolutionHeight", (Context.Height * ResolutionScale) | 0),
      new Nucleus.IniSaveInfo("DISPLAY_SETTINGS", "WindowMode", "1"),
      new Nucleus.IniSaveInfo("QUALITY_SETTINGS", "QualityPresetName", GraphicsPreset),
      new Nucleus.IniSaveInfo("QUALITY_SETTINGS", "ResolutionHeight", GraphicsPreset)
    ].concat(
      Music && Context.PlayerID > 0
        ? [
            new Nucleus.IniSaveInfo("AUDIO", "VolumeMusic", "0.000000"),
            new Nucleus.IniSaveInfo("AUDIO", "InGameMusicVolume", "0.000000"),
            new Nucleus.IniSaveInfo("AUDIO", "MenuMusicVolume", "0.000000")
          ]
        : []
    )
  );

  // Player nicknames
  Context.ModifySaveFile(InstanceFolder + "\\CPlay.ini", InstanceFolder + "\\CPlay.ini", Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Uplay", "Username", Context.Nickname),
    new Nucleus.IniSaveInfo("Uplay", "UserId", Context.Nickname)
  ]);
  // if (Version == "Vanilla-Y6S3")
  // {
  // Context.ModifySaveFile(InstanceFolder + "\\CPlay.ini", InstanceFolder + "\\CPlay.ini", Nucleus.SaveType.INI, [
  // new Nucleus.IniSaveInfo("Uplay", "Username", Context.Nickname)
  // ,new Nucleus.IniSaveInfo("Uplay", "UserId", Context.Nickname)
  // ]);
  // }
  // else
  // {
  // Context.ModifySaveFile(InstanceFolder + "\\uplay_r2.ini", InstanceFolder + "\\uplay_r2.ini", Nucleus.SaveType.INI, [
  // new Nucleus.IniSaveInfo("Settings", "Username", Context.Nickname)
  // ,new Nucleus.IniSaveInfo("Settings", "UserId", Context.Nickname)
  // ]);
  // }

  Game.ExecutableName = Context.PlayerID == 0 ? "RainbowSix.exe" : "RainbowSix" + (Context.PlayerID + 1) + ".exe";

  System.IO.File.Copy(Context.RootInstallFolder + "\\RainbowSix.exe", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\" + Game.ExecutableName, true);

  Context.ModifySaveFile(InstanceFolder + "\\SHook.ini", InstanceFolder + "\\SHook.ini", Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "ProgramName", Game.ExecutableName)]);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

    ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);

    // Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move moessages
    //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

    ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, true, true, true, true);

    // Disable the bypass: let the input be processed by Proto Input
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
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

    // Intentionally disable focus so all the instances don't respond to input at the same time
    ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

    ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

    // Intentionally disable focus so all the instances don't respond to input at the same time
    ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

    // Enable the bypass: allow any raw input to pass
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
  }
};

function RunCMD(fileName, cmdScript) {
  var cmdFile = instanceFolder + "\\" + fileName + ".bat";
  Context.WriteTextFile(cmdFile, cmdScript);
  Context.RunAdditionalFiles(["all|" + cmdFile], false, 0, true, false);
}