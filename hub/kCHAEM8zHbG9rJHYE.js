Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sun Nov 08 2020 09:02:27 GMT+0000 (UTC).
Hub.Handler.Id = "kCHAEM8zHbG9rJHYE";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Bin32"];
Game.FileSymlinkCopyInstead = ["system.cfg"];
Game.KillMutex = ["CrytekApplication"];
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "crysis 2 multiplayer.exe";
Game.SteamID = "690";
Game.GUID = "Crysis 2 NanoWars";
Game.GameName = "Crysis 2 NanoWars";
Game.NeedsSteamEmulation = false;
Game.LauncherTitle = "";
Game.BinariesFolder = "Bin32";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 4;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Crysis 2 (TM)";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.UseAlpha8CustomDll = true;
Game.SetForegroundWindowElsewhere = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\system.cfg");
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("", "r_width", Context.Width),
    new Nucleus.IniSaveInfo("", "r_height", Context.Height),
    new Nucleus.IniSaveInfo("", "r_Fullscreen", "0"),
    new Nucleus.IniSaveInfo("", "r_FullscreenWindow", "0")
  ]);
};