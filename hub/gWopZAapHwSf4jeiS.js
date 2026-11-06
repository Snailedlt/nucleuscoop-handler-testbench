Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jul 10 2021 20:26:44 GMT+0000 (UTC).
Hub.Handler.Id = "gWopZAapHwSf4jeiS";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Kandagawa Jet Girls_Data"];
Game.DirSymlinkExclusions = [
  "Launcher",
  //"SavesDir",
  "Kandagawa Jet Girls_Data\\Plugins"
];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "dinput8.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = [
  //"setting.ini",
  "Launcher.exe"
];
Game.GameName = "Kandagawa Jet Girls";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Kandagawa Jet Girls.exe";
Game.SteamID = "1233800";
Game.GUID = "Kandagawa Jet Girls";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.UseGoldberg = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Kandagawa Jet Girls";
Game.FakeFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.BlockRawInput = false;
Game.Description =
  "Unlock the Online mode in all instances by winning the first story mode race. Go back to the main menu after that and select Online mode, create a casual room in one instance and join in the others. Your saves per instance are in your original files SavesDir folder, you can even copy your main save to all the instances folders there. Enable the keyboard UI icons in the game settings for the keyboard instance if you use one.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var Args = (Context.Args = "-screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Marvelous USA Inc.\\Kandagawa Jet Girls", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Marvelous USA Inc.\\Kandagawa Jet Girls", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Marvelous USA Inc.\\Kandagawa Jet Girls", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Marvelous USA Inc.\\Kandagawa Jet Girls", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  var savePath = (Context.SavePath = Context.OrigRootFolder + "\\SavesDir\\setting.ini");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Display", "WindowMode", "0"),
    new Nucleus.IniSaveInfo("Display", "ScreenW", Context.Width),
    new Nucleus.IniSaveInfo("Display", "ScreenH", Context.Height)
  ]);
};