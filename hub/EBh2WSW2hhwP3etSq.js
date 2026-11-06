Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon May 06 2024 09:14:55 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "EBh2WSW2hhwP3etSq";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Block keyboard/mouse input in gamepad instances?", "Select yes if you want to block all the kb/m input in all instances.", "MKB", answers1);
Game.AddOption(
  "Use Flawless Widescreen?",
  "Select yes if you want to fix the hud/menus in ultra wide custom resolutions. On first run you will get a message saying it can't find the Flawless Widescreen module, click ok and FWS will open, in the list of modules select the Resident 6 one, once it is installed close FWS and the instances will open. Once the last instance opens FWS will open again, select the new instances modules that Nucleus created in the FWS UI and apply the fix. Use CTRL+T if the Nucleus instances get in the way.",
  "FW",
  answers2
);

Game.KillMutex = ["sBioMain"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "dinput8.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["default_mapping.ini"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "BH6.exe";
Game.SteamID = "221040";
Game.GUID = "Resident Evil 6";
Game.GameName = "Resident Evil 6";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "RESIDENT EVIL 6";
//Game.DPIHandling = Nucleus.DPIHandling.InvScaled;
Game.HasDynamicWindowTitle = true;
Game.ResetWindows = true;
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = false;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\221040\\remote";
Game.UserProfileConfigPath = "Documents\\CAPCOM\\RESIDENT EVIL 6";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "Click on an instance or alt-tab to it when it opens so that it can start and resize correctly. After completing the tutorial create a game in one instance and join in the others, make sure the region settings match. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example if you have a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Use the reset windows shortcut CTRL+R to fix the instances if they do not resize correctly. Use the Flawless Widescreen Nucleus UI option if you want to fix the hud/menus stretching when using ultra wide custom resolutions like 1920x540.";
Game.PauseBetweenProcessGrab = 1;
Game.PauseBetweenStarts = 30;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = false;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = false;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = false;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.GamePlayBeforeGameSetup = true;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DISPLAY", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("DISPLAY", "Aspect", "DEFAULT"),
    new Nucleus.IniSaveInfo("DISPLAY", "FullScreen", "OFF")
  ]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient012",
    "SteamGameServer011",
    "SteamGameServerStats001",
    "SteamUser016",
    "SteamFriends013",
    "SteamUtils005",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION005",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION008",
    "STEAMSCREENSHOTS_INTERFACE_VERSION001",
    "STEAMHTTP_INTERFACE_VERSION001"
  ];
  Context.WriteTextFile(interfaces, lines);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  if (Context.NumControllers < 5) {
    //>

    Game.ProtoInput.XinputHook = false;
    Game.ProtoInput.UseOpenXinput = false;
    Game.XInputPlusDll = ["xinput1_3.dll"];
    Game.PauseBetweenProcessGrab = 15;
    Game.PauseBetweenStarts = 20;
  } else {
    Game.ProtoInput.XinputHook = true;
    Game.ProtoInput.UseOpenXinput = true;
    Game.PauseBetweenProcessGrab = 1;
    Game.PauseBetweenStarts = 30;
  }

  var mkb = Context.Options["MKB"];
  var fw = Context.Options["FW"];

  if (mkb == "Yes") {
    Game.ProtoInput.GetAsyncKeyStateHook = true;
    Game.ProtoInput.RawInputFilter = true;
  }

  if (mkb == "No") {
  }

  if (fw == "Yes") {
    Game.FlawlessWidescreen = "ResidentEvil6";
  }

  if (fw == "No") {
  }
};