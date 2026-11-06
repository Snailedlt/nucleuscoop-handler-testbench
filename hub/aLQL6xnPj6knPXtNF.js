Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Oct 29 2025 10:46:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "aLQL6xnPj6knPXtNF";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes", "Only first instance"];
var answers2 = ["1", "2", "4"];
Game.AddOption(
  "Launch all instances under your Steam account?",
  "Steam needs to be open if you select Yes. You won't be able to connect to the other instances if you use this option, only use if you want to launch multiple Steam instances of the game with their own controllers.",
  "Steam",
  answers1
);
Game.AddOption(
  "Select the number of controllers per instance:",
  "If you select 2 you can play local versus in two instances of the game with 4 controllers. If you select 4 you can play with 4 controllers in only one instance of the game in local versus: pseudo 4 player mode, gamepad 1 and 2 will control the first player and gamepad 3 and 4 the second, you can use the shorcuts guide button+dpad right/up to switch between allowing the second controller per player. Max 4 xinput controllers for all.",
  "Gamepads",
  answers2
);

Game.ExecutableContext = ["nativeDX11x64"];
Game.KillMutex = ["sAppMain"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["nativeDX11x64"];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt",
  "steamclient_loader.exe",
  "ColdClientLoader.ini",
  "MvsCFC.exe",
  "steamclient64.dll",
  "steamclient64.ini",
  "StubDRM64.dll",
  "steam_appid.txt",
  "local_save.txt",
  "XInputPlus.ini",
  "XInputPlus2.ini",
  "xinput1_3.dll",
  "xinput1_4.dll"
];
Game.FileSymlinkCopyInstead = ["config.ini", "dinput8.dll"];
Game.GameName = "MARVEL vs. CAPCOM Fighting Collection: Arcade Classics";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MarvelVsCapcomFightingCollection.exe";
Game.SteamID = "2634890";
Game.GUID = "MARVEL vs CAPCOM Fighting Collection";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 9;
Game.UseNucleusEnvironment = true;
Game.LauncherExe = "MvC.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MARVEL vs. CAPCOM Fighting Collection: Arcade Classics";
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetWindowHook = false;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\GSE Saves\\2634890\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Fully CLOSE Steam before launching this. Set the resolution that matches the window size in the game options-PC settings if the instances do not resize correctly or are stretched and reset the windows with CTRL+R. Add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add custom resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Set display size to full in the pause menu if the game does not display correctly at the custom resolution you are using. Create an online custom match lobby in one instance and join in the others. The game already has local versus for 2 players but with this handler all instances can join the same lobby up to 9 players to organize tournaments and such, you can also use multiple monitors.";
Game.PauseBetweenContextAndLaunch = 3;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("DISPLAY", "Aspect", "DEFAULT"),
    new Nucleus.IniSaveInfo("DISPLAY", "ScreenMode", "WINDOW"), //BORDERLESS
    //new Nucleus.IniSaveInfo("DISPLAY", "BorderlessWindowType", "KEEPEASPECT"),
    new Nucleus.IniSaveInfo("Window", "MainX", Context.PosX),
    new Nucleus.IniSaveInfo("Window", "MainY", Context.PosY)
  ]);

  var steam = Context.Options["Steam"];
  var gamepads = Context.Options["Gamepads"];

  if (steam == "Yes") {
    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MvC.bat";
    var lines = ["START MarvelVsCapcomFightingCollection.exe"];
    Context.WriteTextFile(Bat, lines);
  }

  if (steam == "Only first instance") {
    if (Context.PlayerID == 0) {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MvC.bat";
      var lines = ["START MarvelVsCapcomFightingCollection.exe"];
      Context.WriteTextFile(Bat, lines);
    } else {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MvC.bat";
      var lines = ["START MvsCFC.exe"];
      Context.WriteTextFile(Bat, lines);

      Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\configs.user.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
        new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
        new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
      ]);
    }
  }

  if (steam == "No") {
    var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\MvC.bat";
    var lines = ["START MvsCFC.exe"];
    Context.WriteTextFile(Bat, lines);

    Context.CopyScriptFolder(Context.GetFolder(Nucleus.Folder.InstancedGameFolder));

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\configs.user.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
      new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
      new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
    ]);
  }

  if (gamepads == "2") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", " "),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", " ")
      ]);
    }

    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", " "),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", " ")
      ]);
    }
  }

  if (gamepads == "4") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1|2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "3|4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", " "),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", " "),
        new Nucleus.IniSaveInfo("SwitchSettings", "Setting2", Context.RootFolder + "\\XInputPlus2.ini")
      ]);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus2.ini");
      var savePkgOrigin = System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "XInputPlus.ini");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus2.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", " "),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", " ")
      ]);
    }
  }
};