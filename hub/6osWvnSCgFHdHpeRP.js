Hub.Handler.Version = 3; // Released at https://hub.splitscreen.me/ on Mon Sep 08 2025 19:05:31 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "6osWvnSCgFHdHpeRP";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["x64", "x86", "maps"];
Game.DirSymlinkCopyInstead = ["maps"];
Game.FileSymlinkExclusions = ["SDL2.dll", "SDL2.ini", "xinput1_4.dll"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.UseNucleusEnvironment = true;
Game.NeedsSteamEmulation = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "VampireSmile.exe";
Game.SteamID = "268990";
Game.GUID = "VampireSmile";
Game.GameName = "The Dishwasher: Vampire Smile";
Game.MaxPlayers = 2;
Game.MaxPlayersOneMonitor = 4;
Game.ForceGameArch = "x64";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "The Dishwasher - Vampire Smile";
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.FakeFocus = false;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.SDL2Enabled = true;
Game.SDLPaths = ["x64"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\VampireSmile";
Game.Description = "This game has local co-op for max 2 players already but with Nucleus each player gets his own screen and save. Create a public online game in one instance and join in the other.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  var dict = ["2|display_width=" + Context.Width, "3|display_height=" + Context.Height, "4|window_mode=1", "9|pause_on_lost_focus=False"];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};