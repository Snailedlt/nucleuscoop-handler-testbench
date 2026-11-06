Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sun May 14 2023 19:17:34 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "gQx7xkfZ6nrb7WsRk";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["Type:Section|BIRD_mapping"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "local_save.txt", "xgcore.dll", "xinput1_3.dll"];
Game.GameName = "Dragon Ball Xenoverse";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "DBXV.exe";
Game.SteamID = "323470";
Game.GUID = "Dragon Ball Xenoverse";
Game.MaxPlayers = 6;
Game.MaxPlayersOneMonitor = 6;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseSteamless = true;
Game.SteamlessArgs = "--quiet --keepbind";
Game.SteamlessTiming = 4000;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "DRAGON BALL XENOVERSE";
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.BlockKeyboardEvents = false;
Game.Hook.BlockMouseEvents = true;
Game.Hook.BlockInputEvents = true;
Game.Hook.UseAlpha8CustomDll = true;
Game.Hook.CustomDllEnabled = true;
Game.UserProfileConfigPath = "AppData\\Local\\BANDAI NAMCO GAMES\\DB Xenoverse";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\323470\\remote";
Game.UserProfileConfigPathNoCopy = false;
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "IMPORTANT: Make sure you ran your main game at least once and changed some graphics settings before launching this. Co-op online missions and vs mode unlock after defeating Vegeta and Nappa in story mode, create a lobby in one instance and join in the others.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var VideoConfig = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\DBXV.ini";
  Context.ModifySaveFile(VideoConfig, VideoConfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("$GE", "Display/Fullscreen", "0"),
    new Nucleus.IniSaveInfo("$GE", "Display/Height", Context.Height),
    new Nucleus.IniSaveInfo("$GE", "Display/Width", Context.Width)
  ]);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\xgcore.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "xgcore.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
};