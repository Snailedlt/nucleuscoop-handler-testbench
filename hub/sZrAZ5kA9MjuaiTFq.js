Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Fri Mar 18 2022 17:18:35 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "sZrAZ5kA9MjuaiTFq";
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

//variable used for let the user know if the reroute option is turned on or off. This will be edited when changed.
var status = "DISABLED";

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["60", "45", "30", "120", "144", "240", "300"];
var answers1 = [
  "-",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32"
];
var answers3 = ["-", "TURN-ON"];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers);
Game.AddOption("PC-ID", "If you are playing with other PCs in LAN, be sure to have different IDs.", "Id", answers1);
Game.AddOption("Enable experimental Xinput Reroute in this script?", 'This will restart Nucleus. Current status: "' + status + '"', "Reroute", answers3);

//These line will create a prompt at the start and ask the user to input text. Then you can use it as a value. Check Mod-ReadMe.txt for other methods.
Game.CustomUserGeneralPrompts = [
  "If you are playing in LAN with other PCs, enter the IP of the Host computer only if this PC is a Client (if you are just playing on the same PC or this is the Host PC, leave it blank)."
];
Game.SaveAndEditCustomUserGeneralValues = false; //This, if enabled, will store in a txt file (inside Nucleus\scripts\gamefolder) the last text input the user entered

