Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Sun May 29 2022 13:29:30 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "uzheNwkXEoFfq6Yrr";
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

/*This lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers1 = ["No", "Yes"];
var answers2 = ["Yes", "No"];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers);
Game.AddOption("Start Flawless-Widescreen?", "Enabled by default on the same monitor, this will start it anyway.", "Fw", answers1);
Game.AddOption("For keyboards players, automatically hide the mouse pointer?", "If the game crashes, disable this option.", "Pointer", answers2);

/* (Little Hope start multiple times without problems. Goldberg will make the game invisible from Steam. Also, SteamStubDRMPatcher will let the game start without Steam open.)
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
Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv146\\Win64", "SMG024\\Binaries\\Win64"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "LittleHope-Win64-Shipping.exe";
//In which folder the game exe is located? Relative path to where Nucleus should start the game's working folder to.
Game.BinariesFolder = "SMG024\\Binaries\\Win64";
//Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.SteamID = "1194630";
//The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GUID = "TDPALittleHope";
//Title of the game that will be show on Nucleus.
Game.GameName = "The Dark Pictures Anthology: Little Hope";
//The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.LauncherTitle = "";
//This is just an info. It will not limit the players number.
Game.MaxPlayersOneMonitor = 2;
//This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)
Game.MaxPlayers = 2;

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

//False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkExe = false;
//False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.SymlinkGame = true;
//False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.KeepSymLinkOnExit = true;
//False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardcopyGame = false;
//Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked
Game.HardlinkGame = false;
//Use custom environment variables for games that use them, replaces some common paths (e.g. AppData) with C:\Users\<your username>\NucleusCoop
Game.UseNucleusEnvironment = true;
//Relative path from user profile (e.g. C:\Users\ZeroFox) to game's config path | Used to provide some extra functionality (open/delete/copy over to Nucleus Environment)
Game.UserProfileConfigPath = "AppData\\Local\\LittleHope\\Saved\\Config\\WindowsNoEditor";

//		[Hooks]

//If enabled, Windows taskbard will be hidden.
Game.HideTaskbar = true;
//Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.SupportsPositioning = false;
//If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocus = false;
//If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.Hook.ForceFocusWindowName = "Little Hope";
//Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.HookFocus = false;
//Enable or disable the sending of focus messages to each game window at a regular interval | default: false
Game.FakeFocus = false;
//List of additional processes that need to be killed (other than executable and launcher)
Game.KillProcessesOnClose = ["FlawlessWidescreen"];
//Should Nucleus not make the game windows top most (appear above everything else)
Game.NotTopMost = false;

//Game.ForceProcessPick = true;

//		[Input lines]

//If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.SupportsKeyboard = false;
//Keyboard player will be the first to be initialized
Game.KeyboardPlayerFirst = false;
//If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputEnabled = false;
//If we should completely remove support for DirectInput input from the game
Game.Hook.DInputForceDisable = true;
//If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputEnabled = true;
//If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.
Game.Hook.XInputReroute = false;

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list and you will find which Xinput DLLs the game is using. Game that support controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_3.dll", "Xinput1_4.dll"]; //This line specify which DLLS CustomDll will use.

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. For XInputPlusDll, remove or comment the line by using // for disable it.] 
This set up XInputPlus and specify which Xinput DLL it will use (If multiple dlls required, use comma seperated strings).
XinputPlus support max 4 controllers.*/
Game.XInputPlusDll = ["xinput1_3.dll", "Xinput1_4.dll"];

//[thanks to Ilyaki for the multiple keyboards and mice support and guide]

//If enable, it will allow multiple Keyboards and Mice to be used as a device input in Nucleus. Before enable it by default, be sure that all works without problems.
Game.SupportsMultipleKeyboardsAndMice = true;

