Hub.Handler.Version = 8; // Released at https://hub.splitscreen.me/ on Mon Mar 28 2022 03:54:06 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "us2RLk7KeWe7rrexW";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv140\\Win64", "TowerOfGuns2\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_3.dll", "EOSSDK-Win64-Shipping.dll"];
Game.GameName = "MOTHERGUNSHIP";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "TowerOfGuns2-Win64-Shipping.exe";
Game.SteamID = "574090";
Game.GUID = "MOTHERGUNSHIP";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "TowerOfGuns2\\Binaries\\Win64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.UseNemirtingasEpicEmu = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MOTHERGUNSHIP";
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.SupportsKeyboard = true;
Game.KeyboardPlayerFirst = true;
Game.UserProfileSavePath = "AppData\\Local\\TowerOfGuns2\\Saved\\SaveGames";
Game.UserProfileConfigPath = "AppData\\Local\\TowerOfGuns2\\Saved\\Config\\WindowsNoEditor";
Game.Description =
  "Get past the tutorial in all instances to connect to the other players. Each instance has its own saves that are copies of your original one, so your original save will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height;

  var jsonPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TowerOfGuns2\\Binaries\\Win64\\nepice_settings\\NemirtingasEpicEmu.json";
  var params = [
    "{",
    '  "disable_online_networking": false,',
    '  "enable_lan": true,',
    '  "enable_overlay": true,',
    '  "language": ' + '"' + Context.EpicLang + '"' + ",",
    '  "username": ' + '"' + Context.Nickname + '"',
    "}"
  ];
  Context.WriteTextFile(jsonPath, params);

  if (!System.IO.File.Exists(Context.OrigRootFolder + "\\Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv140\\Win64\\steam_api64.dll")) {
    Game.UseGoldberg = false;
  } else {
  }
};