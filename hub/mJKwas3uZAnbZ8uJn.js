Hub.Handler.Version = 10; // Released at https://hub.splitscreen.me/ on Fri Jul 19 2024 14:10:00 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "mJKwas3uZAnbZ8uJn";
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

/*
These lines, will create the variable listMaps that will contain the list of the maps. 
{ Name: "Map Name",      Details: "Description. Type of gamemode?", Console: "name of the file map", ImageUrl: "image of the map" }, //use this format for add customs maps. Maps image must be placed in Nucelus\scripts\TeamFortress2 folder
*/
var listMaps = [
  { Name: "No Map", Details: "Start the game normally", Console: "", ImageUrl: "" },
  // Capture the Flag
  { Name: "2Fort", Details: "Capture the Flag", Console: "ctf_2fort", ImageUrl: "2Fort.png" },
  { Name: "2Fort Invasion", Details: "Capture the Flag", Console: "ctf_2fort_invasion", ImageUrl: "2fortinvasion.png" },
  { Name: "Double Cross", Details: "Capture the Flag", Console: "ctf_doublecross", ImageUrl: "doublecross.png" },
  { Name: "Landfall", Details: "Capture the Flag", Console: "ctf_landfall", ImageUrl: "landfall.jpg" },
  { Name: "Sawmill", Details: "Capture the Flag", Console: "ctf_sawmill", ImageUrl: "sawmill.png" },
  { Name: "Turbine", Details: "Capture the Flag", Console: "ctf_turbine", ImageUrl: "turbine.png" },
  { Name: "Well", Details: "Capture the Flag", Console: "ctf_well", ImageUrl: "well.png" },
  // Control Point
  { Name: "5Gorge", Details: "Control Point", Console: "cp_5gorge", ImageUrl: "5gorge.png" },
  { Name: "Badlands", Details: "Control Point", Console: "cp_badlands", ImageUrl: "badlands.png" },
  { Name: "Coldfront", Details: "Control Point", Console: "cp_coldfront", ImageUrl: "coldfront.png" },
  { Name: "Fastlane", Details: "Control Point", Console: "cp_fastlane", ImageUrl: "fastlane.png" },
  { Name: "Foundry", Details: "Control Point", Console: "cp_foundry", ImageUrl: "foundry.png" },
  { Name: "Freight", Details: "Control Point", Console: "cp_freight_final1", ImageUrl: "freightfinal.png" },
  { Name: "Granary", Details: "Control Point", Console: "cp_granary", ImageUrl: "granary.jpg" },
  { Name: "Gullywash", Details: "Control Point", Console: "cp_gullywash_final1", ImageUrl: "gullywashfinal.png" },
  { Name: "Metalworks", Details: "Control Point", Console: "cp_metalworks", ImageUrl: "metalworks.jpg" },
  { Name: "Powerhouse", Details: "Control Point", Console: "cp_powerhouse", ImageUrl: "powerhouse.png" },
  { Name: "Process", Details: "Control Point", Console: "cp_process_final", ImageUrl: "processfinal.jpeg" },
  { Name: "Sinshine", Details: "Control Point", Console: "cp_sunshine_event", ImageUrl: "sinshine.jpg" },
  { Name: "Sunshine", Details: "Control Point", Console: "cp_sunshine", ImageUrl: "sunshine.jpg" },
  { Name: "Snakewater", Details: "Control Point", Console: "cp_snakewater_final1", ImageUrl: "snakewaterfinal.png" },
  { Name: "Standin", Details: "Control Point", Console: "cp_standin_final", ImageUrl: "standinfinal.jpg" },
  { Name: "Vanguard", Details: "Control Point", Console: "cp_vanguard", ImageUrl: "vanguard.png" },
  { Name: "Well", Details: "Control Point", Console: "cp_well", ImageUrl: "well.png" },
  { Name: "Yukon", Details: "Control Point", Console: "cp_yukon_final", ImageUrl: "yukonfinal.png" },
  // Attack/Defend
  { Name: "DeGroot Keep", Details: "Attack/Defend", Console: "cp_degrootkeep", ImageUrl: "degrootkeep.png" },
  { Name: "Dustbowl", Details: "Attack/Defend", Console: "cp_dustbowl", ImageUrl: "dustbowl.jpg" },
  { Name: "Egypt", Details: "Attack/Defend", Console: "cp_egypt_final", ImageUrl: "Egypt.jpg" },
  { Name: "Gorge", Details: "Attack/Defend", Console: "cp_gorge", ImageUrl: "gorge.jpg" },
  { Name: "Gorge Event", Details: "Attack/Defend", Console: "cp_gorge_event", ImageUrl: "gorgeevent.png" },
  { Name: "Gravel Pit", Details: "Attack/Defend", Console: "cp_gravelpit", ImageUrl: "gravelpit.jpg" },
  { Name: "Junction", Details: "Attack/Defend", Console: "cp_junction_final", ImageUrl: "junctionfinal.jpg" },
  { Name: "Mann Manor", Details: "Attack/Defend", Console: "cp_manor_event", ImageUrl: "manorevent.png" },
  { Name: "Mercenary Park", Details: "Attack/Defend", Console: "cp_mercenarypark", ImageUrl: "mercenarypark.png" },
  { Name: "Mossrock", Details: "Attack/Defend", Console: "cp_mossrock", ImageUrl: "mossrock.jpg" },
  { Name: "Mountain Lab", Details: "Attack/Defend", Console: "cp_mountainlab", ImageUrl: "cp_mountainlab.jpg" },
  { Name: "Snowplow", Details: "Attack/Defend", Console: "cp_snowplow", ImageUrl: "snowplow.jpg" },
  { Name: "Steel", Details: "Attack/Defend", Console: "cp_steel", ImageUrl: "steel.png" },
  // Territorial Control
  { Name: "Hydro", Details: "Attack/Defend", Console: "tc_hydro", ImageUrl: "hydro.jpg" },
  // Payload
  { Name: "Badwater Basin", Details: "Payload", Console: "pl_badwater", ImageUrl: "badwater.jpg" },
  { Name: "Barnblitz", Details: "Payload", Console: "pl_barnblitz", ImageUrl: "barnblitz.PNG" },
  { Name: "Borneo", Details: "Payload", Console: "pl_borneo", ImageUrl: "borneo.jpg" },
  { Name: "Brimstone", Details: "Payload", Console: "pl_fifthcurve_event", ImageUrl: "fifthcurveevent.png" },
  { Name: "Cactus Canyon", Details: "Payload", Console: "pl_cactuscanyon", ImageUrl: "cactuscanyon.jpg" },
  { Name: "Enclosure", Details: "Payload", Console: "pl_enclosure_final", ImageUrl: "enclosurefinal.jpg" },
  { Name: "Frontier", Details: "Payload", Console: "pl_frontier_final", ImageUrl: "frontierfinal.jpg" },
  { Name: "Gold Rush", Details: "Payload", Console: "pl_goldrush", ImageUrl: "goldrush.jpg" },
  { Name: "Gravestone", Details: "Payload", Console: "pl_rumble_event", ImageUrl: "rumbleevent.png" },
  { Name: "Hellstone", Details: "Payload", Console: "pl_millstone_event", ImageUrl: "millstoneevent.jpg" },
  { Name: "Hoodoo", Details: "Payload", Console: "pl_hoodoo_final", ImageUrl: "hoodoofinal.jpg" },
  { Name: "Precipice", Details: "Payload", Console: "pl_precipice_event_final", ImageUrl: "precipiceeventfinall.png" },
  { Name: "Snowycoast", Details: "Payload", Console: "pl_snowycoast", ImageUrl: "snowycoast.png" },
  { Name: "Thunder Mountain", Details: "Payload", Console: "pl_thundermountain", ImageUrl: "thundermountain.png" },
  { Name: "Upward", Details: "Payload", Console: "pl_upward", ImageUrl: "upward.png" },
  //Payload Race
  { Name: "Banana Bay", Details: "Payload Race", Console: "plr_bananabay", ImageUrl: "bananabay.png" },
  { Name: "Helltower", Details: "Payload Race", Console: "plr_hightower_event", ImageUrl: "hightowerevent.jpg" },
  { Name: "Hightower", Details: "Payload Race", Console: "plr_hightower", ImageUrl: "hightower.png" },
  { Name: "Nightfall", Details: "Payload Race", Console: "plr_nightfall_final", ImageUrl: "nightfallfinal.png" },
  { Name: "Pipeline", Details: "Payload Race", Console: "plr_pipeline", ImageUrl: "plrpipeline.jpg" },
  //Arena
  { Name: "Badlands Arena", Details: "Arena", Console: "arena_badlands", ImageUrl: "badlands.png" },
  { Name: "Byre", Details: "Arena", Console: "arena_byre", ImageUrl: "byre.jpg" },
  { Name: "Granary Arena", Details: "Arena", Console: "arena_granary", ImageUrl: "granary.jpg" },
  { Name: "Lumberyard", Details: "Arena", Console: "arena_lumberyard", ImageUrl: "lumberyard.jpg" },
  { Name: "Nucleus Arena ", Details: "Arena", Console: "arena_nucleus", ImageUrl: "nucleus.jpg" },
  { Name: "Offblast", Details: "Arena", Console: "arena_offblast_final", ImageUrl: "offblastfinal.jpg" },
  { Name: "Ravine", Details: "Arena", Console: "arena_ravine", ImageUrl: "ravine.jpg" },
  { Name: "Sawmill Arena", Details: "Arena", Console: "arena_sawmill", ImageUrl: "sawmill.png" },
  { Name: "Watchtower", Details: "Arena", Console: "arena_watchtower", ImageUrl: "watchtower.jpg" },
  { Name: "Well Arena", Details: "Arena", Console: "arena_well", ImageUrl: "well.png" },
  //King of the Hill
  { Name: "Badlands KotH", Details: "King of the Hill", Console: "koth_badlands", ImageUrl: "badlands.png" },
  { Name: "Brazil", Details: "King of the Hill", Console: "koth_brazil", ImageUrl: "brazil.jpg" },
  { Name: "Cauldron", Details: "King of the Hill", Console: "koth_bagel_event", ImageUrl: "kothbagelevent.png" },
  { Name: "Eyeaduct", Details: "King of the Hill", Console: "koth_viaduct_event", ImageUrl: "Eyeaduct.png" },
  { Name: "Ghost Fort", Details: "King of the Hill", Console: "koth_lakeside_event", ImageUrl: "GhostFortIsland.jpg" },
  { Name: "Harvest", Details: "King of the Hill", Console: "koth_harvest_final", ImageUrl: "harvestfinal.PNG" },
  { Name: "Harvest Event", Details: "King of the Hill", Console: "kkoth_harvest_event", ImageUrl: "kothharvestevent.jpg" },
  { Name: "Highpass", Details: "King of the Hill", Console: "koth_highpass", ImageUrl: "highpass.jpg" },
  { Name: "Kong King", Details: "King of the Hill", Console: "koth_king", ImageUrl: "kothking.png" },
  { Name: "Lakeside", Details: "King of the Hill", Console: "koth_lakeside_final", ImageUrl: "Lakeside.jpg" },
  { Name: "Laughter", Details: "King of the Hill", Console: "koth_slaughter_event", ImageUrl: "kothslaughterevent.png" },
  { Name: "Lazarus", Details: "King of the Hill", Console: "koth_lazarus", ImageUrl: "koth_lazarus.jpg" },
  { Name: "Maple Ridge Event", Details: "King of the Hill", Console: "koth_maple_ridge_event", ImageUrl: "kothmapleridgeevent.png" },
  { Name: "Moonshine Event", Details: "King of the Hill", Console: "koth_moonshine_event", ImageUrl: "moonshineevent.png" },
  { Name: "Nucleus KotH", Details: "King of the Hill", Console: "koth_nucleus", ImageUrl: "nucleus.jpg" },
  { Name: "Probed", Details: "King of the Hill", Console: "koth_probed", ImageUrl: "probed.jpg" },
  { Name: "Sawmill KotH", Details: "King of the Hill", Console: "koth_sawmill", ImageUrl: "sawmill.png" },
  { Name: "Slasher", Details: "King of the Hill", Console: "koth_slasher", ImageUrl: "slasher.png" },
  { Name: "Suijin", Details: "King of the Hill", Console: "koth_suijin", ImageUrl: "suijin.jpg" },
  { Name: "Viaduct", Details: "King of the Hill", Console: "koth_viaduct", ImageUrl: "viaduct.jpg" },
  //Special Delivery
  { Name: "Doomsday", Details: "Special Delivery", Console: "sd_doomsday", ImageUrl: "doomsday.jpg" },
  { Name: "Carnival of Carnage", Details: "Special Delivery", Console: "sd_doomsday_event", ImageUrl: "doomsdayevent.png" },
  //Mann vs. Machine
  { Name: "Big Rock", Details: "Mann vs. Machine", Console: "mvm_bigrock", ImageUrl: "bigrock.png" },
  { Name: "Coal Town", Details: "Mann vs. Machine", Console: "mvm_coaltown", ImageUrl: "coaltown.png" },
  { Name: "Decoy", Details: "Mann vs. Machine", Console: "mvm_decoy", ImageUrl: "Decoy.png" },
  { Name: "Ghost Town", Details: "Mann vs. Machine", Console: "mvm_ghost_town", ImageUrl: "ghosttown.jpg" },
  { Name: "Mannhattan", Details: "Mann vs. Machine", Console: "mvm_mannhattan", ImageUrl: "mannhattan.png" },
  { Name: "Mannworks", Details: "Mann vs. Machine", Console: "mvm_mannworks", ImageUrl: "mannworks.png" },
  { Name: "Rottenburg", Details: "Mann vs. Machine", Console: "mvm_rottenburg", ImageUrl: "Rottenburg.png" },
  //Robot Destruction
  { Name: "Asteroid", Details: "Robot Destruction", Console: "rd_asteroid", ImageUrl: "Rdasteroid.jpg" },
  //Mannpower
  { Name: "Foundry Capture the Flag", Details: "Mannpower", Console: "ctf_foundry", ImageUrl: "foundry.png" },
  { Name: "Gorge Capture the Flag", Details: "Mannpower", Console: "ctf_gorge", ImageUrl: "gorge.jpg" },
  { Name: "Hellfire", Details: "Mannpower", Console: "ctf_hellfire", ImageUrl: "hellfire.png" },
  { Name: "Thunder Mountain Capture the Flag", Details: "Mannpower", Console: "ctf_thundermountain", ImageUrl: "thundermountain.png" },
  //PASS Time
  { Name: "Brickyard", Details: "PASS Time", Console: "pass_brickyard", ImageUrl: "brickyard.png" },
  { Name: "District", Details: "PASS Time", Console: "pass_district", ImageUrl: "district.jpg" },
  { Name: "Timbertown", Details: "PASS Time", Console: "pass_timbertown", ImageUrl: "timbertown.jpeg" },
  //Player Destruction
  { Name: "Cursed Cove", Details: "Player Destruction", Console: "pd_cursed_cove_event", ImageUrl: "pdcursedcoveevent.png" },
  { Name: "Monster Bash", Details: "Player Destruction", Console: "pd_monster_bash", ImageUrl: "monsterbash.png" },
  { Name: "Pit of Death", Details: "Player Destruction", Console: "pd_pit_of_death_event", ImageUrl: "pitofdeathevent.png" },
  { Name: "Watergate", Details: "Player Destruction", Console: "pd_watergate", ImageUrl: "watergate.jpg" }
];
//These lines will add/show in the second Nucleus options tab, the list of maps inside the variable listMaps
Game.AddOption("Map", "The map the game will use", "MapID", listMaps);
var MapStep = Game.ShowOptionAsStep("MapID", true, "Select a Map");

