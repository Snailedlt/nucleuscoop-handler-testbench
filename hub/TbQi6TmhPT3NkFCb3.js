Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Jul 15 2022 06:12:03 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "TbQi6TmhPT3NkFCb3";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["DualCore.wad"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "dinput8.ini"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "DualCore.exe";
Game.SteamID = "456830";
Game.GUID = "Dual Core";
Game.GameName = "Dual Core";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.NotTopMost = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DualCore";
Game.FakeFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\GrayFinStudios\\DualCore\\game";
Game.Description =
  "IMPORTANT: To connect the instances in the player selection screen press Y to select the online multiplayer option, then create a LAN game in one instance and join in the others, make sure you change Internet to LAN. If you use a keyboard/mouse instance make sure you lauch it as the first instance for it to work correctly (launch order is left to right, top to bottom), select kb input in the LAN lobby for the kb/mouse instance too. The game already has 4 player local co-op but with this handler each player gets his own screen and can separate, you can also use multiple monitors and unlock Steam achievements. Click on an instance if it is behind the task bar. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI. This handler uses a Special K .dll to force windowed so it will probably only work in Windows 10 and up.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Window.System", "Borderless", "false"),
    new Nucleus.IniSaveInfo("Window.System", "Center", "false"),
    new Nucleus.IniSaveInfo("Window.System", "RenderInBackground", "true"),
    new Nucleus.IniSaveInfo("Window.System", "MuteInBackground", "false"),
    new Nucleus.IniSaveInfo("Window.System", "Fullscreen", "false"),
    new Nucleus.IniSaveInfo("Window.System", "AlwaysOnTop", "1"),
    new Nucleus.IniSaveInfo("Window.System", "OverrideRes", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("Display.Output", "ForceFullscreen", "false"),
    new Nucleus.IniSaveInfo("Display.Output", "ForceWindowed", "true"),
    new Nucleus.IniSaveInfo("Render.DXGI", "MaxRes", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("Render.DXGI", "MinRes", Context.Width + "x" + Context.Height)
  ]);

  if (Player.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Input.Cursor", "ForceCaptureInUI", "true"),
      new Nucleus.IniSaveInfo("Input.Cursor", "UseHardwareCursor", "true"),
      new Nucleus.IniSaveInfo("Input.Gamepad", "DisabledToGame", "true"),
      new Nucleus.IniSaveInfo("Input.XInput", "SlotReassignment", "4,4,4,4")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Input.Mouse", "DisabledToGame", "true"),
      new Nucleus.IniSaveInfo("Input.XInput", "Rehook", "false"),
      new Nucleus.IniSaveInfo("Input.XInput", "SlotReassignment", Context.GamepadId - 1 + ",4,4,4")
    ]);
  }
};