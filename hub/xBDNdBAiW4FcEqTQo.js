Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Sat Sep 25 2021 10:35:50 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "xBDNdBAiW4FcEqTQo";
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

/*These lines will add/show in the first Nucleus-Coop options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["No", "Yes"];
Game.AddOption("Force the log-in accounts process?", "Enabled by default if the player isn't already logged in.", "LOG", answers);

/*(In this case, War Thunder starts multiple times by closing a specific mutex).
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
Game.KillMutex = ["Type:Mutant|AcesMutex"]; //you can even specify the type: Game.KillMutex = ["Type:Mutant|mutex_to_kill", "Type:Semaphore|mutex_to_kill", "Type:Event|mutex_to_kill",];
Game.RenameNotKillMutex = true; //Instead of killing the mutex, rename it to something else | Requires Game.KillMutex to contain the EXACT name of the mutexes for this to work (no partial).

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them
Game.FileSymlinkCopyInstead = ["config.blk"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "aces.exe";

Game.BinariesFolder = "win64"; //In which folder the game exe is located? Relative path to where Nucleus should start the game's working folder to.
Game.SteamID = "236390"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "WarThunder"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "War Thunder"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 64; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = false; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked
Game.UseNucleusEnvironment = true; //Use custom environment variables for games that use them, replaces some common paths (e.g. AppData) with C:\Users\<your username>\NucleusCoop
Game.UserProfileSavePathNoCopy = true; //Do not copy files from original UserProfileSavePath if using Nucleus Environment
Game.UserProfileSavePath = "Documents\\My Games\\WarThunder\\Saves"; //Relative path from user profile (e.g. C:\Users\ZeroFox) to game's save path | Used to provide some extra functionality (open/delete/copy over to Nucleus Environment)

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = false; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = true; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "War Thunder"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HookFocus = true; //Usually helps when you hear the audio only from one instance. Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.FakeFocus = false; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false
Game.NotTopMost = true; //Should Nucleus not make the game windows top most (appear above everything else)

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 10; //Pause between game intances starts in milliseconds.
Game.PauseBetweenProcessGrab = 10; //How many seconds to wait after launching game (or launcher) but before grabbing game process

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.PromptBetweenInstances = true; //Prompt the user with a messagebox to let the user decide when to open the next instance | default: false, PauseBetweenStarts STILL required

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "I don't take any responsibility so you use it at your own risk! You need a different Gaijin account for each player. Before starting the game through Nucleus-Coop you should start it normally to update it or to change the graphics settings. I also suggest to add the other players as a friend/in the squad. When at the start, the game asks if you want to launch the game through the launcher select 'No'. Log-in with the specific player account and remember to go in commands options -> load profile -> go to nucleus content folder (should be the game installation path in-game) -> load 'Keyboard.blk' if you are using a keyboard or 'Gamepad.blk' if you are using a controller (you can check inside the Nucleus-Coop\\scriptsWarThunder\\Presets folder the more information about edit the presets keys). When the instance is set and ready, start the next one (remember to proceed on the cmd window after you logged in if it was prompted to you). Add the players on the friend list and to the same platoon.  When the last instance is set, click the last Nucleus-Coop prompt (hook/send fake message). At the very end, when all instances are ready, press 'END' on your keyboard to restrict the input ( you can press the 'END' key to release it if needed ). Set all the players on ready while the first player creates/search a match.";

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = false; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = false; //If we should completely remove support for DirectInput input from the game
Game.UseDInputBlocker = false; //Setup wizark952's dinput blocker (block dinput for the game)
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list, and you will find which Xinput DLLs the game is using. A game that supports controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one.]
This method is the same used by Universal Split Screen (Hook Xinput for gamepads). It will make the instance redirect the controllers input to a specific controller index. This restriction method doesn't create any file.*/
//Game.ProtoInput.XinputHook = true;
Game.InjectHookXinput = true;

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = ["xinput1_4.dll", "xinput9_1_0.dll"]; //This line specify which DLLS CustomDll will use.

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
Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
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
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActvateAppFilterID);

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
    ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
    //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
    //ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActvateAppFilterID);
  }
};

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /*War Thunder stores the login details also in the Windows Registry. Thanks to two bats files, the script will backup the current game registry lines, import each specific player one, and 
	 at the end restore the original registry. It will also edit the game config file to set correctly the game and also copy the input presets inside the game script folder.*/

  if (!Context.IsKeyboardPlayer) {
    Game.FakeFocus = true;
  } else {
    Game.FakeFocus = false;
  }

  //Starting the documentsrestore.bat. This script will make sure that you Document path is correctly set and restored at the end of the session.

  //This IF wil be used only by the first player
  if (Context.PlayerID == 0) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works
    Game.PauseBetweenContextAndLaunch = 15; //Number of seconds to wait after running additional files but before continuing with player setup
    //This line will launch a specific file
    Context.RunAdditionalFiles(["1|" + Game.Folder + "\\documentsrestore.bat"], false, 0, false, false);
  } else {
    //while other players
    Game.PauseBetweenContextAndLaunch = 10;
  }

  //Editing the game config file for be sure will be started in window mode, with the context resolution and also with the anti-cheat off.

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.blk"; //Editing a specific file by manually selecting the line and manually edit the text
  var eac = Context.FindLineNumberInTextFile(txtPath, "use_eac:b", Nucleus.SearchType.Contains);
  var res = Context.FindLineNumberInTextFile(txtPath, "resolution:t", Nucleus.SearchType.Contains);
  var win = Context.FindLineNumberInTextFile(txtPath, "windowed:b", Nucleus.SearchType.Contains);
  var mode = Context.FindLineNumberInTextFile(txtPath, "mode:t", Nucleus.SearchType.Contains);

  var dict = [eac + "|use_eac:b=no", res + '|  resolution:t="' + Context.Width + " x " + Context.Height + '"', win + "|  windowed:b=yes", mode + '|  mode:t="windowed"'];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Here, the script will disable/enable the gamepad UI (seems that is not working atm) and copy the right controls presets in context of the player input.

  //This IF will be "used" if the current instance has a player that use the Keyboard
  if (Player.IsKeyboardPlayer) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.blk"; //Editing a specific file by manually selecting the line and manually edit the text
    var padint = Context.FindLineNumberInTextFile(txtPath, "use_gamepad_interface:b", Nucleus.SearchType.Contains);

    var dict = [padint + "|use_gamepad_interface:b=no"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Keyboard.blk");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Presets\\Keyboard.blk");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\config.blk"; //Editing a specific file by manually selecting the line and manually edit the text
    var padint = Context.FindLineNumberInTextFile(txtPath, "use_gamepad_interface:b", Nucleus.SearchType.Contains);

    var dict = [padint + "|use_gamepad_interface:b=yes"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Gamepad.blk");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Presets\\Gamepad.blk");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  //Copying the PlayerRegistry.bat in each player folder. This will be used to retrieve or import the current player War Thunder registry. This is needed to save each Player log-ins details.

  //Copying a specific file to a specific path.
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\PlayerRegistry.bat");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "PlayerRegistry.bat");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  /*The script will edit the PlayerRegistry.bat in context if the player has already an account registry file stored in the game script folder.
    IF the reg file is not found it will make the bat file ask the player to confirm when it can export the game registry (after the player logged in).
    IF the user chooses Yes on the Nucleus-Coop option "Force the log accounts in/out process?", it will force the registry export process.
    Both will make sure that the game auto-login will be disabled.
    IF the player reg file is found, the bat file will import the corresponding player nickname registry.*/

  /*This line will create a variable from the corresponding Nucleus options.
    For example, this one will use the word "LOG" inside "Game.AddOption("Force the log-in accounts process?", "Enabled by default if the player isn't already logged in.", "LOG", answers);" for
    define the variable "log" as the answer that the user chosen on this option. So, if the user chooses "Yes", the var "log" will be defined as "Yes". */
  var log = Context.Options["LOG"];

  //This IF will be used if the specified file doesn't exists OR if log correspond to "Yes".
  if (!System.IO.File.Exists(Game.Folder + "\\PlayersLoggins\\Player" + (Context.PlayerID + 1) + ".reg") || log == "Yes") {
    //Editing a specific file by manually selecting the line and manually edit the text
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\PlayerRegistry.bat";
    var dict = ['3|set FScript="' + Game.Folder + '\\PlayersLoggins"', "4|set PlayerNickname=Player" + (Context.PlayerID + 1), "16|goto export"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    //Starting DocumentRegistry.bat and PlayerRegistry.bat. The first one, will export the current game registry and restore it when Nucleus-Coop will be closed.
    //This line will launch a specific file
    Context.RunAdditionalFiles([Game.Folder + "\\DocumentRegistry.bat", "all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\PlayerRegistry.bat"], false, 5, true, false);
    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\win64\\aces.exe"], false, 5, false, true);

    //This IF will be used if the specified file exists.
    if (System.IO.File.Exists(Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\common.blk")) {
      //Editing a specific file by manually selecting the line and manually edit the text
      var txtPath = Context.EnvironmentPlayer + Context.UserProfileSavePath + "\\common.blk";
      //Finding the line number of a specific piece of text inside a file and storing it inside a variable
      var autol = Context.FindLineNumberInTextFile(txtPath, "autologin:b", Nucleus.SearchType.Contains);

      var dict = [autol + "|  autologin:b=no"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\PlayerRegistry.bat"; //Editing a specific file by manually selecting the line and manually edit the text
    var dict = ['3|set FScript="' + Game.Folder + '\\PlayersLoggins"', "4|set PlayerNickname=Player" + (Context.PlayerID + 1), "16|goto exit"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    Context.RunAdditionalFiles([Game.Folder + "\\DocumentRegistry.bat", "all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\PlayerRegistry.bat"], false, 5, true, false);
  }
};