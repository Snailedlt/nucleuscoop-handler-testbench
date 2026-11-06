Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Nov 10 2021 09:36:18 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "KPqteGaKDst9Z2fSu";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Remap RB and LB buttons to Triggers?", "Maps RB/LB to LT/RT and viceversa. You can reload with RT that way.", "Remap", answers1);

Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "local_save.txt", "xinput1_4.dll", "XInputPlus.ini"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MercenaryKings.exe";
Game.SteamID = "218820";
Game.GUID = "Mercenary Kings";
Game.GameName = "Mercenary Kings";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Mercenary Kings";
Game.PreventWindowDeactivation = true;
Game.KeyboardPlayerSkipPreventWindowDeactivate = true;
Game.SetWindowHookStart = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.UserProfileConfigPath = "Documents\\Tribute Games\\MercenaryKings";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\218820\\remote";
Game.Description =
  "IMPORTANT: Designed to be used with multiple monitors 1 player per instance, the game already has 4 players native split-screen. If you use multiple monitors and an instance does not resize to cover the whole screen just go to the game settings and set that one to fullscreen. To connect the instances talk to the online play robot after the tutorial and select public mode in all instances, they will join automatically if you wait a bit. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. You can even copy your main save to all instances there.";
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\Settings.cfg";
  var dict = [Context.FindLineNumberInTextFile(txtPath, '	"Fullscreen"', Nucleus.SearchType.StartsWith) + '|	"Fullscreen": false,'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Player.Owner.IsFullscreen()) {
    Context.StartArguments = "-scale=3"; //-forcedraw -singlethread -disablevsync -powersave -disableforcethread -nosound
  } else {
    Context.StartArguments = "-scale=2";
  }

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var remap = Context.Options["Remap"];

  if (remap == "Yes") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("KeyAssign", "LT", "LB"),
      new Nucleus.IniSaveInfo("KeyAssign", "RT", "RB"),
      new Nucleus.IniSaveInfo("KeyAssign", "LB", "LT"),
      new Nucleus.IniSaveInfo("KeyAssign", "RB", "RT")
    ]);
  }

  if (remap == "No") {
  }
};