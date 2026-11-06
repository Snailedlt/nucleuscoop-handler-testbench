Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun May 03 2020 16:59:25 GMT+0000 (UTC).
Hub.Handler.Id = "Cjg5fa5z5xCF9tGXj";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["options.cfg"];
Game.GameName = "Cube World";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "cubeworld.exe";
Game.SteamID = "1128000";
Game.GUID = "Cube World";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Cube World";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.XInputNames = ["xinput1_4.dll"];
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\options.cfg";
  var dict = ["1|fullscreen 0", "2|resolutionX " + Context.Width, "3|resolutionY " + Context.Height];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};