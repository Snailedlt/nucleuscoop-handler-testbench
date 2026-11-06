Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Tue Apr 21 2020 15:39:31 GMT+0000 (UTC).
Hub.Handler.Id = "5Ni6KjX3FxE56rnzW";
Hub.Maintainer.Name = "ZeroFox";
Hub.Maintainer.Id = "fd6NFJsFJef4AZoD9";

Game.NeedsSteamEmulation = false;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = false;
Game.ExecutableName = "Debris.exe";
Game.SteamID = "669660";
Game.GUID = "Debris";
Game.GameName = "Debris";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.SaveType = Nucleus.SaveType.None;
Game.LauncherExe = "";
Game.SupportsPositioning = true;
Game.Hook.CustomDllEnabled = false;
Game.Hook.ForceFocusWindowName = "Debris";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.PauseBetweenStarts = 10;
Game.XInputPlusDll = ["xinput1_1.dll", "xinput1_2.dll", "xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.FakeFocus = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = false;
Game.UseNucleusEnvironment = true;
Game.HookFocus = true;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);
  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Moonray Studios\\Debris", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Moonray Studios\\Debris", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Moonray Studios\\Debris", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);
  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Moonray Studios\\Debris", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);
};