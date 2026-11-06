Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Fri Aug 16 2024 21:12:33 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "r6CnSYPmYPqtSb7wF";
Hub.Maintainer.Name = "birden";
Hub.Maintainer.Id = "rRycxSn253ZCjQy5C";

var answers1 = ["60", "30", "45", "75", "90", "120"];
Game.AddOption("Select the FPS cap.", "", "fps", answers1);

Game.ExecutableContext = ["EOSSDK-Win64-Shipping.dll"];

Game.DirExclusions = ["disk_cache"];
Game.DirSymlinkExclusions = ["game", "maps", "maps\\fonts", "game\\D3D12", "game\\data", "game\\data\\hardware", "game\\x64"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "dinput8.dll", "XInputUap.dll", "server.bat", "launch.bat"];
Game.FileSymlinkCopyInstead = [
  "EOSSDK-Win64-Shipping.dll",
  "CommonEventLoggingLibrary_Release.dll",
  "discord_game_sdk.dll",
  "DumpTool.exe",
  "DumpToolException_6068.bin",
  "GdkSupport_Release.dll",
  "HaloInfinite.exe.asr",
  "i343ETWProvider_Release.dll",
  "libcrypto-1_1-x64.dll",
  "libcurl.dll",
  "libssl-1_1-x64.dll",
  "PackageFeautures.xml",
  "PartyWin.dll",
  "PartyXboxLive.dll",
  "pck_list.bin",
  "steam_api64.dll",
  "SteamGame.Config",
  "version.txt",
  "XalClockSkew.json",
  "XsapiThunks_Release.dll",
  "SteamGame.Config",
  "PackageFeatures.xml",
  "font_package.bin",
  "font_package_chs.bin",
  "font_package_cht.bin",
  "font_package_jpn.bin",
  "font_package_kor.bin",
  "font_package_ru.bin",
  "D3D12Core.dll",
  "D3D12SDKLayers.dll",
  "GPU_AMD.cfg",
  "GPU_Intel.cfg",
  "GPU_Nvidia.cfg",
  "xaudio2_9redist.dll"
];
Game.KillProcessesOnClose = ["cmd", "start", "mutex"];

Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "HaloInfinite.exe";
Game.BinariesFolder = "game";
Game.LauncherExe = "launch.bat";
Game.LauncherExeIgnoreFileCheck = true;
Game.GUID = "Halo Infinite";
Game.GameName = "Halo Infinite";
Game.SteamID = "1240440";
Game.CreateSteamAppIdByExe = true;
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.HideTaskbar = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Halo Infinite";
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.ResetWindows = true;
Game.HookFocus = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["XInputUap.dll"];
Game.Hook.CustomDllEnabled = false;
Game.Description =
  "IMPORTANT: YOU NEED STEAM OPEN AND LAUNCH THE GAME ONCE BEFORE PLAYING SPLIT SCREEN. ALSO DISABLE STEAM INPUT\n\nYour first launch in split screen WILL take ALOT LONGER to get to the main menu, from second launch and beyond it will take alot less time.\n\nTHIS HANDLER IS NOT FOR COOP CAMPAIGN, ONLY FOR MULTIPLAYER.\n\nTHE MAX PLAYER/BOT AMOUNT IS 8.\n\nSETTINGS IN LAN WONT VISUALLY CHANGE, BUT THEY ARE BEING CHANGED. THATS A ISSUE WITH THE GAME NOT THE HANDLER.\n\nDo loadout/skins/etc changes on your accounts before going into split screen, they will apply to split screen.\n\nWhen you get prompt that EAC is disabled and that you should quit the game, just continue and play\n\nOnce the first instance opens log-in with a microsoft account, log-in using a different microsoft account per instance, recommend using dummy accounts. if you are already logged-in with the same account in a different instance log-out and log-in with a different one by going into settings and logging out. If you cant type in the microsoft login, just alt+tab to the screen.\n\nTo connect to the server go to custom game > create game > server > (your PC name) and you will be connected. Do the same for all players to connect to each other, first player to connect will be the host.\n\nIf you have a keyboard/mouse player alt+tab to the screen for it to work.\n\nThis game is very demanding so reduce graphics settings, lower the resolution scale if you notice texture issues.";
Game.UseNucleusEnvironment = true;
Game.UserProfileConfigPath = "AppData\\Local\\HaloInfinite\\Settings";
Game.PauseBetweenProcessGrab = 5;
Game.PauseBetweenStarts = 15;

