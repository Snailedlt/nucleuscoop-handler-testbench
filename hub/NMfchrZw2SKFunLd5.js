Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Nov 02 2020 18:59:11 GMT+0000 (UTC).
Hub.Handler.Id = "NMfchrZw2SKFunLd5";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["FightTheDragon_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_api64.dll", "steam_appid.txt", "XInput1_3.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "FightTheDragon.exe";
Game.SteamID = "250560";
Game.GUID = "FightTheDragon";
Game.GameName = "Fight The Dragon";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "FightTheDragon";
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = true;
Game.BlockRawInput = true;
Game.UserProfileSavePath = "AppData\\LocalLow\\3 Sprockets\\FightTheDragon";
Game.Description = "The game has native splitscreen for 2 players max, with this script you can play 4 player splitscreen, 1 player per instance connecting the instances via the online play option.";
//Game.KeepSymLinkOnExit = true;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\3 Sprockets\\FightTheDragon", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\3 Sprockets\\FightTheDragon", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\3 Sprockets\\FightTheDragon", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\mods");
  System.IO.Directory.CreateDirectory(filePath);
};