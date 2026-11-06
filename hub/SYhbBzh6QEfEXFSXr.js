Hub.Handler.Version = 5; // Released at https://hub.splitscreen.me/ on Thu Mar 02 2023 08:37:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "SYhbBzh6QEfEXFSXr";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Will you use the game's native splitscreen?", "If yes only launch TWO instances, you need 3 or 4 gamepads.", "Native", answers1);

Game.KillMutex = ["Games-OutwardSteam-Outward-exe-SingleInstanceMutex-Default"];
Game.DirSymlinkExclusions = ["Outward_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["OptionSettings.oos"];
Game.GameName = "Outward";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Outward.exe";
Game.SteamID = "794260";
Game.GUID = "Outward";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.StartArguments = "";
Game.Hook.ForceFocusWindowName = "Outward";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = true;
Game.Description =
  "IMPORTANT: Run your main game and change some graphics settings before using this, also make sure you have multiple characters already created in your main game for saving to work with this. This handler is designed for 2 players per instance using the game native split-screen and the custom multiplayer mod that removes the online players limit, so you can play with 4 players in only two instances of the game for better performance, the first two gamepads will control the first instance and the other two gamepads the second, start a native split-screen game in the first instance, press start and select open the game to online match, in the second instance start a single player game, join the open session then press start again and select start split-screen game. If you want to have only 1 player per instance select No in the UI option before pressing play in Nucleus.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\OptionSettings.oos";
  Context.ChangeXmlNodeInnerTextValue(path, "//Windowed", "1");
  Context.ChangeXmlNodeInnerTextValue(path, "//ResolutionX", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//ResolutionY", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//MuteInBackground", "0");

  var native = Context.Options["Native"];

  if (native == "Yes") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }

    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
  }

  if (native == "No") {
  }
};