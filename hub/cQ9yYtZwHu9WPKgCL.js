Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Fri Aug 20 2021 14:29:48 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "cQ9yYtZwHu9WPKgCL";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

/*With more than four controllers, you can use only ONE XboxOne controller, and you can't use at the same time the keyboard. 
You must click/alt+tab on the corresponding instance to make it work. 
In alternative, you can try to fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.*/

/* If you are creating a script, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released scripts (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-script one that uses Unreal Engine 4).*/

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers2 = ["-", "1", "2", "3", "4"];
var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers1 = ["No", "Yes"];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers);
Game.AddOption("Enable prompt for let you change details settings?", "After you choose the detail preset in ingame options, start the next instance", "Gra", answers1);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs", "Id", answers2);

/* (Pacify start multiple times without problems. Goldberg will make the game be unseen from Steam.)
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

//Name of the folders you don't want Nucleuscoop to symlink, only the folders placed here get hardcopied not the files.
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "Pacify\\Binaries\\Win64"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "Pacify-Win64-Shipping.exe";
Game.BinariesFolder = "Pacify\\Binaries\\Win64"; //In which folder the game exe is located? Relative path to where Nucleus should start the game's working folder to.
Game.SteamID = "967050"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "Pacify"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "Pacify"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 4; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = false; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked
Game.UseNucleusEnvironment = true; //Use custom environment variables for games that use them, replaces some common paths (e.g. AppData) with C:\Users\<your username>\NucleusCoop
Game.UserProfileConfigPath = "AppData\\Local\\Pacify\\Saved\\Config"; //Relative path from user profile (e.g. C:\Users\ZeroFox) to game's config path | Used to provide some extra functionality (open/delete/copy over to Nucleus Environment)

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = false; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Pacify"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HookFocus = true; //Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.SetForegroundWindowElsewhere = true; //Set the foreground window to be something other than game windows

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = true; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = false; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = true; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list, and you will find which Xinput DLLs the game is using. A game that supports controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. For XInputPlusDll, remove or comment the line by using // for disable it.] 
This set up XInputPlus and specify which Xinput DLL it will use (If multiple dlls required, use comma seperated strings).
XinputPlus support max 4 controllers.*/
Game.XInputPlusDll = ["xinput1_3.dll"];

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_3.dll" ]; //This line specify which DLLS CustomDll will use.

//		[Multiple Keyboards/Mice lines]

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
Game.LockInputSuspendsExplorer = false;

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
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;

Game.ProtoInput.RenameHandlesHook = true;

Game.ProtoInput.BlockedMessages = [0x0008]; // Blocks WM_KILLFOCUS

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = true;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = true;
Game.ProtoInput.FocusLoopIntervalMilliseconds = 5000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.DrawFakeCursor = true;

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 20; //Pause between game intances starts in milliseconds.
Game.PauseBetweenContextAndLaunch = 5; //Number of seconds to wait after running additional files but before continuing with player setup
Game.PauseBetweenProcessGrab = 10; //How many seconds to wait after launching game (or launcher) but before grabbing game process

//		[Launch Parameters]

