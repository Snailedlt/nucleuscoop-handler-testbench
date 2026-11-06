Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Jun 14 2026 07:00:17 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Ju7wDz5zEcaD6oKK3";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption(
  "Multiple xinput controllers per instance?",
  "Drag 2 to 4 gamepad icons to each instance in Nucleus UI before selecting yes. This way you can play 4 players pvp or co-op in two instances of the game with 8 controllers for example. Set controllers to xinput only in the game options if you get double input.",
  "Mgamepads",
  answers1
);

Game.ExecutableContext = ["data.win"];
Game.FileSymlinkExclusions = ["xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["audiogroupSFX.dat", "data.win", "gme.dll", "libxprocess_x64.dll", "options.ini", "rousrDissonance.dll"];
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MegaManArena.exe";
Game.GUID = "Mega Man Arena";
Game.GameName = "Mega Man Arena";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Mega Man Arena";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.RefreshWindowAfterStart = false;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.PlayersPerInstance = 4;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Local\\MegaManArena";
Game.UserProfileSavePathNoCopy = false;
Game.Description =
  'IMPORTANT: Set your main game to windowed before running this, you can change the window size in the game options for it to fit better. Host an online game in one instance and in the others choose direct ip in "Mode:", select join, write 127.0.0.1 and press enter in your keyboard to join, click on or alt-tab to an instance to use the keyboard, if you can not connect more than 2 players exit the room in one instance, join with the instance that could not connect then join again with the instance that exited. If the game windows resize or stretch on their own after you finish a match or when you get the p2p warning (select do not show again) use the Nucleus Co-op shortcut CTRL+T twice to fix them. The game already has 4 players local multiplayer but with this handler each player gets his own screen and you can play splitscreen+online, you can also run multiple instances with 4 controllers each to play 4 players co-op in each instance. Set gamepads to xinput only in the game options if you get double input.';
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 25;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = false;
Game.ProtoInput.FocusHooks = false;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.MultipleProtoControllers = false;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\mmaonlineprofile.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Profile", "Name", '"' + Context.ToUpperCase(Player.Nickname) + '"')]);

  var mgamepads = Context.Options["Mgamepads"];

  if (mgamepads == "Yes") {
    Game.ProtoInput.MultipleProtoControllers = true;
  }
};