Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Jan 31 2023 09:58:15 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "TGdFGg3mqF5SabMN9";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["VanHelsing_x86_11.exe", "VanHelsing_x86.exe", "VanHelsing_x64_11.exe", "VanHelsing_x64.exe", "GLVanHelsing_x86.exe"];
Game.AddOption("Select Exe", "Select the game's .exe you want to use.", "Exe", answers1);

Game.ExecutableContext = ["Terrains\\Barrikados"];
Game.DirSymlinkExclusions = ["Cfg\\Resolutions"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_api64.dll",
  "steam_interfaces.txt",
  "steam_appid.txt",
  "winmm.dll",
  "CustomNonFullscreen.cfg",
  "VanHelsing.exe",
  "VanHelsing_x86_11.exe",
  "VanHelsing_x86.exe",
  "VanHelsing_x64_11.exe",
  "VanHelsing_x64.exe",
  "GLVanHelsing_x86.exe"
];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "VanHelsing.exe";
Game.SteamID = "272470";
Game.GUID = "Van Helsing II";
Game.GameName = "The Incredible Adventures of Van Helsing II";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "The Incredible Adventures of Van Helsing II";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.DocumentsSavePath = "NeocoreGames\\Van Helsing 2\\SaveGame";
Game.Description =
  "Set your custom resolution in the video settings of your main game to fix stretching or in each instance video settings, close the instances via in-game menus then launch again via Nucleus. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see them and you can select them. Create a public multiplayer game in one instance and join in the others.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\NeoCore Games\\Van Helsing 2\\Options", "WindowStyle", 0, Nucleus.RegType.DWord);

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_interfaces.txt";
  var lines = [
    "SteamClient016",
    "SteamGameServer012",
    "SteamGameServerStats001",
    "SteamUser017",
    "SteamFriends014",
    "SteamUtils007",
    "SteamMatchMaking009",
    "SteamMatchMakingServers002",
    "STEAMUSERSTATS_INTERFACE_VERSION011",
    "STEAMAPPS_INTERFACE_VERSION006",
    "SteamNetworking005",
    "STEAMREMOTESTORAGE_INTERFACE_VERSION012",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001",
    "STEAMUGC_INTERFACE_VERSION003",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMHTMLSURFACE_INTERFACE_VERSION_002",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini");
  var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\XInputPlus.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Cfg\\Resolutions");
  System.IO.Directory.CreateDirectory(filePath);

  var custom = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Cfg\\Resolutions\\CustomNonFullscreen.cfg";
  var lines = ["CustomResolution00=" + Context.Width + "x" + Context.Height, "CustomResolution01=1920x540", "CustomResolution02=960x1080", "CustomResolution03=960x540"];
  Context.WriteTextFile(custom, lines);

  if (Player.IsKeyboardPlayer) {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\NeoCore Games\\Van Helsing 2", "ControllerEnabled", 0, Nucleus.RegType.DWord);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\NeoCore Games\\Van Helsing 2", "ControllerEnabled", 1, Nucleus.RegType.DWord);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  var exe = Context.Options["Exe"];

  if (exe == "VanHelsing_x86_11.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "VanHelsing_x86_11.exe"), System.IO.Path.Combine(Context.RootFolder, "VanHelsing.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x86\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (exe == "VanHelsing_x86.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "VanHelsing_x86.exe"), System.IO.Path.Combine(Context.RootFolder, "VanHelsing.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x86\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (exe == "GLVanHelsing_x86.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "GLVanHelsing_x86.exe"), System.IO.Path.Combine(Context.RootFolder, "VanHelsing.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x86\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (exe == "VanHelsing_x64_11.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "VanHelsing_x64_11.exe"), System.IO.Path.Combine(Context.RootFolder, "VanHelsing.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x64\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x64\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (exe == "VanHelsing_x64.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "VanHelsing_x64.exe"), System.IO.Path.Combine(Context.RootFolder, "VanHelsing.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x64\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x64\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};