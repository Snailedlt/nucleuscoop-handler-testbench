Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Oct 22 2024 11:32:22 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "eYTXsGAethduiYiik";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Default", "Low", "Med", "High"];
var answers1 = ["-", "60", "50", "45", "40", "35", "30", "25"];
var answers2 = ["No", "720p", "1080p"];
var answers3 = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
Game.AddOption("Select preferred graphic settings", "Select Default to load default or previously selected setting", "Graphics", answers);
Game.AddOption("Select the FPS Cap the game will use", "", "FPS", answers1);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "id", answers3);
Game.AddOption("Apply 720p or 1080p resolution and fullscreen for low-end PC (no splitscreen)", "", "resolution", answers2);
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt"];
Game.KillMutex = ["UnrealEngine4"];
Game.HandlerInterval = 100;
Game.UseGoldberg = true;
Game.GoldbergLanguage = "english";
Game.GoldbergNoLocalSave = true;
Game.PlayerSteamIDs = [
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438",
  "76561199023125438"
];
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.SymlinkFolders = false;
Game.SupportsKeyboard = false;
Game.ExecutableName = "MxNext-Win64-Shipping.exe";
Game.SteamID = "520940";
Game.GUID = "MX vs ATV All Out";
Game.GameName = "MX vs ATV All Out";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.BinariesFolder = "MXvsATVAllOut\\Binaries\\Win64";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MX vs ATV All Out";
Game.HookFocus = false;
Game.FakeFocus = false;
Game.PreventWindowDeactivation = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.Hook.CustomDllEnabled = false;
Game.UseSteamStubDRMPatcher = true;
Game.SteamStubDRMPatcherArch = "64";
Game.XInputPlusDll = ["XInput1_3.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\520940";
Game.UserProfileConfigPath = "AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor";
Game.SetForegroundWindowElsewhere = true;
Game.Description =
  "This game supports up to 2 player native split screen locally but unfortunately not over LAN. The purpose of this handler is to enable up to 4 player split screen and LAN. Instructions - Once the instances have finished repositioning and resizing, have the first player create and launch a public online match. Once the match has started, have the other players connect to the match by searching under find custom match. Enjoy!";

Game.Play = function() {
  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut")) {
    var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut";
    System.IO.Directory.CreateDirectory(filePath);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved")) {
    var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved";
    System.IO.Directory.CreateDirectory(filePath);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config")) {
    var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config";
    System.IO.Directory.CreateDirectory(filePath);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor")) {
    var filePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor";
    System.IO.Directory.CreateDirectory(filePath);
  }

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini")) {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "GameUserSettings_Low.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Graphics = Context.Options["Graphics"];
  if (Graphics == "Low") {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "GameUserSettings_Low.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "Med") {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "GameUserSettings_Med.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (Graphics == "High") {
    var savePath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "GameUserSettings_High.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var FPS = Context.Options["FPS"];
  if (FPS == "-") {
  }
  if (FPS >= "0") {
    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bUseVSync=", Nucleus.SearchType.StartsWith) + "|bUseVSync=True",
      Context.FindLineNumberInTextFile(txtPath, "FrameRateLimit=", Nucleus.SearchType.StartsWith) + "|FrameRateLimit=" + FPS + ""
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  var resolution = Context.Options["resolution"];
  if (resolution == "No") {
    Game.ResetWindows = true;
    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "DesiredScreenWidth=", Nucleus.SearchType.StartsWith) + '|DesiredScreenWidth="' + Context.Width + '"',
      Context.FindLineNumberInTextFile(txtPath, "DesiredScreenHeight=", Nucleus.SearchType.StartsWith) + '|DesiredScreenHeight="' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedDesiredScreenWidth=", Nucleus.SearchType.StartsWith) + '|LastUserConfirmedDesiredScreenWidth="' + Context.Width + '"',
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedDesiredScreenHeight=", Nucleus.SearchType.StartsWith) + '|LastUserConfirmedDesiredScreenHeight="' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "ResolutionSizeX=", Nucleus.SearchType.StartsWith) + '|ResolutionSizeX="' + Context.Width + '"',
      Context.FindLineNumberInTextFile(txtPath, "ResolutionSizeY=", Nucleus.SearchType.StartsWith) + '|ResolutionSizeY="' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedResolutionSizeX=", Nucleus.SearchType.StartsWith) + '|LastUserConfirmedResolutionSizeX="' + Context.Width + '"',
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedResolutionSizeY=", Nucleus.SearchType.StartsWith) + '|LastUserConfirmedResolutionSizeY="' + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "FullscreenMode=", Nucleus.SearchType.StartsWith) + "|FullscreenMode=2",
      Context.FindLineNumberInTextFile(txtPath, "bUseVSync=", Nucleus.SearchType.StartsWith) + "|bUseVSync=True",
      Context.FindLineNumberInTextFile(txtPath, "PreferredFullscreenMode=", Nucleus.SearchType.StartsWith) + "|PreferredFullscreenMode=2",
      Context.FindLineNumberInTextFile(txtPath, "LastConfirmedFullscreenMode=", Nucleus.SearchType.StartsWith) + "|LastConfirmedFullscreenMode=2"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "' + (Context.GamepadId - 1) + '"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }
  var resolution = Context.Options["resolution"];
  if (resolution == "720p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "DesiredScreenWidth=", Nucleus.SearchType.StartsWith) + "|DesiredScreenWidth=1280",
      Context.FindLineNumberInTextFile(txtPath, "DesiredScreenHeight=", Nucleus.SearchType.StartsWith) + "|DesiredScreenHeight=720",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedDesiredScreenWidth=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedDesiredScreenWidth=1280",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedDesiredScreenHeight=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedDesiredScreenHeight=720",
      Context.FindLineNumberInTextFile(txtPath, "ResolutionSizeX=", Nucleus.SearchType.StartsWith) + "|ResolutionSizeX=1280",
      Context.FindLineNumberInTextFile(txtPath, "ResolutionSizeY=", Nucleus.SearchType.StartsWith) + "|ResolutionSizeY=720",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedResolutionSizeX=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedResolutionSizeX=1280",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedResolutionSizeY=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedResolutionSizeY=720",
      Context.FindLineNumberInTextFile(txtPath, "FullscreenMode=", Nucleus.SearchType.StartsWith) + "|FullscreenMode=0",
      Context.FindLineNumberInTextFile(txtPath, "PreferredFullscreenMode=", Nucleus.SearchType.StartsWith) + "|PreferredFullscreenMode=0",
      Context.FindLineNumberInTextFile(txtPath, "bUseVSync=", Nucleus.SearchType.StartsWith) + "|bUseVSync=False",
      Context.FindLineNumberInTextFile(txtPath, "LastConfirmedFullscreenMode=", Nucleus.SearchType.StartsWith) + "|LastConfirmedFullscreenMode=0"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "' + (Context.GamepadId - 1) + '"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }
  var resolution = Context.Options["resolution"];
  if (resolution == "1080p") {
    Game.DontResize = true;
    Game.DontReposition = true;
    Game.DontRemoveBorders = true;
    var txtPath = Context.EnvironmentPlayer + "\\AppData\\Local\\MXvsATVAllOut\\Saved\\Config\\WindowsNoEditor\\GameUserSettings.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "DesiredScreenWidth=", Nucleus.SearchType.StartsWith) + "|DesiredScreenWidth=1920",
      Context.FindLineNumberInTextFile(txtPath, "DesiredScreenHeight=", Nucleus.SearchType.StartsWith) + "|DesiredScreenHeight=1080",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedDesiredScreenWidth=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedDesiredScreenWidth=1920",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedDesiredScreenHeight=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedDesiredScreenHeight=1080",
      Context.FindLineNumberInTextFile(txtPath, "ResolutionSizeX=", Nucleus.SearchType.StartsWith) + "|ResolutionSizeX=1920",
      Context.FindLineNumberInTextFile(txtPath, "ResolutionSizeY=", Nucleus.SearchType.StartsWith) + "|ResolutionSizeY=1080",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedResolutionSizeX=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedResolutionSizeX=1920",
      Context.FindLineNumberInTextFile(txtPath, "LastUserConfirmedResolutionSizeY=", Nucleus.SearchType.StartsWith) + "|LastUserConfirmedResolutionSizeY=1080",
      Context.FindLineNumberInTextFile(txtPath, "FullscreenMode=", Nucleus.SearchType.StartsWith) + "|FullscreenMode=0",
      Context.FindLineNumberInTextFile(txtPath, "PreferredFullscreenMode=", Nucleus.SearchType.StartsWith) + "|PreferredFullscreenMode=0",
      Context.FindLineNumberInTextFile(txtPath, "bUseVSync=", Nucleus.SearchType.StartsWith) + "|bUseVSync=True",
      Context.FindLineNumberInTextFile(txtPath, "LastConfirmedFullscreenMode=", Nucleus.SearchType.StartsWith) + "|LastConfirmedFullscreenMode=0"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "' + (Context.GamepadId - 1) + '"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "3"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "4")
    ]);
  }

  var filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv142\\Win64\\steam_settings";
  System.IO.Directory.CreateDirectory(filePath);

  var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv142\\Win64\\steam_settings\\DLC.txt";
  var lines = [
    "829730=MX vs ATV All Out - 2017 Kawasaki KX 250F",
    "829731=MX vs ATV All Out - 2017 Kawasaki KX 450F",
    "829732=MX vs ATV All Out - 2017 KTM 250 SX-F",
    "829733=MX vs ATV All Out - 2017 KTM 350 SX-F",
    "829734=MX vs ATV All Out - 2017 KTM 450 SX-F",
    "829735=MX vs ATV All Out - 2017 Husqvarna FC 250",
    "829736=MX vs ATV All Out - 2017 Husqvarna FC 350",
    "829737=MX vs ATV All Out - 2017 Husqvarna FC 450",
    "842210=MX vs ATV All Out - 2017 Honda CRF 250R",
    "842211=MX vs ATV All Out - 2017 Honda CRF 450R",
    "842212=MX vs ATV All Out - 2017 Suzuki RM-Z250",
    "842213=MX vs ATV All Out - 2017 Suzuki RM-Z450",
    "842214=MX vs ATV All Out - 2017 Yamaha YZ250F",
    "842215=MX vs ATV All Out - 2017 Yamaha YZ450F",
    "856140=MX vs ATV All Out - 2011 Honda TRX450R",
    "856141=MX vs ATV All Out - 2011 Suzuki LT-R450",
    "856142=MX vs ATV All Out - 2017 Yamaha YFZ450R",
    "856143=MX vs ATV All Out - 2011 Kawasaki KFX450R",
    "856144=MX vs ATV All Out - 2017 Yamaha YZ125",
    "856145=MX vs ATV All Out - 2017 Yamaha YZ250",
    "856146=MX vs ATV All Out - 2017 KTM 125 SX",
    "856147=MX vs ATV All Out - 2017 KTM 250 SX",
    "856148=MX vs ATV All Out - 2011 KTM 450 SX",
    "856149=MX vs ATV All Out - 2017 Husqvarna TC 125",
    "856150=MX vs ATV All Out - 2017 Husqvarna TC 250",
    "876730=MX vs ATV All Out - 2018 Polaris RZR XP 1000",
    "876731=MX vs ATV All Out - 2018 Polaris RZR XP Turbo DYNAMIX",
    "876732=MX vs ATV All Out - 2017 Yamaha YXZ1000R SS SE",
    "876733=MX vs ATV All Out - 2017 Yamaha YXZ1000R",
    "876734=MX vs ATV All Out - 2018 Yamaha YXZ1000R SS SE",
    "876735=MX vs ATV All Out - 2018 Yamaha YXZ1000R",
    "881330=MX vs ATV All Out - 2018 AMA Arenacross",
    "907280=MX vs ATV All Out - GOAT Farm",
    "939730=MX vs ATV All Out - Slash Track Pack",
    "984340=MX vs ATV All Out - Hometown MX Nationals",
    "1102660=MX vs ATV All Out - 2019 AMA Pro Motocross Championship",
    "1260070=MX vs ATV All Out - 2020 AMA Pro Motocross Championship"
  ];
  Context.WriteTextFile(autoExec, lines);

  var id = Context.Options["id"];
  Game.PlayerSteamIDs = [
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + "",
    "765611990231254" + id + "" + Context.PlayerID + ""
  ];
};