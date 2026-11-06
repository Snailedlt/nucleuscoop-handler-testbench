Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Sun Oct 23 2022 00:05:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "TRLQf2Mh9MLZMTNgR";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
var answers2 = ["Yes", "No"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars at different aspect ratios, fix by killer-m.", "Pillar", answers1);
Game.AddOption("Xbox controllers only?", "Select yes if you aren't using any DirectInput gamepads, Xinput only.", "Gamepad", answers2);

Game.ExecutableContext = ["DataHash"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "local_save.txt", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll", "winmm.dll"];
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 4000;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "game.exe";
Game.SteamID = "1149440";
Game.GUID = "Dragon Marked For Death";
Game.GameName = "Dragon Marked For Death";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dragon Marked For Death";
Game.RefreshWindowAfterStart = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.XInputPlusNoIni = true;
Game.SupportsKeyboard = true;
Game.Hook.CustomDllEnabled = false;
//Game.PlayerSteamIDs = ["76561198422152817","76561198131394153","76561198011792067","76561198043762785"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1149440\\local";
Game.Description =
  "Enable gamepad in the game options menu so you can control the windows in the background with gamepads, even if you already mapped your gamepad you have to enable that option in-game, alt-tab between the instances to do this. To connect to each other you need to enter the bar after the tutorial level, start a friend matching online game in one instance and the others can join using the same option. You can remap any kind of gamepad in the game options if it is wrongly mapped, if you launch an instance with the keyboard icon alt-tab to it if you can not control it.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 25;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)")
  ]);

  if (Player.IsKeyboardPlayer) {
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
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  var gamepad = Context.Options["Gamepad"];
  var pillar = Context.Options["Pillar"];

  if (gamepad == "Yes") {
    Game.UseDevReorder = false;
    Game.XInputPlusDll = ["xinput1_4.dll", "Dinput8.dll"];
  }

  if (gamepad == "No") {
    Game.UseDevReorder = true;
  }

  if (pillar == "Yes") {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\patches");
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\patches\\main.patch");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "patches\\main.patch");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Settings.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    if (Context.AspectRatioDecimal > 1.8) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("RESOLUTION", "Width", Context.Width),
        new Nucleus.IniSaveInfo("RESOLUTION", "Height", Context.Height)
      ]);
    } else if (Context.AspectRatioDecimal < 1.2) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Settings.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("RESOLUTION", "Width", Context.Width),
        new Nucleus.IniSaveInfo("RESOLUTION", "Height", Context.Height)
      ]);
    } else {
    }
  }

  if (pillar == "No") {
  }
};