/*These lines will add/show in the first Nucleus options tab.
var answers = contains the possible answers that the User can choose.
Game.AddOption("Question", "Description", "ID of the option", *here what var answers this option will show);*/
var answers = ["No", "Yes"];
var answers2 = ["60", "45", "30", "120", "144", "240", "300"];
var answers3 = ["Manual", "Low", "Medium", "High"];
var answers4 = ["-", "TURN-ON"];
Game.AddOption("Which FPS Cap the game will use?", "", "Fps", answers2);
Game.AddOption("Which graphic settings the game will use?", "This will not affect the low graphic mod.", "Gra", answers3);
Game.AddOption("Use low graphic mod?", 'This will use mastercomfig "low" configuration for help with performance.', "Low", answers);
Game.AddOption("Enable experimental Xinput Reroute in this script?", 'This will restart Nucleus. Current status: "' + status + '"', "Reroute", answers4);

//These lines will create a prompt at the start and ask the user to input text. Then you can use it as a value. Check Mod-ReadMe.txt for other methods.
Game.CustomUserGeneralPrompts = [
  "If you are playing in LAN with other PCs, enter the IP of the Host computer only if this PC is a Client (if you are just playing on the same PC or this is the Host PC, leave it blank). "
];
Game.SaveAndEditCustomUserGeneralValues = false; //This, if enabled, will store in a txt file (inside Nucleus\scripts\gamefolder) the last text input the user entered

