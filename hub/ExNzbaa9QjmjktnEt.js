Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Apr 11 2020 22:56:23 GMT+0000 (UTC).
Hub.Handler.Id = "ExNzbaa9QjmjktnEt";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["FromSpace_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.GameName = "It came from space and ate our brains";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "fromspace.exe";
Game.SteamID = "342620";
Game.GUID = "FromSpace";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "It Came From Space And Ate Our Brains";
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.BlockRawInput = true;
Game.UserProfileConfigPath = "AppData\\LocalLow\\Triangle Studios\\It came from space and ate our brains";
Game.Description =
  "Only for the Old Online 1.3.8 version of the game, you can downgrade to it in the steam betas tab of the game. Set your main game to windowed. To connect the instances: 1.-P1 go to Multiplayer/Host and set Port=00000 2.-Hit OK, you may get a Connection Warning Hit OK again. 3.-Now you should be kicked back to the Main Menu 4.-Select Mutiplayer/Host/OK. Now P2-P4 Can join you!";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Triangle Studios\\It came from space and ate our brains", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Triangle Studios\\It came from space and ate our brains", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Triangle Studios\\It came from space and ate our brains", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Triangle Studios\\It came from space and ate our brains", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Triangle Studios\\It came from space and ate our brains", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
};