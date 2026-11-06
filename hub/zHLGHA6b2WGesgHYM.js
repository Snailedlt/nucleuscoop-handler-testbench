Hub.Handler.Version = 4; // Released at https://hub.splitscreen.me/ on Mon Sep 08 2025 19:19:14 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "zHLGHA6b2WGesgHYM";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.DirSymlinkExclusions = ["x64", "x86", "character", "clothes", "food", "gfx", "loading", "map", "monster", "scene", "smashable", "weapons", "worldmap"];
Game.DirSymlinkCopyInstead = ["character", "clothes", "food", "gfx", "loading", "map", "monster", "scene", "smashable", "weapons", "worldmap"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_interfaces.txt", "steam_appid.txt", "SDL2.dll", "SDL2.ini", "xinput1_4.dll", "gamecontrollerdb.txt"];
Game.FileSymlinkCopyInstead = ["FNA.dll", "FNA.Steamworks.dll", "Steamworks.NET.dll"];
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;
Game.GameName = "Charlie Murder";
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.HandlerInterval = 100;
Game.ExecutableName = "CharlieMurder.exe";
Game.SteamID = "405290";
Game.GUID = "Charlie Murder";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.ForceGameArch = "x64";
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
//Game.StartArguments = "-dsound";
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Charlie Murder";
Game.WindowStyleValues = ["~0xC00000", "~0x40000", "~0x20000000", "~0x20000", "~0x80000", "0x40000000"];
Game.ExtWindowStyleValues = ["~0x00000001", "~0x00000200", "~0x00020000"];
Game.FakeFocus = false;
Game.HookFocus = false;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.SDL2Enabled = true;
Game.SDLPaths = ["x64"];
//Game.PlayersPerInstance = 4;
Game.Hook.CustomDllEnabled = false;
Game.SupportsKeyboard = true;
Game.UserProfileConfigPath = "AppData\\Roaming\\CharlieMurder";
Game.Description =
  "This game has local co-op for 4 players already but all local players share the same 5 playable characters data. Through Nucleus additional players can keep different progress even for the same character. Create a public online game in one instance and join in the others.";
Game.PauseBetweenStarts = 25;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\config.ini";
  var dict = ["2|display_width=" + Context.Width, "3|display_height=" + Context.Height, "4|window_mode=1", "9|pause_on_lost_focus=False"];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\x64\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\x64\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);
};