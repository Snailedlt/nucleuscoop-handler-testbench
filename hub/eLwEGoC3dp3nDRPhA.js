Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Sat Feb 26 2022 12:54:24 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "eLwEGoC3dp3nDRPhA";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

/*With more than four controllers, you can use only ONE XboxOne controller, and you can't use at the same time the keyboard. 
You must click/alt+tab on the corresponding instance to make it work. 
In alternative, you can try to fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.*/

/* If you are creating a handler, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released handlers (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-handler one that uses Unreal Engine 4).*/

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["Last chosen", "Only-First", "All-Players", "All-Disabled"]; //adding variables that user can use on the options
Game.AddOption("Which player will have music in race?", "", "MUSIC", answers);

/* (STAR WARS™ Episode I Racer start multiple times by editing the instances window titles. Also, it will must use SteamStubDRMPatcher.)
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

//Name of the files you want Nucleuscoop to copy intead of symlink them.
Game.FileSymlinkCopyInstead = ["audio.cfg", "ipxwrapper.dll", "wsock32.dll", "Smush.dll", "mswsock.dll", "IFORCE2.dll", "dsetup32.dll", "dsetup16.dll", "dsetup.dll", "dpwsockx.dll", "a3dapi.dll"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["ddraw.dll", "steam_appid.txt", "current_control.map", "D3D8.dll", "D3DImm.dll", "dgVoodoo.conf", "Dinput.dll", "Dinput8.dll", "XInput1_3.dll", "XInputPlus.ini"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe handler selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "SWEP1RCR.EXE";
Game.SteamID = "808910"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "SWEpIRacer"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "STAR WARS™ Episode I Racer"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 8;

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = true; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = true; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = true; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.SupportsPositioning = true; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = true; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "?"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HasDynamicWindowTitle = true; //This will use only the text specified in ForceFocusWindowName. Work-around for ForceFocusWindowName having to match 1:1 with game window title for resizing, positioning and focus | default: false
Game.IdInWindowTitle = true; //Adds the process ID to the end of the window title
Game.DontReposition = true; //Should Nucleus not reposition the game windows?
Game.DontResize = true; //Should Nucleus not resize the game windows?
Game.NotTopMost = true; //Should Nucleus not make the game windows top most (appear above everything else)
Game.HookFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.HookInit = true; //Enable or disable hooks of functions some games may try and use to prevent multiple instances from running
Game.FakeFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false
// (you should use FakeFocus OR PreventWindowDeactivation, not both. In this rare case, helps the game not resize or receive keyboard input).
Game.PreventWindowDeactivation = true; //Blocks the processing of the windows message that gets sent when the window loses focus

//		[Input lines]

Game.SupportsKeyboard = false; //If enabled, will allow the keyboard to be used as a device input in Nucleus. Before enable it by default, be sure that keyboard/mouse works without problems.
Game.KeyboardPlayerFirst = false; //Keyboard player will be the first to be initialized
Game.Hook.DInputEnabled = false; //If enabled, will allow DInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.DInputForceDisable = false; //If we should completely remove support for DirectInput input from the game
Game.Hook.XInputEnabled = true; //If enabled, will allow XInput devices to be used as a device input in Nucleus. This doesn't mean that it will work with the game if not supported.
Game.Hook.XInputReroute = false; //If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list, and you will find which Xinput DLLs the game is using. A game that supports controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

//This game must use an old version of XinputPlus for restrict the game correctly. We will need to copy and edit the right files manually.

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_3.dll" ]; //This line specify which DLLS CustomDll will use.

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 10; //Pause between game intances starts in milliseconds.
Game.PauseBetweenProcessGrab = 10; //How many seconds to wait after launching game (or launcher) but before grabbing game process
Game.PauseBetweenContextAndLaunch = 5; //Number of seconds to wait after running additional files but before continuing with player setup

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.CreateSteamAppIdByExe = true; //Create a steam_appid.txt file where the game executable is. Some games need this for start with Goldberg.
Game.UseSteamStubDRMPatcher = true; //Use UberPsyX's Steam Stub DRM Patcher to remove Steam Stub DRM from a protected executable
Game.PromptBetweenInstances = true; //Nucleus will show a prompt between each instances for let you decide when start the next one.
Game.RequiresAdmin = true; //Game requires Nucleus to be run as administrator (this option will check and advise if detected not running Nucleus as admin)

/*Adds whatever you put into the field as starting parameters for the game's executable. For example, in most cases '-windowed' will force windowed mode. Parameters can be chained. Necessary for some games. 
If you need to add the context options (like, resolutions chosen by the user in Nucleus UI) you need to use launch parameters inside "Game.Play = function()". 
An example could be : 
var Args = (Context.Args = " -windowed -w " + Context.Width + " -h " + Context.Height);
Context.StartArguments = Args;
*/
Game.StartArguments = "-i";

Game.Description =
  "Handler support only gamepads. Nucleus-Coop and the game must be placed on the same drive. Create a server in the first instance, choose your podracer and choose how many laps. Before start the next instance, move your gamepad and be sure that is recognized by the instance. When you are ready start the next instance. Join in the server and choose your podracer before start the next one. After you click 'ok' on the last Nucleus prompt (hook/sends fake messages) you will not be able to use the mouse anymore. Only the first player is able to change the podracer and the track with the gamepad. Ctrl+Q is used for exit the race.";

