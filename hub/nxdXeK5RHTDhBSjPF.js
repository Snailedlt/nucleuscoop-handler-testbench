Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Feb 23 2021 10:52:52 GMT+0000 (UTC).
Hub.Handler.Id = "nxdXeK5RHTDhBSjPF";
Hub.Maintainer.Name = "Bizzo";
Hub.Maintainer.Id = "HEgozNi3MNvhAmWfi";

/* If you are creating a script, PCGamingWiki is a good start to find fixes for problems https://www.pcgamingwiki.com/wiki/Home . Or use google if it is not Nucleus-Coop problem-related ;)  
You can ask for support in our subReddit https://www.reddit.com/r/nucleuscoop/ and also, check the FAQ post https://www.reddit.com/r/nucleuscoop/comments/fjdqid/list_of_new_supported_games_and_faq/.
There you will also find an invite link for our Discord server.*/

/*You can find most of the lines in the Mod-ReadMe.txt (inside Nucleus-Coop root folder) and in the Master_SCript.js (documentation link inside Reddit FAQ post).
Check even the released scripts (usually, the ones of games that use the same game-engine share a lot of characteristics. Example: You are scripting an Unreal Engine 4 game? Use as a base-script one that uses Unreal Engine 4).*/

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var PostProcess = ["false", "true"];
var answers = ["No", "Yes"];
Game.AddOption("Graphics Options", "Use post Process(yellow tinge and blur)", "0", PostProcess);
Game.AddOption("Enable prompts between instances?", "This will give you time for create in-game profiles for each player.", "Prompts", answers);

/* (For start GRID multiple times, you must kill a mutex. Also, Steam Emulation will make it unseen by the original Steam.)
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
Game.KillMutex = ["GRID"]; //you can even specify the type: Game.KillMutex = ["Type:Mutant|mutex_to_kill", "Type:Semaphore|mutex_to_kill", "Type:Event|mutex_to_kill",];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "grid.exe";

Game.SteamID = "12750"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "GRID"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "Grid race Driver"; //Title of the game that will be show on Nucleus.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
Game.MaxPlayers = 12; //This is just an info. Usually we write the max players number the game support. (PC, should support max 16 input devices connected)

//		[File System]
// Lines for decide how Nucleus will copy (or not) the game files.

Game.SymlinkExe = false; //False = this will copy the game exe. Enable = will symlink the game exe.
Game.SymlinkGame = false; //False = this will not copy the game in Nucleus\content folder. Enable = this will symlink the game in Nucleus\content folder
Game.KeepSymLinkOnExit = false; //False = after Nucleus is closed, game files inside Nucleus\content will be deleted. Enable = Nucleus will keeps the files inside Nucleus\content even after is closed. Useful if the game store saves in the game-folder.
Game.HardcopyGame = false; //False = this will not do a real copy of all game files. Enable = this will do a real copy of all game files.
Game.HardlinkGame = false; //Different type of link files. Hardlink files instead of Symlink (or hard copy) | Directories will still be symlinked but files will be hardlinked
Game.UseNucleusEnvironment = true; //Use custom environment variables for games that use them, replaces some common paths (e.g. AppData) with C:\Users\<your username>\NucleusCoop
Game.DocumentsSavePathNoCopy = true; //When using DocumentsSavePath, do not let Nucleus copy from original location to Nucleus Documents
Game.DocumentsConfigPath = "Codemasters\\Grid\\hardwaresettings"; //Similar to UserProfileConfigPath, use this when the game uses Documents to store game files
Game.DocumentsSavePath = "Codemasters\\Grid\\savegame"; //Similar to UserProfileSavePath, use this when the game uses Documents to store game files

//		[Hooks]

Game.HideTaskbar = true; //If enabled, Windows taskbard will be hidden.
Game.HideDesktop = true; //Hide the desktop background with a solid black background
Game.HideCursor = true; //Hide the mouse cursor in game instances
Game.SupportsPositioning = false; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = false; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "GRID"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HookFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval. This will help the game on thinking is window is active and not out of focus.
Game.FakeFocus = true; //Enable or disable the sending of focus messages to each game window at a regular interval | default: false
Game.ResetWindows = true; //After each new instance opens, resize, reposition and remove borders of the previous instance

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
Search on the list and you will find which Xinput DLLs the game is using. Game that support controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_3.dll" ]; //This line specify which DLLS CustomDll will use.

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one.]
This method is the same used by Universal Split Screen (Hook Xinput for gamepads). It will make the instance redirect the controllers input to a specific controller index. This restriction method doesn't create any file.*/
Game.InjectHookXinput = true;