// This is true by default. Some games (e.g Unreal Engine 4 games like Deep Rock Galactic) respond incorrectly to FakeFocus sending a WM_ACTIVATE message.
// Setting this to false will make FakeFocus not send WM_ACTIVATE.
Game.FakeFocusSendActivate = false;

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
// Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
// This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.
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
// Once you have finished setting up the input options, enable this to automatically lock input (equivalent to pressing End) once all of the instances have been set up.
// This is usually convenient to leave disabled whilst testing.
Game.LockInputAtStart = true;
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
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;
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
Game.ProtoInput.FocusLoopIntervalMilliseconds = 1000;
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.DrawFakeCursor = true;

//		[Handlers]

//The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.HandlerInterval = 100;
//Number of seconds to wait after running additional files but before continuing with player setup
Game.PauseBetweenContextAndLaunch = 10;

//		[Launch Parameters]

//Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.UseGoldberg = true;
//Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.GoldbergNeedSteamInterface = false;
//If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.NeedsSteamEmulation = false;
//After each new instance opens, resize, reposition and remove borders of the previous instance
Game.ResetWindows = true;
//Create a steam_appid.txt file where the game executable is
Game.CreateSteamAppIdByExe = true;
//Should Goldberg Lobby Connect be used to connect the instances
Game.GoldbergLobbyConnect = true;
Game.GoldbergExperimental = false; //Use the experimental branch of Goldberg | Requires `Game.UseGoldberg = true` | default: false

