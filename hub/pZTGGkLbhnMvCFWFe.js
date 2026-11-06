Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Sun Jul 03 2022 16:47:11 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "pZTGGkLbhnMvCFWFe";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

/* If you are creating a handler, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released handlers (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-handler one that uses Unreal Engine 4).*/

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["XinputPlus", "InjectionHook"];
var answers1 = ["No", "Yes"];
Game.AddOption("Which gamepads restriction method the handler will use?", "XInputPlus suggested. If doesn't work use InjectionHook.", "PAD", answers);
Game.AddOption("Will you use only gamepads?", "This will let you use one keyboard on all instances.", "KEY", answers1);

/* (Thanks to GTA Connected, the game starts multiple times without problems) 
Most of the games, need a specific (or more) mutex/event/semaphore to be killed. (Not all of them. There are games that you can start multiple times without problems, so try it before do work for nothing :p)
Usually, the right one/ones have the game-name or engine-name in the name. For example, most source games use "hl2"_singleton_mutex.
To check which ones the game use, we will use Process Explorer: https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer .
Open Process Explorer (with admin rights) start the game, click the game process on the list, and press View Handles (Ctrl+H). You will see the full list of mutex/event/semaphore...
If you think to have found the right one, right-click on it and choose "Close Handle". After that, try to run a second instance of the game and see if it open.
Be careful that launchers check if the game is already running. For example, Goldberg, make the game unseen from Steam. So, if it is a Steam game, try to create a handler with 
With Goldberg enabled, test if the game starts multiple times (+ the mutex/event/semaphore...etc needed to be killed).
If you find that no mutex closed helps you (or is not enough), there are other ways:
- Change the game exe name for each instance (in Nucleus-Coop = Game.ChangeExe = true;)
- Change the title of the game window. You can use https://www.nirsoft.net/utils/winexp.html for testing. (in Nucleus-Coop = Game.IdInWindowTitle = true;) 
- Start the game as a different windows user. (For testing, you need a second windows user and press shift + right-click on the exe and choose "Rus as another user". In Nucleus-Coop you can use
  Game.LaunchAsDifferentUsers = true; and if needed Game.ThirdPartyLaunch = true;)*/

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe handler selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "GTAIV.exe";

Game.SteamID = "222880"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "GTAIV"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "GTA IV"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 6; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 32; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = false; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = false; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.HideCursor = true; //Hide the mouse cursor in game instances
Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = true; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Grand Theft Auto"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HasDynamicWindowTitle = true; //Work-around for ForceFocusWindowName having to match 1:1 with game window title for resizing, positioning and focus | default: false
Game.HookFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.NotTopMost = true; //Should Nucleus not make the game windows top most (appear above everything else)
//Game.FakeFocusInterval = 5;

//		[Input lines]

Game.SupportsKeyboard = false; //(Multiple Keyboards/Mice support is enabled) If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
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

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = ["xinput1_3.dll"]; //This line specify which DLLS CustomDll will use.

//		[Multiple Keyboards/Mice lines]

//[thanks to Ilyaki for the multiple keyboards and mice support and guide]
Game.SupportsMultipleKeyboardsAndMice = true; //If enable, it will allow multiple Keyboards and Mice to be used as a device input in Nucleus. Before enable it by default, be sure that all works without problems.

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 0; //Pause between game intances starts in milliseconds.

//		[Launch Parameters]

Game.ThirdPartyLaunch = true; //Use if the game is launched outside of Nucleus | NOTE: You will not be able to use start up hooks or CMDLaunch with this option
Game.PromptBetweenInstances = true; //Prompt the user with a messagebox to let the user decide when to open the next instance | default: false, PauseBetweenStarts STILL required

