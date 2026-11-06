Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Tue Jan 31 2023 09:18:23 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "NbnpH7Gy58pFLWiTi";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["DeathTrap_x86.exe", "DeathTrap_x64.exe"];
Game.AddOption("Select Exe", "Select the game's .exe you want to use, x86 or x64.", "Exe", answers1);

Game.ExecutableContext = ["Terrains"];
Game.DirSymlinkExclusions = ["Cfg\\Resolutions"];
Game.FileSymlinkExclusions = [
  "steam_api.dll",
  "steam_api64.dll",
  "steam_interfaces.txt",
  "steam_appid.txt",
  "winmm.dll",
  "CustomNonFullscreen.cfg",
  "DeathTrap.exe",
  "DeathTrap_x64.exe",
  "DeathTrap_x86.exe"
];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DeathTrap.exe";
Game.SteamID = "310510";
Game.GUID = "DeathTrap";
Game.GameName = "DeathTrap";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DeathTrap";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.KeyboardPlayerSkipFakeFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.DocumentsSavePath = "NeocoreGames\\DeathTrap\\SaveGame";
Game.Description =
  "Set your custom resolution in the video settings of your main game to fix stretching or in each instance video settings, close the instances via in-game menus then launch again via Nucleus. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see them and you can select them. Create a public multiplayer game in one instance and join in the others.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\NeoCore Games\\DeathTrap\\Options", "WindowStyle", 0, Nucleus.RegType.DWord);

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
  var lines = ["CustomResolution00=" + Context.Width + "x" + Context.Height];
  Context.WriteTextFile(custom, lines);

  if (Player.IsKeyboardPlayer) {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\NeoCore Games\\DeathTrap", "ControllerEnabled", 0, Nucleus.RegType.DWord);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
    ]);
  } else {
    Context.EditRegKeyNoBackup("HKEY_CURRENT_USER", "SOFTWARE\\NeoCore Games\\DeathTrap", "ControllerEnabled", 1, Nucleus.RegType.DWord);

    var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XInputPlus.ini";
    Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", Context.GamepadId),
      new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", Context.GamepadId)
    ]);
  }

  var exe = Context.Options["Exe"];

  if (exe == "DeathTrap_x86.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DeathTrap_x86.exe"), System.IO.Path.Combine(Context.RootFolder, "DeathTrap.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x86\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x86\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (exe == "DeathTrap_x64.exe") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "DeathTrap_x64.exe"), System.IO.Path.Combine(Context.RootFolder, "DeathTrap.exe"), true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\winmm.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\Steam Stub DRM Patcher\\x64\\winmm.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xinput1_3.dll");
    var savePkgOrigin = System.IO.Path.Combine(Context.NucleusFolder, "utils\\XInputPlus\\x64\\xinput1_3.dl_");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }
};