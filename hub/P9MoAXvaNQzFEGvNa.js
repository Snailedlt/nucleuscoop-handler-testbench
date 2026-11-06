Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Jan 12 2021 07:11:09 GMT+0000 (UTC).
Hub.Handler.Id = "P9MoAXvaNQzFEGvNa";
Hub.Maintainer.Name = "LineOf7s";
Hub.Maintainer.Id = "zYddaTLp6ucHDooMz";

var answers1 = ["No", "Yes"];
Game.AddOption("Xbox controllers only?", "Select yes if you aren't using any DirectInput gamepads, Xinput only.", "Gamepad", answers1);

Game.ExecutableContext = ["binkw32.dll"];
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.KillMutex = ["DISNEYATVPUREPC"];
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.UseNucleusEnvironment = true;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "pure.exe";
Game.SteamID = "322600";
Game.GUID = "Pure";
Game.GameName = "Pure";
Game.MaxPlayers = 16;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "PURE";
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusNoIni = true;
Game.Hook.CustomDllEnabled = false;
Game.HookFocus = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Disney Interactive Studios\\Pure";
Game.Description =
  "Launch the game before running via NucleusCoop and set the display to Windowed. Connect the instances via LAN. If you want to avoid screen stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540 etc.) and set those in-game in each instance. Alt-tab between the instances to write names with the keyboard or to control the keyboard instance. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 25;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
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
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.PlayerID + 1),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.PlayerID + 1)
    ]);
  }

  var gamepad = Context.Options["Gamepad"];

  if (gamepad == "Yes") {
    Game.UseDevReorder = false;
    Game.XInputPlusDll = ["xinput1_4.dll", "Dinput8.dll"];
  }

  if (gamepad == "No") {
    Game.UseDevReorder = true;
  }
};