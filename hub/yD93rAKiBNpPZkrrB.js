Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Fri Oct 17 2025 04:06:13 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "yD93rAKiBNpPZkrrB";
Hub.Maintainer.Name = "happyexpress";
Hub.Maintainer.Id = "yasq5hW6LH5sjwQty";

Game.Description =
  "For the latest Steam or Rockstar Game Launcher versions of Max Payne 3. \n" +
  "Gamepads only. \n" +
  "DON'T press the Lock Inputs key or bad things will happen. \n" +
  "\n" +
  "*NEW* This script now uses the LAN Party mod which enables DLC content and Co-op. \n" +
  "\n" +
  "Steps: \n" +
  "-Run Nucleus as Administrator. \n" +
  "-Player 1 should go to Multiplayer -> LAN. Configure your lobby options and press A to continue. \n" +
  "-Other players can then go to Multiplayer -> LAN. To join Player 1's lobby, select the same Game Mode as Player 1 and press A to continue. \n" +
  "\n" +
  "\n" +
  "(Obsolete - comes with LAN Party mod) Unlock all mod: https://drive.google.com/file/d/19_r1zDUBR-L5bjkAccdFGTyRo8AbLiuj/view?usp=drivesdk \n" +
  "(Obsolete - you can set this in the lobby options) Hide enemy nametags and healthbars mod: https://drive.google.com/file/d/1e6of9RNzO84Oxhg00tg-OTPkcu6Ji12D/view?usp=drivesdk \n" +
  "Standalone LAN Party mod in case you have other mods installed: https://drive.google.com/file/d/1lnwS-LiNr2Pldtez_L9F70MqViIZjdto/view?usp=sharing";

Game.FileSymlinkExclusions = ["MaxPayne3.exe", "steam_api.dll", "socialclub.dll", "dinput8.dll", "MaxPayne3.FusionFix.asi", "MaxPayne3.FusionFix.ini", "update.rpf"];

Game.FileSymlinkCopyInstead = ["binkw32.dll", "CommunicationNet.dll", "FirewallInstallHelper.dll", "GameuxInstallHelper.dll", "MP3GDF.dll", "MTLX.dll", "SecureDownloadAPI.dll"];

Game.GameName = "Max Payne 3";
Game.HandlerInterval = 100;
Game.SupportsKeyboard = false;
//Game.KeyboardPlayerFirst = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = false;
Game.SymlinkFolders = false;
Game.GUID = "Max Payne 3";
Game.ExecutableName = "MaxPayne3.exe";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.InjectHookXinput = false;
Game.FakeFocus = false;
Game.FakeFocusInterval = 10000;
Game.HookFocus = false;
Game.SetWindowHook = true;
Game.PauseBetweenStarts = 15;
Game.PauseBetweenProcessGrab = 15;
Game.ThirdPartyLaunch = true;
Game.RequiresAdmin = true;
Game.IgnoreThirdPartyPrompt = true;

Game.UseNucleusEnvironment = true;
Game.ForceEnvironmentUse = true;
Game.UserProfileSavePathNoCopy = true;
Game.DocumentsConfigPathNoCopy = true;

Game.SupportsMultipleKeyboardsAndMice = false;

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
Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.DrawFakeMouseCursor = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
Game.ProtoInput.RegisterRawInputHook = false;
Game.ProtoInput.GetRawInputDataHook = false;
Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 10000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.DrawFakeCursor = false;
Game.ProtoInput.BlockedMessages = [0x0008];
Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.AutoHideTaskbar = true;

//Game.SendNormalMouseInput = false;
//Game.HideCursor = true;

//Game.KeepSymLinkOnExit = true;
//Game.UseNucleusEnvironment = true;
//Game.LaunchAsDifferentUsers = true;
//Game.TransferNucleusUserAccountProfiles = true;

var answers1 = ["Steam", "Rockstar Games Launcher"];
Game.AddOption("Game version", "Select the launcher you installed the game from.", "Version", answers1);

var answers2 = ["Yes", "No"];
Game.AddOption(
  "Use the LAN party mod?",
  "This mod enables additional lobby options, DLC content, and unlocks all skins, weapons, and items. \n" + "Make sure your update.rpf file is unmodded before enabling this option.",
  "UseLANMod",
  answers2
);

var answers2 = ["Yes", "No"];
Game.AddOption(
  "Downgrade the EXE?",
  "The game's EXE file will be copied and downgraded to an earlier version. Select 'No' if you've already downgraded your game to v216 or earlier.",
  "Downgrade",
  answers2
);

