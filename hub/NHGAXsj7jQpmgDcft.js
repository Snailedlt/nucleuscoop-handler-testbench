Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun May 02 2021 05:44:46 GMT+0000 (UTC).
Hub.Handler.Id = "NHGAXsj7jQpmgDcft";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["Yes", "No"];
Game.AddOption("Will you use the local co-op/2 players per instance?", "If yes only launch two instances, you need 3 or 4 gamepads.", "Native", answers1);
Game.AddOption("Disable Pillarboxing/Letterboxing?", "Removes the black bars in splitscreen. Matches the ar to window resolution.", "Pillar", answers2);

Game.ExecutableContext = ["PhysX3_x86.dll"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steam_interfaces.txt", "sacred3.exe"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "sacred3.exe";
Game.SteamID = "247950";
Game.GUID = "Sacred 3";
Game.GameName = "Sacred 3";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Sacred 3";
Game.HasDynamicWindowTitle = true;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.UserProfileConfigPath = "Saved Games";
Game.Description =
  "Select a different save slot per instance. Create different characters in your main game first in different slots to make sure the game saves. To connect the instances after starting the first stage exit to the lobby in all instances and you can join from there using the friends option. If you want to add one local player per instance select the UI option for local co-op, you can have 4 players in only two instances of the game that way. If you want the instances to resize correctly you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. If you do not like the hub and UI issues in horizontal splitscreen you can select No in the UI pillarboxing option for an alternative horizontal splitscreen. Alt-Tab to the keyboard instance to control it.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var VideoConfig = Context.NucleusUserRoot + "\\Saved Games\\sacred3.cfg";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DisplaySettings", "ScreenResolutionWidth", Context.Width),
    new Nucleus.IniSaveInfo("DisplaySettings", "ScreenResolutionHeight", Context.Height),
    new Nucleus.IniSaveInfo("DisplaySettings", "UseFullscreenMode", "false")
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
    "STEAMREMOTESTORAGE_INTERFACE_VERSION010",
    "STEAMSCREENSHOTS_INTERFACE_VERSION002",
    "STEAMHTTP_INTERFACE_VERSION002",
    "STEAMUNIFIEDMESSAGES_INTERFACE_VERSION001"
  ];

  Context.WriteTextFile(interfaces, lines);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "261160=Sacred 3: Underworld Story ",
    "261161=Sacred 3: Orcland Story ",
    "279110=Sacred 3: Malakhim Hero ",
    "279111=Sacred 3: Orc of Thrones ",
    "279112=Sacred 3: Z4ngr13f Weapon Spirit "
  ];

  Context.WriteTextFile(dlc, lines);

  var native = Context.Options["Native"];
  var pillar = Context.Options["Pillar"];

  if (native == "Yes") {
    if (Context.PlayerID == 0) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "1"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "2"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
    if (Context.PlayerID == 1) {
      var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\XinputPlus.ini";
      Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller1", "3"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller2", "4"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller3", "0"),
        new Nucleus.IniSaveInfo("ControllerNumber", "Controller4", "0")
      ]);
    }
  }

  if (native == "No") {
  }

  if (pillar == "Yes") {
    Context.PatchFile(
      System.IO.Path.Combine(Context.RootInstallFolder, "sacred3.exe"),
      System.IO.Path.Combine(Context.RootFolder, "sacred3.exe"),
      [0x39, 0x8e, 0xe3, 0x3f],
      Context.ConvertToBytes(Context.AspectRatioDecimal)
    );
  }

  if (pillar == "No") {
    if (Context.AspectRatioDecimal > 1.8) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "sacred3.exe"),
        System.IO.Path.Combine(Context.RootFolder, "sacred3.exe"),
        [0x39, 0x8e, 0xe3, 0x3f],
        [0xcd, 0x90, 0x19, 0x40]
      );
    } else {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "sacred3.exe"), System.IO.Path.Combine(Context.RootFolder, "sacred3.exe"), true);
    }
  }
};