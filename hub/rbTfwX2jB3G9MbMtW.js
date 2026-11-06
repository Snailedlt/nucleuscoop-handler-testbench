Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Jan 07 2021 12:14:48 GMT+0000 (UTC).
Hub.Handler.Id = "rbTfwX2jB3G9MbMtW";
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

/*(In this case, change the game exe of each instance, make the game open multiple times).
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
var answers = ["Xinput", "DirectInput"];
Game.AddOption("What type of controller are you using?", "DirectInput users: check the Script Author's Notes.", "PAD", answers);

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them.
Game.FileSymlinkCopyInstead = ["Project64.cfg", "NRage.ini"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["glide3x.dll", "Project64.cht"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "Project64.exe";
Game.GUID = "SuperMario64"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "Super Mario 64"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 16; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = true; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = false; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = true; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Project64MM 2.2.0.1"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HasDynamicWindowTitle = true; //This will use only the text specified in ForceFocusWindowName. Work-around for ForceFocusWindowName having to match 1:1 with game window title for resizing, positioning and focus | default: false
Game.HookFocus = true; //Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.FakeFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = true; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = false; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
//In this case, you can enable ReRoute for use Xinput and DInput controllers at the same time.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list and you will find which Xinput DLLs the game is using. Game that support controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/*In this script, we will enable two input restrictions to let Nucleus-Coop set them for us.
This because the script le the user choose which type of gamepads is using and DevReorder doesn't work in context.
So, we manually copy the right dlls to make them work from the NucleusCoop utils folder.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. For XInputPlusDll, remove or comment the line by using // for disable it.] 
This set up XInputPlus and specify which Xinput DLL it will use (If multiple dlls required, use comma seperated strings).
XinputPlus support max 4 controllers.*/
Game.XInputPlusDll = ["xinput1_4.dll"];

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_4.dll" ]; //This line specify which DLLS CustomDll will use.

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one.]
//Set up Devreorder. This is used for restrict only DInput controllers. You can use Xinput ones only if you enable XInputReroute. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.*/

Game.UseDevReorder = true; //set on true if you use DirectInput controllers

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
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookGetKeyState = false;
// This filters raw input messages inside the application. This makes sure each instance only receives input for its designated input device.
Game.HookFilterRawInput = true;
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
Game.HookReRegisterRawInputKeyboard = false;
Game.HookReRegisterRawInputMouse = true;
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
Game.PauseBetweenStarts = 40; //Pause between game intances starts in milliseconds.
Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.PromptBetweenInstances = true; //Nucleus will show a prompt between each instances for let you decide when start the next one.
Game.ChangeExe = true; //Will rename the game's executable to "<exe name> - Player X", x being the instance/player #
Game.KillProcessesOnClose = ["Net64+"]; //List of additional processes that need to be killed (other than executable and launcher)
Game.ResetWindows = true; //After each new instance opens, resize, reposition and remove borders of the previous instance

//You can use https://www.nirsoft.net/utils/winexp.html for testing different borders styles.
Game.WindowStyleValues = ["0x40000000"]; //Override Nucleus' default of removing borders and specify a custom window style | Start string with ~ to remove a style, or don't use it to add one | See https://docs.microsoft.com/en-us/windows/win32/winmsg/window-styles for values that can be used
Game.ExtWindowStyleValues = ["0x00002000"]; //Override Nucleus' default of removing borders and specify a custom extended window style | Start string with ~ to remove a style, or don't use it to add one | See https://docs.microsoft.com/en-us/windows/win32/winmsg/window-styles for values that can be used

