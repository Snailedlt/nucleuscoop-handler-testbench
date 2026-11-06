Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Jun 08 2022 18:17:05 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "qqoPhj2EpNzXoejNC";
Hub.Maintainer.Name = "Dreadnot";
Hub.Maintainer.Id = "imcayCstgHndCbyMo";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the instances default AR without filling the monitor/stretching.", "Ratio", answers1);

Game.ExecutableContext = ["data\\ui"];
Game.DirSymlinkExclusions = [
  // "data\\ui\\logo",
  "savedata"
];
Game.DirSymlinkCopyInstead = ["savedata"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_appid.txt"
  // "tamlogo_fhdd.wmv",
  // "IF_logo.wmv",
  // "ch_logo.wmv",
];
Game.FileSymlinkCopyInstead = ["config.ini"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MegaTagmension Blanc.exe";
Game.SteamID = "496810";
Game.GUID = "MegaTagmensionBlancNeptuneVSZombies";
Game.GameName = "MegaTagmension Blanc + Neptune VS Zombies";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.ProtoInput.AutoHideTaskbar = true;
Game.HideDesktop = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MegaTagmension Blanc + Neptune VS Zombies";
Game.PreventWindowDeactivation = true;
Game.ResetWindows = false;
Game.KeepMonitorAspectRatio = false;
Game.HookInit = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "Create a co-op game in one instance for others to join using search. Your saves per instance will save inside Nucleus content folder so be careful about deleting this game Nucleus instances folders in there. If you get stuck, just press any button and the game will continue. If you use the keep aspect ratio UI option make sure to wait until an instance loses borders before pressing the Nucleus prompt to open the next instance/apply hooks for the instances to resize correctly. You can change the resolution in the game settings to improve performance.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("screen_param", "screen_type", "0")]);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\savedata");
  System.IO.Directory.CreateDirectory(filePath);

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.ResetWindows = false;
    Game.PromptBetweenInstances = true;
    Game.PauseBetweenStarts = 35;
  }
  if (ratio == "No") {
  }
};