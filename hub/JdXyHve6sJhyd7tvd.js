Hub.Handler.Version = 1; // Released at https://hub.splitscreen.me/ on Sat Jan 09 2021 06:34:41 GMT+0000 (UTC).
Hub.Handler.Id = "JdXyHve6sJhyd7tvd";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

Game.ExecutableContext = ["fmod64.dll"];
Game.DirSymlinkExclusions = ["Settings", "WIN32\\LEVELS\\MAIN\\TILE_X00\\TILE_X00_Y00"];
Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_appid.txt"];
Game.FileSymlinkCopyInstead = ["MAIN.PWS", "imgui.ini"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "Flatout.exe";
Game.SteamID = "402130";
Game.GUID = "FlatOut 4";
Game.GameName = "FlatOut 4: Total Insanity";
Game.MaxPlayers = 8;
Game.MaxPlayersOneMonitor = 8;
Game.BinariesFolder = "";
Game.LauncherTitle = "";
Game.HideTaskbar = true;
Game.NotTopMost = true;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "FlatOut 4";
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = true;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.FakeFocus = false;
Game.HookFocus = false;
Game.UseForceBindIP = true;
Game.SetWindowHook = true;
Game.ResetWindows = true;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileConfigPath = "Documents\\My Games\\FlatOut 4";
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\402130\\remote";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Create an online multiplayer public game in one instance and join using the option find game in the others. If the windows borders do not remove correctly after Nucleus finishes setting up go to the game Options-Display and select borderless then press the b button. If you want to avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x1080, 1920x540, 960x540 etc.). Each instance has its own save, you can access these saves in the app, after the first launch click game options/open user profile save path in the UI. Press the windows key+b to unfocus all the instances and even out fps if you are using gamepads.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\UserSettings.cfg";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "Engine.Device.PC.Fullscreen", Nucleus.SearchType.StartsWith) + "|Engine.Device.PC.Fullscreen = 0;",
    Context.FindLineNumberInTextFile(txtPath, "Engine.Device.PC.Height", Nucleus.SearchType.StartsWith) + "|Engine.Device.PC.Height = " + Context.Height + ";",
    Context.FindLineNumberInTextFile(txtPath, "Engine.Device.PC.Width", Nucleus.SearchType.StartsWith) + "|Engine.Device.PC.Width = " + Context.Width + ";"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
};