// This is the text that will be show inside the box "Handler Author's Notes" in the Nucleus UI.
Game.Description =
  "You need GTA Connected fully set and working. On Nucleus-Coop you must select the GTAIV.exe in the root folder, while on GTA Connected Launcher you can select the one inside the Retail folder or the original one ( if you have overwritten with the downgraded one ). When the GTA Connected launcher appears, disable the 'Window mode' in the game settings, be sure that 'Close Launcher' is enabled and double click on a server. When the game is started, press 'Ok' on the Nucleus-Coop prompt (be sure that the game is not loading at that moment). Start the next instance, when the current one is set and ready (borders removed). When you will click 'ok' do not touch the mouse until the GTA Connected launcher appears again. After that, repeat the process for the next player. If needed, press Win+B for split performance. I suggest to edit your player model before starting the next instance (click the game window for prevent crashes). XinputPlus is suggested because the gamepads will be restricted at the very beginning. If this method doesn't work for you, use InjectionHook but gamepads could be fully restricted only at the very end. Keyboards/mice should be restricted automatically. Press the 'END' key for realese/restrict the input.";

// This is the text that will be show inside the box "Handler Author's Notes" in the Nucleus UI.
Game.Play = function() {
  /* This handler will start the GTA Connected launcher for each player. 
      Next, it will start two .bat files: 
	  - PlayerDocument.bat = It will export each play document files before the next instance appears and import the previous exported ones when the corresponding player is initialized.
	  - mouseclick.bat = Thanks to nircmd.exe, it will automatically click the player instance to be sure that the game will have mouse focus before PreventWindowDeactivation blocks new window messages.
						 In this way, the instance will still think that has the mouse focus (This is needed to let the gamepad move the camera).
	  It will also set up XInputPlus to restrict each player gamepad to the corresponding instance.*/

  //The configuration of multi keyboards/mice must have FakeFocus turned on. Also HookMouseVisibility could cause crashes so it will enable only on the keyboard players.*/
  if (Player.IsKeyboardPlayer) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.PreventWindowDeactivation = false; //Blocks the processing of the windows message that gets sent when the window loses focus
  } else {
    Game.PreventWindowDeactivation = true; //Blocks the processing of the windows message that gets sent when the window loses focus
  }

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Jack's Mini Network\\Grand Theft Auto Connected", "Close Launcher", "1", Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Jack's Mini Network\\Grand Theft Auto Connected", "Name", Context.Nickname, Nucleus.RegType.String);

  var key = Context.Options["KEY"];

  if (key == "No") {
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
    Game.HookUseLegacyInput = true;
    //Nucleus Coop will hook mouse movement messages and the GetCursorPos function to work around legacy input. Some games only need the GetCursorPos hook and conflict when mouse movement messages are edited. If this is the case, enable this option:
    Game.HookDontUpdateLegacyInMouseMsg = false;
    /* Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
	This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.*/
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
    Game.ForwardRawKeyboardInput = true;
    // This will re-register the game for Windows raw input with the option to receive input while not in the foreground.
    // This is important as most games will register to receive raw input only when in the foreground.
    Game.HookReRegisterRawInput = true;
    Game.HookReRegisterRawInputMouse = false;
    Game.HookReRegisterRawInputKeyboard = true;
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
  } else {
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
    /* Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
	This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.*/
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
    Game.LockInputAtStart = false;
    // If you need to change the key to toggle input lock, e.g. if the game uses the End key, edit it with this.
    // You can find a list of keys and their numbers at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
    Game.LockInputToggleKey = 0x23;
  }

  //This IF will be used only by the first player.
  if (Context.PlayerID == 0) {
    //Copying the necessary files for automatically click the instance after the user click ok on the last Nucleus-Coop prompt.

    //Copying the specified file from a specified source path to a specified destination path
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nircmd.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "nircmd.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mouseclick.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mouseclick.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //Copying and renameing files for be sure that the handler will not overwrite original ones. After Nucleus-Coop will be closed, the PlayerDocument.bat will restore the original ones.

    //This IF will be used on if the specified file exist
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\commandline.txt")) {
      //Copying a specified file.
      System.IO.File.Copy(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\commandline.txt", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\commandline.txt.old", true);
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll")) {
      System.IO.File.Copy(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll.old", true);
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini")) {
      System.IO.File.Copy(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini.old", true);
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\xinput1_3.dll")) {
      System.IO.File.Copy(
        Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\xinput1_3.dll",
        Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\xinput1_3.dll.old",
        true
      );
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini")) {
      System.IO.File.Copy(
        Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini",
        Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini.old",
        true
      );
    }

    var pad = Context.Options["PAD"];

    if (pad == "XinputPlus") {
      var jsFilePath = Context.HandlersFolder + "\\GTA IV.js";
      var ans = Context.FindLineNumberInTextFile(jsFilePath, "var answers = [", Nucleus.SearchType.StartsWith);

      Context.ReplaceLinesInTextFile(jsFilePath, [ans + '|var answers = ["XinputPlus", "InjectionHook"];']);

      if (Context.PlayerID == 0) {
        //Manually copying the XinputPlus files.

        System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\x86\\xinput1_3.dl_", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll", true);
        System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\XInputPlus.ini", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini", true);

        if (System.IO.Directory.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail")) {
          System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\x86\\xinput1_3.dl_", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\xinput1_3.dll", true);
          System.IO.File.Copy(Context.NucleusFolder + "\\utils\\XInputPlus\\XInputPlus.ini", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini", true);
        }
      }
    } else if (pad == "InjectionHook") {
      var jsFilePath = Context.HandlersFolder + "\\GTA IV.js";
      var ans = Context.FindLineNumberInTextFile(jsFilePath, "var answers = [", Nucleus.SearchType.StartsWith);

      Context.ReplaceLinesInTextFile(jsFilePath, [ans + '|var answers = ["InjectionHook", "XinputPlus"];']);

      /* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one.]
	This method is the same used by Universal Split Screen (Hook Xinput for gamepads). It will make the instance redirect the controllers input to a specific controller index. This restriction method doesn't create any file.*/
      Game.InjectHookXinput = true;
    }

    //Editing the PlayerDocument.bat in the context of the user directory path.

    //Editing the specified file.
    var txtPath = Game.Folder + "\\PlayerDocument.bat";
    var dict = ["6|set GameFolder=" + Game.Folder, "7|set PlayersNumber=" + Context.NumberOfPlayers, "8|set OriginalGamePath=" + Context.RootInstallFolder];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  //Editing the mouseclick.bat in the context of the player number and instance position.

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mouseclick.bat";
  var dict = ["4|set WindowX=" + Player.MonitorBounds.X, "5|set WindowY=" + Player.MonitorBounds.Y, "6|set CurrentPlayer=" + (Context.PlayerID + 1)];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Creating and editing the commandline.txt for setting up GTAIV with the right settings.

  if (Context.PlayerID == 0) {
    var commandline = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\commandline.txt";
    var lines = ["-width " + Context.Width, "-height " + Context.Height, "-windowed", "-frameLimit 1"];

    Context.WriteTextFile(commandline, lines);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\commandline.txt";
    var dict = ["1|-width " + Context.Width, "2|-height " + Context.Height, "3|-windowed", "4|-frameLimit 1"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  //Editing the XinputPlus.ini manually for restrict the gamepads.

  if (Player.IsKeyboardPlayer) {
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini")) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", ""),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "")
      ]);
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini")) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", ""),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", ""),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", ""),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "")
      ]);
    }
  }

  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini")) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini")) {
    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Retail\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  //Starting the .bat files and also the GTA Connected Launcher.

  //Starting an external file
  Context.RunAdditionalFiles(["1|" + Game.Folder + "\\PlayerDocument.bat", "all|" + Game.Folder + "\\start.bat"], false, 5, false, false);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mouseclick.bat"], false, 0, false, false);
};