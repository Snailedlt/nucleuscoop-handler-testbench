Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Dec 25 2024 05:48:12 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "e63qNfxDrYv8vSK8h";
Hub.Maintainer.Name = "rip35359155";
Hub.Maintainer.Id = "XCkRzQee9q8zMDp2C";

var answers = ["No", "Yes"];
var answers2 = ["Yes", "No"];
var answers4 = ["Default", "Yes", "No"];
var answers5 = ["60", "45", "30", "0"];
var answers6 = ["Default", "Low", "Med", "High", "Extra"];
var answers7 = ["Zombies", "Multiplayer"];
var answers8 = ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
var answers10 = [
  "-",
  "HOST",
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
var answers11 = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
Game.AddOption("Select preferred game mode", "", "mode", answers7);
Game.AddOption("Choose your preferred graphic settings", "Default will use the previous or default settings", "Graphics", answers6);
Game.AddOption("Select the number of bots to be added", "", "Bots", answers8);
Game.AddOption("For LAN, Host PC should select HOST and the Guest PC should select the last digits of the host IP", "Zombies only supports up to 3 players over LAN", "lan", answers10);
Game.AddOption("For LAN play with different PCs, be sure to have different IDs", "", "id", answers11);
Game.AddOption(
  "Would you like to unlock everything for multiplayer",
  "This feature will launch BO1 without the bot mod. Once you're in the main menu, press F4 to unlock everything (please be patient and don't press any other button). Once everything is unlocked, close Nucleus and launch BO1 once again without unlocking.",
  "Unlock",
  answers
);
Game.AddOption("Enable music only in the first instance?", "", "Mus", answers2);
Game.AddOption("Would you like to disable aim assist in Zombies?", "Default will retain the previous/default settings", "Aim", answers4);
Game.AddOption("Select the FPS Cap the game will use", "", "FPS", answers5);
Game.AddOption("Swap shoulder and trigger buttons (useful for Playstation controllers)", "Default will use the previous or default settings", "pscontrollers", answers4);
Game.FileSymlinkExclusions = [
  "d3d9.dll",
  "d3d9.ini",
  "XinputPlus.ini",
  "xinput1_3.dll",
  "config.cfg",
  "config_mp.cfg",
  "binkw32.dll",
  "common_zombie_patch.ff",
  "bgamer_checker.dll",
  "bgamer_checkermp.dll",
  "BGAMERLAN_PATCH.dll",
  "bgamert5.exe",
  "bgamert5mp.exe",
  "bgset.ini",
  "BGT.exe",
  "bgt5.dll",
  "bgt5launcher.exe",
  "bgT5lms.dll",
  "BGTMP.exe",
  "BO1_CONTROLLER_MENU_FIXER.dll",
  "controller.ini",
  "controller_enabler.dll",
  "ip.txt",
  "launcher.bat",
  "winject32.exe"
];
Game.FileSymlinkCopyInstead = ["localization.txt", "cod.bmp", "codlogo.bmp", "version.inf", "BlackOps.exe", "steam_api.dll", "BlackOpsMP.exe", "imgui.ini", "installscript.vdf", "steam_api.dll"];
Game.DirExclusions = ["players", "mods"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.KeepSymLinkOnExit = true;
Game.UseNucleusEnvironment = true;
Game.SteamID = "42710";
Game.SupportsKeyboard = false;
Game.ExecutableName = "BlackOps.exe";
Game.LauncherExe = "launch.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.BinariesFolder = "";
Game.GUID = "Call of Duty Black Ops";
Game.GameName = "Call of Duty Black Ops";
Game.MaxPlayersOneMonitor = 16;
Game.MaxPlayers = 18;
Game.HasDynamicWindowTitle = true;
Game.Hook.ForceFocusWindowName = "CALL_OF_DUTY_";
Game.HookFocus = false;
Game.FakeFocus = false;
Game.FakeFocusSendActivate = false;
Game.SetForegroundWindowElsewhere = true;
Game.ResetWindows = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.Hook.UseAlpha8CustomDll = false;
Game.InjectHookXinput = false;
Game.DontResize = false;
Game.DontRemoveBorders = false;
Game.HideTaskbar = true;
Game.KillProcessesOnClose = ["start", "connect", "F2 Host", "F2 Host MP", "F2 Guest", "F3 Restart", "Prompt", "Prompt2", "JoyToKey", "Unlock", "cmd", "MouseMenu", "MouseMenuFix"];
Game.Description =
  "A maximum of 4 players can play the Zombies gamemode. To play Zombies select online, look for a match and select preferred map (on gamepad press the start button to select a map).\n\nHave the other players search for the online match and once connected, each player should select ready up. The match should start shortly after the count down.\n\nFor multiplayer, launch your instances and proceed to have the first player host a combat training match. Once the match has loaded, press F2 or the start + select buttons simultaneously on your gamepad to connect the other instances.\n\nTo quickly restart your match press F3 or the start + Y buttons simultaneously on your gamepad.\n\nIf playing with more than 4 players, or multiple mouse and keyboard, you will need to i) lock input by pressing the end key and ii) assign gamepads first, followed by mouse and keyboard in sequential order, if not menus for the gamepad instances will not work properly.\n\nTo play multiplayer over LAN, be sure to change the player ID, and to select the last digits of the host IP - this can be done through the game launch options in Nucleus.\n\nMenu support has been added for gamepads, use the dpad to scroll through the options, and the start/select buttons to select or move to the previous option. Aim assist only works for Zombies.\n\nThe hotkey exes (F2 host, F2 Guest, start, prompt etc.) may be blocked or flagged by window defender as potential viruses, but can guarantee they are nothing but false/positives as they were created by me with Autoit.";

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

  Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\start.exe"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F3 Restart.exe"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\JoyToKey.exe"], false, 0);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\Prompt.exe"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\MouseMenu.exe"], false, 10);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\MouseMenuFix.exe"], false, 10);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players");
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGTMP.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\BGTMP.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgamer_checkermp.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgamer_checkermp.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgamert5mp.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgamert5mp.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGT.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\BGT.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgamert5.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgamert5.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgamer_checker.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgamer_checker.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK";
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global";
  System.IO.Directory.CreateDirectory(filePath);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.Documents) + "\\My Mods\\SpecialK\\Global\\osd.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\osd.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods");
  System.IO.Directory.CreateDirectory(filePath);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots");
  System.IO.Directory.CreateDirectory(filePath);

  if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg")) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mods\\mp_bots\\config_mp.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgset.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgt5.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgt5.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgt5launcher.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgt5launcher.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgT5lms.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\bgT5lms.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\steam_api.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\binkw32.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\binkw32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BlackOpsMP.exe");
  var savePkgOrigin = System.IO.Path.Combine(Context.RootInstallFolder + "\\BlackOpsMP.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK\\d3d9.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecialK\\d3d9.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\xinput1_3.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\controller.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  //var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\zone\\common\\patch_mp.ff');
  //var savePkgOrigin = System.IO.Path.Combine(Game.Folder, 'BGamer\\mp_training\\patch_mp.ff');
  //System.IO.File.Copy(savePkgOrigin, savePath, true);

  //var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\zone\\common\\patch_ui_mp.ff');
  //var savePkgOrigin = System.IO.Path.Combine(Game.Folder, 'BGamer\\mp_training\\patch_ui_mp.ff');
  //System.IO.File.Copy(savePkgOrigin, savePath, true);

  if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini"))) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\XInputPlus.ini");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "SlotReassignment=", Nucleus.SearchType.StartsWith) + "|SlotReassignment=" + (Context.GamepadId - 1) + ""];
  var dict = [Context.FindLineNumberInTextFile(txtPath, "Enable=", Nucleus.SearchType.StartsWith) + "|Enable=false"];
  var dict = [Context.FindLineNumberInTextFile(txtPath, "UsesXInput=", Nucleus.SearchType.StartsWith) + "|UsesXInput=true"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
  var dict = [Context.FindLineNumberInTextFile(txtPath, "Controller1=", Nucleus.SearchType.StartsWith) + "|Controller1=" + Context.GamepadId + ""];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg"))) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\config_mp.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
  if (!System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg"))) {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\config.cfg");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.ini";
  Context.ReplaceLinesInTextFile(
    txtPath,
    [
      Context.FindLineNumberInTextFile(txtPath, "ConfineCursor=", Nucleus.SearchType.StartsWith) + "|ConfineCursor=true",
      Context.FindLineNumberInTextFile(txtPath, "Fullscreen=", Nucleus.SearchType.StartsWith) + "|Fullscreen=false",
      Context.FindLineNumberInTextFile(txtPath, "UnconfineCursor=", Nucleus.SearchType.StartsWith) + "|UnconfineCursor=true",
      Context.FindLineNumberInTextFile(txtPath, "AlwaysOnTop=", Nucleus.SearchType.StartsWith) + "|AlwaysOnTop=1",
      Context.FindLineNumberInTextFile(txtPath, "Borderless=", Nucleus.SearchType.StartsWith) + "|Borderless=true",
      Context.FindLineNumberInTextFile(txtPath, "Center=", Nucleus.SearchType.StartsWith) + "|Center=false",
      Context.FindLineNumberInTextFile(txtPath, "OverrideRes=", Nucleus.SearchType.StartsWith) + "|OverrideRes=" + Context.Width + "x" + Context.Height
    ],
    "utf-8"
  );

  var mode = Context.Options["mode"];
  var Mod = Context.Options["Mod"];

  if (mode == "Zombies") {
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller_enabler.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller_enabler.dll"));
    }

    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller.ini"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller.ini"));
    }

    Context.EditRegKey(
      "HKEY_CURRENT_USER",
      "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers",
      "" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGT.exe",
      "HIGHDPIAWARE",
      Nucleus.RegType.String
    );

    Game.ExecutableName = "BGT.exe";

    Context.PatchFile(
      System.IO.Path.Combine(Context.ScriptFolder, "BGamer\\BGT.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGT.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BO1_CONTROLLER_MENU_FIXER.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\BO1_CONTROLLER_MENU_FIXER.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGAMERLAN_PATCH.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\BGAMERLAN_PATCH.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winject32.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winject32.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    //var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\controller_index.txt';
    //var dict = ['' + (Context.GamepadId - 1) + '',];
    //Context.WriteTextFile(txtPath, dict);

    var FPS = Context.Options["FPS"];
    var Graphics = Context.Options["Graphics"];
    if (Graphics == "Default") {
    }
    if (Graphics == "Low") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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

    if (Graphics == "High") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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

    var Mus = Context.Options["Mus"];
    if (Mus == "Yes") {
      if (Context.PlayerID == 0) {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      } else {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "0"',
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "0"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      }
    }

    if (Context.AspectRatioDecimal < 1.2) {
      Game.DontResize = false;
      Game.DontRemoveBorders = false;
      Context.PatchFile(
        System.IO.Path.Combine(Context.ScriptFolder, "BGamer\\bgt.exe"),
        System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgt.exe"),
        [0xab, 0xaa, 0xaa, 0x3f],
        Context.ConvertToBytes(Context.AspectRatioDecimal)
      );

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "95"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "95"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var opt = Context.Options["opt"];
    if (opt == "No") {
    }
    if (opt == "Yes") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_multithreaded_device", Nucleus.SearchType.StartsWith) + '|seta r_multithreaded_device "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_multiGpu", Nucleus.SearchType.StartsWith) + '|seta r_multiGpu "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_inGameVideo", Nucleus.SearchType.StartsWith) + '|seta r_inGameVideo "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var lan = Context.Options["lan"];
    if (lan == "-") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat";
      var lines = ['CALL "' + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + '\\winject32.exe" BGAMERLAN_PATCH.dll -s "BGT.exe"'];
      Context.WriteTextFile(Bat, lines);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat"], false, 0);

      var txtPath = Game.Folder + "\\BGamer\\Local IP.txt";
      var dict = ["127.0.0.1"];
      Context.WriteTextFile(txtPath, dict);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F2 Host.exe"], false, 10);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "Nickname=", Nucleus.SearchType.StartsWith) + "|Nickname=" + Context.Nickname,
        Context.FindLineNumberInTextFile(txtPath, "Host=", Nucleus.SearchType.StartsWith) + "|Host=127.0.0.5"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ip.txt";
      var dict = ["127.0.0." + (Context.PlayerID + 1) + ""];
      Context.WriteTextFile(txtPath, dict);
    }

    if (lan >= "0") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat";
      var lines = ['Start BGT.exe"'];
      Context.WriteTextFile(Bat, lines);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat"], false, 0);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F2 Guest.exe"], false, 10);

      var txtPath = Game.Folder + "\\BGamer\\Local IP.txt";
      var dict = ["192.168.1." + lan + "      "];
      Context.WriteTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "Nickname=", Nucleus.SearchType.StartsWith) + "|Nickname=" + Context.Nickname,
        Context.FindLineNumberInTextFile(txtPath, "Host=", Nucleus.SearchType.StartsWith) + "|Host=192.168.1." + lan
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ip.txt";
      var dict = ["127.0.0." + (Context.PlayerID + 3) + ""];
      Context.WriteTextFile(txtPath, dict);
    }

    if (lan == "HOST") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat";
      var lines = ['Start BGT.exe"'];
      Context.WriteTextFile(Bat, lines);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat"], false, 0);

      var txtPath = Game.Folder + "\\BGamer\\Local IP.txt";
      var dict = ["127.0.0.1"];
      Context.WriteTextFile(txtPath, dict);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F2 Host.exe"], false, 10);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "Nickname=", Nucleus.SearchType.StartsWith) + "|Nickname=" + Context.Nickname,
        Context.FindLineNumberInTextFile(txtPath, "Host=", Nucleus.SearchType.StartsWith) + "|Host=127.0.0.1"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ip.txt";
      var dict = ["127.0.0." + (Context.PlayerID + 1) + ""];
      Context.WriteTextFile(txtPath, dict);
    }
  }

  if (mode == "Multiplayer") {
    Context.EditRegKey(
      "HKEY_CURRENT_USER",
      "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers",
      "" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGTMP.exe",
      "HIGHDPIAWARE",
      Nucleus.RegType.String
    );

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "controller_slot=", Nucleus.SearchType.StartsWith) + "|controller_slot=9"];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\controller_enabler.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\controller_enabler.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    Game.ExecutableName = "BGTMP.exe";

    Context.PatchFile(
      System.IO.Path.Combine(Context.ScriptFolder, "BGamer\\BGTMP.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGTMP.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "65"',
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
      Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods");
    System.IO.Directory.CreateDirectory(filePath);

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\mp_bots");
    System.IO.Directory.CreateDirectory(filePath);

    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\mp_bots\\mod.ff")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\mp_bots\\mod.ff");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mods\\mp_bots\\mod.ff");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\mp_bots\\mp_bots.iwd")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods\\mp_bots\\mp_bots.iwd");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mods\\mp_bots\\mp_bots.iwd");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods");
    System.IO.Directory.CreateDirectory(filePath);

    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots");
    System.IO.Directory.CreateDirectory(filePath);

    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "mods\\mp_bots\\config_mp.cfg");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }

    var FPS = Context.Options["FPS"];
    var Graphics = Context.Options["Graphics"];
    if (Graphics == "Default") {
    }
    if (Graphics == "Low") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "3"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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

    if (Graphics == "High") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip", Nucleus.SearchType.StartsWith) + '|seta r_picmip "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_bump", Nucleus.SearchType.StartsWith) + '|seta r_picmip_bump "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_manual", Nucleus.SearchType.StartsWith) + '|seta r_picmip_manual "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_picmip_spec", Nucleus.SearchType.StartsWith) + '|seta r_picmip_spec "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_zFeather", Nucleus.SearchType.StartsWith) + '|seta r_zFeather "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_maxLights", Nucleus.SearchType.StartsWith) + '|seta sm_maxLights "4"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_maxfps", Nucleus.SearchType.StartsWith) + '|seta com_maxfps "' + FPS + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "4"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
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

    var Mus = Context.Options["Mus"];
    if (Mus == "Yes") {
      if (Context.PlayerID == 0) {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);

        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      } else {
        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "0"',
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "0"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);

        var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
        var dict = [
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "0"',
          Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "0"'
        ];
        Context.ReplaceLinesInTextFile(txtPath, dict);
      }
    }
    if (Mus == "No") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_music", Nucleus.SearchType.StartsWith) + '|seta snd_menu_music "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta snd_menu_voice", Nucleus.SearchType.StartsWith) + '|seta snd_menu_voice "1"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (Context.AspectRatioDecimal < 1.2) {
      Game.DontResize = false;
      Game.DontRemoveBorders = false;
      Context.PatchFile(
        System.IO.Path.Combine(Context.ScriptFolder, "BGamer\\BGTMP.exe"),
        System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BGTMP.exe"),
        [0xab, 0xaa, 0xaa, 0x3f],
        Context.ConvertToBytes(Context.AspectRatioDecimal)
      );

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "95"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "95"',
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sd_xa2_device_guid", Nucleus.SearchType.StartsWith) + '|seta sd_xa2_device_guid ""',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_fov_default", Nucleus.SearchType.StartsWith) + '|seta cg_fov_default "95"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_fov", Nucleus.SearchType.StartsWith) + '|seta cg_fov "95"',
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_fullscreen", Nucleus.SearchType.StartsWith) + '|seta r_fullscreen "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_customMode", Nucleus.SearchType.StartsWith) + '|seta r_customMode "' + Context.Width + "x" + Context.Height + '"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_mode", Nucleus.SearchType.StartsWith) + '|seta r_mode "' + Context.Width + "x" + Context.Height + '"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var opt = Context.Options["opt"];
    if (opt == "No") {
    }
    if (opt == "Yes") {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_multithreaded_device", Nucleus.SearchType.StartsWith) + '|seta r_multithreaded_device "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_multiGpu", Nucleus.SearchType.StartsWith) + '|seta r_multiGpu "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_inGameVideo", Nucleus.SearchType.StartsWith) + '|seta r_inGameVideo "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta com_first_time_pc", Nucleus.SearchType.StartsWith) + '|seta com_first_time_pc "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_specular", Nucleus.SearchType.StartsWith) + '|seta r_specular "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_vsync", Nucleus.SearchType.StartsWith) + '|seta r_vsync "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta ragdoll_enable", Nucleus.SearchType.StartsWith) + '|seta ragdoll_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_aaSamples", Nucleus.SearchType.StartsWith) + '|seta r_aaSamples "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_multithreaded_device", Nucleus.SearchType.StartsWith) + '|seta r_multithreaded_device "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_multiGpu", Nucleus.SearchType.StartsWith) + '|seta r_multiGpu "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sm_enable", Nucleus.SearchType.StartsWith) + '|seta sm_enable "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_inGameVideo", Nucleus.SearchType.StartsWith) + '|seta r_inGameVideo "1"',
        Context.FindLineNumberInTextFile(txtPath, "seta r_dof_enable", Nucleus.SearchType.StartsWith) + '|seta r_dof_enable "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var Bots = Context.Options["Bots"];
    var y = 2;
    var Bots = Bots / y;

    if (Bots == "-") {
    }

    if (Bots >= 0) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta bot_friends", Nucleus.SearchType.StartsWith) + "|seta bot_friends " + Bots + "",
        Context.FindLineNumberInTextFile(txtPath, "seta bot_enemies", Nucleus.SearchType.StartsWith) + "|seta bot_enemies " + Bots + ""
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta bot_friends", Nucleus.SearchType.StartsWith) + "|seta bot_friends " + Bots + "",
        Context.FindLineNumberInTextFile(txtPath, "seta bot_enemies", Nucleus.SearchType.StartsWith) + "|seta bot_enemies " + Bots + ""
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    var Unlock = Context.Options["Unlock"];

    if (Unlock == "No") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat";
      var lines = ["start BGTMP.exe +set fs_game mods/mp_bots +set bots_manage_fill_kick 1 +set bots_team_force 1"];
      Context.WriteTextFile(Bat, lines);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat"], false, 0);
    }

    if (Unlock == "Yes") {
      var Bat = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat";
      var lines = ["start BGTMP.exe"];
      Context.WriteTextFile(Bat, lines);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launcher.bat"], false, 0);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\Unlock.exe"], false, 10);
    }

    var lan = Context.Options["lan"];
    if (lan == "-") {
      var txtPath = Game.Folder + "\\BGamer\\Local IP.txt";
      var dict = ["127.0.0.1"];
      Context.WriteTextFile(txtPath, dict);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F2 Host.exe"], false, 10);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "Nickname=", Nucleus.SearchType.StartsWith) + "|Nickname=" + Context.Nickname,
        Context.FindLineNumberInTextFile(txtPath, "Host=", Nucleus.SearchType.StartsWith) + "|Host=127.0.0.5"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

    if (lan >= "0") {
      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F2 Guest.exe"], false, 10);

      var txtPath = Game.Folder + "\\BGamer\\Local IP.txt";
      var dict = ["192.168.1." + lan + "      "];
      Context.WriteTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "Nickname=", Nucleus.SearchType.StartsWith) + "|Nickname=" + Context.Nickname,
        Context.FindLineNumberInTextFile(txtPath, "Host=", Nucleus.SearchType.StartsWith) + "|Host=192.168.1." + lan
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
    if (lan == "HOST") {
      var txtPath = Game.Folder + "\\BGamer\\Local IP.txt";
      var dict = ["127.0.0.1"];
      Context.WriteTextFile(txtPath, dict);

      Context.RunAdditionalFiles([Context.ScriptFolder + "\\BGamer\\F2 Host.exe"], false, 10);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "Nickname=", Nucleus.SearchType.StartsWith) + "|Nickname=" + Context.Nickname,
        Context.FindLineNumberInTextFile(txtPath, "Host=", Nucleus.SearchType.StartsWith) + "|Host=127.0.0.5"
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  var id = Context.Options["id"];

  if (id == "-") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111111" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "0") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111110" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "1") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111112" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "2") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111113" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == 3) {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111114" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "4") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111115" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }
  if (id == "5") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111116" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "6") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111117" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "7") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111118" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (id == "8") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bgset.ini";
    var dict = [Context.FindLineNumberInTextFile(txtPath, "GameID=", Nucleus.SearchType.StartsWith) + "|GameID=11111119" + Context.PlayerID];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  //  var pscontrollers = Context.Options["pscontrollers"];
  //  if (pscontrollers == "Default") {
  //  }
  //  if (pscontrollers == "Yes") {
  //   var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
  //    var dict = [
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+speed_throw"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+attack"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+smoke"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+frag"',
  //      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonsConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonsConfig "buttons_default_alt"'
  //    ];
  //    Context.ReplaceLinesInTextFile(txtPath, dict);

  //    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
  //    var dict = [
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+speed_throw"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+attack"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+smoke"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+frag"',
  //      Context.FindLineNumberInTextFile(txtPath, "seta gpad_buttonsConfig", Nucleus.SearchType.StartsWith) + '|seta gpad_buttonsConfig "buttons_default_alt"'
  //    ];
  //    Context.ReplaceLinesInTextFile(txtPath, dict);

  //  }

  //  var pscontrollers = Context.Options["pscontrollers"];
  //  if (pscontrollers == "No") {
  //    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
  //    var dict = [
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+smoke"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+frag"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+speed_throw"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+attack"'
  //    ];
  //    Context.ReplaceLinesInTextFile(txtPath, dict);

  //    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
  //    var dict = [
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LSHLDR "+smoke"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RSHLDR", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RSHLDR "+frag"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_LTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_LTRIG "+speed_throw"',
  //      Context.FindLineNumberInTextFile(txtPath, "bind BUTTON_RTRIG", Nucleus.SearchType.StartsWith) + '|bind BUTTON_RTRIG "+attack"'
  //    ];
  //    Context.ReplaceLinesInTextFile(txtPath, dict);

  //  }

  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "Default") {
  }
  if (pscontrollers == "Yes") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
    var dict = ["6|LT=LB", "7|RT=RB", "16|LB=LT", "17|RB=RT", "99|Controller1=" + (Context.PlayerID + 1) + ""];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var pscontrollers = Context.Options["pscontrollers"];
  if (pscontrollers == "No") {
    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Xinputplus.ini";
    var dict = ["6|LT=LT", "7|RT=RT", "16|LB=LB", "17|RB=RB", "99|Controller1=" + (Context.PlayerID + 1) + ""];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  var Aim = Context.Options["Aim"];
  if (Aim == "Default") {
    if (!System.IO.File.Exists(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zone\\Common\\common_zombie_patch.ff")) {
      var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zone\\Common\\common_zombie_patch.ff");
      var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\common_zombie_patch_aim.ff");
      System.IO.File.Copy(savePkgOrigin, savePath, true);
    }
  }
  if (Aim == "Yes") {
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zone\\Common\\common_zombie_patch.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\common_zombie_patch_aim.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Aim == "No") {
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zone\\Common\\common_zombie_patch.ff_aim"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zone\\Common\\common_zombie_patch_aim.ff"));
    }
    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\zone\\Common\\common_zombie_patch.ff");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BGamer\\common_zombie_patch.ff");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (Player.IsKeyboardPlayer) {
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"));
    }
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"));
    }

    Game.PauseBetweenProcessGrab = 20;
    Game.PauseBetweenStarts = 5;
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

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);
  }

  if (Context.NumberOfPlayers < 5) {
    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.FocusHooks = true;

    Game.ProtoInput.GetCursorPosHook = true;
    Game.ProtoInput.SetCursorPosHook = true;
    Game.ProtoInput.SendMouseMovementMessages = false;
    //Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.BlockedMessages = [0x0008];
    //Game.PreventWindowDeactivation = true;

    Game.Hook.XInputEnabled = true;
    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    Game.PauseBetweenProcessGrab = 15;
    Game.PauseBetweenStarts = 5;

    if (Player.IsKeyboardPlayer) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }
  }

  if (Player.IsKeyboardPlayer) {
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"));
    }

    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"));
    }

    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.FocusHooks = true;

    Game.ProtoInput.GetCursorPosHook = true;
    Game.ProtoInput.SetCursorPosHook = true;
    Game.ProtoInput.SendMouseMovementMessages = false;
    //Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.BlockedMessages = [0x0008];
    //Game.PreventWindowDeactivation = true;

    Game.Hook.XInputEnabled = false;
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    Game.PauseBetweenProcessGrab = 15;
    Game.PauseBetweenStarts = 5;

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

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      }
    };
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
  }
  if (Context.NumberOfPlayers > 4) {
    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\d3d9.dll"));
    }

    if (System.IO.File.Exists((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"))) {
      System.IO.File.Delete((Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll"));
    }

    Game.ProtoInput.InjectStartup = false;
    Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
    Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
    Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

    Game.ProtoInput.RegisterRawInputHook = true;
    Game.ProtoInput.GetRawInputDataHook = true;
    Game.ProtoInput.FocusHooks = true;

    Game.ProtoInput.GetCursorPosHook = true;
    Game.ProtoInput.SetCursorPosHook = true;
    Game.ProtoInput.SendMouseMovementMessages = false;
    //Game.ProtoInput.RawInputFilter = true;
    Game.ProtoInput.BlockedMessages = [0x0008];
    //Game.PreventWindowDeactivation = true;

    Game.Hook.XInputEnabled = false;
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
    var dict = [
      Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "1"',
      Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "1"'
    ];
    Context.ReplaceLinesInTextFile(txtPath, dict);

    Game.PauseBetweenProcessGrab = 15;
    Game.PauseBetweenStarts = 5;

    if (Player.IsKeyboardPlayer) {
      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);

      var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\players\\mods\\mp_bots\\config_mp.cfg";
      var dict = [
        Context.FindLineNumberInTextFile(txtPath, "seta gpad_enabled", Nucleus.SearchType.StartsWith) + '|seta gpad_enabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta cg_aimAssistEnabled", Nucleus.SearchType.StartsWith) + '|seta cg_aimAssistEnabled "0"',
        Context.FindLineNumberInTextFile(txtPath, "seta sv_allowAimAssist", Nucleus.SearchType.StartsWith) + '|seta sv_allowAimAssist "0"'
      ];
      Context.ReplaceLinesInTextFile(txtPath, dict);
    }

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

        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
        ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      }
    };
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
  }
};