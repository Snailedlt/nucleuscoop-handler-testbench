Hub.Handler.Version = 15; // Released at https://hub.splitscreen.me/ on Wed Sep 30 2026 13:09:04 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "RnZEzp8vqSjFXJ2pW";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["Yes", "No"];
Game.AddOption(
  "Edit aspect ratio to match the window resolution?",
  "Removes pillarboxing/blackbars, add custom resolutions to your graphics panel first like the handler notes mention.",
  "AR",
  answers1
);

Game.KillMutex = ["DBXV2"];
Game.DirExclusions = ["EasyAntiCheat", "settings", "steam_settings", "bin\\settings", "bin\\steam_settings"];
Game.DirSymlinkExclusions = ["bin", "XV2PATCHER", "bin\\CARROT_TEMPORARY", "bin\\TEMPORARY"];
Game.FileSymlinkExclusions = [
  "steam_appid.txt",
  "local_save.txt",
  "xgcore.dll",
  //"EasyAntiCheat_x64.dll",
  "EOSSDK-Win64-Shipping.dll",
  "winmm.dll",
  "xinput1_3.dll"
];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "iggy_w64.dll", "oo2core_6_win64.dll", "render_pass_x64.dll", "dinput8.dll", "START.exe", "xv2_log.txt", "xv2patcher.ini"];
Game.MutexProcessExe = "DBXV2.exe";
Game.KillMutexProcess = ["XV2PATCHER_INSTANCE"];
Game.GameName = "Dragon Ball Xenoverse 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "DBXV2.exe";
Game.SteamID = "454650";
Game.GUID = "Dragon Ball Xenoverse 2";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.BinariesFolder = "bin";
Game.UseNucleusEnvironment = true;
Game.UseEACBypass = true;
Game.SteamlessPatch = ["false", "--quiet --keepbind", "4000"];
Game.CreateSteamAppIdByExe = true;
Game.SetTopMostAtEnd = true;
Game.DontRemoveBorders = true;
Game.IgnoreWindowBordercheck = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "DRAGON BALL XENOVERSE 2";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\NemirtingasSteamEmu";
Game.UserProfileConfigPath = "AppData\\Local\\BANDAI NAMCO Entertainment\\DB Xenoverse 2";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = false;
Game.Description =
  "WARNING: Fully CLOSE Steam before running this. So the instances launch and resize correctly make sure you ran your main game at least once and changed some graphic settings. You can change the resolution in the game graphic options to adjust better to the window size if you get black bars. The online co-op missions and versus mode unlock after the fight against Raditz and after you beat the first offline parallel quest, host a lobby in one instance and join in the others using search game, try a second time if you get a connection error when hosting or joining a lobby. You need to add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 1920x600, 960x600 etc.) for the game to see and use them. If you want to use XV2PATCHER for mods you need to install it in your main files using the alternative dinput8.dll it includes and not the xinput1_3.dll default installation.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("DEV", "EAC_AllowDisparityMatch", "1"),
    new Nucleus.IniSaveInfo("DEV", "EAC_MultiplayerWithoutEAC", "1"),
    new Nucleus.IniSaveInfo("Graphics", "Display/FullScreen", "2"),
    new Nucleus.IniSaveInfo("Options", "VoiceChat/Mic", "0"),
    new Nucleus.IniSaveInfo("XGUI", "FreeMouse", "1")
  ]);

  var BN = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\bin";

  Context.CopyFolder(Context.ScriptFolder + "\\nsteame_settings", BN + "\\nsteame_settings");

  Context.CopyFolder(Context.ScriptFolder + "\\nepice_settings", BN + "\\nepice_settings");

  var filePath = BN + "\\steam_settings";
  System.IO.Directory.CreateDirectory(filePath);

  var appid = BN + "\\steam_settings\\steam_appid.txt";
  var lines = ["454650"];
  Context.WriteTextFile(appid, lines);

  var savePath = (Context.SavePath = BN + "\\coldloader.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "coldloader.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = BN + "\\winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var dlllist = BN + "\\dlllist.txt";
  var lines = ["coldloader.dll"];
  Context.WriteTextFile(dlllist, lines);

  var savePath = (Context.SavePath = BN + "\\steamclient64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "steamclient64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = BN + "\\EOSSDK-Win64-Shipping.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "EOSSDK-Win64-Shipping.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var id = 18 + Context.PlayerID;
  var pd = 4 + Context.PlayerID;

  var txtPath = BN + "\\nsteame_settings\\NemirtingasSteamEmu.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '      "Language":', Nucleus.SearchType.StartsWith) + '|      "Language": "' + Context.SteamLang + '",',
    Context.FindLineNumberInTextFile(txtPath, '      "SteamId":', Nucleus.SearchType.StartsWith) + '|      "SteamId": ' + Context.PlayerSteamID + ",",
    Context.FindLineNumberInTextFile(txtPath, '      "UserName":', Nucleus.SearchType.StartsWith) + '|      "UserName": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var txtPath = BN + "\\nepice_settings\\NemirtingasEpicEmu.json";
  var dict = [
    //Context.FindLineNumberInTextFile(txtPath, '      "EpicId":', Nucleus.SearchType.StartsWith) + '|      "EpicId": "831ec62c44424917a0fb315de2b5dc'+id+'",',
    Context.FindLineNumberInTextFile(txtPath, '      "Language":', Nucleus.SearchType.StartsWith) + '|      "Language": "' + Context.EpicLang + '",',
    //Context.FindLineNumberInTextFile(txtPath, '      "ProductUserId":', Nucleus.SearchType.StartsWith) + '|      "ProductUserId": "4e93fc9a0afba653e68be0c1e74cdac'+pd+'",',
    Context.FindLineNumberInTextFile(txtPath, '	  "SteamCrossplayIdOverride":', Nucleus.SearchType.StartsWith) + '|	  "SteamCrossplayIdOverride": ' + Context.PlayerSteamID + ",",
    Context.FindLineNumberInTextFile(txtPath, '      "UserName":', Nucleus.SearchType.StartsWith) + '|      "UserName": "' + Context.Nickname + '"'
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var ar = Context.Options["AR"];

  if (ar == "Yes") {
    if (Context.AspectRatioDecimal > 1.8) {
      var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
      Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Graphics", "Display/Height", Context.Height),
        new Nucleus.IniSaveInfo("Graphics", "Display/Width", Context.Width)
      ]);

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "xgcore.dll"),
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        [0x56, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0xe3, 0x3f],
        [0x56, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0x63, 0x40]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        [0x2d, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0xe3, 0x3f],
        [0x2d, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0x63, 0x40]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        [0x01, 0x39, 0x8e, 0xe3, 0x3f, 0xeb],
        [0x01, 0x39, 0x8e, 0x63, 0x40, 0xeb]
      );
    } else if (Context.AspectRatioDecimal < 1.2) {
      var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
      Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Graphics", "Display/Height", Context.Height),
        new Nucleus.IniSaveInfo("Graphics", "Display/Width", Context.Width)
      ]);

      //patch aspect ratio.
      Context.PatchFile(
        System.IO.Path.Combine(Context.RootInstallFolder, "xgcore.dll"),
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        [0x56, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0xe3, 0x3f],
        [0x56, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0x63, 0x3f]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        [0x2d, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0xe3, 0x3f],
        [0x2d, 0x33, 0x00, 0xc7, 0x41, 0x24, 0xdb, 0x0f, 0x49, 0x3f, 0xc7, 0x41, 0x20, 0x39, 0x8e, 0x63, 0x3f]
      );

      Context.PatchFile(
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"),
        [0x01, 0x39, 0x8e, 0xe3, 0x3f, 0xeb],
        [0x01, 0x39, 0x8e, 0x63, 0x3f, 0xeb]
      );
    } else {
      System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "xgcore.dll"), System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"), true);
    }

    var screenreswidth = Context.Width;
    var screenresheight = Context.Height;

    if (screenreswidth == 1920 && screenresheight == 540) {
      //1080p Horizontal

      var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
      Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("Graphics", "Display/Height", Context.Height + 60),
        new Nucleus.IniSaveInfo("Graphics", "Display/Width", Context.Width)
      ]);
    }
  }

  if (ar == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "xgcore.dll"), System.IO.Path.Combine(Context.RootFolder, "bin\\xgcore.dll"), true);
  }
};