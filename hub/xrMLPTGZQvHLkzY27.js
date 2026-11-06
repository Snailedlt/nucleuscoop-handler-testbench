Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Mon Nov 09 2020 06:07:54 GMT+0000 (UTC).
Hub.Handler.Id = "xrMLPTGZQvHLkzY27";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = [
  "TohoATD3D\\Binaries\\Win64",
  "TohoATD3D\\ThirdParty"
  //"SaveDir",
];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt"
  //"SaveData.dat",
];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.SupportsKeyboard = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "TohoATD3D-Win64-Shipping.exe";
Game.SteamID = "1019920";
Game.GUID = "Gensokyo Defenders";
Game.GameName = "Gensokyo Defenders";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "TohoATD3D\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "TohoATD3D";
Game.Hook.DInputForceDisable = false;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.RefreshWindowAfterStart = true;
Game.SetForegroundWindowElsewhere = false;
Game.Description = "Create an online room in one instace and join in the others. Use the mouse cursor to navigate the menus in all instances if you have trouble with gamepad control in menus.";
//Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -nosplash " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};