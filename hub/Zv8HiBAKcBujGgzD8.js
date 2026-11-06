Hub.Handler.Version = 9; // Released at https://hub.splitscreen.me/ on Fri Mar 18 2022 17:17:43 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "Zv8HiBAKcBujGgzD8";
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
//var answers = contains the possible answers that the User can choose.
//Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["-", "TURN-ON"];
Game.AddOption("Enable experimental Xinput Reroute in this script?", 'This will restart Nucleus. Current status: "' + status + '"', "Reroute", answers);

/* (Brothers in Arms: Hell's Highway need a mutext to be killed and SteamEmulation for start the game multiple times without Steam.) 
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
Game.KillMutex = ["SumacGameMutex"]; //you can even specify the type: Game.KillMutex = ["Type:Mutant|mutex_to_kill", "Type:Semaphore|mutex_to_kill", "Type:Event|mutex_to_kill",];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["Gearbox_logo.bik", "Ubisoft_logo.bik", "Splash.bmp"];

//Copy (not symlink) all files within a given folder | Folder name is relative from root game folder
Game.DirSymlinkCopyInstead = ["SumacGame\\Config"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "biahh.exe";
//In which folder the game exe is located? Relative path to where Nucleus should start the game's working folder to.
Game.BinariesFolder = "Binaries";
//Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.SteamID = "15390";
//The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GUID = "BrothersInArmsHH";
//Title of the game that will be show on Nucleus.
Game.GameName = "Brothers in Arms: Hell's Highway";
//The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.LauncherTitle = "";
//This is just an info. It will not limit the players number.
Game.MaxPlayersOneMonitor = 4;
//This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)
Game.MaxPlayers = 20;

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

//False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkExe = false;
//False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.SymlinkGame = true;
//False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.KeepSymLinkOnExit = false;
//False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardcopyGame = false;
//Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked
Game.HardlinkGame = false;

//		[Hooks]

//If enabled, Windows taskbard will be hidden.
Game.HideTaskbar = true;
//Hide the mouse cursor in game instances
Game.HideCursor = true;
//Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.SupportsPositioning = false;
//Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.HookFocus = true;
//Enable or disable the sending of focus messages to each game window at a regular interval | default: false
Game.FakeFocus = false;
//If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocus = false;
//If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.Hook.ForceFocusWindowName = "Brothers in Arms: Hell's Highway";

//		[Input lines]

//If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.SupportsKeyboard = false;
//Keyboard player will be the first to be initialized
Game.KeyboardPlayerFirst = true;
//If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputEnabled = false;
//If we should completely remove support for DirectInput input from the game
Game.Hook.DInputForceDisable = true;
//If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputEnabled = true;
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
//Game.Hook.XInputNames = [ "xinput1_3.dll" ]; //This line specify which DLLS CustomDll will use. CustomDlls support only Xinput ones.

//[thanks to Ilyaki for the multiple keyboards and mice support and guide]

//If enable, it will allow multiple Keyboards and Mice to be used as a device input in Nucleus. Before enable it by default, be sure that all works without problems.
Game.SupportsMultipleKeyboardsAndMice = true;

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
Game.HookGetKeyboardState = true;
// This filters raw input messages inside the application. This makes sure each instance only receives input for its designated input device.
Game.HookFilterRawInput = true;
// This hook filters many mouse messages to position the mouse cursor and other necessary changes from within the game itself.
// This should almost always be enabled, unless it causes some conflict.
Game.HookFilterMouseMessages = true;
// This is the main switch for legacy input.
Game.HookUseLegacyInput = false;
//Nucleus Coop will hook mouse movement messages and the GetCursorPos function to work around legacy input. Some games only need the GetCursorPos hook and conflict when mouse movement messages are edited. If this is the case, enable this option:
Game.HookDontUpdateLegacyInMouseMsg = false;
// Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
// This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.
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

//		[Handlers]

//The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.HandlerInterval = 100;
//Pause between game intances starts in milliseconds.
Game.PauseBetweenStarts = 30;

//		[Launch Parameters]

//Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.UseGoldberg = false;
//Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.GoldbergNeedSteamInterface = false;
//If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.NeedsSteamEmulation = true;
//Nucleus will show a prompt between each instances for let you decide when start the next one. ;
Game.PromptBetweenInstances = true;
//Should Nucleus not resize the game windows?
Game.DontResize = true;
//Should Nucleus not reposition the game windows?
Game.DontReposition = true;

// This is the text that will be shown inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "I suggest to use vertical splitscreen. For keyboards players, on the equipment menu, the mouse pointer lags. Use the keyboard for select your weapon. At startup, the game will ask you if you want to update the outdated files. Choose \"No to all\". Create a LAN server in the first instace and join trough the server browser with the other ones. After all is set, click ok on the last Nucleus prompt (hook/send fake message) and if there are keyboards players, press 'END'. Only one XboxOne controller works when you are using more than 4 xinput controllers (ReRoute enabled) so, open the .js file for an possible fix.";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /*In this script Nucleus will use launch options to start the game in window mode and resize it in the context of what the user-chosen in the Nucleus-Coop UI screens sizes selector. 
  Also, it will use NirCmd to resize correctly and remove borders through a bat file.
 */

  //We will use different input dll in context the number of players
  // If the total players are less then 5
  if (Context.NumberOfPlayers < 5) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.Hook.XInputReroute = false;
  }

  // If the total players are more than 5
  else {
    //CustomDll will overwrite the XinputPlus dlls if there are more than 5 controllers
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.XInputNames = ["xinput1_3.dll"];
  }

  //In this part will we edit the script for enable the ReRoute Xinput mode. This requires Nucleus to be restarted.

  var OneFolderUP = System.IO.Path.Combine(Game.Folder, ".."); // The variable OneFolderUP will return a folder UP of the specified path. Example: var OneFolderUP = System.IO.Path.Combine(Game.Folder, "..");

  /*This line will create a variable from the corresponding Nucleus option.
  For example, this one will use the word "Reroute" inside "Game.AddOption("Enable experimental Xinput Reroute in this script?", 'This will restart Nucleus. Current status:"' + status + '"', "Reroute", answers3);" for
  define the variable "reroute" as the answer that the user chosen on this option. So, if the user chooses "TURN-ON", the var "reroute" will be defined as "TURN-ON". */
  var reroute = Context.Options["Reroute"];

  if (reroute == "TURN-ON") {
    Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup

    var cfgFilePath = OneFolderUP + "\\Brothers in Arms Hell's Highway.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers", Nucleus.SearchType.StartsWith);

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);

    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + "|var status = 'ENABLED';",
      switchi + '|var answers = ["-", "TURN-OFF"];',
      route + "|Game.Hook.XInputReroute = true; ",
      dinputb + "|Game.UseDInputBlocker = false; "
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, true, false);
  }

  if (reroute == "TURN-OFF") {
    Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup

    var cfgFilePath = OneFolderUP + "\\Brothers in Arms Hell's Highway.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers", Nucleus.SearchType.StartsWith);

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);

    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + "|var status = 'DISABLED';",
      switchi + '|var answers = ["-", "TURN-ON"];',
      route + "|Game.Hook.XInputReroute = false; ",
      dinputb + "|Game.UseDInputBlocker = true; "
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, true, false);
  }

  //Copying a file from the Nucleus\scripts\Gamefolder to a specific path.
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nircmd.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "nircmd.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\position.bat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "position.bat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  /*These two lines, will add launch parameters.	
For example, source games use "-w" and "-h" as start arguments for set Width and Height of the game resolution. You can find commands and if a determinate game-engine/game can use launch parameters on Google.
We can use Context.Width and Context.Height for let Nucleus write the Width and Height chosen by the User inside the Nucleus UI. You can find other context values inside the Mod-ReadMe.txt.*/
  var Args = (Context.Args = " -nosplash -nostartupmovies -windowed -resx=" + Context.Width + " -resy=" + Context.Height);
  Context.StartArguments = Args;

  //Editing the position.bat in context of the player instance resolution and position.
  /*These lines will define a variable "txtPath" that will edit a file with the lines specified inside "var dict".
      We can also specify the specific number of the line we need to edit.*/
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\position.bat";
  var dict = ["18|nircmd.exe win setsize process /%pid% " + Player.MonitorBounds.X + " " + Player.MonitorBounds.Y + " " + Context.Width + " " + Context.Height];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Starting the position.bat for all players.
  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\position.bat"], false, 0, true, false);
};

//by Bizzo :^)