Game.Play = function() {
  const version = Context.Options["Version"];
  const useLANMod = Context.Options["UseLANMod"];
  const downgrade = Context.Options["Downgrade"] == "Yes";

  const copiedFiles = [
    "socialclub.dll",
    "socialclub.ini",
    "steam_api.dll",
    "steam_api.ini",
    "steam_interfaces.txt",
    "downgrade_steam.xdelta",
    "downgrade_rgl.xdelta",
    "update_rpf.xdelta",
    "xdelta.exe",
    "dinput8.dll"
  ];

  for (let index = 0; index < copiedFiles.length; ++index) {
    const fileName = copiedFiles[index];
    System.IO.File.Copy(System.IO.Path.Combine(Game.Folder, fileName), Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\" + fileName, true);
  }

  var bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\copyFolders.bat";
  var lines = [
    'xcopy /E /I /Y "' + Game.Folder + "\\steam_settings" + '" "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings" + '" ',
    //'xcopy /E /I /Y "' + Game.Folder + "\\common" + '" "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\common" + '" ',
    'xcopy /E /I /Y "' + Game.Folder + "\\update" + '" "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\update" + '" ',
    'xcopy /E /I /Y "' + Game.Folder + "\\plugins" + '" "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins" + '" '
  ];
  Context.WriteTextFile(bat, lines);
  Context.RunAdditionalFiles(["all|" + bat], false, 0, true, false);
  Context.Wait(1000);

  Context.ModifySaveFile(
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins\\MaxPayne3.FusionFix.ini",
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\plugins\\MaxPayne3.FusionFix.ini",
    Nucleus.SaveType.INI,
    [new Nucleus.IniSaveInfo("MAIN", "LocalhostID", (Context.PlayerID + 1).toString())]
  );

  // Player nicknames
  var path = Game.Folder + "\\Goldberg SocialClub Emu Saves\\settings\\account_name.txt";
  var lines = ["1|" + Context.Nickname];
  Context.ReplaceLinesInTextFile(path, lines);

  var path = Game.Folder + "\\Goldberg SteamEmu Saves\\settings\\account_name.txt";
  var lines = ["1|" + Context.Nickname];
  Context.ReplaceLinesInTextFile(path, lines);

  var appdata = Context.EnvironmentPlayer + "\\AppData\\Roaming";
  var documents = Context.EnvironmentPlayer + "\\Documents";

  if (!System.IO.Directory.Exists(appdata + "\\Goldberg SocialClub Emu Saves\\Max Payne 3")) {
    // If this folder doesn't exist, we can assume first time setup needs to be done
    var bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\copysaves.bat";
    var lines = [
      'xcopy /E /I /Y "' + Game.Folder + "\\Goldberg SocialClub Emu Saves" + '" "' + appdata + "\\Goldberg SocialClub Emu Saves" + '"',
      'xcopy /E /I /Y "' + Game.Folder + "\\Goldberg SteamEmu Saves" + '" "' + appdata + "\\Goldberg SteamEmu Saves" + '"',
      'xcopy "' + Game.Folder + "\\graphics.xml" + '" "' + documents + "\\Rockstar Games\\Max Payne 3\\" + '"'
    ];
    Context.WriteTextFile(bat, lines);
    Context.RunAdditionalFiles(["all|" + bat], false, 5);
    Context.Wait(2000);
  }

  System.IO.File.Copy(Context.RootInstallFolder + "\\update.rpf", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\update.rpf.old", true);
  System.IO.File.Copy(Context.RootInstallFolder + "\\MaxPayne3.exe", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MaxPayne3Old.exe", true);

  var psScriptFile = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.ps1";
  // Execute a powershell script to run Max Payne 3 through ForceBindIP
  const psScript = SetupEnvironmentFunction.concat([
    //"$ForceBindIPPath = '" + Context.NucleusFolder + "\\utils\\ForceBindIP\\ForceBindIP.exe';									",

    "SetupEnvironment -NucleusEnvironmentRoot " + Context.EnvironmentRoot + " -playerNickname " + Context.Nickname + ";",
    "$ProgramPath = '" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MaxPayne3.exe';								",
    //"if (-Not (Test-Path -Path $ProgramPath -PathType Leaf)) {                                                                  ",
    //'	[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");                                           	',
    //'	[System.Windows.Forms.MessageBox]::Show("EXE not found! Are you sure you have the latest legit ' + version + ' version?");      ',
    //"	Exit;                                                                                                                   ",
    //"}                                                                                                                          ",
    //"$IPAddress = '127.0.0." + (Context.PlayerID + 1) + "';																		",
    //"$UserName = '" + accountName + "';																							",
    //"$Password = ConvertTo-SecureString '12345' -AsPlainText -Force;															",
    //"$Credential = New-Object System.Management.Automation.PSCredential ($UserName, $Password);									",
    //'Start-Process -FilePath $ForceBindIPPath -ArgumentList " -i $IPAddress `"$ProgramPath`" " -Credential $Credential;		'
    "Start-Process -FilePath $ProgramPath;"
  ]);

  var cmdFile = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
  // Enable LAN party mod
  var lanModCmd = useLANMod
    ? [
        "(xdelta.exe -d -s update.rpf.old update_rpf.xdelta update.rpf);",
        'IF %ERRORLEVEL% NEQ 0 (%SystemRoot%\\Sysnative\\msg.exe * "Failed to install LAN party mod! Are you sure your update.rpf is unmodded?");'
      ]
    : [];
  // Downgrade to an older version
  var downgradeCmd = downgrade
    ? [
        "(xdelta.exe -d -s MaxPayne3Old.exe " + (version == "Steam" ? "downgrade_steam.xdelta" : "downgrade_rgl.xdelta") + " MaxPayne3.exe);",
        'IF %ERRORLEVEL% NEQ 0 (%SystemRoot%\\Sysnative\\msg.exe * "EXE downgrade failed! Are you sure you have the latest legit ' + version + ' version?");'
      ]
    : [];
  var startCmd = ['%SystemRoot%\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe -ExecutionPolicy RemoteSigned -command ".\\start.ps1";']; // PAUSE;'];

  Context.WriteTextFile(psScriptFile, psScript);
  Context.WriteTextFile(cmdFile, lanModCmd.concat(downgradeCmd).concat(startCmd));
  Context.RunAdditionalFiles(["all|" + cmdFile], false, 5, true, false);
};

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