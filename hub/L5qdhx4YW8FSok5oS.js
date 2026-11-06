Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Wed Sep 27 2023 00:50:26 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "L5qdhx4YW8FSok5oS";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption(
  "Change resolution and aspect ratio to match window size?",
  "Fixes blackbars and stretching in split-screen for various monitor resolutions, set your monitor scale to 100% if you do not see the changes in-game.",
  "AR",
  answers1
);

Game.ExecutableContext = ["bin.qpck"];
Game.KillMutex = ["GE2RB"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "steamclient.dll", "ValveAPI.dll", "CPY.ini", "SST311212.dll", "xinput1_3.dll"];
Game.GameName = "God Eater 2 Rage Burst";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "GE2RB.exe";
Game.SteamID = "438490";
Game.GUID = "God Eater 2 Rage Burst";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = true;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "God Eater 2 Rage Burst";
Game.FakeFocus = true;
Game.FakeFocusInterval = 5000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Local\\BANDAI NAMCO GAMES\\GOD EATER 2 RAGE BURST";
Game.Description =
  "CLOSE Steam completely before running this. If you want the instances to resize correctly and fix stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example for a 1920x1080 monitor add: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Each instance has its own save, you can access these saves via Nucleus, after the first launch click game options/open user profile config path in the UI. Gamepads only.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GFX", "Fullscreen", "0")]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_api.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steam_api.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steamclient.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\SST311212.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SST311212.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\ValveAPI.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "ValveAPI.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CPY.ini");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "CPY.ini");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\CPY.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("Settings", "PlayerName", Context.Nickname),
    new Nucleus.IniSaveInfo("Settings", "SavePath", Context.EnvironmentPlayer + Context.UserProfileConfigPath)
  ]);

  var ar = Context.Options["AR"];

  if (ar == "Yes") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;

    var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
    Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("GFX", "Resolution_Width", "1920"),
      new Nucleus.IniSaveInfo("GFX", "Resolution_Height", "1080"),
      new Nucleus.IniSaveInfo("GFX", "Fullscreen", "0")
    ]);

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "GE2RB.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "GE2RB.exe"),
      "3F 80 07 00 00 38 04",
      Context.Height,
      6,
      true
    );

    Context.PatchFileFindPattern(
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "GE2RB.exe"),
      System.IO.Path.Combine(Context.GetFolder(Nucleus.Folder.InstancedGameFolder), "GE2RB.exe"),
      "3F 80 07",
      Context.Width,
      2,
      true
    );

    if (Context.AspectRatioDecimal > 1.8) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "GE2RB.exe"),
        System.IO.Path.Combine(Context.RootFolder, "GE2RB.exe"),
        [0x3f, 0x00, 0x00, 0x80, 0x41], //Aspect Ratio 16:9
        [0x3f, 0x00, 0x00, 0x00, 0x42]
      );
    } else if (Context.AspectRatioDecimal < 1.2) {
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "GE2RB.exe"),
        System.IO.Path.Combine(Context.RootFolder, "GE2RB.exe"),
        [0x3f, 0x00, 0x00, 0x80, 0x41],
        [0x3f, 0x00, 0x00, 0x00, 0x41]
      );
    } else {
    }
  }

  if (ar == "No") {
    if (Context.AspectRatioDecimal < 1.2) {
      Context.BackupFile(Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini", true);

      var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
      Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("GFX", "Resolution_Width", Context.Width),
        new Nucleus.IniSaveInfo("GFX", "Resolution_Height", Context.Height),
        new Nucleus.IniSaveInfo("GFX", "Fullscreen", "0")
      ]);
    } else {
    }
  }
};