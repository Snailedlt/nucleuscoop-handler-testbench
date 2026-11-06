Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sat Jan 16 2021 15:56:37 GMT+0000 (UTC).
Hub.Handler.Id = "JhdSK3vrw784xCQcp";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Set the instances resolution automatically?", "Matches in-game resolution to window size. Affects the main menu and hud.", "Res", answers1);

Game.KillMutex = ["PlayBF"];
Game.DirSymlinkExclusions = ["data\\_lvl_pc"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "vidmode.ini"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "battlefrontii.exe";
Game.SteamID = "6060";
Game.GUID = "Battlefront 2 Classic";
Game.GameName = "Star Wars Battlefront 2 (Classic, 2005)";
Game.MaxPlayers = 64;
Game.MaxPlayersOneMonitor = 16;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.StartArguments = "/win";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Star Wars Battlefront II";
Game.Hook.DInputForceDisable = false;
Game.Hook.DInputEnabled = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.UseDevReorder = true;
Game.HookFocus = true;
Game.HookInit = true;
Game.SetWindowHook = true;
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var res = Context.Options["Res"];

  if (res == "Yes") {
    var Args = (Context.Args = " /win " + " -resolution " + Context.Width + " " + Context.Height);

    Context.StartArguments = Args;
  }

  if (res == "No") {
  }
};