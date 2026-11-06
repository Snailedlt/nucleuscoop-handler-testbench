Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Fri Mar 21 2025 11:31:41 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "LYf4T7k883HfNMhAj";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["APEX_ClothingGPUCHECKED_x86.dll"];
Game.DirSymlinkExclusions = ["Binaries\\Win32\\ShaderOverride\\PixelShaders", "Binaries\\Win32", "Binaries\\Win64", "MN9Game\\Config"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "steam_interfaces.txt", "d3d9.dll", "xinput1_3.dll"];
Game.FileSymlinkCopyInstead = ["Mn9SystemSettings.ini"];
Game.GameName = "Mighty No. 9";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MN9Game.exe";
Game.SteamID = "314710";
Game.GUID = "MN9";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "Binaries\\Win32";
Game.UseGoldberg = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Mighty No.9 (32-bit, DX9)";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.Description =
  "For the Co-op EX and online race modes unlocked after beating the Call stage in story mode. Select private match in one instance, select the oher player and wait until it says creating a game then join in the other instance using private match too. Lower your display scale or set it to 100% if the instances are not correctly resizing for you.";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 25;

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
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.SetWindowPosHook = true;
Game.ProtoInput.SetWindowStyleHook = true;

Game.Play = function() {
  if (Player.IsKeyboardPlayer) {
    Context.StartArguments =
      "-windowed -AlwaysFocus -nosplash -nomoviestartup -NoController" + " -ResX=" + Context.Width + " -ResY=" + Context.Height + " -WindowPosX=" + Context.PosX + " -WindowPosY=" + Context.PosY;
  } else {
    Context.StartArguments =
      "-windowed -AlwaysFocus -nosplash -nomoviestartup -nomouse" + " -ResX=" + Context.Width + " -ResY=" + Context.Height + " -WindowPosX=" + Context.PosX + " -WindowPosY=" + Context.PosY;
  }

  var interfaces = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\steam_interfaces.txt";
  var lines = [
    "SteamClient015",
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
    "STEAMUGC_INTERFACE_VERSION002",
    "STEAMAPPLIST_INTERFACE_VERSION001",
    "STEAMMUSIC_INTERFACE_VERSION001",
    "STEAMMUSICREMOTE_INTERFACE_VERSION001",
    "STEAMCONTROLLER_INTERFACE_VERSION"
  ];
  Context.WriteTextFile(interfaces, lines);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\ShaderOverride\\PixelShaders");
  System.IO.Directory.CreateDirectory(filePath);

  if (Context.AspectRatioDecimal > 1.8) {
    //FOV, increase it or lower it here:
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\", "MN9Game.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\", "MN9Game.exe"),
      "61 0B 36 3B",
      "61 0B 96 3B",
      true
    );

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\d3d9.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var shader = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\ShaderOverride\\PixelShaders\\168D8BCD.txt";
    var lines = ["ps_3_0"];
    Context.WriteTextFile(shader, lines);
  } else if (Context.AspectRatioDecimal < 1.2) {
    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\", "MN9Game.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\", "MN9Game.exe"),
      "61 0B 36 3B",
      "61 0B 26 3B",
      true
    );

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\d3d9.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "d3d9.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var shader = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Binaries\\Win32\\ShaderOverride\\PixelShaders\\168D8BCD.txt";
    var lines = ["ps_3_0"];
    Context.WriteTextFile(shader, lines);
  } else {
  }
};