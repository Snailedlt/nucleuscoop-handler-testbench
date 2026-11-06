Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Jul 01 2021 12:15:31 GMT+0000 (UTC).
Hub.Handler.Id = "3AQyKvDb536C8DYA3";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

/* If you are creating a script, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released scripts (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-script one that uses Unreal Engine 4).*/

/*(In this case, Swat4 starts multiple times by killing a mutex).
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
Game.KillMutex = ["Swat4XIsRunning"]; //you can even specify the type: Game.KillMutex = ["Type:Mutant|mutex_to_kill", "Type:Semaphore|mutex_to_kill", "Type:Event|mutex_to_kill",];
Game.RenameNotKillMutex = true; //Instead of killing the mutex, rename it to something else | Requires Game.KillMutex to contain the EXACT name of the mutexes for this to work (no partial)

//Name of the folders you don't want Nucleuscoop to symlink, only the folders placed here get hardcopied not the files.
Game.DirSymlinkExclusions = ["ContentExpansion\\system"];

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them.
Game.FileSymlinkCopyInstead = ["Swat4X.ini", "SwatGUIState.ini", "User.ini"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "Swat4X.exe";

Game.BinariesFolder = "ContentExpansion\\system"; //In which folder the game exe is located? Relative path to where Nucleus should start the game's working folder to.
Game.GUID = "Swat4GoldEdition"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "SWAT4 - Gold Edition"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.SteamID = ""; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 16; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = false; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]

Game.HideCursor = false; //Hide the mouse cursor in game instances
Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = false; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Swat 4 - The Stetchkov Syndicate"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.RefreshWindowAfterStart = true; //Should each game window be minimized and restored once all instances are opened?
Game.HookFocus = true; //Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.FakeFocus = false; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = false; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = false; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = false; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list, and you will find which Xinput DLLs the game is using. A game that supports controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_3.dll" ]; //This line specify which DLLS CustomDll will use.

//		[Multiple Keyboards/Mice lines]

//[thanks to Ilyaki for the multiple keyboards and mice support and guide]
Game.SupportsMultipleKeyboardsAndMice = true; //If enable, it will allow multiple Keyboards and Mice to be used as a device input in Nucleus. Before enable it by default, be sure that all works without problems.

// This will hook the SetCursorPos Windows function which the game may use to set the mouse position.
// This is useful to have on to prevent the game from moving the 'real' Windows mouse cursor around the screen.
Game.HookSetCursorPos = true;
// This will hook the GetCursorPos Windows function which the game may use to get the mouse position.
Game.HookGetCursorPos = true;
// These options hook Windows functions that can be used by the game to detect if keys are down.
// HookGetAsyncKeyState is usually the only one that's needed, but leave the others enabled if there are no problems.
// Some games may conflict with these hooks, so try toggling some of them if keyboard input isn't working properly.
Game.HookGetKeyState = true;
Game.HookGetAsyncKeyState = true;
Game.HookGetKeyboardState = false;
// This filters raw input messages inside the application. This makes sure each instance only receives input for its designated input device.
Game.HookFilterRawInput = true;
// This hook filters many mouse messages to position the mouse cursor and other necessary changes from within the game itself.
// This should almost always be enabled, unless it causes some conflict.
Game.HookFilterMouseMessages = true;
// This is the main switch for legacy input.
Game.HookUseLegacyInput = false;
//Nucleus Coop will hook mouse movement messages and the GetCursorPos function to work around legacy input. Some games only need the GetCursorPos hook and conflict when mouse movement messages are edited. If this is the case, enable this option:
Game.HookDontUpdateLegacyInMouseMsg = false;
//Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
//This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.
Game.HookMouseVisibility = false;

// This will send the game mouse input via Windows messages.
Game.SendNormalMouseInput = true;
// This sends keyboard input via Windows messages. This is usually all that's needed to get keyboard input working.
Game.SendNormalKeyboardInput = true;
// Use this to send scroll wheel events to the game.
// Some games don't need this, if for example they receive scroll wheel data from raw input.
Game.SendScrollWheel = true;
//In some cases, you may need to forward raw mouse input. This is almost never needed as re-register raw input has the same effect with a much more efficient method. Forwarding input forwards raw input from Nucleus Coop to the game. This has a high CPU usage and many input events will not pass, resulting in choppy movement.
Game.ForwardRawMouseInput = false;
// The same as ForwardRawMouseInput, but for keyboards. Again, this should almost never be used instead of re-register raw input.
Game.ForwardRawKeyboardInput = false;
// This will re-register the game for Windows raw input with the option to receive input while not in the foreground.
// This is important as most games will register to receive raw input only when in the foreground.
Game.HookReRegisterRawInput = true;
Game.HookReRegisterRawInputMouse = true;
Game.HookReRegisterRawInputKeyboard = true;
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
Game.LockInputAtStart = true;
// If you need to change the key to toggle input lock, e.g. if the game uses the End key, edit it with this.
// You can find a list of keys and their numbers at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
Game.LockInputToggleKey = 0x23;

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 45; //Pause between game intances starts in milliseconds.

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.PromptBetweenInstances = true; //Prompt the user with a messagebox to let the user decide when to open the next instance | default: false, PauseBetweenStarts STILL required

/*Adds whatever you put into the field as starting parameters for the game's executable. For example, in most cases '-windowed' will force windowed mode. Parameters can be chained. Necessary for some games. 
If you need to add the context options (like, resolutions chosen by the user in Nucleus UI) you need to use launch parameters inside "Game.Play = function()". 
An example could be : 
var Args = (Context.Args = " -windowed -w " + Context.Width + " -h " + Context.Height);
Context.StartArguments = Args;
*/
Game.StartArguments = "-nointro";

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "Only keyboards. Wait until the instance is set and ready before start the next one. After (the last instance should correctly set and ready) you clicked ok on the last Nucleus-Coop prompt (hook/send fake message), create a LAN server on the first instance and join-in with the others (LAN filter). Input is restricted automatically at the start. If you need to release it, press 'END' key ( press it again for restrict it). Inside Nucleus-Coop\\scripts\\Swat4X you will find scripts for the Vanilla version and for the 'Elite Force' mod. ";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /* This script will edit the game config files for make sure the instances will start with the correct settings and resolution. */

  //Making sure that instance will start in window mode by editing the game confing file.

  //Storing in a variable the path of a file needed to be edited
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ContentExpansion\\System\\Swat4X.ini"; //Editing a specific file by manually selecting the line and manually edit the text
  //Finding the line number of a specific piece of text inside a file
  var supwind = Context.FindLineNumberInTextFile(txtPath, "Suppress=WindowedMode", Nucleus.SearchType.Contains);
  //Replaicing a line in a file with a specific text
  var dict = [supwind + "|;Suppress=WindowedMode"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Editing the game config file for be sure it use the right settings in context of the player instance resolution.

  //These lines will edit a ini file. Open it for see the text structure.
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ContentExpansion\\System\\Swat4X.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("FirstRun", "BestGuessDefaultRenderDetail", "3"),
    new Nucleus.IniSaveInfo("FirstRun", "BestGuessDefaultAllow20Shaders", "1"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MenuViewportX", Context.Width),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "MenuViewportY", Context.Height),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "UseJoystick", "False"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "StartupFullscreen", "False"),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportYPos", Context.WindowY),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportXPos", Context.WindowX),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportYPosEditor", Context.WindowY),
    new Nucleus.IniSaveInfo("WinDrv.WindowsClient", "WindowedViewportXPosEditor", Context.WindowX),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "WindowedViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "WindowedViewportY", Context.Height),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "MenuViewportX", Context.Width),
    new Nucleus.IniSaveInfo("SDLDrv.SDLClient", "MenuViewportY", Context.Height)
  ]);

  //Editing the game config file for assign to each player their Nucleus-Coop nickname in-game.

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ContentExpansion\\System\\SwatGUIState.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("SwatGame.SwatGUIConfig", "MPName", Context.Nickname)]);
};

//Script by Bizzo and ReflecXion :^)