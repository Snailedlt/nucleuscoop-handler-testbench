Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Mar 06 2020 21:54:45 GMT+0000 (UTC).
Hub.Handler.Id = "yMyuSPirFLEqoGFSq";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv139\\Win64", "Earthfall\\Binaries\\Win64"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.UseSteamStubDRMPatcher = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Earthfall-Win64-Shipping.exe";
Game.SteamID = "415590";
Game.GUID = "Earthfall";
Game.GameName = "Earthfall";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Earthfall\\Binaries\\Win64";
Game.LauncherTitle = "";
Game.LauncherExe = "";
Game.SupportsPositioning = true;
Game.Hook.CustomDllEnabled = false;
Game.Hook.ForceFocusWindowName = "Earthfall";
Game.Hook.ForceFocus = true;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.PauseBetweenStarts = 30;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.Description = "While navigating menus, thumbstick/cursor is shared between screens but in-game controls and button presses are independent.";

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -AlwaysFocus " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);
  Context.StartArguments = Args;
};
