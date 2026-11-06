Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Wed Apr 14 2021 20:14:30 GMT+0000 (UTC).
Hub.Handler.Id = "w2fQxFg6GFDFAbPAZ";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["2x", "3x", "1x"];
var answers2 = ["4", "5", "6", "8", "16"];
Game.AddOption("Zoom Scale.", "Select your in-game zoom scale level.", "Zoom", answers1);
Game.AddOption("Max. Number of Players.", "You can change the max number of players cap here.", "Max", answers2);

Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["options.ini", "Prefs.ini", "Save.ini"];
Game.NeedsSteamEmulation = false;
Game.CreateSteamAppIdByExe = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;
Game.SupportsKeyboard = true;
Game.GameName = "Risk of Rain";
Game.SteamID = "248820";
Game.GUID = "Risk of Rain";
Game.ExecutableName = "Risk of Rain.exe";
Game.LauncherTitle = "";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Risk of Rain";
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.RefreshWindowAfterStart = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "The game already has native local co-op for 4 players, but this allows each player to have his own screen, you can use different monitors too. Change video settings to your liking in each instance before hosting or joining a match, you may need to restart to get the settings to apply properly the first time. Host an online game in the first instance before launching the second, launch and connect each instance to the server using the localhost ip (127.0.0.1) before launching the next. Sometimes they each have their own cursor but most of the time you will need to control the UI in all instances using the mouse. Select match options/characters and start the match before clicking ok in the last install hooks prompt, otherwise the windows will regain borders/not remove borders correctly, you can also adjust the zoom scale in-game before clicking the last prompt to see better. The keyboard player needs their instance in focus in order to control his character, alt-tab to it or click on it after installing hooks. Non-standard resolutions will be stretched.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Prefs.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Video Options", "fullscreen", "0"), new Nucleus.IniSaveInfo("Joystick", "joystick_on", "1")]);

  if (Context.IsKeyboardPlayer) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Prefs.ini");
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Joystick", "joystick_on", "0")]);
  }

  var zoom = Context.Options["Zoom"];

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Prefs.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Online", "max_players_online", Context.Options["Max"])]);

  if (zoom == "1x") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Prefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Video Options", "scale", "1")]);
  }
  if (zoom == "2x") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Prefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Video Options", "scale", "2")]);
  }

  if (zoom == "3x") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Prefs.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Video Options", "scale", "3")]);
  }
};