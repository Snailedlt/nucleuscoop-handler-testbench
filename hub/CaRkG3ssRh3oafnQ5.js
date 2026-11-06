Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Oct 31 2022 17:01:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "CaRkG3ssRh3oafnQ5";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

var answers1 = ["No", "Yes"];
Game.AddOption("Keep monitor aspect ratio?", "Sets the instances to your monitor default aspect ratio, adds black bars.", "Ratio", answers1);

Game.ExecutableContext = ["Kanjozoku Game_Data"];
Game.DirSymlinkExclusions = ["Kanjozoku Game_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "UnityCrashHandler64.exe"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Kanjozoku Game.exe";
Game.SteamID = "2073470";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Kanjozoku Game";
Game.GameName = "Kanjozoku Game レーサー";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Kanjozoku Game";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
//Game.XInputPlusDll = ["xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\SDEV\\Kanjozoku Game";
Game.Description =
  "IMPORTANT: To connect click on go to streets (or track) in all instances as close together as you can and make sure you are in the same 'server' before clicking on the Nucleus prompt to resize the instances, otherwise the 'go to track/streets' buttons will become unusable. This is not needed if you use the keep monitor aspect ratio UI option. Use your mouse cursor to navigate the main menu and use a different in-game name per instance. Internet connection is required to connect to the game servers. Once ingame all in game prompts (send race invites/ accept race invites can be made using the 'A' button on the controller)";
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow");

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SDEV\\Kanjozoku Game", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SDEV\\Kanjozoku Game", "Screenmanager Resolution Height_h2627697771", 540, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SDEV\\Kanjozoku Game", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SDEV\\Kanjozoku Game", "Screenmanager Resolution Width_h182942802", 960, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SDEV\\Kanjozoku Game", "Screenmanager Window Position X_h4088080503", Context.PosX, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\SDEV\\Kanjozoku Game", "Screenmanager Window Position Y_h4088080502", Context.PosY, Nucleus.RegType.DWord);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_4.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x64\\xinput1_3.dl_");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput9_1_0.dll");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x64\\xinput1_3.dl_");
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

  var ratio = Context.Options["Ratio"];

  if (ratio == "Yes") {
    Game.KeepMonitorAspectRatio = true;
    Game.IgnoreWindowBorderCheck = true;
    Context.HideDesktop();
    Context.HideTaskBar();
  }

  if (ratio == "No") {
    Game.ProcessChangesAtEnd = true;
    Game.PromptProcessChangesAtEnd = true;
    Game.ResetWindows = true;
  }
};