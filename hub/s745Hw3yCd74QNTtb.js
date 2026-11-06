Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Mar 11 2021 08:04:32 GMT+0000 (UTC).
Hub.Handler.Id = "s745Hw3yCd74QNTtb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["2x", "1x"];
var answers2 = ["No", "Yes"];
Game.AddOption("Zoom level.", "Select the game zoom level you want.", "Zoom", answers1);
Game.AddOption("Use native LAN?", "Connect the instances via the game LAN option, read notes before using.", "LAN", answers2);

Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "FeelTheSnow.exe";
Game.SteamID = "538100";
Game.GUID = "Feel The Snow";
Game.GameName = "Feel The Snow";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Feel The Snow";
Game.FakeFocus = false;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "AppData\\Local\\FeelTheSnow";
Game.Description =
  "IMPORTANT: Create a public server in one instance and join via the steam option in the others. If the windows are not resized correctly after Nucleus finishes all the resizing and positioning process or if the UI elements do not show correctly in-game press CTRL+T to minimize the windows and press it again to fix those issues. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten, after the first launch click game options/open user profile save path in the Nucleus UI to access them. If you select LAN in the Nucleus UI player options the script will launch all instances under your steam account, it is possible to unlock steam achievements using this option, to connect the instances create a public server in one instance and join using the LAN option in the others, if you use the LAN via ip option write localhost to join.";
Game.PromptBetweenInstances = false;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\conf.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "Splash", '"1.000000"')]);

  var zoom = Context.Options["Zoom"];
  var lan = Context.Options["LAN"];

  if (zoom == "1x") {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\conf.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "Fullscreen", '"2.000000"')]);
  }

  if (zoom == "2x") {
    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\conf.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Settings", "Fullscreen", '"1.000000"')]);
  }

  if (lan == "Yes") {
    var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "steam_api.dll");
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (lan == "No") {
  }
};