Hub.Handler.Version = 2; // Released at https://hub.splitscreen.me/ on Mon Feb 08 2021 22:31:53 GMT+0000 (UTC).
Hub.Handler.Id = "P3HRxsdengacwR3zK";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
Game.AddOption("Use the DX9 .exe?", "Only select yes if you want to run the game's Directx 9 exe.", "DX9", answers1);

Game.FileSymlinkExclusions = ["steam_api64.dll", "steam_api.dll", "steam_appid.txt", "LEGO_Worlds.exe", "LEGO_Worlds_DX11.exe"];
Game.KillMutex = ["TTALES-{LEGOWorlds}"];
Game.NeedsSteamEmulation = false;
Game.UseGoldberg = true;
Game.GoldbergExperimental = true;
Game.UseNucleusEnvironment = true;
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SupportsKeyboard = true;
Game.ExecutableName = "LEGO_Worlds_DX11.exe";
Game.SteamID = "332310";
Game.GUID = "LEGO Worlds";
Game.GameName = "LEGO Worlds";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.LauncherTitle = "";
Game.HideTaskbar = false;
Game.Hook.ForceFocus = false;
Game.Hook.ForceFocusWindowName = "LEGOWorlds";
Game.FakeFocus = true;
Game.HookFocus = true;
Game.SetForegroundWindowElsewhere = true;
Game.Hook.DInputForceDisable = true;
Game.Hook.DInputEnabled = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;
Game.XInputPlusDll = ["xinput1_3.dll"];
Game.Hook.CustomDllEnabled = false;
Game.UserProfileConfigPath = "AppData\\Roaming\\Warner Bros. Interactive Entertainment\\LEGOWorlds";
Game.UserProfileSavePath = "AppData\\Roaming\\Warner Bros. Interactive Entertainment\\LEGOWorlds\\SAVEDGAMES";
Game.Description =
  "This game already has native splitscreen for 2 players only, with this script you can play with 4 using the online option to connect the instances. Use the overlay that appears to join, right click the host player in the other instances and select join, close the overlay with the mouse cursor. So the instances launch and resize correctly make sure to run your main game at least once and change some graphic settings. You need to add custom resolutions in your AMD/Nvidia/Intel panel (For example: 960x540, 1920x540, 960x1080, 960x540 ect.) so the game can see and use them. Limit the game fps and lower graphic settings to improve performance. If you get uneven fps in the instances try alt tabbing to the Nucleuscoop app window if you are using multiple gamepads. Each instance has its own saves that are copies of your original ones, so your original saves will not be overwritten. You can access these saves in the app, after the first launch click game options/open user profile save path in the UI.";
Game.PauseBetweenStarts = 30;

Game.Play = function() {
  var txtPath = Context.EnvironmentPlayer + Context.UserProfileConfigPath + "\\PCCONFIG.txt";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, "ScreenWidth", Nucleus.SearchType.StartsWith) + "|ScreenWidth									" + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "ScreenHeight", Nucleus.SearchType.StartsWith) + "|ScreenHeight								" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "WindowWidth", Nucleus.SearchType.StartsWith) + "|WindowWidth									" + Context.Width,
    Context.FindLineNumberInTextFile(txtPath, "WindowHeight", Nucleus.SearchType.StartsWith) + "|WindowHeight								" + Context.Height,
    Context.FindLineNumberInTextFile(txtPath, "Windowed", Nucleus.SearchType.StartsWith) + "|Windowed									1",
    Context.FindLineNumberInTextFile(txtPath, "BorderlessWindow", Nucleus.SearchType.StartsWith) + "|BorderlessWindow							1"
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);

  var dx9 = Context.Options["DX9"];

  if (dx9 == "Yes") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "LEGO_Worlds.exe"), System.IO.Path.Combine(Context.RootFolder, "LEGO_Worlds_DX11.exe"), true);
  }

  if (dx9 == "No") {
    System.IO.File.Copy(System.IO.Path.Combine(Context.RootInstallFolder, "LEGO_Worlds_DX11.exe"), System.IO.Path.Combine(Context.RootFolder, "LEGO_Worlds_DX11.exe"), true);
  }
};