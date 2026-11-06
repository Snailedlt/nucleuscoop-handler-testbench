Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Feb 28 2022 08:16:04 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "RYHCsdvwJRfnefpsN";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["Descenders_Data\\Plugins"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimentalSteamClient = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.ExecutableName = "Descenders.exe";
Game.SteamID = "681280";
Game.GUID = "Descenders";
Game.GameName = "Descenders";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Descenders";
Game.FakeFocus = true;
Game.ResetWindows = true;
Game.RefreshWindowAfterStart = true;
Game.SupportsKeyboard = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput9_1_0.dll"];
Game.BlockRawInput = true;
Game.UserProfileConfigPath = "AppData\\LocalLow\\RageSquid\\Descenders";
Game.Description =
  "CLOSE Steam before running this. After completing the tutorial, press start, select the multiplayer lobby option and create a password lobby then the other instances can join, do this to avoid getting banned. Alt-tab between the instances to use the keyboard to write. The game is demanding so reduce graphics settings per instance in the game options to improve performance. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.PromptBetweenInstances = true;
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var Args = (Context.Args = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\RageSquid\\Descenders", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\RageSquid\\Descenders", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\RageSquid\\Descenders", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var nolan = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\disable_lan_only.txt";
  var lines = [""];
  Context.WriteTextFile(nolan, lines);

  if (Context.PlayerID == 1) {
    var reg = Context.NucleusFolder + "\\utils\\backup\\Descenders.reg";
    var lines = [""];
    Context.WriteTextFile(reg, lines);
  }
};