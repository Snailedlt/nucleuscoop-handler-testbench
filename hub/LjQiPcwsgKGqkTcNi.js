Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Thu Jan 04 2024 11:56:53 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "LjQiPcwsgKGqkTcNi";
Hub.Maintainer.Name = "Genjuro_Kibagami";
Hub.Maintainer.Id = "6s2Fuz9unXTtH453m";

Game.DirSymlinkExclusions = ["Bin\\x64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "Galaxy64.dll", "steam_appid.txt", "local_save.txt", "xinput1_3.dll"];
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNemirtingasGalaxyEmu = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "SamSM.exe";
Game.ChangeExe = true;
Game.SteamID = "1792250";
Game.GUID = "Serious Sam Siberian Mayhem";
Game.GameName = "Serious Sam: Siberian Mayhem";
Game.BinariesFolder = "Bin\\x64";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.StartArguments = "+gfx_bFullScreen 0";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Serious Sam SM - 64bit";
Game.FakeFocus = true;
Game.FakeFocusInterval = 8000;
Game.SendFakeFocusMsg = true;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\1792250\\remote";
Game.Description = "Gamepads only for now.";
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 30;
Game.KeepSymLinkOnExit = true;

Game.Play = function() {
  var idg = Context.PlayerID + 6;

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin\\x64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var params = [
    "{",
    '  "api_version": "1.144.1.0",',
    '  "enable_overlay": false,',
    '  "galaxyid": 14549624462898294' + idg + ",",
    '  "language": ' + '"' + Context.GogLang + '",',
    '  "productid": 2056531790,',
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Bin\\x64\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};