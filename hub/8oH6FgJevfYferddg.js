Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Sat Jan 25 2025 13:14:23 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "8oH6FgJevfYferddg";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["Attack on Toys_Data"];
Game.DirExclusions = ["Attack on Toys_Data\\Attack on Toys 2.12"];
Game.DirSymlinkExclusions = ["Attack on Toys_Data\\Plugins\\x86_64"];
Game.FileSymlinkExclusions = ["steam_appid.txt", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = [
  "GameAssembly.dll",
  "UnityCrashHandler64.exe",
  "UnityPlayer.dll",
  "boot.config",
  //"data.unity3d",
  "sharedassets0.resource",
  "steam_api64.dll"
];
Game.GameName = "Attack on Toys";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "Attack on Toys.exe";
Game.SteamID = "1269690";
Game.GUID = "Attack on Toys";
Game.MaxPlayers = 5;
Game.MaxPlayersOneMonitor = 5;
Game.UseGoldberg = false;
Game.CreateSteamAppIdByExe = true;
Game.SetTopMostAtEnd = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Attack on Toys";
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_4.dll"];
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.BlockRawInput = false;
Game.UserProfileSavePath = "AppData\\LocalLow\\N7T-GAMES\\Attack on Toys";
Game.Description =
  "Set the correct resolution in the game graphics options that matches the window size or the instances will resize on their own when you press the escape key, you need to add custom resolutions in your AMD/Nvidia/Intel panel (for example for a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. Use the Nucleus shortcut CTRL+R to reposition the instances if they move or resize on their own. Create a Multiplayer LAN room in one instance and join in the others, use the mouse cursor to navigate the menus, alt-tab between the instances to use the cursor or keyboard. Map your gamepad in your main game first, gamepad controls only work in-game.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  Context.StartArguments = " -screen-fullscreen 0 -popupwindow " + " -screen-width " + Context.Width + " -screen-height " + Context.Height;

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\N7T-GAMES\\Attack on Toys", "FullScreen_h3418622618", 0, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\N7T-GAMES\\Attack on Toys", "Screenmanager Fullscreen mode_h3630240806", 3, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\N7T-GAMES\\Attack on Toys", "Screenmanager Resolution Height_h2627697771", Context.Height, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\N7T-GAMES\\Attack on Toys", "Screenmanager Resolution Width_h182942802", Context.Width, Nucleus.RegType.DWord);

  Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\N7T-GAMES\\Attack on Toys", "Screenmanager Resolution Use Native_h1405027254", 0, Nucleus.RegType.DWord);

  //Context.EditRegKey("HKEY_CURRENT_USER", "SOFTWARE\\N7T-GAMES\\Attack on Toys", "ScreenResolution_h2617989511", 10, Nucleus.RegType.DWord);
};