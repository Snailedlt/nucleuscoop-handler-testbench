Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Thu Sep 03 2026 15:57:39 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "D5QoyqGRxeBETvuRg";
Hub.Maintainer.Name = "happyexpress";
Hub.Maintainer.Id = "yasq5hW6LH5sjwQty";

Game.Description =
  "The FOB Invasions mode is now playable, but on Windows 10 only. Sadly there are unresolvable conflicts between Windows 11 security features + the steam emulator + the singleplayer DRM. \n" +
  " \n" +
  "Requirements: \n" +
  "MGSV Server Emulator by unknown321 https://github.com/mxmstr/fuse/releases/tag/nucleus \n" +
  " \n" +
  "-Extract the MGSV Server Emulator files and place them in NucleusCo-op\\handlers\\Metal Gear Solid V - Metal Gear Online 3\\Emu \n" +
  "-Add your Nucleus Co-op app folder to your antivirus exclusions. \n" +
  "-Open Nucleus as Administrator. \n\n" +
  "To play Metal Gear Online 3: \n" +
  "-Set the Game Mode to 'Metal Gear Online 3' and start the handler. \n" +
  "-Inputs will lock automatically. Press the End key to unlock them when you want to end the session. \n" +
  "-Once ingame, Player 1 can press Start -> Create Match to create a lobby. \n" +
  "-Everyone else can press Start -> Select Match to join it.\n\n" +
  "To play FOB Invasions: \n" +
  "-Set the Game Mode to 'FOB Invasions' and start the handler. \n" +
  "-Inputs will lock automatically. Press the End key to unlock them when you want to end the session. \n" +
  "-Once both players are at the start menu, Player 2 can press Continue -> Start -> Missions -> FOB Missions and select Player 1 as their infiltration target. \n" +
  "-When Player 1 presses Continue, they'll get an emergency mission notification. Go to Start -> Missions -> Mission List and select it.\n" +
  "-If you miss the notification, simply press Select -> Return To Title Menu -> Continue to try again.";

Game.FileSymlinkExclusions = ["mgsvmgo.exe", "mgsvtpp.exe", "dinput8.dll", "denuvo64.dll", "winmm.dll", "MGSVFix.asi", "MGSVFix.ini"];
Game.KillMutex = ["MGO 3.0"];
Game.PartialMutexSearch = true;

Game.GameName = "Metal Gear Solid V - Metal Gear Online 3";
Game.HandlerInterval = 100;
Game.SupportsKeyboard = false;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = false;
Game.GUID = "MGSV";
Game.ExecutableName = "mgsvmgo.exe";
Game.StartArguments = "/AppData 99c85cdbf2c837d50d37c82af2c837d5c12d5e80fbc837d5f2c837d5f2c837d5f2";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 8;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = [];
// Game.ProcessChangesAtEnd = true;
Game.PauseBetweenStarts = 0;
Game.PauseBetweenContextAndLaunch = 0;
Game.PauseBetweenProcessGrab = 10;
//Game.PromptBetweenInstances = true;

Game.RequiresAdmin = true;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.SteamID = "287700";
Game.GoldbergNoLocalSave = true;
Game.UserProfileSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = true;
Game.ThirdPartyLaunch = true;
Game.IgnoreThirdPartyPrompt = true;
Game.ForceEnvironmentUse = true;

//Game.KillProcessesOnClose = ["fuse.exe"];

//Game.DontResize = true;
//Game.DontReposition = true;
//Game.DontRemoveBorders = true;
Game.SetWindowHook = true;
// Game.NotTopMost = true;
// Game.HideDesktop = false;

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

var ModeAnswers = ["Metal Gear Online 3", "FOB Invasions (Windows 10 only)"];
Game.AddOption("Game Mode", "", "GameMode", ModeAnswers);

var ResAnswers = ["1080p", "900p", "720p", "576p", "1440p", "2160p"];
var ResValues = [
  [1920, 1080],
  [1600, 900],
  [1280, 720],
  [1024, 576],
  [2560, 1440],
  [3840, 2160]
];
Game.AddOption("Internal Resolution", "", "InternalResolution", ResAnswers);

var GfxAnswers = ["None", "Low", "Medium", "High"];
Game.AddOption("Graphics Preset", "Set the graphics settings to a preset.", "GraphicsPreset", GfxAnswers);

// depth_of_field | effect | lighting | model_detail | motion_blur_amount | postprocess | shadow | ssao | texture | texture_filtering | volumetric_clouds
const GFXPresets = {
  High: ["Enable", "High", "High", "High", "Large", "High", "High", "High", "High", "High", "Off"],
  Medium: ["Enable", "Low", "Low", "Medium", "Large", "High", "Medium", "Off", "Medium", "Medium", "Off"],
  Low: ["Enable", "Low", "Low", "Low", "Medium", "Low", "Low", "Off", "Low", "Medium", "Off"]
};

var instanceFolder = "";

