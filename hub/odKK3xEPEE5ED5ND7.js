Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Wed Mar 25 2020 02:31:17 GMT+0000 (UTC).
Hub.Handler.Id = "odKK3xEPEE5ED5ND7";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "TSA\\Binaries\\Win64"];
Game.FileSymlinkExclusions = [
  "steam_api64.dll",
  "steam_appid.txt",
  "XInput1_3.dll"
  //"Game.save",
];
Game.GameName = "The Simple Apocalypse";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "tsa-win64-shipping.exe";
Game.SteamID = "693430";
Game.GUID = "The Simple Apocalypse";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "TSA\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "The Simple Apocalypse";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HookFocus = true;
Game.SetWindowHook = true;
Game.KeepSymLinkOnExit = false;
Game.Description = "Use mouse cursor to navigate menus in all instances. Once you host an online game the other players can join by inviting them in the host option invite players.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};