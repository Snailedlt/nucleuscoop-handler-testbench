Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Tue Jul 30 2024 02:09:29 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "GGN6FpryMWXq8eP2x";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["60", "30", "120"];
var answers2 = ["No", "Yes"];
var answers3 = ["No", "Yes"];
var answers4 = ["No", "Yes"];
var answers5 = ["No", "Yes"];
var answers6 = ["No", "Yes"];
var answers7 = ["No", "Yes"];
var answers8 = ["No", "Yes"];
Game.AddOption("60 fps?", "Unlocks the 30 fps cap in co-op. Fusion mod enhancements by Sergey P.", "Fps", answers1);
Game.AddOption(
  "Alternative xinput dlls to enable gamepad rumble?",
  "Enables vibration for xinput controllers but you have to set your monitor scale to 100% and add custom resolutions like the handler notes mention for the instances to resize correctly.",
  "Vibration",
  answers2
);
Game.AddOption("Blacklist Control Scheme?", "Makes controls like in Blacklist, press button to cover, hold to aim etc.", "Blacklist", answers3);
Game.AddOption("Disable unlimited ammo for all weapons?", "Disables unlimited ammo in co-op.", "Ammo", answers4);
Game.AddOption("Disable black and white filter?", "Disables the black and white filter when you are in dark rooms.", "Filter", answers5);
Game.AddOption("Disable character lighting?", "Disables enemies glowing in the dark.", "Light", answers6);
Game.AddOption("Enable enhanced sonar vision?", "Enhances the sonar vision you enable with dpad up.", "Sonar", answers7);
Game.AddOption("Blacklist Indicators?", "Bloom will be enabled only in the darkness, disables in the light.", "Bloom", answers8);

Game.ExecutableContext = ["UMDS"];
Game.DirSymlinkExclusions = ["src\\system", "src\\system\\scripts", "src\\system\\update\\data\\Blacklist", "data\\Videos"];
Game.FileSymlinkExclusions = [
  "MapConfigurationDLC.xml",
  "ubiorbitapi_r2.dll",
  "conviction_game.exe",
  "gu.exe",
  "UPlayBrowser.exe",
  "Skidrow.ini",
  "Logo_ESRB_01.bik",
  "Logo_ESRB_02.bik",
  "Logo_MiddleWare_01.bik",
  "Logo_Ubisoft.bik",
  "Logo_Clancy_01.bik",
  "d3d9.dll",
  "d3d9.ini",
  "xinput1_3.dll"
];
Game.FileSymlinkCopyInstead = [
  "SplinterCellConviction.FusionMod.asi",
  "SplinterCellConviction.FusionMod.ini",
  "dinput8.dll",
  "version.dll",
  "gameinfo.ini",
  "ProfileDefaultsPC.ini",
  "Conviction.ini",
  "ConvictionInputs.ini",
  "ConvictionUser.ini",
  "ConvictionUserPC.ini",
  "Default.ini",
  "dynamicxbox.umd",
  "InputKeyTranslation.ini",
  "loc-dan.umd",
  "loc-deu.umd",
  "loc-esp.umd",
  "loc-fra.umd",
  "loc-int.umd",
  "loc-ita.umd",
  "loc-nl.umd",
  "loc-nor.umd",
  "loc-swe.umd",
  "version",
  "actionscheme.ini",
  "blacklist.ini",
  "convictionsettings.ini",
  "weapontuning.ini",
  "Menus.dan",
  "Menus.deu",
  "Menus.esp",
  "Menus.fra",
  "Menus.int",
  "Menus.ita",
  "Menus.nl",
  "Menus.nor",
  "Menus.swe",
  "systemdetection.dll"
];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "conviction_game.exe";
Game.SteamID = "33220";
Game.GUID = "Splinter Cell Conviction";
Game.GameName = "Tom Clancy's Splinter Cell Conviction";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "src\\system";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Conviction";
//Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.ResetWindows = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.BlockMouseEvents = false;
Game.Hook.BlockInputEvents = false;
Game.Hook.BlockKeyboardEvents = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\storage";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Make sure you have launched your main game at least once before using this and are using the clean files. On first handler launch enable the gamepad in the game controller options for both instances using the keyboard, alt-tab between instances to do it, if it is the keyboard/m instance disable the gamepad there instead or the mouse camera movement will not work in-game, alt-tab to or click on the kb instance to control it. Connect the instances via the native LAN option, you need the latest version of the game, deactivate all virtual internet interfaces like VirtualBox, Hyper-v, etc. This is recommended to avoid issues searching for each other sessions. Host only in the first instance, if the second instance can not connect just exit in the first instance and host a server again. If you get a general protection fault crash after exiting a local game you created try this easy solution: https://steamcommunity.com/sharedfiles/filedetails/?id=271381800. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add custom resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. If you get too low fps make sure the game is using most cpu cores, this is a known issue to fix it in task manager details tab select the conviction exes, right click and set affinity, do this after starting a new level, you can use CTRL+T to minimize the instances. This handler uses this to restore the LAN mode after the official servers shutdown: https://github.com/Ododo/scc-lan-restore. Fusion mod windowed mode and enhancements thanks to Sergey P. : https://github.com/ThirteenAG/WidescreenFixesPack/releases/tag/scc.";
Game.PauseBetweenContextAndLaunch = 2;
Game.PauseBetweenStarts = 15;