Game.Play = function() {
  instanceFolder = Context.GetFolder(Nucleus.Folder.InstancedGameFolder);
  const userRoot = Context.EnvironmentPlayer;
  const downgrade = true;
  const GameModeOption = Context.Options["GameMode"];
  const InternalResolution = ResValues[ResAnswers.indexOf(Context.Options["InternalResolution"])];
  const GFXPresetOption = Context.Options["GraphicsPreset"];
  const GFXPreset = GFXPresetOption == "None" ? null : GFXPresets[GFXPresetOption];

  var copiedFiles = ["dinput8.dll", "plugins\\MGSVFix.asi", "plugins\\MGSVFix.ini"];

  if (GameModeOption != "Metal Gear Online 3") {
    Game.ExecutableName = "mgsvtpp.exe";
    Game.KillMutex = ["METAL GEAR SOLID V"];
    copiedFiles = copiedFiles.concat(["denuvo64.dll", "winmm.dll"]);
  }

  System.IO.Directory.CreateDirectory(instanceFolder + "\\plugins");

  for (let index = 0; index < copiedFiles.length; ++index) {
    const fileName = copiedFiles[index];
    System.IO.File.Copy(Game.Folder + "\\" + fileName, instanceFolder + "\\" + fileName, true);
  }

  if (
    !System.IO.Directory.Exists(userRoot + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\287700\\local") ||
    !System.IO.Directory.Exists(userRoot + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\311340\\remote")
  ) {
    RunCMD("copysaves", ['xcopy /E /I /Y "' + Game.Folder + "\\Goldberg SteamEmu Saves" + '" "' + userRoot + "\\AppData\\Roaming\\Goldberg SteamEmu Saves" + '"'], "");
    Context.Wait(2000);
  }

  const path = userRoot + "\\AppData\\Roaming\\Goldberg SteamEmu Saves\\287700\\local\\TPP_GRAPHICS_CONFIG";
  const lines = (GFXPreset == null
    ? []
    : [
        '5|         "depth_of_field" : "' + GFXPreset[0] + '",',
        '6|         "effect" : "' + GFXPreset[1] + '",',
        '7|         "lighting" : "' + GFXPreset[2] + '",',
        '8|         "model_detail" : "' + GFXPreset[3] + '",',
        '9|         "motion_blur_amount" : "' + GFXPreset[4] + '",',
        '10|         "postprocess" : "' + GFXPreset[5] + '",',
        '11|         "shadow" : "' + GFXPreset[6] + '",',
        '12|         "ssao" : "' + GFXPreset[7] + '",',
        '13|         "texture" : "' + GFXPreset[8] + '",',
        '14|         "texture_filtering" : "' + GFXPreset[9] + '",',
        '15|         "volumetric_clouds" : "' + GFXPreset[10] + '"'
        //]);
      ]
  ).concat(['21|         "height" : ' + InternalResolution[1] + ",", '23|         "width" : ' + InternalResolution[0] + ",", '24|         "window_mode" : "Windowed"']);
  Context.ReplaceLinesInTextFile(path, lines);

  // Downgrade the executables if needed
  if (Context.PlayerID == 0) {
    if (!System.IO.File.Exists(Game.Folder + "\\mgsvtpp.exe") || !System.IO.File.Exists(Game.Folder + "\\mgsvmgo.exe")) {
      RunPowershell(
        "downgrade",
        [
          "$FusePath = '" + Game.Folder + "\\Emu\\fuse.exe';								",
          "$XDeltaPath = '" + Game.Folder + "\\xdelta.exe';								",
          "if (-Not (Test-Path -Path $FusePath -PathType Leaf)) {                                                                  ",
          '	[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");                                           	',
          '	[System.Windows.Forms.MessageBox]::Show("MGSV Server Emulator files not found! Did you follow the instructions in the handler notes?");      ',
          "	Exit;                                                                                                                   ",
          "}                                                                                                                          ",
          "Write-Host 'Creating downgraded executables...'                                                                                     ",
          "& $XDeltaPath -d -s '" + Context.RootInstallFolder + "\\mgsvtpp.exe' '" + Game.Folder + "\\Emu\\downgrade_tpp.xdelta' '" + Game.Folder + "\\mgsvtpp.exe' ;",
          "if ($LASTEXITCODE -ne 0) {                                                                                                 ",
          '	[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");                                           	',
          '	[System.Windows.Forms.MessageBox]::Show("TPP EXE downgrade failed! Are you sure you have the latest legit Steam version?");',
          "	Exit;                                                                                                                   ",
          "}                                                                                                                          ",
          "& $XDeltaPath -d -s '" + Context.RootInstallFolder + "\\mgsvmgo.exe' '" + Game.Folder + "\\Emu\\downgrade_mgo.xdelta' '" + Game.Folder + "\\mgsvmgo.exe' ;",
          "if ($LASTEXITCODE -ne 0) {                                                                                                 ",
          '	[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");                                           	',
          '	[System.Windows.Forms.MessageBox]::Show("MGO EXE downgrade failed! Are you sure you have the latest legit Steam version?");',
          "	Exit;                                                                                                                   ",
          "}                                                                                                                          ",
          "Write-Host 'Created downgraded executables.'                                                                                          ",
          "PAUSE;"
        ],
        "Press OK when the 'Created downgraded executables' message appears."
      );
    }
  }

  System.IO.File.Copy(Game.Folder + "\\mgsvtpp.exe", instanceFolder + "\\mgsvtpp.exe", true);
  System.IO.File.Copy(Game.Folder + "\\mgsvmgo.exe", instanceFolder + "\\mgsvmgo.exe", true);

  // ensure Context.Width is at least 1024 and Context.Height is at least 576 while maintaining aspect ratio
  const aspectRatio = Context.Width / Context.Height;
  var newWidth = Context.Width;
  var newHeight = Context.Height;
  if (newWidth < 1024) {
    newWidth = 1024;
    newHeight = Math.round(1024 / aspectRatio);
  }
  if (newHeight < 576) {
    newHeight = 576;
    newWidth = Math.round(576 * aspectRatio);
  }

  Context.ModifySaveFile(instanceFolder + "\\plugins\\MGSVFix.ini", instanceFolder + "\\plugins\\MGSVFix.ini", Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Custom Resolution", "Width", newWidth),
    new Nucleus.IniSaveInfo("Custom Resolution", "Height", newHeight)
  ]);

  RunPowershell(
    "start",
    SetupEnvironmentFunction.concat([
      "SetupEnvironment -NucleusEnvironmentRoot " + Context.EnvironmentRoot + " -playerNickname " + Context.Nickname,
      "$gameProcess = Start-Process -PassThru -FilePath " +
        (GameModeOption != "Metal Gear Online 3" ? "mgsvtpp.exe" : 'mgsvmgo.exe -ArgumentList "/AppData 99c85cdbf2c837d50d37c82af2c837d5c12d5e80fbc837d5f2c837d5f2c837d5f2"')
      //,".\"" + Game.Folder + "\\pssuspend64.exe\" \"mgsvtpp.exe\""
    ]).concat(
      Context.PlayerID == 0
        ? [
            ,
            "cd  '" + Game.Folder + "\\Emu'",
            "$fuseProcess = Start-Process -PassThru -FilePath 'fuse.exe' -ArgumentList '-standalone'",
            "while (-not $gameProcess.HasExited) { Start-Sleep -Seconds 1 }",
            "if (-not $fuseProcess.HasExited) { $fuseProcess.Kill() }"
          ]
        : []
    ),
    ""
  );
};

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

function RunCMD(fileName, cmdScript, message) {
  var cmdFile = instanceFolder + "\\" + fileName + ".bat";
  Context.WriteTextFile(cmdFile, ["@echo off"].concat(cmdScript));
  if (message && message.length) Context.RunAdditionalFiles(["all|" + cmdFile], false, message, 0, false, false, true, false);
  else Context.RunAdditionalFiles(["all|" + cmdFile], false, 0, true, false);
}

function RunPowershell(fileName, psScript, message) {
  var psFile = instanceFolder + "\\" + fileName + ".ps1";
  Context.WriteTextFile(psFile, psScript);
  var cmdScript = ['%SystemRoot%\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe -ExecutionPolicy RemoteSigned -command ".\\' + fileName + '.ps1"', "PAUSE;"];
  RunCMD(fileName, cmdScript, message);
}

const SetupEnvironmentFunction = [
  " function SetupEnvironment {																			",
  "	param (																								",
  "		[string]$NucleusEnvironmentRoot,                                                                ",
  "		[string]$playerNickname                                                                 		",
  "	)                                                                                           		",
  'Write-Host "Setting up Nucleus environment"                                                         ',
  "                                                                                                      ",
  "$username = $env:USERNAME                                                                             ",
  "                                                                                                      ",
  "try {                                                                                                 ",
  "	$username = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name.Split('\\')[1]           ",
  "} catch {                                                                                             ",
  "	Write-Host \"ERROR - getting current user's username, defaulting to using environment's username\"  ",
  "}                                                                                                     ",
  "                                                                                                      ",
  "# Set environment variables                                                                           ",
  '$env:APPDATA = "$NucleusEnvironmentRoot\\$playerNickname\\AppData\\Roaming"            ',
  '$env:LOCALAPPDATA = "$NucleusEnvironmentRoot\\$playerNickname\\AppData\\Local"         ',
  '$env:USERPROFILE = "$NucleusEnvironmentRoot\\$playerNickname"                          ',
  '$env:HOMEPATH = "Users\\$username\\NucleusCoop\\$playerNickname"                                   ',
  "                                                                                                      ",
  "# Create directories                                                                                  ",
  "$directories = @(                                                                                     ",
  '	"$NucleusEnvironmentRoot",                                                           ',
  '	"$NucleusEnvironmentRoot\\$playerNickname",                                          ',
  '	"$NucleusEnvironmentRoot\\$playerNickname\\AppData\\Roaming",                        ',
  '	"$NucleusEnvironmentRoot\\$playerNickname\\AppData\\Local"                           ',
  ")                                                                                                     ",
  "                                                                                                      ",
  "foreach ($directory in $directories) {                                                                ",
  "	New-Item -ItemType Directory -Force -Path $directory                                                ",
  "}                                                                                                     ",
  "}                                                                                                     "
];