Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Oct 27 2022 21:09:04 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "WmoWkfNpo3qyh5wh3";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["No", "Yes"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars in split-screen.", "Pillar", answers1);
Game.AddOption(
  "Will you use the game's native splitscreen?",
  "If yes only launch two instances, you need 3 or 4 gamepads, the first 2 gamepads will work in the first instance and the other two in the second.",
  "Native",
  answers2
);

Game.ExecutableContext = ["image"];
Game.KillMutex = ["OLYMPIC GAMES TOKYO 2020"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 5000;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "musashi.exe";
Game.SteamID = "981890";
Game.GUID = "Olympic Games Tokyo 2020";
Game.GameName = "Olympic Games Tokyo 2020";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "OLYMPIC GAMES TOKYO 2020";
Game.PreventWindowDeactivation = true;
Game.HookFocus = true;
Game.HookInit = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\981890\\remote\\saved";
Game.Description =
  "Steam version only. Run your main game first and set the display mode to windowed, multiple gamepads only for now. This game already has native splitscreen for 2 players max but with this you can play up to four players.";
Game.KeepSymLinkOnExit = false;
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var pillar = Context.Options["Pillar"];
  var native = Context.Options["Native"];

  if (pillar == "Yes") {
    //remove pillar boxing
    Context.PatchFileFindAll(
      System.IO.Path.Combine(Context.RootFolder, "musashi.exe"),
      System.IO.Path.Combine(Context.RootFolder, "musashi.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (pillar == "No") {
  }

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