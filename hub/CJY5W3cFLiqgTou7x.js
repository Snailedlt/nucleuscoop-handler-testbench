Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Feb 12 2021 09:46:49 GMT+0000 (UTC).
Hub.Handler.Id = "CJY5W3cFLiqgTou7x";
Hub.Maintainer.Name = "PoundlandBacon";
Hub.Maintainer.Id = "AdiAjSyfZPMvu3a4M";

var answers1 = ["Yes", "No"];
Game.AddOption("OFDR v1.02 Resolution Fix?", "Only use if you don't already have it and are using the regular steam exe.", "Fix", answers1);

Game.KillMutex = ["OFP : Dragon Rising"];
Game.FileSymlinkExclusions = [
  "thread_map.dat",
  "config.dat",
  "soldierlodvalues.xml",
  "config_ambx.xml",
  "hardware_settings_options.xml",
  "hardware_settings_restrictions.xml",
  "thread_map.xml",
  "worker_map.xml",
  "OFDR.exe",
  "config.dat",
  "xinput1_3.dll",
  "dinput8.dll"
];
Game.FileSymlinkCopyInstead = ["binkw32.dll", "rld.dll", "ambxrt.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "OFDR.exe";
Game.SteamID = "12830";
Game.GUID = "Operation FlashPoint DR";
Game.GameName = "Operation Flashpoint: Dragon Rising";
Game.NeedsSteamEmulation = false;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dragon Rising";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "Documents\\My Games\\OFDR";
//Game.UserProfileSavePath = "Documents\\My Games\\OFDR\\Profiles";
Game.DocumentsConfigPathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Create a LAN server in one instance and join in the others. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. In the instance that hosts the LAN server don't press the right stick or buttons quickly when crawling or you will trigger a game bug that makes you unable to move with the sticks. ";
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\engineer_defs");
  System.IO.Directory.CreateDirectory(filePath);
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system");
  System.IO.Directory.CreateDirectory(filePath);
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system\\ambx");
  System.IO.Directory.CreateDirectory(filePath);
  var filePath = (Context.filePath = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings");
  System.IO.Directory.CreateDirectory(filePath);

  //Ego Engine Updated by TemplarGFX
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\system\\thread_map.dat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data\\thread_map.dat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config.dat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data\\config.dat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\engineer_defs\\soldierlodvalues.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data_win\\soldierlodvalues.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system\\ambx\\config_ambx.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data_win\\config_ambx.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system\\hardware_settings_options.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data_win\\hardware_settings_options.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system\\hardware_settings_restrictions.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data_win\\hardware_settings_restrictions.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system\\thread_map.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data_win\\thread_map.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_win\\system\\worker_map.xml");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "data_win\\worker_map.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config - Cinematic.xml";
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "MyDocuments\\hardware_settings_config - Cinematic.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config.xml";
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "MyDocuments\\hardware_settings_config.xml");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Resizing
  var path = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config.xml";
  Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");
  Context.ChangeXmlAttributeValue(path, "//resolution", "oldWidth", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "oldHeight", Context.Height);

  var path = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config - Cinematic.xml";
  Context.ChangeXmlAttributeValue(path, "//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//resolution", "fullscreen", "false");
  Context.ChangeXmlAttributeValue(path, "//resolution", "oldWidth", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//resolution", "oldHeight", Context.Height);

  var aspectcalc = Context.AspectRatioDecimal.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
  if (aspectcalc == 1.777777) {
    var path = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", aspectcalc);
    var path = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config - Cinematic.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", aspectcalc);
  } else {
    var path = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", Context.AspectRatioDecimal.toFixed(6));
    var path = Context.EnvironmentPlayer + "My Games\\OFDR\\hardwaresettings\\hardware_settings_config - Cinematic.xml";
    Context.ChangeXmlAttributeValue(path, "//resolution", "aspect", Context.AspectRatioDecimal.toFixed(6));
  }

  if (Context.NumControllers < 5) {
    Game.Hook.XInputReroute = false;
  } else {
    Game.FakeFocus = false;
    Game.HookFocus = false;
    Game.Hook.UseAlpha8CustomDll = true;
    Game.Hook.CustomDllEnabled = true;
    Game.UseDInputBlocker = false;

    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }

  var fix = Context.Options["Fix"];

  if (fix == "Yes") {
    //OF:DR v1.02 Resolution Fix
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OFDR.org.exe");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "OFDR.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\jdiff.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "jdiff.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ofdr.jdf");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ofdr.jdf");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat";
    var lines = ["jdiff.exe -u OFDR.org.exe OFDR.jdf OFDR.exe"];
    Context.WriteTextFile(Bat, lines);

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\start.bat"], false, 1);
  }

  if (fix == "No") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OFDR.exe");
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "OFDR.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};