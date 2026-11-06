Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jun 15 2024 20:10:02 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ChW4w8x4D6hRyketb";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["binkw32.dll"];
Game.KillMutex = ["Type:Event|Grin Engine Game"];
Game.DirSymlinkExclusions = ["data\\settings"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "local_save.txt", "EasyHook32.dll", "BCFix32.dll", "BCFix32.exe", "BCFix.ini", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["binkw32.dll", "renderer_settings.xml", "controls.xml", "context.xml", "dieselx.cfg", "NxCooking.dll"];
Game.RequiresAdmin = false;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "bionic_commando.exe";
Game.SteamID = "21670";
Game.GUID = "Bionic Commando";
Game.GameName = "Bionic Commando (2009)";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.ExecutableToLaunch = "BCFix32.exe";
Game.HideTaskbar = false;
Game.NotTopMost = true;
Game.StartArguments = "-nointro -s";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Bionic Commando";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\21670\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Host a  multiplayer LAN game in the first instance and join in the others. Alt-tab to and click on the keyboard instance in the title screen to control it with kb/m, make sure you don't that for gamepad instances.";
Game.PauseBetweenProcessGrab = 20;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var path = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data\\settings\\renderer_settings.xml";
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "resolution", Context.Width + " " + Context.Height);
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "windowed", "true");
  Context.ChangeXmlAttributeValue(path, "//d3d_device", "aspect_ratio", Context.AspectRatioDecimal);

  //Context.EditRegKey("HKEY_LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters", "Hostname", Context.Nickname, Nucleus.RegType.String);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("Vibration", "EnableTriggerVibration", true)]);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient008",
    "SteamGameServer009",
    "SteamUser012",
    "SteamFriends005",
    "SteamUtils004",
    "SteamMatchMaking007",
    "SteamMatchMakingServers001",
    "STEAMUSERSTATS_INTERFACE_VERSION006",
    "STEAMAPPS_INTERFACE_VERSION003",
    "SteamNetworking003",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION002",
    "SteamMasterServerUpdater001"
  ];
  Context.WriteTextFile(interfaces, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\EasyHook32.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EasyHook32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BCFix32.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BCFix32.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BCFix32.exe");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BCFix32.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BCFix.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "BCFix.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\BCFix.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Settings", "TargetHostname", Context.Nickname),
    new Nucleus.IniSaveInfo("Settings", "PortOffset", Context.PlayerID)
  ]);
};