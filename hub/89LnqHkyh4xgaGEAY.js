Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Aug 02 2022 01:46:27 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "89LnqHkyh4xgaGEAY";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption(
  "Launch in regular windowed mode?",
  "Not recommended, can fix stretching but the game's window resizes on its own when you enter the pause/start options menu and go back, so do not press start in-game or do it before clicking the prompt to resize the instances.",
  "Windowed",
  answers1
);

Game.ExecutableContext = ["data.win"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  "anchorPoints.dat",
  //"audiogroup2.dat",
  "audiogroup3.dat",
  "data.win",
  "display_mouse_lock.dll",
  "execute_shell_simple.dll",
  "SpriteAlignmentMap.wub",
  "Steamworks.gml.dll",
  "VideoPlayerExtreme.dll",
  "VideoPlayerExtreme_x64.dll",
  "options.ini"
];
Game.GameName = "Kingdom Gun";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "ProjectGun.exe";
Game.SteamID = "1428770";
Game.GUID = "Kingdom Gun";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Kingdom Gun";
Game.HookFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Local\\ProjectGun";
Game.UserProfileSavePathNoCopy = false;
Game.Description =
  "IMPORTANT: Make sure you ran your main game first and that you changed some settings in the pause/start options menu. Connect the instances and start a game before clicking the last prompt to resize/reposition the instances: click online co-op and host in one instance then join in the others, use your mouse cursor to do this as the game lacks controller support in those menus, alt-tab between the instances to use it.";
Game.KeepSymLinkOnExit = false;
Game.ProcessChangesAtEnd = true;
Game.PromptProcessChangesAtEnd = true;
Game.PromptBetweenInstances = false;
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (Context.IsKeyboardPlayer) {
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

  var windowed = Context.Options["Windowed"];

  if (windowed == "Yes") {
    if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\KG_InputMapping.kgs")) {
      var txtPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\KG_InputMapping.kgs";
      var dict = ['1|"fullscreen": 1.0,|"fullscreen": false,'];
      Context.ReplacePartialLinesInTextFile(txtPath, dict);
    } else {
    }
  }

  if (windowed == "No") {
    Game.PreventWindowDeactivation = true;

    if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\KG_InputMapping.kgs")) {
      var txtPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\KG_InputMapping.kgs";
      var dict = ['1|"fullscreen": 0.0,|"fullscreen": 1.0,'];
      Context.ReplacePartialLinesInTextFile(txtPath, dict);

      var txtPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\KG_InputMapping.kgs";
      var dict = ['1|"fullscreen": false,|"fullscreen": 1.0,'];
      Context.ReplacePartialLinesInTextFile(txtPath, dict);
    } else {
    }
  }
};