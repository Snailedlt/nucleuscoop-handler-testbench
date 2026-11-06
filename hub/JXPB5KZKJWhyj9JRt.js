Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Fri May 09 2025 16:40:26 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JXPB5KZKJWhyj9JRt";
Hub.Maintainer.Name = "messenils";
Hub.Maintainer.Id = "5NNQPxAD7mmwGuvKp";

var answers8 = ["Yes. Level 1", "Yes. Max level", "No"];
Game.AddOption("Profiles", 'Lets the handler create profiles. Max level profiles or new ones. Creates backup of old profiles. Option "No" restores old profiles', "Setprofile", answers8);

var answers8 = ["No", "Yes"];
Game.AddOption(
  "Profile overwrite",
  'Overwrite if profile exist? Useful if you want to change between new and max level profiles. Choose "No" if you want to progress profiles',
  "Writeprofile",
  answers8
);

var answers8 = ["Enable fix", "Disable fix"];
Game.AddOption("Freeze fix", "Will stop the game traffic to dead ubisoft servers.", "Freezefix", answers8);

var answers8 = ["Enable", "Disable"];
Game.AddOption("Use fake network adapters", "Necessary for connecting more than 2 players together. Option should always be enabled unless there is a problem", "IPfix", answers8);

Game.FileSymlinkCopyInstead = [
  "binkw32.dll",
  "eax.dll",
  "setting.lua",
  "FirewallInstallHelper.dll",
  "GameuxInstallHelper.dll",
  "input_filters.cfg",
  "autodetect.ini",
  "settings.ini",
  "MappaingIcons.txt"
];
Game.FileSymlinkExclusions = [
  "dlls.cfg",
  "dinput8.dll",
  "portbinder.ini",
  "port_rebinder_v2.dll",
  "d3d9.dll",
  "d3d9.ini",
  "xinput1_3.dll",
  "Clancyman_720p.bik",
  " d_geoeye.bik",
  "disclaimers.bik",
  "logo_wide.bik",
  "rating.bik",
  "teaser_logo.bik",
  "UBIPresents.bik"
];

Game.KillMutex = ["Tom Clancy's H.A.W.X"];
Game.DirSymlinkExclusions = ["Data\\Settings", "Data\\Movies"];

Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "HAWX.exe";
Game.SteamID = "";
Game.GUID = "HAWX";
Game.GameName = "Tom Clancy's H.A.W.X";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
//Game.HideTaskbar = true;
//Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Tom Clancy's H.A.W.X";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "dinput8.dll"];
//Game.UserProfileConfigPath = "Saved Games\\Tom Clancy's H.A.W.X\\Profiles";
Game.Description =
  'Only works on version 1.02\n\nCreate a server in one instance. Join with the rest.\n\nThe consistent freezing is a game problem but this handler will attempt to fix it with the "Freeze fix option". therefore its important that game version matches\n\nLock input with END key after game setup complete.\n\nPress Alt+Tab a few times first if nucleus shortut keys like Ctrl+Q to quit is not working.';
Game.PauseBetweenStarts = 25;
Game.SetWindowHook = true;
Game.ExtWindowStyleEndChanges = ["0x0040000"]; //hide taskbar

//USS deprecated options:

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
Game.InjectHookXinput = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;

//protoinput
Game.SupportsMultipleKeyboardsAndMice = true;

// This hook should always be on, regardless of input lock
Game.ProtoInput.RegisterRawInputHook = true;

// This can always be enabled, since we are going to allow/disallow raw input with the bypass function
Game.ProtoInput.GetRawInputDataHook = true;

// We will be installing/uninstalling the filters manually so there's no need to
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.ClipCursorHook = true;

// These settings are the default and will be overwritten in the input lock.
Game.ProtoInput.EnableFocusMessageLoop = false;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false; // Filters take priority over blocks, so disable the filter
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006]; // Blocks WM_KILLFOCUS //WM_ACTIVATE

Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.AutoHideTaskbar = true;

