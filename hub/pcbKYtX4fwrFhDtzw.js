Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Fri Sep 18 2020 12:10:28 GMT+0000 (UTC).
Hub.Handler.Id = "pcbKYtX4fwrFhDtzw";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["mordheim_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt", "xinput1_4.dll"];
Game.GameName = "Mordheim: City of the Damned";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "mordheim.exe";
Game.SteamID = "276810";
Game.GUID = "Mordheim";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 2;
Game.BinariesFolder = "";
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.LauncherTitle = "";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MordheimCityoftheDamned";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll", "xinput1_4.dll", "xinput9_1_0.dll"];
Game.Hook.CustomDllEnabled = false;
Game.FakeFocus = true;
Game.BlockRawInput = true;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\276810\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description = "Create a public Skirmish multiplayer game in one instance and join in the other.";
Game.PauseBetweenStarts = 40;

Game.Play = function() {
  var Args = (Context.Args = " -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.StartArguments = Args;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Focus Home Interactive\\MordheimCityoftheDamned", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Focus Home Interactive\\MordheimCityoftheDamned", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Focus Home Interactive\\MordheimCityoftheDamned", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};