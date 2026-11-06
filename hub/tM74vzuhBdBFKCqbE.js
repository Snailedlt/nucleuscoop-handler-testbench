Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Mar 07 2022 00:42:06 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "tM74vzuhBdBFKCqbE";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.KillMutex = ["UnrealEngine4"];
Game.GameName = "Citadel Forged with Fire";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Citadel-Win64-Shipping.exe";
Game.SteamID = "487120";
Game.GUID = "Citadel Forged with Fire";
Game.MaxPlayers = 10;
Game.MaxPlayersOneMonitor = 10;
Game.BinariesFolder = "Citadel\\Binaries\\Win64";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "Citadel";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.RefreshWindowAfterStart = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.Description = "One player creates a custom game, others join. Keyboard needed to type character's names. Rest can be used with controllers.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = " -windowed -AlwaysFocus -nosplash" + " -ResX=" + Context.Width + " -ResY=" + Context.Height;
};