Game.Play = function() {
  var setprofile = Context.Options["Setprofile"];
  var writeprofile = Context.Options["Writeprofile"];
  var freezefix = Context.Options["Freezefix"];
  var ipfix = Context.Options["IPfix"];
  if (Player.IsKeyboardPlayer || Player.IsRawMouse || Player.IsRawKeyboard) {
    //modded dinput. does not swallow input and blocks controller
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DINPUT8.dll";
    var savePkgOrigin = Context.ScriptFolder + "\\NoExclNoDinput.dll";
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Context.PatchFileFindPattern(
      //Disabling Xinput
      //X prepare
      System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
      System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
      "0F 8C 8B 00 00 00 80 BE 98 03 00 00 00 74 39 A1",
      "90 E9 8B 00 00 00 80 BE 98 03 00 00 00 74 39 A1",
      true
    );
  }

  if (Context.PlayerID == 0) {
    var IP = "127.0.0.2";
    var appdata = "Saved Games\\Tom Clancy's H.B.W.X";
  }
  if (Context.PlayerID == 1) {
    var IP = "127.0.0.3";
    var appdata = "Saved Games\\Tom Clancy's H.C.W.X";
  }
  if (Context.PlayerID == 2) {
    var IP = "127.0.0.4";
    var appdata = "Saved Games\\Tom Clancy's H.D.W.X";
  }
  if (Context.PlayerID == 3) {
    var IP = "127.0.0.5";
    var appdata = "Saved Games\\Tom Clancy's H.E.W.X";
  }
  if (Context.PlayerID == 4) {
    var IP = "127.0.0.6";
    var appdata = "Saved Games\\Tom Clancy's H.F.W.X";
  }
  if (Context.PlayerID == 5) {
    var IP = "127.0.0.7";
    var appdata = "Saved Games\\Tom Clancy's H.G.W.X";
  }
  if (Context.PlayerID == 6) {
    var IP = "127.0.0.8";
    var appdata = "Saved Games\\Tom Clancy's H.H.W.X";
  }
  if (Context.PlayerID == 7) {
    var IP = "127.0.0.9";
    var appdata = "Saved Games\\Tom Clancy's H.I.W.X";
  }
  var ADP = 42 + Context.PlayerID;
  Context.PatchFileFindPattern(
    //seperating appdata
    //X prepare
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    "41 2E 57 2E 58 5C 00 00 00 53",
    ADP + "2E 57 2E 58 5C 00 00 00 53",
    true
  );

  /////////forcebindIP
  if (ipfix == "Enable") {
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.PauseBetweenProcessGrab = 1;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bat.bat";
    var lines = ['"' + Context.NucleusFolder + "\\utils\\ForceBindIP\\ForceBindIP.exe" + '" ' + IP + ' "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\HAWX.exe"];
    Context.WriteTextFile(txtPath, lines);
    Game.ExecutableToLaunch = "bat.bat";
  } else {
    Game.ProtoInput.InjectStartup = true;
  }
  ///////////

  var filePath = Context.NucleusUserRoot + "\\" + appdata;
  System.IO.Directory.CreateDirectory(filePath);
  var filePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles";
  System.IO.Directory.CreateDirectory(filePath);
  var filePath = Context.NucleusUserRoot + "\\" + appdata + "\\TitleDataRegion";
  System.IO.Directory.CreateDirectory(filePath);

  var cfgpath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\_settings_0.1.525.ini";
  if (!System.IO.File.Exists(cfgpath)) {
    //install options.ini
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "_settings_0.1.525.ini");
    System.IO.File.Copy(savePkgOrigin, cfgpath, true);
    Context.Wait(300);
  }
  var dict = [
    Context.FindLineNumberInTextFile(cfgpath, "mode", Nucleus.SearchType.StartsWith) + "|mode = -1",
    Context.FindLineNumberInTextFile(cfgpath, "windowed", Nucleus.SearchType.StartsWith) + "|windowed = true",
    Context.FindLineNumberInTextFile(cfgpath, "width", Nucleus.SearchType.StartsWith) + "|width = " + Context.Width,
    Context.FindLineNumberInTextFile(cfgpath, "height", Nucleus.SearchType.StartsWith) + "|height = " + Context.Height
  ];
  Context.ReplaceLinesInTextFile(cfgpath, dict);

  var cfgpath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Data\\Settings\\settings.ini";
  var dict = [
    Context.FindLineNumberInTextFile(cfgpath, "mode", Nucleus.SearchType.StartsWith) + "|mode = -1",
    Context.FindLineNumberInTextFile(cfgpath, "windowed", Nucleus.SearchType.StartsWith) + "|windowed = true",
    Context.FindLineNumberInTextFile(cfgpath, "width", Nucleus.SearchType.StartsWith) + "|width = " + Context.Width,
    Context.FindLineNumberInTextFile(cfgpath, "height", Nucleus.SearchType.StartsWith) + "|height = " + Context.Height
  ];
  Context.ReplaceLinesInTextFile(cfgpath, dict);

  if (Context.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  if (Context.PlayerID == 0) {
    var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\_settings_0.1.525.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Sound", "musicvolume", " 1.000000")]);
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Data\\Settings\\settings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Sound", "musicvolume", "1.000000")]);
  } else {
    var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\_settings_0.1.525.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Sound", "musicvolume", " 0.000000")]);
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Data\\Settings\\settings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Sound", "musicvolume", "0.000000")]);
  }
  ////////////////////////////////////////
  if (setprofile != "No") {
    //playername
    var OriName = Context.Nickname;
    var PlayerName = OriName[0];

    var k = 0;

    for (var i = 1; i < OriName.length; i++) {
      if (i < 15) {
        PlayerName += OriName[i];
        k++;
      }
    }
    var Namlnt = "00";
    if (k == 1) {
      Namlnt = "01";
    }
    if (k == 2) {
      Namlnt = "02";
    }
    if (k == 3) {
      Namlnt = "03";
    }
    if (k == 4) {
      Namlnt = "04";
    }
    if (k == 5) {
      Namlnt = "05";
    }
    if (k == 6) {
      Namlnt = "06";
    }
    if (k == 7) {
      Namlnt = "07";
    }
    if (k == 8) {
      Namlnt = "08";
    }
    if (k == 9) {
      Namlnt = "09";
    }
    if (k == 10) {
      Namlnt = "0A";
    }
    if (k == 11) {
      Namlnt = "0B";
    }
    if (k == 12) {
      Namlnt = "0C";
    }
    if (k == 13) {
      Namlnt = "0D";
    }
    if (k == 14) {
      Namlnt = "0E";
    }
    if (k == 15) {
      Namlnt = "0F";
    }

    //writing profile_list.bin
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\profile_list.bin";
    var lines = ["123456789" + "0" + PlayerName + "99"];
    Context.WriteTextFile(txtPath, lines);

    //repairing corruption
    Context.Wait(300);
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.RootFolder, "profile_list.bin"),
      System.IO.Path.Combine(Context.RootFolder, "profile_list.bin"),
      "31 32 33 34 35 36 37 38 39 30",
      "00 00 00 B9 00 00 00 01 00" + Namlnt,
      true
    );
    Context.Wait(200);
    Context.PatchFileFindPattern(System.IO.Path.Combine(Context.RootFolder, "profile_list.bin"), System.IO.Path.Combine(Context.RootFolder, "profile_list.bin"), "39 39", "00 00", true);
    Context.Wait(200);

    var ID = 1 + Context.PlayerID;

    //only got 4 max level profiles :p hopefully no problem
    if (setprofile == "Yes. Max level" && ID > "4") {
      ID = 1;
    }

    var profilebackup = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\profile_list.bin.old";
    if (!System.IO.File.Exists(profilebackup)) {
      var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\profile_list.bin.old";
      var savePkgOrigin = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\profile_list.bin";
      if (System.IO.File.Exists(savePkgOrigin)) {
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
    }
    var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\profile_list.bin";
    var savePkgOrigin = txtPath;
    System.IO.File.Copy(savePkgOrigin, savePath, true);
    if (setprofile == "Yes. Level 1") {
      var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\" + PlayerName;
      if (!System.IO.File.Exists(savePath) || writeprofile == "Yes") {
        var savePkgOrigin = Context.ScriptFolder + "\\new" + ID;
        System.IO.File.Copy(savePkgOrigin, savePath, true);
        var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\" + PlayerName + "_0.1.525.keys";
        var savePkgOrigin = Context.ScriptFolder + "\\new" + ID + "_0.1.525.keys";
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
    }
    if (setprofile == "Yes. Max level") {
      var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\" + PlayerName;
      if (!System.IO.File.Exists(savePath) || writeprofile == "Yes") {
        var savePkgOrigin = Context.ScriptFolder + "\\player" + ID;
        System.IO.File.Copy(savePkgOrigin, savePath, true);
        var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\" + PlayerName + "_0.1.525.keys";
        var savePkgOrigin = Context.ScriptFolder + "\\player" + ID + "_0.1.525.keys";
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
    }
  } else {
    var savePkgOrigin = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\profile_list.bin.old";
    var savePath = Context.NucleusUserRoot + "\\" + appdata + "\\profiles\\profile_list.bin";
    if (System.IO.File.Exists(savePkgOrigin)) {
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      System.IO.File.Delete(savePkgOrigin);
    }
  }
  ///////////////////////

  Context.PatchFileFindPattern(
    //X prepare
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    "7D 08 83 65 F0 00 83 65 FC 00 0F B6 45 0B A3 3C BF DE",
    "90 90 90 90 90 90 0F B6 45 0B A3 3C BF DE 00 B8" + "99 99",
    true
  );
  Context.Wait(200); //Y prepare
  Context.PatchFileFindPattern(
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    "8B 45 EC A3 1C BF DE 00 8B 45 E8",
    "00 A3 1C BF DE 00 B8" + "88 88" + "00 00",
    true
  );
  Context.Wait(200);
  Context.PatchFileFindPattern(
    //X apply
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    "0B A3 3C BF DE 00 B8 99 99",
    Context.Width,
    8,
    true
  );
  Context.Wait(200);
  Context.PatchFileFindPattern(
    //Y apply
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
    "00 A3 1C BF DE 00 B8 88 88 00 00",
    Context.Height,
    8,
    true
  );
  if (freezefix == "Enable fix") {
    Context.Wait(200);
    Context.PatchFileFindPattern(
      //freeze fix
      System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
      System.IO.Path.Combine(Context.RootFolder, "HAWX.exe"),
      "74 47 8B 44 24 30 8B 4C 24 2C 50 51 8D 4C 24 10",
      "EB 47 8B 44 24 30 8B 4C 24 2C 50 51 8D 4C 24 10",
      true
    );
  }
};
Game.ProtoInput.OnInputLocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    if (player.IsKeyboardPlayer) {
      //Only do this for keyboard players otherwise there are issues with cursor visibility for gamepad players after unlocking input.

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID); // Didn't work. Use manual EnableToggleFakeCursorVisibilityShortcut instead.

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);

      // Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move messages
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, false, false, true, true);
      System.Threading.Thread.Sleep(1000);
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
    // Disable the bypass: Don't allow any raw input to pass. Doing this for all players otherwise with mixed keyboard and gamepad players you need to be careful to focus a keyboard player before locking inputs.
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
  }
};

Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];
    if (player.IsKeyboardPlayer) {
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
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle); //For this handler it's already stopped though
    }
    // Enable the bypass: allow any raw input to pass
    ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
  }
};