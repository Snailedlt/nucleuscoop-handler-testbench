Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Tue Mar 19 2024 07:10:00 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "nBgGXtk5pTq9Taq2F";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

/*With more than four controllers, you can use only ONE XboxOne controller, and you can't use at the same time the keyboard. 
You must click/alt+tab on the corresponding instance to make it work. 
In alternative, you can try to fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.*/

/* If you are creating a script, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released scripts (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-script one that uses Unreal Engine 4).*/

/*(Thanks to the ExtraOptions mod, we can run multiple instances of the game. Without that, change the name of the exe of each instance make it work.
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

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["Yes", "No"]; //adding variables that user can use on the options
var answers1 = ["XInput", "DInput"];
var answers2 = ["No", "Yes"];
var answers3 = ["640x480", "800x600", "1024x768", "1280x960", "1280x1024"];
Game.AddOption("Which type of controllers will be used?", "In DInput mode, you will probably need to map the gamepads buttons.", "Pad", answers1); //adding options after the input/screen selector
Game.AddOption("Enable music only in the first instance?", "You can still change it in the in-game options.", "Mus", answers);
Game.AddOption("Skip intro?", "If you choose No, it could help with crashes.", "Intro", answers);
Game.AddOption("Use compatible mode?", "If your GPU doesn't allow custom resolutions, enable this option.", "GPU", answers2);
Game.AddOption("Resolution of compatible mode?", "This will affect only if compatible mode is enabled.", "Res", answers3);

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them.
Game.FileSymlinkCopyInstead = ["server.dll"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = [
  "server.cfg",
  "winmm.dll",
  "dinput8.dll",
  "XInput1_3.dll",
  "XInput1_4.dll",
  "XInputPlus.ini",
  "Dinput.dll",
  "buttons-playstation.tpk",
  "buttons-xbox.tpk",
  "NFSMostWanted.WidescreenFix.asi",
  "NFSMostWanted.WidescreenFix.ini",
  "modupdater.asi",
  "modupdater.ini",
  "modupdater.log",
  "Settings.ini",
  "NFSMWExtraOptions.asi",
  "NFSMWExtraOptionsSettings.ini",
  "NFSMWHUDAdapter.asi"
];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "speed.exe";
Game.GUID = "NeedForSpeedMostWanted2005"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "Need For Speed Most Wanted 2005"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 4; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)
Game.ExecutableContext = ["NFSMW_icon.ico"]; //Other NFS titles have "speed.exe" ha executable name. This will specify that this script is the "NFS Most Wanted" one.

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = true; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]
Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = true; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Need for Speed™️ Most Wanted"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.FakeFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = true; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = false; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list, and you will find which Xinput DLLs the game is using. A game that supports controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/*In this script, we will enable two input restrictions to let Nucleus-Coop set them for us.
This because the script le the user choose which type of gamepads is using and DevReorder doesn't work in context.
So, we manually copy the right dlls to make them work from the NucleusCoop utils folder.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = ["xinput1_3.dll", "dinput.dll", "dinput8.dll"]; //This line specify which DLLS CustomDll will use.

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. For XInputPlusDll, remove or comment the line by using // for disable it.] 
This set up XInputPlus and specify which Xinput DLL it will use (If multiple dlls required, use comma seperated strings).
XinputPlus support max 4 controllers.*/
Game.XInputPlusDll = ["xinput1_4.dll", "dinput.dll", "dinput8.dll"];
//It seems that new xinputplus dinput dlls make games crash. When using Game.XInputPlusDll, you can specify to use the previous version instead of the latest (needed for some games)
Game.XInputPlusOldDll = false;

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one.]
//Set up Devreorder. This is used for restrict only DInput controllers. You can use Xinput ones only if you enable XInputReroute. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.*/
Game.UseDevReorder = true;

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
Game.HookGetKeyboardState = true;
// This filters raw input messages inside the application. This makes sure each instance only receives input for its designated input device.
Game.HookFilterRawInput = true;
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
Game.LockInputAtStart = false;
// If you need to change the key to toggle input lock, e.g. if the game uses the End key, edit it with this.
// You can find a list of keys and their numbers at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
Game.LockInputToggleKey = 0x23;

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 30; //Pause between game intances starts in milliseconds.

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.PromptBetweenInstances = true; //Nucleus will show a prompt between each instances for let you decide when start the next one.

