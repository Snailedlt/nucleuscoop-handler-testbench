Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Aug 28 2021 03:38:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "hZAwkjh5oAvMSa4cu";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["KungFuCowboy_Data"];
Game.DirSymlinkExclusions = ["KungFuCowboy_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt"];
Game.GameName = "Kungfu Cowboy";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "KungFuCowboy.exe";
Game.SteamID = "1499220";
Game.GUID = "Kungfu Cowboy";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "KungFuCowboy";
Game.FakeFocus = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.SupportsKeyboard = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\Soyboy Games\\KungFuCowboy";
Game.Description =
  "The game already has 2 player max local co-op but with this script you can play with 4, each player with his own screen. Host a new lobby and invite the other instances using the overlay that will appear when you select invite, use the mouse cursor to right click the other players, select invite and accept the invite in the other instances, alt-tab between the instances to do this, connect the instances via invite before pressing the last Nucleus prompt for focus. If the overlay does not show make sure you disable any external overlay apps that could be interfering (e.g. Nvidia overlay). Change graphics settings and controller mappings in your main game, do not enter the graphics settings when launching via Nucleus or the instances will lose their custom resolution. Gamepads only for now.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Soyboy Games\\KungFuCowboy", "Resolution_h2981718891", 99, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Soyboy Games\\KungFuCowboy", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Soyboy Games\\KungFuCowboy", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Soyboy Games\\KungFuCowboy", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Soyboy Games\\KungFuCowboy", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Soyboy Games\\KungFuCowboy", "windowSetting_h711032735", 2, Nucleus.RegType.DWord);

  if (Context.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.PlayerID + 1)
    ]);
  }
};