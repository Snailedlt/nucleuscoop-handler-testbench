Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Tue Jul 27 2021 05:59:28 GMT+0000 (UTC).
Hub.Handler.Id = "yCm7ENsGaYiaTbDSN";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
Game.AddOption("Letterboxing/Pillarboxing fix?", "Removes the black bars in split. Use it after you already set the res in-game.", "Pillar", answers1);
Game.AddOption("Use Process Picker?", "If you want to set the game to window or change the res this makes it easier.", "Picker", answers2);

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "EDF5.exe"];
Game.GameName = "EARTH DEFENSE FORCE 5";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "edf5.exe";
Game.SteamID = "1007040";
Game.GUID = "Earth Defense Force 5";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "EarthDefenseForce 5 for PC";
Game.PreventWindowDeactivation = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
//Game.PlayerSteamIDs = [ "76561198134585131"];
Game.UserProfileSavePath = "Documents\\My Games\\EDF5\\SAVE_DATA";
Game.Description =
  "On first run you have to set all the instances to windowed (select Fullscreen off) and in the custom resolution you want in the in-game display settings then exit via the in-game menus to the title screen for the settings to save, on second run the windows will resize correctly. Alt-Tab to the instance you selected for keyboard to control it. To avoid stretching, you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x540, 1920x540, 960x1080, etc.) and select one in the in-game display settings.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "1057270=EARTH DEFENSE FORCE 5 - Mission Pack 1",
    "1057271=EARTH DEFENSE FORCE 5 - Mission Pack 2",
    "1057272=EARTH DEFENSE FORCE 5 - Ranger Piloted Weapon Omega Freesia",
    "1057273=EARTH DEFENSE FORCE 5 - Ranger Vehicle Light Truck",
    "1057274=EARTH DEFENSE FORCE 5 - Ranger Support Device Detector S-Type",
    "1057275=EARTH DEFENSE FORCE 5 - Ranger Piloted Weapon Blacker Number 4.1",
    "1057276=EARTH DEFENSE FORCE 5 - Wing Diver Support Device Reverse Core S-Type",
    "1057277=EARTH DEFENSE FORCE 5 - Fencer Weapon Grim Reaper Shield",
    "1057278=EARTH DEFENSE FORCE 5 - Fencer Weapon Happy Body Pillow",
    "1057279=EARTH DEFENSE FORCE 5 - Fencer Support Device Wild Skeleton",
    "1057280=EARTH DEFENSE FORCE 5 - Air Raider Weapon FZ-GUN",
    "1057281=EARTH DEFENSE FORCE 5 - Air Raider Piloted Weapon Combat Frame Phantasia Shield Nyx",
    "1057282=EARTH DEFENSE FORCE 5 - Air Raider Piloted Weapon Blacker Number 5",
    "1057283=EARTH DEFENSE FORCE 5 - Air Raider Vehicle Caliban Armored Ambulance Joyful Marking",
    "1076010=EARTH DEFENSE FORCE 5 - Ranger Weapon Decoy Launcher (Pale Wing)",
    "1076011=EARTH DEFENSE FORCE 5 - Air Raider Piloted Weapon Combat Frame Gold Nyx",
    "1076012=EARTH DEFENSE FORCE 5 - Wing Diver Weapon Vulcaneer Cracker",
    "1076013=EARTH DEFENSE FORCE 5 - Wing Diver Weapon Starburst",
    "1076014=EARTH DEFENSE FORCE 5 - Ranger Weapon Singing and Dancing Pure Decoy Launcher Set of 8",
    "1076015=EARTH DEFENSE FORCE 5 - Air Raider Weapon Singing and Dancing Pure Decoy Launcher Set of 8"
  ];

  Context.WriteTextFile(dlc, lines);

  if (Context.HasKeyboardPlayer == true) {
  } else {
    Game.SetForegroundWindowElsewhere = true;
  }

  var pillar = Context.Options["Pillar"];
  var picker = Context.Options["Picker"];

  if (pillar == "Yes") {
    //remove pillar boxing
    if (Context.AspectRatioDecimal > 1.8) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "EDF5.exe"),
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        [0xcd, 0xcc, 0xcc, 0x3f, 0x00, 0x00, 0x00, 0x00], //CD CC CC 3F 00 00 00 00 Change aspect ratio.
        [0xcd, 0xcc, 0xcc, 0x3f, 0x39, 0x8e, 0x63, 0x40]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        [0x10, 0x0d, 0x5e, 0xa3], //10 0D 5E A3
        [0x10, 0x0d, 0x42, 0xa3]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        [0x20, 0x34, 0xa3, 0x00], //20 34 A3 00  Fix Hud
        [0x04, 0x34, 0xa3, 0x00]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        [0x00, 0x00, 0x10, 0x3f, 0x85], //00 00 10 3F 85 Fix text bubbles
        [0x71, 0x3d, 0x8a, 0x3e, 0x85]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        [0x16, 0xc4, 0x00, 0x00], //16 C4 00 00
        [0xa5, 0xc3, 0x00, 0x00]
      );
    } else if (Context.AspectRatioDecimal < 1.2) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "EDF5.exe"),
        System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"),
        [0xcd, 0xcc, 0xcc, 0x3f, 0x00, 0x00, 0x00, 0x00],
        [0xcd, 0xcc, 0xcc, 0x3f, 0x39, 0x8e, 0x63, 0x3f]
      );

      Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), [0x10, 0x0d, 0x5e, 0xa3], [0x10, 0x0d, 0x42, 0xa3]);

      Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), [0x00, 0x00, 0x10, 0x3f, 0x85], [0x33, 0x33, 0x93, 0x3f, 0x85]);

      Context.PatchFile(System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), [0x16, 0xc4, 0x00, 0x00], [0xa5, 0xc3, 0x00, 0x00]);
    } else {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "EDF5.exe"), System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), true);
    }
  }

  if (pillar == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "EDF5.exe"), System.IO.Path.Combine(Context.RootFolder, "EDF5.exe"), true);
  }

  if (picker == "Yes") {
    Game.ForceProcessPick = true;
    Game.PromptBetweenInstances = true;
  }

  if (picker == "No") {
  }
};