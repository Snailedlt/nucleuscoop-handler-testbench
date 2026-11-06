Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Mon Sep 08 2025 21:56:06 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "aqgvFgGTb7Cs92qT5";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["amd_ags_x64.dll"];
Game.DirExclusions = ["Collab Trainer", "natives"];
Game.DirSymlinkExclusions = ["reframework\\plugins"];
Game.FileSymlinkExclusions = [
  "steam_appid.txt",
  "local_save.txt",
  "xinput1_3.dll",
  "SmartSteamLoader_x64.exe",
  "SmartSteamEmu64.dll",
  "imgui.ini",
  "re2_framework_log.txt",
  "re2_fw_config.txt",
  "ref_ui.ini",
  "reframework_accessed_files.txt",
  "reframework_loose_files.txt"
];
Game.FileSymlinkCopyInstead = [
  "steam_api64.dll",
  "amd_ags_x64.dll",
  "dmc5config.ini",
  "re_chunk_000.pak.patch_001.pak",
  "re_chunk_000.pak.patch_002.pak",
  "re_chunk_000.pak.patch_003.pak",
  "re_chunk_000.pak.patch_004.pak",
  "re_chunk_000.pak.patch_006.pak",
  "data001Slot.bin",
  "dinput8.dll",
  "coop_trainer.dll",
  "coop_trainer_config.ini",
  "sssiyan.dll",
  "REFramework.dll",
  "runtime.args",
  "modinfo.ini"
];
Game.NeedsSteamEmulation = true;
Game.SSEAdditionalLines = [
  "DLC|1432643=Devil May Cry 5 - Vergil EX Provocation",
  "DLC|1432642=Devil May Cry 5 - Super Vergil Unlock",
  "DLC|1432641=Devil May Cry 5 - Vergil Battle Track 4-Pack",
  "DLC|1432640=Devil May Cry 5 - Playable Character: Vergil",
  "DLC|941965=Devil May Cry 5 - Monkey Business",
  "DLC|941964=Devil May Cry 5 - V & Vergil Alt Colors",
  "DLC|941963=Devil May Cry 5 - Taunt Trio",
  "DLC|941962=Devil May Cry 5 - Super Character 3-Pack",
  "DLC|941961=Devil May Cry 5 - Cavaliere R",
  "DLC|941960=Devil May Cry 5 - Mega Buster",
  "DLC|941959=Devil May Cry 5 - Sweet Surrender",
  "DLC|941958=Devil May Cry 5 - Pasta Breaker",
  "DLC|941957=Devil May Cry 5 - Gerbera GP01",
  "DLC|941956=Devil May Cry 5 - DMC4 Battle Track 3-Pack",
  "DLC|941955=Devil May Cry 5 - DMC3 Battle Track 3-Pack",
  "DLC|941954=Devil May Cry 5 - DMC2 Battle Track 3-Pack",
  "DLC|941953=Devil May Cry 5 - DMC1 Battle Track 3-Pack",
  "DLC|941952=Devil May Cry 5 - Live Action Cutscenes",
  "DLC|941951=Devil May Cry 5 - Alt Title Calls",
  "DLC|941950=Devil May Cry 5 - Alt Style Rank Announcers",
  "DLC|940501=Devil May Cry 5 - Alt Heroine Colors",
  "DLC|940500=Devil May Cry 5 - Alt Hero Colors"
];
Game.SteamlessPatch = ["false", "--quiet --keepbind", "9000"];
Game.GameName = "Devil May Cry 5";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "DevilMayCry5.exe";
Game.SteamID = "601150";
Game.GUID = "Devil May Cry 5";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Devil May Cry 5";
Game.RefreshWindowAfterStart = true;
Game.HookFocus = true;
Game.ResetWindows = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.SupportsKeyboard = false;
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\SmartSteamEmu";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: This needs the latest [DMCV Co-op trainer dll]{https://www.nexusmods.com/devilmaycry5/mods/353?tab=files} by Dante and Raz0r. Place the coop_trainer.dll inside the Nucleus Co-op folder handlers\\Devil May Cry 5, you do not need to do this if you already have the coop dll installed in your main game files alongside the RE Framework. Once the instances launch you can open and close the RE Framework overlay with the Insert key, the Co-op settings can be found in the overlay under Script Generated UI-CO-OP Trainer by Dante & Raz0r, tick the coop/divergence option there for all instances, alt-tab to an instance to use the keyboard. Select a mission/bloody palace, difficulty and character and they should connect automatically once in-game, if the Co-op mod activated correctly in the instances you should see a character selection screen before starting a mission and a connecting to network message when a level is loading, get past the tutorial first, make sure all instances have the game network setting and friend priority enabled. When all instances are in-game, pause and then unpause simultaneously or one by one to connect to each other, if this doesn't work restart from the checkpoint for all instances. On first Nucleus run set the resolution in the game options that matches the window size in all instances, to avoid stretching in split-screen you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see them and you can select them. To remove black bars in split-screen in the RE Framework menu click on graphics and enable the aspect ratio fix, you can also change the FOV. Reduce graphics settings per instance to improve performance. Make sure you are using the DMC5 vanilla Steam game files as some mods could cause issues.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenContextAndLaunch = 10;
Game.PauseBetweenProcessGrab = 12;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dmc5config.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("RenderConfig", "FullScreenMode", "false"),
    new Nucleus.IniSaveInfo("RenderConfig", "WindowMode", "Normal") //Borderless
  ]);

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\reframework\\plugins\\coop_trainer.dll")) {
    System.IO.File.Copy(
      System.IO.Path.Combine(Context.RootInstallFolder, "reframework\\plugins\\coop_trainer.dll"),
      System.IO.Path.Combine(Context.RootFolder, "reframework\\plugins\\coop_trainer.dll"),
      true
    );

    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "dinput8.dll"), System.IO.Path.Combine(Context.RootFolder, "dinput8.dll"), true);
  } else {
    var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\reframework\\plugins");
    System.IO.Directory.CreateDirectory(filePath);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\reframework\\plugins\\coop_trainer.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "coop_trainer.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\dinput8.dll");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dinput8.dll");
    System.IO.File.Copy(savePkgOrigin, savePath, true);
  }

  if (System.IO.File.Exists(Context.OrigRootFolder + "\\reframework\\plugins\\sssiyan.dll")) {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "reframework\\plugins\\sssiyan.dll"), System.IO.Path.Combine(Context.RootFolder, "reframework\\plugins\\sssiyan.dll"), true);

    Context.CopyFolder(Context.OrigRootFolder + "\\Collab Trainer", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Collab Trainer");

    Context.CopyFolder(Context.OrigRootFolder + "\\natives", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\natives");
  }
};