/* (Day of Infamy must have Steam running. The launch argument "-insecure" will let the game start multiple times and also by killing the right mutex. Goldberg is used only for give custom nicknames to each players).
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
Game.KillMutex = ["hl2_singleton_mutex"]; //you can even specify the type: Game.KillMutex = ["Type:Mutant|mutex_to_kill", "Type:Semaphore|mutex_to_kill", "Type:Event|mutex_to_kill",];
Game.RenameNotKillMutex = true; //Instead of killing the mutex, rename it to something else | Requires Game.KillMutex to contain the EXACT name of the mutexes for this to work (no partial). For a tester this helped kill the mutex in this game.

//Name of the folders you don't want Nucleuscoop to symlink, only the folders placed here get hardcopied not the files.
Game.DirSymlinkExclusions = ["doi", "doi\\cfg", "bin", "bin\\x64"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["dayofinfamy_BE.exe", "steam_appid.txt", "steam_api64.dll", "autoexec.cfg", "xinput1_3.dll"];

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them.
Game.FileSymlinkCopyInstead = ["video.txt", "config.cfg"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "dayofinfamy_x64.exe";

Game.SteamID = "447820"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "Day of Infamy"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "Day of Infamy"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 6; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 32; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = false; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = false; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Day of Infamy"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.SetWindowHookStart = true; //Prevent games from resizing window on their own | Hooks upon game starting up (see Game.SetWindowHook for an alternative)
Game.DontResize = true; //Should Nucleus not resize the game windows?
Game.HookFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.HookInit = true; //Enable or disable hooks of functions some games may try and use to prevent multiple instances from running

//		[Input lines]

Game.SupportsKeyboard = false; //(Multiple Keyboards/Mice support is enabled) If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = true; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = false; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = true; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
//If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.
Game.Hook.XInputReroute = false;
//Setup wizark952's dinput blocker (block dinput for the game)
Game.UseDInputBlocker = true;

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
Game.HookFilterMouseMessages = false;
// This is the main switch for legacy input.
Game.HookUseLegacyInput = false;
//Nucleus Coop will hook mouse movement messages and the GetCursorPos function to work around legacy input. Some games only need the GetCursorPos hook and conflict when mouse movement messages are edited. If this is the case, enable this option:
Game.HookDontUpdateLegacyInMouseMsg = false;

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
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
// This enables the fake mouse cursor to be drawn over the game by Nucleus Coop.
// If the game uses a custom cursor, you will probably not need this option. (This will be obvious if you see the games custom cursor and a fake cursor drawn over it).
// Be aware this is a 'fake' mouse cursor in the sense that Nucleus Coop will fake mouse input to the game via the other options and then the fake mouse cursor is drawn where the game should be responding to mouse input.
// The fake cursor is drawn by creating a large transparent window over the game. This may prevent the game from receiving mouse input from the 'real' Windows cursor. It is sometimes useful to disable this while testing.
Game.DrawFakeMouseCursor = true;
// Once you have finished setting up the input options, enable this to automatically lock input (equivalent to pressing End) once all of the instances have been set up.
// This is usually convenient to leave disabled whilst testing.
Game.LockInputAtStart = false;
// If you need to change the key to toggle input lock, e.g. if the game uses the End key, edit it with this.
// You can find a list of keys and their numbers at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
Game.LockInputToggleKey = 0x23;

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 30; //Pause between game intances starts in milliseconds.
Game.PauseBetweenContextAndLaunch = 10;

//		[Launch Parameters]

Game.UseGoldberg = true; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.CreateSteamAppIdByExe = true; //Create a steam_appid.txt file where the game executable is. Some games need this for start with Goldberg.
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.ProcessorPriorityClass = "High"; //Sets the overall priority category for the associated process. Can be "AboveNormal", "High" or "RealTime" | default: "Normal"
Game.PromptBetweenInstances = true; //Nucleus will show a prompt between each instances for let you decide when start the next one.
Game.ResetWindows = true; //After each new instance opens, resize, reposition and remove borders of the previous instance
Game.GoldbergIgnoreFileCheck = true;
Game.GoldbergWriteSteamIDAndAccounts = false;

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "Enable controller in the normal game the very first time. Steam must be running. Set steam on offline mode if you are using the same account on different PCs (for LAN multiplayer). Only one XboxOne controller works when you are using more than 4 xinput controllers (ReRoute enabled) so, open the .js file for an possible fix. Change Nucleus shortcuts with Alt combination (Ctrl is used for crouch in game). Start a practice mode match in the first instance, use the mouse cursor to navigate the menus. When you are in-game start the next instance. Click on the last Nucleus prompt when all instances are set. If you are using keyboards/mice, when all instances are open and you already clicked 'ok' on the last Nucleus prompt, press END. If you want to unlock the mouse pointer, press again END.";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /*Day of Infamy use video.txt for resolution, so Nucleus will edit the file in the context of what the user-chosen in the Nucleus UI screens sizes selector. Then, it will set launch parameters to let the game load with the right settings.
  Nucleus, will create autoexec.cfg files for setup different settings in the context of the device input used in each instance and, in the end, push the connect command (with Local IP) from the second instance and next ones.
  Also, it will change the input restriction method in the context of how many controllers are playing.  */

  //The configuration of multi keyboards/mice must have FakeFocus turned on. Also HookMouseVisibility could cause crashes so it will enable only on the keyboard players.
  if (Player.IsKeyboardPlayer) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.FakeFocus = true;
    /*  Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
    This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.*/
    Game.HookMouseVisibility = true;
  } else {
    Game.FakeFocus = false;
    Game.HookMouseVisibility = false;
  }

  //In this part will we edit the script for enable the ReRoute Xinput mode. This requires Nucleus to be restarted.

  var OneFolderUP = System.IO.Path.Combine(Game.Folder, ".."); // The variable OneFolderUP will return a folder UP of the specified path. Example: var OneFolderUP = System.IO.Path.Combine(Game.Folder, "..");

  /*This line will create a variable from the corresponding Nucleus option.
  For example, this one will use the word "Reroute" inside "Game.AddOption("Enable experimental Xinput Reroute in this script?", 'This will restart Nucleus. Current status:"' + status + '"', "Reroute", answers3);" for
  define the variable "reroute" as the answer that the user chosen on this option. So, if the user chooses "TURN-ON", the var "reroute" will be defined as "TURN-ON". */
  var reroute = Context.Options["Reroute"];

  if (reroute == "TURN-ON") {
    var cfgFilePath = OneFolderUP + "\\Day of Infamy.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers3", Nucleus.SearchType.StartsWith);

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);

    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + "|var status = 'ENABLED';",
      switchi + '|var answers3 = ["-", "TURN-OFF"];',
      route + "|Game.Hook.XInputReroute = true; ",
      dinputb + "|Game.UseDInputBlocker = false; "
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, false, false);
  }

  if (reroute == "TURN-OFF") {
    var cfgFilePath = OneFolderUP + "\\Day of Infamy.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers3", Nucleus.SearchType.StartsWith);

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);

    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + "|var status = 'DISABLED';",
      switchi + '|var answers3 = ["-", "TURN-ON"];',
      route + "|Game.Hook.XInputReroute = false; ",
      dinputb + "|Game.UseDInputBlocker = true; "
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, false, false);
  }

  /*This line will create a variable from the corresponding Nucleus option.
For example, this one will use the word "Fps" inside "Game.AddOption("Which FPS Cap the game will use?", '', "Fps", answers);" for
define the variable "fps" as the answer that the user chosen on this option. So, if the user choose "60", the var "fps" will be defined as "60". */
  var fps = Context.Options["Fps"];

  //Nucleus will use launch argments for start the game in windowed, for fps cap and ect.
  /*These two lines, will add launch options.	
For example, source games use "-w" and "-h" as start arguments for set Width and Height of the game resolution. You can find commands and if a determinate game-engine/game can use launch parameters on Google.*/
  var Args = (Context.Args = " -windowed -noborder -AlwaysFocus -insecure -novid +sv_lan 1 +sv_pausable 1 +fps_max " + fps);
  Context.StartArguments = Args;

  //We will edit the file video.txt for let the game resize correctly.
  //These lines will edit the video.txt file inside doi\cfg folder of each instance. Open the video.txt file for see text structure.
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\doi\\cfg\\video.txt"); //editing the video.txt file
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.CFG, [
    new Nucleus.CfgSaveInfo("config", "setting.fullscreen", "0"),
    new Nucleus.CfgSaveInfo("config", "setting.defaultres", Math.max(640, Context.Width)),
    new Nucleus.CfgSaveInfo("config", "setting.defaultresheight", Math.max(360, Context.Height)),
    new Nucleus.CfgSaveInfo("config", "setting.nowindowborder", "0"),
    new Nucleus.CfgSaveInfo("VideoConfig", "setting.fullscreen", "0"),
    new Nucleus.CfgSaveInfo("VideoConfig", "setting.defaultres", Math.max(640, Context.Width)),
    new Nucleus.CfgSaveInfo("VideoConfig", "setting.defaultresheight", Math.max(360, Context.Height)),
    new Nucleus.CfgSaveInfo("VideoConfig ", "setting.nowindowborder", "0")
  ]);

  //Now we are gonna disable the controllers for the keyboard player.
  //This IF will be "used" if the current instance has a player that use the Keyboard
  if (Player.IsKeyboardPlayer) {
    //These lines will define a variable "autoExec" that will create a file inside Nucleus\content\DayOfInfamy\Instance#\doi\cfg with the lines specified inside "var lines".
    var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\doi\\cfg\\autoexec.cfg"; //adding a autoexec.cfg file with the next lines
    var lines = [
      "engine_no_focus_sleep 0",
      'm_rawinput "1"',
      "bind F8 pause",
      'joystick_force_disabled_set "1"',
      "exec undo360controller.cfg",
      "host_writeconfig",
      'echo "$$$$$$ autoexec.cfg loaded = controller disabled $$$$$$'
    ];

    Context.WriteTextFile(autoExec, lines);

    //Now we are gonna enable the controllers for gamepads players
    //while other inputs (controllers)
  } else {
    //We will use different input dll in context the number of controllers
    // If the total of controllers are less then 5
    if (Context.NumControllers < 5) {
      var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\doi\\cfg\\autoexec.cfg";
      var lines = [
        "engine_no_focus_sleep 0",
        'm_rawinput "0"',
        'joystick_force_disabled_set "0"',
        "exec controller.cfg",
        'zoom_sensitivity_ratio_joystick ".32"',
        'bind "L_TRIGGER" "+special2"',
        "bind F8 pause",
        'bind "BACK" "pause; changeinventory"',
        "host_writeconfig",
        'echo "$$$$$$ autoexec.cfg loaded = controller enabled $$$$$$$'
      ];
      Context.WriteTextFile(autoExec, lines);
    }

    // If the total of controllers are more than 5
    else {
      //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
      //CustomDll will overwrite the XinputPlus dlls if there are more than 5 controllers
      Game.Hook.CustomDllEnabled = true;
      Game.Hook.XInputNames = ["xinput1_3.dll"];

      var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\doi\\cfg\\autoexec.cfg";
      var lines = [
        "engine_no_focus_sleep 0",
        'm_rawinput "0"',
        'joystick_force_disabled_set "0"',
        "exec controller.cfg",
        'zoom_sensitivity_ratio_joystick ".32"',
        'bind "L_TRIGGER" "+toggle_zoom"', //Xinput controller in DInput mode will use both triggers as a single axis. This will let you aim and shoot.
        "bind F8 pause",
        'bind "BACK" "pause; changeinventory"',
        "host_writeconfig",
        'echo "$$$$$$ autoexec.cfg loaded = controller enabled $$$$$$$'
      ];
      Context.WriteTextFile(autoExec, lines);
    }
  }

  /*This section will make the first player start normally while the other ones will connect to the local IP at the startup.
	  However, in the case an IP is entered in the starting prompt, all the players will connect to that IP.*/

  //This IF will be "used" if the initial prompt is blank
  if (Context.CustomUserGeneralValues[0] == null) {
    //This IF will be "used" if the instance is the first player
    if (Context.PlayerID == 0) {
    }

    //Here what happens if the instance is a different player from the first one
    else {
      //Context.LocalIP will return the User local IP for let the Source-Engine command "connect"
      lines.push("connect " + Context.LocalIP); //adding line on the autoexec file (var autoExec)
    }

    Context.WriteTextFile(autoExec, lines);
  }

  //This IF will be "used" if the initial prompt contains something
  else if (Context.CustomUserGeneralValues[0] != null) {
    lines.push("connect " + Context.CustomUserGeneralValues[0]);
  }

  Context.WriteTextFile(autoExec, lines);

  /* In this section I will edit the user_steam_id.txt for make sure that each players of each PC, will have a different user steam id.
   This will let you use Goldberg with other PCs in the same LAN. 
*/

  var id = Context.Options["Id"];

  if (id != "-") {
    Game.GoldbergIgnoreFileCheck = true;
    Game.GoldbergWriteSteamIDAndAccounts = false;

    //This IF will be used only if the folder "settings" doesn't exist
    if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings")) {
      //The folder "settings" is where Goldberg will store the saves and user settings.
      //These two lines will create a folder named "settings" inside each Nucleus content instance player folders. It will be Nucleus\content\DayOfInfamy\Instance#\bin\x64\settings.
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings");
      System.IO.Directory.CreateDirectory(filePath);
    }
    //Editing manually the account_name.txt of each instance by adding the Nucleus player nickname.
    var Account = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\account_name.txt";
    var Nick = [Player.Nickname];
    Context.WriteTextFile(Account, Nick);

    var id = Context.Options["Id"];
    //This is my method for calculate the Final ID. ((Game.MaxPlayers + 1) * id) + Context.PlayerID. This will let at least 32 (Game.MaxPlayers) unique Steam IDs on each PC (better safe than sorry! :P)
    var idF = 33 * id + Context.PlayerID;

    //These IFs will make sure that the steam ids will use always 17 digits ( like the ones created by Goldberg)
    if (id < 3) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 3 && Context.PlayerID == 0) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["765611987335000" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 3 && Context.PlayerID > 0) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 3 && id < 30) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 30 && Context.PlayerID < 11) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["76561198733500" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id == 30 && Context.PlayerID > 10) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
    if (id > 30) {
      var UserID = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin\\x64\\settings\\user_steam_id.txt";
      var IdNumber = ["7656119873350" + idF];
      Context.WriteTextFile(UserID, IdNumber);
    }
  }
};

//by Bizzo :^)