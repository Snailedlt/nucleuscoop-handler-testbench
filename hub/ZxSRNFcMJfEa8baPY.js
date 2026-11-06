Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 17 2021 05:01:29 GMT+0000 (UTC).
Hub.Handler.Id = "ZxSRNFcMJfEa8baPY";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

// UI OPTIONS
var answers1 = ["Yes", "No"];
Game.AddOption("Xbox controllers only?", "Select yes if you aren't using any DirectInput gamepads, Xinput only.", "Gamepad", answers1);

//  HANDLES
Game.KillMutex = [
  "Race Driver 3",
  "Task Event 0",
  "Task Event 1",
  "Task Event 2",
  "Task Event 3",
  "Task Event 4",
  "Task Event 5",
  "Task Event 6",
  "Task Event 7",
  "Task Event 8",
  "Task Event 9",
  "Task Event 10",
  "Task Event 11",
  "Task Event 12",
  "Task Event 13",
  "Task Event 14",
  "Task Event 15",
  "Task Event 16",
  "Task Event 17",
  "Task Event 18",
  "Task Event 19",
  "Task Event 20",
  "Task Event 21"
];
Game.RenameNotKillMutex = true;

//  INITIALISATION
Game.ExecutableContext = ["binkw32.dll"];
Game.GameName = "TOCA Race Driver 3";
Game.ExecutableName = "rd3.exe";
Game.GUID = "TOCA Race Driver 3";
Game.HandlerInterval = 100;
Game.NeedsSteamEmulation = false;
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 30;
Game.Description =
  "Only works with the latest GOG version. Run your main game at least once so that the game's pchardwareconfig.ini gets generated. Create and use a different profile per instance, map your gamepad in the game options per profile and assign menu keys so you can control the menus with your gamepads, exit via the game menus so the remappings save, when running the script again load your profile using the keyboard then the gamepads will work on the menus. Connect the instances via the network/LAN option. This game already has native splitscreen for 2 players max but with this script you can play with 4+. If you alt-tab out of the keyboard instance it will lose focus. Set your windows task bar to auto hide if you see it over the instances.";

// SYMLINKING
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.FileSymlinkExclusions = ["dinput8.dll", "xinput1_3.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["pchardwareconfig.ini", "ad.ini"];

// DISPLAY
Game.MaxPlayers = 12;
Game.MaxPlayersOneMonitor = 12;
Game.HideTaskbar = false;
Game.HideDesktop = true;
Game.KeepMonitorAspectRatio = true;

// FOCUS & WINDOWS
Game.UseDirectX9Wrapper = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "ToCA Race Driver 3";
Game.FakeFocus = true;
Game.FakeFocusInterval = 30000;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = false;
Game.ResetWindows = false;

//CONTROLS
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusNoIni = true;

// FUNCTIONS
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  /* var savePath = Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\savedata\\pchardwareconfig.ini";
        Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Graphics", "StartWindowed", 1),
        new Nucleus.IniSaveInfo("Graphics", "FullScreenHeight", Context.Height),
        new Nucleus.IniSaveInfo("Graphics", "FullScreenWidth", Context.Width),
        ]);*/

  var savePath = Context.OrigRootFolder + "\\savedata\\pchardwareconfig.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Graphics", "StartWindowed", 1)
    //new Nucleus.IniSaveInfo("Graphics", "FullScreenHeight", Context.Height),
    //new Nucleus.IniSaveInfo("Graphics", "FullScreenWidth", Context.Width),
  ]);

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
    Game.HookFocus = false;

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