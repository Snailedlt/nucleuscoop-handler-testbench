Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Aug 20 2021 20:19:58 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "7Mtu9gKXG3a89AFnw";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

/* If you are creating a script, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released scripts (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-script one that uses Unreal Engine 4).*/

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers1 = ["No", "Yes"];
var answers2 = ["local-server", "server-browser"];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers);
Game.AddOption("Start the local dedicated server o use the server browser?", "", "Server", answers2);
Game.AddOption("Enable prompt for let you create new profiles?", "The first time, players must create a profile.", "Prompt", answers1);

/* (TES3MP start multiple times without problems.)
Most of the games, need a specific (or more) mutex/event/semaphore to be killed. (Not all of them. There are games that you can start multiple times without problems, so try it before do work for nothing :p)
Usually, the right one/ones have the game-name or engine-name in the name. For example, most source games use "hl2"_singleton_mutex.
To check which ones the game use, we will use Process Explorer: https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer .
Open Process Explorer (with admin rights) start the game, click the game process on the list, and press View Handles (Ctrl+H). You will see the full list of mutex/event/semaphore...
If you think to have found the right one, right-click on it and choose "Close Handle". After that, try to run a second instance of the game and see if it open.
Be careful that launchers check if the game is already running. For example, Goldberg, make the game unseen from Steam. So, if it is a Steam game, try to create a script with 
With Goldberg enabled, test if the game starts multiple times (+ the mutex/event/semaphore...etc needed to be killed).
If you find that no mutex closed helps you (or is not enough), there are other ways:
- Change the game exe name for each instance (in Nucleus-Coop = Game.ChangeExe = true;)
- Change the title of the game window. You can use https://www.nirsoft.net/utils/winexp.html for testing. (in Nucleus-Coop = Game.IdInWindowTitle = true;) 
- Start the game as a different windows user. (For testing, you need a second windows user and press shift + right-click on the exe and choose "Rus as another user". In Nucleus-Coop you can use
  Game.LaunchAsDifferentUsers = true; and if needed Game.ThirdPartyLaunch = true;)*/

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them.
Game.FileSymlinkCopyInstead = ["tes3mp-server.exe", "tes3mp-server-default.cfg", "tes3mp-client-default.cfg", "settings-default.cfg", "tes3mp-browser.exe"];

//Copy (not symlink) all files within a given folder | Folder name is relative from root game folder
Game.DirSymlinkCopyInstead = ["server"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "tes3mp.exe";
Game.BinariesFolder = ""; //In which folder the game exe is located? Relative path to where Nucleus should start the game's working folder to.
Game.SteamID = "22320"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "Morrowind"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "The Elder Scrolls III: Morrowind (TES3MP)"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 6; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 64; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = true; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]

Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = false; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "OpenMW"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HookFocus = false; //Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.NotTopMost = true; //Should Nucleus not make the game windows top most (appear above everything else)

// Sends WM_ACTIVATE, which breaks input (see below)
//Game.FakeFocus = true;
//Game.KeyboardPlayerSkipFakeFocus = true;
//Game.FakeFocusInterval = 5;
//Game.HookFocus = false;

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 30; //Pause between game intances starts in milliseconds.

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.NotTopMost = true; //Should Nucleus not make the game windows top most (appear above everything else)
Game.PromptBetweenInstances = false; //Prompt the user with a messagebox to let the user decide when to open the next instance | default: false, PauseBetweenStarts STILL required
//Game.KillProcessesOnClose = [ "tes3mp-server", "cmd"];

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "This only works with Multiplayer for OpenMW also known as TES3MP. The very first time you join in a server, you will need to create a profile. The script has two modes: 'local-server' will start a dedicated server and make all the instances join-in. Enable prompts if you need to create new profiles (be sure that the instance is fully set before starting the next one). When all instances are set press the 'END' key to restrict the input (press it again if you want to release it). By default the password is 'nucleus'. You can edit the server password inside the script (.js file in the scripts folder). When you close the game, wait until the server saves for each player before closing the cmd window; 'server-browser' will launch the server browser for let you pick a server. This mode must use prompts (enabled by default). When you logged-in/created your profile and the player is ready to play, click 'ok' on the Nucleus-Coop prompt. Do the same things for each player. This mode will restrict the input from the start ( no need to press END). In any case, press F2 twice for hide the chat (better do it before the next instance starts for gamepads players). If the cursor doesn't show up for the gamepad instances, try open/close the inventory multiple times and click some buttons.";

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = false; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = true; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list, and you will find which Xinput DLLs the game is using. A game that supports controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "Xinput1_4.dll" ]; //This line specify which DLLS CustomDll will use.

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. For XInputPlusDll, remove or comment the line by using // for disable it.] 
This set up XInputPlus and specify which Xinput DLL it will use (If multiple dlls required, use comma seperated strings).
XinputPlus support max 4 controllers.*/
Game.XInputPlusDll = ["Xinput1_4.dll"];