Game.UseGoldberg = true; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.ResetWindows = true; //After each new instance opens, resize, reposition and remove borders of the previous instance
//Game.RefreshWindowAfterStart = true; //Should each game window be minimized and restored once all instances are opened?
//Game.NotTopMost = true;	//Should Nucleus not make the game windows top most (appear above everything else)

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "When the instances are set and ready, press the END key to restrict the input ( press it again to release it). Create a lobby on the first instance and invite other players. When all are in, start the match. If you use only controllers, alt+tab on NucleusCoop for split performance. If mice pointers are not visible, keyboards players must keep moving and click their mouse until they show up. *This script uses the 'FPS Limiter by Niftu' (it could not work with some external overlay software running).";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  //The script will use launch arguments for start the game in windowed mode and change resolution. Also, it will edit the documents of the game inside the Nucleus Environment.

  //Nucleus will use launch argments for start the game in windowed, resize it correctly and ect.
  /*These two lines, will add launch options.	
  For example, source games use "-w" and "-h" as start arguments for set Width and Height of the game resolution. You can find commands and if a determinate game-engine/game can use launch parameters on Google.
  We are gonna use Context.Width and Context.Height for let Nucleus write the Width and Height chosen by the User inside the Nucleus UI. You can find other context values inside the Mod-ReadMe.txt.*/
  var Args = (Context.Args = " -WindowedFullscreen -WinX " + Context.Width + " -WinY " + Context.Height + " -ResX " + Context.Width + " -ResY " + Context.Height);
  Context.StartArguments = Args;

  //These lines will copy a specified file
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpslimiter.cfg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "fpslimiter.cfg");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpslimiter64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "fpslimiter64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpscap.bat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "fpscap.bat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\Injector.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Injector.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpscap.bat";
  var dict = ["4|set player=" + (Context.PlayerID + 1)];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  /*This line will create a variable from the corresponding Nucleus option.
  For example, this one will use the word "Fps" inside "Game.AddOption("Which FPS Cap the game will use?", '', "Fps", answers);" for
  define the variable "fps" as the answer that the user chosen on this option. So, if the user chooses "60", the var "fps" will be defined as "60". */
  var fps = Context.Options["Fps"];

  /*We need to edit config files for some game settings (example FPS cap).
  Pacify config files are stored in document folder, so we are gonna use UseNucleusEnvironment for create different document folder for each player.
  In this way, Nucleus will not touch the original game files.
  I also notice that Keyboard player will have better performance because instance must be clicked so it will have focus.
  For "fix" this problem, Nucleus will cap the keyboard player with lower framerate for give more performance to controller players.  
  */

  //This IF will be "used" if the current instance has a player that use the Keyboard
  if (Player.IsKeyboardPlayer) {
    //This IF will be "used" if the var fps is not equal to 30
    if (fps != "30") {
      //var fps = fps - 15;

      var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\WindowsNoEditor\\GameUserSettings.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "False"),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "True"),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "1"),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", fps + ".000000")
      ]);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpslimiter.cfg";
      var dict = ["1|InitialFps=" + fps + ".0", "2|ToggleFps=" + fps + ".0"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else {
      var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\WindowsNoEditor\\GameUserSettings.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "False"),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "True"),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "1"),
        new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", fps + ".000000")
      ]);
    }

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpslimiter.cfg";
    var dict = ["1|InitialFps=" + fps + ".0", "2|ToggleFps=" + fps + ".0"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    //while other inputs (controllers)
  } else {
    var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\WindowsNoEditor\\GameUserSettings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseVSync", "False"),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "bUseDynamicResolution", "True"),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeX", Context.Width),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "ResolutionSizeY", Context.Height),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FullscreenMode", "1"),
      new Nucleus.IniSaveInfo("/Script/Engine.GameUserSettings", "FrameRateLimit", fps + ".000000")
    ]);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpslimiter.cfg";
    var dict = ["1|InitialFps=" + fps + ".0", "2|ToggleFps=" + fps + ".0"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var gra = Context.Options["Gra"];

  if (gra == "No") {
  }

  if (gra == "Yes") {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.PromptBetweenInstances = true;
  }

  /* In this section I will edit the user_steam_id.txt for make sure that each players of each PC, will have a different user steam id.
   This will let you use Goldberg with other PCs in the same LAN. 
*/

  var id = Context.Options["Id"];

  if (id != "-") {
    Game.GoldbergIgnoreFileCheck = true;
    Game.GoldbergWriteSteamIDAndAccounts = false;

    //This IF will be used only if the folder "settings" doesn't exist
    if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\settings")) {
      //The folder "settings" is where Goldberg will store the saves and user settings.
      //These two lines will create a folder named "settings" inside each Nucleus content instance player folders. It will be Nucleus\content\Pacify\Instance#\Engine\Binaries\ThirdParty\Steamworks\Steamv139\Win64\settings.
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\settings");
      System.IO.Directory.CreateDirectory(filePath);
    }
    //Editing manually the account_name.txt of each instance by adding the Nucleus player nickname.
    var Account = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64\\settings\\account_name.txt";
    var Nick = [Player.Nickname];
    Context.WriteTextFile(Account, Nick);

    //This is my method for calculate the Final ID. ((Game.MaxPlayers + 1) * id) + Context.PlayerID. This will let at least 4 (Game.MaxPlayers) unique Steam IDs on each PC (better safe than sorry! :P)
    var idF = 5 * id + Context.PlayerID;

    //These IFs will make sure that the steam ids will use always 17 digits ( like the ones created by Goldberg)
    if (id == 1) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64\\settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 1) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64\\settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
  }

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Pacify\\Binaries\\Win64\\fpscap.bat"], false, 0, false, false);
};

//by Bizzo :^)