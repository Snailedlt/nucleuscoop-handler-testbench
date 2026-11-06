Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Oct 22 2024 11:33:20 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "f3PvAgv3ScrhTbSCL";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["Default", "Yes", "No"];
var answers1 = ["Default", "Low", "Med", "High", "Ultra"];
var answers2 = ["No", "Yes"];
var answers3 = ["Default", "No", "Yes"];
Game.AddOption("Select preferred graphic settings", "Select Default to load default or previously selected setting", "Graphics", answers1);
Game.AddOption("Are you using mods?", "Select Default to load default or previously selected setting", "Mods", answers3);
Game.AddOption(
  "Enable music only in the first instance?",
  "Select Default to load default or previously selected setting. Warning - Changing this setting will overwrite your saves",
  "Music",
  answers
);
Game.AddOption("Apply registry fix for LAN play?", "", "registry", answers2);
Game.KillMutexType = "Mutant";
Game.KillMutex = ["NeedForSpeedShift"];
Game.KillLastInstanceMutex = true;
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.GoldbergExperimental = false;
Game.SteamID = "24870";
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.SupportsKeyboard = false;
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll", "d3d9.dll", "NFSSFix32.dll", "NFSSFixInjector32.exe", "EasyHook32.dll", "Attract.bik", "Franchise_Ident.bik"];
Game.DirExclusions = ["SmartSteamLoader"];
Game.ExecutableName = "SHIFT.exe";
Game.LauncherExe = "launch.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.GUID = "Need for Speed SHIFT";
Game.GameName = "Need for Speed SHIFT";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "Need for Speed™ SHIFT";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Need for Speed™ SHIFT";
Game.HasDynamicWindowTitle = false;
Game.HookFocus = false;
Game.FakeFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.DocumentsConfigPathNoCopy = true;
Game.DocumentsSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.UserProfileSavePathNoCopy = true;
Game.DocumentsConfigPath = "NFS SHIFT";
Game.PauseBetweenStarts = 20;
Game.PreventWindowDeactivation = true;
Game.BlockRawInput = false;
Game.SetWindowHook = true;
Game.SetTopMostAtEnd = true;
Game.Description =
  "This handler allows you play up to 4 players split screen and over LAN with everything unlocked. Make sure you have the latest version of the game 1.0.2.0. In case you get a PhysXLoader.dll missing prompt, then you will need the install the PhysX installer located in the game's PhysX folder. The game has been take down from steam but can easily be found on several abandonware websites. To quickly quit all instances, alt+tab to another window, press window key, right click on Nucleus Coop, select close. Unfortunately ctrl+q shortcut does not work on this game. Lastly, your window settings may reset to default when launching NFS Shift, so would recommend to save your window background theme as this will prevent it from being reset. Massive credit goes to happyexpress for fixing the connection issue in split screen, without his help this handler would not have materialized.";