// This is the text that will be shown inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "Use the horizontal split (vertical crop menu and hud). In DInput mode, XboxOne controllers needs a fix. Open the script for info. When you load the game from Nucleus use always the profile NUCLEUS. Before launching the next instance go to LAN, create a server, in server name write the playername and at the end create a room. Launch the next instance, go to LAN, create a server, in server name write the playername, then search for the room you create before and join in (probably, you will need more than one attempt). When all the players are ready, click ok on the last Nucleus prompt (hook/send fake message). Now you can press 'END' for restrict the input of keyboard/mice players (press it again for release it).";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /*This script includes some mods to make the game working that Nucleus will copy inside a newly created scripts folder (mods must put in there for this game).
	Also, Nucleus-Coop will copy saves files with buttons already mapped (for Xbox controllers) and all cars unlocked. 
    After that, it will edit the server.cfg of each instance to make the connection work on the same computer.
	Then, it will edit the config files and copy the right dlls for input restriction, in the context of what the user chooses in the Nucleus options */

  //The folder "scripts" is needed for make the mods work in this game.
  //if this folder is already in the instances folders, Nucleus will not use this if
  if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts")) {
    //These two lines will create a folder named "scripts" inside each Nucleus content instance player folders. It will be Nucleus\content\NeedForSpeedMostWanted2005\Instance#\.
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts");
    System.IO.Directory.CreateDirectory(filePath);
  }
  //Copying the specific mod files to the NFSMW Nucleus instances content folders from the NFSMW scripts Nucleus folder
  //These lines will copy the file "buttons-playstation.tpk" inside Nucleus\content\NeedForSpeedMostWanted2005\Instance#\scripts from Nucleus\scripts\Need for Speed Most Wanted 2005\scripts (the folder inside scripts must be named like the game .js file.)
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\buttons-playstation.tpk");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\buttons-playstation.tpk");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\buttons-xbox.tpk");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\buttons-xbox.tpk");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\NFSMostWanted.WidescreenFix.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\NFSMostWanted.WidescreenFix.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.cfg");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "server.cfg");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptions.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\NFSMWExtraOptions.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWHUDAdapter.asi");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\NFSMWHUDAdapter.asi");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //if this file is already in the instances folders, Nucleus will not use this if
  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "scripts\\NFSMWExtraOptionsSettings.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  //Copy the save files only the very first time.
  //if this directory is already in the instances folders, Nucleus will not copy the files inside the if{}.
  if (!System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\1")) {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\1\\NFS Most Wanted\\NUCLEUS ");
    System.IO.Directory.CreateDirectory(filePath);
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\1\\NFS Most Wanted\\NUCLEUS\\NUCLEUS");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "1\\NUCLEUS");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\1\\NFS Most Wanted\\NUCLEUS\\SPARKLE-2012270-09-26-17-32-36.SAV");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "1\\SPARKLE-2012270-09-26-17-32-36.SAV");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\1\\NFS Most Wanted\\Settings.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Settings.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  /*Editing the server.cfg files for let connection working.
  Each instance must use a differet PORT. Also, we notice that set LAN_THROTTLE to 6 helped with lobby connection.*/

  //These lines will edit the server cfg file. Open it for see the text structure.
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.cfg";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SERVER", "PORT", 9900 + Context.PlayerID),
    new Nucleus.IniSaveInfo("SERVER", "LAN_THROTTLE", "6"), //For connection ralated problems, this is the only number you should edit.
    new Nucleus.IniSaveInfo("SERVER", "ADDR", '%%bind("' + Context.LocalIP + ":" + (9900 + Context.PlayerID) + '")'),
    new Nucleus.IniSaveInfo("SERVER", "TRUST_MATCH", '%%bind("' + Context.LocalIP + '")')
  ]);

  //Setting the game in window mode

  //These lines will edit the specified .ini file.
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "WindowedMode", "2")]);

  /*This line will create a variable from the corresponding Nucleus options.
  For example, this one will use the word "GPU" inside "Game.AddOption("Use compatible mode?", "If your GPU doesn't allow custom resolutions, enable this option.", "GPU", answers2);" for
  define the variable "gpu" as the answer that the user chosen on this option. So, if the user chooses "No", the var "gpu" will be defined as "No". */
  var gpu = Context.Options["GPU"]; //this is what happens on the "Use old GPU compatible mode?" option. Basically it jus edit a ini file depending by the choice

  var res = Context.Options["Res"];
  var mus = Context.Options["Mus"];

  /* Now we can use the variables created with results from the context options for decide what happens if the user choose a specific option.
     For example, this IF will be "used" if the user will chose "No" on the "Use compatible mode?" option.*/
  if (gpu == "No") {
    //These lines will edit the NFSMostWanted.WidescreenFix.ini file. Open it for see the text structure.
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX", Context.Width), new Nucleus.IniSaveInfo("MAIN", "ResY", Context.Height)]); //this will automatically edit the ini file using the context screen division_
  }
  //_resolution XY selected by the user
  if (gpu == "Yes") {
    if (res == "640x480") {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX", " 640"), new Nucleus.IniSaveInfo("MAIN", "ResY", " 480")]);
    }

    if (res == "800x600") {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX", " 800"), new Nucleus.IniSaveInfo("MAIN", "ResY", " 600")]);
    }
    if (res == "1024x768") {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX", " 1024"), new Nucleus.IniSaveInfo("MAIN", "ResY", " 768")]);
    }

    if (res == "1280x960") {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX", " 1280"), new Nucleus.IniSaveInfo("MAIN", "ResY", " 960")]);
    }

    if (res == "1280x1024") {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMostWanted.WidescreenFix.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("MAIN", "ResX", " 1280"), new Nucleus.IniSaveInfo("MAIN", "ResY", " 1024")]);
    }
  }

  //this is what happens on the "Skip intro?" option. Basically it jus edit a ini file depending by the choice.
  var intro = Context.Options["Intro"];

  if (intro == "Yes") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "SkipMovies", " 1")]);
  }
  if (intro == "No") {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "SkipMovies", " 0")]);
  }

  //Enabling music in the context of what the player chooses in the Nucleus-Coop option.

  if (mus == "Yes") {
    //This IF will be "used" if the instance is the first player
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "EnableMusic", "1")]);
    }
    //Here what happens if the instance is a different player from the first one
    else {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "EnableMusic", "0")]);
    }
  } else {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\scripts\\NFSMWExtraOptionsSettings.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Misc", "EnableMusic", "1")]);
  }

  //In this part, the script will manually copy the right dlls from the Nucleus-Coop utils folder for restrict the controllers in context of what the user choose in the corresponding Nucleus option.

  //These lines will remove these dlls that are automatically generated by Nucleus-Coop. In this way, XInputPlus and DevReorder will not conflict.
  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput8.dll")) {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput8.dll");
  }
  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput.dll")) {
    System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput.dll");
  }

  var pad = Context.Options["Pad"];

  //IF the User choose XInput the script will copy the XinputPlus dlls and delete the devreorder.ini
  if (pad == "XInput") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\devreorder.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\devreorder.ini");
    }

    System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\x86\\Dinput8.dl_", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput8.dll", true);
    System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\x86\\Dinput.dl_", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput.dll", true);

    //if you have deadzone problems, enable this lines (for xinput controllers). Nucleus will edit the XinputPlus.ini file for each instance.
    // remove the /* * / for enable it
    /*
	  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";  
	  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [                         
	  new Nucleus.IniSaveInfo("LeftStick", "DeadZone", "3277"),
	  new Nucleus.IniSaveInfo("RightStick", "DeadZone", "3277"),
	  ]);
	   */

    //IF the User choose DInput the script will copy the DevReorder dlls and delete the XinputPlus files
  } else if (pad == "DInput") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinput1_4.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinput1_4.dll");
    }

    System.IO.File.Copy(Context.NucleusFolder + "\\utils\\devreorder\\x86\\dinput8.dll", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll", true);
  }
};

//by Bizzo :^)