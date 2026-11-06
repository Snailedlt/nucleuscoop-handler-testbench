Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Dec 27 2020 22:34:25 GMT+0000 (UTC).
Hub.Handler.Id = "Zd4W2WEXxSbnQ2LHY";
Hub.Maintainer.Name = "josivan_silva";
Hub.Maintainer.Id = "Zvxim7A6boygk9iBo";

var answers1 = ["No", "Yes"];
var listusers = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6", "Player7", "Player8", "Player9", "Player10"];

Game.AddOption("Use Quick Join?", "Create a server on the first instance. When you are in, start the next one.", "Quick", answers1);

Game.AddOption("Player One", "Select the profile", "0", listusers, "Player1");

Game.AddOption("Player Two", "Select the profile", "1", listusers, "Player2");

Game.AddOption("Player Three", "Select the profile", "2", listusers, "Player3");

Game.AddOption("Player Four", "Select the profile", "3", listusers, "Player4");

Game.AddOption("Player Five", "Select the profile", "4", listusers, "Player5");

Game.AddOption("Player Six", "Select the profile", "5", listusers, "Player6");

Game.AddOption("Player Seven", "Select the profile", "6", listusers, "Player7");

Game.AddOption("Player Eight", "Select the profile", "7", listusers, "Player8");

Game.AddOption("Player Nine", "Select the profile", "8", listusers, "Player9");

Game.AddOption("Player Ten", "Select the profile", "9", listusers, "Player10");

Game.FileSymlinkExclusions = ["xinput1_3.dll", "Xinput1_1.dll", "Xinput1_2.dll", "x360ce.ini", "x360ce.exe", "Xinput9_1_0.dll", "dinput8.dll"];

Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "ut3.exe";
Game.SteamID = "13210";
Game.GUID = "13210";
Game.GameName = "Unreal Tournament 3";
Game.NeedsSteamEmulation = false;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.HideTaskbar = true;
Game.BinariesFolder = "Binaries";
Game.MaxPlayersOneMonitor = 10;
Game.MaxPlayers = 10;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Unreal Tournament 3";
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = true;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.DPIHandling = true;
Game.ResetWindows = true;
Game.Description =
  "If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input. Only works with Xinput controllers (Xbox), if you don't have any you can use Xoutput to simulate them. Profile names can be changed on script, to play more than 6 players you will need a core i7 8700K or better, a good GPU, and more than 16Gb of RAM";
Game.PauseBetweenStarts = 25;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = true;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = true;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  //paths and variables
  var username = System.Environment.UserName;
  var UTGameConfigPath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\Unreal Tournament 3\\UTGame\\";
  var UTEnginePath = UTGameConfigPath + "Config\\UTEngine.ini";
  var UTGamePath = UTGameConfigPath + "Config\\UTGame.ini";
  var SaveProfilePath = UTGameConfigPath + "SaveData\\";
  //Set windowed mode and resolution
  Context.ModifySaveFile(UTEnginePath, UTEnginePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SystemSettings", "Fullscreen", "False"),
    new Nucleus.IniSaveInfo("SystemSettings", "ResX", Context.Width),
    new Nucleus.IniSaveInfo("SystemSettings", "ResY", Context.Height)
  ]);
  //Set custom profile
  Context.ModifySaveFile(UTGamePath, UTGamePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("UTGame.UTUIFrontEnd_LoginScreen", "PlayerNames", Context.Options[Context.PlayerID])]);
  if (System.IO.File.Exists(SaveProfilePath + "Player.ue3profile") && !System.IO.File.Exists(SaveProfilePath + Context.Options[Context.PlayerID] + ".ue3profile"))
    System.IO.File.Copy(SaveProfilePath + "Player.ue3profile", SaveProfilePath + Context.Options[Context.PlayerID] + ".ue3profile", false);
  //Set arguments to speed up, set correct user, and enforce windowed mode and resolution
  var quick = Context.Options["Quick"];
  if (quick == "No") {
    Context.StartArguments = "-nosplash -nostartupmovies -windowed -login=" + Context.Options[Context.PlayerID] + " -resx=" + Context.Width + " -resy=" + Context.Height;
  }
  if (quick == "Yes") {
    Game.PromptBetweenInstances = true;
    if (Context.PlayerID == 0) {
      Context.StartArguments = "-nosplash -nostartupmovies -windowed -login=" + Context.Options[Context.PlayerID] + " -resx=" + Context.Width + " -resy=" + Context.Height;
    } else {
      Context.StartArguments = "127.0.0.1 -nosplash -nostartupmovies -windowed -login=" + Context.Options[Context.PlayerID] + " -resx=" + Context.Width + " -resy=" + Context.Height;
    }
  }
};