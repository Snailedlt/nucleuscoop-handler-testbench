Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Feb 06 2021 19:45:06 GMT+0000 (UTC).
Hub.Handler.Id = "mqi4LTBqiTaJA8tGh";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption("Xbox controllers only?", "Select yes if you aren't using any DirectInput gamepads, Xinput only.", "Gamepad", answers1);

Game.ExecutableContext = ["data"];
Game.KillMutex = ["DISNEYATVPUREPC"];
Game.FileSymlinkExclusions = ["d3d9.dll", "d3d9.ini", "dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.NeedsSteamEmulation = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "splitsecond.exe";
Game.SteamID = "297860";
Game.GUID = "Split Second";
Game.GameName = "Split/Second";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Split/Second";
Game.Hook.DInputEnabled = true;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = true;
Game.XInputPlusNoIni = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.BlockMouseEvents = true;
Game.Hook.BlockInputEvents = true;
Game.Hook.BlockKeyboardEvents = false;
Game.SetWindowHook = true;
Game.UserProfileSavePath = "Documents\\Disney Interactive Studios\\Split Second";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Connect the instances via the LAN option. The game already has native splitscreen for 2 players max but with this script you can play with 4+. Alt-tab between the instances to write names with the keyboard or to control the keyboard instance. To avoid stretching add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.), set your custom res in the game options per instance and apply. Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 32;
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

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var gamepad = Context.Options["Gamepad"];

  if (gamepad == "Yes") {
    Game.UseDevReorder = false;
    Game.XInputPlusDll = ["xinput1_4.dll", "Dinput8.dll"];
  }

  if (gamepad == "No") {
    Game.UseDevReorder = true;
  }
};