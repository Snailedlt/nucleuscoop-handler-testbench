Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu Feb 13 2020 07:12:22 GMT+0000 (UTC).
Hub.Handler.Id = "uRLtSZdNf5deguBzo";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Unloved\\Binaries\\Win32", "Engine\\Binaries\\ThirdParty\\Steamworks\\Steamv132\\Win32"];
Game.KillMutex = ["UnrealEngine4"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt"];
Game.GameName = "UNLOVED";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "unloved-win32-shipping.exe";
Game.SteamID = "321270";
Game.GUID = "UNLOVED";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "Unloved\\Binaries\\Win32";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.SupportsPositioning = true;
Game.ForceFinishOnPlay = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "UNLOVED";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.HookFocus = true;
Game.SetWindowHookStart = true;
Game.PauseBetweenStarts = 30;
Game.SetForegroundWindowElsewhere = true;
Game.Description = "Select a different profile per instance. Use the mouse cursor in the menu and host a game, press alt-tab then use the cursor in the other instances to join.";

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -nosplash " + " -steam " + " -ResX= " + Context.Width + " -ResY= " + Context.Height);

  Context.StartArguments = Args;
};
