Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Mar 21 2021 09:53:40 GMT+0000 (UTC).
Hub.Handler.Id = "DARQfmqdDYAsBfr6r";
Hub.Maintainer.Name = "LineOf7s";
Hub.Maintainer.Id = "zYddaTLp6ucHDooMz"; // HANDLES

Game.KillMutex = ["settlers2"];

// INITIALISATION
Game.ExecutableContext = ["fmod.dll"];
Game.DirSymlinkExclusions = ["bin"];
Game.FileSymlinkExclusions = ["BB_Logo.bik", "funaticsAlpha.bik", "Intro.bik", "Ubisoft.bik"];
Game.FileSymlinkCopyInstead = ["graphics.xml"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.ExecutableName = "S2DNG.exe";
Game.BinariesFolder = "bin";
Game.GUID = "The Settlers 2 10th Anniversary";
Game.GameName = "The Settlers 2: 10th Anniversary";
Game.Description =
  "IMPORTANT: Multiple keyboards and mice only. Set your main game to windowed before running this. Make sure you set up custom resolutions for however you want to split the screen (eg 960x1080, 960x540, 1920x540), create custom resolutions in your AMD/Nvidia/Intel panel so the game can see and use them. The game scales nicely to any resolution, but ONLY if you set the resolution from within it. Choose your layout, set the resolution in-game of each instance, then quit and restart the game. This will ensure it's scaled and repositioned nicely. Once all instances have started, positioned and resized left click with your respective mouse so that the emulated cursors show. Press the END key to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. Set your player name in Settings -> Network Settings. The game will remember the name and resolution of each instance. Create a LAN multiplayer game in one instance and join the others, all have to click ready for the game to start.";
Game.PauseBetweenProcessGrab = 7;
Game.PauseBetweenStarts = 25;

// SYMLINKING
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.KeepSymLinkOnExit = true;

// DISPLAY
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.HideTaskbar = true;
Game.HideDesktop = true;
Game.HideCursor = true;

// FOCUS & WINDOWS
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "THE SETTLERS II - 10th ANNIVERSARY (11757)";
Game.HasDynamicWindowTitle = true;
Game.FakeFocus = true;
Game.HookFocus = true;

// CONTROLLERS
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;

// MICE & KEYBOARDS
Game.SupportsKeyboard = false; // Keyboard and mouse input are handled by the code below
Game.SupportsMultipleKeyboardsAndMice = true;

Game.SendNormalKeyboardInput = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyState = true;
Game.HookGetKeyboardState = false;
Game.ForwardRawKeyboardInput = false;
Game.HookReRegisterRawInputKeyboard = false;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.DrawFakeMouseCursor = true;

Game.LockInputAtStart = true;
Game.LockInputToggleKey = 0x23; // The "END" key on the keyboard

// PERSISTENT STORAGE
Game.DocumentsSavePath = "S2";

//FUNCTIONS
Game.Play = function() {};