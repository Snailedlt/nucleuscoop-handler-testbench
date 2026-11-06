Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Sep 03 2025 21:28:45 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "dAAgZbfwkvWBCKkBF";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep aspect ratio?", "Maintains the instances default aspect ratio to avoid stretching in split-screen.", "Ratio", answers1);

Game.ExecutableContext = ["Data.bin"];
Game.DirExclusions = ["settings", "steam_settings"];
Game.DirSymlinkExclusions = ["Data"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "dinput8.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["libeay32.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Main.exe";
Game.SteamID = "1603650";
Game.GUID = "Fast Beat Battle Rider";
Game.GameName = "FAST BEAT BATTLE RIDER";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.UseGoldberg = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "環状 FAST BEAT BATTLE RIDER";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.XInputPlusDll = ["xinput1_4.dll", "dinput8.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "IMPORTANT: On first launch when an instance opens it will open in fullscreen, set it to windowed and to the resolution that matches the window size in the game options (the game does not see all custom resolutions, for example it sees 960x540 but not 960x1080 and 1920x540). After doing that select the Main process in Nucleus process picker window, click refresh if you don't see it, do the same for all the instances that open. Connect the instances via the versus mode matchmaking. In the game options don't set the game's resolution the same as your display/monitor resolution or the game will change to exclusive fullscreen automatically, this is a known issue with the game, if you get screen flickering turn off vsync.";
Game.KeepSymLinkOnExit = false;
Game.ForceProcessPick = true;
Game.PauseBetweenProcessGrab = 10;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Vibration", "EnableTriggerVibration", true),
    new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", true),
    new Nucleus.IniSaveInfo("X2DInput", "LT", "Z_Axis(+)"),
    new Nucleus.IniSaveInfo("X2DInput", "RT", "Z_Axis(-)"),
    new Nucleus.IniSaveInfo("X2DInput", "ForceFeedBack", true)
  ]);

  if (Context.GamepadId > 1) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("KeyAssign", "A", "X"),
      new Nucleus.IniSaveInfo("KeyAssign", "X", "A"),
      new Nucleus.IniSaveInfo("KeyAssign", "B", "Y"),
      new Nucleus.IniSaveInfo("KeyAssign", "Y", "B"),
      new Nucleus.IniSaveInfo("KeyAssign", "LSB", "BACK"),
      new Nucleus.IniSaveInfo("KeyAssign", "BACK", "LSB"),
      new Nucleus.IniSaveInfo("KeyAssign", "RSB", "START"),
      new Nucleus.IniSaveInfo("KeyAssign", "START", "RSB"),
      new Nucleus.IniSaveInfo("RightStick", "DisableX", true),
      new Nucleus.IniSaveInfo("RightStick", "DisableY", true),
      new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", false)
    ]);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop(true);
  }

  if (ratio == "No") {
  }
};