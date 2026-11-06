Hub.Handler.Version = 23; // Released at https://hub.splitscreen.me/ on Wed Dec 03 2025 23:31:39 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "esp2D3Wr49B3EBkbX";
Hub.Maintainer.Name = "Perserveruz";
Hub.Maintainer.Id = "nFAYvHKj75jAFRAgt";

var answers = ["8", "0", "1", "2", "3", "4", "5", "6", "7"]; //any higher number will make teams unbalanced and won't allow you to change teams
var answers1 = ["3", "1", "2", "4", "5", "6", "7", "8", "0"];
var answers2 = ["No", "Yes"];
var answers3 = ["Yes", "No"];
var answers4 = ["60", "45", "30", "0"];
var answers5 = ["Default", "Yes", "No"];
var answers6 = [
  "-",
  "0",
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
var answers7 = ["Default", "Low", "Med", "High", "Extra"];
var answers8 = [
  "mp_abandon",
  "mp_afghan",
  "mp_alpha",
  "mp_backlot",
  "mp_bloc",
  "mp_bloc_sh",
  "mp_bog_sh",
  "mp_boneyard",
  "mp_bravo",
  "mp_brecourt",
  "mp_broadcast",
  "mp_carentan",
  "mp_cargoship",
  "mp_cargoship_sh",
  "mp_checkpoint",
  "mp_citystreets",
  "mp_compact",
  "mp_complex",
  "mp_convoy",
  "mp_countdown",
  "mp_crash",
  "mp_crash_snow",
  "mp_crash_tropical",
  "mp_cross_fire",
  "mp_derail",
  "mp_dome",
  "mp_estate",
  "mp_estate_tropical",
  "mp_farm",
  "mp_favela",
  "mp_fav_tropical",
  "mp_firingrange",
  "mp_fuel2",
  "mp_hardhat",
  "mp_highrise",
  "mp_invasion",
  "mp_killhouse",
  "mp_nightshift",
  "mp_nuked",
  "mp_overgrown",
  "mp_paris",
  "mp_pipeline",
  "mp_plaza2",
  "mp_quarry",
  "mp_rundown",
  "mp_rust",
  "mp_rust_long",
  "mp_seatown",
  "mp_shipment",
  "mp_shipment_long",
  "mp_showdown",
  "mp_storm",
  "mp_storm_spring",
  "mp_strike",
  "mp_subbase",
  "mp_terminal",
  "mp_trailerpark",
  "mp_underground",
  "mp_underpass",
  "mp_vacant",
  "mp_village"
];
var answers9 = ["war", "dm", "dom", "koth", "sab", "sd", "arena", "dd", "ctf", "oneflag", "gtnw"];
var answers10 = ["Dedicated", "None"];
var answers11 = ["-", "1.1", "1.2", "1.3", "1.4", "1.5"];
Game.AddOption("Launch a dedicated server", "Select None if you wish to play on iw4x servers", "Dedicated", answers10);
Game.AddOption(
  "Select Map",
  "abandon=carnival, alpha=lockdown, bloc_sh=forgotten city, boneyard=scrapyard, bravo=mission, brecourt=wasteland, carentan=chinatown, checkpoint=karachi, compact=salvage, complex=bailout, convoy=ambush, farm=downpour, nightshift=skidrow, plaza2=arkaden, storm_spring=chemical plant",
  "Map",
  answers8
);
Game.AddOption("Select Game Mode", "war=Team DM, dm=free for all, dom=domination, koth=headquarters, sab=sabotage, sd=search and destroy", "Mode", answers9);
Game.AddOption("Select the number of allied bots", "Includes: TF141, Rangers, S.A.S.", "Allies", answers);
Game.AddOption("Select the number of axis bots", "Includes: Militia, Spetsnaz, OpFor", "Axis", answers);
Game.AddOption("Select the bot skill level", "", "Skill", answers1);
Game.AddOption("Unlock all stats", "", "Unlock", answers2);
Game.AddOption("Choose your preferred graphic settings", "Default will use the previous or default settings", "Graphics", answers7);
Game.AddOption("Enable music only in the first instance?", "", "Mus", answers3);
Game.AddOption("For LAN and only for Guest PC, select the last 1-3 digits of the host IP", "", "lan", answers6);
Game.AddOption("Swap shoulder and trigger buttons (useful for Playstation controllers)", "Default will use the previous or default settings", "pscontrollers", answers5);
Game.AddOption("Select the FPS Cap the game will use", "", "FPS", answers4);
Game.AddOption("Select your preferred FOV", "Select the hyphen to load default settings", "FOV", answers11);
Game.AddOption("Would you like to enable Third Person View", "Default will use the previous or default settings", "Third", answers5);
Game.FileSymlinkExclusions = [
  "d3d9.dll",
  "d3d9.ini",
  "Xinputplus.ini",
  "xinput1_4.dll",
  "xinput1_3.dll",
  "iw4x_config.cfg",
  "iw4x.dll",
  "iw4x.exe",
  "guid.dat",
  "iw4x.stat",
  "nodes.dat",
  "settings_c.zip.iw4",
  "settings_s.zip.iw4",
  "iw4xsp_config.cfg"
];
Game.DirExclusions = ["miles", "userraw", "logs", "players"];
Game.UseForceBindIP = false;
Game.SymlinkGame = true;
Game.SymlinkExe = false;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.SupportsKeyboard = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.ExecutableName = "iw4mp.exe";
Game.ExecutableToLaunch = "iw4x.exe";
Game.NeedsSteamEmulation = false;
Game.SteamID = "";
Game.GUID = "Call of Duty Modern Warfare 2";
Game.GameName = "Call of Duty Modern Warfare 2";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "IW4x: Multiplayer";
Game.HasDynamicWindowTitle = false;
Game.HookFocus = false;
Game.FakeFocus = false;
Game.SendFakeFocusMsg = false;
Game.PreventWindowDeactivation = false;
Game.KeyboardPlayerSkipPreventWindowDeactivate = false;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.InjectHookXinput = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.BlockRawInput = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.SetForegroundWindowElsewhere = true;
Game.KillProcessesOnClose = ["connect", "cmd", "AutoIt3"];
Game.DontResize = false;
Game.DontRemoveBorders = true;
Game.DontReposition = false;
Game.ResetWindows = true;
Game.ProcessChangesAtEnd = false;
Game.RefreshWindowAfterStart = false;
Game.HideTaskbar = false;
Game.SetTopMostAtEnd = true;
Game.PauseBetweenProcessGrab = 20;
Game.PauseBetweenStarts = 0;
Game.PauseBetweenContextAndLaunch = 5;
Game.UserProfileSavePath = "AppData\\Local\\iw4x";
Game.Description =
  "Supports both gamepads and mice/keyboards, and up to 8 players in splitscreen.\n\nRequires an original copy of Call of Duty Modern Warfare 2, game files must be in English, IW4x raw files (current version used is v0.2.21 and can be found at https://github.com/iw4x/iw4x-rawfiles/releases/tag/v0.2.21) and preferably the IW4x DLC map pack.\n\nYou will need to extract the iw4x raw files and the DLC maps in the Call of Duty Modern Warfare 2/iw4x handler folder. The password to extract the DLC maps is 1234.\n\nFor a more detailed guide and links to the DLC maps please visit the following link https://hub.splitscreen.me/handler/esp2D3Wr49B3EBkbX.\n\nSetup your instances by assigning your desired number of gamepads and/or mice&keyboards.\n\nOnce done press next to choose the settings for your dedicated LAN server (i.e. map, game mode, number of bots, skills) and press play.\n\nOnce your instances have finished resizing and repositioning, press F2 or press the SELECT+X buttons on your gamepad to connect all the instances to the dedicated LAN server.\n\nIf you wish to use multiple mouse/keyboard, you will need to lock input by pressing the end key. Press the end key again to unlock the input. When locking input, the game may freeze temporarily but just be patient and it will work.\n\nPlease note that if the input is locked then the hotkeys may not work so only lock input by pressing the end key once everyone is connected to the match.\n\nOnce your instances are in the match, your can quickly restart the match by simply pressing F3 or the SELECT+Y buttons on your gamepad.\n\nOnline play on IW4x servers also works, however you will need to select None under the select Mod option.\n\nTo play over LAN, the guest PC will need to select the last 1-3 digits of the IP address of the Host PC. Once the instances have finished positioning and resizing, press F2 or SELECT+X buttons on gamepad. Spec Ops mode is currently not supported. Have fun playing splitscreen!!!";

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

  Game.ExecutableName = "iw4x.exe";

  Context.RunAdditionalFiles([Context.ScriptFolder + "\\Prompt.bat"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\Prompt2.bat"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\Prompt3.bat"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\F3Restart.bat"], false, 10);

  if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\logs\\crash.log"))) {
    System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\logs\\crash.log"));
  }

  if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\__iw4sp"))) {
    System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\__iw4sp"));
  }

  //if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nodes.json"))) {
  //  System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\nodes.json"));
  //}

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\iw4x");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedLobbyServer.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedLobbyServer.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\DedicatedLobbyServer.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedLobbyServerLAN.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedLobbyServerLAN.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\DedicatedLobbyServerLAN.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedServer.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedServer.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\DedicatedServer.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedServerLAN.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dedicated Server\\DedicatedServerLAN.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\DedicatedServerLAN.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\LANPlaylist.info")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\LANPlaylist.info");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "userraw\\LANPlaylist.info");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\myplaylists.info")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\myplaylists.info");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "userraw\\myplaylists.info");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\partyserver.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\partyserver.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "userraw\\partyserver.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\partyserverlan.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\partyserverlan.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "userraw\\partyserverlan.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\server.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\server.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "userraw\\server.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\serverlan.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\serverlan.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "userraw\\serverlan.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\bots");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK\\d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK\\d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\iw4x.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "iw4x\\iw4x.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\iw4x.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "iw4x\\iw4x.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "iw4x\\iw4x_config.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DedicatedServerLAN.bat")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DedicatedServerLAN.bat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Dedicated Server\\DedicatedServerLAN.bat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "osd.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "seta sys_configSum", Nucleus.SearchType.StartsWith) + '|seta sys_configSum ""',
    Context.FindLineNumberInTextFile(txtPath, "sys_configureGHz", Nucleus.SearchType.StartsWith) + '|sys_configureGHz ""',
    Context.FindLineNumberInTextFile(txtPath, "seta sys_gpu", Nucleus.SearchType.StartsWith) + '|seta sys_gpu ""',
    Context.FindLineNumberInTextFile(txtPath, "seta sys_sysMB", Nucleus.SearchType.StartsWith) + '|seta sys_sysMB ""'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\iw4x.ps1";
  var lines = [
    "# Elevate to run as Administrator if not already",
    'if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {',
    '    Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs',
    "    exit",
    "}",
    "",
    "# Function to create symlinks from source to target",
    "function Link-Files ($SrcRoot, $TargetRoot) {",
    "    # Ensure target root exists",
    "    if (-not (Test-Path $TargetRoot)) {",
    "        New-Item -ItemType Directory -Path $TargetRoot | Out-Null",
    "    }",
    "",
    "    # Make sure all source directories exist in the target (but do not symlink them)",
    "    Get-ChildItem -Path $SrcRoot -Directory | ForEach-Object {",
    "        $destDir = Join-Path $TargetRoot $_.Name",
    "        if (-not (Test-Path $destDir)) {",
    "            New-Item -ItemType Directory -Path $destDir | Out-Null",
    "        }",
    "    }",
    "",
    "    # Create file symlinks (skip if file already exists at destination)",
    "    Get-ChildItem -Path $SrcRoot -Recurse -File | ForEach-Object {",
    "        $relativePath = $_.FullName.Substring($SrcRoot.Length)",
    "        $destPath = Join-Path $TargetRoot $relativePath",
    "        $destDir = Split-Path $destPath",
    "",
    "        # Ensure parent directory exists",
    "        if (-not (Test-Path $destDir)) {",
    "            New-Item -ItemType Directory -Path $destDir -Force | Out-Null",
    "        }",
    "",
    "        # Only create symlink if the file doesn't already exist",
    "        if (-not (Test-Path $destPath)) {",
    '            cmd /c mklink "`"$destPath`"" "`"$($_.FullName)`""',
    "        }",
    "    }",
    "}",
    "",
    "# Link iw4x folder",
    '$SrcRoot = "' + Context.ScriptFolder + '\\iw4x\\"',
    '$TargetRoot = "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\"',
    "Link-Files $SrcRoot $TargetRoot",
    "",
    "# Link mods folder",
    '$SrcRoot = "' + Context.ScriptFolder + '\\mods\\"',
    '$TargetRoot = "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\mods\\"',
    "Link-Files $SrcRoot $TargetRoot"
  ];
  Context.WriteTextFile(Bat, lines);

  var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\iw4x.bat";
  var lines = ["@echo off", 'PowerShell -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File "%~dp0iw4x.ps1"'];
  Context.WriteTextFile(Bat, lines);

  Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\iw4x.bat"], false, 0, false, false);

  var Unlock = Context.Options["Unlock"];
  if (Unlock == "No") {
  }
  if (Unlock == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x.stat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "iw4x\\iw4x.stat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\bots\\iw4x.stat");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "iw4x\\iw4x.stat");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  var FPS = Context.Options["FPS"];
  var Graphics = Context.Options["Graphics"];
  if (Graphics == "Low") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_rendererPreference", Nucleus.SearchType.StartsWith) + '|seta r_rendererPreference "Shader model 2.0"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_outputConfiguration", Nucleus.SearchType.StartsWith) + '|seta snd_outputConfiguration "Stereo"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Graphics == "Med") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_rendererPreference", Nucleus.SearchType.StartsWith) + '|seta r_rendererPreference "Shader model 2.0"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_outputConfiguration", Nucleus.SearchType.StartsWith) + '|seta snd_outputConfiguration "Stereo"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Graphics == "High") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_rendererPreference", Nucleus.SearchType.StartsWith) + '|seta r_rendererPreference "Shader model 2.0"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_outputConfiguration", Nucleus.SearchType.StartsWith) + '|seta snd_outputConfiguration "Stereo"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Graphics == "Extra") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_rendererPreference", Nucleus.SearchType.StartsWith) + '|seta r_rendererPreference "Shader model 2.0"',
      Context.FindLineNumberInTextFile(txtPath, "seta snd_outputConfiguration", Nucleus.SearchType.StartsWith) + '|seta snd_outputConfiguration "Stereo"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var FOV = Context.Options["FOV"];
  if (FOV == "-") {
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    Context.ReplaceLinesInTextFile(txtPath, [Context.FindLineNumberInTextFile(txtPath, "seta cg_fovScale", Nucleus.SearchType.StartsWith) + '|seta cg_fovScale "' + FOV + '"'], "utf-8");
  }
  var Mus = Context.Options["Mus"];

  if (Mus == "Yes") {
    if (Context.PlayerID == 0) {
      var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles");
      System.IO.Directory.CreateDirectory(filePath);

      if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\milesEq.flt")) {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\milesEq.flt");
        var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\milesEq.flt");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
      if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "miles\\mssds3d.flt")) {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssds3d.flt");
        var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssds3d.flt");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
      if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssdsp.flt")) {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssdsp.flt");
        var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssdsp.flt");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
      if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\msseax.flt")) {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\msseax.flt");
        var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\msseax.flt");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
      if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssmp3.asi")) {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssmp3.asi");
        var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssmp3.asi");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }

      if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssvoice.asi")) {
        var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssvoice.asi");
        var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssvoice.asi");
        System.IO.File.Copy(savePkgOrigin, savePath, true);
      }
    } else {
      if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\milesEq.flt"))) {
        System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\milesEq.flt"));
      }
      if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssds3d.flt"))) {
        System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mssds3d.flt"));
      }
      if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\\\mssdsp.flt"))) {
        System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssdsp.flt"));
      }
      if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\msseax.flt"))) {
        System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\msseax.flt"));
      }
      if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssmp3.asi"))) {
        System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssmp3.asi"));
      }
      if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssvoice.asi"))) {
        System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssvoice.asi"));
      }
    }
  }

  if (Mus == "No") {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles");
    System.IO.Directory.CreateDirectory(filePath);

    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\milesEq.flt")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\milesEq.flt");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\milesEq.flt");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "miles\\mssds3d.flt")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssds3d.flt");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssds3d.flt");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssdsp.flt")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssdsp.flt");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssdsp.flt");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\msseax.flt")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\msseax.flt");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\msseax.flt");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssmp3.asi")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssmp3.asi");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssmp3.asi");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssvoice.asi")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\miles\\mssvoice.asi");
      var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder, "miles\\mssvoice.asi");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "SlotReassignment=", Nucleus.SearchType.StartsWith) + "|SlotReassignment=" + (Context.GamepadId - 1) + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var Mode = Context.Options["Mode"];
  var Map = Context.Options["Map"];
  var Dedicated = Context.Options["Dedicated"];
  var Third = Context.Options["Third"];

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\serverlan.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "set dedicated", Nucleus.SearchType.StartsWith) + '|set dedicated "1"',
    Context.FindLineNumberInTextFile(txtPath, "set sv_securityLevel", Nucleus.SearchType.StartsWith) + '|set sv_securityLevel "1"', // 0 makes clients throw Empty GUID for some reason
    Context.FindLineNumberInTextFile(txtPath, "set scr_teambalance", Nucleus.SearchType.StartsWith) + '|set scr_teambalance "0"',
    Context.FindLineNumberInTextFile(txtPath, "set sv_maxclients", Nucleus.SearchType.StartsWith) + '|set sv_maxclients "24"',
    Context.FindLineNumberInTextFile(txtPath, "set party_maxplayers", Nucleus.SearchType.StartsWith) + '|set party_maxplayers "24"',
    Context.FindLineNumberInTextFile(txtPath, "set sv_maprotation", Nucleus.SearchType.StartsWith) + '|set sv_maprotation "gametype ' + Mode + " map " + Map + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (Third == "Default") {
  }
  if (Third == "No") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\serverlan.cfg";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "set scr_thirdperson", Nucleus.SearchType.StartsWith) + '|set scr_thirdperson "0"'];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (Third == "Yes") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\userraw\\serverlan.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "set scr_thirdperson", Nucleus.SearchType.StartsWith) + '|set scr_thirdperson "1"',
      Context.FindLineNumberInTextFile(txtPath, "set scr_thirdperson", Nucleus.SearchType.StartsWith) + '|set scr_thirdperson "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  var Skill = Context.Options["Skill"];
  var Allies = Context.Options["Allies"];
  var Axis = Context.Options["Axis"];
  var Bots = +Axis + +Allies;

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DedicatedServerLAN.bat";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "set LANMode=", Nucleus.SearchType.StartsWith) + "|set LANMode=1",
    Context.FindLineNumberInTextFile(txtPath, "set ModFolderName=", Nucleus.SearchType.StartsWith) + "|set ModFolderName=mods/bots"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DedicatedServerLAN.bat";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "set LANMode=", Nucleus.SearchType.StartsWith) + "|set LANMode=1",
    Context.FindLineNumberInTextFile(txtPath, "set ModFolderName=", Nucleus.SearchType.StartsWith) + "|set ModFolderName=mods/bots",
    Context.FindLineNumberInTextFile(txtPath, "start iw4x.exe", Nucleus.SearchType.StartsWith) +
      '|start iw4x.exe -nosteam -dedicated +set fs_game "%ModFolderName%" +set bots_main_firstIsHost "1" +set bots_manage_fill "' +
      Bots +
      '" +set bots_manage_fill_kick "1" +set bots_manage_fill_mode "1" +set bots_skill "' +
      Skill +
      '" +set bots_manage_fill_watchplayers "1" +set bots_manage_fill_spec "0" +set bots_main_menu "0" +set bots_team "custom" +set bots_team_amount "' +
      Axis +
      '" +set bots_main_firstIsHost "1" +set bots_team_force "0" +set bots_team_mode "0" +set mp_teams_unbalance_limit "0" +set sv_lanonly "%LANMode%" +set net_port "%GamePort%" +exec %ServerFilename% +set party_enable "0" +map_rotate'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var lan = Context.Options["lan"];

  if (Dedicated == "Dedicated") {
    if (lan == "-") {
      var Args = (Context.Args = ' -nointro -nosteam -console +r_fullscreen 0 +set fs_game "mods/bots" +set sv_securityLevel "0" ');
      Context.StartArguments = Args;

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2HostDedicated.bat"], false, 10);

      Context.RunAdditionalFiles([Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\DedicatedServerLAN.bat"], false, 10);
    }
  }

  if (Dedicated == "Dedicated") {
    if (lan >= 1) {
      var Args = (Context.Args = ' -nointro -console -nosteam +r_fullscreen 0 +set fs_game "mods/bots" +set sv_securityLevel "0" ');
      Context.StartArguments = Args;

      var txtPath = Game.Folder + "\\Local IP.txt";
      var dict = ["192.168.1." + lan + "      "];
      Context.WriteTextFile(txtPath, dict);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2Guest.bat"], false, 10);
    }
  }

  if (Dedicated == "None") {
    if (lan == "-") {
      var Args = (Context.Args =
        ' -nointro -console -nosteam +r_fullscreen 0 +set fs_game "mods/bots" +set bots_main_firstIsHost "1" +set bots_manage_fill "' +
        Bots +
        '" +set bots_manage_fill_kick "1" +set bots_manage_fill_mode "1" +set bots_skill "' +
        Skill +
        '" +set bots_manage_fill_watchplayers "1" +set bots_manage_fill_spec "0" +set bots_main_menu "0" +set bots_team "custom" +set bots_team_amount "' +
        Axis +
        '" +set bots_main_firstIsHost "1" +set bots_team_force "0" +set bots_team_mode "0" +set mp_teams_unbalance_limit "0" +set mp_autoteambalance "0" +set sv_securityLevel "0" ');
      Context.StartArguments = Args;
      Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2Host.bat"], false, 10);
    }
  }

  if (Dedicated == "None") {
    if (lan >= 1) {
      var Args = (Context.Args = ' -nointro -console -nosteam +r_fullscreen 0 +set fs_game "mods/bots" +set sv_securityLevel "0" ');
      Context.StartArguments = Args;

      var txtPath = Game.Folder + "\\Local IP.txt";
      var dict = ["192.168.1." + lan + "      "];
      Context.WriteTextFile(txtPath, dict);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\F2Guest.bat"], false, 10);
    }
  }

  if (Dedicated == "Dedicated") {
    Context.RunAdditionalFiles([Context.ScriptFolder + "\\startDedicated.bat"], false, 10);
  }
  if (Dedicated == "None") {
    Context.RunAdditionalFiles([Context.ScriptFolder + "\\start.bat"], false, 10);
  }

  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "Default") {
  }
  if (pscontrollers == "Yes") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonConfig "buttons_default"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+attack"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+frag"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "No") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonConfig "buttons_default"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+smoke"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+frag"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+speed_throw"',
      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+attack"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var FPS = Context.Options["FPS"];

  if (Context.AspectRatioDecimal < 1.2) {
    if (Context.NumberOfPlayers < 3) {
      Game.DontReposition = true;
      Game.DontResize = true;
      Game.DontRemoveBorders = true;
      Game.Hook.ResWidth = Context.Width;
      Game.Hook.ResHeight = Context.Width / 1.33333;
      Game.ResetWindows = true;

      Context.HideDesktop();

      var FPS = Context.Options["FPS"];
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Width / 1.33333 + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Width / 1.33333 + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_displayMode", Nucleus.SearchType.StartsWith) + '|seta r_displayMode "windowed (no border)"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "custom"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatio "' + Context.AspectRatioDecimal + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Context.Nickname + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta intro", Nucleus.SearchType.StartsWith) + '|seta intro "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + (Context.Height - Context.Width / 1.33333) / 2 + '"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      if (Context.PlayerID == 0) {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "0"',
          Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + (Context.Height - Context.Width / 1.33333) / 2 + '"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      }
      if (Context.PlayerID == 1) {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos "' + Context.Width + '"',
          Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos "' + (Context.Height - Context.Width / 1.33333) / 2 + '"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      }
    }
  }
  if (Context.AspectRatioDecimal > 1.3) {
    Game.DontReposition = false;
    Game.DontResize = false;
    Game.DontRemoveBorders = true;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_displayMode", Nucleus.SearchType.StartsWith) + '|seta r_displayMode "windowed (no border)"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "custom"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatio "' + Context.AspectRatioDecimal + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Context.Nickname + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta intro", Nucleus.SearchType.StartsWith) + '|seta intro "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos ""',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos ""'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Context.NumberOfPlayers > 2) {
    Game.DontReposition = false;
    Game.DontResize = false;
    Game.DontRemoveBorders = true;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_displayMode", Nucleus.SearchType.StartsWith) + '|seta r_displayMode "windowed (no border)"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_aspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_aspectRatio "custom"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customAspectRatio", Nucleus.SearchType.StartsWith) + '|seta r_customAspectRatio "' + Context.AspectRatioDecimal + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta name", Nucleus.SearchType.StartsWith) + '|seta name "' + Context.Nickname + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta intro", Nucleus.SearchType.StartsWith) + '|seta intro "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_useD3D9Ex", Nucleus.SearchType.StartsWith) + '|seta r_useD3D9Ex "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_xpos", Nucleus.SearchType.StartsWith) + '|seta vid_xpos ""',
      Context.FindLineNumberInTextFile(txtPath, "seta vid_ypos", Nucleus.SearchType.StartsWith) + '|seta vid_ypos ""'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Player.IsRawKeyboard) {
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"));
    }

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_lockon_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_lockon_enabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_slowdown_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_slowdown_enabled "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "Enabled=", Nucleus.SearchType.StartsWith) + "|Enabled=false",
      Context.FindLineNumberInTextFile(txtPath, "DisabledToGame=", Nucleus.SearchType.StartsWith) + "|DisabledToGame=false",
      Context.FindLineNumberInTextFile(txtPath, "DontHookWndProc=", Nucleus.SearchType.StartsWith) + "|DontHookWndProc=true",
      Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=false"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  } else {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\iw4x_config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_lockon_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_lockon_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_slowdown_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_slowdown_enabled "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "Enabled=", Nucleus.SearchType.StartsWith) + "|Enabled=false",
      Context.FindLineNumberInTextFile(txtPath, "DisabledToGame=", Nucleus.SearchType.StartsWith) + "|DisabledToGame=false",
      Context.FindLineNumberInTextFile(txtPath, "DontHookWndProc=", Nucleus.SearchType.StartsWith) + "|DontHookWndProc=false",
      Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=true"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Player.IsRawKeyboard) {
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
    Game.ProtoInput.FindWindowHook = true;
    Game.ProtoInput.SetWindowPosHook = false;
    Game.ProtoInput.SetWindowStyleHook = false;
    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.MessageFilterHook = false;
    Game.ProtoInput.GetCursorPosHook = false;
    Game.ProtoInput.SetCursorPosHook = false;
    Game.ProtoInput.GetKeyStateHook = false;
    Game.ProtoInput.GetAsyncKeyStateHook = false;
    Game.ProtoInput.GetKeyboardStateHook = false;
    Game.ProtoInput.CursorVisibilityHook = false;
    Game.ProtoInput.ClipCursorHook = false;
    Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
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
    //Game.ProtoInput.RenameHandlesHook = true;
    //Game.ProtoInput.RenameHandles = ["iw4x_mutex"];
    Game.ProtoInput.RenameNamedPipes = [];
  }

  if (Context.NumberOfPlayers > 4) {
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;
    Game.ProtoInput.FindWindowHook = true;
    Game.ProtoInput.SetWindowPosHook = false;
    Game.ProtoInput.SetWindowStyleHook = false;
    Game.ProtoInput.RegisterRawInputHook = false;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.MessageFilterHook = false;
    Game.ProtoInput.GetCursorPosHook = false;
    Game.ProtoInput.SetCursorPosHook = false;
    Game.ProtoInput.GetKeyStateHook = false;
    Game.ProtoInput.GetAsyncKeyStateHook = false;
    Game.ProtoInput.GetKeyboardStateHook = false;
    Game.ProtoInput.CursorVisibilityHook = false;
    Game.ProtoInput.ClipCursorHook = false;
    Game.ProtoInput.ClipCursorHookCreatesFakeClip = false;
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
    //Game.ProtoInput.RenameHandlesHook = true;
    //Game.ProtoInput.RenameHandles = ["iw4x_mutex"];
    Game.ProtoInput.RenameNamedPipes = [];
  }

  if (Context.NumberOfPlayers < 5) {
    //Game.KillMutexType = "Mutant";
    //Game.KillMutex = ["iw4x_mutex"];

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "Enabled=", Nucleus.SearchType.StartsWith) + "|Enabled=true",
      Context.FindLineNumberInTextFile(txtPath, "DisabledToGame=", Nucleus.SearchType.StartsWith) + "|DisabledToGame=false",
      Context.FindLineNumberInTextFile(txtPath, "DontHookWndProc=", Nucleus.SearchType.StartsWith) + "|DontHookWndProc=false",
      Context.FindLineNumberInTextFile(txtPath, "RenderInBackground=", Nucleus.SearchType.StartsWith) + "|RenderInBackground=true"
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  Game.ProtoInput.OnInputLocked = function() {
    if (Player.IsRawKeyboard) {
      for (var i = 0; i < PlayerList.Count; i++) {
        var player = PlayerList[i];
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 50, true, false, false, true, true);
        System.Threading.Thread.Sleep(500);
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0008);
      }
    }
    if (Context.NumberOfPlayers > 4) {
      for (var i = 0; i < PlayerList.Count; i++) {
        var player = PlayerList[i];
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);
        ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);

        ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 50, true, false, false, true, true);
        System.Threading.Thread.Sleep(500);
        ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
        ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageBlock(player.ProtoInputInstanceHandle, 0x0008);
      }
    }
  };
  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);
      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
      ProtoInput.DisableMessageBlock(player.ProtoInputInstanceHandle, 0x0008);
    }
  };
};