//		[Multiple Keyboards/Mice lines]

//ALL MULTIPLE KEYBOARDS LINES ARE SET ON FALSE TO LET PROTOINPUT FEATURES WORK CORRECTLY

//[thanks to Ilyaki for the multiple keyboards and mice support and guide]
Game.SupportsMultipleKeyboardsAndMice = true; //If enable, it will allow multiple Keyboards and Mice to be used as a device input in Nucleus. Before enable it by default, be sure that all works without problems.

// This will hook the SetCursorPos Windows function which the game may use to set the mouse position.
// This is useful to have on to prevent the game from moving the 'real' Windows mouse cursor around the screen.
Game.HookSetCursorPos = false;
// This will hook the GetCursorPos Windows function which the game may use to get the mouse position.
Game.HookGetCursorPos = false;
// These options hook Windows functions that can be used by the game to detect if keys are down.
// HookGetAsyncKeyState is usually the only one that's needed, but leave the others enabled if there are no problems.
// Some games may conflict with these hooks, so try toggling some of them if keyboard input isn't working properly.
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
// This filters raw input messages inside the application. This makes sure each instance only receives input for its designated input device.
Game.HookFilterRawInput = false;
// This hook filters many mouse messages to position the mouse cursor and other necessary changes from within the game itself.
// This should almost always be enabled, unless it causes some conflict.
Game.HookFilterMouseMessages = false;
// This is the main switch for legacy input.
Game.HookUseLegacyInput = false;
//Nucleus Coop will hook mouse movement messages and the GetCursorPos function to work around legacy input. Some games only need the GetCursorPos hook and conflict when mouse movement messages are edited. If this is the case, enable this option:
Game.HookDontUpdateLegacyInMouseMsg = false;
//Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
//This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.
Game.HookMouseVisibility = false;

// This will send the game mouse input via Windows messages.
Game.SendNormalMouseInput = false;
// This sends keyboard input via Windows messages. This is usually all that's needed to get keyboard input working.
Game.SendNormalKeyboardInput = false;
// Use this to send scroll wheel events to the game.
// Some games don't need this, if for example they receive scroll wheel data from raw input.
Game.SendScrollWheel = false;
//In some cases, you may need to forward raw mouse input. This is almost never needed as re-register raw input has the same effect with a much more efficient method. Forwarding input forwards raw input from Nucleus Coop to the game. This has a high CPU usage and many input events will not pass, resulting in choppy movement.
Game.ForwardRawMouseInput = false;
// The same as ForwardRawMouseInput, but for keyboards. Again, this should almost never be used instead of re-register raw input.
Game.ForwardRawKeyboardInput = false;
// This will re-register the game for Windows raw input with the option to receive input while not in the foreground.
// This is important as most games will register to receive raw input only when in the foreground.
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
// This enables the fake mouse cursor to be drawn over the game by Nucleus Coop.
// If the game uses a custom cursor, you will probably not need this option. (This will be obvious if you see the games custom cursor and a fake cursor drawn over it).
// Be aware this is a 'fake' mouse cursor in the sense that Nucleus Coop will fake mouse input to the game via the other options and then the fake mouse cursor is drawn where the game should be responding to mouse input.
// The fake cursor is drawn by creating a large transparent window over the game. This may prevent the game from receiving mouse input from the 'real' Windows cursor. It is sometimes useful to disable this while testing.
Game.DrawFakeMouseCursor = false;
// If you are using controllers and need a fake mouse cursor, try these options:
Game.DrawFakeMouseCursorForControllers = false;
Game.UpdateFakeMouseWithInternalInput = false;
// Once you have finished setting up the input options, enable this to automatically lock input (equivalent to pressing End) once all of the instances have been set up.
// This is usually convenient to leave disabled whilst testing.
Game.LockInputAtStart = false;
// If you need to change the key to toggle input lock, e.g. if the game uses the End key, edit it with this.
// You can find a list of keys and their numbers at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
Game.LockInputToggleKey = 0x23;

// Suspends explorer.exe. This makes input locking more robust but will cause parts of Windows to freeze (generally best on)
Game.LockInputSuspendsExplorer = true;

// Tells ProtoInput to NOT simulate input while Nucleus Coop has input LOCKED.
// Basically if you're using the 'real' mouse/keyboard, you won't want the 'simulated' input interfering
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;

// Starts the process suspended and then injects ProtoInput.
// Necessary for the rename handles/pipes hooks
Game.ProtoInput.InjectStartup = false;

// Runtime hooks: lets Nucleus Coop launch the process, then injects hooks
// Safest option unless you need some startup hooks.
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true; // Usually this works best
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.RawInputFilter = true;

Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.AllowFakeCursorOutOfBounds = false;

Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;

Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;

Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = false;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.UseOpenXinput = false;

Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;