/* (Team Fortress 2 must have Steam open. Using the command "-insecure" the game will be able to start multiple times.)
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
Game.DirSymlinkExclusions = ["bin", "tf", "tf\\cfg"];

//Name of the files you want Nucleuscoop to do real copies instead of symlinking them.
Game.FileSymlinkCopyInstead = ["config.cfg", "360controller.cfg"];

//Name of the files you don't want Nucleuscoop to symlink, only the files placed here will be completaly ignored
Game.FileSymlinkExclusions = ["autoexec.cfg", "config.cfg", "listenserver.cfg", "mapcycle.txt", "motd_default.txt", "motd_text_default.txt", "xinput1_4.dll", "undo360controller.cfg", "custom.cfg"];

//		[Game Info]
// Here the lines that are used by Nucleus for infos about the game

//What executable the game use. This will be used by Nucleus for "exe script selection", for run the game and as process to follow for postion and resizing.
Game.ExecutableName = "tf_win64.exe";

Game.SteamID = "440"; //Here the SteamID of the game. You can find it on https://steamdb.info/ . Add it only if the game is available on Steam.
Game.GUID = "TeamFortress2"; //The name of the folder that will be created inside the Nucleus\content folder (Don't use spaces). In this folder Nucleus will store the game files for each instance of the game.
Game.GameName = "Team Fortress 2"; //Title of the game that will be show on Nucleus.
Game.WorkingFolder = "bin"; //Relative path to where Nucleus should start the game's working folder to.
Game.LauncherTitle = ""; //The name of the launcher's window title. Some games need to go through a launcher to open. This is needed or else the application will lose the game's window.
Game.ExecutableContext = ["tf"]; //Usually source games, use hl2.exe as executable. Each game as is own gameinfo.txt that identify the game that hl2.exe will load.
Game.MaxPlayersOneMonitor = 4; //This is just an info. It will not limit the players number.
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
Game.SupportsPositioning = false; //Chooses whether or not to automatically move the windows around to fit in the right spaces.
Game.Hook.ForceFocus = false; //If our custom x360ce xinput DLL should hook into the game's window and fake Window's events so we never leave focus.
Game.Hook.ForceFocusWindowName = "Team Fortress 2"; //If force focus is enabled, this is the window we are attaching ourselves to and the window we are going to keep on top. Needs exact name of the window. If force focus is disabled you still need to set the game window name for resizing and positioning.
Game.HasDynamicWindowTitle = true;
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
Game.Hook.BlockMouseEvents = false; //If force focus is enabled, this blocks all mouse input.
Game.Hook.BlockInputEvents = false; //If force focus is enabled, this blocks all input events but gamepad.
Game.Hook.BlockKeyboardEvents = false; //If force focus is enabled, this blocks all keyboard input.
//If enabled, will allow XInput devices to act like DInput devices. This allow to use more than 4 controllers. You can use only ONE XboxOne controller and you can't use at the same time the keyboard. You must click/alt+tab on the corresponding instance to make it work. In alternative you can try fix the problem by doing this http://www.snes9x.com/phpbb3/viewtopic.php?t=27510 or try Xoutput.
Game.Hook.XInputReroute = false;
//Setup wizark952's dinput blocker (block dinput for the game)
Game.UseDInputBlocker = true;

/*You can find out which dlls the game is using with Process Explorer. 
Start the game, open Process Explorer, click on the game process and click on View DLLs (Ctrl+D).
Search on the list and you will find which Xinput DLLs the game is using. Game that support controllers but not Xinput ones (old games) use dinput8.dll or dinput.dll.*/

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. For XInputPlusDll, remove or comment the line by using // for disable it.] 
This set up XInputPlus and specify which Xinput DLL it will use (If multiple dlls required, use comma seperated strings).
XinputPlus support max 4 controllers.*/
Game.XInputPlusDll = ["xinput1_4.dll"];

