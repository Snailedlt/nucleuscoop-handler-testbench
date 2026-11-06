Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Jan 25 2025 03:08:46 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "uKpL2g5aq6jy7LPXr";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Dungeons3Bin_Data"];
Game.DirSymlinkExclusions = ["Dungeons3Bin_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "Dungeons3.exe", "KalypsoLauncher.exe", "winmm.dll", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["AppData.kla", "Dungeons3.exe", "KalypsoLauncher.exe", "mono-2.0-sgen.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = false;
Game.SteamlessPatch = ["false", "--quiet --keepbind", "2500"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "Dungeons3Bin.exe";
Game.SteamID = "493900";
Game.CreateSteamAppIdByExe = true;
Game.GUID = "Dungeons 3";
Game.GameName = "Dungeons 3";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Dungeons 3";
Game.FakeFocus = true;
Game.FakeFocusInterval = 2000;
Game.SendFakeFocusMsg = true;
Game.RefreshWindowAfterStart = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.BlockRawInput = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Kalypso Media\\Dungeons 3";
Game.Description = "Tested on latest Steam version. Press A on gamepads to enable them in menus, you can also use the cursor to join the same public multiplayer game.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0"; //-window-mode=exclusive

  var txtPath = Context.NucleusUserRoot + "\\AppData\\Roaming\\Kalypso Media\\Dungeons 3\\config.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Graphic.Resolution =", Nucleus.SearchType.StartsWith) + "|Graphic.Resolution = " + Context.Width + "x" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "Graphic.FullScreen =", Nucleus.SearchType.StartsWith) + "|Graphic.FullScreen = False",
    Context.FindLineNumberInTextFile(txtPath, "Graphic.WindowedResolution =", Nucleus.SearchType.StartsWith) + "|Graphic.WindowedResolution = " + Context.Width + "x" + Context.Height
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Realmforge Studios GmbH\\Dungeons 3", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Realmforge Studios GmbH\\Dungeons 3", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Realmforge Studios GmbH\\Dungeons 3", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dungeons3Bin_Data\\Plugins\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Dungeons3Bin_Data\\Plugins\\steam_settings\\DLC.txt";
  var lines = [
    "1198940=Dungeons 3 - A Multitude of Maps",
    "1049940=Dungeons 3 - Famous Last Words",
    "1023950=Dungeons 3 - Seasonal - Easter",
    "975360=Dungeons 3 - An Unexpected DLC",
    "975330=Dungeons 3 - Seasonal - Chinese New Year",
    "824610=Dungeons 3 - Clash of Gods",
    "711681=Dungeons 3 - Lord of the Kings",
    "711680=Dungeons 3 - Evil of the Caribbean",
    "711172=Dungeons 3 - Once Upon A Time",
    "711171=Dungeons 3 - Seasonal - Christmas",
    "711170=Dungeons 3 - Seasonal - Halloween",
    "630092=Dungeons 3 - Theme - Undead",
    "630091=Dungeons 3 - Theme - Demon",
    "630090=Dungeons 3 - Theme - Horde"
  ];
  Context.WriteTextFile(dlc, lines);
};