// Need to block WM_ACTIVATE as it used also used to tell a window when it is UNFOCUSED.
// Usually not a problem, since we can flood the game with WM_ACTIVATE that say it's focused, but WM_ACTIVATE breaks input in our case
// Another problem is that after Nucleus strips borders and repositions the window, the game loses focus, so we need to send WM_ACTIVATE once
// We can do this by enabling the focus message loop and quickly disabling on the input lock callback.

// These settings are the default and will be overwritten in the input lock.
Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1;
// This makes input NOT work (it ignores raw input and uses the normal mouse for some reason)
Game.ProtoInput.FocusLoop_WM_ACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = false;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = false;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = false;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = false;
Game.ProtoInput.WindowActivateFilter = false; // Filters take priority over blocks, so disable the filter
Game.ProtoInput.BlockedMessages = [0x0008, 0x0006]; // Blocks WM_KILLFOCUS, WM_ACTIVATE

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.AutoHideTaskbar = true;

Game.ProtoInput.OnInputLocked = function() {
  if (Context.HasKeyboardPlayer) {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.DisableMessageBlock(player.ProtoInputInstanceHandle, 0x0006); // Allow WM_ACTIVATE to go through
      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, true, true, true);

      // Wait a bit to make sure the message is sent
      System.Threading.Thread.Sleep(1000);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);

      // It should have received the message now.
      ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0006); // Allow WM_ACTIVATE to go through
      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  }
};

Game.ProtoInput.OnInputUnlocked = function() {
  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    //This make all keyboards work on all instances ( needed for gamepads login ).
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
  }
};

Game.Play = function() {
  var password = "nucleus"; //---------------------> password used by the dedicated server

  /* The script will edit the TS3MP files to let the instances start with the correct settings.
	   It will also start the dedicated server or the server browser in the context of what the user chosen in the Nucleus-Coop UI options. */

  //Enabling prompts only if the user decide to enable them

  /*This line will create a variable from the corresponding Nucleus option.
    For example, this one will use the word "Aux" inside "Game.AddOption("Enable prompt for let you create new profiles?", "The first time, players must create a profile.", "Prompt", answers1);" for
    define the variable "prompt" as the answer that the user chosen on this option. So, if the user choose "Yes", the var "prompt" will be defined as "Yes". */
  var prompt = Context.Options["Prompt"];

  if (prompt == "Yes") {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.PromptBetweenInstances = true;
  }

  var fps = Context.Options["Fps"];

  //Editing the config file for let the instances start with the correct settings

  if (Context.PlayerID == 0) {
    //This line will create a backup of the file specified. Then, when Nucleus is closed, it will be restored.
    Context.BackupFile(Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\OpenMW\\settings.cfg", true);
  }

  var savePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Games\\OpenMW\\settings.cfg";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Input", "grab cursor ", " false"),
    //new Nucleus.IniSaveInfo("Input", "grab cursor ", " true"),
    new Nucleus.IniSaveInfo("Video", "resolution x ", " " + Context.Width),
    new Nucleus.IniSaveInfo("Video", "resolution y ", " " + Context.Height),
    new Nucleus.IniSaveInfo("Video", "fullscreen ", " false"),
    new Nucleus.IniSaveInfo("Video", "minimize on focus loss ", " false"),
    new Nucleus.IniSaveInfo("Video", "window border ", " false"),
    new Nucleus.IniSaveInfo("Video", "framerate limit ", " " + fps + ".0")
  ]);

  //Enabling toggle sneak and fakefocus only for gamepads players

  if (!Context.IsKeyboardPlayer) {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 5;

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\settings-default.cfg";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Input", "toggle sneak ", " true")]);
  } else {
    Game.FakeFocus = false;
  }

  var server = Context.Options["Server"];

  // Here what happens when "local-server" is selected
  if (server == "local-server") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tes3mp-client-default.cfg";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("General", "destinationAddress ", " localhost"),
      new Nucleus.IniSaveInfo("General", "password ", " " + password)
    ]);

    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tes3mp-server-default.cfg";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("General", "localAddress ", " 0.0.0.0"),
        new Nucleus.IniSaveInfo("General", "password ", " " + password),
        new Nucleus.IniSaveInfo("MasterServer", "enabled ", " true")
      ]);

      //Running a file
      Context.RunAdditionalFiles([Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tes3mp-server.exe"], false, 1);
    }
  }

  // Here what happens when "server-browser" is selected
  if (server == "server-browser") {
    Game.ThirdPartyLaunch = true; //Use if the game is launched outside of Nucleus | NOTE: You will not be able to use start up hooks or CMDLaunch with this option
    Game.LockInputAtStart = true;

    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tes3mp-browser.exe"], false, 1, false, false);
  }
};