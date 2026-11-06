Hub.Handler.Version = 6; // Released at https://hub.splitscreen.me/ on Thu Jan 04 2024 11:36:21 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "nS37EL53drArouA2A";
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
Game.ExecutableName = "Sam4.exe";
Game.ChangeExe = true;
Game.SteamID = "257420";
Game.GUID = "Serious Sam 4";
Game.GameName = "Serious Sam 4";
Game.BinariesFolder = "Bin\\x64";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.StartArguments = "+gfx_bFullScreen 0";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Serious Sam 4 - 64bit";
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
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\257420\\remote";
Game.Description = "Gamepads only for now.";
Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var idg = Context.PlayerID + 6;

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Bin\\x64\\ngalaxye_settings\\NemirtingasGalaxyEmu.json";
  var params = [
    "{",
    '  "api_version": "1.144.1.0",',
    '  "enable_overlay": false,',
    '  "galaxyid": 14549624462898294' + idg + ",",
    '  "language": ' + '"' + Context.GogLang + '",',
    '  "productid": 1407036516,',
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Bin\\x64\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};