// This is the text that will be shown inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "Move the client Net64 folder inside the emulator Net64 folder (in the root). The very first time, before run the game through Nucleus, set the emulator like in the Net64+ UI FAQ tab and select N-Rage For PJ64: 2.4.0.4 as Input (controller) plugin. You can choose to enable NoMusic and Widescreen by editing the ROM cheats (already included) of a specific emulator instance (do it when is launched through Nucleus + it will be saved for the next time). DirectInput players, when the game is launched through Nucleus, must map the controllers in PJ64 only for the first player of each instance (Don't change the controller plugin). Keyboards players, in any case (Xinput or DirectInput), when the game is launched through Nucleus must map the buttons in PJ64 only for the first player of each instance (you must select even the mouse but is not working in game) also you need to press END when all instances are ready. For Xinput players, all is already mapped. If you use RomHacks, cheats could make the game crash.";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /* To correctly resize the game instance, we must use dgVooDoo2 http://dege.freeweb.hu/dgVoodoo2/dgVoodoo2.html . 
   So Nucleus-Coop will copy the right files and then edit them in the context of the windows sizes chosen by the user in the Nucleus UI.
   Then it will edit config files to better suit the input that will be used.
   Also, it will start Net64+ before starting the game.*/

  //Copying dgVooDoo2 necessary files inside the game instances
  //These lines will copy the file "dgVoodoo.conf" inside Nucleus\content\SuperMario64\Instance#\ from Nucleus\scripts\Super Mario 64 (the folder inside scripts must be named like the game .js file.)
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dgVoodoo.conf");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Glide.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Glide.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Glide2x.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Glide2x.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Glide3x.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Glide3x.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Copying cheats file with Widescreen and NoMusic options
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config\\Project64.cht");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Project64.cht");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Editing the dgVoodoo.conf in context of screens sizes chosen by the user in Nucleus UI
  /*These lines will define a variable "txtPath" that will edit a file with the lines specified inside "var dict".
  We can also specify the specific number of the line we need to edit.*/
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf"; //Editing a specific file by manually selecting the line and manually edit the text
  var dict = [
    "121|Resolution                          = h:" + Context.Width + ", v:" + Context.Height + "," //Context.Widht and Height will write the numbers of the resolution choosed by the user in the Nucleus UI screen selector
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Editing the Project64.cfg for make it start the rom in fullscreen
  //These lines will edit a ini file. Open it for see the text structure.
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config\\Project64.cfg"; //this edit the Project64 config file for run it in fullscreen
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("default", "Basic Mode", "0"),
    new Nucleus.IniSaveInfo("default", "Check Running", "0"),
    new Nucleus.IniSaveInfo("default", "Auto Full Screen", "1"),
    new Nucleus.IniSaveInfo("default", "Remember Cheats", "1")
  ]);

  //Editing Glide64.ini for be sure that emulator will have the correct settings.
  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plugin\\GFX\\Glide64.ini"; //this edit the Project64 config file for run it in fullscreen
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("SETTINGS", "resolution", "15"),
    new Nucleus.IniSaveInfo("SETTINGS", "advanced_options", "1"),
    new Nucleus.IniSaveInfo("DEFAULT", "aspect ", " 0")
  ]);

  //Editing config files for better suit different input devices

  /*This line will create a variable from the corresponding Nucleus options.
  For example, this one will use the word "PAD" inside "Game.AddOption("What type of controller are you using?", "DirectInput users: check the Script Author's Notes.", "PAD", answers); " for
  define the variable "pad" as the answer that the user chosen on this option. So, if the user chooses "Xinput", the var "pad" will be defined as "Xinput". */
  var pad = Context.Options["PAD"];

  /*Now we can use the variables created with results from the context options for decide what happens if the user choose a specific option.
  For example, this IF will be "used" if the user will chose "Xinput" on the "What type of controller are you using?" option.*/
  if (pad == "Xinput") {
    //These lines will remove files that are automatically generated by Nucleus-Coop. In this way, XInputPlus and DevReorder will not conflict.
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput.dll");
    }
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\devreorder.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\devreorder.ini");
    }

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config\\NRage.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("lastBrowserDir", "Profile", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config"),
      new Nucleus.IniSaveInfo("Controls", "DInputGUID", Context.GamepadGuid),
      new Nucleus.IniSaveInfo("Controller 1", "Plugged", "1"),
      new Nucleus.IniSaveInfo("Controller 1", "xInput", "1"),
      new Nucleus.IniSaveInfo("Controller 2", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 3", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 4", "Plugged", "0")
    ]);
  }

  if (pad == "DirectInput") {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinput1_3.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinput1_3.dll");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinput1_4.dll")) {
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinput1_4.dll");
    }

    //Editing NRage.ini for make sure only the first gamepad is enabled.

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config\\NRage.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("lastBrowserDir", "Profile", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config"),
      new Nucleus.IniSaveInfo("Controls", "DInputGUID", Context.GamepadGuid),
      new Nucleus.IniSaveInfo("Controller 1", "Plugged", "1"),
      new Nucleus.IniSaveInfo("Controller 1", "xInput", "0"),
      new Nucleus.IniSaveInfo("Controller 2", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 2", "xInput", "0"),
      new Nucleus.IniSaveInfo("Controller 3", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 3", "xInput", "0"),
      new Nucleus.IniSaveInfo("Controller 4", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 4", "xInput", "0")
    ]);
  }

  //This IF will be "used" if the current instance has a player that use the Keyboard
  if (Player.IsKeyboardPlayer) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config\\NRage.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("lastBrowserDir", "Profile", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Config"),
      new Nucleus.IniSaveInfo("Controls", "DInputGUID", Context.GamepadGuid),
      new Nucleus.IniSaveInfo("Controller 1", "Plugged", "1"),
      new Nucleus.IniSaveInfo("Controller 1", "xInput", "0"),
      new Nucleus.IniSaveInfo("Controller 2", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 2", "xInput", "0"),
      new Nucleus.IniSaveInfo("Controller 3", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 3", "xInput", "0"),
      new Nucleus.IniSaveInfo("Controller 4", "Plugged", "0"),
      new Nucleus.IniSaveInfo("Controller 4", "xInput", "0")
    ]);

    //Disable XinputPlus for keyboards players

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini")) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Misc", "UseXInput1_3", "False"),
        new Nucleus.IniSaveInfo("Misc", "UseXInput1_1", "False"),
        new Nucleus.IniSaveInfo("Misc", "UseXInput1_2", "False"),
        new Nucleus.IniSaveInfo("Misc", "UseXInput1_4", "False"),
        new Nucleus.IniSaveInfo("Misc", "UseXInput9_1_0", "False"),
        new Nucleus.IniSaveInfo("X2DInput", "DisableXInput", "True"),
        new Nucleus.IniSaveInfo("X2DInput", "EnableX2Dinput", "True")
      ]);
    }
  }

  //Now, we need Nucleus to launch Net64+ before the emulator.
  //launching Net64+ from a folder named "client" in the root folder of the emulator
  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\client\\Net64+-win32-x64\\Net64+.exe"], false, 0, true, false);
};

//by Bizzo :^)