Game.Play = function() {
  Game.ExecutableName = "SHIFT.exe";

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EasyHook32.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EasyHook32.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EasyHook32.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\NFSSFix32.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSSFix32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\NFSSFixInjector32.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "NFSSFixInjector32.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var Mods = Context.Options["Mods"];
  if (Mods == "Default") {
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launch.bat")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launch.bat");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "launch.bat");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }
  if (Mods == "Yes") {
    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launch.bat";
    var lines = ["start NFSSFixInjector32.exe -loose"];
    Context.WriteTextFile(Bat, lines);
  }
  if (Mods == "No") {
    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launch.bat";
    var lines = ["start NFSSFixInjector32.exe"];
    Context.WriteTextFile(Bat, lines);
  }

  var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml")) {
    var savePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "graphicsconfig.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var Graphics = Context.Options["Graphics"];

  if (Graphics == "Default") {
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml";
    var dict = [
      '22|        <prop name="Mode" adapter="0" width="' + Context.Width + '" height="' + Context.Height + '" antialias="0" refresh="60" />',
      '23|        <prop name="Vsync" vsync="1" />',
      '24|        <prop name="Windowed" windowed="1" />'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (Graphics == "Low") {
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml";
    var dict = [
      '<?xml version="1.0" ?>',
      "<Reflection>",
      '    <class name="BRTTIRefCount" base="root class" />',
      '    <class name="BPersistent" base="BRTTIRefCount">',
      '        <prop name="Name" type="String" />',
      "    </class>",
      '    <class name="GraphicConfigData" base="BPersistent">',
      '        <prop name="Mode" type="Fct" />',
      '        <prop name="Vsync" type="Fct" />',
      '        <prop name="Windowed" type="Fct" />',
      '        <prop name="TextureFilter" type="Fct" />',
      '        <prop name="TextureResolution" type="Fct" />',
      '        <prop name="Brightness" type="Fct" />',
      '        <prop name="CarDetailLevel" type="Fct" />',
      '        <prop name="TrackDetailLevel" type="Fct" />',
      '        <prop name="ShadowDetailLevel" type="Fct" />',
      '        <prop name="MotionblurLevel" type="Fct" />',
      '        <prop name="EffectsDetailLevel" type="Fct" />',
      "    </class>",
      '    <data class="GraphicConfigData" id="0xBBF320">',
      '        <prop name="Name" data="" />',
      '        <prop name="Mode" adapter="0" width="' + Context.Width + '" height="' + Context.Height + '" antialias="0" refresh="60" />',
      '        <prop name="Vsync" vsync="1" />',
      '        <prop name="Windowed" windowed="1" />',
      '        <prop name="TextureFilter" texturefilter="1" />',
      '        <prop name="TextureResolution" textureresolution="1" />',
      '        <prop name="Brightness" brightness="10" />',
      '        <prop name="CarDetailLevel" cardetaillevel="1" />',
      '        <prop name="TrackDetailLevel" trackdetaillevel="1" />',
      '        <prop name="ShadowDetailLevel" shadowdetaillevel="0" />',
      '        <prop name="MotionblurLevel" motionblurLevel="0" />',
      '        <prop name="EffectsDetailLevel" effectsdetaillevel="2" />',
      "    </data>",
      "</Reflection>",
      ""
    ];
    Context.WriteTextFile(txtPath, dict);
  }

  if (Graphics == "Med") {
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml";
    var dict = [
      '<?xml version="1.0" ?>',
      "<Reflection>",
      '    <class name="BRTTIRefCount" base="root class" />',
      '    <class name="BPersistent" base="BRTTIRefCount">',
      '        <prop name="Name" type="String" />',
      "    </class>",
      '    <class name="GraphicConfigData" base="BPersistent">',
      '        <prop name="Mode" type="Fct" />',
      '        <prop name="Vsync" type="Fct" />',
      '        <prop name="Windowed" type="Fct" />',
      '        <prop name="TextureFilter" type="Fct" />',
      '        <prop name="TextureResolution" type="Fct" />',
      '        <prop name="Brightness" type="Fct" />',
      '        <prop name="CarDetailLevel" type="Fct" />',
      '        <prop name="TrackDetailLevel" type="Fct" />',
      '        <prop name="ShadowDetailLevel" type="Fct" />',
      '        <prop name="MotionblurLevel" type="Fct" />',
      '        <prop name="EffectsDetailLevel" type="Fct" />',
      "    </class>",
      '    <data class="GraphicConfigData" id="0xBBF320">',
      '        <prop name="Name" data="" />',
      '        <prop name="Mode" adapter="0" width="' + Context.Width + '" height="' + Context.Height + '" antialias="0" refresh="60" />',
      '        <prop name="Vsync" vsync="1" />',
      '        <prop name="Windowed" windowed="1" />',
      '        <prop name="TextureFilter" texturefilter="1" />',
      '        <prop name="TextureResolution" textureresolution="2" />',
      '        <prop name="Brightness" brightness="10" />',
      '        <prop name="CarDetailLevel" cardetaillevel="2" />',
      '        <prop name="TrackDetailLevel" trackdetaillevel="2" />',
      '        <prop name="ShadowDetailLevel" shadowdetaillevel="1" />',
      '        <prop name="MotionblurLevel" motionblurLevel="0" />',
      '        <prop name="EffectsDetailLevel" effectsdetaillevel="2" />',
      "    </data>",
      "</Reflection>",
      ""
    ];
    Context.WriteTextFile(txtPath, dict);
  }

  if (Graphics == "High") {
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml";
    var dict = [
      '<?xml version="1.0" ?>',
      "<Reflection>",
      '    <class name="BRTTIRefCount" base="root class" />',
      '    <class name="BPersistent" base="BRTTIRefCount">',
      '        <prop name="Name" type="String" />',
      "    </class>",
      '    <class name="GraphicConfigData" base="BPersistent">',
      '        <prop name="Mode" type="Fct" />',
      '        <prop name="Vsync" type="Fct" />',
      '        <prop name="Windowed" type="Fct" />',
      '        <prop name="TextureFilter" type="Fct" />',
      '        <prop name="TextureResolution" type="Fct" />',
      '        <prop name="Brightness" type="Fct" />',
      '        <prop name="CarDetailLevel" type="Fct" />',
      '        <prop name="TrackDetailLevel" type="Fct" />',
      '        <prop name="ShadowDetailLevel" type="Fct" />',
      '        <prop name="MotionblurLevel" type="Fct" />',
      '        <prop name="EffectsDetailLevel" type="Fct" />',
      "    </class>",
      '    <data class="GraphicConfigData" id="0xBBF320">',
      '        <prop name="Name" data="" />',
      '        <prop name="Mode" adapter="0" width="' + Context.Width + '" height="' + Context.Height + '" antialias="0" refresh="60" />',
      '        <prop name="Vsync" vsync="1" />',
      '        <prop name="Windowed" windowed="1" />',
      '        <prop name="TextureFilter" texturefilter="3" />',
      '        <prop name="TextureResolution" textureresolution="2" />',
      '        <prop name="Brightness" brightness="10" />',
      '        <prop name="CarDetailLevel" cardetaillevel="2" />',
      '        <prop name="TrackDetailLevel" trackdetaillevel="2" />',
      '        <prop name="ShadowDetailLevel" shadowdetaillevel="3" />',
      '        <prop name="MotionblurLevel" motionblurLevel="0" />',
      '        <prop name="EffectsDetailLevel" effectsdetaillevel="2" />',
      "    </data>",
      "</Reflection>",
      ""
    ];
    Context.WriteTextFile(txtPath, dict);
  }

  if (Graphics == "Ultra") {
    var txtPath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\graphicsconfig.xml";
    var dict = [
      '<?xml version="1.0" ?>',
      "<Reflection>",
      '    <class name="BRTTIRefCount" base="root class" />',
      '    <class name="BPersistent" base="BRTTIRefCount">',
      '        <prop name="Name" type="String" />',
      "    </class>",
      '    <class name="GraphicConfigData" base="BPersistent">',
      '        <prop name="Mode" type="Fct" />',
      '        <prop name="Vsync" type="Fct" />',
      '        <prop name="Windowed" type="Fct" />',
      '        <prop name="TextureFilter" type="Fct" />',
      '        <prop name="TextureResolution" type="Fct" />',
      '        <prop name="Brightness" type="Fct" />',
      '        <prop name="CarDetailLevel" type="Fct" />',
      '        <prop name="TrackDetailLevel" type="Fct" />',
      '        <prop name="ShadowDetailLevel" type="Fct" />',
      '        <prop name="MotionblurLevel" type="Fct" />',
      '        <prop name="EffectsDetailLevel" type="Fct" />',
      "    </class>",
      '    <data class="GraphicConfigData" id="0xBBF320">',
      '        <prop name="Name" data="" />',
      '        <prop name="Mode" adapter="0" width="' + Context.Width + '" height="' + Context.Height + '" antialias="8" refresh="60" />',
      '        <prop name="Vsync" vsync="1" />',
      '        <prop name="Windowed" windowed="1" />',
      '        <prop name="TextureFilter" texturefilter="3" />',
      '        <prop name="TextureResolution" textureresolution="2" />',
      '        <prop name="Brightness" brightness="10" />',
      '        <prop name="CarDetailLevel" cardetaillevel="2" />',
      '        <prop name="TrackDetailLevel" trackdetaillevel="2" />',
      '        <prop name="ShadowDetailLevel" shadowdetaillevel="3" />',
      '        <prop name="MotionblurLevel" motionblurLevel="0" />',
      '        <prop name="EffectsDetailLevel" effectsdetaillevel="2" />',
      "    </data>",
      "</Reflection>",
      ""
    ];
    Context.WriteTextFile(txtPath, dict);
  }

  var registry = Context.Options["registry"];

  if (registry == "Yes") {
    Context.RunAdditionalFiles([Game.Folder + "\\Registry fix.bat"], false, 0, true, false);
  }
  if (registry == "No") {
  }

  if (Context.PlayerID == 0) {
    Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\Wow6432Node\\Electronic Arts\\Electronic Arts\\Need for Speed Shift\\ergc", "", "E3UCP9E662TDU6FVWNZG", Nucleus.RegType.String);
  }

  if (Context.PlayerID == 1) {
    Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\Wow6432Node\\Electronic Arts\\Electronic Arts\\Need for Speed Shift\\ergc", "", "E3UCP9E662TDU6FVWNZH", Nucleus.RegType.String);
  }

  if (Context.PlayerID == 2) {
    Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\Wow6432Node\\Electronic Arts\\Electronic Arts\\Need for Speed Shift\\ergc", "", "E3UCP9E662TDU6FVWNZI", Nucleus.RegType.String);
  }

  if (Context.PlayerID == 3) {
    Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\Wow6432Node\\Electronic Arts\\Electronic Arts\\Need for Speed Shift\\ergc", "", "E3UCP9E662TDU6FVWNZJ", Nucleus.RegType.String);
  }

  var Music = Context.Options["Music"];

  if (Music == "Default") {
    if (Context.PlayerID == 0) {
      if (!System.IO.Directory.Exists(Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "")) {
        var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "");
        System.IO.Directory.CreateDirectory(filePath);
      }
      if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "")) {
        var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "");
        var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Save");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
    } else {
      if (!System.IO.Directory.Exists(Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "")) {
        var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "");
        System.IO.Directory.CreateDirectory(filePath);
      }
      if (!System.IO.File.Exists(Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "")) {
        var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "");
        var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Save_no_music");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
    }
  }

  if (Music == "Yes") {
    if (Context.PlayerID == 0) {
      var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "");
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Save");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    } else {
      var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "");
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Save_no_music");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  if (Music == "No") {
    var filePath = (Context.filePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "");
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.EnvironmentPlayer + "\\Documents\\NFS SHIFT\\" + Context.Nickname + "\\" + Context.Nickname + "");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Save");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};