/* [This is used to restrict each controller to a specific instance. Disable other alternatives if you are using this one. CustomDllEnabled is enabled by default so, if you will not use it, add this line in false]
If the game should be run using our custom version of x360ce for gamepad control. Enabled by default as the majority of our games need it. */
Game.Hook.CustomDllEnabled = false;
//Game.Hook.XInputNames = [ "xinput1_4.dll" ]; //This line specify which DLLS CustomDll will use.

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

//		[Launch Parameters]

Game.UseGoldberg = false; //Use the built-in Goldberg features in Nucleus. Goldberg is used for: Redirect to LAN Network SteamWorks games that doesn't support LAN, make the game unseen from Steam and other fantastic features! https://gitlab.com/Mr_Goldberg/goldberg_emulator | default: false
Game.GoldbergNeedSteamInterface = false; //Some older games require a steam_interfaces.txt file for Goldberg to work | Will first search orig game path and nucleus games path, if not found then tries to create one with the GoldbergNeedSteamInterface command
Game.NeedsSteamEmulation = false; //If the game needs a fake Steam wrapper (SSE) to run multiple instances (this is not needed if you are using the new use Goldberg emulator line).
Game.ProcessorPriorityClass = "High"; //Sets the overall priority category for the associated process. Can be "AboveNormal", "High" or "RealTime" | default: "Normal"
Game.PromptBetweenInstances = true; //Nucleus will show a prompt between each instances for let you decide when start the next one.

