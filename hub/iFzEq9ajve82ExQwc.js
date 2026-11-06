Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Sun Aug 16 2020 16:55:17 GMT+0000 (UTC).
Hub.Handler.Id = "iFzEq9ajve82ExQwc";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmodex.dll"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "ironbrigade.exe";
Game.SteamID = "115120";
Game.GUID = "Iron Brigade";
Game.GameName = "Iron Brigade";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.StartArguments = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Iron Brigade";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.PreventWindowDeactivation = true;
Game.HookFocus = true;
Game.HookInit = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Doublefine\\IronBrigade";
Game.Description = "Set your regular game to windowed and in the custom resolution you want before launching this.";
Game.SetWindowHook = true;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var Args = (Context.Args = '-cfg "playOpeningLogo=false" ');

  Context.StartArguments = Args;
};