//		[Handlers]

Game.HandlerInterval = 100; //The interval in milliseconds the Handler should be updated at. Set it to 0 to disable updating (will lose all functionality that depends on ticks).
Game.PauseBetweenStarts = 25; //Pause between game intances starts in milliseconds.

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = true; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).

/*Adds whatever you put into the field as starting parameters for the game's executable. For example, in most cases '-windowed' will force windowed mode. Parameters can be chained. Necessary for some games. 
If you need to add the context options (like, resolutions chosen by the user in Nucleus UI) you need to use launch parameters inside "Game.Play = function()". 
An example could be : 
var Args = (Context.Args = " -windowed -w " + Context.Width + " -h " + Context.Height);
Context.StartArguments = Args;
*/
Game.StartArguments = " -novirtual ";

// This is the text that will be show inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "Tested on Steam version. Only XInput gamepads supported and they will be restricted at the very end. Add custom resolutions in your gpu panel that will fit the split screens layouts, then delete your original game DOCUMENTS CONFIG folder (Not saves! You can also access it trough Nucleus UI. Is named 'hardwaresettings'.) then start the game normally and it should add the new custom resolutions inside the config files. Each player has is own save folder. Create a LAN match in the first instance and join in with the next ones.";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /* This script will not do copies of the game but use the original files/folders to start multiple instances. This because the games give problems on start with symlinked copies.
    It will make sure to back up the original files before editing them and when Nucleus-Coop will be closed, it will restore them.
    Also, it will edit each player document config file to let the game instance start with the right settings.*/

  //Starting the documentsrestore.bat. This script will make sure that you Document path is correctly set and restored at the end of the session.

  //This IF wil be used only by the first player
  if (Context.PlayerID == 0) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works
    Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup
    //This line will launch a specific file
    Context.RunAdditionalFiles(["1|" + Game.Folder + "\\documentsrestore.bat"], false, 0, false, false);
  } else {
    //while other players
    Game.PauseBetweenContextAndLaunch = 5;
  }

  //This edit will make Grid support custom resolutions. Because we are using the same files for all players, only the first player will do it.

  //This IF will be "used" if the instance is the first player
  if (Context.PlayerID == 0) {
    //This line will create a backup of the file specified. Then, when Nucleus is closed, it will be restored.
    Context.BackupFile(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\hardware_settings_restrictions.xml", true);

    //Editing a specific file by manually selecting the line and manually edit the text
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system\\hardware_settings_restrictions.xml";
    //Creating a variables that will correspond to the line number of the line that contains the specified text.
    var customres = Context.FindLineNumberInTextFile(txtPath, "<res mem", Nucleus.SearchType.Contains);

    var dict = [customres + "|  <!--custom resolutions enabled-->"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    //If you delete the intro files the game will skip the intro cutscenes. However we are using the original game files, so the script will made a backup before.

    //This IF will be used only if the specified file exist.
    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video\\intro.bik")) {
      Context.BackupFile(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video\\intro.bik", true);

      //This line will delete the file specified.
      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video\\intro.bik");
    }

    if (System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video\\intro_us.bik")) {
      Context.BackupFile(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video\\intro_us.bik", true);

      System.IO.File.Delete(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\video\\intro_us.bik");
    }
  }

  //Editing player Nucleus Environment document config file.

  var path = Context.DocumentsPlayer + "\\" + Context.DocumentsConfigPath + "\\hardware_settings_config.xml";
  var width = Context.Width;
  var height = Context.Height;

  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "oldWidth", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "oldHeight", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "width", Context.Width);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "height", Context.Height);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "aspect", width + ":" + height);
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "fullscreen", "false");
  Context.ChangeXmlAttributeValue(path, "//graphics_card//resolution", "vsync", "1");
  Context.ChangeXmlAttributeValue(path, "//postprocess", "enabled", Context.Options[0]);
  Context.ChangeXmlAttributeValue(path, "//postprocess", "blur", Context.Options[0]);

  /*This line will create a variable from the corresponding Nucleus option.
    For example, this one will use the word "Prompts" inside "Game.AddOption("Enable prompts between instances?", "This will give you time for create in-game profiles for each player.", "Prompts", answers);" for
   define the variable "prompts" as the answer that the user chosen on this option. So, if the user chooses "No", the var "prompts" will be defined as "No". */
  var prompts = Context.Options["Prompts"];

  //This will enable prompts only if the specific Nucleus option is set on "Yes"

  if (prompts == "Yes") {
    Game.PromptBetweenInstances = true;
  }
};

//By T3chnobone and Bizzo :^)