Game.Play = function() {
  /* 
This handler enables multiple keyboards and mice support in context because is needed to make the controllers work but keyboards are not working. In this way, the user will not be able to select the keyboards as input.
Because the game doesn't support window mode, it will use DgVooDoo2 to force it, and also, through poistion.bat, it will use nircmd.exe to resize correctly the instances.
To restrict controllers correctly in this game, we must use an old input plus version so the handler will copy the needed files from the game script folder to the instance ones and also edit the setting file.
The handler will also edit the config files to map correctly the buttons + the audio (in the context of what the user-chosen on the specific Nucleus option) and the game registry lines.*/

  //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.

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
  /*  
Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.*/
  Game.HookMouseVisibility = true;

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

  //Editing the position.bat file in context of the PlayerID and instance resolution/position. Then starting it for all players.

  //Editing a specific file text line
  var txtPath = Game.Folder + "\\position.bat";
  var dict = ['4|nircmd.exe win setsize ititle "Episode I Racer(' + Context.PlayerID + ')" ' + Player.MonitorBounds.X + " " + Player.MonitorBounds.Y + " " + Context.Width + " " + Context.Height + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Starting a specified file.
  Context.RunAdditionalFiles(["all|" + Game.Folder + "\\position.bat"], false, 0, true, false);

  //Copying the preset for make the controllers already mapped.

  //This IF will be used only if the specified file doesn't exist
  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\current_control.map")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\current_control.map"); //Copying the specific files to the Nucleus instance content folders from the game handlers Nucleus folder
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "current_control.map");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  //Copying the needed dgVoodoo file for make the game start in window mode.

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dgVoodoo.conf");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\D3D8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "D3D8.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\D3DImm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "D3DImm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DDraw.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "DDraw.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Editing the buttons setting file for be sure that only the joystick is enabled

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\current_control.map"; //Editing a specific file by manually selecting the line and manually edit the text
  var dict = ["24|JOYSTICK                    ENABLED=TRUE", "70|KEYBOARD                    ENABLED=FALSE"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Copying the needed XinputPlus files for restrict the controller correctly in this game.

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dinput.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dinput8.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dinput8.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInput1_3.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "XInput1_3.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "XInputPlus.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //Editing the XInputPlus.ini for be sure that it will use the correct controller for each player.

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
    new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
  ]);

  //Editing the dgVoodoo.conf for force the game to use the custom resolution.

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dgVoodoo.conf"; //Editing a specific file by manually selecting the line and manually edit the text
  var dict = [
    "165|Resolution                          = h:" + Context.Width + ", v:" + Context.Height + "," //Context.Widht and Height will write the numbers of the resolution choosed by the user in the Nucleus UI screen selector
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  //Editing the audio settings in contenxt of what the user chosen on the specific Nucleus option.

  /*This line will create a variable from the corresponding Nucleus option.
  For example, this one will use the word "MUSIC" inside "Game.AddOption("Which player will have music in race?", "", "MUSIC", answers);" for
  define the variable "mus" as the answer that the user chosen on this option. So, if the user chooses "Only-First", the var "mus" will be defined as "Only-First". */
  var mus = Context.Options["MUSIC"];

  if (mus == "Only-First") {
    //This if will be used only for the first player.
    if (Context.PlayerID == "0") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\audio.cfg"; //Editing a specific file by manually selecting the line and manually edit the text
      var dict = ["12|AUDIO                       MUSIC=ON"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
    //This if will not be used only for the first player.
    if (Context.PlayerID > "0") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\audio.cfg"; //Editing a specific file by manually selecting the line and manually edit the text
      var dict = ["12|AUDIO                       MUSIC=OFF"];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }
  if (mus == "All-Players") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\audio.cfg"; //Editing a specific file by manually selecting the line and manually edit the text
    var dict = ["12|AUDIO                       MUSIC=ON"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (mus == "All-Disabled") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\config\\current\\audio.cfg"; //Editing a specific file by manually selecting the line and manually edit the text
    var dict = ["12|AUDIO                       MUSIC=OFF"];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  //Editing the game registry lines.

  Context.EditRegKey(
    "HKEY_LOCAL_MACHINE",
    "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0",
    "executable",
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SWEP1RCR.EXE",
    Nucleus.RegType.String
  );
  Context.EditRegKey(
    "HKEY_LOCAL_MACHINE",
    "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0",
    "GUID",
    "{" + Context.GamepadGuid + "}",
    Nucleus.RegType.String
  );
  Context.EditRegKey(
    "HKEY_LOCAL_MACHINE",
    "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0",
    "Install Path",
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder),
    Nucleus.RegType.String
  );
  Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0", "JoystickID", Context.PlayerID + 1, Nucleus.RegType.String);
  Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0", "Last Game", "NucleusCoop", Nucleus.RegType.String);
  Context.EditRegKey("HKEY_LOCAL_MACHINE", "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0", "Last Player", Context.Nickname, Nucleus.RegType.String);
  Context.EditRegKey(
    "HKEY_LOCAL_MACHINE",
    "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0",
    "Source Dir",
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder),
    Nucleus.RegType.String
  );
  Context.EditRegKey(
    "HKEY_LOCAL_MACHINE",
    "SOFTWARE\\WOW6432Node\\LucasArts Entertainment Company LLC\\Star Wars: Episode I Racer\\v1.0",
    "Source Path",
    Context.GetFolder(Nucleus.Folder.InstancedGameFolder),
    Nucleus.RegType.String
  );
};

//by Bizzo :^)