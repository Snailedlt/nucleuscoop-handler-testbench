Hub.Handler.Version = 42; // Released at https://hub.splitscreen.me/ on Wed Dec 03 2025 23:36:38 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ZeCGPXaap5Dzs5PXc";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["No", "Yes"];
var answers1 = [
  "-",
  "Abandoned School",
  "Alcatraz",
  "Backlot",
  "Backrooms",
  "Berlin Bank",
  "Clinic Of Evil",
  "Dead Ship",
  "HelloKittyRemastered",
  "Kino Rezurrection",
  "Kino - The Rebirth",
  "Kino The Rebirth V4",
  "Leviathan",
  "Nach Reimagined",
  "Nacht Der Toten Walder",
  "Oil Rig",
  "Pistol Defense",
  "sanatorium",
  "Spongebob",
  "SuperMario64",
  "Swan",
  "TheCrazyPlace",
  "TMG castle",
  "UGX Comosea",
  "UGX Requiem",
  "zm_minecraft",
  "Zombie Sumpf"
];
var answers2 = ["Default", "Yes", "No"];
var answers3 = ["No", "720p", "1080p"];
var answers4 = ["Default", "Yes", "No"];
var answers5 = ["-", "vsync", "30", "45", "60", "90", "120", "200"];
var answers6 = ["Default", "Low", "Med", "High", "Extra"];
var answers7 = ["Campaign/Zombies", "Multiplayer"];
var answers8 = ["9", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
var answers9 = ["2", "1", "3", "4", "5", "6", "7", "8", "0"];
var answers10 = [
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
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "100",
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108",
  "109",
  "110",
  "111",
  "112",
  "113",
  "114",
  "115",
  "116",
  "117",
  "118",
  "119",
  "120",
  "121",
  "122",
  "123",
  "124",
  "125",
  "126",
  "127",
  "128",
  "129",
  "130",
  "131",
  "132",
  "133",
  "134",
  "135",
  "136",
  "137",
  "138",
  "139",
  "140",
  "141",
  "142",
  "143",
  "144",
  "145",
  "146",
  "147",
  "148",
  "149",
  "150",
  "151",
  "152",
  "153",
  "154",
  "155",
  "156",
  "157",
  "158",
  "159",
  "160",
  "161",
  "162",
  "163",
  "164",
  "165",
  "166",
  "167",
  "168",
  "169",
  "170",
  "171",
  "172",
  "173",
  "174",
  "175",
  "176",
  "177",
  "178",
  "179",
  "180",
  "181",
  "182",
  "183",
  "184",
  "185",
  "186",
  "187",
  "188",
  "189",
  "190",
  "191",
  "192",
  "193",
  "194",
  "195",
  "196",
  "197",
  "198",
  "199",
  "200"
];
var answers11 = ["1", "2", "3", "4"];
var answers12 = ["-", "1", "1.1", "1.2", "1.3", "1.4", "1.5"];
var answers13 = ["Default", "unlockall"];
var answers14 = [
  "N/A",
  "mp_airfield",
  "mp_asylum",
  "mp_kwai",
  "mp_drum",
  "mp_bgate",
  "mp_castle",
  "mp_shrine",
  "mp_stalingrad",
  "mp_courtyard",
  "mp_dome",
  "mp_downfall",
  "mp_hangar",
  "mp_kneedeep",
  "mp_makin",
  "mp_makin_day",
  "mp_nachtfeuer ",
  "mp_outskirts",
  "mp_vodka",
  "mp_roundhouse",
  "mp_seelow",
  "mp_subway",
  "mp_docks",
  "mp_suburban"
];
var answers15 = ["tdm", "dm", "dom", "sab", "sd", "ctf", "koth", "twar"];
Game.AddOption("Select preferred game mode", "", "mode", answers7);
Game.AddOption("Choose your preferred graphic settings", "Default will use the previous or default settings", "Graphics", answers6);
Game.AddOption("Select Custom Mod for Zombies", "Only valid for Zombies and will need to be manually launched for each instance", "Mod", answers1);
Game.AddOption("Select the number of players for Zombies and Campaign", "", "Players", answers11);
Game.AddOption("Select your preferred game mode for Multiplayer", "Only required if you plan to launch a dedicated server", "Mode", answers15);
Game.AddOption("Select your preferred map for Multiplayer", "Only required if you plan to launch a dedicated server", "Map", answers14);
Game.AddOption("Select the number of allied bots", "Includes: Marine Raiders, Red Army", "Allies", answers8);
Game.AddOption("Select the number of axis bots", "Includes: Imperial Army, Wehrmacht", "Axis", answers8);
Game.AddOption("Select the bot skill level for Multiplayer", "", "Skill", answers9);
Game.AddOption("For LAN and only for Guest PC, select the last digits of the host IP", "", "Lan", answers10);
Game.AddOption("Enable music only in the first instance?", "Default will use the previous or default settings", "Mus", answers2);
Game.AddOption("Select the FPS Cap the game will use", "", "FPS", answers5);
Game.AddOption("Swap shoulder and trigger buttons (useful for Playstation controllers)", "Default will use the previous or default settings", "pscontrollers", answers4);
Game.AddOption("Select your preferred FOV scale", "Select the hyphen to load default settings", "FOV", answers12);
Game.AddOption("Would you like to unlock all", "Default will not make any changes and keep the previous selected settings", "Unlockall", answers13);
Game.FileSymlinkExclusions = ["d3d9.dll", "Xinputplus.ini", "xinput1_4.dll", "xinput1_3.dll"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.UseNucleusEnvironment = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "CoDWaW.exe";
Game.LauncherExe = "Plutonium/launch.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.BinariesFolder = "";
Game.SteamID = "10090";
Game.GUID = "Call of Duty World at War";
Game.GameName = "Call of Duty World at War";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.Hook.ForceFocus = false;
Game.HasDynamicWindowTitle = false;
Game.HookFocus = false;
Game.FakeFocus = false;
Game.FakeFocusSendActivate = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.InjectHookXinput = false;
Game.PromptBetweenInstances = false;
Game.ProcessChangesAtEnd = false;
Game.ResetWindows = false;
Game.SetWindowHookStart = false;
Game.DontRemoveBorders = true;
Game.DontResize = true;
Game.DontReposition = true;
Game.PreventWindowDeactivation = false;
Game.KeyboardPlayerSkipPreventWindowDeactivate = false;
Game.SetForegroundWindowElsewhere = false;
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 25;
Game.PauseBetweenStarts = 0;
Game.KillProcessesOnClose = ["connect", "cmd", "AutoIt3", "Powershell"];
Game.Description =
  "Supports up to 4 gamepads as well as mice/keyboards.\n\nFor best compatibility, it is advisable to close steam, and when playing with both gamepads and mice/Keyboards, to assign your gamepads first and last mice/keyboards.\n\nYou will need to download the complementary files from the following link: https://www.mediafire.com/file/hpvrhruhgigw2yf/handler_files.zip/file and extract the zipped content (password is 1234) to your Call of Duty World at War handler folder located under NucleusCo-op/handlers/Call of Duty World at War/.\n\nFor Campaign/Zombies, prior to launching your instances, choose the number of players under the launch options in Nucleus.\n\nOnce the instances have finished opening and resizing have the first player setup a solo match, once the match has started, press F2 or press the SELECT+X buttons simultaneously on your gamepad to launch the match and to automatically connect all instances (please be patient as this can take some time).\n\nOnce in game, press F3 or press the SELECT+Y buttons simultaneously on your gamepad to quickly restart match.\n\nTo use modded zombie maps, place your mod in the Modded maps folder located under NucleusCo-op, handlers, CoDWaW, and at the launch options screen in Nucleus select your mod.\n\nFor Multiplayer, Option 1: launch your instances and have the first player host a match. Once in game, press F2 or press the SELECT+X buttons simultaneously on your gamepad to have all the other instances connect automatically.\n\nFor Multiplayer Option 2 (my preferred option, as it vastly improves FPS when playing with bots): Start a LAN dedicated server by selecting the game map and game mode under the Nucleus multiplayer map option. Once all the instances have finished opening and resizing, press F2 or SELECT+X on gamepad to connect to the LAN dedicated server.\n\nTo quickly restart your match press F3 or press the SELECT+Y buttons simultaneously on your gamepad.\n\nTo play over LAN with other PCs, ONLY the guest PC will need to select the last 1-3 digits of the Host PC's IP address in the launch options, then once all the instances have finished positionin/resizing, press F2 or press the SELECT+X buttons simultaneously on your gamepad to connect all the guest instances to the host PC.\n\nThe winject32.exe may be blocked or flagged by windows defender as a potential viruse/threat, but I can guarantee it is none other than a false/positive as I got the injector from the following link https://www.unknowncheats.me/forum/general-programming-and-reversing/518833-winject-windows-injector.html and has been analyzed and cleared by one of their moderators.\n\nLast but not least, enjoy playing this awesome CoD game with friends and family!";

Game.SupportsMultipleKeyboardsAndMice = true;

Game.Play = function() {
  // Deprecated options
  Game.HookSetCursorPos = false;
  Game.HookGetCursorPos = false;
  Game.HookGetKeyState = false;
  Game.HookGetAsyncKeyState = false;
  Game.HookGetKeyboardState = false;
  Game.HookFilterRawInput = false;
  Game.HookFilterMouseMessages = false;
  Game.HookUseLegacyInput = false;
  Game.HookDontUpdateLegacyInMouseMsg = false;
  Game.HookMouseVisibility = false;
  Game.SendNormalMouseInput = false;
  Game.SendNormalKeyboardInput = false;
  Game.SendScrollWheel = false;
  Game.ForwardRawKeyboardInput = false;
  Game.ForwardRawMouseInput = false;
  Game.DrawFakeMouseCursor = false;
  Game.LockInputAtStart = false;
  Game.LockInputSuspendsExplorer = false;
  Game.LockInputToggleKey = 0x23;

  Game.ExecutableName = "plutonium-bootstrapper-win32.exe";

  Context.RunAdditionalFiles([Context.ScriptFolder + "\\F3Restart.bat"], false, 10);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\games");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\mods\\mp_bots");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\mods\\mp_bots");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\main");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\english");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\french");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\german");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\italian");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\japanese");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\polish");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\russian");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\spanish");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\mp");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\nazi_zombie_ccube_u");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\sanatorium");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\!start_coop_server.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_coop_server.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\!start_coop_server.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_mp_server.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_mp_server.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\!start_mp_server.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_zm_server.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_zm_server.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\!start_zm_server.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\main\\server.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server_coop.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server_coop.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\main\\server_coop.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server_zm.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server_zm.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\main\\server_zm.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Config files\\config.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Config files\\config_mp.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Config files\\config_mp.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\unlockstats")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\unlockstats");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Config files\\unlockstats");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\AppCore.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\AppCore.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\AppCore.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\discord_game_sdk.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\discord_game_sdk.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\discord_game_sdk.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\plutonium-bootstrapper-win32.exe")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\plutonium-bootstrapper-win32.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\plutonium-bootstrapper-win32.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\plutonium-launcher-win32.exe")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\plutonium-launcher-win32.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\plutonium-launcher-win32.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\Ultralight.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\Ultralight.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\Ultralight.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\UltralightCore.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\UltralightCore.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\UltralightCore.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\WebCore.dll")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\WebCore.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\bin\\WebCore.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\games\\t4mp.exe")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\games\\t4mp.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\games\\t4mp.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\games\\t4sp.exe")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\games\\t4sp.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\games\\t4sp.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\mp\\callbacks.gsc")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\mp\\callbacks.gsc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\raw\\scripts\\mp\\callbacks.gsc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\zm_spawn_fix.gsc")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\zm_spawn_fix.gsc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\raw\\scripts\\sp\\zm_spawn_fix.gsc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\callbacks.gsc")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\callbacks.gsc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\raw\\scripts\\sp\\callbacks.gsc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\sanatorium\\fix_sanatorium.gsc")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\sanatorium\\fix_sanatorium.gsc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\raw\\scripts\\sp\\sanatorium\\fix_sanatorium.gsc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\nazi_zombie_ccube_u\\fix_ccube_u.gsc")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\raw\\scripts\\sp\\nazi_zombie_ccube_u\\fix_ccube_u.gsc");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\raw\\scripts\\sp\\nazi_zombie_ccube_u\\fix_ccube_u.gsc");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\plutonium_ui.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\plutonium_ui.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\plutonium_ui.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\plutonium_ui_mp.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\plutonium_ui_mp.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\plutonium_ui_mp.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\plutonium_mp.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\plutonium_mp.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\plutonium_mp.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\english\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\english\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\english\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\french\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\french\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\french\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\german\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\german\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\german\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\italian\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\italian\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\italian\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\japanese\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\japanese\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\japanese\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\polish\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\polish\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\polish\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\russian\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\russian\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\russian\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\spanish\\localized_plutonium.ff")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\zone\\spanish\\localized_plutonium.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\storage\\t4\\zone\\spanish\\localized_plutonium.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\info.json")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\info.json");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Plutonium\\info.json");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global";
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "osd.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK\\d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\d3d9.ini")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\d3d9.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK\\d3d9.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\d3d9.ini";
  var dict = [
    //Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=" + (Context.Width) + "x" + (Context.Height),
    Context.FindLineNumberInTextFile(txtPath, "SlotReassignment=", Nucleus.SearchType.StartsWith) + "|SlotReassignment=" + (Context.GamepadId - 1) + ""
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\winject32.exe")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\winject32.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winject32.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var FPS = Context.Options["FPS"];
  if (FPS == "-") {
  }
  if (FPS == "vsync") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (FPS == "30") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "30"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "30"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (FPS == "45") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "45"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "45"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (FPS == "60") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "60"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "60"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (FPS == "90") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "90"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "90"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (FPS == "120") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "120"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "120"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (FPS == "200") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "200"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "200"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var mode = Context.Options["mode"];
  var Mod = Context.Options["Mod"];
  var Players = Context.Options["Players"];
  var Unlockall = Context.Options["Unlockall"];

  if (mode == "Campaign/Zombies") {
    Game.LauncherTitle = "Plutonium T4 Co-Op (r5106)";
    Game.Hook.ForceFocusWindowName = "Plutonium T4 Co-Op (r5106)";

    Context.RunAdditionalFiles([Context.ScriptFolder + "\\startsingleplayer.bat"], false, 10);

    if (Mod == "-") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\launcher.bat";
      var lines = [
        "@echo off",
        'CALL "winject32.exe" d3d9.dll -s "bin\\plutonium-bootstrapper-win32.exe" t4sp "%~dp0.." -name "' + Context.Nickname + '" -lan +sp_minplayers "' + Players + '" +"' + Unlockall + '"'
      ];
      Context.WriteTextFile(Bat, lines);

      //      }
    }

    if (Mod > "-") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods.ps1";
      var lines = [
        "# Elevate to run as Administrator if not already",
        'if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {',
        '    Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs',
        "    exit",
        "}",
        "",
        "# Set source and target directories",
        '$SrcRoot = "' + Context.ScriptFolder + '\\Modded maps\\"',
        '$TargetRoot = "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\Plutonium\\storage\\t4\\mods\\"',
        "",
        "# Create directory symlinks for all folders in the source",
        "Get-ChildItem -Path $SrcRoot -Directory | ForEach-Object {",
        "    $sourcePath = $_.FullName",
        "    $linkName = Join-Path $TargetRoot $_.Name",
        "    if (-not (Test-Path $linkName)) {",
        '        cmd /c mklink /D "`"$linkName`"" "`"$sourcePath`""',
        "    }",
        "}",
        "",
        "# Create file symlinks for all files in the source",
        "Get-ChildItem -Path $SrcRoot -File | ForEach-Object {",
        "    $sourcePath = $_.FullName",
        "    $linkName = Join-Path $TargetRoot $_.Name",
        "    if (-not (Test-Path $linkName)) {",
        '        cmd /c mklink "`"$linkName`"" "`"$sourcePath`""',
        "    }",
        "}"
      ];
      Context.WriteTextFile(Bat, lines);

      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods.bat";
      var lines = ["@echo off", 'PowerShell -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File "%~dp0mods.ps1"'];
      Context.WriteTextFile(Bat, lines);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods.bat"], false, 0, false, false);

      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\launcher.bat";
      var lines = [
        "@echo off",
        'CALL "winject32.exe" d3d9.dll -s "bin\\plutonium-bootstrapper-win32.exe" t4sp "%~dp0.." -name "' +
          Context.Nickname +
          '" -lan +sp_minplayers "' +
          Players +
          '" +"' +
          Unlockall +
          '" +set fs_game mods/' +
          Mod +
          ""
      ];
      Context.WriteTextFile(Bat, lines);
    }

    var Lan = Context.Options["Lan"];
    if (Lan == "-") {
      Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2Host.bat"], false, 10);
    }

    if (Lan >= 0) {
      Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2Guest.bat"], false, 10);

      var txtPath = Game.Folder + "\\Local IP.txt";
      var dict = ["192.168.1." + Lan + "      "];
      Context.WriteTextFile(txtPath, dict);
    }

    var Graphics = Context.Options["Graphics"];
    if (Graphics == "Low") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Graphics == "Med") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Graphics == "High") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Graphics == "Extra") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var FOV = Context.Options["FOV"];
    if (FOV >= "0") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [Context.FindLineNumberInTextFile(txtPath, "seta cg_fovScale", Nucleus.SearchType.StartsWith) + '|seta cg_fovScale "' + FOV + '"'];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Context.Nickname + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "auto"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_noborder", Nucleus.SearchType.StartsWith) + '|seta r_noborder "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "' + Context.PosX + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + Context.PosY + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (mode == "Multiplayer") {
    Game.LauncherTitle = "Plutonium T4 Multiplayer (r5106)";
    Game.Hook.ForceFocusWindowName = "Plutonium T4 Multiplayer (r5106)";

    var Skill = Context.Options["Skill"];
    var Allies = Context.Options["Allies"];
    var Axis = Context.Options["Axis"];
    var Bots = +Axis + +Allies;
    var Map = Context.Options["Map"];
    var Mode = Context.Options["Mode"];
    var Unlockall = Context.Options["Unlockall"];

    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\mods\\mp_bots\\z_svr_bots.iwd")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\mods\\mp_bots\\z_svr_bots.iwd");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Bots mod\\z_svr_bots.iwd");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\main\\server.cfg";
    var dict = [
      //Context.FindLineNumberInTextFile(txtPath, "set dedicated", Nucleus.SearchType.StartsWith) + '|set dedicated "1"',
      //Context.FindLineNumberInTextFile(txtPath, "set sv_securityLevel", Nucleus.SearchType.StartsWith) + '|set sv_securityLevel "0"',
      Context.FindLineNumberInTextFile(txtPath, "set sv_maxclients", Nucleus.SearchType.StartsWith) + '|set sv_maxclients "24"',
      Context.FindLineNumberInTextFile(txtPath, "set party_maxplayers", Nucleus.SearchType.StartsWith) + '|set party_maxplayers "24"',
      Context.FindLineNumberInTextFile(txtPath, "set scr_teambalance", Nucleus.SearchType.StartsWith) + '|set scr_teambalance "0"',
      Context.FindLineNumberInTextFile(txtPath, "set sv_maprotation", Nucleus.SearchType.StartsWith) + '|set sv_maprotation "gametype ' + Mode + " map " + Map + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_mp_server.bat";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "set mod=", Nucleus.SearchType.StartsWith) + '|set mod="mods/mp_bots"',
      Context.FindLineNumberInTextFile(txtPath, "cd /D", Nucleus.SearchType.StartsWith) + "|cd /D " + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium",
      Context.FindLineNumberInTextFile(txtPath, "start /wait /abovenormal bin", Nucleus.SearchType.StartsWith) +
        '|start /wait /abovenormal bin\\plutonium-bootstrapper-win32.exe t4mp "%gamepath%" -dedicated -lan +set fs_game %mod% +exec %cfg% +set bots_main_firstIsHost "1" +set bots_manage_fill "' +
        Bots +
        '" +set bots_manage_fill_kick "1" +set bots_manage_fill_mode "1" +set bots_skill "' +
        Skill +
        '" +set bots_manage_fill_watchplayers "1" +set bots_manage_fill_spec "0" +set bots_main_menu "0" +set bots_team "custom" +set bots_team_amount "' +
        Axis +
        '" +set bots_main_firstIsHost "1" +set bots_team_force "1" +set bots_team_mode "1" +exec z_svr_bots.cfg +set net_port %port% +map_rotate'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    if (Context.PlayerID == 0) {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\launcher.bat";
      var lines = [
        "@echo off",
        "timeout /t 8 /nobreak >nul",
        'CALL "winject32.exe" d3d9.dll -s "bin\\plutonium-bootstrapper-win32.exe" t4mp "%~dp0.." +set bots_manage_fill "' +
          Bots +
          '" -name "' +
          Context.Nickname +
          '" -lan +set bots_manage_fill_kick "1" +set bots_manage_fill_mode "1" +set bots_skill "' +
          Skill +
          '" +set bots_manage_fill_watchplayers "1" +set bots_main_menu "0" +set bots_team "custom" +set bots_team_amount "' +
          Axis +
          '" +set bots_main_firstIsHost "1" +set bots_team_force "1" +set bots_manage_fill_spec "0" +set bots_team_mode "1" +exec z_svr_bots.cfg'
      ];
      Context.WriteTextFile(Bat, lines);
    } else {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\launcher.bat";
      var lines = [
        "@echo off",
        'CALL "winject32.exe" d3d9.dll -s "bin\\plutonium-bootstrapper-win32.exe" t4mp "%~dp0.." +set bots_manage_fill "' +
          Bots +
          '" -name "' +
          Context.Nickname +
          '" -lan +set bots_manage_fill_kick "1" +set bots_manage_fill_mode "1" +set bots_skill "' +
          Skill +
          '" +set bots_manage_fill_watchplayers "1" +set bots_main_menu "0" +set bots_team "custom" +set bots_team_amount "' +
          Axis +
          '" +set bots_main_firstIsHost "1" +set bots_team_force "1" +set bots_manage_fill_spec "0" +set bots_team_mode "1" +exec z_svr_bots.cfg'
      ];
      Context.WriteTextFile(Bat, lines);
    }
    var Map = Context.Options["Map"];
    var Lan = Context.Options["Lan"];

    if (Lan == "-") {
      if (Map == "N/A") {
        Context.RunAdditionalFiles([Context.ScriptFolder + "\\startmultiplayer.bat"], false, 0);

        Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2HostMP.bat"], false, 0);
      }
    }
    if (Lan == "-") {
      if (Map > "N/A") {
        Context.RunAdditionalFiles([Context.ScriptFolder + "\\startmultiplayerdedicated.bat"], false, 0);
        Context.RunAdditionalFiles([Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\!start_mp_server.bat"], false, 0);
        Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2HostMPDedicated.bat"], false, 0);
      }
    }

    if (Map == "N/A") {
      if (Lan >= 0) {
        Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2Guest.bat"], false, 10);
        Context.RunAdditionalFiles([Context.ScriptFolder + "\\startmultiplayer.bat"], false, 0);

        var txtPath = Game.Folder + "\\Local IP.txt";
        var dict = ["192.168.1." + Lan + "      "];
        Context.WriteTextFile(txtPath, dict);
      }
    }

    var Graphics = Context.Options["Graphics"];
    if (Graphics == "Low") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Graphics == "Med") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "2"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Graphics == "High") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Graphics == "Extra") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var Unlockall = Context.Options["Unlockall"];
    if (Unlockall == "-") {
    }
    if (Unlockall == "unlockall") {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\mpdata");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Unlockall\\Multiplayer\\mpdata");
      System.IO.File.Copy(savePkgOrigin, savePath, true);

      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\mpdatabk0000");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Unlockall\\Multiplayer\\mpdatabk0000");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var FOV = Context.Options["FOV"];
    if (FOV >= "0") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [Context.FindLineNumberInTextFile(txtPath, "seta cg_fovScale", Nucleus.SearchType.StartsWith) + '|seta cg_fovScale "' + FOV + '"'];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [Context.FindLineNumberInTextFile(txtPath, "seta cg_fovScale", Nucleus.SearchType.StartsWith) + '|seta cg_fovScale "' + FOV + '"'];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Context.Nickname + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "auto"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_noborder", Nucleus.SearchType.StartsWith) + '|seta r_noborder "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "' + Context.PosX + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + Context.PosY + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Context.Nickname + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "auto"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_noborder", Nucleus.SearchType.StartsWith) + '|seta r_noborder "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "' + Context.PosX + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + Context.PosY + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "Default") {
  }
  if (pscontrollers == "Yes") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+attack"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonsConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonsConfig "buttons_default_alt"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+attack"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonsConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonsConfig "buttons_default_alt"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+attack"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonsConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonsConfig "buttons_default_alt"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "No") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+attack"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+attack"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+attack"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var Mus = Context.Options["Mus"];
  if (Mus == "Default") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (Mus == "Yes") {
    if (Context.PlayerID == 0) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    } else {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }
  if (Mus == "No") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\storage\\t4\\players\\profiles\\$$$\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  //  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Registry.bat";
  //  var lines = [
  //    "@ECHO OFF",
  //    "set %~dp0=",
  //    'REG ADD "HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "' +
  //      Context.GetFolder(Nucleus.Folder.InstancedGameFolder) +
  //      '\\Plutonium\\bin\\plutonium-bootstrapper-win32.exe" /t REG_SZ /d "HIGHDPIAWARE" /f',
  //    "exit"
  //  ];
  //  Context.WriteTextFile(Bat, lines);

  //Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Registry.bat"], false, 0, true, false);

  Context.EditRegKey(
    "HKEY_CURRENT_USER",
    "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers",
    "" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\plutonium-bootstrapper-win32.exe",
    "HIGHDPIAWARE",
    Nucleus.RegType.String
  );

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\launcher.bat"], false, 0);

  if (Player.IsRawKeyboard) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\d3d9.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "DontHookWndProc=", Nucleus.SearchType.StartsWith) + "|DontHookWndProc=true",
      Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=false",
      Context.FindLineNumberInTextFile(txtPath, "AlwaysOnTop=", Nucleus.SearchType.StartsWith) + "|AlwaysOnTop=0",
      Context.FindLineNumberInTextFile(txtPath, "d3d11=", Nucleus.SearchType.StartsWith) + "|d3d11=false"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Plutonium\\bin\\d3d9.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "DontHookWndProc=", Nucleus.SearchType.StartsWith) + "|DontHookWndProc=false",
      Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=true",
      Context.FindLineNumberInTextFile(txtPath, "AlwaysOnTop=", Nucleus.SearchType.StartsWith) + "|AlwaysOnTop=1",
      Context.FindLineNumberInTextFile(txtPath, "d3d11=", Nucleus.SearchType.StartsWith) + "|d3d11=true"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Player.IsRawKeyboard) {
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
    Game.ProtoInput.FindWindowHook = true;
    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = false;
    Game.ProtoInput.MessageFilterHook = true;
    Game.ProtoInput.GetCursorPosHook = false;
    Game.ProtoInput.SetCursorPosHook = false;
    Game.ProtoInput.GetKeyStateHook = false;
    Game.ProtoInput.GetAsyncKeyStateHook = false;
    Game.ProtoInput.GetKeyboardStateHook = false;
    Game.ProtoInput.CursorVisibilityHook = true;
    Game.ProtoInput.ClipCursorHook = true;
    Game.ProtoInput.FocusHooks = false;
    Game.ProtoInput.DrawFakeCursor = false;
    Game.ProtoInput.RawInputFilter = false;
    Game.ProtoInput.MouseMoveFilter = false;
    Game.ProtoInput.MouseActivateFilter = false;
    Game.ProtoInput.WindowActivateFilter = false;
    Game.ProtoInput.WindowActvateAppFilter = false;
    Game.ProtoInput.MouseWheelFilter = false;
    Game.ProtoInput.MouseButtonFilter = false;
    Game.ProtoInput.KeyboardButtonFilter = true;
    Game.ProtoInput.SendMouseWheelMessages = true;
    Game.ProtoInput.SendMouseButtonMessages = true;
    Game.ProtoInput.SendMouseMovementMessages = true;
    Game.ProtoInput.SendKeyboardButtonMessages = true;

    Game.ProtoInput.EnableFocusMessageLoop = false;
    Game.ProtoInput.FocusLoopIntervalMilliseconds = 0;
    Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
    Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
    Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
    Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
    Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
    Game.ProtoInput.BlockedMessages = [];
    Game.ProtoInput.RenameHandlesHook = false;
    Game.ProtoInput.RenameHandles = [];
    Game.ProtoInput.RenameNamedPipes = [];
  }

  if (Player.IsRawKeyboard) {
    Game.ProtoInput.OnInputLocked = function() {
      for (var i = 0; i < PlayerList.Count; i++) {
        var player = PlayerList[i];
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, true, true, true, true);
        System.Threading.Thread.Sleep(1000);
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
        ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      }
    };
  }
  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
    }
  };
};