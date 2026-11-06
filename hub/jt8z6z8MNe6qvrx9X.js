Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Thu Jun 11 2020 23:09:22 GMT+0000 (UTC).
Hub.Handler.Id = "jt8z6z8MNe6qvrx9X";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["TheBlackoutClub\\Binaries\\Win64", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "TheBlackoutClub\\Content\\Movies"];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt",
  "IntroMovie.mp4",
  "OpeningSplash-Blindlight.mp4",
  "OpeningSplash-Question.mp4",
  "PlayfabRedirector64.dll",
  "winmm.dll",
  "dlllist.txt"
];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "TheBlackoutClub-Win64-Shipping.exe";
Game.SteamID = "599080";
Game.GUID = "The Blackout Club";
Game.GameName = "The Blackout Club";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "TheBlackoutClub\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.Hook.ForceFocusWindowName = "TheBlackoutClub";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.PauseBetweenStarts = 40;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HideTaskbar = false;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.KeepSymLinkOnExit = false;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileSavePath = "AppData\\Local\\TheBlackoutClub\\Saved\\SaveData";
Game.Description =
  "CLOSE Steam completely before running this. In order to play multiplayer, you need to finish prologue (or skip it) for each player. Then one player hosts a mission, and others join game. You can also invite in start menu > friends/network > press A on the other player(s). They will automatically join. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top, also try reducing graphics.";

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TheBlackoutClub\\Binaries\\Win64\\PlayfabRedirector64.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "PlayfabRedirector64.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TheBlackoutClub\\Binaries\\Win64\\winmm.dll");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "winmm.dll");
  System.IO.File.Copy(savePkgOrigin, savePath, true);

  var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\TheBlackoutClub\\Binaries\\Win64\\dlllist.txt");
  var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "dlllist.txt");
  System.IO.File.Copy(savePkgOrigin, savePath, true);
};