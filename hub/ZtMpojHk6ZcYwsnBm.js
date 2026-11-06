Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Fri Jun 05 2020 23:44:29 GMT+0000 (UTC).
Hub.Handler.Id = "ZtMpojHk6ZcYwsnBm";
Hub.Maintainer.Name = "LineOf7s";
Hub.Maintainer.Id = "zYddaTLp6ucHDooMz";

Game.DirSymlinkExclusions = ["media"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["config.ini"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "hind.exe";
Game.SteamID = "423490";
Game.GUID = "Air Missions HIND";
Game.GameName = "Air Missions - HIND";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "C3D - Airplane";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.BlockMouseEvents = true;
Game.Hook.BlockInputEvents = true;
Game.Hook.BlockKeyboardEvents = false;
Game.PauseBetweenStarts = 20;

Game.Play = function() {
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\media\\config.ini";
  var dict = ["3|$INT RESOLUTIONX " + Context.Width, "4|$INT RESOLUTIONY " + Context.Height, "5|$INT WINDOWED 1"];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};