Game.SetTopMostAtEnd = true;
Game.SupportsKeyboard = true;
Game.SetWindowHook = true;

Game.Play = function() {
  var RealRoot = System.IO.Path.Combine(Context.RootInstallFolder, "..");

  System.IO.Directory.CreateDirectory(Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disk_cache");
  Context.CopyFolder(RealRoot + "\\disk_cache", Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disk_cache");

  var savePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\HaloInfinite.exe";
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "HaloInfinite.exe");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var FPS = Context.Options["fps"];

  Context.RunAdditionalFiles([Context.ScriptFolder + "\\mutex.exe"], false, "", 5, false, true, false, false);
  Context.RunAdditionalFiles([Context.ScriptFolder + "\\start.exe"], false, "", 5, false, false, false, false);

  var timese = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\launch.bat";
  var lines = ["@echo off", "HaloInfinite.exe"];
  Context.WriteTextFile(timese, lines);

  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\game\\steam_appid.txt";
  var lines = ["1240440"];
  Context.WriteTextFile(appid, lines);
  var appid = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_appid.txt";
  var lines = ["1240440"];
  Context.WriteTextFile(appid, lines);

  var config = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\SpecControlSettings.json";
  if (!System.IO.File.Exists(config)) {
    System.IO.Directory.CreateDirectory(Context.EnvironmentPlayer + "\\AppData\\Local\\HaloInfinite");
    System.IO.Directory.CreateDirectory(Context.EnvironmentPlayer + "\\AppData\\Local\\HaloInfinite\\Settings");

    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "SpecControlSettings.json");
    System.IO.File.Copy(savePkgOrigin, config, true);
  }

  var cfgFilePath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\SpecControlSettings.json";

  var screenWidthLine = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_windowed_display_resolution_x"', Nucleus.SearchType.Contains) + 2;
  var screenHeightLine = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_windowed_display_resolution_y"', Nucleus.SearchType.Contains) + 2;
  var windowModeLine = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_window_mode"', Nucleus.SearchType.Contains) + 2;
  var muteLine = Context.FindLineNumberInTextFile(cfgFilePath, '"mute_audio_on_loss_of_focus"', Nucleus.SearchType.Contains) + 2;
  var capLine = Context.FindLineNumberInTextFile(cfgFilePath, '"cap_frame_rate_on_loss_of_focus"', Nucleus.SearchType.Contains) + 2;

  var FPSlimit1 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_minimum_framerate"', Nucleus.SearchType.Contains) + 2;
  var FPSlimit2 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_target_framerate"', Nucleus.SearchType.Contains) + 2;

  var scale = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_resolution_scale"', Nucleus.SearchType.Contains) + 2;

  Context.ReplaceLinesInTextFile(cfgFilePath, [
    screenWidthLine + '|        "value": ' + Context.Width,
    screenHeightLine + '|        "value": ' + Context.Height,
    windowModeLine + '|        "value": 0',
    muteLine + '|        "value": 0',
    capLine + '|        "value": 0',

    FPSlimit1 + '|        "value": ' + FPS,
    FPSlimit2 + '|        "value": ' + FPS,
    scale + '|        "value": 100'
  ]);

  if (Context.PlayerID == 0) {
    var music1 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_music_volume"', Nucleus.SearchType.Contains) + 2;
    var music2 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_dialog_volume"', Nucleus.SearchType.Contains) + 2;
    var music3 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_menu_music_volume"', Nucleus.SearchType.Contains) + 2;

    Context.ReplaceLinesInTextFile(cfgFilePath, [
      music1 + '|        "value": 8', //not too loud or quiet
      music2 + '|        "value": 8',
      music3 + '|        "value": 8'
    ]);
  } else {
    var music1 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_music_volume"', Nucleus.SearchType.Contains) + 2;
    var music2 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_dialog_volume"', Nucleus.SearchType.Contains) + 2;
    var music3 = Context.FindLineNumberInTextFile(cfgFilePath, '"spec_control_menu_music_volume"', Nucleus.SearchType.Contains) + 2;

    Context.ReplaceLinesInTextFile(cfgFilePath, [music1 + '|        "value": 0', music2 + '|        "value": 5', music3 + '|        "value": 0']);
  }

  var server = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.bat";
  var lines = ["@echo off", "TITLE LAN SERVER CREATION", "HaloInfinite.exe -server -console -lan -lan_sandbox RETAIL"];

  Context.WriteTextFile(server, lines);

  Game.OnFinishedSetup = function() {
    Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\server.bat"], false, "", 0, false, false, false, false);
  };
};