Game.Play = function() {
  var username = Context.Nickname;
  var VideoConfig = "C:\\ProgramData\\Ubisoft\\Conviction\\ConvictionUserPC.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Inputs", "ControllerType", "KT_X360"),
    new Nucleus.IniSaveInfo("Inputs", "UseXInputByDefault", true),
    new Nucleus.IniSaveInfo("UserVideoOptions." + username, "FullscreenViewportX", Context.Width),
    new Nucleus.IniSaveInfo("UserVideoOptions." + username, "FullscreenViewportY", Context.Height),
    new Nucleus.IniSaveInfo("UserVideoOptions." + username, "StartupFullscreen", false),
    new Nucleus.IniSaveInfo("UserVideoOptions." + username, "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("UserVideoOptions." + username, "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("UserVideoOptions." + username, "MonitorAspect", Context.AspectRatioDecimal),
    new Nucleus.IniSaveInfo("Engine.Display", "EyefinityMode", 0),
    new Nucleus.IniSaveInfo("Engine.Display", "ForceMultiMon", false)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\conviction_game.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patch.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\ubiorbitapi_r2.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ubiorbitapi_r2.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\MapConfigurationDLC.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "MapConfigurationDLC.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\Skidrow.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Account", "Username", '"' + Context.Nickname + '"'),
    new Nucleus.IniSaveInfo("Account", "Password", '"SamFisher"')
  ]);

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.asi")) {
  } else {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts");
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\version.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "version.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.asi");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SplinterCellConviction.FusionMod.asi");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SplinterCellConviction.FusionMod.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.CopyFolder(Context.ScriptFolder + "\\update", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\update");
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("MAIN", "SkipIntro", " 1"),
    new Nucleus.IniSaveInfo("MAIN", "WindowedMode", " 1"),
    new Nucleus.IniSaveInfo("MAIN", "SkipSystemDetection", " 1"),
    new Nucleus.IniSaveInfo("LAN", "FixLAN", " 1"),
    new Nucleus.IniSaveInfo("LAN", "ServerAddr", " 127.0.0.1"),
    new Nucleus.IniSaveInfo("2INSTANCESPLITSCREEN", "Enable", " 1")
  ]);

  if (Context.AspectRatioDecimal > 1.8) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "PartialUltraWideSupport", " 1")]);
  } else if (Context.AspectRatioDecimal < 1.2) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "PartialUltraWideSupport", " 0")]);
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "PartialUltraWideSupport", " 0")]);
  }

  Game.KillProcessesOnClose = ["scc_lan_helper", "cmd"];

  var fps = Context.Options["Fps"];
  var vibration = Context.Options["Vibration"];
  var blacklist = Context.Options["Blacklist"];
  var ammo = Context.Options["Ammo"];
  var filter = Context.Options["Filter"];
  var light = Context.Options["Light"];
  var sonar = Context.Options["Sonar"];
  var bloom = Context.Options["Bloom"];

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\update\\convictionsettings.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("NetZ", "SyncMaxStepFrequency", fps)]);

  if (vibration == "Yes") {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 8000;
    Game.KeyboardPlayerSkipFakeFocus = true;
    Game.SetWindowHook = true;
    Context.Hook.CustomDllEnabled = false;

    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\xinput1_3.dll");

    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\xinput1_4.dll");

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Vibration", "EnableTriggerVibration", true)]);
  }

  if (vibration == "No") {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\xinput1_4.dll");
  }

  if (blacklist == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("CONTROLS", "BlacklistControlScheme", " 1")]);
  }

  if (blacklist == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("CONTROLS", "BlacklistControlScheme", " 0")]);
  }

  if (ammo == "Yes") {
  }

  if (ammo == "No") {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\update\\weapontuning.ini");
  }

  if (filter == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "DisableBlackAndWhiteFilter", " 1")]);
  }

  if (filter == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "DisableBlackAndWhiteFilter", " 0")]);
  }

  if (light == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "DisableCharacterLighting", " 1")]);
  }

  if (light == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "DisableCharacterLighting", " 0")]);
  }

  if (sonar == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "EnhancedSonarVision", " 1")]);
  }

  if (sonar == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "EnhancedSonarVision", " 0")]);
  }

  if (bloom == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "BlacklistIndicators", " 1")]);
  }

  if (bloom == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\src\\system\\scripts\\SplinterCellConviction.FusionMod.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "BlacklistIndicators", " 0")]);
  }
};