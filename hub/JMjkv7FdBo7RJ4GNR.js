Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Fri Oct 13 2023 20:21:20 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "JMjkv7FdBo7RJ4GNR";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("LAN?", "Connect the instances via the game's native LAN, read the handler notes before using.", "LAN", answers1);

Game.ExecutableContext = ["TiltedEngine.dll"];
Game.DirSymlinkExclusions = ["editor"];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["config.xml"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SymlinkExe = false;
Game.ExecutableName = "Hammerwatch.exe";
Game.SteamID = "239070";
Game.GUID = "HammerWatch";
Game.GameName = "HammerWatch";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Hammerwatch";
Game.HasDynamicWindowTitle = true;
Game.SendFakeFocusMsg = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: The game already has 4 player local co-op but shared screen, with this handler each player gets his own screen and you can use different monitors, you can separate without the map zooming out. Make sure you already have a save game in your main game before using this. If you use a keyboard player enable keyboard in the player 1 options-controls settings for that instance, for controller instances select controller there too. If you select LAN in the Nucleus UI player options the handler will launch all instances under your Steam account, it is possible to unlock Steam achievements using this option, to connect the instances host a regular server in one instance and connect to it in the other instances using the join option, write localhost in the field that will show to join, alt-tab to an instance to use the keyboard. If you select to not use the LAN UI option Nucleus will use Steam emulation instead, to connect the instances host a game in one instance and join in the others using the browse option, the lobby will show in the list.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.xml";
  Context.ChangeXmlNodeInnerTextValue(path, "//Fullscreen", "false");
  Context.ChangeXmlNodeInnerTextValue(path, "//Width", Context.Width);
  Context.ChangeXmlNodeInnerTextValue(path, "//Height", Context.Height);
  Context.ChangeXmlNodeInnerTextValue(path, "//LetterBox", "false");

  var lan = Context.Options["LAN"];

  if (lan == "Yes") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (lan == "No") {
  }
};