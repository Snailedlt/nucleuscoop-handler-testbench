Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Nov 21 2022 20:06:09 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "uLbPL4sLL6Xuypnxb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["LAN", "Online"];
Game.AddOption("LAN or Online?", "Online uses goldberg emu, LAN your regular Steam account, read the handler notes about how to connect the instances before using.", "LAN", answers1);

Game.DirSymlinkExclusions = ["config"];
Game.FileSymlinkExclusions = [
  "steam_appid.txt"
  //"savedata.sav",
];
Game.FileSymlinkCopyInstead = ["config.ini", "input.ini"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "vagante.exe";
Game.SteamID = "323220";
Game.GUID = "Vagante";
Game.GameName = "Vagante";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Vagante";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 4000;
Game.SendFakeFocusMsg = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "If you use direct input gamepads enable dinput in the in-game settings and map your gamepads to the first player in each instance, if you use a keyboard player enable keyboard in the player 1 in-game settings too. The game already has 4 player local co-op but shared screen, with this handler each player gets his own screen and you can use different monitors. If you select LAN in the Nucleus UI player options the handler will launch all instances under your Steam account, it is possible to unlock Steam achievements using this option, to connect the instances host a regular server in one instance (not Steam lobby) and connect to it in the other instances using the connect to ip option, write localhost in the field that will show and press enter twice, alt-tab to an instance to use the keyboard. If you select the Online UI option Nucleus will use Steam emulation instead, to connect the instances host a Steam lobby in one instance and join in the others, the lobby will show in the list. Use the in-game zoom option to see better in splitscreen.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config\\config.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("graphics", "fullScreen", "false"),
    new Nucleus.IniSaveInfo("graphics", "windowSizeX", Context.Width),
    new Nucleus.IniSaveInfo("graphics", "windowSizeY", Context.Height)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config\\input.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Controller 0", "joystickId", Context.GamepadId - 1)]);

  if (Player.IsKeyboardPlayer) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config\\input.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Controller 0", "enabled", "false"),
      new Nucleus.IniSaveInfo("Controller 1", "enabled", "false"),
      new Nucleus.IniSaveInfo("Controller 2", "enabled", "false"),
      new Nucleus.IniSaveInfo("Controller 3", "enabled", "false")
    ]);
  } else {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config\\input.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Controller 0", "enabled", "true"),
      new Nucleus.IniSaveInfo("Controller 1", "enabled", "false"),
      new Nucleus.IniSaveInfo("Controller 2", "enabled", "false"),
      new Nucleus.IniSaveInfo("Controller 3", "enabled", "false")
    ]);
  }

  var lan = Context.Options["LAN"];

  if (lan == "LAN") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (lan == "Online") {
  }
};