// This is the text that will be shown inside the box "Script Author's Notes" in the Nucleus UI.
Game.Description =
  "Steam must be running. Set steam on offline mode if you are using the same account on different PCs (for LAN multiplayer). Only one XboxOne controller works when you are using more than 4 xinput controllers (ReRoute enabled) so, open the .js file for an possible fix. You can edit the autoexec lines inside the .js file. 'Y' is used as 'change status to Ready'. For change map use map MAPNAME console command or if you want press F8 for a random map from the mapcycle.txt file inside you TeamFortress2 scripts folder. If you are using keyboards/mice, when all instances are open and you already clicked 'ok' on the last Nucleus prompt, press END. If you want to unlock the mouse pointer, press again END.";

// Inside "Game.Play = function()" you can write operations that Nucleus will do in context of game starting.
Game.Play = function() {
  /*In this script, Nucleus will use launch arguments to set up some settings and the instance resolution in the context of what the user-chosen in screens sizes selector on the Nucleus-Coop UI.
  Then Nucleus will create autoexec.cfg files for setup different settings in the context of the device input used in each instance and at the end push the connect command (with Local IP) from the second instance and next ones. 
  Also, it will customize graphics settings and change the input restriction method in the context of the player's number.
  */

  //The configuration of multi keyboards/mice must have FakeFocus turned on. Also HookMouseVisibility could cause crashes so it will enable only on the keyboard players.
  if (Player.IsKeyboardPlayer) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
    Game.FakeFocus = true;
    /*  Used for games that toggle the mouse visibility, e.g. hidden in first person movement and visible in menus.
    This shows/hides the fake mouse cursor when the game tries to show/hide the 'real' mouse cursor.*/
    Game.HookMouseVisibility = true;

    //These lines will copy the file "undo360controller.cfg" inside Nucleus\content\TeamFortress2\Instance#\tf\cfg from Nucleus\scripts\Team Fortress 2 (the folder inside scripts must be named like the game .js file.)
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\undo360controller.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "undo360controller.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  } else {
    Game.FakeFocus = true;
    Game.HookMouseVisibility = false;
  }

  //In this part will we edit the script for enable the ReRoute Xinput mode. This requires Nucleus to be restarted.

  var OneFolderUP = System.IO.Path.Combine(Game.Folder, ".."); // The variable OneFolderUP will return a folder UP of the specified path. Example: var OneFolderUP = System.IO.Path.Combine(Game.Folder, "..");

  /*This line will create a variable from the corresponding Nucleus option.
  For example, this one will use the word "Reroute" inside "Game.AddOption("Enable experimental Xinput Reroute in this script?", 'This will restart Nucleus. Current status:"' + status + '"', "Reroute", answers3);" for
  define the variable "reroute" as the answer that the user chosen on this option. So, if the user chooses "TURN-ON", the var "reroute" will be defined as "TURN-ON". */
  var reroute = Context.Options["Reroute"];

  if (reroute == "TURN-ON") {
    Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup

    var cfgFilePath = OneFolderUP + "\\Team Fortress 2.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers4", Nucleus.SearchType.StartsWith);

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);

    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + "|var status = 'ENABLED';",
      switchi + '|var answers4 = ["-", "TURN-OFF"];',
      route + "|Game.Hook.XInputReroute = true; ",
      dinputb + "|Game.UseDInputBlocker = false; "
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, false, false);
  }

  if (reroute == "TURN-OFF") {
    Game.PauseBetweenContextAndLaunch = 10; //Number of seconds to wait after running additional files but before continuing with player setup

    var cfgFilePath = OneFolderUP + "\\Team Fortress 2.js";

    var stat = Context.FindLineNumberInTextFile(cfgFilePath, "var status", Nucleus.SearchType.StartsWith);

    var switchi = Context.FindLineNumberInTextFile(cfgFilePath, "var answers4", Nucleus.SearchType.StartsWith);

    var route = Context.FindLineNumberInTextFile(cfgFilePath, "Game.Hook.XInputReroute", Nucleus.SearchType.StartsWith);

    var dinputb = Context.FindLineNumberInTextFile(cfgFilePath, "Game.UseDInputBlocker", Nucleus.SearchType.StartsWith);

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      stat + "|var status = 'DISABLED';",
      switchi + '|var answers4 = ["-", "TURN-ON"];',
      route + "|Game.Hook.XInputReroute = false; ",
      dinputb + "|Game.UseDInputBlocker = true; "
    ]);

    Context.RunAdditionalFiles([Game.Folder + "\\nucleuscloser.bat"], false, 0, false, false);
  }

  //This folder is needed for the mastercomfig mod. When enabled, the game will use it for loads the autoexec.cfg file.
  //These two lines will create a folder named "user" inside each Nucleus content instance player folders. It will be Nucleus\content\TeamFortress2\Instance#\tf\cfg\user.
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\user");
  System.IO.Directory.CreateDirectory(filePath);

  //These lines will copy the file "motd_default.txt" inside Nucleus\content\TeamFortress2\Instance#\tf\cfg from Nucleus\scripts\Team Fortress 2 (the folder inside scripts must be named like the game .js file.)
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\motd_default.txt");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "motd_default.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\motd_text_default.txt");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "motd_text_default.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\mapcycle.txt");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mapcycle.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  /*This line will create a variable from the corresponding Nucleus options.
For example, this one will use the word "Gra" inside "Game.AddOption("What graphic settings the game will use?", 'This will not affect the low graphic mod.', "Gra", answers3);" for
define the variable "gra" as the answer that the user chosen on this option. So, if the user chooses "No", the var "gra" will be defined as "No". */
  var gra = Context.Options["Gra"];

  var fps = Context.Options["Fps"];
  var low = Context.Options["Low"];

  //Nucleus will use launch argments for start the game in windowed, resize it correctly, for fps cap and ect.
  /*These two lines, will add launch options.	
	For example, source games use "-w" and "-h" as start arguments for set Width and Height of the game resolution. You can find commands and if a determinate game-engine/game can use launch parameters on Google.
	We are gonna use Context.Width and Context.Height for let Nucleus write the Width and Height chosen by the User inside the Nucleus UI. You can find other context values inside the Mod-ReadMe.txt.*/
  var Args = (Context.Args =
    " -game tf -novid -windowed -noborder -AlwaysFocus -insecure -w " + Context.Width + " -h " + Context.Height + " +sv_cheats 1 +exec autoexec +exec custom.cfg +fps_max " + fps); //Fps cap
  Context.StartArguments = Args;

  /* Now we can use the variables created with results from the context options for decide what happens if the user choose a specific option.
For example, this IF will be "used" if the user will chose "No" on the "Use low graphic mod?" option.*/
  if (low == "No") {
    // These lines will define a variable "autoExec" that will create a file inside Nucleus\content\TeamFortress2\Instance#\tf\cfg with the lines specified inside "var lines".
    var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\autoexec.cfg"; //create an autoexec.cfg file
    var lines = [
      "sv_lan 1", //LAN server (!!don't edit!!)          // <------------------------------------------- ADD HERE AUTOEXEC COMMANDS OR SERVER SETTINGS
      "sv_pausable 1",
      "tf_mvm_min_players_to_start 2", //minimun players for start MvsM
      "maxplayers 32",
      "cl_hud_minmode 1", //minimal hud
      "bind F7 pause",
      "bind F8 randommap", //bind F8 as key for randommap command
      "engine_no_focus_sleep 0", //  game will not limit fps when is not focused (!!don't edit!!)
      "sv_cheats 1", //enable cheats
      "mp_idledealmethod 0", //afk mode kick (0=disabled)
      "mp_idlemaxtime 0", //max time that you can stay afk (0=disabled)
      "mp_showrespawntimes 5", //set the respawn wave time (default is 10)
      //"mp_disable_respawn_times", //instant respawn
      "mapcyclefile mapcycle.txt"
    ];
    Context.WriteTextFile(autoExec, lines); //creating the file
  }

  //if the user will choose to use low graphic mode, Nucleus will copy the mod files.

  if (low == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\custom\\mastercomfig-disable-pyroland-addon.vpk");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mastercomfig-disable-pyroland-addon.vpk");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\custom\\mastercomfig-low-preset.vpk");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mastercomfig-low-preset.vpk");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\custom\\mastercomfig-no-soundscapes-addon.vpk");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mastercomfig-no-soundscapes-addon.vpk");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //mastercomfig mod use exec files that are inside the user folder (while the game, without mod, use the cfg one).
    var autoExec = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\tf\\cfg\\custom.cfg"; //create an autoexec.cfg file
    var lines = [
      "sv_lan 1", //LAN server (!!don't edit!!)          // <------------------------------------------- ADD HERE AUTOEXEC COMMANDS OR SERVER SETTINGS
      "sv_pausable 1",
      "tf_mvm_min_players_to_start 2", //minimun players for start MvsM
      "maxplayers 32",
      "cl_hud_minmode 1", //minimal hud
      "bind F7 pause",
      "bind F8 randommap", //bind F8 as key for randommap command
      "engine_no_focus_sleep 0", // unlimited FPS on all screens (!!don't edit!!)
      "sv_cheats 1", //enable cheats
      "mp_idledealmethod 0", //afk mode kick (0=disabled)
      "mp_idlemaxtime 0", //max time that you can stay afk (0=disabled)
      "mp_showrespawntimes 5", //set the respawn wave time (default is 10)
      //"mp_disable_respawn_times", //instant respawn
      "mapcyclefile mapcycle.txt"
    ];
    Context.WriteTextFile(autoExec, lines);
  }

  // now will add new lines inside the autoexec.cfg file in context of the graphic option the user chosen in the Nucleus UI
  if (gra == "Low" && low == "No") {
    //the line "r_rootlod 2" will be written inside the autoexec.cfg file created with the var autoExec.
    lines.push("r_rootlod 2");

    lines.push("r_waterforceexpensive 0");
    lines.push("r_shadowrendertotexture 0");
    lines.push("mat_picmip 2");
    lines.push("mat_reducefillrate 1");
    lines.push("mat_antialias 1/0");
    lines.push("mat_aaquality 0");
    lines.push("mat_forceaniso 0");
    lines.push("mat_trilinear 0");
    lines.push("mat_hdr_level 0");
  }
  if (gra == "Medium" && low == "No") {
    lines.push("r_rootlod 1");
    lines.push("r_waterforceexpensive 1");
    lines.push("r_shadowrendertotexture 0");
    lines.push("mat_picmip 1");
    lines.push("mat_reducefillrate 1");
    lines.push("mat_antialias 4");
    lines.push("mat_aaquality 0");
    lines.push("mat_forceaniso 4");
    lines.push("mat_trilinear 0");
    lines.push("mat_hdr_level 1");
  }
  if (gra == "High" && low == "No") {
    lines.push("r_rootlod 0");
    lines.push("r_waterforceexpensive 1");
    lines.push("r_flashlightdepthtexture 1");
    lines.push("mat_picmip 0");
    lines.push("mat_reducefillrate 1");
    lines.push("mat_antialias 4");
    lines.push("mat_aaquality 2");
    lines.push("mat_forceaniso 16");
    lines.push("mat_trilinear 1");
    lines.push("mat_hdr_level 2");
  }
  if (gra == "Manual" && low == "No") {
  }

  //Now we are gonna disable the controllers for the keyboard player.
  //This IF will be "used" if the current instance has a player that use the Keyboard
  if (Player.IsKeyboardPlayer) {
    lines.push("m_rawinput 1");
    lines.push("joystick 0");
    lines.push("exec undo360controller.cfg");
    lines.push("host_writeconfig");
  }

  //Now we are gonna enable the controllers for gamepads players
  //while other inputs (controllers)
  else {
    lines.push("m_rawinput 0");
    lines.push("exec 360controller.cfg");
    lines.push("bind p player_ready_toggle");
    lines.push('alias "togglescores" "player_ready_toggle"');
    lines.push('bind "JOY4" "togglescores"');
    lines.push('bind "JOY9" "toggle_duck"');
    lines.push("host_writeconfig");
  }

  /*
These lines will make the first player start normally while the other ones will connect to the local IP at the startup.
However, in the case an IP is entered in the starting prompt, all the players will connect to that IP.*/

  //This IF will be "used" if the initial prompt is blank
  if (Context.CustomUserGeneralValues[0] == null) {
    //This IF will be "used" if the instance is the first player
    if (Context.PlayerID == 0) {
      /*This line create the variabile "map" defined as the map chosen in the Nucleus UI by the User.	
	For example, if the user choose the first map, the var map will be "ctf_2fort" ({ Name: "2Fort", Details: "Capture the Flag", Console: "ctf_2fort", ImageUrl: "2Fort.png" })*/
      var map = Context.Options["MapID"].Console;

      //This IF will be "used" if the variable map is different from ""
      if (map != "") {
        lines.push("map " + map);

        Context.WriteTextFile(autoExec, lines);
      }
    }

    //Here what happens if the instance is a different player from the first one
    else {
      //Context.LocalIP will return the User local IP for let the Source-Engine command "connect" to be used correctly.
      lines.push("connect " + Context.LocalIP);
    }

    Context.WriteTextFile(autoExec, lines);
  }
  //This IF will be "used" if the initial prompt contains something
  else if (Context.CustomUserGeneralValues[0] != null) {
    lines.push("connect " + Context.CustomUserGeneralValues[0]);
  }

  Context.WriteTextFile(autoExec, lines);

  //We will use different input dll in context the number of controllers
  // If the total of controllers are less then 5
  if (Context.NumControllers < 5) {
    //You can use some Game. lines inside Game.Play = function() but is not guaranteed that all will works.
  }

  // If the total of controllers are more than 5
  else {
    //CustomDll will overwrite the XinputPlus dlls if there are more than 5 controllers
    Game.Hook.CustomDllEnabled = true;
    Game.Hook.XInputNames = ["xinput1_4.dll"];
  }
};

//by Bizzo :^)