//Use UberPsyX's Steam Stub DRM Patcher to remove Steam Stub DRM from a protected executable
Game.UseSteamStubDRMPatcher = false;
//Nucleus will show a prompt between each instances for let you decide when start the next one.
Game.PromptBetweenInstances = true;
//Should Nucleus not resize the game windows?
Game.DontResize = true;
//Should Nucleus not reposition the game windows?
Game.DontReposition = true;
//Game requires Nucleus to be run as administrator (this option will check and advise if detected not running Nucleus as admin)
Game.RequiresAdmin = true;

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "I suggest to use gamepads. If you use keyboards and you disable the 'automatically hide the mouse pointer' option, press 'Ok' on the Claver window at the start. By default, 'Alt+E' will toggle the mouse pointer visibility. For keyboard players, input should be restricted from the beginning. Press 'END' for release the input (press again for restrict it). Press Win+B for split performance if needed (only if you use controllers). Flawless-Widescreen will be started by default if you are running two instances on the same monitor.";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /*The script will use launch arguments to start the game in windowed mode. Also, it will edit the documents of each player inside the Nucleus Environment to resize the instances correctly + add the FPS cap. Anyway thanks to nircmd, the game window should resize correctly.
  Then will let the user decide if: Start Flawless-Widescreen to remove black bars (so it will copy the right files and start the software for each instance); Hook the mouse pointer visibility. */

  //Editing specific text lines in a file.
  var txtPath = Game.Folder + "\\position.bat";
  var dict = [
    "3|set Player=" + (Context.PlayerID + 1),
    "20|nircmd win setsize process /%pid% " + Player.MonitorBounds.X + " " + Player.MonitorBounds.Y + " " + Context.Width + " " + Context.Height + ""
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //the position.bat will be started with the context players resolution instances for let nircmd.exe resize the windows. Needed in this script for a specific timing.
  //Starting a specific file.
  Context.RunAdditionalFiles(["all|" + Game.Folder + "\\position.bat"], false, 0, true, false);

  if (Context.NumControllers == 0) {
    Game.PauseBetweenStarts = 30;
  }

  /*This line will create a variable from the corresponding Nucleus option.
   For example, this one will use the word "Pointer" inside "Game.AddOption("For keyboards players, automatically hide the mouse pointer?", "Most of the time this option will crash the game.", "Pointer", answers1);" for
   define the variable "poi" as the answer that the user chosen on this option. So, if the user chooses "Yes", the var "poi" will be defined as "Yes". */
  var poi = Context.Options["Pointer"];

  //Game.ProtoInput.CursorVisibilityHook could cause crashes so it will enable only on the keyboard players and if the User decide to use it.
  if (Player.IsKeyboardPlayer) {
    Game.SetForegroundWindowElsewhere = false; //Set the foreground window to be something other than game windows. It should split performance between instances (like alt+tab Nucleus windows or by pressing Win+B). This will unfocus all the instances (keyboard must be on focus for work).
  }

  //While the gamepads
  else {
    Game.SetForegroundWindowElsewhere = true; //Set the foreground window to be something other than game windows. It should split performance between instances (like alt+tab Nucleus windows or by pressing Win+B). This will unfocus all the instances (keyboard must be on focus for work).

    Game.ProtoInput.CursorVisibilityHook = false;
  }
  //This if will be used only if there is keyboard player in this session
  if (Context.HasKeyboardPlayer == true) {
    if (poi == "Yes") {
      Game.ProtoInput.CursorVisibilityHook = true;
      //If the User don't use the MouseVisibility Hook, Nucleus will start Calvier for enable the hidemouse shortcut with ALT+E
    } else if (poi == "No") {
      //This IF will be used only by the first player
      if (Context.PlayerID == 0) {
        var txtPath = Game.Folder + "\\Clavier.ini";
        var dict = ['8|Command="' + Game.Folder + '\\hidemouse.bat"'];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      }
      Game.ProtoInput.CursorVisibilityHook = false;

      Context.RunAdditionalFiles([Game.Folder + "\\Clavier.exe"], false, 0, false, false);
    }
  }

  //While the gamepads
  else {
    Game.SetForegroundWindowElsewhere = true; //Set the foreground window to be something other than game windows. It should split performance between instances (like alt+tab Nucleus windows or by pressing Win+B). This will unfocus all the instances (keyboard must be on focus for work).

    Game.ProtoInput.CursorVisibilityHook = false;
  }

  var fw = Context.Options["Fw"];

  //This IF will be used if the var fw is equal to "Yes" or there are two instances on the same monitor. Here Nucleus will start Flawless-Widescreen for removing the blackbars for resolutions that the fix support.
  if (Player.Owner.IsDualVertical() || Player.Owner.IsDualHorizontal() || fw == "Yes") {
    Game.PauseBetweenStarts = 10; //Pause between game intances starts in milliseconds.
    Game.PauseBetweenContextAndLaunch = 20; //Number of seconds to wait after running additional files but before continuing with player setup

    var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\fw.bat";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "fw.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //This line will create a backup of the file specified. Then, when Nucleus is closed, it will be restored.
    Context.BackupFile(Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\settings.xml", true);

    //Now I will copy the custom Flawless-Widescreen script files for this game inside the software folder.

    //These lines will copy the file "WSGF_Plugins.fws" inside Nucleus\utils\FlawlessWidescreen\x64\Plugins from the game folder inside scripts (the folder inside scripts must be named like the game .js file.)
    var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\Plugins\\WSGF_Plugins.fws";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\Plugins\\WSGF_Plugins.fws");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //This IF will be used only if the directory specified doesn't exist.
    if (!System.IO.Directory.Exists(Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope")) {
      var filePath = (Context.filePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Scripts");
      System.IO.Directory.CreateDirectory(filePath);
      var filePath = (Context.filePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Images");
      System.IO.Directory.CreateDirectory(filePath);
      var filePath = (Context.filePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Icons");
      System.IO.Directory.CreateDirectory(filePath);
      var filePath = (Context.filePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\GlobalDependencies\\Scripts");
      System.IO.Directory.CreateDirectory(filePath);

      var savePath =
        Context.NucleusFolder +
        "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Scripts\\TheDarkPicturesAnthologyLittleHope.lua";
      var savePkgOrigin = System.IO.Path.Combine(
        Game.Folder,
        "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Scripts\\TheDarkPicturesAnthologyLittleHope.lua"
      );
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Images\\background.jpg";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Images\\background.jpg");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Icons\\LargeIcon.png";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Icons\\LargeIcon.png");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Icons\\SmallIcon.png";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\Dependencies\\Icons\\SmallIcon.png");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\EnviromentState.xml";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\Modules\\TheDarkPicturesAnthologyLittleHope\\EnviromentState.xml");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\GlobalDependencies\\Scripts\\StandardBase.lua";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\GlobalDependencies\\Scripts\\StandardBase.lua");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
      var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\PluginCache\\WSGF_Plugins\\GlobalDependencies\\Scripts\\StandardTheme.lua";
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\PluginCache\\WSGF_Plugins\\GlobalDependencies\\Scripts\\StandardTheme.lua");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    //Closing the FlawlessWidescreen process only for the second player. In this way we can use it even for the second instance.
    if (Context.PlayerID == 1) {
      Context.KillProcessesMatchingProcessName("FlawlessWidescreen");
    }

    //Now Nucleus will copy my custom settings.xml in FlawlessWidescreen folder and then edit it for restrict it to search the game inside Nucleus game instances folders and also enable the Overwrite Display Resolution feature.
    var savePath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\settings.xml";
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "FlawlessWidescreen\\settings.xml");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //Editing a specific file by manually selecting the line and manually edit the text
    var txtPath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\settings.xml";
    //Creating a variables that will correspond to the line number of the line that contains the specified text.
    var SteamOrigDet = Context.FindLineNumberInTextFile(txtPath, "<Steam_Origin_Detection", Nucleus.SearchType.Contains);
    var CustomSetting = Context.FindLineNumberInTextFile(txtPath, "<CustomSettings", Nucleus.SearchType.Contains);

    var dict = [
      SteamOrigDet +
        '|  <Steam_Origin_Detection Steam_Path="steam;steamapps;' +
        Context.GetFolder(Nucleus.Folder.InstancedGameFolder) +
        '\\SMG024\\Binaries\\Win64;" Origin_Path="origin games;origin" />',
      CustomSetting +
        '|    <CustomSettings Enabled="true" Width="' +
        Context.Width +
        '" Height="' +
        Context.Height +
        '" DisplaysX="3" DisplaysY="1" HUDWidth="1920" HUDHeight="1080" HUDX="1920" HUDY="0" />'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\fw.bat";
    var dict = ["3|set Player=" + (Context.PlayerID + 1)];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    //this line will launch external files. Check the Mod-ReadMe.txt file for more details.
    Context.RunAdditionalFiles([Game.Folder + "\\checknucleus.bat", "all|" + Context.NucleusFolder + "\\utils\\FlawlessWidescreen\\x64\\fw.bat"], false, 5, true, false);
  } else if ((!Player.Owner.IsDualVertical() || !Player.Owner.IsDualHorizontal()) && fw == "No") {
    Game.PauseBetweenStarts = 20; //Pause between game intances starts in milliseconds.
    Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup
  }

  //Nucleus will use launch argments for start the game in windowed, resize it correctly and ect.
  /*These two lines, will add launch options.	
  For example, source games use "-w" and "-h" as start arguments for set Width and Height of the game resolution. You can find commands and if a determinate game-engine/game can use launch parameters on Google.
  You can find context values inside the Mod-ReadMe.txt.*/
  var Args = (Context.Args = "-windowed");
  Context.StartArguments = Args;

  var fps = Context.Options["Fps"];

  /*We need to edit config files for some game settings (example FPS cap and resolution).
  Little Hope config files are stored in document folder, so we are gonna use UseNucleusEnvironment for create different document folder for each player.
  In this way, Nucleus will not touch the original game files. 
  */

  var savePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\GameUserSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "bUseVSync", "False"),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "bUseDynamicResolution", "True"),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "FullscreenMode", "2"),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "MinResX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "MinResY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "ResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "ResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "LastUserConfirmedResolutionSizeX", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "LastUserConfirmedResolutionSizeY", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "LastUserConfirmedDesiredScreenWidth", Context.Width),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "LastUserConfirmedDesiredScreenHeight", Context.Height),
    new Nucleus.IniSaveInfo("/Script/SMGRuntime.GamePCSettings", "FrameRateLimit", fps + ".000000")
  ]);
};

//by Bizzo :^)