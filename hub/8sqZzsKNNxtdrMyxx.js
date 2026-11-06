Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Thu May 14 2020 08:42:32 GMT+0000 (UTC).
Hub.Handler.Id = "8sqZzsKNNxtdrMyxx";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["IAmWeaponRevival_Data\\Plugins"];
Game.FileSymlinkExclusions = ["steam_api.dll", "steam_appid.txt", "XInput1_3.dll"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "IAmWeaponRevival.exe";
Game.SteamID = "335700";
Game.GUID = "I am Weapon Revival";
Game.GameName = "I am Weapon: Revival";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "IAmWeaponRevival";
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.SetWindowHook = true;
Game.FakeFocus = true;
Game.BlockRawInput = true;
Game.SetForegroundWindowElsewhere = true;
Game.ResetWindows = true;
Game.PromptBetweenInstances = true;
Game.UserProfileSavePath = "AppData\\LocalLow\\Krealit\\IAmWeaponRevival\\Profiles";
Game.Description =
  "On first Nucleus run set each instance to windowed and in the correct custom resolution using the gamepad dpad in the game settings/video before opening the next instance. You need to create a custom resolution from your AMD/Nvidia/Intel panel (For example: 960x540, 1920x540, 960x1080, 960x540 ect.) for the game to see it, if you do not do this the windows will not resize correctly. Start a co-op game in one instance and the other can join. If you get uneven fps in the instances try alt tabbing to the nucleuscoop app window when using multiple gamepads only, the game windows will still remain on top.";
Game.PauseBetweenStarts = 35;

Game.Play = function() {
  var Args = (Context.Args = " -windowed " + " -screen-width " + Context.Width + " -screen-height " + Context.Height);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Krealit\\IAmWeaponRevival", "Screenmanager Is Fullscreen mode_h3981298716", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Krealit\\IAmWeaponRevival", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\Krealit\\IAmWeaponRevival", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);
};