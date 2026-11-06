Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Nov 16 2022 00:40:30 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "kvWmMRLHZWDMtKNDk";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["SR2"];
Game.DirSymlinkExclusions = ["videos"];
Game.FileSymlinkExclusions = ["d3d9.dll", "xinput1_3.dll", "logo_thq_hd.bik", "logo_volition_hd.bik", "port_rebinder.dll", "dlls.cfg", "ipaddress.ini"];
Game.NeedsSteamEmulation = false;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 5000;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SR2_pc.exe";
Game.SteamID = "9480";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Saints Row 2";
Game.GameName = "Saints Row 2";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Saints Row 2";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\THQ";
Game.Description =
  "IMPORTANT: Set your main game to windowed before running this, also set your res there to 1920x1080 if you want the handler to fix stretching in split-screen. Start a Co-op LAN game in one instance and join in the other, FULLY disconnect from the internet or you will not be able to connect the instances, the second instance should see the host server IP as 127.0.0.1. If you launch an instance with the keyboard icon alt-tab to it to control it. Reduce graphics settings in your main game to improve performance.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var save = 35 + Context.PlayerID;

  var path = 5 + Context.PlayerID;

  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "SR2_pc.exe"),
    System.IO.Path.Combine(Context.RootFolder, "SR2_pc.exe"),
    "53 61 69 6E 74 73 20 52 6F 77 20 32",
    "53 61 69 6E 74 73 20 52 6F 77 20" + save,
    true
  );

  if (!System.IO.File.Exists(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat")) {
    var filePath = Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path;
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat";
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row 2\\settings.dat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
  }

  if (Context.PlayerID == 0) {
  } else {
    var id = Context.PlayerID + 2;

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\port_rebinder.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "port_rebinder.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var dlls = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dlls.cfg";
    var lines = ["port_rebinder.dll"];
    Context.WriteTextFile(dlls, lines);

    var ipconfig = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ipaddress.ini";
    Context.ModifySaveFile(ipconfig, ipconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("IPADDRESS", "MYIP", "127.0.0." + id)]);
  }

  if (Player.IsKeyboardPlayer) {
    Context.Hook.BlockMouseEvents = "False";
    Context.Hook.BlockKeyboardEvents = "False";
    Context.Hook.BlockInputEvents = "False";
    Context.Hook.ForceFocus = "False";
  } else {
    Context.Hook.BlockMouseEvents = "True";
    Context.Hook.BlockKeyboardEvents = "True";
    Context.Hook.BlockInputEvents = "True";
    Context.Hook.ForceFocus = "True";
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = false;
    Game.HookFocus = false;
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.UseAlpha8CustomDll = true;
  } else {
  }

  if (Context.AspectRatioDecimal > 1.8) {
    var savePath = Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat";
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row 2\\settings.dat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      "00 00 80 07",
      Context.Width,
      3,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      "00 00 38 04",
      Context.Height,
      3,
      true
    );
  } else if (Context.AspectRatioDecimal < 1.2) {
    var savePath = Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat";
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row 2\\settings.dat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      "00 00 80 07",
      Context.Width,
      3,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      System.IO.Path.Combine(Context.NucleusUserRoot + "\\AppData\\Local\\THQ\\Saints Row " + path + "\\settings.dat"),
      "00 00 38 04",
      Context.Height,
      3,
      true
    );
  } else {
  }
};