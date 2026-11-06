Hub.Handler.Version = 16; // Released at https://hub.splitscreen.me/ on Sun Sep 28 2025 00:50:32 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "x6CA522XrR74myDzx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Project Cartographer", "Native Split-Screen", "XLiveLessNess"];
Game.AddOption(
  "Select an option:",
  "Select XLiveLessNess only if you have connection issues with Project Cartographer, gamepads only. Select Native Split-Screen if you want to use Project Cartographer 4 players max native split-screen per instance, drag 2 to 4 gamepad icons to each instance in Nucleus UI before using this for 8 players split-screen in only 2 instances for example. Select LAN, add 4 players in one instance and host, the other instance does the same and joins.",
  "Option",
  answers1
);

/*Game.KillMutex = [
    "Halo2AlreadyRunning",
];*/
Game.DirExclusions = ["XLiveLessNess"];
Game.DirSymlinkExclusions = ["xinput\\p02", "xinput\\p03", "xinput\\p04", "xinput\\p05", "xinput\\p06", "xinput\\p07", "xinput\\p08"];
Game.FileSymlinkExclusions = [
  "Durazno.ini",
  "Duraz02.ini",
  "Duraz03.ini",
  "Duraz04.ini",
  "Duraz05.ini",
  "Duraz06.ini",
  "Duraz07.ini",
  "Duraz08.ini",
  "halo2config1.ini",
  "halo2config2.ini",
  "halo2config3.ini",
  "halo2config4.ini",
  "halo2config5.ini",
  "halo2config6.ini",
  "halo2config7.ini",
  "halo2config8.ini",
  "xinput9_1_0.dll"
];
Game.FileSymlinkCopyInstead = ["gungame.ini", "h2customlanguage.ini", "halo2.exe.cfg", "halo2.VisualElementsManifest.xml", "imgui.ini", "loading.bin", "mssdsp.flt", "xlive.dll", "cartographer.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "halo2.exe";
Game.GUID = "Halo 2 Project Cartographer";
Game.GameName = "Halo 2: Project Cartographer";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.PlayersPerInstance = 4;
Game.StartArguments = "-hiresfix -windowed";
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Halo 2"; //Halo 2 - Project Cartographer
Game.HasDynamicWindowTitle = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\Microsoft\\Halo 2\\Saved Games";
Game.UserProfileConfigPath = "AppData\\Local\\Microsoft\\Halo 2";
Game.Description = "For [Halo 2 Project Cartographer.]{https://www.halo2.online/home/} Use CTRL+T twice to refresh the windows if you notice one instance is stretched.";
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 35;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = false;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var option = Context.Options["Option"];
  var number = Context.PlayerID + 1;
  var port = Context.PlayerID + 20;
  var portb = Context.PlayerID + 2;

  if (option == "XLiveLessNess") {
    Game.ProtoInput.MultipleProtoControllers = true;
    Game.PauseBetweenProcessGrab = 5;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xlive.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xlive.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.CopyFolder(Context.ScriptFolder + "\\XLiveLessNess", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XLiveLessNess");

    var VideoConfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XLiveLessNess\\xlln-config-" + number + ".ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_base_port", port + "00"),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_base_port_broadcast_spacing", " 2000,100,4000"),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_xhv_engine_enabled", 0),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_username_p1", Context.Nickname),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_user_live_enabled_p1", 1),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_user_online_enabled_p1", 1),
      new Nucleus.IniSaveInfo("XLLN-Config-Version:1.5.1.1", "xlive_user_auto_login_p1", 1)
    ]);

    var numPlayers = 0;

    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      if (player.IsXInput && player.ScreenIndex !== -1) {
        numPlayers++;
      }
      player.ProtoController1 = Context.GamepadId;
      player.ProtoController2 = Context.GamepadId;
      player.ProtoController3 = Context.GamepadId;
      player.ProtoController4 = Context.GamepadId;
      player.ProtoController5 = Context.GamepadId;
      player.ProtoController6 = Context.GamepadId;
      player.ProtoController7 = Context.GamepadId;
      player.ProtoController8 = Context.GamepadId;
      player.ProtoController9 = Context.GamepadId;
      player.ProtoController10 = Context.GamepadId;
    }
  }

  if (option == "Project Cartographer") {
    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xinput9_1_0.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Durazno.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Durazno.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Durazno.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Controller0", "Port", Context.GamepadId - 1),
      new Nucleus.IniSaveInfo("Controller0", "Disable", 0),
      new Nucleus.IniSaveInfo("Controller1", "Disable", 1),
      new Nucleus.IniSaveInfo("Controller2", "Disable", 1),
      new Nucleus.IniSaveInfo("Controller3", "Disable", 1)
    ]);

    if (Context.IsKeyboardPlayer) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Durazno.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Controller0", "Disable", 1)]);
    }

    if (Context.PlayerID > 0) {
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput\\p0" + number);
      System.IO.Directory.CreateDirectory(filePath);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Duraz0" + number + ".ini");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Durazno.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Duraz0" + number + ".ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Controller0", "Port", Context.GamepadId - 1),
        new Nucleus.IniSaveInfo("Controller0", "Disable", 0),
        new Nucleus.IniSaveInfo("Controller1", "Disable", 1),
        new Nucleus.IniSaveInfo("Controller2", "Disable", 1),
        new Nucleus.IniSaveInfo("Controller3", "Disable", 1)
      ]);

      if (Context.IsKeyboardPlayer) {
        var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Duraz0" + number + ".ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Controller0", "Disable", 1)]);
      }
    }

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\halo2config" + number + ".ini");
    var savePkgOrigin = Context.NucleusUserRoot + "\\AppData\\Local\\Microsoft\\Halo 2\\halo2config1.ini";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\halo2config" + number + ".ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "h2portable", " false"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "base_port", " " + portb + "000"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "lan_ip", " 127.0.0.1"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "skip_intro", " true"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "disable_ingame_keyboard", " true")
    ]);

    if (Context.IsKeyboardPlayer) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\halo2config" + number + ".ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "disable_ingame_keyboard", " false")]);
    }
    if (Context.PlayerID > 3) {
      Game.ProtoInput.XinputHook = true;
      Game.ProtoInput.UseOpenXinput = true;
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
    }
  }

  if (option == "Native Split-Screen") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xinput9_1_0.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Durazno.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Durazno.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\halo2config" + number + ".ini");
    var savePkgOrigin = Context.NucleusUserRoot + "\\AppData\\Local\\Microsoft\\Halo 2\\halo2config1.ini";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\halo2config" + number + ".ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "h2portable", " false"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "base_port", " " + portb + "000"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "lan_ip", " 127.0.0.1"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "skip_intro", " true"),
      new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "disable_ingame_keyboard", " true")
    ]);

    if (Context.IsKeyboardPlayer) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\halo2config" + number + ".ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("H2ConfigurationVersion:1", "disable_ingame_keyboard", " false")]);
    }

    Game.ProtoInput.MultipleProtoControllers = true;
  }
};